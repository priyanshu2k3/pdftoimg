const fs = require('fs');
const path = require('path');
const express = require('express');
const multer  = require('multer');

const app = express();
const port = 3000;

const zip=require('./zip')
const  pdfToImg = require('./pdftoimg')

//global variable
var  fileName=''

fs.access('./zip', fs.constants.R_OK, (err) => {
  if (err) {
    console.log(err);
    fs.mkdirSync('./zip');
    fs.mkdirSync('./output');
    fs.mkdirSync('./uploads');
  } else {
    console.log('Folder exists');
  }
});

//implementing multer ⬇⬇⬇

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    // console.log("2")
    fileName =  Date.now()+'_'+file.originalname ;
    // console.log(fileName)
    cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

//implementing multer ⬆⬆⬆

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend')); 


app.get('/', (req, res) => {
  res.render('home.ejs'); 
});

app.post('/upload', upload.single("pdf",) , async function (req, res) {
    
    await pdfToImg(fileName).then
    (res.send({msg:"done check the zip folder of this app"}))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



