"use strict";

import { commandLineOptions, CommandLineOption, CommandLineOptions } from "./options";

export interface ParsedCommandLine {
    options: CommandLineOptions;
    fileNames: Array<string>;
    errors: Array<string>;
}

export function parseCommandLine(commandLine: Array<string>): ParsedCommandLine {

    const errors: Array<string> = [];
    const options: CommandLineOptions = {};
    const fileNames: Array<string> = [];

    const shortToFullNameMap = new Map<string, string>();
    const commandLineOptionMap = new Map<string, CommandLineOption>();
    for (const opt of commandLineOptions) {
        if (opt.shortName) {
            shortToFullNameMap.set(opt.shortName, opt.name);
        }

        commandLineOptionMap.set(opt.name, opt);
    }

    let i = 0;
    while (i < commandLine.length) {
        let s = commandLine[i++];
        if (s.slice(0, 1) === "-") {
            if (s.slice(0, 2) === "--") {
                s = s.slice(2);
            } else {
                s = s.slice(1);
            }

            // ショートネームの場合はフルネームに変換する
            // e.g. v -> version
            const fullName = shortToFullNameMap.get(s);
            if (fullName) {
                s = fullName;
            }

            const commandLineOption = commandLineOptionMap.get(s);
            if (commandLineOption) {
                switch (commandLineOption.type) {
                    case "boolean":
                        options[commandLineOption.name] = true;
                        break;
                }
            } else {
                errors.push("Unknwon option: " + s);
            }
        } else {
            fileNames.push(s);
        }
    }

    return {
        options: options,
        fileNames: fileNames,
        errors: errors
    };
}
