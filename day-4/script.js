class user{
    constructor(name, email){
        this.name = name;
        this.email = email;
    }
    viewdata(){
        console.log("Name: " + this.name);
        console.log("Email: " + this.email);
    }
}

class admin extends user{
    editdata(){
        this.data = "some new data";
    }
}
let student1 = new user("John Doe", "john@123.com");
student1.viewdata();
let student2 = new user("Jane Doe", "jane@123.com");
student2.viewdata();

let admin1 = new admin("Admin User", "admin@123.com");
admin1.viewdata();
admin1.editdata();