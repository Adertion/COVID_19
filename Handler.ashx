<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

using System.IO;
using Newtonsoft.Json;

public class Handler : IHttpHandler
{
    //前台传递过来的json字符对象
    public struct ParaStrObj
    {
        public string paraStr { get; set; }
    }

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";
        string method = System.Web.HttpContext.Current.Request["method"].ToString();
        string res = slOnlineAnalyse(method, context);
        context.Response.Write(res);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    public string slOnlineAnalyse(string method, HttpContext context)
    {
        string res = null;
        switch (method)
        {
            case "luntan":
                string help = System.Web.HttpContext.Current.Request["help"].ToString();
                string ask = System.Web.HttpContext.Current.Request["ask"].ToString();
                string disc = System.Web.HttpContext.Current.Request["disc"].ToString();
                string oth = System.Web.HttpContext.Current.Request["oth"].ToString();
                res = Sample.GetLunTanInfo(help, ask, disc, oth);
                break;
            case "userluntan":
                string phone = System.Web.HttpContext.Current.Request["phone"].ToString();
                res = Sample.GetUserLunTanInfo(phone);
                break;
            case "replyluntan":
                string rlth = System.Web.HttpContext.Current.Request["theme"].ToString();
                string rla = System.Web.HttpContext.Current.Request["author"].ToString();
                string rlti = System.Web.HttpContext.Current.Request["time"].ToString();
                string rlp = System.Web.HttpContext.Current.Request["phone"].ToString();
                res = Sample.GetReplyLunTanInfo(rlth, rla, rlti, rlp);
                break;
            case "addluntan":
                string theme = System.Web.HttpContext.Current.Request["t"].ToString();
                string author = System.Web.HttpContext.Current.Request["a"].ToString();
                string content = System.Web.HttpContext.Current.Request["ce"].ToString();
                string contact = System.Web.HttpContext.Current.Request["ca"].ToString();
                string qz = System.Web.HttpContext.Current.Request["qz"].ToString();
                string wd = System.Web.HttpContext.Current.Request["wd"].ToString();
                string tl = System.Web.HttpContext.Current.Request["tl"].ToString();
                string qt = System.Web.HttpContext.Current.Request["qt"].ToString();
                string lon = System.Web.HttpContext.Current.Request["lon"].ToString();
                string lat = System.Web.HttpContext.Current.Request["lat"].ToString();
                string pri = System.Web.HttpContext.Current.Request["pri"].ToString();
                string ph = System.Web.HttpContext.Current.Request["ph"].ToString();
                Sample.AddLunTanInfo(theme, author, content, contact, qz, wd, tl, qt, lon, lat, pri, ph);
                res = "0";
                break;
            case "updateluntanclick":
                string click_number = System.Web.HttpContext.Current.Request["cn"].ToString();
                string click_time = System.Web.HttpContext.Current.Request["cti"].ToString();
                string click_author = System.Web.HttpContext.Current.Request["ca"].ToString();
                string click_theme = System.Web.HttpContext.Current.Request["cth"].ToString();
                Sample.UpdateLTclickInfo(click_number, click_time, click_author, click_theme);
                res = "0";
                break;
            case "updateluntanreply":
                string reply_number = System.Web.HttpContext.Current.Request["rn"].ToString();
                string reply_time = System.Web.HttpContext.Current.Request["rti"].ToString();
                string reply_author = System.Web.HttpContext.Current.Request["ra"].ToString();
                string reply_theme = System.Web.HttpContext.Current.Request["rth"].ToString();
                Sample.UpdateLTreplyInfo(reply_number, reply_time, reply_author, reply_theme);
                res = "0";
                break;
            case "adduser":
                string PN = System.Web.HttpContext.Current.Request["pn"].ToString();
                string pw = System.Web.HttpContext.Current.Request["pw"].ToString();
                string gd = System.Web.HttpContext.Current.Request["gd"].ToString();
                string name = System.Web.HttpContext.Current.Request["na"].ToString();
                Sample.AddUserInfo(PN, name, pw, gd);
                res = "0";
                break;
            case "userrep":
                string ud = System.Web.HttpContext.Current.Request["ud"].ToString();
                res = Sample.GetUserRepInfo(ud);
                break;
            case "alluserrep":
                res = Sample.GetAllUserInfo();
                break;
            case "updateuseride":
                string upid = System.Web.HttpContext.Current.Request["id"].ToString();
                string uppn = System.Web.HttpContext.Current.Request["pn"].ToString();
                string upna = System.Web.HttpContext.Current.Request["na"].ToString();
                string upti = System.Web.HttpContext.Current.Request["ti"].ToString();
                Sample.UpdateUserIdentityInfo(upid, uppn, upna, upti);
                res = "0";
                break;
            case "reply":
                string uth = System.Web.HttpContext.Current.Request["uth"].ToString();
                string ua = System.Web.HttpContext.Current.Request["ua"].ToString();
                string uti = System.Web.HttpContext.Current.Request["uti"].ToString();
                res = Sample.GetReplyInfo(uth, ua, uti);
                break;
            case "userreply":
                string rphone = System.Web.HttpContext.Current.Request["phone"].ToString();
                string rname = System.Web.HttpContext.Current.Request["name"].ToString();
                res = Sample.GetUserReplyInfo(rphone,rname);
                break;
            case "addreply":
                string UTh = System.Web.HttpContext.Current.Request["uth"].ToString();
                string UA = System.Web.HttpContext.Current.Request["ua"].ToString();
                string UTi = System.Web.HttpContext.Current.Request["uti"].ToString();
                string RA = System.Web.HttpContext.Current.Request["ra"].ToString();
                string RC = System.Web.HttpContext.Current.Request["rc"].ToString();
                string UP = System.Web.HttpContext.Current.Request["up"].ToString();
                string RP = System.Web.HttpContext.Current.Request["rp"].ToString();
                Sample.AddReplyInfo(UTh, UA, UTi, RA, RC, UP, RP);
                res = "0";
                break;
            case "luntandelete":
                string dth = System.Web.HttpContext.Current.Request["th"].ToString();
                string da = System.Web.HttpContext.Current.Request["a"].ToString();
                string dti = System.Web.HttpContext.Current.Request["ti"].ToString();
                Sample.DeleteLuntanInfo(dth, da, dti);
                res = "0";
                break;
            case "luntandeletereply":
                string dthr = System.Web.HttpContext.Current.Request["th"].ToString();
                string dar = System.Web.HttpContext.Current.Request["a"].ToString();
                string dtir = System.Web.HttpContext.Current.Request["ti"].ToString();
                Sample.DeleteLuntanReplyInfo(dthr, dar, dtir);
                res = "0";
                break;
            case "replydelete":
                string rco = System.Web.HttpContext.Current.Request["co"].ToString();
                string rph = System.Web.HttpContext.Current.Request["ph"].ToString();
                string rti = System.Web.HttpContext.Current.Request["ti"].ToString();
                Sample.DeleteReplyInfo(rco, rph, rti);
                res = "0";
                break;
            case "yxgj":
                string data = System.Web.HttpContext.Current.Request["t"].ToString();
                string yxOper = System.Web.HttpContext.Current.Request["oper"].ToString();
                switch (yxOper)
                {
                    case "riqi":
                        res = Sample.GetYangXingInfo1(data);
                        break;
                    case "renyuan":
                        res = Sample.GetYangXingInfo2(data);
                        break;
                }
                break;
            case "yiyuan":
                res = Sample.GetYiYuanInfo();
                break;
            case "hesuan":
                res = Sample.GetHeSuanInfo();
                break;
            case "jijiu":
                res = Sample.GetJiJiuInfo();
                break;
            case "zhong":
                string pz = System.Web.HttpContext.Current.Request["p"].ToString();
                res = Sample.GetZhongInfo(pz);
                break;
            case "gao":
                string pg = System.Web.HttpContext.Current.Request["p"].ToString();
                res = Sample.GetGaoInfo(pg);
                break;
            case "zhongall":
                string pza = System.Web.HttpContext.Current.Request["p"].ToString();
                res = Sample.GetAllZhongInfo(pza);
                break;
            case "gaoall":
                string pga = System.Web.HttpContext.Current.Request["p"].ToString();
                res = Sample.GetAllGaoInfo(pga);
                break;
            default: break;
        }
        return res;
    }
}