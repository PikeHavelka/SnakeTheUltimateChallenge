export const mainMenuBackgroundMusic = () => {
  const toggleButton = document.getElementById("soundIcon") as HTMLButtonElement | null;
  const bgAudio = document.getElementById("bgMusic") as HTMLAudioElement | null;
  const iconOff = document.querySelector("#soundOffIcon") as SVGElement | null;
  const iconOn = document.querySelector("#soundOnIcon") as SVGElement | null;
  
  let isPlaying = false;

  if (toggleButton && bgAudio && iconOff && iconOn) {
    toggleButton.addEventListener("click", () => {
      if (!isPlaying) {
        bgAudio.play();
        bgAudio.volume = 0.2;
      } else {
        bgAudio.pause();
      }

      isPlaying = !isPlaying;

      iconOff.classList.toggle("hidden");
      iconOn.classList.toggle("hidden");
    });
  }
};