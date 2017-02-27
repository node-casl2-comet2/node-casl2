"use strict";

import { Reader } from "./io/reader";
import { Writer } from "./io/writer";
import { Casl2, Casl2CompileOption } from "@maxfield/node-casl2-core";



// .casファイルを読み込む
const buf = Reader.read("./test/testdata/gr8.cas");

// 末尾の改行を取り除いて一行ずつに分ける
const lines = buf.toString().replace(/(\r\n|\r|\n)+$/, "").split(/\r\n|\r|\n/);
const casl2 = new Casl2();

const compileOption: Casl2CompileOption = {
    useGR8: true
};

const result = casl2.compile(lines, compileOption);

if (result.success) {
    // コンパイル成功の場合
    const hex = result.instructions.map(x => x.toHex());
    const flatten = [].concat.apply([], hex) as Array<number>;
    const binary = flatten.filter(x => x != -1);

    const firstStartInst = result.instructions[0];
    // 先頭16バイト分に実行開始番地を埋め込む
    binary.unshift(result.labelMap.get(firstStartInst.label as string) as number, 0, 0, 0, 0, 0, 0, 0);
    Writer.binaryWrite("temp.com", binary);
} else {
    // コンパイルエラーありの場合
    result.errors.forEach(error => console.log(error.message));
}
