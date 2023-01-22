import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_DEV;
    if (!mongoURI) return;
    let res = await mongoose.connect(mongoURI);
    console.log(`Mongo DB Connected`, res.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
