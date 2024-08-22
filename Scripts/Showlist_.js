//改变轨迹查询方式
function rqchange() {
    document.getElementById("riqi").style.display = "";
    document.getElementById("renyuan").style.display = "none";
    var urlStr = encodeURI("Handler.ashx?method=yxgj&oper=riqi&t=" + gjdate + "&" + Math.random());
    $("#tb_yangxing").bootstrapTable('refresh', { url: urlStr });
}
function rychange() {
    document.getElementById("riqi").style.display = "none";
    document.getElementById("renyuan").style.display = "";
    var urlStr = encodeURI("Handler.ashx?method=yxgj&oper=renyuan&t=" + gjnumber + "&" + Math.random());
    $("#tb_yangxing").bootstrapTable('refresh', { url: urlStr });
}

//改变信息轨迹表格刷新
function yxtablechange() {
    var urlStr = encodeURI("Handler.ashx?method=yxgj&oper=riqi&t=" + gjdate + "&" + Math.random());
    $("#tb_yangxing").bootstrapTable('refresh', { url: urlStr });
}
function bhchange() {
    gjnumber = document.getElementById('bianhao').value;
    var urlStr = encodeURI("Handler.ashx?method=yxgj&oper=renyuan&t=" + gjnumber + "&" + Math.random());
    $("#tb_yangxing").bootstrapTable('refresh', { url: urlStr });
}

//日期改变函数
function monthchange() {
    var getmonth = document.getElementById("month");
    var getday = document.getElementById("day");
    if (getmonth.value == "02") {
        if (getday.options.length == "30") {
            $("#day option[value='29']").remove();
            $("#day option[value='30']").remove();
        }
        else if (getday.options.length == "31") {
            $("#day option[value='29']").remove();
            $("#day option[value='30']").remove();
            $("#day option[value='31']").remove();
        }
    }
    else if (getmonth.value == "01" || getmonth.value == "03" || getmonth.value == "05" || getmonth.value == "07" || getmonth.value == "08" || getmonth.value == "10" || getmonth.value == "12") {
        if (getday.options.length == 28) {
            getday.add(new Option(29, "29"), 29);
            getday.add(new Option(30, "30"), 30);
            getday.add(new Option(31, "31"), 31);
        }
        else if (getday.options.length == 30) {
            getday.add(new Option(31, "31"), 31);
        }
    }
    else if (getmonth.value == "04" || getmonth.value == "06" || getmonth.value == "09" || getmonth.value == "11") {
        if (getday.options.length == 28) {
            getday.add(new Option(29, "29"), 29);
            getday.add(new Option(30, "30"), 30);
        }
        else if (getday.options.length == 31) {
            $("#day option[value='31']").remove();
        }
    }
    gjdate = "2022-" + getmonth.value + "-" + getday.value;
    yxtablechange();
}
function daychange() {
    var getmonth = document.getElementById("month");
    var getday = document.getElementById("day");
    gjdate = "2022-" + getmonth.value + "-" + getday.value;
    yxtablechange();
}
function monthchange2() {
    var getmonth = document.getElementById("month2");
    var getday = document.getElementById("day2");
    if (getmonth.value == "02") {
        if (getday.options.length == "30") {
            $("#day2 option[value='29']").remove();
            $("#day2 option[value='30']").remove();
        }
        else if (getday.options.length == "31") {
            $("#day2 option[value='29']").remove();
            $("#day2 option[value='30']").remove();
            $("#day2 option[value='31']").remove();
        }
    }
    else if (getmonth.value == "01" || getmonth.value == "03" || getmonth.value == "05" || getmonth.value == "07" || getmonth.value == "08" || getmonth.value == "10" || getmonth.value == "12") {
        if (getday.options.length == 28) {
            getday.add(new Option(29, "29"), 29);
            getday.add(new Option(30, "30"), 30);
            getday.add(new Option(31, "31"), 31);
        }
        else if (getday.options.length == 30) {
            getday.add(new Option(31, "31"), 31);
        }
    }
    else if (getmonth.value == "04" || getmonth.value == "06" || getmonth.value == "09" || getmonth.value == "11") {
        if (getday.options.length == 28) {
            getday.add(new Option(29, "29"), 29);
            getday.add(new Option(30, "30"), 30);
        }
        else if (getday.options.length == 31) {
            $("#day2 option[value='31']").remove();
        }
    }
    gjdate2 = "2022-" + getmonth.value + "-" + getday.value;
}
function daychange2() {
    var getmonth = document.getElementById("month2");
    var getday = document.getElementById("day2");
    gjdate2 = "2022-" + getmonth.value + "-" + getday.value;
}

