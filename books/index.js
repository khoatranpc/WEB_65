import getDb, { DB } from "../database/index.js";
import { ObjectId } from 'mongodb';
const bookController = {
    createBook: async (req, res) => {
        try {
            const { idAuthor } = req.params;
            const book = {
                ...req.body,
                idAuthor: new ObjectId(idAuthor)
            };

            const model = (await getDb()).db(DB.DB_NAME).collection(DB.COLLECTIONS.BOOKS);
            const createBook = await model.insertOne(book);
            if (!createBook.acknowledged) throw new Error('Thất bại!');
            const author = (await getDb()).db(DB.DB_NAME).collection(DB.COLLECTIONS.AUTHORS);
            // danh sách sách đã viết -> mảng: 
            const update = await author.updateOne({
                _id: new ObjectId(idAuthor)
            }, {
                $push: {
                    listBook: { $each: [createBook.insertedId] }
                }
            });
            // conditional update ...
            (await getDb()).close().then((rs) => {
                console.log('Database closed!')
            });
            res.status(201).send({
                message: 'Thành công!',
                data: createBook,
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}

export default bookController;