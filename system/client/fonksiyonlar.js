var ajaxcan;
            

/*
    Sayfada ileri geri yapılması durumunda, sayfa yenlenmeden, dinamik olarak kendini yüklüyor
*/
window.addEventListener("popstate", function(e) {
    if (typeof e.state == 'object' || e.state == ''){
        degisPampa('anasayfa');
    }
    else{
        $('#dynamic').fadeOut(500);
        degisPampa('sonuclar');
        $('#dynamic').fadeIn(500);
        /*Cufon.replace('#popup_metu_center p, .form_inpt, #bar, .search_box_l, .search_box_r, #search_result', { fontFamily: 'Myriad Pro' });
        Cufon.replace('#circle a', {hover: {color: 'white'}, fontFamily: 'Myriad Pro' });*/
    }
    yukle(e.state);
});

$('#src').live('keypress',function(e){
     var p = e.which;
     if(p == 13){
         aratPampa(); 
     }
 }); 

function cufonla(){
    Cufon.replace('#popup_metu_center p, .form_inpt, #bar, .search_box_l, .search_box_r, #sendmailbox_p, #search_result', { fontFamily: 'Myriad Pro' });
    Cufon.replace('#circle a', {hover: {color: 'white'}, fontFamily: 'Myriad Pro' });
}

function validateForm(){
    var x = document.getElementById("src").value;
    if (x == null || x == "") {
        return false;
    }
    return true;
}

//butonlu kontrol kodları
function mailAtPampa(){
    
    var name = document.getElementById("form_isim");
    var eposta = document.getElementById("eposta");
    var msg = document.getElementById("msg");
    var difade=/.+@.+\..+/;

    if(name.value =="" || name.value =="Adınız..")
    {
        name.style.border = '1px solid #e31837'
        alertPampa('Adınız kısmını boş geçemezsiniz. Lütfen adınızı giriniz',1);
        return false;
    }
    if(!difade.test(eposta.value ))
    {
        eposta.style.border = '1px solid #e31837'
        alertPampa('Geçerli Bir E-Posta Yazın! Lütfen geçerli bir e-posta giriniz',1);
        return false;
    }
    if(msg.value ==""||msg.value =="Mesajınız..")
    {
        msg.style.border = '1px solid #e31837'
        alertPampa('Mesaj kısmını boş geçemezsiniz. Lütfen mesajınızı giriniz',1);
        return false;
    }
    
    ajaxcan.post({action: 'komut', isim: name.value , mail: eposta.value , mesaj: msg.value });
}

/*
    Kullanıcı tarafındaki sistemi bir fonksiyoda toplamak iyidir, iyi
    Daha sonra nerede kuruyoduk bunu diye aranmayız
*/
function baslaPampa(){
    /* Cufon ağabey */
    cufonla();
    /*AjaxCan*/
    ajaxcan = new AjaxCan($('#dynamic'), home);
    /*unlink yapma*/
    unlinkPampa()
}

/*
    Aratıyoruz
*/ 
function aratPampa(){
    if (validateForm()){
        //ajaxcan.yukle('search',{"keyword": $('#src').val()});
        $('#dynamic').fadeIn(500);
        ajaxcan.getir(home + '/' + $('#src').val());
        degisPampa('sonuclar');
    }
    /*degisPampa('sonuclar');*/
}

function degisPampa(duzen){
    switch(duzen){
        case 'anasayfa':
            $('#logo').animate({left:'0px'});
            $('#logo img').animate({height:'100px'});
            $('#search').animate({left:'0px', top:'10px'});
            $('#capsule').animate({height: '165px'}); 
            $('#dynamic').fadeOut(500);
            $('#circles').fadeIn(500);
            break;
        case 'sonuclar':
            $('#logo').animate({left:'-160px'});
            $('#logo img').animate({height:'80px'});
            $('#search').animate({left:'170px', top:'-100px'});
            $('#capsule').animate({height: '100px'});
            $('#circles').fadeOut(500);
            break;
        case 'detay':
            
            break;
    }
}

function alertPampa(msj, eror){
    if (typeof eror == 'undefined'){
        $('#popup_metu3').fadeOut(500);
        $('#sendmailbox').fadeIn(500);
        $('#sendmailbox_p').html(msj);
    }
    else{
        $('#sendmailbox').fadeIn(500);
        $('#sendmailbox_p').html(msj);
    }
    cufonla();
}

function unlinkPampa(){
    $('.unlink').click(function(event){
        event.preventDefault();
        ajaxcan.getir(this);
    });
}

function anasayfa(){
    history.pushState(null, null, home); 
    degisPampa('anasayfa');
}

function yukle(a,b){
    ajaxcan.yukle(a,b);
}
