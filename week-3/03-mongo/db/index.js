const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.ab36zfq.mongodb.net/yash');

// Define schemas
const AdminSchema = new mongoose.Schema({
    email:String,
    password:String,
});

const UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    PurchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description:String,
    imageLink: String,
    price:Number,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}