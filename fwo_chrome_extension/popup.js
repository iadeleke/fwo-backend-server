document.addEventListener("DOMContentLoaded", async () => {
  const actionBtn = document.getElementById("analyze-btn");
  const logTerminal = document.getElementById("engine-logs");

  // Solves the floating window bug to lock onto the correct browser context
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const hostDomain = activeTab && activeTab.url ? new URL(activeTab.url).hostname : "://google.com";

  logTerminal.innerText = `> System Status: IEaaS_EQUILIBRIUM\n> Path target: ${hostDomain}`;

  // Log 1: Alert the content script that the extension panel has opened
  if (activeTab?.id) {
    chrome.tabs.sendMessage(activeTab.id, { action: "EXTENSION_OPENED", domain: hostDomain }).catch(() => {});
  }

  actionBtn.addEventListener("click", () => {
    actionBtn.innerText = "INITIALIZING TWO-PHASE COMMIT...";
    actionBtn.style.backgroundColor = "#d9480f"; 

    // Log 2: Alert the content script that the pay button was clicked
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, { action: "BUTTON_CLICKED" }).catch(() => {});
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

        // Log 3: Dispatch final transaction receipts and PAT metrics down the open tab channel
        if (activeTab?.id) {
          chrome.tabs.sendMessage(activeTab.id, { action: "TRANSACTION_SUCCESS", data: result, pat: metrics.net_profit_after_tax }).catch(() => {});
        }
      } else {
        actionBtn.innerText = "CONNECTION TIMEOUT";
        actionBtn.style.backgroundColor = "#e03131";
        logTerminal.innerText = `> Error: Handshake dropped by core proxy.`;
      }
    });
  });
});
