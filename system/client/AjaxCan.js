/* Asım Doğan NAMLI */

/*
    Modifikasyonlar AjaxCan() fonksiyonunun altındadır
*/

/**     * Ajax yordamlarına sistem için efektif eklemeler sağlar
            dinamik web sayfası yönetimi için çekirdek sınıf.

        * @nesne {DOM object} nesne Taşıyıcıdır, ajax komutları bu taşıyıcıya etki eder  
        * @ajaxHome {String} Tüm verilerin yollanacağı adresdir
*/
function AjaxCan(nesne, ajaxHome){
	var bellek = new Array();
	var aktifSayfa;
	var aktifEleman;
	
	this.sunucu = ajaxHome; // Fuzuli oldu biliyorum, işte bunlar hep sistemden sisteme sıçrama
	
	/*
		Sunucudan sayfa çağrımının ilk aşaması
		Öncelikle taşıyıcımız(nesne) bekleme konumuna alınır
	*/
	this.getir = function(link){
		/*
			Eğer linkimiz bir object türünde ise link bir a nesnesidir ve ona göre işlem yaparız
			değilse, bir url dir ve o url'i çağırırız
			
			Aşağıda, history.js için durum ayarlaması yapıyoruz, ileri geri ve yeni urllerde sapıtmaması için
		*/
		if (typeof link == 'object'){
			jQuery(nesne).bekle(function(){ // Bekleme işlemi tamamlanmışsa buradan devam et anlamında :)
				/*
					Url'in son parcasi ('/'dan sonraki) durum'u kaydediyoruz,
					Url'i direkt geçiriyoruz
				*/
                var aranan = link.getAttribute('href').split('/').pop();
                
				history.pushState(aranan, null, link.getAttribute('href'));
				yukle('detay/'+aranan, {detay:aranan});
			});
		}
		else{
			jQuery(nesne).bekle(function(){ // Bekleme işlemi tamamlanmışsa buradan devam et anlamında :)
				/*
					Url'in son parcasi ('/'dan sonraki) durum'u kaydediyoruz,
					Url'i direkt geçiriyoruz
				*/
				var aranan = link.split('/').last();
				
				history.pushState(aranan, null, link);
				
				//var url = {"yazar": arr.last(2), "yazi": arr.last()}
				yukle(aranan);
			});
		}
	}
	
	/*
		sayfa: sunucudan istenecek olan sayfadır, eğer zaten bellek de var ise ya da cache(önbellek) istenmiyorsa 
				get methodu ile sunucudan çağrılır ve istemci kurulumu yapılıp gösterilir 
		ekReq: sunucuya gönderilmesi gereken ek bilgi var ise json formatında yazılır, fonksiyon bu bilgiyi sunucuya iletecekdir
	*/
	this.yukle = function(sayfa, ekReq){ 
		var page = bellek.JsonBul("sayfa", sayfa); // bellekde aradığımız sayfa zaten varmı?
		
		/*
			request: Sunucuya gönderilecek olan bilgi,
			yenisayfa.php betiğinde işlenir, dönüt getirilir
		*/
		var request = {sayfa: sayfa, action: 'yenisayfa'}
		 
		/* 
			ekReq: jquery extend yardımı ile sunucuya gönderilecek olan pakete(request) eklenir
		*/
		ekReq = typeof ekReq == 'undefined' ? false : ekReq;
		$.extend(request, ekReq);
		
		// Eğer sayfa zaten var ise ya da sayfanın cacheleme yapması istenmiyorsa
		if (!page || !page.cache){
            /*
                Ön bellek kontrolü yapıldı, bellekleme istenmiyor, isteği gönderiyoruz
                Önce işlemin yapılıyor olduğunu gösteren bir efekt,
                efekt tamamlanınca callback yordamıyla gönderme fonksiyonumuz çalışacak
            */
			nesne.bekle(function(){
                $.post(ajaxHome, request).done(
                    function(data){ // @data bir json dönütüdür, sunucudan gelir

                        /*
                            guncelleme: goruntule() fonksiyonu içinde eval() işlemine tabi tutulur, 
                                        sayfa güncellenirken istenen bir komut varsa çalıştırılır.

                            kurulurken: goruntule() fonksiyonu içinde eval() işlemine tabi tutulur, 
                                        sayfa kurulurken istenen bir komut varsa çalıştırılır. 
                                        guncellemeden farkı sadece sayfa ilk kez görüntülenirken çalıştırılır, 
                                        bu durum aşağıdaki son satır belirler.

                            cache:      (bool), sayfanın tekrar sunucudan çağrılıp çağrılmayacağını belirler.      
                        */
                        data.guncelleme = typeof data.guncelleme == 'undefined' ? false : data.guncelleme;
                        data.kurulurken = typeof data.kurulurken == 'undefined' ? false : data.kurulurken;
                        data.cache = typeof data.cache == 'undefined' ? false : data.cache;

                        sayfa = {"sayfa":data.sayfa, "veri": data.html ,"islemler":data.kurulurken, "cache": data.cache};
                        bellek.push(sayfa);  // !!!! baglanti.veri .getResponseHeader methoduna dönüşmeli aksi takdirde sıkıntı ta farozdan görünüyor... // kullanıcı sunucudan erken davranırda farklı bir komut gönderirse sunucudan gelen komut kullanıcının komutuyla karışır gibi gibi, sayfa id'leri karışırsa şaşırma...

                        goruntule(sayfa); //Sayfa kurulumu...
                        sayfa.islemler = data.guncelleme; // Sayfamız kurulduğunua göre kurulum kodlarına gerek kalmadı, güncelleme kodları işimizi görecekdir... :)
                    }
                ); // Bellekde veri yoksa çağırıyoruz...
            });
		}
		else{ // Sayfa zaten var ise... ve sunucudan tekrar yüklenmesi istenmiyorsa
			
			goruntule(page);
			aktifSayfa = page;
		}
	} 
	
	this.post = function(veri){
		 $.post( ajaxHome, veri).done(
				function(data){ // @data bir json dönütüdür, sunucudan gelir
					
					//eval(data);
					//goruntule(); //Sayfa kurulumu...
					//sayfa.islemler = data.guncelleme; // Sayfamız kurulduğunua göre kurulum kodlarına gerek kalmadı, güncelleme kodları işimizi görecekdir... :)
				}
			);
	}
    
	this.get = function(veri){
		 $.get( this.sunucu, veri).done(
				function(data){ // @data bir json dönütüdür, sunucudan gelir
					
					//eval(data);
					//goruntule(sayfa); //Sayfa kurulumu...
					//sayfa.islemler = data.guncelleme; // Sayfamız kurulduğunua göre kurulum kodlarına gerek kalmadı, güncelleme kodları işimizi görecekdir... :)
				}
			);
	}
	
	/*
		Temel görüntüleme fonksiyonu
		Sunucudan gelen sayfa ya da bellekde saklanan sayfa bu fonksiyon ile ekrana yansıtılır
		
		sayfa: bir json dizisidir, yukle() fonksiyonundan gelir, içinde sayfanın verilerini barındırır
		bitti: bir callback fonksiyonudur, sayfa görüntülendikden sonra çalıştırılır.
	*/
	var goruntule = function(sayfa, bitti){
		/*
			Head tagı tazelenir
		*/
		//resetHead(); Bu fonksiyon satırcı.com da fonksiyonlar.js de
		
		/*
			Ve sayfa görüntülenir
		*/
		$(nesne).html(sayfa.veri);
		
		/*
			Sayfa görüntülendikden sonra yapılması istenenler.
		*/
		eval(sayfa.islemler);
		
		/*
			Callback    
		*/
		if (typeof bitti == 'function'){
			bitti();
		}
		
		/*
			nesnenin(taşıyıcının) bekleme konumunda olma ihtimaline karşı...
		*/
		nesne.devam(); //Bu fonksiyon satırcı.com da fonksiyonlar.js de
		cufonla(); 
        
		/*
			Yeni sayfanın boyutuna göre taşıyıcımızın ayarlanması...
		*/
		//sayfaAyar(); //Bu fonksiyon satırcı.com da fonksiyonlar.js de
	}

	/*
		Deneysel fonksiyonlar, ileriye doğru iş görür bunlar 
	*/
	this.birSonraki = function(){}

	this.birOnceki = function(){}
}

/*
    Bazı minik modifikasyonlar var
*/
Array.prototype.JsonBul = function (anahtar, aranan){ // Karıştırmayın :D // bellek dizisi için özelleştirilmiş bir fonksiyondur, dizinin içindeki JSON nesnelerinin içinden arama yaptırıp bulunan nesneyi döndürür
    // anahtar: Json nesnelerinin içinde arama yaptırılacak olan verinin anahtarı
    // aranan: Json nesnelerinin içindeki belli bir anahtarı olan veri
    var length = this.length, eleman = null, donut = false;
    for (var i = 0; i < length; i++) {
        eleman = this[i];
        if (typeof eleman == "object"){
            if (eleman[anahtar] == aranan){ //{"sayfa":false, "veri":false} // örnek bellek hücresi
                donut = eleman;
            }
        }
    }
    return donut;
}

Array.prototype.last = function (index) {
    index = typeof index == 'number' ? index : 1;
    index = index >= 1 ? index: 1; 
    return this[this.length - index];
};

$.fn.extend({
    bekle: function(call){
        this.animate({
                opacity : 0.4
            }, 100, call);
    },
    devam: function(call){
        this.animate({
                opacity : 1
            }, 100, call);
    }
});