"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstName = getFirstName;
function getFirstName(fullName) {
    if (fullName == null)
        return "";
    const parts = fullName.split(", ");
    if (parts.length == 1)
        return parts[0];
    const names = parts[1].split(" ");
    const firstName = names[0];
    return firstName;
}
