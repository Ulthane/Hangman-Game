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
        this.oldRandom;
    }

    // METHOD
    setAudio() {
        function createSound(name) {
            const audio = document.createElement("audio");
            audio.src = `./assets/audio/${name}.mp3`;
            audio.id = name;
            
            document.body.append(audio);
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
    playMusic() {
        this.music.play();
    }

    playSuccess() {
        this.success.play();
    }

    playLoose() {
        this.loose.play();
    }

    playZombieSound() {
        // Random avec min et max
        const random = Math.round(1 + Math.random() * ((this.zombieSound.length - 1) - 1));
        
        if (!this.oldRandom || random !== this.oldRandom) {
            this.oldRandom = random;
            this.zombieSound[random].play();
        } else {
            this.playZombieSound();
        }
    }
}