//定义边界及其填充样式
var styles1 = [
    new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#32CD32',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(50,205,50,0.1)'
        })
    })
];//低风险
var styles2 = [
    new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,255,0,0.1)'
        })
    })
];//中风险
var styles3 = [
    new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        })
    })
];//高风险
var styles4 = {
    'route': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 1
        })
    }),
    'geoMarker': new ol.style.Style({
        image: new ol.style.Circle({
            radius: 4,
            snapToPixel: false,
            fill: new ol.style.Fill({
                color: '#DC143C'
            }),
        })
    })
};
var stylegj = [
    new ol.style.Style({
        image: new ol.style.Circle({
            radius: 2,
            snapToPixel: false,
            fill: new ol.style.Fill({
                color: 'red'
            }),
        })
    })
];


/*****省边界绘制begin*****/
var bjFeature = new ol.Feature({ geometry: beijin, type: "bj" });//北京
var tjFeature = new ol.Feature({ geometry: tianjin, type: "bj" });//天津
var sx1Feature = new ol.Feature({ geometry: shanxi1, type: "bj" });//山西
var nmgFeature = new ol.Feature({ geometry: neimenggu, type: "bj" });//内蒙古
var hljFeature = new ol.Feature({ geometry: heilongjiang, type: "bj" });//黑龙江
var shFeature = new ol.Feature({ geometry: shanghai, type: "bj" });//上海
var ahFeature = new ol.Feature({ geometry: anhui, type: "bj" });//安徽
var jxFeature = new ol.Feature({ geometry: jiangxi, type: "bj" });//江西
var henFeature = new ol.Feature({ geometry: henan, type: "bj" });//河南
var hubFeature = new ol.Feature({ geometry: hubei, type: "bj" });//湖北
var hunFeature = new ol.Feature({ geometry: hunan, type: "bj" });//湖南
var cqFeature = new ol.Feature({ geometry: chongqing, type: "bj" });//重庆
var scFeature = new ol.Feature({ geometry: sichuan, type: "bj" });//四川
var gzFeature = new ol.Feature({ geometry: guizhou, type: "bj" });//贵州
var ynFeature = new ol.Feature({ geometry: yunnan, type: "bj" });//云南
var xzFeature = new ol.Feature({ geometry: xizang, type: "bj" });//西藏
var sx2Feature = new ol.Feature({ geometry: shanxi2, type: "bj" });//陕西
var gsFeature = new ol.Feature({ geometry: gansu, type: "bj" });//甘肃
var qhFeature = new ol.Feature({ geometry: qinghai, type: "bj" });//青海
var xjFeature = new ol.Feature({ geometry: xinjiang, type: "bj" });//新疆
var nxFeature = new ol.Feature({ geometry: ningxia, type: "bj" });//宁夏
var hnFeature = new ol.Feature({ geometry: hainan, type: "bj" });//海南
var gxFeature = new ol.Feature({ geometry: guangxi, type: "bj" });//广西
var gdFeature = new ol.Feature({ geometry: guangdong, type: "bj" });//广东
var sdFeature = new ol.Feature({ geometry: shandong, type: "bj" });//山东
var fjFeature = new ol.Feature({ geometry: fujian, type: "bj" });//福建
var zjFeature = new ol.Feature({ geometry: zhejiang, type: "bj" });//浙江
var jsFeature = new ol.Feature({ geometry: jiangsu, type: "bj" });//江苏
var jlFeature = new ol.Feature({ geometry: jilin, type: "bj" });//吉林
var lnFeature = new ol.Feature({ geometry: liaoning, type: "bj" });//辽宁
var twFeature = new ol.Feature({ geometry: taiwan, type: "bj" });//台湾
var hebFeature = new ol.Feature({ geometry: hebei, type: "bj" });//河北
//source
var bjSource;
//矢量图层
var bjLayer = new ol.layer.Vector();
//添加边界图层及样式函数
function addbjLayer(feature) {
    map.removeLayer(bjLayer);
    bjLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    //边界样式
    var style;
    if (level == "低风险") {
        style = styles1;
    }
    else if (level == "中风险") {
        style = styles2;
    }
    else if (level == "高风险") {
        style = styles3;
    }
    feature.setStyle(style);
    bjLayer.getSource().addFeature(feature);
    //添加图层
    map.addLayer(bjLayer);

    //添加注记
    map.removeLayer(zgMarkerLayer);
    addZGMarker();
}
/*****省边界绘制end*****/

