import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';

import PrivateRoute from './privateRoute'
import { errorCallBack } from '../shared/sweetalerts/index'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const Main = React.lazy(() => import('../views/main/Main'));
const Login = React.lazy(() => import('../views/pages/login/Login'));
const Register = React.lazy(() => import('../views/pages/register/Register'));

class RouteRoot extends Component {
  constructor(props) {
    super(props);
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];

    this.warn = this.warn.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {/*ตรวจจับทุกอีเวน์ในการเคลื่อนไหว*/
      window.addEventListener(this.events[i], this.resetTimeout);
    }

  }

  clearTimeout() { /*เคลียไทม์เอา*/
    if (this.warnTimeout) clearTimeout(this.warnTimeout);
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() { /*นับเวลาตรวจจับการเคลื่อนไหวกรณีไม่มีการเคลื่อนไหวในระบบ*/
    this.warnTimeout = setTimeout(this.warn, 1800000); //30 min
    this.logoutTimeout = setTimeout(this.handleLogout, 2100000); //35 min
  }

  resetTimeout() {/*รีเซ็ทกรณีมีการเคลื่อนไหวแล้ว*/
    this.clearTimeout();
    this.setTimeout();

  }

  warn() {/*แจ้งเตื่อนกรณีนับเวลาถึง 25นาทีแล้ว*/
    errorCallBack("คุณไม่ได้ทำรายการใดๆ เป็นเวลา 30 นาที", "หากไม่ทำรายการใดๆต่อ \n จะออกจากระบบอัตโนมัติภายใน 5 นาที")
  }

  destroy() {/*เคลีย*/
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }

  handleLogout() {/*ทำการออกจากระบบ*/

    this.destroy();
    window.sessionStorage.clear();
    window.location.reload();

  }


  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <PrivateRoute path="/" name="Home" render={props => <Main {...props} />}></PrivateRoute>
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default RouteRoot