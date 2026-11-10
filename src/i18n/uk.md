# X-ON-X — українська версія сайту

Nov 10, 2026 · @Mariia

Повний переклад https://www.x-on-x.com/ українською: головна (desktop і mobile), 8 попапів і 8 сторінок кейсів, модалка «Content coming soon», меню, футер, meta/SEO, alt-тексти й aria-мітки. Редагуйте колонку **UA** прямо в таблицях.

## Інструкція для розробника

1. **Шукайте за англійським текстом, а не за позицією.** Розмітка змінювалася під час деплою, тому кожен рядок — це пара «англійський текст на живому сайті → український текст». Знайдіть EN-рядок у поточних шаблонах і замініть на UA.
2. **Структуру HTML не змінюйте.** Класи, `data-*` атрибути, id попапів (`popup-bettter` тощо), посилання та JS (`/js/cases.js`, carousel) лишаються як є. Перекладаються лише текст і атрибути `alt`, `aria-label`, `title`, `content` (meta).
3. **Рядки, розбиті на кілька елементів** (заголовок у два рядки, текст із виділеним фрагментом), подано окремими рядками в тому ж порядку. Виділені фрагменти позначені **жирним** — у HTML вони лишаються в тому ж тезі, що й в оригіналі.
4. **Не перекладаються:** X-ON-X, назви клієнтів і брендів (Bettter, Bazhane, MA-KO, Poynto, AtSchool, Harrods, LVMH, FILA, Gieves & Hawkes, DSQUARED2), Legal500, ITR, Forbes Next-250, SAFE, UHNWI, e-mail адреси, коди `B/01…`, `I/01…`, `§ 01`, символи `→ ↩︎ · • ×`.
5. **Технічне:** `<html lang="uk">`; `og:locale=uk_UA`; у JSON-LD `"inLanguage": "uk"`; `hreflang` en / uk / x-default між версіями (напр. `/ua/`); перемикач `EN · UA` веде між версіями, зокрема на `/cases/*/`. Українські рядки на 15–25 % довші — перевірте картки, теги, кнопки, мобільне меню.
6. **Типографіка:** апостроф `’`, тире `–` з пробілами, лапки «ялинки».

## 1. Meta / SEO (головна)

| Де | EN | UA |
| --- | --- | --- |
| title, og:title, twitter:title | X-ON-X \| New market launch | X-ON-X \| Вихід на нові ринки |
| meta / og / twitter description, JSON-LD description | X-ON-X. Boutique law firm. Partners to Ukrainian founders building international businesses. Fashion, Investments, Miltech. Legal500, ITR, Forbes Next-250 | X-ON-X. Юридична фірма. Партнери українських засновників, які будують міжнародний бізнес. Фешен, інвестиції, мілтек. Legal500, ITR, Forbes Next-250 |
| JSON-LD areaServed | London / Kyiv / Warsaw | Лондон / Київ / Варшава |
| JSON-LD founder | Oleg Kotliar / Viktoriia Kotliar | Олег Котляр / Вікторія Котляр |

## 2. Хедер і навігація

| EN | UA |
| --- | --- |
| What We Do | Що ми робимо |
| Fashion | Мода |
| Investments | Інвестиції |
| Miltech | Мілтек |
| Insights | Аналітика |
| About | Про нас |
| Contacts | Контакти |
| EN · UA | EN · UA (без змін) |
| Come on in → | Написати → |
| aria-label: Menu | Меню |

## 3. Hero (перший екран)

| EN | UA |
| --- | --- |
| Cross-border project, legal & tax | Транскордонні проєкти, право й податки |
| Beyond Borders. | Без кордонів. |
| Beyond Advisory. | Більше, ніж консалтинг. |
| We take charge of your cross-border complexity. | Ми беремо на себе всю складність вашого транскордонного бізнесу. |
| (mobile, рядок 1) We take charge | Ми беремо на себе |
| (mobile, рядок 2) of your cross-border complexity. | всю складність вашого транскордонного бізнесу. |
| What we do | Що ми робимо |
| Integrated project, legal, and tax. | Проєкти, право й податки – в одному супроводі. |
| Strategic advisory – for founders, investors, and families. | Стратегічний консалтинг – для засновників, інвесторів і родин. |
| London · Kyiv · Warsaw | Лондон · Київ · Варшава |
| Operating globally | Працюємо по всьому світу |
| What brings you here? | Що привело вас до нас? |
| B/01 Entering a New Market | B/01 Вихід на новий ринок |
| B/02 Fundraising | B/02 Залучення інвестицій |
| B/03 Buying or Selling Assets | B/03 Купівля або продаж активів |
| B/04 Forming Partnerships | B/04 Партнерства |
| I/01 Business Ownership | I/01 Володіння бізнесом |
| I/02 Relocation | I/02 Релокація |
| I/03 Investment Portfolio | I/03 Інвестиційний портфель |
| I/04 Succession | I/04 Спадкування |

## 4. Latest Insights (карусель статей)

