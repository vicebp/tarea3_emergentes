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


// parse application/json
router.use(bodyParser)


var verifyToken = function (req, res, next) {
    const sensor_api_key = req.body.sensor_api_key


    db.get('select * from sensor where sensor_api_key  = ?',
        [sensor_api_key],
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

// insert sensor_data
router.post('/', verifyToken, function (req, res, next) {

    const sensor_data = req.body.json_data
    const sensor_api_key = req.body.sensor_api_key

    sensor_data.forEach(data => {
        db.run(`insert into sensor_data values (?,?,?, strftime('%s', 'now'),(select sensor_id from sensor where sensor_api_key = ? ) )`,

            [data.value1, data.value2, sensor_api_key, sensor_api_key],

            (err) => {
                if (err != null) {
                    res.sendStatus(400)
                }
            }
        )
    });
    res.sendStatus(201)

})

router.get('/:company_api_key/:from/:to/:array_sensors', function (req, res) {


    const company_api_key = req.params.company_api_key
    const from = parseInt(req.params.from)
    const to = parseInt(req.params.to)
    const array_sensors_raw = JSON.parse(req.params.array_sensors)

    const placeholders = array_sensors_raw.map((item) => item).join(",");

    let query = ` select sd.value1,sd.value2,sd.time_epoch,sd.sensor_id from sensor_data as sd inner join sensor as s  on s.sensor_id  = sd.sensor_id  inner join location as l on s.location_id = l.id  inner join company as c on c.id = l.company_id  where c.company_api_key = '${company_api_key}' and s.sensor_id in (${placeholders})  and time_epoch >= ${from} and time_epoch <= ${to}`

    db.all(query,

        (err, rows) => {
            res.send(rows);
        }
    )

});


/*db.serialize(function () {
    let select = 'SELECT * from sensor where location_id = (select id from location where company_id = ?) ;';
    db.all(select, [company_id], function (err, rows) {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ message: 'sensores encontrados', rows })
        }
    });
});*/

module.exports = router;