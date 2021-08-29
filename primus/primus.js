const Primus = require('primus');

let go = (server) => {
    let primus = new Primus(server, {/* options */ });
    primus.on('connection', (spark) => {
        console.log("received Spark!");

        spark.on('data', (data) => {
            console.log(data);
            console.log("data received!");
            primus.write(data); //("action: addtodo" w naar alle clients gestuurd)
        });

    });

}

module.exports.go = go;