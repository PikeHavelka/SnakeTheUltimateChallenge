export const pageTransition = () => {
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
};

export const countDown = () => {
    const modalStartGame = document.getElementById("modalStartGame") as HTMLDialogElement | null;
    
    if(modalStartGame){
        let countdown = 3; // Initial value for start the game.
    
        setTimeout(() => {
            modalStartGame.textContent = countdown.toString();
            modalStartGame.showModal();
    
            const intervalID = setInterval(() => {
                countdown--;
                modalStartGame.textContent = countdown.toString();
    
                if(countdown < 0){
                    clearInterval(intervalID);
                    modalStartGame.close();
                };
            }, 1000);
        }, 500);
    };
}