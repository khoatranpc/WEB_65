import mongodb from 'mongodb';

export const DB = {
    DB_NAME: 'WEB65',
    COLLECTIONS: {
        AUTHORS: 'authors',
        BOOKS: 'books'
    }
}

const getDb = async () => {
    const clientDb = new mongodb.MongoClient('mongodb://127.0.0.1:27017');
    await clientDb.connect();
    return clientDb;
}
export default getDb;