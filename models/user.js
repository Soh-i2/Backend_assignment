import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  monthlySalary: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
});

export default mongoose.model('User', userSchema);
//users