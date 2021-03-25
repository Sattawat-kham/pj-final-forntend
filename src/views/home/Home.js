import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import logo_img from "../../assets/img/logo.png";

function Home() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const columns = [

        {
            title: () => "ชื่อ",
            dataIndex: "name",
            key: "name",
            width: 80,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: () => "สาขาที่ต้องการศึกษาต่อ",
            dataIndex: "major",
            key: "major",
            width: 60,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: () => "คาดการณ์สถานะ",
            dataIndex: "label",
            key: "label",
            width: 60,
            sorter: (a, b) => a.order - b.order,
        },
        {
            title: () => "ข้อมูลผู้สมัคร",
            dataIndex: "label",
            key: "label",
            width: 40,
            sorter: (a, b) => a.order - b.order,
        },


    ];

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
                            รายชื่อ
                        </h2>
                        <br />

                        <Table
                            columns={columns}
                            dataSource={list}
                            bordered
                            size="middle"
                            scroll={{ x: "100%", y: "100%" }}
                            rowKey={(record) => record.id}
                            loading={loading}
                        />
                        <br />
                        <div className="d-grid gap-2 col-10 mx-auto">
                            <button className="btn btn-secondary" type="button" onClick={logout}>ออกจากระบบ</button>
                        </div>

                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{ __html: "\n.wrap-login100 {\n    width: 1260px;\n    background: #fff;\n    border-radius: 10px;\n    position: relative;\n    padding: 50px;\n    border-style: solid;\n}\n" }} />


        </>
    )
}

export default Home
