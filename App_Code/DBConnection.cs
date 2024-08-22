using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
///DBConnection 的摘要说明
///@author fmm 2015-06-10
/// </summary>
public class DBConnection
{
    public DBConnection()
    {
        //
        //TODO: 在此处添加构造函数逻辑
        //
    }

    protected static void ConnectSQL(SqlConnection conn)
    {
        if (conn.State == ConnectionState.Closed)
        {
            conn.Open();
        }
        else if (conn.State == ConnectionState.Broken)
        {
            conn.Close();
            conn.Open();
        }
    }

    
    #region 实时水情
    /*
    /// <summary>
    /// 获取水位信息
    /// </summary>
    /// <param name="type"></param>
    /// <returns></returns>
    public static List<WaterInfo> getWaterInfos(string type)
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        List<WaterInfo> List_WaterInfos = new List<WaterInfo>();
        string starSql = "";
        switch (type)
        {
            case "Rver":
                {
                    starSql = "select st_rsvr_r.STCD , st_rsvr_r.RZ, st_rsvr_r.INQ,st_rsvr_r.OTQ,st_rsvr_r.W,st_rsvr_r.TM,st_sitinfo_b.站名,st_sitinfo_b.东经,st_sitinfo_b.北纬, st_sitinfo_b.地址 from st_rsvr_r  INNER JOIN st_sitinfo_b on st_rsvr_r.STCD=st_sitinfo_b.站码 where (st_rsvr_r.RZ>0 and st_rsvr_r.TM='2006-05-10 08:00:00.000')";
                    try
                    {
                        SqlCommand cmd = null;
                        SqlDataAdapter da = null;
                        DataSet ds = null;
                        DataTable dt = null;
                        cmd = new SqlCommand(starSql, conn);
                        da = new SqlDataAdapter(cmd);
                        ds = new DataSet();
                        da.Fill(ds, "ds");
                        dt = ds.Tables[0];
                        WaterInfo tmp;
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            tmp = new WaterInfo();
                            DataRow row = dt.Rows[i];
                            tmp.SiteNum = (Convert.IsDBNull(row["STCD"])) ? 0 : (int)row["STCD"];
                            tmp.SiteName = (Convert.IsDBNull(row["站名"])) ? "" : (string)row["站名"];
                            tmp.SitePntX = (Convert.IsDBNull(row["东经"])) ? "0" : (string)(row["东经"]);// Convert.ToDouble(row["东经"]);
                            tmp.SitePntY = (Convert.IsDBNull(row["北纬"])) ? "0" : (string)(row["北纬"]);
                            tmp.TM = (Convert.IsDBNull(row["TM"])) ? DateTime.Now : (DateTime)row["TM"];
                            tmp.tm = (Convert.IsDBNull(row["TM"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["TM"]).ToLongDateString().ToString();
                            tmp.WaterPos = (Convert.IsDBNull(row["RZ"])) ? "0" : (row["RZ"]).ToString();
                            tmp.FlowNum = (Convert.IsDBNull(row["INQ"])) ? "0" : (row["INQ"]).ToString();
                            tmp.NorNum = (Convert.IsDBNull(row["OTQ"])) ? "0" : (row["OTQ"]).ToString();
                            tmp.WarnNum = (Convert.IsDBNull(row["W"])) ? "0" : (row["W"]).ToString();
                            tmp.SiteAddress = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                            List_WaterInfos.Add(tmp);
                        }

                    }
                    catch
                    {
                        conn.Close();
                    }
                    finally
                    {
                        conn.Close();

                    }
                    break;
                }
            case "river":
                {
                    starSql = "select st_river_r.STCD , st_river_r.Z, st_river_r.Q,st_river_r.TM,st_sitinfo_b.站名,st_sitinfo_b.东经,st_sitinfo_b.北纬, st_sitinfo_b.地址 from st_river_r  INNER JOIN st_sitinfo_b on st_river_r.STCD=st_sitinfo_b.站码 where (st_river_r.Z>0 and st_river_r.TM='2006-05-08  08:00:00.000')";
                    try
                    {
                        SqlCommand cmd = null;
                        SqlDataAdapter da = null;
                        DataSet ds = null;
                        DataTable dt = null;
                        cmd = new SqlCommand(starSql, conn);
                        da = new SqlDataAdapter(cmd);
                        ds = new DataSet();
                        da.Fill(ds, "ds");
                        dt = ds.Tables[0];
                        WaterInfo tmp;
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            tmp = new WaterInfo();
                            DataRow row = dt.Rows[i];
                            tmp.SiteNum = (Convert.IsDBNull(row["STCD"])) ? 0 : (int)row["STCD"];
                            tmp.SiteName = (Convert.IsDBNull(row["站名"])) ? "" : (string)row["站名"];
                            tmp.SitePntX = (Convert.IsDBNull(row["东经"])) ? "0" : (string)(row["东经"]);// Convert.ToDouble(row["东经"]);
                            tmp.SitePntY = (Convert.IsDBNull(row["北纬"])) ? "0" : (string)(row["北纬"]);
                            tmp.TM = (Convert.IsDBNull(row["TM"])) ? DateTime.Now : (DateTime)row["TM"];
                            tmp.tm = (Convert.IsDBNull(row["TM"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["TM"]).ToLongDateString().ToString();
                            tmp.WaterPos = (Convert.IsDBNull(row["Z"])) ? "0" : (row["Z"]).ToString();
                            //   tmp.FlowNum = (Convert.IsDBNull(row["Q"])) ? "0" : (row["Q"]).ToString();
                            tmp.NorNum = (Convert.IsDBNull(row["Q"])) ? "0" : (row["Q"]).ToString();
                            // tmp.WarnNum = (Convert.IsDBNull(row["W"])) ? "0" : (row["W"]).ToString();
                            tmp.SiteAddress = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                            List_WaterInfos.Add(tmp);
                        }

                    }
                    catch
                    {
                        conn.Close();
                    }
                    finally
                    {
                        conn.Close();

                    }
                    break;
                }
        }
        return List_WaterInfos;
    }

    /// <summary>
    /// 获取站点水位信息
    /// </summary>
    /// <param name="SiteNum"></param>
    /// <returns></returns>
    public static List<WaterInfo> getWaterHisInfo(string type, int SiteNum)
    {
        List<WaterInfo> lst_HisInfos = new List<WaterInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["statisticalYQ"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "";
        switch (type)
        {
            case "river":
                {
                    starSql = "select  st_river_r.STCD , st_river_r.Z, st_river_r.TM,st_sitinfo_b.站名, st_sitinfo_b.地址 from st_river_r  INNER JOIN st_sitinfo_b on st_river_r.STCD=st_sitinfo_b.站码 where (st_river_r.STCD=" + SiteNum + " and st_river_r.TM>='2006-05-08  00:00:00.000' and st_river_r.TM<='2006-05-08  23:00:00.000') ORDER BY st_river_r.TM ";
                    try
                    {
                        SqlCommand cmd = null;
                        SqlDataAdapter da = null;
                        DataSet ds = null;
                        DataTable dt = null;
                        cmd = new SqlCommand(starSql, conn);
                        da = new SqlDataAdapter(cmd);
                        ds = new DataSet();
                        da.Fill(ds, "ds");
                        dt = ds.Tables[0];
                        WaterInfo tmp;
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            tmp = new WaterInfo();
                            DataRow row = dt.Rows[i];
                            tmp.SiteNum = (Convert.IsDBNull(row["STCD"])) ? 0 : Convert.ToInt32(row["STCD"]);
                            tmp.SiteName = (Convert.IsDBNull(row["站名"])) ? "" : (string)row["站名"];
                            tmp.SiteAddress = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                            tmp.WaterPos = (Convert.IsDBNull(row["Z"])) ? "0" : (row["Z"]).ToString();
                            tmp.TM = (Convert.IsDBNull(row["TM"])) ? DateTime.Now : (DateTime)row["TM"];
                            tmp.tm = (Convert.IsDBNull(row["TM"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["TM"]).ToLongTimeString();
                            lst_HisInfos.Add(tmp);
                        }
                    }
                    catch
                    {
                        conn.Close();
                    }
                    finally
                    {
                        conn.Close();

                    }
                    break;
                }
            case "Rver":
                {
                    starSql = "select st_rsvr_r.STCD , st_rsvr_r.RZ, st_rsvr_r.TM,st_sitinfo_b.站名, st_sitinfo_b.地址 from st_rsvr_r  INNER JOIN st_sitinfo_b on st_rsvr_r.STCD=st_sitinfo_b.站码 where (st_rsvr_r.STCD=" + SiteNum + " and st_rsvr_r.TM>='2006-05-10 00:00:00.000' and st_rsvr_r.TM<='2006-05-10  23:00:00.000') ORDER BY st_rsvr_r.TM";
                    try
                    {
                        SqlCommand cmd = null;
                        SqlDataAdapter da = null;
                        DataSet ds = null;
                        DataTable dt = null;
                        cmd = new SqlCommand(starSql, conn);
                        da = new SqlDataAdapter(cmd);
                        ds = new DataSet();
                        da.Fill(ds, "ds");
                        dt = ds.Tables[0];
                        WaterInfo tmp;
                        for (int i = 0; i < dt.Rows.Count; i++)
                        {
                            tmp = new WaterInfo();
                            DataRow row = dt.Rows[i];
                            tmp.SiteNum = (Convert.IsDBNull(row["STCD"])) ? 0 : Convert.ToInt32(row["STCD"]);
                            tmp.SiteName = (Convert.IsDBNull(row["站名"])) ? "" : (string)row["站名"];
                            tmp.SiteAddress = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                            tmp.WaterPos = (Convert.IsDBNull(row["RZ"])) ? "0" : (row["RZ"]).ToString();
                            tmp.TM = (Convert.IsDBNull(row["TM"])) ? DateTime.Now : (DateTime)row["TM"];
                            tmp.tm = (Convert.IsDBNull(row["TM"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["TM"]).ToLongTimeString().ToString();
                            lst_HisInfos.Add(tmp);
                        }
                    }
                    catch
                    {
                        conn.Close();
                    }
                    finally
                    {
                        conn.Close();

                    }
                    break;
                }
        }
        return lst_HisInfos;
    }
    */
    #endregion

