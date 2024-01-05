const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index.js");
const router = Router();
const jwt = require('jsonwebtoken')
const TOKEN_KEY = require('../pw.js')
// Admin Routes
router.post('/signup', async (req, res) => {
    try {
        const {username,password} = req.body
        await Admin.create({username,password})
        res.status(200).json({message:"Admin created successfully"})
    } catch (error) {
        res.status(401).json({
            error
        })
    }
});

router.post('/signin', async (req, res) => {
    const {username,password} = req.body;
    try {
        const user = Admin.findOne({username,password});
        if(user){
            const token = jwt.sign({username},TOKEN_KEY)
            res.status(200).json({
                token
            })
        }else{
            res.status(401).json({
                msg: "unable to sign in"
            })
        }


    } catch (error) {
        res.status(401).json({
            msg:"Unable to signin"
        })
    }
});

router.post('/courses', adminMiddleware, async(req, res) => {
   try {
    const {title,description,price,imageLink} = req.body;
    const newcourse = await Course.create({title,description,price,imageLink});
    console.log(newcourse);
    res.status(200).json({
        message:"Course created successfully",
        CourseId: newcourse._id
    })
   } catch (error) {
    
   }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    try {
        const course = await Course.find({});
        res.status(200).json({course})
    } catch (error) {
        res.status(401).json({
            msg:"error occured"
        })
    }
    
});

module.exports = router;