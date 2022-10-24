import { MEMORY_SIZE } from "./constants/memory.js";

export class Memory {
    constructor() {
        this.addresses = new Uint8Array(MEMORY_SIZE);
        this.reset();
    }

    reset() {
        this.addresses.fill(0);
    }

    setAddressValue(index, value) {
        this.#assertAddressExists(index);
        this.addresses[index] = value;
    }

    getAddressValue(index) {
        this.#assertAddressExists(index);
        return this.addresses[index];
    }

    getOpcode(index) {
        const highByte = this.getAddressValue(index);
        const lowByte = this.getAddressValue(index + 1);
        const opcode = (highByte << 8) | lowByte;

        return opcode;
    }

    #assertAddressExists(index) {
        console.assert(0 <= index && index < MEMORY_SIZE, `Error: trying to access non-existing memory address at ${index}`);
    }
}