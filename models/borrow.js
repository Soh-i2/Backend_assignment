import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    requestDate: { type: Date, default: Date.now }
});

const Borrow = mongoose.model('Borrow', borrowSchema);

export default Borrow;