    #region 台风路径
    /*
    /// <summary>
    /// 获取台风基本信息
    /// </summary>
    /// <returns></returns>
    public static List<WindInfoDTO> ConnectSQLwind_basicinfo()
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string cmdText = "select * from wind_basicinfo";
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        DataSet ds = null;
        DataTable dt = null;
        List<WindInfoDTO> listwindInfoDto = new List<WindInfoDTO>();
        try
        {
            cmd = new SqlCommand(cmdText, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = ds.Tables[0];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];
                WindInfoDTO windInfoDto = new WindInfoDTO();
                windInfoDto.windid = (Convert.IsDBNull(row["windid"])) ? "" : (string)row["windid"];
                windInfoDto.windname = (Convert.IsDBNull(row["windname"])) ? "" : (string)row["windname"];
                windInfoDto.windeng = (Convert.IsDBNull(row["windeng"])) ? "" : (string)row["windeng"];

                listwindInfoDto.Add(windInfoDto);
            }

        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return listwindInfoDto;
    }

    /// <summary>
    /// 获取预测台风详细信息
    /// </summary>
    /// <param name="winID"></param>
    /// <returns></returns>
    public static List<WindForecastDTO> ConnectSQLwindForecastInfo(int winID)
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string cmdText = "select * from wind_forecast where windid= " + winID;
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        DataSet ds = null;
        DataTable dt = null;
        List<WindForecastDTO> listwindForecastDto = new List<WindForecastDTO>();
        try
        {
            cmd = new SqlCommand(cmdText, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = ds.Tables[0];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];
                WindForecastDTO windForecastDto = new WindForecastDTO();
                windForecastDto.windid = (Convert.IsDBNull(row["windid"])) ? Convert.ToInt32("") : Convert.ToInt32(row["windid"]);
                windForecastDto.forecast = (Convert.IsDBNull(row["forecast"])) ? "" : (string)row["forecast"];
                windForecastDto.tm = (Convert.IsDBNull(row["tm"])) ? "" : Convert.ToString(Convert.ToDateTime(row["tm"]));
                windForecastDto.jindu = (Convert.IsDBNull(row["jindu"])) ? Convert.ToSingle("") : Convert.ToSingle(row["jindu"]);
                windForecastDto.weidu = (Convert.IsDBNull(row["weidu"])) ? Convert.ToSingle("") : Convert.ToSingle(row["weidu"]);
                windForecastDto.windstrong = (Convert.IsDBNull(row["windstrong"])) ? "" : (string)row["windstrong"];
                windForecastDto.windspeed = (Convert.IsDBNull(row["windspeed"])) ? "" : (string)row["windspeed"];
                windForecastDto.qiya = (Convert.IsDBNull(row["qiya"])) ? "" : (string)row["qiya"];
                windForecastDto.movedirect = (Convert.IsDBNull(row["movedirect"])) ? "" : (string)row["movedirect"];
                windForecastDto.movespeed = (Convert.IsDBNull(row["movespeed"])) ? "" : (string)row["movespeed"];
                listwindForecastDto.Add(windForecastDto);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();
        }
        return listwindForecastDto;
    }

    /// <summary>
    /// 获取预测台风详细信息
    /// </summary>
    /// <param name="winID"></param>
    /// <returns></returns>
    public static List<WindDetailInfoDTO> ConnectSQLwindDetailInfo(int winID)
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string cmdText = "select * from wind_info where windid= " + winID;
        SqlCommand cmd = null;
        SqlDataAdapter da = null;
        DataSet ds = null;
        DataTable dt = null;
        List<WindDetailInfoDTO> listwindDetailInfoDto = new List<WindDetailInfoDTO>();
        try
        {
            cmd = new SqlCommand(cmdText, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = ds.Tables[0];
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                DataRow row = dt.Rows[i];
                WindDetailInfoDTO windDetailInfoDto = new WindDetailInfoDTO();
                windDetailInfoDto.windid = (Convert.IsDBNull(row["windid"])) ? Convert.ToInt32("") : Convert.ToInt32(row["windid"]);
                windDetailInfoDto.tm = (Convert.IsDBNull(row["tm"])) ? "" : Convert.ToString(Convert.ToDateTime(row["tm"]));
                windDetailInfoDto.jindu = (Convert.IsDBNull(row["jindu"])) ? Convert.ToSingle("") : Convert.ToSingle(row["jindu"]);
                windDetailInfoDto.weidu = (Convert.IsDBNull(row["weidu"])) ? Convert.ToSingle("") : Convert.ToSingle(row["weidu"]);
                windDetailInfoDto.windstrong = (Convert.IsDBNull(row["windstrong"])) ? "" : (string)row["windstrong"];
                windDetailInfoDto.windspeed = (Convert.IsDBNull(row["windspeed"])) ? "" : (string)row["windspeed"];
                windDetailInfoDto.qiya = (Convert.IsDBNull(row["qiya"])) ? "" : (string)row["qiya"];
                windDetailInfoDto.movedirect = (Convert.IsDBNull(row["movedirect"])) ? "" : (string)row["movedirect"];
                windDetailInfoDto.movespeed = (Convert.IsDBNull(row["movespeed"])) ? "" : (string)row["movespeed"];
                windDetailInfoDto.sevradius = (Convert.IsDBNull(row["sevradius"])) ? 0 : Convert.ToInt32(row["sevradius"]);
                windDetailInfoDto.tenradius = (Convert.IsDBNull(row["tenradius"])) ? 0 : Convert.ToInt32(row["tenradius"]);
                listwindDetailInfoDto.Add(windDetailInfoDto);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();
        }
        return listwindDetailInfoDto;
    }
    */
    #endregion

