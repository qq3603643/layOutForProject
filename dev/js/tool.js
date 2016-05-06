define({
	/**
	 * 获取url参数
	 * @param  {String} 参数key 
	 * @return {String} 参数value
	 */
	getURLParam : function(_key){
		var searchStr = window.location.search,
			paramStr, paramObj={}, paramArr, splitArr;
		if(!searchStr){return '';}
		paramStr = searchStr.slice(1);
		if(paramStr.indexOf('&') === -1){
			splitArr = paramStr.split('=');
			paramObj[splitArr[0]] = splitArr[1];
		};
		paramArr = paramStr.split('&');
		for(var i=0;i<paramArr.length;i+=1){
			splitArr = paramArr[i].split('=');
			paramObj[splitArr[0].toLowerCase()] = splitArr[1];
		}
		this.getURLParam = function(_key){
			_key=_key.toLowerCase();
			return paramObj[_key];
		};
		return this.getURLParam(_key);
	},
	/**
	 * 字典数据转param字符串
	 * @param  {Object} 字典json
	 * @return {String} url参数字符串
	 */
	formatParam : function (obj) {
	    var str = '';
	    for (var i in obj) {
	        str += i + "=" + encodeURIComponent(obj[i]) + "&";
	    }
	    str = str.substring(0, str.length - 1);
	    return str;
	},
	/**
	 * 动态加载js
	 * @param {String} url [接口地址]
	 * @param {Function} fn [回调函数]
	 */
	loadJS : function(_url,_callback){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.onload = function(){ if(_callback){ _callback(); } };
		script.src = _url;
		document.getElementsByTagName('head')[0].appendChild(script);	
	},
	/**
     * 获取[min, max]区间内任意整数
     * @param  {Number} min 最小值
     * @param  {Number} max 最大值
     * @return {Number}     
     */
    rand : function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
	/**
	 * 格式化日期
	 * @param {String} nS [时间戳：e.g. 1430370000000]
	 * @param {String} Ft [日期格式：默认yyyy-MM-dd hh:mm:ss]
	 * @usage
	 *		formatDate(nS,Ft)
	 */
	formatDate : function(nS,Ft){
		Date.prototype.format = function(fmt){
			var o = {
				"M+" : this.getMonth()+1,                 //月份
				"d+" : this.getDate(),                    //日
				"h+" : this.getHours(),                   //小时
				"m+" : this.getMinutes(),                 //分
				"s+" : this.getSeconds(),                 //秒
				"q+" : Math.floor((this.getMonth()+3)/3), //季度
				"S"  : this.getMilliseconds()             //毫秒
			};
			if(/(y+)/.test(fmt))
				fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
			for(var k in o)
				if(new RegExp("("+ k +")").test(fmt))
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
			return fmt;
		}
		Ft=Ft || "yyyy-MM-dd hh:mm:ss";
		return new Date(parseInt(nS)).format(Ft);		 
	},
	/**
     * 倒计时
     * @param {String} id [倒计时容器id]
     * @param {String} deadtime [最终日期：e.g. 2014/5/26 10:00:00]
     * @param {Function} fn [回调函数]
     * @usage
     *		countdown.init(id,deadtime,fn)
     */
    countdown: (function() {
        var
        serverTime = {
            //netUrl: "systime.do", //服务器接口
            netUrl : "https://all.vic.sina.com.cn/201301smart_app/show_time.php",
            begin: function(id, deadtime, fn) {
                if (!window.diffTime) {
                    var startTime = new Date().getTime();                   
                    var loadJS = function(_url,_callback){
						var script = document.createElement('script');
						script.type = "text/javascript";
						script.onload = function(){ if(_callback){ _callback(); } };
						script.src = _url;
						document.getElementsByTagName('head')[0].appendChild(script);	
					}
                    loadJS(this.netUrl,function(){
						var endTime = new Date().getTime();
						window.diffTime = ServerSeconds*1000 - startTime+parseInt((endTime-startTime)/2);
						play(id,deadtime,fn);
					});
                } else {
                    play(id, deadtime, fn);
                }
            }
        },
        doubleNum = function(num) {
            num < 10 ? num = '0' + num : num = '' + num;
            return num;
        },
        timeCalc = function(timing) {
            var
            days = Math.floor(timing / (1000 * 60 * 60 * 24)),
                hours = Math.floor(timing / (1000 * 60 * 60)) % 24,
                minutes = Math.floor(timing / (1000 * 60)) % 60,
                seconds = Math.floor((timing / 1000)) % 60,
                numString = days+"天" + doubleNum(hours) + "小时" + doubleNum(minutes) + "分" + doubleNum(seconds) + "秒";
            return numString;
        },
        play = function(id, deadtime, fn) {
            //deadtime = '2013/1/18 10:00:00';
            var
            timer = null,
                timing = 0,
                t = new Date(deadtime).getTime(),
                curTime = new Date().getTime(),
                //curTime = new Date().getTime(),
                clock_con = document.querySelector('#' + id);
            var intervalHandler = function() {
                timing = t - curTime;
                if (timing >= 0) {
                    clock_con.innerHTML = timeCalc(timing);
                } else {
                    clearInterval(timer);
                    if (fn && '[object Function]' === Object.prototype.toString.call(fn)) {
                        fn();
                        return false;
                    }
                }
                curTime = new Date().getTime() + 1000;
            }
            if (clock_con && t - curTime > 0) {
                intervalHandler();
                timer = setInterval(function() {
                    intervalHandler();
                }, 1000);
            } else {
                clock_con.innerHTML = timeCalc(timing);
                fn();
            }
        },
        init = function(id, deadtime, fn) {
            //serverTime.begin(id, deadtime, fn);
            play(id,deadtime,fn);
        };
        return {
            init: init
        };
    }())
})