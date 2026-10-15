// Centralized bilingual dictionary. Every user-facing string lives here —
// no hardcoded text in components.
export const translations = {
  uz: {
    common: {
      brand: "KITCHEN STUDIO",
      ctaCalculate: "Narxni hisoblash",
      ctaCalculateShort: "Hisoblash",
      phoneLabel: "Telefon",
      loading: "Yuklanmoqda...",
      back: "Orqaga",
      continue: "Davom etish",
      skip: "O'tkazib yuborish",
      dontKnow: "Bilmayman / Maslahat kerak",
      stepOf: "Qadam {current} / {total}",
      close: "Yopish",
    },
    hero: {
      eyebrow: "Individual oshxona mebellari",
      title: "Oshxonangiz — sizning uslubingizda.",
      subtitle:
        "O'lcham, did va byudjetingizga mos individual oshxona mebellari. G'oyadan o'rnatishgacha.",
      ctaPrimary: "Bepul narx hisoblash",
      trust: "Har bir loyiha o'lchash va individual spetsifikatsiya asosida tayyorlanadi.",
      features: [
        { icon: "ruler", label: "Individual o'lchamlar" },
        { icon: "gem", label: "Sifatli materiallar" },
        { icon: "settings", label: "Zamonaviy furnitura" },
      ],
    },
    faq: {
      eyebrow: "Savol-javob",
      title: "Tez-tez beriladigan savollar",
      subtitle: "Oshxona mebellari haqidagi eng muhim savollarga qisqa va aniq javoblar.",
      items: [
        {
          q: "Narx qanday hisoblanadi?",
          a: "Narx o'lcham, material, furnitura, ustki qopqoq va loyiha murakkabligiga qarab hisoblanadi. Kalkulyator sizga taxminiy diapazonni ko'rsatadi, yakuniy narx o'lchovdan keyin tasdiqlanadi.",
        },
        {
          q: "Kalkulyator natijasi yakuniy narxmi?",
          a: "Yo'q, bu faqat taxminiy hisob-kitob. Yakuniy narx o'lchash, material tanlovi, furnitura spetsifikatsiyasi va loyiha tasdiqlanganidan keyin aniqlashtiriladi.",
        },
        {
          q: "Aniq o'lchamlarni bilmasam nima qilaman?",
          a: "Hech qisi yo'q — kalkulyatorda \"aniq o'lchamni bilmayman\" variantini tanlashingiz mumkin, mutaxassis keyinroq o'lchab beradi.",
        },
        {
          q: "Qancha vaqt ketadi?",
          a: "Muddat loyiha murakkabligi va joriy ish yukiga bog'liq. Aniq muddatni mutaxassis siz bilan bog'langanda tasdiqlaydi.",
        },
      ],
    },
    calculator: {
      title: "Narxni hisoblash",
      estimateDisclaimerTitle: "Muhim eslatma",
      estimateDisclaimer:
        "Yakuniy narx o'lchash, material tanlovi, furnitura spetsifikatsiyasi va loyihaning tasdiqlanganidan keyin aniqlashtiriladi.",
      liveSummaryTitle: "Sizning tanlovlaringiz",
      step1: {
        title: "Oshxonangiz qanday shaklda?",
        options: {
          straight: "To'g'ri chiziqli",
          l_shaped: "L-shaklli",
          u_shaped: "U-shaklli",
          island: "Orolchali",
          unsure: "Hali bilmayman",
        },
      },
      step2: {
        title: "Taxminiy o'lchamlar",
        lengthLabel: "Oshxona uzunligi (metr)",
        secondWallLabel: "Ikkinchi devor uzunligi (ixtiyoriy, metr)",
        ceilingHeightLabel: "Shift balandligi (ixtiyoriy, metr)",
        unknownOption: "Aniq o'lchamni bilmayman",
        unitHint: "metr",
      },
      step3: {
        title: "Dizayn uslubi",
        options: {
          modern: "Zamonaviy",
          minimalist: "Minimalist",
          classic: "Klassik",
          scandinavian: "Skandinav",
          other: "Boshqa / Maslahat kerak",
        },
      },
      step4: {
        title: "Material va bezak",
        options: {
          laminated_mdf: "Laminatlangan MDF",
          painted_mdf: "Bo'yalgan MDF",
          acrylic: "Akril",
          other: "Boshqa / Maslahat kerak",
        },
        descriptions: {
          laminated_mdf: "Chidamli va qulay narxdagi mashhur variant.",
          painted_mdf: "Silliq, bir xil rangdagi premium ko'rinish.",
          acrylic: "Yuqori yaltiroqlik va chidamlilik.",
          other: "Mutaxassis siz bilan variantlarni muhokama qiladi.",
        },
      },
      step5: {
        title: "Furnitura va ustki qopqoq",
        hardwareLabel: "Furnitura",
        countertopLabel: "Ustki qopqoq",
        options: {
          standard: "Standart",
          premium: "Premium",
          unsure: "Bilmayman / Maslahat kerak",
        },
      },
      step6: {
        title: "Byudjet",
        subtitle: "Bu sizga mos variantlarni taklif qilishimizga yordam beradi.",
        options: {
          under_20: "20 mln so'mgacha",
          r20_40: "20 – 40 mln so'm",
          r40_70: "40 – 70 mln so'm",
          over_70: "70 mln so'mdan yuqori",
          flexible: "Moslashuvchan byudjet",
          unsure: "Tanlashga yordam kerak",
        },
      },
      step7: {
        title: "Qachon boshlamoqchisiz?",
        options: {
          asap: "Imkon qadar tezroq",
          within_1_2_months: "1–2 oy ichida",
          later: "Keyinroq",
          exploring: "Hozircha faqat ko'rib chiqaman",
        },
      },
      step8: {
        title: "Loyihangizning taxminiy qiymati",
        min: "Minimal",
        max: "Maksimal",
        yourSelections: "Tanlovlaringiz",
        whatAffectsPrice: "Nima narxga ta'sir qiladi?",
        whatAffectsPriceText:
          "Yakuniy narx o'lcham, tanlangan material, furnitura, ustki qopqoq va loyiha murakkabligiga bog'liq.",
        notAvailableTitle: "Individual hisob-kitob talab qilinadi",
        notAvailableText:
          "Tanlovlaringiz asosida aniq diapazonni ko'rsatish uchun qo'shimcha ma'lumot kerak. Mutaxassis siz bilan bog'lanib, aniq narxni hisoblaydi.",
        ctaContinue: "Hisob-kitobni aniqlashtirish",
      },
      step9: {
        title: "Aloqa ma'lumotlari",
        nameLabel: "Ismingiz",
        namePlaceholder: "Ismingizni kiriting",
        phoneLabel: "Telefon raqamingiz",
        phonePlaceholder: "+998 90 123 45 67",
        commentLabel: "Qo'shimcha izoh (ixtiyoriy)",
        commentPlaceholder: "Qo'shimcha istaklaringiz bo'lsa, yozing",
        consentLabel: "Men bog'lanishga roziman va ma'lumotlarim qayta ishlanishiga rozilik beraman.",
        submit: "Yuborish",
        submitting: "Yuborilmoqda...",
        errors: {
          name: "Ismingizni kiriting",
          phone: "To'g'ri telefon raqamini kiriting",
          consent: "Davom etish uchun rozilik bering",
          submission: "Xatolik yuz berdi. Iltimos, qayta urinib ko'ring yoki Telegram orqali bog'laning.",
        },
      },
      success: {
        title: "Rahmat! Arizangiz qabul qilindi.",
        subtitle: "Mutaxassisimiz tez orada siz bilan bog'lanadi.",
        summaryTitle: "Sizning hisob-kitobingiz",
        close: "Yopish",
      },
    },
  },

  ru: {
    common: {
      brand: "KITCHEN STUDIO",
      ctaCalculate: "Рассчитать стоимость",
      ctaCalculateShort: "Рассчитать",
      phoneLabel: "Телефон",
      loading: "Загрузка...",
      back: "Назад",
      continue: "Далее",
      skip: "Пропустить",
      dontKnow: "Не знаю / Нужна консультация",
      stepOf: "Шаг {current} / {total}",
      close: "Закрыть",
    },
    hero: {
      eyebrow: "Индивидуальная кухонная мебель",
      title: "Ваша кухня — в вашем стиле.",
      subtitle:
        "Кухонная мебель по индивидуальным размерам с учётом вашего вкуса и бюджета. От идеи до установки.",
      ctaPrimary: "Бесплатный расчёт",
      trust: "Каждый проект создаётся на основе замеров и индивидуальной спецификации.",
      features: [
        { icon: "ruler", label: "Индивидуальные размеры" },
        { icon: "gem", label: "Качественные материалы" },
        { icon: "settings", label: "Современная фурнитура" },
      ],
    },
    faq: {
      eyebrow: "Вопросы и ответы",
      title: "Часто задаваемые вопросы",
      subtitle: "Короткие и точные ответы на самые важные вопросы о кухонной мебели.",
      items: [
        {
          q: "Как рассчитывается цена?",
          a: "Цена рассчитывается на основе размеров, материала, фурнитуры, столешницы и сложности проекта. Калькулятор показывает примерный диапазон, итоговая цена подтверждается после замера.",
        },
        {
          q: "Результат калькулятора — это окончательная цена?",
          a: "Нет, это предварительный расчёт. Итоговая цена уточняется после замера, выбора материалов, спецификации фурнитуры и согласования проекта.",
        },
        {
          q: "Что делать, если я не знаю точные размеры?",
          a: "Ничего страшного — в калькуляторе можно выбрать «не знаю точные размеры», специалист произведёт замер позже.",
        },
        {
          q: "Сколько времени это занимает?",
          a: "Срок зависит от сложности проекта и текущей загрузки. Точный срок подтвердит специалист при согласовании.",
        },
      ],
    },
    calculator: {
      title: "Расчёт стоимости",
      estimateDisclaimerTitle: "Важное уточнение",
      estimateDisclaimer:
        "Итоговая цена подтверждается после замера, выбора материалов, спецификации фурнитуры и согласования проекта.",
      liveSummaryTitle: "Ваш выбор",
      step1: {
        title: "Какая форма у вашей кухни?",
        options: {
          straight: "Прямая",
          l_shaped: "Г-образная",
          u_shaped: "П-образная",
          island: "С островом",
          unsure: "Пока не знаю",
        },
      },
      step2: {
        title: "Примерные размеры",
        lengthLabel: "Длина кухни (метры)",
        secondWallLabel: "Длина второй стены (необязательно, метры)",
        ceilingHeightLabel: "Высота потолка (необязательно, метры)",
        unknownOption: "Не знаю точные размеры",
        unitHint: "метры",
      },
      step3: {
        title: "Стиль дизайна",
        options: {
          modern: "Современный",
          minimalist: "Минимализм",
          classic: "Классика",
          scandinavian: "Скандинавский",
          other: "Другое / Нужен совет",
        },
      },
      step4: {
        title: "Материал и отделка",
        options: {
          laminated_mdf: "Ламинированный МДФ",
          painted_mdf: "Окрашенный МДФ",
          acrylic: "Акрил",
          other: "Другое / Нужен совет",
        },
        descriptions: {
          laminated_mdf: "Практичный и доступный по цене вариант.",
          painted_mdf: "Гладкий, однотонный премиальный вид.",
          acrylic: "Высокий блеск и долговечность.",
          other: "Специалист обсудит с вами варианты.",
        },
      },
      step5: {
        title: "Фурнитура и столешница",
        hardwareLabel: "Фурнитура",
        countertopLabel: "Столешница",
        options: {
          standard: "Стандарт",
          premium: "Премиум",
          unsure: "Не знаю / Нужна консультация",
        },
      },
      step6: {
        title: "Бюджет",
        subtitle: "Это поможет предложить вам подходящие варианты.",
        options: {
          under_20: "До 20 млн сум",
          r20_40: "20 – 40 млн сум",
          r40_70: "40 – 70 млн сум",
          over_70: "Более 70 млн сум",
          flexible: "Гибкий бюджет",
          unsure: "Нужна помощь с выбором",
        },
      },
      step7: {
        title: "Когда хотите начать?",
        options: {
          asap: "Как можно скорее",
          within_1_2_months: "В течение 1–2 месяцев",
          later: "Позже",
          exploring: "Пока просто изучаю",
        },
      },
      step8: {
        title: "Предварительная стоимость проекта",
        min: "Минимум",
        max: "Максимум",
        yourSelections: "Ваш выбор",
        whatAffectsPrice: "Что влияет на цену?",
        whatAffectsPriceText:
          "Итоговая цена зависит от размеров, выбранного материала, фурнитуры, столешницы и сложности проекта.",
        notAvailableTitle: "Требуется индивидуальный расчёт",
        notAvailableText:
          "Для точного диапазона на основе вашего выбора нужна дополнительная информация. Специалист свяжется с вами и рассчитает точную цену.",
        ctaContinue: "Уточнить расчёт",
      },
      step9: {
        title: "Контактные данные",
        nameLabel: "Ваше имя",
        namePlaceholder: "Введите имя",
        phoneLabel: "Номер телефона",
        phonePlaceholder: "+998 90 123 45 67",
        commentLabel: "Дополнительный комментарий (необязательно)",
        commentPlaceholder: "Если есть дополнительные пожелания, напишите здесь",
        consentLabel: "Я согласен на связь и обработку моих данных.",
        submit: "Отправить",
        submitting: "Отправка...",
        errors: {
          name: "Введите имя",
          phone: "Введите корректный номер телефона",
          consent: "Подтвердите согласие для продолжения",
          submission: "Произошла ошибка. Повторите попытку или свяжитесь через Telegram.",
        },
      },
      success: {
        title: "Спасибо! Ваша заявка принята.",
        subtitle: "Наш специалист свяжется с вами в ближайшее время.",
        summaryTitle: "Ваш расчёт",
        close: "Закрыть",
      },
    },
  },
};

export function t(dict, key, vars) {
  const value = key.split(".").reduce((acc, part) => acc?.[part], dict);
  if (typeof value !== "string") return key;
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, v),
    value
  );
}
