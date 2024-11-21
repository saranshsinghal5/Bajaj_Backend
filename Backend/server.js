import express from 'express';     
import bodyParser from 'body-parser';  
import dotenv from 'dotenv';         
import cors from 'cors';             
import router from './Router/bfhlRoute.js'; 
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.use('/', router);

 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