//（字面意思）
function zgplusshow(name) {
    if (level != "低风险") {
        document.getElementById("zgplus").style.display = "";
        if (arname2.length != 0) {
            //初始化图表标签2
            document.getElementById("chartar2").style.display = "";
            myChart = echarts.init(document.getElementById('chartar2'), "macarons");
            //正则，去除字符串中间的空格
            var optionsb2 = {
                //定义一个标题
                title: {
                    text: name + "当日高风险地区分布图",
                    textStyle: { fontSize: 16 }
                },
                //图例
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 25
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    name: '高风险',
                    type: 'pie',
                    //center: ['50%', '65%'],
                    radius: '65%',
                    label: {
                        show: true,
                        position: 'inner',
                        formatter: '{d}%'
                    }
                }]
            };
            //将数据导入饼图2
            var data2 = new Array();
            for (var i = 0; i < arname2.length; i++) {
                var datas = { name: arname2[i], value: arvalue2[i] };
                data2.push(datas);
            }
            optionsb2.series[0].data = data2;
            myChart.setOption(optionsb2);
        }
        else {
            document.getElementById("chartar2").style.display = "none";
        }
        if (arname1.length != 0) {
            //初始化图表标签1
            document.getElementById("chartar1").style.display = "";
            myChart = echarts.init(document.getElementById('chartar1'), "macarons");
            //var text = province + "中高风险区";
            //正则，去除字符串中间的空格
            var optionsb1 = {
                //定义一个标题
                title: {
                    text: name + "当日中风险地区分布图",
                    textStyle: { fontSize: 16 }
                },
                //图例
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    top: 25
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    name: '中风险',
                    type: 'pie',
                    //center: ['50%', '65%'],
                    radius: '65%',
                    label: {
                        show: true,
                        position: 'inner',
                        formatter: '{d}%'
                    }
                }]
            };
            //将数据导入饼图1
            var data1 = new Array();
            for (var i = 0; i < arname1.length; i++) {
                var datas = { name: arname1[i], value: arvalue1[i] };
                data1.push(datas);
            }
            optionsb1.series[0].data = data1;
            myChart.setOption(optionsb1);
            if (arname2.length == 0) {
                document.getElementById("chartar1").style.top = "15px";
            }
            else {
                document.getElementById("chartar1").style.top = "195px";
                document.getElementById("chartar2").style.top = "15px";
            }
        }
        else {
            document.getElementById("chartar1").style.display = "none";
        }

    }
}
function zgplusunshow() {
    document.getElementById("zgplus").style.display = "none";
}

