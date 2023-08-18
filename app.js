const express = require('express')
const multer =  require('multer')
const path = require('path')
const File = require('./model/fileschems')
const connectDB = require('./db')
require('dotenv').config()


const app = express()

app.use(express.static('public'))
app.use(express.static('uploads'))


// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // specify the destination folder
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extname = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extname); // generate unique filename
    },
  });
  
  const upload = multer({ storage: storage });

app.get('/',async(req,res) =>{
    res.send('hello')
})

app.post('/upload',upload.single('uploadedFile'),async(req,res)=>{
    const file = await File.create(req.file)
    res.status(200).json(file)
})

app.get('/files', async(req, res) => {
    
  try {
    const files = await File.find().exec();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files.');
  }
  
  // const file_id = req.params.fileId;
  
    // const file = await File.findById(file_id);
    // console.log(file);
    // res.send('Done')
//     const filePath = path.resolve(__dirname, 'uploads', filename);
  
// console.log("This is the file path"+ " "+filePath);    
// res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(404).send('File not found');
//     }
//   })
});
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(404).send('File not found');
    }
  });
});

  const start = async() =>{
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(3000,console.log('server is running on port 3000'))
    } catch (error) {
      console.log(error);
    }
  }

  start();
