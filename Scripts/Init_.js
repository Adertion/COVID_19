/// <reference path="createtable_.js" />
//表格
var Table_shuiqing;
var Table_yangxing;
var Table_yqYlxx;
var Table_yqGszdyl;
var Table_yqLjtj;
//查询的数据信息
var yxgj_InfoArray;
var find_InfoArray;
var sqsk_InfoArray;
var sqhl_InfoArray;
var Ssyq_InfoArray;
var tfPathInfo;
//地图对象
var map;
//图层组
var LayerArr;
//矢量、影像、地形图层
var vecLayer, imgLayer, terLayer;
//注记图层
var vecZjLayer, imgZjLayer, terZjLayer;
//popup元素
var PopopOverlay;
var popupElement;
var popupClose;
//查询雨量为100的数据

//鼠标选中的前一要素
var preFeature = null;

/**
* 初始化函数
* @author zjh 2018-08-23
*/

/*function tileUrlFunction(coordinate) {         //tileUrlFunction:
        return 'http://mapserver.com/' + coordinate[0] + '/' +
            coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
    }*/

//网站初始化时运行
function init() {
    //地图中心点
    var center = [12308196.042592192, 4019935.2144997073];

    //4.16 libr 实例化鹰眼图
    var overviewMapControl = new ol.control.OverviewMap({
        className: 'ol-overviewmap ol-custom-overviewmap',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
                    wrapX: false
                })
            }),
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610",
                    wrapX: false
                })
            })
        ],
        collapseLabel: '\u00BB',
        label: '\u00AB',
        collapsed: false
    });

    /*let labelStyle = new ol.style.Style({
        text: new ol.style.Text({
            font: 'bold 20px serif',
            text: '北京',
            fill: new ol.style.Fill({
                color: 'rgba(255,0,0,1)'
            })
        })
    });
    let vectorSource = new ol.source.Vector();
    let vectorLayer = new ol.layer.Vector({
        source: vectorSource
    });
    let labelFeature = new ol.Feature({
        geometry: new ol.geom.Point([12956325, 4851028])
    });
    labelFeature.setStyle(labelStyle);
    vectorSource.addFeature(labelFeature);*/

    //获取图层（天地图）
    addBaseLayer();
    //创建地图对象
    map = new ol.Map({
        //添加图层
        layers: [vecLayer, vecZjLayer,
            /*new ol.layer.Tile({
                source: new ol.source.OSM()
            }),*/
        ],
        //目标DIV
        target: 'map',
        controls: ol.control.defaults().extend([overviewMapControl]),//添加鹰眼图
        loadTilesWhileAnimating: true,
        view: new ol.View({
            //投影坐标系
            projection: ol.proj.get('EPSG:3857'), 
            center: center,
            maxZoom: 16,
            minZoom: 2,
            zoom: 6
        })
    });

    /*var ppFeature = new ol.Feature({
        geometry: new ol.geom.Point([122.10, 37.34])
    });
    var ppSource = new ol.source.Vector({
        features: [ppFeature],
        wrapX: false
    });
    //矢量图层
    var ppLayer = new ol.layer.Vector({
        source: ppSource
    });*/
    /*var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    //var title = document.getElementById('popup-title');
    var closer = document.getElementById('popup-closer');
    var popup = new ol.Overlay({
        element: container,
        autoPan: true,
        positioning: 'bottom-center',
        stopEvent: false,
        autoPanAnimation: {
            duration: 250
        }
    });
    //popup.setPosition(coordinate);
    map.addOverlay(popup);
    closer.onclick = function () {
        popup.setPosition(undefined);
        closer.blur();
        return false;
    };
    map.on('singleclick', function (evt) {
        const coordinate = evt.coordinate;
        const hdms = "popup";//toStringHDMS(toLonLat(coordinate));

        content.innerHTML = '<p>YouClickedHere:</p><code>' + hdms + '</code>';
        popup.setPosition(coordinate);
    });*/

    //单击地图上某一要素
    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature1 = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        if (feature1) {
            var type = feature1.get('type');
            var info = feature1.get('info');
            if (type == "route") {
                //水情-河流 Popup
                showGJPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            if (type == "bj") {
                //水情-河流 Popup
                showZGPopup(province, zgdate);
                PopopOverlay.setPosition(coordinate);
            }
            else {
                return;
            }
        }
    });

    //鼠标悬停于地图上某一要素
    map.on('pointermove', function (evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';

        var coordinate = evt.coordinate;
        //判断当前鼠标悬停位置处是否有要素，捕获到要素时设置图标样式
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });

        if (feature) {

            movetype = feature.get('type');
            /*if ((movetype == undefined) || (movetype == "tfMarker") || (movetype == "tfCircle")) {
                return;
            }*/
            //鼠标移动到台风标注时，显示tooltip
            if (movetype == "hos") {
                var info = feature.get('info');
                const coordinate = evt.coordinate;
                showHosPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            if (movetype == "hes") {
                var info = feature.get('info');
                const coordinate = evt.coordinate;
                showHesPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            if (movetype == "jiu") {
                var info = feature.get('info');
                const coordinate = evt.coordinate;
                showJiuPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            if (movetype == "gj2") {
                var info = feature.get('name');
                const coordinate = evt.coordinate;
                showGJPopup2(info);
                PopopOverlay.setPosition(coordinate);
            }
            if (movetype == "help") {
                var info = feature.get('info');
                const coordinate = evt.coordinate;
                showHelpPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            /*if (movetype == "zg") {
                var info = feature.get('info');
                const coordinate = evt.coordinate;
                showArPopup(info);
                PopopOverlay.setPosition(coordinate);
            }
            if ((preFeature != null) && (preFeature !== feature)) { //如果当前选中要素与前一选中要素不同，恢复前一要素样式，放大当前要素图标
                var curImgURL = feature.get('imgURL');
                var preImgURL = preFeature.get('imgURL');
                feature.setStyle(createLabelStyle(feature, curImgURL, 1.2));
                preFeature.setStyle(createLabelStyle(preFeature, preImgURL, 0.8));
                preFeature = feature;
            }
            if (preFeature == null) { //如果前一选中要素为空，即当前选中要素为首次选中要素，放大当前要素图标
                var curImgURL = feature.get('imgURL');
                feature.setStyle(createLabelStyle(feature, curImgURL, 1.2));
                preFeature = feature;
            }*/
        }
        else {
            if (preFeature != null) { //如果鼠标移出前一要素，恢复要素图标样式
                var imgURL = preFeature.get('imgURL');
                preFeature.setStyle(createLabelStyle(preFeature, imgURL, 0.8));
                preFeature = null;
                //if (movetype == "typhoon") {
                    PopopOverlay.setPosition(undefined);
                //}
            }
        }
    });
    //获取popup的容器（弹窗）
    container = document.getElementById('popup');
    //在地图容器中创建一个Overlay
    PopopOverlay = new ol.Overlay(({
        element: container,
        autoPan: true
    }));
    map.addOverlay(PopopOverlay);

    popupClose = $("#popup-closer");
    /**
    * 添加关闭按钮的单击事件（隐藏popup）
    * @return {boolean} Don't follow the href.
    */
    popupClose.bind("click", function () {
        PopopOverlay.setPosition(undefined);  //未定义popup位置
        popupClose.blur(); //失去焦点

    });
    /*map.on('click', function (e) {
        var coordinate = e.coordinate;
        var feature = map.forEachFeatureAtPixel(e.pixel, function (ppFeature, ppLayer) {
            return feature;
        });
        if (feature) {
            // 清空html
            content.innerHTML = '';

            // 城市名称
            var cityName = "威海";//document.createElement('h2');
            cityName.innerText = feature.get('cityName');
            content.appendChild(cityName);

            // 省份编码
            var provinceCode = "000000";//document.createElement('p');
            provinceCode.innerText = '省份编码：' + feature.get('provinceCode');
            content.appendChild(provinceCode);

            // 拼音
            var pinyin = "weihai";//document.createElement('p');
            pinyin.innerText = '拼音：' + feature.get('pinyin');
            content.appendChild(pinyin);

            // 归属
            var attribution = "山东省";//document.createElement('p');
            attribution.innerText = '归属：' + feature.get('attribution');
            content.appendChild(attribution);

            // 城市编码
            var cityCode = "000000";//document.createElement('p');
            cityCode.innerText = '城市编码：' + feature.get('cityCode');
            content.appendChild(cityCode);

            // 邮编
            var postCode = "000000";//document.createElement('p');
            postCode.innerText = '邮编：' + feature.get('postCode');
            content.appendChild(postCode);

            // 经度
            var longitude = "122.10";//document.createElement('p');
            longitude.innerText = '经度：' + feature.get('longitude');
            content.appendChild(longitude);

            // 纬度
            var latitude = "37.34";//document.createElement('p');
            latitude.innerText = '纬度：' + feature.get('latitude');
            content.appendChild(latitude);

            // 弹出popup
            popup.setPosition(coordinate);
        }
    });
    map.on('pointermove', function (e) {
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });*/


    /**
    * 为map添加点击事件监听，渲染弹出popup
    */
    /*map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature1 = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        if (feature1) {
            var type = feature1.get('type');
            var info = feature1.get('info');
            if (type == "river") {
                //水情-河流 Popup
                showSssqPopup(info, "river");
            }
            if (type == "Rver") {
                //水情-河流 Rver
                showSssqPopup(info, "Rver");
            }
            if (type == "sq") {
                //为雨情要素点添加popup的信息内容
                showSsyqPopup(info);
            }
            if (type == "typhoon") {
                //台风popup
                showTfljPopup(info);
            }
            else {
                return;
            }
        }
    });*/

    /**
    * 为map添加move事件监听，变更图标大小实现选中要素的动态效果
    */
    /*map.on('pointermove', function (evt) {
        var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';

        var coordinate = evt.coordinate;
        //判断当前鼠标悬停位置处是否有要素，捕获到要素时设置图标样式
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) { return feature; });
        
        if (feature) {

            movetype = feature.get('type');
            if ((movetype == undefined) || (movetype == "tfMarker") || (movetype == "tfCircle")) {
                return;
            }
            //鼠标移动到台风标注时，显示tooltip
            if (movetype == "typhoon") {
                var info = feature.get('info');
                showTfljPopup(info);
            }
            if ((preFeature != null) && (preFeature !== feature)) { //如果当前选中要素与前一选中要素不同，恢复前一要素样式，放大当前要素图标
                var curImgURL = feature.get('imgURL');
                var preImgURL = preFeature.get('imgURL');
                feature.setStyle(createLabelStyle(feature, curImgURL, 1.2));
                preFeature.setStyle(createLabelStyle(preFeature, preImgURL, 0.8));
                preFeature = feature;
            }
            if (preFeature == null) { //如果前一选中要素为空，即当前选中要素为首次选中要素，放大当前要素图标
                var curImgURL = feature.get('imgURL');
                feature.setStyle(createLabelStyle(feature, curImgURL, 1.2));
                preFeature = feature;
            }
        }
        else {
            if (preFeature != null) { //如果鼠标移出前一要素，恢复要素图标样式
                var imgURL = preFeature.get('imgURL');
                preFeature.setStyle(createLabelStyle(preFeature, imgURL, 0.8));
                preFeature = null;
                if (movetype == "typhoon") {
                    PopopOverlay.setPosition(undefined);
                }
            }
        }
    });*/

    //获取popup的容器
    /*container = document.getElementById('popup');
    //在地图容器中创建一个Overlay
    PopopOverlay = new ol.Overlay(({
        element: container,
        autoPan: true
    }));
    map.addOverlay(PopopOverlay);

    popupClose = $("#popup-closer");*/
    /**
    * 添加关闭按钮的单击事件（隐藏popup）
    * @return {boolean} Don't follow the href.
    */
    /*popupClose.bind("click", function () {
        PopopOverlay.setPosition(undefined);  //未定义popup位置
        popupClose.blur(); //失去焦点

    });*/

    // 初始化互助论坛对话框（卫星云图部分改为互助论坛）
    $("#dialog").dialog({
        modal: true,  // 创建模式对话框
        autoOpen: false, //默认隐藏对话框
        height: 590,
        width: 920,
        minWidth: 920,
        minHeight: 590,
        open: function (event, ui) {
            $("#ltIframe").attr("src", "initial.htm"); //打开对话框时加载卫星云图功能页面
        }
        /*,
        close: function (event, ui) {
            $('#wxyt').attr('checked', false); //关闭对话框时不选中【卫星云图】功能项
        }*/
    });

    //给卫星云图添加关闭按钮的样式
    $(".ui-dialog-titlebar-close").addClass("ui-button");
    $(".ui-dialog-titlebar-close").addClass("ui-widget");
    $(".ui-dialog-titlebar-close").addClass("ui-state-default");
    $(".ui-dialog-titlebar-close").addClass("ui-corner-all");
    $(".ui-dialog-titlebar-close").addClass("ui-button-icon-only");
    $(".ui-dialog-titlebar-close").append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span>');

    /*var finaldots = new Array();
    //获取图形边界范围
    var result = boundary.split(",");
    for (var i = 0; i < result.length; i++) {
        //按照空格分隔字符串
        var dot = result[i].split(" ");
        var mktdot = lonLat2Mercator(parseFloat(dot[0]), parseFloat(dot[1]));
        //将坐标存入结果数组
        finaldots.push([mktdot.x, mktdot.y]);   
    }
   
    //创建边界
    var Polygon = new ol.Feature({
        geometry: new ol.geom.Polygon([finaldots])
    });
    //设置区样式信息
    Polygon.setStyle(new ol.style.Style({
        //边线颜色
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        //形状
        image: new ol.style.Circle({
            radius: 700,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    }));

    //实例化一个矢量图层Vector作为绘制层
    var source = new ol.source.Vector({
        features: [Polygon]
    });
    //创建一个图层
    var vector = new ol.layer.Vector({
        source: source
    });
    //将绘制层添加到地图容器中
    map.addLayer(vector);*/

    //初始化阳性table
    var oTable_yx = new Table_yangxing("tb_yangxing");
    oTable_yx.Init();

    //鼠标悬停效果
    var showhelp = document.getElementById("showhelp");
    var showhelpdetail = document.getElementById("showhelpdetail");
    showhelpdetail.onmouseover = showhelp.onmouseover = function () {
        showhelpdetail.style.display = "";
    }
    showhelpdetail.onmouseout = showhelp.onmouseout = function () {
        showhelpdetail.style.display = "none";
    }
    document.getElementById("showhelpdetail").innerHTML = "点击显示求助信息";
}

/**
* 判断是否为低版本ie浏览器
* @author zjh 2018-08-23
*/
function isIE() {
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

/**
* WGS-84 转 web墨卡托，主要用于将坐标单位为度的值转为单位为米的值
* @param {double} lon 经度
* @param {double} lat 纬度
* @author zjh 2018-08-23
*/
function lonLat2Mercator(lonlat) {
    let x = (lonlat[0] * 20037508.34) / 180
    let y = Math.log(Math.tan(((90 + lonlat[1]) * Math.PI) / 360)) / (Math.PI / 180)
    y = (y * 20037508.34) / 180
    return [x, y];
}

/**
* web墨卡托 转 WGS-84，主要用于将坐标单位为米的值转为单位为度的值
* @param {double} mercatorX X坐标
* @param {double} mercatorY Y坐标
* @author zjh 2018-08-23
*/
function mercator2LonLat(mercatorX, mercatorY) {
    var lon = mercatorX * 180 / 20037508.34;
    var lat = 180 / Math.PI * (2 * Math.atan(Math.exp((mercatorY / 20037508.34) * Math.PI)) - Math.PI / 2);
    return { 'x': lon, 'y': lat };
}

/*
* 根据基地址创建天地图图层
* @param {string} baseurl 天地图图层基地址
* @author zjh 2019-01-16
*/
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

/*
* 加载天地图图层
* @author zjh 2019-01-16
*/
function addBaseLayer() {
    //矢量图层
    vecLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //影像图层
    imgLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //地形图层
    terLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //矢量注记图层
    vecZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //影像注记图层
    imgZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=c1a_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //地形注记图层
    terZjLayer = CreteTDTLayer("http://t0.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=55b4d4eaef95384c946e9bd1b99c5610");
    //图层组
    LayerArr = [vecLayer, imgLayer, terLayer, vecZjLayer, imgZjLayer, terZjLayer];
}