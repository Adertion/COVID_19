using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using System.Data;
using System.Data.OleDb;
using System.Configuration;

/// <summary>
///Sample 的摘要说明
/// </summary>
public class Sample
{
    public Sample()
    {
    }

    #region 实时水情模块
    /*
    /// <summary>
    ///获取水位信息
    /// </summary>
    /// <returns></returns>
    public static string showWaterInfo(string type)
    {
        List<WaterInfo> listSite = DBConnection.getWaterInfos(type);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }
    /// <summary>
    /// 站点水位信息
    /// </summary>
    /// <param name="type"></param>
    /// <param name="SiteNum"></param>
    /// <returns></returns>
    public static string showSiteWaterHisInfos(string type, int SiteNum)
    {
        List<WaterInfo> listSite = DBConnection.getWaterHisInfo(type, SiteNum);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }
    */
    #endregion

    #region 台风路径模块
    /*
    /// <summary>
    /// //获取台风基本信息
    /// </summary>
    /// <returns></returns>
    public static string showWindbasicInfo()
    {
        List<WindInfoDTO> listWindBasicInfo = DBConnection.ConnectSQLwind_basicinfo();
        string resInfo = ConvertToJson(listWindBasicInfo);
        return resInfo;
    }

    /// <summary>
    /// 获取台风预测信息
    /// </summary>
    /// <param name="winid"></param>
    /// <returns></returns>
    public static string showWindForcastInfo(int winid)
    {
        List<WindForecastDTO> listWindForecastInfo = DBConnection.ConnectSQLwindForecastInfo(winid);
        string resInfo = ConvertToJson(listWindForecastInfo);
        return resInfo;
    }

    /// <summary>
    /// 获取台风详细信息
    /// </summary>
    /// <param name="winid"></param>
    /// <returns></returns>
    public static string showWindDetailInfo(int winid)
    {

        List<WindDetailInfoDTO> listWindDetailInfo = DBConnection.ConnectSQLwindDetailInfo(winid);
        string resInfo = ConvertToJson(listWindDetailInfo);
        return resInfo;
    }
    */
    #endregion

    #region 实时雨情模块
    /*
    /// <summary>
    /// 雨量信息
    /// </summary>
    /// <param name="StarTime"></param>
    /// <param name="EndTime"></param>
    /// <param name="MixNum"></param>
    /// <param name="MaxNum"></param>
    /// <returns></returns>
    public static string GetRainNums(string StarTime, string EndTime, double MixNum, double MaxNum)
    {
        List<RainInfo> listSite = DBConnection.getRainInfo(StarTime, EndTime, MixNum, MaxNum);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    /// <summary>
    /// 站点雨量历史信息
    /// </summary>
    /// <param name="SiteNum"></param>
    /// <returns></returns>
    public static string GetSiteRainInfo(string StarTime, string EndTime, int SiteNum)
    {
        List<RainDetailInfo> listSite = DBConnection.getSiteHisRainInfos(StarTime, EndTime, SiteNum);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }
    */
    #endregion

    #region 私有方法
    /// <summary>
    /// 将对象转换成json返回给前台
    /// </summary>
    /// <param name="obj"></param>
    /// <returns></returns>
    private static string ConvertToJson(object obj)
    {
        DataContractJsonSerializer json = new DataContractJsonSerializer(obj.GetType());
        string resJson = "";
        using (MemoryStream stream = new MemoryStream())
        {
            json.WriteObject(stream, obj);
            resJson = Encoding.UTF8.GetString(stream.ToArray());
        }
        return resJson;
    }
    #endregion

    public static string GetYangXingInfo1(string time)
    {
        List<YangXingInfo> listSite = DBConnection.getYangXingInfo1(time);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }
    public static string GetYangXingInfo2(string number)
    {
        List<YangXingInfo> listSite = DBConnection.getYangXingInfo2(number);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetLunTanInfo(string help, string ask, string discuss, string other)
    {
        List<LunTanInfo> listSite = DBConnection.getLunTanInfo(help, ask, discuss, other);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetUserLunTanInfo(string phone)
    {
        List<LunTanInfo> listSite = DBConnection.getUserLunTanInfo(phone);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetReplyLunTanInfo(string theme, string author, string time, string phone)
    {
        List<LunTanInfo> listSite = DBConnection.getReplyLunTanInfo(theme, author, time, phone);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static void AddLunTanInfo(string theme, string author, string content, string contact, string help, string ask, string discuss, string other, string longitude, string latitude, string priority, string phone)
    {
        DBConnection.addLunTanInfo(theme, author, content, contact, help, ask, discuss, other, longitude, latitude, priority, phone);
    }

    public static void UpdateLTclickInfo(string click_number, string time, string author, string theme)
    {
        DBConnection.updateLTclickInfo(click_number, time, author, theme);
    }

    public static void UpdateLTreplyInfo(string reply_number, string time, string author, string theme)
    {
        DBConnection.updateLTreplyInfo(reply_number, time, author, theme);
    }

    public static void AddUserInfo(string PN, string name, string passward, string gender)
    {
        DBConnection.addUserInfo(PN, name, passward, gender);
    }

    public static string GetUserRepInfo(string NP)
    {
        List<User> listSite = DBConnection.getUserRepInfo(NP);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetAllUserInfo()
    {
        List<User> listSite = DBConnection.getAllUserInfo();
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static void UpdateUserIdentityInfo(string identity, string PhoneNumber, string Name, string RegisterTime)
    {
        DBConnection.updateUserIdentityInfo(identity, PhoneNumber, Name, RegisterTime);
    }

    public static string GetReplyInfo(string uptheme, string upauthor, string uptime)
    {
        List<ReplyInfo> listSite = DBConnection.getReplyInfo(uptheme, upauthor, uptime);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetUserReplyInfo(string phone, string name)
    {
        List<ReplyInfo> listSite = DBConnection.getUserReplyInfo(phone, name);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static void AddReplyInfo(string UTh, string UA, string UTi, string RA, string RC, string UP, string RP)
    {
        DBConnection.addReplyInfo(UTh, UA, UTi, RA, RC, UP, RP);
    }

    public static void DeleteLuntanInfo(string theme, string author, string time)
    {
        DBConnection.deleteLuntanInfo(theme, author, time);
    }

    public static void DeleteLuntanReplyInfo(string theme, string author, string time)
    {
        DBConnection.deleteLuntanReplyInfo(theme, author, time);
    }

    public static void DeleteReplyInfo(string recontent, string rephone, string retime)
    {
        DBConnection.deleteReplyInfo(recontent, rephone, retime);
    }

    public static string GetYiYuanInfo()
    {
        List<YiYuanInfo> listSite = DBConnection.getYiYuanInfo();
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetHeSuanInfo()
    {
        List<HeSuanInfo> listSite = DBConnection.getHeSuanInfo();
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetJiJiuInfo()
    {
        List<JiJiuInfo> listSite = DBConnection.getJiJiuInfo();
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetZhongInfo(string p)
    {
        List<ZhongInfo> listSite = DBConnection.getZhongInfo(p);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetGaoInfo(string p)
    {
        List<GaoInfo> listSite = DBConnection.getGaoInfo(p);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetAllZhongInfo(string p)
    {
        List<ZhongInfo> listSite = DBConnection.getAllZhongInfo(p);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }

    public static string GetAllGaoInfo(string p)
    {
        List<GaoInfo> listSite = DBConnection.getAllGaoInfo(p);
        string resInfo = ConvertToJson(listSite);
        return resInfo;
    }
}