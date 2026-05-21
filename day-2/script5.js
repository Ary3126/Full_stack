let companies=["google","microsoft","apple","meta","amazon"];
//remove first element
companies.shift();
console.log(companies);
companies.splice(1,1,"ola");
console.log(companies);
//add at the end
companies.push("flipkart");
console.log(companies);