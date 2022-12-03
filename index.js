const express = require("express");
const app = express();
const routerApi = require('./routes')

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hola mi server en Express");
});

app.listen(port, () => {
    console.log("My port: " + port);
});

routerApi(app);