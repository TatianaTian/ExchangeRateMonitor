const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notification_above: {
    status: {
      type: String,
      required:  false
    },
    bank: {
      type: String,
      required:  false
    },
    value: {
      type: Number,
      required:  false
    }
  },
  notification_below: {
    status: {
      type: String,
      required:  false
    },
    bank: {
      type: String,
      required:  false
    },
    value: {
      type: Number,
      required:  false
    }
  },
  notification_move: {
    status: {
      type: String,
      required:  false
    },
    bank: {
      type: String,
      required:  false
    },
    value: {
      type: Number,
      required:  false
    }
  },
  notification_ws: {
    status: {
      type: String,
      required:  false
    }
  },
  notification_event: {
    status: {
      type: String,
      required:  false
    }
  }
});

module.exports = User = mongoose.model("users", UserSchema);


/*const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);*/
