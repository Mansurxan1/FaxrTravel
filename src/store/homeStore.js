import { create } from "zustand";

const useHomeStore = create((set) => ({
  slides: [
    {
      id: 1,
      textUz: "Dubay, BAA",
      textRu: "Дубай, ОАЭ",
      textEng: "Dubai, UAE",
      descUz: "Quyoshli plyajlar va zamonaviy me'morchilik shahri.",
      descRu: "Город солнечных пляжей и современной архитектуры.",
      descEng: "A city of sunny beaches and modern architecture.",
      image:
        "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_1920,g_auto/f_auto/q_auto/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVARSAP0",
      price: "8 000 000",
      day: "7",
      travelUz:
        "Burj Khalifa va Dubai Mall’ni ziyorat qilish, choʻl safari va anʼanaviy arabcha kechki ovqat, palm Jumeirah va Marina Bay bo‘ylab sayr",
      travelRu:
        "Посещение Бурдж-Халифа и Дубай Молл, сафари в пустыне и традиционный арабский ужин, прогулка по Палм Джумейра и Марина Бэй",
      travelEng:
        "Visiting Burj Khalifa and Dubai Mall, desert safari and traditional Arabic dinner, a walk along Palm Jumeirah and Marina Bay",
      visaUz:
        "Oʻzbekiston fuqarolari uchun BAA vizasi talab qilinmaydi. Vizasiz rejim 2024-yil 16-yanvardan kuchga kirgan",
      visaRu:
        "Для граждан Узбекистана виза в ОАЭ не требуется. Безвизовый режим вступил в силу с 16 января 2024 года",
      visaEng:
        "No visa is required for Uzbek citizens to enter the UAE. The visa-free regime has been in effect since January 16, 2024.",
      hotels: [
        {
          nameUz: "Burj Al Arab",
          nameRu: "Бурдж Аль Араб",
          nameEng: "Burj Al Arab",
          price: "5 000 000",
        },
        {
          nameUz: "Atlantis The Palm",
          nameRu: "Атлантис Зе Палм",
          nameEng: "Atlantis The Palm",
          price: "3 500 000",
        },
      ],
      priceIncludes: {
        uz: [
          "Guruh transferlari aeroport - mehmonxona - aeroport",
          "Dasturga muvofiq guruh o'tkazmalari",
          "3* mehmonxonalarda joylashtirish",
          "Ovqatlanish - nonushta",
        ],
        ru: [
          "Групповые трансферы аэропорт - отель - аэропорт",
          "Групповые трансферы согласно программе",
          "Проживание в отелях 3*",
          "Питание - завтрак",
        ],
        en: [
          "Group transfers airport - hotel - airport",
          "Group transfers as per the program",
          "Accommodation in 3* hotels",
          "Meals - breakfast",
        ],
      },
      additionalPayments: {
        uz: [
          "Toshkent – Parij – Toshkent – ekonom-klass havo reysi 9 400 000 so‘mdan",
          "Viza to‘lovi – bir kishi uchun 1 551 000 so‘m",
          "Tibbiy sug‘urta polisi – bir kishi uchun 90 000 so‘mdan",
          "Kompaniya xizmatlari – bir kishi uchun 500 000 so‘m",
        ],
        ru: [
          "Ташкент – Париж – Ташкент – авиаперелет эконом-класса от 9 400 000 сум",
          "Визовый сбор – 1 551 000 сум на человека",
          "Медицинская страховка – от 90 000 сум на человека",
          "Услуги компании – 500 000 сум на человека",
        ],
        en: [
          "Tashkent – Paris – Tashkent – economy class flight from 9,400,000 UZS",
          "Visa fee – 1,551,000 UZS per person",
          "Medical insurance policy – from 90,000 UZS per person",
          "Company services – 500,000 UZS per person",
        ],
      },
    },
    {
      id: 2,
      textUz: "Istanbul, Turkiya",
      textRu: "Стамбул, Турция",
      textEng: "Istanbul, Turkey",
      descUz: "Tarixiy yodgorliklari bilan mashhur shahar.",
      descRu: "Город, известный своими историческими достопримечательностями.",
      descEng: "A city known for its historical landmarks.",
      image: "https://www.hotelgift.com/media/wp/HG/2024/02/mosque.jpg",
      price: "10 000 000",
      day: "7",
      travelUz:
        "Ayasofiya va Topkapi saroyini tomosha qilish, bosfor bo‘ylab qayiq sayohati, Grand Bazaar’da xarid qilish",
      travelRu:
        "Осмотреть Айя-Софию и дворец Топкапы, прогулка по Босфору на катере, шопинг на Гранд-Базаре",
      travelEng:
        "Explore Hagia Sophia and Topkapi Palace, Take a Bosphorus cruise, Shop at the Grand Bazaar",
      visaUz:
        "Turkiyaga viza talab qilinmaydi – 90 kungacha bo‘lgan sayohatlar uchun. O‘zbekiston fuqarolari bemalol tashrif buyurishlari mumkin.",
      visaRu:
        "Виза в Турцию не требуется – для поездок до 90 дней. Граждане Узбекистана могут свободно посещать страну.",
      visaEng:
        "No visa required for Turkey – for stays up to 90 days. Uzbekistan citizens can visit freely.",
      hotels: [
        {
          nameUz: "Four Seasons Sultanahmet",
          nameRu: "Фор Сизонс Султанахмет",
          nameEng: "Four Seasons Sultanahmet",
          price: "4 000 000",
        },
        {
          nameUz: "Pera Palace",
          nameRu: "Пера Палас",
          nameEng: "Pera Palace",
          price: "3 000 000",
        },
      ],
      priceIncludes: {
        uz: [
          "Guruh transferlari aeroport - mehmonxona - aeroport",
          "Dasturga muvofiq guruh o'tkazmalari",
          "3* mehmonxonalarda joylashtirish",
          "Ovqatlanish - nonushta",
        ],
        ru: [
          "Групповые трансферы аэропорт - отель - аэропорт",
          "Групповые трансферы согласно программе",
          "Проживание в отелях 3*",
          "Питание - завтрак",
        ],
        en: [
          "Group transfers airport - hotel - airport",
          "Group transfers as per the program",
          "Accommodation in 3* hotels",
          "Meals - breakfast",
        ],
      },
      additionalPayments: {
        uz: [
          "Toshkent – Parij – Toshkent – ekonom-klass havo reysi 9 400 000 so‘mdan",
          "Viza to‘lovi – bir kishi uchun 1 551 000 so‘m",
          "Tibbiy sug‘urta polisi – bir kishi uchun 90 000 so‘mdan",
          "Kompaniya xizmatlari – bir kishi uchun 500 000 so‘m",
        ],
        ru: [
          "Ташкент – Париж – Ташкент – авиаперелет эконом-класса от 9 400 000 сум",
          "Визовый сбор – 1 551 000 сум на человека",
          "Медицинская страховка – от 90 000 сум на человека",
          "Услуги компании – 500 000 сум на человека",
        ],
        en: [
          "Tashkent – Paris – Tashkent – economy class flight from 9,400,000 UZS",
          "Visa fee – 1,551,000 UZS per person",
          "Medical insurance policy – from 90,000 UZS per person",
          "Company services – 500,000 UZS per person",
        ],
      },
    },
    {
      id: 3,
      textUz: "Parij, Fransiya",
      textRu: "Париж, Франция",
      textEng: "Paris, France",
      descUz: "Sevgi va romantika shahri.",
      descRu: "Город любви и романтики.",
      descEng: "The city of love and romance.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1200&h=-1&s=1",
      price: "9 000 000",
      day: "7",
      travelUz:
        "Eyfel minorasiga chiqish va Luvr muzeyini ziyorat qilish, sena daryosida qayiqda sayr, notr-Dam va Monmartre’ni kashf etish",
      travelRu:
        "Подняться на Эйфелеву башню и посетить Луврбб, прогулка по Сене на катереб, исследовать Нотр-Дам и Монмартр",
      travelEng:
        "Climb the Eiffel Tower and visit the Louvre, enjoy a boat ride on the Seine River, Discover Notre-Dame and Montmartre",
      visaUz:
        "Fransiyaga kirish uchun Shengen vizasi talab qilinadi. O‘zbekiston fuqarolari oldindan viza olishlari kerak.",
      visaRu:
        "Для въезда во Францию требуется шенгенская виза. Граждане Узбекистана должны оформить визу заранее.",
      visaEng:
        "A Schengen visa is required to enter France. Uzbekistan citizens must obtain a visa in advance.",
      hotels: [
        {
          nameUz: "Ritz Paris",
          nameRu: "Ритц Париж",
          nameEng: "Ritz Paris",
          price: "6 000 000",
        },
        {
          nameUz: "Le Meurice",
          nameRu: "Ле Морис",
          nameEng: "Le Meurice",
          price: "4 500 000",
        },
      ],
      priceIncludes: {
        uz: [
          "Guruh transferlari aeroport - mehmonxona - aeroport",
          "Dasturga muvofiq guruh o'tkazmalari",
          "3* mehmonxonalarda joylashtirish",
          "Ovqatlanish - nonushta",
        ],
        ru: [
          "Групповые трансферы аэропорт - отель - аэропорт",
          "Групповые трансферы согласно программе",
          "Проживание в отелях 3*",
          "Питание - завтрак",
        ],
        en: [
          "Group transfers airport - hotel - airport",
          "Group transfers as per the program",
          "Accommodation in 3* hotels",
          "Meals - breakfast",
        ],
      },
      additionalPayments: {
        uz: [
          "Toshkent – Parij – Toshkent – ekonom-klass havo reysi 9 400 000 so‘mdan",
          "Viza to‘lovi – bir kishi uchun 1 551 000 so‘m",
          "Tibbiy sug‘urta polisi – bir kishi uchun 90 000 so‘mdan",
          "Kompaniya xizmatlari – bir kishi uchun 500 000 so‘m",
        ],
        ru: [
          "Ташкент – Париж – Ташкент – авиаперелет эконом-класса от 9 400 000 сум",
          "Визовый сбор – 1 551 000 сум на человека",
          "Медицинская страховка – от 90 000 сум на человека",
          "Услуги компании – 500 000 сум на человека",
        ],
        en: [
          "Tashkent – Paris – Tashkent – economy class flight from 9,400,000 UZS",
          "Visa fee – 1,551,000 UZS per person",
          "Medical insurance policy – from 90,000 UZS per person",
          "Company services – 500,000 UZS per person",
        ],
      },
    },
  ],
  setSlides: (newSlides) => set({ slides: newSlides }),
}));

export default useHomeStore;
