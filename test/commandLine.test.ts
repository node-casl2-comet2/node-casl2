"use strict";

import * as assert from "assert";
import { commandLineOptions, Casl2CommandLineOptions } from "../src/options";
import { parseCommandLine, ParsedCommandLine } from "@maxfield/node-casl2-comet2-common";

function parse(cl: Array<string>) {
    return parseCommandLine<Casl2CommandLineOptions>(cl, commandLineOptions);
}

suite("parse command line test", () => {
    test("useGR8 option", () => {
        const cl = ["--useGR8"];
        const result = parse(cl);
        assert(result.options.useGR8);
    });

    test("enableLabelScope option", () => {
        const cl = ["--enableLabelScope"];
        const result = parse(cl);
        assert(result.options.enableLabelScope);
    });

    test("allowNegativeValueForEffectiveAddress option", () => {
        const cl = ["--allowNegativeValueForEffectiveAddress"];
        const result = parse(cl);
        assert(result.options.allowNegativeValueForEffectiveAddress);
    });

    test("version option", () => {
        const cl = ["--version"];
        const result = parse(cl);
        assert(result.options.version);
    });

    test("short version option", () => {
        const cl = ["-v"];
        const result = parse(cl);
        assert(result.options.version);
    });

    test("help option", () => {
        const cl = ["--help"];
        const result = parse(cl);
        assert(result.options.help);
    });

    test("short help option", () => {
        const cl = ["-h"];
        const result = parse(cl);
        assert(result.options.help);
    });

    test("out option", () => {
        const cl = ["--out", "a.com"];
        const result = parse(cl);
        assert.equal(result.options.out, "a.com");
    });

    test("short out option", () => {
        const cl = ["-o", "a.com"];
        const result = parse(cl);
        assert(result.options.out, "a.com");
    });
});
