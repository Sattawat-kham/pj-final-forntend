import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Table } from "antd";
import logo_img from "../../assets/img/logo.png";
import { Getregister } from "../../api";
import { closeShowLoading, errorCallBack, showLoadingCallBack } from '../../shared/sweetalerts';

function Home() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        try {
            showLoadingCallBack()
            const res = await Getregister()
            res.data.forEach((e, index) => {
                e.fullname = e.name + " " + e.subname;
             });

            console.log(`res.data`, res.data)
            setList(res.data)           
            closeShowLoading()
        } catch (error) {
            closeShowLoading()
            // console.log('error :>> ', error.response.data.error);
            // const log = error.response.data.error ? error.response.data.error.message : undefined;
            errorCallBack("ข้อความจากระบบ", "มีบางอย่างผิดพลาด");
        }
    }, [])

    const columns = [

        {
            title: () => "ชื่อ",
            dataIndex: "fullname",
            key: "fullname",
            width: 80,
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
        },
        {
            title: () => "เพศ",
            dataIndex: "sex",
            key: "sex",
            width: 60,
            sorter: (a, b) => a.order - b.order,
            render: (a, b) => a == 1 ? "ชาย" : "หญิง",
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
            render: (a, b) => a == 1 ? "มีโอกาศเข้าศึกษาสูง" : "มีโอกาศเข้าศึกษาต่ำ",
        },
        // {
        //     title: () => "ข้อมูลผู้สมัคร",
        //     dataIndex: "aa",
        //     key: "aa",
        //     width: 40,
        //     sorter: (a, b) => a.order - b.order,
        // },


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
                            รายชื่อผู้สมัคร
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

            <style dangerouslySetInnerHTML={{ __html: "\n.wrap-login100 {\n    width: 1280px;\n    background: #fff;\n    border-radius: 10px;\n    position: relative;\n    padding: 90px;\n    border-style: solid;\n}\n" }} />


        </>
    )
}

export default Home
