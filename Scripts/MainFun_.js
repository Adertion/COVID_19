var info = new Array();  //有用
var ssyq_info = new Array();
var popupCxt;
var container;           //有用
var Ylxx_data = new Array();
/***********************************实时水情start*******************************/
/*
var sssqMarkerLayer = null;         //实时水情标注图层
var sssqRiverMarkerArray = null;    //实时水情河流标注数组，用来联系地图上添加的标注与实时水情表格数据
var sssqRverMarkerArray = null;     //实时水情水库标注数组，用来联系地图上添加的标注与实时水情表格数据
var IsRiver = true;                 //是否查询实时水情--河流
var IsRver = false;                 //是否查询实时水情--水库
var sssqMarkerDetailData = null;    //记录每个标注的详细信息
*/
/***********************************实时雨情start*******************************/
/*
var ssyqResInfoArray = new Array();     //记录实时雨情数组
var ssyqMarkerLayer = null;             //实时雨情标注图层
var ssyqMarkerArray = null;             //实时雨情标注数组
var ssyqPopup = null;                   //实时雨情标注详细框
var ssyqMarkerDetailData = null;        //实时雨情详细信息
*/
/***********************************台风路径start*******************************/
/*
var tfljDrawLayer = null;                   //显示台风预警线图层
var tfljPathInfoLayer = null;               //显示台风路径绘制图层
var tfljPntInfoLayer = null;                //显示台风路径点信息图层，即添加标注的图层
var tfMarkerArray = new Array();            //台风标注数组
var tfPathInfoArray = new Array();          //台风路径信息数组
var tfljPopup = null;                       //台风路径标注详细信息弹出框
var tfID = null;                            //台风ID
var tfInfoTimer = null;                     //台风路径信息绘制时间控制器
var tfDetailInfoArray = new Array();        //台风详细信息数组
var tfForcastInfoArray = new Array();       //台风预测信息数组
var tfCurrentMarker = null;                 //显示当前台风位置
var tfCurrentCircle1 = null;                //显示当前台风位置的圆圈1
var tfCurrentCircle2 = null;                //显示当前台风位置的圆圈2
var tfVectorLayer = null;                   //绘制台风的矢量图层
*/
/********************************阳性轨迹**********************************/
var yxgjMarkerArray = null;
var yxgjGJMarkerArray = null;
var yxgjResInfoArray = new Array();
/********************************中高饼图**********************************/
var arname1 = new Array(); 
var arvalue1 = new Array(); 
var arname2 = new Array(); 
var arvalue2 = new Array();
var level;


/*
*	根据后台返回的实时水情数据添加标注
*/
/*
function addWaterMarker(resInfoArray, type) {
    if (sssqMarkerLayer == null) {
        //实时水情标注的矢量图层
        sssqMarkerLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(sssqMarkerLayer);
    }

    var markerFeature; //标注（矢量要素）

    if (type == "marker_sk") {
        for (var i = 0; i < resInfoArray.length; i++) {
            var lon = resInfoArray[i].SitePntX;
            var lat = resInfoArray[i].SitePntY;
            var coordinate = [parseFloat(lon), parseFloat(lat)]; //坐标点（ol.coordinate）
            var imgURL = "Libs/images/sssq-green.png";
            var _WaterPos = parseFloat(resInfoArray[i].WaterPos);
            var _WarnNum = parseFloat(resInfoArray[i].WarnNum);
            if (_WaterPos > _WarnNum) {
                imgURL = "Libs/images/sssq-red.png";
            }
            //新建标注（Vector要素），通过矢量图层添加到地图容器中
            markerFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinate), //几何信息（坐标点）
                name: resInfoArray[i].SiteName,  //名称属性
                type: "Rver",  //类型（河流）
                info: resInfoArray[i],  //标注的详细信息
                imgURL: imgURL,  //标注图标的URL地址
                fid: "Rver" + i.toString()
            });
            markerFeature.setStyle(createLabelStyle(markerFeature, imgURL, 0.8));
            sssqMarkerLayer.getSource().addFeature(markerFeature);

            if (sssqRverMarkerArray == null) {
                sssqRverMarkerArray = new Array();
            }
            sssqRverMarkerArray.push(markerFeature);
        }
    }

    //实时水情--河流信息可显示
    if (type == "marker_hl") {
        for (var i = 0; i < resInfoArray.length; i++) {
            var lon = resInfoArray[i].SitePntX; //X值
            var lat = resInfoArray[i].SitePntY; //Y值
            var coordinate = [parseFloat(lon), parseFloat(lat)]; //坐标点（ol.coordinate）
            var imgURL = "Libs/images/sssq-green.png"; //正常类型标注图标
            if (resInfoArray[i].WaterPos < resInfoArray[i].WarnNum) {
                imgURL = "Libs/images/sssq-red.png"; //超标类型标注图标
            }
            //新建标注（Vector要素），通过矢量图层添加到地图容器中
            markerFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinate), //几何信息（坐标点）
                name: resInfoArray[i].SiteName,  //名称属性
                type: "river",  //类型（河流）
                info: resInfoArray[i],  //标注的详细信息
                imgURL: imgURL,  //标注图标的URL地址
                fid: "river" + i.toString()
            });
            markerFeature.setStyle(createLabelStyle(markerFeature, imgURL, 0.8));
            sssqMarkerLayer.getSource().addFeature(markerFeature);

            if (sssqRiverMarkerArray == null) {
                sssqRiverMarkerArray = new Array();
            }
            sssqRiverMarkerArray.push(markerFeature);
        }
    }

    
}
*/

/*
*	添加实时雨情标注，每一个雨量值对应不同的标注，并且在勾选的时候将所有的标注清空重新进行添加
*/
/*
function addRainMarker() {
    if (ssyqMarkerLayer == null) {
        //实时雨情标注的矢量图层
        ssyqMarkerLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(ssyqMarkerLayer);
    }

    var ssyqMarkerFeature;
    for (var i = 0; i < Ylxx_data.length; i++) {
        var ssyqResInfo = Ylxx_data[i];
        var lon = ssyqResInfo.SitePntX;
        var lat = ssyqResInfo.SitePntY;
        var coordinate = [parseFloat(lon), parseFloat(lat)]; //坐标点（ol.coordinate）
        var imgURL = "Libs/images/shishiyuqing/yq00.png";
        if (ssyqResInfo.RainNum > 0 && ssyqResInfo.RainNum < 10) {
            imgURL = "Libs/images/shishiyuqing/yq01.png";
        } if (ssyqResInfo.RainNum >= 10 && ssyqResInfo.RainNum < 25) {
            imgURL = "Libs/images/shishiyuqing/yq02.png";
        } else if (ssyqResInfo.RainNum >= 25 && ssyqResInfo.RainNum < 50) {
            imgURL = "Libs/images/shishiyuqing/yq03.png";
        } else if (ssyqResInfo.RainNum >= 50 && ssyqResInfo.RainNum < 100) {
            imgURL = "Libs/images/shishiyuqing/yq04.png";
        } else if (ssyqResInfo.RainNum >= 100 && ssyqResInfo.RainNum < 250) {
            imgURL = "Libs/images/shishiyuqing/yq05.png";
        } else if (ssyqResInfo.RainNum >= 250) {
            imgURL = "Libs/images/shishiyuqing/yq06.png";
        }

        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        ssyqMarkerFeature = new ol.Feature({
            geometry: new ol.geom.Point(coordinate), //几何信息（坐标点）
            name: Ylxx_data[i].SiteName,  //名称属性
            type: "sq",  //类型（河流）
            info: ssyqResInfo,  //标注的详细信息
            imgURL: imgURL,  //标注图标的URL地址
            fid: "sq" + i.toString()
        });
        ssyqMarkerFeature.setStyle(createLabelStyle(ssyqMarkerFeature, imgURL, 0.8));
        ssyqMarkerLayer.getSource().addFeature(ssyqMarkerFeature);

        if (ssyqMarkerArray == null) {
            ssyqMarkerArray = new Array();
        }
        ssyqMarkerArray.push(ssyqMarkerFeature);
    }
}
*/

