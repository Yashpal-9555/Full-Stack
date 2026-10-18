import express from "express";

const app = express();

app.get('/', (req,res)=>{
    res.send('server is ready')
});

// get a list of 5 jokes



app.get('/api/jokes',(req,res)=>{
  const jokes = [
    {
        id: 1,
        title: "Dark Mode 😂",
        joke: "Why do programmers prefer dark mode? Because light attracts bugs!"
    },
    {
        id: 2,
        title: "Computer Virus 🤒",
        joke: "Why did the computer go to the doctor? Because it had a virus!"
    },
    {
        id: 3,
        title: "Java Developer 🤓",
        joke: "Why do Java developers wear glasses? Because they don't C#!"
    },
    {
        id: 4,
        title: "JavaScript Developer 😅",
        joke: "Why was the JavaScript developer sad? Because he didn't Node how to Express himself!"
    },
    {
        id: 5,
        title: "Breakup Story 💔",
        joke: "Why did the function break up with the variable? It needed some space!"
    }
];

res.send(jokes);
});


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`app running on ${port}`);
});