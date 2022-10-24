import { CHARSET_SPRITE_WIDTH } from "./constants/charset.js";
import { 
    DISPLAY_BG_COLOR,
    DISPLAY_COLOR,
    DISPLAY_HEIGHT,
    DISPLAY_SIZE_MULTIPLIER,
    DISPLAY_WIDTH
} from "./constants/display.js";

export class Display {
    constructor(memory) {
        this.memory = memory;
        this.screen = document.querySelector('canvas');

        this.screen.width = DISPLAY_WIDTH * DISPLAY_SIZE_MULTIPLIER;
        this.screen.height = DISPLAY_HEIGHT * DISPLAY_SIZE_MULTIPLIER;

        this.context = this.screen.getContext('2d');
        this.context.fillStyle = DISPLAY_BG_COLOR;

        this.frameBuffer = [];
        this.frameBuffer.length = DISPLAY_HEIGHT;

        this.reset();
    }

    reset() {
        for (let i = 0; i < DISPLAY_HEIGHT; i++) {
            (this.frameBuffer[i] = []).length = DISPLAY_WIDTH;
            this.frameBuffer[i].fill(0);
        }

        this.context.fillRect(0, 0, this.screen.width, this.screen.height);
        this.drawBuffer();
    }

    drawBuffer() {
        for (let i = 0; i < DISPLAY_HEIGHT; i++) {
            for (let j = 0; j < DISPLAY_WIDTH; j++) {
                this.drawPixel(i, j, this.frameBuffer[i][j]);
            }
        }
    }

    drawPixel(row, col, value) {
        if (value) {
            this.context.fillStyle = DISPLAY_COLOR;
        } else {
            this.context.fillStyle = DISPLAY_BG_COLOR;
        }

        this.context.fillRect(
            col * DISPLAY_SIZE_MULTIPLIER,
            row * DISPLAY_SIZE_MULTIPLIER,
            DISPLAY_SIZE_MULTIPLIER,
            DISPLAY_SIZE_MULTIPLIER
        );
    }

    drawSprite(x, y, spriteAddress, spriteRowsCount) {
        let collision = 0;

        for (let ly = 0; ly < spriteRowsCount; ly++) {
            const spriteLine = this.memory.getAddressValue(spriteAddress + ly);
            for (let lx = 0; lx < CHARSET_SPRITE_WIDTH; lx++) {
                const mask = 0b10000000 >> lx;
                const pixelValue = spriteLine & mask;

                if (pixelValue === 0) {
                    continue;
                }

                const fby = (y + ly) % DISPLAY_HEIGHT;
                const fbx = (x + lx) % DISPLAY_WIDTH;

                if (this.frameBuffer[fby][fbx] === 1) {
                    collision = 1;
                }

                this.frameBuffer[fby][fbx] ^= 1;
            }
        }

        this.drawBuffer();

        return collision;
    }
}
