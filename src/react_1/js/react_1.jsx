//兼容处理
require('es5-shim');
require('es5-shim/es5-sham');
require('babel-polyfill');

//css
require('plugins/css/reset.css');
require('plugins/css/tangerine.css');
require('../css/react_1.css');

define(['react/addons','react-dom','plugins/tools/pubsub.js'],(React,ReactDOM,PubSub)=>{


    class Form extends React.Component{

        constructor(props) {

          super(props);
          this.state = {
            isChecked:!0,
          };
        };
        componentDidMount(){


        };
        handleChange(){

            console.log(this.refs.checkBox.checked);
        };
        handleChangeSelect(){

            console.log(this.refs.select.value);
        };
        //直接设置value或者checked 将成为一个不受控组件，点击后不可更改其的状态
        render(){

            return (
                <form>
                    <input type="text" defaultValue="tangerine" ref="txt"></input>
                    <input type="checkbox" defaultChecked={ this.state.isChecked } ref="checkBox" onChange={ this.handleChange.bind(this) }></input>
                    <select defaultValue="B"
                            onChange={ this.handleChangeSelect.bind(this) }
                            ref="select">
                        <option value="A">Apple</option>
                        <option value="B">Banana</option>
                        <option value="C">Cranberry</option>
                    </select>
                </form>
                );
        };
    };

    ReactDOM.render(
        <Form />,
        document.querySelector('.setion')
        );

    let ReactCSSTransitionGroup=React.addons.CSSTransitionGroup;

    let TodoList = React.createClass({
      getInitialState: function() {

        return {items: ['hello', 'world', 'click', 'me']};
      },
      handleAdd: function() {

        let newItems = this.state.items.concat([prompt('Enter some text')]);
        this.setState({items: newItems});
      },
      handleRemove: function(e) {

        let $target=e.target || e.srcElement,
            index=$target.getAttribute('data-index');

        $target.style.border='0 none';
        let newItems=this.state.items;
        newItems.splice(index,1);
        this.setState({
            items: newItems
        });
      },
      render: function() {

        let items = this.state.items.map(function(item, i) {
          return (
            <li key={ item }
                data-index={ i }
                onClick={ this.handleRemove }>
              {item}
            </li>
          );
        }.bind(this));
        return (
            <div className="listBox">
                <button onClick={this.handleAdd}>Add Item</button>
                 <ul className="list">
                    <ReactCSSTransitionGroup
                        transitionName="example"
                        transitionEnterTimeout={ 5000 }
                        transitionLeaveTimeout={ 500 } >
                      { items }
                    </ReactCSSTransitionGroup>
                  </ul>
            </div>
        );
      }
    });

    ReactDOM.render(
        <TodoList />,
        document.querySelector('.setion0')
        );

    class CountDown extends React.Component{

        constructor(props) {

          super(props);
          this.state = {
                times_server:this.props.times_server,
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
        componentWillUpdate(nP,nS){

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

    ReactDOM.render(
        <CountDown time_future="2017-08-07 00:00:00" times_server={ new Date()*1 } />,
        document.querySelector('.setion1')
        );

    class Title extends React.Component{

        constructor(props){

            super(props);
            this.state={
                'title': this.props.title,
            };
        };
        componentWillMount(){
//第一次渲染之前执行 可以用来检测处理传入的参数？？
            (this.state.title==0) && (this.setState({
                'title': 1,
            }));
        };
        componentDidMount(){

            this.setState({
                title: this.state.title+1,
            });
        };
        shouldComponentUpdate(nP,nS){
//在此可以决定是否执行下次的渲染(nextProps ,nextState)；根据返回的布尔值判断是否下次渲染
// console.log(nS);
            return nS.title<10;
        };
        componentWillUpdate(nP,nS){
//下次渲染之前
// console.log(nS);
        };
        componentDidUpdate(){

           setTimeout(()=>{
             this.setState({
                title: this.state.title+1,
             });
           }, 1000)
        };
        render(){

            return (
                <div className="container">
                    <h2>{ this.state.title }</h2>
                </div>
                );
        };
    }

    ReactDOM.render(
        <Title title='0'/>,
        document.querySelector('.setion2')
        );

    class ControlList extends React.Component{

        constructor(props) {

          super(props);
        };
        isActive(index){

            return this.props.currentIndex==index ? 'active' : '';
        };
        handleChange(index){

            PubSub.publish('changeIndex',index+='');
        };
        render(){

            return (
                <ul className="list_control">
                    {
                        this.props.tiitles.map((item,index)=>{
                            return  <li className={ `item_control ${this.isActive(index)}` }
                                        key={ index }
                                        onClick={ this.handleChange.bind(this,index) } >

                                        { item }

                                    </li>
                        })
                    }
                </ul>
                );
        };
    };
    class ShowList extends React.Component{

        constructor(props) {

          super(props);
        };
        isActive(index){

            return this.props.currentIndex==index ? 'active' : '';
        };
        render(){

            return (
                <ul className="list_show">
                    {
                        this.props.contents.map((item,index)=>{
                            return <li className={ `item_show ${this.isActive(index)}` }
                                       key={ index }>

                                       { item }

                                   </li>
                        })
                    }
                </ul>
                );
        };
    };
    class TabBox extends React.Component{

        constructor(props) {

          super(props);
          this.state = {
            'currentIndex':0,
          };
        };
        componentDidMount(){

            PubSub.subscribe('changeIndex',(msg,index)=>{
//msg为必须的默认的第一个参数(切记)
                this.setState({
                    'currentIndex':index,
                });
            });
        };
        render(){

            return (
                <div className="container">
                    <ControlList tiitles={ this.props.title } currentIndex={ this.state.currentIndex } />
                    <ShowList contents={ this.props.content } currentIndex={ this.state.currentIndex } />
                </div>
                );
        };
    };

    let json_tab={
        'title': ['one','two','there'],
        'content': ['apple','orange','banana'],
    };
    ReactDOM.render(
        <TabBox {...json_tab}/>,
        document.querySelector('.setion4')
        );

})
