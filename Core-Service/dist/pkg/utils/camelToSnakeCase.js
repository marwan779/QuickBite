export function camelToSnakeCase(value) {
    return value.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
//# sourceMappingURL=camelToSnakeCase.js.map