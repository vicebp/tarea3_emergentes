const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const TokenGenerator = require('uuid-token-generator');

const bodyparser = require('body-parser');
var bodyParser = bodyparser.json()


let db = new sqlite3.Database('./tarea3.db', (err) => {
    if (err) {
        console.error(err.message);
    }

    console.log('conected');
});


function generateToken() {
    const tokgen = new TokenGenerator(); // Default is a 128-bit token encoded in base58
    const token = tokgen.generate();
    return token
}


var verifyToken = function (req, res, next) {
    const company_api_key = req.params.company_api_key


    db.get('select * from company where company_api_key  = ?',
        [company_api_key],
        (err, row) => {
            if (row == undefined) {
                res.sendStatus(400)
            } else {
                console.log('authorized');
                next()
            }
        }
    )
};


/*router.get('/test/:sensor_api_key', verifyToken, function (req, res, next) {

    const company_api_key = req.params.sensor_api_key;
    let query = ' select * from sensor where sensor_api_key  = ?'
    console.log(query);

    db.get(query, company_api_key, function (err, rows) {
        res.send(rows);
    }
    )

});*/


// Create company
router.post("/create-company", bodyParser, (req, res) => {
    const company_name = req.body.company_name;
    const company_api_key = generateToken()
    console.log(company_api_key)
    db.serialize(function () {
        let insert = 'INSERT INTO company (company_name, company_api_key) VALUES (?,?)';
        db.run(insert, [company_name, company_api_key], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo ingresar company' })
            } else {
                res.status(201).json({ message: 'company creado correctamente' })
            }
        })
    });
});



//Create location
router.post("/create-location/:company_api_key", verifyToken, bodyParser, (req, res) => {
    const company_id = req.body.company_id;
    const location_name = req.body.location_name;
    const location_country = req.body.location_country;
    const location_city = req.body.location_city;
    const location_meta = req.body.location_meta;
    db.serialize(function () {
        let insert = 'INSERT INTO location (company_id, location_name, location_country, location_city, location_meta) VALUES (?,?,?,?,?)';
        db.run(insert, [company_id, location_name, location_country, location_city, location_meta], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo ingresar location' })
            } else {
                res.status(200).json({ message: 'location creado correctamente' })
            }
        })
    });
});

//Create Sensor
router.post("/create-sensor", bodyParser, (req, res) => {
    const location_id = req.body.location_id;
    const sensor_name = req.body.sensor_name;
    const sensor_category = req.body.sensor_category;
    const sensor_meta = req.body.sensor_meta;
    const sensor_api_key = generateToken();
    db.serialize(function () {
        let insert = 'INSERT INTO sensor (location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key) VALUES (?,?,?,?,?)';
        db.run(insert, [location_id, sensor_name, sensor_category, sensor_meta, sensor_api_key], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo ingresar sensor' })
            } else {
                res.status(201).json({ message: 'sensor creado correctamente' })
            }
        })
    });
});







module.exports = router;