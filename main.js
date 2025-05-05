import { Client } from 'pg'
import express from 'express'

const app = express()
app.use(express.json())

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "qwerty@123",
    database: "demopost"
})

con.connect().then(() => console.log("Database Connected succesfully"))
    .catch(() => console.log("Database connection failed"))


app.post('/postData', (req, res) => {
    const { name, id } = req.body

    const insert_query = 'INSERT INTO demotable(name,id) VALUES($1,$2)'

    con.query(insert_query, [name, id], (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(result)
            res.send('Posted Data')
        }
    })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);

})