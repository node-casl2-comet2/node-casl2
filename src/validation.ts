"use strict";

import { pathToFileName } from "./util/path";

export function isValidInputSource(inputSource: string): boolean {
    const fileName = pathToFileName(inputSource);
    return fileName.match(/\.cas$/) ? true : false;
}
