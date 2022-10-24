import { MEMORY_LOAD_PROGRAM_ADDRESS } from "./constants/memory.js";
import { NUMBER_OF_REGISTERS, STACK_DEPTH } from "./constants/registers.js";

export class Registers {
    constructor() {
        this.V = new Uint8Array(NUMBER_OF_REGISTERS);
        this.I = 0;
        this.DT = 0; // delay timer
        this.ST = 0; // sound timer
        this.PC = MEMORY_LOAD_PROGRAM_ADDRESS; // program counter
        this.SP = -1; // stack pointer
        this.stack = new Uint16Array(STACK_DEPTH);
        this.reset();
    }

    reset() {
        this.V.fill(0);
        this.I = 0;
        this.DL = 0;
        this.ST = 0;
        this.PC = MEMORY_LOAD_PROGRAM_ADDRESS;
        this.SP = -1;
        this.stack.fill(0);
    }

    stackPush(value) {
        this.SP++;
        this.assertStackOverflow();
        this.stack[this.SP] = value;
    }

    stackPop() {
        const value = this.stack[this.SP];
        this.SP--;
        this.assertStackUnderflow();
        return value;
    }

    assertStackUnderflow() {
        console.assert(this.SP >= -1, 'Stack underflow');
    }

    assertStackOverflow() {
        console.assert(this.SP < STACK_DEPTH, 'Stack overflow');
    }
}