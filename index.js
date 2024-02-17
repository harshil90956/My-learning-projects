const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


// index route

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
});

//New route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

// create route

// app.post("/chats",(req,res)=>{
//      let {from,to,msg} = req.body;
//      let newChat = new Chat[{
//         from:from,
//         to:to,
//         msg:msg,
//         created_at: new Date(),
//      }];
//      console.log(newChat);
//     res.send("working ");
// });
// create route
app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({ // Corrected syntax: using parentheses () instead of square brackets []
       from: from,
       to: to,
       msg: msg,
       created_at: new Date(),
    });

    newChat.save()
       .then(savedChat => {
           console.log("New chat saved:", savedChat);
           res.redirect("/chats"); // Redirect to the chats page after saving
       })
       .catch(err => {
           console.error("Error saving chat:", err);
           res.status(500).send("Error saving chat");
       });
});

// edit route

app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render("edit.ejs",{chat});
});

// update route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    let uptchat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators: true,new: true}
        );
        console.log(uptchat);
    res.redirect("/chats");
});

// DESTROY route

app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let delchat = await Chat.findByIdAndDelete(id);
    console.log(delchat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("server is working");
});


app.listen(8000,()=>{
    console.log("server is listening on port 8000");
});