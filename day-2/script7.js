let n= prompt("Enter a number: ");
let arr=[];
for(let i=1; i<=n; i++){
    arr.push(i);
}
let sum=arr.reduce((res,curr)=>{
    return res+curr;
})
console.log(arr);
console.log("Sum of numbers:", sum);
let factorial=arr.reduce((res,curr)=>{
    return res*curr;
})
console.log("Factorial of n:", factorial);