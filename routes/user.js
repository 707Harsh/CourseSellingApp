// User Routes


const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require("../db/index");
const jwt = require('jsonwebtoken');
const { secKey } = require("../config");
const z = require("zod");
const schema1 = z.string().email();
const schema2 = z.string().min(5);


// User signup logic
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
        await User.create({
            username: username,
            password: password
        })
        res.json({
            msg: "user created successfully"
        })
    }
});

// User signin logic
router.post('/signin', (req, res) => {
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
        const user = User.find({
            username: username,
            password: password
        })
        if(user)
        {
            const token  = jwt.sign(username,secKey);
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

// Listing all courses logic
router.get('/courses',async (req, res) => {
    const courses = await Course.find({});
    res.json({
        courses: courses
    })
});

// Course purchase logic
router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    const courseId = req.params.courseId;
    const user = req.username;
    await User.updateOne({
        username: user
    },
    {
        "$push":{
            purchasedCourses: courseId
        }
    })
    res.json({
        msg: "purchase completed"
    })
});

// Fetching purchased courses logic
router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user =await User.findOne({
        username: req.username
    })
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
});

module.exports = router