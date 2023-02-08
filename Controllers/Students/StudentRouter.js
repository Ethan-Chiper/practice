const express = require("express");
const app = express();
const { validationResult } = require("express-validator");
const StudentController = require("./StudentController");
const StudentValidation = require("./StudentValidation");
const Responder = require("../../Helpers/Responder");
const multer = require("multer");
const upload = multer(multer({ dest: 'Helpers/uploads/' }));

/***
 * CreateStudent
*/

app.post('/create', StudentValidation.studentValidation(), (req, res) => {
    let hasErrors = validationResult(req);

    if (!hasErrors.isEmpty()) {
        return Responder.sendFailureMessage(res, hasErrors.errors[0].msg, "Field Missing");
    }
    return StudentController.createStudent(res, req.body);
});

/**
 * readStudent
 */

app.get('/read', StudentValidation.checkId(), (req, res) => {
    let hasError = validationResult(req);
    if (!hasError.isEmpty()) {
        return Responder.sendFailureMessage(res, hasError.errors[0].msg, "Student_Id Empty");
    }
    return StudentController.readStudent(res, req.body);
});

/**
 * UpdateStudent
 */

app.patch('/update', (req, res) => {
    return StudentController.updateStudent(res, req.body);
});

/**
 * updateMarks
*/

app.patch('/markupdate', (req, res) => {
    return StudentController.updateMarks(res, req.body);
});

/**
 * updateLanguage
*/

app.patch('/languageupdate', (req, res) => {
    return StudentController.updatelanguages(res, req.body);
});

/***
 * deleteMarks
 */

app.delete('/markdelete', (req, res) => {
    return StudentController.deleteMarks(res, req.body);
});

/**
 * deleteStudent
*/

app.delete('/delete', (req, res) => {
    return StudentController.deleteStudent(res, req.body);
});
/**
 * softdelete
 */
app.delete('/soft-delete', (req, res) => {
    return StudentController.deleteStudents(res, req.body);
});
/**
 * view soft-delete data 
 */
app.get('/soft-read', (req, res) => {
    return StudentController.softreadStudent(res, req.body);
});
/**
 * datarestore
 */
app.get('/datarestore', (req, res) => {
    return StudentController.softdelete(res, req.body);
});
/**
 * dataupdate
 */
app.post('/dataupdate', (req, res) => {
    return StudentController.softupdate(res, req.body);
});
/**
 * finddelete
 */
app.get('/finddeleted', (req, res) => {
    return StudentController.softFindData(res, req.body);
});
/**
 * findonedelete
 */
app.get('/findonedeleted', (req, res) => {
    return StudentController.softFindOneData(res, req.body);
});
/**
 * findoneandupdatedelete
 */
app.get('/findoneandupdatedeleted', (req, res) => {
    return StudentController.softFindOneupdateData(res, req.body);
});
/**
 *updatedeleted
 */
app.get('/updatedeleted', (req, res) => {
    return StudentController.softupdateDeletedData(res, req.body);
});
/**
 * count
 */
app.get('/count', (req, res) => {
    return StudentController.softcount(res, req.body);
});
/**
 * deletecount
 */
app.get('/deletedcount', (req, res) => {
    return StudentController.softcountdeleted(res, req.body);
})
/**
 * countdocument
 */
app.get('/countdocument', (req, res) => {
    return StudentController.softcountdocument(res, req.body);
})
/**
 * countwithdeleted
 */
app.get('/countwithdeleted', (req, res) => {
    return StudentController.softcountwitdeleted(res, req.body);
});

/**
 * search base array
 */
app.get('/search', StudentValidation.checkarr(), (req, res) => {
    let hasErrors = validationResult(req);
    if (!hasErrors.isEmpty()) {
        console.log(hasErrors);
        return Responder.sendFailureMessage(res, hasErrors.errors[0].msg, "Field Missing");
    }
    return StudentController.searcharr(req, res);
});

/**
 * updatemarks demo
 */
app.patch('/update', (req, res) => {
    StudentController.updateMarks(req, res);
});


module.exports = app;