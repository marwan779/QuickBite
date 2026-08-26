const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
};
export function toMs(value, unit) {
    return value * multipliers[unit];
}
//# sourceMappingURL=time.js.map