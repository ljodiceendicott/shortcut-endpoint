const express = require("express");
const app = express();

const letters = require("./arttext.json");

// Define the port your app will listen on
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("WHAT ARE YO DOING HERE");
});

app.get("/mock/:Text", (req, res) => {
  const param = req.params.Text;
  let result = "";
  let capitalize = true; // Start with capitalizing the first letter

  for (let char of param) {
    // Check if the character is a letter
    if (char.match(/[a-zA-Z]/)) {
      result += capitalize ? char.toUpperCase() : char.toLowerCase();
      capitalize = !capitalize; // Toggle capitalization
    } else {
      result += char; // Keep non-letters unchanged
    }
  }

  res.send(result);
});

app.get("/caps/:Text", (req, res) => {
  const param = req.params.Text;
  let result = param.toUpperCase();

  res.send(result);
});

app.get("/rev/:Text", (req, res) => {
  const param = req.params.Text;
  let result = "";

  for(var i = param.length-1; i>=0; i--){
    result += param[i];
  }
  res.send(result);
});

app.get("/spaces/:Text", (req, res) => {
  const param = req.params.Text;
  
 let text = param.replace(/\s+/g, ' ').trim();
 
console.log(text);  
  res.send(text);
});

//Art Text transforms text into large text using "#" 
//Could be usefule for CLI tools or marking a document
// Art Text Example:
//  #####    #####     ####    #####    #####    #   #     ####   
//    #      #        #          #        #      ##  #    #
//    #      ####      ###       #        #      # # #    #  ##
//    #      #            #      #        #      #  ##    #   #
//    #      #####    ####       #      #####    #   #     ####
app.get("/art/:text", (req, res) => {
  let phrase = req.params.text;
  phrase = phrase.toUpperCase();
  let rows = ["", "", "", "", ""];
  for (let char of phrase) {
    const art = letters[char] || ["?????", "?????", "?????", "?????", "?????"]; // Handle unknown chars
    for (let i = 0; i < art.length; i++) {
      rows[i] += art[i] + "  "; // Add space between letters
    }
  }
  var response = "";
  for (var i = 0; i < rows.length; i++) {
    response += rows[i] + "\n";
    // console.log(rows[i]);
  }
  console.log(response);
  res.send(rows);
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
