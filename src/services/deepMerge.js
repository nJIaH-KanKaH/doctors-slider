export function deepMerge(target, source) {
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key])
        ) {
            target[key] = deepMerge(target[key] || {}, source[key]);
        } else if (target[key] === undefined) {
            target[key] = source[key];
        }
    }
    return target;
}