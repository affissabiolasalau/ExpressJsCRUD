const mongoose = require('mongoose')

var contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: "First name is required"
    },
    lastName: {
        type: String,
        required: "Last name is required"
    },
    phone: {
        type: Number,
        required: "Phone number is required"
    }
});

mongoose.model("Contact", contactSchema);