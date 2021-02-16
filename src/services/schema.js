const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByCredentials = async function (username, password) {
  const newUser = await this.findOne({ username });

  if (newUser) {
    const isMatch = await bcrypt.compare(password, newUser.password);
    if (isMatch) return newUser;
    else return null;
  } else return null;
};

userSchema.pre("save", async function (next) {
  const newUser = this;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(newUser.password, 10);
  }
});

module.exports = model("User", userSchema);
