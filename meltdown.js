function triggerMeltdown() {
  const output = document.getElementById("meltdown-output");
  const overlay = document.getElementById("meltdown");
  const sound = document.getElementById("meltdown-sound");

  overlay.classList.remove("hidden");
  output.textContent = "";
  output.classList.remove("corrupted");

  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const fakeFiles = [];

  for (let i = 0; i < 500; i++) {
    const dir = Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const file = Math.random().toString(36).slice(2, 10);
    fakeFiles.push(`⚠️ deleting: /${dir}/${file}`);
  }

  let i = 0;
const interval = setInterval(() => {
  if (i >= fakeFiles.length) {
    clearInterval(interval);
    output.classList.add("corrupted");
    output.textContent += "\n💀 SYSTEM FAILURE IMMINENT 💀\n";
    output.textContent += "KERNEL PANIC — CPU MELTDOWN\n";
    output.textContent += "All files have been destroyed...\n\n";

    setTimeout(() => {
      document.getElementById("meltdown").classList.add("hidden");
      document.getElementById("bsod-screen").classList.remove("hidden");
    }, 2000); // Wait 2 sec before showing BSOD
    return;
  }

  if (Math.random() < 0.07) {
    output.textContent += generateCorruptionLine() + "\n";
  } else {
    output.textContent += fakeFiles[i] + "\n";
  }

  output.scrollTop = output.scrollHeight;
  i++;
}, 10);

}

function generateCorruptionLine() {
  const junk = "!@#$%^&*()_+=-[]{}|;:',.<>?/\\~`";
  let line = "";
  for (let i = 0; i < 50; i++) {
    line += junk[Math.floor(Math.random() * junk.length)];
  }
  return "!!CORRUPTED!!: " + line;
}
