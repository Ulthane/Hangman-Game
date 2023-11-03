class Game {
    constructor() {
        // Parameter
        this.paramLife = 7;

        // Init
        this.word = [];
        this.wordLength = 0;
        this.life = this.paramLife;
    }

    // SETTER
    setGeneratedWord() {
        // Regex qui détecte les accents
        var regex = new RegExp(/([à-ü]|[À-Ü])/g);

        // On demande à l'api de nous donner plusieurs mot, puis on controle que le mot n'a pas d'accent pour le sélectionner
        return fetch('https://trouve-mot.fr/api/random/10')
            .then((response) => response.json())
            .then((words) => {
                for (let i = 0; i < words.length; i++) {
                    const specialCharExist = words[i].name.match(regex) ? true : false;
                    if (!specialCharExist) {
                        this.word = words[i].name.split('');
                        this.wordLength = words[i].name.length;

                        // On set le champs qui montrera la réponse
                        document.querySelector('#response').textContent = `Le mot était ${words[i].name}`;

                        break;
                    }
                }
            })
            .catch((e) => console.log(e));
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
    async resetGame() {
        this.word = [];
        this.life = this.paramLife;

        await this.setGeneratedWord();
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
                endGame('gagnez');
            }
        }
    }
}
