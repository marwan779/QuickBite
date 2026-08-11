const secondsToMs = (seconds: number): number => {
    return seconds * 1000;
};

const minutesToMs = (minutes: number): number => {
    return minutes * 60 * 1000;
};

const hoursToMs = (hours: number): number => {
    return hours * 60 * 60 * 1000;
};

const daysToMs = (days: number): number => {
    return days * 24 * 60 * 60 * 1000;
};

export {
    secondsToMs,
    minutesToMs,
    hoursToMs,
    daysToMs,
};