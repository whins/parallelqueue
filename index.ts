interface ITaskItem {
	id: number;
	task: () => void;
	wait?: number;
	timeoutId?: any;
}

export class ParallelQueue {
	private concurrency = 1;
	private running = 0;
	private taskId = 0;
	private taskQueue: ITaskItem[] = [];
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
	private runTask(taskItem: ITaskItem | any) {
		if (!taskItem) {
			return;
		}
		this.running++;
		let that = this;
		if (!!taskItem.wait) {
			taskItem.timeoutId = setTimeout(function() {
				clearTimeout(taskItem.timeoutId);
				taskItem.timeoutId = null;
				that.resolveTask(taskItem);
			}, taskItem.wait);
		}
		taskItem.task(() => this.resolveTask(taskItem));
	}

	push(task: (done: () => void) => void, wait?: number) {
		const ti = {
			id: this.taskId++,
			task,
			wait: wait
		} as ITaskItem;
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
