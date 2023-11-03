class Interface {
    constructor() {}

    // METHOD
    generateHiddenWord(word, field) {
        // Tant qu'un élément enfant existe, on supprime les éléments
        while (field.firstChild) {
            field.removeChild(field.firstChild);
        }

        // on initialise les champs HTML
        // Le champ du mot caché
        for (let i = 0; i < word.length; i++) {
            const div = document.createElement('div');
            div.className = 'letter';
            div.textContent = '_';
            div.id = `letter_${i}`;

            field.append(div);
        }
    }

    generateKeyboard(verifyResponse) {
        // Récupération des balises nécessaire
        const keyboard = document.querySelector('#keyboard');

        // Tant qu'un élément enfant existe, on supprime les éléments
        while (keyboard.firstChild) {
            keyboard.removeChild(keyboard.firstChild);
        }

        // Génération du clavier
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        alphabet.split('').forEach((letter) => {
            const btn = document.createElement('button'); // On créer un élément bouton
            btn.value = letter; // On assigne la lettre a sa valeur
            btn.textContent = letter; // On assigne la lettre au texte affiché
            btn.id = letter; // On indique également la lettre en tant d'ID
            btn.className = 'key'; // On assigne la class pour le style
            btn.addEventListener('click', verifyResponse); // Enfin on créer un évènement
            keyboard.append(btn); // Puis on ajouter la touche au clavier
        });
    }

    generateStatus(life) {
        const lifeField = document.querySelector('#life');

        // Tant qu'un élément enfant existe, on supprime les éléments
        while (lifeField.firstChild) {
            lifeField.removeChild(lifeField.firstChild);
        }

        for (let i = 0; i < life; i++) {
            const img = document.createElement('img');
            img.src = './assets/images/life.png';
            img.className = 'life';
            img.id = `life_${i}`;

            lifeField.append(img);
        }
    }

    // SETTER
    setHiddenWord(index, letter) {
        document.querySelector(`#letter_${index}`).textContent = letter;
    }

    setZombieImg(index) {
        document.querySelector('#zombieImg').src = `./assets/images/zombie/Dead_${index}.png`;
    }

    setLife(id) {
        document.querySelector(`#life_${id}`).remove();
    }

    setInactive(id) {
        // Change l'interface
        document.querySelector(id).classList.remove('active');
        document.querySelector(id).className = 'inactive';
    }

    setActive(id) {
        // Change l'interface
        document.querySelector(id).classList.remove('inactive');
        document.querySelector(id).className = 'active';
    }

    setWinOrLoose(text) {
        document.querySelector('#winOrLooseText').textContent = `Vous avez ${text} !`;
    }
}
