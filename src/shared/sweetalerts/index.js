import Swal from 'sweetalert2'

export const showLoadingCallBack = async (title = "กําลังประมวลผลข้อมูล...", timer = 999999) => {
    return Swal.fire({
        title: title,
        type: 'success',
        timer: timer,
        showConfirmButton: false,
        timerProgressBar: true,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    })
};

export const errorCallBack = async (title = "มีบางอย่างผิดพลาด..." , text = "มีบางอย่างผิดพลาด กรุณาลองใหม่อีกครั้ง!") => {
    return Swal.fire({
        confirmButtonText: 'ตกลง!',
        icon: 'error',
        title: title,
        text: text,
    })

};

export const closeShowLoading = async () => {
    return Swal.close()
};

