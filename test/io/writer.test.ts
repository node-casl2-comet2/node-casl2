"use strict";

import { Writer } from "../../src/io/writer";
import * as assert from "assert";

suite("Writer test", () => {
    test("create binary buffer test", () => {
        const buffer = Writer.createBinaryBuffer([0x1234, 0x5678]);

        assert.equal(buffer.byteLength, 4);

        assert.equal(buffer.readUInt8(0), 0x12);
        assert.equal(buffer.readUInt8(1), 0x34);
        assert.equal(buffer.readUInt8(2), 0x56);
        assert.equal(buffer.readUInt8(3), 0x78);
    });
});
