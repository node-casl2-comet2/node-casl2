"use strict";

import { CommandLineOption, CommandLineOptions } from "@maxfield/node-casl2-comet2-common";

export const commandLineOptions: Array<CommandLineOption> = [
    {
        name: "useGR8",
        type: "boolean",
        description: "GR8を有効な汎用レジスタとして使用します。"
    },
    {
        name: "enableLabelScope",
        type: "boolean",
        description: "ラベルのスコープを有効にします。"
    },
    {
        name: "version",
        shortName: "v",
        type: "boolean",
        description: "バージョンを表示します。"
    },
    {
        name: "help",
        shortName: "h",
        type: "boolean",
        description: "ヘルプを表示します。"
    },
    {
        name: "out",
        shortName: "o",
        type: "string",
        description: "出力ファイル名を指定します。"
    }
];

export interface Casl2CommandLineOptions extends CommandLineOptions {
    useGR8?: boolean;
    enableLabelScope?: boolean;
    version?: boolean;
    help?: boolean;
    out?: string;
}
