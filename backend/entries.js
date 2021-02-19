const mongoose = require('mongoose')
mongoose
    .connect("mongodb://127.0.0.1:27017/Memes", { useNewUrlParser: true })
    .then(()=>{
    	console.log('Connected successfully');
    	})
    .catch(e => {
        console.error('Connection error', e.message);
    })
   

const db = mongoose.connection;

module.exports = db
