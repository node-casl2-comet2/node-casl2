"use strict";

import * as assert from "assert";
import { isValidInputSource } from "../src/validation";

suite("app test", () => {
    test("isValidInputSource", () => {
        // 拡張子が.casである
        assert(isValidInputSource("a.cas"));
        assert(isValidInputSource("./a.cas"));
        assert(isValidInputSource("./a/a.cas"));

        // 拡張子が.casでない
        assert(!isValidInputSource(""));
        assert(!isValidInputSource("."));
        assert(!isValidInputSource(".."));
        assert(!isValidInputSource("a"));
        assert(!isValidInputSource("a.txt"));
        assert(!isValidInputSource("./a.txt"));
        assert(!isValidInputSource("./a/a.txt"));
    });
});