//左下角图例面板
/********************* 医院注记 start ********************/
var YY_data = new Array();
var hosResInfoArray = new Array();
var hosMarkerLayer = null;
var hosMarkerArray = null;
//在地图中添加医院注记
function addHosMarker() {
    callHosInfo(); //查询所有医院
    
    //添加医院注记图层
    hosMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    map.addLayer(hosMarkerLayer);
    
    //使用循环显示每一个医院注记，悬停还可显示详细信息
    var hosMarkerFeature;
    for (var i = 0; i < hosResInfoArray.length; i++) {
        var hosResInfo = hosResInfoArray[i];
        var location = (hosResInfo.Zuobiao).split(",");
        var lon = location[0];
        var lat = location[1];
        var coordinate = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]); //坐标点（ol.coordinate）
        coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        var imgURL = "Libs/images/shishiyuqing/yq00.png";
        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        hosMarkerFeature = new ol.Feature({
            geometry: coordinate, //几何信息（坐标点）
            name: hosResInfoArray[i].HospitalName,  //名称属性
            type: "hos",  //类型（河流）
            info: hosResInfo,  //标注的详细信息
            imgURL: imgURL  //标注图标的URL地址
            //fid: "sq" + i.toString()
        });
        hosMarkerFeature.setStyle(createLabelStyle(hosMarkerFeature, imgURL, 0.8));
        hosMarkerLayer.getSource().addFeature(hosMarkerFeature);

        if (hosMarkerArray == null) {
            hosMarkerArray = new Array();
        }
        hosMarkerArray.push(hosMarkerFeature);
    }
}
//查询数据库中所有医院
function callHosInfo() {
    var urlStr = encodeURI("Handler.ashx?method=yiyuan&oper=''&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showHosInfo
    });
}
function showHosInfo(data) {
    if (hosResInfoArray != null) {
        hosResInfoArray = new Array();
    }
    hosResInfoArray = eval('(' + data + ')');
}
//医院弹窗
function showHosPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:200px;font-size:16px;color:#87CEFA;margin-bottom:-5px"><p>' + fInfo.HospitalName + '</p></div><hr/>'
        + '<div style="width:200px;font-size:13px;margin-top:-5px"><p><b>隶属省市：</b>山东省威海市' + fInfo.Shi + '</p>'
        + '<p><b>详细地址：</b>' + fInfo.Address + '</p>'
        + '<p><b>经济类型代码：</b>' + fInfo.Daima + '</p>'
        + '<p><b>电话号码（总机）：</b>' + fInfo.Call + '</p></div> ';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/********************* 医院注记 end ********************/

/********************* 核酸注记 start ********************/
var hesResInfoArray = new Array();
var hesMarkerLayer = null;
var hesMarkerArray = null;
//在地图中添加核酸注记
function addHesMarker() {
    callHesInfo(); //查询所有核酸采样机构
    
    //添加核酸采样机构注记图层
    hesMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    map.addLayer(hesMarkerLayer);
    
    //使用循环显示每一个核酸注记，悬停还可显示详细信息
    var hesMarkerFeature;
    for (var i = 0; i < hesResInfoArray.length; i++) {
        var hesResInfo = hesResInfoArray[i];
        var coordinate = new ol.geom.Point([hesResInfo.Lon, hesResInfo.Lat]); //坐标点（ol.coordinate）
        coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        var imgURL = "Libs/images/shishiyuqing/yq05.png";
        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        hesMarkerFeature = new ol.Feature({
            geometry: coordinate, //几何信息（坐标点）
            name: hesResInfoArray[i].Name,  //名称属性
            type: "hes",  //类型（河流）
            info: hesResInfo,  //标注的详细信息
            imgURL: imgURL  //标注图标的URL地址
            //fid: "sq" + i.toString()
        });
        hesMarkerFeature.setStyle(createLabelStyle(hesMarkerFeature, imgURL, 0.8));
        hesMarkerLayer.getSource().addFeature(hesMarkerFeature);

        if (hesMarkerArray == null) {
            hesMarkerArray = new Array();
        }
        hesMarkerArray.push(hesMarkerFeature);
    }
}
//查询数据库中所有核酸采样机构
function callHesInfo() {
    var urlStr = encodeURI("Handler.ashx?method=hesuan&oper=''&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showHesInfo
    });
}
function showHesInfo(data) {
    if (hesResInfoArray != null) {
        hesResInfoArray = new Array();
    }
    hesResInfoArray = eval('(' + data + ')');
}
//核酸弹窗
function showHesPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:200px;font-size:16px;color:#87CEFA;margin-bottom:-5px"><p>' + fInfo.Name + '</p></div><hr/>'
        + '<div style="width:200px;font-size:13px;margin-top:-5px"><p><b>隶属省市：</b>山东省' + fInfo.City + '</p>'
        + '<p><b>详细地址：</b>' + fInfo.Address + '</p>'
        + '<p><b>是否24h提供核酸检测：</b>' + fInfo.Whether + '</p>'
        + '<p><b>电话号码</b>：' + fInfo.Call + '</p></div> ';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/********************* 核酸注记 end ********************/

/********************* 急救注记 start ********************/
var jiuResInfoArray = new Array();  
var jiuMarkerLayer = null;           
var jiuMarkerArray = new Array();
//在地图中添加急救注记
function addJiuMarker() {
    callJiuInfo(); //查询所有急救站点
    
    //添加急救站点注记图层
    jiuMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    map.addLayer(jiuMarkerLayer);

    //使用循环显示每一个急救注记，悬停还可显示详细信息
    var jiuMarkerFeature;
    for (var i = 0; i < jiuResInfoArray.length; i++) {
        var jiuResInfo = jiuResInfoArray[i];
        var coordinate = new ol.geom.Point([jiuResInfo.Lon, jiuResInfo.Lat]); //坐标点（ol.coordinate）
        coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        var imgURL = "Libs/images/shishiyuqing/yq01.png";
        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        jiuMarkerFeature = new ol.Feature({
            geometry: coordinate, //几何信息（坐标点）
            name: jiuResInfoArray[i].Name,  //名称属性
            type: "jiu",  //类型（河流）
            info: jiuResInfo,  //标注的详细信息
            imgURL: imgURL  //标注图标的URL地址
            //fid: "sq" + i.toString()
        });
        jiuMarkerFeature.setStyle(createLabelStyle(jiuMarkerFeature, imgURL, 0.8));
        jiuMarkerLayer.getSource().addFeature(jiuMarkerFeature);

        if (jiuMarkerArray == null) {
            jiuMarkerArray = new Array();
        }
        jiuMarkerArray.push(jiuMarkerFeature);
    }
}
//查询数据库中所有急救站点
function callJiuInfo() {
    var urlStr = encodeURI("Handler.ashx?method=jijiu&oper=''&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showJiuInfo
    });
}
function showJiuInfo(data) {
    if (jiuResInfoArray != null) {
        jiuResInfoArray = new Array();
    }
    jiuResInfoArray = eval('(' + data + ')');
}
//急救弹窗
function showJiuPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:200px;font-size:16px;color:#87CEFA;margin-bottom:-5px"><p>' + fInfo.Name + '</p></div><hr/>'
        + '<div style="width:200px;font-size:13px;margin-top:-5px"><p><b>隶属省市：</b>山东省威海市' + fInfo.City + '</p>'
        + '<p><b>详细地址：</b>' + fInfo.Address + '</p>'
        + '<p><b>电话号码</b>：' + fInfo.Call + '</p></div > ';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/********************* 急救注记 end ********************/

