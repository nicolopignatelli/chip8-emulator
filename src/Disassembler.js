import { INSTRUCTION_SET } from "./constants/instructionSet.js";

export class Disassembler {
    disassemble(opcode) {
        const instruction = INSTRUCTION_SET.find((i) => (opcode & i.mask) === i.pattern);
        console.assert(instruction !== undefined, `Unrecognised opcode ${opcode.toString(16)}`);
        const args = instruction.args.map(arg => (opcode & arg.mask) >> arg.shift);
        return {id: instruction.id, 'args': args};
    }
}
