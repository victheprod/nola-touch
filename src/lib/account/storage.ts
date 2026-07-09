import type { AccountUser, StoredUserRecord } from "./types";

const USERS_KEY = "nola-touch-users";
const SESSION_KEY = "nola-touch-session";

export async function hashPassword(password: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function readUsers(): StoredUserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUserRecord[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSessionUserId(): string | null {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

export function setSessionUserId(id: string | null) {
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
}

export function toPublicUser(record: StoredUserRecord): AccountUser {
  const { passwordHash: _, ...user } = record;
  return user;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<{ ok: true; user: AccountUser } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase();
  if (!email.includes("@")) return { ok: false, error: "Enter a valid email." };
  if (input.password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
  if (input.name.trim().length < 2) return { ok: false, error: "Enter your name." };

  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const record: StoredUserRecord = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    name: input.name.trim(),
    email,
    phone: input.phone?.trim() || undefined,
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };

  writeUsers([...users, record]);
  setSessionUserId(record.id);
  return { ok: true, user: toPublicUser(record) };
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ ok: true; user: AccountUser } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  const users = readUsers();
  const record = users.find((u) => u.email === normalized);
  if (!record) return { ok: false, error: "No account found with that email." };

  const hash = await hashPassword(password);
  if (hash !== record.passwordHash) return { ok: false, error: "Incorrect password." };

  setSessionUserId(record.id);
  return { ok: true, user: toPublicUser(record) };
}

export function loadUserById(id: string): AccountUser | null {
  const record = readUsers().find((u) => u.id === id);
  return record ? toPublicUser(record) : null;
}

export function updateUser(
  id: string,
  patch: Partial<Pick<AccountUser, "name" | "phone" | "address">>,
): AccountUser | null {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) return null;

  users[idx] = {
    ...users[idx],
    name: patch.name?.trim() ?? users[idx].name,
    phone: patch.phone !== undefined ? patch.phone.trim() || undefined : users[idx].phone,
    address: patch.address ?? users[idx].address,
  };
  writeUsers(users);
  return toPublicUser(users[idx]);
}

export async function changePassword(
  id: string,
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (newPassword.length < 6) return { ok: false, error: "New password must be at least 6 characters." };

  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx < 0) return { ok: false, error: "Account not found." };

  const hash = await hashPassword(currentPassword);
  if (hash !== users[idx].passwordHash) return { ok: false, error: "Current password is incorrect." };

  users[idx].passwordHash = await hashPassword(newPassword);
  writeUsers(users);
  return { ok: true };
}

export function logoutUser() {
  setSessionUserId(null);
}
