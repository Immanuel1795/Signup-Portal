
const express = require ("express");
const app = express();

const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

const request = require("request");

const https = require('https');


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    
    //the data to be sent in JSON format
    const data = {
        members: [
            {
            email_address : email,
            status : "subscribed",
            merge_fields: {
                FNAME : firstName,
                LNAME : lastName
                }
            }
        ]
    };
    
    const jsonData = JSON.stringify(data);
    
    const url = "https://usX.api.mailchimp.com/3.0/lists/List_ID";
    const option = {
        method: "POST",
        auth: "key:API_KEY"
    }
    
    const request = https.request(url, option, function(response){
        
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
    
        })
    })
    
    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req, res){
   res.redirect("/"); 
});

app.listen(process.env.PORT || 3000, function(){
   console.log("Server is successfully running on port 3000"); 
});
