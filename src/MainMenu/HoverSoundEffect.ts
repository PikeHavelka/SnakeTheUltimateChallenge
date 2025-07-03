export const hoverSoundEffect = () => {
  const soundEffect = new Audio("/sounds/btnHoverSound.mp3");
  const btnContainer = document.getElementById(
    "btnContainer"
  ) as HTMLElement | null;
  const buttons = btnContainer?.querySelectorAll("button") as NodeList | null;

  if (buttons && soundEffect) {
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        soundEffect.currentTime = 0;
        soundEffect.play();
        soundEffect.volume = 0.5;
      });
    });
  }
};
