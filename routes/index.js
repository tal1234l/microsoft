
var AllSchemas = require('../schemas/schemas');
var nodemailer = require("nodemailer");
var validation = require('../validations/validations');
var jwt        = require('jwt-simple');
var sql        = require('mssql');

var config = {
    user: 'tal1234l',
    password: 'Abcd1234',
    server: 'v66zmizxig.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'mydb',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

module.exports = function (flights) {

    var functions = {};

    //API's
    functions.createNewUsers = function(req,res){
       createAndSendToken(req.user,res);
    };
    functions.loginUser = function(req, res){
        createAndSendToken(req.user,res);
    };
    functions.gettemp = function(req, res){

        sql.connect(config, function(err) {
            // ... error checks
            var request = new sql.Request();
            request.query('select top 100 avg_temperature  from mytable', function(err, recordset) {
                if(recordset)
                {
                    var i;
                    var data ={
                        temparr: [],
                        lable: []
                    };
                    for( i=0;i<recordset.length; i++ )
                    {
                        data.temparr.push(recordset[i].avg_temperature);
                        data.lable.push('');
                    }
                    res.status(200).json(data);
                }
                else{
                    res.status(400).json('some thing is wrong with the backend');
                }

            });
        });

    };
    functions.getcurrenttemp = function(req, res){

        sql.connect(config, function(err) {
            // ... error checks
            debugger;
            var request = new sql.Request();
            request.query('select top 1 avg_temperature  from mytable', function(err, recordset) {
                if(recordset)
                {
                    res.status(200).json(recordset[0].avg_temperature);
                }
                else{
                    res.status(400).json('some thing is wrong with the backend');
                }

            });
        });

    };

    return functions;

};
//Helper functions
function createAndSendToken(user, res){
    var payload = {
        sub: user.id
    };
    var token = jwt.encode(payload, "shh...");
    res.status(200).send({
        //Remove the password before sending to client -> user.toJSON()
        user: user.toJSON(),
        token: token
    });
};
function validateJWT(req,res){
    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token,"shh...");
    if(!payload.sub)
        return res.status(401).send({message: 'Authorization failed'});

    if(!req.headers.authorization)
        return res.status(401).json({status: 'you are not authorized'});;

};


