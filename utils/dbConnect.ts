/* This is a database connection function*/
import mongoose from 'mongoose';

interface Connection {
  isConnected: number;
}

/* creating connection object*/
const connection: Connection = {
  isConnected: 0,
};

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  if (!process.env.MONGODB_URI) {
    throw new Error('Non proper MongoDB URI');
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
