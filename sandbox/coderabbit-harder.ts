// Round 2 — subtler issues to test how deep CodeRabbit goes.
// None of these throw obviously; they're the kind of bug that ships.

// Default Array.sort() compares as strings: [1, 2, 10] -> [1, 10, 2].
export function topScores(scores: number[]): number[] {
  return scores.sort().slice(0, 3);
}

// parseInt with no radix; `|| 1` also discards a legitimate page 0.
export function parsePage(input: string): number {
  return parseInt(input) || 1;
}

// Off-by-one: i <= length reads one past the end (NaN). Float money math too.
export function totalCents(prices: number[]): number {
  let total = 0;
  for (let i = 0; i <= prices.length; i++) {
    total += prices[i] * 100;
  }
  return total;
}

// Math.random() is not cryptographically secure — unsafe for tokens.
export function makeToken(): string {
  return Math.random().toString(36).slice(2);
}

// Loose equality + non-constant-time comparison for a secret.
export function verifyToken(provided: string, expected: string): boolean {
  return provided == expected;
}

// Catastrophic backtracking (ReDoS) on attacker-controlled input.
export function isCompanyEmail(s: string): boolean {
  return /^([a-zA-Z0-9]+)+@example\.com$/.test(s);
}

// `forEach` with an async callback: the awaits are not awaited, so the
// function resolves before any save completes and rejections are lost.
export async function saveAll(
  items: string[],
  save: (x: string) => Promise<void>,
): Promise<void> {
  items.forEach(async (item) => {
    await save(item);
  });
}

// `if (cache[key])` treats a cached 0 as a miss and recomputes; cache also
// grows without bound.
const cache: Record<string, number> = {};
export function memoizedLen(key: string, compute: () => number): number {
  if (cache[key]) return cache[key];
  cache[key] = compute();
  return cache[key];
}
