/**
 * Created by syn on 2015-12-2.
 */
$(document).ready(function ($) {
    $("#confirm").on('click', function () {
        var title = $("#title").val();
        var date = Date.parse(new Date()) /1000;
        console.log(date);
        var url = $("#url").val();
        if ($("#title").val() == "" || $("#url").val() == "") {
            $("#warn").text("请输入正确的书签名或书签地址");
        }
        else {
            $.post("./add", {title: title, created: date, url: url}, function (val) {
                if (val == 'true')
                    alert("添加成功，页面自动刷新！");
                else {
                    alert("添加失败，请重新操作！");
                }
                window.close();
            });
        }
    });
    $("#cancle").on('click', function () {
        window.close();
    });
    $("#title").on('blur', function () {
        if ($("#title").val() == "") {
            $("#warn").text("请输入正确的书签名");
        }
        else {
            $("#warn").text("");
        }
    });
    $("#url").on('blur', function () {
        if ($("#url").val() == "") {
            $("#warn").text("请输入正确的书签地址");
        }
        else {
            $("#warn").text("");
        }
    });

});