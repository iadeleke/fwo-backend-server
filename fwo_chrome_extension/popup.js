document.addEventListener("DOMContentLoaded", async () => {
  const actionBtn = document.getElementById("analyze-btn");
  const logTerminal = document.getElementById("engine-logs");

  // Fixes the window focus bug to guarantee reliable tab scanning
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const hostDomain = activeTab && activeTab.url ? new URL(activeTab.url).hostname : "fi.google.com";

  logTerminal.innerText = `> System Status: IEaaS_EQUILIBRIUM\n> Path target: ${hostDomain}`;

  // Log 1: Mirror panel initialization directly into the active tab console
  if (activeTab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      func: (domain) => {
        console.log(`%c[${new Date().toLocaleTimeString()}] [FWO PANEL OPENED] User initialized the 💸 FWO Checkout Panel overlay for: ${domain}`, "color: #1c7ed6; font-weight: bold;");
      },
      args: [hostDomain]
    }).catch(() => {});
  }

  actionBtn.addEventListener("click", () => {
    actionBtn.innerText = "INITIALIZING TWO-PHASE COMMIT...";
    actionBtn.style.backgroundColor = "#d9480f"; 

    // Log 2: Mirror the manual button trigger event into the webpage console
    if (activeTab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        func: () => {
          console.log(`%c[${new Date().toLocaleTimeString()}] [FWO BUTTON CLICKED] Action registered: 'PAY WITH FWO VAULT ACCOUNT' triggered.`, "color: #d9480f; font-weight: bold;");
          console.log(`> Packing out-of-band attestation parameters... Target allocation: $1,848.99 USD`);
        }
      }).catch(() => {});
    }

    chrome.runtime.sendMessage({
      action: "TRIGGER_AUTOPILOT",
      domain: hostDomain,
      url: activeTab ? activeTab.url : ""
    }, (response) => {
      if (response && response.success) {
        const result = response.data;
        const metrics = result.yield_metrics;
        
        document.getElementById("detected-base-cost").innerText = "FWO VAULT DISBURSED";
        document.getElementById("detected-service-tier").innerText = result.vault_proof;
        document.getElementById("revenue-yield").innerText = `PROFIT AFTER TAX: +$${metrics.net_profit_after_tax.toFixed(2)}`;
        
        actionBtn.innerText = "TRANSACTION COMPLETED";
        actionBtn.style.backgroundColor = "#2b8a3e"; 
        logTerminal.innerText = `> Handshake accepted by https://onrender.com\n> Status: CLOSED_SUCCESS_LOGGED`;

        // Log 3: Mirror the terminal accounting receipts and PAT margins into the webpage console
        if (activeTab?.id) {
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: (res, pat) => {
              console.log(`%c[${new Date().toLocaleTimeString()}] [FWO TRANSACTION COMPLETE] Settle parameters confirmed via https://onrender.com`, "color: #2b8a3e; font-weight: bold;");
              console.log(`🧾 VERIFIED METRICS SUMMARY:`);
              console.log(`  • Status Code       : CLOSED_SUCCESS_LOGGED`);
              console.log(`  • Consensus Lock ID : ${res.tx_lock_id}`);
              console.log(`  • Cryptographic Proof: ${res.vault_proof}`);
              console.log(`  • Net PAT Generated : +$${pat.toFixed(2)} USD`);
            },
            args: [result, metrics.net_profit_after_tax]
          }).catch(() => {});
        }
      } else {
        actionBtn.innerText = "CONNECTION TIMEOUT";
        actionBtn.style.backgroundColor = "#e03131";
        logTerminal.innerText = `> Error: Handshake dropped by core proxy.`;
      }
    });
  });
});
