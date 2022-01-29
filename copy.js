const db=require('./database/data');
// console.log(db);

const express=require("express");
const app=express();
app.use(express.json());

//INDEX PAGE

app.get('/',(req,res)=>{
    return res.json({"Welcome":`THIS API IS WORKING`});
});

// GET ALL BOOKS

app.get('/books',(req,res)=>{
    const getAllBooks=db.books;
    return res.json(getAllBooks);
});

// GETTING BOOKS WITH ISBN

    app.get('/book/:isbn',(req,res)=>{
        // console.log(req.params);
        const {isbn}=req.params;
        const getSpecificBook=db.books.filter((book)=>book.ISBN===isbn);
        console.log(getSpecificBook);
        if(getSpecificBook.length===0){
            return res.json({"ERROR":`No book found for ISBN ${isbn}`});
        }
        else{
            res.json(getSpecificBook[0]);
        }
    });

// BOOKS CATEGORY

    app.get('/book-category/:category',(req,res)=>{
    // console.log(req.params);
    const {category}=req.params;
    const getSpecificBook=db.books.filter((book)=>book.category.includes(category));
    // console.log(getSpecificBook);
    if(getSpecificBook.length===0){
        return res.json({"ERROR":`No book found for category ${category}`});
    }
    else{
        res.json(getSpecificBook);
    }
    });

//GET AUTHORS

    app.get('/authors',(req,res)=>{
        const getAllAuthors=db.authors;
        return res.json(getAllAuthors);
    });

// Authors BY ID

    app.get('/authors/:id',(req,res)=>{
        // console.log(req.params);
        let {id}=req.params;
        id=Number(id);
        const getSpecificAuthor=db.authors.filter((author)=>author.id===id);
        // console.log(getSpecificBook);
        if(getSpecificAuthor.length===0){
            return res.json({"ERROR":`No book found for ISBN ${id}`});
        }
        else{
            res.json(getSpecificAuthor[0]);
        }
    });

    //GET PUBLICATIONS

    app.get('/publications',(req,res)=>{
        const getAllPblishers=db.publications;
        return res.json(getAllPblishers);
    });

    //PUBLICATIONS WITH ID  

    app.get('/publications/:id',(req,res)=>{
        // console.log(req.params);
        let {id}=req.params;
        id=Number(id);
        const getSpecificPublisher=db.authors.filter((publisher)=>publisher.id===id);
        // console.log(getSpecificBook);
        if(getSpecificPublisher.length===0){
            return res.json({"ERROR":`No book found for ISBN ${id}`});
        }
        else{
            res.json(getSpecificPublisher[0]);
        }
    });

    // POST BOOKS

    app.post('/books',(req,res)=>{
        const {newBook}=req.body;
        console.log(newBook);
        db.books.push(newBook);
        return res.json(db.books);
    })

    //POST AUTHORS

    app.post('/authors',(req,res)=>{
        db.authors.push(req.body);
        return res.json(db.authors);
    })

    // POST PUBLICATIONSs

    app.post('/publications',(req,res)=>{
        db.publications.push(req.body);
        return res.json(db.publications);
    });
    
    //PUT(UPDATE) BOOKS DATA

    app.put('/book-update/:isbn',(req,res)=>{
        console.log(req.body)
        const {isbn}=req.params;
        db.books.forEach((book)=>{
            if(book.ISBN===isbn){
                console.log({...book,...req.body})
                return{...book,...req.body};
            }
            return book;
        })
        return res.json(db.books);
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

    app.delete('/book-delete/:isbn',(req,res)=>{
        const {isbn}=req.params;
        console.log(req.params);
        const filteredBooks=db.books.filter((book)=>book.ISBN!==isbn);
        console.log(filteredBooks);
        db.books=filteredBooks;
        return res.json(db.books);
    })

app.listen(3000,()=>{
    console.log("MY EXPRESS APP IS RUNNING")
})