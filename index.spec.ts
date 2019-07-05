import { ParallelQueue } from "./index";

describe("ParallelQueue", () => {
	beforeEach(function() {
		// spyOn(ParallelQueue.prototype, 'push').and.callThrough();
	});

	let q: ParallelQueue = new ParallelQueue(5);

	it("should create queue", function() {
		expect(q).toBeDefined();
		q.complete(function() {
			setTimeout(function() {
				console.log("All tasks completed");
			}, 500);
		});

		q.push(done => {
			console.log("task 0 processing...");
			setTimeout(() => {
				console.log("task 0 done!");
				done();
			}, 5000);
		});

		q.push(done => {
			console.log("task 1 processing...");
			setTimeout(() => {
				console.log("task 1 done!");
			}, 500);
		}, 500);
		q.push(done => {
			console.log("task 2 processing...");
			setTimeout(() => {}, 500);
		}, 3000);
		q.push(done => {
			console.log("task 3 processing...");
			setTimeout(() => {}, 500);
		}, 2000);
	});
});
