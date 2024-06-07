document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("dark-mode-toggle");

  if (!toggleButton) {
    console.error("Toggle button not found!");
    return;
  }

  const applyTheme = (theme) => {
    document.body.classList.remove("light", "dark-mode");
    document.body.classList.add(theme);
    console.log(`Applied theme: ${theme}`);
  };

  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);

  toggleButton.addEventListener("click", function () {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark-mode";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    console.log(`Theme switched to: ${newTheme}`);
  });
});
