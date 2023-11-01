class Interface {
    constructor() {
    }

    // METHOD
    generateHiddenWord(word, field) {
        // on initialise les champs HTML
        // Le champ du mot caché
        for (let i = 0; i < word.length; i++) {
            const div = document.createElement('div');
            div.className = 'letter';
            div.textContent = "_";
            div.id = `letter_${i}`;

            field.append(div);
        }
    }

    generateKeyboard(verifyResponse) {
        // Récupération des balises nécessaire
        const keyboard = document.querySelector('#keyboard');

        // Génération du clavier
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        alphabet.split('').forEach((letter) => {
            const btn = document.createElement('button');
            btn.value = letter;
            btn.textContent = letter;
            btn.id = letter;
            btn.className = "key";
            btn.addEventListener('click', verifyResponse);

            keyboard.append(btn);
        });
    }

    generateImg() {
        const img = document.createElement("img");
        img.src = "./assets/images/zombie/Dead_7.png";
        img.id = "zombieImg";

        document.querySelector("#zombie").append(img);
    }

    generateStatus(life) {
        const lifeField = document.querySelector("#life");
        
        for (let i = 0; i < life; i++) {
            const img = document.createElement("img");
            img.src = "./assets/images/life.png";
            img.className = "life";
            img.id = `life_${i}`

            lifeField.append(img);
        }
    }

    // SETTER
    setHiddenWord(index, letter) {
        document.querySelector(`#letter_${index}`).textContent = letter;
    }

    setZombieImg(index) {
        console.log(index);
        document.querySelector("#zombieImg").src = `./assets/images/zombie/Dead_${index}.png`;
    }

    setLife(id) {
        document.querySelector(`#life_${id}`).remove();
    }

    setInactive(id) {
        // Change l'interface
        document.querySelector(id).classList.remove("active");
        document.querySelector(id).className = "inactive";
    }
    
    setActive(id) {
        // Change l'interface
        document.querySelector(id).classList.remove("inactive");
        document.querySelector(id).className = "active";
    }

    setWinOrLoose(text) {
        document.querySelector("#winOrLooseText").textContent = `Vous avez ${text} !`
    }
}