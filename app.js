const mysql = require('mysql');
const { application } = require('express');
const path = require('path');
const express = require('express');


const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

const PORT = process.env.PORT || 5000;



// this is a volunteer form 

app.post('/volunteer-form', (req, res) => {
    console.log(req.body)

    var finishRequest = function () {

        console.log('your message has been sent');
        res.sendFile(path.join(__dirname, 'public', 'regSuccess.html'))

    }
    var requestError = function () {
        console.log('somme error has occured');
        res.sendFile(path.join(__dirname, 'public', 'regFailure.html'))
    }


    



    const db = mysql.createConnection({
        host: "youva.cifwv2gd7zo9.ap-south-1.rds.amazonaws.com",
        port: "3306",
        user: "admin",
        password: "Youva1234",
        database: "sys"
        
    });
    db.connect(function (err) {
        if (err) throw err;
        console.log('connected');
        db.query(`insert into volunteer values('${req.body.name}','${req.body.email}','${req.body.desc}')`, function (err, res) {
            if (err) 
            requestError();

            console.log(res);
            finishRequest();


        });

    });
    db.end;


})

// this is for contact form 



app.post('/contact-form', (req, res) => {
    console.log(req.body)

    // console.log('yes its succesfjul');
    // res.sendFile(path.join(__dirname, 'public', 'contact.html'))


    var finishRequest = function () {

        console.log('your message has been sent');
        res.sendFile(path.join(__dirname, 'public', 'contactSucess.html'))

    }
    var requestError = function () {
        console.log('somme error has occured');
        res.sendFile(path.join(__dirname, 'public', 'contactFailure.html'))
    }

    const db = mysql.createConnection({
        host: "youva.cifwv2gd7zo9.ap-south-1.rds.amazonaws.com",
        port: "3306",
        user: "admin",
        password: "Youva1234",
        database: "sys"
    });
    db.connect(function (err) {
        if (err) throw err;
        console.log('connected');
        db.query(`insert into contact values('${req.body.name}','${req.body.email}','${req.body.subject}','${req.body.message}')`, function (err, res) {
            if (err) requestError();
            console.log(res);
            finishRequest();

        });

    });
    db.end;


})

app.listen(PORT, () => {
    console.log(`server started at : http://localhost:${PORT}/index.html`);

})