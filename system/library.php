<?php
    // asim.dogan.namli@gmail.com //
    // genel fonksiyonlar //

    //
	// Yazım hızlandırmak için, php üzerine bazı eklemeler...
	//
	
	function tarih($mod){ // gün.ay.yıl saat:dakika:saniye {00.00.0000 00:00:00} türünde anlık tarih bilgisini verir
		
        switch ($mod){
            case 'Y': // yazıyla tam tarih
                return date('d.m.Y  H:i:s');
                break;
            default:
                return date('d.m.Y  H:i:s');
        }
        
	}

    //
	//*** Hata ayıklama üzerine ***//
	//
	
	function islemDokumu($sonFharic = 1, $sadeceSfonk = 0){// Amaç: Hata mesajlarında işlem dökümünü kullanarak daha rahat hata ayıklayabilmek
		$donut = '';
		
		$islemList = debug_backtrace();
		$islemList = array_reverse($islemList);
		
		$son = count($islemList) - $sonFharic - 1; // Son index, islemDokumu() fonksiyonu ve belirtilmişse son fonksiyonun döküme karışmasını önlemek için
			
		if (!$sadeceSfonk){
			
			for ($i = 0; $i < $son; $i++){
				$donut .= "{".adrestenDosyaya($islemList[$i]["file"]).":".$islemList[$i]["line"]."}--> <b>".$islemList[$i]["function"]."()</b>";
			}
		}
		else{
			$donut = "<b>".$islemList[$son-1]["function"]."()</b>";
		}
		
		
		$sonIslem = end($islemList);
		$sonDosya = adrestenDosyaya($islemList[$son-1]["file"]);
		return $donut."[".$sonDosya."]: ";
	}
	
    function adrestenDosyaya($adres){
		$dizi = explode('\\', $adres);		
		$donut = end($dizi);
		
		return $donut;
	}

    //
	//*** Biraz daha fazla güvenlik için... yazımı kolaylaştırma üzerine... **//
	//
	
	function get($anahtar, $filtre = false){ // eklemeler, güvenlik üzerine iyi olur gibi gibi 
		$donut = false;
		
		if (isset($_GET[$anahtar])){
			$donut = htmlspecialchars($_GET[$anahtar]);
			
			switch ($filtre){
				case "sql":
						
					break;
				case "email":
				
					break;
				case "int":
					
					break;
				// gibi gibi...
			}
		}
		else {
			$donut = false;
			// belki bir yerlere birkaç log girmek iyi olabilir, "bak şuradan boş $_GET geldi" gibi gibi... 
		}
		
		return $donut;
	}
	
	function post($anahtar, $filtre = false){
		$donut = false;
		
		if (isset($_POST[$anahtar])){
			$donut = htmlspecialchars($_POST[$anahtar]);
			
			switch ($filtre){
				case "sql":
						
					break;
				case "email":
				
					break;
				case "int":
					
					break;
				// gibi gibi...
			}
		}
		else {
			$donut = false;
			// belki bir yerlere birkaç log girmek iyi olabilir, "bak şuradan boş $_POST geldi" gibi gibi... 
		}
		
		return $donut;
	}
?>