/********************* 轨迹注记 start ********************/
//阳性患者轨迹面板中点击表格某一行可显示具体出行轨迹
function showGJPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:200px;font-size:16px;color:#87CEFA;line-height:7px;position:relative"><p>相关人员信息</p><hr/></div>'
        + '<div style="width:200px;font-size:13px;margin-top:-5px;margin-bottom:-5px;"><p><b>人员编号：</b>' + fInfo.Number + '</p>'
        + '<p><b>隶属省市：</b>山东省威海市</p>'
        + '<p><b>家庭住址：</b>' + fInfo.Address + '</p>'
        + '<p><b>确诊日期：</b>' + fInfo.QZDate + '</p>'
        + '<p><b>轨迹日期：</b>' + fInfo.GJDate + '</p>'
        + '<p><b>途径地区：</b><ul>';
    var name = (fInfo.GJMC).split("-");
    for (var i = 0; i < name.length; i++) {
        html = html + '<li>' + name[i] + '</li>';
    }
    html = html + '</ul></p></div>';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
function showGJPopup2(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:100px;margin-bottom:-15px;margin-top:-5px"><p>' + fInfo + '</p></div>';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/********************* 轨迹注记 end ********************/

/********************* 中高注记 start ********************/
//中高风险地区面板中点击省份名称可在地图中显示详细信息
var zhongResInfoArray = new Array();
var gaoResInfoArray = new Array();
function showZGPopup(province, zgdate) {
    //查询数据
    callZhongInfo(province);
    callGaoInfo(province);

    var zhong = 0;    //用于html
    var gao = 0;     //用于html
    level = "低风险";
    var bgcolor = '#3CB371', color = 'white';     //用于html

    //饼图chart初始数据
    arname1 = new Array();
    arvalue1 = new Array(); 
    arname2 = new Array();
    arvalue2 = new Array();
    var zhongArray = new Array();
    var gaoArray = new Array();
    for (var i = 0, j = 0; i < zhongResInfoArray.length; i++) {
        if (zhongResInfoArray[i].DateString == zgdate) {
            zhongArray[j] = zhongResInfoArray[i];
            j++;
        }
    }
    if (zhongArray.length != 0) {
        arname1[0] = zhongArray[0].Shi;
        arvalue1[0] = 0;
        for (var i = 0, j = 0; i < zhongArray.length; i++) {
            if (zhongArray[i].DateString == zgdate) {
                zhong++;
                if (arname1[j] != zhongArray[i].Shi) {
                    j++;
                    arname1[j] = zhongArray[i].Shi;
                    arvalue1[j] = 1;
                }
                else {
                    arvalue1[j]++;
                }
            }
        }
    }
    for (var i = 0, j = 0; i < gaoResInfoArray.length; i++) {
        if (gaoResInfoArray[i].DateString == zgdate) {
            gaoArray[j] = gaoResInfoArray[i];
            j++;
        }
    }
    if (gaoArray.length != 0) {
        arname2[0] = gaoArray[0].Shi;
        arvalue2[0] = 0;
        for (var i = 0, j = 0; i < gaoArray.length; i++) {
            if (gaoArray[i].DateString == zgdate) {
                gao++;
                if (arname2[j] != gaoArray[i].Shi) {
                    j++;
                    arname2[j] = gaoArray[i].Shi;
                    arvalue2[j] = 1;
                }
                else {
                    arvalue2[j]++;
                }
            }
        }
    }

    //判断风险等级
    if (gao != 0) {
        level = "高风险";
        bgcolor = '#FF4500';
    }
    else if (zhong != 0) {
        level = "中风险";
        bgcolor = 'yellow';
        color = 'black';
    }

    //popup中的内容设置
    var html = '<div id="chartzg" style="width:310px;height:270px;"></div></br>'
        //    + '<div style="width:200px;font-size:13px;margin-top:-5px;margin-bottom:-5px;"><p><b>人员编号：</b>' + fInfo.Number + '</p>'
        + '<div><p>当日风险级别：<span class="label label-info" style="background-color:' + bgcolor + ';color:' + color + ';">' + level + '</span></p>'
        + '<p>当日高风险地区数量：' + gao + '个</p>'
        + '<p>当日中风险地区数量：' + zhong + '个</p></div>'
    //    + '<p><b>确诊日期：</b>' + fInfo.QZDate + '</p>'
    //    + '<p><b>轨迹日期：</b>' + fInfo.GJDate + '</p>'
    //    + '<p><b>途径地区：</b>';
    //html = html + '</p></div>';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);

    //柱形图chart数据
    var Time = ['2022年7月15日', '2022年7月28日', '2022年8月16日', '2022年9月1日', '2022年9月15日', '2022年9月30日', '2022年10月15日', '2022年10月31日'];
    var number1 = new Array();
    for (var i = 0; i < Time.length; i++) {
        number1[i] = 0;
        for (var j = 0; j < zhongResInfoArray.length; j++) {
            if (Time[i] == zhongResInfoArray[j].DateString) {
                number1[i]++;
            }
        }
    }
    var number2 = new Array();
    for (var i = 0; i < Time.length; i++) {
        number2[i] = 0;
        for (var j = 0; j < gaoResInfoArray.length; j++) {
            if (Time[i] == gaoResInfoArray[j].DateString) {
                number2[i]++;
            }
        }
    }

    // 初始化图表标签
    myChart = echarts.init(document.getElementById('chartzg'), "macarons");
    var text = province + "中高风险区";
    //正则，去除字符串中间的空格
    var optionsz = {
        //图例
        legend: {
            show: true,
            //type: 'scroll',
            //right: 0,
            top: 25,
            textStyle: {
                color: '#6495ED'
            }
        },
        //定义一个标题
        title: {
            text: text,
            textStyle: { fontSize: 17 }
        },
        //设置图表与容器的间隔
        //设置图表与容器的间隔
        grid: {
            x2: 50,
            y: 70,
            y2: 25
        },
        toolbox: {
            show: true,
            top: -5,
            right: 0,
            orient: 'horizontal',
            x: '175',

            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                saveAsImage: { show: true }
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        //X轴设置
        xAxis: {
            type: 'category',
            data: Time,
            name: "时间"
        },
        yAxis: {
            name: "地区数",
            type: 'value'
        },
        //name=legend.data的时候才能显示图例
        series: [{
            name: '高风险',
            type: 'bar',
            //barGap: 0,
            data: number2,
            barWidth: 10,//柱图宽度
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }, {
            name: '中风险',
            type: 'bar',
            data: number1,
            barWidth: 10,//柱图宽度
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { type: 'average', name: '平均值' }
                ]
            }
        }]

    };
    myChart.setOption(optionsz);

}
//中高风险地区注记
var zgMarkerLayer = new ol.layer.Vector();
function addZGMarker() {

    zgMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    map.addLayer(zgMarkerLayer);

    var zgMarkerFeature;
    for (var i = 0; i < zhongResInfoArray.length; i++) {
        if (zhongResInfoArray[i].DateString == zgdate) {
            var zgResInfo = zhongResInfoArray[i];
            var coordinate = new ol.geom.Point([zgResInfo.Lon, zgResInfo.Lat]); //坐标点（ol.coordinate）
            coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
            var imgURL = "Libs/images/tuli/Wind04.png";
            //新建标注（Vector要素），通过矢量图层添加到地图容器中
            zgMarkerFeature = new ol.Feature({
                geometry: coordinate, //几何信息（坐标点）
                name: zgResInfo.Area,  //名称属性
                type: "zg",  //类型（河流）
                info: zgResInfo,  //标注的详细信息
                imgURL: imgURL  //标注图标的URL地址
            });
            zgMarkerFeature.setStyle(createLabelStyle(zgMarkerFeature, imgURL, 0.8));
            zgMarkerLayer.getSource().addFeature(zgMarkerFeature);
        }
    }
    for (var i = 0; i < gaoResInfoArray.length; i++) {
        if (gaoResInfoArray[i].DateString == zgdate) {
            var zgResInfo = gaoResInfoArray[i];
            var coordinate = new ol.geom.Point([zgResInfo.Lon, zgResInfo.Lat]); //坐标点（ol.coordinate）
            coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
            var imgURL = "Libs/images/tuli/Wind01.png";
            //新建标注（Vector要素），通过矢量图层添加到地图容器中
            zgMarkerFeature = new ol.Feature({
                geometry: coordinate, //几何信息（坐标点）
                name: zgResInfo.Area,  //名称属性
                type: "zg",  //类型（河流）
                info: zgResInfo,  //标注的详细信息
                imgURL: imgURL  //标注图标的URL地址
            });
            zgMarkerFeature.setStyle(createLabelStyle(zgMarkerFeature, imgURL, 0.8));
            zgMarkerLayer.getSource().addFeature(zgMarkerFeature);
        }
    }
}
function callZhongInfo(province) {
    var urlStr = encodeURI("Handler.ashx?method=zhong&oper=''&p=" + province + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showZhongInfo
    });
}
function showZhongInfo(data) {
    if (zhongResInfoArray != null) {
        zhongResInfoArray = new Array();
    }
    zhongResInfoArray = eval('(' + data + ')');
}
function callGaoInfo(province) {
    var urlStr = encodeURI("Handler.ashx?method=gao&oper=''&p=" + province + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showGaoInfo
    });
}
function showGaoInfo(data) {
    if (gaoResInfoArray != null) {
        gaoResInfoArray = new Array();
    }
    gaoResInfoArray = eval('(' + data + ')');
}

function showArPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:100px;margin-bottom:-15px;margin-top:-5px"><p>' + fInfo.Shi + fInfo.Area + '</p></div>';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/********************* 中高注记 end ********************/


/*
*	显示实时水情popup
*@author zjh 2018-08-13
*/
/*
function showSssqPopup(data, type) {
    var type = type;
    var fInfo = data;
    var urlStr = encodeURI("Handler.ashx?method=sssq&oper=WaterHisInfo&type=" + type + "&siteNum=" + fInfo.SiteNum + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showSiteDetailInfo
    });
    
    //获取时间
    var time = formatDate(info[0].TM);
    var labeltext, labelclass;
    //先判断是否为空，防止为null时parsefloat报错
    if (data.WarnNum == null || parseFloat(data.WaterPos) <= parseFloat(data.WarnNum)) {
        //安全水位
        labeltext = "安全水位";
        labelclass = "label-success";
    }
    else {
        //危险水位
        labeltext = "超戒水位";
        labelclass = "label-danger";
    }

    //popup中的内容设置
    var html = '<div id="chartzjh" style="width:300px;height:220px;"></div></br>'
             + '<div style="width:300px;height:80px;font-size: 13px;line-height:7px;position:relative;margin-top:-15px"><ul class="list-group" style="width:290px">'
             + '<li class="list-group-item">最新水位：' + '<span class="label label-info">' + info[info.length - 1].WaterPos + '</span>' + '<span class="label '+labelclass+'" style="margin-left:15px">'+labeltext+'</span>'
             + '</li><li class="list-group-item">时&emsp;&emsp;间：' + time
             + '</li><li class="list-group-item">站&emsp;&emsp;址：' + info[info.length - 1].SiteAddress + '</li></ul></div>';
    //获取要素点坐标
    var coordinate = [parseFloat(data.SitePntX), parseFloat(data.SitePntY)]; 
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html); 

    var names = new Array();
    var values = new Array();
    for (var i = 0; i < info.length; i++) {
        names[i] = info[i].tm.split(":")[0] + "时";
        values[i] = info[i].WaterPos;
    }

    // 初始化图表标签
    myChart = echarts.init(document.getElementById('chartzjh'),"macarons");
    var subtext;
    type=="Rver"?subtext="水库":subtext="河流";
    var text=info[0].SiteName+"-水位图";
    //正则，去除字符串中间的空格
    text=text.replace(/\s/g,'');
    var options = {
        //定义一个标题
        title: {
            text: text,
//            subtext: '水位值',
            textStyle:{fontSize: 16}      
            
        },
        //设置图表与容器的间隔
            grid:{
               x:33,
               x2:50,
               y:70,
               y2:25
               
            },
        toolbox: {
        show : true,
        orient: 'horizontal',
        x:'175',

        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            saveAsImage : {show: true}
        }
    },
        tooltip : {
        trigger: 'axis'
    },

        //X轴设置
        xAxis: {
            type: 'category',
            data: names,
            name:"时间"
               },
        yAxis: {
                name:"水位",
                type: 'value'
    },
    //name=legend.data的时候才能显示图例
    series: [{
        name: '水位值',
        type: 'bar',
        data: values,
        barWidth : 30,//柱图宽度
       markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
        markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
            
    }]

    };

    myChart.setOption(options);
    //设置popup坐标，如果popup超出位置，会自动改变地图显示中心以适应（ol实现的）
    PopopOverlay.setPosition(coordinate);
}
*/

/*
*	显示实时雨情popup
*@author zjh 2018-08-13
*/
/*
function showSsyqPopup(data) {
    
    var fInfo = data;
    var urlStr = encodeURI("Handler.ashx?method=ssyq&oper=rainInfo&s=" + s + "&e=" + e + "&siteNum=" + fInfo.SiteNum + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showssyqRainDetailInfo
    });

    //获取时间
    var time = formatDate(ssyq_info[0].TM);
    //popup中的内容设置
    var html = '<div id="chartzjh" style="width:300px;height:220px;"></div></br>'
             + '<div style="width:300px;height:80px;font-size:13px;line-height:7px;position:relative;margin-top:-15px"><ul class="list-group" style="width:320px">'
             + '<li class="list-group-item ">最新雨量：'+'<span class="label label-info">' + ssyq_info[ssyq_info.length - 1].RainNum + '</span>'
             + '</li><li class="list-group-item">时&emsp;&emsp;间：' + time
             + '</li><li class="list-group-item">站&emsp;&emsp;址：' + ssyq_info[0].SiteAddress + '</li></ul></div>';
    //获取要素点坐标
    var coordinate = [parseFloat(data.SitePntX), parseFloat(data.SitePntY)]; 
   //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);

    var names = new Array();
    var values = new Array();
    for (var i = 0; i < ssyq_info.length; i++) {
        names[i] = ssyq_info[i].tm.split(":")[0] + "时";
        values[i] = ssyq_info[i].RainNum;
    }

    // 初始化图表标签
    myChart = echarts.init(document.getElementById('chartzjh'),"macarons");
    var text=ssyq_info[0].SiteName+"-雨量图";
    //正则，去除字符串中间的空格
    text=text.replace(/\s/g,'');
    var options = {
        //定义一个标题
        title: {
            text: text,
            textStyle:{fontSize: 16}   
            
        },
        //设置图表与容器的间隔
           //设置图表与容器的间隔
            grid:{
               x2:50,
               y:70,
               y2:25 
            },
        toolbox: {
        show : true,
        orient: 'horizontal',
        x:'175',

        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            saveAsImage : {show: true}
        }
    },
        tooltip : {
        trigger: 'axis'
    },
       
        //X轴设置
        xAxis: {
            type: 'category',
            data: names,
            name:"时间"
               },
        yAxis: {
          name:"雨量",
                type: 'value'
               },
    //name=legend.data的时候才能显示图例
    series: [{
        name: '雨量值',
        type: 'bar',
        data: values,
        barWidth : 30,//柱图宽度
       markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
        markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
            
    }]

    };


myChart.setOption(options);

    //设置popup的位置
    PopopOverlay.setPosition(coordinate);
}
*/

