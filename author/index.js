import getDb, { DB } from "../database/index.js";

const authorController = {
    register: async (req, res) => {
        try {
            const inforAuthor = req.body;
            const model = (await getDb()).db(DB.DB_NAME).collection(DB.COLLECTIONS.AUTHORS);
            const createAuthor = await model.insertOne(inforAuthor);
            if (!createAuthor.acknowledged) throw new Error('Thất bại!');

            (await getDb()).close().then((rs) => {
                console.log('Database closed!')
            });
            res.status(201).send({
                message: 'Thành công!',
                data: createAuthor
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
}

export default authorController;