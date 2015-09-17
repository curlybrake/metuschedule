<?php
    
    $GLOBALS['DB'] = mysqli_connect (DB_Server,  DB_User, DB_Pass, DB_Name);
    mysqli_query($GLOBALS['DB'], "SET NAMES 'utf8'");
    echo mysqli_error($GLOBALS['DB']);
    echo mysqli_errno($GLOBALS['DB']);
    //
	//*** Veritabanı için yazım kolaylaştırma/hızlandırma foksiyonları **//
	//
	
	function vtData($anahtar = false, $varsayilan = false, $echo = false){ // system tablosundan belli bir anahtara bağlanmış veriyi getirir, bulunamadığı takdirde, varsayılan değeri girilmiş ise, yeni değer veriler tablosuna eklenir...		$donut;
		$donut = false;
        
        echo "1 \n";
        
		$sorgu = vtQuery("SELECT * FROM system WHERE key='".$anahtar.'"', 1);
		 
		if ($sorgu){
			$donut = vtSutunsal("value");
		}
		else {
			if ($varsayilan){
				$donut = $varsayilan;
				vtQuery("INSERT INTO system(key, value, createDate) VALUES ('".$anahtar."', '".$varsayilan."', '".tarih('Y')."')", 1); // yeni değeri tabloya ekleme
			}
		}
		
        echo "2";
        
		if($echo){echo $donut;}
		return $donut;
	}
	
	function vtQuery($sorgu, $kontrol = 0){ // Amaç: yazım kolaylığı getirmek, hata ayıklamayı kolaylaştırmak... // $kotrol bize veritabanından kayıt çıkmadığı zaman ne yapılacağını belirtir...
		$donut;
		$donut = mysqli_query($GLOBALS['DB'], $sorgu);
		
		if (!$donut){
			$sqlMesaji = mysqli_error($GLOBALS['DB']);
            //new dBug($sqlMesaji);
			die("<br>".islemDokumu()."de verilen sorguda hata var:<br>".$sqlMesaji);
		}
	
		if (!mysql_num_rows($donut)){ // kayıt yoksa?
			switch ($kontrol) {
				case 0:
					// Hiç bir şey yapma
					break;
				case 1:
					// Hata mesajı yazdır...
					die("<br>".islemDokumu()."de verilen sorgudan kayıt çıkmadı");
					break;
				case 2:
					// Sadece dönütü sıfırla...
					$donut = false;
					break;
			}
		}
		
		$GLOBALS["activeQuery"] = $donut; // bu sayede son_satir(), sonuc() gibi fonksiyonlar, değişken karmaşasına girmeden kullanılabilecekler...
		return $donut;
	}
	
	function vtSutunsal($sutun = 0, $hata = 1){ // sutun değeri girilmediğinde array, sutun değeri girildiğinde string dönütü verir, // sürekli bir sonraki satırı döndürür 
		$donut = false;
		
		if ($sutun){
			$sorguSonuc = vtSonuc($hata);
			if ($sorguSonuc){ // eğer vtSonuc içinde verilen filtrelerden geçilebilmiş ise...
				if (isset($sorguSonuc[$sutun])){
					$donut = $sorguSonuc[$sutun];
				}
				else{
					die("<br>".islemDokumu()."\"".$sutun."\" sütunu, verilen sorguda bulunamadı");
				}
			}
			else{ 
				if ($hata){
					die("<br>".islemDokumu()."de çalıştırılan sorguda hata tespit edildi");
				}
			}
		}
		
		return $donut;
	}
	
	function vtSonuc($hata = 1){ // Sadece Array olarak son sorgudaki bir sonraki satırın değerini döndürür // dönüt trim tarafından temizlenmiş olacaktır
		$donut = false;
		$ham = false;
		if (isset($GLOBALS["activeQuery"])){
			if ($GLOBALS["activeQuery"]){
				$ham = mysqli_fetch_array($GLOBALS['DB'], $GLOBALS["activeQuery"]);
				
				if ($ham){
					//! Önemli trim fonksiyonu dönen değerlerdeki istenmeye boşlukları alacaktır !//
					foreach ($ham as $ID => $islencek){
						if (is_string($islencek)){ // dönütün string olmama durumuna karşı :)
							$donut[$ID] = trim($islencek);
						}
						else{
							$donut[$ID] = $islencek;
						}
					}
				}
			}
			else{
				if ($hata){
					echo islemDokumu();
					die("herhangi bir sorgu bulunamadı");
				}
			}
		}
		else{
			if ($hata){
				echo islemDokumu();
				die("herhangi bir sorgu bulunamadı");
			}
		}
		
		return $donut;
	}
?>