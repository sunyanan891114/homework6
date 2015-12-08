var CONTENT;
var CURRENT_PAGE = 0;

$(document).ready(function ($) {
    loadData(CURRENT_PAGE);
    // 为输入框绑定动作
    $(".search")
    // 恢复初始值
        .on('focus', function (event) {
            if (this.value == 'Key Words')
                $(this).val("");
        })
        .on('blur', function (event) {
            if (this.value == '') {
                $(this).val("Key Words");
                $(this).css({
                    color: '#8EC2F5'
                });
            }
        })
        .on('keyup', function (event) {
            $(this).css({
                color: '#4499ee'
            });
            var keywords = this.value;
            CURRENT_PAGE = 0;
            search(keywords);
        })
        .on('paste', function (e) {
            $(this).css({
                color: '#4499ee'
            });
            var keywords = undefined;
            if (window.clipboardData && window.clipboardData.getData) { // IE
                keywords = window.clipboardData.getData('Text');
            } else {
                keywords = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
            }
            CURRENT_PAGE = 0;
            search(keywords);
            highlight(keywords, CURRENT_PAGE);
        });
    $("#add_confirm").on('click', function () {
        var title = $("#add_title").val();
        var date = Date.parse(new Date()) / 1000;
        console.log(date);
        var url = $("#add_url").val();
        if ($("#add_title").val() == "" || $("#add_url").val() == "") {
            $("#add_warn").text("请输入正确的书签名或书签地址");
        }
        else {
            $.post("./add", {title: title, created: date, url: url}, function (val) {
                //if (val == 'true')
                //    alert("添加成功，页面自动刷新！");
                //else {
                //    alert("添加失败，请重新操作！");
                //}
                loadData(CURRENT_PAGE);
            });
            $("#add_title").val("");
            $("#add_url").val("");
            $("#add_warn").val("");
        }
    });
    $("#add_cancle").on('click',function(){
        $("#add_title").val("")  ;
        $("#add_url").val("");
        $("#add_warn").val("");
    })
    $("#add_title").on('blur', function () {
        if ($("#add_title").val() == "") {
            $("#add_warn").text("请输入正确的书签名");
            $('#add_confirm').attr('disabled',true);
        }
        else {
            $("#add_warn").text("");
            $('#add_confirm').attr('disabled',false);
        }
    });
    $("#add_url").on('blur', function () {
        var title = $("#add_url").val();
        if ( title== "" || title.indexOf("http") < 0) {
            $("#add_warn").text("请输入正确的书签地址");
            $('#add_confirm').attr('disabled',true);
        }
        else {
            $("#add_warn").text("");
            $('#add_confirm').attr('disabled',false)
        }
    });
});
function loadData(currentPage) {
    $.getJSON("./show", function (content) {
        CONTENT = content;
        if(currentPage == content.length / 10){
            currentPage--;
            CURRENT_PAGE = currentPage;
        }
        addList(content, currentPage);
        seperatePage(content);
    });
}
//分页
function seperatePage(content) {
    $(".page").empty();
    var page = Math.ceil(content.length / 10);
    for (var i = page; i > 0; i--) {
        $(".page").append("<button class='page_num'>" + i + "</button>");
    }

    $(".page_num").on('click', function () {
        CURRENT_PAGE = $(this).text() - 1;
        addList(CONTENT, CURRENT_PAGE);
        $(".page_num").css({
            color: '#000',
        });
        $(this).css({
            color: '#4499ee',
        });
        var keywords = $(".search").val();
        highlight(keywords);
    });
}
//显示列表
function addList(content, currentPage) {
    $(".list").empty();
    var i = currentPage * 10;
    for (; i < currentPage * 10 + 10 && i < content.length; i++) {
        $(".list").append("<li><div class='list_content'><a href='"+content[i]["url"]+"'>"
            + content[i]["title"]
            + "</a></div>" + "<button class='delete_button btn btn-default'type='button'"
            + "data-toggle='modal' data-target='#delete_Modal'>删除</button>"
            + "<div class='list_time'>@created &nbsp"
            + formatDate(content[i]["created"]) + "</div></li>");
    }
    $("#list_number").text("搜索到" + content.length + "条数据");
    bind_delete();
}
//绑定删除按钮
function bind_delete() {
    $(".delete_button").on('click', function () {
        var title = $(this).parent("li").children(".list_content").text();
        $("#delete_confirm").on('click', function () {
            $.post("./delete", {title: title}, function (val) {
                //if (val == 'true')
                //    alert("删除成功，页面自动刷新！");
                //else {
                //    alert("删除失败，请重新操作！");
                //}
                loadData(CURRENT_PAGE);
            });
        });
    });
}
function search(keywords) {
    $.getJSON("./search", {keywords: keywords}, function (content, status) {
        CONTENT = content;
        console.log(CONTENT.length);
        console.log(content.length);
        addList(content, CURRENT_PAGE);
        highlight(keywords, CURRENT_PAGE);
        seperatePage(content);
    });
}
function highlight(keywords) {
    if (keywords != "") {
        var keywordRE = new RegExp("(" + keywords + ")", "ig");
        $(".list_content").each(function () {
            var text = this.innerHTML.toLocaleString();
            if (text.match(keywordRE)) {
                var highlightedText = text.replace(keywordRE, "<span class='highlight'>$1</span>");
                this.innerHTML = highlightedText;
            }
        });
    }
}
function formatDate(d) {
    var regS = new RegExp("\\/", "g");
    var regD = new RegExp("[0-9]+-[0-9]+-[0-9]+", "g");
    return new Date(parseInt(d) * 1000).toLocaleString()
        .replace(regS, "-")
        .match(regD);
}





