import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";


const app = express();
const port = process.env.PORT || 9000;


const pusher = new Pusher({
    appId: "1459962",
    key: "a1d4ddf8bf2c209f75e9",
    secret: "60f2f96d1fb95bb63ff5",
    cluster: "ap2",
    useTLS: true
});



app.use(express.json());
app.use(cors());
//const connection_url = "mongodb+srv://admin:compaq2059@cluster0.wvmkf.mongodb.net/whatsappdb?retryWrites=true&w=majority";
mongoose.connect("mongodb+srv://aromal2059:kAJyohQjxTPNLJK7@cluster0.snrgdyw.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const whatsappSchema = {
    message: String,
    name: String,
    timestamp: String,
    received: Boolean
};
const messagecontentdb = mongoose.model('messagecontent', whatsappSchema);

app.post("/messages/new",function(req,res){
    const dbMessages = req.body;
    messagecontentdb.create(dbMessages,(err,data)=>{
        if(err){
            res.status(500).send(err);

        }else{res.status(201).send(data)};
    });
});

 const db =mongoose.connection
 db.once('open',()=>{
     console.log("DB connected");
     const msgCollection = db.collection("messagecontents");
     const changeStream = msgCollection.watch();
     changeStream.on('change',(change)=>{
         console.log(change);
 
         if(change.operationType==='insert'){
             const messageDetails=change.fullDocument;
             pusher.trigger('messages','inserted',{
                 name:messageDetails.name,
                 message:messageDetails.message,
                 timestamp:messageDetails.timestamp,
                 received:messageDetails.received,

             });
 
         } else{console.log('error triggering pusher')}
     });
 });

// app.post("/messages/new", function (req, res) {
//     const newWhatsappm = new messagecontent({
//         message: req.body.message,
//         name: req.body.name,
//         timestamp: req.body.timestamp,
//         received: req.body.received
//     });
//     newWhatsappm.save(function (err) {
//         if (err) {
//             res.status(500).send(err);
// 
//         } else { res.status(201).send(data);//  }
//     });
// });
app.get("/messages/sync",  (req, res)=> {
    messagecontentdb.find( (err, data) =>{
        if (err) {
            res.status(500).send(err);

        } else { res.status(201).send(data) ;}
    });

});






app.get('/', (req, res) => res.status(200).send('hello world'));
app.listen(port, () => console.log(`Listening on localhost:${port}`));