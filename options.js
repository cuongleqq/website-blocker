const KEY = "config";
const ta = document.getElementById("cfg");

document.addEventListener("DOMContentLoaded", () =>
  chrome.storage.local.get(
    KEY,
    (d) =>
      (ta.value = JSON.stringify(
        d[KEY] ?? { patterns: [], schedule: {} },
        null,
        2
      ))
  )
);

document.getElementById("save").onclick = () => {
  try {
    const obj = JSON.parse(ta.value);
    chrome.storage.local.set({ [KEY]: obj }, () => alert("Saved!"));
  } catch (e) {
    alert("JSON error: " + e.message);
  }
};
