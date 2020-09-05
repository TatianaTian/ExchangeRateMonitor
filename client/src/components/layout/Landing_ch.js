import axios from "axios";
import React, { Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import '../layout/Landing.css'; 
import {FaDatabase, FaStar, FaCalendarAlt, FaPoll, FaMoneyBillAlt, FaGavel, FaBell, FaRegQuestionCircle, FaEnvelope, FaBinoculars, FaSignInAlt, FaChevronDown, FaCheck, FaTty } from 'react-icons/fa';
import {FiToggleLeft} from 'react-icons/fi';
import { Link } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SaveNotificationData, readNotificationData } from "../../actions/authActions";
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'
import {HorizontalBar, Line, Doughnut} from 'react-chartjs-2';
import 'chart.piecelabel.js';
import china_flag from './china.png';
import us_flag from './us.png';


// testing log in
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { EarlyAccessUser } from "../../actions/authActions";
// done testing



const rangeChartData = {
  labels: ['过去3天', '过去1周', '过去1个月', '过去3个月'],
  datasets: [
  {
  label: 'range',
  backgroundColor: 'rgb(1, 2, 58)',
  stack: '3',
  data: [98, 98, 98, 90],
  },
  {
  label: '目前汇率水平',
  backgroundColor: '#32DC8B',
  stack: '3',
  data: [2, 2, 2, 2],
  },
  {
    label: 'range2',
    backgroundColor: 'rgb(1, 2, 58)',
    stack: '3',
    data: [0, 0, 0, 8],
    },
  ],
};
  
const rangeChartOptions = {
  maintainAspectRatio: false,
  tooltips:{
    enabled:false,
  },
  legend: {
            display: false,
          },
  scales: {
            xAxes: [{
              stacked: true,
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },
              ticks: {
                fontFamily:"PingFang",
                min: 0,
                max: 100,
                callback: function(value) {
                    return value + "%"
                }
              }
            },],
            yAxes: [{
              ticks: {
                fontFamily:"PingFang",
              },
              stacked: true,
              barPercentage: 0.4,
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
            
            },],
          },
          layout: {
            padding: {
                left: 0,
                right: 30,
                top: 0,
                bottom: 0
            }
        }  
  };

  var lineChartData = {
    labels: ['04-19', '04-22', '04-25', '04-28', '05-01', '05-04', '05-07', '05-10', '05-13'],
    datasets: [{
      label: "real",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgb(1, 2, 58)",
      borderColor: "rgb(1, 2, 58)",
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: "rgb(1, 2, 58)",
      pointBackgroundColor: "rgb(1, 2, 58)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgb(1, 2, 58)",
      pointHoverBorderColor: "rgb(1, 2, 58)",
      pointHoverBorderWidth: 2,
      pointRadius: 4,
      pointHitRadius: 10,
      // notice the gap in the data and the spanGaps: false
      data: [7.0781, 7.1005, 7.0906, 7.0879, 7.1372, , ,,],
      spanGaps: false,
      },
        {
        label: "forecast",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgb(1, 2, 58)",
        borderColor: "rgb(1, 2, 58)", // The main line color
        
        borderDash: [5, 10], // try [5, 15] for instance
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgb(1, 2, 58)",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "rgb(1, 2, 58)",
        pointHoverBorderWidth: 2,
        pointRadius: 4,
        pointHitRadius: 10,
        // notice the gap in the data and the spanGaps: true
        data: [7.0781, 7.1005, 7.0906, 7.0879, 7.1372, 7.1004, 7.1030, 7.1213, 7.1131],
        spanGaps: true,
      }, 
  
    ]
  };
  
  var lineChartOptions = {
    maintainAspectRatio: false,
    tooltips:{
      enabled:false,
    },
    legend: {
      display: false,
    },
    scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  },
                  scaleLabel: {
                       display: false,
                       labelString: 'USD/CNH',
                       fontSize: 20 
                    }
              }],
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
              }
              },],            
          },
          layout: {
            padding: {
                left: 0,
                right: 50,
                top: 0,
                bottom: 0
            }
        }  
  };


const barChartData = {
  labels: ['中国-月度消费价格指数', '美国-月度消费价格指数', '中国-季度国民生产总值',
           '美国-Aaa公司债券收益', '美国-S&P标准普尔500指数'],
  datasets: [
    {
      backgroundColor: ["#ffa41b", '#005082','#ff5733','#708160','#00a8cc'],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2,
      data: [0.65, 0.50, 0.47, 0.39, 0.37]
    }
  ],
};
  
const barChartOptions = {

  legend: {
            display: false,
          },

  scales: {
            xAxes: [{
              ticks: {
                fontFamily:"PingFang",
                min: 0,
                max: 1,
                callback: function(value) {
                    return value
                }
              },
              scaleLabel: {
                display: true,
                labelString: "相关系数（绝对值）",
                fontFamily:"PingFang",
              }
            },],
            yAxes: [{
              ticks: {
                fontFamily:"PingFang",
              },
              barPercentage: 0.3,
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
              },              
            },
          ],
          },
    
  };

