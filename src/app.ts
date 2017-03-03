#!/usr/bin/env node

"use strict";

import { Reader } from "./io/reader";
import { Writer } from "./io/writer";
import { Casl2, Casl2CompileOption } from "@maxfield/node-casl2-core";
import { commandLineOptions } from "./options";
import { getVersion } from "./util/version";
import { pathToFileName } from "./util/path";
import { sys, ExitStatus } from "./sys";
import { parseCommandLine } from "./commandLine";
import { isValidInputSource } from "./validation";
import * as _ from "lodash";

function execute(args: Array<string>) {
    const parsed = parseCommandLine(args);
    const { options, fileNames, errors } = parsed;
    if (errors.length > 0) {
        for (const err of errors) {
            sys.stderr.writeLine(err);
        }
        return sys.exit(ExitStatus.Fail);
    }

    if (options.help) {
        printHelp();
        return sys.exit(ExitStatus.Success);
    }

    if (options.version) {
        printVersion();
        return sys.exit(ExitStatus.Success);
    }

    if (fileNames.length === 0) {
        printAppInfo();
        sys.stdout.newLine();
        printHelp();
        return sys.exit(ExitStatus.Success);
    }

    const casSourcePath = fileNames[0];
    if (!isValidInputSource(casSourcePath)) {
        sys.stderr.writeLine("入力ソースの拡張子は '.cas' である必要があります。");
        return sys.exit(ExitStatus.Fail);
    }

    const compileOption: Casl2CompileOption = {
        useGR8: options.useGR8
    };

    compile(casSourcePath, compileOption, options.out);
}

function compile(casSourcePath: string, compileOption: Casl2CompileOption, outputPath?: string) {
    // .casファイルを読み込む
    const buf = Reader.read(casSourcePath);
    // 末尾の改行を取り除いて一行ずつに分ける
    const lines = buf.toString().replace(/(\r\n|\r|\n)+$/, "").split(/\r\n|\r|\n/);
    const compiler = new Casl2(compileOption);
    const result = compiler.compile(lines);
    if (result.success) {
        // コンパイル成功の場合コンパイル結果をファイルに書き込む
        const output = outputPath || casSourcePath.replace(/^.*[\\\/]/, "").replace(".cas", ".com");
        Writer.binaryWrite(output, result.hexes);
    } else {
        // コンパイルエラーありの場合
        result.errors.forEach(error => console.log(error.message));
    }
}

function printHelp() {
    const output: Array<string> = [];

    output.push("node-casl2 <input> [-o <output>] [options]");
    output.push("");
    output.push("例: node-casl2 src.cas");
    output.push("    node-casl2 src.cas -o out.com");
    output.push("    node-casl2 src.cas --useGR8");
    output.push(sys.newLine);

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

function printAppInfo() {
    sys.stdout.writeLine(`node-casl2 v${getVersion()}`);
}

function printVersion() {
    sys.stdout.writeLine(getVersion());
}

const args = process.argv.slice(2);
execute(args);
