require('dotenv').config()
const db=require('./database/data');
// console.log(db);
const bookModel=require('./database/books');
const authorModel=require('./database/authors');
const publicationModel=require('./database/publications');
var mongoose=require('mongoose')
const express=require("express");
const app=express();
app.use(express.json());

var mongodb=process.env.mongodb;

mongoose.connect(mongodb,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>console.log("CONNECTION ESTABLISHED"));


//INDEX PAGE

app.get('/',(req,res)=>{
    return res.json({"Welcome":`THIS API IS WORKING`});
});

// GET ALL BOOKS

app.get('/books',(req,res)=>{
    const getAllBooks= bookModel.find();
    console.log(getAllBooks)
    return res.json();
});

// GETTING BOOKS WITH ISBN

    app.get('/books/:isbn',async(req,res)=>{
        // console.log(req.params);
        const {isbn}=req.params;
        const getSpecificBook= await bookModel.findOne({ISBN:isbn});
        console.log(getSpecificBook);
        if(getSpecificBook==null){
            return res.json({"ERROR":`No book found for ISBN ${isbn}`});
        }
        else{
            res.json(getSpecificBook);
        }
    });

// BOOKS CATEGORY

    app.get('/book-category/:category',async(req,res)=>{
    // console.log(req.params);
    const {category}=req.params;
    const getSpecificBook= await bookModel.find({category:category});
    // console.log(getSpecificBook);
    if(getSpecificBook.length===0){
        return res.json({"ERROR":`No book found for category ${category}`});
    }
    else{
        res.json(getSpecificBook);
    }
    });

//GET AUTHORS

    app.get('/authors',async (req,res)=>{
        const getAllAuthors=await authorModel.find();
        return res.json(getAllAuthors);
    });

// Authors BY ID

    app.get('/authors/:id',async(req,res)=>{
        // console.log(req.params);
        let {id}=req.params;
        id=Number(id);
        const getSpecificAuthor=await authorModel.findOne({id:id});
        // console.log(getSpecificBook);
        if(getSpecificAuthor.length===null){
            return res.json({"ERROR":`No book found for ISBN ${id}`});
        }
        else{
            res.json(getSpecificAuthor);
        }
    });

    //GET PUBLICATIONS

    app.get('/publications',async(req,res)=>{
        const getAllPblishers=await publicationModel.find();
        return res.json(getAllPblishers);
    });

    //PUBLICATIONS WITH ID  

    app.get('/publications/:id',async(req,res)=>{
        // console.log(req.params);
        let {id}=req.params;
        id=Number(id);
        const getSpecificPublisher=await publicationModel.findOne({id:id});
        // console.log(getSpecificBook);
        if(getSpecificPublisher===null){
            return res.json({"ERROR":`No book found for ISBN ${id}`});
        }
        else{
            res.json(getSpecificPublisher);
        }
    });

    // POST BOOKS

    app.post('/books',async (req,res)=>{
        // const {newBook}=req.body;
        // console.log(newBook);
        const addNewBooks= await bookModel.create(req.body);
        return res.json({
            book:addNewBooks,
            message: "DATA ADDED SUCCESSFULLY"
        })
    })

    //POST AUTHORS

    app.post('/authors',async(req,res)=>{
        // db.authors.push(req.body);
        const addAuthor=await authorModel.create(req.body);
        return res.json({
            AddedAuthor: addAuthor,
            message:'Author added successfully'
        });
    })

    // POST PUBLICATIONSs

    app.post('/publications',async (req,res)=>{
        // db.publications.push(req.body);
        const addPublication= await publicationModel.create(req.body);
        return res.json({
            publisher:addPublication,
            message:'New Publisher Added Successfully'
        });
    });
    
    //PUT(UPDATE) BOOKS DATA

    app.put('/book-update/:isbn', async (req,res)=>{
        console.log(req.body)
        const {isbn}=req.params;
        const updateBook= await bookModel.findOneAndUpdate(
            {
            ISBN:isbn
            },
            req.body,
            {
                new:true
            }
        );
        return res.json({
            bookUpdated: updateBook,
            message: 'Book Updated Successfully'
        });
    });

    // PUT(UPDATE) Author by ID
    app.put('/author-update/:id',(req,res)=>{
        // console.log(req.body);
        const {id}=req.params;
        db.authors.forEach((author)=>{
            if(author.id===id){
                console.log({...author,...req.body,})
                return {...author,...req.body,}
            }
            // else{
            //     console.log("DATA NOT FOUND");
            // }
            return author;
        })
        return res.json(db.authors);
    })

    app.put('/publisher-update/:id',(req,res)=>{
        console.log(req.body)
        const {id}=req.params;
        db.publications.forEach((publisher)=>{
            if(publisher.id===id){
                console.log({...publisher,...req.body})
                return{...publisher,...req.body};
            }
            return publisher;
        })
        return res.json(db.publications);
    });

    app.delete('/book-delete/:isbn', async(req,res)=>{
        const {isbn}=req.params;
        const delBook=await bookModel.findOneAndDelete({
            ISBN:isbn
        })
        console.log(delBook);
        return res.json(delBook);
    })

app.listen(process.env.PORT || 3000,()=>{
    console.log("MY EXPRESS APP IS RUNNING")
})