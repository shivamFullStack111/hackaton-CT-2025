const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        students: [
            { type: mongoose.Schema.Types.ObjectId }
        ]
    }
})

export default Class = mongoose.model("Class", classSchema);