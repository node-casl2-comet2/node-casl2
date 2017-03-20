"use strict";

import { Diagnostic } from "@maxfield/node-casl2-core";
const colors = require("colors/safe");

export function printDiagnostic(diagnostic: Diagnostic): string {
    const s = `[casl2] ${diagnostic.messageText} (${diagnostic.line + 1}行目)`;
    return colors.red(s);
}
