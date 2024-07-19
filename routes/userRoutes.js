import express from 'express';
import User from '../models/user.js';
import Borrow from '../models/borrow.js';

const router = express.Router();

// Utility function to calculate age
const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// POST /signup - Approve or reject the application during signup
router.post('/signup', async (req, res) => {
    const { phoneNumber, email, name, dob, monthlySalary } = req.body;

    // Calculate user age
    const age = calculateAge(new Date(dob));

    // Validation criteria
    if (age < 20) {
        return res.status(400).json({ message: 'User should be above 20 years of age.' });
    }
    if (monthlySalary < 25000) {
        return res.status(400).json({ message: 'Monthly salary should be 25k or more.' });
    }

    // Create new user
    const user = new User({
        phoneNumber,
        email,
        name,
        dob,
        monthlySalary,
        status: 'approved'
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.', error });
    }
});

// GET /user - Fetch user details by phone number
router.get('/user', async (req, res) => {
    const { phoneNumber } = req.query;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user.', error });
    }
});

// POST /borrow - Handle loan requests by the user
router.post('/borrow', async (req, res) => {
    const { phoneNumber, amount } = req.body;

    try {
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.status !== 'approved') {
            return res.status(400).json({ message: 'User application not approved.' });
        }

        const borrow = new Borrow({
            phoneNumber,
            amount
        });

        await borrow.save();
        res.status(201).json({ message: 'Loan request submitted successfully.', borrow });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting loan request.', error });
    }
});

export default router;
