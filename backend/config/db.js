import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 2000 // Fail fast
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('------------------------------------------------');
        console.warn(`Failed to connect to local MongoDB (${error.message})`);
        console.log('Attempting to start Embedded MongoDB (InMemory)...');
        console.log('------------------------------------------------');

        try {
            // Dynamic import to avoid crash if package is not installed
            const { MongoMemoryServer } = await import('mongodb-memory-server');

            // Ensure data directory exists or is creatable. 
            // Note: multiple runs might lock this path.
            const mongod = await MongoMemoryServer.create({
                instance: {
                    dbPath: './data/mongod',
                    storageEngine: 'wiredTiger'
                }
            });
            const uri = mongod.getUri();
            console.log(`Embedded MongoDB started at: ${uri}`);

            // Update process.env for other usages (like seed script if running in same process, though seed usually imports db)
            process.env.MONGO_URI_EMBEDDED = uri;

            const conn = await mongoose.connect(uri);
            console.log(`MongoDB Connected (Embedded): ${conn.connection.host}`);
            console.log('WARNING: Data will be lost when the server stops/restarts.');
        } catch (err) {
            console.error(`Fatal Error: Could not start embedded database. ${err.message}`);
            process.exit(1);
        }
    }
};

export default connectDB;
