using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// GaoInfo 的摘要说明
/// </summary>
public class GaoInfo
{
    public GaoInfo()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public double Lon { get; set; }

    public double Lat { get; set; }

    public DateTime Date { get; set; }

    public string DateString { get; set; }

    public string Sheng { get; set; }

    public string Shi { get; set; }

    public string Area { get; set; }
}