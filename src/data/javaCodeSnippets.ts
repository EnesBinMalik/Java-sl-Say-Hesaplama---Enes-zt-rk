import { CodeVariant } from '../types';

export const javaCodeSnippets: CodeVariant[] = [
  {
    id: 'standard',
    title: 'Standart For Döngüsü (Ödevin Esas Çözümü)',
    badge: 'Ödev Çözümü',
    description: 'Scanner ile kullanıcıdan taban ve üs alan, 1\'den üs değerine kadar dönen klasik for döngüsü.',
    filename: 'UsluSayiHesaplama.java',
    code: `/**
 * Ödev: Java ile kullanıcının girdiği değerler ile üslü sayı hesaplayan program
 * Kural: "For Döngüsü" kullanılarak yapılmalıdır.
 * 
 * Hazırlayan: Enes Öztürk
 */
import java.util.Scanner;

public class UsluSayiHesaplama {
    public static void main(String[] args) {
        // Değişkenlerin tanımlanması
        int taban, us;
        long sonuc = 1; // Çarpma işleminin etkisiz elemanı 1 olduğu için 1 ile başlatıyoruz.

        // Kullanıcıdan veri almak için Scanner nesnesi oluşturuyoruz
        Scanner input = new Scanner(System.in);

        System.out.println("=========================================");
        System.out.println("  Java Üslü Sayı Hesaplama Programı     ");
        System.out.println("  Hazırlayan: Enes Öztürk                ");
        System.out.println("=========================================\\n");

        System.out.print("Üssü alınacak sayı (Taban): ");
        taban = input.nextInt();

        System.out.print("Üs olacak sayı (Kuvvet): ");
        us = input.nextInt();

        // For döngüsü ile üs alma işlemi
        // Sayacımız (i) 1'den başlar ve 'us' değerine eşit olana kadar her adımda 1 artar.
        for (int i = 1; i <= us; i++) {
            sonuc *= taban; // Her adımda sonucu taban değeri ile çarpıyoruz (sonuc = sonuc * taban)
        }

        // Sonucun ekrana yazdırılması
        System.out.println("\\nSonuç: " + taban + "^" + us + " = " + sonuc);

        // Kaynak sızıntısını önlemek için Scanner kapatılır
        input.close();
    }
}`,
    lineExplanations: {
      1: "Programın başlık yorum satırı (JavaDoc formatı).",
      5: "Ödevi hazırlayan: Enes Öztürk imza yorumu.",
      7: "Kullanıcıdan klavye girdisi almak için java.util.Scanner sınıfını import ediyoruz.",
      9: "Sınıf tanımı (Java'da dosya adı sınıf adı ile aynı olmalıdır: UsluSayiHesaplama.java).",
      10: "Programın ana giriş noktası (main metodu).",
      12: "Kullanıcının gireceği taban ve üs değişkenlerini int olarak tanımlıyoruz.",
      13: "sonuc değişkeni: Çarpmanın etkisiz elemanı 1 olduğundan 1 verilir. Büyük sayılar için long seçildi.",
      16: "Standart konsol girdisini (System.in) okuyacak Scanner nesnesi başlatılıyor.",
      23: "Kullanıcıdan taban sayısı (n) okunur.",
      26: "Kullanıcıdan üs kuvveti (k) okunur.",
      30: "For Döngüsü: int i = 1 (başlangıç), i <= us (koşul), i++ (arttırma).",
      31: "Döngü gövdesi: Her turda sonuc değeri taban ile çarpılır (sonuc = sonuc * taban).",
      35: "Hesaplanan nihai sonuç konsola yazdırılır.",
      38: "Açık kalan Scanner akışı kapatılır."
    }
  },
  {
    id: 'advanced',
    title: 'Gelişmiş Çözüm (Negatif Üs & Sıfır Kontrolü)',
    badge: 'Tüm Durumlar',
    description: 'Negatif üsleri (örn: 2^-3 = 0.125) ve sıfırıncı kuvveti (x^0 = 1) profesyonelce ele alan double çözümü.',
    filename: 'GelismisUsluSayi.java',
    code: `/**
 * Gelişmiş Üslü Sayı Hesaplama (Negatif Üs ve Sıfır Destekli)
 * Hazırlayan: Enes Öztürk
 */
import java.util.Scanner;

public class GelismisUsluSayi {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.print("Taban sayısını giriniz: ");
        double taban = input.nextDouble();

        System.out.print("Üs sayısını giriniz (Pozitif veya Negatif): ");
        int us = input.nextInt();

        double sonuc = 1.0;
        int pozitifUs = Math.abs(us);

        // For döngüsü mutlak üs kadar çalışır
        for (int i = 1; i <= pozitifUs; i++) {
            sonuc *= taban;
        }

        // Eğer kullanıcı negatif bir üs girdiyse: x^(-n) = 1 / (x^n)
        if (us < 0) {
            sonuc = 1.0 / sonuc;
        }

        System.out.printf("Sonuç: %.2f ^ %d = %s\\n", taban, us, sonuc);
        input.close();
    }
}`,
    lineExplanations: {
      10: "Kullanıcıdan ondalıklı veya tam sayı taban alınır.",
      13: "Kullanıcıdan pozitif veya negatif tam sayı üs alınır.",
      16: "Negatif üslerde kesirli sayı oluşacağından sonuç double olarak tutulur.",
      17: "Döngünün kaç kez döneceğini belirlemek için üssün mutlak değeri (Math.abs) alınır.",
      20: "For döngüsü mutlak üs değeri kadar adım adım çarpım yapar.",
      25: "Negatif üs kuralı uygulanır: a^(-b) = 1 / (a^b).",
      29: "Formatlanmış çıktı ekrana yazdırılır."
    }
  },
  {
    id: 'method',
    title: 'Metot ile Modüler Tasarım',
    badge: 'Clean Code',
    description: 'Üs alma işlemini bağımsız bir metoda (fonksiyon) taşıyarak yeniden kullanılabilir hale getiren yapı.',
    filename: 'MetotluUsluSayi.java',
    code: `/**
 * Modüler Fonksiyon ile Üslü Sayı Hesaplama
 * Hazırlayan: Enes Öztürk
 */
import java.util.Scanner;

public class MetotluUsluSayi {
    
    // For döngüsü kullanan üs alma yardımcı metodu
    public static long usHesapla(int taban, int us) {
        long sonuc = 1;
        for (int i = 1; i <= us; i++) {
            sonuc *= taban;
        }
        return sonuc;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Taban: ");
        int taban = scanner.nextInt();

        System.out.print("Üs: ");
        int us = scanner.nextInt();

        // Metodu çağırarak hesaplama yapıyoruz
        long sonuc = usHesapla(taban, us);

        System.out.println("Metot ile Hesaplanan Sonuç: " + sonuc);
        scanner.close();
    }
}`,
    lineExplanations: {
      10: "usHesapla metodu: taban ve us parametrelerini alıp long türünde sonuç döner.",
      11: "sonuc 1 ile başlatılır.",
      12: "For döngüsü 1'den us değerine kadar çalışır.",
      15: "Hesaplanan nihai değer çağrılan yere return edilir.",
      28: "main içerisinde metodumuz parametreler gönderilerek çağrılır."
    }
  }
];
