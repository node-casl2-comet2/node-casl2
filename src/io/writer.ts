"use strict";

import * as fs from "fs";

export class Writer {
    public static binaryWrite(path: string, numbers: Array<number>) {
        const buffer = Writer.createBinaryBuffer(numbers);

        fs.writeFileSync(path, buffer);
    }

    public static createBinaryBuffer(numbers: Array<number>): Buffer {
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
            if (digit == 8) {
                // 第3引数にfalseを指定するとビッグエンディアンになる
                view.setUint32(byteOffset, n, false);
                byteOffset += 4;
            } else if (digit <= 4) {
                view.setUint16(byteOffset, n, false);
                byteOffset += 2;
            }
            else throw new Error("invalid hex code length.");
        }

        return new Buffer(arrayBuffer);
    }
}
