using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
///RainInfo 的摘要说明
/// </summary>
public class LunTanInfo
{
    public LunTanInfo()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}

    public string Theme { get; set; }        //发表主题
    public string Author { get; set; }        //作者
    public string Content { get; set; }        //发表内容
    public int Click_Number { get; set; }     //点击次数
    public int Reply_Number { get; set; }
    public string Time { get; set; }            //发表时间
    public string Contact { get; set; }        //联系方式或地址
    public string Help { get; set; }
    public string Ask { get; set; }
    public string Discuss { get; set; }
    public string Other { get; set; }
    public string Longitude { get; set; }
    public string Latitude { get; set; }
    public string Priority { get; set; }
    public string Phone { get; set; }
}