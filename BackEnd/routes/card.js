const express = require("express")
const router = express();
const mongoose = require("mongoose");
const Card = mongoose.model("Card");
const requireLogin = require("../middleware/requireLogin")

// router.get("/allcards", (req, res) => {
//     Card.find()
//         .populate("createdBy", "_id username email")
//         .then(cards => {
//             res.json({ cards })
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

router.post("/home/createcard", requireLogin, (req, res) => {
    const { title, pin } = req.body;
    if (!title || !pin) {
        return res.status(422).json({ error: "All fields required!" })
    }
    req.user.password = undefined;
    req.user.phone = undefined;
    const card = new Card({
        title,
        pin,
        createdBy: req.user
    })
    card.save()
        .then(result => {
            res.json({ card: result })
        })
        .catch(err => {
            console.log(err);
        })

})

router.get("/home", requireLogin, (req, res) => {
    Card.find({ createdBy: req.user._id })
        .populate("createdBy", "_id name email")
        .then(cards => {
            res.json({ cards })
        })
        .catch(err => {
            console.log(err);
        })
})

router.delete("/deletecard/:cardid", requireLogin, (req, res) => {
    Card.findOne({ _id: req.params.cardid })
        .populate("createdBy", "_id")
        .exec((err, card) => {
            if (err || !card) {
                return res.status(422).json({ error: err })
            }
            if (card.createdBy._id.toString() === req.user._id.toString()) {
                card.remove()
                    .then(result => {
                        res.json({ result })
                    }).catch(err => {
                        console.log(err);
                    })

            }
        })
})

module.exports = router;