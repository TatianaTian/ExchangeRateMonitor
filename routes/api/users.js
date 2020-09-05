const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Access = require("../../models/Access");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        notification_above: {
          status: false,
          bank: "none",
          value: null
        },
        notification_below: {
          status: false,
          bank: "none",
          value: null
        },
        notification_move: {
          status: false,
          bank: "none",
          value: null
        },
        notification_ws: {
          status: false
        },
        notification_event: {
          status: false
        }
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// log in Ch
router.post("/login_ch", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//save notification
router.post("/notification", async (req, res) => {
  console.log("entered users.js")
  console.log("req.body is ", req.body)

  const type = req.body.notification_type;
  const status_input = req.body.disable_status;

  if (type === "above" || type === "below" || type === "move"){
    const value_input = req.body.value;
    const bank_input = req.body.bank;
    console.log("bank is ", bank_input)
  
    const noti_info = 
      {
        status:status_input,
        bank: bank_input,
        value: value_input
      }
  
    
    const doc = await User.findOne({ _id: req.body.user_id });
    
    console.log(doc)
    if (type === "above"){
      const update = { notification_above: noti_info };
      console.log("in above")
      await doc.updateOne(update);
    }
    else if (type === "below"){
      console.log("in below")
      const update = { notification_below: noti_info };
      await doc.updateOne(update);
    }
    else if (type === "move"){
      console.log("in move")
      const update = { notification_move: noti_info };
      await doc.updateOne(update);
    }
  }
  else if (type == "ws" || type == "event"){
  
    const noti_info = 
      {
        status:status_input,
      }
  
    const doc = await User.findOne({ _id: req.body.user_id });
    
    console.log(doc)
    if (type === "ws"){
      const update = { notification_ws: noti_info };
      console.log("in ws")
      await doc.updateOne(update);
    }
    else if (type === "event"){
      console.log("in event")
      const update = { notification_event: noti_info };
      await doc.updateOne(update);
    }
  }
  
  console.log("update is ", update)

});

// read notification
router.post("/notification_read", async (req, res) => {
  console.log("entered users.js")
  
  const doc = await User.findOne({ _id: req.body.user_id });
  console.log("doc ", doc)

  const response = [doc.notification_above, doc.notification_below, doc.notification_move, doc.notification_ws, doc.notification_event]
  console.log("response is ", response)
  res.json(response)
});

// save early access
router.post("/early_access", async (req, res) => {
  console.log("entered early access users.js")
  var access_email = req.body.email;
  const access_event = req.body.event;

  console.log("req.body.id is ", req.body.id)
  if (req.body.id !== null){
    console.log("arrived here")
    const doc = await User.findOne({ _id: req.body.id });
    access_email = doc.email 
  }
    
    Access.findOne({ email: access_email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newAccess = new Access({
          email:access_email,
          event: access_event
        });
        newAccess.save()

      }
    });
  
});

module.exports = router;