| EN | UA |
| --- | --- |
| Latest Insights | Свіжа аналітика |
| Тег: Investment | Інвестиції |
| Тег: IP | IP |
| Тег: Due Diligence | Due Diligence |
| Тег: Market Entry | Вихід на ринок |
| Тег: Structuring | Структурування |
| Тег: Supply Chain | Ланцюги постачання |
| Тег: Term Sheets | Term sheet |
| Тег: Tax Residency | Податкова резидентність |
| Is SAFE safe? How to structure early-stage investments | Чи безпечний SAFE? Як структурувати інвестиції на ранній стадії |
| Your core asset may decrease the value of your business. Common IP loopholes | Ваш ключовий актив може знизити вартість бізнесу. Типові прогалини в захисті IP |
| What to check when you buy a company. Due diligence traps | Що перевірити, купуючи компанію. Пастки due diligence |
| New market – new rules. Industry-specific, starting with fashion | Новий ринок – нові правила. Галузева специфіка: почнімо з fashion |
| Your company, foreign rules. What Ukrainian founders miss when they set up abroad | Ваша компанія, чужі правила. Що пропускають українські засновники, відкриваючи бізнес за кордоном |
| Six figures on logistics, zero on structure. Supply chain mistakes that kill fashion margins | Шестизначні суми на логістику, нуль – на структуру. Помилки в ланцюгах постачання, які з’їдають маржу fashion-брендів |
| Business prenup: what do you need the term sheet for | Шлюбний договір для бізнесу: навіщо потрібен term sheet |
| New passport, old tax bill. Why a second residency doesn’t cancel the first | Новий паспорт, старі податки. Чому друге резидентство не скасовує перше |

**alt-тексти зображень статей**

| EN | UA |
| --- | --- |
| City skyline with modern glass buildings | Панорама міста із сучасними скляними будівлями |
| Modern museum interior with spiraling ramps and central atrium | Сучасний інтер’єр музею зі спіральними пандусами та центральним атріумом |
| Glass facade of a modern office building with reflective blue panels | Скляний фасад сучасної офісної будівлі з дзеркальними синіми панелями |
| Modern glass facade with illuminated luxury storefronts at dusk | Сучасний скляний фасад з освітленими вітринами люксових бутиків у сутінках |
| Modern building facade with geometric patterns and blue windows | Фасад сучасної будівлі з геометричним візерунком і синіми вікнами |
| Grey intermodal shipping containers stacked on industrial dock | Сірі інтермодальні контейнери, складені в промисловому порту |
| Metal walkway bridges connecting two buildings at night | Металеві переходи між двома будівлями вночі |
| Modern airport terminal with illuminated geometric ceiling design | Сучасний термінал аеропорту з підсвіченою геометричною стелею |

## 5. § 01 · What We Do

| EN | UA |
| --- | --- |
| § 01 · What We Do | § 01 · Що ми робимо |
| What brings you here? | Що привело вас до нас? |
| Every founder comes to us at a specific moment. Find yours – we’ll show you what we deliver in that situation, what we charge, and who you’ll work with. | Кожен засновник приходить до нас у певний момент. Знайдіть свій – і ми покажемо, що робимо в такій ситуації, скільки це коштує і з ким ви працюватимете. |
| Your Business | Ваш бізнес |
| “What I’m building.” | «Те, що я будую.» |
| Your Life | Ваше життя |
| “Personal and family – across borders.” | «Особисте й родинне – без кордонів.» |
| B/01 Entering a New Market | B/01 Вихід на новий ринок |
| You’ve built something real. Now you’re taking it cross-border – new jurisdictions, new rules, new complexity. | Ви створили бізнес. Тепер виводите його за кордон – нові юрисдикції, нові правила, нові складнощі. |
| Теги: Structuring · Operations · Regulatory | Структурування · Операційна діяльність · Регуляторні питання |
| B/02 Fundraising | B/02 Залучення інвестицій |
| Raising capital for the business – structuring rounds, investor negotiations, and cross-border investment vehicles. | Залучення капіталу в бізнес – структурування раундів, переговори з інвесторами та транскордонні інвестиційні структури. |
| Теги: Capital · Investment · Structuring | Капітал · Інвестиції · Структурування |
| B/03 Buying or Selling Assets | B/03 Купівля або продаж активів |
| Cross-border M&A, asset acquisitions, disposals, and deal structuring – from due diligence to closing. | Транскордонні M&A, придбання та продаж активів, структурування угод – від due diligence до закриття. |
| Теги: M&A · Transactions · Due diligence | M&A · Угоди · Due diligence |
| B/04 Forming Partnerships | B/04 Створення партнерств |
| Partnership structuring, governance, and exit design across multiple jurisdictions. | Структурування партнерств, корпоративне управління та механізми виходу в кількох юрисдикціях. |
| Теги: JV · Governance · Disputes | СП · Управління · Спори |
| I/01 Business Ownership | I/01 Володіння бізнесом |
| Structuring and protecting personal stakes in businesses – shareholder agreements, governance, and exit planning. | Структурування та захист особистих часток у бізнесі – акціонерні угоди, корпоративне управління та планування виходу. |
| Теги: Equity · Governance · Exit | Частки · Управління · Вихід |
| I/02 Relocation | I/02 Релокація |
| Tax residency mapping, business restructuring around relocation, immigration, and banking setup. | Аналіз податкового резидентства, реструктуризація бізнесу під релокацію, імміграція та відкриття банківських рахунків. |
| Теги: Residency · Tax · Immigration | Резидентство · Податки · Імміграція |
| I/03 Investment Portfolio | I/03 Інвестиційний портфель |
| Personal holding vehicles, investment structuring, and tax-efficient portfolio management across jurisdictions. | Особисті холдингові структури, структурування інвестицій та податково ефективне управління портфелем у різних юрисдикціях. |
| Теги: Holdings · Portfolio · Tax | Холдинги · Портфель · Податки |
| I/04 Succession | I/04 Спадкування |
| Cross-border succession, wealth transfer, and family governance for the long term. | Транскордонне спадкування, передача капіталу та управління родинними активами на довгу перспективу. |
| Теги: Succession · Trusts · Family | Спадкування · Трасти · Родинні питання |

