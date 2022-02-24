const express = require('express');
const asyncHandler = require('express-async-handler');
const usersRoute = express.Router();

const generateToken = require('../utils/generateToken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');

//Register
usersRoute.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
        throw new Error('User Exists');
    }

    const userCreated = await User.create({ name, email, password })

    res.json({
        _id: userCreated._id,
        name: userCreated.name,
        password: userCreated.password,
        email: userCreated.email,
        token: generateToken(userCreated._id)
    })
}));

//Login
usersRoute.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // same as email: email

    if (user && (await user.isPasswordMatch(password))) {
        //set status code
        res.status(200)
        res.json({
            _id: user._id,
            name: user.name,
            password: user.password,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
}));


//Update
usersRoute.put('/update', authMiddleware, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(401);
        throw new Error('User Not found');
    }

}))

//Delete
usersRoute.delete('/:id', (req, res) => {
    res.send('Delete route')
})

//Fetch users
usersRoute.get('/', authMiddleware, (req, res) => {
    res.send('Fetch users route')
})


module.exports = usersRoute;