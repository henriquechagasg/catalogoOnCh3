const fs = require('fs')
const util = require('util')

const readDir = util.promisify(fs.readdir);


readDir('public/imgs')
    .then(files => {
        let files
    })


// const readFile = util.promisify(fs.readFile)
// function getPassword() {
//     return readFile('login.txt', 'utf8')
// }
// getPassword()
//     .then(data => {
//         const password = encodeURI(data)
//         const MONGODB_URI = `mongodb+srv://buiu123:${password}@cluster0.5c2la.mongodb.net/<dbname>?retryWrites=true&w=majority` 
//         mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true