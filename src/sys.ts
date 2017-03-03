"use strict";

const newLine = "\r\n";

export const sys = {
    newLine: newLine,

    stdout: {
        writeLine: function (s: string) {
            process.stdout.write(s + newLine);
        },
        newLine() {
            process.stdout.write(newLine);
        }
    },

    stderr: {
        writeLine: function (s: string) {
            process.stderr.write(s + newLine);
        }
    },

    exit(exitCode?: number) {
        process.exit(exitCode)
    }
}

export enum ExitStatus {
    Success = 0,
    Fail = 1
}
