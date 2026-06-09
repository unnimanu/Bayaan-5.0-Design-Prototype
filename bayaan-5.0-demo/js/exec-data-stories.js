(function () {
  const EXEC_STORIES = [

    // Story 0: CPI Inflation
    {
      title: "Why Abu Dhabi's inflation is above target",
      source: "SCAD",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "CPI was stable. Then two categories broke away.",
          body: "For three consecutive years, Abu Dhabi's Consumer Price Index tracked closely to the 2.4% policy target. Headline inflation was predictable, manageable, and broadly aligned with GCC peers. That changed in late 2024.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">CPI headline trend ” 2022 to Q1 2026</div>
            <svg viewBox="0 0 700 160" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:160px;">
              <line x1="40" y1="10" x2="40" y2="130" stroke="#E4E1D9" stroke-width="0.5"/>
              <line x1="40" y1="130" x2="680" y2="130" stroke="#E4E1D9" stroke-width="0.5"/>
              <text x="36" y="133" text-anchor="end" font-size="9" fill="#9E9B94" font-family="DM Sans">100</text>
              <text x="36" y="93" text-anchor="end" font-size="9" fill="#9E9B94" font-family="DM Sans">105</text>
              <text x="36" y="53" text-anchor="end" font-size="9" fill="#9E9B94" font-family="DM Sans">110</text>
              <text x="36" y="13" text-anchor="end" font-size="9" fill="#9E9B94" font-family="DM Sans">115</text>
              <line x1="40" y1="90" x2="680" y2="90" stroke="#E4E1D9" stroke-width="0.5" stroke-dasharray="3,3"/>
              <line x1="40" y1="50" x2="680" y2="50" stroke="#E4E1D9" stroke-width="0.5" stroke-dasharray="3,3"/>
              <!-- Target band 2.4% -->
              <rect x="40" y="76" width="640" height="22" fill="#E1F5EE" opacity="0.4"/>
              <text x="686" y="90" font-size="8" fill="#085041" font-family="DM Sans">Target band</text>
              <!-- CPI line: stable then rising -->
              <polyline points="40,118 120,114 200,110 280,106 360,102 440,96 520,78 600,58 660,48" stroke="#1A1916" stroke-width="2" fill="none" stroke-linecap="round"/>
              <circle cx="660" cy="48" r="4" fill="#E24B4A"/>
              <text x="664" y="44" font-size="9" fill="#A32D2D" font-family="DM Sans" font-weight="600">109.86</text>
              <!-- year labels -->
              <text x="40"  y="145" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2022</text>
              <text x="200" y="145" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2023</text>
              <text x="360" y="145" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2024</text>
              <text x="520" y="145" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2025</text>
              <text x="660" y="145" font-size="9" fill="#A32D2D" font-family="DM Sans" text-anchor="middle" font-weight="600">Q1 2026</text>
            </svg>
            <div class="slide-stat-row">
              <div class="slide-stat"><div class="slide-stat-val">109.86</div><div class="slide-stat-lbl">Overall CPI, Mar 2026</div></div>
              <div class="slide-stat"><div class="slide-stat-val" style="color:var(--red);">+3.71%</div><div class="slide-stat-lbl">YoY ” above 2.4% target</div></div>
              <div class="slide-stat"><div class="slide-stat-val">111.86</div><div class="slide-stat-lbl">Essential categories CPI</div></div>
            </div>
          </div>`
        },
        {
          type: "break",
          eyebrow: "The Break",
          headline: "Housing broke first. Food followed.",
          body: "Two categories account for the entire divergence above target. <strong>Housing, rent and utilities</strong> accelerated to +4.5% ” driven by demand in core residential districts. <strong>Food and beverages</strong> followed at +2.4%, with beef and fresh produce showing the sharpest spikes. Transport actually eased, masking the underlying pressure.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Inflation contribution flow ” by expenditure category, Q1 2026</div>
            <svg viewBox="0 0 660 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:180px;">
              <rect x="0" y="50" width="60" height="80" rx="4" fill="#F0EEE9"/>
              <text x="30" y="86" text-anchor="middle" font-size="9" fill="#6B6860" font-family="DM Sans" font-weight="600">Overall</text>
              <text x="30" y="98" text-anchor="middle" font-size="9" fill="#6B6860" font-family="DM Sans">CPI</text>
              <text x="30" y="112" text-anchor="middle" font-size="11" fill="#1A1916" font-family="DM Sans" font-weight="700">+3.71%</text>
              <!-- flows -->
              <path d="M60,68 C140,68 140,40 220,40" stroke="#E24B4A" stroke-width="24" fill="none" opacity="0.65" stroke-linecap="round"/>
              <path d="M60,88 C140,88 140,90 220,90" stroke="#EF9F27" stroke-width="14" fill="none" opacity="0.65" stroke-linecap="round"/>
              <path d="M60,110 C140,110 140,118 220,118" stroke="#1D9E75" stroke-width="7" fill="none" opacity="0.65" stroke-linecap="round"/>
              <path d="M60,123 C140,123 140,148 220,148" stroke="#B5D4F4" stroke-width="6" fill="none" opacity="0.65" stroke-linecap="round"/>
              <!-- category boxes -->
              <rect x="220" y="24" width="110" height="32" rx="4" fill="#FCEBEB"/>
              <text x="275" y="37" text-anchor="middle" font-size="9" fill="#A32D2D" font-family="DM Sans" font-weight="700">ðŸ  Housing</text>
              <text x="275" y="49" text-anchor="middle" font-size="10" fill="#791F1F" font-family="DM Sans" font-weight="700">+4.5%</text>
              <rect x="220" y="76" width="110" height="28" rx="4" fill="#FAEEDA"/>
              <text x="275" y="88" text-anchor="middle" font-size="9" fill="#633806" font-family="DM Sans" font-weight="700">ðŸ¥© Food</text>
              <text x="275" y="99" text-anchor="middle" font-size="10" fill="#633806" font-family="DM Sans" font-weight="700">+2.4%</text>
              <rect x="220" y="110" width="110" height="24" rx="4" fill="#E1F5EE"/>
              <text x="275" y="121" text-anchor="middle" font-size="9" fill="#085041" font-family="DM Sans" font-weight="700">ðŸšŒ Transport</text>
              <text x="275" y="130" text-anchor="middle" font-size="9" fill="#085041" font-family="DM Sans" font-weight="600">âˆ’0.3%</text>
              <rect x="220" y="138" width="110" height="24" rx="4" fill="#E6F1FB"/>
              <text x="275" y="149" text-anchor="middle" font-size="9" fill="#0C447C" font-family="DM Sans" font-weight="700">ðŸ“¦ Other</text>
              <text x="275" y="158" text-anchor="middle" font-size="9" fill="#0C447C" font-family="DM Sans" font-weight="600">+1.2%</text>
              <!-- insight callout -->
              <rect x="360" y="20" width="290" height="138" rx="8" fill="#FFF8F0" stroke="#E4D5B8" stroke-width="0.5"/>
              <text x="380" y="42" font-size="10" fill="#633806" font-family="DM Sans" font-weight="700">Key insight</text>
              <text x="380" y="60" font-size="10" fill="#6B6860" font-family="DM Sans">Housing alone contributes ~1.8pp</text>
              <text x="380" y="74" font-size="10" fill="#6B6860" font-family="DM Sans">to the headline overshoot.</text>
              <text x="380" y="96" font-size="10" fill="#6B6860" font-family="DM Sans">Without housing, CPI would</text>
              <text x="380" y="110" font-size="10" fill="#6B6860" font-family="DM Sans">read ~1.9% ” inside target.</text>
              <rect x="380" y="126" width="90" height="18" rx="3" fill="#FCEBEB"/>
              <text x="425" y="138" text-anchor="middle" font-size="9" fill="#A32D2D" font-family="DM Sans" font-weight="600">Housing: policy lever</text>
            </svg>
          </div>`
        },
        {
          type: "evidence",
          eyebrow: "The Evidence",
          headline: "A five-month heatmap shows the pressure building.",
          body: "The breakdown by month and sector reveals the trajectory clearly. Housing has been above 4% since November 2025. Food crossed 2% in January and has held above it since. The pattern is persistent ” this is not a one-month spike.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Inflation by expenditure category ” Oct 2025 to Feb 2026</div>
            <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:12px;min-width:520px;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Sector</th>
                  <th style="text-align:center;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Oct</th>
                  <th style="text-align:center;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Nov</th>
                  <th style="text-align:center;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Dec</th>
                  <th style="text-align:center;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Jan</th>
                  <th style="text-align:center;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);letter-spacing:0.05em;text-transform:uppercase;border-bottom:1px solid var(--border);">Feb</th>
                </tr>
              </thead>
              <tbody>
                ${[
                  ['ðŸ  Housing', ['+3.2%','#FAEEDA','#633806'], ['+4.1%','#FCEBEB','#A32D2D'], ['+4.2%','#FCEBEB','#A32D2D'], ['+3.8%','#FAEEDA','#633806'], ['+4.8%','#FCEBEB','#791F1F']],
                  ['ðŸ¥© Food',    ['+2.4%','#FAEEDA','#633806'], ['+1.8%','#E1F5EE','#085041'], ['+2.4%','#FAEEDA','#633806'], ['+3.4%','#FCEBEB','#A32D2D'], ['+2.6%','#FAEEDA','#633806']],
                  ['ðŸšŒ Transport',['+1.0%','#F0EEE9','#6B6860'], ['+0.6%','#F0EEE9','#6B6860'], ['âˆ’0.1%','#E1F5EE','#085041'], ['+0.0%','#F0EEE9','#6B6860'], ['+0.6%','#F0EEE9','#6B6860']],
                  ['ðŸ“š Education',['+1.4%','#F0EEE9','#6B6860'], ['+2.0%','#FAEEDA','#633806'], ['+1.4%','#F0EEE9','#6B6860'], ['+2.4%','#FAEEDA','#633806'], ['+2.2%','#FAEEDA','#633806']],
                  ['ðŸ‘— Clothing', ['+3.2%','#FAEEDA','#633806'], ['+1.4%','#F0EEE9','#6B6860'], ['+1.2%','#F0EEE9','#6B6860'], ['+3.1%','#FAEEDA','#633806'], ['+1.0%','#F0EEE9','#6B6860']],
                ].map(([sector, ...months]) => `<tr style="border-bottom:1px solid var(--border-light);">
                  <td style="padding:8px 10px;font-size:12px;color:var(--text-primary);font-weight:500;">${sector}</td>
                  ${months.map(([val,bg,color]) => `<td style="text-align:center;padding:6px 8px;"><span style="display:inline-block;background:${bg};color:${color};padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;">${val}</span></td>`).join('')}
                </tr>`).join('')}
              </tbody>
            </table>
            </div>
          </div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "Two levers. One window. Act before Q3.",
          body: "The data points to two actionable levers. <strong>Import tax reduction on essential food commodities</strong> can address the food component within 2 quarters. <strong>Housing supply policy</strong> ” faster permitting, TAWTEEN-linked housing incentives ” addresses the structural driver. Both require action before Q3 to show effect in H2 2026 data.",
          chart: `<div class="slide-chart-area" style="background:var(--bg-card);border:1.5px solid var(--border);">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="background:var(--red-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--red-text);margin-bottom:8px;">Lever 1 ” Immediate</div>
                <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Reduce import tax on essential food by 5%</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">Modelled impact: âˆ’0.4pp on headline CPI within 2 quarters. Brings food component back inside target band.</div>
                <div style="margin-top:10px;font-size:11px;color:var(--red-text);font-weight:600;">Est. effect: Q3 2026</div>
              </div>
              <div style="background:var(--amber-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--amber-text);margin-bottom:8px;">Lever 2 ” Structural</div>
                <div style="font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Accelerate housing supply in high-demand districts</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">Supply-side intervention needed to moderate rent pressure. Demand is outpacing new completions by ~12% YoY in core districts.</div>
                <div style="margin-top:10px;font-size:11px;color:var(--amber-text);font-weight:600;">Est. effect: Q1 2027</div>
              </div>
            </div>
          </div>`,
          actions: true
        }
      ]
    },

    // Story 1: GCC non-oil ranking
    {
      title: "Abu Dhabi climbs to #1 in GCC non-oil GDP diversification",
      source: "SCAD+",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "For a decade, Saudi Arabia led GCC diversification.",
          body: "Non-oil GDP share has been the defining metric of Vision-era economic reforms across the Gulf. Saudi Arabia's Vision 2030 made it the benchmark, consistently leading the GCC in non-oil sector contribution through 2023. Abu Dhabi was tracking behind.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">GCC non-oil GDP share ” 2020 to 2026</div>
            <svg viewBox="0 0 660 170" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:170px;">
              <line x1="50" y1="10" x2="50" y2="135" stroke="#E4E1D9" stroke-width="0.5"/>
              <line x1="50" y1="135" x2="640" y2="135" stroke="#E4E1D9" stroke-width="0.5"/>
              ${[30,40,50,60].map((v,i) => `<text x="44" y="${135-(i*25*1.15)}" text-anchor="end" font-size="9" fill="#9E9B94" font-family="DM Sans">${v}%</text><line x1="50" y1="${135-(i*25*1.15)}" x2="640" y2="${135-(i*25*1.15)}" stroke="#E4E1D9" stroke-width="0.3" stroke-dasharray="3,3"/>`).join('')}
              <!-- Abu Dhabi ” rising -->
              <polyline points="50,100 148,96 246,90 344,78 442,60 540,42 620,24" stroke="#1D9E75" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <circle cx="620" cy="24" r="5" fill="#1D9E75"/>
              <text x="626" y="22" font-size="10" fill="#085041" font-family="DM Sans" font-weight="700">AD 56.3% â†‘#1</text>
              <!-- Saudi ” stable then plateau -->
              <polyline points="50,74 148,72 246,68 344,66 442,64 540,60 620,56" stroke="#EF9F27" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="4,2"/>
              <circle cx="620" cy="56" r="4" fill="#EF9F27"/>
              <text x="626" y="59" font-size="10" fill="#633806" font-family="DM Sans" font-weight="600">SA 49.1% #2</text>
              <!-- Qatar -->
              <polyline points="50,88 148,88 246,86 344,84 442,80 540,76 620,72" stroke="#B5D4F4" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="3,3"/>
              <circle cx="620" cy="72" r="3.5" fill="#185FA5" opacity="0.6"/>
              <text x="626" y="75" font-size="10" fill="#9E9B94" font-family="DM Sans">QA 44.7% #3</text>
              <text x="50"  y="150" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2020</text>
              <text x="246" y="150" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2022</text>
              <text x="442" y="150" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">2024</text>
              <text x="620" y="150" font-size="9" fill="#085041" font-family="DM Sans" text-anchor="middle" font-weight="600">2026</text>
              <!-- crossover marker -->
              <line x1="500" y1="10" x2="500" y2="140" stroke="#1D9E75" stroke-width="0.75" stroke-dasharray="3,2"/>
              <rect x="466" y="4" width="68" height="12" rx="2" fill="#E1F5EE"/>
              <text x="500" y="13" text-anchor="middle" font-size="7.5" fill="#085041" font-family="DM Sans" font-weight="600">AD overtakes SA</text>
            </svg>
          </div>`
        },
        {
          type: "break",
          eyebrow: "The Break",
          headline: "The crossover happened in 2025. Here's what drove it.",
          body: "Abu Dhabi's non-oil share crossed Saudi Arabia's in mid-2025 ” the first time in modern economic history. Three structural forces converged: <strong>financial services growth</strong> accelerating past 12% YoY, <strong>tourism and hospitality</strong> reaching pre-COVID peaks, and <strong>technology and advanced manufacturing</strong> attracting new FDI anchored by Mubadala.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Sectors driving Abu Dhabi's non-oil share gain ” 2023 to 2026</div>
            <svg viewBox="0 0 660 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:150px;">
              ${[
                ['Financial Services', 240, 56, '#1D9E75', '+12.4% YoY'],
                ['Tourism & Hospitality', 180, 88, '#185FA5', '+9.1% YoY'],
                ['Tech & Mfg', 140, 108, '#534AB7', '+7.8% YoY'],
                ['Real Estate', 100, 120, '#EF9F27', '+4.2% YoY'],
                ['Retail & Trade', 80, 128, '#9E9B94', '+2.1% YoY'],
              ].map(([label, barW, y, color, pct], i) => `
                <text x="4" y="${y-3}" font-size="10" fill="#6B6860" font-family="DM Sans">${label}</text>
                <rect x="4" y="${y}" width="${barW}" height="14" rx="3" fill="${color}" opacity="0.8"/>
                <text x="${barW+10}" y="${y+11}" font-size="10" fill="${color}" font-family="DM Sans" font-weight="600">${pct}</text>
              `).join('')}
            </svg>
          </div>`
        },
        {
          type: "evidence",
          eyebrow: "The Evidence",
          headline: "Abu Dhabi leads on the metric that matters most.",
          body: "When compared across five GCC economies on four key diversification indicators, Abu Dhabi's lead is not marginal ” it is structural. The non-oil premium (+1.8pp growth above oil sector) is the highest in the region and reflects a genuine shift in economic base, not just statistical effects.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">GCC diversification scorecard ” Q1/Q2 2026</div>
            <table style="width:100%;border-collapse:collapse;font-size:12px;">
              <thead><tr>
                <th style="text-align:left;padding:8px 10px;font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;border-bottom:1px solid var(--border);">Country</th>
                <th style="text-align:center;padding:8px;font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;border-bottom:1px solid var(--border);">Non-oil %</th>
                <th style="text-align:center;padding:8px;font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;border-bottom:1px solid var(--border);">GDP Growth</th>
                <th style="text-align:center;padding:8px;font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;border-bottom:1px solid var(--border);">FDI Inflow</th>
                <th style="text-align:center;padding:8px;font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;border-bottom:1px solid var(--border);">Rank</th>
              </tr></thead>
              <tbody>
                ${[
                  ['ðŸ‡¦ðŸ‡ª Abu Dhabi','56.3%','3.4%','$18.2B','#1','#E1F5EE','#085041',true],
                  ['ðŸ‡¸ðŸ‡¦ Saudi Arabia','49.1%','2.6%','$14.1B','#2','#F0EEE9','#6B6860',false],
                  ['ðŸ‡¶ðŸ‡¦ Qatar','44.7%','2.1%','$8.4B','#3','#F0EEE9','#6B6860',false],
                  ['ðŸ‡§ðŸ‡­ Bahrain','43.2%','2.8%','$3.1B','#4','#F0EEE9','#6B6860',false],
                  ['ðŸ‡°ðŸ‡¼ Kuwait','38.2%','1.8%','$2.6B','#5','#FCEBEB','#A32D2D',false],
                ].map(([c,noo,gdp,fdi,rank,bg,col,hl]) => `
                  <tr style="border-bottom:1px solid var(--border-light);${hl?'background:#F2FBF6;':''}" >
                    <td style="padding:9px 10px;font-weight:${hl?'600':'400'};${hl?'border-left:2.5px solid #1D9E75;':''}">${c}</td>
                    <td style="text-align:center;padding:9px 8px;"><span style="background:${bg};color:${col};padding:3px 8px;border-radius:4px;font-size:11px;font-weight:600;">${noo}</span></td>
                    <td style="text-align:center;padding:9px 8px;font-size:12px;font-weight:500;">${gdp}</td>
                    <td style="text-align:center;padding:9px 8px;font-size:12px;">${fdi}</td>
                    <td style="text-align:center;padding:9px 8px;"><span style="background:${bg};color:${col};padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700;">${rank}</span></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "Leading is not the same as locking in the lead.",
          body: "Abu Dhabi's #1 position is real and earned ” but it is not structurally secured. Saudi Arabia's Vision 2030 investments are in mid-cycle and will yield increasing returns through 2028. To stay ahead, Abu Dhabi must <strong>accelerate TVET alignment to non-oil sectors</strong>, <strong>deepen FDI in tech and advanced manufacturing</strong>, and ensure Emiratisation gains in high-value sectors outpace the GCC average.",
          chart: `<div class="slide-chart-area" style="background:var(--bg-card);border:1.5px solid var(--border);">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="background:var(--accent-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--accent-text);margin-bottom:8px;">Defend the lead</div>
                <div style="font-size:13.5px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Deepen TVET-to-non-oil pipeline</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">Align technical education output with the sectors driving the non-oil gain ” finance, tech, hospitality. Current skill supply lags demand by ~18 months.</div>
              </div>
              <div style="background:var(--blue-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--blue-text);margin-bottom:8px;">Extend the moat</div>
                <div style="font-size:13.5px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Anchor high-value FDI before SA catches up</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">Saudi Vision 2030 is mid-cycle. The 18-month window to deepen tech & advanced manufacturing FDI is now, not in 2028.</div>
              </div>
            </div>
          </div>`,
          actions: true
        }
      ]
    },

    // Story 2: Red Sea
    {
      title: "The Red Sea effect: how a shipping crisis became Abu Dhabi's food inflation",
      source: "SCAD+",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "Abu Dhabi imports 85% of its food. That makes it exposed.",
          body: "Food security has long been a strategic priority for Abu Dhabi. The emirate imports the vast majority of its food supply ” primarily through Jebel Ali and Fujairah ports. Under normal conditions, global shipping costs are manageable. But when a major shipping lane is disrupted, the impact on local consumer prices is not immediate ” it is delayed by 4 to 8 weeks.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Abu Dhabi food import dependency by source region</div>
            <svg viewBox="0 0 660 130" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:130px;">
              ${[
                ['South & Southeast Asia', 38, '#1D9E75'],
                ['Europe', 22, '#185FA5'],
                ['Middle East & Africa', 18, '#EF9F27'],
                ['Americas', 12, '#534AB7'],
                ['Australia & NZ', 10, '#E24B4A'],
              ].map(([label, pct, color], i) => {
                const barW = pct * 5.5;
                const y = 20 + i * 22;
                return `<text x="4" y="${y+12}" font-size="10" fill="#6B6860" font-family="DM Sans">${label}</text>
                <rect x="200" y="${y}" width="${barW}" height="14" rx="3" fill="${color}" opacity="0.75"/>
                <text x="${200+barW+8}" y="${y+11}" font-size="10" fill="${color}" font-family="DM Sans" font-weight="600">${pct}%</text>`;
              }).join('')}
              <text x="200" y="120" font-size="8" fill="#9E9B94" font-family="DM Sans">85% of total food supply imported Â· Sources: SCAD Trade Statistics 2025</text>
            </svg>
          </div>`
        },
        {
          type: "break",
          eyebrow: "The Break",
          headline: "December 2025: freight costs spiked 22%. Food prices followed 6 weeks later.",
          body: "Houthi attacks on Red Sea shipping lanes intensified in late November 2025, forcing carriers to reroute around the Cape of Good Hope ” adding 10“14 days and significant fuel costs per voyage. Global freight indices jumped 22% within weeks. Abu Dhabi's food CPI, lagging by the typical supply chain cycle, started rising in January 2026.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Global freight index vs Abu Dhabi food CPI ” Oct 2025 to Apr 2026</div>
            <svg viewBox="0 0 660 170" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:170px;">
              <line x1="60" y1="15" x2="60" y2="140" stroke="#E4E1D9" stroke-width="0.5"/>
              <line x1="60" y1="140" x2="640" y2="140" stroke="#E4E1D9" stroke-width="0.5"/>
              <!-- grid -->
              ${[0,1,2,3].map(i => `<line x1="60" y1="${140-i*35}" x2="640" y2="${140-i*35}" stroke="#E4E1D9" stroke-width="0.3" stroke-dasharray="3,3"/>`).join('')}
              <!-- Freight line (red, leads) -->
              <polyline points="60,120 145,118 230,90 315,55 400,45 485,50 570,55 640,58" stroke="#E24B4A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <!-- Food CPI line (amber, lags) -->
              <polyline points="60,125 145,124 230,122 315,118 400,100 485,78 570,68 640,62" stroke="#EF9F27" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="5,3"/>
              <!-- Event markers -->
              <line x1="230" y1="15" x2="230" y2="145" stroke="#E24B4A" stroke-width="0.75" stroke-dasharray="2,2"/>
              <rect x="180" y="5" width="100" height="14" rx="2" fill="#FCEBEB"/>
              <text x="230" y="15" text-anchor="middle" font-size="7.5" fill="#A32D2D" font-family="DM Sans" font-weight="600">Red Sea shock (Dec '25)</text>
              <line x1="400" y1="15" x2="400" y2="145" stroke="#EF9F27" stroke-width="0.75" stroke-dasharray="2,2"/>
              <rect x="352" y="5" width="96" height="14" rx="2" fill="#FAEEDA"/>
              <text x="400" y="15" text-anchor="middle" font-size="7.5" fill="#633806" font-family="DM Sans" font-weight="600">Food CPI rises (Feb '26)</text>
              <!-- Legend -->
              <line x1="65" y1="158" x2="90" y2="158" stroke="#E24B4A" stroke-width="2.5"/>
              <text x="94" y="162" font-size="9" fill="#9E9B94" font-family="DM Sans">Global freight index</text>
              <line x1="230" y1="158" x2="255" y2="158" stroke="#EF9F27" stroke-width="2.5" stroke-dasharray="4,2"/>
              <text x="259" y="162" font-size="9" fill="#9E9B94" font-family="DM Sans">Abu Dhabi food CPI (lagged ~6 wks)</text>
              <!-- x-axis labels -->
              ${['Oct','Nov','Dec','Jan','Feb','Mar','Apr'].map((m,i) => `<text x="${60+i*96.6}" y="154" font-size="9" fill="#9E9B94" font-family="DM Sans" text-anchor="middle">${m}</text>`).join('')}
            </svg>
          </div>`
        },
        {
          type: "evidence",
          eyebrow: "The Evidence",
          headline: "Fujairah absorbed part of the shock. Not all of it.",
          body: "Abu Dhabi's advantage over most GCC peers is Fujairah ” a deep-water port outside the Strait of Hormuz that was already handling rerouted traffic from the Red Sea disruption. It absorbed approximately <strong>18% of the volume increase</strong>. Without it, the food CPI impact would have been estimated at +0.8pp rather than the actual +0.4pp seen.",
          chart: `<div class="slide-chart-area">
            <div class="slide-stat-row" style="grid-template-columns:repeat(4,1fr);">
              <div class="slide-stat"><div class="slide-stat-val" style="color:var(--red);">+22%</div><div class="slide-stat-lbl">Global freight cost increase YTD</div></div>
              <div class="slide-stat"><div class="slide-stat-val" style="color:var(--amber);">+0.4pp</div><div class="slide-stat-lbl">Estimated food CPI impact, AD</div></div>
              <div class="slide-stat"><div class="slide-stat-val" style="color:var(--accent);">18%</div><div class="slide-stat-lbl">Volume absorbed via Fujairah reroute</div></div>
              <div class="slide-stat"><div class="slide-stat-val">6 wks</div><div class="slide-stat-lbl">Typical supply chain lag to retail prices</div></div>
            </div>
          </div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "This is a recurring vulnerability. Mitigation requires policy, not just routing.",
          body: "Red Sea disruptions are likely to recur. Abu Dhabi's food import dependency means each major freight disruption will translate to a CPI spike within 6“8 weeks. Two complementary strategies reduce this exposure: <strong>strategic food reserve deepening</strong> (extending buffer stock from 3 to 6 months for key staples) and <strong>import tax flexibility</strong> ” a pre-authorised trigger mechanism that reduces duty automatically when freight indices cross a defined threshold.",
          chart: `<div class="slide-chart-area" style="background:var(--bg-card);border:1.5px solid var(--border);">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div style="background:var(--accent-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--accent-text);margin-bottom:8px;">Buffer stock</div>
                <div style="font-size:13.5px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Extend strategic food reserves to 6 months</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">Current 3-month buffer provides limited cushion against multi-month disruptions. Doubling coverage for key staples (wheat, rice, cooking oil) costs ~AED 180M annually but prevents CPI spikes costing multiples more.</div>
              </div>
              <div style="background:var(--amber-light);border-radius:var(--radius-md);padding:16px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:var(--amber-text);margin-bottom:8px;">Policy trigger</div>
                <div style="font-size:13.5px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">Pre-authorise duty relief when freight crosses threshold</div>
                <div style="font-size:11.5px;color:var(--text-secondary);line-height:1.5;">A standing mechanism that auto-reduces import duty by 3“5% when the global freight index exceeds +15% removes the policy lag that currently lets price shocks develop before action is taken.</div>
              </div>
            </div>
          </div>`,
          actions: true
        }
      ]
    },

    // Story 3: Emiratisation split
    {
      title: "Emiratisation: winning in finance, losing in services",
      source: "SCAD",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "The headline gap is âˆ’0.6pp. But the story behind it is more complex.",
          body: "Abu Dhabi's overall Emiratisation rate sits 0.6 percentage points below the annual target ” a concern that has triggered Recommended Actions on this homepage. But aggregates hide divergence. When the labour data is broken down by sector, a striking split emerges: some sectors are significantly exceeding their Emiratisation targets while one large sector is pulling the entire average below the line.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Emiratisation rate vs target ” by sector, Q2 2026</div>
            <svg viewBox="0 0 660 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:150px;">
              ${[
                ['Financial Services', 78, 70, '#1D9E75'],
                ['Government & Public', 92, 90, '#1D9E75'],
                ['Education', 55, 52, '#1D9E75'],
                ['Retail & Trade', 28, 27, '#EF9F27'],
                ['Hospitality & Tourism', 18, 21, '#E24B4A'],
                ['Private Services', 12, 18, '#E24B4A'],
              ].map(([label, actual, target, color], i) => {
                const y = 14 + i * 22;
                const aW = actual * 3.2;
                const tW = target * 3.2;
                return `<text x="4" y="${y+12}" font-size="9.5" fill="#6B6860" font-family="DM Sans">${label}</text>
                  <rect x="188" y="${y}" width="${aW}" height="13" rx="2" fill="${color}" opacity="0.75"/>
                  <line x1="${188+tW}" y1="${y-2}" x2="${188+tW}" y2="${y+17}" stroke="${color === '#E24B4A' ? '#A32D2D' : '#085041'}" stroke-width="1.5" stroke-dasharray="2,1"/>
                  <text x="${188+aW+6}" y="${y+11}" font-size="9" fill="${color}" font-family="DM Sans" font-weight="600">${actual}%</text>`;
              }).join('')}
              <text x="188" y="147" font-size="8" fill="#9E9B94" font-family="DM Sans">Bar = actual Â· Dashed line = target</text>
            </svg>
          </div>`
        },
        {
          type: "break",
          eyebrow: "The Break",
          headline: "Services is the single sector dragging the national average below target.",
          body: "Private services ” which encompasses retail, hospitality, F&amp;B, and personal services ” employs the largest share of the total workforce, making its Emiratisation rate disproportionately influential on the national average. At 12% actual against an 18% target, it has a <strong>âˆ’6pp gap</strong> that single-handedly moves the aggregate below the national target, even though every other major sector is on or above track.",
          chart: `<div class="slide-chart-area">
            <div class="slide-chart-title">Sector contribution to national Emiratisation gap</div>
            <svg viewBox="0 0 660 150" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:150px;">
              <rect x="4" y="30" width="60" height="90" rx="4" fill="#F0EEE9"/>
              <text x="34" y="70" text-anchor="middle" font-size="8.5" fill="#6B6860" font-family="DM Sans" font-weight="600">National</text>
              <text x="34" y="82" text-anchor="middle" font-size="8.5" fill="#6B6860" font-family="DM Sans">average</text>
              <text x="34" y="97" text-anchor="middle" font-size="10" fill="#E24B4A" font-family="DM Sans" font-weight="700">âˆ’0.6pp</text>
              <!-- flows in -->
              <path d="M64,46 C130,46 130,30 190,30" stroke="#1D9E75" stroke-width="20" fill="none" opacity="0.5" stroke-linecap="round"/>
              <path d="M64,75 C130,75 130,65 190,65" stroke="#EF9F27" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>
              <path d="M64,100 C130,100 130,108 190,108" stroke="#E24B4A" stroke-width="28" fill="none" opacity="0.55" stroke-linecap="round"/>
              <!-- sector labels -->
              <rect x="190" y="18" width="130" height="22" rx="3" fill="#E1F5EE"/>
              <text x="255" y="27" text-anchor="middle" font-size="8.5" fill="#085041" font-family="DM Sans" font-weight="600">Finance, Gov, Education</text>
              <text x="255" y="37" text-anchor="middle" font-size="9" fill="#085041" font-family="DM Sans" font-weight="700">+2.1pp above target âœ“</text>
              <rect x="190" y="57" width="130" height="16" rx="3" fill="#FAEEDA"/>
              <text x="255" y="69" text-anchor="middle" font-size="8.5" fill="#633806" font-family="DM Sans" font-weight="600">Retail: on-track (+1.1%)</text>
              <rect x="190" y="95" width="130" height="26" rx="3" fill="#FCEBEB"/>
              <text x="255" y="106" text-anchor="middle" font-size="8.5" fill="#A32D2D" font-family="DM Sans" font-weight="700">Private Services sector</text>
              <text x="255" y="117" text-anchor="middle" font-size="10" fill="#791F1F" font-family="DM Sans" font-weight="700">âˆ’6pp below target âœ—</text>
              <!-- arrow and label -->
              <text x="340" y="108" font-size="28" fill="#E24B4A" font-family="DM Sans" font-weight="700">â†˜</text>
              <rect x="360" y="92" width="130" height="30" rx="4" fill="#FCEBEB" stroke="#F7C1C1" stroke-width="0.5"/>
              <text x="425" y="105" text-anchor="middle" font-size="9" fill="#A32D2D" font-family="DM Sans" font-weight="600">Single sector moves</text>
              <text x="425" y="117" text-anchor="middle" font-size="9" fill="#A32D2D" font-family="DM Sans" font-weight="600">national number below target</text>
            </svg>
          </div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "One targeted intervention closes the national gap.",
          body: "Because the gap is concentrated in one sector, the intervention strategy can be precise. A sector-specific Emiratisation incentive for private services ” combining <strong>wage subsidy for the first 2 years</strong> of Emirati hire, <strong>TVET pathway fast-tracking</strong> for service industry certifications, and <strong>regulatory compliance monitoring</strong> with public reporting ” can close the gap within 3“4 quarters without blanket policy changes across all sectors.",
          chart: `<div class="slide-chart-area" style="background:var(--bg-card);border:1.5px solid var(--border);">
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
              <div style="background:var(--red-light);border-radius:var(--radius-md);padding:14px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--red-text);margin-bottom:6px;">Incentive</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">2-year wage subsidy</div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">Cover 30% of salary cost for each new Emirati hire in private services sector for first 24 months.</div>
              </div>
              <div style="background:var(--accent-light);border-radius:var(--radius-md);padding:14px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--accent-text);margin-bottom:6px;">Pipeline</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">Fast-track TVET for services</div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">6-month service industry certifications in hospitality, retail management, and F&B operations.</div>
              </div>
              <div style="background:var(--blue-light);border-radius:var(--radius-md);padding:14px;">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:var(--blue-text);margin-bottom:6px;">Accountability</div>
                <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:4px;">Quarterly compliance dashboard</div>
                <div style="font-size:11px;color:var(--text-secondary);line-height:1.5;">Public sector-by-sector Emiratisation scorecard. Naming and transparency as the accountability mechanism.</div>
              </div>
            </div>
          </div>`,
          actions: true
        }
      ]
    },

    // Story 4: FDI inflows
    {
      title: "FDI inflows: strongest Q1 performance in six years",
      source: "SCAD+",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "Non-oil FDI delivered a standout Q1 2026.",
          body: "Foreign direct investment inflows surged <strong>+11.2% YoY</strong> to <strong>AED 47.8B</strong> — the strongest Q1 performance in six years — underscoring sustained investor confidence in Abu Dhabi's diversification story.",
          chart: `<div class="slide-chart-area"><div class="slide-stat-row"><div class="slide-stat"><div class="slide-stat-val">+11.2%</div><div class="slide-stat-lbl">YoY FDI growth</div></div><div class="slide-stat"><div class="slide-stat-val">AED 47.8B</div><div class="slide-stat-lbl">Q1 2026 inflows</div></div></div></div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "Anchor high-value FDI while momentum is strongest.",
          body: "Tech, advanced manufacturing, and AI-linked investment pipelines remain the priority sectors to extend Abu Dhabi's GCC lead in non-oil FDI before regional competition intensifies.",
          actions: true
        }
      ]
    },

    // Story 5: GDP growth
    {
      title: "GDP growth beats GCC average for third consecutive quarter",
      source: "SCAD",
      slides: [
        {
          type: "setup",
          eyebrow: "The Setup",
          headline: "Abu Dhabi real GDP growth remains above the GCC benchmark.",
          body: "Real YoY GDP expanded <strong>3.4%</strong> in Q2 2026 — exceeding the GCC average of 2.6% for a third consecutive quarter and keeping Vision 2030 trajectory intact.",
          chart: `<div class="slide-chart-area"><div class="slide-stat-row"><div class="slide-stat"><div class="slide-stat-val">3.4%</div><div class="slide-stat-lbl">Abu Dhabi real YoY GDP</div></div><div class="slide-stat"><div class="slide-stat-val">2.6%</div><div class="slide-stat-lbl">GCC average</div></div><div class="slide-stat"><div class="slide-stat-val">+0.8pp</div><div class="slide-stat-lbl">Premium vs benchmark</div></div></div></div>`
        },
        {
          type: "sowhat",
          eyebrow: "The So What",
          headline: "Sustain the growth premium through non-oil momentum.",
          body: "Continued diversification in finance, tourism, and advanced manufacturing is required to defend the #1 GCC growth position as peer economies accelerate their own reform cycles.",
          actions: true
        }
      ]
    }
  ];
  let currentStory = 0;
  let currentSlide = 0;

  function renderExecStory() {
    const story = EXEC_STORIES[currentStory];
    const slide = story.slides[currentSlide];
    const total = story.slides.length;
    document.getElementById("exec-sv-title").textContent = story.title;
    document.getElementById("exec-sv-slide-count").textContent = "Slide " + (currentSlide + 1) + " of " + total;
    document.getElementById("exec-sv-progress-track").style.width = ((currentSlide + 1) / total * 100) + "%";
    const dotsEl = document.getElementById("exec-sv-dots");
    dotsEl.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const d = document.createElement("div");
      d.className = "exec-sv-dot" + (i === currentSlide ? " active" : "");
      d.addEventListener("click", () => { currentSlide = i; renderExecStory(); });
      dotsEl.appendChild(d);
    }
    document.getElementById("exec-sv-prev").disabled = currentSlide === 0;
    const nextBtn = document.getElementById("exec-sv-next");
    if (currentSlide === total - 1) {
      nextBtn.innerHTML = "Close story <i class=\"ti ti-check\"></i>";
      nextBtn.onclick = closeExecStory;
    } else {
      nextBtn.innerHTML = "Next <i class=\"ti ti-arrow-right\"></i>";
      nextBtn.onclick = nextExecSlide;
    }
    const eyebrowClass = { setup: "exec-slide-eyebrow--setup", break: "exec-slide-eyebrow--break", evidence: "exec-slide-eyebrow--evidence", sowhat: "exec-slide-eyebrow--sowhat" }[slide.type];
    const actionHTML = slide.actions ? `<div class="exec-slide-actions"><button type="button" class="btn btn-primary" data-exec-open-agent><i class="ti ti-player-play"></i> Open in Simulation Agent</button><button type="button" class="btn btn-secondary"><i class="ti ti-file-analytics"></i> View full analysis report</button></div>` : "";
    const content = document.getElementById("exec-sv-slide-content");
    content.innerHTML = `<div class="exec-slide-wrap"><div class="exec-slide-eyebrow ${eyebrowClass}">${slide.eyebrow}</div><div class="exec-slide-headline">${slide.headline}</div><div class="exec-slide-body">${slide.body}</div>${slide.chart || ""}${actionHTML}</div>`;
    content.querySelectorAll("[data-exec-open-agent]").forEach((btn) => btn.addEventListener("click", openExecSimulationAgent));
    content.querySelectorAll("[data-exec-story-close]").forEach((btn) => btn.addEventListener("click", closeExecStory));
    content.style.animation = "none";
    void content.offsetHeight;
    content.style.animation = "";
  }

  function openExecStory(idx) {
    currentStory = idx;
    currentSlide = 0;
    renderExecStory();
    const overlay = document.getElementById("exec-story-overlay");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeExecStory() {
    const overlay = document.getElementById("exec-story-overlay");
    if (overlay) overlay.hidden = true;
    document.body.style.overflow = "";
  }

  function openExecSimulationAgent() {
    closeExecStory();
    if (typeof window.openAgentWorkspace === "function") {
      window.openAgentWorkspace();
      return;
    }
    if (typeof window.agentGoTo === "function") {
      window.agentGoTo("av-workspace");
    }
  }

  function nextExecSlide() {
    if (currentSlide < EXEC_STORIES[currentStory].slides.length - 1) {
      currentSlide++;
      renderExecStory();
    }
  }

  function prevExecSlide() {
    if (currentSlide > 0) {
      currentSlide--;
      renderExecStory();
    }
  }

  function initExecStoryViewer() {
    if (document.body.dataset.execStoriesReady) return;
    document.body.dataset.execStoriesReady = "1";
    document.querySelectorAll("[data-exec-story]").forEach((card) => {
      card.addEventListener("click", () => openExecStory(Number(card.dataset.execStory)));
    });
    document.getElementById("exec-sv-close")?.addEventListener("click", closeExecStory);
    document.getElementById("exec-sv-prev")?.addEventListener("click", prevExecSlide);
    document.querySelector(".exec-story-overlay-bg")?.addEventListener("click", closeExecStory);
    document.addEventListener("keydown", (e) => {
      const overlay = document.getElementById("exec-story-overlay");
      if (!overlay || overlay.hidden) return;
      if (e.key === "ArrowRight") nextExecSlide();
      if (e.key === "ArrowLeft") prevExecSlide();
      if (e.key === "Escape") closeExecStory();
    });
  }

  window.openExecStory = openExecStory;
  window.closeExecStory = closeExecStory;
  window.initExecStoryViewer = initExecStoryViewer;
})();
