const key = "theme-preference"; // "dark" | "light" | null

const applyTheme = (mode) => {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (mode) root.classList.add(mode);
};

const detectSystem = () =>
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark" : "light";

// Initial: saved -> system (no write to storage for system)
(() => {
  const saved = localStorage.getItem(key);
  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else {
    // Force dark as baseline if nothing saved
    applyTheme("dark");
  }
})();

// Toggle cycles explicit modes; if none set yet, start from system
const current = () =>
  document.documentElement.classList.contains("dark") ? "dark" :
  document.documentElement.classList.contains("light") ? "light" : null;

const setAndSave = (mode) => {
  applyTheme(mode);
  localStorage.setItem(key, mode);
};

const toggle = () => {
  const cur = current() || detectSystem();
  setAndSave(cur === "dark" ? "light" : "dark");
};

// Button + keyboard
const btn = document.getElementById("themeToggle");
if (btn) btn.onclick = toggle;
window.addEventListener("keydown", (e) => {
  if (e.key && e.key.toLowerCase() === "t") toggle();
});
