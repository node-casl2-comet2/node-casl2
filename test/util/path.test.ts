"use strict";

import * as assert from "assert";
import { pathToFileName } from "../../src/util/path";

suite("path test", () => {
    test("pathToFileName", () => {
        assert.equal(pathToFileName("a.cas"), "a.cas");

        assert.equal(pathToFileName("./a.cas"), "a.cas");
        assert.equal(pathToFileName(".\\a.cas"), "a.cas");

        assert.equal(pathToFileName("../a.cas"), "a.cas");
        assert.equal(pathToFileName("..\\a.cas"), "a.cas");

        assert.equal(pathToFileName("/a.cas"), "a.cas");
        assert.equal(pathToFileName("\\a.cas"), "a.cas");

        assert.equal(pathToFileName("./a/a.cas"), "a.cas");
        assert.equal(pathToFileName(".\\a\\a.cas"), "a.cas");
    });
});
