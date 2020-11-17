// this file uses the model student.js to create the database table,
// decides if this code is running locally or is it running on Heroku,
// thereby setting up the correct database connection
let { Sequelize, DataTypes } = require('sequelize');

// Heroku sets up the NODE_ENV variable, else the env will be run locally
let env = process.env.NODE_ENV || 'development';

// fetch code from config.json file
// (decides if this is development on your own computer or production at Heroku)
let config = require(__dirname + '/../config.json')[env];

let db = {};
let sequelize;

if(config.use_env_variable)         // if heroku is used, set up heroku
{
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
}
else                                // else use the local development settings
{
    sequelize = new Sequelize(config);
}

// read your model information from student.js
// create the model & set up the database tables in the database
// let model = sequelize['import']('./student.js');
// https://sequelize.org/master/manual/models-definition.html
let studentModel = require('./student')(sequelize, DataTypes);
db[studentModel.name] = studentModel;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// export the db for other parts of the code to use
module.exports = db;
