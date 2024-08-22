using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// YangXingInfo 的摘要说明
/// </summary>
public class YangXingInfo
{
	public YangXingInfo()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
	}
	public int Number { get; set; }            //次序
    public string Province { get; set; }        //发表主题
    public string City { get; set; }        //作者
    public string QZDate { get; set; }        //发表内容
    public string GJDate { get; set; }     //点击次数
    public string GJMC { get; set; }            //发表时间
    public string GJZB { get; set; }        //联系方式或地址
	public string Address { get; set; }
}