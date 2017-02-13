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
                a=value.split(/[^0-9]+/);

            return new Date(
            		a[0],a[1]-1,a[2],
            		a[3],a[4],a[5]
            	);
        };
        componentDidMount(){

            let isStart=()=>window.time*1000 >= this.getTimes(this.props.time_act);
            if(isStart()) this.setState({
                'txt_btn':'马上抢购',
                'class_start':'bg_red',
            });
        };
        render(){

            return (
                <li className={ `wrap_middle dis_ib` } >
                    <div className="item_goods bg_white wd_i">
                        <a href={ this.props.link_goods } className="pic_item dis_b wrap_middle txt_c" target="_blank"><img src={ this.props.src_goods } /></a>
                        <p className="fs_16 txt_of_e"><a href={ this.props.link_goods } target="_blank">{ this.props.name_goods }</a></p>
                        <p className="fs_12 txt_of_e">规格：{ this.props.rule_goods }</p>
                        <p className="fs_12 txt_of_e">厂家：{ this.props.name_shop }</p>
                        <p className="fs_20 red keepblank">￥{ this.props.price_now }  <em className="fs_12 c99 txt_dct_lt">{ this.props.price_old }</em></p>
                    </div>
                    <div className="btn_group wrap_middle bg_white wd_i txt_c pd_b_10 pd_t_10">
                        <a className={ `btn fs_16 pd_t_5 pd_b_5 bg_g9 ${ this.state.class_start }` } href={ this.props.link_goods } target="_blank">{ this.state.txt_btn }</a>
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
                <ul className="list fix">
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