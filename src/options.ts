"use strict";

import { CommandLineOption, CommandLineOptions } from "@maxfield/node-casl2-comet2-common";

export const commandLineOptions: CommandLineOption[] = [
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
        name: "allowNegativeValueForEffectiveAddress",
        type: "boolean",
        description: "実効アドレスに負値をとることを許可します。"
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
    allowNegativeValueForEffectiveAddress?: boolean;
    version?: boolean;
    help?: boolean;
    out?: string;
}
