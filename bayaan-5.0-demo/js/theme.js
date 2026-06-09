(function () {
  var THEME_KEY = "bayaan-theme";
  var base = window.BayaanTheme || {};

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function resolveColor(color) {
    if (!color) return color;
    if (color.indexOf("var(") === 0) {
      var m = color.match(/var\((--[^)]+)\)/);
      return m ? cssVar(m[1]) : color;
    }
    if (color.charAt(0) === "-" && color.charAt(1) === "-") return cssVar(color);
    return color;
  }

  function colorAlpha(color, alphaHex) {
    var c = resolveColor(color);
    if (!c || c.indexOf("var(") === 0) return "transparent";
    if (c.charAt(0) === "#") {
      var h = c.slice(1);
      if (h.length === 3)
        h = h
          .split("")
          .map(function (x) {
            return x + x;
          })
          .join("");
      if (h.length === 6) return "#" + h + alphaHex;
      if (h.length === 8) return "#" + h.slice(0, 6) + alphaHex;
    }
    return c;
  }

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light"
    );
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "bayaan-theme", theme: theme }, "*");
      }
    } catch (e) {}
  }

  function chartTheme() {
    return {
      surface: cssVar("--surface") || "#FFFFFF",
      textPrimary: cssVar("--text-primary") || "#0F172A",
      textSecondary: cssVar("--text-secondary") || "#475569",
      border: cssVar("--border-solid") || "#E5E7EB",
      tick: cssVar("--text-tertiary") || "#94A3B8",
      grid: cssVar("--surface2") || "#F1F5F9",
    };
  }

  function chartColor(n) {
    return cssVar("--chart-" + n) || cssVar("--accent");
  }

  function chartPalette(count) {
    var out = [];
    for (var i = 1; i <= (count || 8); i++) {
      out.push(chartColor(i));
    }
    return out;
  }

  window.BayaanTheme = {
    cssVar: cssVar,
    resolveColor: resolveColor,
    colorAlpha: colorAlpha,
    getTheme: getTheme,
    setTheme: setTheme,
    applyTheme: applyTheme,
    chartTheme: chartTheme,
    chartColor: chartColor,
    chartPalette: chartPalette,
  };

  applyTheme(getTheme());

  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "bayaan-theme") {
      applyTheme(e.data.theme);
    }
  });

  window.addEventListener("storage", function (e) {
    if (e.key === THEME_KEY) {
      applyTheme(e.newValue || "light");
    }
  });
})();