var allzhongResInfoArray = new Array();
var allgaoResInfoArray = new Array();
function zgwholeshow() {
    document.getElementById("zgwhole").style.display = "";
    var month, day, date;
    if (zgdate.slice(6, 7) == "月") {
        month = "0" + zgdate.slice(5, 6);
        if (zgdate.slice(8, 9) == "日") {
            day = "0" + zgdate.slice(7, 8);
        }
        else {
            day = zgdate.slice(7, 9);
        }
    }
    else {
        month = zgdate.slice(5, 7);
        if (zgdate.slice(9, 10) == "日") {
            day = "0" + zgdate.slice(8, 9);
        }
        else {
            day = zgdate.slice(8, 10);
        }
    }
    date = "2022-" + month + "-" + day;
    //查询数据
    callAllZhongInfo(date);
    callAllGaoInfo(date);
    var Province = new Array();
    Province[0] = allzhongResInfoArray[0].Sheng;
    var num1 = new Array(), num2 = new Array();
    num1[0] = 0;
    for (var i = 0, j = 0; i < allzhongResInfoArray.length; i++) {
        if (Province[j] != allzhongResInfoArray[i].Sheng) {
            j++;
            Province[j] = allzhongResInfoArray[i].Sheng;
            num1[j] = 0;
        }
        num1[j]++;
    }
    for (var i = 0; i < Province.length; i++) {
        num2[i] = 0;
        for (var j = 0; j < allgaoResInfoArray.length; j++) {
            if (Province[i] == allgaoResInfoArray[j].Sheng) {
                num2[i]++;
            }
        }
    }
    // 初始化图表标签
    myChart = echarts.init(document.getElementById('chartar3'), "macarons");
    var text = "全国该日中高风险地区分布图";
    //正则，去除字符串中间的空格
    var optionsz = {
        //图例
        legend: {
            show: true,
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
            right: 15,
            orient: 'horizontal',
            //x: '175',
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
            data: Province,
            name: ""
        },
        yAxis: {
            name: "地区数",
            type: 'value'
        },
        //name=legend.data的时候才能显示图例
        series: [{
            name: '中风险',
            type: 'bar',
            //barGap: 0,
            data: num1,
            barWidth: 4,//柱图宽度
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
            name: '高风险',
            type: 'bar',
            data: num2,
            barWidth: 4,//柱图宽度
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
function zgwholeunshow() {
    document.getElementById("zgwhole").style.display = "none";
}
function callAllZhongInfo(date) {
    var urlStr = encodeURI("Handler.ashx?method=zhongall&oper=''&p=" + date + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showAllZhongInfo
    });
}
function showAllZhongInfo(data) {
    if (allzhongResInfoArray != null) {
        allzhongResInfoArray = new Array();
    }
    allzhongResInfoArray = eval('(' + data + ')');
}
function callAllGaoInfo(date) {
    var urlStr = encodeURI("Handler.ashx?method=gaoall&oper=''&p=" + date + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showAllGaoInfo
    });
}
function showAllGaoInfo(data) {
    if (allgaoResInfoArray != null) {
        allgaoResInfoArray = new Array();
    }
    allgaoResInfoArray = eval('(' + data + ')');
}

/*****省交互函数start*****/
var province;
var zgdate = "2022年7月15日";
function datechange() {
    var date = document.getElementById('date').value;
    zgdate = "2022年" + date;
}
function anhuizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([118.10, 31.84]), zoom: 7.5 });
    province = '安徽省';
    var coordinate = [117.10, 31.84];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(ahFeature);
}
function beijingzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([116.60, 40.24]), zoom: 9 });
    province = '北京市';
    var coordinate = [116.30, 40.24];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(bjFeature);
}
function chongqingzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([108.75, 30.27]), zoom: 8 });
    province = '重庆市';
    var coordinate = [107.75, 30.27];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(cqFeature);
}
function fujianzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([118.50, 25.94]), zoom: 8 });
    province = '福建省';
    var coordinate = [117.50, 25.94];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(fjFeature);
}
function gansuzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([103.00, 37.60]), zoom: 6.5 });
    province = '甘肃省';
    var coordinate = [102.50, 37.60];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(gsFeature);
}
function guangdongzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([114.50, 22.80]), zoom: 7.5 });
    province = '广东省';
    var coordinate = [112.50, 22.80];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(gdFeature);
}
function guangxizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([109.50, 23.84]), zoom: 7.5 });
    province = '广西省';
    var coordinate = [108.50, 23.84];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(gxFeature);
}
function guizhouzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([107.35, 26.94]), zoom: 7.8 });
    province = '贵州省';
    var coordinate = [106.35, 26.94];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(gzFeature);
}
function hainanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([113.50, 14.00]), zoom: 6.1 });
    province = '海南省';
    var coordinate = [110.00, 19.00];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(hnFeature);
}
function hebeizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([117.50, 39.44]), zoom: 7 });
    province = '河北省';
    var coordinate = [115.50, 39.44];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(hebFeature);
}
function henanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([114.00, 34.00]), zoom: 7.5 });
    province = '河南省';
    var coordinate = [113.00, 34.00];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(henFeature);
}
function heilongjiangzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([127.58, 48.90]), zoom: 6.1 });
    province = '黑龙江省';
    var coordinate = [126.08, 48.90];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(hljFeature);
}
function hubeizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([113.14, 31.03]), zoom: 7.6 });
    province = '湖北省';
    var coordinate = [111.64, 31.03];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(hubFeature);
}
function hunanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([112.31, 27.53]), zoom: 7.5 });
    province = '湖南省';
    var coordinate = [111.31, 27.53];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(hunFeature);
}
function jilinzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([127.28, 43.75]), zoom: 7.2 });
    province = '吉林省';
    var coordinate = [125.28, 43.75];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(jlFeature);
}
function jiangsuzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([120.88, 32.96]), zoom: 7.7 });
    province = '江苏省';
    var coordinate = [119.88, 32.96];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(jsFeature);
}
function jiangxizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([116.81, 27.36]), zoom: 7.5 });
    province = '江西省';
    var coordinate = [115.31, 27.36];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(jxFeature);
}
function liaoningzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([123.50, 41.04]), zoom: 7.5 });
    province = '辽宁省';
    var coordinate = [122.50, 41.04];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(lnFeature);
}
function neimengguzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([116.88, 45.43]), zoom: 5.6 });
    province = '内蒙古省';
    var coordinate = [114.88, 43.43];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(nmgFeature);
}
function ningxiazg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([106.78, 37.48]), zoom: 7.6 });
    province = '宁夏省';
    var coordinate = [106.08, 37.48];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(nxFeature);
}
function qinghaizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([97.89, 35.47]), zoom: 6.7 });
    province = '青海省';
    var coordinate = [94.89, 35.47];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(qhFeature);
}
function shandongzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([119.80, 36.57]), zoom: 7.4 });
    province = '山东省';
    var coordinate = [118.80, 36.57];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(sdFeature);
}
function shanxi1zg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([113.23, 37.59]), zoom: 7.2 });
    province = '山西省';
    var coordinate = [112.23, 37.59];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(sx1Feature);
}
function shanxi2zg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([111.22, 35.38]), zoom: 6.8 });
    province = '陕西省';
    var coordinate = [109.22, 35.38];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(sx2Feature);
}
function shanghaizg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([122.02, 31.28]), zoom: 9.5 });
    province = '上海市';
    var coordinate = [121.62, 31.28];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(shFeature);
}
function sichuanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([103.66, 30.11]), zoom: 6.8 });
    province = '四川省';
    var coordinate = [101.66, 30.11];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(scFeature);
}
function taiwanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([121.66, 23.40]), zoom: 8.1 });
    province = '台湾省';
    var coordinate = [121.06, 23.40];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(twFeature);
}
function tianjinzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([118.00, 39.32]), zoom: 8.3 });
    province = '天津市';
    var coordinate = [117.30, 39.32];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(tjFeature);
}
function xizangzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([91.50, 32.30]), zoom: 6.2 });
    province = '西藏省';
    var coordinate = [86.50, 32.30];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(xzFeature);
}
function xinjiangzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([88.79, 41.20]), zoom: 5.7 });
    province = '新疆省';
    var coordinate = [83.79, 41.20];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(xjFeature);
}
function yunnanzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([103.21, 25.40]), zoom: 6.9 });
    province = '云南省';
    var coordinate = [101.21, 25.40];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(ynFeature);
}
function zhejiangzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([120.60, 29.06]), zoom: 7.4 });
    province = '浙江省';
    var coordinate = [119.60, 29.06];
    showZGPopup(province, zgdate);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
    addbjLayer(zjFeature);
}
function aomenzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([113.50, 22.20]), zoom: 10 });
    province = '澳门';
    var coordinate = [113.50, 22.20];
    showZGPopup(province);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
}
function xianggangzg() {
    //map.getView().animate({ center: new ol.proj.fromLonLat([114.50, 22.41]), zoom: 10 });
    province = '香港';
    var coordinate = [114.00, 22.41];
    showZGPopup(province);
    PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
    zgplusshow(province);
}
/*****省交互函数end*****/


