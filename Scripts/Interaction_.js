﻿/*@author zjh 2018-08-09 水情表格面板控制*/


function changeZgtable() {
    var cbox_state = $("#cbox_zg").is(":checked");
    
    if (cbox_state) {
        $("#resultpanel").css("display", "block");
        $("#li_zg").css("display", "block");
        //移除之前的高亮样式
        $(".tab-li").removeClass("active");
        $(".tab-pane").removeClass("active");
        //将当前所选表格置于高亮
        $("#li_zg").addClass("active");
        $("#zhonggao").addClass("active");
        /*if ($("#radio_sk").is(":checked")) {
            //显示水库表格
            $("#sqsk").css("display", "block");
            //加载水情—水库标注
            addWaterMarker(sqsk_InfoArray, "marker_sk");
        }
        else {
            //显示河流表格
            $("#sqhl").css("display", "block");
            //加载水情—河流标注
            addWaterMarker(sqhl_InfoArray, "marker_hl");
        }
        if ($("#legend_control_hide").css("display") != "block") {
            //显示图例
            $("#legend_control_show").css("display", "block");
        }*/
    }
    else {
        //删除边界
        map.removeLayer(bjLayer);
        map.removeLayer(zgMarkerLayer);
        var haschecked = false;
        $(".cbox").each(function () {
            if (this.checked == true) {
                haschecked = true;
            }
        });
        if (!haschecked) {
            $("#resultpanel").css("display", "none");
            //关闭图例
            //$("#legend_control_show").css("display", "none");
            //$("#legend_control_hide").css("display", "none");
        }
        else {
            //移除之前的高亮样式
            $(".tab-li").removeClass("active");
            $(".tab-pane").removeClass("active");
            /*if ($("#cbox_yq").is(":checked")) {
                //雨情高亮
                $("#li_yq").addClass("active");
                $("#yuqing").addClass("active");
            }*/
            //else {
                //台风高亮
                $("#li_yx").addClass("active");
                $("#yangxing").addClass("active");
            //}
        }
        //移除当前表格
        $("#li_zg").css("display", "none");
        //$("#sqsk").css("display", "none");
        //$("#sqhl").css("display", "none");
        //去除行高亮背景
        /*$(".success").removeClass('success');
        clearSssqMarker("river");       //清除添加的标注
        clearSssqMarker("Rver");       //清除添加的标注
        map.getView().setZoom(6);*/
    }
    PopopOverlay.setPosition(undefined);
    /*$("#tb_shuiku").bootstrapTable("resetSearch");
    $("#tb_heliu").bootstrapTable("resetSearch");*/
    
}

/*
*@author zjh 2018-08-09 雨情表格面板控制
*/
/*function changeYqtable() {
    var cbox_state = $("#cbox_yq").is(":checked");
    if (cbox_state) {
        $("#resultpanel").css("display", "block");
        $("#li_yq").css("display", "block");
        //移除之前的高亮样式
        $(".tab-li").removeClass("active");
        $(".tab-pane").removeClass("active");
        //将当前所选表格置于高亮
        $("#li_yq").addClass("active");
        $("#yuqing").addClass("active");
        if ($("#radio_ylxx").is(":checked")) {
            //显示雨量信息表格
            $("#div_infoYlxx").css("display", "block");
        }
        else if ($("#radio_gszdyl").is(":checked")) {
            //显示雨量信息表格
            $("#div_infoGszdyl").css("display", "block");
        }
        else {
            //显示河流表格
            $("#div_infoLjtj").css("display", "block");
        }
        //加载雨情标注
        if ($(".ylxxdefault").is(':checked') && Ylxx_data.length <= 0) {
            callRainInfo(50, 99.99);
        }
        addRainMarker();

    }
    else {
        var haschecked = false;
        $(".cbox").each(function () {
            if (this.checked == true) {
                haschecked = true;
            }
        });
        if (!haschecked) {
            $("#resultpanel").css("display", "none");
            //关闭图例
            $("#legend_control_show").css("display", "none");
            $("#legend_control_hide").css("display", "none");
        }
        else {
            //移除之前的高亮样式
            $(".tab-li").removeClass("active");
            $(".tab-pane").removeClass("active");
            if ($("#cbox_sq").is(":checked")) {
                //水情高亮
                $("#li_sq").addClass("active");
                $("#shuiqing").addClass("active");
            }
            else {
                //台风高亮
                $("#li_tf").addClass("active");
                $("#taifeng").addClass("active");
            }
        }
        $("#li_yq").css("display", "none");
        $("#div_infoYlxx").css("display", "none");
        $("#div_infoGszdyl").css("display", "none");
        $("#div_infoLjtj").css("display", "none");
        //去除行高亮背景
        $(".success").removeClass('success');
        clearSsyqMarker(); //移除标注

    }
    PopopOverlay.setPosition(undefined);
}*/

