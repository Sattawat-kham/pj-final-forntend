import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GetQuizsDetail } from "../../api/index";
import { showLoadingCallBack, closeShowLoading, errorCallBack } from "../../shared/sweetalerts/index";



function Quizes() {

    const history = useHistory();
    const [detail, setDetail] = useState(null);


    useEffect(async () => {
        try {
            showLoadingCallBack()
            const res = await GetQuizsDetail()
            setDetail(res.data.items)
            closeShowLoading()
        } catch (error) {
            closeShowLoading()
            console.log('error :>> ', error.response.data.error);
            const log = error.response.data.error ? error.response.data.error.message : undefined;
            errorCallBack("ข้อความจากระบบ", log);
        }
    }, [])

    const start = () => {
        history.push("/colorQuizes");
    }

    const cancel = () => {
        history.push("/");
    }

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100-detail">
                        <div className="body-detail" id="style-3" dangerouslySetInnerHTML={{
                            __html: detail
                        }} />
                        <div className="d-grid gap-2 col-sm-6 col-md-6 col-xl-3 pt-3 mx-auto">
                            <button className="btn btn-primary" type="button" onClick={start}>ต่อไป</button>
                            <button className="btn btn-secondary" type="button" onClick={cancel}>ยกเลิก</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quizes
