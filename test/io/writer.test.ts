"use strict";

import { Writer } from "../../src/io/writer";
import * as assert from "assert";

suite("Writer test", () => {
    test("create binary buffer test", () => {
        const buffer = Writer.createBinaryBuffer([0x1234, 0x5678, 0x12345678]);
        assert.equal(buffer.byteLength, 8);
        assert.equal(buffer.readUInt8(0), 0x12);
        assert.equal(buffer.readUInt8(1), 0x34);
        assert.equal(buffer.readUInt8(2), 0x56);
        assert.equal(buffer.readUInt8(3), 0x78);
        assert.equal(buffer.readUInt8(4), 0x12);
        assert.equal(buffer.readUInt8(5), 0x34);
        assert.equal(buffer.readUInt8(6), 0x56);
        assert.equal(buffer.readUInt8(7), 0x78);
    });
});
