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

var verifyToken = function (req, res, next) {
    const company_api_key = req.params.company_api_key
    const company_id = parseInt(req.params.company_id)


    db.get('select company_api_key from company where id = ?',
        [company_id],
        (err, row) => {
            if (row == undefined) {
                res.sendStatus(400)
            } else {
                if (row.company_api_key == company_api_key) {
                    next()
                } else {
                    res.status(400)
                    res.json('wrong api key')
                }
            }
        }
    )
};



//get all sensor
router.get("/:company_api_key/:company_id/", verifyToken, (req, res) => {
    const company_id = req.params.company_id;
    db.serialize(function () {
        let select = 'SELECT * from sensor where location_id = (select id from location where company_id = ?) ;';
        db.all(select, [company_id], function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ message: 'sensores encontrados', rows })
            }
        });
    });

});

//get one  sensor
router.get("/one-sensor/:company_api_key/:company_id/:id_sensor", verifyToken, (req, res) => {
    const company_id = req.params.company_id;
    const id_sensor = req.params.id_sensor;
    db.serialize(function () {
        let select = 'SELECT * from sensor where sensor_id = ? and location_id = (select id from location where company_id = ?) ;';
        db.all(select, [id_sensor, company_id], function (err, rows) {
            if (err) {
                console.log(err);
            }
            else {
                res.send({ message: 'sensores encontrados', rows })
            }
        });
    });

});

//edit one  sensor
router.put("/edit-sensor/:company_api_key/:company_id/:id_sensor", verifyToken, bodyParser, (req, res) => {
    // api_key company example RNZLV7TKyAoXYDE63F4D52
    const company_id = req.params.company_id;
    const id_sensor = req.params.id_sensor;
    const sensor_name = req.body.sensor_name;
    const sensor_category = req.body.sensor_category;
    const sensor_meta = req.body.sensor_meta;

    db.serialize(function () {
        let insert = 'UPDATE sensor SET  sensor_name = ?, sensor_category = ?, sensor_meta = ? WHERE sensor_id = ? and location_id = (select id from location where company_id = ?)';
        db.run(insert, [sensor_name, sensor_category, sensor_meta, id_sensor, company_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo modificar sensor' })
            } else {
                res.status(200).json({ message: 'sensor modificado correctamente' })
            }
        })
    });
});

//delete one location
router.delete("/delte-sensor/:company_api_key/:company_id/:id_sensor", verifyToken, bodyParser, (req, res) => {
    // api_key company example RNZLV7TKyAoXYDE63F4D52
    const id_sensor = req.params.id_sensor;
    const company_id = req.params.company_id;

    db.serialize(function () {
        let query = 'DELETE FROM sensor WHERE sensor_id = ? and location_id = (select id from location where company_id = ?)';
        db.run(query, [id_sensor, company_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo eliminar sensor' })
            } else {
                res.status(200).json({ message: 'sensor eliminada correctamente' })
            }
        })
    });
});



module.exports = router;