/*
*	查询标注对应的站点的详细信息
*@author fmm 2015-06-16
*/
/*
function showSiteDetailInfo(data) {
    var resInfo = eval('(' + data + ')');
    if (resInfo == null) {
        return;
    }
    info = resInfo;  //将站点详细信息写到全局变量数组
}
*/
/*
*	清除实时水情标注,
*@author fmm 2015-06-11
*/
/*
function clearSssqMarker(type) {
    if (sssqMarkerLayer != null) {
        if (type == "river" && sssqRiverMarkerArray != null) {       //清除实时水情--河流信息
            for (var i = 0; i < sssqRiverMarkerArray.length; i++) {
                sssqMarkerLayer.getSource().removeFeature(sssqRiverMarkerArray[i]); //移除河流标注要素
            }
            sssqRiverMarkerArray = null;
        }
        if (type == "Rver" && sssqRverMarkerArray != null) {      //清除实时水情--水库信息
            for (var i = 0; i < sssqRverMarkerArray.length; i++) {
                sssqMarkerLayer.getSource().removeFeature(sssqRverMarkerArray[i]); //移除水库标注要素
            }
            sssqRverMarkerArray = null;
        }
    }
}
*/
/*
*	时间格式化
*/
/*
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}
*/
/*
*	时间格式化
*/
/*
function formatDate(val) {
    var re = /-?\d+/;
    var m = re.exec(val);
    var d = new Date(parseInt(m[0]));
    // 按【2012-02-13 09:09:09】的格式返回日期
    return d.format("yyyy-MM-dd");
}
*/
/*
*	显示实时雨情详细框，记录请求到的数据
*@author fmm 2015-07-09
*/
/*
function showssyqRainDetailInfo(data) {
    var resInfo = eval('(' + data + ')');
    if (resInfo == null) {
        return;
    }
    ssyq_info = resInfo;
}
*/

/**
* 底图切换
* @param {int} index 底图索引
*/
/*
function changeLayer(index) {
    //获取所选底图的索引
    var baselayerindex = index;
    //从地图中取图层组
    var group = map.getLayerGroup();
    //0索引为底图，将底图换成新的底图
    group.values_.layers.array_[0] = LayerArr[baselayerindex];
    group.values_.layers.array_[1] = LayerArr[baselayerindex + 3];
    //将图层组重新设置到map
    map.setLayerGroup(group);
    //刷新地图，不可省，否则无法看到变更后的底图
    map.renderSync();
}
*/

/*
*	点击雨量勾选框进行查询操作
*/
/*
function RainStateChange() {
    //清除实时雨情标注
    clearSsyqMarker();          
    //查询之前，必须将之前的结果数组置空
    if (Ylxx_data != null || Ylxx_data.length > 0) {
        Ylxx_data = null;
        Ylxx_data = new Array();
    }
    //遍历所有的复选框，对勾选的进行查询请求
    $(".ylxxCheckbox").each(function () {
        if (this.checked == true) {
            var type = parseInt(this.value);
            switch (type) {
                case 10:
                    minRain = 0;
                    maxRain = 9.99;
                    callRainInfo(minRain, maxRain);
                    break;
                case 25:
                    minRain = 10
                    maxRain = 24.99;
                    callRainInfo(minRain, maxRain);
                    break;
                case 50:
                    minRain = 25;
                    maxRain = 49.99;
                    callRainInfo(minRain, maxRain);
                    break;
                case 100:
                    minRain = 50;
                    maxRain = 99.99;
                    callRainInfo(minRain, maxRain);
                    break;
                case 250:
                    minRain = 100;
                    maxRain = 249.99;
                    callRainInfo(minRain, maxRain);
                    break;
                case 260:
                    minRain = 250;
                    maxRain = 10000;
                    callRainInfo(minRain, maxRain);
                    break;
                default:
                    break;
            }
        }
    });

    //销毁之前的雨量信息表格，用新数据创建新表格
    $("#tb_infoYlxx").bootstrapTable('destroy');
    var tb_ylxx2 = new Table_yqYlxx2(Ylxx_data);
    tb_ylxx2.Init();
    //销毁之前的各市最大雨量表格，用新数据创建新表格
    $("#tb_infoGszdyl").bootstrapTable('destroy');
    var tb_gszdyl2 = new Table_yqGszdyl2(Ylxx_data);
    tb_gszdyl2.Init();

    //销毁之前的量级统计表格，用新数据创建新表格
    $("#tb_infoLjtj").bootstrapTable('destroy');
    var num1 = 0, num2 = 0, num3 = 0, num4 = 0, num5 = 0, num6 = 0;
    for (var i = 0; i < Ylxx_data.length; i++) {
        var rainNum = Ylxx_data[i].RainNum;
        if (rainNum > 0 && rainNum < 10) {
            num1++;
        } else if (rainNum >= 10 && rainNum < 25) {
            num2++;
        } else if (rainNum >= 25 && rainNum < 50) {
            num3++;
        } else if (rainNum >= 50 && rainNum < 100) {
            num4++;
        } else if (rainNum >= 100 && rainNum < 250) {
            num5++;
        } else if (rainNum >= 250) {
            num6++;
        }
    }
    var lj_data_extend = ["小于10", "[10,25)", "[25,50)", "[50,100)", "[100,250)", "250以上"];
    var lj_data_num = [num1, num2, num3, num4, num5, num6];
    var lj_data = [];
    for (var j = 0; j < 6; j++) {
        lj_data[j] = { "Extend": lj_data_extend[j],
            "SiteNum": lj_data_num[j]
        };
    }
    var tb_ljtj2 = new Table_yqLjtj2(lj_data);
    tb_ljtj2.Init();

    //添加雨情标注点
    addRainMarker();
}
*/
/*
*	实时查询雨量信息
*@author fmm 2015-07-07
*/
/*
function callRainInfo(minRain, maxRain) {

    var urlStr = encodeURI("Handler.ashx?method=ssyq&oper=rainNum&s=" + s + "&e=" + e + "&minRain=" + minRain + "&maxRain=" + maxRain + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showRainInfo
    });
}
*/

