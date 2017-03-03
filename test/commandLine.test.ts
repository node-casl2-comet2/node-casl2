"use strict";

import * as assert from "assert";
import { parseCommandLine, ParsedCommandLine } from "../src/commandLine";


suite("parse command line test", () => {
    test("useGR8 option", () => {
        const cl = ["--useGR8"];
        const result = parseCommandLine(cl);
        assert(result.options.useGR8);
    });

    test("enableLabelScope option", () => {
        const cl = ["--enableLabelScope"];
        const result = parseCommandLine(cl);
        assert(result.options.enableLabelScope);
    });

    test("version option", () => {
        const cl = ["--version"];
        const result = parseCommandLine(cl);
        assert(result.options.version);
    });

    test("short version option", () => {
        const cl = ["-v"];
        const result = parseCommandLine(cl);
        assert(result.options.version);
    });

    test("help option", () => {
        const cl = ["--help"];
        const result = parseCommandLine(cl);
        assert(result.options.help);
    });

    test("short help option", () => {
        const cl = ["-h"];
        const result = parseCommandLine(cl);
        assert(result.options.help);
    });
});
