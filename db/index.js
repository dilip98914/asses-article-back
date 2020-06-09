const mysql=require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'assingment',
    multipleStatements: true
});

con.connect((err,a)=>{
    if(err) console.log(err);
});

let articleDb={};

articleDb.all=()=>{
    return new Promise((reslove,reject)=>{
        con.query("SELECT * FROM articles",(err,results)=>{
            if(err){
                return reject(err);
            }
            return reslove(results)
        })
    })
}

//takes an array
articleDb.create=(data)=>{
    return new Promise((reslove,reject)=>{
        con.query("INSERT INTO articles (detail,image) VALUES (?)", [data],(err,results)=>{
            if(err){
                return reject(err);
            }
            return reslove(results)
        })
    })
}

articleDb.getOne=(id)=>{
    return new Promise((reslove,reject)=>{
        con.query("SELECT * FROM articles WHERE id=?", id,(err,results)=>{
            if(err){
                return reject(err);
            }
            return reslove(results)
        })
    })
}

articleDb.updateDetail=(id,detail)=>{
    return new Promise((reslove,reject)=>{
        con.query(`UPDATE articles SET detail =? WHERE id = ?`,[detail,id],(err,results)=>{
            if(err){
                return reject(err);
            }
            return reslove(results)
        })
    })
}

articleDb.updateImage=(id,image)=>{
    return new Promise((reslove,reject)=>{
        con.query(`UPDATE articles SET image = ? WHERE id = ?`,[image,id],(err,results)=>{
            if(err){
                return reject(err);
            }
            return reslove(results)
        })
    })
}


module.exports=articleDb;