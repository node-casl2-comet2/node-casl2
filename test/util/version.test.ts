"use strict";

import * as assert from "assert";
import { getVersion } from "../../src/util/version";

test("get version", () => {
    const versionRegex = /\d+\.\d+\.\d+/;
    const version = getVersion();

    assert(version.match(versionRegex));
});