## 6. § 02 · How We Work

| EN | UA |
| --- | --- |
| § 02 · How We Work | § 02 · Як ми працюємо |
| Three behaviours you’ll experience. | Три принципи, які ви відчуєте. |
| We built the firm around a single idea: the person you meet is the person who does the work. No intake forms, no handoffs, no coordination overhead. One team, one conversation, from first call to final sign-off. | Ми побудували фірму навколо однієї ідеї: людина, з якою ви зустрічаєтесь, і є тією, хто виконує роботу. Жодних анкет, жодних передач справи, жодних витрат на координацію. Одна команда, одна розмова – від першого дзвінка до фінального підпису. |
| One team | Одна команда |
| one conversation | одна розмова |
| Legal, tax, and structuring in a single room. No coordination burden. The same partners across every dimension of your matter. | Право, податки та структурування – за одним столом. Без тягаря координації. Ті самі партнери – в кожному аспекті вашої справи. |
| Senior | Партнери |
| throughout | на кожному етапі |
| The people you meet do the work. No handoff to juniors. The advisor at the table is the drafter, is the tax consultant. | Роботу виконують ті, з ким ви зустрічаєтесь. Жодної передачі справи молодшим юристам. Радник за столом – це і автор документів, і податковий консультант. |
| We take charge | Беремо відповідальність |
| always | завжди |
| We don’t wait for instructions. We surface what you haven’t asked, drive the process, and stay until it’s done. | Ми не чекаємо на інструкції. Піднімаємо питання, про які ви ще не спитали, рухаємо процес і лишаємося до самого кінця. |

## 7. § 03 · Recent Matters (картки кейсів)

| EN | UA |
| --- | --- |
| § 03 · Recent Matters | § 03 · Останні проєкти |
| Таби: BETTTER · UHNWI · Bazhane · Ma-Ko · Defence-tech · Poynto · Atschool | без змін |
| Таб: Tech Entrepreneur | Tech-підприємець |

**Галузеві мітки** (картки, попапи, Related Matters)

| EN | UA |
| --- | --- |
| Fashion & Luxury | Мода та люкс |
| Fashion & Retail | Мода та рітейл |
| Investment Management | Управління інвестиціями |
| Tech & IT | Технології та IT |
| Tech & SaaS | Технології та SaaS |
| Defence & Miltech | Оборона та мілтек |
| Real Estate | Нерухомість |
| EdTech | EdTech |

**Заголовки кейсів** (картки, Related Matters, `<title>` і meta description сторінок `/cases/*/` + « | X-ON-X»)

| Кейс | EN | UA |
| --- | --- | --- |
| bettter | Structuring international expansion for the first Ukrainian upcycling brand | Структурування міжнародної експансії першого українського апсайклінг-бренду |
| uhnwi-asset-transfer | Business restructuring and asset transfer for Ukrainian high-net worth individual | Реструктуризація бізнесу та передача активів для українського HNWI-клієнта |
| bazhane | Structuring EU market entry for one of Ukraine’s most iconic fashion brands | Структурування виходу на ринок ЄС для одного з найвідоміших українських fashion-брендів |
| ma-ko | New corporate and operational structure for Ukrainian IT company | Нова корпоративна та операційна структура для української IT-компанії |
| miltech-restructuring | Pre-fundraising restructuring for Ukrainian miltech company | Реструктуризація української мілтек-компанії перед залученням інвестицій |
| poynto | Corporate structure and tax architecture for innovative hotel concept | Корпоративна структура та податкова архітектура для інноваційного готельного концепту |
| atschool | Structuring for UK market launch for Ukrainian distance educational institution | Структурування виходу на ринок Великої Британії для українського закладу дистанційної освіти |
| tech-entrepreneur-portfolio | Private portfolio restructuring prior to change of tax regime for Ukrainian tech entrepreneur | Реструктуризація приватного портфеля перед зміною податкового режиму для українського tech-підприємця |

**Цифри на картках і в попапах** (число / підпис)

| EN | UA |
| --- | --- |
| 4 / markets · UA, US, UK, EU | 4 / ринки · UA, US, UK, EU |
| £180 mln / transferred · no UK capital gains | £180 млн / передано · без податку на приріст капіталу у Великій Британії |
| 28 / jurisdictions · full entry to EU market | 28 / юрисдикцій · повний вихід на ринок ЄС |
| 28 / EU countries reached (попап Bazhane) | 28 / країн ЄС охоплено |
| 0% / tax · on retained profit | 0% / податку · на нерозподілений прибуток |
| €150 mln / business valuation · zero tax on transfer | €150 млн / оцінка бізнесу · нуль податку при передачі |
| 1st / investment · round supported | 1-й / інвестиційний · раунд супроводжено |
| 10+ / years · on the market | 10+ / років · на ринку |
| $10 mln / worth · asset portfolio | $10 млн / вартість · портфеля активів |

**alt-тексти обкладинок кейсів**

| EN | UA |
| --- | --- |
| Bettter - international expansion | Bettter – міжнародна експансія |
| Business restructuring and asset transfer | Реструктуризація бізнесу та передача активів |
| Bazhane - EU market entry | Bazhane – вихід на ринок ЄС |
| MA-KO - IT company restructuring | MA-KO – реструктуризація IT-компанії |
| Miltech company restructuring | Реструктуризація мілтек-компанії |
| Poynto - innovative hotel concept | Poynto – інноваційний готельний концепт |
| AtSchool - UK market launch | AtSchool – вихід на ринок Великої Британії |
| Private portfolio restructuring | Реструктуризація приватного портфеля |