/*
*	得到实时雨情信息回调方法
*/
/*
function showRainInfo(data) {
    if (ssyqResInfoArray != null) {
        ssyqResInfoArray = new Array();
    }
    ssyqResInfoArray = eval('(' + data + ')');
    if (Ylxx_data == null || Ylxx_data == undefined || Ylxx_data.length <= 0) {
        Ylxx_data = ssyqResInfoArray;
    }
    else {
        Ylxx_data = Ylxx_data.concat(ssyqResInfoArray);
    
    }


}


//雨情_雨量信息
var Table_yqYlxx2 = function (data) {


    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_infoYlxx').bootstrapTable({
            method: 'get',                      //请求方式（*）
            // url: encodeURI("Handler.ashx?method=ssyq&oper=rainNum&s=" + s + "&e=" + e + "&minRain=" + minRain + "&maxRain=" + maxRain + "&" + Math.random()), //请求后台的URL（*） -->
            dataType: 'json',

            cache: false,
            striped: true,                       //是否显示行间隔色
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: true,
            sortable: true,                     //是否启用排序
            sortClass: "id",                   //排序方式
            sortName: '序号',
            sortOrder: "desc",                   //排序方式
            minimumCountColumns: 2,
            pagination: true,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [5],        //可供选择的每页的行数（*）
            search: false,                    //是否显示查询面板
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',

            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表

            data: data,

            columns: [{
                checkbox: false,
                visible: false
            }, {
                field: 'no',
                title: '序号',
//                class: 'w70',
                sortable: true,
                formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize = $('#tb_infoYlxx').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber = $('#tb_infoYlxx').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return index + 1;
                }
            }, {
                field: 'SiteName',
                title: '站名',
                class: 'w70'

            }, {
                field: 'SiteNum',
                title: '站码',
                class: 'w80'
            },

                   {
                       field: 'RainNum',
                       title: '雨量',
                       class: 'w60'
                   },
                    {
                        field: 'SiteAddress',
                        title: '站址',
                        class: 'w220'
                    }

                  ],

            onClickRow: function (row, element) {
                $(".success").removeClass('success');
                $(element).addClass('success'); //添加当前选中的 success样式用于区别
                var coordinate = [parseFloat(row.SitePntX), parseFloat(row.SitePntY)]; //获取要素点坐标

                map.getView().setCenter(coordinate); //设置地图中心点
                map.once("moveend", function () {
                    showSsyqPopup(row);
                });
            }

        });

    };


    return oTableInit;
};


//雨情_各市最大雨量
var Table_yqGszdyl2 = function (data) {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_infoGszdyl').bootstrapTable({
            method: 'get',                      //请求方式（*）
            //url: encodeURI("Handler.ashx?method=ssyq&oper=rainNum&s=" + s + "&e=" + e + "&minRain=" + minRain + "&maxRain=" + maxRain + "&" + Math.random()), //请求后台的URL（*） -->
            dataType: 'json',

            cache: false,
            striped: true,                       //是否显示行间隔色
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: true,
            sortable: true,                     //是否启用排序
            sortClass: "id",                   //排序方式
            sortName: '序号',
            sortOrder: "desc",                   //排序方式
            minimumCountColumns: 2,
            pagination: true,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [5],        //可供选择的每页的行数（*）
            search: false,                    //是否显示查询面板
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',

            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            responseHandler: oTableInit.responseHandler, //ajax已请求到数据，表格加载数据之前调用函数
            data: data,
            columns: [{
                        checkbox: false,
                        visible: false
                    }, {
                        field: 'no',
                        title: '序号',
                        sortable: true,
                        formatter: function (value, row, index) {
                            //获取每页显示的数量
                            var pageSize = $('#tb_infoYlxx').bootstrapTable('getOptions').pageSize;
                            //获取当前是第几页
                            var pageNumber = $('#tb_infoYlxx').bootstrapTable('getOptions').pageNumber;
                            //返回序号，注意index是从0开始的，所以要加上1
                            return index + 1;
                        }
                    },{
                        field: 'Pro',
                        title: '城市',
                        class: 'w60'

                    }, {
                        field: 'SiteName',
                        title: '地区',
                        class: 'w60'
                    },

                   {
                       field: 'RainNum',
                       title: '最大雨量',
                       class: 'w70'
                   }

                  ]

        });

    };

    //加载服务器数据之前的处理程序
    oTableInit.responseHandler = function (res) {
        var temp = {
            "rows": [],
            "total": 0
        };
        if (!!res) {
            if (res.code == '1') {
                temp.rows = JSON.parse(res.list);
                temp.total = parseInt(res.total);
            }
        }
        return res;
    };


    return oTableInit;
};

//雨情_量级统计
Table_yqLjtj2 = function (data) {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_infoLjtj').bootstrapTable({
            method: 'get',                      //请求方式（*）

            dataType: 'json',
            cache: false,
            striped: true,                       //是否显示行间隔色
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: true,
            sortable: true,                     //是否启用排序
            sortClass: "id",                   //排序方式
            sortName: '序号',
            sortOrder: "desc",                   //排序方式
            minimumCountColumns: 2,
            pagination: true,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 6,                       //每页的记录行数（*）
            pageList: [6],        //可供选择的每页的行数（*）
            search: false,                    //是否显示查询面板
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',

            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            //queryParams: oTableInit.queryParams, //传递参数（*）
            queryParamsType: '',
            responseHandler: oTableInit.responseHandler, //ajax已请求到数据，表格加载数据之前调用函数
            data:data,

            columns: [{
                checkbox: false,
                visible: false
            }, {
                field: 'Extend',
                title: '雨量范围（mm）',
                class: 'w120'

            }, {
                field: 'SiteNum',
                title: '区县数',
                class: 'w80'
            }
                  ]

        });

    };

    //加载服务器数据之前的处理程序
    oTableInit.responseHandler = function (res) {
        var temp = {
            "rows": [],
            "total": 0
        };
        if (!!res) {
            if (res.code == '1') {
                temp.rows = JSON.parse(res.list);
                temp.total = parseInt(res.total);
            }
        }
        return res;
    };


    return oTableInit;
};
*/

/*
*	将实时雨情标注点清空
*@author fmm 2015-07-08
*/
/*
function clearSsyqMarker() {
    if (ssyqMarkerLayer != null) {
        for (var i = 0; ssyqMarkerArray != null && i < ssyqMarkerArray.length; i++) {
            ssyqMarkerLayer.getSource().removeFeature(ssyqMarkerArray[i]); //移除雨情标注要素
        }
        ssyqMarkerArray = null;
    }
}
*/

/*
*	查询到的预测信息
*@author fmm 2015-06-17
*/
/*
function tfljForcastOnsuccess(data) {
    var resInfoArray = eval('(' + data + ')');
    tfForcastInfoArray = resInfoArray;
}
*/
/*
*	清除台风路径标注
*@author fmm 2015-06-18
*/
/*
function clearTfljMarker() {
    if (tfljPntInfoLayer != null && tfMarkerArray != undefined) {             //清除标注
        for (var i = 0; i < tfMarkerArray.length; i++) {
            tfljPntInfoLayer.getSource().removeFeature(tfMarkerArray[i]);
        }
        tfljPntInfoLayer.getSource().removeFeature(tfCurrentMarker);
        tfMarkerArray = null;
        tfCurrentMarker = null;
    }
}
*/

/*
*	显示台风的popup
*@author zjh 2018-08-15
*/
/*
function showTfljPopup(data) {

    var tfInfo = data;
    if (tfInfo.forecast == undefined) {
        var html = '<div class="tfDetail"><span class="label label-primary" style="font-size:100%">实测路径</span>'
        + '<ul class="list-group tful" style="margin-bottom:0px;margin-top:15px">'
        + '<li class="list-group-item ">过去时间：' + tfInfo.tm
        + '</li><li class="list-group-item ">经度坐标：' + tfInfo.jindu
        + '</li><li class="list-group-item ">纬度坐标：' + tfInfo.weidu
        + '</li><li class="list-group-item ">最大风力：' + tfInfo.windstrong
        + '</li><li class="list-group-item ">最大风速：' + tfInfo.windspeed + '米/秒'
        + '</li><li class="list-group-item ">中心气压：' + tfInfo.qiya + '百帕'
        + '</li><li class="list-group-item ">移动速度：' + tfInfo.movespeed + '公里/小时'
        + '</li><li class="list-group-item ">移动方向：' + tfInfo.movedirect
        + '</li></ul></div>';
    }
    else {
        var html = '<div class="tfDetail"><span class="label label-primary" style="font-size:100%">预测路径</span>'
         + '<ul class="list-group tful" style="margin-bottom:0px;margin-top:15px">'
         + '<li class="list-group-item ">预报机构：' + tfInfo.forecast
         + '<li class="list-group-item ">到达时间：' + tfInfo.tm
         + '<li class="list-group-item ">经度坐标：' + tfInfo.jindu
         + '<li class="list-group-item ">纬度坐标：' + tfInfo.weidu
         + '</li><li class="list-group-item ">最大风力：' + tfInfo.windstrong
         + '</li><li class="list-group-item ">最大风速：' + tfInfo.windspeed + '米/秒'
         + '</li><li class="list-group-item ">中心气压：' + tfInfo.qiya + '百帕'
         + '</li><li class="list-group-item ">移动速度：' + tfInfo.movespeed + '公里/小时'
         + '</li><li class="list-group-item ">移动方向：' + tfInfo.movedirect
        + '</li></ul></div>';
    }

    var coordinate = [parseFloat(data.jindu), parseFloat(data.weidu)]; //获取要素点坐标
    popupCxt = $("#popup-content");

    popupCxt.html(html); //设置Popup容器里的内容
    //设置popup的位置
    PopopOverlay.setPosition(coordinate);
}
*/
/*
*	显示台风路径
*@author fmm 2015-06-17
*/
/*
function addTfljLine() {
    if (tfljDrawLayer == null) {
        //台风路径标线绘制层
        tfljDrawLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(tfljDrawLayer);
    }
    //目前需要添加四条标线
    var dots1 = new Array();
    dots1.push([11757464.4300438, 2154935.91508589]);
    dots1.push([12474016.8603311, 2154935.91508589]);
    dots1.push([12474016.8603311, 3123471.74910458]);
    var lin1 = new ol.geom.LineString(dots1);
    var linFeature1 = new ol.Feature({
        geometry: lin1 //几何信息（坐标点）
    });
    var fStyle1 = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#990000',
            width: 0.5
        })
    });
    linFeature1.setStyle(fStyle1);
    tfljDrawLayer.getSource().addFeature(linFeature1); //添加图形1

    var dots2 = new Array();
    dots2.push([12052238.4416644, 1804722.76625729]);
    dots2.push([13358338.895192, 1804722.76625729]);
    dots2.push([13358338.8951928, 3096586.04422852]);
    var lin2 = new ol.geom.LineString(dots2);
    var linFeature2 = new ol.Feature({
        geometry: lin2 //几何信息（坐标点）
    });
    var fStyle2 = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#660066',
            width: 0.5
        })
    });
    linFeature2.setStyle(fStyle2);
    tfljDrawLayer.getSource().addFeature(linFeature2); //添加图形2

    var dots3 = new Array();
    dots3.push([12245143.9872601, 1689200.13960789]);
    dots3.push([14137575.3307457, 2511525.23484571]);
    dots3.push([14137575.3307457, 4028802.02613441]);
    var lin3 = new ol.geom.LineString(dots3);
    var linFeature3 = new ol.Feature({
        geometry: lin3 //几何信息（坐标点）
    });
    var fStyle3 = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#6666FF',
            width: 0.5
        })
    });
    linFeature3.setStyle(fStyle3);
    tfljDrawLayer.getSource().addFeature(linFeature3); //添加图形3

    var dots4 = new Array();
    dots4.push([12245143.9872601, 1689200.13960789]);
    dots4.push([13914936.3491592, 1689200.13960789]);
    dots4.push([14694172.7847121, 2511525.23484571]);
    dots4.push([14694172.7847121, 4028802.02613441]);
    var lin4 = new ol.geom.LineString(dots4);
    var linFeature4 = new ol.Feature({
        geometry: lin4 //几何信息（坐标点）
    });
    var fStyle4 = new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#009900',
            width: 0.5
        })
    });
    linFeature4.setStyle(fStyle4);
    tfljDrawLayer.getSource().addFeature(linFeature4); //添加图形4
}
*/

