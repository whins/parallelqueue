import { ConcurrentQueue } from './index';

describe('ConcurrentQueue', () => {

    beforeEach(function () {
        // spyOn(ConcurrentQueue.prototype, 'push').and.callThrough();
    });

    let q: any = new ConcurrentQueue(5);

	it('should create queue', function(){
		// q = new ConcurrentQueue(2);
		expect(q).toBeDefined();
    });

	it('should push done task', function(){
		expect(q).toBeDefined();
		q.done(function () {
            setTimeout(function () {
                console.log("completed");
            }, 500);
        });
    });

	it('should push few tasks', function(){
		q.push(function (completeTask: Function) {
            console.log("task 0 processing...");
            setTimeout(function () {
                completeTask();
            }, 5000);
        });
    });

	it('should push few tasks', function(){
		q.push(function (completeTask: Function) {
            console.log("task 1 processing...");
            setTimeout(function () {
                completeTask();
            }, 2000);
        });
    });

	it('should push few tasks', function(){
		q.push(function (completeTask: Function) {
            console.log("task 2 processing...");
            setTimeout(function () {
                completeTask();
            }, 100);
        });
    });

    it('should push few tasks', function(){
        q.push(function (completeTask: Function) {
            console.log("task 3 processing...");
            setTimeout(function () { }, 500);
        }, 3000);
    });

});
