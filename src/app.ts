"use strict";

import { Reader } from "./io/reader";
import { Writer } from "./io/writer";
import { Casl2, Casl2CompileOption } from "@maxfield/node-casl2-core";
import { commandLineOptions } from "./options";
import { getVersion } from "./util/version";
import { sys } from "./sys";
import * as _ from "lodash";

function printHelp() {
    const output: Array<string> = [];
    const optionColumn: Array<string> = [];
    const descriptionColumn: Array<string> = [];
    let marginLength = 0;

    const sortedCommandLineOptions = commandLineOptions.sort((a, b) => {
        const c = a.name.toLowerCase() > b.name.toLowerCase();
        return c ? 1 : -1;
    });

    const makeSpace = (spaceLength: number) => Array(spaceLength + 1).join(" ");

    for (const opt of sortedCommandLineOptions) {
        let option = "";
        if (opt.shortName) {
            option += `-${opt.shortName}, `;
        }
        option += `--${opt.name}`

        optionColumn.push(option);
        descriptionColumn.push(opt.description);

        marginLength = Math.max(option.length, marginLength);
    }

    if (optionColumn.length !== descriptionColumn.length) throw new Error();

    const zip = _.zip(optionColumn, descriptionColumn);
    for (const l of zip) {
        const [option, description] = l;
        // e.g. -v, --version [スペース] [説明]
        const format = option + makeSpace(marginLength - option.length + 4) + description;
        output.push(format);
    }

    for (const out of output) {
        sys.stdout.writeLine(out);
    }
}

function printVersion() {
    sys.stdout.writeLine(getVersion());
}

printVersion();
printHelp();

// // .casファイルを読み込む
// const buf = Reader.read("./test/testdata/gr8.cas");

// // 末尾の改行を取り除いて一行ずつに分ける
// const lines = buf.toString().replace(/(\r\n|\r|\n)+$/, "").split(/\r\n|\r|\n/);

// const compileOption: Casl2CompileOption = {
//     useGR8: true
// };

// const casl2 = new Casl2(compileOption);

// const result = casl2.compile(lines);

// if (result.success) {
//     // コンパイル成功の場合コンパイル結果をファイルに書き込む
//     Writer.binaryWrite("temp.com", result.hexes);
// } else {
//     // コンパイルエラーありの場合
//     result.errors.forEach(error => console.log(error.message));
// }
