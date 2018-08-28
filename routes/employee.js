const express = require("express");
const router = express.Router();
const ensureLogin = require("connect-ensure-login");
const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const passport = require("passport");

// have user always looged in
router.use(ensureLogin.ensureLoggedIn("/auth/log-in"));

router.get("/", (req, res, next) => {
    res.render("add-employee");
});

router.post("/employee-list", (req, res, next) => {
    const { username, password, role } = req.body;

    const encrypted = bcrypt.hashSync(password, 10);

    new Employee({ username, password: encrypted, role })
        .save()
        .then(employees => {
            res.render("employee-list", { employees });
        })
        .catch(err => {
            if (err.code === 11000) {
                return res.render("create", { error: "user exists already" });
            }
            console.error(err);
            res.send("something went wrong");
        });
});

// router.get("/employee-list", (req, res, next) => {
//     if (req.user.role !== "boss") {
//         res.render("employee-list", { employees });
//     }
// });

router.get("/employee-list", (req, res, next) => {
    Employee.find({}).then(employees => {
        res.render("employee-list", { employees });
    });
});

module.exports = router;
