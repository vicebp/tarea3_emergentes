const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const bodyparser = require('body-parser');
var bodyParser = bodyparser.json()



let db = new sqlite3.Database('./tarea3.db', (err) => {
    if (err) {
        console.error(err.message);
    }

    console.log('conected');
});

//get all company
router.get("/", (req, res) => {
    db.serialize(function () {
        db.all("SELECT * from company", function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ message: 'companys encontradas', rows })
            }
        });
    });

});

//get one  company
router.get("/one-company/:api_key", (req, res) => {
    const api_key = req.params.api_key;

    db.serialize(function () {
        let select = 'SELECT * from company WHERE company_api_key  = ?';
        db.get(select, [api_key], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo encontrar company' })
            } else {
                res.send({ message: 'company encontrado', rows })
            }
        })
    });

});

//edit one  company
router.post("/edit-company/:company_api_key", bodyParser, (req, res) => {
    const company_api_key = req.params.company_api_key
    const company_name = req.body.company_name;

    db.serialize(function () {
        let insert = 'UPDATE company SET company_name = ? WHERE company_api_key = ?';
        db.run(insert, [company_name, company_api_key], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo modificar company' })
            } else {
                res.status(200).json({ message: 'company modificada correctamente' })
            }
        })
    });
});

//delete one  company
router.post("/delte-company/:company_api_key", bodyParser, (req, res) => {
    const company_api_key = req.params.company_api_key

    db.serialize(function () {
        let query = 'DELETE FROM company WHERE company_api_key = ?';
        db.run(query, [company_api_key], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo eliminar company' })
            } else {
                res.status(200).json({ message: 'company eliminada correctamente' })
            }
        })
    });
});

module.exports = router;