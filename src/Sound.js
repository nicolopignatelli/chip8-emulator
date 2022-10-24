import { SOUND_VOLUME } from "./constants/sound.js";

export class Sound {
    #isSoundOn = false;
    #isAudioContextSupported = false;
    #oscillator;
    #masterGain;

    constructor() {
        if (!this.checkAudioContextSupport()) {
            return;
        }

        this.#isAudioContextSupported = true;
        const audioContext = new window.AudioContext();

        this.#masterGain = audioContext.createGain();
        this.#masterGain.gain.value = SOUND_VOLUME;
        this.#masterGain.connect(audioContext.destination);

        this.#oscillator = new OscillatorNode(audioContext, {type: "square"});
        this.#oscillator.start();
    }

    checkAudioContextSupport() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        if(window.AudioContext){
            return true;
        }
        else {
            return false;
        }
    }

    on() {
        if (!this.#isAudioContextSupported) return;

        if (!this.#isSoundOn) {
            this.#isSoundOn = true;
            this.#oscillator.connect(this.#masterGain);
        }
    }

    off() {
        if (!this.#isAudioContextSupported) return;

        if (this.#isSoundOn) {
            this.#isSoundOn = false;
            this.#oscillator.disconnect(this.#masterGain);
        }
    }
}