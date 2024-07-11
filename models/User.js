const mongoose = require('mongoose');

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.uzgdtuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email  : {
        type:String,
        required:true,
        unique: true
    },
    password: {
        type:String,
        required:true}
    
})

module.exports = mongoose.model('user',userSchema);