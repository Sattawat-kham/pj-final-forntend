import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo_img from "../../../assets/img/logo.png";
import { Form, Input, Button, Radio, DatePicker, Select } from "antd";
import { RegisterService, LoginService } from "../../../api/index";
import moment from 'moment';
import {
  showLoadingCallBack,
  closeShowLoading,
  errorCallBack,
} from "../../../shared/sweetalerts/index";

const { Option } = Select;
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

const Register = () => {

  const history = useHistory();

  const [listmajor, setlistmajor] = useState([
    {
      id: 0,
      name: "วิทยาการคอมพิวเตอร์"
    },
    {
      id: 1,
      name: "เทคโนโลยีสารสนเทศ"
    },
    {
      id: 2,
      name: "เทคโนโลยีมัลติมีเดีย"
    },
    {
      id: 3,
      name: "วิทยาศาสตร์การกีฬา"
    },
    {
      id: 4,
      name: "วิทยาศาสตร์สิ่งแวดล้อม"
    },
    {
      id: 5,
      name: "เทคโนโลยีวิศวกรรมโยธา"
    },
    {
      id: 6,
      name: "อิเล็กทรอนิกส์และคอมพิวเตอร์อุตสาหกรรม"
    },
    {
      id: 7,
      name: "เทคโนโลยีการผลิต"
    },
    {
      id: 8,
      name: "อาหารและโภชนาการ"
    },
    {
      id: 9,
      name: "วิทยาศาสตร์ทั่วไป (ค.บ. 4 ปี)"
    },
    {
      id: 10,
      name: "ฟิสิกส์ (ค.บ. 4 ปี)"
    },
    {
      id: 11,
      name: "คณิตศาสตร์ (ค.บ. 4 ปี)"
    },
    {
      id: 12,
      name: "เคมี (ค.บ. 4 ปี)"
    },
    {
      id: 13,
      name: "ชีววิทยา (ค.บ. 4 ปี)"
    },
    {
      id: 14,
      name: "สาขาอื่นๆ"
    },
  ])

  const [listf_work, setlistf_work] = useState([
    {
      id: 0,
      name: "รับจ้าง"
    },
    {
      id: 1,
      name: "ธุรกิจส่วนตัว"
    },
    {
      id: 2,
      name: "ค้าขาย"
    },
    {
      id: 3,
      name: "พนักงานบริษัท"
    },
    {
      id: 4,
      name: "ข้าราชการ"
    },
    {
      id: 5,
      name: "ทำสวน"
    },
    {
      id: 6,
      name: "อาชีพอื่นๆ"
    },
  ])

  const [listm_work, setlistm_work] = useState([
    {
      id: 0,
      name: "รับจ้าง"
    },
    {
      id: 1,
      name: "ธุรกิจส่วนตัว"
    },
    {
      id: 2,
      name: "ค้าขาย"
    },
    {
      id: 3,
      name: "พนักงานบริษัท"
    },
    {
      id: 4,
      name: "ข้าราชการ"
    },
    {
      id: 5,
      name: "แม่บ้าน"
    },
    {
      id: 6,
      name: "อาชีพอื่นๆ"
    },
  ])

  let [passwordConfirm, setPasswordConfirm] = useState(null);
  let [password, setPassword] = useState(null);
  const onFinish = async (val) => {

    if (val.major <= 0.5) {
      val.label = 1;
      if (val.grade <= 2.485) {
        val.label = 1;
        if (val.sex <= 0.5) {
          val.label = 0;
        } else {
          val.label = 1;
          if (val.grade <= 1.92) {
            val.label = 0;
          } else {
            val.label = 1;
          }
        }
      } else {
        val.label = 1;
        if (val.morther_work <= 2.5) {
          val.label = 1;
          if (val.morther_work <= 1.5) {
            val.label = 1;

          } else {
            val.label = 1;
            if (val.father_work <= 2.5) {
              val.label = 1;
              if (val.grade <= 3.135) {
                val.label = 0;
              } else {
                val.label = 1;
              }
            } else {
              val.label = 1;
            }
          }
        } else {
          val.label = 1;
        }
      }
    }
    else {
      val.label = 0;
      if (val.school_type <= 1.5) {
        val.label = 0;
        if (val.major <= 7.5) {
          val.label = 0;
          if (val.income <= 5.5) {
            val.label = 0;
          } else {
            val.label = 1;
            if (val.sex <= 0.5) {
              val.label = 0;
              if (val.father_work <= 0.5) {
                val.label = 1;
              } else {
                val.label = 0;
              }
            } else {
              val.label = 1;
            }
          }
        } else {
          val.label = 1;
          if (val.father_work <= 3.0) {
            val.label = 1;
          } else {
            val.label = 0;
          }
        }
      } else {
        val.label = 0;
      }
    }

    const index_major = listmajor.findIndex(e => e.id == val.major)
    if (index_major != -1) {
      val.major = listmajor[index_major].name
    }

    const indexm_work = listm_work.findIndex(e => e.id == val.morther_work)
    if (indexm_work != -1) {
      val.morther_work = listm_work[indexm_work].name
    }

    const indexf_work = listf_work.findIndex(e => e.id == val.father_work)
    if (indexf_work != -1) {
      val.father_work = listf_work[indexf_work].name
    }

    val.faculty = "วิทยาศาสตร์";

    val.birth_date = `${moment(new Date(val.birthday._d)).format('YYYY-MM-DD')}`

    /* บันทึก */
    showLoadingCallBack();
    const res = await RegisterService(val);
    closeShowLoading();
  };

  const onFinishFailed = (errorInfo) => {
    errorCallBack("กรอกข้อมูลไม่ครบ");
  };

  const configDatePicker = {
    rules: [
      { type: "object", required: true, message: "Please select Birthday!" },
    ],
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <h2 className="text-center">
              ระบบสมัครนักศึกษา
            </h2>
            <br />
            <div className="logo-img">
              <img src={logo_img} />
            </div>
            <Form
              {...layout}
              name="basic"
              // initialValues={{
              //   passwordConfirm: passwordConfirm,
              //   password: password,
              // }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="ชื่อจริง"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อจริง",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="นามสกุล"
                name="subname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="บัตรประจำตัวประชาชน"
                name="id_card"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกบัตรประจำตัวประชาชน",
                  },
                ]}
              >
                <Input showCount maxLength={13} />
              </Form.Item>

              <Form.Item name="birthday" label="วันเกิด" {...configDatePicker}>
                <DatePicker />
              </Form.Item>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  {
                    type: 'email',
                    required: true,
                    message: "กรุณากรอกอีเมล",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="ที่อยู่"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกที่อยู่",
                  },
                ]}
              >
                <Input.TextArea showCount maxLength={255} />
              </Form.Item>

              <Form.Item
                name="domicile"
                label="ภูมิลำเนา"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกภูมิลำเนา",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="0">ภาคกลาง</Radio>
                  <Radio value="1">ภาคตะวันออกเฉียงเหนือ</Radio>
                  <Radio value="2">ภาคเหนือ</Radio>
                  <Radio value="3">ภาคใต้</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="เกรดเฉลี่ย"
                name="grade"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเกรดเฉลี่ย",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="สาขาที่ต้องการเข้าศึกษาต่อ"
                name="major"
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกสาขาวิชา'
                  }
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="สาขา"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                >
                  {listmajor.map(e => (<Option value={e.id}>{e.name}</Option>))}
                </Select>
              </Form.Item>

              <Form.Item
                name="sex"
                label="เพศ"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกเพศ",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">ผู้ชาย</Radio>
                  <Radio value="0">ผู้หญิง</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="ชื่อโรงเรียน"
                name="school_name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อโรงเรียน",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="school_type"
                label="ประเภทโรงเรียน"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเภทโรงเรียน",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">มัธยมศึกษาตอนปลาย</Radio>
                  <Radio value="2">ประกาศนียบัตรวิชาชีพ (ปวช.)</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="ชื่อ-นามสกุล บิดา"
                name="father_name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ-นามสกุลบิดา",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="อาชีพบิดา"
                name="father_work"
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกอาชีพบิดา'
                  }
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="อาชีพบิดา"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                >
                  {listf_work.map(e => (<Option value={e.id}>{e.name}</Option>))}
                </Select>
              </Form.Item>

              <Form.Item
                label="ชื่อ-นามสกุล มารดา"
                name="morther_name"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ-นามสกุลชื่อมารดา",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="อาชีพมารดา"
                name="morther_work"
                rules={[
                  {
                    required: true,
                    message: 'กรุณาเลือกอาชีพมารดา'
                  }
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="อาชีพมารดา"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  size="large"
                >
                  {listm_work.map(e => (<Option value={e.id}>{e.name}</Option>))}
                </Select>
              </Form.Item>

              <Form.Item
                name="income"
                label="รายได้ของครอบครัว"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรายได้ของครอบครัว",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">น้อยกว่าเท่ากับ 10,000</Radio>
                  <Radio value="2">10,001-20,000</Radio>
                  <Radio value="3">20,001-30,000 </Radio>
                  <Radio value="4">30,001-40,000</Radio>
                  <Radio value="5">40,001-50,000</Radio>
                  <Radio value="6">มากกว่าเท่ากับ 50,001</Radio>
                </Radio.Group>
              </Form.Item>



              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  สมัคร
                </Button>
                &nbsp;&nbsp;&nbsp;
                {/* <Link to="/login">
                  <Button htmlType="button">ยกเลิก</Button>
                </Link> */}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: "\n.wrap-login100 {\n    width: 870px;\n    background: #fff;\n    border-radius: 10px;\n    position: relative;\n    padding: 90px;\n    border-style: solid;\n}\n" }} />

    </>
  );
};

export default Register;
