const STORAGE_KEY = "portfolio_contact";
const MAX_SENDS = 2;

interface ContactRecord {
  count: number;
  firstSentAt: number;
}

function getRecord(): ContactRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { count: 0, firstSentAt: 0 };
    return JSON.parse(raw) as ContactRecord;
  } catch {
    return { count: 0, firstSentAt: 0 };
  }
}

function saveRecord(record: ContactRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage not available (SSR context) — ignore
  }
}

/** Returns true if the user can still send an email */
export function canSendEmail(): boolean {
  const { count } = getRecord();
  return count < MAX_SENDS;
}

/** Registers a successful send */
export function recordEmailSent(): void {
  const record = getRecord();
  saveRecord({
    count: record.count + 1,
    firstSentAt: record.firstSentAt || Date.now(),
  });
}

/** Returns how many sends are left (0–2) */
export function getRemainingEmails(): number {
  const { count } = getRecord();
  return Math.max(0, MAX_SENDS - count);
}
