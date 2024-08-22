//该文件仅用于论坛页面（luntan.htm）

/******* 用户信息参数传输 *******/
var id;
var userResInfoArray = new Array();
function ready() {
    id = localStorage.getItem("userId");
    callUpInfo(id);
    document.getElementById("user_name").innerHTML = userResInfoArray[0].Name;
    //document.getElementById("detail_name").innerHTML = userResInfoArray[0].Name;
    document.getElementById("ftauthor").innerHTML = userResInfoArray[0].Name;
}

//查询用户信息
function callUpInfo(user_id) {
    var urlStr = encodeURI("Handler.ashx?method=userrep&ud=" + user_id + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showUpInfo
    });
}
function showUpInfo(data) {
    if (userResInfoArray != null) {
        userResInfoArray = new Array();
    }
    userResInfoArray = eval('(' + data + ')');
}

//初始化帖子展示类型
var help = "是", ask = "否", disc = "否", oth = "否";
function change() {
    if ($("#help").is(":checked")) {
        help = "是";
    }
    else {
        help = "否";
    }
    if ($("#ask").is(":checked")) {
        ask = "是";
    }
    else {
        ask = "否";
    }
    if ($("#disc").is(":checked")) {
        disc = "是";
    }
    else {
        disc = "否";
    }
    if ($("#other").is(":checked")) {
        oth = "是";
    }
    else {
        oth = "否";
    }
    listRefresh();
}

//点击发表
function changefb() {
    document.getElementById('fabiao').style.display = '';
    //$(".mt a").removeClass("current");
}

//返回
function fanhui() {
    document.getElementById('queren').style.display = '';
    document.getElementById('zhezhao').style.display = '';
}
//确认退出
function qrtc() {
    document.getElementById('fabiao').style.display = 'none';
    document.getElementById('queren').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
    //清空内容
    document.getElementById('ftauthor').value = "";
    document.getElementById('ftcontact').value = "";
    document.getElementById('fttheme').value = "";
    document.getElementById('ftcontentta').value = "";
    $('#qz').prop("checked", false);
    $('#wd').prop("checked", false);
    $('#tl').prop("checked", false);
    $('#qt').prop("checked", false);
}
//我再想想
function wzxx() {
    document.getElementById('queren').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}

//发表
function fabiao() {
    //先判断是否符合发表要求
    if (document.getElementById('ftcontentta').value == "") {
        //没有填写内容
        document.getElementById('uncontent').style.display = '';
        document.getElementById('zhezhao').style.display = '';
    }
    else {
        if (document.getElementById('qz').checked == false && document.getElementById('wd').checked == false && document.getElementById('tl').checked == false && document.getElementById('qt').checked == false) {
            //没有勾选类型
            document.getElementById('unstyle').style.display = '';
            document.getElementById('zhezhao').style.display = '';
        }
        else {
            if (document.getElementById('qz').checked == true && map_lon == 0) {
                //没有为求助帖选择求助位置
                document.getElementById('unaddress').style.display = '';
                document.getElementById('zhezhao').style.display = '';
            }
            else {
                fabiao_success();  //发表成功！
            }
        }
    }
}

function zdlhb1() {
    document.getElementById('uncontent').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}
function zdlhb2() {
    document.getElementById('unstyle').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}
function zdlhb3() {
    document.getElementById('unpriority').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}
function zdlhb4() {
    document.getElementById('unaddress').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}
//初始化求助地点经纬度
var map_lon = 0, map_lat = 0;

