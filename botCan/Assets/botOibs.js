function botKurul(){
    loadIframe("botFrame","http://localhost/botCan/Server.php?komut=sayfa&url=www.metuevents.com/wp-login.php&post=log:admin_pwd:Natro123+_wp-submit:Giriş_testcookie:1");
    log:admin
pwd:Natro123+
wp-submit:Giriş
redirect_to:http://metuevents.com/wp-admin/
testcookie:1
    $('#botFrame').load(function(){
        $(this).show();
        console.log('load the iframe')
    });
}

function islem(){
    
}

function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
}