// importing all the required modules 
const express = require('express');
const sqlite3 = require('sqlite3');
const create = require('./createddb')

// start the app
const app = express();
// data will be  sent in the request body
app.use(express.json());

// for serving static files
// app.use(express.static('public'));


// get method for getting the whole data stored in courses or exercise
app.get('/allcourses',(req,res)=>{
   let db = new sqlite3.Database('saralDB',(err)=>{
       if(!err){
           db.all('select * from courses',(err,data)=>{
               console.log(data)
               if(err){
                    return res.send('sorry dude something went wrong in your database or data is not matched',err)
               }
               else{
                   return res.send(data);
               }
           })
       }
   })
});

app.get('/course/:id',(req,res)=>{
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            db.all('select * from courses where id = '+req.params.id,(err,data)=>{
                if(err){
                    return res.send('data is not matched')
                }
                else{
                    console.log(data);
                    return res.send(data);
                }
            })
        }
    })
});

app.post('/postcourse',(req,res)=>{
    let name = req.body.name
    let description = req.body.description
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(err){
            console.log('something went wrong ',err)
        }
        else{
            db.run('INSERT INTO courses (name, description) VALUES (" ' +name + ' " , " ' + description + ' ")');
            db.close();
            return res.send('you have inserted the data successfully')
        }
    })
});

app.put('/editcourse/:id',(req,res)=>{
    let name = req.body.name
    let description = req.body.description
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            db.run('update courses set name = "'+name+'",description = "'+description+'" where id ="'+req.params.id+'"');
            db.close();
            return res.send('you have updated the data successfully')
        }
    })
});

app.get('/allexercises',(req,res)=>{
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(err){
            console.log("you are getting error",err)
        }
        else{
            db.all('select * from exercises',(err,data)=>{
                if(err){
                    console.log("your have error",err)
                }
                else{
                    return res.send(data);
                }
            })
        }
    })
});

app.get('/course/:courseid/exercise/:id',(req,res)=>{
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(err){
            console.log('you have error in your code ',err)
        }
        else{
            db.all('select name,description from exercises where course_id ='+req.params.courseid,(err,data)=>{
                if(err){
                    console.log('You got the error',err)
                }
                else{
                    return res.send(data[req.params.id-1])
                }
            })
        }
    })
});

app.post('/postexercise',(req,res)=>{
    let name = req.body.name
    let description= req.body.description
    let course_id=req.body.course_id
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(err){
            console.log('something going wrong during posting exercise',err)
        }
        else{
            db.run('INSERT INTO exercises (name, description,course_id) VALUES(" ' +name + ' " , " ' + description + ' ","'+ course_id+' ")');
            db.close();   
            return res.send("inserted data successfully")
        }
    })
})

app.put('/course/:courseid/exercise/:id',(req,res)=>{
    let name = req.body.name
    let description = req.body.description
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            db.all('select * from exercises where course_id='+req.params.courseid,(err,data)=>{
                if(err){
                        console.log(err)
                }
                else{
                    let exerid = data[req.params.id-1]["id"]
                    db.run('update exercises set name = "'+name+'",description = "'+description+'" where id ="'+exerid+'"')
                    db.close();
                    return res.send('you have updated the exercise successfully');
                }
            });
        }
    })
})

app.get('/allsubmissions',(req,res)=>{
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            db.all('select * from submissions',(err,data)=>{
                if(err){
                    console.log('error ')
                }
                else{
                    console.log(data)
                    return res.send(data)
                }
            })
        }
    })
})

app.post('/course/:courseid/exercise/:exerciseid/postsubmission',(req,res)=>{
    let name = req.body.name
    let exercise = req.body.description
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            db.run('insert into submissions (name,exercise,exercise_id,course_id) values("'+name+'","'+exercise+'","'+req.params.exerciseid+'","'+req.params.courseid+'")');
            console.log('you have inserted the submission')
            return res.send('you have inserted the data successfully')
        }
        else{
            console.log('cool! you got the error',err)
        }
    })
})

app.delete('/course/:courid/exercise/:exer_id/submission/:submid',(req,res)=>{
    let db = new sqlite3.Database('saralDB',(err)=>{
        if(!err){
            console.log('select * from submissions where course_id="'+req.params.courid+'" and exercise_id="'+req.params.exer_id+'"')
            db.all('select * from submissions where course_id="'+req.params.courid+'" and exercise_id="'+req.params.exer_id+'"',(err,data)=>{
                if(!err){
                    console
                    let a = data[req.params.submid-1]["id"]
                    console.log(data)
                    db.run('delete from submissions where id='+a)
                    return res.send('hey you have deleted the data')
                }
                else{
                    return res.send('you are doing something wrong brother')
                }
            })
        }
    })
})


app.listen(2050,()=>{
    console.log('your app is listening')
})