//将坐标string改为array
function stringtoarray(array) {
    var array1 = array.split(";");
    var array2 = new Array(array1.length);
    for (var i = 0; i < array1.length; i++) {
        var temp = array1[i].split(",");
        array2[i] = new Array(2);
        array2[i][0] = parseFloat(temp[0]);
        array2[i][1] = parseFloat(temp[1]);
    }
    return array2;
}

/*****阳性轨迹begin*****/
var gjarray = new Array();
var yangxinggj = new ol.geom.LineString(gjarray);
var yangxing_gj = new ol.geom.LineString(gjarray);
var yxFeature;
var geoMarker = new ol.Feature();
var yxSource;
var animating = false;
var yxLayer = new ol.layer.Vector();
//添加轨迹图层
function addYXlayer(res, yxArray) {
    var routelength = new Array(yxArray.length - 1);
    var RouteLength = 0;
    var routelong = 0;
    for (var i = 0; i < yxArray.length - 1; i++) {
        routelength[i] = Math.pow(Math.pow(yxArray[i][0] - yxArray[i + 1][0], 2) + Math.pow(yxArray[i][1] - yxArray[i + 1][1], 2), 0.5);
        RouteLength = RouteLength + routelength[i];
    }
    var yx_Array = new Array();
    yx_Array[0] = yxArray[0];
    for (var i = 0, j = 1; i < yxArray.length - 1; i++) {
        routelong += routelength[i] * 5000
        for (; j < routelong; j++) {
            yx_Array[j] = new Array(2);
            yx_Array[j][0] = yx_Array[j - 1][0] + 1 / 5000.0 * (yxArray[i + 1][0] - yxArray[i][0]) / routelength[i];
            yx_Array[j][1] = yx_Array[j - 1][1] + 1 / 5000.0 * (yxArray[i + 1][1] - yxArray[i][1]) / routelength[i];
        }
    }
    yangxinggj = new ol.geom.LineString(yxArray);
    yangxinggj.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
    yangxing_gj = new ol.geom.LineString(yx_Array);
    yangxing_gj.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
    yxFeature = new ol.Feature({
        type: 'route',
        info: res,
        geometry: yangxinggj
    });
    geoMarker = new ol.Feature({
        type: 'geoMarker',
        geometry: new ol.geom.Point((yangxing_gj.getCoordinates())[0])
    });
    yxSource = new ol.source.Vector({
        features: [yxFeature,geoMarker],
        wrapX: false
    });
    //矢量图层
    yxLayer = new ol.layer.Vector({
        source: yxSource,
        style: function (feature) {
            if (animating && feature.get('type') === 'geoMarker') {
                return null;
            }
            return styles4[feature.get('type')];
        }
        //opacity: 0.5
    });
    map.addLayer(yxLayer);
};
//监听事件
var speed, now;
var moveFeature = function (event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    if (animating) {
        var elapsedTime = frameState.time - now;
        var index = Math.round(speed * elapsedTime / 1000);
        if (index >= (yangxing_gj.getCoordinates()).length) {
            stopAnimation(true);
            return;
        }
        var currentPoint = new ol.geom.Point((yangxing_gj.getCoordinates())[index]);
        var feature = new ol.Feature(currentPoint);
        vectorContext.drawFeature(feature, styles4.geoMarker);
    }
    map.render();
};
//开始动画
function starAnimation() {
    animating = true;
    now = new Date().getTime();
    speed = 300;
    geoMarker.setStyle(null);
    //map.getView().setCenter(center);
    map.on('postcompose', moveFeature);
    map.render();
}
//停止动画
function stopAnimation(ended) {
    animating = false;
    var coord = ended ? (yangxing_gj.getCoordinates())[(yangxing_gj.getCoordinates()).length - 1] : (yangxing_gj.getCoordinates())[0];
    (geoMarker.getGeometry()).setCoordinates(coord);
    map.un('postcompose', moveFeature);
}

