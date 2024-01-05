const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const {username,password} = req.headers;
    // check if already present
    const checkusername = await User.findOne({email:username});
    if(checkusername){
        return res.status(401).send({msg:"user already present"})
    }
    const response = await User.create({email:username,password});
    if(response){
        return res.status(200).json({msg:"User Created Successfully"})
    }else{
        return res.status(401).send({msg:"unable to create user"})
    }
});

router.get('/courses', async (req, res) => {
    const response = await Course.find({})
    res.status(200).json(response)
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const response = await User.updateOne({
        email:username
    },{
        "$push": {PurchasedCourses: courseId}
    })
    res.status(200).json({msg:"implemented course succesfully"})
    
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    const user = await User.findOne({
        email: req.headers.username
    });
    const courses = await Course.find({
        _id: {
            "$in" : user.PurchasedCourses
        }
    })
    res.json({
        courses
    })

});

module.exports = router