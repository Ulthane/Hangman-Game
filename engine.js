class Game {
    constructor() {
        // Parameter
        this.paramLife = 7;

        // Init
        this.wordsList = [
            'whisky',
            'porte',
            'halloween',
            'squelette',
            'pomme',
            'langue',
            'ordinateur',
            'silence',
            'jour',
            'code',
            'pantalon',
            'telephone',
            'tasse',
            'enceinte',
            'console',
            'appartement',
            'policier',
            'casque',
            'cinema',
            'heros',
            'yaourt',
            'telecommande',
            'coeur'
        ];

        this.word = [];
        this.wordLength = 0;
        this.life = this.paramLife;
    }

    // SETTER
    setGeneratedWord() {
        // let randomWord = this.wordsList[Math.round(Math.random() * this.wordsList.length)];
        // this.word = randomWord.split('');

        return fetch('https://trouve-mot.fr/api/random/1')
            .then((response) => response.json())
            .then((words) => {
                this.word = words[0].name.split('');
                this.wordLength = words[0].name.length;

                return;
            });
    }

    setLife() {
        this.life--;
    }

    // GETTER
    getGeneratedWord() {
        console.log(this.word);
        return this.word;
    }

    getLife() {
        return this.life;
    }

    // METHOD
    async resetGame() {
        this.word = [];
        this.life = this.paramLife;
        console.log('Je passe');
        return await this.setGeneratedWord();
    }

    verifyResponse(event, setHiddenWord, setZombie, setUILife, setWinOrLoose, setActive, setInactive, audioSucces, audioZombie) {
        // Fonction qui modifie l'écran a la fin du jeu
        function endGame(result) {
            setWinOrLoose(result);
            setInactive('#game');
            setActive('#winOrLoose');
        }

        // Fonction qui permet de retirer un point
        function removePoint(self) {
            self.setLife();
            setZombie(self.getLife()); // On modifie l'image du zombie
            setUILife(self.life); // On retire un coeur
            audioZombie.play(); // On joue le son du zombie quand on perd un point

            if (self.life === 0) {
                endGame('perdu');
            }
        }

        // On controle ici ce qui est entrée dans l'input
        if (event.type === 'submit') {
            if (document.querySelector('#findWord').value === this.word.join('')) {
                endGame('gagnez');
            } else {
                removePoint(this); // On retire un point si cest faux
            }

            return; // Fin de gestion de l'input
        } else {
            // ICI on désactive les touches après chaque essaie
            document.querySelector(`#${event.target.value}`).disabled = true;
            document.querySelector(`#${event.target.value}`).className = 'disabled';
            let count = 0; // On initialise un compteur qui permettra de compter le nombre de lettre trouver

            // On vérifie pour chaque lettre du mot que nous avons trouver la bonne lettre.
            this.word.forEach((item, index) => {
                if (item === event.target.value) {
                    count++; // Si on a la bonne lettre, on ajoute 1 au compteur
                    setHiddenWord(index, item); // On modifie les champs caché du mot cible
                    audioSucces.play(); // On joue le son qui indique que nous avons eu bon
                }
            });

            // Si le compteur est a zéro, nous n'avons pas trouver la lettre
            if (count === 0) {
                removePoint(this); // On retire un point si cest faux
            } else {
                this.wordLength -= count;
            }

            if (this.wordLength === 0) {
                console.log('Tu a gagnez !');
                endGame('gagnez');
            }
            console.log('Nombre de lettre restante : ' + this.wordLength);
        }

        // On controle le nombre de vie restante, si 0 on perd
        console.log('Nombre de vie restante : ' + this.life);
    }
}