//添加轨迹注记圆点
var yxgjMarkerLayer = new ol.layer.Vector();
function addYXMaker(row, resInfoArray) {
    var gjname = (row.GJMC).split("-");
    var minlon = 180;
    var maxlat = 0;
    yxgjMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
    });
    map.addLayer(yxgjMarkerLayer);
    var markerFeature;
    for (var i = 0; i < resInfoArray.length; i++) {
        var lon = resInfoArray[i][0];
        var lat = resInfoArray[i][1];
        var coordinate = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]); //坐标点（ol.coordinate）
        coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        //var imgURL = "Libs/images/sssq-green.png";
        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        markerFeature = new ol.Feature({
            geometry: coordinate, //几何信息（坐标点）
            name: gjname[i],  //名称属性
            type: "gj2",
        });
        markerFeature.setStyle(stylegj);
        yxgjMarkerLayer.getSource().addFeature(markerFeature);
        //寻找中心点
        if (lon < minlon) minlon = lon;
        if (lat > maxlat) maxlat = lat;
    }
    GJcenter = [minlon, maxlat];
}
/*****阳性轨迹end*****/


//定义飞行动画
var weihai = new ol.proj.fromLonLat([122.10, 37.20]);
function flywh() {
    map.getView().animate({ center: weihai, zoom: 10.2 });
}

