require("dotenv").config();
const express= require("express");
const cors= require("cors");
const postsRouter= require("./routes/posts.route");
const usersRouter= require("./routes/users.route");
const connect = require("./config/db");
const User = require("./models/User.model");
const Post = require("./models/Post.model");
const PORT= process.env.PORT;

const app= express();

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome")
})


app.get('/analytics/users', async (req, res) => {
    try {
      const count = await User.countDocuments();
      res.status(200).json({ count: count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Retrieve the top 5 most active users, based on the number of posts
  app.get('/analytics/users/top-active', async (req, res) => {
    try {
      const users = await User.find();
      const topUsers = await Promise.all(
        users.map(async (user) => {
          const posts = await Post.find({ user_id: user._id });
          return { user_id: user._id, name: user.name, post_count: posts.length };
        })
      );
      topUsers.sort((a, b) => b.post_count - a.post_count);
      res.status(200).json(topUsers.slice(0, 5));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  app.get('/analytics/posts', async (req, res) => {
    try {
      const count = await Post.countDocuments();
      res.status(200).json({ count: count });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  // Retrieve the top 5 most liked posts
app.get('/analytics/posts/top-liked', async (req, res) => {
    try {
      const posts = await Post.find().sort({ likes: -1 }).limit(5);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



app.use("/users",usersRouter)
app.use("/posts",postsRouter)


app.listen(PORT,async()=>{
    try{
        await connect();
        console.log("Connected to DB Successfully");
    }
    catch(err){
        console.log("Error connecting to DB");
        console.log(err)
    }
    console.log(`Listening at http://localhost:${PORT}`);
})