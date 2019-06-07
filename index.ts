interface TaskItem {
	id: number;
	task: () => void;
	timeout?: number;
	timeoutId?: any;
}

export class ConcurrentQueue {
	private concurrency = 1;
	private running = 0;
	private taskId = 0;
	private taskQueue: TaskItem[] = [];
	private completeQueue?: () => any;
	constructor(concurrency = 1, completeQueue?: () => any) {
		this.concurrency = concurrency;
		this.completeQueue = completeQueue;
	}
	private resolveTask(currentTask: any) {
		this.running--;
		if (!this.taskQueue.length) {
			if (!this.running) {
				typeof this.completeQueue === "function" && this.completeQueue();
				this.running = 0;
				this.taskId = 0;
				this.taskQueue = [];
			}
			return;
		}
		this.runTask(this.taskQueue.shift());
	}
	private runTask(taskItem: TaskItem | any) {
		if (!taskItem) {
			return;
		}
		this.running++;
		let that = this;
		if (!!taskItem.timeout) {
			taskItem.timeoutId = setTimeout(function() {
				clearTimeout(taskItem.timeoutId);
				taskItem.timeoutId = null;
				that.resolveTask(taskItem);
			}, taskItem.timeout);
		}
		taskItem.task(() => this.resolveTask(taskItem));
	}
	push(task: (done: () => void) => void, timeout?: number) {
		const ti = {
			id: this.taskId++,
			task,
			timeout
		} as TaskItem;
		if (this.running < this.concurrency) {
			this.runTask(ti);
		} else {
			this.taskQueue.push(ti);
		}
		return this;
	}
	complete(completeQueue: () => any) {
		this.completeQueue = completeQueue;
		return this;
	}
}
