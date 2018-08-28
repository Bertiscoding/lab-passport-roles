const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    username: String,
    password: String,
    role: String
    // {
    //     type: String
    //     // enum: ["developer", "TA"]
    // }
});

module.exports = mongoose.model("Employee", employeeSchema);
