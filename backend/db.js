const mongoose = require("mongoose");
// const mongoURL = "mongodb+srv://sumitk504:Ss504110@cluster3.0lesxmv.mongodb.net/Swigato?retryWrites=true&w=majority";
// const mongoURL = "mongodb://sumitk504:Ss504110@ac-nkp7hdq-shard-00-00.0lesxmv.mongodb.net:27017,ac-nkp7hdq-shard-00-01.0lesxmv.mongodb.net:27017,ac-nkp7hdq-shard-00-02.0lesxmv.mongodb.net:27017/Swigato?ssl=true&replicaSet=atlas-a5pn8c-shard-0&authSource=admin&retryWrites=true&w=majority"

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
async function mongoDB() {
  try {
    await mongoose.connect(process.env.mongoURL, options);
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");
    fetched_data.find({}).toArray( async function (err, data) {
      const food_category = await mongoose.connection.db.collection("food_category");
      food_category.find({}).toArray(function (err, catData) {
        if (err) console.log(err);
        else {
            global.food_items = data;
            global.food_category = catData;
        }
      })
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}


module.exports = mongoDB;
