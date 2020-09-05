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
  labels: ['past 3 days', 'past 1 week', 'past 1 month', 'past 3 months'],
  datasets: [
  {
  label: 'range',
  backgroundColor: 'rgb(1, 2, 58)',
  stack: '3',
  data: [98, 98, 98, 90],
  },
  {
  
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
                min: 0,
                max: 100,
                callback: function(value) {
                    return value + "%"
                }
              }
            },],
            yAxes: [{
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
  labels: ['China - Monthly CPI', 'US - Monthly CPI', 'China - Quarterly GDP',
           'US - Aaa Corporate Bonds', 'US - S&P 500'],
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
                min: 0,
                max: 1,
                callback: function(value) {
                    return value
                }
              },
              scaleLabel: {
                display: true,
                labelString: "Correlation Coefficient (Absolute Value)"
              }
            },],
            yAxes: [{
              barPercentage: 0.3,
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
            }
            },],
          },
    
  };

const doughnutChartData = {
  labels: ['USD/CNH will trend lower', 'USD/CNH will trend higher'],
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


class Landing extends Component {

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
          <p className = "text_footnote">
          After logging in, you can monitor bank<br/>
          USD/CNY, markets USD/CNH, major <br/>
          brokers’ market views, and upcoming <br/>
          events that will move USD/CNH. <span className="highlight">Avoid <br/>
          the hassle of self-monitoring exchange <br/>
          rates.</span><br/>
          <br/>
          <a href="https://www.nasdaq.com/articles/cnh-vs-cny-differences-between-two-yuan-2018-09-12">Read more</a> on CNY vs CNH
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
          <p className = "text_footnote">
          Forecast USD/CNH with <span className="highlight">machine learing<br/>
          models</span>. Data covers macroeconomics,<br/>
          stock markets, market sentiment, and<br/>
          historical USD/CNH data.<br/>
          <br/>
          The model forecasts the <span className="highlight">directional <br/>
          trend</span>, not the exact rate. USD/CNH<br/>
          is largely affected by real-time current <br/>
          events and latest published economics<br/>
          data. After logging in, you can turn on<br/>
          the leading indicator <span className="highlight">notification</span> to <br/>
          prepare for rate moves
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
          <p className = "text_footnote">
          The blue range is the USD/CNH <br/>
          <span className="highlight">moving range</span> of the past periods. <br/>
          The green spot is where the <span className="highlight">current<br/>
          level</span> sits
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
          <p className = "text_footnote">
          Monitored data is all from <span className="highlight">official <br/>
          websites</span>. Clicking the data name will <br/>
          direct you to the data source. Data <br/>
          and forecast are <span className="highlight">daily</span> updated
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
          <p className = "text_footnote">
          The <span className="highlight">top 5</span> correlated data points found<br/>
          in machine learning models. 1 is 100%<br/>
          correlated, 0 is 0% correlated. See<br/>
          “Monitored Data” for data source
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
          <p className = "text_footnote">
          USD/CNH is mainly moved by current events, newly<br/>
          published macroeconomics data, and interest rate<br/>
          adjustments. The section lists <span className="highlight">upcoming events</span> that will<br/>
          likely <span className="highlight">largely move</span> USD/CNH, including the publication<br/>
          of leading indicators (forecast GDP), Federal Reserve<br/>
          meetings (decide US interest rate) and major China-US <br/>
          trade events.<br/>
          <br/>
          After logging in, you can turn on the leading indicator<br/>
          <span className="highlight">email notification</span> to receive analysis and <span className="highlight">Bloomberg <br/> 
          forecast</span> 3 days before events take place
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
          <p className = "text_footnote">
          3 major <span className="highlight">exchange rate brokers</span> publish <br/>
          their clients’ views on USD/CNH <span className="highlight">daily</span>. <br/>
          The chart shows the percentage of <br/>
          people holding the same view by taking<br/>
          the <span className="highlight">average</span> of the numbers from all <br/>
          brokers. After logging in, you can turn<br/>
          on markets view <span className="highlight">notification</span> to receive<br/>
          an email when <span className="highlight">more than 50%</span> trading<br/>
          analysts believe that USD/CNY will trend <br/>
          <span className="highlight">ower</span>l.<br/>
          <br/>
          If you know any other broker publishing<br/>
          USD/CNH data daily, please contact us. <br/>
          We will add it to our analysis
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
          <p className = "text_noti"><FaSignInAlt/> <span className="highlight">Log in</span> to turn on&nbsp;
           <span className="highlight">email</span> notification
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
          <p className = "text_footnote">
          3 major <span className="highlight">exchange rate brokers</span> (IG, CMC <br/>
          Markets, and OANDA) publish their <span className="highlight">clients’<br/>
          views</span> on USD/CNH daily. We take the <br/>
          <span className="highlight">average</span> of the numbers from the 3 brokers.<br/>
          You will receive an email when <span className="highlight">more than<br/>
          50%</span> trading analysts from the 3 brokers<br/>
          believe that USD/CNH will trend <span className="highlight">lower</span>. <br/>
          <br/>
          See more details in “Markets View”
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
         <p className = "text_footnote">
          Leading indicators are economic factors<br/>
          that can <span className="highlight">forecast</span> economy. The publication<br/>
          of leading indicators could <span className="highlight">largely move</span> <br/>
          USD/CNH, especially when published data<br/>
          is <span className="highlight">not in line</span> with the mainstream consensus. <br/>
          Notification email will list <span className="highlight">Bloomberg  <br/>
          consensus</span> and analyze how the data might<br/>
          move USD/CNH.<br/>
          <br/>
          Monitored indicators include PMI (Purchasing <br/>
          Manager Index: forecast <span className="highlight">GDP</span>), PPI (Producer<br/>
          Price Index: forecast <span className="highlight">inflation</span>), and Federal<br/>
          Reserve meeting (decide US <span className="highlight">interest rate</span>)
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
          <p className = "text_footnote">
          Exchange rate market is a 24-hour <br/>
          market except on weekends. The <br/>
          opening time used here is 8 AM EST <br/>
          <br/>
          <a href="https://www.investopedia.com/terms/forex/f/forex-market-trading-hours.asp">Read more</a> on forex market hours
          </p> 
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
          The <span className="highlight">official website</span> of National Bureau of Statistics of China is<br/>
          categorized as "<span className="highlight">Not Secure</span>" by the search engine, so we <span className="highlight">cannot</span><br/>
          directly link it. You can visit <span className="link">http://data.stats.gov.cn/</span> for the main<br/>
          page, <span className="link">http://data.stats.gov.cn/easyquery.htm?cn=A01</span> for CPI <br/>
          data, and <span className="link">http://data.stats.gov.cn/easyquery.htm?cn=B01</span> for <br/>
          GDP data.
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
          The OANDA website is categorized as a "<span className="highlight">Not Secure</span>"<br/>
           website, so we <span className="highlight">cannot</span> directly link it. You can visit<br/>
           <span className="link">http://dashboard.oanda.com/dashboard</span> for the market<br/> 
          sentiment page.
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
        <span className="link">What does it mean?</span>
      </OverlayTrigger>
    );

    const Example10 = () => (
      <OverlayTrigger
        placement="top"
        delay={{ show: 100, hide: 1200 }}
        overlay={renderTooltip10}
      >
        <span className="link">What does it mean?</span>
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
       <span>National Bureau of Statistics of China</span>
      </OverlayTrigger>
    );

    const Example14 = () => (
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 1200 }}
        overlay={renderTooltip14}
      >
       <span>Exchange rate broker OANDA official website</span>
      </OverlayTrigger>
    );


    const Search = () => {
      return (
        <div>

          { this.state.show_confirm ? <span className="text_thankyou"><FaCheck /> Submitted</span>: null }
        </div>
      )
    }

    const Search2 = () => {
      return (
        <div>

          { this.state.show_broker_data ? <span className="text_footnote2">% of people believing USD/CNY will trend higher/lower：IG 58%/42%，CMC Markets 59%/41%, OANDA 100%/0%</span>: null }
        </div>
      )
    }

    const News1 = () => {
      return (
        <div>

          { this.state.show_news1 ? <span className="text_footnote2">The March value was 43. Usually, if the actual value is <span className="highlight">higher than</span> the forecast, USD/CNY will trend <span className="highlight">lower</span> (CNY strengthens); if the actual value is <span className="highlight">lower than</span> the forecast, USD/CNY will trend <span className="highlight">high</span> (CNY weakens).
          <br/><br/>
          More about the index: this index is computed by questionnaires sent to purchasing managers in over 400 private companies in service sector. It forecasts sales, inventories, sales, etc. A value above 50 means that the service sector expanded; a value below 50 means that the service sector shrank. This index can forecast China’s GDP and economic development and directly affect USD/CNY.
          </span>: null }
        </div>
      )
    }

    const News2 = () => {
      return (
        <div>

          { this.state.show_news2 ? <span className="text_footnote2">The forecast is -1.1%. Usually, if the actual value is <span className="highlight">higher than</span> the forecast, USD/CNY will trend <span className="highlight">lower</span> (CNY strengthens); if the actual value is <span className="highlight">lower than</span> the forecast, USD/CNY will trend <span className="highlight">high</span> (CNY weakens).
          <br/><br/>
          More about the index: The Producer Price Index (PPI) measures the change in the price of goods sold by manufacturers. It is a leading indicator of consumer price inflation, which accounts for the majority of overall inflation. It directly affects USD/CNY.
          </span>: null }
        </div>
      )
    }

    const News3 = () => {
      return (
        <div>

          { this.state.show_news3 ? <span className="text_footnote2">The March value was -1.1%. Usually, if the actual value is <span className="highlight">higher than</span> the forecast, USD/CNY will trend <span className="highlight">lower</span> (CNY strengthens); if the actual value is <span className="highlight">lower than</span> the forecast, USD/CNY will trend <span className="highlight">high</span> (CNY weakens).
                <br/><br/>
                More about the index: the index is calculated from the production of the same month last year and measures the change of output produced by manufacturers. Since the three main pillars of China’s GDP are manufacturers, mines, and utilities, the index can forecast China’s GDP, directly affecting USD/CNY.
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
                      to="/ch"
                      style={{
                        width: "100px",
                        borderRadius: "3px",
                        letterSpacing: "1px"
                      }}
                      className="flow-text-small grey-text text-darken-1"
                    >
                      <span className="Chinese_font">中文</span>
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
                  Log in
                </Link>
              </div>


                

              <div className="valign-wrapper" style={{height: hight}}>

              <div className="row">
                  <div className="col s12 m12 right-align"> 
                    <h4 className = "headline-style center-align Chinese_font">
                      <b className="highlight">Monitor</b>  and <b className="highlight">Forecast</b>
                        <p>Chinese Yuan (¥) <img src={china_flag} alt="icon" /> and US Dollar ($) <img src={us_flag} alt="icon" /></p>
                    </h4>
                      <p className="flow-text grey-text text-darken-1 center-align text5 Chinese_font">
                      Built by investment bank professionals and machine learning developers<br/>
                      All data from official websites
                      </p>
                  </div>

                  <div className="col s12 m12 center-align Chinese_font"> 
                      <div className="row ">
                          <div className="col s12 m4">
                             <div className="feature-square">
                                <h5 className="feature-headline-style"><FaDatabase /> Monitor 37 Datasets</h5>
 
                             </div>
                         </div>
                        <div className="col s12 m4 ">
                          <div className="feature-square">
                              <h5 className="feature-headline-style"><FaPoll /> Forecast 2 Week USD/CNH</h5>
                          </div>
                        </div>
                        <div className="col s12 m4">
                          <div className="feature-square">
                            <h5 className="feature-headline-style"><FaBell /> Set Customized Notification</h5>
                          </div>
                        </div>
                    </div>

                  <div class="arrow bounce">
                      <a class="sub-headline-style" href="#monitor">
                      <FaChevronDown/>
                      </a>
                      
                  </div>
                  <p className="flow-text grey-text text-darken-1 center-align text_footnote Chinese_font">
                        US data source: <a href="https://fred.stlouisfed.org/" className="flow-text grey-text text-darken-1 center-align text_footnote">Federal Reserve Bank of St. Louis</a> <br/>
                        China's data source: <Example13/>  <br/>
                        USD/CNH data source: <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="flow-text grey-text text-darken-1 center-align text_footnote">Yahoo Finance</a> <br/>
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
                                <b>2020-05-11 Monday</b>
                            </h4>
                            <p className="text col s12 m12 center-align"><FaMoneyBillAlt /> <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text">USD/CNH today's opening price</a> <b className="highlight">7.0902</b>&nbsp; <span className="right-align text_question"><Example12/></span></p>
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
                              <p className="enter-align text_footnote flow-text grey-text text-darken-1">Data source: bank official websites
                              </p>
                              
                      </div>
                      <div className="col s12 m12">
                            <br/>
                            <div className="feature-headline-style-nosize Chinese_font">
                              <h5><FaGavel /> The Current USD/CNH Level &nbsp; <span className="right-align text_question"><Example3/></span></h5>
                                <div>
                                  <HorizontalBar 
                                    height="320vh"
                                    data={rangeChartData}
                                    options={rangeChartOptions}
                                  />
                                </div>
                            </div>
                            <div>
                                <span className="Chinese_font enter-align text_footnote flow-text grey-text text-darken-1">Data source: <a href="https://finance.yahoo.com/quote/usdcnh=x/">Yahoo Finance</a> </span>
                            </div>    
                      </div>    
                </div>  


                <div className="col s12 m6 l6">
                  <br/>
                  <br/>
                  <br/>
                  <div className="feature-square3">
                  <span class="brmedium">
                  <h5 className="feature-headline-style-nosize"><FaBell /> <span class="highlight">Set Up Your Own Notification</span> &nbsp; <span className="right-align text_question"><Example1/></span></h5>
                  </span>
                
                  <p className="text">Let a bot monitor USD/CNY for you! Receive an <span class="highlight">email</span> when: </p>
                  <div className="col s12 m12 l12">
                        <span className="col s12 m12 l4"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span>
                        <span className="col s5 m5 l3"><p className="text right-align">USD/CNY > </p></span>
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
                        <span className="col s12 m12 l4"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span>
                        <span className="col s5 m5 l3"><p className="text right-align">USD/CNY &#60;  </p></span>
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
                        <span className="col s12 m12 l4"><Dropdown options={options} placeholder={"中国银行 BOC"} className="text_footnote"/></span>
                        <span className="col s5 m5 l3"><p className="text right-align">USD/CNY 1 day move > </p></span>
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
                        <span className="col s9 m9 l10"><p className="text">More than 50% trading analysts believe USD/CNY will trend lower &nbsp;<span ><Example9/></span></p></span>      
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                    
                  
                    <div className="col s12 m12 l12">
                        <span className="col s9 m9 l10"><p className="text">3 days before the publication of <a href="" className="text">leading indicators</a> that likely largely move USD/CNY &nbsp;<span ><Example10/></span></p></span> 
                        <span className="col s3 m3 l2 headline-style2">
                          <Example8/>
                        </span>
                    </div>
                    
                  <h5 className="feature-headline-style-nosize"><FaSignInAlt /> <span className="highlight">Login Below</span> </h5><span className="grey-text text-darken-1">Don't have an account?</span> <Link to="/register_ch">Register</Link>

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
                          <label htmlFor="email">Email</label>
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
                          <label htmlFor="password">Password</label>
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
                            Login
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
                        <h5><FaPoll /> USD/CNH Forecast &nbsp; <span className="right-align text_question"><Example2/></span></h5>  
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
                        <h5 className="feature-headline-style-nosize"><FaDatabase /> Monitored Data &nbsp; <span className="right-align text_question"><Example4/></span></h5>
                          <ul>
                            <li className="text7"><b>US: </b> 
                              <a href="https://fred.stlouisfed.org/series/EFFR" className="text7">Effective Federal Funds Rate</a>,&nbsp; 
                              <a href="https://fred.stlouisfed.org/series/CPIAUCSL" className="text7">Consumer Price Index</a>,&nbsp; 
                              <a href="https://fred.stlouisfed.org/series/UNRATE" className="text7">Unemployment Rate</a>,&nbsp; 
                              <a href="https://fred.stlouisfed.org/series/SP500" className="text7">S&P 500</a>,&nbsp; 
                              <a href="https://fred.stlouisfed.org/series/VIXCLS" className="text7">VIX</a>,&nbsp; 
                              <a href="https://fred.stlouisfed.org/series/AAA" className="text7">Moody's Seasoned Aaa Corporate Bond Yield</a>
                            </li>
                            <li className="text7"><b>China: </b> 
                            <span  className="text7">Gross Domestic Product (11 categories)</span>,&nbsp;
                            <span  className="text7">Consumer Price Index (9 categories)</span>,&nbsp;
                            <a href="https://finance.yahoo.com/quote/000001.SS/history?period1=1430265600&period2=1588118400&interval=1d&filter=history&frequency=1d" className="text7">Shanghai Stock Exchange Index (6 categories)</a>
                            </li>
                            <li className="text7"><b>USD/CNH: </b>
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7">Daily high</a>,&nbsp;
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7">Daily low</a>,&nbsp;
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7">Daily open</a>,&nbsp;
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7">Daily close</a>,&nbsp;
                            <a href="https://finance.yahoo.com/quote/usdcnh=x/" className="text7">Daily change %</a>
                            </li>
                          </ul>
                          <p className="flow-text grey-text text-darken-1 text_footnote">    
                                  Clicking the data name will direct you to the data source<br/>                         
                                  US data source: <a href="https://fred.stlouisfed.org/">Federal Reserve Bank of St. Louis</a>
                                  ; China's data source: <span className="link"><Example13/></span>
                                  ; USD/CNH data source: <a href="https://finance.yahoo.com/quote/usdcnh=x/">Yahoo Finance</a>                          
                          </p>

                    
                      <h5 className="feature-headline-style-nosize"><FaStar /> Top Correlated Data &nbsp; <span className="right-align text_question"><Example5/></span></h5>
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
                        <h5><FaBinoculars /> Markets View &nbsp; <span className="right-align text_question"><Example7/></span></h5>
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
                                    <span className="text_footnote2">details<FaChevronDown/></span>
                                  </button>
                                  </form> 
                                  <Search2 />
                        </span>  
                            <span className="flow-text grey-text text-darken-1 text_footnote">
                                                     
                                    Data source: <a href="https://www.ig.com/us/forex/markets-forex/usd-cnh">Exchange rate broker IG official website</a>，
                                    <a href="https://www.cmcmarkets.com/en/cfd-guides/client-sentiment-tool">Exchange rate broker CMC Markets official website</a> ， 
                                    <span className="link"><Example14/></span> <br/>
                            </span>   
                       
                    </div>

                  
                <div className="col s12 m6">
                  <div className="col s12 m12">
                  
                    <h5 className="feature-headline-style-nosize"><FaTty /> Wall Street View</h5> 
                    <p className="text"> Each month, we <span className="highlight">survey 15+</span> Wall Street financial institutions and <span className="highlight">poll</span> their attitudes on USD/CNH. The content is in development. Curious about investment banks' views on USD/CNH? Leave your <span className="highlight">email</span> to get <span className="highlight">early access</span> !</p>
                    
                          <form noValidate onSubmit={this.onSubmit2} >
                              <div className="input-field  col s12 m12 l6">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email2}
                                    id="email2"
                                    type="email"
                                  />
                                <label htmlFor="email2">Email</label>
                
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
                                    Submit
                                  </button>
                              </div>
                              <div className="input-field col s12 m12 l12">
                              <Search />
                              </div>
                          </form>         
                </div>
                <br/>
                <div className="col s12 m12">
                  <h5 className="feature-headline-style-nosize"><FaCalendarAlt /> Umcomping Events &nbsp; <span className="right-align text_question"><Example6/></span></h5>                 
                  <div className="col s12 m12">
                        <div className="col s11 m11">
               
                        <span className="text">May 6&nbsp;  CHINA - Caixin Services Purchasing Managers Index (April)</span>  
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
                        <span className="text">May 11&nbsp;  CHINA - Producer Price Index (April)</span>  
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
                        <span className="text">May 14&nbsp; CHINA - Industrial Production (April)</span>  
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
                <span className="text">Contact us if you have any questions or suggestions</span>
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


Landing.propTypes = {
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
)(Landing);


