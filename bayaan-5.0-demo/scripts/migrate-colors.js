/**
 * Migrates hardcoded hex colors to CSS variables (skips token definition lines).
 * Run: node scripts/migrate-colors.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const FILES = [
  "style.css",
  "css/pages/ai.css",
  "css/pages/exec-home.css",
  "css/pages/cpi-obs.css",
  "css/pages/obs-sidebar.css",
  "settings-submenu.html",
  "index.html",
  "bayaan-workbench-v4.html",
  "wb-etl-studio.html",
  "geo-intelligence.html",
];

const BY_PROPERTY = {
  background: {
    "#f0f7ff": "var(--accent-light)",
    "#ecfdf5": "var(--teal-50)",
    "#d1fae5": "var(--teal-100)",
    "#86efac": "var(--teal-200)",
    "#fecaca": "var(--red-50)",
    "#fca5a5": "var(--red-400)",
    "#ef4444": "var(--danger)",
    "#f7c1c1": "var(--red-50)",
    "#f0f4f6": "var(--bg)",
    "#f7f8fa": "var(--gray-50)",
    "#fffdf7": "var(--amber-50)",
    "#fafafa": "var(--gray-50)",
    "#fce8e8": "var(--red-50)",
    "#ccfbf1": "var(--teal-50)",
    "#ffedd5": "var(--amber-50)",
    "#fff1f2": "var(--red-50)",
    "#eaf3de": "var(--teal-50)",
    "#e8edf5": "var(--gov-surface)",
    "#e6eef8": "var(--sky-bg)",
    "#e0e7ff": "var(--purple-bg)",
    "#6b7eff": "var(--chart-indigo)",
    "#1249b0": "var(--blue-800)",
    "#1e3a5f": "var(--blue-900)",
    "#1e40af": "var(--blue-800)",
    "#3b82f6": "var(--blue-600)",
    "#0f6e56": "var(--teal-600)",
    "#1d9e75": "var(--teal-400)",
    "#059669": "var(--success)",
    "#10b981": "var(--success)",
    "#d97706": "var(--amber-400)",
    "#f59e0b": "var(--warning)",
    "#dc2626": "var(--red-400)",
    "#e24b4a": "var(--red-400)",
    "#f3f4f6": "var(--gray-100)",
    "#dbeafe": "var(--blue-50)",
    "#e1f5ee": "var(--teal-50)",
    "#f0fdf4": "var(--teal-50)",
    "#f4c0d1": "var(--pink-bg)",
    "#0052cc": "var(--accent-dark)",
    "#0b5394": "var(--gov-link)",
    "#b45309": "var(--amber-text)",
    "#081528": "var(--navy-deep)",
    "#f8fbff": "var(--gray-50)",
    "#fafbff": "var(--gray-50)",
    "#f8f9fa": "var(--gray-50)",
    "#fff7ed": "var(--amber-50)",
    "#fdf4ff": "var(--purple-bg)",
    "#001a35": "var(--footer-bg)",
    "#1a1d2e": "var(--panel-dark)",
    "#f4f6f8": "var(--surface-muted)",
    "#f0f4f8": "var(--surface-muted)",
    "#eef0f3": "var(--bg)",
    "#0b1f3a": "var(--footer-bg)",
    "#f0f1f3": "var(--gray-100)",
    "#e8ecf0": "var(--border-solid)",
    "#e8ecf1": "var(--border-solid)",
    "#e8eaed": "var(--border-solid)",
    "#eef0f3": "var(--bg)",
    "#eeeeee": "var(--gray-200)",
    "#bae6fd": "var(--blue-100)",
    "#e0f2fe": "var(--sky-bg)",
    "#fef3c7": "var(--amber-50)",
    "#fecaca": "var(--red-50)",
  },
  color: {
    "#065f46": "var(--teal-800)",
    "#047857": "var(--teal-600)",
    "#7a1f1f": "var(--danger-text)",
    "#8891a4": "var(--gov-muted)",
    "#0b5394": "var(--gov-link)",
    "#0d1117": "var(--text-primary)",
    "#0d9488": "var(--teal-400)",
    "#328df1": "var(--accent)",
    "#7ec8ff": "var(--sky-text)",
    "#1e40af": "var(--blue-800)",
    "#3b6d11": "var(--success-dark)",
    "#639922": "var(--success-dark)",
    "#0a3d7a": "var(--sky-text)",
    "#4338ca": "var(--purple)",
    "#8b5cf6": "var(--purple)",
    "#7b47f1": "var(--purple)",
    "#7c3aed": "var(--purple)",
    "#6d28d9": "var(--purple)",
    "#5930c4": "var(--purple)",
    "#4f63ff": "var(--chart-indigo)",
    "#0b1c3d": "var(--gov-navy)",
    "#c2410c": "var(--amber-600)",
    "#ef4444": "var(--danger)",
    "#374151": "var(--text-secondary)",
    "#475569": "var(--text-secondary)",
    "#54585b": "var(--figma-grey-400)",
    "#9295aa": "var(--text-tertiary)",
    "#a32d2d": "var(--red-600)",
    "#0066ff": "var(--accent)",
    "#0052cc": "var(--accent-dark)",
    "#059669": "var(--success)",
    "#dc2626": "var(--red-400)",
    "#d97706": "var(--amber-400)",
    "#b45309": "var(--amber-text)",
    "#1d9e75": "var(--teal-400)",
    "#0f6e56": "var(--teal-600)",
    "#93c5fd": "var(--blue-200)",
    "#bfdbfe": "var(--blue-100)",
    "#000": "var(--text-primary)",
    "#0060c9": "var(--accent)",
    "#f59e0b": "var(--warning)",
    "#1547c0": "var(--accent-dark)",
    "#92400e": "var(--amber-600)",
    "#166534": "var(--teal-800)",
    "#7e22ce": "var(--purple)",
    "#be123c": "var(--red-400)",
    "#1a56db": "var(--blue-600)",
    "#ea580c": "var(--amber-600)",
    "#0f2744": "var(--gov-navy)",
    "#272829": "var(--text-primary)",
    "#54585b": "var(--figma-grey-400)",
    "#1d4ed8": "var(--accent-dark)",
    "#1a56db": "var(--blue-600)",
    "#3b82f6": "var(--blue-600)",
    "#0891b2": "var(--sky-text)",
    "#60a5fa": "var(--blue-200)",
    "#99c2ff": "var(--accent-mid)",
    "#9292ff": "var(--chart-indigo)",
    "#3295ff": "var(--accent)",
    "#f59e0b": "var(--warning)",
    "#ef4444": "var(--danger)",
    "#e5e7eb": "var(--border-solid)",
    "#d1d5db": "var(--gray-300)",
    "#0066ff": "var(--accent)",
  },
  "border-color": {
    "#dbeafe": "var(--blue-50)",
    "#639922": "var(--success-dark)",
    "#93c5fd": "var(--blue-200)",
    "#bfdbfe": "var(--blue-100)",
    "#bbf7d0": "var(--teal-100)",
    "#ea580c": "var(--amber-600)",
  },
  "border-top-color": {
    "#ea580c": "var(--amber-600)",
  },
  "background-color": {
    "#fafafa": "var(--gray-50)",
    "#0052cc": "var(--accent-dark)",
  },
};

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isTokenDefinitionLine(line) {
  return /^\s*--[\w-]+\s*:/.test(line);
}

function replacePropColors(text, prop, map) {
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  return text
    .split("\n")
    .map((line) => {
      if (isTokenDefinitionLine(line)) return line;
      let out = line;
      for (const hex of keys) {
        const re = new RegExp(
          "(" + escapeRe(prop) + "\\s*:\\s*)" + escapeRe(hex) + "\\b",
          "gi"
        );
        out = out.replace(re, "$1" + map[hex]);
      }
      return out;
    })
    .join("\n");
}

function migrateContent(content) {
  let text = content;
  for (const [prop, map] of Object.entries(BY_PROPERTY)) {
    text = replacePropColors(text, prop, map);
  }
  return text;
}

let total = 0;
for (const rel of FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) continue;
  const before = fs.readFileSync(fp, "utf8");
  const after = migrateContent(before);
  if (before !== after) {
    fs.writeFileSync(fp, after, "utf8");
    const n = (before.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).length;
    const n2 = (after.match(/#[0-9A-Fa-f]{3,8}\b/g) || []).length;
    console.log(rel + ": " + n + " -> " + n2 + " (" + (n - n2) + " migrated)");
    total += n - n2;
  }
}
console.log("Total migrated:", total);
