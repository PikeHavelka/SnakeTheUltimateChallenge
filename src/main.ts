import "./style.css";
import { menuBgMusic, hoverSoundEffect } from "./index";

menuBgMusic();
hoverSoundEffect();

const playBTN = document.getElementById("playbtn") as HTMLAnchorElement | null;

if (playBTN) {
  playBTN.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    document.body.classList.toggle("animate-page-slide-down");
    
    setTimeout(() => {
      window.location.href = "./src/play.html";
    }, 500);
  });
};
