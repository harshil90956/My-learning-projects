const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};

let allchats = [
    {
        from: "John",
        to: "Emma",
        msg: "Could you please share the exam materials?",
        created_at: new Date("2024-02-17T10:45:21.782Z")
    },
    {
        from: "Alice",
        to: "Bob",
        msg: "I need your exam sheets, please send them over.",
        created_at: new Date(),
    },
    {
        from: "David",
        to: "Sophia",
        msg: "Hey there, can you forward me your exam papers",
        created_at: new Date(),
    },
    {
        from: "Michael",
        to: "Olivia",
        msg: "Requesting your exam sheets, could you share them",
        created_at: new Date(),
    },
    {
        from: "Ethan",
        to: "Ava",
        msg: "Hello Ava, please send me your exam papers.",
        created_at: new Date(),
    },
    {
        from: "Sophie",
        to: "Liam",
        msg: "Can you share your exam sheets with me, Liam",
        created_at: new Date(),
    }
  ];
  

  Chat.insertMany(allchats);

//   Chat.deleteMany({from:"neha"}).then((res)=>{
//     console.log(res);
//   })

