import React from 'react'
import { useHistory } from "react-router-dom";
import logo_img from "../../assets/img/logo.png";

function Home() {
    const history = useHistory();

    const startQuizes = () => {
        history.push("/quizes");
    }

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("isLogin");
        history.push("/login");
    }

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <h2 className="text-center">
                            แบบทดสอบความบกพร่อง <br /> การมองเห็นด้านสี
                        </h2>
                        <br />
                        <div className="logo-img">
                            <img src={logo_img} />
                        </div>
                        <div className="d-grid gap-2 col-10 mx-auto">
                            <button className="btn btn-primary" type="button" onClick={startQuizes}>เริ่มทำแบบทดสอบ</button>
                            <button className="btn btn-secondary" type="button" onClick={logout}>ออกจากระบบ</button>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default Home
