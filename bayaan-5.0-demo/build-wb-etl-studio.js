/**
 * Extract ETL Pipeline Studio HTML + JS from bayaan 6.html into wb-etl-studio bundle.
 */
const fs = require("fs");
const path = require("path");

const srcPath = path.join(__dirname, "index.html");
const src = fs.readFileSync(srcPath, "utf8");
const lines = src.split(/\r?\n/);

function sliceLines(start, end) {
  return lines.slice(start - 1, end).join("\n");
}

// v-etl block (1-based line numbers from bayaan 6.html)
const html = sliceLines(6991, 8124);

// ETL engine JS (navigation through etlEscHtml)
const jsBody = sliceLines(15659, 16331);

const htmlOut = path.join(__dirname, "wb-etl-studio.html");
fs.writeFileSync(htmlOut, html.trim() + "\n", "utf8");

const bundle =
  "// ETL Pipeline Studio bundle\n" +
  "window.WB_ETL_STUDIO_HTML = " +
  JSON.stringify(html.trim()) +
  ";\n\n" +
  jsBody +
  "\n";

const jsOut = path.join(__dirname, "wb-etl-studio.js");
fs.writeFileSync(jsOut, bundle, "utf8");

console.log("Wrote", htmlOut, "(" + html.length + " chars)");
console.log("Wrote", jsOut);