//发表成功！
function fabiao_success() {
//获得初始值
    var author = userResInfoArray[0].Name;
    var phone = userResInfoArray[0].PhoneNumber;
    var contact = document.getElementById('ftcontact').value;
    var theme = document.getElementById('fttheme').value;
    var content = document.getElementById('ftcontentta').value;
    var priority = document.getElementById('pri_select').value;
    var qz = "否", wd = "否", tl = "否", qt = "否";
    if ($("#qz").is(":checked")) {
        qz = "是";
    }
    if ($("#wd").is(":checked")) {
        wd = "是";
    }
    if ($("#tl").is(":checked")) {
        tl = "是";
    }
    if ($("#qt").is(":checked")) {
        qt = "是";
    }
    //连接数据库
    callLuntanInfo(theme, author, content, contact, qz, wd, tl, qt, map_lon, map_lat, priority, phone);
    alert("发表成功！");
    listRefresh();
    document.getElementById('fabiao').style.display = 'none';
    //清空内容
    //document.getElementById('ftauthor').value = "";
    contact = "";
    theme = "";
    content = "";
    priority = 1;
    $('#qz').prop("checked", false);
    $('#wd').prop("checked", false);
    $('#tl').prop("checked", false);
    $('#qt').prop("checked", false);
    map_lon = 0;
    map_lat = 0;
}
//将发表的帖子导入数据库
function callLuntanInfo(theme, author, content, contact, qz, wd, tl, qt, lon, lat, pri, ph) {
    var urlStr = encodeURI("Handler.ashx?method=addluntan&t=" + theme + "&a=" + author + "&ce=" + content + "&ca=" + contact + "&qz=" + qz + "&wd=" + wd + "&tl=" + tl + "&qt=" + qt + "&lon=" + lon + "&lat=" + lat + "&pri=" + pri + "&ph=" + ph + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
    });
}

/******* list区域 *******/
var luntanResInfoArray = new Array();
$(document).ready(function () {
    listRefresh();
});

//刷新帖子表
function listRefresh() {
    allLuntanArray(); //查询该类型所有帖子
    $("div").remove(".luntan_list"); //移除旧帖子
    //循环显示新帖子
    for (var i = luntanResInfoArray.length - 1; i >= 0; i--) {
        //帖子主题
        if (luntanResInfoArray[i].Theme == "") {
            luntanResInfoArray[i].Theme = "无";
        }
        /*if (luntanResInfoArray[i].Author == "") {
            luntanResInfoArray[i].Author = "佚名";
        }*/
        //联系方式
        if (luntanResInfoArray[i].Contact == "") {
            luntanResInfoArray[i].Contact = "无";
        }
        //帖子显示内容（预览状态）
        var text = '<div class="luntan_list"><p style="font-size:16px;"><b>' + luntanResInfoArray[i].Theme + '</b></p>'
            + '<p>作者：' + luntanResInfoArray[i].Author + '</p>'
            + '<p>联系方式：' + luntanResInfoArray[i].Contact + '</p>'
            + '<p style="font-size:10px;">' + luntanResInfoArray[i].Content + '</p>'
            + '<p>发表时间：' + luntanResInfoArray[i].Time + '</p><p>';
        if (luntanResInfoArray[i].Help == "是") {
            text = text + '<span class="luntan_label" style="background-color: #3CB371;">求助帖</span>';
        }
        if (luntanResInfoArray[i].Ask == "是") {
            text = text + '<span class="luntan_label" style="background-color: #FFD700;">问答帖</span>';
        }
        if (luntanResInfoArray[i].Discuss == "是") {
            text = text + '<span class="luntan_label" style="background-color: #F08080;">讨论帖</span>';
        }
        if (luntanResInfoArray[i].Other == "是") {
            text = text + '<span class="luntan_label" style="background-color: #87CEFA;">其他帖</span>';
        }
        text = text + '</p>'
            + '<div style="text-align:left;"><p style="color:black;display:inline;">' + luntanResInfoArray[i].Click_Number + '&nbsp查看&nbsp&nbsp</p>'
            + '<p style="color:black;display:inline;">' + luntanResInfoArray[i].Reply_Number + '&nbsp回复</p></div>'
            + '<div style="text-align:right;"><p style="color:blue;display:inline;" onclick="reply_detail1(' + i + ')">查看&nbsp&nbsp</p>'
            + '<p style="color:blue;display:inline;" onclick="reply_doing(' + i + ')">回复</p></div><hr/></div>';
        //帖子显示于其中一列
        if (i % 3 == 0) {
            $("#discuss-content1").append(text);
        }
        else if (i % 3 == 1) {
            $("#discuss-content2").append(text);
        }
        else {
            $("#discuss-content3").append(text);
        }
    }
}
//从数据库查询该类型所有帖子
function allLuntanArray() {
    var urlStr = encodeURI("Handler.ashx?method=luntan&oper=''&help=" + help + "&ask=" + ask + "&disc=" + disc + "&oth=" + oth + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showLuntanInfo
    });
}
function showLuntanInfo(data) {
    if (luntanResInfoArray != null) {
        luntanResInfoArray = new Array();
    }
    luntanResInfoArray = eval('(' + data + ')');
}

