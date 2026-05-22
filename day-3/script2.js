let curr="Light";
let mode=document.getElementById("btn");
mode.addEventListener("click",function(){
    if(curr==="Light"){
        curr="Dark";
        document.querySelector("body").style.backgroundColor="black";
    } else {
        curr="Light";
        document.querySelector("body").style.backgroundColor="white";
    }
});