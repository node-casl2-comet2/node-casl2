"use strict";


export function getVersion() {
    const config = require("../../../package.json");
    return config.version;
}
