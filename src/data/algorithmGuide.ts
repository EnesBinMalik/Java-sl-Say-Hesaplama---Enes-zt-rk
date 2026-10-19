export interface LoopComponent {
  title: string;
  syntax: string;
  description: string;
  roleInProgram: string;
}

export const loopComponents: LoopComponent[] = [
  {
    title: '1. Başlatma (Initialization)',
    syntax: 'int i = 1;',
    description: 'Döngü sayacının (loop counter) ilk değerini belirler. Sadece döngü başlarken bir defa çalışır.',
    roleInProgram: 'Çarpma işleminin ilk adımını temsil etmek için sayacımızı 1 sayısından başlatıyoruz.'
  },
  {
    title: '2. Koşul Kontrolü (Condition Check)',
    syntax: 'i <= us;',
    description: 'Her turun başında kontrol edilen mantıksal ifadedir. Doğru (true) olduğu sürece döngü gövdesi çalışmaya devam eder.',
    roleInProgram: 'i değeri kullanıcıdan alınan üs kuvvetine eşit veya küçük olduğu sürece döngü dönmeye devam eder.'
  },
  {
    title: '3. Döngü Gövdesi (Loop Body)',
    syntax: 'sonuc *= taban;',
    description: 'Koşul sağlandığı müddetçe yürütülen kod bloğudur.',
    roleInProgram: 'Mevcut sonucu taban ile çarpar: sonuc = sonuc * taban. Böylece üs kadar ardışık çarpım gerçekleşir.'
  },
  {
    title: '4. Artırma / İlerleme (Increment)',
    syntax: 'i++',
    description: 'Gövdedeki kodlar tamamlandıktan sonra sayacı bir sonraki adıma taşır (i = i + 1).',
    roleInProgram: 'Her başarılı çarpım turundan sonra sayaç 1 artarak koşula doğru ilerler, sonsuz döngüyü engeller.'
  }
];

export const mathematicalInsights = [
  {
    title: 'Neden sonuc = 1 ile Başlarız? (Neden 0 Değil?)',
    formula: 'sonuc = 1',
    explanation: 'Çarpma işleminin etkisiz elemanı 1\'dir. Eğer değişkeni 0 ile başlatsaydık, 0 * taban her zaman 0 sonucunu vereceğinden program daima 0 döndürürdü.'
  },
  {
    title: 'Sıfırıncı Kuvvet Kuralı (x⁰ = 1)',
    formula: 'x⁰ = 1',
    explanation: 'Kullanıcı üs değerini 0 girdiğinde, koşul (1 <= 0) ilk adımda false olur. Döngü hiç çalışmaz ve sonuc doğrudan başlangıçtaki 1 olarak kalır. Matematik kuralı kendiliğinden kusursuz çalışır.'
  },
  {
    title: 'Veri Tipi Seçimi: Neden int Değil de long?',
    formula: 'long sonuc = 1;',
    explanation: 'Üslü sayılar çok hızlı büyür. Java\'da standart int türü maksimum ~2.14 milyar (2^31 - 1) tutabilir. long veri tipi ise ~9 kentilyon (2^63 - 1) değere kadar taşma yapmadan hesaplama imkanı sağlar.'
  }
];
