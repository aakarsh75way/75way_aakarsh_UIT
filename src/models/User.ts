import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: 'guest',
      enum: ['guest', 'admin'] 
    },
    uploads: {
      type: [{ type: String, required: true }],
      default: []
    }
  });
  
  const User = mongoose.models.User || mongoose.model('Users', userSchema);
  export default User