import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Java ile üslü sayı hesaplarken "sonuc" değişkeninin ilk değeri neden 0 yerine 1 olarak atanmalıdır?',
    options: [
      'Java derleyicisi 0 atanmasına izin vermez',
      'Çarpma işleminin yutan elemanı 0, etkisiz elemanı 1 olduğu için',
      'For döngüsü 0 ile başlayan değişkenleri artıramaz',
      'Programın bellekte daha az yer kaplaması için'
    ],
    correctIndex: 1,
    explanation: 'Çarpma işleminde 0 yutan elemandır; sıfır ile neyi çarparsanız sonuç 0 olur. Çarpmanın birim (etkisiz) elemanı 1 olduğu için başlangıç değeri 1 seçilmelidir.'
  },
  {
    id: 2,
    question: 'taban = 3 ve us = 4 girildiğinde "for (int i = 1; i <= us; i++)" döngüsü kaç kez çalışır?',
    options: [
      '3 kez',
      '4 kez',
      '5 kez',
      '12 kez'
    ],
    correctIndex: 1,
    explanation: 'Sayaç i = 1, 2, 3 ve 4 değerlerini alır. i = 5 olduğunda 5 <= 4 koşulu false olacağından döngü tam olarak 4 kez çalışır.'
  },
  {
    id: 3,
    question: 'Kullanıcı taban = 7 ve us = 0 girdiğinde bu for döngülü program ekrana ne yazdırır?',
    options: [
      '0',
      '1',
      '7',
      'Döngü hatası (Exception)'
    ],
    correctIndex: 1,
    explanation: 'us = 0 iken i = 1 için "1 <= 0" koşulu baştan false olur. Döngü gövdesine hiç girilmez ve başlangıçta atanan "sonuc = 1" doğrudan ekrana yazdırılır (7⁰ = 1).'
  },
  {
    id: 4,
    question: 'Java\'da 2³⁰ veya daha büyük üsleri hesaplarken hangi veri tipi taşmayı (overflow) önlemek için tercih edilir?',
    options: [
      'byte',
      'short',
      'int',
      'long veya BigInteger'
    ],
    correctIndex: 3,
    explanation: 'Java int tipi maksimum 2^31-1 (~2.14 milyar) tutabilir. 2^30 ve üzeri büyük üslerde int taşma yaşar; bu nedenle long veya çok büyük sayılarda BigInteger tercih edilir.'
  }
];
