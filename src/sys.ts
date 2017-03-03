"use strict";

const newLine = "\r\n";

export const sys = {
    newLine: newLine,

    stdout: {
        writeLine: function (s: string) {
            process.stdout.write(s + newLine);
        }
    },

    stderr: {
        writeLine: function (s: string) {
            process.stderr.write(s + newLine);
        }
    }
}
