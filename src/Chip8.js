import { CHARSET } from "./constants/charset.js";
import { CHARSET_ADDRESS, MEMORY_LOAD_PROGRAM_ADDRESS, MEMORY_SIZE } from "./constants/memory.js";
import { TIMER_60_HZ } from "./constants/registers.js";
import { Disassembler } from "./Disassembler.js";
import { Display } from "./Display.js";
import * as instructions from "./instructions.js";
import { Keyboard } from "./Keyboard.js";
import { Memory } from "./Memory.js";
import { Registers } from "./Registers.js";
import { Sound } from "./Sound.js";

export class Chip8 {
    constructor() {
        this.memory = new Memory();
        this.#loadCharset();

        this.registers = new Registers();
        this.keyboard = new Keyboard();
        this.display = new Display(this.memory);
        this.sound = new Sound();
        this.disassembler = new Disassembler();
    }

    async run() {
        while(true) {
            await this.sleep();

            const opcode = this.memory.getOpcode(this.registers.PC);
            this.registers.PC += 2;
            this.#executeOpcode(opcode);

            this.display.drawBuffer();

            this.#updateTimers();
        }
    }

    sleep(t = TIMER_60_HZ) {
        return new Promise((resolve) => setTimeout(resolve, t));
    }

    loadRom(rom) {
        console.assert(rom.length + MEMORY_LOAD_PROGRAM_ADDRESS <= MEMORY_SIZE, 'Rom size too large');
        this.memory.addresses.set(rom, MEMORY_LOAD_PROGRAM_ADDRESS);
        this.registers.PC = MEMORY_LOAD_PROGRAM_ADDRESS;
    }

    #executeOpcode(opcode) {
        const {id, args} = this.disassembler.disassemble(opcode);
        this.#callInstruction(id, args);
    }

    async #updateTimers() {
        // delay timer
        if (this.registers.DT > 0) {
            await this.sleep();
            this.registers.DT--;
        }

        // sound timer
        if (this.registers.ST > 0) {
            this.sound.on();
            await this.sleep();
            this.registers.ST--;
        } else {
            this.sound.off();
        }
    }

    #callInstruction(id, args) {
        const instruction = instructions[id];
        console.assert(instruction !== undefined, `Instruction ${id} not implemented`);
        instruction(this, ...args);
    }

    #loadCharset() {
        this.memory.addresses.set(CHARSET, CHARSET_ADDRESS);
    }
}