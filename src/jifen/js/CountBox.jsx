define(['react'],(React)=>{

	const time_dev = (window.time*1000 || new Date()*1) - new Date()*1;

	class CountBox extends React.Component{

		constructor(props) {

		  super(props);
		  this.state = {
		  	'isLooking':!1,
		  	'isDoing':!1,
		  	'isOut':!1,
		  	'hour_dif':'00',
		  	'min_dif':'00',
		  	'sec_dif':'00',
		  	'timer':null,
		  };
		};
		componentWillMount(){

			let nowHour=new Date(new Date()*1+time_dev).getHours();

			if(nowHour<10)
				this.setState({
					'isLooking':!0,
				});
			let isOut=Array.from(document.querySelectorAll('#J_ticketList li')).filter((item,index)=>item.getAttribute('data-restAmount')=='0' && index<3).length==3;

			if(isOut && nowHour>=10)
				this.setState({
					'isOut':!0,
				});
			if(!isOut && nowHour>=10)
				this.setState({
					'isDoing':!0,
				});
		};
		getTimes(value){

            if(!isNaN(new Date(value)*1)) return new Date(value)*1;
            let
                a=value.split(/[^0-9]+/);

            return new Date(
            		a[0],a[1]-1,a[2],
            		a[3],a[4],a[5]
            	);
        };
        toTwo(value){

        	return value<10 ? '0'+value : ''+value;
        };
		timeChange(){

			let
				time_now    =new Date()*1 + time_dev,
				time_d      =new Date(time_now),
				time_year   =time_d.getFullYear(),
				time_mon    =time_d.getMonth()+1,
				time_day    =time_d.getDate(),
				time_future =`${time_year}-${time_mon}-${time_day} 10:00:00`,
				time_dif    =Math.max((this.getTimes(time_future)-time_now)/1000,0),
				hour_dif    =~~((time_dif/60/60)%24),
				min_dif     =~~((time_dif/60)%60),
				sec_dif     =~~(time_dif%60);
			hour_dif =this.toTwo(hour_dif);
			min_dif  =this.toTwo(min_dif);
			sec_dif  =this.toTwo(sec_dif);

			this.setState({
				hour_dif,
				min_dif,
				sec_dif,
			});
			if(time_dif==0){
				clearInterval(this.state.timer);
				$('.countDown').remove();
				window.location.href=window.location.href;
			}
		};
		componentDidMount(){

			if(this.state.isLooking)
				setInterval(()=>{
					this.timeChange();
				},1000);
		};
		render(){

			if(this.state.isDoing)
				return null;
			if(this.state.isOut)
				return (
					<div className="countDown">
						<h2 className="title">{ this.props.txt_status.out }</h2>
					</div>
					);
			if(this.state.isLooking)
				return (
					<div className="countDown">
						<h2 className="title">{ this.props.txt_status.looking }</h2>
						<div className="detailsTime">
							<em>{ this.state.hour_dif }</em>:
							<em>{ this.state.min_dif }</em>:
							<em>{ this.state.sec_dif }</em>
						</div>
					</div>
					);
			return null;
		};
	};

	return CountBox;
})