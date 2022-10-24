export const INSTRUCTION_SET = [
    {   // 00E0 - CLR - Clear the display.
        id: 'CLR',
        mask: 0xffff,
        pattern: 0x00e0,
        args: []
    },
    {   // 00EE - RET - Return from a subroutine.
        id: 'RET',
        mask: 0xffff,
        pattern: 0x00ee,
        args: []
    },
    {   // 1nnn - JP addr - Jump to location nnn.
        id: 'JP_ADDR',
        mask: 0xf000,
        pattern: 0x1000,
        args: [{mask: 0x0fff, shift: 0}]
    },
    {   // 2nnn - CALL addr - Call subroutine at nnn.
        id: 'CALL_ADDR',
        mask: 0xf000,
        pattern: 0x2000,
        args: [{mask: 0x0fff, shift: 0}]
    },
    {   // 3xkk - SE Vx, byte - Skip next instruction if Vx = kk.
        id: 'SE_VX_BYTE',
        mask: 0xf000,
        pattern: 0x3000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00ff, shift: 0}]
    },
    {   // 4xkk - SNE Vx, byte - Skip next instruction if Vx != kk.
        id: 'SNE_VX_BYTE',
        mask: 0xf000,
        pattern: 0x4000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00ff, shift: 0}]
    },
    {   // 5xy0 - SE Vx, Vy - Skip next instruction if Vx = Vy.        
        id: 'SE_VX_VY',
        mask: 0xf00f,
        pattern: 0x5000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 6xkk - LD Vx, byte - Set Vx = kk.
        id: 'LD_VX_BYTE',
        mask: 0xf000,
        pattern: 0x6000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00ff, shift: 0}]
    },
    {   // 7xkk - ADD Vx, byte - Set Vx = Vx + kk.
        id: 'ADD_VX_BYTE',
        mask: 0xf000,
        pattern: 0x7000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00ff, shift: 0}]
    },
    {   // 8xy0 - LD Vx, Vy - Set Vx = Vy.
        id: 'LD_VX_VY',
        mask: 0xf00f,
        pattern: 0x8000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy1 - OR Vx, Vy - Set Vx = Vx OR Vy.
        id: 'OR_VX_VY',
        mask: 0xf00f,
        pattern: 0x8001,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy2 - AND Vx, Vy - Set Vx = Vx AND Vy.
        id: 'AND_VX_VY',
        mask: 0xf00f,
        pattern: 0x8002,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy3 - XOR Vx, Vy - Set Vx = Vx XOR Vy.
        id: 'XOR_VX_VY',
        mask: 0xf00f,
        pattern: 0x8003,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy4 - ADD Vx, Vy - Set Vx = Vx + Vy, set VF = carry.
        id: 'ADD_VX_VY',
        mask: 0xf00f,
        pattern: 0x8004,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy5 - SUB Vx, Vy - Set Vx = Vx - Vy, set VF = NOT borrow.
        id: 'SUB_VX_VY',
        mask: 0xf00f,
        pattern: 0x8005,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy6 - SHR Vx {, Vy} - Set Vx = Vx SHR 1.
        id: 'SHR_VX',
        mask: 0xf00f,
        pattern: 0x8006,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xy7 - SUBN Vx, Vy - Set Vx = Vy - Vx, set VF = NOT borrow.
        id: 'SUBN_VX_VY',
        mask: 0xf00f,
        pattern: 0x8007,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 8xyE - SHL Vx {, Vy} - Set Vx = Vx SHL 1.
        id: 'SHL_VX',
        mask: 0xf00f,
        pattern: 0x800E,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // 9xy0 - SNE Vx, Vy - Skip next instruction if Vx != Vy.
        id: 'SNE_VX_VY',
        mask: 0xf00f,
        pattern: 0x9000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}]
    },
    {   // Annn - LD I, addr - Set I = nnn.
        id: 'LD_I_ADDR',
        mask: 0xf000,
        pattern: 0xA000,
        args: [{mask: 0x0fff, shift: 0}]
    },
    {   // Bnnn - JP V0, addr - Jump to location nnn + V0.
        id: 'JP_V0_ADDR',
        mask: 0xf000,
        pattern: 0xB000,
        args: [{mask: 0x0fff, shift: 0}]
    },
    {   // Cxkk - RND Vx, byte - Set Vx = random byte AND kk.
        id: 'RND_VX_BYTE',
        mask: 0xf000,
        pattern: 0xC000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00ff, shift: 0}]
    },
    {   // Dxyn - DRW Vx, Vy, nibble - Display n-byte sprite starting at memory location I at (Vx, Vy), set VF = collision.
        id: 'DRW_VX_VY_NIBBLE',
        mask: 0xf000,
        pattern: 0xD000,
        args: [{mask: 0x0f00, shift: 8}, {mask: 0x00f0, shift: 4}, {mask: 0x000f, shift: 0}]
    },
    {   // Ex9E - SKP Vx - Skip next instruction if key with the value of Vx is pressed.
        id: 'SKP_VX',
        mask: 0xf0ff,
        pattern: 0xE09E,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // ExA1 - SKNP Vx - Skip next instruction if key with the value of Vx is not pressed.
        id: 'SKNP_VX',
        mask: 0xf0ff,
        pattern: 0xE0A1,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx07 - LD Vx, DT - Set Vx = delay timer value.
        id: 'LD_VX_DT',
        mask: 0xf0ff,
        pattern: 0xF007,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx0A - LD Vx, K - Wait for a key press, store the value of the key in Vx.
        id: 'LD_VX_K',
        mask: 0xf0ff,
        pattern: 0xF00A,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx15 - LD DT, Vx - Set delay timer = Vx.
        id: 'LD_DT_VX',
        mask: 0xf0ff,
        pattern: 0xF015,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx18 - LD ST, Vx - Set sound timer = Vx.
        id: 'LD_ST_VX',
        mask: 0xf0ff,
        pattern: 0xF018,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx1E - ADD I, Vx - Set I = I + Vx.
        id: 'ADD_I_VX',
        mask: 0xf0ff,
        pattern: 0xF01E,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx29 - LD F, Vx - Set I = location of sprite for digit Vx.
        id: 'LD_F_VX',
        mask: 0xf0ff,
        pattern: 0xF029,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx33 - LD B, Vx - Store BCD representation of Vx in memory locations I, I+1, and I+2.
        id: 'LD_B_VX',
        mask: 0xf0ff,
        pattern: 0xF033,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx55 - LD [I], Vx - Store registers V0 through Vx in memory starting at location I.
        id: 'LD_I_VX',
        mask: 0xf0ff,
        pattern: 0xF055,
        args: [{mask: 0x0f00, shift: 8}]
    },
    {   // Fx65 - LD Vx, [I] - Read registers V0 through Vx from memory starting at location I.
        id: 'LD_VX_I',
        mask: 0xf0ff,
        pattern: 0xF065,
        args: [{mask: 0x0f00, shift: 8}]
    },
];