function tulishow(){
    document.getElementById("click_me").style.display = "none";
    if ($("#tuli").is(":checked")) {
        flywh();
        addHosMarker();
        addHesMarker();
        addJiuMarker();
    }
    else {
        map.removeLayer(hosMarkerLayer);
        map.removeLayer(hesMarkerLayer);
        map.removeLayer(jiuMarkerLayer);
    }
    PopopOverlay.setPosition(undefined);
} 


/*****阳性轨迹绘制add start*****/
var draw;
var draw_array = new Array();
var source = new ol.source.Vector({ wrapX: false });
var drawLayer = new ol.layer.Vector();
var drawResInfoArray = new Array();
var findResInfoArray = new Array();
function adddraw() {
    if (document.getElementById("adddraw").innerHTML == "开始绘制") {
        addInteraction();
        document.getElementById("adddraw").innerHTML = "结束绘制";
    }
    else if (document.getElementById("adddraw").innerHTML == "结束绘制") {
        drawLayer.getSource().clear();
        map.removeInteraction(draw);
        document.getElementById("adddraw").innerHTML = "开始绘制";
    }
}
function addclear() {
    //清空绘制图形
    drawLayer.getSource().clear();
}
function addfind() {
    //查询当日所有轨迹
    callDrawInfo();

    //获取所绘制的点的坐标
    draw_array = [];
    var fea = drawLayer.getSource().getFeatures();
    for (var i = 0; i < fea.length; i++) {
        var poi = fea[i].getGeometry().getCoordinates();
        for (var j = 0; j < poi.length; j++) {
            draw_array.push(ol.proj.transform(poi[j], 'EPSG:3857', 'EPSG:4326'));
        }
    }

    //检测所绘制点与阳性轨迹中的点是否超过一公里（约）
    findResInfoArray = [];
    for (var i = 0; i < drawResInfoArray.length; i++) {
        var line = stringtoarray(drawResInfoArray[i].GJZB);
        for (var j = 0; j < line.length; j++) {
            for (var k = 0; k < draw_array.length; k++) {
                var dis = Math.pow(Math.pow(line[j][0] - draw_array[k][0], 2) + Math.pow(line[j][1] - draw_array[k][1], 2), 0.5);
                if (dis <= 0.003) {
                    findResInfoArray.push(drawResInfoArray[i]);
                    break;
                }
            }
            if (dis <= 0.01) {
                break;
            }
        }
    }

    //填充表格
    document.getElementById("find_result").style.display = "";
    if (findResInfoArray.length != 0) {
        document.getElementById("find_table").style.display = "";
        document.getElementById("find_p").style.display = "none";
        var table = document.getElementById("find_table");
        if (table.rows.length > 1) {
            for (var i = 0; i < table.rows.length - 1; i++) {
                table.tBodies[0].deleteRow(0);
            }
        }
        for (var i in findResInfoArray) {
            show_result(i, table);
        }
    }
    else {
        document.getElementById("find_table").style.display = "none";
        document.getElementById("find_p").style.display = "";
    }
}

function show_result(a, table) {
    let newRow = table.insertRow();
    (newRow.insertCell()).innerHTML = findResInfoArray[a].Number;
    (newRow.insertCell()).innerHTML = findResInfoArray[a].QZDate;
    (newRow.insertCell()).innerHTML = findResInfoArray[a].GJMC;
}

