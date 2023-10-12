import mongoose from "mongoose";
import _, { reject } from "lodash";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const jwtSecret = "d6de6dh3i%342&*3hde";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  sessions: [
    {
      token: {
        type: String,
        required: true,
      },
      expiresAt: {
        type: Number,
        required: true,
      },
    },
  ],
});

//  instance methods

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  return _.omit(userObject, ["password", "sessions"]);
};

UserSchema.methods.generate_access_token = function () {
  const user = this;
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id: user._id.toHexString() },
      jwtSecret,
      { expiresIn: "15m" },
      (err, token) => {
        if (!err) {
          resolve(token);
        } else {
          reject();
        }
      }
    );
  });
};

UserSchema.methods.generate_refresh_auth_token = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (!err) {
        let token = buf.toString("hex");
        return resolve(token);
      } else {
        reject();
      }
    });
  });
};

UserSchema.methods.createSession = function () {
  let user = this;
  return user
    .generate_refresh_auth_token()
    .then((refreshToken: any) => {
      return save_session_to_database(user, refreshToken);
    })
    .then((refreshToken: any) => {
      return refreshToken;
    })
    .catch((e: any) => {
      return Promise.reject("Failed to save session to database.\n" + e);
    });
};

// helper Methods

let generate_refresh_token_expirey_time = () => {
  let days_until_expire = 10;
  let seconds_until_expire = days_until_expire * 24 * 60 * 60;
  return Date.now() / 1000 + seconds_until_expire;
};

let save_session_to_database = (user: any, refreshToken: any) => {
  return new Promise((resolve, reject) => {
    let expiresAt = generate_refresh_token_expirey_time();
    user.sessions.push({ token: refreshToken, expiresAt });
    user
      .save()
      .then(() => {
        return resolve(refreshToken);
      })
      .catch((e: any) => {
        reject(e);
      });
  });
};

// Model mehods

const User = mongoose.model("User", UserSchema);

export default User;
