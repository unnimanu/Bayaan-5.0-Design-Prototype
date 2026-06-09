/* Shared LMO embed navigation + breadcrumb (used across all LMO pages) */
(function () {
  const EMBED_QS = new URLSearchParams(location.search).get("embed") === "1";

  /* Apply embed class before first paint so nested iframe sidebars never flash */
  if (EMBED_QS) {
    document.documentElement.classList.add("lmo-embed");
    if (document.body) document.body.classList.add("embed");
    else
      document.addEventListener("DOMContentLoaded", () =>
        document.body.classList.add("embed")
      );
  }

  const LMO_PAGES = {
    briefing: "lmo-briefing-desk.html",
    observe: "lmo-observe.html",
    diagnose: "lmo-diagnose.html",
    forecasting: "lmo-forecasting_v2.html",
    simulation: "lmo-simulation.html",
  };

  function isEmbed() {
    /* Only nested sub-views (observe/diagnose/forecast in briefing iframes).
       The main LMO shell stays in index.html's iframe but keeps its sidebar. */
    return new URLSearchParams(location.search).get("embed") === "1";
  }

  function postToHost(data) {
    if (window.parent !== window) window.parent.postMessage(data, "*");
  }

  function lmoGoHome(e) {
    if (e) e.preventDefault();
    if (window.parent !== window) {
      postToHost({ type: "lmo-breadcrumb", target: "home" });
      return;
    }
    location.href = "../index.html";
  }

  function lmoGoObservatory(e) {
    if (e) e.preventDefault();
    if (window.parent !== window) {
      postToHost({ type: "lmo-breadcrumb", target: "observatory" });
      return;
    }
    location.href = "../index.html?screen=screen-observatories";
  }

  function initLmoNav() {
    document.querySelectorAll("[data-lmo-nav]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const view = btn.dataset.lmoNav;
        if (window.parent !== window) {
          postToHost({ type: "lmo-nav", view });
        } else if (LMO_PAGES[view]) {
          location.href = LMO_PAGES[view];
        }
      });
    });
  }

  function initLmoBreadcrumb() {
    document.querySelectorAll("[data-lmo-bc]").forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = link.dataset.lmoBc;
        if (target === "home") lmoGoHome(e);
        else if (target === "observatory") lmoGoObservatory(e);
      });
    });
  }

  function reportEmbedHeight() {
    if (!document.body.classList.contains("embed") || window.parent === window)
      return;
    postToHost({
      type: "lmo-embed-resize",
      height: document.documentElement.scrollHeight,
    });
  }

  function embedQuery() {
    const params = new URLSearchParams();
    if (isEmbed()) params.set("embed", "1");
    const qs = params.toString();
    return qs ? "?" + qs : "";
  }

  function goToObserve(e) {
    if (e) e.preventDefault();
    location.href = "lmo-observe.html" + embedQuery();
  }

  function goToIndicator(id) {
    const params = new URLSearchParams();
    if (isEmbed()) params.set("embed", "1");
    params.set("id", id);
    location.href = "lmo-indicator-detail.html?" + params.toString();
  }

  function stripEmbedChrome() {
    if (!isEmbed()) return;
    document.querySelectorAll(".lsb-rail, .nav").forEach((el) => el.remove());
  }

  function initLmoEmbed() {
    if (isEmbed()) {
      document.documentElement.classList.add("lmo-embed");
      document.body.classList.add("embed");
      stripEmbedChrome();
    }
    initLmoNav();
    initLmoBreadcrumb();
  }

  function escAttr(s) {
    return String(s ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, "&quot;");
  }

  function AIB(ctx, title) {
    return `<button type="button" class="ai-btn" title="Ask Bayaan AI" aria-label="Ask Bayaan AI" onclick="event.stopPropagation();openChat('${escAttr(ctx)}','${escAttr(title)}')"><i class="ti ti-sparkles" aria-hidden="true"></i></button>`;
  }

  window.escAttr = escAttr;
  window.AIB = AIB;

  window.LMO = {
    isEmbed,
    initLmoEmbed,
    initLmoBreadcrumb,
    reportEmbedHeight,
    lmoGoHome,
    lmoGoObservatory,
    goToObserve,
    goToIndicator,
  };
})();
