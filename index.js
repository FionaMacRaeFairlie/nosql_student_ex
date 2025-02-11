const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');


const router = require('./routes/studentSearchRoutes');
app.use('/', router); 

app.listen(3000, () => console.log("Server is running"));
