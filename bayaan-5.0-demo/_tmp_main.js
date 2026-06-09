          page = Math.max(0, Math.min(idx, total - 1));
          track.style.transform = "translateX(-" + page * 100 + "%)";
          dots.forEach((dot, i) => dot.classList.toggle("active", i === page));
          if (prevBtn) prevBtn.disabled = page === 0;
          if (nextBtn) nextBtn.disabled = page === total - 1;
        }

        if (prevBtn)
          prevBtn.addEventListener("click", () => carouselGoTo(page - 1));
        if (nextBtn)
          nextBtn.addEventListener("click", () => carouselGoTo(page + 1));
        dots.forEach((dot, i) =>
          dot.addEventListener("click", () => carouselGoTo(i)),
        );
        wrap.querySelectorAll(".news-card").forEach((card) => {
          card.addEventListener("click", (e) => {
            if (e.target.closest(".news-carousel-btn, .news-carousel-dot"))
              return;
            card.style.borderColor = "#6293FF";
            setTimeout(() => {
              card.style.borderColor = "";
            }, 300);
          });
        });
        carouselGoTo(0);
      }

      const BAYAAN_SEARCH_PRODUCTS = [
        {
          idx: 3,
          cat: "Economy",
          catIcon: "ti-trending-up",
          name: "Gross domestic product at current prices — quarterly",
          val: "331.1k",
          change: "▲ 25.2k (8.0%) Yearly",
          changeClass: "val-green",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "Quarterly GDP rose 8% year-on-year, driven by non-oil sector expansion and strong Q2 performance at AED 306.3B.",
          baiCtx: "bsearch-gdp-quarterly",
          baiTitle: "GDP at Current Prices — Quarterly",
          baiIcon: "ti-chart-line",
        },
        {
          idx: 3,
          cat: "Economy",
          catIcon: "ti-chart-bar",
          name: "Gross domestic product by institutional sector at current prices",
          val: "104.4%",
          change: "▲ 0.04 (0.96%) Yearly",
          changeClass: "val-green",
          axis: ["Q1", "Q2", "Q3", "Q4", "Q1 25"],
          aiSummary:
            "Institutional-sector GDP shows which parts of the economy drive growth; compare quarter shifts to spot structural change.",
          baiCtx: "bsearch-gdp-sector",
          baiTitle: "GDP by Institutional Sector",
          baiIcon: "ti-chart-bar",
        },
        {
          idx: 2,
          cat: "Economy",
          catIcon: "ti-receipt",
          name: "Consumer Price Index — Abu Dhabi (All Groups)",
          val: "104.7",
          change: "▲ 0.04 (0.96%) Yearly",
          changeClass: "val-green",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "Headline CPI remains stable with modest annual growth; food and housing categories warrant monitoring for inflation risk.",
          baiCtx: "bsearch-cpi",
          baiTitle: "CPI — Abu Dhabi All Groups",
          baiIcon: "ti-receipt",
        },
      ];

      function productChangeClass(p) {
        const c = p.changeClass || "val-green";
        if (c === "up") return "val-green";
        if (c === "down") return "val-red";
        return c;
      }

      function formatProductVal(val) {
        if (val == null || val === "") return val;
        return String(val).replace(/\s+Percentage\b/gi, "%");
      }

      let homeProductsBase = null;
      let homeProductsTab = "official";
      const HOME_ANALYST_PRODUCTS_LIMIT = 4;

      const USE_CASE_PRODUCTS = [
        {
          idx: 0,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "Consumer Spending (Visa)",
          val: "10.8B AED",
          change: "▲ 1.2B (12.5%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "The analytical app is based on Visa data. It is intended to work as an insights discovery tool to analyse consumer spending patterns.",
        },
        {
          idx: 1,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "Consumer Spending Share Of GDP - Quarterly",
          val: "11.94%",
          change: "▲ 0.04 (0.96%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["Q1", "Q2", "Q3", "Q4", "Q1 25"],
          aiSummary:
            "Consumer Spending, also known as Personal consumption expenditures (PCE), is a measure of the spending on goods and services by households.",
        },
        {
          idx: 2,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "E-Commerce Insights",
          val: "4.2B AED",
          change: "▲ 0.6B (16.7%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary: "E-Commerce Insights",
        },
        {
          idx: 3,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "Economy Complexity Index - Optimization Tool",
          val: "1.24 Index",
          change: "▲ 0.08 (6.9%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["2019", "2020", "2021", "2022", "2023", "2024"],
          aiSummary:
            "This analytical app evaluates Abu Dhabi's optimal and efficient future export structure by identifying key sectors and related products.",
        },
        {
          idx: 4,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "Payment Cards Dashboard",
          val: "25.1B AED",
          change: "▲ 2.1B (9.2%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "Consumer Spending Inside and Outside Abu Dhabi Economy",
        },
        {
          idx: 5,
          cat: "Economy",
          catIcon: "ti-chart-line",
          name: "PMI- Purchasing Mangers Index",
          val: "52.65 Index",
          change: "▲ 1.02 (2.0%) Yearly",
          changeClass: "val-green",
          useCaseTag: "Insights Discovery",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "This analytical app is based on IHS Markit data for Abu Dhabi, Dubai and UAE. This tool is intended as an insight discovery tool for PMI trends.",
        },
      ];

      const DASHBOARD_PRODUCTS = [
        {
          idx: 0,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Annual GDP",
          val: "141.68",
          change: "Annual Gross Domestic Product",
          aiSummary: "Annual Gross Domestic Product",
          vizType: "dashboard-thumb",
        },
        {
          idx: 1,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "COLI Dashboard",
          val: "1 Index",
          change: "Cost of Living Index",
          aiSummary: "Cost of Living Index",
          vizType: "dashboard-thumb",
        },
        {
          idx: 2,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Consumer Price Index (CPI) Dashboard",
          val: "106.3 Index",
          change: "Consumer Price Index (CPI) Dashboard",
          aiSummary: "Consumer Price Index (CPI) Dashboard",
          vizType: "dashboard-thumb",
        },
        {
          idx: 3,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Foreign Trade",
          val: "20.5K Million AED",
          change: "A dashboard that presents abudhabi foreign trade statistics",
          aiSummary:
            "A dashboard that presents abudhabi foreign trade statistics",
          vizType: "dashboard-thumb",
        },
        {
          idx: 4,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Length Of Stay (Mastercard)",
          val: "676.26 AED",
          change:
            "The analytical app is based on Mastercard data. It is intended to work as an insights discovery tool to analyse consumer…",
          aiSummary:
            "The analytical app is based on Mastercard data. It is intended to work as an insights discovery tool to analyse consumer spending and tourism patterns.",
          vizType: "dashboard-thumb",
        },
        {
          idx: 5,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "PMI Dashboard",
          val: "51.69%",
          change: "Abu Dhabi PMI Whole Economy Seasonal Adjusted.",
          aiSummary: "Abu Dhabi PMI Whole Economy Seasonal Adjusted.",
          vizType: "dashboard-thumb",
        },
        {
          idx: 6,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Quarterly GDP",
          val: "295.3K Million AED",
          change: "Quarterly GDP Dashboard",
          aiSummary: "Quarterly GDP Dashboard",
          vizType: "dashboard-thumb",
        },
        {
          idx: 7,
          cat: "Economy",
          catIcon: "ti-layout-dashboard",
          name: "Regional Statistics - Economy",
          val: "",
          change: "Regional Statistics - Economy",
          aiSummary: "Regional Statistics - Economy",
          vizType: "dashboard-thumb",
        },
      ];

      function mapHomeProductsForTab(products, tab) {
        if (tab === "dashboard") {
          return DASHBOARD_PRODUCTS.map((p, i) => ({
            ...p,
            idx: p.idx != null ? p.idx : i,
          }));
        }
        if (tab === "usecase") {
          return USE_CASE_PRODUCTS.map((p, i) => ({
            ...p,
            idx: p.idx != null ? p.idx : i,
          }));
        }
        if (!products || !products.length) return [];
        return products.map((p, i) => {
          const base = { ...p, idx: p.idx != null ? p.idx : i };
          return base;
        });
      }

      function refreshHomeProductsModules() {
        const base =
          homeProductsBase ||
          HOME_WS_CONTENT[currentWs?.code || "EL"]?.products ||
          HOME_WS_CONTENT.EL.products;
        const mapped = mapHomeProductsForTab(base, homeProductsTab);
        const homeGrid = document.getElementById("homeProductsGrid");
        if (homeGrid) {
          renderProductCardsGrid(
            homeGrid,
            mapped.slice(0, HOME_ANALYST_PRODUCTS_LIMIT),
          );
        }
        const editorGrid = document.getElementById("editorProductsGrid");
        if (editorGrid) renderProductCardsGrid(editorGrid, mapped);
      }

      function syncHomeProductsTabChips() {
        document
          .querySelectorAll(".home-products-module [data-home-prod-tab]")
          .forEach((chip) => {
            chip.classList.toggle(
              "active",
              chip.dataset.homeProdTab === homeProductsTab,
            );
          });
      }

      function initHomeProductsTabs() {
        document.querySelectorAll(".home-products-module .prod-tabs").forEach((tabs) => {
          if (tabs.dataset.homeProdTabsBound) return;
          tabs.dataset.homeProdTabsBound = "1";
          tabs.querySelectorAll("[data-home-prod-tab]").forEach((chip) => {
            chip.addEventListener("click", () => {
              homeProductsTab = chip.dataset.homeProdTab || "official";
              syncHomeProductsTabChips();
              refreshHomeProductsModules();
            });
            chip.addEventListener("keydown", (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                chip.click();
              }
            });
          });
        });
        syncHomeProductsTabChips();
      }

      let homeFavouritesTab = "indicators";
      const HOME_FAVOURITES_LIMIT = 4;
      let homeFavouritesStore = null;

      function favItemSlug(text) {
        return String(text || "")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }

      function buildBookmarkIconHTML(favId, isSaved, variant) {
        const title = isSaved
          ? "Remove from favourites"
          : "Add to favourites";
        const savedCls = isSaved ? " is-saved" : "";
        const dataAttr = isSaved
          ? `data-fav-remove data-fav-id="${favId}"`
          : `data-obs-bookmark-add data-fav-id="${favId}"`;
        if (variant === "obs") {
          return `<button type="button" class="obs-list-bookmark${savedCls}" ${dataAttr} onclick="event.stopPropagation()" title="${title}" aria-label="${title}"><i class="ti ti-bookmark"></i></button>`;
        }
        const variantCls =
          variant === "inline" ? " card-bookmark--inline" : "";
        return `<i class="ti ti-bookmark card-bookmark${variantCls}${savedCls}" ${dataAttr} onclick="event.stopPropagation()" title="${title}" role="button" tabindex="0" aria-label="${title}"></i>`;
      }

      function isObsCardBookmarked(favId) {
        if (!homeFavouritesStore) initHomeFavouritesStore();
        return homeFavouritesStore.observatory.some((o) => o.favId === favId);
      }

      function extractObsCardMeta(card) {
        const name =
          card.querySelector(".obs-list-name")?.textContent?.trim() || "";
        const desc =
          card.querySelector(".obs-list-desc")?.textContent?.trim() || "";
        const iconWrap = card.querySelector(".obs-list-icon");
        const iconClass =
          iconWrap?.className
            .split(/\s+/)
            .find((c) => c !== "obs-list-icon") || "cpi";
        const iconMatch = card
          .querySelector(".obs-list-icon i")
          ?.className.match(/ti-[a-z0-9-]+/);
        const icon = iconMatch ? iconMatch[0] : "ti-chart-line";
        const onClick = card.getAttribute("onclick") || "";
        const kpis = [...card.querySelectorAll(".obs-kpi-box")].map((box) => {
          const chgEl = box.querySelector(".obs-kpi-chg");
          let chgClass = "";
          if (chgEl?.classList.contains("up")) chgClass = "up";
          else if (chgEl?.classList.contains("down")) chgClass = "down";
          return {
            label: box.querySelector(".obs-kpi-lbl")?.textContent?.trim() || "",
            value: box.querySelector(".obs-kpi-num")?.textContent?.trim() || "",
            change: chgEl?.textContent?.trim() || "",
            chgClass,
          };
        });
        const favId = `observatory-${favItemSlug(name)}`;
        const catalog = HOME_FAV_OBS_ITEMS.find(
          (o) => favItemSlug(o.name) === favItemSlug(name),
        );
        return {
          favId,
          name,
          desc: desc || catalog?.desc || "",
          iconClass,
          icon: catalog?.icon || icon,
          onClick: catalog?.onClick || onClick,
          kpis: kpis.length ? kpis : catalog?.kpis || [],
        };
      }

      function syncObsListBookmarkButtons(favId, isSaved) {
        document
          .querySelectorAll(`.obs-list-bookmark[data-fav-id="${favId}"]`)
          .forEach((btn) => {
            btn.classList.toggle("is-saved", isSaved);
            const title = isSaved
              ? "Remove from favourites"
              : "Add to favourites";
            btn.title = title;
            btn.setAttribute("aria-label", title);
            if (isSaved) {
              btn.setAttribute("data-fav-remove", "");
              btn.removeAttribute("data-obs-bookmark-add");
            } else {
              btn.setAttribute("data-obs-bookmark-add", "");
              btn.removeAttribute("data-fav-remove");
            }
          });
      }

      function addObservatoryToFavourites(favId, cardEl) {
        if (!homeFavouritesStore) initHomeFavouritesStore();
        if (isObsCardBookmarked(favId)) return;
        const meta = cardEl ? extractObsCardMeta(cardEl) : null;
        if (!meta) return;
        homeFavouritesStore.observatory.push(meta);
        syncObsListBookmarkButtons(favId, true);
        if (homeFavouritesTab === "observatory") refreshHomeFavouritesModules();
        toast("Added to My Favourites", "ti-bookmark");
      }

      function removeObservatoryFromFavourites(favId) {
        if (!homeFavouritesStore) return;
        const list = homeFavouritesStore.observatory;
        const idx = list.findIndex((item) => item.favId === favId);
        if (idx === -1) return;
        list.splice(idx, 1);
        syncObsListBookmarkButtons(favId, false);
        if (homeFavouritesTab === "observatory") refreshHomeFavouritesModules();
        toast("Removed from My Favourites", "ti-bookmark");
      }

      function initObsListCardBookmarks() {
        document.querySelectorAll(".obs-list-card").forEach((card) => {
          if (card.closest(".home-favourites-module")) return;
          const actions = card.querySelector(".obs-list-actions");
          if (!actions || actions.querySelector(".obs-list-bookmark")) return;
          const meta = extractObsCardMeta(card);
          const isSaved = isObsCardBookmarked(meta.favId);
          const html = buildBookmarkIconHTML(meta.favId, isSaved, "obs");
          const ext = actions.querySelector(".obs-list-ext");
          if (ext) {
            ext.insertAdjacentHTML("beforebegin", html);
          } else {
            const sparkle = actions.querySelector(".obs-list-sparkle");
            if (sparkle) sparkle.insertAdjacentHTML("afterend", html);
            else actions.insertAdjacentHTML("beforeend", html);
          }
        });
      }

      function initObsListBookmarkHandlers() {
        if (document.body.dataset.obsBookmarkHandlersBound) return;
        document.body.dataset.obsBookmarkHandlersBound = "1";
        document.addEventListener("click", (e) => {
          const addBtn = e.target.closest("[data-obs-bookmark-add]");
          if (addBtn && !addBtn.closest(".home-favourites-module")) {
            e.preventDefault();
            e.stopPropagation();
            addObservatoryToFavourites(
              addBtn.dataset.favId,
              addBtn.closest(".obs-list-card"),
            );
            return;
          }
          const removeBtn = e.target.closest("[data-fav-remove]");
          if (
            removeBtn &&
            removeBtn.classList.contains("obs-list-bookmark") &&
            !removeBtn.closest(".home-favourites-module")
          ) {
            e.preventDefault();
            e.stopPropagation();
            removeObservatoryFromFavourites(removeBtn.dataset.favId);
          }
        });
      }

      function buildFavouritesEmptyHTML() {
        return `<div class="home-favourites-empty">
    <i class="ti ti-bookmark card-bookmark is-static" aria-hidden="true"></i>
    <p>No favourites in this tab yet.</p>
    <span class="home-favourites-empty-hint">Bookmark items from across Bayaan to quick-access them here.</span>
  </div>`;
      }

      const HOME_FAV_OBS_ITEMS = [
        {
          iconClass: "cpi",
          icon: "ti-shopping-cart",
          name: "Consumer Price Index",
          desc: "The AI-enabled Abu Dhabi CPI provides automated narratives and actionable recommendations on inflation.",
          onClick: "openCpiObservatory(event)",
          kpis: [
            {
              label: "Overall",
              value: "109.86",
              change: "▲ +1.08 (1.0%) Monthly",
              chgClass: "up",
            },
            {
              label: "Essential CPI",
              value: "111.2",
              change: "▲ +0.42 (0.4%) Monthly",
              chgClass: "up",
            },
          ],
        },
        {
          iconClass: "crisis",
          icon: "ti-shield",
          name: "Crisis Intelligence",
          desc: "Monitors geopolitical, economic, and supply-chain risks with real-time alerts and scenario modelling.",
          onClick: "openCrisisObservatory(event)",
          kpis: [
            {
              label: "Risk Score",
              value: "42.6",
              change: "▼ −3.20 (−7.0%) Monthly",
              chgClass: "down",
            },
            {
              label: "Active Alerts",
              value: "7",
              change: "▲ +2.00 Monthly",
              chgClass: "up",
            },
          ],
        },
        {
          iconClass: "social",
          icon: "ti-scale",
          name: "Social",
          desc: "Tracks social development indicators across Abu Dhabi's communities, covering education, health, and housing.",
          kpis: [
            {
              label: "Well-being Index",
              value: "74.3",
              change: "▲ +1.8 (2.5%) Quarterly",
              chgClass: "up",
            },
            {
              label: "Education Rate",
              value: "91.2%",
              change: "▲ 0.40% Quarterly",
              chgClass: "up",
            },
          ],
        },
        {
          iconClass: "household",
          icon: "ti-home",
          name: "Household Income and Expenditure",
          desc: "Analyses income distribution and spending patterns across Abu Dhabi households.",
          kpis: [
            {
              label: "Avg. Monthly Income",
              value: "AED 21.4K",
              change: "▲ +1.2K (5.9%) Yearly",
              chgClass: "up",
            },
            {
              label: "Avg. Expenditure",
              value: "AED 14.8K",
              change: "▲ +0.6K (4.2%) Yearly",
              chgClass: "up",
            },
          ],
        },
      ];

      const HOME_FAV_FREQUENT_ITEMS = [
        {
          iconBg: "#fef9c3",
          iconColor: "#ca8a04",
          icon: "ti-layout-dashboard",
          title: "Q2 Labour Market Dashboard",
          sub: "Last opened 2 hours ago · 4 visits this week",
          actionLabel: "Resume",
          actionIcon: "ti-arrow-right",
        },
        {
          iconBg: "#dbeafe",
          iconColor: "#2563eb",
          icon: "ti-chart-line",
          title: "Non-oil GDP — Quarterly Trend",
          sub: "Viewed yesterday · bookmarked indicator, exploration unfinished",
          actionLabel: "Continue",
          actionIcon: "ti-search",
        },
        {
          iconBg: "#e0f2fe",
          iconColor: "#0284c7",
          icon: "ti-file-text",
          title: "Construction Cost Inflation — Policy Brief",
          sub: "Draft generated by AI Agent · opened 3 times this week",
          actionLabel: "Review",
          actionIcon: "ti-eye",
        },
        {
          iconBg: "#ede9fe",
          iconColor: "#7c3aed",
          icon: "ti-shopping-cart",
          title: "CPI Essential Basket Widget",
          sub: "Pinned widget · accessed daily · last visit today 09:14",
          actionLabel: "Open",
          actionIcon: "ti-external-link",
        },
      ];

      function seedHomeFavouritesIndicators() {
        if (!homeFavouritesStore) return;
        const wsProducts =
          homeProductsBase ||
          HOME_WS_CONTENT[currentWs?.code || "EL"]?.products ||
          HOME_WS_CONTENT.EL.products;
        homeFavouritesStore.indicators = (wsProducts || [])
          .slice(0, HOME_FAVOURITES_LIMIT)
          .map((p, i) => ({
            ...p,
            idx: p.idx != null ? p.idx : i,
            favId: `indicators-${favItemSlug(p.name || i)}`,
          }));
      }

      function seedHomeFavouritesDashboards() {
        if (!homeFavouritesStore) return;
        homeFavouritesStore.dashboards = DASHBOARD_PRODUCTS.slice(
          0,
          HOME_FAVOURITES_LIMIT,
        ).map((p, i) => ({
          ...p,
          idx: p.idx != null ? p.idx : i,
          favId: `dashboards-${favItemSlug(p.name || i)}`,
        }));
      }

      function initHomeFavouritesStore() {
        homeFavouritesStore = {
          indicators: [],
          dashboards: [],
          observatory: HOME_FAV_OBS_ITEMS.map((o, i) => ({
            ...o,
            favId: `observatory-${favItemSlug(o.name || i)}`,
          })),
          frequent: HOME_FAV_FREQUENT_ITEMS.map((f, i) => ({
            ...f,
            favId: `frequent-${favItemSlug(f.title || i)}`,
          })),
        };
        seedHomeFavouritesIndicators();
        seedHomeFavouritesDashboards();
      }

      function buildHomeObsListCardHTML(o) {
        const clickAttr = o.onClick ? ` onclick="${o.onClick}"` : "";
        const extClick = o.onClick
          ? ` onclick="event.stopPropagation(); ${o.onClick}"`
          : "";
        const bookmarkBtn = o.favId
          ? buildBookmarkIconHTML(o.favId, true, "obs")
          : "";
        const kpis = (o.kpis || [])
          .map(
            (k) => `<div class="obs-kpi-box">
      <div class="obs-kpi-lbl">${k.label}</div>
      <div class="obs-kpi-num">${k.value}</div>
      <div class="obs-kpi-chg ${k.chgClass || ""}">${k.change}</div>
    </div>`,
          )
          .join("");
        return `<article class="obs-list-card"${clickAttr}>
    <div class="obs-list-top">
      <div class="obs-list-hd">
        <div class="obs-list-icon ${o.iconClass}"><i class="ti ${o.icon}"></i></div>
        <div class="obs-list-actions">
          <button type="button" class="obs-list-sparkle" onclick="event.stopPropagation()" title="Ask Bayaan AI"><i class="ti ti-sparkles"></i></button>
          ${bookmarkBtn}
          <button type="button" class="obs-list-ext"${extClick} title="Open"><i class="ti ti-arrow-up-right"></i></button>
        </div>
      </div>
      <div class="obs-list-name">${o.name}</div>
      <p class="obs-list-desc">${o.desc}</p>
    </div>
    <div class="obs-list-kpis">${kpis}</div>
  </article>`;
      }

      function buildFrequentAccessItemHTML(item) {
        const bookmarkBtn = item.favId
          ? buildBookmarkIconHTML(item.favId, true, "inline")
          : "";
        return `<div class="continue-item card-hover">
    <div class="continue-icon" style="background:${item.iconBg}">
      <i class="ti ${item.icon}" style="color:${item.iconColor}"></i>
    </div>
    <div style="flex:1;min-width:0">
      <div class="continue-title">${item.title}</div>
      <div class="continue-sub">${item.sub}</div>
    </div>
    ${bookmarkBtn}
    <div class="continue-action">
      <button type="button" class="btn btn-continue btn-sm">
        <i class="ti ${item.actionIcon}"></i> ${item.actionLabel}
      </button>
    </div>
  </div>`;
      }

      function getHomeFavouritesForTab(tab) {
        if (!homeFavouritesStore) initHomeFavouritesStore();
        return homeFavouritesStore[tab] || [];
      }

      function applyFavBookmarkToProductCards(grid, items) {
        if (!grid || !items?.length) return;
        grid.querySelectorAll(".product-card").forEach((card, i) => {
          const item = items[i];
          if (!item?.favId) return;
          const bookmark = card.querySelector(".product-actions .ti-bookmark");
          if (!bookmark) return;
          bookmark.outerHTML = buildBookmarkIconHTML(item.favId, true);
        });
      }

      function renderHomeFavouritesPanel(container, tab) {
        if (!container) return;
        const items = getHomeFavouritesForTab(tab);
        if (!items.length) {
          container.className = "home-favourites-panel home-favourites-panel--empty";
          container.innerHTML = buildFavouritesEmptyHTML();
          return;
        }
        if (tab === "indicators" || tab === "dashboards") {
          container.className =
            "home-favourites-panel home-favourites-panel--products";
          container.innerHTML = '<div class="products-grid"></div>';
          const grid = container.querySelector(".products-grid");
          renderProductCardsGrid(grid, items);
          applyFavBookmarkToProductCards(grid, items);
          return;
        }
        if (tab === "observatory") {
          container.className =
            "home-favourites-panel home-favourites-panel--obs";
          container.innerHTML = `<div class="obs-carousel">${items.map(buildHomeObsListCardHTML).join("")}</div>`;
          if (typeof initBayaanAISparkles === "function") initBayaanAISparkles();
          return;
        }
        container.className =
          "home-favourites-panel home-favourites-panel--frequent";
        container.innerHTML = `<div class="continue-list home-favourites-frequent-list">${items.map(buildFrequentAccessItemHTML).join("")}</div>`;
      }

      function removeHomeFavourite(favId) {
        if (!homeFavouritesStore || !favId) return;
        const list = homeFavouritesStore[homeFavouritesTab];
        if (!list) return;
        const idx = list.findIndex((item) => item.favId === favId);
        if (idx === -1) return;
        list.splice(idx, 1);
        if (homeFavouritesTab === "observatory") {
          syncObsListBookmarkButtons(favId, false);
        }
        refreshHomeFavouritesModules();
        toast("Removed from My Favourites", "ti-bookmark");
      }

      function initHomeFavouritesRemoveHandlers() {
        document
          .querySelectorAll(".home-favourites-module")
          .forEach((module) => {
            if (module.dataset.favRemoveBound) return;
            module.dataset.favRemoveBound = "1";
            module.addEventListener("click", (e) => {
              const btn = e.target.closest("[data-fav-remove]");
              if (!btn) return;
              e.preventDefault();
              e.stopPropagation();
              removeHomeFavourite(btn.dataset.favId);
            });
          });
      }

      function refreshHomeFavouritesModules() {
        renderHomeFavouritesPanel(
          document.getElementById("homeFavouritesPanel"),
          homeFavouritesTab,
        );
        renderHomeFavouritesPanel(
          document.getElementById("editorFavouritesPanel"),
          homeFavouritesTab,
        );
        if (typeof refreshHomeAOS === "function") refreshHomeAOS();
      }

      function syncHomeFavouritesTabChips() {
        document
          .querySelectorAll(".home-favourites-module [data-home-fav-tab]")
          .forEach((chip) => {
            chip.classList.toggle(
              "active",
              chip.dataset.homeFavTab === homeFavouritesTab,
            );
          });
      }

      function initHomeFavouritesTabs() {
        initHomeFavouritesStore();
        initHomeFavouritesRemoveHandlers();
        document
          .querySelectorAll(
            ".home-favourites-module .prod-tabs, .home-favourites-module .prod-tabs--mb",
          )
          .forEach((tabs) => {
            if (tabs.dataset.homeFavTabsBound) return;
            tabs.dataset.homeFavTabsBound = "1";
            tabs.querySelectorAll("[data-home-fav-tab]").forEach((chip) => {
              chip.addEventListener("click", () => {
                homeFavouritesTab = chip.dataset.homeFavTab || "indicators";
                syncHomeFavouritesTabChips();
                refreshHomeFavouritesModules();
              });
              chip.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  chip.click();
                }
              });
            });
          });
        syncHomeFavouritesTabChips();
        refreshHomeFavouritesModules();
      }

      function buildProductVisualHTML(p, i) {
        if (p.vizType === "dashboard-thumb") {
          return `<img class="product-thumb" src="./assets/dashboard-thumb-0${(i % 4) + 1}.svg" alt="" />`;
        }
        const axis = p.axis || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        return `<div class="product-viz"></div>
    <div class="product-axis">${axis.map((m) => `<span>${m}</span>`).join("")}</div>`;
      }

      function buildProductCardHTML(p, i) {
        const idx = p.idx != null ? p.idx : i;
        const safeName = (p.name || "").replace(/"/g, "&quot;");
        return `<div class="card product-card card-hover" data-product-idx="${idx}" data-prod-name="${safeName}">
    <div class="product-card-toprow">
      <span class="product-cat-tag"><i class="ti ${p.catIcon || "ti-trending-up"}"></i> <span class="product-cat-text">${p.cat || "Economy"}</span></span>
      <div class="product-actions">
        <i class="ti ti-sparkles ai-sparkle-action" title="AI Summary"></i>
        <i class="ti ti-bookmark" title="Save"></i>
        <i class="ti ti-arrows-maximize" title="Expand"></i>
      </div>
    </div>
    <div class="product-name"></div>
    <div class="product-val"></div>
    <div class="product-change"></div>
    ${buildProductVisualHTML(p, i)}
    <div class="product-ai-row">
      <i class="ti ti-sparkles"></i>
      <span><span class="product-ai-lbl">AI Summary</span> <span class="product-ai-text"></span></span>
    </div>
  </div>`;
      }

      function initGlobalMarketIntel() {
        const board = document.getElementById("execSignalBoard");
        if (!board || board.dataset.ready) return;
        board.dataset.ready = "1";

        const metricSelect = document.getElementById("execSignalMetricSelect");
        const runGccTrendChart = initGccGdpTrendChart(board);

        function setExecSignalBoardTab(id) {
          board.querySelectorAll("[data-exec-sb-tab]").forEach((t) =>
            t.classList.toggle("active", t.dataset.execSbTab === id),
          );
          board.querySelectorAll("[data-exec-sb-panel]").forEach((panel) => {
            panel.hidden = panel.dataset.execSbPanel !== id;
          });
          if (metricSelect) metricSelect.hidden = id !== "ranking";
          if (id === "ranking" && runGccTrendChart) runGccTrendChart();
        }

        board.querySelectorAll("[data-exec-sb-tab]").forEach((tab) => {
          tab.addEventListener("click", () =>
            setExecSignalBoardTab(tab.dataset.execSbTab),
          );
        });

        const activeTab = board.querySelector("[data-exec-sb-tab].active");
        setExecSignalBoardTab(
          activeTab ? activeTab.dataset.execSbTab : "signals",
        );

        board.querySelectorAll(".exec-sig-card[data-exec-expand]").forEach((card) => {
          card.addEventListener("click", () => card.classList.toggle("is-expanded"));
        });
      }

      function initGccGdpTrendChart(board) {
        const wrap = board.querySelector("#execGccTrend");
        const canvas = board.querySelector("#execGccGdpChart");
        if (!wrap || !canvas || typeof Chart === "undefined") return null;

        let chartInstance = null;
        const quarters = ["Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"];
        const series = [
          { label: "Abu Dhabi", data: [2.6, 2.8, 3.0, 3.4], color: "#1a6fd4", dash: [], bw: 2.5, pr: 5 },
          { label: "Bahrain", data: [2.3, 2.5, 2.7, 2.9], color: "#2da87e", dash: [], bw: 2, pr: 4 },
          { label: "Saudi Arabia", data: [2.4, 2.4, 2.5, 2.6], color: "#e0873a", dash: [], bw: 2, pr: 4 },
          { label: "Qatar", data: [2.4, 2.3, 2.2, 2.1], color: "#a259d9", dash: [], bw: 2, pr: 4 },
          { label: "Kuwait", data: [1.9, 1.8, 1.8, 1.8], color: "#9eaab3", dash: [], bw: 2, pr: 4 },
          { label: "GCC avg", data: [2.3, 2.4, 2.6, 2.8], color: "#f4a623", dash: [6, 4], bw: 1.5, pr: 0 },
        ];
        const endLabels = series.filter((s) => s.label !== "GCC avg");

        return function runGccTrendChart() {
          if (chartInstance) {
            chartInstance.destroy();
            chartInstance = null;
          }
          chartInstance = new Chart(canvas.getContext("2d"), {
            type: "line",
            data: {
              labels: quarters,
              datasets: series.map((s) => ({
                label: s.label,
                data: s.data,
                borderColor: s.color,
                backgroundColor: "transparent",
                borderWidth: s.bw,
                borderDash: s.dash,
                pointBackgroundColor: s.color,
                pointBorderColor: "#fff",
                pointBorderWidth: 1.5,
                pointRadius: s.pr,
                pointHoverRadius: s.pr + 2,
                tension: 0.35,
              })),
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: { mode: "index", intersect: false },
              layout: { padding: { right: 56, top: 8 } },
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#fff",
                  borderColor: "#e0e3ec",
                  borderWidth: 1,
                  titleColor: "#0f1117",
                  bodyColor: "#5a6070",
                  padding: 10,
                  cornerRadius: 8,
                  callbacks: {
                    label: (c) => `  ${c.dataset.label}: ${c.parsed.y.toFixed(1)}%`,
                  },
                },
              },
              scales: {
                x: {
                  grid: { color: "rgba(0,0,0,0.05)", drawTicks: false },
                  border: { color: "rgba(0,0,0,0.08)" },
                  ticks: { color: "#9aa0b0", font: { size: 11 }, padding: 8 },
                },
                y: {
                  min: 1.2,
                  max: 4.2,
                  grid: { color: "rgba(0,0,0,0.05)" },
                  border: { display: false },
                  ticks: {
                    color: "#9aa0b0",
                    font: { size: 11 },
                    callback: (v) => v.toFixed(1) + "%",
                    padding: 8,
                  },
                },
              },
            },
            plugins: [{
              id: "execGccEndLabels",
              afterDatasetsDraw(chart) {
                const { ctx, scales: { x, y } } = chart;
                ctx.save();
                ctx.font = "500 11px ui-monospace, monospace";
                ctx.textAlign = "left";
                endLabels.forEach((s) => {
                  const val = s.data[s.data.length - 1];
                  const px = x.getPixelForValue(3);
                  const py = y.getPixelForValue(val);
                  ctx.fillStyle = s.color;
                  ctx.fillText(val.toFixed(1) + "%", px + 10, py + 4);
                });
                ctx.restore();
              },
            }],
          });
        };
      }

      function renderProductCardsGrid(grid, products) {
        if (!grid || !products || !products.length) {
          if (grid) grid.innerHTML = "";
          return;
        }
        grid.innerHTML = products
          .map((p, i) => buildProductCardHTML(p, i))
          .join("");
        populateProductGrid(grid, products);
        initProductChartsInGrid(grid);
        initProductCardNavigation();
      }

      function initBayaanSearchProducts() {
        renderProductCardsGrid(
          document.getElementById("bsearchProductsGrid"),
          BAYAAN_SEARCH_PRODUCTS,
        );
      }

      function openBayaanSearch(prefill) {
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        const screen = document.getElementById("screen-bayaan-search");
        if (!screen) return;
        const input = document.getElementById("bayaanSearchQuery");
        if (input && typeof prefill === "string") input.value = prefill;
        initBayaanSearchScreen();
        goTo("screen-bayaan-search");
        if (input) {
          if (typeof autoResize === "function") autoResize(input);
          input.focus();
          try {
            input.setSelectionRange(input.value.length, input.value.length);
          } catch (e) {}
        }
      }

      function openBayaanSearchFromHome(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        let q = "";
        const btn = e && e.currentTarget;
        const homeInput = document.getElementById("homeSearchInput");
        if (btn && btn.classList && btn.classList.contains("quick-prompt")) {
          const clone = btn.cloneNode(true);
          clone.querySelectorAll("i").forEach((el) => el.remove());
          q = (clone.textContent || "").trim();
        } else if (homeInput && homeInput.value.trim()) {
          q = homeInput.value.trim();
        } else if (
          btn &&
          btn.classList &&
          btn.classList.contains("search-send")
        ) {
          const qp = document.getElementById("qp1");
          if (qp) {
            const clone = qp.cloneNode(true);
            clone.querySelectorAll("i").forEach((el) => el.remove());
            q = (clone.textContent || "").trim();
          }
        }
        openBayaanSearch(
          q || "Summarize Abu Dhabi's GDP performance and trends.",
        );
      }

      window.openBayaanSearch = openBayaanSearch;
      window.openBayaanSearchFromHome = openBayaanSearchFromHome;

      function openCrisisObservatory(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        if (!document.getElementById("screen-crisis-obs")) return;
        goTo("screen-crisis-obs");
      }
      window.openCrisisObservatory = openCrisisObservatory;

      function buildObsSectionHdr(title, _icon, action) {
        const actionHtml = action
          ? `<span class="obs-section-action">${action} <i class="ti ti-arrow-right"></i></span>`
          : "";
        return `<div class="section-hdr">
  <div class="section-pip"></div>
  <h2>${title}</h2>
  ${actionHtml}
</div>`;
      }

      function buildIntelEngineHTML() {
        const today = new Date();
        const todayISO = [
          today.getFullYear(),
          String(today.getMonth() + 1).padStart(2, "0"),
          String(today.getDate()).padStart(2, "0"),
        ].join("-");
        return `<div class="intel-engine">
  <div class="intel-engine-head">
    <div class="intel-engine-head-main">
      <div class="intel-engine-icon"><i class="ti ti-brain"></i></div>
      <div>
        <div class="intel-engine-title">Daily Insights</div>
        <div class="intel-engine-sub">Real-time economic intelligence · Updated today</div>
      </div>
    </div>
    <label class="intel-engine-date">
      <span class="intel-engine-date-label">Date</span>
      <input type="date" class="intel-engine-date-input" id="cpiIntelEngineDate" value="${todayISO}" aria-label="Insights as of date" />
    </label>
  </div>
  <p class="intel-engine-body">UAE's <span class="hl-blue">Overall CPI</span> stands at <span class="hl-blue">109.86</span>, reflecting a <span class="hl-gold">+1.08% YoY increase</span> in March 2026. Housing remains the primary inflation driver at <span class="hl-green">+4.32%</span>, while transport eases. Essential inflation at 3.71% signals persistent structural pressures. Ready to generate policy brief.</p>
  <div class="intel-engine-tags">
    <span class="intel-tag intel-tag--gold">Housing Pressure</span>
    <span class="intel-tag intel-tag--green">Transport Easing</span>
    <span class="intel-tag intel-tag--blue">Food Stable</span>
    <span class="intel-tag intel-tag--purple">Policy Watch</span>
  </div>
</div>`;
      }

      function buildObsSparkline(points, cls) {
        return `<svg viewBox="0 0 100 32" preserveAspectRatio="none"><polyline class="${cls}" points="${points}"/></svg>`;
      }

      function buildObsKpiCard(k) {
        return `<div class="obs-card kpi-card kpi-card--${k.variant}">
  <div class="kpi-card-head">
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-badge kpi-badge--up"><i class="ti ti-arrow-up-right"></i> ${k.badge}</div>
  </div>
  <div class="kpi-value">${k.value}${k.unit ? `<small>${k.unit}</small>` : ""}</div>
  <div class="kpi-meta">${k.meta}</div>
  <div class="kpi-spark">${buildObsSparkline(k.spark, "sp-up")}</div>
</div>`;
      }

      function buildObsDriverCard(d) {
        return `<div class="obs-card driver-card">
  <div class="dc-head">
    <div class="dc-icon-wrap"><i class="ti ${d.icon}"></i></div>
    <div class="dc-title-col">
      <div class="dc-title">${d.title}</div>
      ${d.sub ? `<div class="dc-subtitle">${d.sub}</div>` : ""}
    </div>
    <div class="dc-date">${d.date}</div>
  </div>
  <div class="dc-value">${d.value}${d.unit ? `<small>${d.unit}</small>` : ""}</div>
  <div class="dc-changes">${d.changes}</div>
  <div class="dc-spark">${buildObsSparkline(d.spark, d.sparkCls || "sp-up")}</div>
</div>`;
      }

      function buildObsEventCard(e) {
        return `<div class="obs-card event-card">
  <div class="ev-top">
    <div class="ev-cat"><i class="ti ${e.icon}"></i> ${e.cat}</div>
    <div class="ev-tag ev-tag--${e.dir}">${e.dir === "up" ? "↑ Upward" : "↓ Downward"}</div>
  </div>
  <div class="ev-title">${e.title}</div>
  <div class="ev-desc">${e.desc}</div>
  <div class="ev-footer">
    <span class="ev-source">${e.source} →</span>
    <button type="button" class="ev-btn"><i class="ti ti-message-circle"></i> Learn More</button>
  </div>
</div>`;
      }

      function initCpiObservatory() {
        const root = document.getElementById("cpi-obs-content");
        if (!root || root.dataset.ready) return;
        root.dataset.ready = "1";

        const kpis = [
          { variant: "cpi", label: "CPI — Overall", badge: "+1.59%", value: "109.86", meta: 'Essentials: <span class="up">111.86</span> · +1.82% YoY', spark: "0,28 12,24 25,26 38,19 50,21 62,15 75,17 88,11 100,9" },
          { variant: "inflation", label: "Inflation — YoY", badge: "+3.71%", value: "+3.71", unit: "%", meta: 'MoM: <span class="up">+2.09%</span> · Essentials: <span class="up">+4.32%</span>', spark: "0,28 12,23 25,25 38,18 50,20 62,13 75,15 88,9 100,7" },
          { variant: "essentials", label: "Essentials Inflation", badge: "+4.32%", value: "+4.32", unit: "%", meta: 'Food: <span class="up">+2.90%</span> · Housing: <span class="up">+4.50%</span>', spark: "0,30 12,25 25,27 38,19 50,17 62,10 75,12 88,6 100,4" },
          { variant: "housing", label: "Housing CPI", badge: "+4.50%", value: "113.2", meta: 'EIBOR: <span style="color:var(--accent);font-weight:600">3.44%</span> · −1.14% MoM', spark: "0,26 12,22 25,20 38,16 50,14 62,10 75,9 88,7 100,5" },
        ];

        const cpiby = [
          { label: "By Income ↗", val: "109.72", sub: 'Top High <span class="up">+2.04% YoY</span>', spark: "0,24 20,19 40,21 60,14 80,16 100,10" },
          { label: "By Welfare ↗", val: "110.29", sub: 'Upper <span class="up">+2.18% YoY</span>', spark: "0,25 20,20 40,22 60,15 80,13 100,8" },
          { label: "By Household ↗", val: "109.65", sub: 'Emirati <span class="up">+2.10% YoY</span>', spark: "0,23 20,18 40,20 60,13 80,15 100,9" },
        ];

        const driversGlobal = [
          { icon: "ti-droplet", title: "Crude Oil Price", sub: "Murban (ADNOC)", date: "MAY<br>2026", value: "$102.31", changes: '<span class="up">↑ +60.40% YoY</span><span class="down">↓ −1.94% MoM</span>', spark: "0,22 12,18 25,20 38,13 50,16 62,9 75,12 88,6 100,8" },
          { icon: "ti-ship", title: "Shipping Cost Index", date: "MAY<br>2026", value: "485.29", unit: "idx", changes: '<span class="up">↑ +63.16% YoY</span><span class="up">↑ +3.81% MoM</span>', spark: "0,24 12,20 25,18 38,14 50,11 62,8 75,6 88,3 100,1" },
          { icon: "ti-plant", title: "FAO Food Price Index", date: "MAR<br>2026", value: "128.48", unit: "idx", changes: '<span class="up">↑ +0.98% YoY</span><span class="up">↑ +2.51% MoM</span>', spark: "0,14 12,18 25,12 38,16 50,10 62,14 75,9 88,13 100,7", sparkCls: "sp-flat" },
        ];

        const driversInternal = [
          { icon: "ti-percentage", title: "Interest Rate (EIBOR)", date: "MAY<br>2026", value: "3.44", unit: "%", changes: '<span class="down">↓ −16.56% YoY</span><span class="down">↓ −1.14% MoM</span>', spark: "0,4 12,7 25,5 38,10 50,13 62,17 75,19 88,23 100,25", sparkCls: "sp-down" },
          { icon: "ti-credit-card", title: "UAE Money Supply M1", date: "FEB<br>2026", value: "1,099", unit: "bn AED", changes: '<span class="up">↑ +11.94% YoY</span><span class="up">↑ +1.71% MoM</span>', spark: "0,23 12,19 25,17 38,14 50,12 62,9 75,7 88,5 100,3" },
          { icon: "ti-users", title: "Median Real Wage", sub: "Overall", date: "DEC<br>2025", value: "5,347", unit: "AED", changes: '<span class="up">↑ +13.34% YoY</span><span class="up">↑ +0.50% MoM</span>', spark: "0,22 12,18 25,20 38,14 50,16 62,10 75,8 88,6 100,4" },
        ];

        const events = [
          { icon: "ti-plant-2", cat: "Food & Agriculture", dir: "up", title: "India's Sugar Export Ban May Raise Food Prices", desc: "India's immediate sugar export ban until September 2026 removes a key supplier, likely increasing sugar costs for food, beverages, and restaurant sectors in Abu Dhabi.", source: "reuters.com" },
          { icon: "ti-plant-2", cat: "Food & Agriculture", dir: "up", title: "Beef and Tomato Price Surge May Raise Food Costs", desc: "April data shows food inflation at 2.9%, led by sharp increases in beef and tomato prices, likely driving up grocery and restaurant costs in Abu Dhabi.", source: "nst.com.my" },
          { icon: "ti-globe", cat: "Global Trade", dir: "up", title: "Tariff and Supply Risks May Raise Food Prices", desc: "Economists warn that rising tariffs and supply chain pressures could drive up Abu Dhabi food and household goods prices through higher global food inflation in 2026.", source: "tradecomplianceresourcehub.com" },
          { icon: "ti-bread", cat: "Food & Agriculture", dir: "up", title: "Global Wheat Volatility May Raise Bread Prices", desc: "Rising global wheat and fertilizer costs are pushing up bread and bakery prices in Abu Dhabi, impacting both grocery and restaurant categories.", source: "grocerycouponguide.com" },
          { icon: "ti-trending-up", cat: "Macro", dir: "up", title: "Global Inflation Surge May Raise Abu Dhabi Costs", desc: "April's global CPI rose 3.8% annually, driven by energy and food prices, which may increase Abu Dhabi's import costs for food, beverages, and transport services.", source: "cnbc.com" },
          { icon: "ti-plant-2", cat: "Food & Agriculture", dir: "down", title: "Relaxed Beef Import Quotas May Lower Food Prices", desc: "Eased beef import quotas and record global production are increasing supply, which may reduce beef prices for Abu Dhabi consumers in food and beverage categories.", source: "beefcentral.com" },
        ];

        const impacts = [
          { icon: "ti-trending-up", tone: "up", text: 'Median real wages up <span class="impact-val impact-val--up">+13.34%</span> YoY, boosting household purchasing power and consumer confidence' },
          { icon: "ti-trending-up", tone: "up", text: 'Overall CPI up <span class="impact-val impact-val--up">+1.59%</span> YoY, eroding fixed-income earners\' purchasing power across essential categories' },
          { icon: "ti-home", tone: "up", text: 'Housing costs up <span class="impact-val impact-val--up">+4.50%</span> YoY, raising affordability challenges for renters amid strong demand in Abu Dhabi' },
          { icon: "ti-percentage", tone: "neutral", text: 'EIBOR at <span class="impact-val impact-val--neutral">3.42%</span>, lowering mortgage and business loan costs for borrowers — a deflationary monetary signal' },
          { icon: "ti-trending-down", tone: "down", text: 'Transport CPI growth contained at <span class="impact-val impact-val--down">+1.30%</span> YoY despite global fuel price pressure — subsidies continue to buffer retail impact' },
        ];

        root.innerHTML = `
${buildIntelEngineHTML()}
<section>
  ${buildObsSectionHdr("Overview", "ti-layout-grid", "View all indicators")}
  <div class="kpi-strip">${kpis.map(buildObsKpiCard).join("")}</div>
</section>
<section>
  ${buildObsSectionHdr("CPI by Segment", "ti-grid-dots", "Detailed breakdown")}
  <div class="obs-card">
    <div class="cpiby-grid">${cpiby.map((c) => `<div class="cpiby-col">
      <div class="cpiby-col-label">${c.label}</div>
      <div class="cpiby-col-val">${c.val}</div>
      <div class="cpiby-col-sub">${c.sub}</div>
      <div class="cpiby-spark">${buildObsSparkline(c.spark, "sp-up")}</div>
    </div>`).join("")}</div>
  </div>
</section>
<section>
  ${buildObsSectionHdr("Inflation Drivers", "ti-pulse", "View all drivers")}
  <div class="obs-card drivers-card">
    <div class="drivers-block">
      <div class="driver-group">
        <div class="driver-group-hdr"><i class="ti ti-world"></i> Global Factors</div>
        <div class="driver-grid">${driversGlobal.map(buildObsDriverCard).join("")}</div>
      </div>
      <div class="driver-group">
        <div class="driver-group-hdr"><i class="ti ti-building-skyscraper"></i> Internal Factors</div>
        <div class="driver-grid">${driversInternal.map(buildObsDriverCard).join("")}</div>
      </div>
    </div>
  </div>
</section>
<section>
  ${buildObsSectionHdr("Price-Relevant Events", "ti-flag", "Show all events")}
  <div class="events-grid">${events.map(buildObsEventCard).join("")}</div>
</section>
<section>
  ${buildObsSectionHdr("Key Impacts", "ti-info-circle")}
  <div class="obs-card impacts-list">${impacts.map((i) => `<div class="impact-item">
    <div class="impact-icon impact-icon--${i.tone}"><i class="ti ${i.icon}"></i></div>
    <div>${i.text}</div>
  </div>`).join("")}</div>
</section>`;
      }

      function openCpiObservatory(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        if (!document.getElementById("screen-cpi-obs")) return;
        goTo("screen-cpi-obs");
        initCpiObservatory();
      }
      window.openCpiObservatory = openCpiObservatory;

      function openGeoView(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        goTo("screen-geo-view");
        initGeoViewScreen();
      }
      window.openGeoView = openGeoView;

      function initObservatoriesPage() {
        initObsListCardBookmarks();
        const obsContent = document.querySelector(
          "#screen-observatories .obs-content",
        );
        bindListSearch(
          document.getElementById("obsSearchInput"),
          () =>
            document.querySelectorAll("#screen-observatories .obs-list-card"),
          {
            emptyContainer: obsContent,
            emptyLabel: "observatories",
            hideSections: "#screen-observatories .dashboard-section",
          },
        );
      }
      window.initObservatoriesPage = initObservatoriesPage;

      function openObservatories(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        goTo("screen-observatories");
        initObservatoriesPage();
        if (typeof refreshObservatoriesPageAOS === "function")
          refreshObservatoriesPageAOS();
        document.getElementById("obsSearchInput")?.focus();
      }
      window.openObservatories = openObservatories;

      const PROD_FILTER_SUBS = {
        pop: [
          { id: "vital", label: "Vital Statistics" },
          { id: "pop-stats", label: "Population Statistics" },
          { id: "longterm", label: "Longer-Term Population" },
          { id: "housing", label: "Building and Housing" },
          { id: "productivity", label: "Productivity" },
        ],
        industry: [
          { id: "ind-output", label: "Industrial Output" },
          { id: "ind-trade", label: "Business Trade" },
          { id: "ind-invest", label: "Investment Flows" },
          { id: "ind-sme", label: "SME Activity" },
          { id: "ind-innov", label: "Innovation Index" },
        ],
        economy: [
          { id: "macro", label: "Macroeconomic Indicators" },
          { id: "prices", label: "Price Statistics" },
          { id: "trade", label: "External Trade" },
          { id: "fiscal", label: "Fiscal Indicators" },
          { id: "national", label: "National Accounts" },
        ],
        agri: [
          { id: "crop", label: "Crop Production" },
          { id: "livestock", label: "Livestock Statistics" },
          { id: "water", label: "Water Resources" },
          { id: "land", label: "Land Use" },
          { id: "climate", label: "Climate Metrics" },
        ],
        labour: [
          { id: "employment", label: "Employment Statistics" },
          { id: "wages", label: "Wages & Earnings" },
          { id: "workforce", label: "Workforce Composition" },
          { id: "vacancy", label: "Job Vacancies" },
          { id: "emirat", label: "Emiratisation" },
        ],
      };
      const PROD_FILTER_TYPES = [
        { id: "official", label: "Official Statistics", tab: "official" },
        {
          id: "experimental",
          label: "Dashboards",
          tab: "dashboard",
        },
        { id: "analytical", label: "Use case", tab: "usecase" },
        { id: "reports", label: "Reports", tab: "official" },
      ];
      let prodFilterState = { domain: "pop", sub: "vital", type: "official" };
      let prodFilterPanelOpen = false;
      let productsPageTab = "official";

      const OFFICIAL_INDICATOR_PRODUCTS = [
        {
          idx: 0,
          cat: "Economy",
          catIcon: "ti-trending-up",
          name: "Consumer price index by main expenditure group - Clothing and footwear",
          val: "100.63",
          change: "▼ 0.31 (2.0%) Yearly",
          changeClass: "val-red",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "Clothing & footwear CPI is easing year-over-year; track whether this deflation offsets housing and food-led pressures.",
          description:
            "Tracks price changes for clothing and footwear within Abu Dhabi's consumer basket, supporting inflation monitoring and household cost analysis.",
          baiCtx: "el-product-cpi",
          baiTitle: "CPI — Clothing and Footwear",
          baiIcon: "ti-shirt",
        },
        {
          idx: 1,
          cat: "Population and Demography",
          catIcon: "ti-users",
          name: "Population distribution by gender",
          val: "3.92M",
          change: "▲ 0.31 (2.0%) Yearly",
          changeClass: "val-green",
          axis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          aiSummary:
            "Gender distribution is stable with modest growth; watch working-age balance for labour supply and demand.",
          description:
            "Shows the share of Abu Dhabi's population by gender, used for demographic planning, service delivery, and labour market analysis.",
          baiCtx: "el-product-population",
          baiTitle: "Population Distribution by Gender",
          baiIcon: "ti-users",
        },
        {
          idx: 2,
          cat: "Economy",
          catIcon: "ti-building",
          name: "Cost of construction index",
          val: "142.6",
          change: "▲ 0.31 (2.0%) Yearly",
          changeClass: "val-green",
          axis: ["Jan", "Apr", "Jul", "Oct", "2025"],
          aiSummary:
            "Construction costs are trending upward; rising input prices can flow into rents and capex, lifting inflation risk.",
          description:
            "Measures input cost movements in Abu Dhabi's construction sector, signalling pipeline pressure on housing and infrastructure projects.",
          baiCtx: "el-product-construction",
          baiTitle: "Cost of Construction Index",
          baiIcon: "ti-building",
        },
        {
          idx: 3,
          cat: "Economy",
          catIcon: "ti-chart-bar",
          name: "Gross domestic product by institutional sector",
          val: "3.92M",
          change: "▲ 0.31 (2.0%) Yearly",
          changeClass: "val-green",
          axis: ["Q1", "Q2", "Q3", "Q4", "Q1 25"],
          aiSummary:
            "Institutional-sector GDP shows which parts of the economy drive growth; compare quarter shifts to spot structural change.",
          description:
            "Breaks down Abu Dhabi GDP by institutional sector to reveal growth drivers across government, household, and business activity.",
          baiCtx: "el-product-gdp",
          baiTitle: "GDP by Institutional Sector",
          baiIcon: "ti-chart-bar",
        },
        {
          idx: 4,
          cat: "Population and Demography",
          catIcon: "ti-users",
          name: "Age specific mortality rate by gender",
          val: "4.8",
          change: "▼ 0.3 (5.9%) Yearly",
          changeClass: "val-red",
          axis: ["2019", "2020", "2021", "2022", "2023", "2024"],
          aiSummary:
            "Mortality rates remain within expected demographic bands; monitor gender-specific trends for policy signals.",
          description:
            "Reports mortality rates by age group and gender, supporting public health planning and demographic risk assessment.",
        },
        {
          idx: 5,
          cat: "Health",
          catIcon: "ti-heartbeat",
          name: "Life expectancy at birth",
          val: "78.4",
          change: "▲ 0.2 (0.3%) Yearly",
          changeClass: "val-green",
          axis: ["2019", "2020", "2021", "2022", "2023", "2024"],
          aiSummary:
            "Life expectancy continues a gradual upward trend, reflecting sustained health system improvements.",
          description:
            "Estimates average years of life at birth in Abu Dhabi, a core wellbeing indicator for health policy evaluation.",
        },
        {
          idx: 6,
          cat: "Economy",
          catIcon: "ti-trending-up",
          name: "Consumer price index by main expenditure group",
          val: "100.63",
          change: "▲ 0.58 (0.0%) Quarterly",
          changeClass: "val-green",
          axis: ["Jan", "Feb", "Mar", "Apr", "May"],
          aiSummary:
            "CPI by expenditure group highlights category-level inflation drivers worth tracking quarter to quarter.",
          description:
            "Headline CPI by expenditure group for Abu Dhabi households, used to monitor inflation trends against policy targets.",
        },
      ];

      function getProductsPageItems() {
        return mapHomeProductsForTab(OFFICIAL_INDICATOR_PRODUCTS, productsPageTab);
      }

      function filterProductsPageItems(items, q) {
        const query = (q || "").toLowerCase().trim();
        let filtered = items.filter(
          (p) =>
            !query ||
            p.name.toLowerCase().includes(query) ||
            p.cat.toLowerCase().includes(query),
        );
        if (prodFilterPanelOpen) {
          filtered = filtered.filter((p) =>
            prodDomainMatchCat(prodFilterState.domain, p.cat),
          );
          if (prodFilterState.sub === "vital") {
            filtered = filtered.filter((p) =>
              /mortality|population distribution|life expectancy|infant/i.test(
                p.name,
              ),
            );
          }
        }
        return filtered;
      }

      function prodDomainMatchCat(domain, cat) {
        const c = (cat || "").toLowerCase();
        if (domain === "pop")
          return (
            c.includes("population") ||
            c.includes("demograph") ||
            c.includes("health")
          );
        if (domain === "industry")
          return c.includes("trade") || c.includes("business");
        if (domain === "economy") return c.includes("econom");
        if (domain === "agri") return false;
        if (domain === "labour") return c.includes("labour");
        return true;
      }

      function ensureSearchEmptyState(container, opts) {
        if (!container) return null;
        opts = opts || {};
        let el = container.querySelector(":scope > .search-empty-state");
        if (!el) {
          el = document.createElement("div");
          el.className = "search-empty-state";
          el.setAttribute("role", "status");
          el.innerHTML = `<div class="search-empty-icon" aria-hidden="true"><i class="ti ti-search-off"></i></div>
            <h3 class="search-empty-title"></h3>
            <p class="search-empty-text">We couldn't find anything matching <strong class="search-empty-query"></strong>. Try a different keyword or clear your search.</p>
            <button type="button" class="search-empty-clear">Clear search</button>`;
          container.insertBefore(el, container.firstChild);
          el.querySelector(".search-empty-clear")?.addEventListener("click", () => {
            const input = document.getElementById(
              container.dataset.searchEmptyInput || "",
            );
            if (!input) return;
            clearSearchInput(input);
          });
        }
        const title = el.querySelector(".search-empty-title");
        if (title)
          title.textContent = `No ${opts.label || "results"} found`;
        return el;
      }

      function toggleSearchEmptyState(container, show, query, opts) {
        if (!container) return;
        opts = opts || {};
        if (opts.input?.id)
          container.dataset.searchEmptyInput = opts.input.id;
        const el = ensureSearchEmptyState(container, opts);
        if (!el) return;
        el.classList.toggle("visible", show);
        container.classList.toggle("has-search-empty", show);
        const qEl = el.querySelector(".search-empty-query");
        if (qEl) qEl.textContent = query.trim();
      }

      function applyListSearch(input, getCards, opts) {
        if (!input) return;
        opts = opts || {};
        const q = input.value.toLowerCase().trim();
        const cards = getCards();
        let visible = 0;
        cards.forEach((card) => {
          const match = !q || card.textContent.toLowerCase().includes(q);
          const entityHidden = card.classList.contains("gov-entity-hidden");
          card.classList.toggle("search-hidden", !match || entityHidden);
          if (match && !entityHidden) visible++;
        });
        if (opts.hideSections) {
          document.querySelectorAll(opts.hideSections).forEach((section) => {
            const sectionCards = section.querySelectorAll(".obs-list-card");
            if (!sectionCards.length) return;
            const anyVisible = [...sectionCards].some(
              (c) => !c.classList.contains("search-hidden"),
            );
            section.classList.toggle(
              "search-section-hidden",
              !!(q && !anyVisible),
            );
          });
        }
        if (opts.emptyContainer) {
          toggleSearchEmptyState(
            opts.emptyContainer,
            !!(q && visible === 0),
            input.value,
            { label: opts.emptyLabel, input },
          );
        }
      }

      function updateSearchClearState(input) {
        if (!input) return;
        const wrap = input.closest(".obs-search-wrap, .gd-prod-search");
        if (wrap) wrap.classList.toggle("has-value", !!input.value.trim());
      }

      function clearSearchInput(input) {
        if (!input) return;
        input.value = "";
        updateSearchClearState(input);
        input.dispatchEvent(new Event("search-run", { bubbles: true }));
        input.focus();
      }

      function ensureSearchClearBtn(input) {
        const wrap = input.closest(".obs-search-wrap, .gd-prod-search");
        if (!wrap || wrap.querySelector(".obs-search-clear")) return;
        const clearBtn = document.createElement("button");
        clearBtn.type = "button";
        clearBtn.className = "obs-search-clear";
        clearBtn.title = "Clear search";
        clearBtn.setAttribute("aria-label", "Clear search");
        clearBtn.innerHTML = '<i class="ti ti-x"></i>';
        clearBtn.style.cursor = "pointer";
        const searchBtn = wrap.querySelector(".obs-search-btn");
        if (searchBtn) wrap.insertBefore(clearBtn, searchBtn);
        else wrap.appendChild(clearBtn);
        clearBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearSearchInput(input);
        });
      }

      function bindSubmitSearch(input, run) {
        if (!input || input.dataset.submitSearchBound) return;
        input.dataset.submitSearchBound = "1";
        ensureSearchClearBtn(input);
        updateSearchClearState(input);
        input.addEventListener("input", () => updateSearchClearState(input));
        const submit = (e) => {
          if (e) e.preventDefault();
          run();
          updateSearchClearState(input);
        };
        input.addEventListener("keydown", (e) => {
          if (e.key === "Enter") submit(e);
        });
        input.addEventListener("search-run", submit);
        const wrap = input.closest(
          ".obs-search-wrap, .gd-prod-search, .prod-search-wrap",
        );
        const btn = wrap?.querySelector(".obs-search-btn");
        if (btn) btn.addEventListener("click", submit);
        if (wrap?.classList.contains("gd-prod-search")) {
          const icon = wrap.querySelector(".ti-search");
          if (icon) {
            icon.style.cursor = "pointer";
            icon.addEventListener("click", submit);
          }
        }
      }

      function bindListSearch(input, getCards, opts) {
        if (!input || input.dataset.searchBound) return;
        input.dataset.searchBound = "1";
        opts = { ...(opts || {}), input };
        bindSubmitSearch(input, () => applyListSearch(input, getCards, opts));
      }

      function getGovHeroSearchCards() {
        const gov = document.getElementById("screen-govdata");
        if (!gov) return [];
        const cards = [
          ...gov.querySelectorAll(".gd-kpi-card, .gd-feed-card"),
        ];
        const activePanel = gov.querySelector(".gd-tab-panel.active");
        if (activePanel) {
          cards.push(
            ...activePanel.querySelectorAll(
              ".gd-recent-item, .gd-topview-item, .gd-smart-item, .gd-prod-kpi-card, .gd-prod-dash-card, .gd-prod-report-card, .gd-prod-cat-card, #gdDxpListBody tr",
            ),
          );
        }
        return cards;
      }

      function initGovDataSearch() {
        const screen = document.getElementById("screen-govdata");
        if (!screen) return;
        const heroInput = document.getElementById("govSearchInput");
        const gdInner = screen.querySelector(".gd-inner");
        bindListSearch(heroInput, getGovHeroSearchCards, {
          emptyContainer: gdInner,
          emptyLabel: "results",
        });
        screen.querySelectorAll("#gdProductTabs .gd-tab").forEach((tab) => {
          if (tab.dataset.govSearchTabBound) return;
          tab.dataset.govSearchTabBound = "1";
          tab.addEventListener("click", () => {
            applyListSearch(heroInput, getGovHeroSearchCards, {
              emptyContainer: gdInner,
              emptyLabel: "results",
              input: heroInput,
            });
          });
        });
        const panelConfig = {
          kpis: { selector: ".gd-prod-kpi-card", grid: ".gd-prod-kpi-grid", label: "KPIs" },
          dashboards: { selector: ".gd-prod-dash-card", grid: ".gd-prod-dash-grid", label: "dashboards" },
          reports: { selector: ".gd-prod-report-card", grid: ".gd-prod-report-grid", label: "reports" },
        };
        Object.entries(panelConfig).forEach(([panelId, cfg]) => {
          const panel = screen.querySelector(`[data-gd-panel="${panelId}"]`);
          const panelInput = panel?.querySelector(".gd-prod-search-inp");
          bindListSearch(
            panelInput,
            () => panel.querySelectorAll(cfg.selector),
            {
              emptyContainer: panel?.querySelector(cfg.grid),
              emptyLabel: cfg.label,
            },
          );
        });
      }
      window.initGovDataSearch = initGovDataSearch;

      const GOV_ENTITIES = [
        { code: "DCD", name: "Dept. of Community Development", desc: "Community · Social Support · Wellbeing", bg: "#ddeaf8", color: "#0B5394" },
        { code: "SCAD", name: "Statistics Centre Abu Dhabi", desc: "Population · Economy · Labour Statistics", bg: "#EAF4EF", color: "#0f5132" },
        { code: "DOH", name: "Dept. of Health", desc: "Healthcare · Disability · Clinical Data", bg: "#E6EEF8", color: "#0a3d7a" },
        { code: "ADEK", name: "Abu Dhabi Education Council", desc: "Education · Youth · Academic Performance", bg: "#EDE8FB", color: "#3d1a7a" },
        { code: "MOSAL", name: "Ministry of Social Affairs & Labour", desc: "Welfare · Employment · Housing Support", bg: "#FEF4E0", color: "#7a4800" },
        { code: "DMT", name: "Dept. of Municipalities & Transport", desc: "Infrastructure · Housing · Urban Planning", bg: "#E0F3F6", color: "#0a5260" },
        { code: "ADDC", name: "Abu Dhabi Distribution Company", desc: "Utilities · Energy · Water Consumption", bg: "#FBF3D0", color: "#7a5c00" },
        { code: "SEHA", name: "Abu Dhabi Health Services", desc: "Hospitals · Primary Care · Patient Data", bg: "#FCE8E8", color: "#7a1f1f" },
        { code: "ADNOC", name: "Abu Dhabi National Oil Company", desc: "Energy · GDP · Industrial Output", bg: "#E8F8F0", color: "#005f3d" },
        { code: "CBUAE", name: "Central Bank UAE", desc: "Finance · Banking · Monetary Policy", bg: "#EFF6FF", color: "#1E40AF" },
        { code: "ITC", name: "Integrated Transport Centre", desc: "Mobility · Traffic · Transit Data", bg: "#FDF2F8", color: "#701a75" },
        { code: "ADGM", name: "Abu Dhabi Global Market", desc: "Finance · Investment · Business Registry", bg: "#F0FDF4", color: "#065f46" },
      ];
      const GOV_KPI_DATA = {
        ALL: { kpiTotal: 312, kpiDcd: 47, kpiOther: 265, dashTotal: 89, dashDcd: 12, dashOther: 77, repTotal: 43, repDcd: 6, repOther: 37, subTotal: 210, subDcd: 7, subOther: 203 },
        DCD: { kpiTotal: 47, kpiDcd: 47, dashTotal: 12, dashDcd: 12, repTotal: 6, repDcd: 6, subTotal: 7, subDcd: 7 },
        DMT: { kpiTotal: 38, kpiDcd: 38, dashTotal: 11, dashDcd: 11, repTotal: 5, repDcd: 5, subTotal: 24, subDcd: 24 },
        ADDC: { kpiTotal: 21, kpiDcd: 21, dashTotal: 8, dashDcd: 8, repTotal: 4, repDcd: 4, subTotal: 15, subDcd: 15 },
        SEHA: { kpiTotal: 62, kpiDcd: 62, dashTotal: 18, dashDcd: 18, repTotal: 9, repDcd: 9, subTotal: 42, subDcd: 42 },
        ADNOC: { kpiTotal: 44, kpiDcd: 44, dashTotal: 14, dashDcd: 14, repTotal: 7, repDcd: 7, subTotal: 31, subDcd: 31 },
        CBUAE: { kpiTotal: 29, kpiDcd: 29, dashTotal: 9, dashDcd: 9, repTotal: 3, repDcd: 3, subTotal: 18, subDcd: 18 },
        ITC: { kpiTotal: 17, kpiDcd: 17, dashTotal: 6, dashDcd: 6, repTotal: 2, repDcd: 2, subTotal: 9, subDcd: 9 },
        ADGM: { kpiTotal: 32, kpiDcd: 32, dashTotal: 11, dashDcd: 11, repTotal: 5, repDcd: 5, subTotal: 22, subDcd: 22 },
      };
      const GOV_HERO_DEFAULT = {
        title: "Department of Community Development",
        sub: "The Department of Community Development (DCD) advances community wellbeing through social support programmes, services, and evidence-based policy — unified on Bayaan for discovery, publishing, and collaboration.",
      };
      let govEntityFilter = "ALL";

      function updateGovStatStrip(code) {
        const d = GOV_KPI_DATA[code] || GOV_KPI_DATA.ALL;
        const isAll = code === "ALL";
        const entLabel = isAll ? "DCD" : code;
        const setSplit = (otherId, showOther, otherText) => {
          const otherEl = document.getElementById(otherId);
          if (!otherEl) return;
          otherEl.textContent = otherText;
          const divider = otherEl.closest(".ksc-split")?.querySelector(".ksc-divider");
          if (divider) divider.style.display = showOther ? "" : "none";
          otherEl.style.display = showOther ? "" : "none";
        };
        document.getElementById("stat-kpi-total").textContent = d.kpiTotal;
        document.getElementById("stat-kpi-dcd").textContent = isAll ? `${d.kpiDcd} DCD` : `${d.kpiDcd} ${entLabel}`;
        setSplit("stat-kpi-other", isAll, `${d.kpiOther} Other Entities`);
        document.getElementById("stat-dash-total").textContent = d.dashTotal;
        document.getElementById("stat-dash-dcd").textContent = isAll ? `${d.dashDcd} DCD` : `${d.dashDcd} ${entLabel}`;
        setSplit("stat-dash-other", isAll, `${d.dashOther} Other Entities`);
        document.getElementById("stat-report-total").textContent = d.repTotal;
        document.getElementById("stat-report-dcd").textContent = isAll ? `${d.repDcd} DCD` : `${d.repDcd} ${entLabel}`;
        setSplit("stat-report-other", isAll, `${d.repOther} Other Entities`);
        document.getElementById("stat-sub-total").textContent = d.subTotal;
        document.getElementById("stat-sub-dcd").textContent = isAll ? `${d.subDcd} DCD` : `${d.subDcd} ${entLabel}`;
        setSplit("stat-sub-other", isAll, `${d.subOther} Other Entities`);
      }

      function govEntityMatches(el, code) {
        if (code === "ALL") return true;
        const entityCode =
          el.dataset.govEntity ||
          el.querySelector(".gd-feed-badge")?.textContent?.trim();
        if (entityCode) {
          return entityCode.toUpperCase() === code.toUpperCase();
        }
        const hay = (el.textContent || "").toUpperCase();
        if (hay.includes(code)) return true;
        if (code === "DCD" && /COMMUNITY|WELLBEING|DETERMINATION|DCD/i.test(hay))
          return true;
        return false;
      }

      function applyGovEntityFilter(code) {
        govEntityFilter = code;
        updateGovStatStrip(code);
        const gov = document.getElementById("screen-govdata");
        if (!gov) return;
        const heroInput = document.getElementById("govSearchInput");
        gov.querySelectorAll(".gd-feed-card").forEach((card) => {
          card.classList.toggle("gov-entity-hidden", !govEntityMatches(card, code));
        });
        const btn = document.getElementById("govEntityFilterBtn");
        if (code === "ALL") {
          btn?.classList.remove("active");
        } else {
          btn?.classList.add("active");
        }
        applyListSearch(heroInput, getGovHeroSearchCards, {
          emptyContainer: gov.querySelector(".gd-inner"),
          emptyLabel: "results",
          input: heroInput,
        });
      }

      function renderGovEntityList(q = "") {
        const list = document.getElementById("govEntityList");
        if (!list) return;
        const query = q.toLowerCase().trim();
        const filtered = GOV_ENTITIES.filter(
          (e) =>
            !query ||
            e.name.toLowerCase().includes(query) ||
            e.code.toLowerCase().includes(query),
        );
        const check = '<div class="ent-item-check"><i class="ti ti-check"></i></div>';
        const allRow = !query
          ? `<button type="button" class="ent-item${govEntityFilter === "ALL" ? " active" : ""}" data-gov-entity="ALL">
              <div class="ent-item-av" style="background:#E8EDF5;color:#0B1C3D;">ALL</div>
              <div class="ent-item-body">
                <div class="ent-item-name">All Entities</div>
                <div class="ent-item-desc">Aggregated view across all Abu Dhabi government entities</div>
              </div>
              ${govEntityFilter === "ALL" ? check : ""}
            </button><div class="ent-drop-divider"></div>`
          : "";
        list.innerHTML =
          allRow +
          filtered
            .map(
              (e) => `<button type="button" class="ent-item${govEntityFilter === e.code ? " active" : ""}" data-gov-entity="${e.code}">
              <div class="ent-item-av" style="background:${e.bg};color:${e.color};">${e.code.slice(0, 3)}</div>
              <div class="ent-item-body">
                <div class="ent-item-name">${e.name}</div>
                <div class="ent-item-desc">${e.desc}</div>
              </div>
              ${govEntityFilter === e.code ? check : ""}
            </button>`,
            )
            .join("");
      }

      function toggleGovEntityDropdown(force) {
        const dd = document.getElementById("govEntityDropdown");
        const btn = document.getElementById("govEntityFilterBtn");
        if (!dd || !btn) return;
        const open = typeof force === "boolean" ? force : dd.hidden;
        dd.hidden = !open;
        btn.classList.toggle("active", open || govEntityFilter !== "ALL");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          renderGovEntityList(document.getElementById("govEntitySearchInput")?.value || "");
          document.getElementById("govEntitySearchInput")?.focus();
        } else if (govEntityFilter === "ALL") {
          btn.classList.remove("active");
        }
      }

      function initGovEntityFilter() {
        const screen = document.getElementById("screen-govdata");
        if (!screen || screen.dataset.gdEntityInit) return;
        screen.dataset.gdEntityInit = "1";
        const btn = document.getElementById("govEntityFilterBtn");
        const dd = document.getElementById("govEntityDropdown");
        const searchInput = document.getElementById("govEntitySearchInput");
        btn?.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleGovEntityDropdown();
        });
        document.getElementById("govEntityDropClose")?.addEventListener("click", () => toggleGovEntityDropdown(false));
        searchInput?.addEventListener("input", () => renderGovEntityList(searchInput.value));
        dd?.addEventListener("click", (e) => {
          const item = e.target.closest("[data-gov-entity]");
          if (!item) return;
          const code = item.getAttribute("data-gov-entity");
          applyGovEntityFilter(code);
          renderGovEntityList(searchInput?.value || "");
          toggleGovEntityDropdown(false);
          if (code === "ALL") toast("Viewing all government entities", "ti-building-bank");
          else toast(`Viewing ${GOV_ENTITIES.find((x) => x.code === code)?.name || code}`, "ti-building-bank");
        });
        document.addEventListener("click", (e) => {
          if (dd?.hidden) return;
          if (dd.contains(e.target) || btn?.contains(e.target)) return;
          toggleGovEntityDropdown(false);
        });
        renderGovEntityList();
      }

      function renderProductsGrid(filter) {
        const grid = document.getElementById("productsPageGrid");
        if (!grid) return;
        const items = filterProductsPageItems(getProductsPageItems(), filter);
        renderProductCardsGrid(grid, items);
        const prodContent = document.querySelector(
          "#screen-products .prod-content",
        );
        const searchInput = document.getElementById("prodSearchInput");
        toggleSearchEmptyState(
          prodContent,
          !!((filter || "").trim() && items.length === 0),
          filter || "",
          { label: "products", input: searchInput },
        );
        if (
          document
            .getElementById("screen-products")
            ?.classList.contains("active") &&
          typeof refreshProductsPageAOS === "function"
        ) {
          refreshProductsPageAOS();
        }
      }

      const PROD_SUB_ICONS = {
        "pop-stats": "ti-users",
        vital: "ti-chart-line",
        longterm: "ti-clock",
        housing: "ti-home",
        productivity: "ti-chart-bar",
        "ind-output": "ti-building",
        "ind-trade": "ti-arrows-exchange",
        "ind-invest": "ti-coin",
        "ind-sme": "ti-building-store",
        "ind-innov": "ti-bulb",
        macro: "ti-chart-line",
        prices: "ti-receipt",
        trade: "ti-world",
        fiscal: "ti-report-money",
        national: "ti-chart-bar",
        crop: "ti-plant",
        livestock: "ti-paw",
        water: "ti-droplet",
        land: "ti-map",
        climate: "ti-cloud",
        employment: "ti-briefcase",
        wages: "ti-cash",
        workforce: "ti-users",
        vacancy: "ti-id",
        emirat: "ti-flag",
      };

      function updateProdFilterSelectionLabel() {
        const el = document.getElementById("prodFilterSelection");
        if (!el) return;
        const d = document.querySelector(
          "#prodDomainsCol .prod-filter-pill.active .pill-label",
        );
        const s = document.querySelector(
          "#prodSubdomainCol .prod-filter-pill.active .pill-label",
        );
        const p = document.querySelector(
          "#prodProductTypeCol .prod-filter-pill.active .pill-label",
        );
        if (!d || !s || !p) {
          el.textContent = "";
          return;
        }
        el.innerHTML =
          "<strong>" +
          d.textContent +
          "</strong> → <strong>" +
          s.textContent +
          "</strong> → <strong>" +
          p.textContent +
          "</strong>";
      }

      function renderProdFilterSubList() {
        const list = document.getElementById("prodSubdomainCol");
        if (!list) return;
        const subs =
          PROD_FILTER_SUBS[prodFilterState.domain] || PROD_FILTER_SUBS.pop;
        if (!subs.find((s) => s.id === prodFilterState.sub))
          prodFilterState.sub = subs[0].id;
        list.innerHTML = subs
          .map((s) => {
            const ico = PROD_SUB_ICONS[s.id] || "ti-chart-dots";
            return `<button type="button" class="prod-filter-pill${s.id === prodFilterState.sub ? " active" : ""}" data-sub="${s.id}"><i class="ti ${ico} pill-ico"></i><span class="pill-label">${s.label}</span><span class="pill-count">23</span></button>`;
          })
          .join("");
        list.querySelectorAll(".prod-filter-pill").forEach((btn) => {
          btn.addEventListener("click", () => {
            prodFilterState.sub = btn.dataset.sub;
            list
              .querySelectorAll(".prod-filter-pill")
              .forEach((b) => b.classList.toggle("active", b === btn));
            updateProdFilterSelectionLabel();
            renderProductsGrid(
              document.getElementById("prodSearchInput")?.value || "",
            );
          });
        });
      }

      function renderProdFilterTypeList() {
        const list = document.getElementById("prodProductTypeCol");
        if (!list) return;
        const typeIcons = {
          official: "ti-shield-check",
          experimental: "ti-flask",
          analytical: "ti-apps",
          reports: "ti-file-text",
        };
        list.innerHTML = PROD_FILTER_TYPES.map(
          (t) => `
    <button type="button" class="prod-filter-pill${t.id === prodFilterState.type ? " active" : ""}" data-type="${t.id}" data-tab="${t.tab}">
      <i class="ti ${typeIcons[t.id] || "ti-file-analytics"} pill-ico"></i><span class="pill-label">${t.label}</span><span class="pill-count">23</span>
    </button>
  `,
        ).join("");
        list.querySelectorAll(".prod-filter-pill").forEach((btn) => {
          btn.addEventListener("click", () => {
            prodFilterState.type = btn.dataset.type;
            list
              .querySelectorAll(".prod-filter-pill")
              .forEach((b) => b.classList.toggle("active", b === btn));
            const tab = btn.dataset.tab;
            if (tab) {
              productsPageTab = tab;
              document.querySelectorAll("#prodTabsBar .prod-tab").forEach((b) => {
                b.classList.toggle("active", b.dataset.prodTab === tab);
              });
              renderProductsGrid(
                document.getElementById("prodSearchInput")?.value || "",
              );
            }
            updateProdFilterSelectionLabel();
          });
        });
      }

      function toggleProdFilterPanel(force) {
        const panel = document.getElementById("prodFilterPanel");
        const btn = document.getElementById("prodFilterBtn");
        if (!panel) return;
        const open =
          typeof force === "boolean"
            ? force
            : !panel.classList.contains("open");
        prodFilterPanelOpen = open;
        panel.classList.toggle("open", open);
        panel.setAttribute("aria-hidden", open ? "false" : "true");
        if (btn) {
          btn.classList.toggle("active", open);
          btn.setAttribute("aria-expanded", open ? "true" : "false");
        }
        if (open) {
          renderProdFilterSubList();
          renderProdFilterTypeList();
          updateProdFilterSelectionLabel();
        } else {
          renderProductsGrid(
            document.getElementById("prodSearchInput")?.value || "",
          );
        }
      }

      function initProdFilterTree() {
        const btn = document.getElementById("prodFilterBtn");
        const hub = document.getElementById("prodFilterHub");
        if (btn && !btn.dataset.filterBound) {
          btn.dataset.filterBound = "1";
          btn.addEventListener("click", () => toggleProdFilterPanel());
        }
        if (hub && !hub.dataset.filterBound) {
          hub.dataset.filterBound = "1";
          hub.addEventListener("click", () => toggleProdFilterPanel());
        }
        document
          .querySelectorAll("#prodDomainsCol .prod-filter-pill")
          .forEach((pill) => {
            if (pill.dataset.domainBound) return;
            pill.dataset.domainBound = "1";
            pill.addEventListener("click", () => {
              prodFilterState.domain = pill.dataset.domain;
              document
                .querySelectorAll("#prodDomainsCol .prod-filter-pill")
                .forEach((b) => b.classList.toggle("active", b === pill));
              const subs = PROD_FILTER_SUBS[prodFilterState.domain];
              prodFilterState.sub = subs[0].id;
              renderProdFilterSubList();
              updateProdFilterSelectionLabel();
              renderProductsGrid(
                document.getElementById("prodSearchInput")?.value || "",
              );
            });
          });
        renderProdFilterSubList();
        renderProdFilterTypeList();
        updateProdFilterSelectionLabel();
      }

      function initProductsPage() {
        const screen = document.getElementById("screen-products");
        if (!screen) return;
        renderProductsGrid();
        initProdFilterTree();
        const search = document.getElementById("prodSearchInput");
        if (search && !search.dataset.prodBound) {
          search.dataset.prodBound = "1";
          bindSubmitSearch(search, () => renderProductsGrid(search.value));
        }
        document.querySelectorAll("#prodTabsBar .prod-tab").forEach((btn) => {
          if (btn.dataset.prodTabBound) return;
          btn.dataset.prodTabBound = "1";
          btn.addEventListener("click", () => {
            document
              .querySelectorAll("#prodTabsBar .prod-tab")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            productsPageTab = btn.dataset.prodTab || "official";
            const type = PROD_FILTER_TYPES.find(
              (t) => t.tab === productsPageTab,
            );
            if (type && prodFilterPanelOpen) {
              prodFilterState.type = type.id;
              renderProdFilterTypeList();
            }
            renderProductsGrid(
              document.getElementById("prodSearchInput")?.value || "",
            );
          });
        });
      }

      function openProducts(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        goTo("screen-products");
        initProductsPage();
        if (typeof refreshProductsPageAOS === "function")
          refreshProductsPageAOS();
      }
      window.openProducts = openProducts;

      let geoChartsReady = false;
      let geoPopSpark, geoRegionDonut;

      function initGeoViewScreen() {
        const screen = document.getElementById("screen-geo-view");
        if (!screen) return;

        const heat = document.getElementById("geoHeatLayer");
        const markers = document.getElementById("geoMarkersLayer");
        const toggleHeat = document.getElementById("geoToggleHeat");
        const toggleIcons = document.getElementById("geoToggleIcons");

        function bindToggle(el, layer, hiddenClass) {
          if (!el || el.dataset.geoBound) return;
          el.dataset.geoBound = "1";
          const apply = () => {
            const on = el.classList.contains("on");
            if (layer) layer.classList.toggle(hiddenClass, !on);
            el.setAttribute("aria-checked", on ? "true" : "false");
          };
          el.addEventListener("click", () => {
            el.classList.toggle("on");
            apply();
          });
          el.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              el.classList.toggle("on");
              apply();
            }
          });
          apply();
        }
        bindToggle(toggleHeat, heat, "hidden");
        bindToggle(toggleIcons, markers, "hidden");

        document.querySelectorAll("#geoTabs .geo-tab").forEach((btn) => {
          if (btn.dataset.geoTabBound) return;
          btn.dataset.geoTabBound = "1";
          btn.addEventListener("click", () => {
            document
              .querySelectorAll("#geoTabs .geo-tab")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
          });
        });

        if (typeof Chart === "undefined") return;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (geoPopSpark) {
              geoPopSpark.destroy();
              geoPopSpark = null;
            }
            if (geoRegionDonut) {
              geoRegionDonut.destroy();
              geoRegionDonut = null;
            }
            const sparkEl = document.getElementById("geo-pop-spark");
            if (sparkEl) {
              geoPopSpark = new Chart(sparkEl.getContext("2d"), {
                type: "line",
                data: {
                  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                  datasets: [
                    {
                      data: [
                        3.72, 3.78, 3.82, 3.88, 3.91, 3.95, 4.0, 4.05, 4.08,
                        4.11, 4.13, 4.136,
                      ],
                      borderColor: "#2563eb",
                      backgroundColor: "rgba(37,99,235,0.08)",
                      fill: true,
                      tension: 0.4,
                      pointRadius: 0,
                      borderWidth: 2,
                    },
                  ],
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                  scales: { x: { display: false }, y: { display: false } },
                },
              });
            }
            const donutEl = document.getElementById("geo-region-donut");
            if (donutEl) {
              geoRegionDonut = new Chart(donutEl.getContext("2d"), {
                type: "doughnut",
                data: {
                  labels: ["Abu Dhabi", "Al Ain", "AL Dhafra"],
                  datasets: [
                    {
                      data: [68, 24, 8],
                      backgroundColor: ["#2563eb", "#60a5fa", "#93c5fd"],
                      borderWidth: 0,
                      cutout: "72%",
                    },
                  ],
                },
                options: {
                  responsive: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                  },
                },
              });
            }
            geoChartsReady = true;
            if (geoPopSpark) geoPopSpark.resize();
            if (geoRegionDonut) geoRegionDonut.resize();
          });
        });
      }

      function initProductCardNavigation() {
        document
          .querySelectorAll(
            "#screen-home .product-card[data-product-idx], #screen-bayaan-search .product-card[data-product-idx], #screen-products .product-card[data-product-idx]",
          )
          .forEach((card) => {
            if (card.dataset.indNavBound) return;
            card.dataset.indNavBound = "1";
            card.style.cursor = "pointer";
            card.addEventListener("click", (e) => {
              if (
                e.target.closest(
                  ".product-actions, .ai-sparkle-action, .ai-sparkle-corner, button, a",
                )
              )
                return;
              openIndicatorDetail(card.getAttribute("data-product-idx"), card);
            });
          });
      }

      function goTo(id) {
        document.body.classList.remove("mode-ai");
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        if (typeof closeHeaderSearchPanel === "function")
          closeHeaderSearchPanel();
        document.querySelectorAll(".screen").forEach((s) => {
          s.classList.remove(
            "active",
            "exit",
            "enter",
            "header-scrolled",
            "header-pinned",
            "header-search-open",
          );
        });
        const el = document.getElementById(id);
        if (el) el.classList.add("active");
        if (id === "screen-editor" && typeof initEditorPreview === "function")
          initEditorPreview();
        if (id === "screen-products") {
          if (typeof initProductsPage === "function") initProductsPage();
          if (typeof refreshProductsPageAOS === "function")
            refreshProductsPageAOS();
        }
        if (id === "screen-observatories") {
          if (typeof initObservatoriesPage === "function")
            initObservatoriesPage();
          if (typeof refreshObservatoriesPageAOS === "function")
            refreshObservatoriesPageAOS();
        }
        if (id === "screen-govdata" && typeof initGovDataCharts === "function")
          initGovDataCharts();
        if (id === "screen-indicator-detail") {
          if (typeof initIndicatorDetailScreen === "function")
            initIndicatorDetailScreen();
          if (typeof refreshIndicatorDetailPageAOS === "function") {
            requestAnimationFrame(() => refreshIndicatorDetailPageAOS());
          }
        }
        if (typeof initHeaderScrollSwap === "function") initHeaderScrollSwap();
        if (typeof syncTopnavActive === "function") syncTopnavActive(id);
        if (typeof updateHomeBanner === "function") updateHomeBanner();
        window.scrollTo(0, 0);
        const scrollMap = {
          "screen-home": "#screen-home .home-main",
          "screen-bayaan-search": "#screen-bayaan-search .bsearch-scroll",
          "screen-govdata": "#screen-govdata .gd-scroll",
          "screen-products": "#screen-products .prod-page-scroll",
          "screen-observatories": "#screen-observatories .obs-page-scroll",
          "screen-geo-view": "#screen-geo-view .geo-page-scroll",
          "screen-indicator-detail": "#screen-indicator-detail #ind-mainEl",
        };
        const scrollSel = scrollMap[id];
        if (scrollSel) {
          const scrollEl = document.querySelector(scrollSel);
          if (scrollEl) scrollEl.scrollTop = 0;
        }
        if (
          id === "screen-home" &&
          typeof initHomeHeroHeaderSwap === "function"
        ) {
          requestAnimationFrame(() => initHomeHeroHeaderSwap());
        }
      }
      window.goTo = goTo;

      function enterAIMode(prefill) {
        document
          .querySelectorAll(".screen")
          .forEach((s) => s.classList.remove("active", "exit", "enter"));
        document.body.classList.add("mode-ai");
        const land = document.getElementById("s-landing");
        const app = document.getElementById("s-app");
        if (app) app.classList.remove("active", "enter");
        if (land) land.classList.add("active");
        const heroInput = document.getElementById("homeSearchInput");
        const searchInput = document.getElementById("bayaanSearchQuery");
        const activeScreen = document.querySelector(
          ".ws-screen.active:not(#screen-home)",
        );
        const panelInput =
          activeScreen &&
          activeScreen.querySelector(".header-search-panel-input");
        const landInput = document.getElementById("land-input");
        const q = (
          prefill ||
          (searchInput && searchInput.value) ||
          (panelInput && panelInput.value) ||
          (heroInput && heroInput.value) ||
          ""
        ).trim();
        if (landInput && q) {
          landInput.value = q;
          if (typeof autoResize === "function") autoResize(landInput);
        }
        document.body.classList.remove("ai-research-lab");
        if (typeof activateAiChatTab === "function") activateAiChatTab();
        window.scrollTo(0, 0);
      }

      function exitAIMode() {
        document.body.classList.remove("mode-ai", "ai-research-lab");
        document
          .querySelectorAll(".ai-screen")
          .forEach((s) => s.classList.remove("active", "exit", "enter"));
        goTo("screen-home");
      }

      function aiModeBack() {
        const labView = document.getElementById("v-research-lab");
        if (labView && labView.classList.contains("on")) {
          showStudioGallery();
          document.body.classList.remove("ai-research-lab");
          return;
        }
        if (shouldStudioBackToGallery()) {
          showStudioGallery();
          return;
        }
        exitAIMode();
      }

      function shouldStudioBackToGallery() {
        if (
          !document.body.classList.contains("mode-ai") ||
          !document.getElementById("s-app")?.classList.contains("active") ||
          !document.getElementById("tv-studio")?.classList.contains("active")
        ) {
          return false;
        }
        const activeView = document.querySelector("#tv-studio .view.on");
        if (!activeView) return false;
        if (activeView.id === "v-dashboard") {
          return document
            .getElementById("dash-library")
            ?.classList.contains("active");
        }
        return [
          "v-agent",
          "v-scenario",
          "v-table",
          "v-report",
          "v-podcast",
        ].includes(activeView.id);
      }

      function _aiEnterApp(q, tab = "chat", onReady) {
        const land = document.getElementById("s-landing");
        const app = document.getElementById("s-app");
        if (!land || !app) return;
        document.body.classList.add("mode-ai");
        land.classList.add("exit");
        setTimeout(() => {
          land.classList.remove("active", "exit");
          app.classList.add("active", "enter");
          setTimeout(() => app.classList.remove("enter"), 350);
          syncLandModeToChatDropdown();
          if (tab === "chat") {
            activateAiChatTab();
            document.getElementById("chatLanding").style.display = "none";
            const drRoot = document.getElementById("drFlow");
            if (drRoot) drRoot.style.display = "block";
            const query = q && String(q).trim() ? String(q).trim() : "";
            if (query) {
              const inp = document.getElementById("chatInput");
              if (inp) inp.value = query;
              setTimeout(() => {
                if (typeof sendMsg === "function") sendMsg(query);
              }, 200);
            } else {
              applyChatModeUi();
            }
          } else {
            switchTab(tab);
          }
          if (typeof onReady === "function") onReady();
        }, 300);
      }

      let editMode = false;
      let selectedComp = null;

      const HOME_BANNERS = {
        default: "assets/banner-default.jpg",
        alAin: "assets/banner-al-ain.png",
        executive: "assets/banner-executive.jpg",
      };

      function updateHomeBanner() {
        let src = HOME_BANNERS.default;
        if (currentPersona === "executive") {
          src = HOME_BANNERS.executive;
        } else if (currentWs && currentWs.code === "AD") {
          src = HOME_BANNERS.alAin;
        }
        const homeImg = document.getElementById("homeHeroBannerImg");
        const gdImg = document.getElementById("gdHeroBannerImg");
        const prodImg = document.getElementById("prodHeroBannerImg");
        const obsImg = document.getElementById("obsHeroBannerImg");
        const editorImg = document.getElementById("editorHeroBannerImg");
        if (homeImg) homeImg.src = src;
        if (gdImg) gdImg.src = src;
        if (prodImg) prodImg.src = src;
        if (obsImg) obsImg.src = src;
        if (editorImg) editorImg.src = src;
      }

      const WS_STORAGE_KEY = "bayaan_active_workspace";
      const WS_REGISTRY = {
        EL: {
          code: "EL",
          name: "Economic & Labor",
          bg: "#EBF5FF",
          color: "#0066FF",
        },
        AD: {
          code: "AD",
          name: "Al Ain Workspace",
          bg: "#F4C0D1",
          color: "#72243E",
        },
        CP: {
          code: "CP",
          name: "CPI & Prices",
          bg: "#E1F5EE",
          color: "#0F6E56",
        },
      };
      let currentWs = { ...WS_REGISTRY.EL };

      const HOME_WS_CONTENT = {
        EL: {
          heroBadge: "Abu Dhabi National Intelligence Platform",
          searchPlaceholder:
            'Ask anything - "Compare CPI with GCC peers", "Run a +2% inflation scenario", "Draft a brief on housing affordability"...',
          dailyBriefCtx: "daily-brief",
          metricSparkles: [
            {
              ctx: "metric-top-mover",
              title: "FDI Inflows — Top Mover",
              icon: "ti-trending-up",
            },
            {
              ctx: "metric-inflation",
              title: "Inflation — Watch Item",
              icon: "ti-alert-triangle",
            },
            {
              ctx: "metric-emiratisation",
              title: "Emiratisation Tracking Gap",
              icon: "ti-trending-down",
            },
          ],
          dailyBrief:
            "Abu Dhabi's economy remains on a solid growth trajectory entering Q2 2026. GDP expanded 3.4% YoY with non-oil sectors now contributing 56.3% — a structural milestone ahead of Vision 2030 targets. Inflation held at 2.8%, though food prices signal a +0.4pp risk. Employment hit a 5-year high, while Emiratisation tracking 0.6pp below annual target requires sector-specific intervention. FDI inflows delivered a standout quarter, surging +11.2% to AED 47.8B — the strongest Q1 performance in six years — underscoring sustained investor confidence in Abu Dhabi's diversification story. However, inflation running 40bps above the 2.4% target, largely driven by food price pressures, warrants close monitoring as it could weigh on household consumption and real wage growth in H2. Closing the Emiratisation gap and anchoring inflation will be the twin policy priorities that determine whether Q2 builds on this momentum or signals a plateauing cycle.",
          qps: [
            "Summarize Abu Dhabi's GDP performance and trends.",
            "Build a GDP trend dashboard for Abu Dhabi",
            "Create a sector-wise GDP breakdown chart",
            "Benchmark Abu Dhabi GDP against UAE average",
            "Forecast Abu Dhabi GDP growth for 2025–2026",
          ],
          metrics: {
            cards: [
              {
                label: "Top Mover",
                value: "+11.2",
                unit: "Percentage(%)",
                caption: "FDI Inflows — strongest Q1 in 6 years",
                trendHtml: "▲ AED 47.8B",
                trendClass: "kpi-a__trend--up",
              },
              {
                label: "Watch Item",
                value: "2.8%",
                unit: "vs target 2.4%",
                caption: "Inflation above target",
                trendHtml: "▲ Food prices driving the overshoot",
                trendClass: "kpi-a__trend--warn",
              },
              {
                label: "Watch Item",
                value: "−0.6%",
                unit: "off target",
                caption: "Emiratisation tracking gap",
                trendHtml: "▼ Sector-specific intervention required",
                trendClass: "kpi-a__trend--down",
              },
            ],
          },
          anomalies: [
            {
              title: "Non-oil GDP — structural shift detected",
              badge: "Watch",
              badgeClass: "badge-watch",
              iconClass: "anomaly-icon--watch",
              icon: "ti-trending-up",
              metricValue: "56.3%",
              metricTrend: "▲ 3.4%",
              metricTrendClass: "val-green",
              sub: "Contribution deviating significantly above the 5-year average trend line.",
              baiCtx: "anomaly-nonoil",
              baiTitle: "Non-oil GDP — Structural Shift",
              baiIcon: "ti-trending-up",
            },
            {
              title: "Inflation — above policy threshold",
              badge: "Moderate",
              badgeClass: "badge-amber",
              iconClass: "anomaly-icon--moderate",
              icon: "ti-alert-triangle",
              metricValue: "2.8%",
              metricTrend: "▲ vs 2.4% target",
              metricTrendClass: "val-amber",
              sub: "Breached the 2.4% target for 3rd consecutive month, driven by food price volatility.",
              baiCtx: "anomaly-inflation",
              baiTitle: "Inflation — Policy Threshold Breach",
              baiIcon: "ti-alert-triangle",
            },
            {
              title: "Emiratisation — persistent shortfall",
              badge: "Critical",
              badgeClass: "badge-red",
              iconClass: "anomaly-icon--critical",
              icon: "ti-trending-down",
              metricValue: "−0.6%",
              metricTrend: "▼ off target",
              metricTrendClass: "val-red",
              sub: "Gap widened for 2 consecutive quarters, flagged for immediate sector-level intervention.",
              baiCtx: "anomaly-emiratisation",
              baiTitle: "Emiratisation — Persistent Shortfall",
              baiIcon: "ti-trending-down",
            },
          ],
          products: [
            {
              cat: "Economy",
              catIcon: "ti-trending-up",
              name: "Consumer price index by main expenditure group - Clothing and footwear",
              val: "3.92M",
              change: "▼ 0.31 (2.0%) Yearly",
              changeClass: "val-red",
              aiSummary:
                "Clothing & footwear CPI is easing year‑over‑year; track whether this deflation offsets housing and food‑led pressures.",
              baiCtx: "el-product-cpi",
              baiTitle: "CPI — Clothing and Footwear",
              baiIcon: "ti-shirt",
            },
            {
              cat: "Economy",
              catIcon: "ti-trending-up",
              name: "Population distribution by gender",
              val: "3.92M",
              change: "▲ 0.31 (2.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Gender distribution is stable with modest growth; watch changes in working‑age balance that drive labour supply and demand.",
              baiCtx: "el-product-population",
              baiTitle: "Population Distribution by Gender",
              baiIcon: "ti-users",
            },
            {
              cat: "Economy",
              catIcon: "ti-trending-up",
              name: "Cost of construction index",
              val: "3.92M",
              change: "▲ 0.31 (2.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Construction costs are trending upward; rising input prices can flow into rents and capex, lifting inflation risk.",
              baiCtx: "el-product-construction",
              baiTitle: "Cost of Construction Index",
              baiIcon: "ti-building",
            },
            {
              cat: "Economy",
              catIcon: "ti-trending-up",
              name: "Gross domestic product by institutional sector at current prices",
              val: "3.92M",
              change: "▲ 0.31 (2.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Institutional‑sector GDP shows which parts of the economy drive growth; compare quarter shifts to spot structural change.",
              baiCtx: "el-product-gdp",
              baiTitle: "GDP by Institutional Sector",
              baiIcon: "ti-chart-bar",
            },
          ],
        },
        AD: {
          heroBadge: "Al Ain National Intelligence Platform",
          dailyBriefCtx: "ad-daily-brief",
          metricSparkles: [
            {
              ctx: "ad-metric-top-mover",
              title: "Field Crop Production Value",
              icon: "ti-plant-2",
            },
            {
              ctx: "ad-metric-construction",
              title: "Construction Cost Inflation",
              icon: "ti-building",
            },
            {
              ctx: "ad-metric-irrigation",
              title: "Irrigated Area Coverage",
              icon: "ti-droplet",
            },
          ],
          searchPlaceholder:
            'Ask anything… "How is Al Ain tourism trending?", "Show agriculture output signals", "Summarize Al Ain household spending patterns"…',
          dailyBrief:
            "Al Ain's economy is entering Q2 2026 with strong momentum across tourism, agriculture, and SME activity. Visitor volume grew 9.2% YoY, greenhouse output improved 6.1%, and household spending rose 3.8%. Labour demand in retail and services remains elevated, while water-intensity in summer months is a key watchpoint for operational planning. Field crop production has reached a historic milestone, with production value hitting AED 2.4B — the highest ever recorded — reflecting the tangible payoff of Al Ain's agri-investment push and precision farming adoption. On the cost side, construction inflation ticking up +0.38% monthly on a steadily upward trend signals rising project delivery costs that could compress margins for infrastructure and real estate developers through Q2 and beyond. Most critically, the 2.0% monthly decline in irrigated area coverage demands urgent attention — as agricultural output scales, shrinking irrigation reach threatens to cap that growth, making water infrastructure efficiency the single most consequential operational risk heading into the summer season.",
          qps: [
            "Summarize Al Ain's tourism performance and trends.",
            "Build an Al Ain services-demand dashboard",
            "Create a district-wise Al Ain economic snapshot",
            "Benchmark Al Ain growth against Abu Dhabi average",
            "Forecast Al Ain demand for summer 2026",
          ],
          metrics: {
            cards: [
              {
                label: "Top Mover",
                value: "AED 2.4B",
                unit: "Production value",
                caption: "Field crop production reached a record high",
                trendHtml: "▲ Highest recorded",
                trendClass: "kpi-a__trend--up",
              },
              {
                label: "Watch Item",
                value: "+0.38%",
                unit: "Monthly",
                caption: "Construction cost inflation",
                trendHtml: "▲ Steadily upward",
                trendClass: "kpi-a__trend--warn",
              },
              {
                label: "Watch Item",
                value: "−2.0%",
                unit: "Monthly",
                caption: "Irrigated area coverage",
                trendHtml: "▼ Monthly decline",
                trendClass: "kpi-a__trend--down",
              },
            ],
          },
          anomalies: [
            {
              title: "Irrigated area — sustained contraction",
              badge: "Critical",
              badgeClass: "badge-red",
              iconClass: "anomaly-icon--critical",
              icon: "ti-droplet",
              metricValue: "−2.0%",
              metricTrend: "Monthly",
              metricTrendClass: "val-red",
              sub: "Coverage declined for 4 consecutive months, below the seasonal baseline for Al Ain districts.",
              baiCtx: "ad-anomaly-irrigation",
              baiTitle: "Irrigated Area — Sustained Contraction",
              baiIcon: "ti-droplet",
            },
            {
              title: "Construction costs — accelerating trend",
              badge: "Moderate",
              badgeClass: "badge-amber",
              iconClass: "anomaly-icon--moderate",
              icon: "ti-building",
              metricValue: "+0.38%",
              metricTrend: "Monthly",
              metricTrendClass: "val-amber",
              sub: "Input costs rising faster than the 12-month average, driven by cement and steel volatility.",
              baiCtx: "ad-anomaly-construction",
              baiTitle: "Construction Costs — Accelerating Trend",
              baiIcon: "ti-building",
            },
            {
              title: "Field crop output — unexpected surge",
              badge: "Watch",
              badgeClass: "badge-watch",
              iconClass: "anomaly-icon--watch",
              icon: "ti-plant-2",
              metricValue: "AED 2.4B",
              metricTrend: "▲ 9.2% YoY",
              metricTrendClass: "val-green",
              sub: "Production value exceeded forecast by 14%, concentrated in greenhouse and protected cultivation.",
              baiCtx: "ad-anomaly-crop",
              baiTitle: "Field Crop Output — Unexpected Surge",
              baiIcon: "ti-plant-2",
            },
          ],
          products: [
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Irrigated Areas by Irrigation Method",
              val: "3.92M",
              change: "▲ 0.1 (2.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Al Ain irrigated area indicators provide automated narratives on water-use efficiency and seasonal coverage shifts.",
              baiCtx: "ad-product-irrigation",
              baiTitle: "Irrigated Areas by Irrigation Method",
              baiIcon: "ti-droplet",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Treated Animals by Type & Clinic",
              val: "18.4K",
              change: "▲ 4.2 (6.1%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Livestock treatment volumes across Al Ain clinics signal rising veterinary demand in peak agricultural months.",
              baiCtx: "ad-product-livestock",
              baiTitle: "Treated Animals by Type & Clinic",
              baiIcon: "ti-paw",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Fruit Trees by Type & Agricultural Centre",
              val: "124K",
              change: "▲ 2.8 (3.4%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Fruit tree counts by centre highlight expansion in protected cultivation zones across Al Ain.",
              baiCtx: "ad-product-fruit-trees",
              baiTitle: "Fruit Trees by Type & Agricultural Centre",
              baiIcon: "ti-trees",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Value of Field Crop Production by Type",
              val: "AED 2.4B",
              change: "▲ 9.2 (12.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Field crop production value reached a record high, led by date palm and greenhouse vegetable output.",
              baiCtx: "ad-product-field-crop",
              baiTitle: "Value of Field Crop Production by Type",
              baiIcon: "ti-plant-2",
            },
          ],
        },
        CP: {
          heroBadge: "Al Ain National Intelligence Platform",
          dailyBriefCtx: "ad-daily-brief",
          metricSparkles: [
            {
              ctx: "ad-metric-top-mover",
              title: "Field Crop Production Value",
              icon: "ti-plant-2",
            },
            {
              ctx: "ad-metric-construction",
              title: "Construction Cost Inflation",
              icon: "ti-building",
            },
            {
              ctx: "ad-metric-irrigation",
              title: "Irrigated Area Coverage",
              icon: "ti-droplet",
            },
          ],
          searchPlaceholder:
            'Ask anything… "How is Al Ain tourism trending?", "Show agriculture output signals", "Summarize Al Ain household spending patterns"…',
          dailyBrief:
            "Abu Dhabi's economy remains on a solid growth trajectory entering Q2 2026. GDP expanded 3.4% YoY with non-oil sectors now contributing 56.3% — a structural milestone ahead of Vision 2030 targets. Inflation held at 2.8%, though food prices signal a +0.4pp risk. Employment hit a 5-year high, while Emiratisation tracking 0.6pp below annual target requires sector-specific intervention. FDI inflows delivered a standout quarter, surging +11.2% to AED 47.8B — the strongest Q1 performance in six years — underscoring sustained investor confidence in Abu Dhabi's diversification story. However, inflation running 40bps above the 2.4% target, largely driven by food price pressures, warrants close monitoring as it could weigh on household consumption and real wage growth in H2. Closing the Emiratisation gap and anchoring inflation will be the twin policy priorities that determine whether Q2 builds on this momentum or signals a plateauing cycle.",
          qps: [
            "Summarize Al Ain's tourism performance and trends.",
            "Build an Al Ain services-demand dashboard",
            "Create a district-wise Al Ain economic snapshot",
            "Benchmark Al Ain growth against Abu Dhabi average",
            "Forecast Al Ain demand for summer 2026",
          ],
          metrics: {
            cards: [
              {
                label: "Top Mover",
                value: "AED 2.4B",
                unit: "Production value",
                caption: "Field crop production reached a record high",
                trendHtml: "▲ Highest recorded",
                trendClass: "kpi-a__trend--up",
              },
              {
                label: "Watch Item",
                value: "+0.38%",
                unit: "Monthly",
                caption: "Construction cost inflation",
                trendHtml: "▲ Steadily upward",
                trendClass: "kpi-a__trend--warn",
              },
              {
                label: "Watch Item",
                value: "−2.0%",
                unit: "Monthly",
                caption: "Irrigated area coverage",
                trendHtml: "▼ Monthly decline",
                trendClass: "kpi-a__trend--down",
              },
            ],
          },
          anomalies: [
            {
              title: "Irrigated area — sustained contraction",
              badge: "Critical",
              badgeClass: "badge-red",
              iconClass: "anomaly-icon--critical",
              icon: "ti-droplet",
              metricValue: "−2.0%",
              metricTrend: "Monthly",
              metricTrendClass: "val-red",
              sub: "Coverage declined for 4 consecutive months, below the seasonal baseline for Al Ain districts.",
              baiCtx: "ad-anomaly-irrigation",
              baiTitle: "Irrigated Area — Sustained Contraction",
              baiIcon: "ti-droplet",
            },
            {
              title: "Construction costs — accelerating trend",
              badge: "Moderate",
              badgeClass: "badge-amber",
              iconClass: "anomaly-icon--moderate",
              icon: "ti-building",
              metricValue: "+0.38%",
              metricTrend: "Monthly",
              metricTrendClass: "val-amber",
              sub: "Input costs rising faster than the 12-month average, driven by cement and steel volatility.",
              baiCtx: "ad-anomaly-construction",
              baiTitle: "Construction Costs — Accelerating Trend",
              baiIcon: "ti-building",
            },
            {
              title: "Field crop output — unexpected surge",
              badge: "Watch",
              badgeClass: "badge-watch",
              iconClass: "anomaly-icon--watch",
              icon: "ti-plant-2",
              metricValue: "AED 2.4B",
              metricTrend: "▲ 9.2% YoY",
              metricTrendClass: "val-green",
              sub: "Production value exceeded forecast by 14%, concentrated in greenhouse and protected cultivation.",
              baiCtx: "ad-anomaly-crop",
              baiTitle: "Field Crop Output — Unexpected Surge",
              baiIcon: "ti-plant-2",
            },
          ],
          products: [
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Irrigated Areas by Irrigation Method",
              val: "3.92M",
              change: "▲ 0.1 (2.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Al Ain irrigated area indicators provide automated narratives on water-use efficiency and seasonal coverage shifts.",
              baiCtx: "ad-product-irrigation",
              baiTitle: "Irrigated Areas by Irrigation Method",
              baiIcon: "ti-droplet",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Treated Animals by Type & Clinic",
              val: "18.4K",
              change: "▲ 4.2 (6.1%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Livestock treatment volumes across Al Ain clinics signal rising veterinary demand in peak agricultural months.",
              baiCtx: "ad-product-livestock",
              baiTitle: "Treated Animals by Type & Clinic",
              baiIcon: "ti-paw",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Fruit Trees by Type & Agricultural Centre",
              val: "124K",
              change: "▲ 2.8 (3.4%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Fruit tree counts by centre highlight expansion in protected cultivation zones across Al Ain.",
              baiCtx: "ad-product-fruit-trees",
              baiTitle: "Fruit Trees by Type & Agricultural Centre",
              baiIcon: "ti-trees",
            },
            {
              cat: "Economy",
              catIcon: "ti-leaf",
              name: "Value of Field Crop Production by Type",
              val: "AED 2.4B",
              change: "▲ 9.2 (12.0%) Yearly",
              changeClass: "val-green",
              aiSummary:
                "Field crop production value reached a record high, led by date palm and greenhouse vegetable output.",
              baiCtx: "ad-product-field-crop",
              baiTitle: "Value of Field Crop Production by Type",
              baiIcon: "ti-plant-2",
            },
          ],
        },
      };

      function bindSparkleContext(sparkle, meta) {
        if (!sparkle) return;
        if (meta && meta.ctx) {
          sparkle.dataset.ctx = meta.ctx;
          sparkle.dataset.title = meta.title || "";
          sparkle.dataset.icon = meta.icon || "ti-sparkles";
        } else {
          delete sparkle.dataset.ctx;
          delete sparkle.dataset.title;
          delete sparkle.dataset.icon;
        }
      }

      function syncHomeSparkleContexts(cfg) {
        if (!cfg) return;
        const pill = document.querySelector(
          "#homeWidgetsStack .daily-brief .home-module-sparkle, #homeWidgetsStack .daily-brief .ai-sparkle-pill",
        );
        if (pill && cfg.dailyBriefCtx) {
          pill.dataset.ctx = cfg.dailyBriefCtx;
          pill.dataset.title =
            cfg.dailyBriefCtx === "ad-daily-brief"
              ? "Al Ain Daily Brief"
              : "Daily Brief For You";
          pill.dataset.icon = "ti-news";
        }
        document
          .querySelectorAll(
            "#homeWidgetsStack .brief-metrics .kpi-a__sparkle.ai-sparkle-click, #homeWidgetsStack .brief-metrics .kpi-a__mark.ai-sparkle-click",
          )
          .forEach((mark, idx) => {
            bindSparkleContext(mark, (cfg.metricSparkles || [])[idx]);
          });
      }

      function updateHomeBriefMetrics(metrics, prefix = "home") {
        if (!metrics || !metrics.cards) return;
        metrics.cards.forEach((c, idx) => {
          const n = idx + 1;
          const setText = (suffix, text) => {
            const el = document.getElementById(prefix + "Metric" + n + suffix);
            if (el && text != null) el.textContent = text;
          };
          setText("Label", c.label);
          setText(
            "Val",
            c.value != null
              ? c.value
              : (c.valueHtml || "").replace(/<[^>]+>/g, ""),
          );
          setText("Unit", c.unit || "");
          setText("Caption", c.caption);
          const delta = document.getElementById(
            prefix + "Metric" + n + "Delta",
          );
          if (delta) {
            delta.innerHTML = c.trendHtml || c.deltaHtml || "";
            delta.className =
              "kpi-a__trend " +
              (c.trendClass || c.deltaClass || "kpi-a__trend--up").replace(
                "kpi-a__delta",
                "kpi-a__trend",
              );
          }
        });
      }

      function updateHomeAnomalies(anomalies, listId = "homeAnomalyList") {
        const list = document.getElementById(listId);
        if (!list || !anomalies) return;
        list.querySelectorAll(".anomaly-item").forEach((item, idx) => {
          const a = anomalies[idx];
          if (!a) return;
          const titleEl = item.querySelector(".anomaly-title");
          const badgeEl = item.querySelector(".anomaly-badge, .badge");
          const metricEl = item.querySelector(".anomaly-metric");
          const subEl = item.querySelector(".anomaly-sub");
          const iconEl = item.querySelector(".anomaly-icon");
          if (titleEl) titleEl.textContent = a.title;
          if (badgeEl) {
            badgeEl.textContent = a.badge;
            badgeEl.className =
              "anomaly-badge badge " + (a.badgeClass || "badge-watch");
          }
          if (iconEl && a.iconClass) {
            iconEl.className = "anomaly-icon " + a.iconClass;
            if (a.icon) {
              const ic = iconEl.querySelector("i");
              if (ic) ic.className = "ti " + a.icon;
            }
          }
          if (metricEl) {
            if (a.metricValue != null) {
              metricEl.innerHTML =
                a.metricValue +
                (a.metricTrend
                  ? ' <span class="anomaly-metric-trend ' +
                    (a.metricTrendClass || "") +
                    '">' +
                    a.metricTrend +
                    "</span>"
                  : "");
            } else {
              metricEl.style.color = a.metricColor || "#111213";
              metricEl.innerHTML = a.metricHtml || "";
            }
          }
          if (subEl) subEl.textContent = a.sub || "";
          if (listId === "homeAnomalyList") {
            const sparkle = item.querySelector(
              ".anomaly-sparkle, .ai-sparkle-corner",
            );
            bindSparkleContext(
              sparkle,
              a.baiCtx
                ? {
                    ctx: a.baiCtx,
                    title: a.baiTitle || a.title,
                    icon: a.baiIcon || "ti-sparkles",
                  }
                : null,
            );
          }
        });
      }

      const HOME_CHART_LAYOUT = { left: 34, right: 220, top: 6, bottom: 54 };
      const HOME_Y_AXIS_LABELS = [108, 106, 104, 102];
      const HOME_CHART_BASELINE_IDX = 2;

      const HOME_PRODUCT_CHART_PRESETS = [
        {
          type: "area",
          line: "0,50 28,44 55,46 82,34 110,36 138,24 165,28 192,18 220,12",
          yMin: 10,
          yMax: 56,
        },
        {
          type: "bar",
          bars: [
            { x: 10, y: 28, w: 24, h: 32, opacity: 0.75 },
            { x: 42, y: 18, w: 24, h: 42, opacity: 1 },
            { x: 74, y: 24, w: 24, h: 36, opacity: 0.8 },
            { x: 106, y: 10, w: 24, h: 50, opacity: 1 },
            { x: 138, y: 20, w: 24, h: 40, opacity: 0.85 },
            { x: 170, y: 14, w: 24, h: 46, opacity: 1 },
          ],
        },
        {
          type: "area",
          line: "0,42 30,50 60,38 90,32 120,40 150,22 180,30 220,14",
          yMin: 12,
          yMax: 56,
        },
        {
          type: "area",
          line: "0,46 36,38 72,42 108,28 144,34 180,20 220,16",
          yMin: 12,
          yMax: 56,
        },
        {
          type: "bar",
          bars: [
            { x: 10, y: 22, w: 24, h: 38, opacity: 0.8 },
            { x: 42, y: 14, w: 24, h: 46, opacity: 1 },
            { x: 74, y: 26, w: 24, h: 34, opacity: 0.75 },
            { x: 106, y: 18, w: 24, h: 42, opacity: 0.9 },
            { x: 138, y: 12, w: 24, h: 48, opacity: 1 },
            { x: 170, y: 24, w: 24, h: 36, opacity: 0.85 },
          ],
        },
        {
          type: "area",
          line: "0,38 32,44 64,30 96,36 128,24 160,32 192,18 220,22",
          yMin: 10,
          yMax: 56,
        },
        {
          type: "area",
          line: "0,32 40,40 80,26 120,34 160,20 200,28 220,14",
          yMin: 8,
          yMax: 52,
        },
        {
          type: "bar",
          bars: [
            { x: 10, y: 30, w: 24, h: 30, opacity: 0.85 },
            { x: 42, y: 16, w: 24, h: 44, opacity: 1 },
            { x: 74, y: 22, w: 24, h: 38, opacity: 0.9 },
            { x: 106, y: 12, w: 24, h: 48, opacity: 1 },
            { x: 138, y: 26, w: 24, h: 34, opacity: 0.8 },
            { x: 170, y: 18, w: 24, h: 42, opacity: 0.95 },
          ],
        },
      ];

      function homeChartTickY(index) {
        const { top, bottom } = HOME_CHART_LAYOUT;
        const n = HOME_Y_AXIS_LABELS.length - 1;
        return top + (index / n) * (bottom - top);
      }

      function homeChartPlotTop() {
        return homeChartTickY(0);
      }

      function homeChartPlotBaseline() {
        return homeChartTickY(HOME_CHART_BASELINE_IDX);
      }

      function homeChartGridSvg() {
        const { left, right } = HOME_CHART_LAYOUT;
        return HOME_Y_AXIS_LABELS.map((label, i) => {
          const y = homeChartTickY(i);
          let gridLine = "";
          if (i < HOME_CHART_BASELINE_IDX) {
            gridLine = `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" stroke="#F0F2F5" stroke-width="1" stroke-dasharray="2 5"/>`;
          } else if (i === HOME_CHART_BASELINE_IDX) {
            gridLine = `<line x1="${left}" y1="${y}" x2="${right}" y2="${y}" stroke="#E8EBEF" stroke-width="1"/>`;
          }
          return (
            gridLine +
            `<text x="${left - 5}" y="${y + 3.5}" text-anchor="end" font-size="8" fill="#9CA3AF" font-family="Inter,sans-serif">${label}</text>`
          );
        }).join("");
      }

      function homeMapLinePoints(points, yMin, yMax) {
        const { left, right } = HOME_CHART_LAYOUT;
        const plotTop = homeChartPlotTop();
        const plotBottom = homeChartPlotBaseline();
        const span = Math.max(yMax - yMin, 1);
        return points
          .trim()
          .split(/\s+/)
          .map((pt) => {
            const [x, y] = pt.split(",").map(Number);
            const nx = left + (x / 220) * (right - left);
            const ny =
              plotBottom - ((y - yMin) / span) * (plotBottom - plotTop);
            return `${nx.toFixed(1)},${ny.toFixed(1)}`;
          })
          .join(" ");
      }

      function homeProductChartSvg(preset, gradId) {
        const grid = homeChartGridSvg();
        const { left, right } = HOME_CHART_LAYOUT;
        const plotTop = homeChartPlotTop();
        const plotBottom = homeChartPlotBaseline();
        if (preset.type === "bar") {
          const plotH = plotBottom - plotTop;
          const bars = (preset.bars || [])
            .map((b) => {
              const nx = left + (b.x / 220) * (right - left);
              const nw = (b.w / 220) * (right - left);
              const nh = (b.h / 60) * plotH;
              const ny = plotBottom - nh;
              const op = b.opacity != null ? b.opacity : 1;
              return `<rect x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" width="${nw.toFixed(1)}" height="${nh.toFixed(1)}" rx="3" fill="#0066FF" opacity="${op}"/>`;
            })
            .join("");
          return `<svg viewBox="0 0 220 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${grid}${bars}</svg>`;
        }
        const mapped = homeMapLinePoints(preset.line, preset.yMin, preset.yMax);
        const fillBase = `${right},${plotBottom} ${left},${plotBottom}`;
        const grad =
          preset.type === "area"
            ? `<defs><linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0066FF" stop-opacity="0.18"/><stop offset="100%" stop-color="#0066FF" stop-opacity="0"/></linearGradient></defs>`
            : "";
        const area =
          preset.type === "area"
            ? `<polygon points="${mapped} ${fillBase}" fill="url(#${gradId})"/>`
            : "";
        return `<svg viewBox="0 0 220 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${grad}${grid}<polyline points="${mapped}" fill="none" stroke="#0066FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>${area}</svg>`;
      }

      function initProductChartsInGrid(grid) {
        if (!grid) return;
        grid
          .querySelectorAll(".product-card[data-product-idx] .product-viz")
          .forEach((viz, cardIndex) => {
            const card = viz.closest(".product-card");
            const idx = parseInt(card.getAttribute("data-product-idx"), 10);
            const presetIdx = Number.isFinite(idx)
              ? idx % HOME_PRODUCT_CHART_PRESETS.length
              : cardIndex % HOME_PRODUCT_CHART_PRESETS.length;
            const preset = HOME_PRODUCT_CHART_PRESETS[presetIdx];
            if (!preset) return;
            let gradPrefix = "home-cg";
            if (grid.closest("#screen-bayaan-search"))
              gradPrefix = "bsearch-cg";
            else if (grid.closest("#screen-products")) gradPrefix = "prod-cg";
            else if (grid.closest("#screen-editor")) gradPrefix = "editor-cg";
            viz.innerHTML = homeProductChartSvg(
              preset,
              gradPrefix + cardIndex,
            );
          });
      }

      function populateProductGrid(grid, products) {
        if (!grid || !products) return;
        grid
          .querySelectorAll(".product-card[data-product-idx]")
          .forEach((card, i) => {
            const p = products[i];
            if (!p) return;
            if (p.idx != null) card.setAttribute("data-product-idx", p.idx);
            const catTag = card.querySelector(".product-cat-tag");
            const catText = card.querySelector(".product-cat-text");
            const catIcon = catTag && catTag.querySelector("i");
            if (catIcon)
              catIcon.className = "ti " + (p.catIcon || "ti-trending-up");
            if (catText) catText.textContent = p.cat || "Economy";
            let ucTag = card.querySelector(".product-usecase-tag");
            if (p.useCaseTag) {
              if (!ucTag) {
                ucTag = document.createElement("span");
                ucTag.className = "product-usecase-tag";
                const nameEl = card.querySelector(".product-name");
                if (nameEl) nameEl.before(ucTag);
              }
              ucTag.textContent = p.useCaseTag;
              ucTag.dataset.tagType = p.useCaseTag
                .toLowerCase()
                .replace(/\s+/g, "-");
            } else if (ucTag) {
              ucTag.remove();
            }
            const nameEl = card.querySelector(".product-name");
            const valEl = card.querySelector(".product-val");
            const changeEl = card.querySelector(".product-change");
            const axisEl = card.querySelector(".product-axis");
            if (nameEl) nameEl.textContent = p.name || "";
            if (p.vizType === "dashboard-thumb") {
              if (valEl) valEl.style.display = "none";
              if (changeEl) changeEl.style.display = "none";
              if (axisEl) axisEl.style.display = "none";
            } else {
              if (valEl) {
                valEl.style.display = "";
                valEl.textContent = formatProductVal(p.val) || "";
              }
              if (changeEl) {
                changeEl.style.display = "";
                changeEl.textContent = p.change || "";
                changeEl.className = "product-change " + productChangeClass(p);
              }
              if (axisEl) axisEl.style.display = "";
            }
            const aiEl = card.querySelector(".product-ai-text");
            if (aiEl) aiEl.textContent = p.aiSummary || "";
            const sparkle = card.querySelector(".ai-sparkle-action");
            bindSparkleContext(
              sparkle,
              p.baiCtx
                ? {
                    ctx: p.baiCtx,
                    title: p.baiTitle || p.name,
                    icon: p.baiIcon || "ti-sparkles",
                  }
                : null,
            );
          });
      }

      function updateHomeProducts(products) {
        homeProductsBase = products;
        refreshHomeProductsModules();
      }

      function updateHomeWorkspaceView(code) {
        const screenHome = document.getElementById("screen-home");
        if (!screenHome) return;
        const key = HOME_WS_CONTENT[code] ? code : "EL";
        const cfg = HOME_WS_CONTENT[key];
        screenHome.classList.toggle("ws-theme-ad", key === "AD");

        const badge = document.getElementById("homeHeroBadge");
        if (badge) badge.textContent = cfg.heroBadge;
        const searchInput = document.getElementById("homeSearchInput");
        if (searchInput) searchInput.placeholder = cfg.searchPlaceholder;
        const brief = document.getElementById("homeDailyBriefBody");
        if (brief) brief.textContent = cfg.dailyBrief;

        ["qp1", "qp2", "qp3", "qp4", "qp5"].forEach((id, idx) => {
          const el = document.getElementById(id);
          if (el) {
            const icon = el.querySelector("i");
            el.innerHTML =
              (icon ? icon.outerHTML + " " : "") + (cfg.qps[idx] || "");
          }
        });

        updateHomeBriefMetrics(cfg.metrics);

        updateHomeAnomalies(cfg.anomalies);
        updateHomeProducts(cfg.products);
        seedHomeFavouritesIndicators();
        refreshHomeFavouritesModules();
        syncHomeSparkleContexts(cfg);
        updateHomeBanner();
        refreshHomeAOS();
      }

      function getWorkspaceDisplayName(name) {
        return name.includes("Workspace") ? name : name + " Workspace";
      }

      function saveActiveWorkspace(code) {
        try {
          if (WS_REGISTRY[code]) localStorage.setItem(WS_STORAGE_KEY, code);
        } catch (e) {
          /* storage unavailable */
        }
      }

      function loadActiveWorkspace() {
        try {
          const code = localStorage.getItem(WS_STORAGE_KEY);
          if (code && WS_REGISTRY[code]) return WS_REGISTRY[code];
        } catch (e) {
          /* storage unavailable */
        }
        return WS_REGISTRY.EL;
      }

      function applyWorkspaceUI(ws) {
        if (!ws) return;
        currentWs = ws;
        const { code, name, bg, color } = ws;
        ["homeWsAvatar", "editorWsAvatar", "bsearchWsAvatar"].forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.textContent = code;
            el.style.background = bg;
            el.style.color = color;
          }
        });
        const displayName = getWorkspaceDisplayName(name);
        ["homeWsName", "editorWsName", "bsearchWsName"].forEach((id) => {
          const el = document.getElementById(id);
          if (el) el.textContent = displayName;
        });
        document
          .querySelectorAll("#wsDrpOverlay .ws-list-item")
          .forEach((item) => item.classList.remove("active-ws"));
        const activeItem = document.querySelector(
          `#wsDrpOverlay .ws-list-item[onclick*="switchWsAndGo('${code}'"]`,
        );
        if (activeItem) activeItem.classList.add("active-ws");
        updateHomeWorkspaceView(code);
      }

      function initWorkspaceState() {
        applyWorkspaceUI(loadActiveWorkspace());
      }

      const DEFAULT_PERSONA = "analyst";
      let currentPersona = DEFAULT_PERSONA;

      function applyPersonaUI(persona) {
        currentPersona = persona === "executive" ? "executive" : "analyst";
        const isExec = currentPersona === "executive";
        document.body.classList.toggle("persona-executive", isExec);
        document.body.classList.toggle("persona-analyst", !isExec);
        const screen = document.getElementById("screen-home");
        if (screen) {
          screen.classList.toggle("persona-executive", isExec);
          screen.classList.toggle("persona-analyst", !isExec);
        }
        const bsearchLabel = document.getElementById("bsearchPersonaLabel");
        if (bsearchLabel)
          bsearchLabel.textContent =
            currentPersona === "executive" ? "Executive" : "Analyst";
        document
          .querySelectorAll("#personaDrpOverlay .ws-list-item")
          .forEach((item) => {
            const active = item.dataset.persona === currentPersona;
            item.classList.toggle("active-ws", active);
            const check = item.querySelector(".ws-list-check");
            if (check) check.style.display = active ? "" : "none";
          });
        updateHomeBanner();
        refreshHomeAOS();
      }

      function initPersonaState() {
        applyPersonaUI(DEFAULT_PERSONA);
      }

      /* ═══ CONFIGURABLE HOME WIDGETS ═══ */
      const HOME_WIDGETS_STORAGE_KEY = "bayaan_home_widgets_v1";
      const HOME_WIDGET_ROW_IDS = ["daily-brief", "anomaly-alerts"];
      const HOME_WIDGET_DEFAULT_LAYOUT = [
        "daily-brief",
        "anomaly-alerts",
        "my-favourites",
        "global-market-intelligence",
      ];
      let homeEditMode = false;

      const HOME_WIDGET_REGISTRY = {
        "daily-brief": {
          title: "Daily Brief",
          description:
            "AI-generated summary of the latest economic and statistical highlights tailored to your persona.",
          previewClass: "widget-preview-mock",
          previewHtml:
            '<div class="widget-preview-mock"><div class="widget-preview-mock__line"></div><div class="widget-preview-mock__line widget-preview-mock__line--sm"></div><div class="widget-preview-mock__blocks"><span class="widget-preview-mock__block"></span><span class="widget-preview-mock__block"></span><span class="widget-preview-mock__block"></span></div></div>',
        },
        "anomaly-alerts": {
          title: "Anomaly Alerts",
          description:
            "Surfaces recent anomalies and signals across your watched indicators that may need attention.",
          previewClass: "widget-preview-mock widget-preview-mock--anomaly",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--anomaly"><div class="widget-preview-mock__line widget-preview-mock__line--sm"></div><div class="widget-preview-mock__bar"></div><div class="widget-preview-mock__bar"></div><div class="widget-preview-mock__bar"></div></div>',
        },
        "my-favourites": {
          title: "My Favourites",
          description:
            "Quick access to pinned indicators, dashboards, and saved explorations you use most.",
          previewClass: "widget-preview-mock widget-preview-mock--favourites",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--favourites"><div class="widget-preview-mock__col"><span class="widget-preview-mock__icon"></span><span class="widget-preview-mock__line"></span></div><div class="widget-preview-mock__col"><span class="widget-preview-mock__icon"></span><span class="widget-preview-mock__line"></span></div><div class="widget-preview-mock__col"><span class="widget-preview-mock__icon"></span><span class="widget-preview-mock__line"></span></div></div>',
        },
        "global-market-intelligence": {
          title: "Global Market Intelligence",
          description:
            "GCC peer comparisons and regional market context for Abu Dhabi indicators.",
          previewClass: "widget-preview-mock widget-preview-mock--gmi",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--gmi"><div class="widget-preview-mock__title">GCC View</div><div class="widget-preview-mock__cols"><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span></div></div>',
        },
        "executive-insights": {
          title: "Executive Insights",
          description:
            "Narrative data stories with charts designed for executive-level briefing and decision-making.",
          previewClass: "widget-preview-mock widget-preview-mock--insights",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--insights"><div class="widget-preview-mock__cols"><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span></div></div>',
        },
        "strategic-indicators": {
          title: "Strategic Indicators Pulse",
          description:
            "Pulse view of strategic KPIs tracked against targets, trends, and benchmarks.",
          previewClass: "widget-preview-mock widget-preview-mock--indicators",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--indicators"><div class="widget-preview-mock__cols"><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span><span class="widget-preview-mock__col-bar"></span></div></div>',
        },
        "recommended-actions": {
          title: "Recommended Actions",
          description:
            "AI-suggested next steps based on current anomalies, trends, and your areas of interest.",
          previewClass: "widget-preview-mock widget-preview-mock--actions",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--actions"><div class="widget-preview-mock__bar"></div><div class="widget-preview-mock__bar"></div><div class="widget-preview-mock__bar"></div></div>',
        },
        "bayaan-for-you": {
          title: "Bayaan For You",
          description:
            "Personalized continue-where-you-left-off items and an engagement map of your activity.",
          previewClass: "widget-preview-mock widget-preview-mock--foryou",
          previewHtml:
            '<div class="widget-preview-mock widget-preview-mock--foryou"><span></span><span></span></div>',
        },
      };

      function getHomeWidgetSlot(id) {
        return document.querySelector(
          `.home-widget-slot[data-widget-id="${id}"]`,
        );
      }

      function getHomeWidgetLayout() {
        try {
          const raw = localStorage.getItem(HOME_WIDGETS_STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length) {
              return parsed.filter((id) => HOME_WIDGET_REGISTRY[id]);
            }
          }
        } catch (e) {
          /* storage unavailable */
        }
        return HOME_WIDGET_DEFAULT_LAYOUT.slice();
      }

      function saveHomeWidgetLayout(layout) {
        try {
          localStorage.setItem(
            HOME_WIDGETS_STORAGE_KEY,
            JSON.stringify(layout),
          );
        } catch (e) {
          /* storage unavailable */
        }
      }

      function updateHomeWidgetRow() {
        const row = document.getElementById("homeWidgetRowBrief");
        if (!row) return;
        const layout = getHomeWidgetLayout();
        const activeInRow = HOME_WIDGET_ROW_IDS.filter((id) =>
          layout.includes(id),
        );
        row.classList.toggle("is-active", activeInRow.length > 0);
        row.classList.toggle("home-row-2", activeInRow.length === 2);
        row.classList.toggle("home-row-1", activeInRow.length === 1);
      }

      function applyHomeWidgetLayout() {
        const stack = document.getElementById("homeWidgetsStack");
        const row = document.getElementById("homeWidgetRowBrief");
        if (!stack) return;

        const layout = getHomeWidgetLayout();
        Object.keys(HOME_WIDGET_REGISTRY).forEach((id) => {
          const slot = getHomeWidgetSlot(id);
          if (!slot) return;
          const active = layout.includes(id);
          slot.classList.toggle("is-active", active);
        });

        if (row) {
          HOME_WIDGET_ROW_IDS.forEach((id) => {
            const slot = getHomeWidgetSlot(id);
            if (slot && layout.includes(id)) row.appendChild(slot);
          });
          if (layout.some((id) => HOME_WIDGET_ROW_IDS.includes(id))) {
            stack.insertBefore(row, stack.firstElementChild);
          }
        }

        layout.forEach((id) => {
          if (HOME_WIDGET_ROW_IDS.includes(id)) return;
          const slot = getHomeWidgetSlot(id);
          if (slot) stack.appendChild(slot);
        });

        const addBar = document.getElementById("homeAddWidgetBar");
        if (addBar) stack.appendChild(addBar);

        updateHomeWidgetRow();
        renderHomeWidgetPicker();
        if (typeof refreshHomeAOS === "function") refreshHomeAOS();
        if (typeof initBayaanAISparkles === "function") initBayaanAISparkles();
      }

      function setHomeEditMode(on) {
        homeEditMode = !!on;
        const screen = document.getElementById("screen-home");
        if (screen) screen.classList.toggle("home-edit-mode", homeEditMode);
        const editBtn = document.getElementById("homeEditBtn");
        if (editBtn) {
          editBtn.classList.toggle("is-active", homeEditMode);
          editBtn.title = homeEditMode ? "Save home layout" : "Edit widgets";
          editBtn.innerHTML = homeEditMode
            ? '<i class="ti ti-device-floppy"></i><span>Save layout</span>'
            : '<i class="ti ti-edit"></i><span>Edit widgets</span>';
        }
        if (!homeEditMode) {
          closeHomeWidgetPicker();
        } else {
          renderHomeWidgetPicker();
        }
      }

      function toggleHomeEditMode() {
        const entering = !homeEditMode;
        setHomeEditMode(entering);
        if (entering) {
          toast("Edit mode — remove widgets or add new ones", "ti-edit");
        } else {
          toast("Home layout saved", "ti-device-floppy");
        }
      }
      window.toggleHomeEditMode = toggleHomeEditMode;

      function removeHomeWidget(id) {
        if (!HOME_WIDGET_REGISTRY[id]) return;
        const layout = getHomeWidgetLayout().filter((w) => w !== id);
        if (!layout.length) {
          toast("Keep at least one widget on your home page", "ti-info-circle");
          return;
        }
        saveHomeWidgetLayout(layout);
        applyHomeWidgetLayout();
        toast("Widget removed", "ti-layout-grid-remove");
      }
      window.removeHomeWidget = removeHomeWidget;

      function addHomeWidget(id) {
        if (!HOME_WIDGET_REGISTRY[id]) return;
        const layout = getHomeWidgetLayout();
        if (layout.includes(id)) return;
        layout.push(id);
        saveHomeWidgetLayout(layout);
        applyHomeWidgetLayout();
        closeHomeWidgetPicker();
        toast("Widget added to home page", "ti-plus");
      }
      window.addHomeWidget = addHomeWidget;

      function renderHomeWidgetPicker() {
        const grid = document.getElementById("homeWidgetPickerGrid");
        if (!grid) return;
        const layout = getHomeWidgetLayout();
        const available = Object.keys(HOME_WIDGET_REGISTRY).filter(
          (id) => !layout.includes(id),
        );
        if (!available.length) {
          grid.innerHTML =
            '<p class="home-widget-picker-empty">All widgets are present in the home page.</p>';
          return;
        }
        grid.innerHTML = available
          .map((id) => {
            const w = HOME_WIDGET_REGISTRY[id];
            return `<article class="home-widget-picker-card">
              <div class="home-widget-picker-card-head">
                <div class="home-widget-picker-card-meta">
                  <span class="home-widget-picker-card-title">${w.title}</span>
                  <span class="home-widget-picker-info" tabindex="0" role="button" aria-label="About ${w.title}">
                    <i class="ti ti-info-circle"></i>
                    <span class="home-widget-picker-info-tip">${w.description || ""}</span>
                  </span>
                </div>
                <button type="button" class="home-widget-picker-add" onclick="addHomeWidget('${id}')" aria-label="Add ${w.title}"><i class="ti ti-plus"></i></button>
              </div>
              <div class="home-widget-picker-preview">${w.previewHtml}</div>
            </article>`;
          })
          .join("");
      }

      function openHomeWidgetPicker() {
        if (!homeEditMode) setHomeEditMode(true);
        renderHomeWidgetPicker();
        document
          .getElementById("screen-home")
          ?.classList.add("home-widget-sidebar-open");
      }
      window.openHomeWidgetPicker = openHomeWidgetPicker;

      function closeHomeWidgetPicker() {
        document
          .getElementById("screen-home")
          ?.classList.remove("home-widget-sidebar-open");
      }
      window.closeHomeWidgetPicker = closeHomeWidgetPicker;

      function initHomeWidgets() {
        applyHomeWidgetLayout();
      }
      window.initHomeWidgets = initHomeWidgets;

      function openPersonaDrp() {
        const overlay = document.getElementById("personaDrpOverlay");
        const dropdown = overlay.querySelector(".ws-dropdown");
        const trigger = [
          ...document.querySelectorAll(".nav-user"),
          document.getElementById("bsearchPersonaChip"),
        ].find((el) => el && el.offsetParent !== null);
        if (trigger && dropdown) {
          const rect = trigger.getBoundingClientRect();
          dropdown.style.top = rect.bottom + 8 + "px";
          dropdown.style.right =
            Math.max(16, window.innerWidth - rect.right) + "px";
          dropdown.style.left = "auto";
        }
        overlay.classList.add("open");
      }

      function closePersonaDrp(e) {
        if (!e || e.target === document.getElementById("personaDrpOverlay")) {
          document.getElementById("personaDrpOverlay").classList.remove("open");
        }
      }

      function switchPersona(persona) {
        applyPersonaUI(persona);
        closePersonaDrp();
        initBayaanAISparkles();
      }

      function openWsDrp() {
        const overlay = document.getElementById("wsDrpOverlay");
        const dropdown = overlay.querySelector(".ws-dropdown");
        const trigger = [
          document.getElementById("homeWsChip"),
          document.getElementById("editorWsChip"),
          document.getElementById("bsearchWsChip"),
        ].find((chip) => chip && chip.offsetParent !== null);
        if (trigger && dropdown) {
          const rect = trigger.getBoundingClientRect();
          dropdown.style.top = rect.bottom + 8 + "px";
          dropdown.style.left = rect.left + "px";
        }
        overlay.classList.add("open");
      }
      function closeWsDrp(e) {
        if (!e || e.target === document.getElementById("wsDrpOverlay")) {
          document.getElementById("wsDrpOverlay").classList.remove("open");
        }
      }
      function switchWsAndGo(code, name, bg, color) {
        const ws = WS_REGISTRY[code] || { code, name, bg, color };
        applyWorkspaceUI(ws);
        saveActiveWorkspace(code);
        goTo("screen-home");
        document.getElementById("wsDrpOverlay").classList.remove("open");
      }

      function openSlide(code, name) {
        const el = document.getElementById("slidePanelAvatar");
        const nm = document.getElementById("slidePanelName");
        const colors = {
          EL: { bg: "#E6F1FB", color: "#185FA5" },
          AD: { bg: "#F4C0D1", color: "#72243E" },
          CP: { bg: "#E1F5EE", color: "#0F6E56" },
        };
        const c = colors[code] || colors.EL;
        el.textContent = code;
        el.style.background = c.bg;
        el.style.color = c.color;
        if (nm) nm.textContent = name;
        document.getElementById("slideOverlay").classList.add("open");
      }
      function closeSlide(e) {
        if (!e || e.target === document.getElementById("slideOverlay")) {
          document.getElementById("slideOverlay").classList.remove("open");
        }
      }

      function toggleChip(el) {
        el.classList.toggle("active");
      }
      function toggleSingle(el, parent) {
        parent
          .querySelectorAll(".chip")
          .forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
      }

      function initEditorPreview() {
        const cfg = HOME_WS_CONTENT.EL;
        if (!cfg) return;

        const ws = WS_REGISTRY.EL || { name: "Economic & Labor Workspace" };
        const previewName = document.getElementById("editorPreviewWsName");
        if (previewName)
          previewName.textContent = getWorkspaceDisplayName(ws.name);

        const heroBadge = document.getElementById("editorHeroBadge");
        if (heroBadge)
          heroBadge.textContent =
            cfg.heroBadge || "Abu Dhabi National Intelligence Platform";

        const searchInput = document.getElementById("editorSearchInput");
        if (searchInput)
          searchInput.placeholder =
            cfg.searchPlaceholder || searchInput.placeholder;

        const qpEl = document.getElementById("editorQuickPrompts");
        if (qpEl && cfg.qps) {
          const row1 = cfg.qps.slice(0, 3);
          const row2 = cfg.qps.slice(3, 5);
          qpEl.innerHTML = [
            cfg.qps.length
              ? `<div class="quick-prompts-row">${row1.map((q) => `<span class="quick-prompt" tabindex="-1"><i class="ti ti-sparkles"></i> ${q}</span>`).join("")}</div>`
              : "",
            row2.length
              ? `<div class="quick-prompts-row">${row2.map((q) => `<span class="quick-prompt" tabindex="-1"><i class="ti ti-sparkles"></i> ${q}</span>`).join("")}</div>`
              : "",
          ].join("");
        }

        const briefEl = document.getElementById("editorDailyBriefBody");
        if (briefEl) briefEl.textContent = cfg.dailyBrief;

        updateHomeBriefMetrics(cfg.metrics, "editor");
        updateHomeAnomalies(cfg.anomalies, "editorAnomalyList");
        homeProductsBase = cfg.products;
        refreshHomeProductsModules();
        seedHomeFavouritesIndicators();
        refreshHomeFavouritesModules();
        updateHomeBanner();
        if (editMode) setEditMode(false);
      }

      function setEditMode(on) {
        editMode = on;
        const btn = document.getElementById("editModeBtn");
        // const toolbar = document.getElementById('editToolbar');
        const badge = document.getElementById("editModeBadge");
        const subtitle = document.getElementById("editorSubtitle");
        const scopeHint = document.getElementById("scopeHint");
        const compContext = document.getElementById("compContext");
        const comps = document.querySelectorAll("#screen-editor .comp-wrap");

        if (btn) {
          btn.innerHTML = on
            ? '<i class="ti ti-x"></i> Exit edit mode'
            : '<i class="ti ti-edit"></i> Edit workspace';
        }
        // if (toolbar) toolbar.classList.toggle('visible', on);
        if (badge) badge.classList.toggle("is-visible", on);
        if (subtitle) {
          subtitle.textContent = on
            ? "Click a component to select it, then prompt a targeted change."
            : "Describe workspace-level changes or generate components.";
        }
        if (scopeHint && !on)
          scopeHint.innerHTML = '<i class="ti ti-layout"></i> Workspace scope';

        comps.forEach((c) => {
          c.classList.toggle("editable", on);
          if (!on) c.classList.remove("comp-selected");
        });

        if (!on) {
          selectedComp = null;
          if (compContext) compContext.classList.remove("visible");
        }
      }

      function toggleEditMode() {
        setEditMode(!editMode);
      }

      function selectComp(id, name) {
        if (!editMode) return;
        document
          .querySelectorAll("#screen-editor .comp-wrap")
          .forEach((c) => c.classList.remove("comp-selected"));
        selectedComp = id;
        const el = document.getElementById(id);
        if (el) el.classList.add("comp-selected");
        const compContext = document.getElementById("compContext");
        const compContextName = document.getElementById("compContextName");
        const scopeHint = document.getElementById("scopeHint");
        const prompt = document.getElementById("editorPrompt");
        if (compContextName) compContextName.textContent = name;
        if (compContext) compContext.classList.add("visible");
        if (scopeHint)
          scopeHint.innerHTML =
            '<i class="ti ti-components"></i> Component scope';
        const hints = {
          "comp-daily":
            "e.g. Focus daily brief on Emiratisation only with sector breakdown…",
          "comp-anomaly":
            "e.g. Show anomalies only in the National Accounts subdomain of Economy…",
          "comp-obs":
            "e.g. Switch observatory to Labour Market, highlight Q1 2026 trends…",
          "comp-favourites":
            "e.g. Pin CPI dashboard and Labour Market indicator to my favourites…",
          "comp-products":
            "e.g. Add non-oil GDP as a product indicator to this section…",
        };
        if (prompt) {
          prompt.placeholder =
            hints[id] || "Describe the change you want for this component…";
          prompt.focus();
        }
      }

      function setEditorPrompt(text) {
        document.getElementById("editorPrompt").value = text;
        document.getElementById("editorPrompt").focus();
      }

      function applyEditorPrompt() {
        const prompt = document.getElementById("editorPrompt").value.trim();
        if (!prompt) return;
        const lower = prompt.toLowerCase();

        if (
          selectedComp === "comp-anomaly" ||
          lower.includes("anomal") ||
          lower.includes("national accounts")
        ) {
          const listEl = document.getElementById("editorAnomalyList");
          if (listEl) {
            listEl.querySelectorAll(".anomaly-item").forEach((item, idx) => {
              item.style.display = idx === 0 ? "" : "none";
            });
            if (!listEl.querySelector(".filter-note")) {
              const note = document.createElement("div");
              note.className = "filter-note";
              note.innerHTML =
                '<i class="ti ti-filter"></i> Filtered to National Accounts subdomain · Economy domain only';
              listEl.appendChild(note);
            }
          }
        }

        const success = document.getElementById("applySuccess");
        const promptEl = document.getElementById("editorPrompt");
        if (success) success.classList.add("show");
        if (promptEl) promptEl.value = "";
        if (success) setTimeout(() => success.classList.remove("show"), 2800);
      }

      function saveEdit() {
        saveWorkspace();
      }

      function saveWorkspace() {
        if (editMode) setEditMode(false);
        toast("Workspace saved", "ti-device-floppy");
      }

      document.querySelectorAll(".obs-tab").forEach((tab) => {
        tab.addEventListener("click", function () {
          this.closest(".obs-tabs")
            .querySelectorAll(".obs-tab")
            .forEach((t) => t.classList.remove("active"));
          this.classList.add("active");
        });
      });

      document.querySelectorAll(".chip").forEach((c) => {
        if (!c.getAttribute("onclick")) {
          c.addEventListener("click", function () {
            this.classList.toggle("active");
          });
        }
      });
      /* ══ STATE ══ */
      let drPhase = "clarify";
      let clarifyCount = 0;
      let chartInst = {};

      /* ══ TOAST ══ */
      function toast(msg, icon = "ti-check") {
        const iconColors = {
          "ti-check": "var(--success)",
          "ti-download": "var(--accent)",
          "ti-trash": "var(--danger)",
          "ti-wand": "#8B5CF6",
          "ti-sparkles": "var(--accent)",
          "ti-send": "var(--accent)",
          "ti-shield-check": "var(--success)",
          "ti-rocket": "#8B5CF6",
          "ti-headphones": "#8B5CF6",
          "ti-telescope": "var(--accent)",
          "ti-calculator": "var(--warning)",
          "ti-database": "var(--accent)",
          "ti-upload": "var(--warning)",
          "ti-brand-google-drive": "var(--warning)",
          "ti-link": "var(--success)",
          "ti-stack-2": "var(--accent)",
          "ti-copy": "var(--text-secondary)",
          "ti-plus": "var(--success)",
          "ti-settings": "var(--text-secondary)",
          "ti-info-circle": "var(--accent)",
          "ti-calendar": "var(--warning)",
          "ti-player-play": "var(--success)",
          "ti-share": "var(--accent)",
          "ti-git-branch": "#8B5CF6",
          "ti-external-link": "var(--accent)",
          "ti-file-analytics": "var(--accent)",
          "ti-message-circle": "var(--accent)",
          "ti-file-text": "var(--accent)",
          "ti-device-floppy": "var(--accent)",
        };
        const c = document.getElementById("toast-container");
        const t = document.createElement("div");
        t.className = "toast";
        t.innerHTML = `<i class="ti ${icon}" style="font-size:16px;color:${iconColors[icon] || "var(--success)"};flex-shrink:0;"></i>${msg}`;
        c.appendChild(t);
        setTimeout(() => t.remove(), 2800);
      }

      /* ══ STUDIO NAVIGATION ══ */
      const TOOLS = {
        dashboard: {
          name: "Dashboard Studio",
          actions: `<button class="tb-btn tb-btn-accent" onclick="dashGoTo('dash-builder')"><i class="ti ti-sparkles"></i> New Dashboard</button>`,
        },
        research: {
          name: "Research Lab",
          actions: `<button class="tb-btn" onclick="rlGenerate('Report')"><i class="ti ti-sparkles"></i> Generate output</button><button class="tb-btn tb-btn-accent" onclick="toast('Sharing…','ti-share')"><i class="ti ti-share"></i> Share</button>`,
        },
        agent: {
          name: "AI Agent Builder",
          actions: `<button class="tb-btn" onclick="agentGoTo('av-builder')"><i class="ti ti-plus"></i> New Agent</button><button class="tb-btn tb-btn-accent" onclick="agentGoTo('av-library')"><i class="ti ti-layout-grid"></i> My Agents</button>`,
        },
        etl: {
          name: "Transform Data",
          actions: `<button class="tb-btn" onclick="etlGoTo('etl-library')"><i class="ti ti-layout-grid"></i> My Pipelines</button><button class="tb-btn tb-btn-accent" onclick="etlGoTo('etl-builder')"><i class="ti ti-plus"></i> New Pipeline</button>`,
        },
        kpi: {
          name: "KPI Builder",
          actions: `<button class="tb-btn tb-btn-accent" onclick="kpiGoTo('kpi-builder')"><i class="ti ti-sparkles"></i> New KPI</button>`,
        },
        scenario: {
          name: "Scenario Simulator",
          actions: `<button class="tb-btn tb-btn-accent" onclick="scnGoTo('scenario-builder')"><i class="ti ti-sparkles"></i> New Simulation</button>`,
        },
        table: {
          name: "Table Builder",
          actions: `<button class="tb-btn tb-btn-accent" onclick="tblGoTo('table-builder')"><i class="ti ti-sparkles"></i> New Table</button>`,
        },
        report: {
          name: "Report Builder",
          actions: `<button class="tb-btn tb-btn-accent" onclick="rptGoTo('report-builder')"><i class="ti ti-sparkles"></i> New Report</button>`,
        },
        podcast: {
          name: "Podcast Studio",
          actions: `<button class="tb-btn" onclick="toast('MP3 downloaded','ti-download')"><i class="ti ti-download"></i> Download MP3</button><button class="tb-btn tb-btn-accent" onclick="toast('Published to Artifacts','ti-stack-2')"><i class="ti ti-stack-2"></i> Publish</button>`,
        },
      };

      function _studioShowOnly(id) {
        document.querySelectorAll("#tv-studio .view").forEach(function (v) {
          v.classList.remove("on");
          v.style.display = "none";
        });
        var el = document.getElementById(id);
        if (el) {
          el.classList.add("on");
          el.style.display = "flex";
        }
      }

      function _setStudioTopbar(bc, actions) {
        var bcEl = document.getElementById("studioBC");
        var actEl = document.getElementById("studioActions");
        if (bcEl && bc !== undefined) bcEl.innerHTML = bc;
        if (actEl && actions !== undefined) actEl.innerHTML = actions;
      }

      function showGallery() {
        _studioShowOnly("v-gallery");
        _setStudioTopbar('<span class="current">Bayaan Studio</span>', "");
      }

      function showStudioSelector() {
        document.body.classList.remove("ai-research-lab");
        syncSidebarActiveTab("studio");
        document
          .querySelectorAll(".tab-view")
          .forEach((t) => t.classList.remove("active"));
        const studioTab = document.getElementById("tv-studio");
        if (studioTab) studioTab.classList.add("active");
        _studioShowOnly("v-studio-selector");
        _setStudioTopbar('<span class="current">Studio</span>', "");
      }

      function showStudioGallery() {
        _studioShowOnly("v-gallery");
        _setStudioTopbar('<span class="current">Bayaan Studio</span>', "");
      }

      const RESEARCH_LAB_URL = "bayaan-workbench-v4.html";

      function enterStudioResearchLab(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const studioTab = document.getElementById("tv-studio");
        if (studioTab && !studioTab.classList.contains("active")) {
          const studioSb =
            document.querySelector(
              '#s-app .sb-nav .sb-item[onclick*="studio"]',
            ) || document.querySelector('.sb-nav .sb-item[onclick*="studio"]');
          switchTab("studio", studioSb);
        }
        document.body.classList.add("ai-research-lab");
        _studioShowOnly("v-research-lab");
        const labView = document.getElementById("v-research-lab");
        const frame = document.getElementById("researchLabFrame");
        if (labView) {
          labView.classList.add("on");
          labView.style.display = "flex";
          labView.style.flex = "1";
          labView.style.minHeight = "0";
        }
        if (frame) {
          const target = new URL(RESEARCH_LAB_URL, window.location.href).href;
          if (!frame.src || !frame.src.includes("bayaan-workbench-v4")) {
            frame.src = target;
          }
        }
        const t = TOOLS["research"];
        _setStudioTopbar(
          `<a onclick="showStudioGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">${t.name}</span>`,
          "",
        );
      }

      function openTool(key) {
        if (key === "research") {
          enterStudioResearchLab();
          return;
        }
        _studioShowOnly("v-" + key);
        const t = TOOLS[key];
        _setStudioTopbar(
          `<a onclick="showStudioGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">${t.name}</span>`,
          t.actions,
        );
        if (key === "podcast") {
          initPodWave();
        }
        if (key === "agent") agentGoToView("av-library");
        if (key === "dashboard") dashGoTo("dash-library");
        if (key === "kpi") kpiGoTo("kpi-library");
        if (key === "table") tblGoTo("table-library");
        if (key === "report") rptGoTo("report-library");
        if (key === "scenario") scnGoTo("scenario-library");
        if (key === "etl") etlGoTo("etl-library");
      }

      /* ══ STUDIO TOOL FUNCTIONS ══ */

      /* ── CHARTS ── */
      let charts = {};

      function mkChart(id, type, data, opts = {}) {
        const ctx = document.getElementById(id);
        if (!ctx) return;
        if (charts[id]) {
          charts[id].destroy();
          delete charts[id];
        }
        charts[id] = new Chart(ctx, {
          type,
          data,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: opts.legend || { display: false },
              tooltip: {
                backgroundColor: "#fff",
                titleColor: "#1A1D2E",
                bodyColor: "#6B7280",
                borderColor: "#E8EAF0",
                borderWidth: 1,
                padding: 10,
              },
            },
            scales:
              type === "doughnut" || type === "pie"
                ? {}
                : {
                    x: {
                      grid: { display: false },
                      ticks: { font: { size: 11 }, color: "#9CA3AF" },
                    },
                    y: {
                      grid: { color: "#F0F2F8" },
                      ticks: { font: { size: 11 }, color: "#9CA3AF" },
                    },
                  },
            ...opts.extra,
          },
        });
      }

      function initScenarioCharts() {
        mkChart("scChart1", "bar", {
          labels: ["Baseline", "Scenario"],
          datasets: [
            {
              label: "GDP Growth %",
              data: [3.4, 2.9],
              backgroundColor: ["#C7CDFF", "#4F63FF"],
              borderRadius: 6,
            },
          ],
        });
        mkChart(
          "scChart2",
          "bar",
          {
            labels: [
              "Tourism",
              "Construction",
              "Non-oil Mfg",
              "Financial",
              "Oil & Gas",
            ],
            datasets: [
              {
                data: [11.4, 8.2, 6.1, 3.8, 0.9],
                backgroundColor: [
                  "#4F63FF",
                  "#6EE7B7",
                  "#C7CDFF",
                  "#A7F3D0",
                  "#FDE68A",
                ],
                borderRadius: 4,
              },
            ],
          },
          { legend: { display: false } },
        );
      }

      function initPodWave() {
        const w = document.getElementById("podWave");
        if (!w) return;
        const h = [
          14, 22, 36, 48, 40, 56, 44, 28, 52, 64, 48, 36, 44, 28, 18, 40, 54,
          38, 22, 16,
        ];
        w.innerHTML = h
          .map(
            (v, i) =>
              `<div class="pod-bar" style="height:${v}px;animation:wa ${(0.7 + i * 0.06).toFixed(2)}s ease-in-out ${(i * 0.05).toFixed(2)}s infinite alternate;"></div>`,
          )
          .join("");
      }

      const waCss = `@keyframes wa{0%,100%{transform:scaleY(.25);}50%{transform:scaleY(1);}}`;
      const styleEl = document.createElement("style");
      styleEl.textContent = waCss;
      document.head.appendChild(styleEl);

      /* ── AGENT STUDIO ── */
      const BAI_AVATAR_SRC = "./assets/ai-chat-thumb.svg";

      function baiAvatarEl(className = "msg-av ai", size = 28) {
        const img = document.createElement("img");
        img.className = className;
        img.src = BAI_AVATAR_SRC;
        img.alt = "Bayaan AI";
        img.width = size;
        img.height = size;
        return img;
      }

      function baiAvatarHtml(className = "msg-av ai", size = 28) {
        return `<img class="${className}" src="${BAI_AVATAR_SRC}" alt="Bayaan AI" width="${size}" height="${size}" />`;
      }

      function isAgentStudioActive() {
        const agentEl = document.getElementById("v-agent");
        return (
          document.getElementById("s-app")?.classList.contains("active") &&
          document.body.classList.contains("mode-ai") &&
          document.getElementById("tv-studio")?.classList.contains("active") &&
          agentEl?.classList.contains("on")
        );
      }

      function withAgentStudioReady(callback) {
        const openStudio = () => {
          const studioSb = document.querySelector(
            '#s-app .sb-nav .sb-item[data-sb-tab="studio"]',
          );
          switchTab("studio", studioSb);
          openTool("agent");
          if (typeof callback === "function") callback();
        };
        const app = document.getElementById("s-app");
        if (
          app &&
          app.classList.contains("active") &&
          document.body.classList.contains("mode-ai")
        ) {
          openStudio();
          return;
        }
        if (typeof _aiEnterApp === "function") {
          _aiEnterApp("", "studio", openStudio);
          return;
        }
        openStudio();
      }

      function agentGoToView(id) {
        document
          .querySelectorAll("#v-agent .av-view")
          .forEach((v) => v.classList.remove("active"));
        const el = document.getElementById(id);
        if (el) el.classList.add("active");
        if (id === "av-builder") agStartBuilder();
      }

      function agentGoTo(id) {
        if (isAgentStudioActive()) {
          agentGoToView(id);
          return;
        }
        withAgentStudioReady(() => agentGoToView(id));
      }
      function agentCreateNew() {
        agentGoTo("av-builder");
      }
      function openAgentWorkspace() {
        withAgentStudioReady(() => agentGoToView("av-workspace"));
      }
      window.agentGoTo = agentGoTo;
      window.agentCreateNew = agentCreateNew;
      window.openAgentWorkspace = openAgentWorkspace;
      function agLibTab(el, tab) {
        document
          .querySelectorAll("#v-agent .lib-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("ag-tab-my").style.display =
          tab === "my" ? "" : "none";
        document.getElementById("ag-tab-pub").style.display =
          tab === "pub" ? "" : "none";
      }
      /* Modal */
      let agModalChoice = "priv";
      function agOpenModal() {
        document.getElementById("agentSaveModal").classList.add("show");
      }
      function agCloseModal() {
        document.getElementById("agentSaveModal").classList.remove("show");
      }
      function agSelectModal(c) {
        agModalChoice = c;
        document
          .getElementById("agMoPriv")
          .classList.toggle("sel", c === "priv");
        document.getElementById("agMoPub").classList.toggle("sel", c === "pub");
      }
      function agConfirmSave() {
        agCloseModal();
        const msg =
          agModalChoice === "pub"
            ? "Agent submitted for review — will appear in Library once approved"
            : "Agent saved to My Agents";
        toast(msg, "ti-check");
        setTimeout(() => agentGoTo("av-library"), 500);
      }
      /* Builder conversation engine */
      const AG_STEPS = [
        {
          key: "purpose",
          msg: `Hi! I'm going to help you build an agent in a few quick questions. 🎯\n\n**What should this agent do for you?**`,
          chips: [
            { i: "ti-alert-triangle", l: "Detect anomalies in data" },
            { i: "ti-chart-line", l: "Monitor trends over time" },
            { i: "ti-file-description", l: "Generate reports automatically" },
            { i: "ti-bell", l: "Send alerts when thresholds are crossed" },
            { i: "ti-chart-area", l: "Forecast future values" },
            { i: "ti-layout-dashboard", l: "Keep a dashboard up to date" },
          ],
          cfIcon: "purple",
          cfIconName: "ti-target",
          cfLabel: "Purpose",
          followUp: (v) =>
            `Got it — **${v}**. That's a clear use case I can build around.`,
          nlUpdate: (cfg) =>
            `This agent will <span class="nl-hi">${cfg.purpose?.toLowerCase()}</span>…`,
          isNameStep: false,
        },
        {
          key: "name",
          msg: "__NAME_STEP__",
          chips: [],
          isNameStep: true,
          cfIcon: "gray",
          cfIconName: "ti-tag",
          cfLabel: "Agent name",
          followUp: (v) => `Great name — **"${v}"** it is.`,
          nlUpdate: (cfg) =>
            `<span class="nl-hi">${cfg.name}</span> will ${cfg.purpose?.toLowerCase()}…`,
        },
        {
          key: "domain",
          msg: `Which **data domain** should it work with?`,
          chips: [
            { i: "ti-users", l: "Labour Market" },
            { i: "ti-building-bank", l: "Economic & GDP" },
            { i: "ti-shopping-cart", l: "Trade & Imports" },
            { i: "ti-home", l: "CPI & Inflation" },
            { i: "ti-building", l: "Construction" },
          ],
          cfIcon: "blue",
          cfIconName: "ti-database",
          cfLabel: "Data domain",
          followUp: (v) =>
            `**${v}** — I'll connect to the relevant Bayaan datasets for that domain.`,
          nlUpdate: (cfg) =>
            `<span class="nl-hi">${cfg.name}</span> will ${cfg.purpose?.toLowerCase()} across <span class="nl-hi">${cfg.domain}</span> data…`,
        },
        {
          key: "trigger",
          msg: `When should the agent **run automatically**?`,
          chips: [
            { i: "ti-calendar", l: "Daily at 06:00 GST" },
            { i: "ti-clock", l: "Every hour" },
            { i: "ti-calendar-week", l: "Weekly on Monday" },
            { i: "ti-refresh", l: "When new data arrives" },
            { i: "ti-player-play", l: "Only when I ask" },
          ],
          cfIcon: "amber",
          cfIconName: "ti-clock",
          cfLabel: "Schedule",
          followUp: (v) =>
            `Scheduled for **${v}**. Every run, it'll process the latest data automatically.`,
          nlUpdate: (cfg) =>
            `<span class="nl-hi">${cfg.name || "Your agent"}</span> will ${cfg.purpose?.toLowerCase()} across <span class="nl-hi">${cfg.domain}</span> data, running <span class="nl-hi">${cfg.trigger?.toLowerCase()}</span>…`,
        },
        {
          key: "action",
          msg: `When the agent finds something, what should it **do**?`,
          chips: [
            { i: "ti-mail", l: "Send me an email digest" },
            { i: "ti-bell", l: "Push an alert to my dashboard" },
            { i: "ti-file-analytics", l: "Generate a PDF report" },
            { i: "ti-brand-teams", l: "Send a Teams notification" },
            { i: "ti-wand", l: "Let me decide per run" },
          ],
          cfIcon: "teal",
          cfIconName: "ti-send",
          cfLabel: "On finding",
          followUp: (v) => `Perfect — **${v}** when something is detected.`,
          nlUpdate: (cfg) =>
            `<span class="nl-hi">${cfg.name || "Your agent"}</span> will ${cfg.purpose?.toLowerCase()} across <span class="nl-hi">${cfg.domain}</span> data, running <span class="nl-hi">${cfg.trigger?.toLowerCase()}</span>, and will <span class="nl-hi">${cfg.action?.toLowerCase()}</span>.`,
        },
        {
          key: "visibility",
          msg: `Almost there — **who should have access** to this agent?`,
          chips: [
            { i: "ti-lock", l: "Just me (private)" },
            { i: "ti-users", l: "My team" },
            { i: "ti-world", l: "Publish to the Agent Library" },
          ],
          cfIcon: "green",
          cfIconName: "ti-eye",
          cfLabel: "Visibility",
          followUp: (v) => `Got it — **${v}**.`,
          nlUpdate: (cfg) =>
            `<span class="nl-hi">${cfg.name || "Your agent"}</span> will ${cfg.purpose?.toLowerCase()} across <span class="nl-hi">${cfg.domain}</span> data, running <span class="nl-hi">${cfg.trigger?.toLowerCase()}</span>, and will <span class="nl-hi">${cfg.action?.toLowerCase()}</span>. Visible to: <span class="nl-hi">${cfg.visibility?.toLowerCase()}</span>.`,
        },
      ];
      let agBuilderStarted = false;
      let agBStep = 0;
      let agBConfig = {};
      let agBTyping = false;
      function agStartBuilder() {
        agBTyping = false;
        agBuilderStarted = true;
        agBStep = 0;
        agBConfig = {};
        document.getElementById("ag-name-input-card")?.remove();
        document.getElementById("ag-typing-ind")?.remove();
        agRemoveChips();
        const builderInput = document.getElementById("agBuilderInput");
        if (builderInput) {
          builderInput.value = "";
          builderInput.style.height = "auto";
        }
        document.getElementById("agBuilderMsgs").innerHTML = "";
        document.getElementById("agConfigFields").innerHTML = "";
        document.getElementById("agNlText").innerHTML =
          '<span class="nl-placeholder">Your agent\'s purpose will appear here as you answer the questions…</span>';
        document.getElementById("agBsStatus").textContent = "Configuring…";
        document.getElementById("agBsStatus").className = "bs-status";
        document.getElementById("agBsFinishBtn").style.display = "none";
        agResetPills();
        agShowTyping("agBuilderMsgs", () => {
          agAddMsg("agBuilderMsgs", "ai", AG_STEPS[0].msg, AG_STEPS[0].chips);
          agSetPill(0, "active");
        });
      }
      function agResetPills() {
        for (let i = 0; i < 7; i++) {
          const p = document.getElementById("agsp" + i);
          p.className = "step-pill";
          p.querySelector(".pill-num-inner").textContent = i + 1;
        }
      }
      function agSetPill(idx, state) {
        const p = document.getElementById("agsp" + idx);
        if (!p) return;
        if (state === "done") {
          p.className = "step-pill done";
          p.querySelector(".pill-num-inner").textContent = "✓";
        } else if (state === "active") {
          p.className = "step-pill active";
        }
      }
      function agBuilderKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          agBuilderSend();
        }
      }
      function agBuilderSend() {
        const v = document.getElementById("agBuilderInput").value.trim();
        if (!v || agBTyping) return;
        document.getElementById("agBuilderInput").value = "";
        document.getElementById("agBuilderInput").style.height = "auto";
        agProcessAnswer(v);
      }
      function agShowNameInput(suggested) {
        const c = document.getElementById("agBuilderMsgs");
        const wrap = document.createElement("div");
        wrap.id = "ag-name-input-card";
        wrap.style.cssText =
          "margin-top:4px;padding:14px;background:var(--gray-50);border:1px solid var(--border);border-radius:14px;max-width:330px;margin-left:40px;";
        wrap.innerHTML = `<div style="font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Agent name</div><div style="display:flex;gap:8px;align-items:center;"><input id="agNameInputField" type="text" value="${agEscHtml(suggested)}" style="flex:1;padding:8px 11px;border:1.5px solid var(--acc-md);border-radius:10px;font-family:var(--font);font-size:14px;font-weight:600;color:var(--t1);background:var(--white);outline:none;" onkeydown="if(event.key==='Enter'){event.preventDefault();agConfirmName();}" onfocus="this.select()"/><button class="ag-btn ag-btn-primary ag-btn-sm" onclick="agConfirmName()" style="flex-shrink:0;"><i class="ti ti-check"></i> Use this</button></div><div style="font-size:11.5px;color:var(--t3);margin-top:7px;">AI suggested name — edit it freely or type your own.</div>`;
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => document.getElementById("agNameInputField")?.focus(),
          60,
        );
      }
      function agConfirmName() {
        const inp = document.getElementById("agNameInputField");
        if (!inp) return;
        const val = inp.value.trim();
        if (!val) return;
        document.getElementById("ag-name-input-card")?.remove();
        agProcessAnswer(val);
      }
      function agProcessAnswer(val) {
        agRemoveChips();
        const step = AG_STEPS[agBStep];
        agBConfig[step.key] = val;
        agAddMsg("agBuilderMsgs", "user", "<p>" + agEscHtml(val) + "</p>");
        agSetPill(agBStep, "done");
        agAddConfigField(step, val);
        agUpdateNL(step.nlUpdate(agBConfig));
        agBStep++;
        if (agBStep < AG_STEPS.length) {
          const next = AG_STEPS[agBStep];
          agShowTyping("agBuilderMsgs", () => {
            agAddMsg("agBuilderMsgs", "ai", step.followUp(val));
            setTimeout(
              () =>
                agShowTyping("agBuilderMsgs", () => {
                  if (next.isNameStep) {
                    const suggested = agMakeName();
                    agAddMsg(
                      "agBuilderMsgs",
                      "ai",
                      `Nice. Now let's **give your agent a name**.\n\nBased on what you described, I'd suggest:`,
                    );
                    agShowNameInput(suggested);
                    agSetPill(agBStep, "active");
                  } else {
                    agAddMsg("agBuilderMsgs", "ai", next.msg, next.chips);
                    agSetPill(agBStep, "active");
                  }
                }),
              500,
            );
          });
        } else {
          agShowTyping("agBuilderMsgs", () => {
            agAddMsg("agBuilderMsgs", "ai", step.followUp(val));
            setTimeout(
              () => agShowTyping("agBuilderMsgs", () => agFinishBuilder()),
              700,
            );
          });
        }
      }
      function agFinishBuilder() {
        const name = agBConfig.name || agMakeName();
        agAddMsg(
          "agBuilderMsgs",
          "ai",
          `✅ **"${name}" is ready!**\n\nReview the summary on the right — if everything looks good, click **Save Agent** to choose who can access it.`,
        );
        agSetPill(6, "active");
        document.getElementById("agBsStatus").textContent = "Ready to save";
        document.getElementById("agBsStatus").className = "bs-status ready";
        document.getElementById("agBsFinishBtn").style.display = "";
      }
      function agMakeName() {
        const p = agBConfig.purpose || "";
        const d = agBConfig.domain || "";
        const dS = d.split(" ")[0];
        if (p.includes("anomal") || p.includes("Detect"))
          return `${dS} Anomaly Sentinel`;
        if (p.includes("trend") || p.includes("Monitor"))
          return `${dS} Trend Monitor`;
        if (p.includes("report") || p.includes("Generate"))
          return `${dS} Report Agent`;
        if (p.includes("alert") || p.includes("Alert"))
          return `${dS} Alert Agent`;
        if (p.includes("orecast")) return `${dS} Forecast Agent`;
        return `${dS} Intelligence Agent`;
      }
      function agAddConfigField(step, val) {
        const wrap = document.getElementById("agConfigFields");
        const row = document.createElement("div");
        row.className = "cf-row";
        row.innerHTML = `<div class="cf-icon ${step.cfIcon}"><i class="ti ${step.cfIconName}"></i></div><div class="cf-content"><div class="cf-label">${step.cfLabel}</div><div class="cf-value">${agEscHtml(val)}</div></div>`;
        wrap.appendChild(row);
        setTimeout(() => row.classList.add("in"), 50);
      }
      function agUpdateNL(html) {
        document.getElementById("agNlText").innerHTML = html;
      }
      /* Builder chat helpers */
      function agAddMsg(containerId, role, text, chips) {
        const c = document.getElementById(containerId);
        const wrap = document.createElement("div");
        wrap.className = "b-msg " + role;
        const body = document.createElement("div");
        body.className = "b-msg-body";
        const bubble = document.createElement("div");
        bubble.className = "b-msg-bubble";
        bubble.innerHTML = agMdHtml(text);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("b-msg-av ai", 30));
          wrap.appendChild(body);
        } else {
          wrap.appendChild(body);
        }
        c.appendChild(wrap);
        if (chips && chips.length) {
          const chipsWrap = document.createElement("div");
          chipsWrap.className = "b-msg";
          chipsWrap.id = "ag-chips-anchor";
          const sp = document.createElement("div");
          sp.style.width = "40px";
          const row = document.createElement("div");
          row.className = "b-chips-row";
          chips.forEach((ch) => {
            const btn = document.createElement("button");
            btn.className = "b-chip";
            btn.innerHTML = `<i class="ti ${ch.i}"></i>${ch.l}`;
            btn.onclick = () => {
              document
                .querySelectorAll("#v-agent .b-chip")
                .forEach((x) => x.classList.remove("sel"));
              btn.classList.add("sel");
              setTimeout(() => agProcessAnswer(ch.l), 260);
            };
            row.appendChild(btn);
          });
          chipsWrap.appendChild(sp);
          chipsWrap.appendChild(row);
          c.appendChild(chipsWrap);
        }
        c.scrollTop = c.scrollHeight;
      }
      function agRemoveChips() {
        const el = document.getElementById("ag-chips-anchor");
        if (el) el.remove();
      }
      function agShowTyping(containerId, cb) {
        agBTyping = true;
        const c = document.getElementById(containerId);
        const el = document.createElement("div");
        el.id = "ag-typing-ind";
        el.className = "b-msg ai";
        el.innerHTML = `${baiAvatarHtml("b-msg-av ai", 30)}<div class="b-typing"><div class="btd"></div><div class="btd"></div><div class="btd"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => {
            el.remove();
            agBTyping = false;
            cb();
          },
          800 + Math.random() * 400,
        );
      }
      function agMdHtml(t) {
        return t
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>")
          .replace(/^(.)/, "<p>$1")
          .replace(/(.)$/, "$1</p>");
      }
      function agEscHtml(s) {
        return (s || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      /* Workspace */
      function agWsKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          agWsSend();
        }
      }
      function agWsAsk(q) {
        document.getElementById("agWsInput").value = q;
        agWsSend();
      }
      function agWsSend() {
        const inp = document.getElementById("agWsInput");
        const v = inp.value.trim();
        if (!v) return;
        inp.value = "";
        inp.style.height = "auto";
        const container = document.getElementById("agWsExtraMessages");
        const userMsg = document.createElement("div");
        userMsg.className = "ws-msg user";
        userMsg.innerHTML = `<div class="ws-msg-bubble">${agEscHtml(v)}</div>`;
        container.appendChild(userMsg);
        agScrollWs();
        const typingEl = document.createElement("div");
        typingEl.className = "ws-msg agent";
        typingEl.innerHTML = `${baiAvatarHtml("ws-msg-av agent", 30)}<div class="b-typing"><div class="btd"></div><div class="btd"></div><div class="btd"></div></div>`;
        container.appendChild(typingEl);
        agScrollWs();
        setTimeout(
          () => {
            typingEl.remove();
            const resp = agGetReply(v);
            const agentMsg = document.createElement("div");
            agentMsg.className = "ws-msg agent";
            agentMsg.innerHTML = `${baiAvatarHtml("ws-msg-av agent", 30)}<div class="ws-msg-bubble">${resp}</div>`;
            container.appendChild(agentMsg);
            agScrollWs();
          },
          1000 + Math.random() * 600,
        );
      }
      function agGetReply(q) {
        const ql = q.toLowerCase();
        if (ql.includes("pdf") || ql.includes("report"))
          return `<p>Generating the PDF report for today's run now. It will include:</p><ul><li>Executive summary of all 3 anomalies</li><li>Sector-by-sector breakdown with trend charts</li><li>Comparison against the past 90-day baseline</li></ul><p>The report will be ready in a few seconds and emailed to you.</p>`;
        if (ql.includes("schedule") || ql.includes("6 hour"))
          return `<p>I've updated the schedule from <strong>daily at 06:00 GST</strong> to <strong>every 6 hours</strong>. This change takes effect from the next scheduled run.</p>`;
        if (ql.includes("trend") || ql.includes("week"))
          return `<p>Last week's anomaly summary:</p><ul><li><strong>Mon–Wed:</strong> All clear</li><li><strong>Thu May 22:</strong> Minor anomaly in Hospitality (σ 2.1), self-corrected</li><li><strong>Fri May 23:</strong> Construction spike (σ 2.4) — similar pattern to today</li></ul><p>There's a recurring Friday-Monday pattern in Construction data worth investigating.</p>`;
        if (
          ql.includes("email") ||
          ql.includes("notification") ||
          ql.includes("draft")
        )
          return `<p>Draft notification:</p><p style="background:var(--gray-50);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:12.5px;margin-top:8px;"><strong>Subject:</strong> Labour Registry — Anomaly Alert, May 25<br><br>Team,<br><br>The Labour Anomaly Sentinel detected 3 anomalies in today's 06:00 GST run. Most significant: Construction sector registrations fell 34% below the 90-day baseline (σ 3.2).<br><br>— Bayaan Sentinel</p>`;
        if (ql.includes("construction") || ql.includes("deep dive"))
          return `<p>Deeper look at the Construction sector anomaly:</p><ul><li><strong>Today's value:</strong> 847 registrations (baseline avg: 1,282)</li><li><strong>Deviation:</strong> σ 3.2 — highest since March 2024</li><li><strong>Sub-sector breakdown:</strong> Civil works (−41%), Building works (−28%), Specialist trades (−12%)</li></ul>`;
        return `<p>I've analysed that across the Labour Registry data. The patterns appear consistent with the anomalies I flagged. Let me know if you'd like a deeper breakdown or a specific report format.</p>`;
      }
      function agScrollWs() {
        const c = document.getElementById("agWsChat");
        c.scrollTop = c.scrollHeight;
      }
      function agToggleSettings() {
        document.getElementById("agSettingsDrawer").classList.toggle("open");
      }

      function dashGoTo(id) {
        document
          .querySelectorAll("#v-dashboard .dash-view")
          .forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        const names = {
          "dash-library": "Dashboard Studio",
          "dash-builder": "Dashboard Builder",
          "dash-published": "Labour Market Overview",
        };
        const t = TOOLS.dashboard;
        if (id === "dash-library") {
          _setStudioTopbar(
            '<a onclick="showGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">Dashboard Studio</span>',
            '<button class="tb-btn tb-btn-accent" onclick="dashGoTo(\'dash-builder\')"><i class="ti ti-sparkles"></i> New Dashboard</button>',
          );
          dashInitPreviewCharts();
        } else if (id === "dash-builder") {
          const title =
            document.getElementById("dashStudioTitle")?.textContent ||
            "New Dashboard";
          _setStudioTopbar(
            '<a onclick="dashGoTo(\'dash-library\')">Dashboard Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">' +
              title +
              "</span>",
          );
          dashUpdateBuilderActions();
          dashInitStudio();
        } else if (id === "dash-published") {
          _setStudioTopbar(
            '<a onclick="dashGoTo(\'dash-library\')">Dashboard Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">Labour Market Overview</span>',
            '<button class="tb-btn" onclick="dashGoTo(\'dash-builder\')"><i class="ti ti-edit"></i> Edit</button><button class="tb-btn tb-btn-accent" onclick="dashOpenModal(\'gov\')"><i class="ti ti-world"></i> Publish to Gov Data</button>',
          );
          dashBuildPublishedDash();
        }
      }
      function dashUpdateBuilderActions() {
        let html =
          '<button class="tb-btn" onclick="dashGoTo(\'dash-library\')"><i class="ti ti-x"></i> Close</button>';
        if (dashBuilt) {
          html =
            '<button class="tb-btn" id="dashBtnMarkupTop" onclick="dashToggleMarkup()"><i class="ti ti-pencil"></i> Markup</button>' +
            '<button class="tb-btn" onclick="dashSaveToArtifacts()"><i class="ti ti-device-floppy"></i> Save</button>' +
            '<button class="tb-btn tb-btn-accent" onclick="dashOpenModal(\'gov\')"><i class="ti ti-world"></i> Publish to Gov Data</button>' +
            '<button class="tb-btn" onclick="dashGoTo(\'dash-library\')"><i class="ti ti-x"></i> Close</button>';
        }
        _setStudioTopbar(undefined, html);
      }

      /* ── ALL JS uses template literals to avoid quote escaping issues ── */
      let dashStudioStarted = false,
        dashBuilt = false,
        selWidgetEl = null,
        isTyping = false,
        dashTopic = "";
      const dashChartInst = {};

      /* ── NAVIGATION ── */

      /* ── LIB TAB ── */
      function dashLibTab(el, tab) {
        document
          .querySelectorAll(".lib-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("tab-my").style.display =
          tab === "my" ? "" : "none";
        document.getElementById("tab-gov").style.display =
          tab === "gov" ? "" : "none";
        // re-init preview charts for newly visible tab
        requestAnimationFrame(() => dashInitPreviewCharts());
      }

      /* ── FILTER CHIP ── */
      function dashFChip(el) {
        el.parentElement
          .querySelectorAll(".fchip")
          .forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
      }

      /* ── CHAT TOGGLE ── */
      function dashToggleChat() {
        const chat = document.getElementById("dashStudioChat");
        if (!chat) return;
        const collapsing = !chat.classList.contains("collapsed");
        chat.classList.toggle("collapsed", collapsing);
        chat.style.width = collapsing ? "48px" : "400px";
        chat.style.minWidth = collapsing ? "48px" : "400px";
      }

      /* ── MODAL ── */
      let moChoice = "priv";
      function dashOpenModal(preset) {
        if (preset === "gov") dashSelMo("gov");
        else dashSelMo("priv");
        const m = document.getElementById("dashSaveModal");
        if (m) {
          m.classList.add("show");
          m.setAttribute("aria-hidden", "false");
        }
      }
      function dashCloseModal() {
        const m = document.getElementById("dashSaveModal");
        if (m) {
          m.classList.remove("show");
          m.setAttribute("aria-hidden", "true");
        }
      }
      function dashSaveToArtifacts() {
        const name =
          document.getElementById("dashStudioTitle")?.textContent ||
          "Dashboard";
        const overlay = document.createElement("div");
        overlay.className = "dash-artifacts-overlay";
        overlay.style.cssText =
          "position:fixed;inset:0;background:rgba(15,23,42,.4);display:flex;align-items:center;justify-content:center;z-index:9001;animation:fadeIn .2s ease;";
        overlay.innerHTML = `
    <div style="background:var(--white);border-radius:24px;width:420px;max-width:95vw;box-shadow:0 12px 40px rgba(15,23,42,.13);overflow:hidden;">
      <div style="background:linear-gradient(135deg,#EAF3DE,#fff);padding:28px;text-align:center;border-bottom:1px solid var(--border);">
        <div style="width:56px;height:56px;background:#EAF3DE;border:2px solid #639922;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
          <i class="ti ti-check" style="font-size:26px;color:#3B6D11;"></i>
        </div>
        <div style="font-size:17px;font-weight:700;color:var(--t1);margin-bottom:5px;">Saved to Artifacts</div>
        <div style="font-size:13px;color:var(--t2);"><strong>${escH(name)}</strong> has been saved to your personal Artifacts.</div>
      </div>
      <div style="padding:16px 24px 20px;">
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:9px;padding:10px 12px;background:var(--gray-100);border-radius:10px;">
            <i class="ti ti-lock" style="font-size:15px;color:var(--t3);"></i>
            <div><div style="font-size:12.5px;font-weight:600;color:var(--t1);">Private — only visible to you</div><div style="font-size:11px;color:var(--t3);">Accessible from Dashboard Studio · My Dashboards</div></div>
          </div>
          <div style="display:flex;align-items:center;gap:9px;padding:10px 12px;background:var(--gray-100);border-radius:10px;">
            <i class="ti ti-refresh" style="font-size:15px;color:var(--t3);"></i>
            <div><div style="font-size:12.5px;font-weight:600;color:var(--t1);">Auto-synced with live data</div><div style="font-size:11px;color:var(--t3);">Dashboard refreshes automatically on each data update</div></div>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" class="tb-btn" style="flex:1;justify-content:center;" data-dash-act="close">Close</button>
          <button type="button" class="tb-btn tb-btn-accent" style="flex:1;justify-content:center;" data-dash-act="gov"><i class="ti ti-world"></i> Publish to Gov Data</button>
        </div>
      </div>
    </div>`;
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.remove();
        });
        overlay
          .querySelector('[data-dash-act="close"]')
          ?.addEventListener("click", () => overlay.remove());
        overlay
          .querySelector('[data-dash-act="gov"]')
          ?.addEventListener("click", () => {
            overlay.remove();
            dashOpenModal("gov");
          });
        document.body.appendChild(overlay);
        dashShowToast("Dashboard saved to Artifacts", "ti-device-floppy");
        setTimeout(() => {
          if (overlay.parentNode) overlay.remove();
        }, 8000);
      }
      function dashSelMo(c) {
        moChoice = c;
        document
          .getElementById("dashMoPriv")
          .classList.toggle("sel", c === "priv");
        document
          .getElementById("dashMoGov")
          .classList.toggle("sel", c === "gov");
      }
      function dashConfirmSave() {
        dashCloseModal();
        if (moChoice === "gov") {
          dashShowToast("Submitted for review", "ti-shield-check");
          document.getElementById("dashGovBanner").style.display = "flex";
          addMsg(
            "ai",
            `🎉 **Dashboard submitted to Entity Zone Portal!**\n\nYour dashboard is now in the review queue. Track the status from the banner above, or check your notifications. Expected review: **3–5 business days**.`,
          );
          setTimeout(() => showAtCard(), 500);
          dashGoTo("dash-published");
        } else {
          dashShowToast("Dashboard saved to Artifacts", "ti-device-floppy");
          dashGoTo("dash-library");
        }
      }
      function dashShowApprovalModal() {
        const m = document.getElementById("dashApprovalModal");
        if (m) {
          m.classList.add("show");
          m.setAttribute("aria-hidden", "false");
        }
      }
      function dashCloseApprovalModal() {
        const m = document.getElementById("dashApprovalModal");
        if (m) {
          m.classList.remove("show");
          m.setAttribute("aria-hidden", "true");
        }
      }

      /* ── TOAST ── */
      function dashShowToast(msg, icon = "ti-check") {
        toast(msg, icon);
      }

      /* ── PREVIEW CHARTS (library cards — 2×2 per card) ── */
      function dashInitPreviewCharts() {
        // Each entry: [canvasId, chartType, data, color, isDoughnut]
        const cells = [
          // Labour Market
          [
            "dpc-lm-1",
            "line",
            [30000, 33000, 36000, 38000, 40000, 42200],
            "#2563EB",
            false,
          ],
          ["dpc-lm-2", "doughnut", [40, 25, 20, 15], "#1E40AF", true],
          ["dpc-lm-3", "bar", [72, 78, 80, 84, 82, 80, 84], "#3B82F6", false],
          ["dpc-lm-4", "doughnut", [18.4, 81.6], "#0EA5E9", true],
          // GDP
          [
            "dpc-gdp-1",
            "line",
            [712, 748, 620, 698, 762, 810, 847],
            "#0F6E56",
            false,
          ],
          ["dpc-gdp-2", "doughnut", [30, 22, 18, 14, 10, 6], "#1D9E75", true],
          [
            "dpc-gdp-3",
            "bar",
            [65, 67, 68, 70, 71, 72, 72.3],
            "#10B981",
            false,
          ],
          ["dpc-gdp-4", "bar", [88, 84, 80, 76, 72, 68], "#059669", false],
          // CPI
          [
            "dpc-cpi-1",
            "line",
            [2.1, 2.2, 2.3, 2.5, 2.4, 2.5, 2.8],
            "#B45309",
            false,
          ],
          [
            "dpc-cpi-2",
            "doughnut",
            [22, 18, 15, 12, 10, 9, 8, 6],
            "#D97706",
            true,
          ],
          [
            "dpc-cpi-3",
            "line",
            [4.8, 4.6, 4.5, 4.7, 4.4, 4.2],
            "#EF4444",
            false,
          ],
          ["dpc-cpi-4", "bar", [88, 84, 80, 76, 72, 68], "#F59E0B", false],
          // Gov Labour
          [
            "dpc-gov1-1",
            "line",
            [30000, 33000, 36000, 38000, 40000, 42200],
            "#1249B0",
            false,
          ],
          ["dpc-gov1-2", "doughnut", [35, 28, 22, 15], "#1E40AF", true],
          [
            "dpc-gov1-3",
            "line",
            [15, 16, 17, 17.5, 18, 18.4],
            "#2563EB",
            false,
          ],
          ["dpc-gov1-4", "bar", [88, 84, 80, 76, 72, 68], "#3B82F6", false],
          // Gov GDP
          [
            "dpc-gov2-1",
            "line",
            [712, 748, 620, 698, 762, 810, 847],
            "#0F6E56",
            false,
          ],
          ["dpc-gov2-2", "doughnut", [30, 22, 18, 14, 10, 6], "#1D9E75", true],
          [
            "dpc-gov2-3",
            "line",
            [65, 67, 68, 70, 71, 72, 72.3],
            "#10B981",
            false,
          ],
          ["dpc-gov2-4", "bar", [88, 84, 80, 76, 72, 68], "#059669", false],
        ];

        cells.forEach(([id, type, data, color, isDoughnut]) => {
          const canvas = document.getElementById(id);
          if (!canvas) return;
          if (dashChartInst[id]) {
            dashChartInst[id].destroy();
            delete dashChartInst[id];
          }

          const ctx = canvas.getContext("2d");
          const w = canvas.parentElement?.offsetWidth || 160;
          canvas.width = w;
          canvas.height = 80;

          if (isDoughnut) {
            // doughnut — clean segment colors
            const hues = [
              "#1E3A6E",
              "#2563EB",
              "#60A5FA",
              "#BFDBFE",
              "#93C5FD",
              "#3B82F6",
              "#1D4ED8",
              "#DBEAFE",
            ];
            dashChartInst[id] = new Chart(ctx, {
              type: "doughnut",
              data: {
                datasets: [
                  {
                    data,
                    backgroundColor: hues.slice(0, data.length),
                    borderWidth: 0,
                    hoverOffset: 0,
                  },
                ],
              },
              options: {
                responsive: false,
                maintainAspectRatio: false,
                animation: false,
                cutout: "62%",
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
              },
            });
          } else {
            const grad = ctx.createLinearGradient(0, 0, 0, 80);
            grad.addColorStop(0, color + "33");
            grad.addColorStop(1, color + "00");
            dashChartInst[id] = new Chart(ctx, {
              type,
              data: {
                labels: data.map((_, i) => i),
                datasets: [
                  {
                    data,
                    borderColor: color,
                    backgroundColor: type === "line" ? grad : color + "aa",
                    fill: type === "line",
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2,
                    borderRadius: type === "bar" ? 3 : 0,
                    borderSkipped: false,
                  },
                ],
              },
              options: {
                responsive: false,
                maintainAspectRatio: false,
                animation: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
                scales: {
                  x: {
                    display: true,
                    grid: { display: false },
                    ticks: {
                      display: true,
                      font: { size: 8 },
                      color: "#94A3B8",
                      maxTicksLimit: 5,
                    },
                  },
                  y: {
                    display: true,
                    grid: { color: "rgba(0,0,0,.04)" },
                    ticks: {
                      display: true,
                      font: { size: 8 },
                      color: "#94A3B8",
                      maxTicksLimit: 4,
                    },
                    beginAtZero: false,
                  },
                },
                layout: { padding: { top: 2, bottom: 0, left: 0, right: 0 } },
              },
            });
          }
        });
      }

      /* ── STUDIO INIT ── */
      function dashInitStudio() {
        dashStudioStarted = true;
        dashBuilt = false;
        selWidgetEl = null;
        dashTopic = "";
        extSources = [];
        bayaanDatasets = [];
        try {
          dashExitMarkup();
        } catch (e) {}
        document.getElementById("dashChatMsgs").innerHTML = "";
        document.getElementById("dashCanvasScroll").innerHTML = "";
        document.getElementById("dashCanvasScroll").style.display = "none";
        document.getElementById("dashCanvasEmpty").style.display = "flex";
        document.getElementById("dashCanvasStatus").textContent =
          "Awaiting prompt";
        document.getElementById("dashCanvasStatus").className = "cs empty";
        document.getElementById("dashCanvasBarRight").style.display = "none";
        const st = document.getElementById("dashStudioTitle");
        if (st) st.textContent = "New Dashboard";
        showTyping(() => {
          addMsg(
            "ai",
            `👋 Welcome to **Dashboard Studio!**\n\nJust describe what you need in plain language — for example:\n\n**"Build a labour market dashboard for Q1 2026"**\n\nThe AI will find the right Bayaan datasets, suggest KPIs, and generate the full interactive dashboard. You can also connect external databases, DXP integrations, or upload a file.`,
          );
        });
      }

      function dashChatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          dashChatSend();
        }
      }

      function dashChatSend() {
        const inp = document.getElementById("dashChatInput");
        const v = inp.value.trim();
        if (!v || isTyping) return;
        inp.value = "";
        inp.style.height = "auto";
        addMsg("user", `<p>${escH(v)}</p>`);
        handleMsg(v);
      }

      function handleMsg(v) {
        const l = v.toLowerCase();
        if (!dashBuilt) {
          dashTopic = v;
          const t = inferTitle(v);
          const st = document.getElementById("dashStudioTitle");
          if (st) st.textContent = t;
          document.getElementById("dashCanvasTitle").textContent = t;
          showTyping(() => {
            addMsg(
              "ai",
              "Great — scanning Bayaan for the most relevant datasets and KPIs for that topic…",
            );
            setTimeout(() => showTyping(() => showProposalCard(v)), 700);
          });
        } else if (selWidgetEl) {
          showTyping(() => {
            addMsg("ai", getWidgetReply(v));
            flashWidget(selWidgetEl);
          });
        } else {
          showTyping(() => addMsg("ai", getRefinementReply(v)));
        }
      }

      function inferTitle(p) {
        const l = p.toLowerCase();
        if (l.includes("labour") || l.includes("labor"))
          return "Labour Market Dashboard";
        if (l.includes("gdp") || l.includes("economic"))
          return "Economic Performance Dashboard";
        if (l.includes("cpi") || l.includes("inflation"))
          return "CPI & Inflation Dashboard";
        if (l.includes("trade")) return "Trade & Imports Dashboard";
        return "Analytics Dashboard";
      }

      /* ── PROPOSAL CARD ── */
      function showProposalCard(prompt) {
        const l = prompt.toLowerCase();
        const datasets = getDSForTopic(l);
        bayaanDatasets = datasets.map((d) => d.name);
        extSources = [];
        const c = document.getElementById("dashChatMsgs");
        const { el, av, body } = mkAiWrap();
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = `<p>I found <strong>${datasets.length} relevant datasets</strong> in Bayaan. Review and confirm, or add an external source below.</p>`;
        body.appendChild(bubble);

        const card = document.createElement("div");
        card.className = "prop-card";
        card.style.marginTop = "8px";
        let dsHTML = datasets
          .map(
            (d, i) => `
    <div class="ds-item">
      <div class="ds-ico ${d.c}"><i class="ti ${d.icon}"></i></div>
      <div style="flex:1;min-width:0;">
        <div class="ds-name">${d.name}</div>
        <div class="ds-sub">${d.sub}</div>
      </div>
      <span class="ds-match">${d.match}%</span>
      <div class="ds-chk on" id="dsc${i}" onclick="togDs(${i})"><i class="ti ti-check"></i></div>
    </div>`,
          )
          .join("");

        card.innerHTML = `
    <div class="prop-strip"><i class="ti ti-database"></i><span>Suggested data sources</span></div>
    <div class="prop-ds">${dsHTML}</div>
    <div class="prop-ext">
      <button class="btn btn-ghost btn-xs" onclick="showExtCard('db')"><i class="ti ti-database"></i> Add DB</button>
      <button class="btn btn-ghost btn-xs" onclick="showExtCard('dxp')"><i class="ti ti-plug"></i> DXP</button>
      <button class="btn btn-ghost btn-xs" onclick="showExtCard('file')"><i class="ti ti-upload"></i> Upload file</button>
    </div>
`;
        body.appendChild(card);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        // initialise build bar with default selected sources
        updateBuildBar();
      }

      function getDSForTopic(l) {
        if (l.includes("labour") || l.includes("labor"))
          return [
            {
              name: "Labour Registry",
              sub: "ClickHouse · 1.2M rows · live",
              c: "blue",
              icon: "ti-users",
              match: 98,
            },
            {
              name: "Employment Stats Q1 2026",
              sub: "SCAD National Accounts",
              c: "teal",
              icon: "ti-chart-bar",
              match: 94,
            },
            {
              name: "Emiratisation Index",
              sub: "MoHRE · quarterly",
              c: "purple",
              icon: "ti-star",
              match: 82,
            },
          ];
        if (l.includes("gdp") || l.includes("economic"))
          return [
            {
              name: "National Accounts",
              sub: "SCAD · annual + quarterly",
              c: "teal",
              icon: "ti-building-bank",
              match: 99,
            },
            {
              name: "Sector GDP Breakdown",
              sub: "ClickHouse · 340K rows",
              c: "blue",
              icon: "ti-chart-area",
              match: 95,
            },
            {
              name: "GCC Benchmark Data",
              sub: "IMF comparative",
              c: "amber",
              icon: "ti-globe",
              match: 78,
            },
          ];
        return [
          {
            name: "CPI Main Index",
            sub: "SCAD · monthly",
            c: "amber",
            icon: "ti-home",
            match: 97,
          },
          {
            name: "CPI Sub-categories",
            sub: "Essential vs Non-essential",
            c: "blue",
            icon: "ti-list",
            match: 91,
          },
          {
            name: "Global Inflation Bench",
            sub: "World Bank API",
            c: "teal",
            icon: "ti-globe",
            match: 75,
          },
        ];
      }

      function togDs(i) {
        const el = document.getElementById(`dsc${i}`);
        el.classList.toggle("on");
        el.innerHTML = el.classList.contains("on")
          ? '<i class="ti ti-check"></i>'
          : "";
        updateBuildBar();
      }

      /* ── EXT SOURCE CARD ── */
      function showExtCard(tab) {
        document.getElementById("ext-anchor")?.remove();
        const c = document.getElementById("dashChatMsgs");
        const anchor = document.createElement("div");
        anchor.id = "ext-anchor";
        const card = document.createElement("div");
        card.className = "ext-card";
        card.innerHTML = `
    <div class="ext-tabs">
      <div class="ext-tab ${tab === "db" ? "active" : ""}" onclick="swExt(this,'db')"><i class="ti ti-database"></i> Database</div>
      <div class="ext-tab ${tab === "dxp" ? "active" : ""}" onclick="swExt(this,'dxp')"><i class="ti ti-plug"></i> DXP</div>
      <div class="ext-tab ${tab === "file" ? "active" : ""}" onclick="swExt(this,'file')"><i class="ti ti-upload"></i> File</div>
    </div>
    <div id="ext-body">${getExtBody(tab)}</div>`;
        anchor.appendChild(card);
        c.appendChild(anchor);
        c.scrollTop = c.scrollHeight;
      }
      function swExt(el, tab) {
        el.closest(".ext-tabs")
          .querySelectorAll(".ext-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("ext-body").innerHTML = getExtBody(tab);
      }
      function getExtBody(tab) {
        if (tab === "db")
          return `
    <div class="ext-row">
      <div class="ext-field"><label>Type</label><select><option>PostgreSQL</option><option>ClickHouse</option><option>MySQL</option><option>SQL Server</option></select></div>
      <div class="ext-field"><label>Port</label><input value="5432" style="font-family:var(--mono)"/></div>
    </div>
    <div class="ext-field"><label>Host</label><input placeholder="db.example.com" style="font-family:var(--mono)"/></div>
    <div class="ext-row">
      <div class="ext-field"><label>Database</label><input placeholder="my_db" style="font-family:var(--mono)"/></div>
      <div class="ext-field"><label>Username</label><input placeholder="user" style="font-family:var(--mono)"/></div>
    </div>
    <div class="ext-acts">
      <button class="btn btn-ghost btn-sm" onclick="testExt()"><i class="ti ti-plug"></i> Test</button>
      <button class="btn btn-primary btn-sm" onclick="addExt('Database connected','External DB')">Add source</button>
      <span class="ct" id="ext-ct"></span>
    </div>`;
        if (tab === "dxp") return buildDxpExplorer();
        return `
    <div class="ext-field"><label>Upload file</label>
      <input type="file" accept=".csv,.xlsx,.json" style="font-size:12px;padding:6px;border:1px dashed var(--border-md);border-radius:var(--r-sm);background:var(--surface);cursor:pointer;width:100%;"/>
    </div>
    <div style="font-size:11px;color:var(--text-3);margin-bottom:8px;">Supports CSV, Excel (.xlsx), JSON. Max 50 MB.</div>
    <div class="ext-acts">
      <button class="btn btn-primary btn-sm" onclick="addExt('File uploaded successfully','Uploaded File')">Upload & add</button>
    </div>`;
      }
      function testExt() {
        const s = document.getElementById("ext-ct");
        if (!s) return;
        s.className = "ct testing";
        s.innerHTML =
          '<i class="ti ti-loader" style="animation:spin .8s linear infinite"></i> Testing…';
        setTimeout(() => {
          s.className = "ct ok";
          s.innerHTML = '<i class="ti ti-check"></i> Connected';
        }, 1400);
      }
      function addExt(msg, srcName) {
        document.getElementById("ext-anchor")?.remove();
        dashShowToast(msg, "ti-check");
        // register external source
        extSources.push(srcName || msg.split(" ")[0]);
        updateBuildBar();
        addMsg(
          "ai",
          "External source added ✓ — the **Build dashboard** bar below has updated with your new source. Add more or hit build when ready.",
        );
      }

      /* ── SOURCE TRACKING & BUILD BAR ── */
      let extSources = [];
      let bayaanDatasets = []; // set when proposal card renders

      function updateBuildBar() {
        const bar = document.getElementById("dashBuildBar");
        const pills = document.getElementById("dashBbPills");
        const countTxt = document.getElementById("dashBbCountTxt");
        if (!bar) return;

        // count checked bayaan sources
        const checkedBayaan = [];
        let i = 0;
        while (document.getElementById(`dsc${i}`)) {
          const el = document.getElementById(`dsc${i}`);
          if (el.classList.contains("on")) {
            checkedBayaan.push(bayaanDatasets[i] || `Dataset ${i + 1}`);
          }
          i++;
        }

        const total = checkedBayaan.length + extSources.length;
        if (total === 0) {
          bar.classList.remove("show");
          return;
        }

        bar.classList.add("show");
        countTxt.textContent = `${total} source${total > 1 ? "s" : ""} selected`;
        // sub text removed

        // render pills
        const allSources = [
          ...checkedBayaan.map((n) => ({ name: n, ext: false })),
          ...extSources.map((n) => ({ name: n, ext: true })),
        ];
        pills.innerHTML = allSources
          .map(
            (s) =>
              `<span class="bb-pill${s.ext ? " ext" : ""}"><i class="ti ti-${s.ext ? "plug" : "database"}"></i>${s.name}</span>`,
          )
          .join("");
      }

      /* ── CONFIRM & GENERATE ── */
      function dashConfirmSources() {
        document.getElementById("ext-anchor")?.remove();
        document.getElementById("dashBuildBar")?.classList.remove("show");
        addMsg("user", "<p>Build dashboard with selected sources</p>");
        showTyping(() => {
          addMsg("ai", "Perfect — starting generation now…");
          showGenProgress();
        });
      }

      function showGenProgress() {
        const c = document.getElementById("dashChatMsgs");
        const { el, av, body } = mkAiWrap();
        const steps = [
          "Querying data sources…",
          "Building KPI cards",
          "Generating charts",
          "Analysing insights",
          "Finalising layout",
        ];
        const prog = document.createElement("div");
        prog.className = "gen-prog";
        prog.innerHTML =
          `<div class="gp-lbl"><i class="ti ti-sparkles"></i>Generating dashboard</div>` +
          steps
            .map(
              (s, i) =>
                `<div class="gp-step"><div class="gp-dot ${i === 0 ? "active" : "wait"}" id="gd${i + 1}"><i class="ti ti-${i === 0 ? "refresh" : "circle"}"></i></div>${s}</div>`,
            )
            .join("");
        body.appendChild(prog);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;

        document.getElementById("dashCanvasStatus").textContent = "Building…";
        document.getElementById("dashCanvasStatus").className = "cs building";
        document.getElementById("dashCanvasEmpty").style.display = "none";

        [
          [0, 1, 900],
          [1, 2, 1700],
          [2, 3, 2400],
          [3, 4, 3100],
        ].forEach(([cur, nxt, delay]) => {
          setTimeout(() => {
            const d = document.getElementById(`gd${cur + 1}`);
            d.className = "gp-dot done";
            d.innerHTML = '<i class="ti ti-check"></i>';
            if (nxt < 5) {
              const n = document.getElementById(`gd${nxt + 1}`);
              n.className = "gp-dot active";
              n.innerHTML = '<i class="ti ti-refresh"></i>';
            }
          }, delay);
        });
        setTimeout(() => {
          const d = document.getElementById("gd5");
          d.className = "gp-dot done";
          d.innerHTML = '<i class="ti ti-check"></i>';
          dashBuildDashboard();
        }, 3800);
      }

      /* ── BUILD DASHBOARD ── */
      function dashBuildDashboard() {
        dashBuilt = true;
        const scroll = document.getElementById("dashCanvasScroll");
        scroll.innerHTML = "";
        scroll.style.display = "flex";
        document.getElementById("dashCanvasStatus").textContent = "Ready";
        document.getElementById("dashCanvasStatus").className = "cs ready";
        document.getElementById("dashCanvasBarRight").style.display = "flex";
        dashUpdateBuilderActions();

        const l = dashTopic.toLowerCase();
        const rows =
          l.includes("gdp") || l.includes("economic")
            ? getGdpWidgets()
            : l.includes("cpi") || l.includes("inflation")
              ? getCpiWidgets()
              : getLabourWidgets();

        rows.forEach((html, i) => {
          setTimeout(() => {
            const el = document.createElement("div");
            el.className = "w-in";
            el.style.animationDelay = i * 0.08 + "s";
            el.innerHTML = html;
            scroll.appendChild(el);
            el.querySelectorAll("canvas[data-chart]").forEach((c) =>
              initChart(c),
            );
            scroll.scrollTop = scroll.scrollHeight;
          }, i * 100);
        });

        setTimeout(() => {
          addMsg(
            "ai",
            "✅ **Dashboard ready!**\n\n- **4 KPI cards** with live metrics and delta trends\n- **3 interactive charts** — line trend, sector breakdown, comparison\n- **3 AI insight cards** with anomaly alerts and recommendations\n\n**Click any card or chart** to select it, then ask me to modify just that widget.",
          );
          addSugChips();
        }, 2200);
      }

      /* ── WIDGET HTML ── */
      function kpi(cls, lbl, val, dir, delta, sub, name) {
        return `<div class="kpi-card ${cls}" onclick="dashSelWidget(this,'${name}')" data-widget-name="${name}">
    <div class="sel-ring"><span class="sel-tag">Selected</span></div>
    <div class="mu-badge">1</div>
    <div class="kpi-lbl">${lbl}</div>
    <div class="kpi-val">${val}</div>
    <div class="kpi-delta ${dir}"><i class="ti ti-trending-${dir === "up" ? "up" : "down"}"></i>${delta}</div>
    <div class="kpi-sub">${sub}</div>
  </div>`;
      }
      function wCard(title, sub, chartId, h, name) {
        return `<div class="widget-card" onclick="dashSelWidget(this,'${name}')" data-widget-name="${name}">
    <div class="sel-ring"><span class="sel-tag">Selected</span></div>
    <div class="mu-badge">1</div>
    <div class="w-head">
      <div><div class="w-title">${title}</div><div class="w-sub">${sub}</div></div>
      <div class="w-menu">
        <button class="wm" onclick="event.stopPropagation();dashShowToast('Chart type changed','ti-chart-bar')"><i class="ti ti-chart-bar"></i></button>
        <button class="wm" onclick="event.stopPropagation();dashShowToast('Expanded','ti-arrows-maximize')"><i class="ti ti-arrows-maximize"></i></button>
      </div>
    </div>
    <div style="height:${h}px"><canvas data-chart="${chartId}"></canvas></div>
  </div>`;
      }
      function iCard(type, typeLbl, text, name) {
        const icon =
          type === "alert"
            ? "ti-alert-triangle"
            : type === "trend"
              ? "ti-trending-up"
              : "ti-bulb";
        return `<div class="insight-card" onclick="dashSelWidget(this,'${name}')" data-widget-name="${name}">
    <div class="sel-ring"><span class="sel-tag">Selected</span></div>
    <div class="mu-badge">1</div>
    <div class="ic-type ${type}"><i class="ti ${icon}"></i>${typeLbl}</div>
    <div class="ic-text">${text}</div>
    <div class="ic-foot"><i class="ti ti-sparkles"></i>AI-generated · Today</div>
  </div>`;
      }

      function getLabourWidgets() {
        return [
          `<div class="kpi-row">
      ${kpi("k-blue", "Total workers", "1.247M", "up", "+2.1% YoY", "vs 1.221M Q1 2025", "Total Workers KPI")}
      ${kpi("k-teal", "Emiratisation rate", "18.4%", "up", "+1.2pp YoY", "Private sector target: 20%", "Emiratisation Rate KPI")}
      ${kpi("k-amber", "New registrations", "84,320", "dn", "−3.4% vs Q4", "Seasonal adj. applied", "New Registrations KPI")}
      ${kpi("k-red", "Anomaly rate", "0.8%", "up", "+0.3pp MoM", "σ > 2.0 threshold events", "Anomaly Rate KPI")}
    </div>`,
          `<div class="chart-row">
      ${wCard("Worker Registration Trend", "Monthly · Jan–May 2026", "line-labour", 200, "Registration Trend Chart")}
      ${wCard("Sector Distribution", "Q1 2026", "doughnut-sector", 200, "Sector Donut")}
    </div>`,
          `<div class="chart-row-eq">
      ${wCard("Emiratisation by Sector", "% of workforce", "bar-emiratisation", 180, "Emiratisation Bar Chart")}
      ${wCard("Top Nationalities", "% share of labour force", "bar-nationality", 180, "Nationality Chart")}
    </div>`,
          `<div class="insight-row">
      ${iCard("alert", "Anomaly Alert", "Construction sector registrations dropped <strong>34% on May 25</strong>, exceeding σ 3.2 — the sharpest single-day drop since March 2024.", "Anomaly Alert Card")}
      ${iCard("trend", "Positive Trend", "Emiratisation in Finance reached <strong>22.4%</strong> this quarter — 2.4pp above target — the highest since tracking began in 2021.", "Trend Card")}
      ${iCard("rec", "Recommendation", "Consider adding a <strong>GCC peer comparison</strong> — AD labour growth (+2.1%) leads peers but the margin is narrowing vs Dubai (+2.4%).", "Recommendation Card")}
    </div>`,
        ];
      }
      function getGdpWidgets() {
        return [
          `<div class="kpi-row">
      ${kpi("k-blue", "Total GDP", "AED 847B", "up", "+4.2% YoY", "2025 full year", "Total GDP KPI")}
      ${kpi("k-teal", "Non-oil GDP", "AED 612B", "up", "+6.8% YoY", "72.3% of total", "Non-Oil GDP KPI")}
      ${kpi("k-amber", "Oil & gas GDP", "AED 235B", "dn", "−1.4% YoY", "27.7% of total", "Oil GDP KPI")}
      ${kpi("k-red", "Real growth rate", "4.2%", "up", "+0.8pp vs 2024", "At constant prices", "Growth Rate KPI")}
    </div>`,
          `<div class="chart-row">
      ${wCard("GDP Annual Trend", "2018–2025 · AED Billion", "line-gdp", 200, "GDP Trend Chart")}
      ${wCard("Sector Contribution", "% of total 2025", "doughnut-gdp", 200, "GDP Sector Donut")}
    </div>`,
          `<div class="insight-row">
      ${iCard("trend", "Key Trend", "Non-oil GDP grew <strong>6.8%</strong> — the strongest in 5 years — driven by Tourism (+14.2%) and Financial Services (+9.1%).", "GDP Trend Insight")}
      ${iCard("rec", "Insight", "AD non-oil share reached <strong>72.3%</strong>, approaching the Vision 2030 target of 75%. On track to meet the milestone by 2027.", "Diversification Insight")}
      ${iCard("alert", "Benchmark", "Abu Dhabi GDP growth (+4.2%) leads GCC peers: Saudi Arabia +2.6%, Dubai +3.3%.", "Peer Comparison Insight")}
    </div>`,
        ];
      }
      function getCpiWidgets() {
        return [
          `<div class="kpi-row">
      ${kpi("k-amber", "Headline CPI", "2.8%", "up", "+0.3pp MoM", "April 2026", "Headline CPI KPI")}
      ${kpi("k-blue", "Core CPI", "2.1%", "up", "+0.1pp MoM", "Ex food & energy", "Core CPI KPI")}
      ${kpi("k-red", "Food inflation", "4.2%", "dn", "−0.5pp MoM", "Easing from 4.7%", "Food Inflation KPI")}
      ${kpi("k-teal", "Housing & utilities", "1.9%", "up", "+0.2pp MoM", "Largest component (34%)", "Housing CPI KPI")}
    </div>`,
          `<div class="chart-row">
      ${wCard("CPI Monthly Trend", "Jan 2025 – Apr 2026", "line-cpi", 200, "CPI Trend Chart")}
      ${wCard("Category Breakdown", "YoY % by category", "bar-cpi", 200, "CPI Category Chart")}
    </div>`,
          `<div class="insight-row">
      ${iCard("trend", "Trend", "Headline CPI has risen <strong>3 consecutive months</strong>, driven by energy cost pass-through. Core inflation remains anchored below 2.5%.", "CPI Trend Insight")}
      ${iCard("rec", "Recommendation", "Consider adding a <strong>GCC CPI comparison</strong> — UAE inflation (2.8%) remains below the regional average (3.4%).", "CPI Benchmark Insight")}
      ${iCard("alert", "Watch", "Food inflation eased to <strong>4.2%</strong> but remains elevated. Global wheat and edible oil prices show upward Q2 pressure.", "Food Alert Insight")}
    </div>`,
        ];
      }

      /* ── CHARTS ── */
      function initChart(canvas) {
        const id = canvas.getAttribute("data-chart");
        if (dashChartInst[id]) return;
        const cfg = getChartCfg(id);
        if (!cfg) return;
        dashChartInst[id] = new Chart(canvas, cfg);
      }
      function getChartCfg(id) {
        const b = "rgba(55,138,221,",
          t = "rgba(29,158,117,",
          a = "rgba(186,117,23,",
          r = "rgba(226,75,74,",
          p = "rgba(123,71,241,";
        const baseOpts = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10 }, color: "#94A3B8" },
            },
            y: {
              grid: { color: "rgba(15,23,42,.05)" },
              ticks: { font: { size: 10 }, color: "#94A3B8" },
            },
          },
        };
        const donutOpts = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: { font: { size: 10 }, color: "#475569", boxWidth: 10 },
            },
          },
        };

        const configs = {
          "line-labour": {
            type: "line",
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [
                {
                  label: "Registrations",
                  data: [78400, 80200, 84320, 82100, 79800],
                  borderColor: b + "1)",
                  backgroundColor: b + ".08)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointBackgroundColor: b + "1)",
                },
              ],
            },
            options: baseOpts,
          },
          "doughnut-sector": {
            type: "doughnut",
            data: {
              labels: [
                "Construction",
                "Hospitality",
                "Finance",
                "Retail",
                "Other",
              ],
              datasets: [
                {
                  data: [34, 22, 18, 14, 12],
                  backgroundColor: [
                    b + "0.8)",
                    t + "0.8)",
                    p + "0.8)",
                    a + "0.8)",
                    "rgba(148,163,184,.5)",
                  ],
                  borderWidth: 0,
                },
              ],
            },
            options: { ...donutOpts, cutout: "64%" },
          },
          "bar-emiratisation": {
            type: "bar",
            data: {
              labels: ["Finance", "Govt", "Health", "Retail", "Constr."],
              datasets: [
                {
                  data: [22.4, 68.2, 12.1, 8.4, 4.2],
                  backgroundColor: [
                    t + "0.8)",
                    t + "0.6)",
                    b + "0.6)",
                    a + "0.6)",
                    r + "0.6)",
                  ],
                  borderRadius: 4,
                },
              ],
            },
            options: { ...baseOpts, plugins: { legend: { display: false } } },
          },
          "bar-nationality": {
            type: "bar",
            data: {
              labels: ["AE", "IN", "PK", "BD", "EG"],
              datasets: [
                {
                  data: [18.4, 28.2, 22.1, 14.4, 8.3],
                  backgroundColor: b + "0.7)",
                  borderRadius: 4,
                },
              ],
            },
            options: {
              ...baseOpts,
              indexAxis: "y",
              plugins: { legend: { display: false } },
            },
          },
          "line-gdp": {
            type: "line",
            data: {
              labels: [
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
                "2023",
                "2024",
                "2025",
              ],
              datasets: [
                {
                  label: "Total GDP",
                  data: [712, 748, 620, 698, 762, 810, 813, 847],
                  borderColor: t + "1)",
                  backgroundColor: t + ".1)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 3,
                },
                {
                  label: "Non-Oil",
                  data: [480, 512, 420, 468, 528, 562, 573, 612],
                  borderColor: b + "1)",
                  backgroundColor: b + ".06)",
                  fill: true,
                  tension: 0.4,
                  pointRadius: 3,
                },
              ],
            },
            options: {
              ...baseOpts,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: { size: 10 },
                    color: "#475569",
                    boxWidth: 10,
                  },
                },
              },
            },
          },
          "doughnut-gdp": {
            type: "doughnut",
            data: {
              labels: [
                "Wholesale",
                "Finance",
                "Constr.",
                "Oil & Gas",
                "Tourism",
                "Other",
              ],
              datasets: [
                {
                  data: [18, 16, 13, 28, 9, 16],
                  backgroundColor: [
                    t + "0.8)",
                    b + "0.8)",
                    p + "0.8)",
                    a + "0.8)",
                    r + "0.6)",
                    "rgba(148,163,184,.5)",
                  ],
                  borderWidth: 0,
                },
              ],
            },
            options: { ...donutOpts, cutout: "60%" },
          },
          "line-cpi": {
            type: "line",
            data: {
              labels: ["Jan'25", "Apr", "Jul", "Oct", "Jan'26", "Apr'26"],
              datasets: [
                {
                  label: "Headline",
                  data: [2.1, 2.3, 2.5, 2.4, 2.5, 2.8],
                  borderColor: a + "1)",
                  tension: 0.4,
                  pointRadius: 4,
                  pointBackgroundColor: a + "1)",
                },
                {
                  label: "Core",
                  data: [1.8, 1.9, 2.0, 2.0, 2.0, 2.1],
                  borderColor: b + "1)",
                  tension: 0.4,
                  borderDash: [4, 2],
                  pointRadius: 3,
                },
              ],
            },
            options: {
              ...baseOpts,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: { size: 10 },
                    color: "#475569",
                    boxWidth: 10,
                  },
                },
              },
            },
          },
          "bar-cpi": {
            type: "bar",
            data: {
              labels: [
                "Housing",
                "Food",
                "Transport",
                "Health",
                "Clothing",
                "Comm.",
              ],
              datasets: [
                {
                  data: [1.9, 4.2, 3.1, 2.4, 1.2, 0.8],
                  backgroundColor: [
                    a + "0.8)",
                    r + "0.7)",
                    b + "0.7)",
                    t + "0.7)",
                    p + "0.7)",
                    "rgba(148,163,184,.6)",
                  ],
                  borderRadius: 4,
                },
              ],
            },
            options: { ...baseOpts, plugins: { legend: { display: false } } },
          },
        };
        if (configs[id]) return configs[id];
        /* published copies */
        const base = id.replace("_pub", "");
        return base !== id ? getChartCfg(base) : null;
      }

      /* ── WIDGET SELECTION ── */
      /* ── MARKUP MODE STATE ── */
      let markupActive = false;
      let markupSelected = []; // array of {el, name}

      function dashToggleMarkup() {
        markupActive = !markupActive;
        const btn =
          document.getElementById("dashBtnMarkupTop") ||
          document.getElementById("dashBtnMarkup");
        const toolbar = document.getElementById("dashMarkupToolbar");
        const scroll = document.getElementById("dashCanvasScroll");
        if (markupActive) {
          btn.classList.add("active");
          btn.innerHTML = '<i class="ti ti-pencil"></i> Markup';
          toolbar.classList.add("show");
          scroll.classList.add("markup-mode");
          // switch chat input to markup mode
          document.getElementById("dashNormalInput").style.display = "none";
          document.getElementById("dashMarkupInput").style.display = "";
          clearSel();
          updateMarkupToolbar();
        } else {
          dashExitMarkup();
        }
      }

      function dashExitMarkup() {
        markupActive = false;
        markupSelected = [];
        const btn =
          document.getElementById("dashBtnMarkupTop") ||
          document.getElementById("dashBtnMarkup");
        const toolbar = document.getElementById("dashMarkupToolbar");
        const scroll = document.getElementById("dashCanvasScroll");
        btn?.classList.remove("active");
        if (btn) btn.innerHTML = '<i class="ti ti-pencil"></i> Markup';
        toolbar?.classList.remove("show");
        scroll?.classList.remove("markup-mode", "has-selection");
        document
          .querySelectorAll(".kpi-card,.widget-card,.insight-card")
          .forEach((w) => {
            w.classList.remove("mu-sel");
            const b = w.querySelector(".mu-badge");
            if (b) {
              b.style.display = "none";
            }
          });
        document.getElementById("dashMtPills").innerHTML = "";
        document.getElementById("dashMtInfo").textContent =
          "Markup mode active";
        document.getElementById("dashMtSub").textContent =
          "— click any widget to select it, then prompt in the chat";
        // restore normal chat input
        document.getElementById("dashNormalInput").style.display = "";
        document.getElementById("dashMarkupInput").style.display = "none";
        const ta = document.getElementById("dashMtInput");
        if (ta) {
          ta.value = "";
          ta.style.height = "auto";
          ta.disabled = true;
        }
        document.getElementById("dashMtSendBtn").disabled = true;
      }

      function markupClickWidget(el, name) {
        if (!markupActive) return;
        const idx = markupSelected.findIndex((s) => s.el === el);
        if (idx >= 0) {
          // deselect
          markupSelected.splice(idx, 1);
          el.classList.remove("mu-sel");
        } else {
          // select (allow multiple)
          markupSelected.push({ el, name });
          el.classList.add("mu-sel");
        }
        // renumber badges
        document.querySelectorAll(".mu-sel").forEach((w, i) => {
          const b = w.querySelector(".mu-badge");
          if (b) {
            b.textContent = i + 1;
            b.style.display = "flex";
          }
        });
        const scroll = document.getElementById("dashCanvasScroll");
        if (markupSelected.length > 0) {
          scroll.classList.add("has-selection");
        } else {
          scroll.classList.remove("has-selection");
        }
        updateMarkupToolbar();
      }

      function updateMarkupToolbar() {
        const pills = document.getElementById("dashMtPills");
        const info = document.getElementById("dashMtInfo");
        const sub = document.getElementById("dashMtSub");
        const n = markupSelected.length;

        // update canvas toolbar status
        if (n === 0) {
          pills.innerHTML = "";
          info.textContent = "Markup mode active";
          sub.textContent =
            "— click any widget to select it, then prompt in the chat";
        } else {
          info.textContent = `${n} widget${n > 1 ? "s" : ""} selected`;
          sub.textContent = "";
          pills.innerHTML = markupSelected
            .map(
              (s, i) =>
                `<span class="mt-pill"><span style="background:var(--purple-400);color:#fff;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;">${i + 1}</span>${s.name}<i class="ti ti-x" onclick="muDeselect(${i})"></i></span>`,
            )
            .join("");
        }

        // update chat panel input context bar
        const micTxt = document.getElementById("dashMicTxt");
        const ta = document.getElementById("dashMtInput");
        const sendBtn = document.getElementById("dashMtSendBtn");
        const chatInner = document.getElementById("markupChatInner");

        if (n === 0) {
          if (micTxt)
            micTxt.innerHTML = "Select a widget on the dashboard to target it";
          if (ta) {
            ta.disabled = true;
            ta.placeholder =
              "Describe what to change on the selected widget(s)…";
          }
          if (sendBtn) sendBtn.disabled = true;
          if (chatInner) chatInner.style.opacity = "0.6";
        } else {
          const names = markupSelected
            .map(
              (s, i) =>
                `<span style="background:var(--purple-400);color:#fff;border-radius:20px;padding:1px 7px;font-size:10px;font-weight:700;margin-right:3px;">${i + 1}</span>${s.name}`,
            )
            .join(" + ");
          if (micTxt) micTxt.innerHTML = names;
          if (ta) {
            ta.disabled = false;
            ta.placeholder = `Describe the change for ${n === 1 ? "this widget" : "these " + n + " widgets"}…`;
          }
          if (sendBtn) sendBtn.disabled = false;
          if (chatInner) chatInner.style.opacity = "1";
          if (ta) ta.focus();
        }
      }

      function muDeselect(idx) {
        const item = markupSelected[idx];
        if (!item) return;
        item.el.classList.remove("mu-sel");
        const b = item.el.querySelector(".mu-badge");
        if (b) b.style.display = "none";
        markupSelected.splice(idx, 1);
        if (markupSelected.length === 0)
          document
            .getElementById("dashCanvasScroll")
            .classList.remove("has-selection");
        // renumber
        document.querySelectorAll(".mu-sel").forEach((w, i) => {
          const b = w.querySelector(".mu-badge");
          if (b) {
            b.textContent = i + 1;
          }
        });
        updateMarkupToolbar();
      }

      function dashMtKey(e) {
        if (e.key === "Enter") {
          e.preventDefault();
          mtSend();
        }
      }

      function dashMtSend() {
        const inp = document.getElementById("dashMtInput");
        const v = inp.value.trim();
        if (!v || markupSelected.length === 0) return;
        inp.value = "";

        const names = markupSelected.map((s) => s.name);
        const namesStr =
          names.length === 1
            ? `**${names[0]}**`
            : names.map((n, i) => `**${i + 1}. ${n}**`).join(", ");

        // flash all selected widgets
        markupSelected.forEach((s) => flashWidget(s.el));

        // add to chat
        const widgetLabel =
          names.length === 1 ? names[0] : `${names.length} widgets`;
        addMsg(
          "user",
          `<p>[Markup] ${escH(v)} — targeting ${escH(widgetLabel)}</p>`,
        );

        showTyping(() => {
          const reply = getMarkupReply(v, names);
          addMsg("ai", reply);
        });

        // reset selection after send
        setTimeout(() => {
          markupSelected.forEach((s) => {
            s.el.classList.remove("mu-sel");
            const b = s.el.querySelector(".mu-badge");
            if (b) b.style.display = "none";
          });
          markupSelected = [];
          document
            .getElementById("dashCanvasScroll")
            .classList.remove("has-selection");
          updateMarkupToolbar();
        }, 400);
      }

      function getMarkupReply(v, names) {
        const l = v.toLowerCase();
        const n = names.length;
        const targets =
          n === 1
            ? `**${names[0]}**`
            : `**${n} selected widgets** (${names.join(", ")})`;
        if (l.includes("bar") || l.includes("chart type"))
          return `Changed ${targets} to a bar chart. All other widgets are unchanged.`;
        if (
          l.includes("yoy") ||
          l.includes("year on year") ||
          l.includes("comparison")
        )
          return `Added a **year-on-year comparison** overlay to ${targets}. Prior-year data shown as a dashed line.`;
        if (l.includes("color") || l.includes("colour") || l.includes("theme"))
          return `Updated the colour scheme for ${targets}. The rest of the dashboard is untouched.`;
        if (l.includes("remove") || l.includes("delete"))
          return `Removed ${targets} from the dashboard. You can undo this by typing "undo last change".`;
        if (l.includes("title") || l.includes("rename") || l.includes("label"))
          return `Renamed ${targets} as requested. The underlying data is unchanged.`;
        if (l.includes("filter") || l.includes("sector") || l.includes("focus"))
          return `Applied the filter to ${targets}. The scope is now narrowed as requested — other widgets show the full dataset.`;
        if (l.includes("bigger") || l.includes("larger") || l.includes("size"))
          return `Expanded ${targets}. The widget now takes up more horizontal space in the layout.`;
        if (l.includes("forecast") || l.includes("predict"))
          return `Added a **forecast extension** to ${targets} — the next 6 periods are projected using trend regression.`;
        if (
          l.includes("benchmark") ||
          l.includes("gcc") ||
          l.includes("compare")
        )
          return `Added a **benchmark reference line** to ${targets}. Regional average is shown as a dashed grey line.`;
        if (l.includes("insight") || l.includes("explain"))
          return `Generated a new **AI insight card** below ${targets} explaining the key pattern and what it means in context.`;
        return `Updated ${targets} based on your instruction. All other widgets on the dashboard are unaffected.`;
      }

      function dashSelWidget(el, name) {
        // If markup mode is on, route to markup selection instead
        if (markupActive) {
          markupClickWidget(el, name);
          return;
        }
        if (selWidgetEl === el) {
          clearSel();
          return;
        }
        document
          .querySelectorAll(".kpi-card,.widget-card,.insight-card")
          .forEach((w) => {
            w.classList.remove("sel");
            w.querySelector(".sel-ring")?.classList.remove("show");
          });
        el.classList.add("sel");
        el.querySelector(".sel-ring")?.classList.add("show");
        selWidgetEl = el;
        document.getElementById("dashEditBannerTxt").textContent =
          "Editing: " + name;
        document.getElementById("dashEditBanner").classList.add("show");
        document.getElementById("dashChatInput").placeholder =
          "Ask me to change this widget…";
        addMsg(
          "ai",
          `**${name}** selected. Tell me how to change it:\n\n- "Change this to a bar chart"\n- "Add a year-on-year comparison line"\n- "Focus only on Construction sector"\n- "Add a GCC benchmark line"`,
        );
      }
      function dashClearSel() {
        selWidgetEl = null;
        document
          .querySelectorAll(".kpi-card,.widget-card,.insight-card")
          .forEach((w) => {
            w.classList.remove("sel");
            w.querySelector(".sel-ring")?.classList.remove("show");
          });
        document.getElementById("dashEditBanner").classList.remove("show");
        document.getElementById("dashChatInput").placeholder =
          "Describe your dashboard or say what to change…";
      }
      function flashWidget(el) {
        if (!el) return;
        el.style.transition = "box-shadow .2s";
        el.style.boxShadow = "0 0 0 4px rgba(0,102,255,.22)";
        setTimeout(() => {
          el.style.boxShadow = "";
        }, 900);
      }
      function getWidgetReply(v) {
        const l = v.toLowerCase();
        const nm =
          selWidgetEl?.querySelector(".w-title,.kpi-lbl,.ic-type")
            ?.textContent || "Widget";
        if (l.includes("bar"))
          return `Changed **${nm}** to a bar chart. The underlying data is unchanged.`;
        if (l.includes("yoy") || l.includes("year"))
          return `Added a **year-on-year comparison line** to ${nm}. The prior-year series is shown as a dashed overlay.`;
        if (l.includes("gcc") || l.includes("benchmark"))
          return `Added a **GCC average benchmark** line to ${nm}. Shown as a dashed grey reference.`;
        if (l.includes("construction") || l.includes("sector"))
          return `Filtered **${nm}** to show Construction sector only. All other widgets are unchanged.`;
        return `Updated **${nm}** based on your instruction. The rest of the dashboard is unaffected.`;
      }
      function getRefinementReply(v) {
        const l = v.toLowerCase();
        if (l.includes("gcc") || l.includes("peer"))
          return "Adding a **GCC peer comparison** section below the existing charts. Pulling in Saudi Arabia, Dubai, and Qatar data now.";
        if (l.includes("pdf") || l.includes("export"))
          return "Generating a **PDF export** with all current metrics and charts. Downloading now.";
        if (l.includes("forecast") || l.includes("predict"))
          return "Adding a **12-month forecast** chart using regression on the existing trend data. Confidence intervals included.";
        if (l.includes("map") || l.includes("geo"))
          return "Adding a **geographic heatmap** showing distribution across Abu Dhabi zones using the geospatial registry layer.";
        if (l.includes("dark") || l.includes("theme"))
          return "Switching the dashboard to **dark mode**. Toggle back from the canvas toolbar.";
        return "Updating the dashboard based on your instruction. Relevant sections are refreshing — other widgets are unaffected.";
      }

      /* ── SUGGESTION CHIPS ── */
      function addSugChips() {
        const c = document.getElementById("dashChatMsgs");
        const row = document.createElement("div");
        row.className = "sug-row";
        [
          { i: "ti-chart-dots", l: "Add GCC comparison" },
          { i: "ti-map", l: "Add geographic map" },
          { i: "ti-trending-up", l: "Add 6-month forecast" },
          { i: "ti-file-analytics", l: "Export as PDF" },
        ].forEach((s) => {
          const btn = document.createElement("div");
          btn.className = "sug";
          btn.innerHTML = `<i class="ti ${s.i}"></i>${s.l}`;
          btn.onclick = () => {
            addMsg("user", `<p>${s.l}</p>`);
            handleMsg(s.l);
          };
          row.appendChild(btn);
        });
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
      }

      /* ── APPROVAL TRACKER IN CHAT ── */
      function showAtCard() {
        const c = document.getElementById("dashChatMsgs");
        const { el, av, body } = mkAiWrap();
        body.innerHTML = `<div class="at-card" style="margin-top:8px;max-width:320px;">
    <div class="at-hd"><i class="ti ti-list-check"></i><span>Approval Workflow — Entity Zone Portal</span></div>
    <div class="at-steps">
      <div class="at-step"><div class="at-step-l"><div class="at-dot done"><i class="ti ti-check"></i></div><div class="at-line"></div></div><div class="at-body"><div class="at-step-title">Submitted</div><div class="at-step-sub">Dashboard submitted to governance queue</div><div class="at-step-time">Today · 14:32 GST</div></div></div>
      <div class="at-step"><div class="at-step-l"><div class="at-dot active"><i class="ti ti-clock"></i></div><div class="at-line"></div></div><div class="at-body"><div class="at-step-title">Under Review</div><div class="at-step-sub">Data Governance team reviewing compliance</div><div class="at-step-time">Est. 3–5 business days</div></div></div>
      <div class="at-step"><div class="at-step-l"><div class="at-dot wait"><i class="ti ti-circle"></i></div><div class="at-line"></div></div><div class="at-body"><div class="at-step-title">Decision</div><div class="at-step-sub">Approved or returned with feedback</div></div></div>
      <div class="at-step"><div class="at-step-l"><div class="at-dot wait"><i class="ti ti-circle"></i></div></div><div class="at-body"><div class="at-step-title">Published</div><div class="at-step-sub">Live on Entity Zone Portal</div></div></div>
    </div>
    <div class="at-note"><i class="ti ti-info-circle"></i><span>Email notifications at every stage. Track from your dashboard library.</span></div>
  </div>`;
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
      }

      /* ── PUBLISHED DASHBOARD ── */
      function dashBuildPublishedDash() {
        const scroll = document.getElementById("dashPubScroll");
        if (scroll.children.length > 0) return;
        const l = dashTopic.toLowerCase();
        const rows = l.includes("gdp")
          ? getGdpWidgets()
          : l.includes("cpi")
            ? getCpiWidgets()
            : getLabourWidgets();
        rows.forEach((html, i) => {
          const el = document.createElement("div");
          el.className = "w-in";
          el.style.animationDelay = i * 0.06 + "s";
          el.innerHTML = html;
          scroll.appendChild(el);
          el.querySelectorAll("canvas[data-chart]").forEach((c) => {
            const nid = c.getAttribute("data-chart") + "_pub";
            c.setAttribute("data-chart", nid);
            initChart(c);
          });
        });
      }

      /* ── SHARED MSG HELPERS ── */
      function addMsg(role, text) {
        const c = document.getElementById("dashChatMsgs");
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = mdH(text);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("msg-av ai", 28));
          wrap.appendChild(body);
        } else {
          wrap.appendChild(body);
        }
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }
      function mkAiWrap() {
        const el = document.createElement("div");
        el.className = "msg ai";
        const av = baiAvatarEl("msg-av ai", 28);
        const body = document.createElement("div");
        body.className = "msg-body";
        return { el, av, body };
      }
      function showTyping(cb) {
        isTyping = true;
        const c = document.getElementById("dashChatMsgs");
        const el = document.createElement("div");
        el.id = "typing-ind";
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 28)}<div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => {
            el.remove();
            isTyping = false;
            cb();
          },
          700 + Math.random() * 400,
        );
      }
      function mdH(t) {
        if (!t) return "";
        return t
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>")
          .replace(/^/, "<p>")
          .replace(/$/, "</p>");
      }
      function escH(s) {
        return (s || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      /* ── INIT ── */
      window.addEventListener("load", () => {
        setTimeout(dashInitPreviewCharts, 120);
        setTimeout(kpiInitLibCharts, 150);
      });

      /* ══════════════════════════════════════
   KPI BUILDER STUDIO
══════════════════════════════════════ */

      let kpiStudioStarted = false,
        kpiBuilt = false,
        kpiTopic = "",
        kpiSelSectionEl = null,
        kpiSelSectionName = "",
        kpiIsTyping = false,
        kpiBayaanDatasets = [],
        kpiExtSources = [];
      const kpiChartInst = {};

      function kpiGoTo(id) {
        document
          .querySelectorAll("#v-kpi .kpi-view")
          .forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        const t = TOOLS.kpi;
        if (id === "kpi-library") {
          _setStudioTopbar(
            '<a onclick="showGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">KPI Builder</span>',
            '<button class="tb-btn tb-btn-accent" onclick="kpiGoTo(\'kpi-builder\')"><i class="ti ti-sparkles"></i> New KPI</button>',
          );
          kpiInitLibCharts();
        } else if (id === "kpi-builder") {
          const title =
            document.getElementById("kpiStudioTitle")?.textContent ||
            "New KPI";
          _setStudioTopbar(
            '<a onclick="kpiGoTo(\'kpi-library\')">KPI Builder</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">' +
              title +
              "</span>",
          );
          kpiUpdateBuilderActions();
          kpiInitStudio();
        }
      }

      function kpiUpdateBuilderActions() {
        let html =
          '<button class="tb-btn" onclick="kpiGoTo(\'kpi-library\')"><i class="ti ti-x"></i> Close</button>';
        if (kpiBuilt) {
          html =
            '<button class="tb-btn" onclick="kpiSaveDraft()"><i class="ti ti-device-floppy"></i> Save Draft</button>' +
            '<button class="tb-btn tb-btn-accent" onclick="kpiSubmitApproval()"><i class="ti ti-send"></i> Submit for Approval</button>' +
            '<button class="tb-btn" onclick="kpiGoTo(\'kpi-library\')"><i class="ti ti-x"></i> Close</button>';
        }
        _setStudioTopbar(undefined, html);
      }

      function kpiLibTab(el, tab) {
        document
          .querySelectorAll("#v-kpi .lib-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("kpi-tab-my").style.display =
          tab === "my" ? "" : "none";
        document.getElementById("kpi-tab-gov").style.display =
          tab === "gov" ? "" : "none";
      }

      function kpiToggleChat() {
        const chat = document.getElementById("kpiStudioChat");
        if (!chat) return;
        const collapsing = !chat.classList.contains("collapsed");
        chat.classList.toggle("collapsed", collapsing);
        chat.style.width = collapsing ? "48px" : "400px";
        chat.style.minWidth = collapsing ? "48px" : "400px";
      }

      function kpiFChip(el) {
        el.parentElement
          .querySelectorAll(".fchip")
          .forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
      }

      function kpiInitLibCharts() {
        const sparkData = [
          [32000, 34500, 36800, 38900, 40100, 42180],
          [9800, 10500, 11200, 12800, 13400, 14230],
          [3.5, 3.52, 3.58, 3.62, 3.68, 3.75],
        ];
        ["klc-1", "klc-2", "klc-3"].forEach((id, idx) => {
          const canvas = document.getElementById(id);
          if (!canvas) return;
          if (kpiChartInst[id]) {
            kpiChartInst[id].destroy();
            delete kpiChartInst[id];
          }
          const ctx = canvas.getContext("2d");
          const w = canvas.parentElement?.offsetWidth || 200;
          canvas.width = w;
          canvas.height = 72;
          const color = idx === 2 ? "#B45309" : "#2563EB";
          const grad = ctx.createLinearGradient(0, 0, 0, 72);
          grad.addColorStop(0, color + "33");
          grad.addColorStop(1, color + "00");
          kpiChartInst[id] = new Chart(ctx, {
            type: "line",
            data: {
              labels: sparkData[idx].map((_, i) => i),
              datasets: [
                {
                  data: sparkData[idx],
                  borderColor: color,
                  backgroundColor: grad,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 0,
                  borderWidth: 2,
                },
              ],
            },
            options: {
              responsive: false,
              maintainAspectRatio: false,
              animation: false,
              plugins: { legend: { display: false }, tooltip: { enabled: false } },
              scales: {
                x: { display: false },
                y: { display: false },
              },
            },
          });
        });
      }

      function kpiInitStudio() {
        kpiStudioStarted = true;
        kpiBuilt = false;
        kpiSelSectionEl = null;
        kpiSelSectionName = "";
        kpiTopic = "";
        kpiExtSources = [];
        kpiBayaanDatasets = [];
        kpiClearSel();
        document.getElementById("kpiChatMsgs").innerHTML = "";
        document.getElementById("kpiCanvasScroll").innerHTML = "";
        document.getElementById("kpiCanvasScroll").style.display = "none";
        document.getElementById("kpiCanvasEmpty").style.display = "flex";
        document.getElementById("kpiCanvasStatus").textContent =
          "Awaiting prompt";
        document.getElementById("kpiCanvasStatus").className = "cs empty";
        document.getElementById("kpiCanvasBarRight").style.display = "none";
        document.getElementById("kpiBuildBar")?.classList.remove("show");
        const st = document.getElementById("kpiStudioTitle");
        if (st) st.textContent = "New KPI";
        kpiShowTyping(() => {
          kpiAddMsg(
            "ai",
            `👋 Welcome to **KPI Builder!**\n\nTell me what performance indicator you want to create — for example:\n\n**"Social welfare beneficiaries tracked monthly for MOSAL"**\n\n**"Consumer price index for clothing and footwear"**\n\nI'll suggest the best Bayaan datasets, then build a single KPI card you can refine section by section.`,
          );
        });
      }

      function kpiChatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          kpiChatSend();
        }
      }

      function kpiChatSend() {
        const inp = document.getElementById("kpiChatInput");
        const v = inp.value.trim();
        if (!v || kpiIsTyping) return;
        inp.value = "";
        inp.style.height = "auto";
        kpiAddMsg("user", `<p>${escH(v)}</p>`);
        kpiHandleMsg(v);
      }

      function kpiHandleMsg(v) {
        const l = v.toLowerCase();
        if (!kpiBuilt) {
          kpiTopic = v;
          const t = kpiInferTitle(v);
          const st = document.getElementById("kpiStudioTitle");
          if (st) st.textContent = t;
          document.getElementById("kpiCanvasTitle").textContent = t;
          kpiShowTyping(() => {
            kpiAddMsg(
              "ai",
              "Got it — scanning Bayaan for datasets that match your KPI definition…",
            );
            setTimeout(
              () => kpiShowTyping(() => kpiShowProposalCard(v)),
              700,
            );
          });
        } else if (kpiSelSectionEl) {
          kpiShowTyping(() => {
            kpiAddMsg("ai", kpiGetSectionReply(v));
            kpiFlashSection(kpiSelSectionEl);
          });
        } else {
          kpiShowTyping(() =>
            kpiAddMsg(
              "ai",
              "Click a section on the KPI card — **Title**, **Chart**, **Metric**, **Trend**, or **Metadata** — then tell me how to change it.",
            ),
          );
        }
      }

      function kpiInferTitle(p) {
        const l = p.toLowerCase();
        if (l.includes("welfare") || l.includes("beneficiar"))
          return "Social Welfare Beneficiaries";
        if (l.includes("cpi") || l.includes("price") || l.includes("inflation"))
          return "Consumer Price Index — Clothing & Footwear";
        if (l.includes("determination") || l.includes("disability"))
          return "People of Determination — Active Cases";
        if (l.includes("elderly") || l.includes("65"))
          return "Elderly Population (65+) Abu Dhabi";
        if (l.includes("youth") || l.includes("participation"))
          return "Youth Community Participation Rate";
        const words = p.split(/\s+/).slice(0, 6).join(" ");
        return words.length > 40 ? words.slice(0, 40) + "…" : words || "New KPI";
      }

      function kpiGetMetaForTopic(l) {
        if (l.includes("welfare") || l.includes("beneficiar"))
          return {
            val: "42,180",
            delta: "+8.4% YoY",
            dir: "up",
            src: "MOSAL",
            owner: "Fatima Al Mansoori",
            chartData: [35200, 36800, 38100, 39500, 40800, 42180],
            chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          };
        if (l.includes("cpi") || l.includes("price") || l.includes("clothing"))
          return {
            val: "3.75",
            delta: "+0.3pp MoM",
            dir: "up",
            src: "SCAD",
            owner: "Ahmed Al Hamdan",
            chartData: [3.5, 3.52, 3.58, 3.62, 3.68, 3.71, 3.75],
            chartLabels: [
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
            ],
          };
        if (l.includes("determination") || l.includes("disability"))
          return {
            val: "14,230",
            delta: "+12.1% YoY",
            dir: "up",
            src: "DOH",
            owner: "Fatima Al Mansoori",
            chartData: [9800, 10500, 11200, 12800, 13400, 14230],
            chartLabels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
          };
        return {
          val: "24,560",
          delta: "+5.2% YoY",
          dir: "up",
          src: "SCAD",
          owner: "Fatima Al Mansoori",
          chartData: [18200, 19800, 21200, 22100, 23400, 24560],
          chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        };
      }

      function kpiGetDSForTopic(l) {
        if (l.includes("welfare") || l.includes("beneficiar"))
          return [
            {
              name: "Social Welfare Registry",
              sub: "MOSAL · 840K rows · live",
              c: "teal",
              icon: "ti-heart-handshake",
              match: 98,
            },
            {
              name: "Beneficiary Payments",
              sub: "ClickHouse · monthly disbursements",
              c: "blue",
              icon: "ti-cash",
              match: 94,
            },
            {
              name: "Household Demographics",
              sub: "SCAD · census linkage",
              c: "purple",
              icon: "ti-users",
              match: 81,
            },
          ];
        if (l.includes("cpi") || l.includes("price") || l.includes("inflation"))
          return [
            {
              name: "CPI Main Index",
              sub: "SCAD · monthly",
              c: "amber",
              icon: "ti-home",
              match: 99,
            },
            {
              name: "CPI Sub-categories",
              sub: "Clothing & footwear expenditure group",
              c: "blue",
              icon: "ti-list",
              match: 96,
            },
            {
              name: "Global Inflation Bench",
              sub: "World Bank API",
              c: "teal",
              icon: "ti-globe",
              match: 72,
            },
          ];
        if (l.includes("determination") || l.includes("disability"))
          return [
            {
              name: "Disability & Inclusion Index",
              sub: "DOH · quarterly",
              c: "purple",
              icon: "ti-accessible",
              match: 97,
            },
            {
              name: "Active Case Registry",
              sub: "ClickHouse · 120K rows",
              c: "blue",
              icon: "ti-file-analytics",
              match: 93,
            },
            {
              name: "Community Services Log",
              sub: "MOSAL · service delivery",
              c: "teal",
              icon: "ti-heart",
              match: 78,
            },
          ];
        return [
          {
            name: "National Statistics Core",
            sub: "SCAD · multi-domain",
            c: "blue",
            icon: "ti-database",
            match: 88,
          },
          {
            name: "Entity Operational Data",
            sub: "ClickHouse · entity warehouse",
            c: "teal",
            icon: "ti-building",
            match: 82,
          },
          {
            name: "Policy Targets Registry",
            sub: "Vision 2030 KPI framework",
            c: "amber",
            icon: "ti-target",
            match: 71,
          },
        ];
      }

      function kpiShowProposalCard(prompt) {
        const l = prompt.toLowerCase();
        const datasets = kpiGetDSForTopic(l);
        kpiBayaanDatasets = datasets.map((d) => d.name);
        kpiExtSources = [];
        const c = document.getElementById("kpiChatMsgs");
        const { el, av, body } = kpiMkAiWrap();
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = `<p>I found <strong>${datasets.length} relevant datasets</strong> for this KPI. Select or deselect sources, then click <strong>Create KPI</strong>.</p>`;
        body.appendChild(bubble);

        const card = document.createElement("div");
        card.className = "prop-card";
        card.style.marginTop = "8px";
        let dsHTML = datasets
          .map(
            (d, i) => `
    <div class="ds-item">
      <div class="ds-ico ${d.c}"><i class="ti ${d.icon}"></i></div>
      <div style="flex:1;min-width:0;">
        <div class="ds-name">${d.name}</div>
        <div class="ds-sub">${d.sub}</div>
      </div>
      <span class="ds-match">${d.match}%</span>
      <div class="ds-chk on" id="kpiDsc${i}" onclick="kpiTogDs(${i})"><i class="ti ti-check"></i></div>
    </div>`,
          )
          .join("");

        card.innerHTML = `
    <div class="prop-strip"><i class="ti ti-database"></i><span>Suggested data sources</span></div>
    <div class="prop-ds">${dsHTML}</div>`;
        body.appendChild(card);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        kpiUpdateBuildBar();
      }

      function kpiTogDs(i) {
        const el = document.getElementById(`kpiDsc${i}`);
        el.classList.toggle("on");
        el.innerHTML = el.classList.contains("on")
          ? '<i class="ti ti-check"></i>'
          : "";
        kpiUpdateBuildBar();
      }

      function kpiUpdateBuildBar() {
        const bar = document.getElementById("kpiBuildBar");
        const pills = document.getElementById("kpiBbPills");
        const countTxt = document.getElementById("kpiBbCountTxt");
        if (!bar) return;
        const checkedBayaan = [];
        let i = 0;
        while (document.getElementById(`kpiDsc${i}`)) {
          const el = document.getElementById(`kpiDsc${i}`);
          if (el.classList.contains("on")) {
            checkedBayaan.push(kpiBayaanDatasets[i] || `Dataset ${i + 1}`);
          }
          i++;
        }
        const total = checkedBayaan.length + kpiExtSources.length;
        if (total === 0) {
          bar.classList.remove("show");
          return;
        }
        bar.classList.add("show");
        countTxt.textContent = `${total} source${total > 1 ? "s" : ""} selected`;
        const allSources = [
          ...checkedBayaan.map((n) => ({ name: n, ext: false })),
          ...kpiExtSources.map((n) => ({ name: n, ext: true })),
        ];
        pills.innerHTML = allSources
          .map(
            (s) =>
              `<span class="bb-pill${s.ext ? " ext" : ""}"><i class="ti ti-${s.ext ? "plug" : "database"}"></i>${s.name}</span>`,
          )
          .join("");
      }

      function kpiConfirmSources() {
        document.getElementById("kpiBuildBar")?.classList.remove("show");
        kpiAddMsg("user", "<p>Create KPI with selected sources</p>");
        kpiShowTyping(() => {
          kpiAddMsg("ai", "Perfect — building your KPI card now…");
          kpiShowGenProgress();
        });
      }

      function kpiShowGenProgress() {
        const c = document.getElementById("kpiChatMsgs");
        const { el, av, body } = kpiMkAiWrap();
        const steps = [
          "Querying selected datasets…",
          "Mapping source fields",
          "Calculating metric & trend",
          "Rendering chart",
          "Finalising KPI card",
        ];
        const prog = document.createElement("div");
        prog.className = "gen-prog";
        prog.innerHTML =
          `<div class="gp-lbl"><i class="ti ti-sparkles"></i>Generating KPI</div>` +
          steps
            .map(
              (s, i) =>
                `<div class="gp-step"><div class="gp-dot ${i === 0 ? "active" : "wait"}" id="kg${i + 1}"><i class="ti ti-${i === 0 ? "refresh" : "circle"}"></i></div>${s}</div>`,
            )
            .join("");
        body.appendChild(prog);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;

        document.getElementById("kpiCanvasStatus").textContent = "Building…";
        document.getElementById("kpiCanvasStatus").className = "cs building";
        document.getElementById("kpiCanvasEmpty").style.display = "none";

        [
          [0, 1, 700],
          [1, 2, 1300],
          [2, 3, 1900],
          [3, 4, 2500],
        ].forEach(([cur, nxt, delay]) => {
          setTimeout(() => {
            const d = document.getElementById(`kg${cur + 1}`);
            if (!d) return;
            d.className = "gp-dot done";
            d.innerHTML = '<i class="ti ti-check"></i>';
            if (nxt < 5) {
              const n = document.getElementById(`kg${nxt + 1}`);
              if (n) {
                n.className = "gp-dot active";
                n.innerHTML = '<i class="ti ti-refresh"></i>';
              }
            }
          }, delay);
        });
        setTimeout(() => {
          const d = document.getElementById("kg5");
          if (d) {
            d.className = "gp-dot done";
            d.innerHTML = '<i class="ti ti-check"></i>';
          }
          kpiBuildCard();
        }, 3200);
      }

      function kpiBuildCardHTML(title, meta) {
        const dirIcon = meta.dir === "up" ? "ti-trending-up" : "ti-trending-down";
        return `
<div class="kpi-studio-card w-in">
  <div class="kpi-sec kpi-sec-header" data-sec="Title" onclick="kpiSelSection(this,'Title')">
    <div class="kpi-sec-ring"><span class="kpi-sec-tag">Title</span></div>
    <div class="kpi-sec-hd">
      <h2 class="kpi-sec-title" id="kpiCardTitle">${escH(title)}</h2>
      <span class="kpi-sec-status">Draft</span>
    </div>
  </div>
  <div class="kpi-sec kpi-sec-chart" data-sec="Chart" onclick="kpiSelSection(this,'Chart')">
    <div class="kpi-sec-ring"><span class="kpi-sec-tag">Chart</span></div>
    <div class="kpi-chart-wrap"><canvas id="kpiMainChart" data-kpi-chart="main"></canvas></div>
  </div>
  <div class="kpi-sec-row">
    <div class="kpi-sec kpi-sec-metric" data-sec="Primary Metric" onclick="kpiSelSection(this,'Primary Metric')">
      <div class="kpi-sec-ring"><span class="kpi-sec-tag">Metric</span></div>
      <div class="kpi-sec-lbl">Current Value</div>
      <div class="kpi-sec-val" id="kpiCardVal">${meta.val}</div>
    </div>
    <div class="kpi-sec kpi-sec-trend" data-sec="Trend Indicator" onclick="kpiSelSection(this,'Trend Indicator')">
      <div class="kpi-sec-ring"><span class="kpi-sec-tag">Trend</span></div>
      <div class="kpi-sec-lbl">Change</div>
      <div class="kpi-sec-delta ${meta.dir}" id="kpiCardDelta"><i class="ti ${dirIcon}"></i>${meta.delta}</div>
    </div>
  </div>
  <div class="kpi-sec kpi-sec-meta" data-sec="Metadata" onclick="kpiSelSection(this,'Metadata')">
    <div class="kpi-sec-ring"><span class="kpi-sec-tag">Meta</span></div>
    <div class="kpi-sec-meta-inner">
      <span id="kpiCardOwner">by ${escH(meta.owner)}</span>
      <span class="kpi-sec-src" id="kpiCardSrc">${escH(meta.src)}</span>
    </div>
  </div>
</div>`;
      }

      function kpiBuildCard() {
        kpiBuilt = true;
        const l = kpiTopic.toLowerCase();
        const title =
          document.getElementById("kpiStudioTitle")?.textContent || "New KPI";
        const meta = kpiGetMetaForTopic(l);
        window._kpiCardMeta = meta;

        const scroll = document.getElementById("kpiCanvasScroll");
        scroll.innerHTML = kpiBuildCardHTML(title, meta);
        scroll.style.display = "flex";
        document.getElementById("kpiCanvasStatus").textContent = "Ready";
        document.getElementById("kpiCanvasStatus").className = "cs ready";
        document.getElementById("kpiCanvasBarRight").style.display = "flex";
        kpiUpdateBuilderActions();
        kpiInitMainChart(meta);
        document.getElementById("kpiChatInput").placeholder =
          "Click a section on the KPI card to edit it…";

        setTimeout(() => {
          kpiAddMsg(
            "ai",
            `✅ **KPI card ready!**\n\nYour indicator includes a **title**, **trend chart**, **primary metric**, **change indicator**, and **metadata**.\n\n**Click any section** on the card to select it, then ask me to modify just that part — or use the suggested prompts below.`,
          );
          kpiAddSugChips();
        }, 400);
      }

      function kpiInitMainChart(meta) {
        const canvas = document.getElementById("kpiMainChart");
        if (!canvas) return;
        if (kpiChartInst.main) {
          kpiChartInst.main.destroy();
          delete kpiChartInst.main;
        }
        kpiChartInst.main = new Chart(canvas, {
          type: "line",
          data: {
            labels: meta.chartLabels,
            datasets: [
              {
                data: meta.chartData,
                borderColor: "#2563EB",
                backgroundColor: "rgba(37,99,235,.06)",
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: "#2563EB",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 11 }, color: "#9CA3AF" },
              },
              y: {
                grid: { color: "#F0F2F8" },
                ticks: { font: { size: 11 }, color: "#9CA3AF" },
              },
            },
          },
        });
      }

      function kpiSelSection(el, name) {
        if (!kpiBuilt) return;
        if (kpiSelSectionEl === el) {
          kpiClearSel();
          return;
        }
        document.querySelectorAll(".kpi-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".kpi-sec-ring")?.classList.remove("show");
        });
        el.classList.add("sel");
        el.querySelector(".kpi-sec-ring")?.classList.add("show");
        kpiSelSectionEl = el;
        kpiSelSectionName = name;
        document.getElementById("kpiEditBannerTxt").textContent =
          "Editing: " + name;
        document.getElementById("kpiEditBanner").classList.add("show");
        document.getElementById("kpiChatInput").placeholder =
          "Ask me to change the " + name.toLowerCase() + "…";
        kpiAddMsg("ai", kpiGetSectionPrompts(name));
        kpiAddSectionSugChips(name);
      }

      function kpiClearSel() {
        kpiSelSectionEl = null;
        kpiSelSectionName = "";
        document.querySelectorAll(".kpi-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".kpi-sec-ring")?.classList.remove("show");
        });
        document.getElementById("kpiEditBanner")?.classList.remove("show");
        document.getElementById("kpiChatInput").placeholder =
          "Describe the KPI you want to build…";
      }

      function kpiFlashSection(el) {
        if (!el) return;
        el.style.transition = "box-shadow .2s";
        el.style.boxShadow = "0 0 0 4px rgba(0,102,255,.22)";
        setTimeout(() => {
          el.style.boxShadow = "";
        }, 900);
      }

      function kpiGetSectionPrompts(name) {
        const prompts = {
          Title: `**Title** selected. Try:\n\n- "Shorten the title"\n- "Add Arabic subtitle"\n- "Include expenditure group name"`,
          Chart: `**Chart** selected. Try:\n\n- "Change to bar chart"\n- "Show last 6 months only"\n- "Add region filter"\n- "Add comparison line"`,
          "Primary Metric": `**Primary metric** selected. Try:\n\n- "Format as currency"\n- "Change aggregation to average"\n- "Show latest month only"`,
          "Trend Indicator": `**Trend indicator** selected. Try:\n\n- "Show MoM instead of YoY"\n- "Add target comparison"\n- "Highlight if above threshold"`,
          Metadata: `**Metadata** selected. Try:\n\n- "Change data source to DOH"\n- "Assign owner to Sara Mansouri"\n- "Add refresh frequency note"`,
        };
        return prompts[name] || `**${name}** selected. Describe how you'd like to change it.`;
      }

      function kpiGetSectionReply(v) {
        const l = v.toLowerCase();
        const sec = kpiSelSectionName;
        if (sec === "Chart") {
          if (l.includes("bar"))
            return "Changed the chart to a **bar chart**. Data series unchanged.";
          if (l.includes("6 month") || l.includes("last 6"))
            return "Filtered the chart to show **last 6 months** only.";
          if (l.includes("region") || l.includes("filter"))
            return "Added a **region filter** chip above the chart — Abu Dhabi, Al Ain, Al Dhafra.";
          if (l.includes("compar") || l.includes("benchmark"))
            return "Added a **comparison line** (policy target) overlaid on the chart.";
          return "Updated the **chart** based on your instruction.";
        }
        if (sec === "Title") {
          if (l.includes("short"))
            return "Shortened the KPI title while keeping the official indicator name.";
          if (l.includes("arabic"))
            return "Added an **Arabic subtitle** below the main title.";
          return "Updated the **title** section.";
        }
        if (sec === "Primary Metric") {
          if (l.includes("currency") || l.includes("aed"))
            return "Formatted the primary metric as **AED currency**.";
          if (l.includes("average") || l.includes("avg"))
            return "Changed aggregation to **monthly average** over the selected period.";
          return "Updated the **primary metric** display.";
        }
        if (sec === "Trend Indicator") {
          if (l.includes("mom") || l.includes("month"))
            return "Switched trend to **month-on-month** comparison.";
          if (l.includes("target"))
            return "Added **target comparison** — currently 5.9% above policy target.";
          return "Updated the **trend indicator** badge.";
        }
        if (sec === "Metadata") {
          if (l.includes("owner") || l.includes("assign"))
            return "Updated KPI **owner** in metadata.";
          if (l.includes("source") || l.includes("doh") || l.includes("mosal"))
            return "Changed the **data source** label in metadata.";
          return "Updated **metadata** footer.";
        }
        return `Updated **${sec}** based on your instruction. Other sections are unchanged.`;
      }

      function kpiAddSugChips() {
        const c = document.getElementById("kpiChatMsgs");
        const row = document.createElement("div");
        row.className = "sug-row";
        [
          { i: "ti-filter", l: "Add region filter" },
          { i: "ti-chart-bar", l: "Change to bar chart" },
          { i: "ti-target", l: "Add target comparison" },
          { i: "ti-calendar", l: "Show last 6 months" },
        ].forEach((s) => {
          const btn = document.createElement("div");
          btn.className = "sug";
          btn.innerHTML = `<i class="ti ${s.i}"></i>${s.l}`;
          btn.onclick = () => {
            if (!kpiSelSectionEl) {
              const chartSec = document.querySelector(".kpi-sec-chart");
              if (chartSec) kpiSelSection(chartSec, "Chart");
            }
            kpiAddMsg("user", `<p>${s.l}</p>`);
            kpiShowTyping(() => {
              kpiAddMsg("ai", kpiGetSectionReply(s.l));
              kpiFlashSection(kpiSelSectionEl);
            });
          };
          row.appendChild(btn);
        });
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
      }

      function kpiAddSectionSugChips(name) {
        const chipsBySection = {
          Chart: [
            { i: "ti-filter", l: "Add region filter" },
            { i: "ti-chart-bar", l: "Change to bar chart" },
            { i: "ti-line", l: "Add comparison line" },
          ],
          Title: [
            { i: "ti-text-size", l: "Shorten title" },
            { i: "ti-language", l: "Add Arabic subtitle" },
          ],
          "Primary Metric": [
            { i: "ti-currency-dollar", l: "Format as currency" },
            { i: "ti-calculator", l: "Change to average" },
          ],
          "Trend Indicator": [
            { i: "ti-calendar-stats", l: "Show MoM instead" },
            { i: "ti-target", l: "Add target comparison" },
          ],
          Metadata: [
            { i: "ti-user", l: "Change owner" },
            { i: "ti-database", l: "Update data source" },
          ],
        };
        const chips = chipsBySection[name];
        if (!chips) return;
        const c = document.getElementById("kpiChatMsgs");
        const row = document.createElement("div");
        row.className = "sug-row";
        chips.forEach((s) => {
          const btn = document.createElement("div");
          btn.className = "sug";
          btn.innerHTML = `<i class="ti ${s.i}"></i>${s.l}`;
          btn.onclick = () => {
            kpiAddMsg("user", `<p>${s.l}</p>`);
            kpiShowTyping(() => {
              kpiAddMsg("ai", kpiGetSectionReply(s.l));
              kpiFlashSection(kpiSelSectionEl);
            });
          };
          row.appendChild(btn);
        });
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
      }

      function kpiSaveDraft() {
        toast("KPI saved as draft", "ti-device-floppy");
        kpiAddMsg(
          "ai",
          "💾 **Draft saved** to My KPIs. You can return anytime to continue editing.",
        );
      }

      function kpiSubmitApproval() {
        toast("KPI submitted for approval", "ti-check");
        kpiAddMsg(
          "ai",
          "📤 **Submitted for approval.** Your KPI is in the governance queue — expected review in **3–5 business days**.",
        );
      }

      function kpiAddMsg(role, text) {
        const c = document.getElementById("kpiChatMsgs");
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = mdH(text);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("msg-av ai", 28));
          wrap.appendChild(body);
        } else {
          wrap.appendChild(body);
        }
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }

      function kpiMkAiWrap() {
        const el = document.createElement("div");
        el.className = "msg ai";
        const av = baiAvatarEl("msg-av ai", 28);
        const body = document.createElement("div");
        body.className = "msg-body";
        return { el, av, body };
      }

      function kpiShowTyping(cb) {
        kpiIsTyping = true;
        const c = document.getElementById("kpiChatMsgs");
        const el = document.createElement("div");
        el.id = "kpi-typing-ind";
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 28)}<div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => {
            el.remove();
            kpiIsTyping = false;
            cb();
          },
          700 + Math.random() * 400,
        );
      }

      window.kpiGoTo = kpiGoTo;

      /* ══════════════════════════════════════
   TABLE BUILDER STUDIO
══════════════════════════════════════ */

      let tblBuilt = false,
        tblTopic = "",
        tblSelSectionEl = null,
        tblSelSectionName = "",
        tblIsTyping = false,
        tblBayaanDatasets = [],
        tblExtSources = [];
      const tblState = {
        view: "tabular",
        D: { headers: [], rows: [], types: [], title: "", desc: "", source: "", owner: "" },
        visibleCols: [],
        fmt: { heatmap: false, bars: false, stripe: false, rownum: false, borders: true, cleanse: false },
        rp: { totals: false },
        sort: { col: -1, dir: 1 },
        filtered: null,
        heatThreshold: 50,
      };

      function tblGoTo(id) {
        document
          .querySelectorAll("#v-table .tbl-view")
          .forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        if (id === "table-library") {
          _setStudioTopbar(
            '<a onclick="showGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">Table Builder</span>',
            '<button class="tb-btn tb-btn-accent" onclick="tblGoTo(\'table-builder\')"><i class="ti ti-sparkles"></i> New Table</button>',
          );
        } else if (id === "table-builder") {
          const title =
            document.getElementById("tblStudioTitle")?.textContent ||
            "New Table";
          _setStudioTopbar(
            '<a onclick="tblGoTo(\'table-library\')">Table Builder</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">' +
              title +
              "</span>",
          );
          tblUpdateBuilderActions();
          tblInitStudio();
        }
      }

      function tblUpdateBuilderActions() {
        let html =
          '<button class="tb-btn" onclick="tblGoTo(\'table-library\')"><i class="ti ti-x"></i> Close</button>';
        if (tblBuilt) {
          html =
            '<button class="tb-btn" onclick="toast(\'CSV exported\',\'ti-download\')"><i class="ti ti-download"></i> Export CSV</button>' +
            '<button class="tb-btn" onclick="tblSaveDraft()"><i class="ti ti-device-floppy"></i> Save Draft</button>' +
            '<button class="tb-btn tb-btn-accent" onclick="tblPublishDataset()"><i class="ti ti-database"></i> Publish</button>' +
            '<button class="tb-btn" onclick="tblGoTo(\'table-library\')"><i class="ti ti-x"></i> Close</button>';
        }
        _setStudioTopbar(undefined, html);
      }

      function tblLibTab(el, tab) {
        document
          .querySelectorAll("#v-table .lib-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("tbl-tab-my").style.display =
          tab === "my" ? "" : "none";
        document.getElementById("tbl-tab-shared").style.display =
          tab === "shared" ? "" : "none";
      }

      function tblToggleChat() {
        const chat = document.getElementById("tblStudioChat");
        if (!chat) return;
        const collapsing = !chat.classList.contains("collapsed");
        chat.classList.toggle("collapsed", collapsing);
        chat.style.width = collapsing ? "48px" : "400px";
        chat.style.minWidth = collapsing ? "48px" : "400px";
      }

      function tblFChip(el) {
        el.parentElement
          .querySelectorAll(".fchip")
          .forEach((c) => c.classList.remove("active"));
        el.classList.add("active");
      }

      function tblInitStudio() {
        tblBuilt = false;
        tblSelSectionEl = null;
        tblSelSectionName = "";
        tblTopic = "";
        tblExtSources = [];
        tblBayaanDatasets = [];
        tblState.view = "tabular";
        tblState.filtered = null;
        tblState.sort = { col: -1, dir: 1 };
        tblState.fmt = { heatmap: false, bars: false, stripe: false, rownum: false, borders: true, cleanse: false };
        tblState.rp = { totals: false };
        tblClearSel();
        document.getElementById("tblChatMsgs").innerHTML = "";
        document.getElementById("tblCanvasScroll").innerHTML = "";
        document.getElementById("tblCanvasScroll").style.display = "none";
        document.getElementById("tblCanvasEmpty").style.display = "flex";
        document.getElementById("tblCanvasStatus").textContent =
          "Awaiting prompt";
        document.getElementById("tblCanvasStatus").className = "cs empty";
        document.getElementById("tblCanvasBarRight").style.display = "none";
        document.getElementById("tblBuildBar")?.classList.remove("show");
        const st = document.getElementById("tblStudioTitle");
        if (st) st.textContent = "New Table";
        tblShowTyping(() => {
          tblAddMsg(
            "ai",
            `👋 Welcome to **Table Builder!**\n\nDescribe the spreadsheet you need — for example:\n\n**"Abu Dhabi GDP by sector and quarter, 2024–2026, with YoY growth columns"**\n\n**"Labour force breakdown by nationality and sector"**\n\nI'll suggest Bayaan datasets, infer column types, and build the table. You can then click any section to refine it.`,
          );
        });
      }

      function tblChatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          tblChatSend();
        }
      }

      function tblChatSend() {
        const inp = document.getElementById("tblChatInput");
        const v = inp.value.trim();
        if (!v || tblIsTyping) return;
        inp.value = "";
        inp.style.height = "auto";
        tblAddMsg("user", `<p>${escH(v)}</p>`);
        tblHandleMsg(v);
      }

      function tblHandleMsg(v) {
        if (!tblBuilt) {
          tblTopic = v;
          const t = tblInferTitle(v);
          const st = document.getElementById("tblStudioTitle");
          if (st) st.textContent = t;
          document.getElementById("tblCanvasTitle").textContent = t;
          tblShowTyping(() => {
            tblAddMsg(
              "ai",
              "Got it — scanning Bayaan for datasets and column mappings that match your table definition…",
            );
            setTimeout(
              () => tblShowTyping(() => tblShowProposalCard(v)),
              700,
            );
          });
        } else if (tblSelSectionEl) {
          tblShowTyping(() => {
            const result = tblApplyPrompt(v, tblSelSectionName);
            tblAddMsg("ai", result.message);
            tblFlashSection(tblSelSectionEl);
          });
        } else {
          tblShowTyping(() => {
            const result = tblApplyPrompt(v);
            tblAddMsg("ai", result.message);
          });
        }
      }

      function tblInferTitle(p) {
        const l = p.toLowerCase();
        if (l.includes("gdp") || l.includes("sector"))
          return "Abu Dhabi GDP by Sector — Quarterly";
        if (l.includes("labour") || l.includes("labor") || l.includes("nationality"))
          return "Labour Force by Nationality";
        if (l.includes("cpi") || l.includes("inflation") || l.includes("price"))
          return "CPI Sub-category Breakdown";
        if (l.includes("trade") || l.includes("import") || l.includes("export"))
          return "Trade & Imports Summary";
        const words = p.split(/\s+/).slice(0, 7).join(" ");
        return words.length > 45 ? words.slice(0, 45) + "…" : words || "New Table";
      }

      const TBL_DATASETS = {
        gdp: {
          title: "Abu Dhabi GDP by Sector — 2024–2026",
          desc: "Quarterly GDP contribution by economic sector in AED billions with YoY growth.",
          source: "SCAD",
          owner: "Fatima Al Mansoori",
          headers: ["Sector", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "YoY %", "Status"],
          types: ["text", "num", "num", "num", "num", "num", "pct", "badge"],
          rows: [
            ["Non-oil Manufacturing", 62.1, 64.3, 66.8, 68.0, 68.4, 6.1, "Growing"],
            ["Tourism & Hospitality", 35.4, 38.1, 42.0, 40.2, 41.2, 11.4, "Expanding"],
            ["Construction", 34.2, 35.8, 37.1, 38.0, 38.9, 8.2, "On Track"],
            ["Financial Services", 48.9, 50.2, 51.8, 52.0, 52.3, 3.8, "Stable"],
            ["Oil & Gas", 206.1, 210.4, 211.8, 209.2, 212.0, 0.9, "Stable"],
            ["Government Services", 28.4, 29.1, 29.8, 30.0, 30.4, 3.2, "Stable"],
            ["Retail & Trade", 41.8, 43.2, 45.1, 44.6, 46.0, 9.3, "Growing"],
            ["Technology & ICT", 18.2, 19.6, 21.4, 22.0, 23.8, 18.9, "Expanding"],
          ],
        },
        labour: {
          title: "Labour Market — Employment by Sector 2025",
          desc: "Workforce distribution by sector with unemployment rate and salary benchmarks.",
          source: "MoHRE",
          owner: "Ahmed Al Hamdan",
          headers: ["Sector", "Employed (000s)", "Unemployed (000s)", "Rate %", "YoY Δ pp", "Avg Salary AED", "Status"],
          types: ["text", "num", "num", "pct", "num", "num", "badge"],
          rows: [
            ["Government", 485, 12, 2.4, 1.2, 22400, "Healthy"],
            ["Finance & Banking", 142, 8, 5.3, -0.4, 28600, "Stable"],
            ["Construction", 892, 67, 7.0, 2.1, 8200, "Watch"],
            ["Retail & Trade", 634, 48, 7.0, -1.8, 10400, "Stable"],
            ["Healthcare", 198, 6, 2.9, 3.4, 18800, "Healthy"],
            ["Education", 224, 4, 1.7, 0.8, 17200, "Healthy"],
            ["IT & Technology", 96, 9, 8.6, 5.2, 25600, "Alert"],
            ["Tourism", 388, 31, 7.4, -0.2, 9800, "Stable"],
          ],
        },
        cpi: {
          title: "CPI Index by Category — Abu Dhabi 2025",
          desc: "Monthly CPI by expenditure group with MoM and YoY comparisons.",
          source: "SCAD",
          owner: "Sara Mansouri",
          headers: ["Category", "Weight %", "Jan 25", "Jun 25", "Dec 25", "YoY %", "Trend"],
          types: ["text", "num", "num", "num", "num", "pct", "badge"],
          rows: [
            ["Food & Beverages", 14.2, 104.2, 106.8, 109.1, 4.7, "Rising"],
            ["Housing & Utilities", 34.1, 101.8, 102.4, 103.1, 1.3, "Stable"],
            ["Transport", 12.8, 98.4, 101.2, 105.6, 7.3, "Rising"],
            ["Education", 6.4, 102.1, 102.1, 103.4, 1.3, "Stable"],
            ["Healthcare", 4.8, 103.6, 105.1, 106.4, 2.7, "Stable"],
            ["Clothing", 5.2, 97.8, 99.2, 101.8, 4.1, "Moderate"],
            ["Recreation", 3.9, 100.4, 101.8, 103.2, 2.8, "Stable"],
            ["Restaurants", 7.1, 106.4, 108.9, 112.1, 5.3, "Rising"],
          ],
        },
      };

      function tblDetectDatasetKey(l) {
        if (l.includes("labour") || l.includes("labor") || l.includes("employment") || l.includes("workforce") || l.includes("nationality"))
          return "labour";
        if (l.includes("cpi") || l.includes("price") || l.includes("inflation") || l.includes("category"))
          return "cpi";
        return "gdp";
      }

      function tblInitDataFromTopic(l) {
        const key = tblDetectDatasetKey(l);
        const ds = TBL_DATASETS[key];
        tblState.D = {
          title: ds.title,
          desc: ds.desc,
          source: ds.source,
          owner: ds.owner,
          headers: [...ds.headers],
          types: [...ds.types],
          rows: ds.rows.map((r) => [...r]),
        };
        tblState.visibleCols = ds.headers.map(() => true);
        tblState.filtered = null;
        tblState.sort = { col: -1, dir: 1 };
        return tblState.D;
      }

      function tblGetTableData(l) {
        const d = tblInitDataFromTopic(l);
        return {
          desc: d.desc,
          source: d.source,
          owner: d.owner,
          columns: d.headers.map((name, i) => ({
            name,
            type: d.types[i] === "num" ? "AED B" : d.types[i] === "pct" ? "%" : d.types[i],
          })),
          rows: d.rows.map((r) => r.map(String)),
        };
      }

      function tblGetDSForTopic(l) {
        if (l.includes("gdp") || l.includes("sector"))
          return [
            { name: "National Accounts", sub: "SCAD · quarterly + annual", c: "teal", icon: "ti-building-bank", match: 99 },
            { name: "Sector GDP Breakdown", sub: "ClickHouse · 340K rows", c: "blue", icon: "ti-chart-area", match: 96 },
            { name: "District Economic Data", sub: "Geospatial linkage", c: "purple", icon: "ti-map", match: 78 },
          ];
        if (l.includes("labour") || l.includes("labor") || l.includes("nationality"))
          return [
            { name: "Labour Registry", sub: "MoHRE · 1.2M rows · live", c: "blue", icon: "ti-users", match: 98 },
            { name: "Employment Stats Q1 2026", sub: "SCAD National Accounts", c: "teal", icon: "ti-chart-bar", match: 93 },
            { name: "Work Permit Records", sub: "ClickHouse · daily sync", c: "amber", icon: "ti-id", match: 85 },
          ];
        if (l.includes("cpi") || l.includes("inflation") || l.includes("price"))
          return [
            { name: "CPI Main Index", sub: "SCAD · monthly", c: "amber", icon: "ti-home", match: 97 },
            { name: "CPI Sub-categories", sub: "Essential vs Non-essential", c: "blue", icon: "ti-list", match: 94 },
            { name: "Global Inflation Bench", sub: "World Bank API", c: "teal", icon: "ti-globe", match: 72 },
          ];
        return [
          { name: "National Statistics Core", sub: "SCAD · multi-domain", c: "blue", icon: "ti-database", match: 88 },
          { name: "Entity Operational Data", sub: "ClickHouse · entity warehouse", c: "teal", icon: "ti-building", match: 82 },
          { name: "Policy Targets Registry", sub: "Vision 2030 framework", c: "amber", icon: "ti-target", match: 71 },
        ];
      }

      function tblShowProposalCard(prompt) {
        const l = prompt.toLowerCase();
        const datasets = tblGetDSForTopic(l);
        tblBayaanDatasets = datasets.map((d) => d.name);
        tblExtSources = [];
        const c = document.getElementById("tblChatMsgs");
        const { el, av, body } = tblMkAiWrap();
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = `<p>I found <strong>${datasets.length} relevant datasets</strong> for this table. Select or deselect sources, then click <strong>Create table</strong>.</p>`;
        body.appendChild(bubble);
        const card = document.createElement("div");
        card.className = "prop-card";
        card.style.marginTop = "8px";
        card.innerHTML = `
    <div class="prop-strip"><i class="ti ti-database"></i><span>Suggested data sources</span></div>
    <div class="prop-ds">${datasets.map((d, i) => `
    <div class="ds-item">
      <div class="ds-ico ${d.c}"><i class="ti ${d.icon}"></i></div>
      <div style="flex:1;min-width:0;">
        <div class="ds-name">${d.name}</div>
        <div class="ds-sub">${d.sub}</div>
      </div>
      <span class="ds-match">${d.match}%</span>
      <div class="ds-chk on" id="tblDsc${i}" onclick="tblTogDs(${i})"><i class="ti ti-check"></i></div>
    </div>`).join("")}</div>`;
        body.appendChild(card);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        tblUpdateBuildBar();
      }

      function tblTogDs(i) {
        const el = document.getElementById(`tblDsc${i}`);
        el.classList.toggle("on");
        el.innerHTML = el.classList.contains("on")
          ? '<i class="ti ti-check"></i>'
          : "";
        tblUpdateBuildBar();
      }

      function tblUpdateBuildBar() {
        const bar = document.getElementById("tblBuildBar");
        const pills = document.getElementById("tblBbPills");
        const countTxt = document.getElementById("tblBbCountTxt");
        if (!bar) return;
        const checked = [];
        let i = 0;
        while (document.getElementById(`tblDsc${i}`)) {
          const el = document.getElementById(`tblDsc${i}`);
          if (el.classList.contains("on"))
            checked.push(tblBayaanDatasets[i] || `Dataset ${i + 1}`);
          i++;
        }
        const total = checked.length + tblExtSources.length;
        if (total === 0) {
          bar.classList.remove("show");
          return;
        }
        bar.classList.add("show");
        countTxt.textContent = `${total} source${total > 1 ? "s" : ""} selected`;
        pills.innerHTML = [
          ...checked.map((n) => ({ name: n, ext: false })),
          ...tblExtSources.map((n) => ({ name: n, ext: true })),
        ]
          .map(
            (s) =>
              `<span class="bb-pill${s.ext ? " ext" : ""}"><i class="ti ti-${s.ext ? "plug" : "database"}"></i>${s.name}</span>`,
          )
          .join("");
      }

      function tblConfirmSources() {
        document.getElementById("tblBuildBar")?.classList.remove("show");
        tblAddMsg("user", "<p>Create table with selected sources</p>");
        tblShowTyping(() => {
          tblAddMsg("ai", "Perfect — building your table now…");
          tblShowGenProgress();
        });
      }

      function tblShowGenProgress() {
        const c = document.getElementById("tblChatMsgs");
        const { el, av, body } = tblMkAiWrap();
        const steps = [
          "Querying selected datasets…",
          "Detecting column types",
          "Mapping source fields",
          "Populating rows",
          "Finalising table",
        ];
        const prog = document.createElement("div");
        prog.className = "gen-prog";
        prog.innerHTML =
          `<div class="gp-lbl"><i class="ti ti-sparkles"></i>Generating table</div>` +
          steps
            .map(
              (s, i) =>
                `<div class="gp-step"><div class="gp-dot ${i === 0 ? "active" : "wait"}" id="tg${i + 1}"><i class="ti ti-${i === 0 ? "refresh" : "circle"}"></i></div>${s}</div>`,
            )
            .join("");
        body.appendChild(prog);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        document.getElementById("tblCanvasStatus").textContent = "Building…";
        document.getElementById("tblCanvasStatus").className = "cs building";
        document.getElementById("tblCanvasEmpty").style.display = "none";
        [
          [0, 1, 700],
          [1, 2, 1300],
          [2, 3, 1900],
          [3, 4, 2500],
        ].forEach(([cur, nxt, delay]) => {
          setTimeout(() => {
            const d = document.getElementById(`tg${cur + 1}`);
            if (!d) return;
            d.className = "gp-dot done";
            d.innerHTML = '<i class="ti ti-check"></i>';
            if (nxt < 5) {
              const n = document.getElementById(`tg${nxt + 1}`);
              if (n) {
                n.className = "gp-dot active";
                n.innerHTML = '<i class="ti ti-refresh"></i>';
              }
            }
          }, delay);
        });
        setTimeout(() => {
          const d = document.getElementById("tg5");
          if (d) {
            d.className = "gp-dot done";
            d.innerHTML = '<i class="ti ti-check"></i>';
          }
          tblBuildTable();
        }, 3200);
      }

      function tblSetView(v) {
        tblState.view = v;
        ["tabular", "summary", "pivot"].forEach((t) => {
          document.getElementById("tblVtab-" + t)?.classList.toggle("on", t === v);
        });
        tblRender();
      }

      function tblSyncFmtButtons() {
        const map = { heatmap: "tblFmtHeat", bars: "tblFmtBars", stripe: "tblFmtStripe", rownum: "tblFmtRownum", cleanse: "tblCleanseBtn" };
        Object.entries(map).forEach(([k, id]) => {
          document.getElementById(id)?.classList.toggle("active", !!tblState.fmt[k]);
        });
        const tag = document.getElementById("tblCleanseTag");
        if (tag) tag.style.display = tblState.fmt.cleanse ? "inline-flex" : "none";
      }

      function tblUpdateMetaBar() {
        const rows = tblState.filtered || tblState.D.rows;
        const vis = tblState.visibleCols.filter(Boolean).length;
        const el = document.getElementById("tblMetaBar");
        if (el) {
          el.textContent = tblState.filtered
            ? `${rows.length} of ${tblState.D.rows.length} rows · ${vis} columns · ${tblState.view} view`
            : `${rows.length} rows · ${vis} columns · ${tblState.view} view · by ${tblState.D.owner}`;
        }
      }

      const TBL_BADGE_MAP = {
        Growing: "cb-ok", Expanding: "cb-acc", Stable: "cb-neutral", "On Track": "cb-ok",
        Healthy: "cb-ok", Watch: "cb-warn", Alert: "cb-err", Rising: "cb-err",
        Moderate: "cb-warn", Flat: "cb-neutral",
      };

      function tblBadge(v) {
        return `<span class="cb ${TBL_BADGE_MAP[v] || "cb-neutral"}">${escH(v)}</span>`;
      }

      function tblFmtVal(v, type, ci) {
        if (type === "pct") return parseFloat(v).toFixed(1) + "%";
        const h = (tblState.D.headers[ci] || "").toLowerCase();
        if (h.includes("aed") || h.includes("salary") || h.includes("budget")) {
          if (Math.abs(v) >= 1000000) return "AED " + (v / 1e6).toFixed(1) + "M";
          if (Math.abs(v) >= 1000) return "AED " + (v / 1000).toFixed(0) + "K";
          return "AED " + Number(v).toLocaleString();
        }
        if (Number.isInteger(v)) return v.toLocaleString();
        return parseFloat(v).toFixed(1);
      }

      function tblNumRange(rows, col) {
        let mn = Infinity, mx = -Infinity;
        rows.forEach((r) => {
          const v = parseFloat(r[col]);
          if (!isNaN(v)) { mn = Math.min(mn, v); mx = Math.max(mx, v); }
        });
        return { mn, mx };
      }

      function tblHeatCls(v, mn, mx, th) {
        if (mx === mn) return "";
        if (v < 0) return "hmn";
        const p = ((v - mn) / (mx - mn)) * 100;
        if (p >= th + 20) return "hm5";
        if (p >= th + 5) return "hm4";
        if (p >= th) return "hm3";
        if (p >= th - 15) return "hm2";
        return "hm1";
      }

      function tblGetSortedRows(rows) {
        if (tblState.sort.col < 0) return [...rows];
        return [...rows].sort((a, b) => {
          let av = a[tblState.sort.col], bv = b[tblState.sort.col];
          const fa = parseFloat(av), fb = parseFloat(bv);
          if (!isNaN(fa) && !isNaN(fb)) { av = fa; bv = fb; }
          return av > bv ? tblState.sort.dir : av < bv ? -tblState.sort.dir : 0;
        });
      }

      function tblColSort(col) {
        if (tblState.sort.col === col) tblState.sort.dir *= -1;
        else tblState.sort = { col, dir: 1 };
        tblRender();
      }

      function tblRender() {
        const host = document.getElementById("tblLiveContent");
        if (!host || !tblState.D.rows.length) return;
        const rows = tblState.filtered || tblState.D.rows;
        if (tblState.view === "summary") tblRenderSummary(host, rows);
        else if (tblState.view === "pivot") tblRenderPivot(host, rows);
        else tblRenderTabular(host, rows);
        tblSyncFmtButtons();
        tblUpdateMetaBar();
      }

      function tblRenderTabular(host, rows) {
        const vis = tblState.visibleCols;
        const sorted = tblGetSortedRows(rows);
        const th = tblState.heatThreshold;
        const ranges = {};
        tblState.D.headers.forEach((_, i) => {
          if (["num", "pct"].includes(tblState.D.types[i])) ranges[i] = tblNumRange(rows, i);
        });
        const totals = tblState.D.headers.map((_, i) =>
          ["num", "pct"].includes(tblState.D.types[i])
            ? rows.reduce((s, r) => s + (parseFloat(r[i]) || 0), 0)
            : null,
        );
        let ths = "";
        if (tblState.fmt.rownum)
          ths += `<th class="rn"><div class="th-row">#</div></th>`;
        tblState.D.headers.forEach((h, i) => {
          if (!vis[i]) return;
          const sc = tblState.sort.col === i ? (tblState.sort.dir === 1 ? "sorted-asc" : "sorted-desc") : "";
          ths += `<th class="${sc}" onclick="event.stopPropagation();tblColSort(${i})"><div class="th-row">${escH(h)}<span class="ct-badge">${tblState.D.types[i]}</span><span class="sort-ind"></span></div></th>`;
        });
        let trs = "";
        sorted.forEach((row, ri) => {
          let cells = "";
          if (tblState.fmt.rownum) cells += `<td class="rn">${ri + 1}</td>`;
          row.forEach((cell, ci) => {
            if (!vis[ci]) return;
            const type = tblState.D.types[ci];
            let cls = "", inner = escH(String(cell));
            if (type === "badge") inner = tblBadge(cell);
            else if (["num", "pct"].includes(type)) {
              const v = parseFloat(cell);
              inner = tblFmtVal(v, type, ci);
              if (tblState.fmt.heatmap) cls = tblHeatCls(v, ranges[ci].mn, ranges[ci].mx, th);
              else if (tblState.fmt.bars) {
                const r = ranges[ci];
                const pct = r.mx === r.mn ? 50 : Math.round(((v - r.mn) / (r.mx - r.mn)) * 78 + 5);
                inner = `<div class="bc"><div class="bc-bg" style="width:${pct}%"></div><div class="bc-txt">${inner}</div></div>`;
              } else if (type === "pct") {
                if (v > 5) cls = "td-ok";
                else if (v < 0) cls = "td-err";
              }
            } else if (type === "text" && ci === 0) {
              inner = `<strong>${inner}</strong>`;
            }
            cells += `<td class="${cls}">${inner}</td>`;
          });
          trs += `<tr>${cells}</tr>`;
        });
        let tfoot = "";
        if (tblState.rp.totals) {
          let tds = tblState.fmt.rownum ? `<td class="rn"></td>` : "";
          vis.forEach((v, i) => {
            if (!v) return;
            if (i === 0) { tds += `<td class="td-total-lbl">Total</td>`; return; }
            if (totals[i] !== null) {
              const val = tblState.D.types[i] === "pct" ? totals[i] / rows.length : totals[i];
              tds += `<td class="td-total">${tblFmtVal(val, tblState.D.types[i], i)}</td>`;
            } else tds += `<td></td>`;
          });
          tfoot = `<tfoot class="tf"><tr>${tds}</tr></tfoot>`;
        }
        const strCls = tblState.fmt.stripe ? "striped" : "";
        const nbCls = !tblState.fmt.borders ? "nb" : "";
        host.innerHTML = `<div class="tbl-card ${nbCls}"><div class="tbl-card-scroll"><table class="dt ${strCls}"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody>${tfoot}</table></div></div>`;
      }

      function tblRenderSummary(host, rows) {
        const vis = tblState.visibleCols;
        const numC = tblState.D.headers.map((h, i) => ({ h, i, t: tblState.D.types[i] })).filter((c) => ["num", "pct"].includes(c.t) && vis[c.i]);
        let cards = "";
        numC.slice(0, 6).forEach((col) => {
          const vals = rows.map((r) => parseFloat(r[col.i])).filter((v) => !isNaN(v));
          const tot = vals.reduce((a, b) => a + b, 0);
          const avg = tot / vals.length;
          const max = Math.max(...vals);
          cards += `<div class="sum-kpi"><div class="sum-lbl"><i class="ti ti-chart-bar"></i>${escH(col.h)}</div><div class="sum-val">${tblFmtVal(col.t === "pct" ? avg : tot, col.t, col.i)}</div><div class="sum-sub">max ${tblFmtVal(max, col.t, col.i)} · avg ${tblFmtVal(avg, col.t, col.i)}</div></div>`;
        });
        let prevRows = "";
        rows.slice(0, 5).forEach((row) => {
          let tds = "";
          row.forEach((cell, ci) => {
            if (!vis[ci]) return;
            const t = tblState.D.types[ci];
            const inn = t === "badge" ? tblBadge(cell) : ci === 0 ? `<strong>${escH(String(cell))}</strong>` : escH(String(cell));
            tds += `<td>${inn}</td>`;
          });
          prevRows += `<tr>${tds}</tr>`;
        });
        const prevThs = tblState.D.headers.map((h, i) => vis[i] ? `<th>${escH(h)}</th>` : "").join("");
        host.innerHTML = `<div class="sum-grid">${cards}</div><div class="section-lbl">Data preview — first 5 rows</div><div class="tbl-card"><table class="dt"><thead><tr>${prevThs}</tr></thead><tbody>${prevRows}</tbody></table></div>`;
      }

      function tblRenderPivot(host, rows) {
        const vis = tblState.visibleCols;
        const ti = tblState.D.headers.findIndex((_, i) => tblState.D.types[i] === "text" && vis[i]);
        const ni = tblState.D.headers.map((_, i) => i).filter((i) => ["num", "pct"].includes(tblState.D.types[i]) && vis[i]).slice(0, 4);
        if (ti < 0 || !ni.length) { tblRenderTabular(host, rows); return; }
        const th = tblState.heatThreshold;
        const rng = {};
        ni.forEach((i) => { rng[i] = tblNumRange(rows, i); });
        const colT = {};
        ni.forEach((i) => { colT[i] = 0; });
        let grand = 0;
        let ths = `<th>${escH(tblState.D.headers[ti])}</th>`;
        ni.forEach((i) => { ths += `<th>${escH(tblState.D.headers[i])}</th>`; });
        ths += `<th>Row Total</th>`;
        let trs = "";
        rows.forEach((row) => {
          let rt = 0;
          let tds = `<td class="pv-lbl">${escH(String(row[ti]))}</td>`;
          ni.forEach((i) => {
            const v = parseFloat(row[i]) || 0;
            rt += v; colT[i] += v;
            let cls = tblState.fmt.heatmap ? tblHeatCls(v, rng[i].mn, rng[i].mx, th) : "";
            tds += `<td class="${cls}">${tblFmtVal(v, tblState.D.types[i], i)}</td>`;
          });
          grand += rt;
          tds += `<td class="pv-total">${tblFmtVal(rt, tblState.D.types[ni[0]], ni[0])}</td>`;
          trs += `<tr>${tds}</tr>`;
        });
        let ftds = `<td class="pv-lbl">Total</td>`;
        ni.forEach((i) => {
          const val = tblState.D.types[i] === "pct" ? colT[i] / rows.length : colT[i];
          ftds += `<td>${tblFmtVal(val, tblState.D.types[i], i)}</td>`;
        });
        ftds += `<td class="pv-total">${tblFmtVal(grand, tblState.D.types[ni[0]], ni[0])}</td>`;
        host.innerHTML = `<div class="pivot-card"><div class="tbl-card-scroll"><table class="pv"><thead><tr>${ths}</tr></thead><tbody>${trs}</tbody><tfoot><tr>${ftds}</tr></tfoot></table></div></div>`;
      }

      function tblBuildTableShell(title) {
        const d = tblState.D;
        return `
<div class="tbl-studio-wrap w-in">
  <div class="tbl-sec tbl-sec-header" data-sec="Title" onclick="tblSelSection(this,'Title')">
    <div class="tbl-sec-ring"><span class="tbl-sec-tag">Title</span></div>
    <h2 class="tbl-sec-title" id="tblLiveTitle">${escH(title)}</h2>
    <p class="tbl-sec-desc" id="tblLiveDesc">${escH(d.desc)}</p>
  </div>
  <div class="tbl-sec tbl-sec-toolbar" data-sec="Toolbar" onclick="tblSelSection(this,'Toolbar')">
    <div class="tbl-sec-ring"><span class="tbl-sec-tag">Toolbar</span></div>
    <div class="tbl-inner-toolbar">
      <button type="button" class="btn btn-ghost btn-xs tbl-fmt-btn" id="tblFmtHeat" onclick="event.stopPropagation();tblRunChip('Enable heatmap coloring')"><i class="ti ti-color-swatch"></i> Heatmap</button>
      <button type="button" class="btn btn-ghost btn-xs tbl-fmt-btn" id="tblFmtBars" onclick="event.stopPropagation();tblRunChip('Add in-cell bars')"><i class="ti ti-chart-bar"></i> Bar cells</button>
      <button type="button" class="btn btn-ghost btn-xs tbl-fmt-btn" id="tblFmtStripe" onclick="event.stopPropagation();tblRunChip('Enable striped rows')"><i class="ti ti-list-details"></i> Striped</button>
      <button type="button" class="btn btn-ghost btn-xs tbl-fmt-btn" id="tblFmtRownum" onclick="event.stopPropagation();tblRunChip('Show row numbers')"><i class="ti ti-list-numbers"></i> Row #</button>
      <button type="button" class="btn btn-ghost btn-xs tbl-fmt-btn" id="tblCleanseBtn" onclick="event.stopPropagation();tblRunChip('Run AI cleanse')"><i class="ti ti-shield-check"></i> AI Cleanse</button>
      <span class="tbl-cleanse-tag" id="tblCleanseTag" style="display:none"><i class="ti ti-check"></i> 2 issues auto-fixed</span>
    </div>
  </div>
  <div class="tbl-sec tbl-sec-table" data-sec="Table" onclick="tblSelSection(this,'Table')">
    <div class="tbl-sec-ring"><span class="tbl-sec-tag">Table</span></div>
    <div id="tblLiveContent"></div>
  </div>
  <div class="tbl-sec tbl-sec-meta" data-sec="Metadata" onclick="tblSelSection(this,'Metadata')">
    <div class="tbl-sec-ring"><span class="tbl-sec-tag">Meta</span></div>
    <div class="tbl-sec-meta-inner">
      <span id="tblMetaBar">${d.rows.length} rows · ${d.headers.length} columns · by ${escH(d.owner)}</span>
      <span class="tbl-sec-src" id="tblLiveSrc">${escH(d.source)}</span>
    </div>
  </div>
</div>`;
      }

      function tblBuildTable() {
        tblBuilt = true;
        const l = tblTopic.toLowerCase();
        const data = tblInitDataFromTopic(l);
        const title = document.getElementById("tblStudioTitle")?.textContent || data.title;
        document.getElementById("tblCanvasTitle").textContent = title;
        tblState.view = "tabular";
        const scroll = document.getElementById("tblCanvasScroll");
        scroll.innerHTML = tblBuildTableShell(title);
        scroll.style.display = "flex";
        document.getElementById("tblCanvasStatus").textContent = "Ready";
        document.getElementById("tblCanvasStatus").className = "cs ready";
        document.getElementById("tblCanvasBarRight").style.display = "flex";
        tblSetView("tabular");
        tblUpdateBuilderActions();
        document.getElementById("tblChatInput").placeholder = "Ask to change columns, views, or formatting…";
        setTimeout(() => {
          tblAddMsg(
            "ai",
            `✅ **Table ready!** — **${data.headers.length} columns**, **${data.rows.length} rows**, typed and formatted.\n\nUse the suggested prompts below to **configure columns**, **switch views** (tabular · summary · pivot), or **apply formatting** — the table updates instantly.`,
          );
          tblAddSugChips("all");
        }, 400);
      }

      function tblRunChip(label) {
        tblAddMsg("user", `<p>${escH(label)}</p>`);
        tblShowTyping(() => {
          const result = tblApplyPrompt(label, tblSelSectionName);
          tblAddMsg("ai", result.message);
          if (tblSelSectionEl) tblFlashSection(tblSelSectionEl);
        });
      }

      function tblApplyPrompt(v, section) {
        const l = v.toLowerCase();
        let msg = "";

        if (l.includes("summary") || l.includes("kpi card")) {
          tblSetView("summary");
          msg = "Switched to **Summary view** — KPI cards plus a 5-row data preview.";
        } else if (l.includes("pivot") || l.includes("cross-tab") || l.includes("group")) {
          tblSetView("pivot");
          msg = "Switched to **Pivot view** — cross-tab with row totals.";
        } else if (l.includes("tabular") || l.includes("grid") || l.includes("row-by-row")) {
          tblSetView("tabular");
          msg = "Switched back to **Tabular view** — full data grid.";
        } else if (l.includes("heatmap") || l.includes("color cells")) {
          tblState.fmt.heatmap = !tblState.fmt.heatmap;
          if (tblState.fmt.heatmap) tblState.fmt.bars = false;
          tblRender();
          msg = tblState.fmt.heatmap ? "**Heatmap coloring** enabled on numeric columns." : "Heatmap coloring turned off.";
        } else if (l.includes("bar cell") || l.includes("in-cell bar") || (l.includes("bar") && !l.includes("toolbar"))) {
          tblState.fmt.bars = !tblState.fmt.bars;
          if (tblState.fmt.bars) tblState.fmt.heatmap = false;
          tblRender();
          msg = tblState.fmt.bars ? "**In-cell bars** added to numeric columns." : "In-cell bars removed.";
        } else if (l.includes("stripe")) {
          tblState.fmt.stripe = !tblState.fmt.stripe;
          tblRender();
          msg = tblState.fmt.stripe ? "**Striped rows** enabled." : "Striped rows disabled.";
        } else if (l.includes("row number") || l.includes("row #") || l.includes("show row")) {
          tblState.fmt.rownum = !tblState.fmt.rownum;
          tblRender();
          msg = tblState.fmt.rownum ? "**Row numbers** column added." : "Row numbers hidden.";
        } else if (l.includes("border")) {
          tblState.fmt.borders = !tblState.fmt.borders;
          tblRender();
          msg = tblState.fmt.borders ? "Column **borders** restored." : "Column borders removed for a cleaner look.";
        } else if (l.includes("total row") || l.includes("totals") || l.includes("sum row")) {
          tblState.rp.totals = !tblState.rp.totals;
          tblRender();
          msg = tblState.rp.totals ? "Added a **totals row** at the bottom." : "Totals row removed.";
        } else if (l.includes("cleanse")) {
          tblState.fmt.cleanse = !tblState.fmt.cleanse;
          tblSyncFmtButtons();
          msg = tblState.fmt.cleanse ? "**AI Cleanse** applied — 2 nulls imputed, 1 outlier flagged." : "AI Cleanse removed.";
        } else if (l.includes("hide") || l.includes("remove column")) {
          const target = tblState.D.headers.find((h, i) => l.includes(h.toLowerCase().split(" ")[0]) || (l.includes("yoy") && h.toLowerCase().includes("yoy")) || (l.includes("status") && tblState.D.types[i] === "badge"));
          if (target) {
            const idx = tblState.D.headers.indexOf(target);
            tblState.visibleCols[idx] = false;
            tblRender();
            msg = `Hidden column **${target}**. ${tblState.visibleCols.filter(Boolean).length} columns visible.`;
          } else if (l.includes("quarter") || l.includes("q1") || l.includes("q2")) {
            tblState.D.headers.forEach((h, i) => {
              if (/Q[1-4]/i.test(h)) tblState.visibleCols[i] = false;
            });
            tblRender();
            msg = "Hidden **quarterly columns** — showing summary columns only.";
          } else {
            const lastNum = tblState.D.types.map((t, i) => ["num", "pct"].includes(t) ? i : -1).filter((i) => i >= 0).pop();
            if (lastNum >= 0) {
              tblState.visibleCols[lastNum] = false;
              tblRender();
              msg = `Hidden **${tblState.D.headers[lastNum]}** column.`;
            }
          }
        } else if (l.includes("show all column") || l.includes("restore column") || l.includes("unhide") || (l.includes("show all") && !l.includes("row"))) {
          tblState.visibleCols = tblState.D.headers.map(() => true);
          tblRender();
          msg = "All columns **restored** and visible.";
        } else if (l.includes("key column") || l.includes("essential")) {
          tblState.visibleCols = tblState.D.headers.map((_, i) => i === 0 || tblState.D.types[i] === "pct" || tblState.D.types[i] === "badge");
          tblRender();
          msg = "Showing **key columns only** — label, change metric, and status.";
        } else if (l.includes("sort") || l.includes("descending") || l.includes("growth")) {
          const idx = tblState.D.headers.findIndex((h) => h.toLowerCase().includes("yoy") || tblState.D.types[tblState.D.headers.indexOf(h)] === "pct");
          const col = idx >= 0 ? idx : tblState.D.headers.findIndex((t) => tblState.D.types[tblState.D.headers.indexOf(t)] === "num");
          tblState.sort = { col: col >= 0 ? col : 0, dir: -1 };
          tblRender();
          msg = `Sorted by **${tblState.D.headers[tblState.sort.col]}** descending.`;
        } else if (l.includes("clear filter") || l.includes("show all rows")) {
          tblState.filtered = null;
          tblRender();
          msg = "Filter cleared — showing **all rows**.";
        } else if (l.includes("top 5") || l.includes("top five") || (l.includes("filter") && !l.includes("clear"))) {
          const pctCol = tblState.D.headers.findIndex((h, i) => tblState.D.types[i] === "pct");
          const sorted = [...tblState.D.rows].sort((a, b) => parseFloat(b[pctCol >= 0 ? pctCol : 0]) - parseFloat(a[pctCol >= 0 ? pctCol : 0]));
          tblState.filtered = sorted.slice(0, 5);
          tblRender();
          msg = "Filtered to **top 5 rows** by highest change metric.";
        } else if (l.includes("arabic") && section === "Title") {
          const sub = document.getElementById("tblLiveDesc");
          if (sub) sub.textContent = tblState.D.desc + " · النسخة العربية";
          msg = "Added **Arabic subtitle** below the table title.";
        } else if (l.includes("rename") || l.includes("official")) {
          const titleEl = document.getElementById("tblLiveTitle");
          const canvasTitle = document.getElementById("tblCanvasTitle");
          if (titleEl) titleEl.textContent = tblState.D.title;
          if (canvasTitle) canvasTitle.textContent = tblState.D.title;
          msg = `Title updated to **${tblState.D.title}**.`;
        } else if (l.includes("source") || l.includes("update data")) {
          tblState.D.source = tblState.D.source === "SCAD" ? "MoHRE" : "SCAD";
          const srcEl = document.getElementById("tblLiveSrc");
          if (srcEl) srcEl.textContent = tblState.D.source;
          msg = `Data source updated to **${tblState.D.source}**.`;
        } else if (l.includes("refresh") || l.includes("timestamp")) {
          tblUpdateMetaBar();
          const meta = document.getElementById("tblMetaBar");
          if (meta) {
            meta.textContent += ` · Refreshed ${new Date().toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}`;
          }
          msg = "Added **last refreshed timestamp** to metadata.";
        } else if (l.includes("add column") || l.includes("yoy column")) {
          msg = "Added a **YoY comparison column** with auto-calculated values.";
        } else {
          msg = section
            ? `Updated **${section}** based on your instruction.`
            : "Try prompts like **Switch to summary view**, **Hide YoY column**, **Enable heatmap**, or **Sort by growth**.";
        }
        return { message: msg };
      }

      function tblSelSection(el, name) {
        if (!tblBuilt) return;
        if (tblSelSectionEl === el) {
          tblClearSel();
          return;
        }
        document.querySelectorAll(".tbl-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".tbl-sec-ring")?.classList.remove("show");
        });
        el.classList.add("sel");
        el.querySelector(".tbl-sec-ring")?.classList.add("show");
        tblSelSectionEl = el;
        tblSelSectionName = name;
        document.getElementById("tblEditBannerTxt").textContent =
          "Editing: " + name;
        document.getElementById("tblEditBanner").classList.add("show");
        document.getElementById("tblChatInput").placeholder =
          "Ask me to change the " + name.toLowerCase() + "…";
      }

      function tblClearSel() {
        tblSelSectionEl = null;
        tblSelSectionName = "";
        document.querySelectorAll(".tbl-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".tbl-sec-ring")?.classList.remove("show");
        });
        document.getElementById("tblEditBanner")?.classList.remove("show");
        document.getElementById("tblChatInput").placeholder =
          tblBuilt
            ? "Ask to change columns, views, or formatting…"
            : "Describe the table you want to build…";
      }

      function tblFlashSection(el) {
        if (!el) return;
        el.style.transition = "box-shadow .2s";
        el.style.boxShadow = "0 0 0 4px rgba(0,102,255,.22)";
        setTimeout(() => {
          el.style.boxShadow = "";
        }, 900);
      }

      function tblAddSugChips(group) {
        const chipGroups = {
          all: [
            { label: "Views", chips: [
              { i: "ti-table", l: "Switch to tabular view" },
              { i: "ti-layout-grid", l: "Switch to summary view" },
              { i: "ti-arrows-cross", l: "Show pivot view" },
            ]},
            { label: "Columns", chips: [
              { i: "ti-eye-off", l: "Hide YoY column" },
              { i: "ti-columns", l: "Show key columns only" },
              { i: "ti-eye", l: "Show all columns" },
            ]},
            { label: "Formatting", chips: [
              { i: "ti-color-swatch", l: "Enable heatmap coloring" },
              { i: "ti-chart-bar", l: "Add in-cell bars" },
              { i: "ti-list-details", l: "Enable striped rows" },
              { i: "ti-list-numbers", l: "Show row numbers" },
            ]},
            { label: "Data", chips: [
              { i: "ti-sort-descending", l: "Sort by growth" },
              { i: "ti-filter", l: "Filter top 5 rows" },
              { i: "ti-sum", l: "Add totals row" },
              { i: "ti-shield-check", l: "Run AI cleanse" },
            ]},
          ],
          view: [{ label: "More views", chips: [
            { i: "ti-table", l: "Switch to tabular view" },
            { i: "ti-layout-grid", l: "Switch to summary view" },
            { i: "ti-arrows-cross", l: "Show pivot view" },
          ]}],
          columns: [{ label: "Column options", chips: [
            { i: "ti-eye-off", l: "Hide YoY column" },
            { i: "ti-columns", l: "Show key columns only" },
            { i: "ti-eye", l: "Show all columns" },
            { i: "ti-border-none", l: "Remove column borders" },
          ]}],
          format: [{ label: "Formatting", chips: [
            { i: "ti-color-swatch", l: "Enable heatmap coloring" },
            { i: "ti-chart-bar", l: "Add in-cell bars" },
            { i: "ti-list-details", l: "Enable striped rows" },
            { i: "ti-list-numbers", l: "Show row numbers" },
            { i: "ti-shield-check", l: "Run AI cleanse" },
          ]}],
          data: [{ label: "Data actions", chips: [
            { i: "ti-sort-descending", l: "Sort by growth" },
            { i: "ti-filter", l: "Filter top 5 rows" },
            { i: "ti-filter-x", l: "Clear filter" },
            { i: "ti-sum", l: "Add totals row" },
          ]}],
        };
        const groups = chipGroups[group] || chipGroups.all;
        const c = document.getElementById("tblChatMsgs");
        groups.forEach((g) => {
          if (g.label && group === "all") {
            const lbl = document.createElement("div");
            lbl.className = "sug-group-lbl";
            lbl.textContent = g.label;
            c.appendChild(lbl);
          }
          const row = document.createElement("div");
          row.className = "sug-row";
          g.chips.forEach((s) => {
            const btn = document.createElement("div");
            btn.className = "sug";
            btn.innerHTML = `<i class="ti ${s.i}"></i>${s.l}`;
            btn.onclick = () => tblRunChip(s.l);
            row.appendChild(btn);
          });
          c.appendChild(row);
        });
        c.scrollTop = c.scrollHeight;
      }

      function tblSaveDraft() {
        toast("Table saved as draft", "ti-device-floppy");
        tblAddMsg("ai", "💾 **Draft saved** to My Tables.");
      }

      function tblPublishDataset() {
        toast("Published as Bayaan dataset", "ti-database");
        tblAddMsg(
          "ai",
          "📊 **Published as dataset** — available in Bayaan Data Catalogue and usable in Dashboard & KPI Builder.",
        );
      }

      function tblAddMsg(role, text) {
        const c = document.getElementById("tblChatMsgs");
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = mdH(text);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("msg-av ai", 28));
          wrap.appendChild(body);
        } else {
          wrap.appendChild(body);
        }
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }

      function tblMkAiWrap() {
        const el = document.createElement("div");
        el.className = "msg ai";
        const av = baiAvatarEl("msg-av ai", 28);
        const body = document.createElement("div");
        body.className = "msg-body";
        return { el, av, body };
      }

      function tblShowTyping(cb) {
        tblIsTyping = true;
        const c = document.getElementById("tblChatMsgs");
        const el = document.createElement("div");
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 28)}<div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => {
            el.remove();
            tblIsTyping = false;
            cb();
          },
          700 + Math.random() * 400,
        );
      }

      window.tblGoTo = tblGoTo;
      window.tblSetView = tblSetView;
      window.tblRunChip = tblRunChip;
      window.tblColSort = tblColSort;


      /* ══════════════════════════════════════
   SCENARIO SIMULATOR STUDIO
══════════════════════════════════════ */

      let scnBuilt = false,
        scnTopic = "",
        scnPhase = "idle",
        scnHorizons = 8,
        scnIsTyping = false,
        scnSelSectionEl = null,
        scnSelSectionName = "",
        scnDatasetKey = "gdp";
      const scnState = { drivers: {}, outputs: [] };

      const SCN_DATASETS = {
        gdp: {
          name: "National Accounts — Sector GDP",
          sub: "SCAD · Quarterly · 340K rows · 2019–2026",
          source: "SCAD",
          owner: "Fatima Al Mansoori",
          frequency: "Quarterly",
          freqDetail: "Published every quarter (Q1–Q4). **28 historical periods** available with sector-level breakdown.",
          insight: "Non-oil sectors are accelerating (**+8.2% avg YoY**) while oil remains stable. Tourism (+11.4%) and ICT (+18.9%) are the strongest growth drivers — ideal for macro what-if modelling.",
          horizonUnit: "quarters",
          horizonLabel: (n) => n + " quarters (" + (n / 4).toFixed(1).replace(".0", "") + " years)",
          metric: "GDP Growth %",
          baseline: 3.4,
          forecastDrift: 0.06,
          drivers: [
            { id: "inflation", label: "Inflation rate change", min: -5, max: 10, step: 0.5, value: 2, suffix: "%", plus: true },
            { id: "tourism", label: "Tourism growth", min: -20, max: 30, step: 1, value: 15, suffix: "%", plus: true },
            { id: "oil", label: "Oil price ($/bbl)", min: 60, max: 120, step: 1, value: 82, prefix: "$" },
            { id: "construction", label: "Construction spend", min: -10, max: 30, step: 1, value: 8, suffix: "%", plus: true },
          ],
          outputs: [
            { label: "Projected GDP growth", base: "+3.4%", key: "gdp" },
            { label: "Household purchasing power", base: "−1.2%", key: "hhp" },
            { label: "Tourism revenue delta", base: "+AED 5.8B", key: "tour" },
            { label: "Non-oil sector impact", base: "+0.6pp", key: "nonoil" },
          ],
          sectors: ["Tourism", "Construction", "Non-oil Mfg", "Financial", "Oil & Gas"],
          sectorData: [11.4, 8.2, 6.1, 3.8, 0.9],
        },
        cpi: {
          name: "CPI Main Index — Abu Dhabi",
          sub: "SCAD · Monthly · 186K rows · 2020–2026",
          source: "SCAD",
          owner: "Sara Mansouri",
          frequency: "Monthly",
          freqDetail: "Published monthly on the **15th** of each month. **72 consecutive months** of category-level CPI data.",
          insight: "Housing & utilities (34.1% weight) anchor overall CPI. Transport (+7.3% YoY) and Food (+4.7%) are the primary upward pressures — sensitive to oil and import price shocks.",
          horizonUnit: "months",
          horizonLabel: (n) => n + " months (" + (n / 12).toFixed(1).replace(".0", "") + " years)",
          metric: "CPI Index",
          baseline: 105.2,
          forecastDrift: 0.18,
          drivers: [
            { id: "housing", label: "Housing cost shock", min: -5, max: 15, step: 0.5, value: 3, suffix: "%", plus: true },
            { id: "transport", label: "Fuel price change", min: -20, max: 30, step: 1, value: 8, suffix: "%", plus: true },
            { id: "food", label: "Food import cost", min: -10, max: 20, step: 1, value: 5, suffix: "%", plus: true },
            { id: "fx", label: "USD/AED pass-through", min: 0, max: 5, step: 0.25, value: 0.5, suffix: "%", plus: true },
          ],
          outputs: [
            { label: "Headline CPI forecast", base: "105.2", key: "headline" },
            { label: "Essential basket impact", base: "+4.1%", key: "ess" },
            { label: "Transport category", base: "+7.3%", key: "trans" },
            { label: "Real wage erosion", base: "−2.8%", key: "wage" },
          ],
          sectors: ["Food", "Housing", "Transport", "Healthcare", "Recreation"],
          sectorData: [4.7, 1.3, 7.3, 2.7, 2.8],
        },
        labour: {
          name: "Labour Market Registry",
          sub: "MoHRE · Quarterly · 1.2M rows · live sync",
          source: "MoHRE",
          owner: "Ahmed Al Hamdan",
          frequency: "Quarterly",
          freqDetail: "Updated **quarterly** from the unified work permit registry. **24 quarters** of sector employment and unemployment data.",
          insight: "Construction (892K employed, 7.0% unemployment) and IT (8.6% unemployment, rising) show divergent trends. Emiratisation targets are most impactful in government and finance sectors.",
          horizonUnit: "quarters",
          horizonLabel: (n) => n + " quarters (" + (n / 4).toFixed(1).replace(".0", "") + " years)",
          metric: "Employment (000s)",
          baseline: 2957,
          forecastDrift: 4.2,
          drivers: [
            { id: "emiratisation", label: "Emiratisation target", min: 0, max: 10, step: 0.5, value: 5, suffix: "%", plus: false },
            { id: "visa", label: "Work visa issuance", min: -30, max: 30, step: 1, value: 10, suffix: "%", plus: true },
            { id: "wage", label: "Avg wage adjustment", min: -10, max: 20, step: 1, value: 4, suffix: "%", plus: true },
            { id: "automation", label: "Automation displacement", min: 0, max: 15, step: 0.5, value: 2, suffix: "%", plus: false },
          ],
          outputs: [
            { label: "Total employment", base: "2,957K", key: "emp" },
            { label: "Unemployment rate", base: "4.8%", key: "unemp" },
            { label: "Emirati share", base: "18.2%", key: "emir" },
            { label: "Avg salary index", base: "+3.1%", key: "sal" },
          ],
          sectors: ["Government", "Construction", "Retail", "IT", "Healthcare"],
          sectorData: [485, 892, 634, 96, 198],
        },
      };

      function scnGoTo(id) {
        document.querySelectorAll("#v-scenario .scn-view").forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        if (id === "scenario-library") {
          _setStudioTopbar(
            '<a onclick="showGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">Scenario Simulator</span>',
            '<button class="tb-btn tb-btn-accent" onclick="scnGoTo(\'scenario-builder\')"><i class="ti ti-sparkles"></i> New Simulation</button>',
          );
        } else if (id === "scenario-builder") {
          const title = document.getElementById("scnStudioTitle")?.textContent || "New Simulation";
          _setStudioTopbar(
            '<a onclick="scnGoTo(\'scenario-library\')">Scenario Simulator</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">' + title + "</span>",
          );
          scnUpdateBuilderActions();
          scnInitStudio();
        }
      }

      function scnUpdateBuilderActions() {
        let html = '<button class="tb-btn" onclick="scnGoTo(\'scenario-library\')"><i class="ti ti-x"></i> Close</button>';
        if (scnBuilt) {
          html =
            '<button class="tb-btn" onclick="toast(\'Simulation exported\',\'ti-download\')"><i class="ti ti-download"></i> Export</button>' +
            '<button class="tb-btn" onclick="scnSaveDraft()"><i class="ti ti-device-floppy"></i> Save Draft</button>' +
            '<button class="tb-btn tb-btn-accent" onclick="scnRunSimulation()"><i class="ti ti-calculator"></i> Re-run</button>' +
            '<button class="tb-btn" onclick="scnGoTo(\'scenario-library\')"><i class="ti ti-x"></i> Close</button>';
        }
        _setStudioTopbar(undefined, html);
      }

      function scnLibTab(el, tab) {
        document.querySelectorAll("#v-scenario .lib-tab").forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("scn-tab-my").style.display = tab === "my" ? "" : "none";
        document.getElementById("scn-tab-shared").style.display = tab === "shared" ? "" : "none";
      }

      function scnToggleChat() {
        const chat = document.getElementById("scnStudioChat");
        if (!chat) return;
        const collapsing = !chat.classList.contains("collapsed");
        chat.classList.toggle("collapsed", collapsing);
        chat.style.width = collapsing ? "48px" : "400px";
        chat.style.minWidth = collapsing ? "48px" : "400px";
      }

      function scnInitStudio() {
        scnBuilt = false;
        scnPhase = "idle";
        scnTopic = "";
        scnHorizons = 8;
        scnDatasetKey = "gdp";
        scnSelSectionEl = null;
        scnSelSectionName = "";
        scnClearSel();
        document.getElementById("scnChatMsgs").innerHTML = "";
        document.getElementById("scnCanvasScroll").innerHTML = "";
        document.getElementById("scnCanvasScroll").style.display = "none";
        document.getElementById("scnCanvasEmpty").style.display = "flex";
        document.getElementById("scnCanvasStatus").textContent = "Awaiting prompt";
        document.getElementById("scnCanvasStatus").className = "cs empty";
        document.getElementById("scnCanvasBarRight").style.display = "none";
        document.getElementById("scnBuildBar")?.classList.remove("show");
        const st = document.getElementById("scnStudioTitle");
        if (st) st.textContent = "New Simulation";
        scnShowTyping(() => {
          scnAddMsg(
            "ai",
            `👋 Welcome to **Scenario Simulator!**\n\nDescribe the what-if scenario you want to model — for example:\n\n**"Impact of +2% inflation on GDP growth"**\n\n**"CPI shock from rising transport costs over 12 months"**\n\nI'll find the best matching dataset, analyze its frequency, and guide you through setting a forecast horizon.`,
          );
        });
      }

      function scnDetectDatasetKey(l) {
        if (l.includes("cpi") || l.includes("inflation") || l.includes("price") || l.includes("cost of living"))
          return "cpi";
        if (l.includes("labour") || l.includes("labor") || l.includes("employment") || l.includes("workforce") || l.includes("emirati"))
          return "labour";
        return "gdp";
      }

      function scnInferTitle(p) {
        const l = p.toLowerCase();
        if (l.includes("inflation") && l.includes("gdp")) return "+2% Inflation GDP Impact";
        if (l.includes("cpi") || l.includes("inflation")) return "CPI Shock Scenario";
        if (l.includes("labour") || l.includes("employment")) return "Labour Market Forecast";
        if (l.includes("tourism")) return "Tourism Growth Scenario";
        const words = p.split(/\s+/).slice(0, 6).join(" ");
        return words.length > 42 ? words.slice(0, 42) + "…" : words || "New Simulation";
      }

      function scnChatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          scnChatSend();
        }
      }

      function scnChatSend() {
        const inp = document.getElementById("scnChatInput");
        const v = inp.value.trim();
        if (!v || scnIsTyping) return;
        inp.value = "";
        inp.style.height = "auto";
        scnAddMsg("user", `<p>${escH(v)}</p>`);
        scnHandleMsg(v);
      }

      function scnHandleMsg(v) {
        const l = v.toLowerCase();
        if (scnPhase === "await_horizon") {
          const n = scnParseHorizon(v);
          if (n) {
            scnSetHorizon(n);
            return;
          }
          scnShowTyping(() => {
            scnAddMsg("ai", "Please enter a number of **quarters** or **months** — e.g. `8 quarters` or `12 months`. Or click one of the suggested options above.");
          });
          return;
        }
        if (scnBuilt) {
          scnShowTyping(() => scnAddMsg("ai", "Simulation is ready. Adjust **drivers** on the canvas or click **Re-run** to refresh projections."));
          return;
        }
        if (scnPhase !== "idle") return;
        scnTopic = v;
        scnDatasetKey = scnDetectDatasetKey(l);
        const t = scnInferTitle(v);
        document.getElementById("scnStudioTitle").textContent = t;
        document.getElementById("scnCanvasTitle").textContent = t;
        scnPhase = "dataset";
        scnShowTyping(() => {
          scnAddMsg("ai", "Scanning Bayaan for the best matching dataset for your scenario…");
          setTimeout(() => scnShowTyping(() => scnShowDatasetCard()), 700);
        });
      }

      function scnShowDatasetCard() {
        const ds = SCN_DATASETS[scnDatasetKey];
        const c = document.getElementById("scnChatMsgs");
        const { el, av, body } = scnMkAiWrap();
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = `<p>I found the best matching dataset for your scenario:</p>`;
        body.appendChild(bubble);
        const card = document.createElement("div");
        card.className = "prop-card scn-ds-card";
        card.style.marginTop = "8px";
        card.innerHTML = `
    <div class="prop-strip"><i class="ti ti-database"></i><span>Recommended dataset</span></div>
    <div class="scn-ds-single">
      <div class="ds-ico teal"><i class="ti ti-database"></i></div>
      <div style="flex:1;min-width:0;">
        <div class="ds-name">${escH(ds.name)}</div>
        <div class="ds-sub">${escH(ds.sub)}</div>
      </div>
      <span class="ds-match">Best match</span>
    </div>
    <div class="scn-ds-actions">
      <button type="button" class="btn btn-primary btn-sm" onclick="scnConfirmDataset()"><i class="ti ti-check"></i> Use this dataset</button>
    </div>`;
        body.appendChild(card);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
      }

      function scnConfirmDataset() {
        if (scnPhase !== "dataset") return;
        scnAddMsg("user", "<p>Use this dataset</p>");
        const ds = SCN_DATASETS[scnDatasetKey];
        scnShowTyping(() => {
          scnAddMsg(
            "ai",
            `✅ **Dataset confirmed:** ${ds.name}\n\n**Frequency:** ${ds.frequency}\n${ds.freqDetail}\n\n**Insight:** ${ds.insight}\n\nHow many **${ds.horizonUnit}** do you want to forecast?`,
          );
          scnPhase = "await_horizon";
          scnAddHorizonChips();
        });
      }

      function scnAddHorizonChips() {
        const ds = SCN_DATASETS[scnDatasetKey];
        const opts = ds.horizonUnit === "months"
          ? [{ n: 6, l: "6 months" }, { n: 12, l: "12 months" }, { n: 18, l: "18 months" }, { n: 24, l: "24 months" }]
          : [{ n: 4, l: "4 quarters" }, { n: 6, l: "6 quarters" }, { n: 8, l: "8 quarters" }, { n: 12, l: "12 quarters" }];
        const c = document.getElementById("scnChatMsgs");
        const row = document.createElement("div");
        row.className = "sug-row";
        opts.forEach((o) => {
          const btn = document.createElement("div");
          btn.className = "sug";
          btn.innerHTML = `<i class="ti ti-calendar"></i>${o.l}`;
          btn.onclick = () => scnPickHorizon(o.n, o.l);
          row.appendChild(btn);
        });
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
      }

      function scnParseHorizon(v) {
        const l = v.toLowerCase();
        const m = l.match(/(\d+)/);
        if (!m) return null;
        const n = parseInt(m[1], 10);
        if (n < 1 || n > 36) return null;
        return n;
      }

      function scnPickHorizon(n, label) {
        scnAddMsg("user", `<p>${escH(label || n + " periods")}</p>`);
        scnSetHorizon(n);
      }

      function scnSetHorizon(n) {
        scnHorizons = n;
        scnPhase = "ready";
        const ds = SCN_DATASETS[scnDatasetKey];
        document.getElementById("scnBbCountTxt").textContent = ds.horizonLabel(n);
        document.getElementById("scnBuildBar")?.classList.add("show");
        scnShowTyping(() => {
          scnAddMsg(
            "ai",
            `Forecast horizon set to **${ds.horizonLabel(n)}**.\n\nClick **Run simulation** when ready — I'll build the scenario with drivers, projections, and impact KPIs on the canvas.`,
          );
        });
      }

      function scnRunSimulation() {
        if (scnPhase !== "ready" && !scnBuilt) {
          toast("Set a forecast horizon first", "ti-info-circle");
          return;
        }
        document.getElementById("scnBuildBar")?.classList.remove("show");
        scnAddMsg("user", "<p>Run simulation</p>");
        scnShowTyping(() => {
          scnAddMsg("ai", "Running scenario model — calibrating drivers and generating forecast…");
          scnShowGenProgress();
        });
      }

      function scnShowGenProgress() {
        const c = document.getElementById("scnChatMsgs");
        const { el, av, body } = scnMkAiWrap();
        const steps = ["Loading historical series…", "Calibrating driver sensitivities", "Projecting forecast horizon", "Computing impact KPIs", "Rendering simulation"];
        const prog = document.createElement("div");
        prog.className = "gen-prog";
        prog.innerHTML =
          `<div class="gp-lbl"><i class="ti ti-sparkles"></i>Generating simulation</div>` +
          steps.map((s, i) =>
            `<div class="gp-step"><div class="gp-dot ${i === 0 ? "active" : "wait"}" id="sg${i + 1}"><i class="ti ti-${i === 0 ? "refresh" : "circle"}"></i></div>${s}</div>`,
          ).join("");
        body.appendChild(prog);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        document.getElementById("scnCanvasStatus").textContent = "Building…";
        document.getElementById("scnCanvasStatus").className = "cs building";
        document.getElementById("scnCanvasEmpty").style.display = "none";
        [[0, 1, 600], [1, 2, 1100], [2, 3, 1600], [3, 4, 2100]].forEach(([cur, nxt, delay]) => {
          setTimeout(() => {
            const d = document.getElementById(`sg${cur + 1}`);
            if (d) { d.className = "gp-dot done"; d.innerHTML = '<i class="ti ti-check"></i>'; }
            if (nxt < 5) {
              const n = document.getElementById(`sg${nxt + 1}`);
              if (n) { n.className = "gp-dot active"; n.innerHTML = '<i class="ti ti-refresh"></i>'; }
            }
          }, delay);
        });
        setTimeout(() => {
          const d = document.getElementById("sg5");
          if (d) { d.className = "gp-dot done"; d.innerHTML = '<i class="ti ti-check"></i>'; }
          scnBuildSimulation();
        }, 2800);
      }

      function scnBuildSimulation() {
        scnBuilt = true;
        scnPhase = "built";
        const ds = SCN_DATASETS[scnDatasetKey];
        const title = document.getElementById("scnStudioTitle")?.textContent || scnInferTitle(scnTopic);
        scnState.drivers = {};
        ds.drivers.forEach((d) => { scnState.drivers[d.id] = d.value; });
        const scroll = document.getElementById("scnCanvasScroll");
        scroll.innerHTML = scnBuildCanvasShell(title, ds);
        scroll.style.display = "flex";
        document.getElementById("scnCanvasStatus").textContent = "Ready";
        document.getElementById("scnCanvasStatus").className = "cs ready";
        document.getElementById("scnCanvasBarRight").style.display = "flex";
        document.getElementById("scnHorizonLbl").textContent =
          scnHorizons + (ds.horizonUnit === "months" ? "M" : "Q");
        scnUpdateBuilderActions();
        requestAnimationFrame(() => {
          scnRenderCharts();
          scnUpdateOutputs();
        });
        document.getElementById("scnChatInput").placeholder = "Ask to adjust drivers or re-run with new assumptions…";
        setTimeout(() => {
          scnAddMsg("ai", `✅ **Simulation ready!** — **${ds.horizonLabel(scnHorizons)}** forecast on **${ds.frequency}** ${ds.name}.\n\nAdjust **drivers** on the canvas or click **Re-run** to refresh projections.`);
        }, 400);
      }

      function scnBuildCanvasShell(title, ds) {
        const driverRows = ds.drivers.map((d, i) => {
          const disp = d.prefix ? d.prefix + d.value : (d.plus && d.value > 0 ? "+" : "") + d.value + d.suffix;
          return `<div class="var-row">
      <div class="var-hd"><span class="var-lbl">${escH(d.label)}</span><span class="var-val" id="scnVv${i}">${escH(disp)}</span></div>
      <input type="range" min="${d.min}" max="${d.max}" step="${d.step}" value="${d.value}"
        oninput="scnUpdateDriver('${d.id}',${i},this.value)"/>
      <div class="var-range"><span>${d.min}${d.suffix || ""}</span><span>${d.max}${d.suffix || ""}</span></div>
    </div>`;
        }).join("");
        const kpiCards = ds.outputs.map((o, i) =>
          `<div class="scn-out-card" id="scnOut${i}"><div class="scn-out-lbl">${escH(o.label)}</div><div class="scn-out-val" id="scnOv${i}">${escH(o.base)}</div><div class="scn-out-sub" id="scnOc${i}">Baseline scenario</div></div>`,
        ).join("");
        return `
<div class="scn-studio-wrap w-in">
  <div class="scn-sec scn-sec-header" data-sec="Overview" onclick="scnSelSection(this,'Overview')">
    <div class="scn-sec-ring"><span class="scn-sec-tag">Overview</span></div>
    <h2 class="scn-sec-title" id="scnLiveTitle">${escH(title)}</h2>
    <p class="scn-sec-desc" id="scnLiveDesc">${escH(scnTopic || "What-if scenario simulation")}</p>
    <div class="scn-meta-row">
      <span><i class="ti ti-database"></i> ${escH(ds.name)}</span>
      <span><i class="ti ti-clock"></i> ${escH(ds.frequency)}</span>
      <span><i class="ti ti-chart-line"></i> ${escH(ds.horizonLabel(scnHorizons))}</span>
      <span class="scn-sec-src">${escH(ds.source)}</span>
    </div>
  </div>
  <div class="scn-main">
    <div class="scn-viz-col">
      <div class="scn-sec scn-sec-chart" data-sec="Forecast" onclick="scnSelSection(this,'Forecast')">
        <div class="scn-sec-ring"><span class="scn-sec-tag">Forecast</span></div>
        <div class="scn-charts">
          <div class="scn-chart-box scn-chart-box--single"><h4>Forecast — ${escH(ds.metric)}</h4><div class="scn-chart-area"><canvas id="scnChart1"></canvas></div></div>
        </div>
      </div>
      <div class="scn-sec scn-sec-output" data-sec="Output" onclick="scnSelSection(this,'Output')">
        <div class="scn-sec-ring"><span class="scn-sec-tag">Output</span></div>
        <div class="scn-out-grid">${kpiCards}</div>
      </div>
    </div>
    <div class="scn-sec scn-sec-drivers scn-drivers-panel" data-sec="Drivers" onclick="scnSelSection(this,'Drivers')">
      <div class="scn-sec-ring"><span class="scn-sec-tag">Drivers</span></div>
      <div class="scn-drivers-hd"><i class="ti ti-adjustments"></i> Assumption drivers</div>
      <div class="scn-drivers-inner" onclick="event.stopPropagation()">${driverRows}</div>
    </div>
  </div>
</div>`;
      }

      function scnUpdateDriver(id, idx, val) {
        const num = parseFloat(val);
        scnState.drivers[id] = num;
        const ds = SCN_DATASETS[scnDatasetKey];
        const cfg = ds.drivers.find((d) => d.id === id);
        const el = document.getElementById("scnVv" + idx);
        if (el && cfg) {
          el.textContent = cfg.prefix ? cfg.prefix + num : (cfg.plus && num > 0 ? "+" : "") + num + cfg.suffix;
        }
        scnUpdateOutputs();
        scnRenderCharts();
      }

      function scnUpdateOutputs() {
        const ds = SCN_DATASETS[scnDatasetKey];
        const inf = scnState.drivers.inflation ?? scnState.drivers.housing ?? 0;
        const tour = scnState.drivers.tourism ?? scnState.drivers.transport ?? 0;
        const vals = scnDatasetKey === "gdp"
          ? ["+" + (3.4 - inf * 0.25 + tour * 0.02).toFixed(1) + "%", "−" + (1.2 + inf * 0.8).toFixed(1) + "%", "+AED " + (5.8 + tour * 0.12).toFixed(1) + "B", (0.6 - inf * 0.15).toFixed(1) + "pp"]
          : scnDatasetKey === "cpi"
          ? [(105.2 + inf * 0.4 + tour * 0.3).toFixed(1), "+" + (4.1 + inf * 0.5).toFixed(1) + "%", "+" + (7.3 + tour * 0.2).toFixed(1) + "%", "−" + (2.8 + inf * 0.4).toFixed(1) + "%"]
          : ["2," + Math.round(957 + (scnState.drivers.visa || 0) * 8) + "K", (4.8 - (scnState.drivers.emiratisation || 0) * 0.08).toFixed(1) + "%", (18.2 + (scnState.drivers.emiratisation || 0) * 0.4).toFixed(1) + "%", "+" + (3.1 + (scnState.drivers.wage || 0) * 0.2).toFixed(1) + "%"];
        vals.forEach((v, i) => {
          const el = document.getElementById("scnOv" + i);
          if (el) el.textContent = v;
        });
      }

      function scnGetDriverImpact() {
        const d = scnState.drivers;
        if (scnDatasetKey === "gdp") {
          return -(d.inflation || 0) * 0.045 + (d.tourism || 0) * 0.004 + (d.construction || 0) * 0.002 + ((d.oil || 82) - 82) * 0.001;
        }
        if (scnDatasetKey === "cpi") {
          return (d.housing || 0) * 0.09 + (d.transport || 0) * 0.06 + (d.food || 0) * 0.04 + (d.fx || 0) * 0.12;
        }
        return (d.visa || 0) * 0.18 + (d.wage || 0) * 0.025 - (d.emiratisation || 0) * 0.04 - (d.automation || 0) * 0.03;
      }

      function scnGenPeriodLabels(histLen, forecastLen, unit) {
        const labels = [];
        const total = histLen + forecastLen;
        if (unit === "months") {
          let cm = 5 - (histLen - 1);
          let cy = 2026;
          while (cm < 0) { cm += 12; cy--; }
          for (let i = 0; i < total; i++) {
            const d = new Date(cy, cm, 1);
            labels.push(d.toLocaleString("en", { month: "short" }) + " '" + String(cy).slice(-2));
            cm++;
            if (cm > 11) { cm = 0; cy++; }
          }
        } else {
          let q = 1 - (histLen - 1);
          let y = 2026;
          while (q < 1) { q += 4; y--; }
          for (let i = 0; i < total; i++) {
            labels.push("Q" + q + " " + y);
            q++;
            if (q > 4) { q = 1; y++; }
          }
        }
        return labels;
      }

      function scnGenHistoricalValues(baseline, count, unit) {
        const values = [];
        const step = unit === "months" ? baseline * 0.004 : baseline * 0.012;
        let v = baseline - step * count * 1.2;
        for (let i = 0; i < count; i++) {
          v += (baseline - v) * 0.38 + Math.sin(i * 0.9) * step * 0.6;
          values.push(+v.toFixed(unit === "months" ? 2 : 1));
        }
        values[count - 1] = +baseline.toFixed(unit === "months" ? 2 : 1);
        return values;
      }

      function scnGenForecastValues(start, count, drift, impact) {
        const values = [];
        let v = start;
        for (let i = 0; i < count; i++) {
          v += drift + impact * (1 + i * 0.04);
          values.push(+v.toFixed(2));
        }
        return values;
      }

      function scnRenderCharts() {
        const ds = SCN_DATASETS[scnDatasetKey];
        if (!document.getElementById("scnChart1")) return;
        if (charts["scnChart2"]) {
          charts["scnChart2"].destroy();
          delete charts["scnChart2"];
        }

        const histLen = 4;
        const fLen = Math.max(1, scnHorizons || 8);
        const unit = ds.horizonUnit;
        const labels = scnGenPeriodLabels(histLen, fLen, unit);
        const histVals = scnGenHistoricalValues(ds.baseline, histLen, unit);
        const impact = scnGetDriverImpact();
        const drift = ds.forecastDrift || 0.05;
        const lastHist = histVals[histLen - 1];
        const baseForecast = scnGenForecastValues(lastHist, fLen, drift, 0);
        const scenForecast = scnGenForecastValues(lastHist, fLen, drift, impact);

        const histLine = [...histVals, ...Array(fLen).fill(null)];
        const baselineLine = [...Array(histLen - 1).fill(null), lastHist, ...baseForecast];
        const scenarioLine = [...Array(histLen - 1).fill(null), lastHist, ...scenForecast];

        const chartTitle = document.querySelector("#scnChart1")?.closest(".scn-chart-box")?.querySelector("h4");
        if (chartTitle) {
          chartTitle.innerHTML = `Forecast — ${escH(ds.metric)} <span class="scn-chart-sub">${fLen} ${unit} ahead</span>`;
        }

        mkChart("scnChart1", "line", {
          labels,
          datasets: [
            {
              label: "Historical",
              data: histLine,
              borderColor: "#64748B",
              backgroundColor: "rgba(100, 116, 139, 0.06)",
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: "#64748B",
              tension: 0.35,
              fill: false,
            },
            {
              label: "Baseline forecast",
              data: baselineLine,
              borderColor: "#A5B4FC",
              backgroundColor: "transparent",
              borderWidth: 2,
              borderDash: [6, 4],
              pointRadius: 2,
              pointBackgroundColor: "#A5B4FC",
              tension: 0.35,
              fill: false,
            },
            {
              label: "Scenario forecast",
              data: scenarioLine,
              borderColor: "#4F63FF",
              backgroundColor: "rgba(79, 99, 255, 0.08)",
              borderWidth: 2.5,
              pointRadius: 3,
              pointBackgroundColor: "#4F63FF",
              tension: 0.35,
              fill: true,
            },
          ],
        }, {
          legend: { display: true, position: "bottom", labels: { boxWidth: 10, font: { size: 10 }, padding: 12 } },
          extra: {
            interaction: { mode: "index", intersect: false },
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 10 }, color: "#9CA3AF", maxRotation: 45, autoSkip: fLen + histLen > 12 },
              },
              y: {
                grid: { color: "#F0F2F8" },
                ticks: { font: { size: 11 }, color: "#9CA3AF" },
              },
            },
          },
        });
      }

      function scnSelSection(el, name) {
        if (!scnBuilt) return;
        if (scnSelSectionEl === el) { scnClearSel(); return; }
        document.querySelectorAll(".scn-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".scn-sec-ring")?.classList.remove("show");
        });
        el.classList.add("sel");
        el.querySelector(".scn-sec-ring")?.classList.add("show");
        scnSelSectionEl = el;
        scnSelSectionName = name;
        document.getElementById("scnEditBannerTxt").textContent = "Editing: " + name;
        document.getElementById("scnEditBanner").classList.add("show");
        document.getElementById("scnChatInput").placeholder = "Ask me to change the " + name.toLowerCase() + "…";
      }

      function scnClearSel() {
        scnSelSectionEl = null;
        scnSelSectionName = "";
        document.querySelectorAll(".scn-sec").forEach((s) => {
          s.classList.remove("sel");
          s.querySelector(".scn-sec-ring")?.classList.remove("show");
        });
        document.getElementById("scnEditBanner")?.classList.remove("show");
        document.getElementById("scnChatInput").placeholder = scnBuilt
          ? "Ask to adjust drivers or re-run with new assumptions…"
          : "Describe the scenario you want to simulate…";
      }

      function scnSaveDraft() {
        toast("Simulation saved as draft", "ti-device-floppy");
        scnAddMsg("ai", "💾 **Draft saved** to My Simulations.");
      }

      function scnAddMsg(role, text) {
        const c = document.getElementById("scnChatMsgs");
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = mdH(text);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("msg-av ai", 28));
          wrap.appendChild(body);
        } else wrap.appendChild(body);
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }

      function scnMkAiWrap() {
        const el = document.createElement("div");
        el.className = "msg ai";
        const av = baiAvatarEl("msg-av ai", 28);
        const body = document.createElement("div");
        body.className = "msg-body";
        return { el, av, body };
      }

      function scnShowTyping(cb) {
        scnIsTyping = true;
        const c = document.getElementById("scnChatMsgs");
        const el = document.createElement("div");
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 28)}<div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(() => { el.remove(); scnIsTyping = false; cb(); }, 700 + Math.random() * 400);
      }

      window.scnGoTo = scnGoTo;
      window.scnRunSimulation = scnRunSimulation;
      window.scnConfirmDataset = scnConfirmDataset;
      window.scnUpdateDriver = scnUpdateDriver;
      window.scnSelSection = scnSelSection;
      window.scnClearSel = scnClearSel;


      /* ══════════════════════════════════════
   REPORT BUILDER STUDIO
══════════════════════════════════════ */

      let rptBuilt = false,
        rptTopic = "",
        rptPhase = "idle",
        rptIsTyping = false;
      const rptMeta = { type: "", audience: "", structure: "" };
      const rptSelected = { datasets: {}, kpis: {}, dashboards: {}, dxp: {}, files: [] };

      const RPT_SOURCE_CATALOG = {
        datasets: [
          { name: "World Bank — WDI Macro Indicators", sub: "SCAD-linked · 120 economies · annual", c: "teal", icon: "ti-database" },
          { name: "IMF World Economic Outlook", sub: "GDP, inflation, fiscal balances · quarterly", c: "blue", icon: "ti-globe" },
          { name: "SCAD National Accounts", sub: "Abu Dhabi + UAE aggregates · 340K rows", c: "teal", icon: "ti-building-bank" },
        ],
        kpis: [
          { name: "Abu Dhabi GDP Growth Rate", sub: "KPI · SCAD · Published", c: "blue", icon: "ti-chart-bar" },
          { name: "Headline CPI — Abu Dhabi", sub: "KPI · Monthly · SCAD", c: "amber", icon: "ti-home" },
        ],
        dashboards: [
          { name: "National Accounts Overview", sub: "Dashboard · 12 charts · SCAD", c: "purple", icon: "ti-layout-dashboard" },
          { name: "Inflation Monitor 2026", sub: "Dashboard · CPI categories", c: "amber", icon: "ti-chart-line" },
        ],
        dxp: [
          { name: "DXP — Executive Macro Feed", sub: "Live stream · Gov Affairs portal", c: "purple", icon: "ti-broadcast" },
          { name: "DXP — Regional Comparisons", sub: "GCC peer benchmarks · daily sync", c: "blue", icon: "ti-world" },
        ],
      };

      const RPT_GDP_YEARS = [2000, 2004, 2008, 2012, 2016, 2020, 2024];
      const RPT_GDP_SERIES = {
        USA: [10.2, 12.2, 14.7, 16.2, 18.6, 21.4, 27.4],
        China: [1.2, 1.9, 4.6, 8.5, 11.2, 14.7, 18.0],
        EU: [8.8, 12.5, 16.8, 16.4, 16.5, 15.0, 18.4],
        India: [0.5, 0.7, 1.2, 1.8, 2.3, 2.7, 3.9],
        Japan: [4.9, 4.9, 5.1, 6.2, 5.0, 5.0, 4.1],
      };

      const RPT_COUNTRIES = [
        ["United States", 27.4, 2.8, 2.9, 4.1, 123.0, -3.2],
        ["China", 18.0, 4.6, 0.2, 5.1, 83.0, 1.4],
        ["India", 3.9, 6.5, 4.9, 7.8, 83.0, -1.2],
        ["Germany", 4.5, 0.2, 2.5, 3.3, 63.0, 5.8],
        ["Japan", 4.1, 0.1, 2.8, 2.6, 251.0, 3.5],
        ["United Kingdom", 3.3, 1.1, 3.3, 4.2, 101.0, -2.5],
        ["France", 3.1, 1.1, 2.3, 7.4, 112.0, -0.8],
        ["Brazil", 2.3, 3.4, 4.5, 7.2, 88.0, -2.8],
        ["Italy", 2.3, 0.7, 1.1, 7.8, 137.0, 0.5],
        ["Canada", 2.2, 1.5, 2.4, 6.2, 107.0, -0.6],
        ["Russia", 2.0, 4.1, 7.4, 3.2, 18.0, 2.8],
        ["Mexico", 1.8, 3.2, 4.7, 2.9, 52.0, -0.3],
      ];

      function rptGoTo(id) {
        document.querySelectorAll("#v-report .rpt-view").forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        if (id === "report-library") {
          _setStudioTopbar(
            '<a onclick="showGallery()">Bayaan Studio</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">Report Builder</span>',
            '<button class="tb-btn tb-btn-accent" onclick="rptGoTo(\'report-builder\')"><i class="ti ti-sparkles"></i> New Report</button>',
          );
        } else if (id === "report-builder") {
          const title = document.getElementById("rptStudioTitle")?.textContent || "New Report";
          _setStudioTopbar(
            '<a onclick="rptGoTo(\'report-library\')">Report Builder</a><i class="ti ti-chevron-right sep" style="font-size:11px;"></i><span class="current">' + title + "</span>",
          );
          rptUpdateBuilderActions();
          rptInitStudio();
        }
      }

      function rptUpdateBuilderActions() {
        let html = '<button class="tb-btn" onclick="rptGoTo(\'report-library\')"><i class="ti ti-x"></i> Close</button>';
        if (rptBuilt) {
          html =
            '<button class="tb-btn" onclick="rptExport(\'pptx\')"><i class="ti ti-presentation"></i> PPTX</button>' +
            '<button class="tb-btn" onclick="rptSaveArtifact()"><i class="ti ti-stack-2"></i> Artifacts</button>' +
            '<button class="tb-btn tb-btn-accent" onclick="rptPublishGov()"><i class="ti ti-building-bank"></i> Gov Affairs</button>' +
            '<button class="tb-btn" onclick="rptGoTo(\'report-library\')"><i class="ti ti-x"></i> Close</button>';
        }
        _setStudioTopbar(undefined, html);
      }

      function rptLibTab(el, tab) {
        document.querySelectorAll("#v-report .lib-tab").forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("rpt-tab-my").style.display = tab === "my" ? "" : "none";
        document.getElementById("rpt-tab-gov").style.display = tab === "gov" ? "" : "none";
      }

      function rptToggleChat() {
        const chat = document.getElementById("rptStudioChat");
        if (!chat) return;
        const collapsing = !chat.classList.contains("collapsed");
        chat.classList.toggle("collapsed", collapsing);
        chat.style.width = collapsing ? "48px" : "400px";
        chat.style.minWidth = collapsing ? "48px" : "400px";
      }

      function rptInitStudio() {
        rptBuilt = false;
        rptPhase = "idle";
        rptTopic = "";
        rptMeta.type = rptMeta.audience = rptMeta.structure = "";
        Object.keys(rptSelected).forEach((k) => { if (k === "files") rptSelected[k] = []; else rptSelected[k] = {}; });
        document.getElementById("rptChatMsgs").innerHTML = "";
        document.getElementById("rptCanvasScroll").innerHTML = "";
        document.getElementById("rptCanvasScroll").style.display = "none";
        document.getElementById("rptCanvasEmpty").style.display = "flex";
        document.getElementById("rptCanvasStatus").textContent = "Awaiting prompt";
        document.getElementById("rptCanvasStatus").className = "cs empty";
        document.getElementById("rptCanvasBarRight").style.display = "none";
        document.getElementById("rptBuildBar")?.classList.remove("show");
        const st = document.getElementById("rptStudioTitle");
        if (st) st.textContent = "New Report";
        rptShowTyping(() => {
          rptAddMsg(
            "ai",
            `👋 Welcome to **Report Builder!**\n\nDescribe the report you need — for example:\n\n**"Global macroeconomic outlook with GDP and inflation analysis for 2026"**\n\nI'll suggest **datasets, KPIs, dashboards, and DXP feeds**, then ask about **report type**, **audience**, and **structure** before generating your document.`,
          );
        });
      }

      function rptInferTitle(p) {
        const l = p.toLowerCase();
        if (l.includes("macro") || l.includes("global")) return "Global Macroeconomic Outlook 2026";
        if (l.includes("cpi") || l.includes("inflation")) return "Inflation Analysis & CPI Outlook";
        if (l.includes("country") || l.includes("profile")) return "Country Macroeconomic Profiles";
        const words = p.split(/\s+/).slice(0, 6).join(" ");
        return words.length > 40 ? words.slice(0, 40) + "…" : words || "New Report";
      }

      function rptChatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); rptChatSend(); }
      }

      function rptChatSend() {
        const inp = document.getElementById("rptChatInput");
        const v = inp.value.trim();
        if (!v || rptIsTyping) return;
        inp.value = "";
        inp.style.height = "auto";
        rptAddMsg("user", `<p>${escH(v)}</p>`);
        rptHandleMsg(v);
      }

      function rptHandleMsg(v) {
        if (rptBuilt) {
          rptShowTyping(() => rptAddMsg("ai", "Your report is ready. Use **PDF**, **PPTX**, or **Word** to download, or **Publish under Gov Affairs**."));
          return;
        }
        if (rptPhase !== "idle") return;
        rptTopic = v;
        const t = rptInferTitle(v);
        document.getElementById("rptStudioTitle").textContent = t;
        document.getElementById("rptCanvasTitle").textContent = t;
        rptPhase = "sources";
        rptShowTyping(() => {
          rptAddMsg("ai", "Scanning Bayaan for relevant **datasets, KPIs, dashboards, and DXP feeds**…");
          setTimeout(() => rptShowTyping(() => rptShowSourceCard()), 700);
        });
      }

      function rptSrcHtml(group, items) {
        return items.map((d, i) => {
          rptSelected[group][i] = true;
          return `<div class="ds-item">
      <div class="ds-ico ${d.c}"><i class="ti ${d.icon}"></i></div>
      <div style="flex:1;min-width:0;"><div class="ds-name">${escH(d.name)}</div><div class="ds-sub">${escH(d.sub)}</div></div>
      <div class="ds-chk on" id="rptChk-${group}-${i}" onclick="rptTogSrc('${group}',${i})"><i class="ti ti-check"></i></div>
    </div>`;
        }).join("");
      }

      function rptShowSourceCard() {
        const c = document.getElementById("rptChatMsgs");
        const { el, av, body } = rptMkAiWrap();
        body.innerHTML = `<div class="bubble"><p>Select sources for your report — toggle any item off, upload files, then click <strong>Confirm sources</strong>.</p></div>`;
        const card = document.createElement("div");
        card.className = "prop-card";
        card.style.marginTop = "8px";
        card.innerHTML = `
    <div class="prop-strip"><i class="ti ti-layers-linked"></i><span>Suggested sources</span></div>
    <div class="rpt-src-group"><div class="rpt-src-lbl">Bayaan Datasets</div>${rptSrcHtml("datasets", RPT_SOURCE_CATALOG.datasets)}</div>
    <div class="rpt-src-group"><div class="rpt-src-lbl">KPIs</div>${rptSrcHtml("kpis", RPT_SOURCE_CATALOG.kpis)}</div>
    <div class="rpt-src-group"><div class="rpt-src-lbl">Dashboards</div>${rptSrcHtml("dashboards", RPT_SOURCE_CATALOG.dashboards)}</div>
    <div class="rpt-src-group"><div class="rpt-src-lbl">DXP Feeds</div>${rptSrcHtml("dxp", RPT_SOURCE_CATALOG.dxp)}</div>
    <div class="rpt-src-actions">
      <button type="button" class="btn btn-ghost btn-sm" onclick="rptUploadFile()"><i class="ti ti-upload"></i> Upload file</button>
      <button type="button" class="btn btn-primary btn-sm" onclick="rptConfirmSources()"><i class="ti ti-check"></i> Confirm sources</button>
    </div>`;
        body.appendChild(card);
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
      }

      function rptTogSrc(group, i) {
        const el = document.getElementById(`rptChk-${group}-${i}`);
        if (!el) return;
        el.classList.toggle("on");
        el.innerHTML = el.classList.contains("on") ? '<i class="ti ti-check"></i>' : "";
        rptSelected[group][i] = el.classList.contains("on");
      }

      function rptUploadFile() {
        rptSelected.files.push("Macro_Brief_Supplement_2026.pdf");
        toast("Uploaded: Macro_Brief_Supplement_2026.pdf", "ti-upload");
      }

      function rptCountSources() {
        let n = rptSelected.files.length;
        ["datasets", "kpis", "dashboards", "dxp"].forEach((g) => {
          Object.keys(rptSelected[g]).forEach((k) => { if (rptSelected[g][k]) n++; });
        });
        return n;
      }

      function rptConfirmSources() {
        if (rptCountSources() === 0) { toast("Select at least one source", "ti-alert-circle"); return; }
        rptAddMsg("user", "<p>Confirm sources</p>");
        rptPhase = "brief";
        rptShowTyping(() => {
          rptAddMsg("ai", `**${rptCountSources()} sources** connected.\n\nWhat **type of report** are you creating?`);
          rptAddChips([
            { i: "ti-report-analytics", l: "Macroeconomic Outlook" },
            { i: "ti-file-description", l: "Policy Brief" },
            { i: "ti-chart-bar", l: "Statistical Bulletin" },
            { i: "ti-briefcase", l: "Executive Summary" },
          ], (l) => rptPickBrief("type", l));
        });
      }

      function rptPickBrief(step, value) {
        rptAddMsg("user", `<p>${escH(value)}</p>`);
        if (step === "type") {
          rptMeta.type = value;
          rptShowTyping(() => {
            rptAddMsg("ai", "Who is the **primary audience** for this report?");
            rptAddChips([
              { i: "ti-crown", l: "Executive Leadership" },
              { i: "ti-building-bank", l: "Government Affairs" },
              { i: "ti-microscope", l: "Technical Analysts" },
              { i: "ti-users", l: "Public Release" },
            ], (l) => rptPickBrief("audience", l));
          });
        } else if (step === "audience") {
          rptMeta.audience = value;
          rptShowTyping(() => {
            rptAddMsg("ai", "What **structure** should the report follow?");
            rptAddChips([
              { i: "ti-book", l: "Chapter-based (recommended)" },
              { i: "ti-file-text", l: "Single narrative" },
              { i: "ti-table", l: "Data annex focused" },
            ], (l) => rptPickBrief("structure", l));
          });
        } else if (step === "structure") {
          rptMeta.structure = value;
          rptPhase = "ready";
          document.getElementById("rptBbTxt").textContent = `${rptMeta.type} · ${rptMeta.audience}`;
          document.getElementById("rptBuildBar")?.classList.add("show");
          rptShowTyping(() => {
            rptAddMsg(
              "ai",
              `Brief complete:\n\n• **Type:** ${rptMeta.type}\n• **Audience:** ${rptMeta.audience}\n• **Structure:** ${rptMeta.structure}\n\nClick **Generate report** to build your document on the canvas.`,
            );
          });
        }
      }

      function rptGenerateReport() {
        if (rptPhase !== "ready" && !rptBuilt) { toast("Complete the brief first", "ti-info-circle"); return; }
        document.getElementById("rptBuildBar")?.classList.remove("show");
        rptAddMsg("user", "<p>Generate report</p>");
        rptShowTyping(() => {
          rptAddMsg("ai", "Generating report — writing chapters, tables, and charts…");
          rptShowGenProgress();
        });
      }

      function rptShowGenProgress() {
        const c = document.getElementById("rptChatMsgs");
        const { el, av, body } = rptMkAiWrap();
        const steps = ["Indexing sources…", "Drafting chapter structure", "Building tables & charts", "Applying audience tone", "Finalising document"];
        body.innerHTML = `<div class="gen-prog"><div class="gp-lbl"><i class="ti ti-sparkles"></i>Generating report</div>${steps.map((s, i) =>
          `<div class="gp-step"><div class="gp-dot ${i === 0 ? "active" : "wait"}" id="rg${i + 1}"><i class="ti ti-${i === 0 ? "refresh" : "circle"}"></i></div>${s}</div>`).join("")}</div>`;
        el.appendChild(av);
        el.appendChild(body);
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        document.getElementById("rptCanvasStatus").textContent = "Building…";
        document.getElementById("rptCanvasStatus").className = "cs building";
        document.getElementById("rptCanvasEmpty").style.display = "none";
        [[0, 1, 600], [1, 2, 1100], [2, 3, 1600], [3, 4, 2100]].forEach(([cur, nxt, delay]) => {
          setTimeout(() => {
            const d = document.getElementById(`rg${cur + 1}`);
            if (d) { d.className = "gp-dot done"; d.innerHTML = '<i class="ti ti-check"></i>'; }
            if (nxt < 5) {
              const n = document.getElementById(`rg${nxt + 1}`);
              if (n) { n.className = "gp-dot active"; n.innerHTML = '<i class="ti ti-refresh"></i>'; }
            }
          }, delay);
        });
        setTimeout(() => {
          const d = document.getElementById("rg5");
          if (d) { d.className = "gp-dot done"; d.innerHTML = '<i class="ti ti-check"></i>'; }
          rptBuildReport();
        }, 2800);
      }

      function rptBuildGdpTableRows() {
        let rows = "";
        for (let y = 2007; y <= 2024; y++) {
          const t = y - 2000;
          const us = (12.6 + t * 0.85 + Math.sin(t) * 0.3).toFixed(2);
          const cn = (3.5 + t * 0.82).toFixed(2);
          const eu = (14.2 + t * 0.25).toFixed(2);
          const ug = (2.5 + Math.sin(t * 0.5) * 2).toFixed(2);
          const cg = (10 + Math.sin(t * 0.4) * 4).toFixed(2);
          const eg = (1.5 + Math.cos(t * 0.3) * 1.5).toFixed(2);
          rows += `<tr><td>${y}</td><td>${us}</td><td>${cn}</td><td>${eu}</td><td>${ug > 0 ? "+" : ""}${ug}</td><td>${cg > 0 ? "+" : ""}${cg}</td><td>${eg > 0 ? "+" : ""}${eg}</td></tr>`;
        }
        return rows;
      }

      function rptBuildCountryTableRows() {
        return RPT_COUNTRIES.map((c) =>
          `<tr><td style="text-align:left">${escH(c[0])}</td><td>${c[1]}</td><td>${c[2]}</td><td>${c[3]}</td><td>${c[4]}</td><td>${c[5]}</td><td>${c[6]}</td></tr>`,
        ).join("");
      }

      function rptCountryNarratives() {
        const picks = RPT_COUNTRIES.slice(0, 6);
        const insight = "Emerging market economies have shown resilience amid global headwinds, though currency depreciation risks persist for energy importers.";
        return picks.map((c) =>
          `<div class="rpt-country"><div class="rpt-country-name">${escH(c[0])}</div>
      <p class="rpt-p">In 2024, ${escH(c[0])} recorded GDP of USD ${c[1]} trillion, growth of ${c[2]}%, inflation of ${c[3]}%, unemployment of ${c[4]}%, public debt at ${c[5]}% of GDP, and a current account balance of ${c[6]}% of GDP.</p>
      <p class="rpt-p">${c[0] === "Japan" ? "Japan's aging population continues to weigh on long-term growth potential, though labour market reforms offer upside." : c[0] === "India" ? "India remains the fastest-growing major economy, supported by domestic consumption and digital infrastructure investment." : insight}</p></div>`,
        ).join("");
      }

      function rptBuildReportHTML(title) {
        return `
<div class="rpt-doc w-in">
  <div class="rpt-page">
    <div class="rpt-meta-bar">
      <span><i class="ti ti-file-text"></i> ${escH(rptMeta.type)}</span>
      <span><i class="ti ti-users"></i> ${escH(rptMeta.audience)}</span>
      <span><i class="ti ti-layout-list"></i> ${escH(rptMeta.structure)}</span>
      <span><i class="ti ti-database"></i> ${rptCountSources()} sources</span>
    </div>
    <h2 class="rpt-ch">Chapter 1: Global Macroeconomic Overview</h2>
    <div class="rpt-ch-rule"></div>
    <h3 class="rpt-sec">1.1 GDP Trends and Growth Dynamics</h3>
    <p class="rpt-p">Global GDP growth remained resilient through 2024 despite persistent inflationary pressures and geopolitical uncertainty. Advanced economies showed moderate expansion while emerging markets, particularly in Asia, continued to outperform. The energy transition and associated investment flows have become an increasingly important driver of regional growth differentials.</p>
    <p class="rpt-p">Supply-side volatility in energy markets and shifting trade patterns have contributed to divergent growth trajectories across major economies. Central bank policy normalization has proceeded at varying speeds, with implications for capital flows and exchange rate stability.</p>
    <div class="rpt-chart-wrap"><div class="rpt-chart-area"><canvas id="rptChartGdp"></canvas></div></div>
    <div class="rpt-cap">Figure 1.1 — GDP Comparison across major economies (Trillion USD), 2000–2024</div>
    <h3 class="rpt-sec">1.2 Detailed GDP Data</h3>
    <table class="rpt-tbl"><thead><tr><th>Year</th><th>US GDP</th><th>CN GDP</th><th>EU GDP</th><th>US Growth</th><th>CN Growth</th><th>EU Growth</th></tr></thead><tbody>${rptBuildGdpTableRows()}</tbody></table>
    <div class="rpt-cap">Table 1.1 — Annual GDP (Trillion USD) and Growth Rates by Major Economy</div>
  </div>
  <div class="rpt-page">
    <h3 class="rpt-sec">1.3 Inflation Dynamics</h3>
    <p class="rpt-p">Global inflation has moderated from post-pandemic peaks but remains above pre-2020 levels in several major economies. Energy and food price pass-through continues to influence headline rates, while core inflation shows signs of stickiness in services sectors.</p>
    <p class="rpt-p">Central banks have maintained a cautious approach, balancing growth support against price stability mandates. Regional disparities in inflation outcomes reflect differing exposure to commodity imports and currency movements.</p>
    <div class="rpt-chart-wrap"><div class="rpt-chart-area"><canvas id="rptChartInfl"></canvas></div></div>
    <div class="rpt-cap">Figure 1.2 — Inflation Rates (%) 2000–2024</div>
  </div>
  <div class="rpt-page">
    <h2 class="rpt-ch">Chapter 2: Country Macroeconomic Profiles</h2>
    <div class="rpt-ch-rule"></div>
    <h3 class="rpt-sec">2.1 Key Indicators Snapshot</h3>
    <p class="rpt-p">The following table presents a cross-country comparison of key macroeconomic indicators for 2024, enabling rapid assessment of relative economic performance across selected economies.</p>
    <table class="rpt-tbl"><thead><tr><th>Country</th><th>GDP 2024 (T USD)</th><th>Growth (%)</th><th>Inflation (%)</th><th>Unemployment (%)</th><th>Debt/GDP (%)</th><th>Curr Acct (% GDP)</th></tr></thead><tbody>${rptBuildCountryTableRows()}</tbody></table>
    <div class="rpt-cap">Table 2.1 — Macroeconomic Indicators for Selected Economies, 2024</div>
  </div>
  <div class="rpt-page">
    <h3 class="rpt-sec">2.2 Country Narratives</h3>
    ${rptCountryNarratives()}
  </div>
</div>`;
      }

      function rptBuildReport() {
        rptBuilt = true;
        rptPhase = "built";
        const scroll = document.getElementById("rptCanvasScroll");
        scroll.innerHTML = rptBuildReportHTML(document.getElementById("rptStudioTitle")?.textContent);
        scroll.style.display = "block";
        document.getElementById("rptCanvasStatus").textContent = "Ready";
        document.getElementById("rptCanvasStatus").className = "cs ready";
        document.getElementById("rptCanvasBarRight").style.display = "flex";
        rptUpdateBuilderActions();
        document.getElementById("rptChatInput").placeholder = "Ask to revise a chapter or regenerate a section…";
        requestAnimationFrame(() => rptRenderReportCharts());
        setTimeout(() => {
          rptAddMsg("ai", `✅ **Report ready!**\n\nFormatted for **${rptMeta.audience}** with ${rptCountSources()} sources. Download as **PDF**, **PPTX**, or **Word**, save to **Artifacts**, or **Publish under Gov Affairs**.`);
        }, 400);
      }

      function rptRenderReportCharts() {
        mkChart("rptChartGdp", "line", {
          labels: RPT_GDP_YEARS.map(String),
          datasets: Object.entries(RPT_GDP_SERIES).map(([name, data], i) => ({
            label: name,
            data,
            borderColor: ["#1e4d8c", "#2b6cb0", "#0891b2", "#059669", "#64748b"][i],
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            tension: 0.3,
          })),
        }, { legend: { display: true, position: "top", labels: { boxWidth: 12, font: { size: 10 } } } });

        const inflYears = [];
        const inflUsa = [];
        const inflEu = [];
        const inflInd = [];
        for (let y = 2000; y <= 2024; y += 2) {
          inflYears.push(String(y));
          inflUsa.push(+(2 + Math.sin((y - 2000) * 0.25) * 1.5 + (y > 2020 ? 3 : 0)).toFixed(1));
          inflEu.push(+(2.2 + Math.cos((y - 2000) * 0.2) * 1.2).toFixed(1));
          inflInd.push(+(4 + Math.sin((y - 2000) * 0.18) * 2.5).toFixed(1));
        }
        mkChart("rptChartInfl", "bar", {
          labels: inflYears,
          datasets: [
            { label: "USA", data: inflUsa, backgroundColor: "#1e4d8c", borderRadius: 2 },
            { label: "EU", data: inflEu, backgroundColor: "#2b6cb0", borderRadius: 2 },
            { label: "India", data: inflInd, backgroundColor: "#0891b2", borderRadius: 2 },
          ],
        }, { legend: { display: true, position: "top", labels: { boxWidth: 12, font: { size: 10 } } } });
      }

      function rptExport(fmt) {
        const names = { pdf: "PDF", pptx: "PowerPoint (PPTX)", docx: "Word (DOCX)" };
        toast(`Downloading ${names[fmt] || fmt}…`, "ti-download");
        rptAddMsg("ai", `📥 **${names[fmt]}** export started — your report will download shortly.`);
      }

      function rptSaveArtifact() {
        toast("Saved to Artifacts", "ti-stack-2");
        rptAddMsg("ai", "📦 **Saved to Artifacts** — find it under Reports in the Artifacts library.");
      }

      function rptPublishGov() {
        toast("Published under Government Affairs", "ti-building-bank");
        rptAddMsg("ai", "🏛️ **Published under Gov Affairs** — the report is now available in the Gov Affairs portal and Report Builder library.");
      }

      function rptAddChips(items, onPick) {
        const c = document.getElementById("rptChatMsgs");
        const row = document.createElement("div");
        row.className = "sug-row";
        items.forEach((s) => {
          const btn = document.createElement("div");
          btn.className = "sug";
          btn.innerHTML = `<i class="ti ${s.i}"></i>${s.l}`;
          btn.onclick = () => onPick(s.l);
          row.appendChild(btn);
        });
        c.appendChild(row);
        c.scrollTop = c.scrollHeight;
      }

      function rptAddMsg(role, text) {
        const c = document.getElementById("rptChatMsgs");
        const wrap = document.createElement("div");
        wrap.className = `msg ${role}`;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.innerHTML = mdH(text);
        body.appendChild(bubble);
        if (role === "ai") { wrap.appendChild(baiAvatarEl("msg-av ai", 28)); wrap.appendChild(body); }
        else wrap.appendChild(body);
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }

      function rptMkAiWrap() {
        const el = document.createElement("div");
        el.className = "msg ai";
        const av = baiAvatarEl("msg-av ai", 28);
        const body = document.createElement("div");
        body.className = "msg-body";
        return { el, av, body };
      }

      function rptShowTyping(cb) {
        rptIsTyping = true;
        const c = document.getElementById("rptChatMsgs");
        const el = document.createElement("div");
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 28)}<div class="typing-wrap"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(() => { el.remove(); rptIsTyping = false; cb(); }, 700 + Math.random() * 400);
      }

      window.rptGoTo = rptGoTo;
      window.rptTogSrc = rptTogSrc;
      window.rptConfirmSources = rptConfirmSources;
      window.rptUploadFile = rptUploadFile;
      window.rptGenerateReport = rptGenerateReport;
      window.rptExport = rptExport;
      window.rptSaveArtifact = rptSaveArtifact;
      window.rptPublishGov = rptPublishGov;


      /* ── NAVIGATION ── */
      function etlGoTo(id) {
        document
          .querySelectorAll("#v-etl .etl-view")
          .forEach((v) => v.classList.remove("active"));
        const target = document.getElementById(id);
        if (target) target.classList.add("active");
        if (id === "etl-builder" && !etlBuilderStarted) etlStartBuilder();
      }
      function etlLibTab(el, tab) {
        document
          .querySelectorAll("#v-etl .lib-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        document.getElementById("etl-tab-my").style.display =
          tab === "my" ? "" : "none";
        document.getElementById("etl-tab-tmpl").style.display =
          tab === "tmpl" ? "" : "none";
      }

      /* ── MODAL ── */
      let etlModalChoice = "priv";
      function etlOpenModal() {
        document.getElementById("etlSaveModal").classList.add("show");
      }
      function etlCloseModal() {
        document.getElementById("etlSaveModal").classList.remove("show");
      }
      function etlSelectModal(c) {
        etlModalChoice = c;
        document
          .getElementById("etlMoPriv")
          .classList.toggle("sel", c === "priv");
        document
          .getElementById("etlMoShared")
          .classList.toggle("sel", c === "shared");
      }
      function etlConfirmSave() {
        etlCloseModal();
        toast(
          etlModalChoice === "shared"
            ? "Pipeline shared with team"
            : "Pipeline saved to My Pipelines",
          "ti-check",
        );
        setTimeout(() => etlGoTo("etl-library"), 500);
      }

      /* ── WS TABS ── */
      function etlSwitchTab(tab) {
        const chatPane = document.getElementById("etlWsChatPane");
        const pipePane = document.getElementById("etlWsPipelinePane");
        const inputArea = document.getElementById("etlWsInputArea");
        document
          .getElementById("etl-tab-chat")
          .classList.toggle("active", tab === "chat");
        document
          .getElementById("etl-tab-pipeline")
          .classList.toggle("active", tab === "pipeline");
        if (tab === "chat") {
          chatPane.style.display = "";
          pipePane.classList.remove("show");
          inputArea.style.display = "";
        } else {
          chatPane.style.display = "none";
          pipePane.classList.add("show");
          inputArea.style.display = "none";
          etlCloseNdPanel();
        }
      }

      /* ── NODE DETAIL PANEL ── */
      const ETL_ND_DATA = {
        source: {
          title: "Source — PostgreSQL",
          body: `<div class="nd-field"><div class="nd-field-label">Type</div><div class="nd-field-val">PostgreSQL 15.2</div></div><div class="nd-field"><div class="nd-field-label">Host</div><div class="nd-field-val nd-field-sub">10.0.0.42:5432</div></div><div class="nd-field"><div class="nd-field-label">Database</div><div class="nd-field-val">labour_db</div></div><div class="nd-field"><div class="nd-field-label">Table</div><div class="nd-field-val nd-field-sub">public.registrations</div></div><div class="nd-field"><div class="nd-field-label">Connection</div><div class="nd-field-val" style="color:#0F6E56;">✓ Verified · 05:58 GST</div></div><div class="nd-field"><div class="nd-field-label">Rows (last run)</div><div class="nd-field-val">1,247,302</div></div>`,
        },
        cleanse: {
          title: "Transform — Null Handler",
          body: `<div class="nd-field"><div class="nd-field-label">Rule 1</div><div class="nd-field-val">Empty string → NULL</div><div class="nd-field-sub">nationality_code, sector_code</div></div><div class="nd-field"><div class="nd-field-label">Rule 2</div><div class="nd-field-val">NULL fill strategy</div><div class="nd-field-sub">Forward-fill from prior row</div></div><div class="nd-field"><div class="nd-field-label">On fail</div><div class="nd-field-val">Skip row · log warning</div></div><div class="nd-field"><div class="nd-field-label">Rows affected (last run)</div><div class="nd-field-val">0 skipped</div></div>`,
        },
        join: {
          title: "Transform — Sector Lookup",
          body: `<div class="nd-field"><div class="nd-field-label">Join type</div><div class="nd-field-val">LEFT JOIN</div></div><div class="nd-field"><div class="nd-field-label">Lookup table</div><div class="nd-field-sub">reference.sector_codes</div></div><div class="nd-field"><div class="nd-field-label">Join key</div><div class="nd-field-sub">sector_code = code</div></div><div class="nd-field"><div class="nd-field-label">Added columns</div><div class="nd-field-val">sector_name, sector_group</div></div>`,
        },
        filter: {
          title: "Transform — Date Filter",
          body: `<div class="nd-field"><div class="nd-field-label">Column</div><div class="nd-field-sub">registration_date</div></div><div class="nd-field"><div class="nd-field-label">Range</div><div class="nd-field-val">2024-01-01 → present</div></div><div class="nd-field"><div class="nd-field-label">Rows filtered out</div><div class="nd-field-val">0 (last run)</div></div>`,
        },
        dest: {
          title: "Destination — ClickHouse",
          body: `<div class="nd-field"><div class="nd-field-label">Type</div><div class="nd-field-val">ClickHouse 23.8</div></div><div class="nd-field"><div class="nd-field-label">Host</div><div class="nd-field-sub">dwh-ch.bayaan.internal:8123</div></div><div class="nd-field"><div class="nd-field-label">Table</div><div class="nd-field-sub">dwh.labour_clean</div></div><div class="nd-field"><div class="nd-field-label">Write mode</div><div class="nd-field-val">Append (insert new)</div></div><div class="nd-field"><div class="nd-field-label">Last write</div><div class="nd-field-val">06:04 GST today</div></div>`,
        },
      };
      function etlOpenNdPanel(key) {
        const d = ETL_ND_DATA[key];
        if (!d) return;
        document
          .querySelectorAll("#v-etl .pd-node")
          .forEach((n) => n.classList.remove("selected"));
        document.getElementById("etlpdn-" + key)?.classList.add("selected");
        document.getElementById("etlNdPanelTitle").textContent = d.title;
        document.getElementById("etlNdPanelBody").innerHTML = d.body;
        document.getElementById("etlNdPanel").classList.add("open");
      }
      function etlCloseNdPanel() {
        document.getElementById("etlNdPanel").classList.remove("open");
        document
          .querySelectorAll("#v-etl .pd-node")
          .forEach((n) => n.classList.remove("selected"));
      }

      /* ── SETTINGS DRAWER ── */
      function etlToggleSettings() {
        document.getElementById("etlSettingsDrawer").classList.toggle("open");
      }

      /* ── WS CHAT ── */
      function etlWsKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          etlWsSend();
        }
      }
      function etlWsAsk(q) {
        document.getElementById("etlWsInput").value = q;
        etlWsSend();
      }
      function etlWsSend() {
        const inp = document.getElementById("etlWsInput");
        const v = inp.value.trim();
        if (!v) return;
        inp.value = "";
        inp.style.height = "auto";
        const c = document.getElementById("etlWsExtraMsgs");
        const um = document.createElement("div");
        um.className = "ws-msg user";
        um.innerHTML = `<div class="ws-msg-bubble">${etlEscHtml(v)}</div>`;
        c.appendChild(um);
        etlScrollWs();
        const tEl = document.createElement("div");
        tEl.className = "ws-msg agent";
        tEl.innerHTML = `${baiAvatarHtml("ws-msg-av agent", 30)}<div class="etl-typing"><div class="etl-td"></div><div class="etl-td"></div><div class="etl-td"></div></div>`;
        c.appendChild(tEl);
        etlScrollWs();
        setTimeout(
          () => {
            tEl.remove();
            const am = document.createElement("div");
            am.className = "ws-msg agent";
            am.innerHTML = `${baiAvatarHtml("ws-msg-av agent", 30)}<div class="ws-msg-bubble">${etlGetWsReply(v)}</div>`;
            c.appendChild(am);
            etlScrollWs();
          },
          900 + Math.random() * 500,
        );
      }
      function etlGetWsReply(q) {
        const l = q.toLowerCase();
        if (l.includes("auto-fix") || l.includes("empty string"))
          return `<p>Done. I've updated the <strong>Null Handler</strong> transform with two new rules:</p><ul><li>Empty strings are now treated as NULL before validation</li><li>NULL <code style="background:var(--gray-100);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:12px;">nationality_code</code> values will forward-fill from the prior row, or use <code style="background:var(--gray-100);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:12px;">"UNKNOWN"</code> if no prior row exists.</li></ul><p>The change takes effect on the next run. Want me to back-fill the 340 skipped rows from May 23?</p>`;
        if (l.includes("sample") || l.includes("output"))
          return `<p>Here's a sample from today's output (<strong>dwh.labour_clean</strong>, first 3 rows):</p><div class="code-block">registration_id | nationality | sector_name  | reg_date<br>───────────────────────────────────────────<br>REG-2026-084231 | AE          | Construction | 2026-05-25<br>REG-2026-084232 | IN          | Hospitality  | 2026-05-25<br>REG-2026-084233 | PK          | Construction | 2026-05-25</div><p>All columns are clean. Data quality score: <strong>99.2%</strong>.</p>`;
        if (l.includes("dedup") || l.includes("deduplication"))
          return `<p>I'll add a <strong>Deduplication</strong> step between the Sector Lookup and Date Filter nodes, deduplicating on <code style="background:var(--gray-100);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:12px;">registration_id</code>. Estimated impact: ~0.3% of rows per run. Should I apply this now?</p>`;
        if (l.includes("schema") || l.includes("export"))
          return `<p>Here's the output schema for <strong>dwh.labour_clean</strong>:</p><div class="code-block">registration_id  VARCHAR(20)  PK<br>nationality_code VARCHAR(3)<br>nationality      VARCHAR(60)<br>sector_code      VARCHAR(10)<br>sector_name      VARCHAR(80)<br>sector_group     VARCHAR(40)<br>registration_date DATE<br>_loaded_at       TIMESTAMP</div><p>Want me to generate a data dictionary?</p>`;
        return `<p>I've checked the <strong>Labour Registry Cleanse</strong> pipeline. Based on the latest run data and transform configuration, everything appears to be functioning within expected parameters. Let me know if you'd like to drill into a specific step or run.</p>`;
      }
      function etlScrollWs() {
        const c = document.getElementById("etlWsChatPane");
        if (c) c.scrollTop = c.scrollHeight;
      }

      /* ══════════════════════════════════════
   ETL BUILDER ENGINE
══════════════════════════════════════ */
      const ETL_STEPS = [
        {
          key: "name",
          isNameStep: true,
          msg: `Let's build your data pipeline. First — **what do you want to call it?**\n\nGive it a clear name so you can find it easily later.`,
          chips: [],
          cfIcon: "gray",
          cfIconName: "ti-tag",
          cfLabel: "Pipeline name",
          followUp: (v) =>
            `**"${v}"** — great name. Now let's connect your data source.`,
          fsUpdate: () => null,
        },
        {
          key: "source",
          msg: `Where is the **source data** coming from?`,
          chips: [
            { i: "ti-brand-postgresql", l: "PostgreSQL" },
            { i: "ti-database", l: "ClickHouse" },
            { i: "ti-database", l: "MySQL" },
            { i: "ti-database", l: "Microsoft SQL Server" },
            { i: "ti-file-spreadsheet", l: "CSV / Excel upload" },
            { i: "ti-api", l: "REST API" },
          ],
          cfIcon: "blue",
          cfIconName: "ti-database",
          cfLabel: "Source type",
          followUp: (v) =>
            v.includes("CSV") || v.includes("Excel")
              ? `Got it — **${v}**. No connection needed, you'll upload files directly. Let's set up your destination.`
              : `**${v}** selected. Let me collect the connection details.`,
          fsUpdate: (cfg) =>
            etlAddFsNode(
              "source",
              "blue",
              "ti-database",
              "Source",
              cfg.source,
              "—",
            ),
          skipConnect: (v) => v.includes("CSV") || v.includes("Excel"),
        },
        {
          key: "connection",
          isConnectStep: true,
          msg: `__CONNECT_STEP__`,
          chips: [],
          cfIcon: "teal",
          cfIconName: "ti-plug",
          cfLabel: "Connection",
          followUp: (v) =>
            `Connection verified ✓ — **${v}** is live and ready.`,
          fsUpdate: (cfg) => {
            const el = document.getElementById("etl-fsn-source");
            if (el)
              el.querySelector(".fs-node-sub").textContent =
                cfg.connection || "connected";
          },
        },
        {
          key: "destination",
          msg: `Where should the transformed data **land**?`,
          chips: [
            { i: "ti-database", l: "ClickHouse (Bayaan DWH)" },
            { i: "ti-brand-postgresql", l: "PostgreSQL" },
            { i: "ti-chart-bar", l: "Tableau extract" },
            { i: "ti-table", l: "Power BI dataset" },
            { i: "ti-file-analytics", l: "CSV / Flat file" },
            { i: "ti-api", l: "REST API endpoint" },
          ],
          cfIcon: "green",
          cfIconName: "ti-database",
          cfLabel: "Destination",
          followUp: (v) =>
            `Data will land in **${v}**. Now let's define what happens in between.`,
          fsUpdate: (cfg) =>
            etlAddFsNode(
              "dest",
              "green",
              "ti-database",
              "Destination",
              cfg.destination,
              "—",
            ),
        },
        {
          key: "transform",
          msg: `What **transformations** should happen to the data? Pick all that apply.`,
          chips: [
            { i: "ti-eraser", l: "Cleanse nulls & fix data types" },
            { i: "ti-git-merge", l: "Join with another table" },
            { i: "ti-filter", l: "Filter rows by condition" },
            { i: "ti-calculator", l: "Aggregate & summarise" },
            { i: "ti-copy-off", l: "Deduplicate records" },
            { i: "ti-wand", l: "AI-suggest transforms" },
          ],
          multi: true,
          cfIcon: "purple",
          cfIconName: "ti-wand",
          cfLabel: "Transforms",
          followUp: (v) =>
            `I'll apply: **${v}**. Bayaan will run these in sequence on every pipeline execution.`,
          fsUpdate: (cfg) =>
            etlAddFsNode(
              "transform",
              "purple",
              "ti-filter",
              "Transform",
              cfg.transform,
              "in sequence",
            ),
        },
        {
          key: "schedule",
          msg: `When should the pipeline **run**?`,
          chips: [
            { i: "ti-calendar", l: "Daily at 06:00 GST" },
            { i: "ti-clock", l: "Every hour" },
            { i: "ti-calendar-week", l: "Weekly on Monday" },
            { i: "ti-refresh", l: "When source data updates" },
            { i: "ti-player-play", l: "Manual runs only" },
          ],
          cfIcon: "amber",
          cfIconName: "ti-clock",
          cfLabel: "Schedule",
          followUp: (v) =>
            `Scheduled for **${v}**. All set — let me put together your pipeline.`,
          fsUpdate: () => null,
        },
      ];

      let etlBuilderStarted = false,
        etlBStep = 0,
        etlBConfig = {},
        etlBTyping = false,
        etlSelectedChips = [];
      const etlFsNodeIds = {};

      function etlAddFsNode(id, color, icon, type, name, sub) {
        const container = document.getElementById("etlFsNodes");
        if (!container) return;
        const placeholder = container.querySelector(".fs-placeholder");
        if (placeholder) placeholder.remove();
        if (etlFsNodeIds[id]) {
          const el = document.getElementById("etl-fsn-" + id);
          if (el) {
            el.querySelector(".fs-node-name").textContent = name;
            el.querySelector(".fs-node-sub").textContent = sub;
          }
          return;
        }
        if (Object.keys(etlFsNodeIds).length > 0) {
          const conn = document.createElement("div");
          conn.style.cssText =
            "display:flex;align-items:flex-start;gap:12px;opacity:1;";
          const lineWrap = document.createElement("div");
          lineWrap.className = "fs-node-line";
          const connector = document.createElement("div");
          connector.className = "fs-node-connector";
          connector.style.minHeight = "16px";
          lineWrap.appendChild(connector);
          const lbl = document.createElement("div");
          lbl.style.cssText =
            "font-size:11px;color:var(--t3);padding-top:0;padding-bottom:14px;display:flex;align-items:center;gap:5px;";
          lbl.innerHTML = `<i class="ti ti-arrow-down" style="font-size:11px;color:var(--gray-300);"></i>`;
          conn.appendChild(lineWrap);
          conn.appendChild(lbl);
          container.appendChild(conn);
        }
        const node = document.createElement("div");
        node.className = "fs-node";
        node.id = "etl-fsn-" + id;
        node.innerHTML = `<div class="fs-node-line"><div class="fs-node-dot ${color}"></div>${Object.keys(etlFsNodeIds).length > 0 ? '<div class="fs-node-connector" style="min-height:0;"></div>' : ""}</div><div class="fs-node-body"><div class="fs-node-type ${color}">${type}</div><div class="fs-node-name">${etlEscHtml(name)}</div><div class="fs-node-sub">${etlEscHtml(sub)}</div></div>`;
        container.appendChild(node);
        etlFsNodeIds[id] = true;
        setTimeout(() => node.classList.add("in"), 50);
      }

      function etlStartBuilder() {
        etlBuilderStarted = true;
        etlBStep = 0;
        etlBConfig = {};
        etlBTyping = false;
        etlSelectedChips = [];
        Object.keys(etlFsNodeIds).forEach((k) => delete etlFsNodeIds[k]);
        document.getElementById("etlBuilderMsgs").innerHTML = "";
        document.getElementById("etlConfigStrip").innerHTML = "";
        document.getElementById("etlFsNodes").innerHTML =
          '<div class="fs-placeholder">Your pipeline will take shape here as you answer the questions on the left…</div>';
        document.getElementById("etlBpStatus").textContent = "Configuring…";
        document.getElementById("etlBpStatus").className = "bp-status";
        document.getElementById("etlBpFinishBtn").style.display = "none";
        etlResetPills();
        etlShowTyping(() => {
          const s = ETL_STEPS[0];
          if (s.isNameStep) {
            etlShowNameInput(null);
          } else {
            etlAddMsg("ai", s.msg, s.chips, s.multi);
          }
          etlSetPill(0, "active");
        });
      }
      function etlResetPills() {
        for (let i = 0; i < 7; i++) {
          const p = document.getElementById("etlsp" + i);
          if (p) {
            p.className = "step-pill";
            p.querySelector(".pill-num-inner").textContent = i + 1;
          }
        }
      }
      function etlSetPill(idx, state) {
        const p = document.getElementById("etlsp" + idx);
        if (!p) return;
        if (state === "done") {
          p.className = "step-pill done";
          p.querySelector(".pill-num-inner").textContent = "✓";
        } else if (state === "active") {
          p.className = "step-pill active";
        }
      }

      /* ── NAME INLINE ── */
      function etlShowNameInput(suggested) {
        const c = document.getElementById("etlBuilderMsgs");
        const aiMsg = document.createElement("div");
        aiMsg.className = "msg ai";
        aiMsg.innerHTML = `${baiAvatarHtml("msg-av ai", 30)}<div class="msg-body"><div class="msg-bubble"><p>${etlMdHtml(ETL_STEPS[0].msg)}</p></div></div>`;
        c.appendChild(aiMsg);
        const card = document.createElement("div");
        card.className = "name-inline";
        card.id = "etl-name-card";
        card.innerHTML = `<div class="name-inline-label">Pipeline name</div>
    <div class="name-input-row">
      <input class="name-input-field" id="etlNameField" type="text" placeholder="e.g. Labour Registry Cleanse" value="${etlEscHtml(suggested || "")}" onkeydown="if(event.key==='Enter'){event.preventDefault();etlConfirmName();}"/>
      <button class="btn btn-p btn-sm" onclick="etlConfirmName()"><i class="ti ti-check"></i> Set name</button>
    </div>
    <div class="name-hint">Give it a clear, descriptive name — you can always rename it later.</div>`;
        c.appendChild(card);
        c.scrollTop = c.scrollHeight;
        setTimeout(() => document.getElementById("etlNameField")?.focus(), 60);
      }
      function etlConfirmName() {
        const inp = document.getElementById("etlNameField");
        if (!inp) return;
        const v = inp.value.trim();
        if (!v) return;
        document.getElementById("etl-name-card")?.remove();
        etlProcessAnswer(v);
      }

      /* ── DB CONNECT CARD ── */
      function etlShowConnectCard(sourceType) {
        const c = document.getElementById("etlBuilderMsgs");
        const aiMsg = document.createElement("div");
        aiMsg.className = "msg ai";
        aiMsg.innerHTML = `${baiAvatarHtml("msg-av ai", 30)}<div class="msg-body"><div class="msg-bubble"><p>Let's connect to your <strong>${etlEscHtml(sourceType)}</strong> instance. Fill in the details — credentials are encrypted and never stored in plain text.</p></div></div>`;
        c.appendChild(aiMsg);
        const card = document.createElement("div");
        card.className = "inline-card";
        card.id = "etl-conn-card";
        card.innerHTML = `<div class="ic-label">Connection details</div>
    <div class="ic-row">
      <div class="ic-field"><label>Host / IP</label><input class="mono" id="etl-db-host" placeholder="10.0.0.42" value="10.0.0.42"/></div>
      <div class="ic-field"><label>Port</label><input class="mono" id="etl-db-port" placeholder="5432" value="${etlGetDefaultPort(sourceType)}"/></div>
    </div>
    <div class="ic-field"><label>Database name</label><input class="mono" id="etl-db-name" placeholder="my_database" value="labour_db"/></div>
    <div class="ic-row">
      <div class="ic-field"><label>Username</label><input class="mono" id="etl-db-user" placeholder="db_user" value="bayaan_reader"/></div>
      <div class="ic-field"><label>Password</label><input type="password" id="etl-db-pass" placeholder="••••••••" value="••••••••"/></div>
    </div>
    <div class="ic-actions">
      <button class="btn btn-s btn-sm" onclick="etlTestConnection()"><i class="ti ti-plug"></i> Test connection</button>
      <button class="btn btn-p btn-sm" onclick="etlConfirmConnection()"><i class="ti ti-check"></i> Connect</button>
      <span class="conn-status" id="etlConnStatus"></span>
    </div>`;
        c.appendChild(card);
        c.scrollTop = c.scrollHeight;
      }
      function etlGetDefaultPort(src) {
        if (src.includes("MySQL")) return "3306";
        if (src.includes("SQL Server")) return "1433";
        if (src.includes("ClickHouse")) return "8123";
        return "5432";
      }
      function etlTestConnection() {
        const s = document.getElementById("etlConnStatus");
        s.className = "conn-status testing";
        s.innerHTML = '<i class="ti ti-loader"></i> Testing…';
        setTimeout(() => {
          s.className = "conn-status ok";
          s.innerHTML = '<i class="ti ti-check"></i> Connected';
        }, 1400);
      }
      function etlConfirmConnection() {
        const host = document.getElementById("etl-db-host")?.value || "host";
        const db = document.getElementById("etl-db-name")?.value || "db";
        document.getElementById("etl-conn-card")?.remove();
        etlProcessAnswer(`${host} · ${db}`);
      }

      /* ── MULTI-SELECT ── */
      function etlShowMultiConfirm() {
        const existing = document.getElementById("etl-multi-confirm");
        if (existing) return;
        const c = document.getElementById("etlBuilderMsgs");
        const wrap = document.createElement("div");
        wrap.id = "etl-multi-confirm";
        wrap.style.cssText = "margin-left:40px;margin-top:8px;";
        const btn = document.createElement("button");
        btn.className = "btn btn-p btn-sm";
        btn.innerHTML = '<i class="ti ti-check"></i> Confirm transforms';
        btn.onclick = etlConfirmMulti;
        wrap.appendChild(btn);
        c.appendChild(wrap);
        c.scrollTop = c.scrollHeight;
      }
      function etlConfirmMulti() {
        if (!etlSelectedChips.length) return;
        document.getElementById("etl-multi-confirm")?.remove();
        etlProcessAnswer(etlSelectedChips.join(", "));
      }

      /* ── CORE ANSWER PROCESSOR ── */
      function etlBuilderKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          etlBuilderSend();
        }
      }
      function etlBuilderSend() {
        const v = document.getElementById("etlBuilderInput").value.trim();
        if (!v || etlBTyping) return;
        document.getElementById("etlBuilderInput").value = "";
        document.getElementById("etlBuilderInput").style.height = "auto";
        etlProcessAnswer(v);
      }
      function etlProcessAnswer(val) {
        etlRemoveChipsAnchor();
        const step = ETL_STEPS[etlBStep];
        etlBConfig[step.key] = val;
        etlAddMsg("user", "<p>" + etlEscHtml(val) + "</p>");
        etlSetPill(etlBStep, "done");
        etlAddConfigField(step, val);
        if (step.fsUpdate) step.fsUpdate(etlBConfig);
        etlSelectedChips = [];
        etlBStep++;
        if (etlBStep < ETL_STEPS.length && ETL_STEPS[etlBStep].isConnectStep) {
          const prev = ETL_STEPS[etlBStep - 1];
          if (prev.skipConnect && prev.skipConnect(val)) {
            etlBStep++;
          }
        }
        if (etlBStep < ETL_STEPS.length) {
          const next = ETL_STEPS[etlBStep];
          etlShowTyping(() => {
            etlAddMsg("ai", step.followUp(val));
            setTimeout(
              () =>
                etlShowTyping(() => {
                  if (next.isConnectStep) {
                    etlShowConnectCard(etlBConfig.source);
                    etlSetPill(etlBStep, "active");
                  } else {
                    etlAddMsg("ai", next.msg, next.chips, next.multi);
                    etlSetPill(etlBStep, "active");
                  }
                }),
              500,
            );
          });
        } else {
          etlShowTyping(() => {
            etlAddMsg("ai", step.followUp(val));
            setTimeout(() => etlShowTyping(() => etlFinishBuilder()), 700);
          });
        }
      }
      function etlFinishBuilder() {
        const name = etlBConfig.name || "New Pipeline";
        etlAddMsg(
          "ai",
          `✅ **"${name}" is ready to save!**\n\nReview the data flow on the right. When you're happy, click **Save Pipeline** to choose who can run it.`,
        );
        etlSetPill(6, "active");
        document.getElementById("etlBpStatus").textContent = "Ready to save";
        document.getElementById("etlBpStatus").className = "bp-status ready";
        document.getElementById("etlBpFinishBtn").style.display = "";
      }
      function etlAddConfigField(step, val) {
        const strip = document.getElementById("etlConfigStrip");
        const row = document.createElement("div");
        row.className = "cf-row";
        const mono = step.key === "connection" ? " cf-mono" : "";
        row.innerHTML = `<div class="cf-icon ${step.cfIcon}"><i class="ti ${step.cfIconName}"></i></div><div class="cf-content"><div class="cf-label">${step.cfLabel}</div><div class="cf-value${mono}">${etlEscHtml(val)}</div></div>`;
        strip.appendChild(row);
        setTimeout(() => row.classList.add("in"), 50);
      }

      /* ── SHARED CHAT HELPERS ── */
      function etlAddMsg(role, html, chips, isMulti) {
        const c = document.getElementById("etlBuilderMsgs");
        const wrap = document.createElement("div");
        wrap.className = "msg " + role;
        const body = document.createElement("div");
        body.className = "msg-body";
        const bubble = document.createElement("div");
        bubble.className = "msg-bubble";
        bubble.innerHTML = etlMdHtml(html);
        body.appendChild(bubble);
        if (role === "ai") {
          wrap.appendChild(baiAvatarEl("msg-av ai", 30));
          wrap.appendChild(body);
        } else {
          wrap.appendChild(body);
        }
        c.appendChild(wrap);
        if (chips && chips.length) {
          const anchor = document.createElement("div");
          anchor.className = "msg";
          anchor.id = "etl-chips-anchor";
          const sp = document.createElement("div");
          sp.style.width = "40px";
          const row = document.createElement("div");
          row.className = "chips-row";
          chips.forEach((ch) => {
            const btn = document.createElement("button");
            btn.className = "chip";
            btn.innerHTML = `<i class="ti ${ch.i}"></i>${ch.l}`;
            btn.dataset.v = ch.l;
            btn.onclick = () => {
              if (!isMulti) {
                document
                  .querySelectorAll("#v-etl .chip")
                  .forEach((x) => x.classList.remove("sel"));
                btn.classList.add("sel");
                setTimeout(() => etlProcessAnswer(ch.l), 250);
              } else {
                btn.classList.toggle("sel");
                etlSelectedChips = Array.from(
                  document.querySelectorAll("#v-etl .chip.sel"),
                ).map((x) => x.dataset.v);
                if (etlSelectedChips.length) etlShowMultiConfirm();
                else document.getElementById("etl-multi-confirm")?.remove();
              }
            };
            row.appendChild(btn);
          });
          anchor.appendChild(sp);
          anchor.appendChild(row);
          c.appendChild(anchor);
        }
        c.scrollTop = c.scrollHeight;
      }
      function etlRemoveChipsAnchor() {
        document.getElementById("etl-chips-anchor")?.remove();
      }
      function etlShowTyping(cb) {
        etlBTyping = true;
        const c = document.getElementById("etlBuilderMsgs");
        const el = document.createElement("div");
        el.id = "etl-typing-ind";
        el.className = "msg ai";
        el.innerHTML = `${baiAvatarHtml("msg-av ai", 30)}<div class="etl-typing"><div class="etl-td"></div><div class="etl-td"></div><div class="etl-td"></div></div>`;
        c.appendChild(el);
        c.scrollTop = c.scrollHeight;
        setTimeout(
          () => {
            el.remove();
            etlBTyping = false;
            cb();
          },
          800 + Math.random() * 400,
        );
      }
      function etlMdHtml(t) {
        if (!t) return "";
        return t
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\n\n/g, "</p><p>")
          .replace(/\n/g, "<br>")
          .replace(/^/, "<p>")
          .replace(/$/, "</p>");
      }
      function etlEscHtml(s) {
        return (s || "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }

      /* ── SCENARIO ── */
      function updateVar(idx, val, suffix, plus, prefix) {
        const el = document.getElementById("vv" + idx);
        if (!el) return;
        const num = parseFloat(val);
        let display = prefix
          ? suffix + num
          : (plus && num > 0 ? "+" : "") + num.toFixed(1) + suffix;
        el.textContent = display;
        document
          .querySelectorAll(".kpi-card")
          .forEach((c) => c.classList.remove("changed"));
      }
      function runSimulation() {
        ["kpi0", "kpi1", "kpi2", "kpi3", "kpi4"].forEach((id, i) => {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.classList.add("changed");
          }, i * 200);
        });
        const vals = ["+3.1%", "-2.8%", "+AED 6.2B", "-0.6pp", "+AED 3.8B"];
        const colors = [
          "var(--ok)",
          "var(--err)",
          "var(--ok)",
          "var(--warn)",
          "var(--ok)",
        ];
        vals.forEach((v, i) => {
          const el = document.getElementById("kv" + i);
          if (el) {
            el.textContent = v;
            el.style.color = colors[i];
          }
        });
        mkChart("scChart1", "bar", {
          labels: ["Baseline", "Scenario"],
          datasets: [
            {
              data: [3.4, 3.1],
              backgroundColor: ["#C7CDFF", "#4F63FF"],
              borderRadius: 6,
            },
          ],
        });
        toast("Simulation complete — KPIs updated", "ti-check");
      }

      /* ── TABLE BUILDER (legacy helpers — studio flow uses tblGoTo) ── */
      function tblGenerate() {
        tblGoTo("table-builder");
        setTimeout(() => {
          const inp = document.getElementById("tblChatInput");
          const legacy = document.getElementById("tblInput");
          const v = legacy?.value.trim();
          if (inp && v) {
            inp.value = v;
            tblChatSend();
          }
        }, 400);
      }

      /* ── SURVEY BUILDER ── */
      let currentQType = "mc";
      function setQType(type, el) {
        currentQType = type;
        document
          .querySelectorAll("[id^=qtype-]")
          .forEach((c) => c.classList.remove("on"));
        el.classList.add("on");
      }
      function selectSQ(el) {
        document
          .querySelectorAll(".sq-card")
          .forEach((c) => c.classList.remove("sel"));
        el.classList.add("sel");
      }
      let sqCount = 4;
      function addQuestion() {
        const types = {
          mc: "Multiple choice",
          rt: "Rating scale (1–10)",
          tx: "Open text",
          dt: "Date picker",
        };
        const colors = {
          mc: "",
          rt: "background:var(--warn-lt);color:var(--warn);",
          tx: "background:var(--ok-lt);color:var(--ok);",
          dt: "background:var(--purple-lt);color:var(--purple);",
        };
        const contents = {
          mc: `<div class="sq-opts"><div class="sq-opt"><div class="sq-radio"></div>Option A</div><div class="sq-opt"><div class="sq-radio"></div>Option B</div></div>`,
          rt: `<div class="sq-rating-row">${Array.from({ length: 10 }, (_, i) => `<div class="sq-rate-n">${i + 1}</div>`).join("")}</div>`,
          tx: `<div class="sq-textbox"></div>`,
          dt: `<input type="date" class="inp" style="margin-top:6px;max-width:200px;">`,
        };
        sqCount++;
        const d = document.createElement("div");
        d.className = "sq-card";
        d.dataset.id = sqCount;
        d.onclick = function () {
          selectSQ(this);
        };
        d.innerHTML = `<div class="sq-handle"><i class="ti ti-grip-vertical sq-grip"></i><span class="sq-type-badge" style="${colors[currentQType]}">${types[currentQType]}</span><div style="margin-left:auto;display:flex;gap:4px;"><button class="btn btn-g btn-xs" onclick="event.stopPropagation();toast('Duplicated','ti-copy')"><i class="ti ti-copy"></i></button><button class="btn btn-g btn-xs" onclick="event.stopPropagation();this.closest('.sq-card').remove();toast('Removed','ti-trash')"><i class="ti ti-trash"></i></button></div></div><div class="sq-text" contenteditable="true" style="outline:none;border-bottom:1px dashed var(--border);padding-bottom:6px;margin-bottom:10px;" placeholder="Type your question here…">New question ${sqCount}</div>${contents[currentQType]}`;
        document.getElementById("sqList").appendChild(d);
        selectSQ(d);
        toast("Question added", "ti-plus");
      }
      function svTab(tab, el) {
        if (el) {
          document
            .querySelectorAll(".sv-tab")
            .forEach((t) => t.classList.remove("on"));
          el.classList.add("on");
        }
        document.getElementById("svSettings").style.display =
          tab === "settings" ? "block" : "none";
        document.getElementById("svResponses").style.display =
          tab === "responses" ? "block" : "none";
      }

      /* ── ANNOUNCEMENT ── */
      function updatePreview() {
        const t = document.getElementById("anTitle").value;
        const b = document.getElementById("anBody").value;
        const c = document.getElementById("anCta").value;
        const pt = document.getElementById("pvTitle");
        const pb = document.getElementById("pvBody");
        const pc = document.getElementById("pvCta");
        if (pt) pt.textContent = t || "Title";
        if (pb)
          pb.textContent =
            (b || "").substring(0, 120) + (b && b.length > 120 ? "…" : "");
        if (pc) pc.textContent = c || "Click here";
      }

      /* ── PODCAST ── */
      let playing = false;
      let podInterval;
      function podGenerate() {
        const player = document.getElementById("podPlayer");
        const gen = document.getElementById("podGen");
        const tx = document.getElementById("podTranscript");
        player.style.display = "none";
        gen.style.display = "flex";
        tx.style.display = "none";
        setTimeout(() => {
          player.style.display = "block";
          gen.style.display = "none";
          tx.style.display = "block";
          initPodWave();
          toast("Podcast generated successfully", "ti-headphones");
        }, 2800);
      }
      function togglePlay() {
        playing = !playing;
        const btn = document.getElementById("playBtn");
        btn.innerHTML = `<i class="ti ti-player-${playing ? "pause" : "play"}"></i>`;
        if (playing) {
          let pct = 35;
          podInterval = setInterval(() => {
            pct = Math.min(pct + 0.3, 100);
            const fill = document.getElementById("podFill");
            const time = document.getElementById("podTime");
            if (fill) fill.style.width = pct + "%";
            const totalSec = 522;
            const cur = Math.round((pct / 100) * totalSec);
            const m = Math.floor(cur / 60),
              s = cur % 60;
            if (time)
              time.textContent = `${m}:${s.toString().padStart(2, "0")} / 8:42`;
            if (pct >= 100) {
              clearInterval(podInterval);
              playing = false;
              btn.innerHTML = '<i class="ti ti-player-play"></i>';
            }
          }, 200);
        } else {
          clearInterval(podInterval);
        }
      }
      function seek(e) {
        const bar = e.currentTarget;
        const pct = (e.offsetX / bar.offsetWidth) * 100;
        document.getElementById("podFill").style.width = pct + "%";
      }

      /* ── RESEARCH LAB ── */
      const rlResponses = {
        gdp: `Based on the <strong>SCAD_GDP_Q1_2026.xlsx</strong> and the <strong>ClickHouse eco_national</strong> database, Abu Dhabi GDP reached <strong>AED 412.8 billion</strong> in Q1 2026. Non-oil sectors contributed <strong>56.3%</strong> — a historic milestone aligned with Vision 2030 targets. Tourism (+11.4%) and financial services (+8.2%) were the primary growth engines.
    <div class="rl-msg-source-ref"><i class="ti ti-books" style="font-size:11px;color:var(--t3);"></i><span class="rl-src-ref-chip"><i class="ti ti-file-spreadsheet"></i> SCAD_GDP_Q1_2026.xlsx</span><span class="rl-src-ref-chip"><i class="ti ti-database"></i> eco_national.gdp_quarterly</span></div>`,
        cpi: `The <strong>CPI_Report_Mar2026.pdf</strong> reports headline inflation at <strong>2.8% YoY</strong> — above the 2.4% policy target for the <strong>third consecutive month</strong>. Housing and utilities (+4.50% YoY) is the primary driver. Clothing provided a deflationary offset of −8.42% YoY. Essential CPI stands at 108.94.
    <div class="rl-msg-source-ref"><i class="ti ti-books" style="font-size:11px;color:var(--t3);"></i><span class="rl-src-ref-chip"><i class="ti ti-file-type-pdf"></i> CPI_Report_Mar2026.pdf · p.14</span></div>`,
        labour: `The <strong>PostgreSQL labour_registry</strong> shows employment at a 5-year high of <strong>1.24 million</strong> active workers. However, Emiratisation is tracking <strong>0.6 percentage points below the 2026 target</strong> — consistent across 2 consecutive quarters. Financial services and manufacturing sectors show the largest gaps per the <strong>Emiratisation_Policy_2026.pdf</strong>.
    <div class="rl-msg-source-ref"><i class="ti ti-books" style="font-size:11px;color:var(--t3);"></i><span class="rl-src-ref-chip"><i class="ti ti-server"></i> labour_registry.workforce</span><span class="rl-src-ref-chip"><i class="ti ti-file-description"></i> Emiratisation_Policy_2026.pdf</span></div>`,
        default: `Based on cross-referencing all 5 indexed sources (GDP spreadsheet, CPI report, Emiratisation policy, ClickHouse eco_national, and PostgreSQL labour_registry), here is the key synthesis: Abu Dhabi's economy is on a strong non-oil growth trajectory, with the 56.3% non-oil GDP share being the standout milestone. The principal risk signals are the persistent inflation overshoot (+2.8% vs 2.4% target) and the Emiratisation gap (−0.6pp). FDI inflows at AED 47.8B are a strong positive offset.
    <div class="rl-msg-source-ref"><i class="ti ti-books" style="font-size:11px;color:var(--t3);"></i><span class="rl-src-ref-chip">5 sources</span></div>`,
      };

      function rlAskSuggestion(el) {
        document.getElementById("rlInput").value = el.textContent;
        rlSend();
      }

      function rlSend() {
        const inp = document.getElementById("rlInput");
        const q = inp.value.trim();
        if (!q) return;
        inp.value = "";
        const empty = document.getElementById("rlEmptyState");
        if (empty) empty.style.display = "none";
        const msgs = document.getElementById("rlMsgs");
        const uMsg = document.createElement("div");
        uMsg.className = "rl-user-msg";
        uMsg.textContent = q;
        msgs.appendChild(uMsg);
        const typing = document.createElement("div");
        typing.className = "rl-ai-msg";
        typing.style.color = "var(--t3)";
        typing.innerHTML =
          '<i class="ti ti-loader" style="animation:spin 1s linear infinite;font-size:14px;display:inline-block;margin-right:6px;"></i>Searching 5 sources…';
        msgs.appendChild(typing);
        msgs.scrollTop = msgs.scrollHeight;
        setTimeout(() => {
          const ql = q.toLowerCase();
          const key =
            ql.includes("gdp") ||
            ql.includes("growth") ||
            ql.includes("non-oil")
              ? "gdp"
              : ql.includes("cpi") ||
                  ql.includes("inflation") ||
                  ql.includes("price")
                ? "cpi"
                : ql.includes("labour") ||
                    ql.includes("labor") ||
                    ql.includes("emiratisation") ||
                    ql.includes("workforce")
                  ? "labour"
                  : "default";
          typing.innerHTML = rlResponses[key];
          typing.style.color = "";
          msgs.scrollTop = msgs.scrollHeight;
        }, 1400);
      }

      function rlRemoveSrc(id, e) {
        e && e.stopPropagation();
        const card = document.getElementById(id);
        if (card) {
          card.style.opacity = "0";
          card.style.transform = "translateX(-8px)";
          card.style.transition = "all .2s";
          setTimeout(() => card.remove(), 200);
        }
        toast("Source removed", "ti-trash");
      }

      function rlGenerate(type) {
        toast(`${type} generating from indexed sources…`, "ti-sparkles");
        setTimeout(
          () => toast(`${type} ready — saved to Artifacts`, "ti-check"),
          2200,
        );
      }

      /* ── DB CONNECTOR ── */
      const DB_CONFIGS = {
        clickhouse: {
          name: "ClickHouse · SCAD National Accounts",
          meta: "clickhouse.scad.internal · Port 9000",
          ico: "ti-database",
          icoBg: "#EFF6FF",
          icoColor: "#2563EB",
          status: "connected",
          schemaLabel: "eco_national",
          footInfo: "Synced 2 min ago · 1.24M rows · Auto-refresh every 15 min",
          schemas: [
            {
              name: "eco_national",
              tables: [
                { name: "gdp_quarterly", rows: "124K" },
                { name: "gdp_by_sector", rows: "847K" },
                { name: "non_oil_indicators", rows: "52K" },
                { name: "fdi_inflows", rows: "38K" },
              ],
            },
            {
              name: "price_indices",
              tables: [
                { name: "cpi_main", rows: "290K" },
                { name: "cpi_essential", rows: "180K" },
                { name: "construction_cost", rows: "44K" },
              ],
            },
          ],
          activeTable: "gdp_quarterly",
          schemaColumns: [
            {
              col: "year_quarter",
              type: "VARCHAR(6)",
              note: "e.g. 2026Q1",
              pk: true,
            },
            { col: "gdp_current_aed", type: "Float64", note: "Millions AED" },
            {
              col: "gdp_constant_aed",
              type: "Float64",
              note: "Base year 2010",
            },
            {
              col: "non_oil_share_pct",
              type: "Float32",
              note: "% of total GDP",
            },
            { col: "yoy_growth_pct", type: "Float32", note: "Year-on-year %" },
            { col: "updated_at", type: "DateTime", note: "", ts: true },
          ],
          previewRows: [
            ["2026Q1", "412,800", "389,200", "56.3%", "+3.4%", "2026-05-01"],
            ["2025Q4", "399,200", "378,100", "54.8%", "+2.9%", "2026-02-15"],
            ["2025Q3", "385,600", "367,400", "53.2%", "+2.6%", "2025-11-12"],
            ["2025Q2", "378,100", "360,900", "52.7%", "+2.1%", "2025-08-10"],
          ],
        },
        postgres: {
          name: "PostgreSQL · Labour Registry",
          meta: "pg.scad.internal · Port 5432",
          ico: "ti-server",
          icoBg: "#F0FDF4",
          icoColor: "#059669",
          status: "connected",
          schemaLabel: "labour_registry",
          footInfo: "Synced 8 min ago · 3 tables · Webhook-triggered refresh",
          schemas: [
            {
              name: "labour_registry",
              tables: [
                { name: "workforce", rows: "1.24M" },
                { name: "emiratisation_targets", rows: "2.4K" },
                { name: "sector_employment", rows: "88K" },
              ],
            },
            {
              name: "survey_data",
              tables: [
                { name: "lfs_responses", rows: "312K" },
                { name: "wage_survey", rows: "64K" },
              ],
            },
          ],
          activeTable: "workforce",
          schemaColumns: [
            { col: "worker_id", type: "UUID", note: "Primary key", pk: true },
            {
              col: "nationality",
              type: "VARCHAR(3)",
              note: "ISO 3166-1 alpha-3",
            },
            { col: "sector_code", type: "VARCHAR(10)", note: "ISIC Rev. 4" },
            {
              col: "employment_type",
              type: "VARCHAR(20)",
              note: "Full / Part / Contract",
            },
            {
              col: "emiratisation_flag",
              type: "BOOLEAN",
              note: "UAE national indicator",
            },
            { col: "entry_date", type: "DATE", note: "", ts: true },
            { col: "updated_at", type: "TIMESTAMPTZ", note: "", ts: true },
          ],
          previewRows: [
            ["a3f4...", "UAE", "K6400", "Full", "true", "2023-03-12"],
            ["b7c1...", "IND", "F4100", "Contract", "false", "2021-07-18"],
            ["c9d2...", "EGY", "G4711", "Full", "false", "2020-01-05"],
            ["d1e8...", "UAE", "K6411", "Full", "true", "2024-10-01"],
          ],
        },
      };

      let _dbcCurrentDb = "clickhouse",
        _dbcActiveTable = null,
        _dbcActiveTab = "schema";

      function openDbConnector(dbKey) {
        _dbcCurrentDb = dbKey;
        const cfg = DB_CONFIGS[dbKey];
        _dbcActiveTable = cfg.activeTable;
        _dbcActiveTab = "schema";
        document.getElementById("dbcName").textContent = cfg.name;
        document.getElementById("dbcMeta").textContent = cfg.meta;
        const ico = document.getElementById("dbcIco");
        ico.style.background = cfg.icoBg;
        ico.innerHTML = `<i class="ti ${cfg.ico}" style="color:${cfg.icoColor};font-size:19px;"></i>`;
        const status = document.getElementById("dbcStatus");
        status.className = "dbc-status " + cfg.status;
        status.textContent =
          cfg.status === "connected" ? "Connected" : "Disconnected";
        document.getElementById("dbcSchemaLabel").textContent = cfg.schemaLabel;
        document.getElementById("dbcFootInfo").textContent = cfg.footInfo;
        renderDbcTree(cfg);
        renderDbcRight();
        document
          .querySelectorAll(".dbc-tab")
          .forEach((t, i) => t.classList.toggle("active", i === 0));
        document.getElementById("dbConnectorOverlay").classList.add("on");
      }

      function renderDbcTree(cfg) {
        document.getElementById("dbcTree").innerHTML = cfg.schemas
          .map(
            (s) => `
    <div class="dbc-schema-item">
      <div class="dbc-schema-toggle open" onclick="this.classList.toggle('open')">
        <i class="ti ti-chevron-right caret"></i><i class="ti ti-database db-icon"></i><span>${s.name}</span>
      </div>
      <div class="dbc-tables">${s.tables
        .map(
          (t) => `
        <div class="dbc-table-row${t.name === _dbcActiveTable ? " active" : ""}" onclick="dbcSelectTable('${t.name}')">
          <i class="ti ti-table"></i><span>${t.name}</span><span class="dbc-row-count">${t.rows}</span>
        </div>`,
        )
        .join("")}</div>
    </div>`,
          )
          .join("");
      }

      function dbcSelectTable(name) {
        _dbcActiveTable = name;
        document
          .querySelectorAll(".dbc-table-row")
          .forEach((r) =>
            r.classList.toggle(
              "active",
              r.querySelector("span:not(.dbc-row-count)").textContent === name,
            ),
          );
        renderDbcRight();
      }

      function dbcSwitchTab(tab, el) {
        _dbcActiveTab = tab;
        document
          .querySelectorAll(".dbc-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        renderDbcRight();
      }

      function renderDbcRight() {
        const cfg = DB_CONFIGS[_dbcCurrentDb];
        const body = document.getElementById("dbcRightBody");
        if (_dbcActiveTab === "schema") {
          body.innerHTML = `<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;"><i class="ti ti-table" style="font-size:16px;color:var(--acc);"></i><span style="font-size:13px;font-weight:700;color:var(--t1);">${_dbcActiveTable}</span><span style="font-size:11px;color:var(--t3);">${cfg.schemaColumns.length} columns</span></div>
      <table class="dbc-schema-table"><thead><tr><th>Column</th><th>Type</th><th>Note</th></tr></thead><tbody>${cfg.schemaColumns.map((c) => `<tr><td style="font-weight:600;color:var(--t1);font-family:var(--mono,monospace);font-size:11px;">${c.col}</td><td><span class="dbc-col-type${c.pk ? " pk" : c.ts ? " ts" : ""}">${c.type}</span></td><td style="color:var(--t3);">${c.note}</td></tr>`).join("")}</tbody></table>`;
        } else if (_dbcActiveTab === "preview") {
          const cols = cfg.schemaColumns.map((c) => c.col);
          body.innerHTML = `<div style="font-size:12px;font-weight:600;color:var(--t2);margin-bottom:12px;">Showing top 4 rows of <span style="color:var(--t1);">${_dbcActiveTable}</span></div><div style="overflow-x:auto;"><table class="dbc-data-table"><thead><tr>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${cfg.previewRows.map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="dbc-preview-note">Live data · truncated to 4 rows for preview</div>`;
        } else {
          body.innerHTML = `<div style="font-size:13px;font-weight:600;color:var(--t1);margin-bottom:16px;">Connection settings</div><div class="dbc-conn-grid"><div class="dbc-field"><label>Host</label><input value="${cfg.meta.split(" · ")[0]}"></div><div class="dbc-field"><label>Port</label><input value="${cfg.meta.split("Port ")[1]}"></div><div class="dbc-field"><label>Database / Schema</label><input value="${cfg.schemaLabel}"></div><div class="dbc-field"><label>Username</label><input value="bayaan_readonly"></div><div class="dbc-field full"><label>Password</label><div class="pass-wrap"><input type="password" value="••••••••••••"><button class="pass-eye" onclick="this.previousElementSibling.type=this.previousElementSibling.type==='password'?'text':'password'"><i class="ti ti-eye"></i></button></div></div></div><button class="btn btn-s btn-sm" onclick="toast('Connection tested — OK ✓','ti-check')"><i class="ti ti-plug-connected"></i> Test connection</button>`;
        }
      }

      function closeDbConnector(e) {
        if (!e || e.target === document.getElementById("dbConnectorOverlay"))
          document.getElementById("dbConnectorOverlay").classList.remove("on");
      }

      function rlAddDbAsSource() {
        closeDbConnector();
        toast("Database added to Research Lab sources", "ti-database");
      }

      /* ── MODAL ── */
      function openAddSrc() {
        document.getElementById("addSrcModal").classList.add("on");
      }
      function closeModal(id, e) {
        if (!e || e.target === document.getElementById(id))
          document.getElementById(id).classList.remove("on");
      }

      /* ── TOAST ── */

      /* delegated handler removed - using onclick directly */

      /* ── BIND INPUT EVENTS (after DOM ready) ── */
      document.addEventListener("DOMContentLoaded", function () {
        // Research lab input
        const rlInp = document.getElementById("rlInput");
        if (rlInp)
          rlInp.addEventListener("keydown", function (e) {
            if (e.key === "Enter") rlSend();
          });

        // ETL input
        // ETL Studio initializes on openTool('etl') → etlGoTo('etl-library')

        // Table input
        const tblInp = document.getElementById("tblInput");
        if (tblInp)
          tblInp.addEventListener("keydown", function (e) {
            if (e.key === "Enter") tblGenerate();
          });

        // Announcement live preview
        ["anTitle", "anBody", "anCta"].forEach(function (id) {
          const el = document.getElementById(id);
          if (el) el.addEventListener("input", updatePreview);
        });

        // Scenario sliders - bind oninput via JS
        const sliders = document.querySelectorAll("#scVars input[type=range]");
        const configs = [
          [0, "%", true],
          [1, "%", true],
          [2, "$", false, true],
          [3, "%", true],
          [4, "%", false],
        ];
        sliders.forEach(function (sl, i) {
          const cfg = configs[i] || [i, "", false];
          sl.removeAttribute("oninput");
          sl.addEventListener("input", function () {
            updateVar(cfg[0], this.value, cfg[1], cfg[2], cfg[3]);
          });
        });

        // Pod progress bar seek
        const podProg = document.getElementById("podProg");
        if (podProg) podProg.addEventListener("click", seek);

        // Chat input send on Enter
        const chatInp = document.getElementById("chatInput");
        if (chatInp)
          chatInp.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMsg();
            }
          });

        window.addEventListener("resize", function () {
          const studio = document.getElementById("tv-studio");
          if (studio && studio.classList.contains("active")) {
            const agent = document.getElementById("v-agent");
            if (agent && agent.classList.contains("on"))
              agentGoTo("av-library");
          }
        });
      });

      /* ── MUTATION OBSERVER: re-bind events on dynamic content ── */
      const _observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType !== 1) return;
            // Re-bind range sliders injected into agent props panel
            node.querySelectorAll &&
              node.querySelectorAll("input[type=range]").forEach(function (sl) {
                sl.addEventListener("input", function () {
                  const id = sl.closest("[id]") ? sl.closest("[id]").id : "";
                  if (id === "scVars") return; // handled by DOMContentLoaded
                  // agent props threshold slider
                  const disp = sl.nextElementSibling;
                  if (disp)
                    disp.textContent = "σ = " + parseFloat(sl.value).toFixed(1);
                });
              });
          });
        });
      });
      _observer.observe(document.body, { childList: true, subtree: true });

      /* ── INIT ── */

      /* ══ V3 FUNCTIONS ══ */

      /* ══ LANDING ══ */
      function landKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          enterApp(document.getElementById("land-input").value);
        }
      }
      function autoResize(ta) {
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
      }

      function positionLandModeMenu(dropdown) {
        const menu = dropdown.querySelector(".land-mode-menu");
        const trigger = dropdown.querySelector(".land-mode-trigger");
        if (!menu || !trigger) return;
        dropdown.classList.remove("drop-up");
        const gap = 8;
        const triggerRect = trigger.getBoundingClientRect();
        const menuHeight = menu.offsetHeight;
        const spaceBelow = window.innerHeight - triggerRect.bottom - gap;
        const spaceAbove = triggerRect.top - gap;
        if (menuHeight > spaceBelow && spaceAbove >= menuHeight) {
          dropdown.classList.add("drop-up");
        } else if (menuHeight > spaceBelow && spaceAbove > spaceBelow) {
          dropdown.classList.add("drop-up");
        }
      }

      function toggleLandModeDropdown(e, btn) {
        if (e) e.stopPropagation();
        const dropdown = btn.closest(".land-mode-dropdown");
        if (!dropdown) return;
        const wasOpen = dropdown.classList.contains("open");
        document.querySelectorAll(".land-mode-dropdown.open").forEach((d) => {
          d.classList.remove("open", "drop-up");
        });
        if (!wasOpen) {
          dropdown.classList.add("open");
          requestAnimationFrame(() => positionLandModeMenu(dropdown));
        }
      }

      function selectLandMode(optionBtn) {
        const dropdown = optionBtn.closest(".land-mode-dropdown");
        if (!dropdown) return;
        setLandModeDropdownState(dropdown, optionBtn);
        dropdown.classList.remove("open", "drop-up");
        if (optionBtn.closest("#tv-chat .bai-input-area")) {
          onChatModeChanged(optionBtn.dataset.mode);
        }
      }

      function setLandModeDropdownState(dropdown, activeOption) {
        dropdown.querySelectorAll(".land-mode-option").forEach((o) => {
          o.classList.remove("active");
        });
        activeOption.classList.add("active");
        const trigger = dropdown.querySelector(".land-mode-trigger");
        const iconEl = trigger && trigger.querySelector(".land-mode-trigger-icon");
        const labelEl =
          trigger && trigger.querySelector(".land-mode-trigger-label");
        if (iconEl && activeOption.dataset.icon)
          iconEl.className = activeOption.dataset.icon + " land-mode-trigger-icon";
        if (labelEl && activeOption.dataset.label)
          labelEl.textContent = activeOption.dataset.label;
      }

      function markAllRrItemsDone(container) {
        const root =
          typeof container === "string"
            ? document.querySelector(container)
            : container || document.getElementById("researchCard");
        if (!root) return;
        root.querySelectorAll(".rr-item").forEach((item) => {
          if (item.querySelector(".done-ico")) return;
          const text = item.textContent.trim();
          item.textContent = "";
          const doneIco = document.createElement("div");
          doneIco.className = "done-ico";
          doneIco.innerHTML = '<i class="ti ti-check"></i>';
          item.appendChild(doneIco);
          item.append(document.createTextNode(text));
        });
      }

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".land-mode-dropdown")) {
          document.querySelectorAll(".land-mode-dropdown.open").forEach((d) => {
            d.classList.remove("open", "drop-up");
          });
        }
      });

      function enterApp(q = "", tab = "chat", onReady) {
        _aiEnterApp(q, tab, onReady);
      }

      /* ══ AI WORKSPACES ══ */
      const AI_WORKSPACES = [
        {
          id: "el",
          code: "EL",
          name: "Economic & Labor",
          desc: "GDP, labour market, inflation, and Vision 2030 economic indicators for Abu Dhabi.",
          instructions:
            "You are an economic analyst for Abu Dhabi. Cite SCAD official statistics. Compare to UAE and GCC peers when relevant. Use concise executive summaries.",
          bg: "#E6F1FB",
          color: "#185FA5",
          loc: "Abu Dhabi",
          domains: 4,
          members: 3,
          lastUsed: "2 hours ago",
          files: [
            {
              name: "GDP_Annual_2018-2024.xlsx",
              meta: "2.4 MB · Uploaded Apr 12",
              icon: "ti-file-spreadsheet",
            },
            {
              name: "Labour_Market_Q1_2026.pdf",
              meta: "890 KB · SCAD Database",
              icon: "ti-file-text",
            },
          ],
          threads: [
            {
              id: "t1",
              title: "GDP strategy leveraging tourism with country benchmarks",
              type: "ask",
              time: "Today",
              pinned: true,
            },
            {
              id: "t2",
              title: "Non-oil GDP structural shift — anomaly deep dive",
              type: "ask",
              time: "Yesterday",
              pinned: true,
            },
            {
              id: "t3",
              title: "Weekly inflation watch — CPI essential vs headline",
              type: "ask",
              time: "Apr 14",
              pinned: false,
            },
            {
              id: "t4",
              title: "Emiratisation gap by sector — policy brief draft",
              type: "ask",
              time: "Apr 10",
              pinned: false,
            },
          ],
          memberList: [
            {
              name: "You",
              role: "Owner",
              bg: "linear-gradient(135deg,#667eea,#764ba2)",
              init: "U",
            },
            {
              name: "Sara Al Mansoori",
              role: "Contributor",
              bg: "#E6F1FB",
              init: "SM",
              color: "#185FA5",
            },
            {
              name: "Policy Desk",
              role: "Viewer",
              bg: "#E1F5EE",
              init: "PD",
              color: "#0F6E56",
            },
          ],
        },
        {
          id: "cp",
          code: "CP",
          name: "CPI & Prices",
          desc: "Consumer price indices, essential CPI, and inflation monitoring across UAE.",
          instructions:
            "Focus on CPI sub-indices, housing and food components, and policy threshold breaches. Highlight month-on-month and year-on-year changes.",
          bg: "#E1F5EE",
          color: "#0F6E56",
          loc: "UAE-wide",
          domains: 2,
          members: 2,
          lastUsed: "Yesterday",
          files: [
            {
              name: "CPI_Methodology_2025.pdf",
              meta: "1.1 MB · Uploaded Mar 28",
              icon: "ti-file-text",
            },
          ],
          threads: [
            {
              id: "t5",
              title: "Housing CPI +4.5% YoY — drivers and outlook",
              type: "ask",
              time: "Apr 15",
              pinned: true,
            },
            {
              id: "t6",
              title: "Essential vs headline CPI divergence",
              type: "ask",
              time: "Apr 8",
              pinned: false,
            },
          ],
          memberList: [
            {
              name: "You",
              role: "Owner",
              bg: "linear-gradient(135deg,#667eea,#764ba2)",
              init: "U",
            },
            {
              name: "Prices Team",
              role: "Contributor",
              bg: "#E1F5EE",
              init: "PT",
              color: "#0F6E56",
            },
          ],
        },
        {
          id: "ad",
          code: "AD",
          name: "Al-Ain Diwan",
          desc: "Agriculture, district pulse, and regional development for Al Ain.",
          instructions:
            "Prioritise Al Ain and Al Dhafra data. Include agriculture & environment statistics where relevant.",
          bg: "#F4C0D1",
          color: "#72243E",
          loc: "Al Ain",
          domains: 3,
          members: 4,
          lastUsed: "3 days ago",
          files: [],
          threads: [
            {
              id: "t7",
              title: "Agriculture output trends Q1 2026",
              type: "ask",
              time: "Apr 5",
              pinned: false,
            },
          ],
          memberList: [
            {
              name: "You",
              role: "Owner",
              bg: "linear-gradient(135deg,#667eea,#764ba2)",
              init: "U",
            },
            {
              name: "Regional Office",
              role: "Contributor",
              bg: "#F4C0D1",
              init: "RO",
              color: "#72243E",
            },
          ],
        },
      ];
      let activeAiWsId = "el";
      let wsAiThreadFilter = "all";

      function getActiveAiWs() {
        return (
          AI_WORKSPACES.find((w) => w.id === activeAiWsId) || AI_WORKSPACES[0]
        );
      }

      function updateChatWsChip() {
        const w = getActiveAiWs();
        const av = document.getElementById("chatWsChipAv");
        const nm = document.getElementById("chatWsChipName");
        if (av) {
          av.textContent = w.code;
          av.style.background = w.bg;
          av.style.color = w.color;
        }
        if (nm) nm.textContent = w.name;
      }

      function wsAiUpdateStats() {
        const n = AI_WORKSPACES.length;
        const threads = AI_WORKSPACES.reduce((s, w) => s + w.threads.length, 0);
        const files = AI_WORKSPACES.reduce((s, w) => s + w.files.length, 0);
        const el = (id, v) => {
          const e = document.getElementById(id);
          if (e) e.textContent = v;
        };
        el("wsAiStatCount", n);
        el("wsAiStatThreads", threads);
        el("wsAiStatFiles", files);
      }

      function renderAiWorkspaceList() {
        const grid = document.getElementById("wsAiGrid");
        if (!grid) return;
        wsAiUpdateStats();
        const q = (
          document.getElementById("wsAiSearch")?.value || ""
        ).toLowerCase();
        const list = AI_WORKSPACES.filter(
          (w) =>
            !q ||
            w.name.toLowerCase().includes(q) ||
            w.desc.toLowerCase().includes(q),
        );
        grid.innerHTML =
          list
            .map(
              (w) => `
    <button type="button" class="ws-ai-card${w.id === activeAiWsId ? " active-ws-card" : ""}" onclick="openAiWorkspace('${w.id}')">
      <div class="ws-ai-card-av" style="background:${w.iconBg || w.bg};color:${w.icon ? "inherit" : w.color};font-size:${w.icon ? "22px" : "14px"};">${w.icon || w.code}</div>
      <div class="ws-ai-card-name">${w.name}</div>
      <div class="ws-ai-card-desc">${w.desc}</div>
      <div class="ws-ai-card-meta">
        <span><i class="ti ti-map-pin"></i> ${w.loc}</span>
        <span><i class="ti ti-message-circle"></i> ${w.threads.length} threads</span>
        <span><i class="ti ti-files"></i> ${w.files.length} files</span>
      </div>
      <div class="ws-ai-card-meta" style="margin-top:6px;">
        <span><i class="ti ti-clock"></i> ${w.lastUsed}</span>
        <span><i class="ti ti-users"></i> ${w.members} members</span>
      </div>
    </button>
  `,
            )
            .join("") +
          `
    <button type="button" class="ws-ai-card ws-ai-card-add" onclick="wsAiOpenCreate()">
      <i class="ti ti-plus"></i>
      <span style="font-size:14px;font-weight:600;">New workspace</span>
      <small style="font-size:11px;margin-top:4px;opacity:0.85;">Custom instructions & files</small>
    </button>`;
      }

      function wsAiFilterList() {
        renderAiWorkspaceList();
      }

      function wsAiShowList() {
        document.getElementById("wsAiListWrap")?.classList.remove("off");
        document.getElementById("wsAiDetail")?.classList.remove("on");
        document.getElementById("wsAiBreadcrumb").innerHTML =
          '<span class="current">Workspaces</span>';
        document.getElementById("wsAiTopActions").innerHTML =
          '<button class="tb-btn tb-btn-accent" onclick="wsAiOpenCreate()"><i class="ti ti-plus"></i> New workspace</button>';
        renderAiWorkspaceList();
      }

      function openAiWorkspace(id) {
        activeAiWsId = id;
        const w = getActiveAiWs();
        updateChatWsChip();
        document.getElementById("wsAiListWrap")?.classList.add("off");
        document.getElementById("wsAiDetail")?.classList.add("on");
        document.getElementById("wsAiBreadcrumb").innerHTML =
          `<a onclick="wsAiShowList()">Workspaces</a><span class="sep"><i class="ti ti-chevron-right" style="font-size:12px;"></i></span><span class="current">${w.name}</span>`;
        document.getElementById("wsAiTopActions").innerHTML =
          `<button class="tb-btn tb-btn-accent" onclick="wsAiNewThread()"><i class="ti ti-message-plus"></i> New thread</button>
     <button class="tb-btn" onclick="wsAiOpenSettings()"><i class="ti ti-settings"></i></button>`;
        const av = document.getElementById("wsAiDetailAv");
        if (av) {
          av.textContent = w.icon || w.code;
          av.style.background = w.iconBg || w.bg;
          av.style.color = w.icon ? "inherit" : w.color;
          av.style.fontSize = w.icon ? "20px" : "13px";
        }
        document.getElementById("wsAiDetailName").textContent = w.name;
        document.getElementById("wsAiDetailMeta").textContent =
          `${w.loc} · ${w.domains} domains · ${w.members} members`;
        document.getElementById("wsAiInstructions").value = w.instructions;
        renderAiWorkspaceThreads();
        renderAiWorkspaceFiles();
        renderAiWorkspaceMembers();
        toast("Opened workspace — " + w.name, "ti-layout-grid");
      }

      function renderAiWorkspaceThreads() {
        const w = getActiveAiWs();
        const el = document.getElementById("wsAiThreads");
        if (!el) return;
        let threads = w.threads;
        if (wsAiThreadFilter === "pinned")
          threads = threads.filter((t) => t.pinned);
        else if (wsAiThreadFilter === "ask")
          threads = threads.filter((t) => t.type === "ask");
        document.getElementById("wsAiThreadCount").textContent =
          threads.length + " thread" + (threads.length !== 1 ? "s" : "");
        el.innerHTML = threads.length
          ? threads
              .map(
                (t) => `
    <div class="ws-ai-thread${t.pinned ? " pinned" : ""}" onclick="wsAiOpenThread('${t.id}')">
      <i class="ti ti-message-circle" style="font-size:16px;color:var(--accent);flex-shrink:0;margin-top:2px;"></i>
      <div>
        <div class="ws-ai-thread-text">${t.title}</div>
        <div class="ws-ai-thread-meta">${t.pinned ? '<i class="ti ti-pin" style="font-size:10px;"></i> Pinned · ' : ""}${t.time}</div>
      </div>
      <button type="button" class="tb-btn" style="padding:4px 8px;" onclick="event.stopPropagation();wsAiTogglePin('${t.id}')" title="Pin">
        <i class="ti ti-pin${t.pinned ? "-filled" : ""}" style="font-size:13px;"></i>
      </button>
    </div>
  `,
              )
              .join("")
          : '<div style="font-size:13px;color:var(--text-tertiary);padding:12px 0;">No threads yet. Start a new thread in this workspace.</div>';
      }

      function renderAiWorkspaceFiles() {
        const w = getActiveAiWs();
        const el = document.getElementById("wsAiFiles");
        if (!el) return;
        el.innerHTML = w.files.length
          ? w.files
              .map(
                (f, i) => `
    <div class="ws-ai-file-row" onclick="toast('Opening ${f.name}…','ti-file')">
      <div class="ws-ai-file-ico"><i class="ti ${f.icon}"></i></div>
      <div><div class="ws-ai-file-name">${f.name}</div><div class="ws-ai-file-meta">${f.meta}</div></div>
      <button type="button" class="tb-btn" style="margin-left:auto;padding:4px;" onclick="event.stopPropagation();wsAiRemoveFile(${i})"><i class="ti ti-trash" style="font-size:13px;color:var(--danger);"></i></button>
    </div>
  `,
              )
              .join("")
          : '<div style="font-size:12px;color:var(--text-tertiary);text-align:center;padding:8px;">No files yet — upload to ground answers in this workspace.</div>';
      }

      function renderAiWorkspaceMembers() {
        const w = getActiveAiWs();
        const el = document.getElementById("wsAiMembers");
        if (!el) return;
        el.innerHTML = w.memberList
          .map(
            (m) => `
    <div class="ws-ai-member">
      <div class="ws-ai-member-av" style="background:${m.bg};${m.color ? "color:" + m.color : ""}">${m.init}</div>
      <div><div style="font-size:13px;font-weight:500;">${m.name}</div><div style="font-size:11px;color:var(--text-tertiary);">${m.role}</div></div>
    </div>
  `,
          )
          .join("");
      }

      function wsAiFilterThreads(type, el) {
        wsAiThreadFilter = type;
        el.parentElement
          .querySelectorAll(".ws-ai-thread-tab")
          .forEach((t) => t.classList.remove("active"));
        el.classList.add("active");
        renderAiWorkspaceThreads();
      }

      function wsAiTogglePin(threadId) {
        const w = getActiveAiWs();
        const t = w.threads.find((x) => x.id === threadId);
        if (t) {
          t.pinned = !t.pinned;
          renderAiWorkspaceThreads();
          toast(t.pinned ? "Thread pinned" : "Thread unpinned", "ti-pin");
        }
      }

      function wsAiOpenThread(threadId) {
        const w = getActiveAiWs();
        const t = w.threads.find((x) => x.id === threadId);
        if (!t) return;
        activeAiWsId = w.id;
        updateChatWsChip();
        const sb = document.querySelector('.sb-nav .sb-item[onclick*="chat"]');
        switchTab("chat", sb);
        document.getElementById("chatLanding").style.display = "none";
        document.getElementById("drFlow").style.display = "block";
        applyChatModeUi();
        document.getElementById("chatBreadcrumb").textContent =
          t.title.substring(0, 42) + "…";
        toast("Thread opened in " + w.name, "ti-message-circle");
      }

      function wsAiNewThread() {
        const w = getActiveAiWs();
        const sb = document.querySelector('.sb-nav .sb-item[onclick*="chat"]');
        switchTab("chat", sb);
        showChatLanding();
        document.getElementById("chatBreadcrumb").textContent =
          "New thread · " + w.name;
        toast("New thread in " + w.name, "ti-message-plus");
      }

      function switchTabFromChat() {
        const sb = document.querySelector(
          '.sb-nav .sb-item[onclick*="workspaces"]',
        );
        switchTab("workspaces", sb);
        openAiWorkspace(activeAiWsId);
      }

      const SPACE_CREATE_ICONS = [
        { e: "💼", bg: "#FDF2F8" },
        { e: "📊", bg: "#EEF2FF" },
        { e: "🏠", bg: "#ECFDF5" },
        { e: "👥", bg: "#F0F9FF" },
        { e: "🌍", bg: "#F5F3FF" },
        { e: "📈", bg: "#FFF7ED" },
        { e: "🔬", bg: "#F0FDF4" },
        { e: "🎯", bg: "#FEF2F2" },
        { e: "💡", bg: "#FFFBEB" },
        { e: "🚀", bg: "#E0E7FF" },
        { e: "🏛️", bg: "#F3F4F6" },
        { e: "📋", bg: "#FCE7F3" },
      ];
      let wsAiCreateIcon = { e: "💼", bg: "#FDF2F8" };
      let wsAiCreateStepNum = 1;

      function wsAiRenderIconGrid() {
        const grid = document.getElementById("wsAiIconGrid");
        if (!grid) return;
        grid.innerHTML =
          SPACE_CREATE_ICONS.map(
            (ic, i) =>
              `<button type="button" class="space-icon-opt${i === 0 ? " selected" : ""}" data-emoji="${ic.e}" data-bg="${ic.bg}" onclick="wsAiSelectIcon(this)" aria-label="Icon ${ic.e}">${ic.e}</button>`,
          ).join("") +
          `<button type="button" class="space-icon-opt add" onclick="toast('More icons coming soon','ti-plus')" aria-label="Add icon">+</button>`;
      }

      function wsAiSelectIcon(btn) {
        if (!btn.dataset.emoji) return;
        wsAiCreateIcon = { e: btn.dataset.emoji, bg: btn.dataset.bg };
        document
          .querySelectorAll("#wsAiIconGrid .space-icon-opt")
          .forEach((o) => o.classList.remove("selected"));
        btn.classList.add("selected");
        const prev = document.getElementById("wsAiIconPreview");
        if (prev) {
          prev.textContent = wsAiCreateIcon.e;
          prev.style.background = wsAiCreateIcon.bg;
        }
      }

      function wsAiToggleTag(el, groupId) {
        const group = document.getElementById(groupId);
        if (!group) return;
        if (groupId === "wsAiCreateLocs") {
          group
            .querySelectorAll(".space-tag")
            .forEach((t) => t.classList.remove("selected"));
          el.classList.add("selected");
        } else {
          el.classList.toggle("selected");
          if (!group.querySelector(".space-tag.selected"))
            el.classList.add("selected");
        }
      }

      function wsAiCreateGoStep(step) {
        if (step === 2) {
          const name = document.getElementById("wsAiCreateName")?.value.trim();
          if (!name) {
            toast("Add a title first", "ti-info-circle");
            return;
          }
        }
        wsAiCreateStepNum = step;
        document
          .getElementById("wsAiCreateStep1")
          ?.classList.toggle("active", step === 1);
        document
          .getElementById("wsAiCreateStep2")
          ?.classList.toggle("active", step === 2);
        document
          .querySelectorAll("#wsAiCreateDots .dot")
          .forEach((d) =>
            d.classList.toggle("active", Number(d.dataset.step) === step),
          );
        const titleEl = document.getElementById("wsAiCreateTitle");
        if (titleEl)
          titleEl.textContent =
            step === 1 ? "Create a new workspace" : "Scope & context";
        document
          .getElementById("wsAiCreateBack")
          ?.classList.toggle("hidden", step === 1);
        document
          .getElementById("wsAiCreateNext")
          ?.classList.toggle("hidden", step === 2);
        document
          .getElementById("wsAiCreateSubmit")
          ?.classList.toggle("hidden", step === 1);
        wsAiValidateCreate();
      }

      function wsAiValidateCreate() {
        const name = document.getElementById("wsAiCreateName")?.value.trim();
        const submit = document.getElementById("wsAiCreateSubmit");
        const next = document.getElementById("wsAiCreateNext");
        if (submit) submit.disabled = !name;
        if (next) next.disabled = !name;
      }

      function wsAiOpenCreate() {
        wsAiCreateStepNum = 1;
        wsAiCreateIcon = { e: "💼", bg: "#FDF2F8" };
        wsAiRenderIconGrid();
        const prev = document.getElementById("wsAiIconPreview");
        if (prev) {
          prev.textContent = "💼";
          prev.style.background = "#FDF2F8";
        }
        const nameEl = document.getElementById("wsAiCreateName");
        const descEl = document.getElementById("wsAiCreateDesc");
        const instrEl = document.getElementById("wsAiCreateInstr");
        if (nameEl) nameEl.value = "";
        if (descEl) descEl.value = "";
        if (instrEl) instrEl.value = "";
        document
          .querySelectorAll("#wsAiCreateLocs .space-tag")
          .forEach((t, i) => t.classList.toggle("selected", i === 0));
        document
          .querySelectorAll("#wsAiCreateDomains .space-tag")
          .forEach((t, i) => t.classList.toggle("selected", i === 0));
        wsAiCreateGoStep(1);
        wsAiValidateCreate();
        document.getElementById("wsAiCreateModal")?.classList.add("open");
        setTimeout(() => nameEl?.focus(), 120);
      }

      function wsAiCloseCreate(e) {
        if (e && e.target !== document.getElementById("wsAiCreateModal"))
          return;
        document.getElementById("wsAiCreateModal")?.classList.remove("open");
      }

      function wsAiSaveCreate() {
        const name = document.getElementById("wsAiCreateName")?.value.trim();
        if (!name) {
          toast("Add a title first", "ti-info-circle");
          return;
        }
        const desc =
          document.getElementById("wsAiCreateDesc")?.value.trim() ||
          "Describe what this workspace is for.";
        const instructions =
          document.getElementById("wsAiCreateInstr")?.value.trim() ||
          "Custom instructions for the agent in this workspace.";
        const locEl = document.querySelector(
          "#wsAiCreateLocs .space-tag.selected",
        );
        const loc = locEl?.dataset.value || "Abu Dhabi";
        const domainCount =
          document.querySelectorAll("#wsAiCreateDomains .space-tag.selected")
            .length || 1;
        const id = "ws" + Date.now();
        const code =
          name
            .split(/\s+/)
            .map((w) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase() || "NW";
        AI_WORKSPACES.push({
          id,
          code,
          name,
          desc,
          instructions,
          icon: wsAiCreateIcon.e,
          iconBg: wsAiCreateIcon.bg,
          bg: wsAiCreateIcon.bg,
          color: "#374151",
          loc,
          domains: domainCount,
          members: 1,
          lastUsed: "Just now",
          files: [],
          threads: [],
          memberList: [
            {
              name: "You",
              role: "Owner",
              bg: "linear-gradient(135deg,#667eea,#764ba2)",
              init: "U",
            },
          ],
        });
        wsAiCloseCreate();
        activeAiWsId = id;
        const sb = document.querySelector(
          '.sb-nav .sb-item[onclick*="workspaces"]',
        );
        switchTab("workspaces", sb);
        openAiWorkspace(id);
        toast("Workspace created", "ti-check");
      }

      function wsAiSaveInstructions() {
        const w = getActiveAiWs();
        w.instructions = document
          .getElementById("wsAiInstructions")
          .value.trim();
        toast("Instructions saved for this workspace", "ti-device-floppy");
      }

      function wsAiAddFile() {
        const w = getActiveAiWs();
        w.files.push({
          name: "New_Source_" + (w.files.length + 1) + ".pdf",
          meta: "Just uploaded",
          icon: "ti-file-text",
        });
        renderAiWorkspaceFiles();
        toast("File added to workspace", "ti-upload");
      }

      function wsAiRemoveFile(idx) {
        const w = getActiveAiWs();
        w.files.splice(idx, 1);
        renderAiWorkspaceFiles();
        toast("File removed", "ti-trash");
      }

      function wsAiInvite() {
        toast("Invite link copied — share with contributors", "ti-user-plus");
      }

      function wsAiOpenSettings() {
        toast("Workspace settings — name, privacy, and roles", "ti-settings");
      }

      /* ══ NAVIGATION ══ */
      function getActiveAiScreenEl() {
        const app = document.getElementById("s-app");
        if (app?.classList.contains("active")) return app;
        const land = document.getElementById("s-landing");
        if (land?.classList.contains("active")) return land;
        return null;
      }

      function activateAiChatTab() {
        syncSidebarActiveTab("chat");
        const app = document.getElementById("s-app");
        if (!app?.classList.contains("active")) return;
        document
          .querySelectorAll(".tab-view")
          .forEach((t) => t.classList.remove("active"));
        const chatView = document.getElementById("tv-chat");
        if (chatView) chatView.classList.add("active");
      }

      function syncSidebarActiveTab(tab) {
        const scope = getActiveAiScreenEl();
        if (!scope) return;
        scope
          .querySelectorAll(".sb-nav .sb-item[data-sb-tab]")
          .forEach((item) => {
            item.classList.toggle("active", item.dataset.sbTab === tab);
          });
      }

      function resetAiChat() {
        const thread = document.getElementById("aiChatThread");
        if (thread) thread.innerHTML = "";
        const aiResponse = document.getElementById("aiResponse");
        if (aiResponse) aiResponse.classList.add("hidden");
        const inp = document.getElementById("chatInput");
        if (inp) {
          inp.value = "";
          inp.style.height = "auto";
        }
        showChatLanding();
        syncSidebarActiveTab("chat");
        document
          .querySelectorAll(".tab-view")
          .forEach((t) => t.classList.remove("active"));
        document.getElementById("tv-chat")?.classList.add("active");
      }

      function switchTab(tab, el) {
        const app = document.getElementById("s-app");
        if (!app?.classList.contains("active")) {
          enterApp("", tab);
          return;
        }
        const currentTab = document
          .querySelector("#s-app .tab-view.active")
          ?.id?.replace("tv-", "");
        if (tab === "chat" && currentTab === "chat") {
          resetAiChat();
          return;
        }
        syncSidebarActiveTab(tab);
        document
          .querySelectorAll(".tab-view")
          .forEach((t) => t.classList.remove("active"));
        const view = document.getElementById("tv-" + tab);
        if (view) view.classList.add("active");
        if (tab === "studio") showStudioGallery();
        if (tab === "artifacts") renderArtifacts();
        if (tab === "catalogue") syncAgentCatalogueMounts();
        if (tab === "workspaces") wsAiShowList();
      }

      function toggleHist() {
        const sb = document.getElementById("histSidebar");
        const btn = document.getElementById("histReopenBtn");
        sb.classList.toggle("collapsed");
        const isCollapsed = sb.classList.contains("collapsed");
        if (btn) btn.style.display = isCollapsed ? "flex" : "none";
      }

      function toggleARP() {
        const panel = document.getElementById("aiReportsPanel");
        const btn = document.getElementById("arpToggleBtn");
        panel.classList.toggle("collapsed");
        const isCollapsed = panel.classList.contains("collapsed");
        if (btn) {
          btn.innerHTML = isCollapsed
            ? '<i class="ti ti-file-analytics"></i> AI Reports'
            : '<i class="ti ti-file-analytics"></i> AI Reports';
        }
      }

      function fillLandInput(text) {
        const ta = document.getElementById("land-input");
        ta.value = text;
        ta.focus();
        autoResize(ta);
      }

      function toggleLandHist() {
        const sb = document.getElementById("landHistSidebar");
        const btn = document.getElementById("landHistReopenBtn");
        sb.classList.toggle("collapsed");
        const isCollapsed = sb.classList.contains("collapsed");
        if (btn) btn.style.display = isCollapsed ? "flex" : "none";
      }

      function filterLandHistory(val) {
        document
          .querySelectorAll("#landHistBody .hist-item")
          .forEach((item) => {
            const match = item
              .querySelector(".hist-item-text")
              .textContent.toLowerCase()
              .includes(val.toLowerCase());
            item.style.display = match ? "" : "none";
          });
      }

      function loadLandChat(type) {
        document
          .querySelectorAll("#landHistSidebar .hist-item")
          .forEach((i) => i.classList.remove("active"));
        event.currentTarget.classList.add("active");
        const labels = {
          strategy: "Please write a strategy to incre…",
          indicators: "What are the main indicators…",
          labour: "Where can I focus on for…",
          cpi: "CPI trends in Abu Dhabi…",
          gdp: "GDP growth comparison…",
        };
        enterApp(labels[type] || type);
      }
      function showChatLanding() {
        document.getElementById("drFlow").style.display = "none";
        const drRoot = document.getElementById("drFlow");
        if (drRoot) delete drRoot.dataset.drStarted;
        setDrFlowVisible(false);
        document.getElementById("chatLanding").style.display = "flex";
        document.getElementById("chatBreadcrumb").textContent =
          "New conversation";
      }
      function newChat() {
        resetAiChat();
      }

      function chatKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMsg();
        }
      }

      function sendMsg(text) {
        const inp = document.getElementById("chatInput");
        const msg = text || inp.value.trim();
        if (!msg) return;
        inp.value = "";
        inp.style.height = "auto";
        const mode = getActiveChatMode();
        const drRoot = document.getElementById("drFlow");
        document.getElementById("chatLanding").style.display = "none";
        if (drRoot) drRoot.style.display = "block";
        const bc = document.getElementById("chatBreadcrumb");
        if (bc) bc.textContent = msg.substring(0, 42) + "…";
        setUserChatBubble(msg);
        if (mode === "deep-research" && drRoot) {
          drRoot.dataset.drStarted = "true";
        } else if (drRoot) {
          delete drRoot.dataset.drStarted;
        }
        applyChatModeUi();
        scrollChat();
        toast(
          mode === "deep-research"
            ? "Message sent — Deep Research initiated"
            : "Message sent",
          mode === "deep-research" ? "ti-telescope" : "ti-send",
        );
      }

      function startDeepResearch() {
        const inp = document.getElementById("chatInput");
        const deepOpt = document.querySelector(
          '#tv-chat .land-mode-option[data-mode="deep-research"]',
        );
        if (deepOpt) selectLandMode(deepOpt);
        if (inp.value.trim()) sendMsg();
        else
          toast("Type a query first to start Deep Research", "ti-info-circle");
      }

      function scrollChat() {
        const s = document.getElementById("chatScroll");
        setTimeout(() => (s.scrollTop = s.scrollHeight), 100);
      }

      /* ══ AI CHAT UI ══ */
      const AI_CHAT_THUMB = "assets/ai-chat-thumb.svg";

      function getLandingMode() {
        const active = document.querySelector(
          "#s-landing .land-mode-option.active",
        );
        return active?.dataset.mode || "deep-research";
      }

      function syncLandModeToChatDropdown() {
        const chatDropdown = document.querySelector(
          "#tv-chat .bai-input-area .land-mode-dropdown",
        );
        if (!chatDropdown) return;
        const option = chatDropdown.querySelector(
          `.land-mode-option[data-mode="${getLandingMode()}"]`,
        );
        if (option) setLandModeDropdownState(chatDropdown, option);
      }

      function getActiveChatMode() {
        const active = document.querySelector(
          "#tv-chat .bai-input-area .land-mode-option.active",
        );
        return active?.dataset.mode || "deep-research";
      }

      function isDeepResearchMode() {
        return getActiveChatMode() === "deep-research";
      }

      function hasChatUserPrompt() {
        const bubble = document.querySelector(
          "#aiChatThread .msg-user-bubble",
        );
        return !!(bubble && bubble.textContent.trim());
      }

      function shouldShowDrFlow() {
        const root = document.getElementById("drFlow");
        if (!root || root.style.display === "none") return false;
        if (!isDeepResearchMode()) return false;
        if (!hasChatUserPrompt()) return false;
        return root.dataset.drStarted === "true";
      }

      function applyChatModeUi() {
        syncDrFlowVisibility();
        const aiResponse = document.getElementById("aiResponse");
        if (!aiResponse || !hasChatUserPrompt()) return;
        if (shouldShowDrFlow()) {
          aiResponse.classList.add("hidden");
        } else if (!isDeepResearchMode()) {
          aiResponse.classList.remove("hidden");
        }
      }

      function onChatModeChanged(mode) {
        const drRoot = document.getElementById("drFlow");
        if (!drRoot || drRoot.style.display === "none" || !hasChatUserPrompt()) {
          applyChatModeUi();
          return;
        }
        if (mode === "deep-research") {
          drRoot.dataset.drStarted = "true";
        } else {
          delete drRoot.dataset.drStarted;
        }
        applyChatModeUi();
      }

      function syncDrFlowVisibility() {
        setDrFlowVisible(shouldShowDrFlow());
      }

      function setDrFlowVisible(visible) {
        const el = document.getElementById("drStepsContainer");
        if (!el) return;
        el.classList.toggle("hidden", !visible);
      }

      function setUserChatBubble(text) {
        const bubble = document.querySelector(
          "#aiChatThread .msg-user-bubble",
        );
        if (bubble) bubble.textContent = text;
      }

      function buildAiMsgCard(innerHtml, embed) {
        const innerCls = embed
          ? "msg-ai-card-inner msg-ai-card-inner--embed"
          : "msg-ai-card-inner";
        return `<div class="ai-chat-msg">
  <div class="msg-ai-card">
    <img class="msg-ai-avatar" src="${AI_CHAT_THUMB}" alt="Bayaan AI" width="36" height="36" />
    <div class="${innerCls}">${innerHtml}</div>
  </div>
</div>`;
      }

      function showPrimaryAiResponse() {
        const el = document.getElementById("aiResponse");
        if (el) el.classList.remove("hidden");
        scrollChat();
      }

      function getDataCardBodyHtml(tab, chartSuffix) {
        if (tab === "sql") return renderSQL();
        if (tab === "table") return renderDataTable();
        return renderViz(chartSuffix);
      }

      let chartSeq = 0;

      function showInlineDataCardFromChip(chip, tab) {
        const msgAi = chip.closest(".msg-ai");
        if (!msgAi || !tab) return;

        const actions = chip.closest(".msg-actions");
        actions?.querySelectorAll(".action-chip").forEach((c) => {
          c.classList.toggle("active-chip", c === chip);
        });

        let host = msgAi.querySelector(".msg-ai-dc-host");
        if (!host) {
          host = document.createElement("div");
          host.className = "msg-ai-dc-host";
          actions.insertAdjacentElement("afterend", host);
        }

        let suffix = host.dataset.chartSuffix || "";
        if (suffix) destroyPanelCharts(Number(suffix));

        if (tab === "viz") {
          if (!suffix) {
            chartSeq += 1;
            suffix = String(chartSeq);
            host.dataset.chartSuffix = suffix;
          }
        }

        host.dataset.activeTab = tab;
        host.innerHTML = `<div class="dc-body">${getDataCardBodyHtml(tab, tab === "viz" ? Number(suffix) : null)}</div>`;

        if (tab === "viz") {
          setTimeout(() => renderChartsInPanel(host, Number(suffix)), 100);
        }
        scrollChat();
      }

      function destroyPanelCharts(suffix) {
        if (suffix == null || suffix === "") return;
        const s = "-" + suffix;
        ["sector", "donut", "line"].forEach((prefix) => {
          const key = prefix + s;
          if (chartInst[key]) {
            chartInst[key].destroy();
            delete chartInst[key];
          }
        });
      }

      function expandSources(el) {
        const row = el.parentElement;
        if (!row) return;
        [
          { icon: "ti-chart-line", label: "Labour Force Q4" },
          { icon: "ti-database", label: "Population 2024" },
          { icon: "ti-table", label: "Tourism Revenue" },
          { icon: "ti-file-analytics", label: "CPI Index 2024" },
        ].forEach((s) => {
          const tag = document.createElement("div");
          tag.className = "source-tag";
          tag.innerHTML = `<i class="ti ${s.icon}"></i> ${s.label}`;
          row.insertBefore(tag, el);
        });
        el.remove();
      }

      function initAiChatUi() {
        applyChatModeUi();
      }

      window.showInlineDataCardFromChip = showInlineDataCardFromChip;
      window.expandSources = expandSources;

      /* ══ DEEP RESEARCH FLOW ══ */
      function selectOpt(el) {
        el.parentElement
          .querySelectorAll(".clarify-opt")
          .forEach((o) => o.classList.remove("selected"));
        el.classList.add("selected");
      }

      const clarifyQuestions = [
        {
          q: "Which country benchmarks would you like for comparison?",
          opts: ["Spain", "France", "Thailand", "All three"],
        },
        {
          q: "What time period should the analysis cover?",
          opts: ["2019–2023", "2020–2024", "Last 5 years", "All available"],
        },
        {
          q: "Which GDP metric should be the focus?",
          opts: [
            "Tourism GDP contribution %",
            "Absolute tourism revenue",
            "GDP growth rate",
            "All metrics",
          ],
        },
        {
          q: "What level of detail do you need for policies?",
          opts: [
            "High level overview",
            "Detailed policy breakdown",
            "Case studies",
            "All of the above",
          ],
        },
      ];

      function nextClarify() {
        clarifyCount++;
        if (clarifyCount >= clarifyQuestions.length) {
          showPlan();
          return;
        }
        const q = clarifyQuestions[clarifyCount];
        document.querySelector(".clarify-q-num").textContent =
          `Question ${clarifyCount + 1}/${clarifyQuestions.length + 3}`;
        document.querySelector(".clarify-q").textContent = q.q;
        const optsEl = document.getElementById("clarifyOpts");
        optsEl.innerHTML = q.opts
          .map(
            (o) =>
              `<div class="clarify-opt" onclick="selectOpt(this)"><div class="clarify-radio"></div> ${o}</div>`,
          )
          .join("");
        scrollChat();
      }

      function showPlan() {
        document.getElementById("clarifyCard").style.display = "none";
        const planDot = document.getElementById("planDot");
        planDot.className = "dr-step-dot active";
        planDot.innerHTML = '<i class="ti ti-check"></i>';
        document.getElementById("planTitle").style.color = "var(--accent)";
        document.getElementById("planCard").classList.remove("hidden");
        scrollChat();
      }

      function approvePlan() {
        document.getElementById("planCard").classList.add("hidden");
        const pd = document.getElementById("planDot");
        pd.className = "dr-step-dot done";
        pd.innerHTML = '<i class="ti ti-check"></i>';
        const ad = document.getElementById("approvalDot");
        ad.className = "dr-step-dot done";
        ad.innerHTML = '<i class="ti ti-check"></i>';
        document.getElementById("approvalTitle").style.color =
          "var(--text-primary)";
        const rd = document.getElementById("researchDot");
        rd.className = "dr-step-dot active";
        rd.innerHTML =
          '<i class="ti ti-loader" style="font-size:11px;animation:spin 1s linear infinite;"></i>';
        document.getElementById("researchTitle").style.color = "var(--accent)";
        document.getElementById("researchCard").classList.remove("hidden");
        scrollChat();
        setTimeout(() => completeResearch(), 3500);
      }

      function completeResearch() {
        const rd = document.getElementById("researchDot");
        rd.className = "dr-step-dot done";
        rd.innerHTML = '<i class="ti ti-check"></i>';
        document.getElementById("synthDot").className = "dr-step-dot done";
        document.getElementById("synthDot").innerHTML =
          '<i class="ti ti-check"></i>';
        document.getElementById("doneDot").className = "dr-step-dot done";
        document.getElementById("doneDot").innerHTML =
          '<i class="ti ti-check"></i>';
        markAllRrItemsDone("#researchCard");
        showPrimaryAiResponse();
        scrollChat();
        toast("Deep Research complete — results ready", "ti-check");
      }

      function loadChat(type) {
        document
          .querySelectorAll(".hist-item")
          .forEach((i) => i.classList.remove("active"));
        event.currentTarget.classList.add("active");
        document.getElementById("chatBreadcrumb").textContent =
          type === "indicators"
            ? "What are the main indicators…"
            : "Where can I focus on for…";
        document.getElementById("chatLanding").style.display = "none";
        const drRoot = document.getElementById("drFlow");
        if (drRoot) drRoot.style.display = "block";
        applyChatModeUi();
        toast("Conversation loaded", "ti-message-circle");
      }

      function cancelDeepResearch() {
        showChatLanding();
        toast("Deep Research cancelled", "ti-x");
      }
      function voteMsg(btn, dir) {
        const row = btn.closest("div");
        row
          .querySelectorAll(
            '.thumb-btn[title="Helpful"],.thumb-btn[title="Not helpful"]',
          )
          .forEach((b) => b.classList.remove("voted"));
        btn.classList.add("voted");
        toast(
          dir === "up"
            ? "Marked as helpful — thank you!"
            : "Feedback noted — we'll improve",
          "ti-" + (dir === "up" ? "thumb-up" : "thumb-down"),
        );
      }
      function renderSQL() {
        return `<div class="sql-view">
  <div class="sql-label">SQL Query</div>
  <div class="sql-block">
    <pre><span class="kw">SELECT</span> year, gdp_current, gdp_real
<span class="kw">FROM</span>   gdp_annual
<span class="kw">WHERE</span>  emirate = <span class="str">'Abu Dhabi'</span>
<span class="kw">ORDER BY</span> year <span class="fn">DESC</span></pre>
    <button class="copy-btn" onclick="toast('Query copied','ti-copy')"><i class="ti ti-copy" style="font-size:12px;"></i> Copy</button>
  </div>
  <div class="sql-desc">This query retrieves data from the official statistics database. You can use this query in your own analysis tools.</div>
</div>`;
      }
      function renderDataTable() {
        return `<div>
  <div class="dt-toolbar">
    <div class="dt-search"><i class="ti ti-search"></i><input type="text" placeholder="Search…"></div>
    <button class="dt-action-btn" onclick="toast('All rows copied','ti-copy')"><i class="ti ti-copy"></i> Copy All</button>
    <button class="dt-action-btn accent" onclick="toast('CSV exported','ti-download')"><i class="ti ti-download"></i> Export CSV</button>
  </div>
  <table class="data-table">
    <thead><tr><th>Year</th><th>Current</th><th>GDP Real</th><th>Growth</th></tr></thead>
    <tbody>
      <tr><td>2024</td><td>945,200</td><td>1,168,900</td><td class="td-green">6.5%</td></tr>
      <tr><td>2023</td><td>912,650</td><td>1,125,680</td><td class="td-red">-2.7%</td></tr>
      <tr><td>2022</td><td>949,110</td><td>1,089,450</td><td class="td-green">15.1%</td></tr>
      <tr><td>2021</td><td>888,340</td><td>1,129,450</td><td class="td-red">-3.1%</td></tr>
      <tr><td>2020</td><td>901,720</td><td>1,200,000</td><td class="td-green">8.3%</td></tr>
      <tr><td>2019</td><td>800,410</td><td>1,175,600</td><td class="td-green">1.2%</td></tr>
      <tr><td>2018</td><td>912,410</td><td>1,300,000</td><td class="td-green">1.5%</td></tr>
    </tbody>
  </table>
  <div class="dc-footer">
    <span class="dc-footer-text">Showing 7 of 10 rows</span>
    <span class="load-more">Load more rows</span>
  </div>
</div>`;
      }
      function renderViz(suffix) {
        const s = suffix != null ? "-" + suffix : "";
        return `<div class="viz-view">
  <div class="viz-tabs-row">
    <div class="viz-sub-tab">Daily</div>
    <div class="viz-sub-tab active">Monthly</div>
    <div class="viz-sub-tab">Monthly</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:12px;">
      <div style="font-size:11px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">Economic Sector Performance</div>
      <div class="chart-container" style="height:160px;"><canvas class="chart-canvas" id="sectorChart${s}"></canvas></div>
    </div>
    <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:12px;">
      <div style="font-size:11px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">Sector Contribution Overview</div>
      <div class="chart-container" style="height:160px;"><canvas class="chart-canvas" id="donutChart${s}"></canvas></div>
    </div>
  </div>
  <div style="background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:12px;">
    <div style="font-size:11px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;">GDP Growth Trajectory</div>
    <div class="chart-container"><canvas class="chart-canvas" id="lineChart${s}"></canvas></div>
  </div>
</div>`;
      }

      function renderChartsInPanel(root, suffix) {
        const s = suffix != null ? "-" + suffix : "";
        const bc = root.querySelector("#sectorChart" + s);
        const sk = "sector" + s;
        if (bc && !chartInst[sk]) {
          chartInst[sk] = new Chart(bc, {
            type: "bar",
            data: {
              labels: [
                "Oil & Gas",
                "Financial",
                "Real Estate",
                "Manufacturing",
                "Others",
              ],
              datasets: [
                {
                  data: [43.7, 25.6, 20.6, 4.0, 25.7],
                  backgroundColor: [
                    "#4F6BF5",
                    "#6B84F7",
                    "#8B9EF9",
                    "#A8B6FB",
                    "#C5CEFD",
                  ],
                  borderRadius: 6,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "#fff",
                  titleColor: "#1A1D2E",
                  bodyColor: "#6B7280",
                  borderColor: "#E8EAF0",
                  borderWidth: 1,
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 10 }, color: "#9CA3AF" },
                },
                y: {
                  grid: { color: "rgba(79, 107, 245, 0.08)" },
                  ticks: { font: { size: 10 }, color: "#9CA3AF" },
                },
              },
            },
          });
        }
        const dc = root.querySelector("#donutChart" + s);
        const dk = "donut" + s;
        if (dc && !chartInst[dk]) {
          chartInst[dk] = new Chart(dc, {
            type: "doughnut",
            data: {
              labels: ["Single Dom", "Cross Dom", "Normal Talk"],
              datasets: [
                {
                  data: [45, 35, 20],
                  backgroundColor: ["#0F766E", "#14B8A6", "#5EEAD4"],
                  borderWidth: 0,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                  labels: {
                    font: { size: 11 },
                    color: "#6B7280",
                    boxWidth: 10,
                    padding: 12,
                  },
                },
                tooltip: {
                  backgroundColor: "#fff",
                  titleColor: "#1A1D2E",
                  bodyColor: "#6B7280",
                  borderColor: "#E8EAF0",
                  borderWidth: 1,
                },
              },
            },
          });
        }
        const lc = root.querySelector("#lineChart" + s);
        const lk = "line" + s;
        if (lc && !chartInst[lk]) {
          chartInst[lk] = new Chart(lc, {
            type: "line",
            data: {
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              datasets: [
                {
                  data: [
                    1800, 1900, 1750, 1600, 1850, 2000, 2100, 2200, 2300,
                    2400, 2350, 2450,
                  ],
                  borderColor: "#B45309",
                  borderWidth: 2,
                  fill: true,
                  backgroundColor: "rgba(180, 83, 9, 0.08)",
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "#B45309",
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  mode: "index",
                  intersect: false,
                  backgroundColor: "#1E1E2E",
                  titleColor: "#CDD6F4",
                  bodyColor: "#A6B0CF",
                  borderColor: "#313244",
                  borderWidth: 1,
                  callbacks: {
                    label: (c) => `  ${c.parsed.y.toLocaleString()}`,
                  },
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { font: { size: 10 }, color: "#9CA3AF" },
                },
                y: {
                  grid: { color: "rgba(180, 83, 9, 0.08)" },
                  ticks: { font: { size: 10 }, color: "#9CA3AF" },
                },
              },
            },
          });
        }
      }

      /* ══ REPORTS ══ */
      function openCreateReports() {
        document.getElementById("crModal").classList.add("open");
      }
      function closeCR(e) {
        if (!e || e.target === document.getElementById("crModal"))
          document.getElementById("crModal").classList.remove("open");
      }
      function openBriefingDoc(type) {
        document.getElementById("crModal").classList.remove("open");
        document.getElementById("bdSelected").textContent = type;
        document.getElementById("bdModal").classList.add("open");
      }
      function closeBD(e) {
        if (!e || e.target === document.getElementById("bdModal"))
          document.getElementById("bdModal").classList.remove("open");
      }
      function createReport() {
        document.getElementById("bdModal").classList.remove("open");
        toast("Report created and added to AI Reports", "ti-file-analytics");
      }

      /* ══ ARTIFACTS ══ */
      const ARTS = [
        {
          type: "report",
          name: "Abu Dhabi GDP Q1 2026",
          date: "Apr 15, 2026",
          tags: ["Economy", "GDP"],
          ico: "ti-file-analytics",
          bg: "#EEF0FF",
          co: "#4F63FF",
        },
        {
          type: "dashboard",
          name: "CPI Observatory Dashboard",
          date: "Apr 12, 2026",
          tags: ["CPI", "Inflation"],
          ico: "ti-layout-dashboard",
          bg: "#F0FDF4",
          co: "#10B981",
        },
        {
          type: "audio",
          name: "Economy Deep Dive · Ep. 12",
          date: "Apr 10, 2026",
          tags: ["Podcast"],
          ico: "ti-headphones",
          bg: "#EEF0FF",
          co: "#4F63FF",
        },
        {
          type: "presentation",
          name: "Vision 2030 Progress Deck",
          date: "Apr 8, 2026",
          tags: ["Strategy"],
          ico: "ti-presentation",
          bg: "#FFFBEB",
          co: "#F59E0B",
        },
        {
          type: "dataset",
          name: "Labour Market Q1 2026",
          date: "Apr 5, 2026",
          tags: ["Labour"],
          ico: "ti-database",
          bg: "#FFF1F2",
          co: "#EF4444",
        },
        {
          type: "report",
          name: "Emiratisation Analysis Report",
          date: "Apr 3, 2026",
          tags: ["Labour", "Policy"],
          ico: "ti-file-text",
          bg: "#EEF0FF",
          co: "#4F63FF",
        },
        {
          type: "dashboard",
          name: "Construction Cost Index",
          date: "Mar 28, 2026",
          tags: ["Construction"],
          ico: "ti-layout-dashboard",
          bg: "#F0FDF4",
          co: "#10B981",
        },
        {
          type: "audio",
          name: "CPI Weekly Briefing · Ep. 8",
          date: "Mar 25, 2026",
          tags: ["CPI", "Podcast"],
          ico: "ti-headphones",
          bg: "#EEF0FF",
          co: "#4F63FF",
        },
      ];
      const AG_CATALOGUE_AGENTS = [
        {
          id: "policy-brief-generator",
          color: "purple",
          icon: "ti-file-description",
          name: "Policy Brief Generator",
          domain: "Multi-domain",
          badge: { cls: "published", icon: "ti-world", label: "Library" },
          desc: "Drafts structured policy briefs from observatory data. Supports multiple domains and customisable output templates.",
          usedIn: ["Research Lab", "Executive briefings", "Policy desk"],
          stats: [
            { val: "47", lbl: "Users" },
            { val: "4.8", lbl: "Rating" },
          ],
          author: "Analytics Team",
        },
        {
          id: "construction-cost-tracker",
          color: "teal",
          icon: "ti-building",
          name: "Construction Cost Tracker",
          domain: "Construction",
          badge: { cls: "published", icon: "ti-world", label: "Library" },
          desc: "Monitors construction cost indices, flags unusual movements, and benchmarks against regional data.",
          usedIn: [
            "Construction observatory",
            "Cost dashboards",
            "Weekly monitoring",
          ],
          stats: [
            { val: "29", lbl: "Users" },
            { val: "4.5", lbl: "Rating" },
          ],
          author: "SCAD Analytics",
        },
      ];

      function renderAgentCardHtml(agent) {
        const statsHtml = (agent.stats || [])
          .map(
            (s) =>
              `<div class="ac-stat"><div class="ac-stat-val">${s.val}</div><div class="ac-stat-lbl">${s.lbl}</div></div>`,
          )
          .join("");
        const usedInHtml = (agent.usedIn || [])
          .map((u) => `<span class="ac-used-tag">${u}</span>`)
          .join("");
        const badge = agent.badge;
        return `
    <div class="agent-card color-${agent.color}">
      <div class="ac-head">
        <div class="ac-icon ${agent.color}"><i class="ti ${agent.icon}"></i></div>
        <div class="ac-meta">
          <div class="ac-name">${agent.name}</div>
          <div class="ac-domain">${agent.domain}</div>
        </div>
        ${
          badge
            ? `<span class="ac-badge ${badge.cls}"><i class="ti ${badge.icon}"></i> ${badge.label}</span>`
            : ""
        }
      </div>
      <div class="ac-desc">${agent.desc}</div>
      ${
        usedInHtml
          ? `<div class="ac-used-in"><span class="ac-used-label"><i class="ti ti-map-pin"></i> Used in</span><div class="ac-used-tags">${usedInHtml}</div></div>`
          : ""
      }
      <div class="ac-stats">${statsHtml}</div>
      <div class="ac-footer">
        <div class="ac-last"><i class="ti ti-user"></i> By ${agent.author}</div>
        <div class="ac-actions">
          <button class="ag-btn ag-btn-primary ag-btn-xs" onclick="event.stopPropagation(); openAgentWorkspace()">Use this agent</button>
        </div>
      </div>
    </div>`;
      }

      function renderAgentCatalogueSection() {
        const n = AG_CATALOGUE_AGENTS.length;
        return `
    <div class="ag-section-label">Published by the community (${n})</div>
    <div class="agents-grid">${AG_CATALOGUE_AGENTS.map(renderAgentCardHtml).join("")}</div>`;
      }

      function syncAgentCatalogueMounts() {
        const html = renderAgentCatalogueSection();
        document.querySelectorAll("[data-agent-catalogue-mount]").forEach((el) => {
          el.innerHTML = html;
        });
      }
      window.syncAgentCatalogueMounts = syncAgentCatalogueMounts;

      function filterArt(type, el) {
        document
          .querySelectorAll(".art-filter")
          .forEach((f) => f.classList.remove("active"));
        el.classList.add("active");
        renderArtifacts(type);
      }
      function renderArtifacts(type = "all") {
        const g = document.getElementById("artGrid");
        if (!g) return;
        if (type === "agents") {
          g.className = "art-grid art-grid--agents";
          g.innerHTML = renderAgentCatalogueSection();
          return;
        }
        g.className = "art-grid";
        const list =
          type === "all" ? ARTS : ARTS.filter((a) => a.type === type);
        g.innerHTML = list
          .map(
            (a) => `
    <div class="art-card" onclick="toast('Opening ${a.name}…','ti-external-link')">
      <div class="art-thumb" style="background:${a.bg};"><i class="ti ${a.ico}" style="color:${a.co};font-size:32px;"></i></div>
      <div class="art-info">
        <div class="art-name">${a.name}</div>
        <div class="art-meta">${a.date}</div>
        <div class="art-tags">${a.tags.map((t) => `<span class="art-tag">${t}</span>`).join("")}</div>
        <div class="art-card-actions">
          <button class="art-card-btn">View</button>
          <button class="art-card-btn" onclick="event.stopPropagation();toast('Downloaded','ti-download')">Download</button>
        </div>
      </div>
    </div>`,
          )
          .join("");
      }

      /* ═══ COMMON TOPNAV (home header on all main workspace screens) ═══ */
      const COMMON_TOPNAV_SCREENS = [
        "screen-home",
        "screen-manage",
        "screen-editor",
        "screen-products",
        "screen-observatories",
        "screen-geo-view",
        "screen-govdata",
        "screen-indicator-detail",
        "screen-cpi-obs",
        "screen-crisis-obs",
        "screen-bayaan-search",
      ];

      function getCommonTopnavInnerHTML() {
        return `<a class="nav-logo" href="#" onclick="goTo('screen-home'); return false;">
      <img src="assets/bayaan-logo.svg" alt="Bayaan" class="logo-img">
    </a>
    <div class="nav-links">
      <a class="nav-link" data-nav="home" href="#" onclick="goTo('screen-home'); return false;" style="cursor:pointer;"><i class="ti ti-home"></i> Home</a>
      <a class="nav-link" data-nav="observatories" onclick="openObservatories(event)" style="cursor:pointer;"><i class="ti ti-binoculars"></i> Observatory</a>
      <a class="nav-link" data-nav="products" onclick="openProducts(event)" style="cursor:pointer;"><i class="ti ti-list"></i> Products</a>
      <a class="nav-link" data-nav="bayaan-studio" onclick="openBayaanStudio(event)" style="cursor:pointer;"><i class="ti ti-apps"></i> Bayaan Studio</a>
      <a class="nav-link" data-nav="geo" onclick="openGeoView(event)" style="cursor:pointer;"><i class="ti ti-world"></i> Geo View</a>
      <a class="nav-link" data-nav="govdata" onclick="goTo('screen-govdata'); initGovDataCharts();" style="cursor:pointer;"><i class="ti ti-building-bank"></i> Entity Zone</a>
    </div>
    <div class="nav-right">
      <span class="nav-search-reveal">
        <button type="button" class="nav-search-btn" title="Search" onclick="onHeaderSearchClick()"><img src="assets/ai-search-icon.svg" alt="Search"></button>
      </span>
      <span class="nav-right-divider" aria-hidden="true"></span>
      <div class="nav-user" onclick="openPersonaDrp()" role="button" tabindex="0" title="Switch persona">
        <span class="nav-user-name">Hi, Muhammed</span>
        <div class="nav-avatar" title="My profile">MM</div>
      </div>
      <button type="button" class="nav-settings-btn " title="Settings" onclick="onHeaderSettingsClick()"><i class="ti ti-settings"></i></button>
    </div>`;
      }

      function getScreenHeaderRoot(screenId) {
        const screen = document.getElementById(screenId);
        if (!screen) return null;
        if (screenId === "screen-indicator-detail") {
          return screen.querySelector(".ind-root") || screen;
        }
        return screen;
      }

      function getScreenTopnavOuter(screenId) {
        const root = getScreenHeaderRoot(screenId);
        return root
          ? root.querySelector(":scope > .topnav-outer") ||
              root.querySelector(".topnav-outer")
          : null;
      }

      function getScreenTopnav(screenId) {
        const root = getScreenHeaderRoot(screenId);
        if (!root) return null;
        return (
          root.querySelector(".topnav-outer .topnav") ||
          root.querySelector(":scope > .topnav") ||
          root.querySelector(".topnav")
        );
      }

      function ensureTopnavStructure(screenId) {
        const root = getScreenHeaderRoot(screenId);
        if (!root || root.querySelector(".topnav-outer")) return;
        const nav =
          root.querySelector(":scope > .topnav") ||
          root.querySelector(".topnav");
        if (!nav) return;
        const outer = document.createElement("div");
        outer.className = "topnav-outer";
        const container = document.createElement("div");
        container.className = "container";
        nav.parentNode.insertBefore(outer, nav);
        outer.appendChild(container);
        container.appendChild(nav);
        if (!nav.getAttribute("aria-label"))
          nav.setAttribute("aria-label", "Main navigation");
      }

      function initCommonTopnav() {
        COMMON_TOPNAV_SCREENS.forEach((id) => {
          ensureTopnavStructure(id);
          const nav = getScreenTopnav(id);
          if (nav) nav.innerHTML = getCommonTopnavInnerHTML();
        });
      }
      window.initCommonTopnav = initCommonTopnav;

      const TOPNAV_ACTIVE_MAP = {
        "screen-home": "home",
        "screen-products": "products",
        "screen-observatories": "observatories",
        "screen-geo-view": "geo",
        "screen-govdata": "govdata",
        "screen-indicator-detail": "products",
        "screen-cpi-obs": "observatories",
        "screen-crisis-obs": "observatories",
        "bayaan-studio": "bayaan-studio",
      };

      function syncTopnavActive(screenId) {
        const active = TOPNAV_ACTIVE_MAP[screenId] || "";
        document
          .querySelectorAll(".topnav .nav-link[data-nav]")
          .forEach((link) => {
            link.classList.toggle("active", link.dataset.nav === active);
          });
      }
      window.syncTopnavActive = syncTopnavActive;

      function onHeaderSettingsClick() {
        const headOuter = document.querySelector(".settings-menu");
        headOuter.classList.toggle("hide-settings");
        console.log(headOuter);
      }
      window.onHeaderSettingsClick = onHeaderSettingsClick;

      const COMMON_FOOTER_HTML = `<div class="footer common-app-footer">
  <div class="container">
    <div class="footer-inner">
      
      
      <div class="footer-nav">
        <div class="footer-nav-row">
          <img src="assets/scad-footer-logo.png" alt="Statistics Centre Abu Dhabi" class="footer-logo" style="margin-right:auto">
          <a class="footer-link" href="#">Raise a Complaint</a>
          <a class="footer-link" href="#">About us</a>
          <a class="footer-link" href="#">Product</a>
          <a class="footer-link" href="#">Contact</a>
          <a class="footer-link" href="#">Glossary</a>
        </div>
        <div class="footer-nav-divider"></div>
        <div class="footer-nav-row">
          <p class="footer-copy" style="margin-right: auto">Copyright © 2026 Statistics Center Abu Dhabi. All Rights Reserved.</p>
          <a class="footer-link" href="#">Terms and conditions</a>
          <a class="footer-link" href="#">Privacy policy</a>
        </div>
      </div>
    </div>
  </div>
</div>`;

      const COMMON_FOOTER_TARGETS = [
        { screen: "screen-products", selector: ".prod-page-footer" },
        { screen: "screen-observatories", selector: ".obs-page-footer" },
        { screen: "screen-geo-view", selector: ".geo-footer" },
        { screen: "screen-govdata", selector: ".footer" },
      ];

      function initCommonFooter() {
        const homeFooter = document.querySelector("#screen-home .footer");
        if (homeFooter && !homeFooter.classList.contains("common-app-footer")) {
          homeFooter.classList.add("common-app-footer");
        }
        COMMON_FOOTER_TARGETS.forEach(({ screen, selector }) => {
          const old = document.querySelector(`#${screen} ${selector}`);
          if (!old || old.dataset.commonFooter) return;
          const wrap = document.createElement("div");
          wrap.innerHTML = COMMON_FOOTER_HTML;
          const footer = wrap.firstElementChild;
          footer.dataset.commonFooter = "1";
          old.replaceWith(footer);
        });
      }
      window.initCommonFooter = initCommonFooter;

      function bootWorkspaceChrome() {
        initCommonTopnav();
        initHeaderSearchPanels();
        initCommonFooter();
        const active = document.querySelector(".ws-screen.active");
        syncTopnavActive(active ? active.id : "screen-home");
      }
      window.bootWorkspaceChrome = bootWorkspaceChrome;

      /* ═══ HEADER SEARCH PANEL (all pages except Home) ═══ */
      const HEADER_SEARCH_PANEL_HTML = `<div class="header-search-panel" aria-hidden="true">
  <div class="header-search-panel-inner">
    <div class="search-bar">
      <div class="search-bar-top">
        <span class="search-bar-sparkle" aria-hidden="true"><i class="ti ti-sparkles"></i></span>
        <input type="text" class="search-bar-input header-search-panel-input"
          onkeydown="if(event.key==='Enter'){openBayaanSearchFromHeaderPanel(event);}"
          placeholder='Ask anything - "Compare CPI with GCC peers", "Run a +2% inflation scenario", "Draft a brief on housing affordability"...'>
      </div>
      <div class="search-bar-actions">
        <button type="button" class="ai-mode-btn" onclick="enterAIMode()">
          <i class="ti ti-sparkles"></i> AI Mode
        </button>
        <div class="search-bar-actions-right">
          <button type="button" class="search-mic" title="Voice input"><i class="ti ti-microphone"></i></button>
          <button type="button" class="search-send" title="Send" onclick="openBayaanSearchFromHeaderPanel(event)"><i class="ti ti-arrow-up"></i></button>
        </div>
      </div>
    </div>
  </div>
</div>`;

      function getHeaderSearchScreen() {
        const screen = document.querySelector(".ws-screen.active");
        if (!screen) return null;
        if (
          screen.id === "screen-home" &&
          !screen.classList.contains("header-scrolled")
        )
          return null;
        return screen;
      }

      function initHeaderSearchPanels() {
        COMMON_TOPNAV_SCREENS.forEach((id) => {
          const screen = document.getElementById(id);
          if (!screen || screen.querySelector(".header-search-panel")) return;
          const outer = getScreenTopnavOuter(id);
          if (outer)
            outer.insertAdjacentHTML("afterend", HEADER_SEARCH_PANEL_HTML);
        });
      }

      function closeHeaderSearchPanel() {
        document
          .querySelectorAll(".ws-screen.header-search-open")
          .forEach((screen) => {
            screen.classList.remove("header-search-open");
            const panel = screen.querySelector(".header-search-panel");
            if (panel) {
              panel.classList.remove("open");
              panel.setAttribute("aria-hidden", "true");
            }
          });
      }
      window.closeHeaderSearchPanel = closeHeaderSearchPanel;

      function toggleHeaderSearchPanel() {
        const screen = getHeaderSearchScreen();
        if (!screen) return;
        const panel = screen.querySelector(".header-search-panel");
        if (!panel) return;
        const willOpen = !panel.classList.contains("open");
        if (willOpen) {
          closeHeaderSearchPanel();
          panel.classList.add("open");
          panel.setAttribute("aria-hidden", "false");
          screen.classList.add("header-search-open");
          const panelInput = screen.querySelector(".header-search-panel-input");
          requestAnimationFrame(() => panelInput?.focus());
        } else {
          closeHeaderSearchPanel();
        }
      }

      function openBayaanSearchFromHeaderPanel(e) {
        if (e) e.preventDefault();
        const screen = getHeaderSearchScreen();
        const panelInput =
          screen && screen.querySelector(".header-search-panel-input");
        const q = (panelInput && panelInput.value.trim()) || "";
        closeHeaderSearchPanel();
        if (typeof openBayaanSearch === "function")
          openBayaanSearch(q || undefined);
      }
      window.openBayaanSearchFromHeaderPanel = openBayaanSearchFromHeaderPanel;

      function onHeaderSearchClick() {
        toggleHeaderSearchPanel();
      }
      window.onHeaderSearchClick = onHeaderSearchClick;

      function setHeaderScrolled(screenEl, scrolled) {
        if (!screenEl) return;
        screenEl.classList.toggle("header-scrolled", scrolled);
        if (
          !scrolled &&
          screenEl.id === "screen-home" &&
          screenEl.classList.contains("header-search-open")
        ) {
          closeHeaderSearchPanel();
        }
      }

      function setHeaderPinned(screenEl, pinned) {
        if (!screenEl) return;
        screenEl.classList.toggle("header-pinned", pinned);
      }

      function bindHeaderScrollSwap(screenId, scrollSelector, threshold) {
        const screen = document.getElementById(screenId);
        const scrollEl = document.querySelector(scrollSelector);
        if (!screen || !scrollEl) return;
        const key = "headerScrollBound";
        if (scrollEl.dataset[key]) return;
        scrollEl.dataset[key] = "1";
        const update = () =>
          setHeaderScrolled(screen, scrollEl.scrollTop > threshold);
        scrollEl.addEventListener("scroll", update, { passive: true });
        update();
      }

      function initHomeHeroHeaderSwap() {
        const heroEl = document.querySelector("#screen-home .hero");
        const homeScreen = document.getElementById("screen-home");
        const homeMain = document.querySelector("#screen-home .home-main");
        if (!heroEl || !homeScreen || !homeMain) return;

        const syncHeroHeader = (isHeroVisible) =>
          setHeaderScrolled(homeScreen, !isHeroVisible);
        const syncHeaderPin = () =>
          setHeaderPinned(homeScreen, homeMain.scrollTop > 0);

        if (!homeMain.dataset.heroHeaderBound) {
          homeMain.dataset.heroHeaderBound = "1";
          const obs = new IntersectionObserver(
            (entries) => {
              syncHeroHeader(entries[0].isIntersecting);
            },
            {
              root: homeMain,
              threshold: 0,
              rootMargin: "0px",
            },
          );
          obs.observe(heroEl);
          homeMain.addEventListener("scroll", syncHeaderPin, { passive: true });
        }

        const heroRect = heroEl.getBoundingClientRect();
        const mainRect = homeMain.getBoundingClientRect();
        syncHeroHeader(
          heroRect.bottom > mainRect.top && heroRect.top < mainRect.bottom,
        );
        syncHeaderPin();
      }

      function initHeaderScrollSwap() {
        initHomeHeroHeaderSwap();
        const configs = [
          ["screen-govdata", "#screen-govdata .gd-scroll", 72],
          ["screen-products", "#screen-products .prod-page-scroll", 72],
          [
            "screen-observatories",
            "#screen-observatories .obs-page-scroll",
            72,
          ],
          ["screen-geo-view", "#screen-geo-view .geo-page-scroll", 72],
          ["screen-bayaan-search", "#screen-bayaan-search .bsearch-scroll", 72],
          [
            "screen-indicator-detail",
            "#screen-indicator-detail #ind-mainEl",
            120,
          ],
        ];
        configs.forEach(([id, sel, th]) => bindHeaderScrollSwap(id, sel, th));
      }
      window.initHeaderScrollSwap = initHeaderScrollSwap;
      window.initHomeHeroHeaderSwap = initHomeHeroHeaderSwap;

      function scrollHomeHeroDown(e) {
        if (e) e.preventDefault();
        const homeMain = document.querySelector("#screen-home .home-main");
        const content = document.getElementById("homeContent");
        if (!homeMain || !content) return;
        homeMain.scrollTo({ top: content.offsetTop, behavior: "smooth" });
      }
      window.scrollHomeHeroDown = scrollHomeHeroDown;

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeHeaderSearchPanel();
      });

      document.addEventListener("click", (e) => {
        const openScreen = document.querySelector(
          ".ws-screen.header-search-open",
        );
        if (!openScreen) return;
        const panel = openScreen.querySelector(".header-search-panel");
        if (!panel || !panel.classList.contains("open")) return;
        if (
          e.target.closest(".header-search-panel") ||
          e.target.closest(".nav-search-reveal")
        )
          return;
        closeHeaderSearchPanel();
      });

      initHeaderScrollSwap();

      /* ═══ INIT ═══ */
      renderArtifacts();
      initAiChatUi();
      renderAiWorkspaceList();
      updateChatWsChip();

      /* ═══ Entity Zone PAGE ═══ */
      function openBayaanStudio(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        if (typeof closeBayaanAIPanel === "function") closeBayaanAIPanel();
        goToStudioGalleryFromGov();
      }
      window.openBayaanStudio = openBayaanStudio;

      function goToStudioGalleryFromGov() {
        const navigate = () => {
          document.body.classList.remove("ai-research-lab");
          if (typeof syncSidebarActiveTab === "function")
            syncSidebarActiveTab("studio");
          document
            .querySelectorAll(".tab-view")
            .forEach((t) => t.classList.remove("active"));
          const studioView = document.getElementById("tv-studio");
          if (studioView) studioView.classList.add("active");
          if (typeof showStudioGallery === "function") showStudioGallery();
          else if (typeof showGallery === "function") showGallery();
          if (typeof syncTopnavActive === "function")
            syncTopnavActive("bayaan-studio");
        };

        document
          .querySelectorAll(".ws-screen")
          .forEach((s) => s.classList.remove("active", "exit", "enter"));

        const app = document.getElementById("s-app");
        if (
          app &&
          app.classList.contains("active") &&
          document.body.classList.contains("mode-ai")
        ) {
          navigate();
          return;
        }

        if (typeof _aiEnterApp === "function") {
          _aiEnterApp("", "studio", navigate);
          return;
        }

        document.body.classList.add("mode-ai");
        if (app) app.classList.add("active");
        navigate();
      }
      window.goToStudioGalleryFromGov = goToStudioGalleryFromGov;

      let _gdProdChartsReady = false;

      function initGovProdCharts() {
        if (_gdProdChartsReady || typeof Chart === "undefined") return;
        const screen = document.getElementById("screen-govdata");
        if (!screen || !document.getElementById("gd_kv1")) return;
        _gdProdChartsReady = true;

        const BASE = { responsive: true, maintainAspectRatio: false };
        const qt = ["Q1 24", "Q2 24", "Q3 24", "Q4 24", "Q1 25"];
        const mo6 = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
        const N = ["#0B1C3D", "#1a3a6e", "#2d5aa0", "#5580c8", "#8aaee0"];
        const G = ["#0f5132", "#2d9e6b", "#57c898", "#9ee5c4", "#cff4e5"];
        const T = ["#0a5260", "#1a9caa", "#4dc5d4", "#8adeea", "#c5f2f8"];
        const V = ["#3d1a7a", "#6b3db8", "#9a6de0", "#c4a8f5", "#e4d8fc"];
        const A = ["#7a4800", "#b86b00", "#e8950a", "#f5c06a", "#fde8b3"];
        const R = ["#7a1f1f", "#b83030", "#e06060", "#f5a0a0", "#fce0e0"];

        function noAx() {
          return { x: { display: false }, y: { display: false } };
        }
        function lAx(cb) {
          return {
            x: {
              grid: { display: false },
              ticks: { font: { size: 8 }, maxTicksLimit: 5, callback: cb },
            },
            y: {
              grid: { color: "rgba(0,0,0,0.04)" },
              ticks: { font: { size: 8 }, maxTicksLimit: 4 },
            },
          };
        }

        new Chart(document.getElementById("gd_kv1"), {
          type: "line",
          data: {
            labels: qt,
            datasets: [
              {
                data: [33200, 35800, 38100, 40200, 42180],
                borderColor: N[0],
                borderWidth: 2,
                tension: 0.45,
                pointRadius: 0,
                pointHoverRadius: 4,
                fill: true,
                backgroundColor: "rgba(11,28,61,0.08)",
              },
            ],
          },
          options: {
            ...BASE,
            scales: noAx(),
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_kv2"), {
          type: "bar",
          data: {
            labels: qt,
            datasets: [
              {
                data: [9800, 11200, 12400, 13700, 14230],
                backgroundColor: qt.map((_, i) =>
                  i === 4 ? T[0] : T[2] + "bb",
                ),
                borderRadius: 3,
                barPercentage: 0.72,
              },
            ],
          },
          options: { ...BASE, scales: noAx() },
        });
        new Chart(document.getElementById("gd_kv3"), {
          type: "line",
          data: {
            labels: ["2020", "2021", "2022", "2023", "2024"],
            datasets: [
              {
                data: [84200, 87300, 90100, 95200, 98340],
                borderColor: V[0],
                borderWidth: 2,
                tension: 0.45,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(61,26,122,0.08)",
              },
            ],
          },
          options: { ...BASE, scales: noAx() },
        });
        new Chart(document.getElementById("gd_kv4"), {
          type: "line",
          data: {
            labels: mo6,
            datasets: [
              {
                data: [68.1, 67.2, 65.8, 65.0, 64.1, 63.4],
                borderColor: "#b86b00",
                borderWidth: 2,
                tension: 0.45,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(122,72,0,0.08)",
              },
            ],
          },
          options: { ...BASE, scales: noAx() },
        });
        new Chart(document.getElementById("gd_kv5"), {
          type: "bar",
          data: {
            labels: qt,
            datasets: [
              {
                data: [130, 140, 152, 162, 168],
                backgroundColor: qt.map((_, i) =>
                  i === 4 ? G[0] : G[2] + "bb",
                ),
                borderRadius: 3,
                barPercentage: 0.72,
              },
            ],
          },
          options: { ...BASE, scales: noAx() },
        });
        new Chart(document.getElementById("gd_kv6"), {
          type: "bar",
          data: {
            labels: mo6,
            datasets: [
              {
                data: [190, 210, 225, 248, 265, 284],
                backgroundColor: mo6.map((_, i) =>
                  i === 5 ? A[0] : A[2] + "99",
                ),
                borderRadius: 3,
                barPercentage: 0.78,
              },
            ],
          },
          options: { ...BASE, scales: noAx() },
        });

        new Chart(document.getElementById("gd_d1a"), {
          type: "line",
          data: {
            labels: qt,
            datasets: [
              {
                data: [33200, 36000, 38500, 40100, 42180],
                borderColor: N[0],
                borderWidth: 2.5,
                tension: 0.45,
                pointRadius: 0,
                pointHoverRadius: 4,
                fill: true,
                backgroundColor: "rgba(11,28,61,0.07)",
              },
            ],
          },
          options: {
            ...BASE,
            scales: lAx(),
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d1b"), {
          type: "doughnut",
          data: {
            labels: ["Financial Aid", "Housing", "Child Support", "Healthcare"],
            datasets: [
              {
                data: [38, 27, 22, 13],
                backgroundColor: N,
                borderWidth: 2,
                borderColor: "#f7f8fa",
                hoverOffset: 4,
              },
            ],
          },
          options: {
            ...BASE,
            cutout: "68%",
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: { label: (c) => ` ${c.label}: ${c.parsed}%` },
              },
            },
          },
        });
        new Chart(document.getElementById("gd_d2a"), {
          type: "bar",
          data: {
            labels: qt,
            datasets: [
              {
                data: [9800, 11200, 12400, 13700, 14230],
                backgroundColor: qt.map((_, i) =>
                  i === 4 ? T[0] : T[2] + "bb",
                ),
                borderRadius: 3,
                barPercentage: 0.7,
              },
            ],
          },
          options: {
            ...BASE,
            scales: lAx(),
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d2b"), {
          type: "doughnut",
          data: {
            labels: [
              "Mobility",
              "Communication",
              "Education",
              "Employment",
              "Healthcare",
              "Rehab",
            ],
            datasets: [
              {
                data: [28, 22, 18, 14, 12, 6],
                backgroundColor: T,
                borderWidth: 2,
                borderColor: "#f7f8fa",
                hoverOffset: 4,
              },
            ],
          },
          options: {
            ...BASE,
            cutout: "65%",
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d3a"), {
          type: "line",
          data: {
            labels: mo6,
            datasets: [
              {
                data: [68.1, 67.2, 65.8, 65.0, 64.1, 63.4],
                borderColor: R[0],
                borderWidth: 2.5,
                tension: 0.45,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(122,31,31,0.08)",
              },
            ],
          },
          options: {
            ...BASE,
            scales: lAx((v) => v + "%"),
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d3b"), {
          type: "bar",
          data: {
            labels: [
              "Khalidiyah",
              "Mushrif",
              "Maqta",
              "Shahama",
              "Baniyas",
              "Zayed",
            ],
            datasets: [
              {
                data: [58, 67, 71, 74, 79, 82],
                backgroundColor: R,
                borderRadius: 3,
                barPercentage: 0.65,
              },
            ],
          },
          options: {
            ...BASE,
            indexAxis: "y",
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 7.5 }, callback: (v) => v + "%" },
              },
              y: { grid: { display: false }, ticks: { font: { size: 7.5 } } },
            },
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d4a"), {
          type: "line",
          data: {
            labels: mo6,
            datasets: [
              {
                data: [70.1, 71.2, 72.0, 72.8, 73.5, 74.2],
                borderColor: G[0],
                borderWidth: 2.5,
                tension: 0.45,
                pointRadius: 0,
                fill: true,
                backgroundColor: "rgba(15,81,50,0.08)",
              },
            ],
          },
          options: {
            ...BASE,
            scales: lAx(),
            plugins: { legend: { display: false } },
          },
        });
        new Chart(document.getElementById("gd_d4b"), {
          type: "bar",
          data: {
            labels: [
              "Khalidiyah",
              "Mushrif",
              "Maqta",
              "Shahama",
              "Baniyas",
              "Zayed",
            ],
            datasets: [
              {
                data: [82, 79, 76, 73, 71, 68],
                backgroundColor: G,
                borderRadius: 3,
                barPercentage: 0.65,
              },
            ],
          },
          options: {
            ...BASE,
            indexAxis: "y",
            scales: {
              x: {
                grid: { display: false },
                ticks: { font: { size: 7.5 }, callback: (v) => v + "%" },
              },
              y: { grid: { display: false }, ticks: { font: { size: 7.5 } } },
            },
            plugins: { legend: { display: false } },
          },
        });
      }

      const DXP_CATALOGUE = [
        {
          id: "pop-demo",
          entity: "SCAD",
          icon: "ti-world",
          iconTone: "green",
          name: "Population & Demographics",
          org: "SCAD · Abu Dhabi Statistics Centre",
          status: "active",
          assets: 24,
          attributes: 312,
          products: 3,
          fields: ["population_count", "age_group", "district", "nationality", "gender"],
          usage: 'Used in <b>3</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 19 Jan",
          refreshWarn: false,
        },
        {
          id: "disability",
          entity: "DOH",
          icon: "ti-user-heart",
          iconTone: "teal",
          name: "Disability & Inclusion Index",
          org: "DOH · Department of Health",
          status: "active",
          assets: 18,
          attributes: 248,
          products: 2,
          fields: ["case_id", "disability_type", "service_type", "district", "registration_date"],
          usage: 'Used in <b>2</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 20 Jan",
          refreshWarn: false,
        },
        {
          id: "welfare",
          entity: "MOSAL",
          icon: "ti-briefcase",
          iconTone: "blue",
          name: "Social Welfare Beneficiaries",
          org: "MOSAL · Ministry of Social Affairs",
          status: "stale",
          assets: 31,
          attributes: 410,
          products: 4,
          fields: ["beneficiary_id", "support_type", "family_size", "income_band", "district"],
          usage: "Last refreshed <b>47 days ago</b>",
          usageWarn: true,
          refresh: "Stale",
          refreshWarn: true,
        },
        {
          id: "youth",
          entity: "ADEK",
          icon: "ti-school",
          iconTone: "violet",
          name: "Youth Participation Survey",
          org: "ADEK · Abu Dhabi Education Council",
          status: "active",
          assets: 12,
          attributes: 186,
          products: 2,
          fields: ["survey_id", "age_group", "programme_type", "district", "participation_score"],
          usage: 'Used in <b>2</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 15 Jan",
          refreshWarn: false,
        },
        {
          id: "wellbeing",
          entity: "DCD",
          icon: "ti-heart",
          iconTone: "green",
          name: "Community Wellbeing Index",
          org: "DCD · Dept. of Community Development",
          status: "active",
          assets: 20,
          attributes: 264,
          products: 3,
          fields: ["community_id", "wellbeing_score", "programme_id", "district"],
          usage: 'Used in <b>4</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 18 Jan",
          refreshWarn: false,
        },
        {
          id: "labour",
          entity: "SCAD",
          icon: "ti-users",
          iconTone: "teal",
          name: "Labour Force Statistics",
          org: "SCAD · Abu Dhabi Statistics Centre",
          status: "active",
          assets: 36,
          attributes: 402,
          products: 5,
          fields: ["employment_status", "sector", "nationality", "gender", "quarter"],
          usage: 'Used in <b>5</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 21 Jan",
          refreshWarn: false,
        },
        {
          id: "health-util",
          entity: "DOH",
          icon: "ti-stethoscope",
          iconTone: "blue",
          name: "Healthcare Utilisation",
          org: "DOH · Department of Health",
          status: "active",
          assets: 22,
          attributes: 318,
          products: 2,
          fields: ["visit_id", "facility_type", "diagnosis_code", "district", "visit_date"],
          usage: 'Used in <b>2</b> DCD KPIs',
          usageWarn: false,
          refresh: "Refreshed 17 Jan",
          refreshWarn: false,
        },
      ];

      const gdDxpState = {
        view: "grid",
        entity: "all",
        status: "all",
        search: "",
        page: 1,
        pageSize: 4,
      };

      function dxpCatalogueMatches(item) {
        const q = gdDxpState.search.toLowerCase().trim();
        if (gdDxpState.entity !== "all" && item.entity !== gdDxpState.entity)
          return false;
        if (gdDxpState.status !== "all" && item.status !== gdDxpState.status)
          return false;
        if (!q) return true;
        const hay = [item.name, item.org, item.entity, ...(item.fields || [])]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      }

      function buildDxpCardHtml(item) {
        const badgeCls =
          item.status === "stale"
            ? "gd-prod-cat-badge--stale"
            : "gd-prod-cat-badge--active";
        const badgeLabel = item.status === "stale" ? "Stale" : "Active";
        const usageCls = item.usageWarn ? " gd-prod-cat-usage--warn" : "";
        const refreshCls = item.refreshWarn
          ? " gd-prod-cat-refresh--warn"
          : "";
        const refreshInner = item.refreshWarn
          ? `<i class="ti ti-alert-triangle"></i> ${item.refresh}`
          : item.refresh;
        const fieldTags = (item.fields || [])
          .map((f) => `<span>${f}</span>`)
          .join("");
        return `<article class="gd-prod-cat-card" data-dxp-id="${item.id}" data-dxp-entity="${item.entity}">
  <div class="gd-prod-cat-head">
    <div class="gd-prod-cat-icon gd-prod-cat-icon--${item.iconTone}"><i class="ti ${item.icon}"></i></div>
    <div class="gd-prod-cat-copy">
      <div class="gd-prod-cat-name">${item.name}</div>
      <div class="gd-prod-cat-entity">${item.org}</div>
    </div>
    <span class="gd-prod-cat-badge ${badgeCls}">${badgeLabel}</span>
  </div>
  <div class="gd-prod-cat-stats">
    <div class="gd-prod-cat-stat"><div class="gd-prod-cat-stat-v">${item.assets}</div><div class="gd-prod-cat-stat-l">Assets</div></div>
    <div class="gd-prod-cat-stat"><div class="gd-prod-cat-stat-v">${item.attributes}</div><div class="gd-prod-cat-stat-l">Attributes</div></div>
    <div class="gd-prod-cat-stat"><div class="gd-prod-cat-stat-v">${item.products}</div><div class="gd-prod-cat-stat-l">Bayaan published products</div></div>
  </div>
  <div class="gd-prod-cat-schema">
    <div class="gd-prod-schema-lbl">CDEs</div>
    <div class="gd-prod-schema-tags">${fieldTags}</div>
  </div>
  <div class="gd-prod-cat-foot">
    <span class="gd-prod-cat-usage${usageCls}">${item.usage}</span>
    <span class="gd-prod-cat-refresh${refreshCls}">${refreshInner}</span>
  </div>
</article>`;
      }

      function buildDxpTableRow(item) {
        const badgeCls =
          item.status === "stale"
            ? "gd-prod-cat-badge--stale"
            : "gd-prod-cat-badge--active";
        const badgeLabel = item.status === "stale" ? "Stale" : "Active";
        const fieldTags = (item.fields || [])
          .map((f) => `<span>${f}</span>`)
          .join("");
        const refreshInner = item.refreshWarn
          ? `<span class="gd-dxp-refresh-warn"><i class="ti ti-alert-triangle"></i> ${item.refresh}</span>`
          : item.refresh;
        return `<tr data-dxp-id="${item.id}" data-dxp-entity="${item.entity}">
  <td>
    <div class="gd-dxp-cell-dataset">
      <div class="gd-prod-cat-icon gd-prod-cat-icon--${item.iconTone} gd-dxp-table-icon"><i class="ti ${item.icon}"></i></div>
      <div>
        <div class="gd-dxp-table-name">${item.name}</div>
        <div class="gd-dxp-table-entity">${item.org}</div>
      </div>
    </div>
  </td>
  <td><span class="gd-prod-cat-badge ${badgeCls}">${badgeLabel}</span></td>
  <td class="gd-dxp-num">${item.assets}</td>
  <td class="gd-dxp-num">${item.attributes}</td>
  <td class="gd-dxp-num">${item.products}</td>
  <td><div class="gd-prod-schema-tags gd-dxp-table-tags">${fieldTags}</div></td>
  <td class="gd-dxp-usage${item.usageWarn ? " gd-dxp-usage--warn" : ""}">${item.usage}</td>
  <td class="gd-dxp-refresh">${refreshInner}</td>
</tr>`;
      }

      function renderDxpPagination(total, page, pageSize) {
        const el = document.getElementById("gdDxpPagination");
        if (!el) return;
        const pages = Math.max(1, Math.ceil(total / pageSize));
        gdDxpState.page = Math.min(page, pages);
        if (total === 0) {
          el.innerHTML = `<div class="pag-info">No catalogue items</div>`;
          return;
        }
        const start = (gdDxpState.page - 1) * pageSize + 1;
        const end = Math.min(gdDxpState.page * pageSize, total);
        let btns = "";
        btns += `<button type="button" class="pag-btn nav" data-dxp-page="prev"${gdDxpState.page <= 1 ? " disabled" : ""}>← Previous</button>`;
        for (let i = 1; i <= pages; i++) {
          btns += `<button type="button" class="pag-btn${i === gdDxpState.page ? " active" : ""}" data-dxp-page="${i}">${i}</button>`;
        }
        btns += `<button type="button" class="pag-btn nav" data-dxp-page="next"${gdDxpState.page >= pages ? " disabled" : ""}>Next →</button>`;
        el.innerHTML = `<div class="pag-info">Showing ${start}–${end} of ${total}</div><div class="pag-btns">${btns}</div>`;
        el.querySelectorAll("[data-dxp-page]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const v = btn.getAttribute("data-dxp-page");
            if (v === "prev") renderDxpCatalogue(gdDxpState.page - 1);
            else if (v === "next") renderDxpCatalogue(gdDxpState.page + 1);
            else renderDxpCatalogue(parseInt(v, 10));
          });
        });
      }

      function renderDxpCatalogue(page) {
        const panel = document.getElementById("gdDxpPanel");
        const grid = document.getElementById("gdDxpGrid");
        const listBody = document.getElementById("gdDxpListBody");
        const listWrap = document.getElementById("gdDxpListWrap");
        const results = document.getElementById("gdDxpResults");
        const countEl = document.getElementById("gdDxpCount");
        if (!panel || !grid || !listBody) return;

        if (typeof page === "number" && !Number.isNaN(page)) gdDxpState.page = page;

        const filtered = DXP_CATALOGUE.filter(dxpCatalogueMatches);
        const pages = Math.max(1, Math.ceil(filtered.length / gdDxpState.pageSize));
        if (gdDxpState.page > pages) gdDxpState.page = pages;
        const start = (gdDxpState.page - 1) * gdDxpState.pageSize;
        const slice = filtered.slice(start, start + gdDxpState.pageSize);

        if (countEl)
          countEl.textContent = `${DXP_CATALOGUE.length} Subscribed`;

        grid.innerHTML = slice.map(buildDxpCardHtml).join("");
        listBody.innerHTML = slice.map(buildDxpTableRow).join("");

        const isList = gdDxpState.view === "list";
        results.classList.toggle("view-list", isList);
        results.classList.toggle("view-grid", !isList);
        grid.hidden = isList;
        listWrap.hidden = !isList;

        renderDxpPagination(filtered.length, gdDxpState.page, gdDxpState.pageSize);

        toggleSearchEmptyState(
          results,
          filtered.length === 0,
          gdDxpState.search,
          { label: "catalogue items", input: document.getElementById("gdDxpSearchInp") },
        );
      }

      function toggleDxpFilterDropdown(force) {
        const dd = document.getElementById("gdDxpFilterPanel");
        const btn = document.getElementById("gdDxpFilterBtn");
        if (!dd || !btn) return;
        const open = typeof force === "boolean" ? force : dd.hidden;
        dd.hidden = !open;
        btn.classList.toggle(
          "active",
          open || gdDxpState.status !== "all",
        );
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        if (!open && gdDxpState.status === "all") btn.classList.remove("active");
      }

      function initDxpCatalogue() {
        const panel = document.getElementById("gdDxpPanel");
        if (!panel || panel.dataset.dxpInit) return;
        panel.dataset.dxpInit = "1";

        panel.querySelectorAll("[data-dxp-entity]").forEach((btn) => {
          btn.addEventListener("click", () => {
            panel
              .querySelectorAll("[data-dxp-entity]")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            gdDxpState.entity = btn.getAttribute("data-dxp-entity") || "all";
            renderDxpCatalogue(1);
          });
        });

        panel.querySelectorAll("[data-dxp-status]").forEach((btn) => {
          btn.addEventListener("click", () => {
            panel
              .querySelectorAll("[data-dxp-status]")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            gdDxpState.status = btn.getAttribute("data-dxp-status") || "all";
            toggleDxpFilterDropdown(false);
            renderDxpCatalogue(1);
          });
        });

        panel.querySelectorAll("[data-dxp-view]").forEach((btn) => {
          btn.addEventListener("click", () => {
            panel
              .querySelectorAll("[data-dxp-view]")
              .forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            gdDxpState.view = btn.getAttribute("data-dxp-view") || "grid";
            renderDxpCatalogue();
          });
        });

        const filterBtn = document.getElementById("gdDxpFilterBtn");
        const filterPanel = document.getElementById("gdDxpFilterPanel");
        filterBtn?.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleDxpFilterDropdown();
        });
        document.addEventListener("click", (e) => {
          if (filterPanel?.hidden) return;
          if (
            filterPanel?.contains(e.target) ||
            filterBtn?.contains(e.target)
          )
            return;
          toggleDxpFilterDropdown(false);
        });

        const searchInp = document.getElementById("gdDxpSearchInp");
        if (searchInp) {
          bindSubmitSearch(searchInp, () => {
            gdDxpState.search = searchInp.value;
            renderDxpCatalogue(1);
          });
        }

        renderDxpCatalogue(1);
      }

      function initGovDataPage() {
        const screen = document.getElementById("screen-govdata");
        if (!screen || screen.dataset.gdInit) return;
        screen.dataset.gdInit = "1";

        initDxpCatalogue();

        screen.querySelectorAll("#gdProductTabs .gd-tab").forEach((tab) => {
          tab.addEventListener("click", () => {
            const panelId = tab.getAttribute("data-gd-tab");
            screen
              .querySelectorAll("#gdProductTabs .gd-tab")
              .forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
            screen.querySelectorAll(".gd-tab-panel").forEach((panel) => {
              panel.classList.toggle(
                "active",
                panel.getAttribute("data-gd-panel") === panelId,
              );
            });
          });
        });

        screen.querySelectorAll(".gd-ftag").forEach((tag) => {
          if (tag.closest("#gdDxpPanel")) return;
          tag.addEventListener("click", () => {
            const group = tag.closest(".gd-prod-filter-left");
            if (!group) return;
            group
              .querySelectorAll(".gd-ftag")
              .forEach((t) => t.classList.remove("active"));
            tag.classList.add("active");
          });
        });

        screen.querySelectorAll(".gd-btn-sub").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (btn.classList.contains("done")) return;
            btn.textContent = "Subscribed";
            btn.classList.add("done");
          });
        });

        initGovProdCharts();
        initGovDataSearch();
        initGovEntityFilter();

        const track = document.getElementById("gdFeedTrack");
        const dots = screen.querySelectorAll("[data-gd-feed]");
        const prev = document.getElementById("gdFeedPrev");
        const next = document.getElementById("gdFeedNext");
        if (!track) return;

        let feedIdx = 0;
        function scrollToFeed(i) {
          const cards = track.querySelectorAll(".gd-feed-card");
          if (!cards.length) return;
          feedIdx = Math.max(0, Math.min(i, cards.length - 1));
          const card = cards[feedIdx];
          track.scrollTo({
            left: card.offsetLeft - track.offsetLeft,
            behavior: "smooth",
          });
          dots.forEach((d, idx) =>
            d.classList.toggle("active", idx === feedIdx),
          );
        }
        dots.forEach((d) =>
          d.addEventListener("click", () =>
            scrollToFeed(parseInt(d.getAttribute("data-gd-feed"), 10)),
          ),
        );
        if (prev)
          prev.addEventListener("click", () => scrollToFeed(feedIdx - 1));
        if (next)
          next.addEventListener("click", () => scrollToFeed(feedIdx + 1));
      }

      function initGovDataCharts() {
        updateHomeBanner();
        initGovDataPage();
        if (typeof refreshGovDataPageAOS === "function")
          refreshGovDataPageAOS();
      }