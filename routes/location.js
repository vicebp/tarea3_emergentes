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


//get all location
router.get("/:company_api_key/:company_id", verifyToken, (req, res) => {
    const company_id = req.params.company_id;

    db.serialize(function () {
        let select = 'SELECT * from location WHERE company_id  = ?;';
        db.all(select, [company_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo encontrar location' })
            } else {
                res.send({ message: 'location encontrada', rows })
            }
        })
    });

});
//get one  location
router.get("/one-location/:company_api_key/:company_id/:location_id", verifyToken, (req, res) => {
    const company_id = req.params.company_id;
    const location_id = req.params.location_id;

    db.serialize(function () {
        let select = 'SELECT * from location WHERE company_id  = ? AND id = ?';
        db.get(select, [company_id, location_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo encontrar location' })
            } else {
                res.send({ message: 'location encontrada', rows })
            }
        })
    });

});

//edit one  location
router.put("/edit-location/:company_api_key/:company_id/:location_id", verifyToken, bodyParser, (req, res) => {
    // api_key company example RNZLV7TKyAoXYDE63F4D52
    const company_id = req.params.company_id;
    const location_id = req.params.location_id;

    const location_name = req.body.location_name;
    const location_country = req.body.location_country;
    const location_city = req.body.location_city;
    const location_meta = req.body.location_meta;

    db.serialize(function () {
        let insert = 'UPDATE location SET location_name = ?, location_country = ?, location_city = ?, location_meta = ? WHERE id = ? AND company_id =?';
        db.run(insert, [location_name, location_country, location_city, location_meta, location_id, company_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo modificar location' })
            } else {
                res.status(200).json({ message: 'location modificada correctamente' })
            }
        })
    });
});

//delete one location
router.delete("/delete-location/:company_api_key/:company_id/:location_id", bodyParser, (req, res) => {
    // api_key company example RNZLV7TKyAoXYDE63F4D52
    const company_id = req.params.company_id;
    const location_id = req.params.location_id;

    db.serialize(function () {
        let query = 'DELETE FROM location WHERE id = ? AND company_id = ?';
        db.run(query, [location_id, company_id], function (err, rows) {
            if (err) {
                res.status(400).json({ message: 'No se pudo eliminar location' })
            } else {
                res.status(200).json({ message: 'location eliminada correctamente' })
            }
        })
    });
});

module.exports = router;