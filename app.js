const express = require("express");
const multer = require("multer");
const fs = require("fs")
const app = express();


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '.jpg';
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  var upload = multer({ storage: storage })

//const upload = multer({dest: './public/uploads' })

const uploaded_files = []



app.get('/', (req, response) => {
    const path = './public/uploads';
    fs.readdir(path, (err, items) => {
        const images = items.map((image) => {
            return(`<img style='height:110px' src ='./uploads/${image}' />`)
        })
        //console.log(items);
        response.send(`
        <h1>Welcome to Kenziegram!</h1>
        <form method="post" action="/upload" enctype="multipart/form-data">
            <div>
                <label for="file">Choose a file</label>
                <input type="file" id="image" name="image">
            </div>
            <div>
                <button>Upload</button>
            </div>
        </form>
        ${images}
        `);
});
    
})

app.post('/upload', upload.single('image'), (request, response) => {
  console.log(request.file.filename)  
    uploaded_files.push(request.file.filename);
    console.log("Uploaded: " + request.file.filename);  
    let imgName = request.file.filename
    response.send(`
      <h2>Upload Success!</h2>
      <p>${imgName}</p>
      <br />
      <img style='height:200px' src ='./uploads/${imgName}' />
      <form action="/">
        <button type="submit">Return</button>
      </form>
    `);
    //response.redirect('/')
  });

app.use(express.static('./public'));

const port = 3000

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
