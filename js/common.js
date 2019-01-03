var app=
angular.module('ngCommon',[])
//公共变量
.service('tableService', function() {
		return {
			options: {
				//toolbar: '#toolbar',                //工具按钮用哪个容器
				cache: false,
				method: 'post',//"application/x-www-form-urlencoded"
				contentType:"application/x-www-form-urlencoded",
				striped: true,
				pagination: true,
				pageSize: 10,
				pageList: [10, 20, 50, 100, 200],
				search: false,
				showColumns: false,
				showRefresh: false,
			//	queryParams: queryParams,
				minimumCountColumns: 2,
				queryParamsType:'pageSize',
				clickToSelect: true,
				showToggle: false,
				maintainSelected: true
				/*fixedColumns: true,
	            fixedNumber:2*/
			}
		}

	})
.service('initData', function($http, $q, $location) {
		
//		var erpToken= '60754150-6f8b-47c1-ae02-00d78cedd9dd';
//		var baseUrl='http://192.168.11.203:9090/ControlCenter'
		return {
			query: function(url, param, config) {
				var location='http://123.57.217.145'+':8080'
				if(typeof(baseUrl)=="undefined"){
					baseUrl = location+'/ControlCenter';
				}
				url = baseUrl + url;
				if(typeof(erpToken)=="undefined"){
					erpToken=getCookie('erpToken');
				}
				if(param==''||typeof(param)=='undefined')param={};
				param.erpToken = erpToken;

				var deferred = $q.defer();
				$.post(url, param, config).success(function(data, status, headers, config) {
					//成功之后做一些事情  
					deferred.resolve(data);
				}).error(function(data, status, headers, config) {
					//处理错误  
					deferred.reject(data);
				});
				return deferred.promise;
			},
			
			initError:function(errorCode){
				if(errorCode == '1') {
					alert('URL检测异常');
				} else if(errorCode == '2') {
					alert('登陆异常')
				} else if(errorCode == '3') {
					alert('权限异常')
				} else if(errorCode == '4') {
					alert('业务错误')
				} else {
					alert('未捕获异常');
				}
			},
			
			getUrlParam:function(key){
				//根据url 的key获取上面的参数
				var url = location.href.replace(/^[^?=]*\?/ig, '').split('#')[0];
				var json = {};
				url.replace(/(^|&)([^&=]+)=([^&]*)/g, function(a, b, key, value) {
					try {
						key = decodeURIComponent(key);
					} catch(e) {}
	
					try {
						value = decodeURIComponent(value);
					} catch(e) {}
	
					if(!(key in json)) {
						json[key] = /\[\]$/.test(key) ? [value] : value;
					} else if(json[key] instanceof Array) {
						json[key].push(value);
					} else {
						json[key] = [json[key], value];
					}
				});
				return key ? json[key] : json;

			},

			getBaseUrl:function(model){
/*				var url="http://123.57.217.145:8080/ControlCenter";
				if(model=='1'){
					var location='http://'+$location.$$host+':'+$location.$$port
						url=location+'/ControlCenter';
				}else{
					//url='http://192.168.11.203:9090/ControlCenter';
				}
				return url;*/
				var curWwwPath = window.document.location.href;  
			    var pathName = window.document.location.pathname;  
			    var pos = curWwwPath.indexOf(pathName);  
			    var localhostPath = curWwwPath.substring(0, pos);  
			    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1);  
			    return(localhostPath + projectName); 
			},
			getErpCookie:function(){
				return getCookie('erpToken')
			},
			getOpenModel:function(){
				var TEST_MODEL=0;
				var ONLINE_MODEL=1;
				 return ONLINE_MODEL;
				
			},
			getDateTime:function(n){
				var date = new Date();
				var seperator1 = "-";
				var seperator2 = ":";
				var y = date.getFullYear();
		        var m = date.getMonth()+1;
		        var d = date.getDate();
		        var result='';
		        switch(n){	
		        	case 'end':
		        		if(m == 2){
				       	 d= d % 4 == 0 ? 29 : 28;
					    }else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
					        d= 31;
					    }else{
					        d= 30;
					    }
						var d = date.getDate();
					  	result= y+seperator1+(m<10?('0'+m):m)+seperator1+(d<10?('0'+d):d)+' 09:00:00';
		        		break;
		        	case 'begin':
		        		var getd = 1;
				        if(d<2){
				        	m = parseInt(m) -1; 
				        };
				        if(m ==0 ){
				        	y = y-1;
				        	m = 12;
				        };	
				        result=y+seperator1+(m<10?('0'+m):m)+seperator1+(getd<10?('0'+getd):getd)+' 09:00:00';
				        break;
				    case 'month':
				    	result=y+seperator1+(m<10?('0'+m):m);
				         break;
			        case 'year':
			        	result=y+seperator1;
			        	break;
			        default:
			        	result='2017-01-01';
			        	break;
		        
		        }
		        
		        return result;
			}	
		}
	})
function getCookie(name) {
	var arr = document.cookie
			.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) {
		return unescape(decodeURI(arr[2]));
	} else {
		return '';
	}
}

function number_format(number) {  
    /* 
    * 参数说明： 
    * number：要格式化的数字 
    * decimals：保留几位小数 
    * dec_point：小数点符号 
    * thousands_sep：千分位符号 
    * */
	var decimals = 2;
	var dec_point = '.';
	var thousands_sep = ',';
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');  
    var n = !isFinite(+number) ? 0 : +number,  
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),  
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,  
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,  
        s = '',  
        toFixedFix = function (n, prec) {  
            var k = Math.pow(10, prec);  
            return '' + Math.ceil(n * k) / k;  
        };  
   
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');  
    var re = /(-?\d+)(\d{3})/;  
    while (re.test(s[0])) {  
        s[0] = s[0].replace(re, "$1" + sep + "$2");  
    }  
   
    if ((s[1] || '').length < prec) {  
        s[1] = s[1] || '';  
        s[1] += new Array(prec - s[1].length + 1).join('0');  
    }  
    return s.join(dec);  
}  