const doughnutChartData = {
  labels: ['做空人数比例（认为汇率会下降）', '做多人数比例（认为汇率会上升）'],
  datasets: [
    {
      backgroundColor: ["#FF6D2D","#45853C"],
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: 2,
      data: [28, 72],

    }
  ],
};
  
const doughnutChartOptions = {
  maintainAspectRatio: false,
  cutoutPercentage:70,
  tooltips:{
    enabled:false,
  },
  legend: {
            display: true,
            labels:{
              fontFamily:"PingFang",
            }
          },
  pieceLabel: {
    render: 'value' + '%',
    fontColor: "white",
  }
  };

  const Emoji = props => (
    <span
        className="emoji"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </span>
);


class Landing_ch extends Component {

  constructor() {
    super();

// testing log in
    this.state = {
      email: "",
      password: "",
      errors: {},
      email2:"",
      show_confirm: false,
      show_broker_data: false,
      show_news1: false,
      show_news2: false,
      show_news3: false
    };
// done testing
  }


// test log in
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    ReactGA.event({
      category: "Log in",
      action: "User log in - English log in page"
    });
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onSubmit2 = e => {
    ReactGA.event({
      category: "Early Access Sign Up",
      action: "User sign up - Chinese log in page"
    });
    e.preventDefault();
    this.setState({ show_confirm: true });
    const userData = {
      email: this.state.email2,
      event: "Wall Street View",
      id: null
    };
    console.log("arrived onSubmit2")
    this.props.EarlyAccessUser(userData);
  };

  onSubmit3 = e => {
    e.preventDefault();
    this.setState({ show_broker_data: this.state.show_broker_data === false });
  };

  onSubmit4 = e => {
    e.preventDefault();
    this.setState({ show_news1: this.state.show_news1 === false });
  };

  onSubmit5 = e => {
    e.preventDefault();
    this.setState({ show_news2: this.state.show_news2 === false });
  };

  onSubmit6 = e => {
    e.preventDefault();
    this.setState({ show_news3: this.state.show_news3 === false });
  };


// done testing

  componentDidMount() {
    this.getData();
  }


  getData = () => {
    axios
        .post("/api/users/notification_read", {user_id: this.props.auth.user.id})
        .then(res => {
          //console.log(res.data)
          this.setState({ above_status: res.data[0].status });
          this.setState({ above_bank: res.data[0].bank });
          this.setState({ above_value: res.data[0].value });
          this.setState({ below_status: res.data[1].status });
          this.setState({ below_bank: res.data[1].bank });
          this.setState({ below_value: res.data[1].value });
        })
        .catch(err => {
            console.log(err);
            return null;
        });
  };
 


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  

  render() {

    // testing log in
    const { errors } = this.state;
    const history = createHistory()
    //console.log("history.location.path is ", history.location.pathname)
    ReactGA.set({ page: history.location.pathname})
    ReactGA.pageview(history.location.pathname)
    // done testing


    const options = [
      '中国银行 BOC', '工商银行 ICBC', '交通银行 BCM','农业银行 ABC','浦发银行 SPDB','建设银行 CCB','招商银行 CMB','光大银行 CEB','Real-time'
    ];

    function renderTooltip1(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,

          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">登录后，你可以监测银行汇率，市场<br/>
          离岸人民币实时汇率，主要汇率券商<br/>
          交易人员的市场态度，和影响汇率波<br/>
          动的重大领先指标，<span className="highlight">避免人工监测汇<br/>
          率的繁琐</span></span>
           </p>
        </Tooltip>
      );
    }

