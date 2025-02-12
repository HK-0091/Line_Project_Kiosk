//휴대폰 번호 체크
let inPhoneNumCheck= /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;


//ajax(1), 회원 번호 입력
let pointValueJson = ""
$(this).click((e)=>{
    if(e.target.className == 'pointNumComBtn'){
        //조건 -> 휴대전화 정규식
        if( inPhoneNumCheck.test($('.inPhoneNum').val()) ) {
            $('.inPointModal').css('display', 'block');
            let pointNumComBtn = $('#inPhoneNum').val();
            $.ajax({
                url : "/point",
                type : "POST",
                dataType : "JSON",
                data : {"pointNumComBtn" : pointNumComBtn}
            })
            .done((json)=>{
                //console.log(json);
                $('.nowPoint').val(changePriceBtn(json.mobile));
                pointValueJson = json.mobile;
                usePointTempArray = [];
                usePointTempArrayJoin = '';
                $('.usePointScreen').val(changePriceBtn(usePointTempArrayJoin));
            })
            .fail((xhr, status, errorThrown)=>{
                alert("Ajax failed");
            });
            $(`#inPointBoxTotalPrice`).html(`예상 결제 금액: ` + changePriceBtn(totalPriceNum) + ` 원`);
        } else {
            $(`#wrongPhoneNum`).css(`display`, `block`);
            $(`#popupBg`).css(`display`, `block`);
            inputPhoneNum = "";
            $("#inPhoneNum").val(inputPhoneNum);
        }
    };
});

//포인트 사용
$(".resultPointComBtn").click( function () {
    let numCheck1 = /^([1-9]{1,3})[,]?([0-9]{1,3})?$/;
    let numCheck2 = /^[0]$/;
    if(usePointTempArrayJoin < 1000){
        if(numCheck1.test($('.usePointScreen').val()) || numCheck2.test($('.usePointScreen').val())){
            var mobile = $('#inPhoneNum').val();
            $.ajax({
                url:'/result',
                dataType: 'json',
                type: 'post',
                data: {'mobile': mobile}
            })
                .done(function (json) {
                    $('.nowPoint').val(changePriceBtn(json.mobile));
                    console.log(json);
                })
                .fail(function (xhr, status, errorThrown) {
                    console.log('ajax fail!!');
                })
        }else{
            $('.resultpointModal').css('display','none');
            usePointTempArray = [];
        }
    }
})


//usePointcomBtn