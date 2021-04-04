import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Table, Select } from "antd";
import logo_img from "../../assets/img/logo.png";
import { Getregister } from "../../api";
import { closeShowLoading, errorCallBack, showLoadingCallBack } from '../../shared/sweetalerts';

function Home() {

    const { Option } = Select;

    const [list, setList] = useState([]);
    const [listAll, setListAll] = useState([]);
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
            setListAll(res.data)
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
            render(text, record) {
                let text_show = text == 1 ? "มีโอกาศเข้าศึกษาสูง" : "มีโอกาศเข้าศึกษาต่ำ";
                return {
                    props: {
                        style: { color: text == 1 ? "green" : "red" }
                    },
                    children: <div>{text_show}</div>
                };
            }
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

    function fillter_major(value) {
        let new_list = [];
        let major = value;
        if (major == "ทั้งหมด") {
            new_list = listAll;
        } else {
            listAll.forEach((e, index) => {
                if (e.major == major) {
                    new_list.push(e);
                }
            });
        }
        setList(new_list);
    }

    function fillter_label(value) {
        let new_list = [];
        let label = value;
        if (label == "ทั้งหมด") {
            new_list = listAll;
        } else {
            listAll.forEach((e, index) => {
                if (e.label == label) {
                    new_list.push(e);
                }
            });
        }
        setList(new_list);
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
                        <label for="major_fillter">สาขาวิชา :</label>&nbsp;&nbsp;
                        <Select name="major_fillter" id="major_fillter" defaultValue="ทั้งหมด" style={{ width: "35%" }} onChange={fillter_major}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="ทั้งหมด">ทั้งหมด</Option>
                            <Option value="วิทยาการคอมพิวเตอร์">วิทยาการคอมพิวเตอร์</Option>
                            <Option value="เทคโนโลยีสารสนเทศ">เทคโนโลยีสารสนเทศ</Option>
                            <Option value="เทคโนโลยีมัลติมีเดีย">เทคโนโลยีมัลติมีเดีย</Option>
                            <Option value="วิทยาศาสตร์การกีฬา">วิทยาศาสตร์การกีฬา</Option>
                            <Option value="วิทยาศาสตร์สิ่งแวดล้อม">วิทยาศาสตร์สิ่งแวดล้อม</Option>
                            <Option value="เทคโนโลยีวิศวกรรมโยธา">เทคโนโลยีวิศวกรรมโยธา</Option>
                            <Option value="อิเล็กทรอนิกส์และคอมพิวเตอร์อุตสาหกรรม">อิเล็กทรอนิกส์และคอมพิวเตอร์อุตสาหกรรม</Option>
                            <Option value="เทคโนโลยีการผลิต">เทคโนโลยีการผลิต</Option>
                            <Option value="อาหารและโภชนาการ">อาหารและโภชนาการ</Option>
                            <Option value="วิทยาศาสตร์ทั่วไป (ค.บ. 4 ปี)">วิทยาศาสตร์ทั่วไป (ค.บ. 4 ปี)</Option>
                            <Option value="ฟิสิกส์ (ค.บ. 4 ปี)">ฟิสิกส์ (ค.บ. 4 ปี)</Option>
                            <Option value="คณิตศาสตร์ (ค.บ. 4 ปี)">คณิตศาสตร์ (ค.บ. 4 ปี)</Option>
                            <Option value="เคมี (ค.บ. 4 ปี)">เคมี (ค.บ. 4 ปี)</Option>
                            <Option value="ชีววิทยา (ค.บ. 4 ปี)">ชีววิทยา (ค.บ. 4 ปี)</Option>
                            <Option value="สาขาอื่นๆ">สาขาอื่นๆ</Option>
                        </Select>&nbsp;&nbsp;
                        <label for="label_fillter">คาดการณ์สถานะ :</label>&nbsp;&nbsp;
                        <Select name="label_fillter" id="label_fillter" defaultValue="ทั้งหมด" style={{ width: "25%" }} onChange={fillter_label}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            <Option value="ทั้งหมด">ทั้งหมด</Option>
                            <Option value="1">มีโอกาศเข้าศึกษาสูง</Option>
                            <Option value="0">มีโอกาศเข้าศึกษาต่ำ</Option>
                        </Select>
                        <br /><br />
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
