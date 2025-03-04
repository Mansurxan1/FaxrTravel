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
      visaUz: "BAA uchun viza talab qilinadi (e-Visa mavjud).",
      visaRu: "Для ОАЭ требуется виза (доступна e-Visa).",
      visaEng: "A visa is required for the UAE (e-Visa available).",
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
      visaUz: "Turkiya uchun viza talab qilinmaydi (90 kungacha).",
      visaRu: "Для Турции виза не требуется (до 90 дней).",
      visaEng: "No visa required for Turkey (up to 90 days).",
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
      visaUz: "Fransiya uchun Shengen vizasi talab qilinadi.",
      visaRu: "Для Франции требуется Шенгенская виза.",
      visaEng: "A Schengen visa is required for France.",
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
    {
      id: 4,
      textUz: "Test, Test",
      textRu: "Test, Test",
      textEng: "Test, Test",
      descUz: "Test va romantika shahri.",
      descRu: "Test любви и романтики.",
      descEng: "The city of love and romance.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1200&h=-1&s=1",
      price: "1 000",
      day: "7",
      visaUz: "Test uchun Shengen vizasi talab qilinadi.",
      visaRu: "Test Test требуется Шенгенская виза.",
      visaEng: "A Test visa is required for France.",
      hotels: [
        {
          nameUz: "Ritz Paris",
          nameRu: "Ритц Париж",
          nameEng: "Ritz Paris",
          price: "600",
        },
        {
          nameUz: "Le Meurice",
          nameRu: "Ле Морис",
          nameEng: "Le Meurice",
          price: "450",
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
        eng: [
          "Group transfers airport - hotel - airport",
          "Group transfers as per the program",
          "Accommodation in 3* hotels",
          "Meals - breakfast",
        ],
      },
      additionalPayments: {
        uz: [
          "Toshkent – Parij – Toshkent – ekonom-klass havo reysi 9 400 000 so‘mdan",
          "Test to‘lovi – bir kishi uchun 1 551 000 so‘m",
          "Tibbiy sug‘urta polisi – bir kishi uchun 90 000 so‘mdan",
          "Kompaniya xizmatlari – bir kishi uchun 500 000 so‘m",
        ],
        ru: [
          "Ташкент – Париж – Ташкент – авиаперелет эконом-класса от 9 400 000 сум",
          "Test сбор – 1 551 000 сум на человека",
          "Медицинская страховка – от 90 000 сум на человека",
          "Услуги компании – 500 000 сум на человека",
        ],
        eng: [
          "Tashkent – Paris – Tashkent – economy class flight from 9,400,000 UZS",
          "Test fee – 1,551,000 UZS per person",
          "Medical insurance policy – from 90,000 UZS per person",
          "Company services – 500,000 UZS per person",
        ],
      },
    },
  ],
  setSlides: (newSlides) => set({ slides: newSlides }),
}));

export default useHomeStore;
