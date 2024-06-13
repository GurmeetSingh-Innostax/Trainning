
// creating functions in JavaScript:

// Normal Way
function myFun(){

}

// arrow function

const myfun=()=>{

}

//call back function
const fun=()=>{()=>{

    //  I can pass function into function body 

}}

// Program 1:

// function a(){
//     console.log(b);
// }
// var b=10;
// a();

// Program 2:

// const a=()=>{
//     c ();
//     function c(){
//         console.log(b);

//     }

// }
// var b=10;
// a();


// Let and Const  are best practises:

// Shadowing
// var a=100;
// {
//     var a=10;
//     console.log("Local Scope: ",a);    // 10

// }
// console.log("Global Scope",a);    //10

// // Shadowing
// var a =20;
// {
//     var a=20;   // possible
// }

// Illegal Shadowing

var a =20;
let x=100;
const func=()=>{
    var a=10;
    console.log("Local Scope",a);
}
func();
console.log("Global Scope",a);

func();

