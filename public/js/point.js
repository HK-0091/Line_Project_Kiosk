$('.payChoiceBackBtn').click(()=>{
    $('.selectPayment').css('display', 'none');
});
$('.payPointBox').click(()=>{
    $(`.pointModal`).css(`transform`, `translateY(0)`);    
});
$('.pointNumBackBtn').click(()=>{
    inputPhoneNum = "";
    $("#inPhoneNum").val(inputPhoneNum);
    $(`.pointModal`).css(`transform`, `translateY(158rem)`);   
});
$('.usePointcomBtn').click(()=>{
    if ( $(`#usePointScreen`).val() != `` ) {
        $('.resultpointModal').css({'display': 'block', 'z-index': '170'});
        $('.selectPayment').css('display', 'none');
        $('.onlyPaymentBox').css('display', 'block');
    }
});
$('.resultPointComBtn').click(()=>{
    $('.resultpointModal').css('display', 'none');
    $('.inPointModal').css('display', 'none');
    $(`.pointModal`).css(`transform`, `translateY(158rem)`);  
    $(`.disabledPoint`).css(`display`, `none`); 
   
});
$('.usePointbackBtn').click(()=>{
    $('.inPointModal').css('display', 'none');
    usePointTempArray = [];
});

$('.resultPointBackBtn').click(()=>{
    $('.resultpointModal').css('display', 'none');
    usePointTempArray = [];
});

$('.resultPointBackBtn').click(()=>{
    $('.resultpointModal').css('display', 'none');
    $(`.selectPayment`).css(`display`, `block`);
    $(`.onlyPaymentBox`).css(`display`, `none`);
    $(`.inPointModal`).css(`display`, `none`);
});
$(`.payCardBox`).click(()=>{
    $(`#creditCardWrap`).css(`transform`, `translatey(0)`);
    $(`#creditCardWrap`).css(`display`, `block`);
    $(`.payTotalPrice`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin) + ` 원`);

});
$(`.paySamsungBox`).click(()=>{
    $(`#samsungPayWrap`).css(`transform`, `translatey(0)`);
    $(`#samsungPayWrap`).css(`display`, `block`);
    $(`.payTotalPrice`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin) + ` 원`);
});

$(`.onlyPayCardBox`).click(()=>{
    $(`#creditCardWrap`).css(`transform`, `translatey(0)`);
    $(`#creditCardWrap`).css(`display`, `block`);
    $(`.payTotalPrice`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin) + ` 원`);
});

$(`.onlyPaySamsungBox`).click(()=>{
    $(`#samsungPayWrap`).css(`transform`, `translatey(0)`);
    $(`#samsungPayWrap`).css(`display`, `block`);
    $(`.payTotalPrice`).html(changePriceBtn(totalPriceNum - usePointTempArrayJoin) + ` 원`);
});

$(`.onlyPayBackBtn`).click(()=>{
    inputPhoneNum = "";
    $("#inPhoneNum").val(inputPhoneNum);
    $(`#wrongPhoneNum2`).css(`display`, `block`);
});

$(`#wrongPhoneNumBtn1`).click(() => {
    $(`#wrongPhoneNum2`).css(`display`, `none`);
});


$(`#wrongPhoneNumBtn2`).click(() => {
    location.reload();
});

$(`.printBtn`).click(()=>{
    $(`.receiptPageBox`).css(`display`, 'none');
    $(`#waitingNumPopup`).css(`display`, `block`);
    $(`#popupBg`).css(`display`, `block`);
});

const images = document.querySelectorAll('.img');
let current = 0;

/////이미지 슬라이드//////
function showSlide() {
  for(let i=0; i<images.length; i++) {
    images[i].classList.remove('on');
  }
  current++;
  if(current > images.length) {
    current = 1;
  }
  images[current - 1].classList.add('on');
  setTimeout(showSlide, 2000);
}
showSlide();

//////프린트//////
let printArea;
let initBody;

function printGo(printArea){
   window.onbeforeprint = beforePrint;
   window.onafterprint = afterPrint;
   window.print();
}
function beforePrint(){
   initBody = document.body.innerHTML;
   document.body.innerHTML = document.getElementById(`printArea`).innerHTML;
}
function afterPrint(){
   document.body.innerHTML = initBody;
}
function homePage(){
    window.location.reload();
}
function printX(){
    $(`.receiptPageBox`).css(`display`, 'none');
    $(`#waitingNumPopup`).css(`display`, 'block');
    $(`#popupBg`).css(`display`, `block`);
    setIntervalF = setInterval( `closeWaitingNumCount()`, 1000 );
}