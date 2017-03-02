"use strict";

const config = require("../../../package.json");

export function getVersion(): string {
    return config.version;
}