    function renderTooltip2(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '2px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">用机器学习模型预测汇率。目前使<br/>
          用的数据包括宏观经济数据，股市<br/>
          数据，市场情绪，和美元人民币交<br/>
          易数据。<br/>
          <br/>
          模型预测汇率<span className="highlight">大致走向</span>。汇率波动<br/>
          很大程度受实时事件和最新发布的<br/>
          数据影响，登录后打开<span className="highlight">领先指标提<br/>
          醒</span>可帮助你预备汇率变化</span>
          </p> 
        </Tooltip>
      );
    }

    function renderTooltip3(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">蓝色区域为一段时间内汇率的波动<br/>
          范围，绿色代表当前<a href="https://www.nasdaq.com/articles/cnh-vs-cny-differences-between-two-yuan-2018-09-12">离岸人民币</a>汇<br/>
          率水平<br/></span>
          </p> 
        </Tooltip>
      );
    }
    function renderTooltip4(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">监测数据全部为<span className="highlight">官方数据</span>，点击数<br/>
          据名称可跳转数据源。每日更新数<br/>
          据和预测</span>
          </p> 
        </Tooltip>
      );
    }
    function renderTooltip5(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">通过机器学习模型分析监测数据，找<br/>
            出影响汇率浮动最大的5种数据。1为<br/>
            完全相关，0为完全不相关，数据源<br/>
            请见“监测数据”</span>
            </p> 
        </Tooltip>
      );
    }
    function renderTooltip6(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">汇率波动主要由实时事件，宏观经济<br/>
            数据发布和利率调整而影响。此部分<br/>
            列出即将发生且可能会<span className="highlight">大幅波动</span>汇率<br/>
            的事件：包活领先数据的发布（前瞻<br/>
            中美国民生产总值和通货膨胀），美<br/>
            联储会议（决定美国全国利率）和重<br/>
            大中美贸易事件。
            <br/>
            <br/>
            登录后打开领先指标<span className="highlight">邮件提醒</span>，可在<br/>
            数据发布3天前收到分析和<span className="highlight">Bloomberg<br/>预测</span></span>
          </p> 
        </Tooltip>
      );
    }



    function renderTooltip7(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">3家券商每日发布其客户USD/CNH<br/>
            <span className="highlight">市场态度</span>。集合3家数据取<span className="highlight">平均值</span>得<br/>
            出此分布图。百分比为持同一态度的<br/>
            人数比例。登录后打开市场态度提醒，<br/>
            在超过50%券商交易人员认为汇率会<br/>
            下行时，你会收到<span className="highlight">邮件提醒</span>。<br/>
            <br/>
            如果你知道其他券商发布USD/CNH<br/>
            日数据，请联系我们。CNH为离岸<br/>
            人民币 &nbsp;
            <a href="https://www.nasdaq.com/articles/cnh-vs-cny-differences-between-two-yuan-2018-09-12">阅读更多</a> </span>
          </p> 
        </Tooltip>
      );
    }

    function renderTooltip8(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(233,246,251)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_noti"><FaSignInAlt/> <span className="highlight Chinese_font">登录</span><span className="Chinese_font">设置</span>
           <span className="highlight Chinese_font">邮件</span><span className="Chinese_font">提醒</span>
          </p> 
        </Tooltip>
      );
    }
        
    function renderTooltip9(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(233,246,251)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          <span className="Chinese_font">3家主要<span className="highlight">汇率券商</span>（IG，CMC Markets 和<br/>
            OANDA）每日发布其客户对USD/CNH的<br/>
            <span className="highlight">市场态度</span>，集合3家数据取平均值得出此百<br/>
            分比。当<span className="highlight">超过50%</span>交易人员持做空仓位（认<br/>
            为美元人民币汇率会<span className="highlight">下行</span>），你将收到邮件<br/>
            提醒。详细分析请看“市场态度”</span>
          </p> 
        </Tooltip>
      );
    }

    function renderTooltip10(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(233,246,251)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
         <p className = "text_footnote Chinese_font">
         <span className="Chinese_font"><a href="https://www.investopedia.com/terms/l/leadingindicator.asp">领先指标</a>指对经济发展起<span className="highlight">预测作用</span>的前瞻性<br/>
          指标。领先指标的发布可使汇率大幅波动，<br/>
          尤其当发布数据与主流预测不符。提醒邮件<br/>
          中将列出
          <span className="highlight">Bloomberg预测</span>，并分析此数据会<br/>
          如何波动汇率。
          <br/>
          <br/>
          跟踪数据包括<span className="highlight">采购经理指数</span>（前瞻国民生产<br/>
          总值），<span className="highlight">生产价格指数</span>（前瞻通货膨胀），<br/>
          <span className="highlight">联邦基金利率会议</span>（决定美国利率）。<br/>
          </span>
          
          </p> 
        </Tooltip>
      );
    }

    function renderTooltip12(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote Chinese_font">
          
          <span className="Chinese_font">开盘汇率为<a href="https://www.nasdaq.com/articles/cnh-vs-cny-differences-between-two-yuan-2018-09-12">离岸人民币</a>CNH。汇率<br/>
          交易为星期日至星期五全天24小时，<br/>
          此开盘价格时间为美东时间8AM<br/>
          <a href="https://www.investopedia.com/terms/forex/f/forex-market-trading-hours.asp">阅读更多</a></span></p> 
        </Tooltip>
      );
    }

    function renderTooltip13(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote">
          <span className="Chinese_font">
          国家统计局官网被搜索引擎列为“<span className="highlight">不安全</span>”网站，所以我们<span className="highlight">无法<br/>
          直接</span>连接。你可以浏览国家数据主页<span className="link">http://data.stats.gov.cn/</span>，<br/>
          消费价格指数<span className="link">http://data.stats.gov.cn/easyquery.htm?cn=A01</span>，<br/>
          国民生产总值<span className="link">http://data.stats.gov.cn/easyquery.htm?cn=B01</span><br/>
          来查看数据来源。
          </span>
          </p> 
        </Tooltip>
      );
    }


    function renderTooltip14(props) {
      return (
        <Tooltip id="button-tooltip" {...props}
        style={{
          backgroundColor: 'rgb(247, 251, 252)',
          padding: '3px 10px',
          color: 'rgb(1, 2, 58)',
          fontFamily: 'lato',
          borderRadius: 3,
          ...props.style,
        }}
        >
          <p className = "text_footnote">
          <span className="Chinese_font">
          OANDA官网被搜索引擎列为“<span className="highlight">不安全</span>”网<br/>
          站，所以我们<span className="highlight">无法直接</span>连接。你可以浏览<br/>
          <span className="link">http://dashboard.oanda.com/dashboard</span><br/>
          来查看数据来源。
          </span>
          </p> 
        </Tooltip>
      );
    }

    
    const Example1 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 1200 }}
        overlay={renderTooltip1}
      >
        <FaRegQuestionCircle />
      </OverlayTrigger>
    );

    const Example2 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip2}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example3 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip3}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example4 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip4}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example5 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip5}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example6 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip6}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example7 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip7}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example8 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 1200 }}
        overlay={renderTooltip8}
      >
       <FiToggleLeft/>
      </OverlayTrigger>
    );

    const Example9 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 1200 }}
        overlay={renderTooltip9}
      >
        <span className="link Chinese_font">详情</span>
      </OverlayTrigger>
    );

    const Example10 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 1200 }}
        overlay={renderTooltip10}
      >
        <span className="link Chinese_font">详情</span>
      </OverlayTrigger>
    );


    const Example12 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip12}
      >
        <FaRegQuestionCircle /> 
      </OverlayTrigger>
    );

    const Example13 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 2000 }}
        overlay={renderTooltip13}
      >
       <span className="Chinese_font">国家统计局数据库</span>
      </OverlayTrigger>
    );

    const Example14 = () => (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip14}
      >
       <span className="Chinese_font">汇率券商OANDA官网</span>
      </OverlayTrigger>
    );


    const Search = () => {
      return (
        <div>

          { this.state.show_confirm ? <span className="text_thankyou"><FaCheck /> 已提交</span>: null }
        </div>
      )
    }

    const Search2 = () => {
      return (
        <div>

          { this.state.show_broker_data ? <span className="text_footnote2">持上升观点/持下行观点：IG 58%/42%，CMC Markets 59%/41%, OANDA 100%/0%</span>: null }
        </div>
      )
    }

    const News1 = () => {
      return (
        <div>

          { this.state.show_news1 ? <span className="text_footnote2 Chinese_font">
            <span className="Chinese_font">
          3月份数据为43。通常情况下，如果实际值<span className="highlight">高于</span>预测值，人民币走强（美元人民币<span className="highlight">下行</span>）；如果实际值<span className="highlight">低于</span>预测值，人民币会相对贬值（美元人民币<span className="highlight">上升</span>）。
          <br/><br/>
          指数解释：此指数由发放到超过400家服务业私企的调查问卷结果计算得出，是预测服务业私营企业销售，库存，价格等情况的前瞻性数据。数值大于50表示服务业在上月扩张，数值小于50表示服务业在上月缩减。此指数可预测中国国民生产总值和经济发展，直接影响美元人民币汇率。
          </span>
          </span>: null }
        </div>
      )
    }

    const News2 = () => {
      return (
        <div>

          { this.state.show_news2 ? <span className="text_footnote2 Chinese_font">
          <span className="Chinese_font">
            4月份主流预测为-1.1%。通常情况下，如果实际值<span className="highlight">高于</span>预测值，人民币走强（美元人民币<span className="highlight">下行</span>）；如果实际值<span className="highlight">低于</span>预测值，人民币会相对贬值（美元人民币<span className="highlight">上升</span>）。
          <br/><br/>
        指数解释：此指数衡量制造业产品相对于去年同月份的价格变化。此指数为领先指标，可预测消费价格指数和通货膨胀，直接影响人民币的升值和贬值。
        </span>
          </span>: null }
        </div>
      )
    }

    const News3 = () => {
      return (
        <div>

          { this.state.show_news3 ? <span className="text_footnote2 Chinese_font">
          <span className="Chinese_font">
            3月份数据为-1.1%。通常情况下，如果实际值<span className="highlight">高于</span>预测值，人民币走强（美元人民币<span className="highlight">下行</span>）；如果实际值<span className="highlight">低于</span>预测值，人民币会相对贬值（美元人民币<span className="highlight">上升</span>）。
                <br/><br/>
                指数解释：此指数由去年同月份指数和今年指数相比计算得出，为制造业年增长率。制造业是中国三大支柱产业（制造业，能源业，采矿业）之一，此指数可预测中国国民生产总值和经济发展，直接影响美元人民币汇率。
                </span>
              </span>: null }
              

        </div>
      )
    }

    const hight = window.screen.height - 180;
    const range_wid = window.screen.width/3;



    return (
      <div className="main_background_image"> 
        <div style={{}} className="container">
              <div style={{height: window.screen.height}} >
              <div className="col s4 m12 right-align"> 
                    <br/>
                    <Link
                      to="/"
                      style={{
                        width: "100px",
                        borderRadius: "3px",
                        letterSpacing: "1px"
                      }}
                      className="flow-text-small grey-text text-darken-1"
                    >
                      English
                    </Link>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Link
                  to="/login_ch"
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-small waves-effect waves-light hoverable blue white-text accent-3"
                >
                  <span className="Chinese_font">登录</span>
                </Link>
              </div>


                

              <div className="valign-wrapper" style={{height: hight}}>

              <div className="row">
                  <div className="col s12 m12 right-align"> 
                    <h4 className = "headline-style center-align Chinese_font">
                      <b className="highlight Chinese_font">监测</b>  <span className="Chinese_font">和</span> <b className="highlight Chinese_font">预测</b>
                        <p className="Chinese_font">人民币 (¥) <img src={china_flag} alt="icon" /> 和美元 ($) <img src={us_flag} alt="icon" /> 汇率</p>
                    </h4>
                      <p className="flow-text grey-text text-darken-1 center-align text5 Chinese_font">
                        由投行金融分析师和机器学习工程师共同建造 <br/>
                        所有数据均为官方数据
                      </p>
                  </div>

                  <div className="col s12 m12 center-align"> 
                      <div className="row ">
                          <div className="col s12 m4">
                             <div className="feature-square">
                                <h5 className="feature-headline-style"><FaDatabase /><span className="Chinese_font">监测37项数据</span> </h5>
 
                             </div>
                         </div>
                        <div className="col s12 m4 ">
                          <div className="feature-square">
                              <h5 className="feature-headline-style Chinese_font"><FaPoll /> <span className="Chinese_font">预测未来2周汇率</span></h5>
                          </div>
                        </div>
                        <div className="col s12 m4">
                          <div className="feature-square">
                            <h5 className="feature-headline-style Chinese_font"><FaBell /> <span className="Chinese_font">设置个性化邮件提醒</span></h5>
                          </div>
                        </div>
                    </div>

                  <div class="arrow bounce">
                      <a class="sub-headline-style" href="#monitor">
                      <FaChevronDown/>
                      </a>
                      
                  </div>
                  <p className="flow-text grey-text text-darken-1 center-align text_footnote Chinese_font">
                  <span className="Chinese_font">美国数据：</span><a href="https://fred.stlouisfed.org/" className="flow-text grey-text text-darken-1 center-align text_footnote"><span className="Chinese_font">美国联邦储备银行圣路易斯数据库</span></a> <br/>
                  <span className="Chinese_font">中国数据：</span><Example13/> <br/>
                  <span className="Chinese_font">汇率数据：</span><a href="https://finance.yahoo.com/quote/usdcnh=x/" className="flow-text grey-text text-darken-1 center-align text_footnote"><span className="Chinese_font">雅虎经济</span></a> <br/>
                  </p>

              </div>
            </div>
          </div>
          </div>

          <div className="row" id="monitor">
                <div className="landing-copy col s12 m6">
                    <div className="col s12 m12 center-align Chinese_font">
                            <br/>                      
                            <h4 >
                                <b className="Chinese_font">2020-05-11 星期一</b>
                            </h4>
                            <p className="text col s12 m12 center-align"><FaMoneyBillAlt /> <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text"><span className="Chinese_font">美元人民币汇率今日开盘价格</span></a> <b className="highlight">7.0902</b>&nbsp; <span className="right-align text_question"><Example12/></span></p>
                            <div className="col s6 m6 center-align">
                            <p className="text"><span className="Chinese_font">BOC/中国银行</span>  &nbsp;&nbsp;<b >7.1127</b></p>
                              <p className="text"><span className="Chinese_font">ICBC/工商银行</span>  &nbsp;&nbsp;<b >7.1148</b></p>
                              <p className="text"><span className="Chinese_font">BCM/交通银行</span>  &nbsp;&nbsp;<b >7.1099</b></p>
                              <p className="text"><span className="Chinese_font">ABC/农业银行</span>  &nbsp;&nbsp;<b >7.1122</b></p>
                            </div>
                            <div className="col s6 m6 center-align">
                              <p className="text"><span className="Chinese_font">SPDB/浦发银行</span>  &nbsp;&nbsp;<b >7.1134</b></p>
                              <p className="text"><span className="Chinese_font">CCB/建设银行</span>  &nbsp;&nbsp;<b >7.1107</b></p>
                              <p className="text"><span className="Chinese_font">CMB/招商银行</span> &nbsp;&nbsp;<b >7.1112</b></p>
                              <p className="text"><span className="Chinese_font">CEB/光大银行</span> &nbsp;&nbsp;<b >7.1122</b></p>
                            </div>
                              <p className="enter-align text_footnote flow-text grey-text text-darken-1"><span className="Chinese_font">数据来源：银行官网 现汇卖出价</span></p>
                              
                      </div>
                      <div className="col s12 m12">
                            <br/>
                            <div className="feature-headline-style-nosize Chinese_font">
                              <h5><FaGavel /> <span className="Chinese_font">目前 美元人民币汇率 水平</span> &nbsp; <span className="right-align text_question"><Example3/></span></h5>
                                <div>
                            
                                  <HorizontalBar 
                                    height="320vh"
                                    data={rangeChartData}
                                    options={rangeChartOptions}
                                  />
                      
                                </div>
                            </div>
                            <div>
                                <span className="Chinese_font enter-align text_footnote flow-text grey-text text-darken-1"><span className="Chinese_font">数据来源：</span><a href="https://finance.yahoo.com/quote/usdcnh=x/"><span className="Chinese_font">雅虎经济</span></a> </span>
                            </div>    
                      </div>    
                </div>  


                <div className="col s12 m6 l6">
                  <br/>
                  <br/>
                  <br/>
                  <div className="feature-square3">
                  <span class="brmedium">
                  <div className="feature-headline-style-nosize">
                  <h5><FaBell /> <span class="highlight Chinese_font">设置你的个人提醒</span> &nbsp; <span className="right-align text_question"><Example1/></span></h5>
                  </div>
                  </span>
                
                  <p className="text"><span className="Chinese_font">无需再监测美元人民币汇率。当以下情况发生时，你会收到<span class="highlight">邮件</span>提醒：</span> </p>
                  <div className="col s12 m12 l12">
                        <span className="col s12 m12 l4"><span className="Chinese_font"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span></span>
                        <span className="col s5 m5 l3"><p className="text right-align"><span className="Chinese_font">美元人民币汇率 ></span> </p></span>
                        <span className="col s4 m4 l3">
                        <Form>
                            <Form.Control type="text" placeholder={"e.g. 7.1"} />
                        </Form>
                        </span>   
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                  
                
                    <div className="col s12 m12 l12">
                        <span className="col s12 m12 l4"><span className="Chinese_font"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span></span>
                        <span className="col s5 m5 l3"><p className="text right-align"><span className="Chinese_font">美元人民币汇率 &#60;</span>  </p></span>
                        <span className="col s4 m4 l3">
                        <Form>
                            <Form.Control type="text"  placeholder={"e.g. 7.0"} />
                        </Form>
                        </span>
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
            
                    <div className="col s12 m12 l12">
                        <span className="col s12 m12 l4"><span className="Chinese_font"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span></span>
                        <span className="col s5 m5 l3"><p className="text right-align"><span className="Chinese_font">美元人民币汇率一日波动 ></span> </p></span>
                        <span className="col s4 m4 l3">
                        <Form>
                            <Form.Control type="text" placeholder={"e.g. 3%"} />
                        </Form>
                        </span>   
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                  
              
                    <div className="col s12 m12 l12">
                        <span className="col s9 m9 l10"><p className="text"><span className="Chinese_font">超过50%交易人员认为美元人民币汇率会下行 &nbsp;</span>  <span ><Example9/></span></p></span>      
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                    
                  
                    <div className="col s12 m12 l12">
                        <span className="col s9 m9 l10"><p className="text"><span className="Chinese_font">可能大幅波动汇率的<a href="https://www.investopedia.com/terms/l/leadingindicator.asp">重要领先指标</a>发布3天之前 &nbsp;</span> <span ><Example10/></span></p></span> 
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                    <div className="feature-headline-style-nosize">
                  <h5><FaSignInAlt /> <span className="highlight Chinese_font">登录</span> </h5><span className="grey-text text-darken-1 Chinese_font">没有账号？</span> <Link to="/register_ch"><span className="Chinese_font">注册</span> </Link>
                  </div>
                  <div className="row">
                      <div className = 'col s12 m12 l12'>
                        <form noValidate onSubmit={this.onSubmit} >
                        <div className="input-field col s12 m12 l4">
                          <input
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            className={classnames("", {
                              invalid: errors.email || errors.emailnotfound
                            })}
                          />
                          <label htmlFor="email"><span className="Chinese_font">邮箱</span></label>
                          <span className="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                          </span>
                        </div>
                        <div className="input-field col s12 m12 l4">
                          <input
                            onChange={this.onChange}
                            value={this.state.password}
                            error={errors.password}
                            id="password"
                            type="password"
                            className={classnames("", {
                              invalid: errors.password || errors.passwordincorrect
                            })}
                          />
                          <label htmlFor="password"><span className="Chinese_font">密码</span></label>
                          <span className="red-text">
                            {errors.password}
                            {errors.passwordincorrect}
                          </span>
                        </div>
                        <div className="col s12 m12 l4" style={{ paddingLeft: "11.250px" }}>
                          <button
                            style={{
                              width: "100px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                          >
                            <span className="Chinese_font">登录</span>
                          </button>
                        </div>
                        </form>
                        </div>
                    </div>







                </div> 
            </div>
        </div>

        <br/>
        <br/>
        <br/>
              <div className="row">
                  <div className="col s12 m6">
                      <div className="feature-headline-style-nosize">
                        <div className="col s12 m12">
                        <h5><FaPoll /> <span className="Chinese_font">美元人民币汇率预测</span> &nbsp; <span className="right-align text_question"><Example2/></span></h5>  
                        </div>                      
                      </div>
                      <div>
                          <Line 
                            height="320vh"
                            data={lineChartData}
                            options={lineChartOptions}
                          />
                        </div>           
                  </div> 


                     
                      <div className="col s12 m6">
                      <div className="feature-headline-style-nosize">
                        <h5 ><FaDatabase /> <span className="Chinese_font">监测数据</span> &nbsp; <span className="right-align text_question"><Example4/></span></h5>
                        </div>
                          <ul>
                            <li className="text7"><b className="Chinese_font">美国: </b> 
                              <a href="https://fred.stlouisfed.org/series/EFFR" className="text7"><span className="Chinese_font">联邦基金利率</span></a>，
                              <a href="https://fred.stlouisfed.org/series/CPIAUCSL" className="text7"><span className="Chinese_font">消费价格指数</span></a>，
                              <a href="https://fred.stlouisfed.org/series/UNRATE" className="text7"><span className="Chinese_font">失业率</span></a>，
                              <a href="https://fred.stlouisfed.org/series/SP500" className="text7"><span className="Chinese_font">标准普尔500指数</span></a>，
                              <a href="https://fred.stlouisfed.org/series/VIXCLS" className="text7"><span className="Chinese_font">市场恐慌情绪</span></a>，
                              <a href="https://fred.stlouisfed.org/series/AAA" className="text7"><span className="Chinese_font">AAA公司债券收益率</span></a>
                            </li>
                            <li className="text7"><b className="Chinese_font">中国: </b> 
                            <span className="Chinese_font">国民生产总值（11项数据）</span>，
                            <span className="Chinese_font">消费价格指数（9项数据）</span>，
                            <a href="https://finance.yahoo.com/quote/000001.SS/history?period1=1430265600&period2=1588118400&interval=1d&filter=history&frequency=1d" className="text7"><span className="Chinese_font">上海证券综合指数（6项数据）</span></a>
                            </li>
                            <li className="text7"><b className="Chinese_font">美元人民币汇率: </b>
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7"><span className="Chinese_font">日最高价</span></a>，
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7"><span className="Chinese_font">日最低价</span></a>，
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7"><span className="Chinese_font">日开盘价</span></a>，
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7"><span className="Chinese_font">日闭盘价</span></a>，
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7"><span className="Chinese_font">日浮动百分比</span></a>
                            </li>
                          </ul>
                          <p className="flow-text grey-text text-darken-1 text_footnote">    
                                  <span className="Chinese_font">点击数据名称可跳转数据源<br/>                         
                                  美国数据：<a href="https://fred.stlouisfed.org/">美国联邦储备银行圣路易斯数据库</a> 
                                  ；中国数据：<span className="link"><Example13/></span>
                                  ；汇率数据：<a href="https://finance.yahoo.com/quote/usdcnh=x/">雅虎金融</a> </span>                         
                          </p>

                          <div className="feature-headline-style-nosize">
                      <h5 ><FaStar /> <span className="Chinese_font">最相关数据</span> &nbsp; <span className="right-align text_question"><Example5/></span></h5>
                      </div>
                                <div>
                                <HorizontalBar 
                                    data={barChartData}
                                    options={barChartOptions}
                                  />
                                </div>
                      </div>
              </div>
              
              <div className="row">
                  <div className="col s12 m6">
                  <div className="feature-headline-style">
                      <div className="col s12 m12">
                        <h5><FaBinoculars /> <span className="Chinese_font">市场态度</span> &nbsp; <span className="right-align text_question"><Example7/></span></h5>
                      </div>
                   </div>
                   
                        <div>
                          <Doughnut
                            height="200vh"
                            data={doughnutChartData}
                            options={doughnutChartOptions}
                          />
                        </div>
                        <span className="center-align text_footnote2">
                        
                            <form noValidate onSubmit={this.onSubmit3} >
                                    <button
                                    style={{
                                      width: "100px",
                                      height:"28px",
                                      borderRadius: "3px",
                                      letterSpacing: "0px",
                                      marginTop: "0.3rem",
                                      backgroundColor:"rgb(240,242,236)"
                            
                                    }}
                                    type="submit"
                                    className="btn btn-lg btn-flat waves-effect black-text"
                                    >
                                    <span className="text_footnote2"><span className="Chinese_font">查看数据</span><FaChevronDown/></span>
                                  </button>
                                  </form> 
                                  <Search2 />
                        </span>  
                            <span className="flow-text grey-text text-darken-1 text_footnote Chinese_font">
                                                     
                            <span className="Chinese_font">数据来源：</span><a href="https://www.ig.com/us/forex/markets-forex/usd-cnh"><span className="Chinese_font">汇率券商IG官网</span> </a>，
                                    <a href="https://www.cmcmarkets.com/en/cfd-guides/client-sentiment-tool"><span className="Chinese_font">汇率券商CMC Markets官网</span> </a> ， 
                                    <span className="Chinese_font"><span className="link"><Example14/></span> </span> <br/>
                            </span>   
                       
                    </div>

                  
                <div className="col s12 m6">
                  <div className="col s12 m12">
                  <div className="feature-headline-style-nosize">
                    <h5><FaTty /> <span className="Chinese_font">华尔街态度</span> </h5> 
                    </div>
                    <p className="text"><span className="Chinese_font">每月调查<span className="highlight">15+家</span>华尔街金融公司分析师对汇率走向的态度，并进行<span className="highlight">投票</span>。此内容正在开发，如果你对每月<span className="highlight">华尔街态度</span>感兴趣，请留下你的<span className="highlight">邮箱</span></span>！</p>
                    
                          <form noValidate onSubmit={this.onSubmit2} >
                              <div className="input-field  col s12 m12 l6">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email2}
                                    id="email2"
                                    type="email"
                                  />
                                <label htmlFor="email2"><span className="Chinese_font">邮箱</span></label>
                
                              </div>
                              <div className="input-field col s12 m12 l6">
                                  <button
                                    style={{
                                      width: "100px",
                                      borderRadius: "3px",
                                      letterSpacing: "1.5px",
                                      marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-small signup-button"
                                    >
                                    <span className="Chinese_font">提交</span>
                                  </button>
                              </div>
                              <div className="input-field col s12 m12 l12">
                              <Search />
                              </div>
                          </form>         
                </div>
                
                <div className="col s12 m12">
                <div className="feature-headline-style-nosize">
                  <h5><FaCalendarAlt /> <span className="Chinese_font">波动汇率的重要事件</span>&nbsp; <span className="right-align text_question"><Example6/></span></h5>                 
                  </div>
                  <div className="col s12 m12">
                        <div className="col s11 m11">
               
                        <span className="text Chinese_font"><span className="Chinese_font">5月6日  中国 - 财新服务业采购经理指数 4月份数据发布</span>  </span>  
                        </div>
                        <div className="col s1 m1">
                        <form noValidate onSubmit={this.onSubmit4} >
             
                            <button
                            style={{
                              width: "20px",
                              height:"28px",
                              borderRadius: "3px",
                              letterSpacing: "0px",
                              marginTop: "0rem",
                              backgroundColor:"rgb(240,242,236)"
                    
                            }}
                            type="submit"
                            className="btn btn-lg btn-flat waves-effect black-text"
                            >
                            <FaChevronDown/>
                          </button>
                          </form> 
                      </div>
                      <div className="col s11 m12">
                   <News1/>
                   </div>      
                   </div>   
                      
 
                      

                      <div className="col s12 m12">
                        

                        <div className="col s11 m11">
                        <br/>
                        <span className="text Chinese_font"><span className="Chinese_font">5月11日  中国 - 生产价格指数 4月份数据发布</span>  </span>  
                        </div>
                        <div className="col s1 m1">
                        <form noValidate onSubmit={this.onSubmit5} >
                        <br/>
                            <button
                            style={{
                              width: "20px",
                              height:"28px",
                              borderRadius: "3px",
                              letterSpacing: "0px",
                              marginTop: "0rem",
                              backgroundColor:"rgb(240,242,236)"
                    
                            }}
                            type="submit"
                            className="btn btn-lg btn-flat waves-effect black-text"
                            >
                            <FaChevronDown/>
                          </button>
                          </form> 
                      </div>
                      <div className="col s11 m12">
                   <News2/>
                   </div>
                            
                        
                      </div>
                      
                      <div className="col s12 m12">
                  
                        <div className="col s11 m11">
                        <br/>
                        <span className="text Chinese_font"><span className="Chinese_font">5月14日 中国 - 工业生产指数年率 4月份数据发布</span>  </span>  
                        </div>
                        <div className="col s1 m1">
                        <form noValidate onSubmit={this.onSubmit6} >
                        <br/>
                            <button
                            style={{
                              width: "20px",
                              height:"28px",
                              borderRadius: "3px",
                              letterSpacing: "0px",
                              marginTop: "0rem",
                              backgroundColor:"rgb(240,242,236)"
                    
                            }}
                            type="submit"
                            className="btn btn-lg btn-flat waves-effect black-text"
                            >
                            <FaChevronDown/>
                          </button>
                          </form> 
                      </div>
                      <div className="col s11 m12">
                   <News3/>
                   </div>


                        
                      </div>
                      </div>
                   </div>
              </div>
              <br/>
              <div className="container center-align">
                <a href="mailto:hello@haloy.co" className=""><FaEnvelope/></a>&nbsp; &nbsp; 
                <span className="text"><span className="Chinese_font">如果你有任何问题和建议，请联系我们</span></span>
                <p className="text">© All rights reserved.</p>
              </div>
              <br/>
              <br/>
              <br/>
              <br/>
             
        </div>
      </div>
    );
  }
}


Landing_ch.propTypes = {
  // testing log in
  loginUser: PropTypes.func.isRequired,
  // done testing
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // testing log in
  errors: PropTypes.object.isRequired,
  EarlyAccessUser: PropTypes.func.isRequired
  // done testing
};

const mapStateToProps = state => ({
  auth: state.auth,
  // testing log in
  errors: state.errors
  // done testing
});

export default connect(
  mapStateToProps,
  { logoutUser, SaveNotificationData, readNotificationData, loginUser, EarlyAccessUser}
)(Landing_ch);


