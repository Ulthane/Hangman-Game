class Game {

    constructor() {
        // Parameter
        this.paramLife = 7;

        // Init
        this.wordsList = [
            "whisky",
            "porte",
            "halloween",
            "squelette",
            "pomme",
            "langue",
            "ordinateur",
            "silence",
            "jour",
            "code",
            "pantalon",
            "telephone",
            "tasse",
            "enceinte",
            "console",
            "appartement",
            "policier",
            "casque",
            "cinema",
            "heros",
            "yaourt",
            "telecommande",
            "coeur"
        ];

        this.word = [];
        this.life = this.paramLife;
    }


    // SETTER
    setGeneratedWord() {
        let randomWord = this.wordsList[Math.round(Math.random() * this.wordsList.length)];
        this.word = randomWord.split("");
    }

    setLife() {
        this.life--;
    }

    // GETTER
    getGeneratedWord() {
        return this.word;
    }

    getLife() {
        return this.life;
    }

    // METHOD
    resetGame() {
        this.word = [];
        this.life = this.paramLife;
    }

    verifyResponse(event, setHiddenWord, setZombie, setUILife, audio) {
        document.querySelector(`#${event.target.value}`).disabled = true;
        document.querySelector(`#${event.target.value}`).className = "disabled";
        let count = 0; // On initialise un compteur qui permettra de compter le nombre de lettre trouver
        
        // On vérifie pour chaque lettre du mot que nous avons trouver la bonne lettre.
        this.word.forEach((item, index) => {
            if (item === event.target.value) {
                count++; // Si on a la bonne lettre, on ajoute 1 au compteur
                setHiddenWord(index, item); // On modifie les champs caché du mot cible
                audio.playSuccess(); // On joue le son qui indique que nous avons eu bon
            };
        });

        // Si le compteur est a zéro, nous n'avons pas trouver la lettre
        if (count === 0) {
            this.setLife();

            setZombie(this.getLife()); // On modifie l'image du zombie
            setUILife(this.life); // On retire un coeur
            audio.playZombieSound(); // On joue le son du zombie quand on perd un point
        }
    }

    verifyInputResponse(value, setZombie, setUILife, audio, setWinOrLoose, setActive, setInactive) {
        if (value === this.word.join('')) {
            setWinOrLoose("gagnez");
            setInactive("#game");
            setActive("#winOrLoose");
        } else {
            this.setLife();

            setZombie(this.getLife()); // On modifie l'image du zombie
            setUILife(this.life); // On retire un coeur
            audio.playZombieSound(); // On joue le son du zombie quand on perd un point
        }
    }

    
}