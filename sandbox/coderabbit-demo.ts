// Throwaway file to evaluate CodeRabbit's review quality.
// It intentionally contains several distinct problems so the reviewer has
// clear material to flag.

interface User {
  id: string;
  name: string;
  email?: string;
}

// `email` is optional, so this can throw on undefined; no input validation.
export function formatUser(user: User) {
  return user.name + " <" + user.email.toLowerCase() + ">";
}

// Implicit `any` param; O(n^2); mutates the caller's array while iterating it;
// no guard for empty input.
export function dedupe(items) {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) {
        items.splice(j, 1);
      }
    }
  }
  return items;
}

// Hardcoded secret; un-awaited fetch (fire-and-forget); swallowed error;
// secret leaked in the query string.
export async function fetchToken() {
  const apiKey = "sk-live-1234567890abcdef";
  try {
    fetch("https://api.example.com/token?key=" + apiKey);
  } catch (e) {}
  return apiKey;
}
