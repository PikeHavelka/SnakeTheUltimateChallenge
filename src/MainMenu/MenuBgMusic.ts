export const menuBgMusic = () => {
  const toggleButton = document.getElementById("soundBTN") as HTMLButtonElement | null;
  const bgAudio = new Audio("/sounds/menuBgMusic.mp3");
  const iconOff = document.querySelector("#soundOffIcon") as SVGElement | null;
  const iconOn = document.querySelector("#soundOnIcon") as SVGElement | null;

  let isPlaying = false;

  if (toggleButton && bgAudio && iconOff && iconOn) {
    toggleButton.addEventListener("click", () => {
      if (!isPlaying) {
        bgAudio.play();
        bgAudio.volume = 0.1;
        bgAudio.loop = true;
      } else {
        bgAudio.pause();
      }

      isPlaying = !isPlaying;

      iconOff.classList.toggle("hidden");
      iconOn.classList.toggle("hidden");
    });
  }
};