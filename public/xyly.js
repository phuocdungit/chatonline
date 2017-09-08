$(document).ready(function () {
    $('#loginForm').show();
    $('#chatForm').hide();
    var socket = io("http://localhost:3000");

    socket.on("Server-send-dk-thatbai", function () {
        alert('Tài khoản đã được đăng ký vui lòng chọn tên khác!')
    });

    socket.on("Server-send-dk-thanhcong", function (data) {
        $('#well').html(data);
        $('#loginForm').hide(2000);
        $('#chatForm').show(1000);
    });

    socket.on("Server-send-listUser", function (data) {
        $("#listUser").html("");
        data.forEach(function (i) {
            $("#listUser").append("<div class='useronl'>" + i + "</div>");
        })
    });

    $(".dangky").click(function () {
        socket.emit("Client-send-username", $("#username").val());
    });

    $("#logout").click(function () {
        socket.emit("Client-send-logout");
        $('#loginForm').show(2000);
        $('#chatForm').hide(1000);
    });
});