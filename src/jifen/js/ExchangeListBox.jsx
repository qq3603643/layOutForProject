define(['react'],(React)=>{

	class Title extends React.Component{

		constructor(props) {

		  super(props);
		};
		render(){

			return (
				<h2>{ this.props.title }</h2>
				);
		};
	};

	class ListTitle extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {};
		};
		render(){

			return (
				<ul className="list_title">
	    			{
	    				this.props.listTitle.map((item,index)=>{
	    					return <li key={ index } className="item_title">{ item }</li>
	    				})
	    			}
	    		</ul>
				);
		};
	};

	class ListConpon extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {
		  	'exchangeConponList':[],
		  	'isMoving':!1,
		  };
		};
		componentDidMount(){

			this.getDate();
		};
		getDate(){

			let _this=this;
			$.ajax({
				'type':'GET',
				'url':_this.props.urlAjax,
				'success':function(t){

					if(t.status && t.data.length==0){
						$('.list_conpon').html('暂无数据');
						return;
					}
					if(t.status && t.data.length<5){
						let tmpD={
							amountMoney: " ",
							shopName: " ",
							userName: " ",
						};
						while(t.data.length<5) t.data.push(tmpD);
					}
						_this.setState({
							'exchangeConponList':t.data,
						});
				}
			})
		};
		motion(){

			let
				$aLi=$('.item_conpon'),
				$oList=$('.list_conpon'),
				pHeight=$oList.innerHeight(),
				lHeight=$aLi.innerHeight();

			setInterval(()=>{

				let $LiRemoved=$oList.find('li:last').remove();

				$LiRemoved.css({
					'height':0,
				})
				$oList.prepend($LiRemoved.animate({
					'height':lHeight,
				},888))
			},1666)
		};
		componentDidUpdate(){

		 	if(this.state.exchangeConponList.length>5 && !this.state.isMoving){
		 		this.motion();
		 		this.setState({
		 			'isMoving':!0
		 		});
		 	}
		};
		render(){

			if(!this.state.exchangeConponList.length){
				return (
					<ul className="list_conpon" style={ {'lineHeight':'200px'}}>
						加载中...
					</ul>
					);
			}
			return (
				<ul className="list_conpon bg_stripe">
					{
						this.state.exchangeConponList.map((item,index)=>{
							return (
								<li key={ index } className="item_conpon" >
				    				<span>{ item.shopName }</span>
				    				<span>{ item.userName }</span>
				    				<span>{ item.amountMoney ? '￥' : '' }<em>{ item.amountMoney }</em></span>
				    			</li>
								);
						})
					}
				</ul>
				);
		};
	};

	class ListsWrap extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {};
		};
		render(){

			return (
				<div className="listWrap">
					<ListTitle listTitle={ this.props.listTitle } />
					<ListConpon urlAjax={ this.props.urlAjax } />
				</div>
				);
		};
	};

	class ExchangeListBox extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {};
		};
		render(){

			return (
				<div className="exchangeListBox">
					<Title title={ this.props.title }/>
					<ListsWrap listTitle={ this.props.listTitle } urlAjax={ this.props.urlAjax } />
				</div>
				);
		};
	};

	return ExchangeListBox;
})