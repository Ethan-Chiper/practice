const DbConnection = require("./Connection");
const mongoose_delete = require('mongoose-delete');
const StudentDbConnection = DbConnection.getStudentDBConnection();

function Schema() {

    /**
     * studentSchema
     */

    let studentSchema = new StudentDbConnection.Schema({

        "student_id": { type: String },
        "roll_no": { type: Number },
        "பெயர்": { type: String },
        "department": { type: String, enum: "MCA" },
        "age": { type: Number },
        "dob": { type: String },
        "city": { type: String },
        "mail_id": { type: String},
        "mobile_no": { type: Number },
        "marks": { type: Object },
        "language": { type: Object },
        "image":{type:Array}
    });
    // studentSchema.plugin(mongoose_delete,{ overrideMethods: 'all' });
    studentSchema.plugin(mongoose_delete,{ overrideMethods: true });
    // studentSchema.plugin(mongoose_delete,{ overrideMethods: ['count', 'find'] });
    // studentSchema.plugin(mongoose_delete,{ validateBeforeDelete: false });
    // studentSchema.plugin(mongoose_delete,{ indexFields: 'all' });

    let StudentModel = StudentDbConnection.model("students", studentSchema);

    this.getStudentModel = () => {
        return StudentModel
    }
}

module.exports = new Schema()