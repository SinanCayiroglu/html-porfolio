import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import _ from "lodash";
import ejs from "ejs";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var userIsAuthorised = false;
const posts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";


app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    
    res.render("index.ejs", {
        startingContent: homeStartingContent,
        posts: posts})
  });

app.get("/about", (req, res) => {
    res.render("about.ejs")
  });

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
  });

  app.get("/login", (req, res) => {
    res.render("login.ejs")
  });

  app.get("/create", (req, res) => {
    res.render("create.ejs")
  });

  app.get("/success", (req, res) => {
    res.render("success.ejs")
  });

app.post("/check", (req, res) => {
    var pwd = req.body.password;
    var usd=req.body.username
    if (pwd === "123456" && usd==="admin") {
        res.redirect("");
    } 
    else {
        res.redirect("login.ejs");
    }
    
  });

app.post("/create",(req,res)=>{
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
      };
    
      posts.push(post);
    
      res.redirect("/success");
  })
  
  app.get("/posts/:postName", function(req, res){
    const requestedTitle = _.lowerCase(req.params.postName);
  
    posts.forEach(function(post){
      const storedTitle = _.lowerCase(post.title);
  
      if (storedTitle === requestedTitle) {
        res.render("post", {
          title: post.title,
          content: post.content
        });
      }
    });
  
  });
app.post("/submit",(req,res)=>{

})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });