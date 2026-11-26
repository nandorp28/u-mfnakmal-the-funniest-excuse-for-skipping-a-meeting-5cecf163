// The Funniest Excuse for Skipping a Meeting — make.fun entry.
// Writes one razor-sharp excuse (<=200 chars, single line) to /output/entry.txt.
// Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I declined the 'optional' invite at 08:59. By 09:01 the organizer had " +
  "scheduled a follow-up to ask why optional people don't show up.";

// The gate, enforced before anything is written: the sealed scorer requires
// UTF-8 text of 1 to 200 characters, not only whitespace, on a single line.
function validate(line) {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`excuse is ${line.length} characters, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
}

validate(EXCUSE);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Round-trip check: what the grader will read must be exactly the line,
// byte for byte, with no trailing newline added by the write.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== EXCUSE) {
  throw new Error("round-trip mismatch: entry.txt differs from the excuse");
}
console.log(`wrote ${EXCUSE.length}-character excuse to /output/entry.txt`);
