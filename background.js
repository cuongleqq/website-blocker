const CONFIG_KEY = "config";
const REDIRECT_URL = "https://www.google.com/";
const DAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/* ------------ helpers ------------ */
const dayKey = (d) => DAYS[(d ?? new Date()).getDay()];
const minutes = (d) => d.getHours() * 60 + d.getMinutes();
const inWindow = (winList, now = new Date()) => {
  const m = minutes(now);
  return winList.some(([hStart, hEnd]) => m >= hStart * 60 && m < hEnd * 60);
};

/* ------------ rule builder ------------ */
async function rebuildRules() {
  const { [CONFIG_KEY]: cfg = { patterns: [], schedule: {} } } =
    await chrome.storage.local.get(CONFIG_KEY);

  const today = dayKey();
  const windows = cfg.schedule?.[today] ?? [];
  const active = inWindow(windows);

  // remove old rules first
  const old = await chrome.declarativeNetRequest.getDynamicRules();
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: old.map((r) => r.id),
    addRules: active
      ? cfg.patterns.map((pat, i) => ({
          id: i + 1,
          priority: 1,
          action: { type: "redirect", redirect: { url: REDIRECT_URL } },
          condition: { urlFilter: pat, resourceTypes: ["main_frame"] },
        }))
      : [],
  });
}

/* ------------ lifecycle ------------ */
chrome.runtime.onInstalled.addListener(rebuildRules);
chrome.runtime.onStartup.addListener(rebuildRules);

chrome.alarms.create("schedule-tick", { periodInMinutes: 1 }); // MV3-safe timer  [oai_citation:1‡Chrome for Developers](https://developer.chrome.com/docs/extensions/reference/api/alarms?utm_source=chatgpt.com) [oai_citation:2‡Chrome for Developers](https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events?utm_source=chatgpt.com)
chrome.alarms.onAlarm.addListener(
  (a) => a.name === "schedule-tick" && rebuildRules()
);

chrome.storage.onChanged.addListener(
  (ch) => CONFIG_KEY in ch && rebuildRules()
);