/*
*@author zjh 2018-08-09 台风路径表格面板控制
*/
function changeYxtable() {
    var cbox_state = $("#cbox_yx").is(":checked");
    if (cbox_state) {
        $("#resultpanel").css("display", "block");
        $("#li_yx").css("display", "block");
        $("#yangxing_info").css("display", "block");
        //移除之前的高亮样式
        $(".tab-li").removeClass("active");
        $(".tab-pane").removeClass("active");
        //将当前所选表格置于高亮
        $("#li_yx").addClass("active");
        $("#yangxing").addClass("active");
        
        //$("#yangxing").css("display", "block");
        $("#chonghe").css("display", "block");
        map.addLayer(yxLayer);
        map.addLayer(yxgjMarkerLayer);
        flywh();
        //yangxinggj.appendCoordinate(ol.proj.transform(newPoint, 'EPSG:4326', 'EPSG:3857'));
        //显示台风标注
        /*map.getView().setCenter([12308196.042592192, 2719935.2144997073]);
        map.getView().setZoom(5);
        addTfljLine();
        if ($("#legend_control_hide").css("display") != "block") {
            //显示图例
            $("#legend_control_show").css("display", "block");
        }*/
    }
    else {
        if (yxLayer.getSource()) {
            yxLayer.getSource().clear();
        }
        map.removeLayer(yxLayer);
        if (yxgjMarkerLayer.getSource()) {
            yxgjMarkerLayer.getSource().clear();
        }
        map.removeLayer(yxgjMarkerLayer);
        if (drawLayer.getSource()) {
            drawLayer.getSource().clear();
        }
        map.removeInteraction(draw);
        document.getElementById("adddraw").innerHTML = "开始绘制";
        $("#chonghe").css("display", "none");
        //$("#yangxing").css("display", "none");
        var haschecked = false;
        $(".cbox").each(function () {
            if (this.checked == true) {
                haschecked = true;
            }
        });
        if (!haschecked) {
            $("#resultpanel").css("display", "none");
            //关闭图例
            //$("#legend_control_show").css("display", "none");
            //$("#legend_control_hide").css("display", "none");
        }
        else {
            //移除之前的高亮样式
            $(".tab-li").removeClass("active");
            $(".tab-pane").removeClass("active");
            //if ($("#cbox_sq").is(":checked")) {
                //水情高亮
                $("#li_zg").addClass("active");
                $("#zhonggao").addClass("active");
            /*}
            else {
                //雨情高亮
                $("#li_yq").addClass("active");
                $("#yuqing").addClass("active");
            }*/
        }
        $("#li_yx").css("display", "none");
        $("#yangxing_info").css("display", "none");
        $("#yangxing_lujing").css("display", "none");
        $(".yxlj_label").css("display", "none");
        //去除行高亮背景
        $(".success").removeClass('success');
        //
        //取消table的选中
        //$("#tb_yangxing").bootstrapTable('uncheck', 0);
        /*map.getView().setCenter([12308196.042592192, 2719935.2144997073]);
        map.getView().setZoom(6);
        //清除台风标线
        if (tfljDrawLayer != null) {
            tfljDrawLayer.getSource().clear();
        }
        PopopOverlay.setPosition(undefined);
        //清除台风路径
        clearTfljMarker();
        clearTfljPath();
        clearTimer();
        clearTFCurrentCircle();
        //关闭台风图例
        $("#legend_control").css("display", "none");*/
    }
    PopopOverlay.setPosition(undefined);
}

/***********************************论坛start*******************************/
/*
*	打开新的页面，在新的页面展示卫星云图的信息，此页面无需传入任何参数
*@author fmm 2015-06-24
*/
function openluntan() {   
    $("#dialog").dialog("open"); //打开论坛
}

/***********************************论坛end*******************************/   

