require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
 
const app = express();
app.use(express.json());
app.use(cors());
 
// importă rutele după ce DB e conectat 
const repertoriiRouter = require('./routes/repertoriu');
const spectacoleRouter = require('./routes/spectacole');
const communityBlogRouter = require('./routes/communityBlog');
const actorBlogRouter = require('./routes/actorBlog');
const userRouter = require('./routes/user');
 
// conectează DB și pornește serverul
(async () => {
  try {
    await connectDB();
    app.use('/api', repertoriiRouter);
    app.use('/api', spectacoleRouter);
    app.use('/api', communityBlogRouter);
    app.use('/api', actorBlogRouter);
    app.use('/api',userRouter);

    const port = process.env.PORT;
    app.listen(port, () => console.log(`Server listening on ${port}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();