function random(min, max) {
    return min + Math.random() * (max - min);
}

class Audio {
    constructor() {
        this.zombieSound = [];
        this.success;
        this.loose;
        this.win;
        this.music;
        this.oldRandom = 0;
        this.random = 0;
    }

    // METHOD
    setAudio() {
        function createSound(name) {
            const audio = document.createElement("audio"); // On créer un élément audio
            audio.src = `./assets/audio/${name}.mp3`; // On vient ajouter la source
            audio.id = name; // On lui ajoute un ID pour le retrouver plus tard
            
            document.body.append(audio); // Puis on l'ajoute a la fin du body
        }

        // Créer les sons de zombie
        for (let id = 1; id < 5; id++) {
            createSound(`zombie_${id}`);
            this.zombieSound.push(document.querySelector(`#zombie_${id}`));
        }

        // Créer la musique de fond
        createSound("bg-music");
        this.music = document.querySelector(`#bg-music`);

        // Créer la musique success
        createSound("success");
        this.success = document.querySelector(`#success`);

        // Créer la musique loose
        createSound("loose");
        this.loose = document.querySelector(`#loose`);
    }

    // GETTER
    getMusic() {
        return this.music;
    }

    getSuccess() {
        return this.success;
    }

    getLoose() {
        return this.loose;
    }

    getZombie() {
        // Tant qu'on ne choisi pas un son différent de la fois d'avant, on continue de séléction un nouveau son
        while (random === this.oldRandom) {
            console.log("Régènere un son");
            random = Math.round(1 + Math.random() * ((this.zombieSound.length - 1) - 1)); // Random avec min et max
            console.log("Zombie sound :" + random)
        }
        
        this.oldRandom = random;
        return this.zombieSound[random];
    }
}