    #region 实时雨情
    /*
    /// <summary>
    /// 获取雨量信息
    /// </summary>
    /// <param name="TimeStar"></param>
    /// <param name="TimeEnd"></param>
    /// <returns></returns>
    public static List<RainInfo> getRainInfo(string TimeStar, string TimeEnd, double MixRain, double MarRain)
    {
        //select st_sitinfo_b.站码 , st_soil_r.Col002,st_soil_r.Col007,st_sitinfo_b.站名,st_sitinfo_b.东经,st_sitinfo_b.北纬, st_sitinfo_b.地址 from st_soil_r  INNER JOIN st_sitinfo_b on st_soil_r.Col001=st_sitinfo_b.站码 where (st_soil_r.Col002<='2008-5-16 17:00:00' and st_soil_r.Col002>='2008-5-16 08:00:00' )
        List<RainInfo> lst_RainInfos = new List<RainInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select st_soil_r.Col001, sum(st_soil_r.Col007) as Col007 from st_soil_r where (st_soil_r.Col002<='" + TimeEnd + "' and st_soil_r.Col002>='" + TimeStar + "')" + " group by st_soil_r.Col001";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            DataSet ds1 = null;
            DataTable dt1 = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = ds.Tables[0];
            RainInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                tmp = new RainInfo();

                DataRow row = dt.Rows[i];

                float j = Convert.ToSingle(row["Col007"]);
                int l = (Convert.IsDBNull(row["Col001"])) ? 0 : Convert.ToInt32(row["Col001"]);

                if (j >= MixRain && j < MarRain)
                {
                    tmp.SiteNum = l;
                    tmp.RainNum = j.ToString();// (Convert.IsDBNull(row["Col007"])) ? 0.0 : Convert.ToDouble(row["Col007"]);
                    string str1 = "select st_sitinfo_b.站名,st_sitinfo_b.东经,st_sitinfo_b.北纬,st_sitinfo_b.地市, st_sitinfo_b.地址 from st_sitinfo_b where 站码= " + tmp.SiteNum;
                    cmd = new SqlCommand(str1, conn);
                    da = new SqlDataAdapter(cmd);
                    ds1 = new DataSet();
                    da.Fill(ds1, "ds1");
                    dt1 = ds1.Tables[0];
                    DataRow row1 = dt1.Rows[0];
                    tmp.SiteName = (Convert.IsDBNull(row1["站名"])) ? "" : (string)row1["站名"];
                    tmp.SitePntX = (Convert.IsDBNull(row1["东经"])) ? "0" : (string)(row1["东经"]);//Convert.ToDouble(row1["东经"]);
                    tmp.SitePntY = (Convert.IsDBNull(row1["北纬"])) ? "0" : (string)(row1["北纬"]);
                    tmp.SiteAddress = (Convert.IsDBNull(row1["地址"])) ? "" : (string)row1["地址"];
                    tmp.Pro = (Convert.IsDBNull(row1["地市"])) ? "" : (string)row1["地市"];
                    lst_RainInfos.Add(tmp);
                }
            }
        }
        catch
        {
        }
        finally
        {
            conn.Close();
        }
        return lst_RainInfos;
    }

    /// <summary>
    /// 获取站点历史雨量信息
    /// </summary>
    /// <param name="SiteNum"></param>
    /// <returns></returns>
    public static List<RainDetailInfo> getSiteHisRainInfos(string TimeStar, string TimeEnd, int SiteNum)
    {
        List<RainDetailInfo> HisInfos = new List<RainDetailInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["GXSLSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select st_sitinfo_b.站码 , st_soil_r.Col007,st_soil_r.Col002,st_sitinfo_b.站名,st_sitinfo_b.地市, st_sitinfo_b.地址 from st_soil_r  INNER JOIN st_sitinfo_b on st_soil_r.Col001=st_sitinfo_b.站码 where (st_soil_r.Col001=" + SiteNum + " and " + "st_soil_r.Col002<='" + TimeEnd + "' and st_soil_r.Col002>='" + TimeStar + "') ORDER BY st_soil_r.Col002";//"st_soil_r.Col002>='2008-05-16 00:00:00' and st_soil_r.Col002<='2008-05-16 23:58:00'
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds);
            dt = new DataTable();
            dt = ds.Tables[0];
            RainDetailInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new RainDetailInfo();
                DataRow row = dt.Rows[i];
                tmp.SiteNum = (Convert.IsDBNull(row["站码"])) ? 0 : Convert.ToInt32(row["站码"]);
                tmp.SiteName = (Convert.IsDBNull(row["站名"])) ? "" : (string)row["站名"];
                tmp.RainNum = (Convert.IsDBNull(row["Col007"])) ? "0" : (row["Col007"]).ToString();
                tmp.SiteAddress = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                tmp.Pro = (Convert.IsDBNull(row["地市"])) ? "" : (string)row["地市"];
                tmp.TM = (Convert.IsDBNull(row["Col002"])) ? DateTime.Now : (DateTime)row["Col002"];
                tmp.tm = (Convert.IsDBNull(row["Col002"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["Col002"]).ToLongTimeString().ToString();
                HisInfos.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return HisInfos;
    }
    */
    #endregion

