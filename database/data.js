let books=[
    {
        ISBN:"12345ONE",
        title:"Getting started with MERN",
        authors:[1,2],
        language:"en",
        pubDate:"2021-07-07",
        numOfPage:225,
        category:["fiction","programming","tech","web dev"],
        publication:1
    },
    {
        ISBN:"12345TWO",
        title:"Getting started with Python",
        authors:[1,2],
        language:"en",
        pubDate:"2021-08-07",
        numOfPage:550,
        category:["fiction","tech","web"],
        publication:1
    }
];
let authors=[
    {
        id:1,
        name:"Ashish",
        books:["12345ONE","12345TWO"],
    },
    {
        id:2,
        name:"Vidushi",
        books:["12345ONE","12345TWO"],
    },
];
let publications=[
    {
        id:1,
        name:"ShapeAI Publications",
        books:["12345ONE","12345TWO"]
    },
    {
        id:2,
        name:"Aggarwal Publications",
        books:[]
    }
];
module.exports={books,authors,publications};
