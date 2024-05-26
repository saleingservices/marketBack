const db = require('./models');
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' })
const app = express();
global.__basedir = __dirname;
global.__tempUpload = __dirname + '/tempUpload/'
let corsOptions = {
	origin: ['http://localhost:3000'
	]
};
// use models
db.connection.sync(
	{
		alter:  true
		// alter : { drop: false },
		// force : true
	})
	.then(async () => {
		await initial()
	})

// use middileware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./upload'))
app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept'
    )
    next()
})
// other route
require('./routes')(app)

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
});

//=======================================
// simple route
app.get('/', async (req, res) => {
	res.json({
		message: 'Welcome to woomart application.',
		dateTime: Date.now()
	});
});


async function initial() {

}