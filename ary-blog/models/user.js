const {createHmac,randomBytes} = require('crypto');
const{Schema,model}=require("mongoose");

const userSchema=new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: '/images/download (1).png'  
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
   
} ,
{timestamps: true}
);

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return ;
    const salt = randomBytes(16).toString();
    const hashedpassword=createHmac('sha256',salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedpassword;
    
});

const userModel = model('User', userSchema);
module.exports = model('User', userSchema);