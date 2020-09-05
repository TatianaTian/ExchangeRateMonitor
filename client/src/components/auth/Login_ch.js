import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory'

class Login_ch extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

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
      action: "User log in - Chinese log in page"
    });
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const history = createHistory()
    //console.log("history.location.path is ", history.location.pathname)
    ReactGA.set({ page: history.location.pathname})
    ReactGA.pageview(history.location.pathname)

    return (
      <div className="main_background_image"> 
      <div style={{height: window.screen.height}} className="container">
        <div className="col center-align">
          <br/>
            <Link
                  to="/login_ch"
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
                  to="/login"
                  style={{
                    width: "100px",
                    borderRadius: "3px",
                    letterSpacing: "1px"
                  }}
                  className="flow-text-small grey-text text-darken-1"
                >
                 English
            </Link>
          </div>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/ch" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> <span className="Chinese_font">返回主页</span>
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b><span className="Chinese_font">登陆</span></b>
              </h4>
              <p className="grey-text text-darken-1">
              <span className="Chinese_font">没有账号？</span> <Link to="/register_ch"><span className="Chinese_font">注册</span></Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
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
              <div className="input-field col s12">
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
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  <span className="Chinese_font">登陆</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Login_ch.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login_ch);