/*
*	添加单个点(即路径点与路径线)
*@author fmm 2015-06-18
*/
/*
function addTFPath(i, simplePntInfo) {
    var typhoonFeature; //台风路径点要素
    var size = map.getSize();  //地图容器的大小
    var bound = map.getView().calculateExtent(size); //当前地图范围
    //根据当前地图范围移动地图
    if (bound[1] > simplePntInfo.jindu || bound[2] > simplePntInfo.weidu || bound[3] < simplePntInfo.jindu || bound[0] < simplePntInfo.weidu) {
        map.getView().setCenter([simplePntInfo.jindu, simplePntInfo.weidu]);
        map.getView().setZoom(7);
    }
    var lon = simplePntInfo.jindu;
    var lat = simplePntInfo.weidu;
    var coord = [lon, lat]; //台风路径点坐标
    //第一步：绘制当前台风图片，并在台风图片的周围画两个圆圈
    //（1）绘制台风周围的圆形
    drawTFCircle([lon, lat + 20000]); //绘制圆
    //（2）绘制当前台风的图片标注
    if (tfCurrentMarker != null) {
        tfljPntInfoLayer.getSource().removeFeature(tfCurrentMarker);
    }
    var currentImg = "Libs/images/yangxing/yangxing.gif";
    tfCurrentMarker = new ol.Feature({
        geometry: new ol.geom.Point(coord), //几何信息（坐标点）
        type: "tfMarker"  //类型（当前台风标识）
    });
    var currentMarkerStyle = new ol.style.Style({
        image: new ol.style.Icon(({
            anchorOrigin: 'bottom-left',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offsetOrigin: 'bottom-left',
            scale: 1,  //图标缩放比例
            opacity: 1,  //透明度
            src: currentImg  //图标的url
        }))
    });
    tfCurrentMarker.setStyle(currentMarkerStyle);
    tfljPntInfoLayer.getSource().addFeature(tfCurrentMarker);
    //第二步：绘制台风路径
    var n = 0;
    var tfGrade = 5;    //若无台风风力，则默认为热带气压
    if (simplePntInfo.windstrong != null) {
        n = simplePntInfo.windstrong.indexOf("级");
        tfGrade = simplePntInfo.windstrong.slice(0, n);
    }
    var imgURL = null;
    if (tfGrade == 4 || tfGrade == 5 || tfGrade == 6) {
        imgURL = "Libs/images/yangxing/Wind00.png";
    }
    if (tfGrade == 7) {                             //热带气压
        imgURL = "Libs/images/yangxing/Wind06.png";
    } else if (tfGrade == 8 || tfGrade == 9) {      //热带风暴
        imgURL = "Libs/images/yangxing/Wind05.png";
    } else if (tfGrade == 10 || tfGrade == 11) {    //强热带风暴
        imgURL = "Libs/images/yangxing/Wind04.png";
    } else if (tfGrade == 12 || tfGrade == 13) {    //台风
        imgURL = "Libs/images/yangxing/Wind02.png";
    } else if (tfGrade == 14 || tfGrade == 15) {    //强台风
        imgURL = "Libs/images/yangxing/Wind03.png";
    } else if (tfGrade == 16) {                     //超强台风
        imgURL = "Libs/images/yangxing/Wind01.png";
    }
    //台风路径点标注要素
    typhoonFeature = new ol.Feature({
        geometry: new ol.geom.Point(coord), //几何信息（坐标点）
        type: "typhoon",  //类型（台风）
        info: simplePntInfo,  //标注的详细信息
        imgURL: imgURL,  //标注图标的URL地址
        fid: "typhoonPoint" + i.toString()
    });
    typhoonFeature.setStyle(createLabelStyle(typhoonFeature, imgURL, 0.8));
    tfljPntInfoLayer.getSource().addFeature(typhoonFeature);
    //将台风路径点要素添加到对应缓存数组中
    if (tfMarkerArray == null) {
        tfMarkerArray = new Array();
    }
    tfMarkerArray.push(typhoonFeature);

    //将台风点添加到台风路径数组
    var dot = [simplePntInfo.jindu, simplePntInfo.weidu];
    if (tfPathInfoArray == null) {
        tfPathInfoArray = new Array();
    }
    tfPathInfoArray.push(dot);
    //绘制的不是第一个点，则要绘制中间的路径线
    if (i > 0) {
        var linFeature = new ol.Feature({
            geometry: new ol.geom.LineString(tfPathInfoArray)  //线的几何信息（坐标点）
        });
        //设置线要素的样式
        linFeature.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#EE0000',
                width: 2
            })
        })
        );
        tfljPathInfoLayer.getSource().addFeature(linFeature); //添加线要素
    }
}
*/
/*
*	绘制台风周围的圆形
*@author fmm 2015-07-14
*/
/*
function drawTFCircle(origin) {
    if (tfCurrentCircle1 != null) {
        clearTFCurrentCircle();
    }
    var origin = origin;
    var radius1 = 40000;
    var radius2 = 80000;

    tfCurrentCircle1 = new ol.Feature({
        geometry: new ol.geom.Circle(origin, radius1), //第一个圆的几何信息
        type: 'tfCircle'
    });
    tfCurrentCircle2 = new ol.Feature({
        geometry: new ol.geom.Circle(origin, radius2), //第二个圆的几何信息
        type: 'tfCircle'
    });
    var circleStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 102, 0, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ff6600',
            width: 1
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ff6600'
            })
        })
    });
    tfVectorLayer.setStyle(circleStyle); //设置图层要素的样式
    tfVectorLayer.getSource().addFeatures([tfCurrentCircle1, tfCurrentCircle2]); //添加要素
}
*/
/*
*	画出台风的预测路径信息，包括标注点以及移动路径，每个国家预测路径用不同的颜色表示
*@author fmm 2015-06-18
*/
/*
function drawTFForcastInfo() {
    var typhoonFeature;

    //第一步：画出预测台风标注点
    for (var i = 0; i < tfForcastInfoArray.length; i++) {
        simplePntInfo = tfForcastInfoArray[i]; //单个预测点
        var lon = simplePntInfo.jindu;
        var lat = simplePntInfo.weidu;
        var coord = [lon, lat]; //预测点坐标
        var n = 0;
        var tfGrade = 5;    //若无台风风力，则默认为热带气压
        var imgURL = null;
        if (simplePntInfo.windstrong != null) {
            n = simplePntInfo.windstrong.indexOf("级");
            tfGrade = simplePntInfo.windstrong.slice(0, n);
        }
        if (tfGrade == 4 || tfGrade == 5 || tfGrade == 6 || tfGrade == "         ") {
            imgURL = "Libs/images/yangxing/Wind00.png";
        }
        if (tfGrade == 7) {                             //热带气压
            imgURL = "Libs/images/yangxing/Wind06.png";
        } else if (tfGrade == 8 || tfGrade == 9) {      //热带风暴
            imgURL = "Libs/images/yangxing/Wind05.png";
        } else if (tfGrade == 10 || tfGrade == 11) {    //强热带风暴
            imgURL = "Libs/images/yangxing/Wind04.png";
        } else if (tfGrade == 12 || tfGrade == 13) {    //台风
            imgURL = "Libs/images/yangxing/Wind02.png";
        } else if (tfGrade == 14 || tfGrade == 15) {    //强台风
            imgURL = "Libs/images/yangxing/Wind03.png";
        } else if (tfGrade == 16) {                     //超强台风
            imgURL = "Libs/images/yangxing/Wind01.png";
        }

        //添加预测台风路径点，即新建标注（Vector要素）并添加到地图容器中
        typhoonFeature = new ol.Feature({
            geometry: new ol.geom.Point(coord), //几何信息（坐标点）
            //            name: resInfoArray[i].SiteName,  //名称属性
            type: "typhoon",  //类型（台风）
            info: simplePntInfo,  //标注的详细信息
            imgURL: imgURL,  //标注图标的URL地址
            fid: "typhoonPoint" + i.toString()
        });
        typhoonFeature.setStyle(createLabelStyle(typhoonFeature, imgURL, 0.8));
        tfljPntInfoLayer.getSource().addFeature(typhoonFeature);

        if (tfMarkerArray == null) {
            tfMarkerArray = new Array();
        }
        tfMarkerArray.push(typhoonFeature);
    }

    //第二步：画出预测台风路径线
    var dots1 = new Array();
    var dots2 = new Array();
    var dots3 = new Array();
    var dots4 = new Array();

    dots1.push([tfDetailInfoArray[tfDetailInfoArray.length - 1].jindu, tfDetailInfoArray[tfDetailInfoArray.length - 1].weidu]);
    dots2.push([tfDetailInfoArray[tfDetailInfoArray.length - 1].jindu, tfDetailInfoArray[tfDetailInfoArray.length - 1].weidu]);
    dots3.push([tfDetailInfoArray[tfDetailInfoArray.length - 1].jindu, tfDetailInfoArray[tfDetailInfoArray.length - 1].weidu]);
    dots4.push([tfDetailInfoArray[tfDetailInfoArray.length - 1].jindu, tfDetailInfoArray[tfDetailInfoArray.length - 1].weidu]);

    var dot = null;
    for (var i = 0; i < tfForcastInfoArray.length; i++) {
        var forecast = tfForcastInfoArray[i].forecast.slice(0, tfForcastInfoArray[i].forecast.indexOf(" ")); //国家属性
        dot = [tfForcastInfoArray[i].jindu, tfForcastInfoArray[i].weidu]; //台风预测点
        switch (forecast) {
            case "中国":
                dots1.push(dot);
                break;
            case "日本":
                dots2.push(dot);
                break;
            case "中国台湾":
                dots3.push(dot);
                break;
            case "美国":
                dots4.push(dot);
                break;
            default:
                break;
        }
    }

    var linFeature1 = new ol.Feature({
        geometry: new ol.geom.LineString(dots1) // 中国大陆预测线几何信息
    });
    //设置线1的样式
    linFeature1.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF3C4E',
            lineDash: [5, 5],
            width: 1
        })
    })
    );
    var linFeature2 = new ol.Feature({
        geometry: new ol.geom.LineString(dots2) //日本预测线几何信息
    });
    //设置线2的样式
    linFeature2.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#04FAF7',
            lineDash: [5, 5],
            width: 1
        })
    })
    );
    var linFeature3 = new ol.Feature({
        geometry: new ol.geom.LineString(dots3) //中国台湾预测线几何信息
    });
    //设置线3的样式
    linFeature3.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF00FE',
            lineDash: [5, 5],
            width: 1
        })
    })
    );
    var linFeature4 = new ol.Feature({
        geometry: new ol.geom.LineString(dots4) //美国预测线几何信息
    });
    //设置线4的样式
    linFeature4.setStyle(new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FEBD00',
            lineDash: [5, 5],
            width: 1
        })
    })
    );
    //添加线要素
    tfljPathInfoLayer.getSource().addFeatures([linFeature1, linFeature2, linFeature3, linFeature4]);
}
*/
/*
*	画出台风的详细路径信息
*@author fmm 2015-06-18
*/
/*
function drawTFPathInfo(resInfoArray) {
    if (tfljPathInfoLayer == null) {   //将台风路径信息图层加入到地图容器       
        tfljPathInfoLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(tfljPathInfoLayer);
    }

    if (tfVectorLayer == null) {       //将当前台风标识绘制层添加到地图容器       
        tfVectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(tfVectorLayer);
    }

    if (tfljPntInfoLayer == null) {    //将台风点信息图层加入到地图容器
        tfljPntInfoLayer = new ol.layer.Vector({
            source: new ol.source.Vector()
        });
        map.addLayer(tfljPntInfoLayer);

    }
    //将地图中心移到第一个点的位置，并将地图级数放大两级
    map.getView().setCenter([resInfoArray[0].jindu, resInfoArray[0].weidu]);
    map.getView().setZoom(7);
    //设置计时器动态绘制路径点与路径线
    var i = 0;
    tfInfoTimer = setInterval(function () {
        if (i < resInfoArray.length) {
            addTFPath(i, resInfoArray[i++]); //绘制台风路径点与路径线
        }
        else {
            drawTFForcastInfo();             //绘制台风的预测路径信息
            if (tfInfoTimer != null) {
                clearInterval(tfInfoTimer);
                tfInfoTimer = null;
            }
        }
    }, 300);
}
*/

