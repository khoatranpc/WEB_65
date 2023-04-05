import express from 'express';
import authorController from './author/index.js';
import bookController from './books/index.js';
const app = express();

app.use(express.json());
app.post('/api/v1/author', authorController.register);
app.post('/api/v1/book/:idAuthor', bookController.createBook);

app.listen(8000, () => {
    console.log('Server is running!');
});
