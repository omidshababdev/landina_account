const mongoose = require("mongoose");
const Joi = require("joi");
const { landinaAccountDB } = require("../../config/database");
const Schema = mongoose.Schema;

const USER_VISIBILITY = {
  Private: "private",
  Public: "public",
};

const USER_TYPE = {
  Personal: "personal",
  Business: "business",
  Developer: "developer",
  Creator: "creator",
  Vendor: "vendor",
};

const USER_ROLE = {
  Personal: "personal",
  Business: "business",
};

const CART_TYPE = {
  Font: "font",
  Template: "template",
  Product: "product",
};

const UserSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      min: 3,
      max: 20,
      lowercase: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      max: 50,
      unique: false,
      validate: {
        validator: (value) => {
          const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          return value.match(re);
        },
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: Number,
      required: false,
    },
    password: {
      type: String,
      min: 6,
      trim: true,
    },
    images: {
      type: String,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Image",
        },
      ],
    },
    followers: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    followings: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    type: {
      type: String,
      enum: USER_TYPE,
      default: USER_TYPE.Personal,
    },
    role: {
      type: String,
      enum: USER_ROLE,
      default: USER_ROLE.Personal,
    },
    bio: {
      type: String,
      max: 50,
      default: "",
    },
    links: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Link",
        },
      ],
    },
    coupons: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Coupon",
        },
      ],
    },
    notifications: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Notifications",
        },
      ],
    },
    contacts: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Contacts",
        },
      ],
    },
    cart: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: CART_TYPE,
          default: CART_TYPE.Product,
        },
      ],
    },
    location: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Location",
        },
      ],
    },
    deleted: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Coupon",
        },
      ],
    },
    archived: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Coupon",
        },
      ],
    },
    saved: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Coupon",
        },
      ],
    },
    blocked: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    liked: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Coupon",
        },
      ],
    },
    comments: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comments",
        },
      ],
    },
    analytics: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Analytics",
        },
      ],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    backups: {
      type: Number,
      default: 0,
      data: [
        {
          type: Schema.Types.ObjectId,
          ref: "Backups",
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    validate: true,
  }
);

const User = landinaAccountDB.model("User", UserSchema);

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    // username: Joi.string().min(3).max(255).required().unique(),
    // email: Joi.string().email().required(),
    token: Joi.string().min(10).max(255),
  });
  return schema.validate(user);
};

module.exports = {
  User,
  validate,
};