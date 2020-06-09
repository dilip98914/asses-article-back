const express=require('express');
const cors=require('cors');
const app=express();
const articles=require('./routes/articles');


app.use(express.json());
app.use(cors());
app.use('/articles/',articles);
app.use('/uploads',express.static(__dirname+'/uploads'));

app.get('/',(req,res)=>{
    res.json({mess:"welcome to api"});
})

// app.get('/one/:id',(req,res)=>{
//     const {id}=req.params;
//     db.one(id,(err,rows)=>{
//         if(err){
//             console.log(err);
//             res.send(err);
//         }
//         console.log(rows);
//         res.send(rows[0]);
//     })
// })

// app.post('/upload',upload.single('image'), function (req, res, next) {
//     console.log(req.file);
//     let path=req.file.path.toString();
//     console.log(path);
    
//     db.add(path, function (err, rows) {
//         if(err){
//             res.end(err)
//         } else {
//             res.json(rows)
//         }
//     })

// })

app.listen(process.env.PORT || 3000,()=>{
    console.log("server is listening on port",3000);
})
