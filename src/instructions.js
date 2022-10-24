import { DISPLAY_DEFAULT_SPRITE_BYTES } from "./constants/display.js";

export function CLR(chip8) {
    chip8.display.reset();
}

export function RET(chip8) {
    chip8.registers.PC = chip8.registers.stackPop();
}

export function JP_ADDR(chip8, address) {
    chip8.registers.PC = address;
}

export function CALL_ADDR(chip8, address) {
    chip8.registers.stackPush(chip8.registers.PC);
    chip8.registers.PC = address;
}

export function SE_VX_BYTE(chip8, x, byte) {
    if (chip8.registers.V[x] === byte) {
        chip8.registers.PC += 2;
    }
}

export function SNE_VX_BYTE(chip8, x, byte) {
    if (chip8.registers.V[x] !== byte) {
        chip8.registers.PC += 2;
    }
}

export function SE_VX_VY(chip8, x, y) {
    if (chip8.registers.V[x] === chip8.registers.V[y]) {
        chip8.registers.PC += 2;
    }
}

export function LD_VX_BYTE(chip8, x, byte) {
    chip8.registers.V[x] = byte;
}

export function ADD_VX_BYTE(chip8, x, byte) {
    chip8.registers.V[x] += byte;
}

export function LD_VX_VY(chip8, x, y) {
    chip8.registers.V[x] = chip8.registers.V[y];
}

export function OR_VX_VY(chip8, x, y) {
    chip8.registers.V[x] |= chip8.registers.V[y];
}

export function AND_VX_VY(chip8, x, y) {
    chip8.registers.V[x] &= chip8.registers.V[y];
}

export function XOR_VX_VY(chip8, x, y) {
    chip8.registers.V[x] ^= chip8.registers.V[y];
}

export function ADD_VX_VY(chip8, x, y) {
    const sum = chip8.registers.V[x] + chip8.registers.V[y];
    chip8.registers.V[0xf] = sum > 0xff ? 1 : 0;
    chip8.registers.V[x] = sum;
}

export function SUB_VX_VY(chip8, x, y) {
    chip8.registers.V[0xf] = chip8.registers.V[x] > chip8.registers.V[y] ? 1 : 0;
    chip8.registers.V[x] -= chip8.registers.V[y];
}

export function SHR_VX(chip8, x) {
    chip8.registers.V[0xf] = chip8.registers.V[x] & 1;
    chip8.registers.V[x] >>= 1;
}

export function SUBN_VX_VY(chip8, x, y) {
    chip8.registers.V[0xf] = chip8.registers.V[y] > chip8.registers.V[x] ? 1 : 0;
    chip8.registers.V[x] = chip8.registers.V[y] - chip8.registers.V[x];
}

export function SHL_VX(chip8, x) {
    chip8.registers.V[0xf] = chip8.registers.V[x] & 0b10000000;
    chip8.registers.V[x] <<= 1;
}

export function SNE_VX_VY(chip8, x, y) {
    if (chip8.registers.V[x] !== chip8.registers.V[y]) {
        chip8.registers.PC += 2;
    }
}

export function LD_I_ADDR(chip8, addr) {
    chip8.registers.I = addr;
}

export function JP_V0_ADDR(chip8, addr) {
    chip8.registers.PC = addr + chip8.registers.V[0];
}

export function RND_VX_BYTE(chip8, x, byte) {
    const randomNumber = Math.floor(Math.random() * 256);
    chip8.registers.V[x] = randomNumber & byte;
}

export function DRW_VX_VY_NIBBLE(chip8, x, y, nibble) {
    const collision = chip8.display.drawSprite(
        chip8.registers.V[x],
        chip8.registers.V[y],
        chip8.registers.I,
        nibble
    );
    chip8.registers.V[0xf] = collision;
}

export function SKP_VX(chip8, x) {
    if (chip8.keyboard.isKeyDown(chip8.registers.V[x])) {
        chip8.registers.PC += 2;
    }
}

export function SKNP_VX(chip8, x) {
    if (!chip8.keyboard.isKeyDown(chip8.registers.V[x])) {
        chip8.registers.PC += 2;
    }
}

export function LD_VX_DT(chip8, x) {
    chip8.registers.V[x] = chip8.registers.DT;
}

export async function LD_VX_K(chip8, x) {
    let keyDown = chip8.keyboard.whichKeyIsDown();
    while(keyDown === -1) {
        await chip8.sleep();
        keyDown = chip8.keyboard.whichKeyIsDown();
    }
    chip8.registers.V[x] = keyDown;
}

export function LD_DT_VX(chip8, x) {
    chip8.registers.DT = chip8.registers.V[x];
}

export function LD_ST_VX(chip8, x) {
    chip8.registers.ST = chip8.registers.V[x];
}

export function ADD_I_VX(chip8, x) {
    chip8.registers.I += chip8.registers.V[x];
}

export function LD_F_VX(chip8, x) {
    chip8.registers.I = chip8.registers.V[x] * DISPLAY_DEFAULT_SPRITE_BYTES;
}

export function LD_B_VX(chip8, x) {
    const vx = chip8.registers.V[x];
    const hundredsDigit = Math.floor(vx / 100);
    const tensDigit = Math.floor(vx - (hundredsDigit * 100)) / 10;
    const unitsDigit = vx - (hundredsDigit * 100) - (tensDigit * 10);

    chip8.memory.setAddressValue(chip8.registers.I, hundredsDigit);
    chip8.memory.setAddressValue(chip8.registers.I + 1, tensDigit);
    chip8.memory.setAddressValue(chip8.registers.I + 2, unitsDigit);
}

export function LD_I_VX(chip8, x) {
    for (let i = 0; i <= x; i++) {
        chip8.memory.setAddressValue(chip8.registers.I + i, chip8.registers.V[i]);
    }
}

export function LD_VX_I(chip8, x) {
    for (let i = 0; i <= x; i++) {
        chip8.registers.V[i] = chip8.memory.getAddressValue(chip8.registers.I + i);
    }
}