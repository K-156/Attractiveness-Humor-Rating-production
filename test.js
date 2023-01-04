import fs from "fs";
import https from "https";
import readline from "readline";

const data = fs.createWriteStream("data.txt");
let participants = [];
https.get(
  "https://res.cloudinary.com/dqbrhsxcs/raw/upload/v1672798198/ClMtzPpQON/ClMtzPpQON_projDetails_email_0.csv",
  (response) => {
    var stream = response.pipe(data);
    const file = readline.createInterface({
      input: fs.createReadStream("data.txt"),
      output: process.stdout,
      terminal: false,
    });

    file.on("line", (line) => {
      if (line !== "Name,Email") {
        participants.push(line.split(","));
      }
      console.log(participants);
    });
  }
);
