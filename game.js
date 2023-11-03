// Initialisation du jeu, interface et audio
const audio = new Audio();
const game = new Game();
const interface = new Interface();

// Generation de l'audio et de l'image par défaut
audio.setAudio();

// Fonction annexe
function launchMusic() {
    audio.getMusic().play();
}

// Fonction qui s'éxécute lorsqu'on entre une valeur dans l'input
function handleSubmit(event) {
    event.preventDefault(); // On bloque l'envoi du formulaire

    // On vérifie que l'on a entré une valeur dans le champs
    if (document.querySelector("input").value) {
        // On vérifie la réponse
        game.verifyResponse(
            event,
            interface.setHiddenWord,
            interface.setZombieImg,
            interface.setLife,
            interface.setWinOrLoose,
            interface.setActive,
            interface.setInactive,
            audio.getSuccess(),
            audio.getZombie()
        );

        // On remet l'input à zéro
        document.querySelector('input').value = '';
    }
}

// Fonction qui démarre la partie
const startGame = () => {
    // on réinitialise le jeu et on génère un mot
    game.resetGame().then(() => {
        // Génère le clavier, les images et la barre de statut
        interface.generateKeyboard((event) => {
            game.verifyResponse(
                event,
                interface.setHiddenWord,
                interface.setZombieImg,
                interface.setLife,
                interface.setWinOrLoose,
                interface.setActive,
                interface.setInactive,
                audio.getSuccess(),
                audio.getZombie()
            );
        });
        interface.setZombieImg(7);

        // on initialise les champs HTML
        // Le champ du mot caché
        interface.generateHiddenWord(game.getGeneratedWord(), document.querySelector('#hiddenWord'));
        interface.generateStatus(game.getLife());

        // Initialisation de l'interface
        interface.setInactive('#launchBtn');
        interface.setInactive('#winOrLoose');
        interface.setActive('#game');
    });
};
