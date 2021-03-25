import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { GetQuizs, AddQuizs } from "../../../api/index";
import { showLoadingCallBack, closeShowLoading, errorCallBack } from "../../../shared/sweetalerts/index";

import Color from './Color';


const Result = ({ red, green, blue }) => {
    const history = useHistory();
    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <h3 className="text-center pb-3"> ผลลัพธ์จากการทดสอบ </h3>

                        <div className="row">
                            <div className="col-md-8 col-xs-12">
                                <p style={{ marginBottom: 0 }}><li>Protanopia(สีแดง) : {red || 0}/10</li></p>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <h6 className="text-center pb-3">
                                    - {red > 5 ? "ปกติ" : red == 5 ? "มีความเสี่ยง" : "ผิดปกติ"} -
                                </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-xs-12">
                                <p style={{ marginBottom: 0 }}><li>Deuteranopia(สีเขียว) : {green || 0}/10</li></p>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <h6 className="text-center pb-3">
                                    - {green > 5 ? "ปกติ" : green == 5 ? "มีความเสี่ยง" : "ผิดปกติ"} -
                                </h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8 col-xs-12">
                                <p style={{ marginBottom: 0 }}><li>Tritanopia(สีน้ำเงิน) : {blue || 0}/10</li></p>
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <h6 className="text-center pb-3">
                                    - {blue > 5 ? "ปกติ" : blue == 5 ? "มีความเสี่ยง" : "ผิดปกติ"} -
                                </h6>
                            </div>
                        </div>


                        {/* {
                            (red > 5 && green > 5 && blue > 5) ?
                                <>
                                    <h5 className="text-center pt-3">Nomal</h5>
                                    <h6 className="text-center">(คุณไม่มีความบกพร่อง)</h6>
                                </>

                                :

                                <>
                                    <h5 className="text-center pt-3">คุณมีความบกพร่อง</h5>
                                    {red < 5 ? <h6 className="text-center">Protanopia(สีแดง)</h6> : null}
                                    {green < 5 ? <h6 className="text-center">Deuteranopia(สีเขียว)</h6> : null}
                                    {blue < 5 ? <h6 className="text-center">Tritanopia(สีน้ำเงิน)</h6> : null}
                                </>
                        }
                        */}




                        <div className="d-grid gap-2 col-sm-6 col-md-6 col-xl-6 pt-3 mx-auto btn-footer" >
                            <button className="btn btn-black" type="button" onClick={() => { history.push("/"); }}>กลับหน้าแรก</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

function ColorQuizes() {

    const [colorRed, setColorRed] = useState(null);
    const [colorGreen, setColorGreen] = useState(null);
    const [colorBlue, setColorBlue] = useState(null);
    const [modelSave, setModelSave] = useState({
        "scheme_r_1": null,
        "scheme_r_2": null,
        "scheme_r_3": null,
        "scheme_r_4": null,
        "scheme_r_5": null,
        "scheme_r_6": null,
        "scheme_r_7": null,
        "scheme_r_8": null,
        "scheme_r_9": null,
        "scheme_r_10": null,

        "scheme_g_1": null,
        "scheme_g_2": null,
        "scheme_g_3": null,
        "scheme_g_4": null,
        "scheme_g_5": null,
        "scheme_g_6": null,
        "scheme_g_7": null,
        "scheme_g_8": null,
        "scheme_g_9": null,
        "scheme_g_10": null,

        "scheme_b_1": null,
        "scheme_b_2": null,
        "scheme_b_3": null,
        "scheme_b_4": null,
        "scheme_b_5": null,
        "scheme_b_6": null,
        "scheme_b_7": null,
        "scheme_b_8": null,
        "scheme_b_9": null,
        "scheme_b_10": null
    });

    const [resRed, setResRed] = useState(null)
    const [resGreen, setResGreen] = useState(null)
    const [resBlue, setResBlue] = useState(null)


    const [colorPage, setColorPage] = useState({
        type: "red",
        page: "1",
    });

    useEffect(async () => {
        try {
            showLoadingCallBack()
            const res = await GetQuizs()
            for (let x = 1; x <= 3; x++) {
                let type = (x === 1) ? "red" : (x === 2) ? "green" : (x === 3) ? "blue" : null;
                for (let y = 1; y <= 10; y++) {
                    shuffle(res.data.items[type][`color_${type}_${y}`])
                }
            }

            setColorRed(res.data.items.red)
            setColorGreen(res.data.items.green)
            setColorBlue(res.data.items.blue)
            closeShowLoading()
        } catch (error) {
            closeShowLoading()
            console.log('error :>> ', error.response.data.error);
            const log = error.response.data.error ? error.response.data.error.message : undefined;
            errorCallBack("ข้อความจากระบบ", log);
        }
    }, [])

    const PageColor = (props) => {

        switch (props.value) {
            case "red":
                return (colorRed ? <Color color={colorRed} type={colorPage.type} page={colorPage.page} /> : null);
            case "green":
                return (colorGreen ? <Color color={colorGreen} type={colorPage.type} page={colorPage.page} /> : null);
            case "blue":
                return (colorBlue ? <Color color={colorBlue} type={colorPage.type} page={colorPage.page} /> : null);
            default:
                return (
                    <> </>
                );

        }

    }

    const click = async (value) => {
        try {
            let type = (colorPage.type == "red") ? "r" : (colorPage.type == "green") ? "g" : (colorPage.type == "blue") ? "b" : null;
            if (colorPage.page == "11" && colorPage.type == "red") {
                setColorPage({
                    type: "green",
                    page: "1",
                })
            } else if (colorPage.page == "11" && colorPage.type == "green") {
                setColorPage({
                    type: "blue",
                    page: "1",
                })
            } else if (colorPage.page == "10" && colorPage.type == "blue") {
                setModelSave({ ...modelSave, [`scheme_${type}_${colorPage.page}`]: value })
                modelSave[`scheme_${type}_${colorPage.page}`] = value;
                showLoadingCallBack()
                await AddQuizs(modelSave);
                closeShowLoading()

                // console.log('modelSave :>> ', modelSave);

                let list_r = [], list_g = [], list_b = []
                for (let x = 1; x <= 3; x++) {
                    let type = (x === 1) ? "r" : (x === 2) ? "g" : (x === 3) ? "b" : null;
                    for (let y = 1; y <= 10; y++) {
                        if (x === 1) {
                            list_r.push(modelSave[`scheme_${type}_${y}`])
                        } else if (x === 2) {
                            list_g.push(modelSave[`scheme_${type}_${y}`])
                        } else if (x === 3) {
                            list_b.push(modelSave[`scheme_${type}_${y}`])
                        }
                    }

                }

                setResRed(list_r.reduce((acc, val) => acc + val, 0).toFixed(2))
                setResGreen(list_g.reduce((acc, val) => acc + val, 0).toFixed(2))
                setResBlue(list_b.reduce((acc, val) => acc + val, 0).toFixed(2))

                setColorPage({
                    type: "result",
                    page: "1",
                })

            } else {

                await setModelSave({ ...modelSave, [`scheme_${type}_${colorPage.page}`]: value })
                let page = (Number(colorPage.page) + 1).toString()
                setColorPage({ ...colorPage, page })
            }
        } catch (error) {
            closeShowLoading()
            // console.log('error :>> ', error.response.data.error);
            // const log = error.response.data.error ? error.response.data.error.message : undefined;
            // errorCallBack("ข้อความจากระบบ", log);
            errorCallBack("ข้อความจากระบบ", error.message);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    return (
        <>
            {colorPage.type != "result" ?
                <>
                    <div className="limiter">
                        <div className="container-login100">
                            <div className="wrap-login100">
                                {colorPage.page != "11" ?
                                    <>
                                        <h4 className="text-center pb-1 text-white"> แบบทดสอบชุดที่ {colorPage.type == "red" ? "1" : colorPage.type == "green" ? "2" : colorPage.type == "blue" ? "3" : ""}</h4>
                                        <h4 className="text-center pb-1 text-white"> คุณเห็นสีเหมือนกันทั้งหมดกี่คู่ ?</h4>
                                        <h5 className="text-center pb-3 text-white"> ข้อที่.{colorPage.page}</h5>

                                        {colorPage ? <PageColor value={colorPage.type} /> : null}
                                        <div className="d-grid gap-2 col-sm-6 col-md-6 col-xl-6 pt-3 mx-auto btn-footer" >
                                            <button className="btn btn-lg btn-black" type="button" onClick={() => click(0.67)}>ก. เหมือนกันทั้งหมด 1 คู่</button>
                                            <span className="pt-2" />
                                            <button className="btn btn-lg btn-black" type="button" onClick={() => click(0.33)}>ข. เหมือนกันทั้งหมด 2 คู่</button>
                                            <span className="pt-2" />
                                            <button className="btn btn-lg btn-black" type="button" onClick={() => click(0)}>ค. เหมือนกันทั้งหมด</button>
                                            <span className="pt-2" />
                                            <button className="btn btn-lg btn-black" type="button" onClick={() => click(1)}>ง. แตกต่างกันทั้งหมด</button>
                                        </div>
                                    </>
                                    : <button className="btn btn-link text-white" type="button" onClick={() => click(null)}>กดเพื่อไปแบบทดสอบต่อไป</button>}
                            </div>
                        </div>
                    </div>


                    <style dangerouslySetInnerHTML={{ __html: " .btn-footer .btn {font-size: 17px;} body {background-image: none !important;background-color: #7c7c7c !important;}.wrap-login100 { background: #7c7c7c !important; border-style: none }\n" }} />
                </> : <Result red={resRed} green={resGreen} blue={resBlue} />}

        </>
    )
}

export default ColorQuizes
