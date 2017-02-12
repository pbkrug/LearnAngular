// Code goes here


var work = function () {

    console.log("working hard!");

};

var doWork = function (f) {

    console.log("starting work...");
    try {
        f();
    }
    catch (ex) {
        console.log("ex");
    }
    console.log("done with work...");
};

doWork(work);

