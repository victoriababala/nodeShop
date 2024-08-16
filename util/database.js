// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "moovikin1106",
// });

// module.exports = pool.promise();

// const Sequalize = require("sequelize");

// const sequalize = new Sequalize("node-complete", "root", "moovikin1106", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequalize;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  /** REPLACE CONNECTION STRING IF USING ATLAS
   *  "mongodb+srv://<username>:<password>@<cluster-id>.mongodb.net/<dbName>?retryWrites=true&authSource=admin"
   */
  MongoClient.connect(
    "mongodb+srv://victoria:victoria11@atlascluster.unx95ml.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasCluster"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
