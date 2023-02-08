const Responder = require("../../Helpers/Responder");
const { getNanoId } = require("../../Helpers/Utils");
const utils = require("../../Helpers/Utils");
const student = require("../../Database/StudentSchema").getStudentModel()
const CronJob = require('cron').CronJob;
const multer = require("multer");
const crypto = require('crypto-js');
const multerStorage = multer.memoryStorage();

function Controller() {

    /**
     * createStudent
     * @param {*} res 
     * @param {*} data 
     */

    this.createStudent = (res, data) => {

        const createData = {
            "roll_no": data.roll_no,
            "name": data.name,
            "department": data?.department,
            "age": data?.age,
            "dob": data?.dob,
            "city": data?.city,
            "mail_id": data?.mail_id,
            "mobile_no": data?.mobile_no,
            "marks": {
                "tamil": data?.marks?.tamil,
                "english": data?.marks?.english,
                "mathematics": data?.marks?.mathematics,
                "science": data?.marks?.science,
                "social_science": data?.marks?.social_science
            },
            "language": {
                "mothertong": data?.language?.mothertong,
                "other": data?.language?.other
            }
        }

        createData.student_id = utils.getNanoId();
        // student.findOne({"name":createData.name}, (err,findstudent_id) => {
        //     if(!err && findstudent_id === null){
        student.create(createData, (err, created) => {
            if (!err && created) {
                return Responder.sendSuccessData(res, "Student data created", created);
            }
            return Responder.sendFailureMessage(res, "Failed to create data");
        })
        //     }
        //     return Responder.sendFailureMessage(res, "Failed to create");
        // })
    }

    /**
     * readStudent
     * @param {*} res 
     * @param {*} data 
     */

    this.readStudent = (res, data) => {
        student.findOne({ "student_id": data.student_id }, (err, read) => {
            if (!err && read) {
                return Responder.sendSuccessData(res, "Found Data", read);
            }
            return Responder.sendFailureMessage(res, "No data found");
        })
    }

    /**
     * updateStudent
     * @param {*} res 
     * @param {*} data 
     */

    this.updateStudent = (res, data) => {

        let updated = {
            "roll_no": data.roll_no,
            "name": data.name,
            "age": data.age,
            "department": data.department,
            "city": data.city,
            "mobile_no": data.mobile_no,
            "mail_id": data.mail_id

        }
        student.findOneAndUpdate({ "student_id": data.student_id }, updated, { new: true }, (err, update) => {
            if (!err && update) {
                return Responder.sendSuccessData(res, "updated success!", update);
            }
            return Responder.sendFailureMessage(res, "update Failure");
        })
    }

    /**
     * updateMarks
     * @param {*} res 
     * @param {*} data 
     */
    this.updateMarks = (res, data) => {
        let marksUpdate = data.marks
        student.findOne({ "student_id": data.student_id }, (err, studentData) => {

            let updateData = {
                "marks": {
                    "tamil": (marksUpdate.tamil) ? marksUpdate.tamil : studentData.marks.tamil,
                    "english": (marksUpdate.english) ? marksUpdate.english : studentData.marks.english,
                    "mathematics": (marksUpdate.mathematics) ? marksUpdate.mathematics : studentData.marks.mathematics,
                    "science": (marksUpdate.science) ? marksUpdate.science : studentData.marks.science,
                    "social_science": (marksUpdate.socialScience) ? marksUpdate.socialScience : studentData.marks.socialScience
                }
            }

            student.findOneAndUpdate({ "student_id": data.student_id }, { $set: updateData }, { new: true }, (err, markupdate) => {

                if (!err && markupdate) {
                    return Responder.sendSuccessData(res, "markupdated success!", markupdate)
                }
                return Responder.sendFailureMessage(res, "markupdated failure")
            })
        })
    }

    /**
     * markmodified update
     * @param {*} req 
     * @param {*} res 
     */
    this.updateMarks = (req, res) => {
        let data = req.body;
        student.findOne({ "student_id": data.student_id }, (err, studentData) => {
            if (!err && studentData) {
                studentData.name.full = data?.name
                studentData.marks.tamil = data?.tamil
                studentData.marks.english = data?.english
                studentData.marks.mathematics = data?.mathematics
                studentData.marks.science = data?.science
                studentData.socialScience = data?.socialScience

                studentData.markModified(['name', 'marks.tamil', 'marks.english', 'marks.mathematice',
                    'marks.science', 'marks.socialScience']);
                studentData.save();
                return Responder.sendSuccessMessage(res, "Update success");
            }
            return Responder.sendFailureMessage(res, "Data not Found");
        })
    }

    /**
     * updatelanuages
     * @param {*} res 
     * @param {*} data 
     */

    this.updatelanguages = (res, data) => {
        let languageupdate = data.language
        student.findOne({ "student_id": data.student_id }, function (err, studentlanguage) {
            let updateData = {
                "language": {
                    "mothertong": (languageupdate.mothertong) ? languageupdate.mothertong : studentlanguage.language.mothertong,
                    "other": (languageupdate.other) ? languageupdate.other : studentlanguage.language.other
                }
            }

            student.findOneAndUpdate({ "student_id": data.student_id }, { $set: updateData }, { new: true }, (err, languageupdate) => {

                if (!err && languageupdate) {
                    return Responder.sendSuccessData(res, "lanuageupdate success!", languageupdate);
                }
                return Responder.sendFailureMessage(res, "languageupdate failure")
            })
        })
    }

    /**
     * deleteMarks
     * @param {*} res 
     * @param {*} data 
     */

    this.deleteMarks = (res, data) => {
        student.findOne({ "student_id": data.student_id }, (err, studentmarks) => {

            student.updateOne({ "student_id": data.student_id }, { $unset: data.to_delete }, (err, markdelete) => {
                if (!err && markdelete) {
                    return Responder.sendSuccessData(res, "markdelete success!", studentmarks);
                }
                return Responder.sendFailureMessage(res, "markdelete failure");
            })
        })
    }

    /** 
     * deleteStudent
     * @param {*} res 
     * @param {*} data 
     */

    this.deleteStudent = (res, data) => {
        student.findOneAndDelete({ "student_id": data.student_id }, (err, deletes) => {
            if (!err && deletes) {
                return Responder.sendSuccessData(res, "deleted success!", deletes);
            }
            return Responder.sendFailureMessage(res, "deleted Failure");
        })
    }
    /**
     * deleteStudents
     * @param {*} res 
     * @param {*} data 
     */
    this.deleteStudents = (res, data) => {
        student.delete({ "student_id": data.student_id }, (err, deletes) => {
            if (!err && deletes) {
                return Responder.sendSuccessData(res, "deleted success!", deletes);
            }
            return Responder.sendFailureMessage(res, "deleted Failure");
        })
    }
    /**
     * softreadStudent
     * @param {*} res 
     * @param {*} data 
     */
    this.softreadStudent = (res, data) => {
        student.findOne({ "student_id": data.student_id }, (err, read) => {
            if (!err && read) {
                return Responder.sendSuccessData(res, "Found Data", read);
            }
            return Responder.sendFailureMessage(res, "No data found");
        })
    }
    /**
     * softdelete
     * @param {*} res 
     * @param {*} data 
     */
    this.softdelete = (res, data) => {
        student.restore({ "student_id": data.student_id }, (err, softdeletes) => {

            if (!err && softdeletes) {
                return Responder.sendSuccessData(res, "Data restore success!", softdeletes);
            } return Responder.sendFailureMessage(res, "Restore failure");
        })
    }
    /**
     * softupdate
     * @param {*} res 
     * @param {*} data 
     */
    this.softupdate = (res, data) => {
        student.update({ "student_id": data.student_id }, (err, updatedata) => {
            console.log(updatedata)
            if (updatedata) {
                return Responder.sendSuccessData(res, "Student data update", updatedata);
            }
            return Responder.sendFailureMessage(res, "Failed to update data");
        })
    }
    /**
     * softFindData
     * @param {*} res 
     * @param {*} data 
     */
    this.softFindData = (res, data) => {
        student.findDeleted({ "student_id": data.student_id }, (err, finddeletedata) => {
            console.log(finddeletedata)
            if (finddeletedata) {
                return Responder.sendSuccessData(res, "Student data find", finddeletedata);
            }
            return Responder.sendFailureMessage(res, "Failed to find data");
        })
    }
    /**
     * softFindOneData
     * @param {*} res 
     * @param {*} data 
     */
    this.softFindOneData = (res, data) => {
        student.findOneDeleted({ "student_id": data.student_id }, (err, softfindonedata) => {
            console.log(softfindonedata)
            if (softfindonedata) {
                return Responder.sendSuccessData(res, "Student data softfindone", softfindonedata);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        })
    }
    /**
     * softFindOneupdateData
     * @param {*} res 
     * @param {*} data 
     */
    this.softFindOneupdateData = (res, data) => {
        student.findOneDeleted({ "student_id": data.student_id }, (err, softFindonedeleteData) => {
            console.log(softFindonedeleteData);
            if (softFindonedeleteData) {
                return Responder.sendSuccessData(res, "Student data softfindonedelete", softFindonedeleteData);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }/**
     * softupdateDeletedData
     * @param {*} res 
     * @param {*} data 
     */
    this.softupdateDeletedData = (res, data) => {
        student.findOneDeleted({ "student_id": data.student_id }, (err, softUpdatedeletedData) => {
            if (softUpdatedeletedData) {
                return Responder.sendSuccessData(res, "Student data softupdatedelete", softUpdatedeletedData);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }
    /**
     * softcount
     * @param {*} res 
     * @param {*} data 
     */
    this.softcount = (res, data) => {
        student.count(data, (err, softCount) => {
            if (softCount) {
                return Responder.sendSuccessData(res, "Student data softcount", softCount);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }
    /**
     * softcountdeleted
     * @param {*} res 
     * @param {*} data 
     */
    this.softcountdeleted = (res, data) => {
        student.count(data, (err, softCountDeleted) => {
            if (softCountDeleted) {
                return Responder.sendSuccessData(res, "Student data softcountdeleted", softCountDeleted);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }
    /**
     * softcountdocument
     * @param {*} res 
     * @param {*} data 
     */
    this.softcountdocument = (res, data) => {
        student.countDocuments(data, (err, softCountDocument) => {
            if (softCountDocument) {
                return Responder.sendSuccessData(res, "Student data softcountdocument", softCountDocument);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }
    /**
     * softcountwitdeleted
     * @param {*} res 
     * @param {*} data 
     */
    this.softcountwitdeleted = (res, data) => {
        console.log(data)
        // return false
        student.countWithDeleted(data, (err, softCountWithDeleted) => {
            if (softCountWithDeleted) {
                return Responder.sendSuccessData(res, "Student data softcountwithdeleted", softCountWithDeleted);
            }
            return Responder.sendFailureMessage(res, "Failed to sourch data");
        });
    }
    /**
     * to checkimage of array 
     */
    this.searcharr = (req, res) => {
        let data = req.body;
        student.findOne({ "name": data.name }, (err, studentData) => {
            if (!err && studentData)
                return Responder.sendSuccessData(res, "Student data", studentData);
            return Responder.sendFailureMessage(res, "Data not found");
        })
    }

    /**
     * updatemark
     */
    this.updateMarks = async (req, res) => {
        let data = req.body;
        const studentdata = await student.replaceOne({ "student_id": data.student_id }, { "name": data.name });
        studentdata.n;
        studentdata.nModified;
    }

    /**
     *multer demo
     */
    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb("Please upload only images.", false);
        }
    };
    const upload = multer({
        storage: multerStorage,
        fileFilter: multerFilter
    });

    const uploadFiles = upload.array("images", 10);

    const uploadImages = (req, res, next) => {
        uploadFiles(req, res, err => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_UNEXPECTED_FILE") {

                }
            } else if (err) {

            }
            next();
        });
    };

    // let job = new CronJob('* * * * * *', () => {
    //     console.log('You will see this message every second');
    // }, null, true, 'America/Los_Angeles');
    
    this.checkvalidation = (req, res) => {
        let data = req.body;
        student.create(data, (err, createdemo) => {
            if (!err && createdemo)
                return Responder.sendSuccessMessage(res, "create success");
            return Responder.sendFailureMessage(res, "data create failure")
        })
    }

    let dasdfggata = {
        "txn_id":"230820181535031422094","payment_mode":"CC","resp_date_time":"2018- 08-19:07:24","resp_message":"SUCCESS","bank_ref_id":"823510001250", "cust_email_id":"test@test.com","merchant_id":"M0002","txn_amount":"1.00", "txn_date_time":"2018-08-23 19:07:02.0","pg_ref_id":"100182351907085854", "trans_status":"Ok","cust_mobile_no":"9876543210","resp_code":"00000"
          }
        
      let body= JSON.stringify(dasdfggata)
      let ciphertext = crypto.AES.encrypt(body, 'secret key 123').toString();
      console.log(ciphertext);
      let bytes  = crypto.AES.decrypt(ciphertext, 'secret key 123');
      let originalText = bytes.toString(crypto.enc.Utf8);
      
      console.log(originalText);
}

module.exports = new Controller()