const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course} = require('../db')
// Admin Routes
router.post('/signup', async (req, res) => {
    const {username,password} = req.body;

    //check if a user exist with this username already exist
    await Admin.create({
        email:username,
        password
    })
    
    res.json({
            message:'Admin created Successfully'
        })
  
  
});

router.post('/courses', adminMiddleware, async(req, res) => {
    const {title, description,price,imageLink} = req.body;
    const response =  await Course.create({title,description,price,imageLink});
    res.json({"_id":response._id})
});

router.get('/courses', adminMiddleware,async (req, res) => {
        const username = req.headers.username;
        const response = await Course.find({});
        if(response){
            res.status(200).send({
                courses : response
            })
        }else{
            res.status(403).send({
                msg: "courses doesnt exist"
            })
        }
});

module.exports = router;