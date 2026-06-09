/**
 * Replaces common chart/UI hex literals in HTML/JS with BayaanTheme.cssVar() calls.
 */
const fs = require("fs");
const path = require("path");

const files = ["index.html", "bayaan-workbench-v4.html"];

const REPLACEMENTS = [
  ['"#C7CDFF"', 'window.BayaanTheme.cssVar("--chart-3")'],
  ['"#4F63FF"', 'window.BayaanTheme.cssVar("--chart-1")'],
  ['"#6EE7B7"', 'window.BayaanTheme.cssVar("--chart-4")'],
  ['"#A7F3D0"', 'window.BayaanTheme.cssVar("--teal-100")'],
  ['"#FDE68A"', 'window.BayaanTheme.cssVar("--chart-5")'],
  ['"#0F766E"', 'window.BayaanTheme.cssVar("--chart-6")'],
  ['"#14B8A6"', 'window.BayaanTheme.cssVar("--chart-7")'],
  ['"#5EEAD4"', 'window.BayaanTheme.cssVar("--chart-8")'],
  ['"#2563eb"', 'window.BayaanTheme.cssVar("--blue-600")'],
  ['"#2563EB"', 'window.BayaanTheme.cssVar("--blue-600")'],
  ['"#0066FF"', 'window.BayaanTheme.cssVar("--accent")'],
  ['"#0066ff"', 'window.BayaanTheme.cssVar("--accent")'],
  ['"#1d9e75"', 'window.BayaanTheme.cssVar("--teal-400")'],
  ['"#1D9E75"', 'window.BayaanTheme.cssVar("--teal-400")'],
  ['"#378add"', 'window.BayaanTheme.cssVar("--blue-400")'],
  ['"#378ADD"', 'window.BayaanTheme.cssVar("--blue-400")'],
  ['"#dc2626"', 'window.BayaanTheme.cssVar("--red-400")'],
  ['"#DC2626"', 'window.BayaanTheme.cssVar("--red-400")'],
  ['"#d97706"', 'window.BayaanTheme.cssVar("--amber-400")'],
  ['"#D97706"', 'window.BayaanTheme.cssVar("--amber-400")'],
  ['"#059669"', 'window.BayaanTheme.cssVar("--success")'],
  ['"#10b981"', 'window.BayaanTheme.cssVar("--success")'],
  ['"#93c5fd"', 'window.BayaanTheme.cssVar("--blue-200")'],
  ['"#60a5fa"', 'window.BayaanTheme.cssVar("--blue-200")'],
  ['"#cbd5e1"', 'window.BayaanTheme.cssVar("--gray-300")'],
  ['"#9CA3AF"', 'window.BayaanTheme.cssVar("--text-tertiary")'],
  ['"#9ca3af"', 'window.BayaanTheme.cssVar("--text-tertiary")'],
  ['"#1E1E2E"', 'window.BayaanTheme.cssVar("--surface2")'],
  ['"#8B9EF9"', 'window.BayaanTheme.cssVar("--accent-mid")'],
  ['"#A8B6FB"', 'window.BayaanTheme.cssVar("--blue-200")'],
  ['"#C5CEFD"', 'window.BayaanTheme.cssVar("--chart-3")'],
  ['"#7c3aed"', 'window.BayaanTheme.cssVar("--purple")'],
  ['"#7C3AED"', 'window.BayaanTheme.cssVar("--purple")'],
  ['"#16a34a"', 'window.BayaanTheme.cssVar("--success")'],
  ['"#f59e0b"', 'window.BayaanTheme.cssVar("--warning")'],
  ['"#F59E0B"', 'window.BayaanTheme.cssVar("--warning")'],
  ['"#ef4444"', 'window.BayaanTheme.cssVar("--danger")'],
  ['"#EF4444"', 'window.BayaanTheme.cssVar("--danger")'],
  ['"#1d4ed8"', 'window.BayaanTheme.cssVar("--accent-dark")'],
  ['"#1D4ED8"', 'window.BayaanTheme.cssVar("--accent-dark")'],
  ['"#4F63FF"', 'window.BayaanTheme.cssVar("--chart-1")'],
  ['"#ba7517"', 'window.BayaanTheme.cssVar("--amber-400")'],
  ['"#BA7517"', 'window.BayaanTheme.cssVar("--amber-400")'],
  ['"#e24b4a"', 'window.BayaanTheme.cssVar("--red-400")'],
  ['"#E24B4A"', 'window.BayaanTheme.cssVar("--red-400")'],
  ['"#5dcaa5"', 'window.BayaanTheme.cssVar("--teal-200")'],
  ['"#5DCAA5"', 'window.BayaanTheme.cssVar("--teal-200")'],
];

const root = path.join(__dirname, "..");
let total = 0;
for (const rel of files) {
  const fp = path.join(root, rel);
  let text = fs.readFileSync(fp, "utf8");
  const before = (text.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).length;
  for (const [from, to] of REPLACEMENTS) {
    const parts = text.split(from);
    if (parts.length > 1) {
      text = parts.join(to);
    }
  }
  const after = (text.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).length;
  if (before !== after) {
    fs.writeFileSync(fp, text, "utf8");
    console.log(rel + ": " + before + " -> " + after);
    total += before - after;
  }
}
console.log("JS hex migrated:", total);