/******* 用户信息区域 *******/
//右上角滑动展开
function user_detail() {
    $("#user_detail").slideToggle("slow");
    if (userResInfoArray[0].Identity != "管理员") {
        document.getElementById("user_charge").style.display = "none";
    }
}
//个人主页页面跳转
function user_show() {
    //参数传输
    localStorage.setItem("username", userResInfoArray[0].Name);
    localStorage.setItem("usergender", userResInfoArray[0].Gender);
    localStorage.setItem("userphone", userResInfoArray[0].PhoneNumber);
    //页面跳转
    location.href = "user.htm";
}
//是否退出登录
function user_quit() {
    document.getElementById('quit').style.display = '';
    document.getElementById('zhezhao').style.display = '';
}
//退出，跳转登录界面
function quityes() {
    document.getElementById('quit').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
    location.href = "initial.htm";
}
//不退出
function quitno() {
    document.getElementById('quit').style.display = 'none';
    document.getElementById('zhezhao').style.display = 'none';
}
//管理员界面跳转（只有用户身份为管理员才显示这一按钮）
function user_charge() {
    location.href = "charge.htm";
}

/******* 回复区域 *******/
var luntan_array;
//回复界面关于用户相关信息
function reply_doing(i) {
    document.getElementById('reply').style.display = '';
    document.getElementById('re_user').innerHTML = userResInfoArray[0].Name + "：@" + luntanResInfoArray[i].Author;
    luntan_array = i;
}
//回复成功！
function reply_success() {
    var uptheme = luntanResInfoArray[luntan_array].Theme;
    var upauthor = luntanResInfoArray[luntan_array].Author;
    var uptime = luntanResInfoArray[luntan_array].Time;
    var upphone = luntanResInfoArray[luntan_array].Phone;
    var reauthor = userResInfoArray[0].Name;
    var recontent = document.getElementById('re_content').value;
    var rephone = userResInfoArray[0].PhoneNumber;
    if (recontent != "") {
        callReplyInfo(uptheme, upauthor, uptime, reauthor, recontent, upphone, rephone);
        updateLunTanreply(luntanResInfoArray[luntan_array].Reply_Number + 1, luntanResInfoArray[luntan_array].Theme, luntanResInfoArray[luntan_array].Author, luntanResInfoArray[luntan_array].Time);
        alert("发表成功！");
        listRefresh();
        document.getElementById('re_content').value = "";
        document.getElementById('reply').style.display = 'none';
    }
    else {
        document.getElementById('uncontent').style.display = '';
        document.getElementById('zhezhao').style.display = '';
    }
    
}
//回复失败
function reply_fail() {
    document.getElementById('re_content').value = "";
    document.getElementById('reply').style.display = 'none';
}
//回复成功时将回复内容存入数据库
function callReplyInfo(uptheme, upauthor, uptime, reauthor, recontent, upphone, rephone) {
    var urlStr = encodeURI("Handler.ashx?method=addreply&uth=" + uptheme + "&ua=" + upauthor + "&uti=" + uptime + "&ra=" + reauthor + "&rc=" + recontent + "&up=" + upphone + "&rp=" + rephone + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
    });
}
function updateLunTanreply(replynumber, theme, author, time) {
    var urlStr = encodeURI("Handler.ashx?method=updateluntanreply&rn=" + replynumber + "&rti=" + time + "&ra=" + author + "&rth=" + theme + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showReplyInfo
    });
}

