const mongoose = require("mongoose");

function connectMongoDb(url){
    return mongoose.connect(url);

}

module.exports= connectMongoDb;
