import { Chip8 } from "./Chip8.js";

const romFile = await fetch('./roms/test_opcode.ch8');
const rom = new Uint8Array(await romFile.arrayBuffer());
const chip8 = new Chip8();
chip8.loadRom(rom);
chip8.run();


