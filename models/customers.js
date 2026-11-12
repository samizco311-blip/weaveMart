import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name:{
          type: String,
        required: [true, "Customer name is required"],
        trim: true,
    },
    email:{
         type: String,
        required: [true, "Customer email is required"],
        trim: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, "Customer password is required"],
        trim: true,
        minlength: 6,
    },
    phone:{
         type: Number,
        required: true,
        trim: true,
    },
    refreshtoken:{
        type: String,
    }

});
  customerSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return;
    }
    this.password = await bcrypt.hash(this.password, 12);
    
  });

  customerSchema.methods.comparePassword = async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password)
  }; 

  const Customer = mongoose.model('Customer', customerSchema);

  export default Customer;