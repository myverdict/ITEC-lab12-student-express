let express = require('express');
let db = require('../models');          // this will fetch the index.js file
let Sequelize = require('sequelize');
let Student = db.Student;

// a router matches a request to functions that respond to them
let router = express.Router()           // create a router

// routes for getting all students (get request)
// a request to students will cause the attached function to run
router.get('/students', function(req, res, next){
    Student.findAll( {order: ['starID']} )              // order students by starID
        .then( (students) => {
            return res.json(students)
        })
        .catch( err => next(err) )
})

// route for getting one specified student (get request)
router.get('/students/:id', function(req, res, next){
    Student.findByPk(req.params.id)
        .then( (student) => {
            if (student)
            {
                return res.json(student)
            }
            else
            {
                return res.status(404).send('Student not found');
            }
        })
        .catch( err => next(err) )
})

// routes for adding a new student (post request)
router.post('/students', function(req, res, next){
    Student.create(req.body)
        .then( (data) => {
            return res.status(201).send('ok')
        })
        .catch( err => {
            if (err instanceof Sequelize.ValidationError)
            {
                let messages = err.errors.map(e => e.message);
                return res.status(400).json(messages);              // 400 = bad request from user
            }

            return next(err);
        })
})

// routes for a patch request (for updating student information)
router.patch('/students/:id', function(req, res, next) {
    Student.update( req.body, {where: {id: req.params.id}} )
        .then( rowsModified => {
            if (!rowsModified[0])
            {
                // 404 = not found, student with this ID not found
                return res.status(404).send('Not found');
            }
            else
            {
                return res.send('ok');
            }
        })
        .catch( err => {
            if (err instanceof Sequelize.ValidationError)
            {
                let messages = err.errors.map( (e) => e.message);
                // 400 = bad request from user
                return res.status(400).json(messages);
            }

            return next(err);
        })
})

// routes for a delete request
router.delete('/students/:id', function(req, res, next) {
    Student.destroy( {where: {id: req.params.id}} )
        .then( rowsModified => {
            return res.send('ok')
        })
        .catch( err => next(err) )
})

// make the router available to the rest of the project
module.exports = router;