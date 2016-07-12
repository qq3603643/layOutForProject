//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/tangerine.css');
require('../css/test.css');
// let test_json={
// 	'name':'apple',
// },
// 	test_jsonCopy=Object.assign({}, test_json);

// test_json.name='tangerine';
// console.log(test_jsonCopy);

// const ID=(slr)=>document.querySelector(`#${slr}`);

// ID('toTop').addEventListener('click', ()=>{
// 	document.documentElement.scrollIntoView();
// })

// let isSupportV=()=>{

// 	let prefixs=['webkit','moz','ms','o'];
// 	if('visibilityState' in document) return 'visibilityState';
// 	let result;
// 	prefixs.forEach(item=>{
// 		if(`${item}VisibilityState` in document) result=`${item}VisibilityState`;
// 	})
// 	return result;
// };
// if(typeof(isSupportV())=='string'){

// 	let visibilityState=isSupportV();
// 	document.title=document[visibilityState];
// 	document.addEventListener('visibilitychange',()=>{
// 		document.title=document[visibilityState];
// 	},false)
// }

// //当连续滚动时 每隔666ms执行一次
// window.addEventListener('scroll',(()=>{

// 	let
// 		time_start   =new Date()*1,
// 		timer_scroll =null;
// 	return function(){
// 		let time_now=new Date()*1;
// 		clearTimeout(timer_scroll);
// 		if(time_now-time_start>=666){
// 			console.log('scrolling..');
// 			time_start=time_now;
// 		}else{
// 			timer_scroll=setTimeout(()=>{
// 				console.log('scrolling_timer..');
// 			}, 1000)
// 		}
// 	};
// })(),false)
// if(typeof window.innerWidth=='number'){
// 	document.body.scrollTop=1;
// }else{
// 	document.documentElement.scrollTop=1;
// }

// let mine=[1,2,3]
// console.log(Object.values(mine)); //Object.keys()&&values  es5的方法

// $('#btn_selectImg').change(function(){
// 	let
// 		$self=$(this),
// 		$obj_file=$self[0],
// 		URL_win=window.URL || window.webkitURL,
// 		$img_pre=$('#preview'),
// 		URL_data;
// // console.log($obj_file.files[0].name);
// 	if($obj_file && $obj_file.files && $obj_file.files[0]){
// 		let
// 			name_file=$obj_file.files[0].name,
// 			type_file=name_file.substr(name_file.lastIndexOf('.')+1);

// 		URL_data=URL_win.createObjectURL($obj_file.files[0]);
// 		$img_pre.attr('src',URL_data);
// 	}else{
// 		URL_data=$self.val();
// 		let
// 			type_file=URL_data.substr(URL_data.lastIndexOf('.')+1);
// 			obj_preImg=$img_pre[0];

// 		obj_preImg.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
// 		obj_preImg.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = URL_data;
// 	}
// });

