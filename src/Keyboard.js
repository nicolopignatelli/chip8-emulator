import { KEYMAP, NUMBER_OF_KEYS } from "./constants/keyboard.js";

export class Keyboard {
    constructor() {
        this.keys = new Array(NUMBER_OF_KEYS).fill(false);
        document.addEventListener('keydown', (event) => this.keyDown(event.key));
        document.addEventListener('keyup', (event) => this.keyUp(event.key));
    }

    keyDown(key) {
        const keyIndex = KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase());
        if (keyIndex > -1) {
            this.keys[keyIndex] = true;
        }
    }

    keyUp(key) {
        const keyIndex = KEYMAP.findIndex((mapKey) => mapKey === key.toLowerCase());
        if (keyIndex > -1) {
            this.keys[keyIndex] = false;
        }
    }

    isKeyDown(keyIndex) {
        return this.keys[keyIndex];
    }

    whichKeyIsDown() {
        return this.keys.findIndex((key) => key);
    }
}