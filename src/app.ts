"use strict";

import { Reader } from "./io/reader";
import { Writer } from "./io/writer";
import { Casl2, Casl2CompileOption } from "@maxfield/node-casl2-core";


// .casファイルを読み込む
const buf = Reader.read("./test/testdata/gr8.cas");

// 末尾の改行を取り除いて一行ずつに分ける
const lines = buf.toString().replace(/(\r\n|\r|\n)+$/, "").split(/\r\n|\r|\n/);

const compileOption: Casl2CompileOption = {
    useGR8: true
};

const casl2 = new Casl2(compileOption);

const result = casl2.compile(lines);

if (result.success) {
    // コンパイル成功の場合コンパイル結果をファイルに書き込む
    Writer.binaryWrite("temp.com", result.hexes);
} else {
    // コンパイルエラーありの場合
    result.errors.forEach(error => console.log(error.message));
}
