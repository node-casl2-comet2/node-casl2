"use strict";

export function pathToFileName(path: string): string {
    return path.replace(/^.*[\\\/]/, "");
}
