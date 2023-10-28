const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://shreyasaid48:shreyas@cluster0.7be5thb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,

    useUnifiedTopology: true

}).then(() => {
    console.log("Connection open");
}).catch(err => {
    console.log("OH NO ERROR");
    console.log(err);
})

app.use(cors());
app.use(express.json());

const stockRoutes = require('./routes/stockRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', stockRoutes);
app.use('/', userRoutes);



app.listen(5000, () => {
    console.log("listening on port 5000");
})