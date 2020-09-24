var express = require('express');
var router = express.Router();
var middleware = require('../Midleware/midleware');
const userController = require('../controllers/user');
var HttpStatus = require('http-status-codes');
var custom_consts = require('../config/constants');

router.post('/CreateUser', (req, res) => {
    userController.CreateUser(req.body)
        .then(result => {
            //console.log(result)
            if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
            else res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error del cliente' });
        })
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error del cliente' })
        })
});


router.put('/UpdateUser', (req, res) => {
    userController.UpdateUser(req.body)
        .then(result => {
            //console.log(result)
            if (result.output.success) res.status(HttpStatus.NO_CONTENT).json({});
            else res.status(HttpStatus.BAD_REQUEST).json({ error:  'Error del cliente'});
        })
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error del cliente'});
        })
});

router.get('/GetUsers', (req, res) => {
    userController.GetUsers(req.query)
        .then(result => {
            res.status(HttpStatus.OK).json({ data: result.recordset });
        })
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error del cliente' });
        })
});

router.get('/GetUser', (req, res) => {
    userController.GetUser(req.query)
        .then(result => {
            res.status(HttpStatus.OK).json({ data: result.recordset });
        })
        .catch(err => {
            res.status(HttpStatus.BAD_REQUEST).json({ error: 'Error del cliente' });
        })
});

router.get('/Login', (req, res) => {
    userController.Login(req.query)
        .then(result => {
            console.log('Correcto',result.output.success);
            if (result.output.success) {
                res.status(200).json({status: true});
            }else {
                res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        })
        .catch(err => {
            console.log('Error');
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        })
});
module.exports = router;