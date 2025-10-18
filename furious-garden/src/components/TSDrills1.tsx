"use client";

export default function TSDrill1() {
  // Goal: Make one reusable function for any "numbers or strings → numbers" use case.
  // - T is constrained so each element is string or number.
  // - parse handles strings safely; default provided.
  // - isCents decides if we should divide by 100 (or skip); default provided.

  function normalizeNumbers<T extends string | number>(
    values: T[],
    opts?: {
      parse?: (v: string) => number; // how to parse strings
      isCents?: (n: number) => boolean; // when to divide by 100
    }
  ): number[] {
    const parse = opts?.parse ?? ((s: string) => parseFloat(s));
    const isCents = opts?.isCents ?? ((n: number) => n > 10); // simple heuristic

    return values.map((v) => {
      // TODO(1): If v is a string, parse it; otherwise keep as number (use typeof check).
      // TODO(2): If number passes isCents, divide by 100.
      // TODO(3): Return the final number.
      let num = (typeof v === "string" ? parse(v) : v) as number;
      if (isCents(num)) num = num / 100;
      return num;
    });
  }

  // Try it (should match your earlier output):
  console.log(normalizeNumbers([100, "250", "3.50", 499])); // → [1, 2.5, 3.5, 4.99]

  // You can also customize behavior:
  console.log(
    normalizeNumbers(["0012", "0007"], {
      parse: (s) => Number(s), // different parser
      isCents: () => false, // never divide by 100
    })
  ); // → [12, 7]

  console.log(normalizeNumbers([100, "250", "3.50", 499]));
  // → [1, 2.5, 3.5, 4.99]

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}
