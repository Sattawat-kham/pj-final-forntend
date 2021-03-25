import React from 'react'


const ShowColor = ({ color }) => {

    return (
        <>

            <div className="row body-color">

                {
                    color ? color.map((e, index) => {

                        return (

                            <div className="col-6 col-xl-4 " >
                                <div key={index} className=" rounded mb-3" style={{
                                    background: e.color_code, paddingTop: '75%'
                                }} />
                            </div>
                        )
                    }) : null
                }

            </div>

        </>
    )
}



function Color({ color, type, page }) {
    // console.log('type :>> ', color, type, page);

    return (
        <>
            <ShowColor color={color ? color[`color_${type}_${page}`] : null} />
        </>
    )
}

export default Color