## 8. Контактний блок «You’re welcome.»

| EN | UA |
| --- | --- |
| You’re | Ласкаво |
| welcome. | просимо. |
| Pick a partner and write directly – or tell us about your situation and we’ll take it from there. | Оберіть партнера й напишіть напряму – або розкажіть про свою ситуацію, а далі ми все візьмемо на себе. |
| A 20–30 minute call with the senior advisor who’d work on your matter. | 20–30-хвилинний дзвінок із партнером, який вестиме вашу справу. |
| No sales pitch. No junior intake. | Без продажів. Без молодших юристів на першій зустрічі. |
| Come on in → | Заходьте → |
| Or write directly to founders | Або напишіть напряму засновникам |
| Oleg Kotliar | Олег Котляр |
| Corporate Structuring & M&A | Корпоративне структурування та M&A |
| Viktoriia Kotliar | Вікторія Котляр |
| International Tax & Trade | Міжнародне оподаткування та торгівля |

## 9. Футер

| EN | UA |
| --- | --- |
| Beyond Borders. Beyond Advisory. | Без кордонів. Більше, ніж консалтинг. |
| What We Do | Що ми робимо |
| Entering a New Market | Вихід на новий ринок |
| Fundraising | Залучення інвестицій |
| Buying or Selling Assets | Купівля або продаж активів |
| Forming Partnerships | Створення партнерств |
| Business Interests | Частки в бізнесі |
| Relocation | Релокація |
| Private Portfolio | Приватний портфель |
| Succession | Спадкування |
| Firm | Фірма |
| About | Про нас |
| Fashion / Investments / Miltech | Мода / Інвестиції / Мілтек |
| Contacts | Контакти |
| Legal | Правова інформація |
| Privacy Policy | Політика конфіденційності |
| Terms | Умови використання |
| © 2026 X-ON-X · All rights reserved | © 2026 X-ON-X · Усі права захищено |

## 10. Модалка «Content coming soon» (mobile) і сторінки `/cases/*/`

| EN | UA |
| --- | --- |
| Content coming soon | Контент незабаром |
| This page is being crafted. We’ll have it ready shortly. | Ця сторінка ще в роботі. Скоро все буде готово. |
| Work in progress | У процесі |
| aria-label: «Content coming soon» modal | Модальне вікно «Контент незабаром» |
| Cases (хлібні крихти на `/cases/*/`) | Кейси |
| aria-label: X-ON-X home | Головна X-ON-X |

## 11. Попапи кейсів (і повний текст сторінок `/cases/*/`)

Заголовки, галузеві мітки та цифри в шапці попапу і в Related Matters — див. розділ 7 (крім окремо зазначених).

**Спільні мітки в кожному попапі**

| EN | UA |
| --- | --- |
| aria-label: Close | Закрити |
| Engagement Overview | Огляд проєкту |
| Scope | Обсяг робіт |
| Jurisdictions | Юрисдикції |
| Practice Areas | Практики |
| Client Profile | Профіль клієнта |
| The situation | Ситуація |
| What we did | Що ми зробили |
| The outcome | Результат |
| Related Matters | Схожі проєкти |
| Contact us → | Зв’язатися з нами → |

### 11.1 Bettter (`popup-bettter`)

| EN | UA |
| --- | --- |
| Scope: International corporate and operations structuring, cross-border employment, partnership frameworks, multi-jurisdiction tax planning | Міжнародне корпоративне та операційне структурування, транскордонне працевлаштування, партнерські рамкові домовленості, податкове планування в кількох юрисдикціях |
| Jurisdictions: Ukraine, United Kingdom, EU, United States | Україна, Велика Британія, ЄС, США |
| Practice Areas: Corporate · Tax · Employment · Commercial Partnerships | Корпоративне право · Податки · Трудове право · Комерційні партнерства |
| Client Profile: Bettter – the first Ukrainian upcycling high-end fashion brand, sold in Harrods | Bettter – перший український апсайклінг-бренд високої моди, що продається в Harrods |
| Bettter is a first Ukrainian fashion brand built on upcycling – transforming pre-existing materials into new apparel. It is a 2023 LVMH Award winner, today sold in Harrods in London. | Bettter – перший український fashion-бренд, побудований на апсайклінгу: він перетворює вже наявні матеріали на новий одяг. Бренд – переможець LVMH Prize 2023, сьогодні продається в Harrods у Лондоні. |
| The company was ready to take its brand beyond Ukraine into EU and US markets. The business needed an international corporate and operations structure, a framework for cross-border employment, and legal rails for partnerships with major global fashion brands. | Компанія була готова вивести бренд за межі України – на ринки ЄС і США. Бізнесу потрібна була міжнародна корпоративна та операційна структура, рамка для транскордонного працевлаштування та юридична основа для партнерств із великими світовими fashion-брендами. |
| Built international corporate and operations structure across Ukraine, UK, EU, and US | Побудували міжнародну корпоративну та операційну структуру в Україні, Великій Британії, ЄС і США |
| Navigated tax complexities arising from multi-jurisdiction operations | Розв’язали податкові складнощі, пов’язані з роботою в кількох юрисдикціях |
| Structured international employment-related matters | Структурували питання міжнародного працевлаштування |
| Advised on international partnerships and collaborations | Консультували щодо міжнародних партнерств і колаборацій |
| Today, Bettter sells across Europe and the United States, and **collaborates with international brands** including FILA, Gieves & Hawkes, and DSQUARED2. | Сьогодні Bettter продається в Європі та США і **співпрацює з міжнародними брендами**, зокрема FILA, Gieves & Hawkes та DSQUARED2. |
| Expanding into new markets? | Виходите на нові ринки? |
| Corporate, tax, IP, and disputes – one team, no coordination overhead. | Корпоративне право, податки, IP і спори – одна команда, без витрат на координацію. |

