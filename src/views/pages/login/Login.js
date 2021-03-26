import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import logo_img from "../../../assets/img/logo.png";
import { Form, Input, Button } from "antd";
import { LoginService } from "../../../api/index";
import config from "../../../config/index";
import {
  showLoadingCallBack,
  closeShowLoading,
  errorCallBack,
} from "../../../shared/sweetalerts/index";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: { span: 12, offset: 8 },
};

function Login() {

  const [username, setUsername] = useState(
    config.CONFIG_ENV === "development" ? "Sattawat" : ""
  );
  const [password, setPassword] = useState(
    config.CONFIG_ENV === "development" ? "1234" : ""
  );

  const history = useHistory();

  const onFinish = (values) => {
    showLoadingCallBack();
    // console.log("Success:", values);
    LoginService({
      username: values.username,
      password: values.password,
    }).then((res) => {
      console.log("res :>> ", res);
      setTimeout(() => {
        closeShowLoading();
        window.sessionStorage.setItem("token", JSON.stringify(res.data));
        window.sessionStorage.setItem("isLogin", 1);
        history.push("/");
      }, 1000);
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    errorCallBack("กรอกข้อมูลไม่ครบ");
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <h2 className="text-center">
              ระบบสมัครนักศึกษาใหม่
            </h2>
            <br />
            <div className="logo-img">
              <img src={logo_img} />
            </div>
            <Form
              {...layout}
              name="basic"
              initialValues={{
                username: username,
                password: password,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  เข้าสู่ระบบ
                </Button>
                &nbsp;&nbsp;&nbsp;
                {/* <Link to="/register">
                  <Button htmlType="button" >
                    ลงทะเบียน
                  </Button>
                </Link> */}
              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
