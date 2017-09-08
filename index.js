var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var listUser = ['phuocdungit'];

io.on("connection", function (socket) {
    console.log("co ai do dang ket noi" + socket.id);

    socket.on("disconnect", function () {
        console.log(socket.id + " : ngat ke noi");
    });

    socket.on("Client-send-username", function (data) {
        // tra ve all
        // console.log(data);
        // return false;
        // io.sockets.emit("Server-send-data", data);
        if (listUser.indexOf(data) >= 0) {
            socket.emit("Server-send-dk-thatbai");
        } else {
            listUser.push(data);
            socket.username = data;
            socket.emit("Server-send-dk-thanhcong",data);
            socket.broadcast.emit("Server-send-dk-thanhcong", socket.id + ' : ' + data);
            io.sockets.emit("Server-send-listUser", listUser);

        }

        // tra ve cho ng goi
        // socket.emit("Server-send-data", socket.id + ' : ' + data);

        // goi cho moi ng tru ng goi
        // socket.broadcast.emit("Server-send-data", socket.id + ' : ' + data);
    })
});


app.get("/", function (req, res) {
    res.render("trangchu");
});