### 11.2 UHNWI (`popup-uhnwi-asset-transfer`)

| EN | UA |
| --- | --- |
| Scope: Business restructuring, cross-border asset transfer, capital gains planning, holding structure design, tax residence coordination | Реструктуризація бізнесу, транскордонна передача активів, планування податку на приріст капіталу, проєктування холдингової структури, координація питань податкового резидентства |
| Jurisdictions: United Kingdom, Ukraine, Cyprus | Велика Британія, Україна, Кіпр |
| Practice Areas: Tax · Corporate · Wealth Management · Structuring | Податки · Корпоративне право · Управління капіталом · Структурування |
| Client Profile: Ukrainian high-net worth individual and business owner | Український HNWI-клієнт і власник бізнесу |
| The client, a Ukrainian high-net worth individual and business owner, needed to restructure his business interests and transfer assets worth £180 million across jurisdictions. | Клієнту – українському власнику бізнесу з великим капіталом – потрібно було реструктуризувати свої бізнес-активи та передати активи вартістю £180 млн між юрисдикціями. |
| The transfer had to be executed in a way that avoided triggering UK capital gains tax – a complex exercise given the scale of assets involved and the interplay between UK and international tax regimes. | Передачу слід було здійснити так, щоб не виникло зобов’язання зі сплати британського податку на приріст капіталу, – складне завдання з огляду на масштаб активів і взаємодію британського та міжнародних податкових режимів. |
| Designed the restructuring plan across multiple jurisdictions | Розробили план реструктуризації для кількох юрисдикцій |
| Structured the asset transfer to ensure no UK capital gains exposure | Структурували передачу активів так, щоб уникнути британського податку на приріст капіталу |
| Coordinated the holding architecture to support the client’s ongoing business operations | Вибудували холдингову архітектуру, що підтримує поточну діяльність бізнесу клієнта |
| Managed the tax residence and reporting implications of the transfer | Врегулювали наслідки передачі для податкового резидентства та звітності |
| Worked with the client’s other advisors to ensure seamless execution | Працювали разом з іншими радниками клієнта для бездоганної реалізації |
| **£180 million in assets transferred with zero UK capital gains tax**. The restructured business continues to operate across jurisdictions with a holding architecture designed for long-term efficiency. | **Активи на £180 млн передано без жодного британського податку на приріст капіталу**. Реструктуризований бізнес і далі працює в кількох юрисдикціях, маючи холдингову архітектуру, розраховану на довгострокову ефективність. |
| Moving assets across borders? | Переміщуєте активи між країнами? |
| Restructuring, tax planning, and execution – one team, end to end. | Реструктуризація, податкове планування та реалізація – одна команда від початку до кінця. |

### 11.3 Bazhane (`popup-bazhane`)

У попапі мітка й заголовок відрізняються від картки на головній.

| EN | UA |
| --- | --- |
| Fashion & Retail | Мода та рітейл |
| Structuring for EU market entry for Bazhane | Структурування виходу Bazhane на ринок ЄС |
| Scope: Corporate and indirect taxation, export/import regulations, online store operations, EU company compliance, stock management | Корпоративне та непряме оподаткування, експортно-імпортне регулювання, робота онлайн-магазину, комплаєнс компанії в ЄС, управління товарними запасами |
| Jurisdictions: Ukraine, Poland, European Union | Україна, Польща, Європейський Союз |
| Practice Areas: Corporate · Tax · Trade · Compliance | Корпоративне право · Податки · Торгівля · Комплаєнс |
| Client Profile: Bazhane - Ukrainian fashion brand known for standout coats and apparel | Bazhane – український fashion-бренд, відомий своїми пальтами та одягом |
| Bazhane, one of Ukraine’s most iconic and viral fashion brands, approached us with a clear goal in mind - launch online sales across the EU, and later open a flagship boutique in Europe. | Bazhane, один із найвідоміших і найвіральніших українських fashion-брендів, звернувся до нас із чіткою метою – запустити онлайн-продажі в усьому ЄС, а згодом відкрити флагманський бутик у Європі. |
| Built a supply chain, including all logistics from Ukraine to the distribution warehouse in Poland | Побудували ланцюг постачання, включно з усією логістикою з України до дистрибуційного складу в Польщі |
| Structured export/import regulations | Структурували експортно-імпортні процеси відповідно до регулювання |
| Built legal framework for online store operations: opened legal entity in EU and the bank account | Створили правову основу для роботи онлайн-магазину: зареєстрували юридичну особу в ЄС і відкрили банківський рахунок |
| Advised on corporate and indirect taxation | Консультували з корпоративного та непрямого оподаткування |
| Addressed compliance of the EU company | Забезпечили комплаєнс компанії в ЄС |
| Covered all legal aspects of stock management | Опрацювали всі правові аспекти управління товарними запасами |
| Addressed statutory bookkeeping requirements | Врегулювали вимоги щодо обов’язкового бухгалтерського обліку |
| Structured the movement of goods and cashflow for EU operations together with Bazhane’s team | Разом із командою Bazhane вибудували рух товарів і грошових потоків для операцій в ЄС |
| A tax-efficient setup enabling seamless **access to all 28 EU markets**. | Податково ефективна структура, що забезпечує безперешкодний **доступ до всіх 28 ринків ЄС**. |
| Expanding into the EU? | Виходите на ринок ЄС? |
| One conversation covers corporate, tax, trade, and compliance. No coordination overhead. | Одна розмова охоплює корпоративне право, податки, торгівлю та комплаєнс. Без витрат на координацію. |

