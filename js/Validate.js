function Validate(){
	
	//验证email是否正确
	this.validateEmail=function(email){
		if(email==""||email==null){
			return false;
		}
		
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(reg.test(email)){
			return true;
		}else{
			return false;
		}
	}
	
	
	this.validatePassword=function(password){
		if(password==""||password==null){
			return "请填写密码;";
		}
		var reg =/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/;
		if(!reg.test(password)){
			return "6-16个字符，以字母、数字符号组成；";
		}
		if(this.getBLen(password)<6){
			return "密码太短了，最少6位；";
		}
		if(this.getBLen(password)>16){
			return "密码太长，最多16个字符；";
		}
		return "";
		
	}
	
	//验证手机号
	this.validatePhoneNum=function(phone)
	{
		var tel = phone; //获取手机号
		return !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
	}
	
	this.validateUserName=function(name){
		if(name=="" || name==null){
			return "必填项！";
		}
		if(this.getBLen(name)<4){
			return "用户名太短，最少4个字符；";
		}
		if(this.getBLen(name)>16){
			return "用户名太长，最多16个字符；";
		}
		var reg=/^[\u4E00-\u9FA5A-Za-z][\u4E00-\u9FA5A-Za-z0-9]+$/;
		if(!reg.test(name)){
			return "4-6个字符，以中文或英文字母开头；";
		}
		return "";
			
	}
	
	
	this.validateName=function(name){
		if(name=="" || name==null){
			return "必填项！";
		}
		if(this.getBLen(name)<2 || this.getBLen(name)>10){
			return "2-10个字符，以中文或英文字母开头；";
		}
		var reg=/^[\u4E00-\u9FA5A-Za-z]+$/;
		reg==/(?!^[\u4E00-\u9FA5A-Za-z]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{2,10}$/;
		if(!reg.test(name)){
			return "2-10个字符，以中文或英文字母开头；";
		}
		return "";
			
	}
	
	//根据出生年月求年龄（1990-02-02）
	this.ages= function(str)   
	{   
        var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
        if(r==null)return   false;     
        var   d=   new   Date(r[1],   r[3]-1,   r[4]);     
        if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
        {   
              var   Y   =   new   Date().getFullYear();   
              return Y-r[1];   
        }   
        return("输入的日期格式错误！");   
	}  
	
	
	//获取字符串长度
	this.getBLen = function(str) {
		  if (str == null) return 0;
		  if (typeof str != "string"){
		    str += "";
		  }
		  return str.replace(/[^x00-xff]/g,"01").length;
		}
	
	
}
