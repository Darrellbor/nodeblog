var mongoose = require('mongoose');

var validateEmail = {
    validator: function(email) {
        return /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/.test(email);
    },
    message: '{VALUE} is not a valid email address!'
}

var validateName = {
    validator: function(name) {
        return /^\S+[a-zA-Z]{3,}(\s[a-zA-Z]+)*$/.test(name);
    },
    message: '{VALUE} is not a valid name!'
}

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "An email must be provided for user creation!"],
        unique: true,
        lowercase: true,
        validate: validateEmail
    },
    name: {
        type: String,
        required: [true, "A name must be provided for user creation!"],
        validate: validateName
    },
    password: {
        type: String,
        required: [true, "A Password must be provided for user creation!"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', userSchema);