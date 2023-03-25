
const express = require("express");
const bodyParser = require("body-parser");

const app = express();


let items = ['Cricket', 'Football'];

let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    res.render("list", { listTitle: day, items: items });
});




app.post("/", function (req, res) {
    var item = req.body.newItem;
    //console.log(item);

    if (item === "") {
        if (req.body.list === "Work") {
            res.redirect("/work");
        }
        else {
            res.redirect("/");
        }
    }
    else {
        if (req.body.list === "Work") {
            workItems.push(item);
            res.redirect("/work");
        }
        else {
            items.push(item);
            res.redirect("/");
        }
    }

});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", items: workItems });
});


app.listen(3000, function () {
    console.log("Server is started on port 3000")
});