### 11.4 MA-KO (`popup-ma-ko`)

| EN | UA |
| --- | --- |
| Scope: Corporate restructuring, international holding design, tax optimisation, operational structure across multiple jurisdictions | Корпоративна реструктуризація, проєктування міжнародного холдингу, податкова оптимізація, операційна структура в кількох юрисдикціях |
| Jurisdictions: Ukraine, UK, EU | Україна, Велика Британія, ЄС |
| Practice Areas: Corporate · Tax · Structuring | Корпоративне право · Податки · Структурування |
| Client Profile: MA-KO – Ukrainian IT company scaling internationally | MA-KO – українська IT-компанія, що масштабується на міжнародному рівні |
| MA-KO is a Ukrainian IT company that had outgrown its original corporate structure. As the business expanded internationally, the existing setup created tax inefficiencies and operational friction across jurisdictions. | MA-KO – українська IT-компанія, яка переросла свою початкову корпоративну структуру. З міжнародним розширенням бізнесу наявна схема почала створювати податкову неефективність і операційні тертя між юрисдикціями. |
| The company needed a new corporate and operational architecture that could support international growth while ensuring tax efficiency on retained profits. | Компанії потрібна була нова корпоративна та операційна архітектура, яка підтримувала б міжнародне зростання та водночас забезпечувала податкову ефективність щодо нерозподіленого прибутку. |
| Analysed the existing corporate structure and identified inefficiencies | Проаналізували наявну корпоративну структуру й виявили неефективні елементи |
| Designed a new international holding and operational structure | Розробили нову міжнародну холдингову та операційну структуру |
| Structured the business to achieve 0% tax on retained profit | Структурували бізнес так, щоб досягти 0% податку на нерозподілений прибуток |
| Implemented the restructuring across multiple jurisdictions | Провели реструктуризацію в кількох юрисдикціях |
| Ensured compliance with local regulatory requirements in each jurisdiction | Забезпечили відповідність місцевим регуляторним вимогам у кожній юрисдикції |
| A fully restructured corporate and operational framework that supports MA-KO’s international operations with **0% tax on retained profit** – freeing capital for reinvestment and growth. | Повністю оновлена корпоративна та операційна структура, яка підтримує міжнародну діяльність MA-KO з **0% податку на нерозподілений прибуток** – це вивільняє капітал для реінвестування та зростання. |
| Restructuring for international growth? | Реструктуризуєтесь для міжнародного зростання? |
| Corporate, tax, and operations – designed together from the start. | Корпоративна структура, податки й операційна модель – спроєктовані разом із самого початку. |

### 11.5 Miltech (`popup-miltech-restructuring`)

| EN | UA |
| --- | --- |
| Scope: Pre-fundraising business restructuring, cross-border asset transfer, holding architecture, tax-neutral ownership transition, defence sector compliance | Реструктуризація бізнесу перед залученням інвестицій, транскордонна передача активів, холдингова архітектура, податково нейтральна зміна власності, комплаєнс в оборонному секторі |
| Jurisdictions: Ukraine, EU, United Kingdom | Україна, ЄС, Велика Британія |
| Practice Areas: Corporate · Tax · Structuring · Defence & Miltech | Корпоративне право · Податки · Структурування · Оборона та мілтек |
| Client Profile: Ukrainian miltech company – €150 mln valuation | Українська мілтек-компанія – оцінка €150 млн |
| A Ukrainian miltech company valued at €150 million was raising investment and needed to restructure its business and transfer ownership across jurisdictions before the fundraising could close. | Українська мілтек-компанія з оцінкою €150 млн залучала інвестиції і до закриття раунду їй потрібно було реструктуризувати бізнес та передати право власності між юрисдикціями. |
| The restructuring had to be done quickly, within the timeline of the financing deal, and on terms acceptable to both the investor and the client. | Реструктуризацію треба було провести швидко – у межах графіка угоди фінансування – і на умовах, прийнятних і для інвестора, і для клієнта. |
| The defence sector adds layers of regulatory complexity – export controls, security clearances, and government approvals – on top of the standard corporate and tax challenges of cross-border restructuring. The tax treatment of a cross-border asset deal in this industry was also unclear, with no settled tax framework to rely on. | Оборонний сектор додає регуляторних складнощів – експортний контроль, допуски до секретної інформації, державні погодження – понад звичайні корпоративні та податкові виклики транскордонної реструктуризації. До того ж податкові наслідки транскордонної угоди з активами в цій галузі були неочевидними: усталених податкових правил, на які можна було б спертися, не існувало. |
| Designed the pre-fundraising restructuring plan to accommodate defence sector regulatory requirements | Розробили план реструктуризації перед раундом з урахуванням регуляторних вимог оборонного сектору |
| Delivered the restructuring on an accelerated timeline aligned with the fundraising process | Провели реструктуризацію в прискореному темпі, синхронізованому з процесом залучення інвестицій |
| Balanced the interests of the investor and the client to reach a structure both sides accepted | Збалансували інтереси інвестора та клієнта й вийшли на структуру, прийнятну для обох сторін |
| Worked through the unclear tax consequences and grey zone of the cross-border asset deal | Опрацювали неочевидні податкові наслідки та «сіру зону» транскордонної угоди з активами |
| Structured the ownership transfer to achieve zero tax on the transition | Структурували передачу права власності так, щоб вона не оподатковувалась |
| Built the holding architecture across multiple jurisdictions | Побудували холдингову архітектуру в кількох юрисдикціях |
| Navigated defence and miltech compliance requirements in each relevant jurisdiction | Забезпечили дотримання вимог оборонного та мілтек-комплаєнсу в кожній відповідній юрисдикції |
| Coordinated with the client’s team and external advisors for seamless execution | Координували роботу з командою клієнта та зовнішніми радниками для бездоганної реалізації |
| A €150 million business successfully restructured ahead of its fundraising, with **zero tax on the ownership transfer** despite an unclear tax framework. The structure satisfied both the investor and the client, and the new holding architecture supports the company’s continued operations and growth in the defence and miltech sector across jurisdictions. | Бізнес вартістю €150 млн успішно реструктуризовано до залучення інвестицій, **без жодного податку на передачу права власності** попри неврегульованість податкових правил. Структура влаштувала і інвестора, і клієнта, а нова холдингова архітектура підтримує подальшу діяльність і зростання компанії в оборонному та мілтек-секторі в різних юрисдикціях. |
| Restructuring a defence business? | Реструктуризуєте оборонний бізнес? |
| Corporate, tax, and regulatory – handled together with sector-specific expertise. | Корпоративні, податкові та регуляторні питання – разом і з глибоким знанням галузі. |

