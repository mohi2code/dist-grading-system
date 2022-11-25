import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  username: { type: String, required: true },
  hashed_password: { type: String },
  display_name: String,
  role: {
    type: String,
    enum: ['instructor', 'expert', 'student'],
    default: 'student'
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.hashed_password)
}

const User = mongoose.model('user', userSchema);

export default User;
