document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("div.highlight").forEach((codeBlock) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.type = "button";
    button.innerText = "Copy";

    button.addEventListener("click", () => {
      const code = codeBlock.querySelector("pre").innerText;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          button.innerText = "Copied!";
          setTimeout(() => {
            button.innerText = "Copy";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy!", err);
        });
    });

    // Append the button to the code block
    codeBlock.appendChild(button);
    codeBlock.style.position = "relative"; // Ensure code block is positioned relative
  });
});
