var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser')





app.use(bodyParser.urlencoded({ extended: false }))

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'practice'
});

connection.connect();

app.get('/',function(request, response){
    var form = `
    <form action = "/sql_process" method = "post">
    <input type = "text" name ="sql" placeholder = "what table do you want to select?"/>
    <input type = "submit" value = "send"/>
    </form>
    `;
    response.send(form);
})


app.post('/sql_process',function(request, response){
    var post = request.body;
    var sql = post.sql;
    connection.query(`SELECT * FROM ${sql};`,function(err, results){
        if(err){
            throw err;
        }
        console.log(results);
        response.redirect('/');
    })
})




app.listen(5000, function(){
    console.log('5000!')
})