### 11.6 Poynto (`popup-poynto`)

| EN | UA |
| --- | --- |
| Scope: Legal and corporate structure of the business, fundraising offer structuring, full legal support of the fundraising including deal structuring, investment documentation drafting, and closing support | Правова та корпоративна структура бізнесу, структурування інвестиційної пропозиції, повний юридичний супровід залучення інвестицій, включно зі структуруванням угоди, підготовкою інвестиційної документації та супроводом закриття |
| Jurisdictions: UK, Ukraine, Cyprus | Велика Британія, Україна, Кіпр |
| Practice Areas: Corporate · Tax · Real Estate · Investment | Корпоративне право · Податки · Нерухомість · Інвестиції |
| Client Profile: Poynto – a travel community-driven hotel concept | Poynto – готельний концепт, побудований навколо спільноти мандрівників |
| Poynto is a new hotel concept – a travel social hub designed for modern travellers who value connection over luxury. It is founded by Vasily Grogol, prominent Ukrainian hotelier and entrepreneur. | Poynto – новий готельний концепт: соціальний хаб для сучасних мандрівників, які цінують спілкування більше, ніж розкіш. Засновник – Василь Гроголь, відомий український готельєр і підприємець. |
| The company needed a corporate and tax structure for its very first location, and support through the investment process – from structuring the holding architecture to coordinating with local providers and communicating with investors. | Компанії потрібна була корпоративна та податкова структура для найпершої локації, а також супровід інвестиційного процесу – від побудови холдингової архітектури до координації з місцевими підрядниками та комунікації з інвесторами. |
| Designed the legal and tax structure for the first Poynto location | Розробили правову та податкову структуру для першої локації Poynto |
| Built the holding architecture to support the investment round and future expansion | Побудували холдингову архітектуру під інвестиційний раунд і подальше розширення |
| Supported Poynto through the investment process, including investor communications | Супроводжували Poynto в інвестиційному процесі, включно з комунікацією з інвесторами |
| Coordinated with local providers across jurisdictions | Координували роботу з місцевими підрядниками в різних юрисдикціях |
| **A launch-ready legal and tax structure** for Poynto’s first location – to be announced soon – with the holding architecture in place to support the investment round and scale to future locations. | **Готова до запуску правова та податкова структура** для першої локації Poynto (анонс – незабаром) і холдингова архітектура, що підтримує інвестиційний раунд і масштабування на нові локації. |
| Launching a new venture? | Запускаєте новий проєкт? |
| Legal structure, tax architecture, and investment support – from concept to first location. | Правова структура, податкова архітектура та інвестиційний супровід – від концепції до першої локації. |

### 11.7 AtSchool (`popup-atschool`)

| EN | UA |
| --- | --- |
| Scope: UK market entry structuring, corporate setup, regulatory compliance, tax planning, operational framework for educational services | Структурування виходу на ринок Великої Британії, створення компанії, регуляторний комплаєнс, податкове планування, операційна модель для освітніх послуг |
| Jurisdictions: United Kingdom, Ukraine | Велика Британія, Україна |
| Practice Areas: Corporate · Tax · Regulatory · EdTech | Корпоративне право · Податки · Регуляторика · EdTech |
| Client Profile: AtSchool – Ukrainian distance educational institution with over 10 years on the market | AtSchool – український заклад дистанційної освіти з понад 10-річним досвідом на ринку |
| AtSchool is a Ukrainian distance educational institution with over a decade of experience delivering remote education. With a proven model at home, AtSchool decided to launch in the UK market – bringing its distance learning platform to British students and families. | AtSchool – український заклад дистанційної освіти з понад десятирічним досвідом. Маючи перевірену модель в Україні, AtSchool вирішила вийти на ринок Великої Британії та запропонувати свою платформу дистанційного навчання британським учням і родинам. |
| The company needed a corporate and operational structure that would satisfy UK regulatory requirements for educational providers while maintaining tax efficiency across both jurisdictions. | Компанії потрібна була корпоративна та операційна структура, яка відповідала б британським регуляторним вимогам до освітніх провайдерів і водночас зберігала податкову ефективність в обох юрисдикціях. |
| Designed the corporate structure for UK market entry | Розробили корпоративну структуру для виходу на ринок Великої Британії |
| Advised on regulatory requirements for distance education providers in the UK | Консультували щодо регуляторних вимог до провайдерів дистанційної освіти у Великій Британії |
| Structured the operational framework for cross-border educational service delivery | Вибудували операційну модель для надання освітніх послуг через кордон |
| Planned the tax architecture to support operations in both Ukraine and the UK | Спланували податкову архітектуру для діяльності і в Україні, і у Великій Британії |
| Set up the UK entity and ensured compliance with local requirements | Зареєстрували британську компанію та забезпечили відповідність місцевим вимогам |
| AtSchool **launched in the UK market** with a compliant corporate structure, a clear regulatory framework, and a tax-efficient operational model – extending over 10 years of distance education expertise to a new market. | AtSchool **вийшла на ринок Великої Британії** з корпоративною структурою, що відповідає вимогам, зрозумілою регуляторною рамкою та податково ефективною операційною моделлю – і переносить понад 10 років досвіду дистанційної освіти на новий ринок. |
| Entering the UK market? | Виходите на ринок Великої Британії? |
| Corporate setup, regulatory compliance, and tax planning – all in one engagement. | Створення компанії, регуляторний комплаєнс і податкове планування – в межах одного проєкту. |

