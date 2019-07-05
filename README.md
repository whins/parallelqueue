# Parallel Queue

```
let queue: ParallelQueue = new ParallelQueue(5);

queue.complete(function() {
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
}, 500)
.push(done => {
    console.log("task 2 processing...");
    setTimeout(() => {}, 500);
}, 3000)
.push(done => {
    console.log("task 3 processing...");
    setTimeout(() => {}, 500);
}, 2000);

```
