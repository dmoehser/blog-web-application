const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { posts: posts, title: "My Blog" });
});

app.get("/create", (req, res) => {
  res.render("create");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/create", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title: title,
    content: content,
    date: new Date().toLocaleDateString("de-DE")
  };
  posts.push(newPost);
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== id);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(post => post.id === id);
  if (!post) {
    return res.redirect("/");
  }
  res.render("edit", { post: post, title: "Edit post - My Blog" });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const post = posts.find(post => post.id === id);
  if (post) {
    post.title = title;
    post.content = content;
    post.date = new Date().toLocaleDateString("de-DE");
  }
  res.redirect("/");
});

// Blog posts array (temporary storage)
let posts = [
  {
    id: 1,
    title: "My first blog post",
    content: "This is the content of my first blog post.",
    date: new Date().toLocaleDateString("de-DE")
  }
];

app.listen(PORT, function () {
  console.log(`Server runs on port ${PORT}`);
});