/*function showShuiku() {

    $("#sqsk").css("display", "block");
    $("#sqhl").css("display", "none");
    clearSssqMarker("river");       //清除添加的标注
    clearSssqMarker("Rver");       //清除添加的标注
    PopopOverlay.setPosition(undefined);
    addWaterMarker(sqsk_InfoArray, "marker_sk");
}

function showHeliu() {

    $("#sqsk").css("display", "none");
    $("#sqhl").css("display", "block");
    clearSssqMarker("river");       //清除添加的标注
    clearSssqMarker("Rver");       //清除添加的标注
    PopopOverlay.setPosition(undefined);
    addWaterMarker(sqhl_InfoArray, "marker_hl");
}

function showTb_Ylxx() {
    $("#div_infoYlxx").css("display", "block");
    $("#div_infoGszdyl").css("display", "none");
    $("#div_infoLjtj").css("display", "none");

}

function showTb_Gszdyl() {
    $("#div_infoYlxx").css("display", "none");
    $("#div_infoGszdyl").css("display", "block");
    $("#div_infoLjtj").css("display", "none");

}

function showTb_Ljtj() {
    $("#div_infoYlxx").css("display", "none");
    $("#div_infoGszdyl").css("display", "none");
    $("#div_infoLjtj").css("display", "block");

}*/

function legendToggle() {
    $("#legend_control_hide").css("display", "block");
    $("#legend_control_show").css("display", "none");
    document.getElementById("tuli").style.display = "none";
}

function legendShow() {
    $("#legend_control_hide").css("display", "none");
    $("#legend_control_show").css("display", "block");
    document.getElementById("tuli").style.display = "";
}

function closeAll() {
    $(".cbox").prop("checked", false);

    $("#resultpanel").css("display", "none");
    /*//关闭图例
    $("#legend_control_show").css("display", "none");
    $("#legend_control_hide").css("display", "none");*/
    //去除行高亮背景
    $(".success").removeClass('success');
    //移除之前的高亮样式
    $(".tab-li").removeClass("active");
    $(".tab-pane").removeClass("active");
    //清除popup
    //PopopOverlay.setPosition(undefined);
    //移除水情部分
    $("#li_zg").css("display", "none");
    /*$("#sqsk").css("display", "none");
    $("#sqhl").css("display", "none");
    clearSssqMarker("river");       //清除添加的标注
    clearSssqMarker("Rver");       //清除添加的标注
    $("#tb_shuiku").bootstrapTable("resetSearch");
    $("#tb_heliu").bootstrapTable("resetSearch");
    //移除雨情部分
    $("#li_yq").css("display", "none");
    $("#div_infoYlxx").css("display", "none");
    $("#div_infoGszdyl").css("display", "none");
    $("#div_infoLjtj").css("display", "none");
    clearSsyqMarker(); //移除标注*/
    //移除台风部分
    $("#li_yx").css("display", "none");
    $("#yangxing_info").css("display", "none");
    $("#yangxing_lujing").css("display", "none");
    $("#chonghe").css("display", "none");
    $("#find_result").css("display", "none");
    if (yxLayer.getSource()) {
        yxLayer.getSource().clear();
    }
    map.removeLayer(yxLayer);
    if (yxgjMarkerLayer.getSource()) {
        yxgjMarkerLayer.getSource().clear();
    }
    map.removeLayer(yxgjMarkerLayer);
    if (drawLayer.getSource()) {
        drawLayer.getSource().clear();
    }
    map.removeInteraction(draw);
    document.getElementById("adddraw").innerHTML = "开始绘制";
    //$(".tflj_label").css("display", "none");
    //取消table的选中
    //$("#tb_yangxing").bootstrapTable('uncheck', 0);
    /*map.getView().setCenter([12308196.042592192, 2719935.2144997073]);
    map.getView().setZoom(6);
    //清除台风标线
    if (tfljDrawLayer != null) {
        tfljDrawLayer.getSource().clear();
    }
    
    //清除台风路径
    clearTfljMarker();
    clearTfljPath();
    clearTimer();
    clearTFCurrentCircle();*/
}

function yanzheng() {
    var user = "zhangjianhao";
    var mima = "123456";
    var urlStr = encodeURI("Handler2.ashx?user=" + user + "&mima=" + mima + "&" + Math.random());
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: urlStr,
        async: false,
        success: onsuccess
    });

}

function onsuccess(data) {
    var f = data;
    alert(f);
}
