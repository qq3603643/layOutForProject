void function(Win, $){

	function Log(v)
	{
		console.log(v);
	}

	_.each($('.item'), function(item){
		console.log(item.className);
	})

//sN 默认为第一个元素；再用return出来的依次替换
	Log(
			_.reduce([1, 2, 3], function(sN, item){
				return sN + item;
			})
		);
//_.find 第二个参数不能直接用item
	let _list = [1, 2, 3];
	Log(
			_.find(_list, function(item){
				return item == 2
			})
		);
//_.contains 相当于indexOf高级版(数组，字符串都可以)
	Log(
			_.contains(_list, 2)
		);
	Log(_.contains('abc', 'a'));

//_.pluck 返回数组中指定属性
	let _person = [{name: 'apple', sex: 'female'}, {name: 'tangeine', sex: 'male'}];
	Log(
			_.pluck(_person, 'name')
		);

//_.reduce 函数的第一个参数为初始值(整个reduce函数的第三个参数/_list[0]：此时item为第_list[1]即会少循环一次) 此后为函数的返回值  以后都加上最后的初始值就好了！终于彻底理解reduce了
	let _list = [1, 2, 3];
	let sum = _.reduce(_list, function(starter, item){
		return starter + item;
	}, 0)
//计算出现次数的简单方法
	_list = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
	let objCount = function(list)
	{
		return _.reduce(list, function(objCnt, k){
			objCnt[k] = objCnt[k] == undefined ? 1 : objCnt[k] + 1;
			return objCnt;
		}, new Object)
	}
	Log(objCount(_list));
//计算阶乘
	function factorial(n)
	{
		return _.reduce(_.range(1, n+1), function(starter, item){
			return starter *= item;
		}, 1)
	}
	Log(factorial(6));

//_chain && _tap (tap在此暂停使用此时的list)
   _list = [1, 2];
   let _listAdd = _.chain(_.list)
			   		.push(3)
			   		.tap(Log)
			   		.push(4)
			   		.value();

//_.template
	let _tpl = 'THIS IS <%= number %>;',
		data = {
			t: ['ONE', 'TWO', 'THREE']
		};

	$(document.body).append(

			_.reduce(data.t, function(srter, item){
				srter += _.template(_tpl)({ number: item });
				return srter;
			}, '')
		);

/**
**似乎所有跟迭代有关的东西都可以用reduce来实现 (存在初始值的时候 可以不影响以前的东西返回符合要求的)
*/

//重新命名对象key
	let objP = { name: 'apple' };
	function reName(obj, newNames)
	{
		return _.reduce(newNames, function(nO, v, k)
				{
					_.has(obj, k) && nO[v] = obj[k];
					return nO;
			    }, _.omit.(obj, _.keys(newNames)))  //_.omit 和 _.pick相反 返回删除该属性的对象
	}
	Log(reName(objP, {name: 'NAME'}));

	function reName(obj, nNames)
	{
		return _.reduce(obj, function(rst, v, k){
			if(_.has(nNames, k))
				rst[nNames[k]] = v;
			else
				rst[k] = v;
			return rst;
		}, new Object)
	}

//筛选出符合要求的对象
	let persons = [{ age: 15 }, { age: 17 }, { age: 18 }];
	function screen(list, fn)
	{
		return _.reduce(list, function(nList, obj){
			if(fn(obj))	nList.push(obj);
			return nList;
		}, new Array)
	}
	function isOver15(obj)
	{
		return obj.age > 15;
	}
	Log(screen(persons, isOver15));


}(window, jQuery);