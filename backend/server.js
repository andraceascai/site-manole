// require('dotenv').config(); // asigură .env pentru local
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
    // mount routes
    // console.log('repertoriiRouter type: ', typeof repertoriiRouter)
    // console.log('reeprtoriiRouter: ', repertoriiRouter)
    app.use('/api', repertoriiRouter); // rutele vor fi /api/repertorii etc.
    app.use('/api', spectacoleRouter);
    app.use('/api', communityBlogRouter);
    app.use('/api', actorBlogRouter);
    app.use('/api',userRouter);
 
    // const port = process.env.PORT || 3000;
    const port = 3000;
    app.listen(port, () => console.log(`Server listening on ${port}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();