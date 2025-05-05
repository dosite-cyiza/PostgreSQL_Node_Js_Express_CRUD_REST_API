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

    con.query(`INSERT INTO demotable(name,id) VALUES ('${name}',${id})`, (err, result) => {
        if (err) {
            res.send(err)
        }
        else {
            console.log(result)
            res.send('Posted Data')
        }
    })
})
app.get('/fetchData',(req,res)=>{
    con.query('SELECT * FROM demotable',(error,result) =>{
        if (error) {
            res.send("data failed to be fetched")
        }
        else{
            res.send(result.rows)
        }
    })
})

app.get('/fetchDataById/:id', async(req,res)=>{
    try {
      const id = req.params.id
      const result =  await con.query(`SELECT * FROM demotable WHERE id= ${id}`)
      return res.status(200).json(result.rows)
    
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})

app.put('/updateData/:id',async(req,res) =>{
    try {
        const id = req.params.id
        const name = req.body.name

         await con.query(`UPDATE demotable SET name ='${name}' WHERE id =${id}`)
        return res.status(200).json(
            {
                name,
                id
            }
        )
        
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }
})

app.delete('/deleteData/:id',async(req,res) =>{
    try{
    const id = req.params.id
   const result = await con.query(`DELETE FROM demotable WHERE id=${id}`)
    res.status(200).json(result)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }

})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);

})