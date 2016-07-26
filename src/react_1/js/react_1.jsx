//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/react_1.css');



define(['react','react-dom'],(React,ReactDOM)=>{

    class CountDown extends React.Component{

        constructor(props) {

          super(props);
          this.state = {
                times_server:new Date()*1,
                day_diff:'0',
                hour_diff:'00',
                min_diff:'00',
                sec_diff:'00',
            };
        };
        getTimes(value){

            if(!isNaN(new Date('1970-01-01 00:00:00')*1)) return new Date(value);
            let
                aValue=value.split(/\s+/),
                [iYear,iMouth,iDay]=aValue[0].split('-'),
                [iHour,iMin,iSec]=aValue[1].split(':');

            return new Date(iYear,iMouth-1,iDay)-new Date(1970,0,1)+(iSec*1+iMin*60+(iHour-8)*3600)*1000;
        };
        timeChange(){

            let
                times_server =this.state.times_server+1000,
                time_diff    =(this.getTimes(this.props.time_future)-times_server)/1000,
                day_diff     =~~(time_diff/3600/24),
                hour_diff    =~~(time_diff%(3600*24)/60/60),
                min_diff     =~~((time_diff%3600)/60),
                sec_diff     =~~(time_diff%60);
            hour_diff =hour_diff>9?''+hour_diff:'0'+hour_diff;
            min_diff  =min_diff>9?''+min_diff:'0'+min_diff;
            sec_diff  =sec_diff>9?''+sec_diff:'0'+sec_diff;

            this.setState({
                times_server,
                day_diff,
                hour_diff,
                min_diff,
                sec_diff,
            })
        };
        componentDidMount(){

            setInterval(()=>{
                this.timeChange();
            } ,1000)
        };
        render(){
            return (
                <div className='countDown auto'>
                    <h2 className="mg_b_30">距离 {this.props.time_future} :</h2>
                    <em className="mg_10 pd_10 red">{this.state.day_diff}</em>day
                    <em className="mg_10 pd_10 red">{this.state.hour_diff[0]}</em>
                    <em className="mg_10 pd_10 red">{this.state.hour_diff[1]}</em>hour
                    <em className="mg_10 pd_10 red">{this.state.min_diff[0]}</em>
                    <em className="mg_10 pd_10 red">{this.state.min_diff[1]}</em>min
                    <em className="mg_10 pd_10 red">{this.state.sec_diff[0]}</em>
                    <em className="mg_10 pd_10 red">{this.state.sec_diff[1]}</em>sec
                </div>
                );
        };
    };

    ReactDOM.render(<CountDown time_future="2017-08-07 00:00:00"/>,document.querySelector('.setion1'));
})
