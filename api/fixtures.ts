import User from "./models/User";
import mongoose from "mongoose";
import config from "./config";
import crypto from "crypto";
import Destination from "./models/Destination";
import Tour from "./models/Tour";
import Notification from "./models/Notification";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('destinations');
    await db.dropCollection('tours');
    await db.dropCollection('notifications')
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  await User.create({
    username: 'admin@gmail.com',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin',
  });

  const [kgz, tjk, trk, uzb, kzh] = await Destination.create({
    name: 'Kyrgyzstan',
    image: 'fixtures/kgz.jpg',
    cols: 2,
  }, {
    name: 'Tajikistan',
    image: 'fixtures/tjk.jpg'
  }, {
    name: 'Turkmenistan',
    image: 'fixtures/trk.jpg'
  }, {
    name: 'Uzbekistan',
    image: 'fixtures/uzb.jpg'
  }, {
    name: 'Kazakhstan',
    image: 'fixtures/kzh.jpg'
  },);

  await Tour.create({
    title: 'Adventure tour in Pamir and Tien-Shan mountains',
    images: ['fixtures/pamir1.jpg', 'fixtures/pamir2.jpg', 'fixtures/pamir3.jpg'],
    destinations: [kgz._id, tjk._id],
    price: 3100,
    description: 'Pamir Highway 2 Stan Tour is a marvelous  travel to Tajikistan and Kyrgyzstan where you are going to cross overn many high-mountain passes, so many winding serpentine roads, see statues of the Buddhist, Islamic and unique Pamir cultures. Moreover, you will meet so many like-minded Adventure people who can’t wait to share  impressions and experiences , they had on the tour. During the Trip you will  learn a lot about the history of  the Pamir tract once connected to the Great Silk Road and the Great Game also  you will have a week of snow-capped mountains, as the in the top of the roof of  World. You will  we encounter lush farmlands, and small villages, wild flows of the River Pyandj along the way and cross scenic and one of the highest passes – Ak- Baytal (4655 m). Pamir Highway Tour is not an easy a walking trip. It is a choice of real adventurers. Check out the detailed tour program, select the appropriate date, and be ready to conquer The Roof of The World, unforgettable expedition!',
    places: 'Bishkek – Dushanbe - Khalai - Khumb - Khorog-Murghab-Osh-Djalal-Abad-Kazarman-Son-Kul lake- Tash-Rabat(Caravanserai)-Naryn –Eki-Naryn-Tosor- Karakol-Jety-Oguz-Altyn Arashan- Chunkurchak Gorge',
    duration: 14,
    schedule: [
      {
        title: 'Airport-Dushanbe/City tour',
        description: 'Early in the morning at 03.55 meet your guide/driver. Transfer to hotel. Check in. Time for rest. Breakfast at 10.00. Star city tour before Noon.\n' +
          'Visit Ismail Somani, Rudaki Park, Green market (Mekhrgon)   and Museum of National Atiquities (Closed on Monday). Lunch at local restaurant. Afternoon, Visit Hissar Fortress.Dinner at Dior Restaurant. Overnight at Dushanbe.',
        dayNumber: 1
      },
      {
        title: 'Dushanbe – Kalai khumb 371km,6/7  hrs', description: 'Breakfast at hotel\n' +
          'Transfer to KALAI KHUMB BY Pamir High Way. Lunch at Kulob city. On the way, stop to visit Norak water reservoir that is called Tajik Sea. Then The road will take us up and over the Shuraba Pass at altitude of 2267 m. This is the border region with Afghanistan and from here onwards we will be surrounded by the mountains that have spawned countless adventurers over the centuries. The wild Panj River forms both the natural and the political boundary between Tajikistan and Afghanistan and we will skirt along its banks. Tonight, our accommodation is a nice hotel in the small town of Khalai Kum. Dinner at Guest house Bahrom\n' +
          '\n' +
          'Overnight in Khalai-Kum', dayNumber: 2
      },
      {title: 'Kalai – Khumb – Khorog   260km, 6/7hrs', description: 'Breakfast at the hotel. Transfer to Khorog. Lunch in the road: Vanj Restaurant. Khorog City. Dinner at Dehli Darbor Restaurant\n' +
          'Overnight in Khorog', dayNumber: 3},
    ]
  }, {
    title: 'Central Asia Adventure - 5 Stan Tour',
    images: ['fixtures/5stan1.jpg', 'fixtures/5stan2.jpg'],
    destinations: [kgz._id, tjk._id, trk._id, uzb._id, kzh._id],
    price: 2240,
    description: 'Добро пожаловать в Центральную Азию, пожалуйста, не упустите свой шанс присоединиться к объединенному Central Asia Tour 2020, потому что он полон исторических, архитектурных и природных достопримечательностей, которые, очевидно, потребуют годы и годы, чтобы изучить их все. Эта 21-дневная поездка по пяти странам предлагает больше всего для путешественников, которые охватывают все самое лучшее и должны увидеть места, и это сделает ваше путешествие полным приключений и незабываемым. Центральная Азия лучший шанс увидеть самые привлекательные места в Кыргызстане, Таджикистане, Казахстане, Туркменистане и Узбекистане. ',
    route: 'fixtures/route1.png',
    duration: 21,
    schedule: [
      {title: 'АЭРОПОРТ / TAS', description: 'По прибытии в аэропорт Ташкент. Визовые процедуры. Познакомьтесь с вашим узбекским местным гидом и водителем. Трансфер в отель. Прибытие. Время для отдыха.\n' +
          '10.00 начало экскурсионной программы по Ташкенту: комплекс Хазрат-Имам, включающий:\n' +
          '\n' +
          '·         Медресе Барак-Хан (XVI век ), Мечеть Джами (XIX век ), Мавзолей Каффаль Шоши (XVcc).\n' +
          '\n' +
          '·         Visit Mustaqillik Square (Independence Square) and Amir Temur Square,\n' +
          '\n' +
          '·         Tashkent metro and Applied Arts Museum.\n' +
          '\n' +
          'Lunch/Dinner at local restaurant.\n' +
          '\n' +
          'Overnight in Tashkent', dayNumber: 1},
      {title: 'TASHKENT-URGENCH/KHIVA MORNING FLIGHT 07.40/09.20 BY HY-55/1hr 40 min', description: 'Breakfast at hotel.\n' +
          'Early morning transfer to the airport for flight to Urgench (1093 km, 1 h. 40 min.). Departure at 07:00, arrival at 08:40. Transfer to the hotel in Khiva (30 km, 35 min.). Later proceed for guided walking sightseeing tour in UNESCO World Heritage site Itchan-Kala Fortress (Architectural complex of Ichan-Kala is a mini town and excursion is held inside of Ichon-Kala by walk). Visit: Mausoleum of PahlavanMakhmud (XVII-XIX), Tosh-Khowli Palace (Harem) (1830-1836), Kunya-Ark Fortress (1868-1888), Kalta-Minor Minaret (1855), Medrese of Shergazi-Khan (1718-1720), Complex of Alla-Kuli Khan (XIII-XVIII), Juma Mosque and Minaret (XII-XX). Karavan-Saray (XVIII), Minaret and Mosque of Khodja-Islam (1908-1910), Tim of Ala-Kulikhan (XIX), Medrese of Abdulla-Khan (1865), Mausoleum of Said Alautdin (XIV), Medrese of Mukhamad Amin-Khan (XIX), Walls of Ichan-Kala (XVIII-XIX), Palvan-Darvaza Gate (XIX). Free time before Dinner. Lunch/Dinner at local restaurant.\n' +
          '\n' +
          'Overnight in Khiva.', dayNumber: 2},
      {title: 'URGENCH/KHIVA-DASHOGUZ (CROSSING SHAVAT UZBEKISTAN/TURKMENISTAN  BORDER)-KUNYA-URGENCH-DARVAZA', description: 'Breakfast at hotel.\n' +
          'In the morning drive to Uzbekistan-Turkmenistan border point Shavat-Dashoguz (60 km, 1 h.). Go through border formalities on both checkpoints. Cross 1.5 km neutral zone (transportation may not be available).. Meet your Turkmenistan guide and drive to Kunya-Urgench (100 km, 1 h. 30 min.). Visit mausoleums of Turabek Khanum, Sultan Tekesh, Sultan Il-Arslan, Najmuddin-Kubra, Sultan Ali Discover the Kutlug-Timur Minaret and Kyrk Molla hill. Lunch en route .In the afternoon drive to Darvaza gas crater located in the middle of Karakum desert (270 km, 4 h.). Set up the camp. Enjoy a delicious fire-cooked meal for dinner near the burning gas crater. Overnight in tents. Overnight in Darvaza Gas crater (in tents)',
        dayNumber: 3},
    ]
  }, {
    title: 'The Pearl of Kyrgyzstan Expedition',
    images: ['fixtures/pearl1.png', 'fixtures/pearl2.png', 'fixtures/pearl3.png', 'fixtures/pearl4.png'],
    destinations: [kgz._id],
    price: 880,
    description: 'Welcome to Kyrgyzstan!!! Dear Travelers, Don’t miss your chance to see the real gits of  Kyrgyzstan’s nature and environment which is one of the main reasons to visit the country. because 94 %  of Kyrgyzstan is mountains, which gives a big opportunities for people who are fond of Trekking, Hikking to get into The Paradise of Nature or just enjoy it and can experience a great diversity of environments  from lowlands and wide andvalleys to high glaciers ot Tien-Shan Mountains.',
    places: 'Bishkek – Ala-Archa –Burana Tower-Chon-Kemin- Cholpon-Ata – Karakol-Jety-Oguz-Kochkor-Son-Kol -Suusamyr–Bishkek',
    duration: 10,
    schedule: [
      {title: 'Airport-Bishkek (40 km/30min)', description: 'Upon arrival to Bishkek airport meet your Kyrgyz local guide and Driver. Transfer to downtown go for dinner, after dinner go to hotel to check in.', dayNumber: 1},
      {title: 'Bishkek-Ala-Archa -Bishkek (40 km/1 hrs (one way)', description: 'Breakfast at hotel.\n' +
          '\n' +
          'After breakfast, transfer to Ala Archa National Park, in the mountains, just 30km outside of Bishkek. We will have a walk in the Park, enjoying the nice views and fresh air. Transfer back to Bishkek for lunch in the city center. Lunch and Dinner in a nice local restaurant. Afternoon go for city tour. Free time before Dinner.', dayNumber: 2},
      {title: 'Bishkek–Burana Tower-Chon-Kemin (160 km/3-4 hrs)', description: 'After breakfast we depart from Bishkek. First stop is in Don-Aryk village to watch Kyrgyz National Horse Game (Ulak-Tartysh) , then have lunch in Kyrgyz family where you will have a chance to taste one of the Kyrgyz National Food (which is called Besh-Barmak it means Five Finger leaking food). Later, go to Burana Tower near the town of Tokmok, 60km east of Bishkek. The minaret from the 11th century is the only remaining building from the ancient town of Balasagun, once capital of the mighty Karakhanid Empire. You can walk up the winding staircase and enjoy a nice view of the Chuy valley. There is also a small open-air museum with “balbals”, carved stone figures used as monuments. After excursion in Burana, we then continue driving further into the mountains to a guesthouse in the beautiful Chon-Kemin Valley. Upon arrival, check in. In the afternoon you can have a walk in the village, observe the life of the local people, or optionally go for whitewater rafting. Dinner and overnight in the guesthouse.', dayNumber: 3},
      {title: 'Chon-Kemin-Cholpon-Ata/Boat ride –Karakol city (310 km/5-6hrs)', description: 'After breakfast transfer to Karakol city along the northern shore of Issyk-Kul lake. Lake Issyk Kul is the second-largest mountain lake in the world, after Titicaca. Located at an altitude of 1600m, it is a slightly saline lake with no outlet, surrounded completely by the Tien Shan Mountains. Some evidence suggests that ruins of an old trade center from 2nd century BC can be found under the water. We drive along the entire northern shore of the lake and make a stop half way, near Cholpon Ata, to take one hour boat ride in Yssyk-Kul lake. By late afternoon we arrive in Karakol city, where we stay for the night in the guesthouse', dayNumber: 4},
    ]
  });

  await Notification.create(
    {
      name: 'Joe Biden',
      email: 'joe@gmail.com',
      phoneNumber: '+996555111222',
      message: 'Why these tours are so cheap?',
      isChecked: false,
    },
    {
      name: 'Max Martin',
      email: 'maxmartin@gmail.com',
      phoneNumber: '+996523112233',
      message: null,
      isChecked: true,
    },
  );

  await db.close();
};

run().catch(console.error);