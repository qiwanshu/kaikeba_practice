function m1(){
    console.log("one start...");
    next();
    console.log("one end...");
}

function next(){
    console.log("two start...");
    console.log("some thing...")
    console.log("two end...");
}
m1();