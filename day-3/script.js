/*let h2=document.querySelector("h2");
console.dir(h2.innerText);
h2.innerText= h2.innerText + " from ary patel";*/

let divs=document.querySelectorAll(".box");

for(div of divs){
    console.dir(div.innerText);
}
divs[0].innerText="Hello World!";
divs[1].innerText="ary patel";
divs[2].innerText="UNIQUA";
