document.addEventListener("DOMContentLoaded", async () => {
  const actionBtn = document.getElementById("analyze-btn");
  const logTerminal = document.getElementById("engine-logs");

  // Fixes the window focus bug to guarantee reliable tab scanning
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const hostDomain = activeTab && activeTab.url ? new URL(activeTab.url).hostname : "://google.com";

  logTerminal.innerText = `> System Status: IEaaS_EQUILIBRIUM\n> Path target: ${hostDomain}`;

  // Log 1: Print panel initialization directly into the active webpage tab console
  if (activeTab?.id) {
    chrome.tabs.executeScript(activeTab.id, {
      code: `console.log("%c[${new Date().toLocaleTimeString()}] [FWO PANEL OPENED] User initialized the 💸 FWO Checkout Panel overlay.", "color: #1c7ed6; font-weight: bold;");`
    }).catch(() => {});
  }

  actionBtn.addEventListener("click", () => {
    actionBtn.innerText = "INITIALIZING TWO-PHASE COMMIT...";
    actionBtn.style.backgroundColor = "#d9480f"; 

    // Log 2: Print manual button trigger event into the webpage console
    if (activeTab?.id) {
      chrome.tabs.executeScript(activeTab.id, {
        code: `console.log("%c[${new Date().toLocaleTimeString()}] [FWO BUTTON CLICKED] Action registered: 'PAY WITH FWO VAULT ACCOUNT' triggered.", "color: #d9480f; font-weight: bold;");
              console.log("> Packing out-of-band attestation parameters... Target allocation: $1,848.99 USD");`
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

        // Log 3: Print final transaction receipts and PAT margins into the webpage console
        if (activeTab?.id) {
          chrome.tabs.executeScript(activeTab.id, {
            code: `console.log("%c[${new Date().toLocaleTimeString()}] [FWO TRANSACTION COMPLETE] Settle parameters confirmed.", "color: #2b8a3e; font-weight: bold;");
                  console.log("🧾 VERIFIED METRICS SUMMARY:");
                  console.log("  • Status Code       : CLOSED_SUCCESS_LOGGED");
                  console.log("  • Consensus Lock ID : ${result.tx_lock_id}");
                  console.log("  • Cryptographic Proof: ${result.vault_proof}");
                  console.log("  • Net PAT Generated : +$${metrics.net_profit_after_tax.toFixed(2)} USD");`
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
