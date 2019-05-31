const sqlite3 = require('sqlite3')
let db = new sqlite3.Database("saralDB", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
        console.log('Database created!') 
        createTableCourses()
    }
})
const createTableCourses = () => {
    db.run('CREATE TABLE courses (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), description TEXT)', createTableExercise);
    
}
const createTableExercise = () => {
    db.run("CREATE TABLE IF NOT EXISTS exercises(id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255),description varchar(255),course_id INTEGER FOREIGNKEY REFERENCES courses(id))");
    db.run("CREATE TABLE IF NOT EXISTS submissions (id integer primary key autoincrement, name text, exercise text, exercise_id integer,course_id integer)")
}
db.close();

