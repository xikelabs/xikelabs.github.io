//Config For All Love
const nameGirl = 'Em Yêu';
const giftUrl = 'https://m.me/tuyen.fb/';
const date = new Date();
var day = date.getDay();
var month = date.getMonth() + 1;
var eventName = 'Chúc Mừng '+day+'-'+month;
const titleCard = 'Tặng Bé Yêu';
var contentCard = 'Chúc công chúa của anh '+day+'/'+month+' tràn ngập niềm vui và những nụ cười. Mong điều đẹp nhất sẽ đến với em trong hôm nay';
var images = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png'
    , '07.png', '08.png', '09.png', '10.png', '11.png', '12.png', '13.png', '14.png', '15.png', '16.png', '17.png'
    , '18.png', '18.png', '20.png', '21.png', '22.png', '23.png',
];
var randomIndex = Math.floor(Math.random() * images.length);
const giftImage = '../Love/images/'+ images[randomIndex];
const base64 = '';
const giftImageBase64 = "data:image/png;base64, " + base64;
