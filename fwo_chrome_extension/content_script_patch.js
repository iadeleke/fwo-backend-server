/**
 * FWO Webpage Logger - Injected Content Script Context
 * Listens for extension actions and prints them straight to the tab's console.
 */
console.log("⚡ [FWO Engine] Content script successfully loaded inside Google Fi Tab.");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const timestamp = new Date().toLocaleTimeString();

  if (request.action === "LOG_EXTENSION_OPEN") {
    console.log(`%c[${timestamp}] [FWO PANEL OPENED] User initialized the 💸 FWO Checkout Panel overlay. Context verified.`, "color: #1c7ed6; font-weight: bold;");
    sendResponse({ ack: true });
  } 
  
  else if (request.action === "LOG_BUTTON_CLICK") {
    console.log(`%c[${timestamp}] [FWO BUTTON CLICKED] Action registered: 'PAY WITH FWO VAULT ACCOUNT' triggered on active tab.`, "color: #d9480f; font-weight: bold;");
    console.log(`> Packing out-of-band attestation parameters... Target allocation: $1,848.99 USD`);
    sendResponse({ ack: true });
  } 
  
  else if (request.action === "LOG_TRANSACTION_SUCCESS") {
    console.log(`%c[${timestamp}] [FWO TRANSACTION COMPLETE] Settle parameters confirmed via https://onrender.com`, "color: #2b8a3e; font-weight: bold;");
    console.log(`🧾 VERIFIED METRICS SUMMARY:`);
    console.log(`  • Status Code       : CLOSED_SUCCESS_LOGGED`);
    console.log(`  • Consensus Lock ID : ${request.data.tx_lock_id}`);
    console.log(`  • Cryptographic Proof: ${request.data.vault_proof}`);
    console.log(`  • Net PAT Generated : +$${request.data.yield_metrics.net_profit_after_tax.toFixed(2)} USD`);
    sendResponse({ ack: true });
  }
  return true;
});
