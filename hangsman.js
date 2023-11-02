// Initialisation du jeu et de l'interface
const audio = new Audio();
const game = new Game();
const interface = new Interface();

// Generation de l'audio
audio.setAudio();

// Génère le clavier, les images et la barre de statut
interface.generateKeyboard((e) => {game.verifyResponse(e, interface.setHiddenWord, interface.setZombieImg, interface.setLife, audio)});
interface.generateImg();
interface.generateStatus(game.getLife());

// Fonction annexe
function launchMusic() {
    audio.playMusic();
}

function handleSubmit(event) {
    event.preventDefault();

    game.verifyResponse(
        event, 
        interface.setHiddenWord, 
        interface.setZombieImg, 
        interface.setLife, 
        audio,
        interface.setWinOrLoose,
        interface.setActive,
        interface.setInactive
    );
}

// Fonction qui démarre la partie
const startGame = () => {
    interface.setInactive("#launchBtn");
    interface.setActive("#game");

    // on réinitialise le jeu et on génère un mot
    game.resetGame()
    game.setGeneratedWord();
    
    // on initialise les champs HTML
    // Le champ du mot caché
    interface.generateHiddenWord(
        game.getGeneratedWord(),
        document.querySelector('#hiddenWord')
    );
}