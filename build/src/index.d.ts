declare const _default: (task: (delay?: number) => Promise<void> | void, delay: number) => {
    run: () => Promise<void>;
    stop: () => boolean;
};
export default _default;
