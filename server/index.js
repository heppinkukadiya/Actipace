const path = require("path")
const express = require("express")
const app = express();
const coockiePaser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config();


const PORT = process.env.PORT || 4000



app.use(express.json());
app.use(coockiePaser());
app.use(
    cors({
        origin:"https://www.actipace.com",
        credentials:true,
    })
)

const signup = require("./routes/Routes");

app.use("/api/v1",signup);

//Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..",'build')));

// Catch-all route to serve the React app for any unknown routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..",'build', 'index.html'));
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});


