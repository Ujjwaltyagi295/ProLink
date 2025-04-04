
import express, { json, urlencoded } from "express"

const port = process.env.PORT


const app=express()
app.use(urlencoded({extended:true}))
app.use(json())

app.listen(port,()=>console.log("Server started on port:",port))

