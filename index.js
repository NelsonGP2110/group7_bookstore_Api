import express from 'express';
import routes from './src/routes/server_routes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();

//const mongoose = mongoose();
const PORT = 8000;

mongoose.Promise = global.Promise;
mongoose.connect(
  //link to database
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// bodyparser septup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());
//app.use('/user', userRoutes);
routes(app);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
