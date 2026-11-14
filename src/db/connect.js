import mongoose from 'mongoose';

const connectToDb = async (options = {}) => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const connectionString = options.connectionString || process.env.MONGODB_URI;
  const databaseName = options.databaseName || process.env.MONGODB_DB_NAME || 'practice';

  if (!connectionString) {
    throw new Error('MONGODB_URI is required.');
  }

  await mongoose.connect(connectionString, { dbName: databaseName });
  return mongoose.connection;
};

const closeDb = async () => {
  await mongoose.connection.close();
};
export { closeDb, connectToDb };
