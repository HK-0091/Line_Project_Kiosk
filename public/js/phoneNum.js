    ///////////////////////////////////////회원 번호 입력 ///////////////////////////////////////
    let inputPhoneNum = "";
    //// 최대 11자 회원 번호(핸드폰 번호) 입력
    for(let i=0; i<10; i++) {
        $(`#pointNum${i}`).click(()=>{
            if( $(`#inPhoneNum`).val().length < 11 ) {
                inputPhoneNum += `${i}`;
                $("#inPhoneNum").val(inputPhoneNum);
            } else {
                inputPhoneNum += "";
            };
        });
    };

    //// 회원 번호 전체 삭제
    $("#pointNumDelete").click(()=>{
        inputPhoneNum = "";
        $("#inPhoneNum").val(inputPhoneNum);
    });

    //// 뒤에서 한개씩 지우기
    let changedInputNum = '';
    $(`.pointNumOneX`).click(()=>{
        $(`.inPhoneNum`).val($(`.inPhoneNum`).val().slice(0, -1));
        changedInputNum = $(`.inPhoneNum`).val();
        inputPhoneNum = changedInputNum; 
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
 
    ///////////////////////////////////////사용할 포인트 입력///////////////////////////////////////
    // 사용 포인트 입력
    let usePointTempArray = [];
    let usePointTempArrayJoin = '';
    let usePointNumCheck = /[0-9]/;
    let usePointTempNum = 0;
    $(this).click((e)=>{
        let i=0;
        while (i<11) {
            if(e.target.className == `usePoint${i}`){
                usePointTempNum = i;
                usePointTempArray.push(usePointTempNum);
                //console.log(usePointTempArray);
                if( ((/^0/).test($(`#usePointScreen`).val())) ) {
                    usePointTempArray = [0]; 
                }
            };
            i++;
        };
        // 입력 포인트 전체 삭제
        $(`.usePointDelete`).click(()=>{
            usePointTempArray = [];
        });
        

        // (보유포인트 - 사용 포인트) 체크
        usePointTempArrayJoin = usePointTempArray.join("");
        if(Number(pointValueJson) < Number(usePointTempArrayJoin) || usePointTempArrayJoin > totalPriceNum ){
            console.log("사용 가능 포인트가 초과되었습니다!");
            usePointTempArray = [];
            usePointTempArrayJoin = '';
            $('#wrongPhoneNum3').css('display','block');
            $(`#popupBg`).css(`display`, `block`);

            $('#wrongPhoneNumBtn3').click(() => {
                $('#wrongPhoneNum3').css('display','none')
                $(`#popupBg`).css(`display`, `none`);
            });
        };

        $('.usePointScreen').val(changePriceBtn(usePointTempArrayJoin));
        $('.resultPointUsepoint').val(changePriceBtn(usePointTempArrayJoin));
        $('.usePointbackBtn').click(()=>{
            inputPhoneNum = "";
            $("#inPhoneNum").val(inputPhoneNum);
        });
    });

    // 입력 포인트 뒤에서 한개씩 삭제
    $(`.usePointOneX`).click(()=>{
        usePointTempArray.pop();
        console.log(usePointTempArray);
    });