const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { SALT_ROUNDS_NUMBER } = require("./../config/config");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: [true, "You need to provide a username"],
    },
    password: {
        type: String,
        require: [true, "You need to provide a password"],
    },
    first_name: String,
    last_name: String,
    isActive: {
        type: Boolean,
        default: true,
    },
});

userSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(SALT_ROUNDS_NUMBER, function (saltError, salt) {
            if (saltError) {
                return next(saltError);
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError);
                    }

                    user.password = hash;
                    next();
                });
            }
        });
    } else {
        return next();
    }
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
};
