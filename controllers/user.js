var sql = require('mssql');
var sqlconfig = require('../config/envconfig').database;

exports.CreateUser = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('fullname', sql.VarChar(150), req.fullName)
            .input('email', sql.VarChar(50), req.email)
            .input('password', sql.VarChar(50), req.password)
            .input('image', sql.VarChar(100), req.image)
            .output('success', sql.Bit, 0)
            .execute('CreateUser');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.UpdateUser = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .input('id', sql.Int, req.id)
            .input('fullname', sql.VarChar(150),  !req.fullName ? null : req.fullName)
            .input('email', sql.VarChar(50), !req.email ? null : req.email)
            .input('password', sql.VarChar(50), !req.password ? null : req.password)
            .input('image', sql.VarChar(100), !req.image ? null : req.image)
            .output('success', sql.Bit, 0)
            .execute('UpdateUser');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.GetUsers = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
            .execute('GetUsers');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}


exports.GetUser = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
        .input('id', sql.Int, req.id)
        .execute('GetUser');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}

exports.Login = async (req) => {
    try {
        let pool = await sql.connect(sqlconfig);
        let result = await pool.request()
        .input('fullname', sql.VarChar(150),  !req.fullName ? null : req.fullName)
        .input('email', sql.VarChar(50), !req.email ? null : req.email)
        .input('password', sql.VarChar(50), req.password)
        .output('success', sql.Bit, 0)
        .execute('Authorize');
        sql.close();
        return result;
    }
    catch (excepcion) {
        sql.close();
        throw excepcion;
    }
}