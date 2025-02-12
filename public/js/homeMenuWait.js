$('#homeMainBtnA').click(()=>{
    $('#homeMainModal').css('display','none');
    $(`#selectStart`).html('포장 ▼');
});
$('#homeMainBtnB').click(()=>{
    $('#homeMainModal').css('display','none');
    $(`#selectStart`).html('매장 ▼')
});

$(this).on(`click`, (e) => {
    switch(e.target.id) {
        case `packing`:
            $(`#selectStart`).html('포장 ▼');
            break;
        case `store`:
            $(`#selectStart`).html('매장 ▼');
            break;
    }
});

$('.menuHomeBtn').click(()=>{
    window.location.reload();
});

// 매장, 포장 선택
$(`#menuSelectIO`).on(`click`, () =>{
    $(`#selectList`).slideToggle();
});

//nav
$('#menuMenu1').on('click',()=>{
    $("#menuMenu1").css('background-color','#0068b7');
    $("#menuMenu1").css('color','white');

    $("#menuMenu2").css('background-color','white');
    $("#menuMenu2").css('color','black');

    $("#menuMenu3").css('background-color','white');
    $("#menuMenu3").css('color','black');
    
    $("#menuMenu4").css('background-color','white');
    $("#menuMenu4").css('color','black');
});

$('#menuMenu2').on('click',()=>{
    $("#menuMenu2").css('background-color','#0068b7');
    $("#menuMenu2").css('color','white');

    $("#menuMenu3").css('background-color','white');
    $("#menuMenu3").css('color','black');

    $("#menuMenu4").css('background-color','white');
    $("#menuMenu4").css('color','black');
    
    $("#menuMenu1").css('background-color','white');
    $("#menuMenu1").css('color','black');
});

$('#menuMenu3').on('click',()=>{
    $("#menuMenu3").css('background-color','#0068b7');
    $("#menuMenu3").css('color','white');

    $("#menuMenu4").css('background-color','white');
    $("#menuMenu4").css('color','black');

    $("#menuMenu1").css('background-color','white');
    $("#menuMenu1").css('color','black');
    
    $("#menuMenu2").css('background-color','white');
    $("#menuMenu2").css('color','black');
});

$('#menuMenu4').on('click',()=>{
    $("#menuMenu4").css('background-color','#0068b7');
    $("#menuMenu4").css('color','white');

    $("#menuMenu1").css('background-color','white');
    $("#menuMenu1").css('color','black');

    $("#menuMenu2").css('background-color','white');
    $("#menuMenu2").css('color','black');
    
    $("#menuMenu3").css('background-color','white');
    $("#menuMenu3").css('color','black');
});

$(`.menuItem`).on(`click`, () => {
    $(`#toppingWrap`).css(`display`, `block`);
});

//menuWait
let menuWaitSetInterval = '';
let menuWaitSetTimeout = '';

function menuWait(){
    let menuWaitCount = 10;
    menuWaitSetTimeout =
        setTimeout(()=>{
            menuWaitSetInterval =
            setInterval(()=>{
                $('.menuWaitCount').html(menuWaitCount);
                $('.menuWaitBox').css('display','block');

                if(menuWaitCount == 0){
                    window.location.reload();
                }
                menuWaitCount--;
            },1000);
        },'90000');
}

$('.homeMainBtn').on('click',()=>{
    menuWait();
});

$(this).click(()=>{
    if($('.menuWaitBox').css('display') == "block"){
        $('.menuWaitBtn').click(()=>{
            $('.menuWaitBox').css('display','none');
            clearInterval(menuWaitSetInterval);
            clearTimeout(menuWaitSetTimeout);
            menuWait();
        });
    }else{
        clearInterval(menuWaitSetInterval);
        clearTimeout(menuWaitSetTimeout);
        menuWait();
    }
});


$(`#payEndReceiptNo`).on(`click`, () => {
    clearInterval(menuWaitSetInterval);
    clearTimeout(menuWaitSetTimeout);
});

$(`#payEndReceiptYes`).on(`click`, () => {
    clearInterval(menuWaitSetInterval);
    clearTimeout(menuWaitSetTimeout);
});



// cart에 상품이 있을 때만 결제하기 창으로 넘어갈 수 있음
$('.menuPaymentBtn').click(()=>{
    if( $('#menuCart').html() != '' ) {
        $('.selectPayment').css('display', 'block');
    };
});








