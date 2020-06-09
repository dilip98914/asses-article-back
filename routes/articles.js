const express=require('express');
const db=require('../db');
const multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString()+file.originalname)
    }
})
var upload = multer({ storage: storage });

const router=express.Router();

router.get('/all',(req,res)=>{
    console.log('erer');
    
    db.all().then(results=>{
        console.log(results);
        res.status(200).send(results);
    }).catch(err=>{
        console.log(err);
        res.status(500).send(err);
    })
});


router.post('/create',upload.single('image'), function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    console.log('sdndinsdosndobnol');
    
    let path;
    if(req.file){
        path=req.file.path.toString();
    }else{
        path=''
    }
    db.create([req.body.detail,path]).then(rows=>{
        console.log(rows);
        res.send(rows);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});

router.post('/update-detail/:id',upload.single('image'), function (req, res, next) {
    const {id}=req.params;
    const detail=req.body.detail.toString();
    console.log(detail);
    db.updateDetail(id,detail).then(rows=>{
        console.log(rows);
        res.send(rows);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});


router.post('/update-image/:id',upload.single('image'), function (req, res, next) {
    const {id}=req.params;
    let path=req.file.path.toString();
    db.updateImage(id,path).then(rows=>{
        console.log(rows);
        res.send(rows);
    }).catch(err=>{
        console.log(err);
        res.send(err);
    })
});


module.exports=router;