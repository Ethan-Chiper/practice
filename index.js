const Express = require('express');
const app = Express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

require("./Database/Connection").connectDataBase();

app.use('/api/student', require('./Controllers/Students/StudentRouter'));

const server = app.listen(7000, () => {
    console.log('Server running port on: ' + server.address().port);
})


module.exports = app