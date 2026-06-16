# coderabbit-eval

Throwaway repo to evaluate [CodeRabbit](https://coderabbit.ai)'s automated PR review.

The PR in this repo adds `sandbox/coderabbit-demo.ts`, a file with several
deliberate, distinct problems (possible `undefined` deref, implicit `any`,
hardcoded secret, swallowed error / un-awaited fetch, O(n²) + input mutation).
The goal is to see CodeRabbit's summary + inline comments on a real diff.

Safe to delete once the evaluation is done.
