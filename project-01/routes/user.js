const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.json(users);
    } catch (err) {
        console.error('Failed to get users:', err);
        return res.status(500).json({ error: 'Failed to get users' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foundUser = await User.findById(req.params.id);
        if (!foundUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(foundUser);
    } catch (err) {
        console.error('Failed to get user:', err);
        return res.status(400).json({ error: 'Invalid user ID' });
    }
});

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body || !body.first_name || !body.email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            lastname: body.lastname || '',
            email: body.email,
            gender: body.gender || '',
            jobtitle: body.jobtitle || '',
        });

        console.log(result);
        return res.status(201).json({ status: 'success', user: result });
    } catch (err) {
        console.error('Failed to create user:', err);
        return res.status(500).json({ error: 'Failed to create user' });
    }
});

router.patch('/:id', async (req, res) => {
    const updates = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ status: 'success', user: updatedUser });
    } catch (err) {
        console.error('Failed to update user:', err);
        return res.status(400).json({ error: 'Failed to update user' });
    }
});

router.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json({ status: 'success' });
    } catch (err) {
        console.error('Failed to delete user:', err);
        return res.status(400).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;