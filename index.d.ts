export declare class ParallelQueue {
    private concurrency;
    private running;
    private taskId;
    private taskQueue;
    private completeQueue?;
    constructor(concurrency?: number, completeQueue?: () => any);
    private resolveTask;
    private runTask;
    push(task: (done: () => void) => void, wait?: number): this;
    complete(completeQueue: () => any): this;
}
