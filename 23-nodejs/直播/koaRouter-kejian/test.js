
async function test(){
 let res =  await new Promise(resolve=>{
    setTimeout(() => {
        console.log("111111")
        resolve(3333);
    }, 2000);
  })
   console.log(res);
  await new Promise(resolve=>{
    setTimeout(() => {
        console.log("22222")
        resolve();
    }, 1000);
  })
}
test();