### 11.8 Tech-підприємець (`popup-tech-entrepreneur-portfolio`)

У попапі заголовок коротший, ніж на картці.

| EN | UA |
| --- | --- |
| Private portfolio restructuring prior to change of tax regime | Реструктуризація приватного портфеля перед зміною податкового режиму |
| Scope: Portfolio restructuring, tax regime transition planning, investment vehicle design, coordination with bank and investment manager | Реструктуризація портфеля, планування переходу між податковими режимами, проєктування інвестиційної структури, координація з банком та інвестиційним менеджером |
| Jurisdictions: United Kingdom, Switzerland | Велика Британія, Швейцарія |
| Practice Areas: Tax · Investment Structuring · Wealth Management | Податки · Структурування інвестицій · Управління капіталом |
| Client Profile: Ukrainian tech entrepreneur with a $10 mln Swiss-held investment portfolio | Український tech-підприємець з інвестиційним портфелем на $10 млн у швейцарському банку |
| The client is a prominent Ukrainian fintech entrepreneur with a personal net worth of $200 million. | Клієнт – відомий український фінтех-підприємець з особистим капіталом $200 млн. |
| The client held an investment portfolio with a Swiss bank, through which they traded and generated income. The client benefited from a special UK tax regime under which their foreign income was not subject to UK tax: initially the non-dom regime, and subsequently the FIG (Foreign Income and Gains) regime. | Клієнт мав інвестиційний портфель у швейцарському банку, через який торгував і отримував дохід. Він користувався спеціальним британським податковим режимом, за яким іноземний дохід не оподатковувався у Великій Британії: спершу режимом non-dom, а згодом – режимом FIG (Foreign Income and Gains). |
| Due to a potential change in the client’s tax regime, there was a risk that every item of income from the portfolio would become taxable under UK law on a worldwide basis. Depending on the asset class, the tax exposure could have ranged from 24% to 40%. | Через можливу зміну податкового режиму клієнта виник ризик, що кожна стаття доходу з портфеля оподатковуватиметься за британським законодавством на основі світового доходу. Залежно від класу активів податкове навантаження могло становити від 24% до 40%. |
| Worked with the client’s bank and investment manager to restructure the portfolio | Разом із банком та інвестиційним менеджером клієнта реструктуризували портфель |
| Proposed a strategy for exiting the existing investment assets and transitioning into a new investment structure | Запропонували стратегію виходу з наявних інвестиційних активів і переходу до нової інвестиційної структури |
| Designed a structure that allowed the client to retain the portfolio while receiving income with minimal UK tax consequences | Розробили структуру, що дозволила клієнту зберегти портфель і отримувати дохід з мінімальними податковими наслідками у Великій Британії |
| Created an opportunity for the client to receive part of the portfolio income tax-free | Створили для клієнта можливість отримувати частину доходу з портфеля без оподаткування |
| Preserved the ability to receive portfolio income tax-free after a change in tax residence | Зберегли можливість отримувати дохід з портфеля без оподаткування після зміни податкової резидентності |
| Significant savings achieved: the estimated tax exposure on this portfolio could have been approximately **$450k per year**. | Досягнуто значної економії: орієнтовне податкове навантаження на цей портфель могло б становити приблизно **$450 тис. на рік**. |
| The restructured portfolio allows the client to continue generating income with minimal UK tax impact, both under the current regime and in the event of a future change in tax residence. | Реструктуризований портфель дозволяє клієнту й надалі отримувати дохід з мінімальним податковим навантаженням у Великій Британії – як за чинного режиму, так і в разі майбутньої зміни податкової резидентності. |
| Navigating a change in tax regime? | Змінюється ваш податковий режим? |
| We coordinate tax, investment, and banking – so nothing falls through the cracks. | Ми координуємо податки, інвестиції та банківські питання – щоб нічого не залишилось поза увагою. |

## 12. Чекліст після впровадження

- [ ] Усі тексти з розділів 1–11 замінено; англійських рядків немає, крім брендів і термінів із п. 4 інструкції
- [ ] `lang="uk"`, `og:locale=uk_UA`, `hreflang` (en / uk / x-default), JSON-LD `inLanguage: "uk"`
- [ ] Перемикач `EN · UA` веде між версіями, зокрема на `/cases/*/`
- [ ] Попапи кейсів відкриваються й закриваються, Related Matters показують українські заголовки
- [ ] Desktop і mobile перевірено на переповнення тексту в картках, тегах, кнопках і меню
- [ ] Модалку «Контент незабаром» перекладено
