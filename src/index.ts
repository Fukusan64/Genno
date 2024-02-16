const sleep = async (msec: number) => new Promise(res => setTimeout(res, msec));

const getDelay = (runTime: number, delay: number): number => {
  if (delay === 0) return 0;
  if (runTime === 0) return delay;
  const mod = runTime % delay;
  if (mod === 0) return 0;
  return delay - mod;
};


export const frameTimingManager = (
  task: (delay?: number) => Promise<void> | void,
  delay: number
) => {
  let isRunning = true;
  let lastTaskAt: undefined | number = undefined;
  return {
    run: async (): Promise<void> => {
      isRunning = true;
      while (isRunning) {
        const now = Date.now();
        const d = lastTaskAt === undefined ? 0 : now - lastTaskAt;
        lastTaskAt = now;
        await task(d);
        await sleep(getDelay(Date.now() - lastTaskAt, delay));
      }
    },
    stop: () => {isRunning = false},
  };
};
