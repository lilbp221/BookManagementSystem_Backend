const express=require('express');
const connectToDatabase = require('./database/dbindex');
const Book = require('./model/bookModel');
const app=express()
connectToDatabase();

app.use(express.json())

app.listen(3300,function(req,res){
      console.log("http://localhost:3300 running on port 3300")
})

//retrieve API for Home page
app.get('/', function(req,res){
      res.send("You are on the home page from backend")
})

//create API for BOOK
app.post('/book', async function(req,res){

     const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body //taking data from frontend
                                                                                       //adding the data in book table
 await  Book.create({
      // bookName: bookName,
      // publishedAt: publishedAt, 
      // OR SIMPLY FollOWING IS THE FEATURE OF JS THAT IF KEY:VALUE IS SAME, WRITE ONLY KEY
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publishedAt,
      publication,
     })

     res.status(201).json({
      message:"Book created Successfully!"
     })
})

//retrieve API for BOOK ALL READ

app.get('/book',async function(req, res){
    const books= await Book.find() //books returned in array type
      res.status(200).json({
            message:"Book Fetched Successfully!",
            data:books
      })
})

//API for single book retrieve

app.get('/book/:id',async function(req,res){
try {
      const{id}=req.params
      const book= await Book.findById(id)
            res.status(200).json({
                  message:"Single Book fetched Successfully",
                  data:book
            })  
} catch (error) {
      res.status(404).json({
            message:"Somwthing Went Wrong!!",
            // data:book
      })
}
      
      
      
           
      

     

})