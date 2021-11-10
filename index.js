import express from 'express';
import routes from './src/routes/server_routes';
import userRoutes from './src/routes/user';
import reviewRoutes from './src/routes/reviews';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
//const mongoose = mongoose();
const PORT = 8000;

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb+srv://nelgp:group7@cluster0.pmqgt.mongodb.net/bookstore_api?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// bodyparser septup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());


routes(app);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
