const express = require('express');
const { resolve } = require('path');
const routes = require('./routes'); // Importing the routes
const BlogPost = require('./schema');
const url = "mongodb+srv://fibaaah:Jaseenamujeeb8830@fibaaah.dnfd5.mongodb.net/writingmongo2"

const app = express();
const port = 3010;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.static('static'));

app.use('/api', routes); // Using the routes with a base path

const connection = mongoose.connect(url)
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.post('/create',async(req, res) => {
  let payload = req.body
  try{
    const newblog = new BlogPost(payload)
    await newblog.save()
    res.status(201).json({ message: 'Blog Post created successfully', blog: newblog })

  }catch(error){
    console.log(error)
    res.status(500).json({ message: 'Error creating blog post', error: error.message })
  }

})

app.listen(port, async() => {
  try{
    await connection
    console.log('Connected to MongoDB')
  }catch(err){
    console.log(err)
  }
  console.log(`Example app listening at http://localhost:${port}`);
});
