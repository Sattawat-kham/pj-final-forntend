import React from 'react';
import ReactDOM from 'react-dom';
import RouteRoot from './routes/rootRoute'
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css';
import { ConfigProvider } from "antd";

import th_TH from "antd/es/locale/th_TH";
import "moment/locale/th";

import './scss/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={th_TH} >
      <RouteRoot />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
