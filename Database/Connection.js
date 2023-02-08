const mongoose = require("mongoose");
const Config = require('../Helpers/Config')()


function Database() {

    /**
     * connectDataBase
     */

    this.connectDataBase = () => {
        mongoose.connect(Config.mongodb_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("DB Connected")).catch((error) => console.log(error.message));
    }
    this.getStudentDBConnection = () => {
        return mongoose
    }
}

module.exports = new Database();