    public static List<YangXingInfo> getYangXingInfo1(string time) //用日期查询阳性患者的轨迹
    {
        List<YangXingInfo> List_LTInfo = new List<YangXingInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select YXGJ.人员编号, YXGJ.[所在省/直辖市], YXGJ.[所在市/区], YXGJ.确诊日期, YXGJ.显示轨迹日期, YXGJ.轨迹名称数组, YXGJ.轨迹坐标数组, YXGJ.住址 from YXGJ where YXGJ.显示轨迹日期 = '" + time + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = new DataTable();
            dt = ds.Tables[0];
            YangXingInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new YangXingInfo();
                DataRow row = dt.Rows[i];
                tmp.Number = (Convert.IsDBNull(row["人员编号"])) ? 0 : Convert.ToInt32(row["人员编号"]);
                tmp.Province = (Convert.IsDBNull(row["所在省/直辖市"])) ? "" : (string)row["所在省/直辖市"];
                tmp.City = (Convert.IsDBNull(row["所在市/区"])) ? "" : (string)row["所在市/区"];
                tmp.QZDate = (Convert.IsDBNull(row["确诊日期"])) ? DateTime.Now.ToString("d") : ((DateTime)row["确诊日期"]).ToString("d");
                tmp.GJDate = (Convert.IsDBNull(row["显示轨迹日期"])) ? DateTime.Now.ToString("d") : ((DateTime)row["显示轨迹日期"]).ToString("d");
                tmp.GJMC = (Convert.IsDBNull(row["轨迹名称数组"])) ? "" : (string)row["轨迹名称数组"];
                tmp.GJZB = (Convert.IsDBNull(row["轨迹坐标数组"])) ? "" : (string)row["轨迹坐标数组"];
                tmp.Address = (Convert.IsDBNull(row["住址"])) ? "" : (string)row["住址"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }
    public static List<YangXingInfo> getYangXingInfo2(string number) //用人员编号查询该人员确诊前七天轨迹
    {
        List<YangXingInfo> List_LTInfo = new List<YangXingInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select YXGJ.人员编号, YXGJ.[所在省/直辖市], YXGJ.[所在市/区], YXGJ.确诊日期, YXGJ.显示轨迹日期, YXGJ.轨迹名称数组, YXGJ.轨迹坐标数组, YXGJ.住址 from YXGJ where YXGJ.人员编号 = " + number;
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            dt = new DataTable();
            dt = ds.Tables[0];
            YangXingInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new YangXingInfo();
                DataRow row = dt.Rows[i];
                tmp.Number = (Convert.IsDBNull(row["人员编号"])) ? 0 : Convert.ToInt32(row["人员编号"]);
                tmp.Province = (Convert.IsDBNull(row["所在省/直辖市"])) ? "" : (string)row["所在省/直辖市"];
                tmp.City = (Convert.IsDBNull(row["所在市/区"])) ? "" : (string)row["所在市/区"];
                tmp.QZDate = (Convert.IsDBNull(row["确诊日期"])) ? DateTime.Now.ToString("d") : ((DateTime)row["确诊日期"]).ToString("d");
                tmp.GJDate = (Convert.IsDBNull(row["显示轨迹日期"])) ? DateTime.Now.ToString("d") : ((DateTime)row["显示轨迹日期"]).ToString("d");
                tmp.GJMC = (Convert.IsDBNull(row["轨迹名称数组"])) ? "" : (string)row["轨迹名称数组"];
                tmp.GJZB = (Convert.IsDBNull(row["轨迹坐标数组"])) ? "" : (string)row["轨迹坐标数组"];
                tmp.Address = (Convert.IsDBNull(row["住址"])) ? "" : (string)row["住址"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<LunTanInfo> getLunTanInfo(string help, string ask, string discuss, string other) //查询该类型所有帖子
    {
        List<LunTanInfo> List_LTInfo = new List<LunTanInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "";
        if (help == "是")
        {
            if (ask == "是")
            {
                if (discuss == "是")
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.问答='" + ask + "'or LunTan.讨论='" + discuss + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.问答='" + ask + "'or LunTan.讨论='" + discuss + "'";
                    }
                }
                else
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.问答='" + ask + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.问答='" + ask + "'";
                    }
                }
            }
            else
            {
                if (discuss == "是")
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.讨论='" + discuss + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.讨论='" + discuss + "'";
                    }
                }
                else
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.求助='" + help + "'";
                    }
                }
            }
        }
        else
        {
            if (ask == "是")
            {
                if (discuss == "是")
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.问答='" + ask + "'or LunTan.讨论='" + discuss + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.问答='" + ask + "'or LunTan.讨论='" + discuss + "'";
                    }
                }
                else
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.问答='" + ask + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.问答='" + ask + "'";
                    }
                }
            }
            else
            {
                if (discuss == "是")
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.讨论='" + discuss + "'or LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.讨论='" + discuss + "'";
                    }
                }
                else
                {
                    if (other == "是")
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.其他='" + other + "'";
                    }
                    else
                    {
                        starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.其他='//'";
                    }
                }
            }
        }
        try 
        {         
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            LunTanInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new LunTanInfo();
                DataRow row = dt.Rows[i];
                tmp.Theme = (Convert.IsDBNull(row["theme"])) ? "" : (string)row["theme"];
                tmp.Author = (Convert.IsDBNull(row["author"])) ? "" : (string)row["author"];
                tmp.Content = (Convert.IsDBNull(row["content"])) ? "" : (string)row["content"];
                tmp.Click_Number = (Convert.IsDBNull(row["click_numner"])) ? 0 : Convert.ToInt32(row["click_numner"]);
                tmp.Reply_Number = (Convert.IsDBNull(row["reply_number"])) ? 0 : Convert.ToInt32(row["reply_number"]);
                tmp.Time = (Convert.IsDBNull(row["time"])) ? DateTime.Now.ToString() : ((DateTime)row["time"]).ToString();
                tmp.Contact = (Convert.IsDBNull(row["contact"])) ? "" : (string)row["contact"];
                tmp.Help = (Convert.IsDBNull(row["求助"])) ? "" : (string)row["求助"];
                tmp.Ask = (Convert.IsDBNull(row["问答"])) ? "" : (string)row["问答"];
                tmp.Discuss = (Convert.IsDBNull(row["讨论"])) ? "" : (string)row["讨论"];
                tmp.Other = (Convert.IsDBNull(row["其他"])) ? "" : (string)row["其他"];
                tmp.Longitude = (Convert.IsDBNull(row["longitude"])) ? "" : (string)row["longitude"];
                tmp.Latitude = (Convert.IsDBNull(row["latitude"])) ? "" : (string)row["latitude"];
                tmp.Priority = (Convert.IsDBNull(row["priority"])) ? "" : (string)row["priority"];
                tmp.Phone = (Convert.IsDBNull(row["author_phone"])) ? "" : (string)row["author_phone"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<LunTanInfo> getUserLunTanInfo(string phone) //用手机号查询该用户信息
    {
        List<LunTanInfo> List_LTInfo = new List<LunTanInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.author_phone='" + phone + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            LunTanInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new LunTanInfo();
                DataRow row = dt.Rows[i];
                tmp.Theme = (Convert.IsDBNull(row["theme"])) ? "" : (string)row["theme"];
                tmp.Author = (Convert.IsDBNull(row["author"])) ? "" : (string)row["author"];
                tmp.Content = (Convert.IsDBNull(row["content"])) ? "" : (string)row["content"];
                tmp.Click_Number = (Convert.IsDBNull(row["click_numner"])) ? 0 : Convert.ToInt32(row["click_numner"]);
                tmp.Reply_Number = (Convert.IsDBNull(row["reply_number"])) ? 0 : Convert.ToInt32(row["reply_number"]);
                tmp.Time = (Convert.IsDBNull(row["time"])) ? DateTime.Now.ToString() : ((DateTime)row["time"]).ToString();
                tmp.Contact = (Convert.IsDBNull(row["contact"])) ? "" : (string)row["contact"];
                tmp.Help = (Convert.IsDBNull(row["求助"])) ? "" : (string)row["求助"];
                tmp.Ask = (Convert.IsDBNull(row["问答"])) ? "" : (string)row["问答"];
                tmp.Discuss = (Convert.IsDBNull(row["讨论"])) ? "" : (string)row["讨论"];
                tmp.Other = (Convert.IsDBNull(row["其他"])) ? "" : (string)row["其他"];
                tmp.Longitude = (Convert.IsDBNull(row["longitude"])) ? "" : (string)row["longitude"];
                tmp.Latitude = (Convert.IsDBNull(row["latitude"])) ? "" : (string)row["latitude"];
                tmp.Priority = (Convert.IsDBNull(row["priority"])) ? "" : (string)row["priority"];
                tmp.Phone = (Convert.IsDBNull(row["author_phone"])) ? "" : (string)row["author_phone"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<LunTanInfo> getReplyLunTanInfo(string theme, string author, string time, string phone) //查询某个帖子的详细信息
    {
        List<LunTanInfo> List_LTInfo = new List<LunTanInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select LunTan.theme, LunTan.author, LunTan.[content], LunTan.click_numner, LunTan.time, LunTan.contact, LunTan.求助, LunTan.问答, LunTan.讨论, LunTan.其他, LunTan.longitude, LunTan.latitude, LunTan.priority, LunTan.reply_number, LunTan.author_phone from LunTan where LunTan.author_phone='" + phone + "' and LunTan.theme='" + theme + "' and LunTan.author='" + author + "' and LunTan.time='" + time + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            LunTanInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new LunTanInfo();
                DataRow row = dt.Rows[i];
                tmp.Theme = (Convert.IsDBNull(row["theme"])) ? "" : (string)row["theme"];
                tmp.Author = (Convert.IsDBNull(row["author"])) ? "" : (string)row["author"];
                tmp.Content = (Convert.IsDBNull(row["content"])) ? "" : (string)row["content"];
                tmp.Click_Number = (Convert.IsDBNull(row["click_numner"])) ? 0 : Convert.ToInt32(row["click_numner"]);
                tmp.Reply_Number = (Convert.IsDBNull(row["reply_number"])) ? 0 : Convert.ToInt32(row["reply_number"]);
                tmp.Time = (Convert.IsDBNull(row["time"])) ? DateTime.Now.ToString() : ((DateTime)row["time"]).ToString();
                tmp.Contact = (Convert.IsDBNull(row["contact"])) ? "" : (string)row["contact"];
                tmp.Help = (Convert.IsDBNull(row["求助"])) ? "" : (string)row["求助"];
                tmp.Ask = (Convert.IsDBNull(row["问答"])) ? "" : (string)row["问答"];
                tmp.Discuss = (Convert.IsDBNull(row["讨论"])) ? "" : (string)row["讨论"];
                tmp.Other = (Convert.IsDBNull(row["其他"])) ? "" : (string)row["其他"];
                tmp.Longitude = (Convert.IsDBNull(row["longitude"])) ? "" : (string)row["longitude"];
                tmp.Latitude = (Convert.IsDBNull(row["latitude"])) ? "" : (string)row["latitude"];
                tmp.Priority = (Convert.IsDBNull(row["priority"])) ? "" : (string)row["priority"];
                tmp.Phone = (Convert.IsDBNull(row["author_phone"])) ? "" : (string)row["author_phone"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static void addLunTanInfo(string theme, string author, string content, string contact, string help, string ask, string discuss, string other, string longitude, string latitude, string priority, string phone) //发表一个新帖子
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        DateTime time = DateTime.Now;
        string sql = "insert into LunTan values('0', '" + time + "', '" + theme + "', '" + author + "', '" + content + "', '" + contact + "', '" + help + "', '" + ask + "', '" + discuss + "', '" + other + "', '" + longitude + "', '" + latitude + "', '" + priority + "', '0', '" + phone + "')";
        try {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void updateLTclickInfo(string click_number, string time, string author, string theme) //点击次数+1
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string sql = "update LunTan set LunTan.click_numner =" + click_number + " where LunTan.time='" + time + "' and LunTan.theme='" + theme + "' and LunTan.author='" + author + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void updateLTreplyInfo(string reply_number, string time, string author, string theme) //回复数+1
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string sql = "update LunTan set LunTan.reply_number =" + reply_number + " where LunTan.time='" + time + "' and LunTan.theme='" + theme + "' and LunTan.author='" + author + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void addUserInfo(string PN, string name, string passward, string gender) //新注册一用户
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        DateTime time = DateTime.Now;
        string sql = "insert into [User] values('" + PN + "', '" + passward + "', '" + gender + "', '" + time + "', '" + name + "','用户')";
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static List<User> getUserRepInfo(string PN) //用手机号查询该用户详细信息
    {
        List<User> List_LTInfo = new List<User>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select [User].PhoneNumber, [User].Passward, [User].Gender, [User].RegisterTime, [User].Name, [User].[Identity] from [User] where [User].PhoneNumber='" + PN + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            User tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new User();
                DataRow row = dt.Rows[i];
                tmp.PhoneNumber = (Convert.IsDBNull(row["PhoneNumber"])) ? "" : (string)row["PhoneNumber"];
                tmp.Name = (Convert.IsDBNull(row["Name"])) ? "" : (string)row["Name"];
                tmp.Passward = (Convert.IsDBNull(row["Passward"])) ? "" : (string)row["Passward"];
                tmp.Gender = (Convert.IsDBNull(row["Gender"])) ? "" : (string)row["Gender"];
                tmp.Time = (Convert.IsDBNull(row["RegisterTime"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["RegisterTime"]).ToLongDateString().ToString();
                tmp.TimeString = (Convert.IsDBNull(row["RegisterTime"])) ? DateTime.Now.ToString() : ((DateTime)row["RegisterTime"]).ToString();
                tmp.Identity = (Convert.IsDBNull(row["Identity"])) ? "" : (string)row["Identity"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<User> getAllUserInfo() //查询所有用户（管理员）
    {
        List<User> List_LTInfo = new List<User>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select [User].PhoneNumber, [User].Passward, [User].Gender, [User].RegisterTime, [User].Name, [User].[Identity] from [User]";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            User tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new User();
                DataRow row = dt.Rows[i];
                tmp.PhoneNumber = (Convert.IsDBNull(row["PhoneNumber"])) ? "" : (string)row["PhoneNumber"];
                tmp.Name = (Convert.IsDBNull(row["Name"])) ? "" : (string)row["Name"];
                tmp.Passward = (Convert.IsDBNull(row["Passward"])) ? "" : (string)row["Passward"];
                tmp.Gender = (Convert.IsDBNull(row["Gender"])) ? "" : (string)row["Gender"];
                tmp.Time = (Convert.IsDBNull(row["RegisterTime"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["RegisterTime"]).ToLongDateString().ToString();
                tmp.TimeString= (Convert.IsDBNull(row["RegisterTime"])) ? DateTime.Now.ToString() : ((DateTime)row["RegisterTime"]).ToString();
                tmp.Identity = (Convert.IsDBNull(row["Identity"])) ? "" : (string)row["Identity"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static void updateUserIdentityInfo(string identity, string PhoneNumber, string Name, string RegisterTime) //更新该用户的身份（管理员）
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string sql = "update [User] set [User].[Identity] ='" + identity + "' where [User].PhoneNumber='" + PhoneNumber + "' and [User].Name='" + Name + "' and [User].RegisterTime='" + RegisterTime + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static List<ReplyInfo> getReplyInfo(string uptheme, string upauthor, string uptime) //查询某帖子的所有回复
    {
        List<ReplyInfo> List_LTInfo = new List<ReplyInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select ToReply.UpTheme, ToReply.UpAuthor, ToReply.UpTime, ToReply.ReAuthor, ToReply.ReContent, ToReply.ReTime, ToReply.UpPhone, ToReply.RePhone from ToReply where ToReply.UpTheme='" + uptheme + "' and ToReply.UpAuthor='" + upauthor + "' and ToReply.UpTime='" + uptime + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            ReplyInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new ReplyInfo();
                DataRow row = dt.Rows[i];
                tmp.UpTheme = (Convert.IsDBNull(row["UpTheme"])) ? "" : (string)row["UpTheme"];
                tmp.UpAuthor = (Convert.IsDBNull(row["UpAuthor"])) ? "" : (string)row["UpAuthor"];
                tmp.UpTime = (Convert.IsDBNull(row["UpTime"])) ? DateTime.Now.ToString() : ((DateTime)row["UpTime"]).ToString();
                tmp.ReAuthor = (Convert.IsDBNull(row["ReAuthor"])) ? "" : (string)row["ReAuthor"];
                tmp.ReContent = (Convert.IsDBNull(row["ReContent"])) ? "" : (string)row["ReContent"];
                tmp.ReTime = (Convert.IsDBNull(row["ReTime"])) ? DateTime.Now.ToString() : ((DateTime)row["ReTime"]).ToString();
                tmp.UpPhone = (Convert.IsDBNull(row["UpPhone"])) ? "" : (string)row["UpPhone"];
                tmp.RePhone = (Convert.IsDBNull(row["RePhone"])) ? "" : (string)row["RePhone"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<ReplyInfo> getUserReplyInfo(string phone, string name) //查询某用户的所有回复
    {
        List<ReplyInfo> List_LTInfo = new List<ReplyInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select ToReply.UpTheme, ToReply.UpAuthor, ToReply.UpTime, ToReply.ReAuthor, ToReply.ReContent, ToReply.ReTime, ToReply.UpPhone, ToReply.RePhone from ToReply where ToReply.RePhone='" + phone + "' and ToReply.ReAuthor='" + name + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            ReplyInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new ReplyInfo();
                DataRow row = dt.Rows[i];
                tmp.UpTheme = (Convert.IsDBNull(row["UpTheme"])) ? "" : (string)row["UpTheme"];
                tmp.UpAuthor = (Convert.IsDBNull(row["UpAuthor"])) ? "" : (string)row["UpAuthor"];
                tmp.UpTime = (Convert.IsDBNull(row["UpTime"])) ? DateTime.Now.ToString() : ((DateTime)row["UpTime"]).ToString();
                tmp.ReAuthor = (Convert.IsDBNull(row["ReAuthor"])) ? "" : (string)row["ReAuthor"];
                tmp.ReContent = (Convert.IsDBNull(row["ReContent"])) ? "" : (string)row["ReContent"];
                tmp.ReTime = (Convert.IsDBNull(row["ReTime"])) ? DateTime.Now.ToString() : ((DateTime)row["ReTime"]).ToString();
                tmp.UpPhone = (Convert.IsDBNull(row["UpPhone"])) ? "" : (string)row["UpPhone"];
                tmp.RePhone = (Convert.IsDBNull(row["RePhone"])) ? "" : (string)row["RePhone"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static void addReplyInfo(string UTh, string UA, string UTi, string RA, string RC, string UP, string RP) //发表新回复
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        DateTime RTime = DateTime.Now;
        DateTime UTime = Convert.ToDateTime(UTi);
        string sql = "insert into ToReply values('" + UTh + "', '" + UA + "', '" + UTime + "', '" + RA + "', '" + RC + "', '" + RTime + "', '" + UP + "', '" + RP + "')";
        try
        {
            SqlCommand cmd = new SqlCommand(sql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void deleteLuntanInfo(string theme, string author,string time) //删除某一帖子
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "delete from LunTan where LunTan.theme='" + theme + "' and LunTan.author='" + author + "' and LunTan.time='" + time + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(starSql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void deleteLuntanReplyInfo(string theme, string author, string time) //删除某帖子时同时删除该贴的所有回复
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "delete from ToReply where ToReply.UpTheme='" + theme + "' and ToReply.UpAuthor='" + author + "' and ToReply.UpTime='" + time + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(starSql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static void deleteReplyInfo(string recontent, string rephone, string retime) //删除某一回复
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "delete from ToReply where ToReply.ReContent='" + recontent + "' and ToReply.RePhone='" + rephone + "' and ToReply.ReTime='" + retime + "'";
        try
        {
            SqlCommand cmd = new SqlCommand(starSql, conn);
            cmd.ExecuteNonQuery();
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
    }

    public static List<YiYuanInfo> getYiYuanInfo() //查询医院
    {
        List<YiYuanInfo> List_LTInfo = new List<YiYuanInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select YiYuan.医院坐标, YiYuan.[所属省份/直辖市], YiYuan.[所属市/区], YiYuan.详细地址, YiYuan.经济类型代码, YiYuan.[电话号码（总机）], YiYuan.医院名称 from YiYuan";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            YiYuanInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new YiYuanInfo();
                DataRow row = dt.Rows[i];
                tmp.Daima = (Convert.IsDBNull(row["经济类型代码"])) ? 0 : Convert.ToInt32(row["经济类型代码"]);
                tmp.Sheng = (Convert.IsDBNull(row["所属省份/直辖市"])) ? "" : (string)row["所属省份/直辖市"];
                tmp.Shi = (Convert.IsDBNull(row["所属市/区"])) ? "" : (string)row["所属市/区"];
                tmp.Call = (Convert.IsDBNull(row["电话号码（总机）"])) ? "" : (string)row["电话号码（总机）"];
                tmp.HospitalName = (Convert.IsDBNull(row["医院名称"])) ? "" : (string)row["医院名称"];
                tmp.Address = (Convert.IsDBNull(row["详细地址"])) ? "" : (string)row["详细地址"];
                tmp.Zuobiao = (Convert.IsDBNull(row["医院坐标"])) ? "" : (string)row["医院坐标"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<HeSuanInfo> getHeSuanInfo() //查询核酸采样机构
    {
        List<HeSuanInfo> List_LTInfo = new List<HeSuanInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select HeSuan.纬度, HeSuan.经度, HeSuan.城市, HeSuan.详细地址, HeSuan.是否24h提供核酸检测, HeSuan.名称, HeSuan.电话 from HeSuan";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            HeSuanInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new HeSuanInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Address = (Convert.IsDBNull(row["详细地址"])) ? "" : (string)row["详细地址"];
                tmp.Call = (Convert.IsDBNull(row["电话"])) ? "" : (string)row["电话"];
                tmp.Name = (Convert.IsDBNull(row["名称"])) ? "" : (string)row["名称"];
                tmp.Whether = (Convert.IsDBNull(row["是否24h提供核酸检测"])) ? "" : (string)row["是否24h提供核酸检测"];
                tmp.City = (Convert.IsDBNull(row["城市"])) ? "" : (string)row["城市"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<JiJiuInfo> getJiJiuInfo() //查询急救站点
    {
        List<JiJiuInfo> List_LTInfo = new List<JiJiuInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select JiJiu.纬度, JiJiu.经度, JiJiu.所属区域, JiJiu.地址, JiJiu.急救站名称, JiJiu.联系电话 from JiJiu";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            JiJiuInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new JiJiuInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Address = (Convert.IsDBNull(row["地址"])) ? "" : (string)row["地址"];
                tmp.Call = (Convert.IsDBNull(row["联系电话"])) ? "" : (string)row["联系电话"];
                tmp.Name = (Convert.IsDBNull(row["急救站名称"])) ? "" : (string)row["急救站名称"];
                tmp.City = (Convert.IsDBNull(row["所属区域"])) ? "" : (string)row["所属区域"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<ZhongInfo> getZhongInfo(string pz) //查询某省所有中风险地区
    {
        List<ZhongInfo> List_LTInfo = new List<ZhongInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select ZhongFx.纬度, ZhongFx.经度, ZhongFx.统计日期, ZhongFx.省份, ZhongFx.市区, ZhongFx.中风险地区 from ZhongFx where ZhongFX.省份 = '" + pz + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            ZhongInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new ZhongInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Date = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now : (DateTime)row["统计日期"];
                tmp.DateString = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["统计日期"]).ToLongDateString().ToString();
                tmp.Sheng = (Convert.IsDBNull(row["省份"])) ? "" : (string)row["省份"];
                tmp.Shi = (Convert.IsDBNull(row["市区"])) ? "" : (string)row["市区"];
                tmp.Area = (Convert.IsDBNull(row["中风险地区"])) ? "" : (string)row["中风险地区"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<GaoInfo> getGaoInfo(string pg) //查询某省所有高风险地区
    {
        List<GaoInfo> List_LTInfo = new List<GaoInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select GaoFx.纬度, GaoFx.经度, GaoFx.统计日期, GaoFx.省份, GaoFx.市区, GaoFx.高风险地区 from GaoFx where GaoFX.省份 = '" + pg + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            GaoInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new GaoInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Date = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now : (DateTime)row["统计日期"];
                tmp.DateString = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["统计日期"]).ToLongDateString().ToString();
                tmp.Sheng = (Convert.IsDBNull(row["省份"])) ? "" : (string)row["省份"];
                tmp.Shi = (Convert.IsDBNull(row["市区"])) ? "" : (string)row["市区"];
                tmp.Area = (Convert.IsDBNull(row["高风险地区"])) ? "" : (string)row["高风险地区"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<ZhongInfo> getAllZhongInfo(string date) //查询全国所有中风险地区
    {
        List<ZhongInfo> List_LTInfo = new List<ZhongInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select ZhongFx.纬度, ZhongFx.经度, ZhongFx.统计日期, ZhongFx.省份, ZhongFx.市区, ZhongFx.中风险地区 from ZhongFx where ZhongFX.统计日期 = '" + date + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            ZhongInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new ZhongInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Date = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now : (DateTime)row["统计日期"];
                tmp.DateString = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["统计日期"]).ToLongDateString().ToString();
                tmp.Sheng = (Convert.IsDBNull(row["省份"])) ? "" : (string)row["省份"];
                tmp.Shi = (Convert.IsDBNull(row["市区"])) ? "" : (string)row["市区"];
                tmp.Area = (Convert.IsDBNull(row["中风险地区"])) ? "" : (string)row["中风险地区"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }

    public static List<GaoInfo> getAllGaoInfo(string date) //查询全国所有高风险地区
    {
        List<GaoInfo> List_LTInfo = new List<GaoInfo>();
        SqlConnection conn = new SqlConnection(ConfigurationManager.AppSettings["YQSql"]);        //数据库连接对象
        ConnectSQL(conn);
        string starSql = "select GaoFx.纬度, GaoFx.经度, GaoFx.统计日期, GaoFx.省份, GaoFx.市区, GaoFx.高风险地区 from GaoFx where GaoFX.统计日期 = '" + date + "'";
        try
        {
            SqlCommand cmd = null;
            SqlDataAdapter da = null;
            DataSet ds = null;
            DataTable dt = null;
            cmd = new SqlCommand(starSql, conn);
            da = new SqlDataAdapter(cmd);
            ds = new DataSet();
            da.Fill(ds, "ds");
            //dt = new DataTable();
            dt = ds.Tables[0];
            GaoInfo tmp;
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                tmp = new GaoInfo();
                DataRow row = dt.Rows[i];
                tmp.Lon = (Convert.IsDBNull(row["经度"])) ? 0 : (double)row["经度"];
                tmp.Lat = (Convert.IsDBNull(row["纬度"])) ? 0 : (double)row["纬度"];
                tmp.Date = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now : (DateTime)row["统计日期"];
                tmp.DateString = (Convert.IsDBNull(row["统计日期"])) ? DateTime.Now.ToLongDateString().ToString() : ((DateTime)row["统计日期"]).ToLongDateString().ToString();
                tmp.Sheng = (Convert.IsDBNull(row["省份"])) ? "" : (string)row["省份"];
                tmp.Shi = (Convert.IsDBNull(row["市区"])) ? "" : (string)row["市区"];
                tmp.Area = (Convert.IsDBNull(row["高风险地区"])) ? "" : (string)row["高风险地区"];
                List_LTInfo.Add(tmp);
            }
        }
        catch
        {
            conn.Close();
        }
        finally
        {
            conn.Close();

        }
        return List_LTInfo;
    }
}