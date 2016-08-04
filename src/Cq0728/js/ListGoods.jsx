define(['react'],(React)=>{

	class ItemGoods extends React.Component{

        constructor(props) {

          super(props);
          this.state = {
            'txt_btn':'即将开抢',
            'class_start':'',
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
        componentWillMount(){

            let
                time_now=window.time*1000,
                isStart=()=>time_now >= this.getTimes(this.props.time_act),
                isEnd=()=>time_now >= this.getTimes(this.props.time_end);

            if(isStart() && !isEnd())
                this.setState({
                    'txt_btn':'立即购买',
                    'class_start':'bg_red',
                });
            if(isEnd())
                this.setState({
                    'txt_btn':'活动已结束',
                    'class_start':'',
                })
        };
        render(){
            let EleLimitCount=typeof this.props.count_limit=='string'
                              ? <strong className="red">(限购{ this.props.count_limit })</strong>
                              : null;
            return (
                <li className={ `wrap_middle dis_ib ${this.props.isMgR0?'mg_r_0':''}` } >
                    <div className="item_goods bg_white wd_i">
                        <a href={ this.props.link_goods } className="pic_item dis_b wrap_middle txt_c" target="_blank"><img src={ `${this.props.src_goods}_220x220` } /></a>
                        <p className="fs_16 txt_of_e"><a href={ this.props.link_goods } target="_blank">{ this.props.name_goods }</a></p>
                        <p className="fs_12 txt_of_e">规格：{ this.props.rule_goods }
                            { EleLimitCount }
                        </p>
                        <p className="fs_12 txt_of_e">厂家：{ this.props.name_shop }</p>
                        <p className="fs_20 red keepblank">￥{ this.props.price_now }  <em className="fs_12 c99 txt_dct_lt g9">{ this.props.price_old }</em></p>
                    </div>
                    <div className="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
                        <a className={ `btn fs_16 pd_t_5 pd_b_5 bg_gray ${ this.state.class_start }` } href={ this.props.link_goods } target="_blank">{ this.state.txt_btn }</a>
                    </div>
                </li>
                );
        };
    };
    class ListGoods extends React.Component{

        constructor(props) {

          super(props);
        };
        render(){

            return (
                <ul className="list_goods fix">
                    {
                        this.props.dataGoods.map((item,index)=>{
                            return <ItemGoods key={ index } { ...item } isMgR0={ index%4==3 } time_act={ this.props.time_act } />;
                        })
                    }
                </ul>
                );
        };
    };

    return ListGoods;
});