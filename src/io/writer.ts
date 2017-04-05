"use strict";

import * as fs from "fs";

export class Writer {
    public static binaryWrite(path: string, numbers: number[]) {
        const buffer = Writer.createBinaryBuffer(numbers);

        fs.writeFileSync(path, buffer);
    }

    public static createBinaryBuffer(numbers: number[]): Buffer {
        const byteLength = numbers
            .map(n => {
                const digit = n.toString(16).length;
                return digit <= 4 ? 4 : digit;
            })
            .reduce((prev, current, _, __) => prev + current) / 2;

        const arrayBuffer = new ArrayBuffer(byteLength);
        const view = new DataView(arrayBuffer);

        let byteOffset = 0;
        for (let i = 0; i < numbers.length; i++) {
            const n = numbers[i];
            // 16進数での桁数を調べる
            const digit = n.toString(16).length;
            if (!(digit >= 0 && digit <= 4)) {
                throw new Error("Unexpected binary hex: " + n.toString(16));
            }

            view.setUint16(byteOffset, n, false);
            byteOffset += 2;
        }

        return new Buffer(arrayBuffer);
    }
}
