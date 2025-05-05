import {Client} from 'pg'

const con =new Client ({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"qwerty@123",
    database:"demopost"
})

con.connect().then(()=> console.log("Database Connected succesfully"))
            .catch(() => console.log("Database connection failed"))
