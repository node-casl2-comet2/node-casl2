#!/usr/bin/env node

"use strict";

import { Writer } from "./io/writer";
import { Casl2, Casl2CompileOption } from "@maxfield/node-casl2-core";
import { parseCommandLine, CLI, sys, ExitStatus, isValidInputSource } from "@maxfield/node-casl2-comet2-common";
import { commandLineOptions, Casl2CommandLineOptions } from "./options";
import { printDiagnostic } from "./ui/print";
import { getVersion } from "./util/version";

function execute(args: string[]) {
    const parsed = parseCommandLine<Casl2CommandLineOptions>(args, commandLineOptions);
    const { options, fileNames, errors } = parsed;
    if (errors.length > 0) {
        for (const err of errors) {
            sys.stderr.writeLine(err);
        }
        return sys.exit(ExitStatus.Fail);
    }

    if (options.help) {
        CLI.printHelp(commandLineOptions);
        return sys.exit(ExitStatus.Success);
    }

    if (options.version) {
        CLI.printVersion(getVersion());
        return sys.exit(ExitStatus.Success);
    }

    if (fileNames.length === 0) {
        CLI.printAppInfo("node-casl2", getVersion());
        sys.stdout.newLine();
        CLI.printHelp(commandLineOptions);
        return sys.exit(ExitStatus.Success);
    }

    const casSourcePath = fileNames[0];
    if (!isValidInputSource(casSourcePath, ".cas")) {
        sys.stderr.writeLine("入力ソースの拡張子は '.cas' である必要があります。");
        return sys.exit(ExitStatus.Fail);
    }

    const compileOption: Casl2CompileOption = {
        useGR8: options.useGR8,
        enableLabelScope: options.enableLabelScope,
        allowNegativeValueForEffectiveAddress: options.allowNegativeValueForEffectiveAddress
    };

    compile(casSourcePath, compileOption, options.out);
}

function compile(casSourcePath: string, compileOption: Casl2CompileOption, outputPath?: string): void {
    const compiler = new Casl2(compileOption);
    const result = compiler.compile(casSourcePath);
    if (result.success) {
        if (result.hexes === undefined) throw new Error();
        // コンパイル成功の場合コンパイル結果をファイルに書き込む
        const output = outputPath || casSourcePath.replace(/^.*[\\\/]/, "").replace(".cas", ".com");
        Writer.binaryWrite(output, result.hexes);
    } else {
        // コンパイルエラーありの場合
        result.diagnostics.forEach(d => sys.stderr.writeLine(printDiagnostic(d)));
    }
}

const args = process.argv.slice(2);
execute(args);
