let num=[250,645,300,900,50];
let idx=0;
for(let val of num){
    console.log(val);
    let offer=val/10;
    num[idx]=num[idx]-offer;
    console.log("value after discount:", num[idx]);
    idx++;
    }