//创建轨迹表格
var gjdate = "2022-03-01", gjdate2 = "2022-03-01";
var gjnumber = 1;
var GJcenter = new Array();
Table_yangxing = function (nameid) {
    var oTableInit = new Object();

    //初始化Table
    oTableInit.Init = function () {
        $('#' + nameid).bootstrapTable({

            toolbar: '#toolbar',                //工具按钮用哪个容器
            method: 'get',                      //请求方式（*）
            url: encodeURI("Handler.ashx?method=yxgj&oper=riqi&t=" + gjdate + "&" + Math.random()), //请求后台的URL（*） -->
            dataType: 'json',

            cache: false,
            striped: true,                       //是否显示行间隔色
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: true,
            sortable: true,                     //是否启用排序
            sortClass: "id",                   //排序方式
            sortName: '人员编号',
            sortOrder: "desc",                   //排序方式
            minimumCountColumns: 2,
            pagination: true,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10],        //可供选择的每页的行数（*）
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',

            search: true,                    //是否显示查询面板
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            responseHandler: oTableInit.responseHandler, //ajax已请求到数据，表格加载数据之前调用函数

            columns: [{
                checkbox: false,
                visible: false
            }, {
                field: 'Number',
                title: '编号',
                width: '30px',
                align: 'center',
                sortable: true,
                /*formatter: function (value, row, index) {
                    //获取每页显示的数量
                    var pageSize = $('#tb_yangxing').bootstrapTable('getOptions').pageSize;
                    //获取当前是第几页
                    var pageNumber = $('#tb_yangxing').bootstrapTable('getOptions').pageNumber;
                    //返回序号，注意index是从0开始的，所以要加上1
                    return index + 1;
                }*/
                }, {
                    field: 'QZDate',
                    title: '确诊日期',
                    width: '30px',
                    align: 'center'

                }, {
                    field: 'GJDate',
                    title: '轨迹日期',
                    width: '30px',
                    align: 'center'

                },{
                    field: 'GJMC',
                    title: '当日轨迹',
                    width: '200px',
                    align: 'center'
                }],

            onClickRow: function (row, element) {
                /*$(".success").removeClass('success');
                $(element).addClass('success'); //添加当前选中的 success样式用于区别
                //                $(element).css("background-color", "#3F8BCA");
                var coordinate = [parseFloat(row.SitePntX), parseFloat(row.SitePntY)]; //获取要素点坐标
                map.getView().setZoom(7);
                map.getView().setCenter(coordinate); //设置地图中心点
                map.once("moveend", function () {
                    if (nameid == "tb_shuiku") {
                        showSssqPopup(row, "Rver");
                    }
                    if (nameid == "tb_heliu") {
                        showSssqPopup(row, "river");
                    }
                });*/
                //加载轨迹图层
                var array = row.GJZB;
                var Array = stringtoarray(array);
                map.removeLayer(yxLayer);
                map.removeLayer(yxgjMarkerLayer);
                addYXlayer(row, Array);
                addYXMaker(row, Array);
                //开始动画
                starAnimation();
                //地图位置移动位置
                //map.getView().animate({ center: new ol.proj.fromLonLat(GJcenter) });
                //弹出弹窗
                var coordinate = GJcenter;
                showGJPopup(row);
                PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
            }
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
        if (nameid == "tb_yangxing") {
            yxgj_InfoArray = res;
        }
        return res;
    };
    return oTableInit;
};

/*Table_chaxun = function (nameid) {
    var oTableInit = new Object();

    //初始化Table
    oTableInit.Init = function () {
        $('#' + nameid).bootstrapTable({

            toolbar: '#toolbar',                //工具按钮用哪个容器
            method: 'get',                      //请求方式（*）
            //url: encodeURI("Handler.ashx?method=yxgj&oper=riqi&t=" + gjdate + "&" + Math.random()), //请求后台的URL（*） -->
            data: JSON.stringify(findResInfoArray),
            dataType: 'json',

            cache: false,
            striped: true,                       //是否显示行间隔色
            sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
            showColumns: true,
            sortable: true,                     //是否启用排序
            sortClass: "id",                   //排序方式
            sortName: '人员编号',
            sortOrder: "desc",                   //排序方式
            minimumCountColumns: 2,
            pagination: true,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10],        //可供选择的每页的行数（*）
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',

            search: false,                    //是否显示查询面板
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            responseHandler: oTableInit.responseHandler, //ajax已请求到数据，表格加载数据之前调用函数

            columns: [{
                checkbox: false,
                visible: false
            }, {
                field: 'Number',
                title: '重合人员编号',
                width: '30px',
                align: 'center',
            }, {
                field: 'QZDate',
                title: '确诊日期',
                width: '30px',
                align: 'center'

            }, {
                field: 'GJMC',
                title: '当日轨迹',
                width: '200px',
                align: 'center'
            }],

            onClickRow: function (row, element) {
                //加载轨迹图层
                var array = row.GJZB;
                var Array = stringtoarray(array);
                map.removeLayer(yxLayer);
                map.removeLayer(yxgjMarkerLayer);
                addYXlayer(row, Array);
                addYXMaker(row, Array);
                //开始动画
                starAnimation();
                //地图位置移动位置
                //map.getView().animate({ center: new ol.proj.fromLonLat(GJcenter) });
                //弹出弹窗
                var coordinate = GJcenter;
                showGJPopup(row);
                PopopOverlay.setPosition(ol.proj.transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
            }
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
        if (nameid == "find_table") {
            find_InfoArray = res;
        }
        return res;
    };
    return oTableInit;
};

//雨情_雨量信息
Table_yqYlxx = function () {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_infoYlxx').bootstrapTable({
            method: 'get',                      //请求方式（*）
            url: encodeURI("Handler.ashx?method=ssyq&oper=rainNum&s=" + s + "&e=" + e + "&minRain=" + minRain + "&maxRain=" + maxRain + "&" + Math.random()), //请求后台的URL（*） -->
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
        Ssyq_InfoArray = res;
        return res;
    };

    return oTableInit;
};

//雨情_各市最大雨量
Table_yqGszdyl = function () {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_infoGszdyl').bootstrapTable({
            //                    toolbar: '',                //工具按钮用哪个容器
            method: 'get',                      //请求方式（*）
            url: encodeURI("Handler.ashx?method=ssyq&oper=rainNum&s=" + s + "&e=" + e + "&minRain=" + minRain + "&maxRain=" + maxRain + "&" + Math.random()), //请求后台的URL（*） -->
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
            }, {
                field: 'Pro',
                title: '城市',
                class: 'w60'

            }, {
                field: 'SiteName',
                title: '地区',
                class: 'w60'
            },{
                field: 'RainNum',
                title: '最大雨量',
                class: 'w70'
            }]
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
Table_yqLjtj = function () {
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
            data: [{
                "Extend": "小于10",
                "SiteNum": "0"
            },
                   {
                       "Extend": "[10,25)",
                       "SiteNum": "0"
                   },
                   {
                       "Extend": "[25,50)",
                       "SiteNum": "0"
                   },
                    {
                        "Extend": "[50,100)",
                        "SiteNum": "5"
                    },
                     {
                         "Extend": "[100,250)",
                         "SiteNum": "0"
                     },
                     {
                         "Extend": "250以上",
                         "SiteNum": "0"
                     }

                         ],

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

//台风
Table_taifeng = function () {
    var oTableInit = new Object();

    //初始化Table
    oTableInit.Init = function () {
        $('#tb_taifeng').bootstrapTable({
            //                    toolbar: '',                //工具按钮用哪个容器
            method: 'get',                      //请求方式（*）
            url: encodeURI("Handler.ashx?method=tflj&oper=tfInfo&" + Math.random()), //请求后台的URL（*） -->
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
            pagination: false,
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 5,                       //每页的记录行数（*）
            pageList: [5, 15, 20, 25],        //可供选择的每页的行数（*）
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
            columns: [{
                checkbox: true,
                visible: true
            }, {
                field: 'windid',
                title: '台风编号',
                class: 'w80'

            }, {
                field: 'windname',
                title: '台风名',
                class: 'w80'
            }, {
                field: 'windeng',
                title: '英文名',
                class: 'w80'
            }
            ],
            onCheck: function (row) {
                $("#taifeng_lujing").css("display", "block");
                $(".tflj_label").css("display", "block");
                //查询台风预测信息
                var urlStr = encodeURI("Handler.ashx?method=tflj&oper=forcastInfo&tfID=" + "200813" + "&" + Math.random());
                $.ajax({
                    type: "get",
                    contentType: "application/json",
                    url: urlStr,
                    async: false,
                    success: tfljForcastOnsuccess
                });
                tfDetailInfoArray = tfPathInfo;
                drawTFPathInfo(tfPathInfo);
                PopopOverlay.setPosition(undefined);
            },
            onUncheck: function () {
                $("#taifeng_lujing").css("display", "none");
                $(".tflj_label").css("display", "none");
                //清除台风路径
                clearTfljMarker();
                clearTfljPath();
                clearTimer();
                clearTFCurrentCircle();
                PopopOverlay.setPosition(undefined);
            }
        });
    };

    return oTableInit;
};

//台风路径
Table_taifenglujing = function () {
    var oTableInit = new Object();

    //初始化Table
    oTableInit.Init = function () {
        $('#tb_taifenglujing').bootstrapTable({
            method: 'get',                      //请求方式（*）
            url: encodeURI("Handler.ashx?method=tflj&oper=detailInfo&tfID=" + "200813" + "&" + Math.random()), //请求后台的URL（*） -->
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
            pageSize: 4,                       //每页的记录行数（*）
            pageList: [4],        //可供选择的每页的行数（*）
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
            columns: [{
                checkbox: false,
                visible: false
            }, {
                field: 'tm',
                title: '时间',
                class: 'w160'

            }, {
                field: 'windstrong',
                title: '风力',
                class: 'w60'
            },{
                field: 'windspeed',
                title: '风速',
                class: 'w60'
              }
            ],
            onClickRow: function (row, element) {
                $(".success").removeClass('success');
                $(element).addClass('success'); //添加当前选中的 success样式用于区别
                //获取要素点坐标
                var coordinate = [parseFloat(row.jindu), parseFloat(row.weidu)]; 
                //设置地图中心点
                map.getView().setCenter(coordinate); 
                map.once("moveend", function () {
                    showTfljPopup(row);
                });
            }
        });
    };

    //加载服务器数据之前的处理程序
    oTableInit.responseHandler = function (res) {
        tfPathInfo = res;
        return res;
    };
    return oTableInit;
};*/