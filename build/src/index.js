"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep = async (msec) => new Promise(res => setTimeout(res, msec));
const getDelay = (runTime, delay) => {
    if (runTime === 0)
        return delay;
    const mod = runTime % delay;
    if (mod === 0)
        return 0;
    return delay - mod;
};
exports.default = (task, delay) => {
    let isRunning = true;
    let lastTaskAt = undefined;
    return {
        run: async () => {
            isRunning = true;
            while (isRunning) {
                const now = Date.now();
                const d = lastTaskAt === undefined ? 0 : now - lastTaskAt;
                lastTaskAt = now;
                await task(d);
                await sleep(getDelay(Date.now() - lastTaskAt, delay));
            }
        },
        stop: () => (isRunning = false),
    };
};
//# sourceMappingURL=index.js.map