var replyResInfoArray = new Array();
//帖子详细信息中的回复部分
function reply_detail1(i) {
    document.getElementById('detail').style.display = '';
    document.getElementById('de_title').innerHTML = "<b>" + luntanResInfoArray[i].Theme + "</b>";
    document.getElementById('de_author').innerHTML = luntanResInfoArray[i].Author;
    document.getElementById('de_contact').innerHTML = "联系方式：" + luntanResInfoArray[i].Contact;
    document.getElementById('de_time').innerHTML = "发表时间：" + luntanResInfoArray[i].Time;
    document.getElementById('de_content').innerHTML = luntanResInfoArray[i].Content;
    var uptheme = luntanResInfoArray[i].Theme;
    var upauthor = luntanResInfoArray[i].Author;
    var uptime = luntanResInfoArray[i].Time;
    replyResInfoArray = new Array();
    allReplyArray(uptheme, upauthor, uptime); //查询该帖子的所有回复
    document.getElementById('de_reply').innerHTML = "<b>回复：</b><br/><br/>";
    var text = "";
    for (var j = 0; j < replyResInfoArray.length; j++) {
        text = text + "<div><p style='display:inline;'>" + replyResInfoArray[j].ReAuthor + "：</p>"
            + "<p style='display:inline;float:right;line-height:0px;padding-right:15px;'>" + replyResInfoArray[j].ReTime + "</p>"
            + "<p style='padding-left:20px;'>" + replyResInfoArray[j].ReContent + "</p></div><div id='detail_reply_hr'><hr/></div>";
    }
    if (replyResInfoArray.length == 0) {
        text = text + "暂时没有人回复哦~";
    }
    $("#de_reply").append(text);
    updateLunTanclick(luntanResInfoArray[i].Click_Number + 1, luntanResInfoArray[i].Theme, luntanResInfoArray[i].Author, luntanResInfoArray[i].Time);
    listRefresh();
}
//关闭帖子详细信息
function detailclose() {
    document.getElementById('detail').style.display = 'none';
}
//从数据库中查询该帖子的所有回复
function allReplyArray(uptheme, upauthor, uptime) {
    var urlStr = encodeURI("Handler.ashx?method=reply&uth=" + uptheme + "&ua=" + upauthor + "&uti=" + uptime + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showReplyInfo
    });
}
//更新帖子点击次数
function updateLunTanclick(clicknumber, theme, author, time) {
    var urlStr = encodeURI("Handler.ashx?method=updateluntanclick&cn=" + clicknumber + "&cti=" + time + "&ca=" + author + "&cth=" + theme + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showReplyInfo
    });
}
function showReplyInfo(data) {
    if (replyResInfoArray != null) {
        replyResInfoArray = new Array();
    }
    replyResInfoArray = eval('(' + data + ')');
}

//发表时若勾选求助帖，则显示优先级设置与求助位置小地图
function pri_display() {
    if ($("#qz").is(":checked")) {
        document.getElementById('priority').style.display = '';
        document.getElementById('positionn').style.display = '';
        map_ready();
    }
    else {
        document.getElementById('priority').style.display = 'none';
        document.getElementById('positionn').style.display = 'none';
    }
}

var num_map = 0;
//准备小地图
function map_ready() {
    var pos_img = document.getElementById("pos_img");
    var pos_map = document.getElementById("pos_map");
    pos_map.onmouseover = pos_img.onmouseover = function () {
        pos_map.style.display = "";
        if (num_map == 0) {
            map_open();
        }
        num_map = num_map + 1;
    }
    pos_map.onmouseout = pos_img.onmouseout = function () {
        pos_map.style.display = "none";
    }
}

var map;
var vecLayer, vecZjLayer;
function map_open() {
    var center = [12308196.042592192, 4019935.2144997073];
    //获取图层（天地图）
    addBaseLayer();
    //创建地图对象
    map = new ol.Map({
        //添加图层
        layers: [vecLayer, vecZjLayer],
        //目标DIV
        target: 'pos_map',
        //loadTilesWhileAnimating: true,
        view: new ol.View({
            //投影坐标系
            projection: ol.proj.get('EPSG:3857'),
            center: center,
            maxZoom: 16,
            minZoom: 2,
            zoom: 6
        })
    });
    //单击即可设置求助位置并关闭小地图
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        var x = coordinate[0];
        var y = coordinate[1];
        var xy = new Array();
        xy = mercator2LonLat(x, y);
        map_lon = xy[0];
        map_lat = xy[1];
        alert("位置选择成功！");
        document.getElementById("pos_map").style.display = "none";
    });
}

function mercator2LonLat(mercatorX, mercatorY) {
    var lon = mercatorX * 180 / 20037508.34;
    var lat = 180 / Math.PI * (2 * Math.atan(Math.exp((mercatorY / 20037508.34) * Math.PI)) - Math.PI / 2);
    return [lon, lat];
}

function CreteTDTLayer(baseurl) {
    //初始化天地图矢量图层
    var layer = new ol.layer.Tile({
        //设置图层透明度
        opacity: 1,
        //数据源
        source: new ol.source.XYZ({
            url: baseurl
        })
    })
    //返回layer
    return layer;
}

function addBaseLayer() {
    //矢量图层
    vecLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //矢量注记图层
    vecZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
}