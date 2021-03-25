/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { errorCallBack } from '../shared/sweetalerts/index'

const PrivateRoute = ({ component: Component, ...rest }) => {

    useEffect(() => {
        if (window.sessionStorage.getItem('isLogin') == 1) {
            if (JSON.parse(window.sessionStorage.getItem('token')).expires_in < Date.now() / 1000) {
                // console.log("หมดเวลาtoken")
                errorCallBack("Token หมดอายุกรุณาเข้าสู่ระบบใหม่อีกครั้ง", "หมดเวลาการเข้าสู่ระบบกรุณาทำการเข้าสู่ระบบใหม่อีกครั้ง!")
                handleLogout();
            }
        }
    })

    const handleLogout = () => {
        this.destroy();
        window.sessionStorage.clear();
        window.location.reload();
    }

    return (
        window.sessionStorage.getItem('isLogin') === "1" ? (<Route {...rest} />) : (<Redirect to={{
            pathname: process.env.PUBLIC_URL + '/register'
        }} />)
    )
}

export default PrivateRoute
