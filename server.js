let projectData = {};

const express = require('express');

const app = express();
const port = 8000;

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.use(express.static("website"));

const cors = require('cors');

app.use(cors());

app.post("/add", async function(req, res){
    const info = await req.body;
    projectData = info;
    res.send(projectData);
});

app.get("/all", async (req, res) => {
    if(projectData){
    res.send(projectData);
    }
});

app.listen(port, function(){console.log("listening on port " + port)});

                           