function cntvowels(str){
    let count=0;    
    for(let i=0; i<str.length; i++){
        let char=str[i].toLowerCase();  
        if(char==='a' || char==='e' || char==='i' || char==='o' || char==='u'){
            count++;
        }
    }
    return count;
}
let input=prompt("Enter a string: ");
let vowelCount=cntvowels(input);
console.log("Number of vowels in the string:", vowelCount);