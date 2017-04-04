## node-casl2

[![Build Status](https://travis-ci.org/node-casl2-comet2/node-casl2.svg?branch=master)](https://travis-ci.org/node-casl2-comet2/node-casl2)
[![Coverage Status](https://coveralls.io/repos/github/node-casl2-comet2/node-casl2/badge.svg?branch=master)](https://coveralls.io/github/node-casl2-comet2/node-casl2?branch=master)

node-casl2はCASL2のCLIツールです。

## Install
1. [Node.js](https://nodejs.org/ja/)をインストール
1. `$ npm install -g @maxfield/node-casl2`
1. 以上


## Usage
```bash
# ヘルプを表示します
$ node-casl2 --help

# ソースをコンパイルします
$ node-casl2 source.cas

# オプション付きでソースをコンパイルします
$ node-casl2 --useGR8 --enableLabelScope source.cas

# 出力ファイル名を指定してコンパイルします
$ node-casl2 source.cas -o binary.com
```


## Compile Options

|  オプション | 説明 |
|  ------ | ------ |
|  `--useGR8` | GR8を有効な汎用レジスタとして使用します。 |
|  `--enableLabelScope` | ラベルのスコープを有効にします。 |
|  `--allowNegativeValueForEffectiveAddress` | 実効アドレスに負値をとることを許可します。 |


## Author
[Maxfield Walker](https://github.com/MaxfieldWalker)

## License
MIT