let upImg_Ajax=((Win,$)=>{

	let
		Count_maxImg,$self,$btn_submit,
		class_preImg,class_wrapImg,
		arr_supportTypes=[],arr_files=[],arr_val=[],
		url_submit,
		callBack_submit,callBack_submitError,
		size_maxImg,
		upE={
			layOut(){

				let tempEle,tempMark;
				tempEle=document.createElement('input');
				tempEle.setAttribute('type', 'file');
				if(typeof tempEle.files=='object'){
					tempEle=$('<img>');
				}else{
					tempEle=$('<span>');
				}
				tempEle.addClass(class_preImg).addClass('hide_d');
				while((Count_maxImg-=1)+1) $(`.${class_wrapImg}`).append(tempEle.clone(!0));
				tempMark=$('<div>').css({
					'position':'fixed',
					'filter':"progid:DXImageTransform.Microsoft.gradient(enabled='true',startColorstr='#66000000', endColorstr='#66000000');background:rgba(0,0,0,0.4);",
					'background':'rgba(0,0,0,.4)',
					'text-align':'center',
					'cursor':'pointer',
					'border-radius':'8px',
					'color':'#fff',
					'z-index':'99',
				}).html('点击删除图片').addClass('hide_d').attr('id','mark_img');
				$('body').append(tempMark);
			},
			isSupportTp(type_file){

				return arr_supportTypes.includes(type_file);
			},
			isOverSize(size_file){

				return Math.ceil(size_file/1024)>size_maxImg;
			},
			checkFile(type_file,size_file){

				if(!upE.isSupportTp(type_file)){
					alert('暂不支持该文件类型的添加!');
					return !1;
				}
				if(upE.isOverSize(size_file)){
					alert('超出最大文件限制');
					return !1;
				}
				return !0;
			},
			selectFileEvent(){

				let
					$self=$(this),
					$obj_file=$self[0],
					URL_win=window.URL || window.webkitURL,
					$img_pre=document.querySelectorAll(`.${class_preImg}`),
					URL_data;

				$img_pre=Array.from($img_pre).filter(item=>!($(item).data('data-isUp')));
				if($img_pre.length==0){ alert('超出最大数量了');return; };
				$img_pre=$($img_pre[0]);

				if($obj_file && $obj_file.files && $obj_file.files[0]){
					let
						name_file=$obj_file.files[0].name,
						size_file=$obj_file.files[0].size,
						type_file=name_file.substr(name_file.lastIndexOf('.')+1);

					if(!upE.checkFile(type_file,size_file)) return;

					URL_data=URL_win.createObjectURL($obj_file.files[0]);
					$img_pre.attr('src',URL_data).data('data-isUp',!0).removeClass('hide_d');
					arr_files.push($obj_file.files[0]);
					upE.enterImg.call($img_pre[0]);
				}else{
					URL_data=$self.val();
					arr_val.push(URL_data);
					let
						type_file=URL_data.substr(URL_data.lastIndexOf('.')+1),
						obj_preImg=$img_pre[0],
						fso,size_file;

					try{
					   	fso = new ActiveXObject("Scripting.FileSystemObject");
					   	size_file=fso.GetFile(URL_data).size;
				    }
					catch(e){
					    alert('如果你用的是ie8 请将安全级别调低！');
				    }

					if(!upE.checkFile(type_file,size_file)) return;

					obj_preImg.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
					obj_preImg.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = URL_data;
					$(obj_preImg).data('data-isUp',!0).removeClass('hide_d');
					upE.enterImg.call(obj_preImg);
				};
			},
			enterImg(){

				let
					_this=this,
					top=_this.getBoundingClientRect().top,
					left=_this.getBoundingClientRect().left,
					iwidth=_this.offsetWidth,
					iheight=_this.offsetHeight;

				$('#mark_img').css({
					top:top+'px',
					left:left+'px',
					width:iwidth+'px',
					height:iheight+'px',
					lineHeight:iheight+'px',
				}).removeClass('hide_d');
			},
			leaveImg(){

				$('#mark_img').addClass('hide_d');
			},
			delFileSelected(e){

				let left=e.clientX,
					top=e.clientY;
				$(this).addClass('hide_d');
				let	img=document.elementFromPoint(left, top);
				$(this).removeClass('hide_d');
				$(img).remove();
				upE.leaveImg();
				$(`.${class_wrapImg}`).append($('<img>').addClass(class_preImg).addClass('hide_d'));

				arr_files.splice($(img).index(),1);
				arr_val.splice($(img).index(),1);
			return false;
			},
			submitEvent(){
//非ie上传
				if(arr_files.length){
					let formdata = new FormData();
					for(let file of arr_files) formdata.append('imgFile',file);
					$.ajax({
						'url':url_submit,
						'data':formdata,
						'cache' : false,
						'contentType' : false,
						'processData' : false,
						'dataType' : "json",
						'success': function(data){
							if(typeof callBack_submit=='function') callBack_submit(data);
						},
						'error': function(data){
							if(typeof callBack_submitError=='function') callBack_submitError(data);
						},
					});
				return;
				}
//ie
				let tempForm=$('<form>').attr({
					'action':url_submit,
				}),
					tempInp=$('<input>').attr('type','file');
				arr_val.forEach(item=>{
					tempForm.append(tempInp.val(item));
				})
				$('body').append(tempForm);
				tempForm.submit();
				if(typeof callBack_submit=='function') callBack_submit(data);
			},
			run({
				Count_max=5,
				selectBtn=null,
				supportTypes=new Array,
				classImgs=new String,
				classList=new String,
				submitBtn=null,
				url=new String,
				sizeFile=200,
				success=null,
				error=null,
			}={}){

				[Count_maxImg,$self,arr_supportTypes,class_preImg,class_wrapImg,$btn_submit,url_submit,size_maxImg,callBack_submit,callBack_submitError]=
				[Count_max,selectBtn,supportTypes,classImgs,classList,submitBtn,url,sizeFile,success,error];
				upE.layOut();
				$self.on('change',upE.selectFileEvent);
				$('body').on('mouseenter',`.${classImgs}`,upE.enterImg);
				$btn_submit.on('click',upE.submitEvent);
				$('#mark_img').on('click',upE.delFileSelected);
			},
		};

	return {
		inte:upE.run
	};
})(window,jQuery);

//ie(form提交)
upImg_Ajax.inte({
	'url':'www.baidu.com',
	'Count_max':4,
	'supportTypes':['png','png'],
	'submitBtn':$('#btn_submitImg'),
	'selectBtn':$('#btn_selectImg'),
	'classImgs':'preview',
	'classList':'wrap_seeImg',
	'sizeFile':10000,
	'success':()=>{
		alert('上传成功');
	},
	'error':()=>{
		alert('上传失败');
	}
});