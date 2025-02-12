//  관리자 페이지 모달창
$('.adminPageBtn').click( ()=> {
    $('.adminModalPage').css('display','block');

});
$('.close').click( ()=> {
    $('.adminModalPage').css('display', 'none');
});

//  관리자 페이지 비밀번호
    let inputPass = "";
    for(let i=0; i<10; i++) {
        $(`#adminNum${i}`).click(()=>{
            if( $(`#inputPass`).val().length < 4 ) {
                inputPass += `${i}`;
                $("#inputPass").val(inputPass);
            } else {
                inputPass += "";
            };
        });
    };
//  관리자 페이지 비밀번호 전체삭제
    $(`#adminNumDelete`).click(()=>{
        inputPass = "";
        $(`#inputPass`).val(inputPass);
    });

//  뒤에서 한개씩 지우기
    let changedInputPass = '';
    $(`.adminNumOneX`).click(()=>{
        $(`#inputPass`).val($(`#inputPass`).val().slice(0, -1));
        changedInputPass = $(`#inputPass`).val();
        inputPass = changedInputPass; 
    });
//  뒤로가기 이후 다시 실행시 비밀번호 전체 삭제 
    $(`#close`).click(() => {
        inputPass = "";
        $(`#inputPass`).val(inputPass);
    })

// 관리자 페이지 들어가기
$(`#adminEnterBtn`).on('click',() => {
    if( inputPass == '1234') {
        location.href = '/adminPage';
    } else {
        $(`#wrongAdminPass3`).css(`display`, `block`);
        $('.adminModalPage').css('display', 'none');
        $(`#popupBg`).css(`display`, `block`);

        $(`#wrongAdminPassBtn3`).click(()=> {
            $(`#wrongAdminPass3`).css(`display`, `none`);
            $(`#popupBg`).css(`display`, `none`);
            
        });
        inputPass = '';
        $(`#inputPass`).val(inputPass);
    };
});
