const { check } = require("express-validator");

function Validation() {
    /**
     * studentValidation
     * @returns 
     */
    this.studentValidation = () => {
        return [
            check("roll_no", "Please enter valide Roll_no").notEmpty({ ignore_whitespace: true }).isInt().isLength({ min: 4 }).withMessage("Enter minimum 4 numbers"),
            check("name", "Please enter your name").not().isEmpty().isString(),
            check("department", "Please enter department name").notEmpty(),
            check("age", "please enter age").notEmpty().isInt({ min: 18, max: 100 }).withMessage("Please enter above 18 age"),
            check("dob", "please enter valide dob").notEmpty().isString(),
            check("city", "Please enter valide city name").notEmpty().isString(),
            check("mail_id", "Please enter mail_id").notEmpty().isEmail().withMessage("Please enter valide mail_id"),
            check("mobile_no", "Please enter mobile number").notEmpty().isInt().withMessage("Enter the numbers").isLength({ min: 10, max: 10 }).withMessage("Please enter valide mobile_no"),
            check("marks", "Enter the marks").notEmpty(),
            check("language", "Enter the value").notEmpty()
        ]
    }
    /**
     * checkId
     * @returns 
     */
    this.checkId = () => {
        return [
            check("student_id", "Please enter student_id").notEmpty()
        ]
    }
    /**
     * imageValidation
     * @returns 
     */
    this.checkarr = () => {
        return [
            check("name").custom((value, { req }) => {
                let arr = ['arun', 'hari']
                if (arr.includes(value)) {
                    if (req.body.file instanceof Array) {
                        return true;
                    }else{
                        throw new Error('File must be in array');
                    }
                } else {
                    if (typeof req.body.file != 'string') {
                        throw new Error('File is not String');
                    } else {
                        return true;
                    }
                }
            })
        ]
    }

    this.checktest = () => {
        return [
            check("name").notEmpty({ignore_whitespace : true}).isIn(["arun","hari"]),
            check("name").custom((value, {req}) => {
                if (value == "arun","hari") {
                    if (req.body.file instanceof Array) {
                        return true;
                    }else{
                        throw new Error('File must be in array');
                    }
                } else {
                    if (typeof req.body.file != 'string') {
                        throw new Error('File is not String');
                    } else {
                        return true;
                    }
                }
            })
        ]
    }
}

module.exports = new Validation();