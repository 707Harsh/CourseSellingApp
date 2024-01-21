// Admin Routes


const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, User, Course} = require("../db/index")
const jwt = require('jsonwebtoken')
const {secKey} = require("../config");
const z = require("zod");
const schema1 = z.string().email();
const schema2 = z.string().min(5);


// Admin signup logic
router.post('/signup',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result1 = schema1.safeParse(username);
    const result2 = schema2.safeParse(password);
    if(!(result1.success) || !(result2.success))
    {
        res.json({
            msg: "Invalid input format, please check your inputs"
        })
    }
    else
    {
        await Admin.create({
            username: username,
            password: password
        })
        res.json({
            msg: "admin created successfully"
        })
    }
});

// Admin signin logic
router.post('/signin',async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result1 = schema1.safeParse(username);
    const result2 = schema2.safeParse(password);
    if(!(result1.success) || !(result2.success))
    {
        res.json({
            msg: "Invalid input format, please check your inputs"
        })
    }
    else
    {
        const user = await User.find({
            username: username,
            password: password
        })
        if(user)
        {
            const token = jwt.sign(username,secKey);
            res.json({
                token: token
            })
        }
        else
        {
            res.status(411).json({
                msg: "Incorrect username or password"
            })
        }
    }
});

// Course creation logic
router.post('/courses', adminMiddleware,async (req, res) => {
    const newCourse = await Course.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
    })
    res.json({
        msg: "Course created",
        courseId: newCourse._id
    });
});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const course = await Course.find({});
    res.json({courses: course})
});

module.exports = router;