/*
*	清除台风路径绘制信息
*@author fmm 2015-06-18
*/
/*
function clearTfljPath() {
    if (tfljPathInfoLayer != null) {
        tfljPathInfoLayer.getSource().clear();      //清除路径信息
    }
    tfPathInfoArray = null;
}
*/
/*
*	清除台风路径绘制路径时间控制器
*@author fmm 2015-06-18
*/
/*
function clearTimer() {
    if (tfInfoTimer != null) {
        clearInterval(tfInfoTimer);
        tfInfoTimer = null;
    }
}
*/
/*
*	清除台风图片周围的圆圈
*@author fmm 2015-07-14
*/
/*
function clearTFCurrentCircle() {

    if (tfVectorLayer == null) {
        return;
    }
    else {
        var vectSource = tfVectorLayer.getSource();
        var features = vectSource.getFeatures();
        if (features != null) {
            tfVectorLayer.getSource().clear(); //清除所有要素
            tfCurrentCircle1 = null;
            tfCurrentCircle2 = null;
        }
    }
}
*/
/**
* 创建标注样式函数
* @param {ol.Feature} feature 要素
* @param {string} imgURL image图标URL
* @param {number} image图标缩放比
*/
/*
var createLabelStyle = function (feature, imgURL, scale) {
    return new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5, 0.5],
            anchorOrigin: 'top-right',
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            offsetOrigin: 'top-right',
            // offset:[-7.5,-15],
            scale: scale,  //图标缩放比例
            opacity: 1,  //透明度
            src: imgURL  //图标的url
        }))
    });
}
*/