function addInteraction() {
    drawLayer = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ff0000',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ff0000'
                })
            })
        })
    });
    map.addLayer(drawLayer);
    draw = new ol.interaction.Draw({
        //绘制层数据源
        source: source,
        /** @type {ol.geom.GeometryType}几何图形类型 */
        type: 'LineString',
        free: false
    });
    map.addInteraction(draw);
}
function callDrawInfo() {
    var urlStr = encodeURI("Handler.ashx?method=yxgj&oper=riqi&t=" + gjdate2 + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showDrawInfo
    });
}
function showDrawInfo(data) {
    if (drawResInfoArray != null) {
        drawResInfoArray = new Array();
    }
    drawResInfoArray = eval('(' + data + ')');
}
function findclose() {
    document.getElementById("find_result").style.display = "none";
}
/*****阳性轨迹绘制add end*****/

/*****求助信息start*****/
function show_help() {
    var bgcolor = document.getElementById("showhelp").style.backgroundColor;
    if (bgcolor == "rgb(255, 99, 71)") {
        addHelpMarker();
        document.getElementById("showhelp").style.backgroundColor = "rgb(144, 238, 144)";
        document.getElementById("showhelpdetail").innerHTML = "点击隐藏求助信息";
    }
    else {
        map.removeLayer(helpMarkerLayer);
        document.getElementById("showhelp").style.backgroundColor = "rgb(255, 99, 71)";
        document.getElementById("showhelpdetail").innerHTML = "点击显示求助信息";
    }
    PopopOverlay.setPosition(undefined);
}

var helpResInfoArray = new Array();
var helpMarkerLayer = null;
var helpMarkerArray = null;
function addHelpMarker() {
    allLuntanArray();

    //实时雨情标注的矢量图层
    helpMarkerLayer = new ol.layer.Vector({
        source: new ol.source.Vector()
    });
    map.addLayer(helpMarkerLayer);

    var helpMarkerFeature;
    for (var i = 0; i < helpResInfoArray.length; i++) {
        var helpResInfo = helpResInfoArray[i];
        var lon = helpResInfo.Longitude;
        var lat = helpResInfo.Latitude;
        var coordinate = new ol.geom.Point([parseFloat(lon), parseFloat(lat)]); //坐标点（ol.coordinate）parseFloat用于字符串转数字
        coordinate.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        var imgURL = "Libs/images/position.png";
        //新建标注（Vector要素），通过矢量图层添加到地图容器中
        helpMarkerFeature = new ol.Feature({
            geometry: coordinate, //几何信息（坐标点）
            name: helpResInfoArray[i].Theme,  //名称属性
            type: "help",  //类型（河流）
            info: helpResInfo,  //标注的详细信息
            imgURL: imgURL  //标注图标的URL地址
            //fid: "sq" + i.toString()
        });
        helpMarkerFeature.setStyle(createLabelStyle(helpMarkerFeature, imgURL, 0.05));
        helpMarkerLayer.getSource().addFeature(helpMarkerFeature);

        if (helpMarkerArray == null) {
            helpMarkerArray = new Array();
        }
        helpMarkerArray.push(helpMarkerFeature);
    }

}
function allLuntanArray() {
    var urlStr = encodeURI("Handler.ashx?method=luntan&oper=''&help=是&ask=否&disc=否&oth=否&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: showLuntanInfo
    });
}
function showLuntanInfo(data) {
    if (helpResInfoArray != null) {
        helpResInfoArray = new Array();
    }
    helpResInfoArray = eval('(' + data + ')');
}
//求助弹窗
function showHelpPopup(data) {
    var fInfo = data;
    //popup中的内容设置
    var html = '<div style="width:200px;font-size:16px;color:#87CEFA;margin-bottom:-5px"><p>' + fInfo.Theme + '</p></div><hr/>'
        + '<div style="width:200px;font-size:13px;margin-top:-5px"><p><b>求助人：</b>' + fInfo.Author + '</p>'
        + '<p><b>联系方式&地址：</b>' + fInfo.Contact + '</p>'
        + '<p><b>求助等级：</b>' + fInfo.Priority + '</p>'
        + '<p><b>求助内容：</b>' + fInfo.Content + '</p></div> ';
    //获取popup-content标签
    popupCxt = $("#popup-content");
    //设置Popup容器里的内容
    popupCxt.html(html);
}
/*****求助信息start*****/