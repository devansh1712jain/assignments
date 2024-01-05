const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken')
const TOKEN_KEY = require('../pw.js')
// User Routes
router.post('/signup',async(req, res) => {
    try {
        const {username,password} = req.body;
        await User.create({
            username,
            password
        })
        res.status(200).json({
            msg: "user created succesfully"
        })
    } catch (error) {
        res.status(101).json({
            msg:"unable to register user"
        })
    }
});

router.post('/signin', async(req, res) => {
     try {
        const {username,password} = req.body;
        const present = await User.findOne({
            username,
            password
        })
        if(present){
            const token = jwt.sign({username},TOKEN_KEY)
            res.status(200).json({
                token
            })
        }else{
            res.status(401).json({
                msg:"invalid credenticals"
            })
        }
     } catch (error) {
        res.status(400).json({
           error
        })
     }
});

router.get('/courses', async(req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,TOKEN_KEY);
        const course = await Course.find({});
        res.status(200).json({
            course
        })
    } catch (error) {
        res.status(400).json({
            msg:"invalid token"
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    try {
        const courseId = req.params.courseId;
        const username = req.username
        await User.updateOne({username},{
            "$push" : {
                PurchasedCourses : courseId
            }
        })
        res.send("hi theres")
    } catch (error) {
        res.json({
            error
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const username = req.username
        console.log(username)
        const user = await User.findOne({username});
        console.log(user);
        const courses = await Course.find({
            _id: {
                "$in" : user.PurchasedCourses
            }
        })
        console.log({courses})
        res.send({
           msg:"yash"
        })
    } catch (error) {
        res.json({
            error
        })
    }
    
});

module.exports = router