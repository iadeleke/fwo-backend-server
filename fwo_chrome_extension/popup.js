document.addEventListener("DOMContentLoaded", async () => {
  const actionBtn = document.getElementById("analyze-btn");
  const logTerminal = document.getElementById("engine-logs");

  // Query browser tab attributes safely using active window contexts
  const [activeTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  const hostDomain = activeTab && activeTab.url ? new URL(activeTab.url).hostname : "://google.com";

  logTerminal.innerText = `> System Status: IEaaS_EQUILIBRIUM\n> Path target: ${hostDomain}`;

  // 1. Broadcast to Google Fi console the exact millisecond the extension opens
  if (activeTab?.id) {
    chrome.tabs.sendMessage(activeTab.id, { action: "LOG_EXTENSION_OPEN" }).catch(() => {});
  }

  actionBtn.addEventListener("click", () => {
    actionBtn.innerText = "INITIALIZING TWO-PHASE COMMIT...";
    actionBtn.style.backgroundColor = "#d9480f"; 

    // 2. Broadcast button click directly to the visible Google Fi console tab
    if (activeTab?.id) {
      chrome.tabs.sendMessage(activeTab.id, { action: "LOG_BUTTON_CLICK" }).catch(() => {});
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
        
        logTerminal.innerText = `> Handshake accepted by https://onrender.com\n> Ledger Status: CLOSED_SUCCESS_LOGGED\n> Webhook sent directly to storefront.`;

        // 3. Broadcast final financial receipts and PAT parameters to webpage console
        if (activeTab?.id) {
          chrome.tabs.sendMessage(activeTab.id, { action: "LOG_TRANSACTION_SUCCESS", data: result }).catch(() => {});
        }
      } else {
        actionBtn.innerText = "CONNECTION TIMEOUT";
        actionBtn.style.backgroundColor = "#e03131";
        logTerminal.innerText = `> Error: Token payload verification handshake dropped by core proxy.`;
      }
    });
  });
});
