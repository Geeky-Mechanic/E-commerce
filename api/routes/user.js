const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('./verifyToken');

const router = require('express').Router();

function Encrypt(pass, key) {
    const encJson = CryptoJS.AES.encrypt(JSON.stringify(pass), key).toString();
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData;
}

/* ---->  Update user info  <---- */

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    if (req.body.password) {
        req.body.password = Encrypt(req.body.password, process.env.PASS_SECRET);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        return res.status(200).json(updatedUser)
    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Delete users  <---- */

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User succesfully deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Get user by id <---- */

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        const {
            password,
            ...others
        } = user._doc;

        return res.status(200).json({
            ...others
        });

    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Get all users  <---- */

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({
            _id: -1
        }).limit(5) : await User.find();
        return res.status(200).json(users);

    } catch (err) {
        return res.status(500).json(err);
    }
});

/* ---->  Get user stats  <---- */

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {

        const data = await User.aggregate([{
                $match: {
                    createdAt: {
                        $gte: lastYear
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {
                        $sum: 1
                    },
                },
            },
        ]);

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).json(err);
    }
});


module.exports = router;