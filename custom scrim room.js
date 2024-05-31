/* ROOM */
var roomName = "💠 [ʀꜱɪ|ɪᴅ] Scrim Room | ᴘᴠᴘ ⚽";
//var roomName = "💠 [ʀꜱɪ|ɪᴅ] RS League S2 | ᴘᴠᴘ ⚽";
var roomPassword = "scrim2";
const maxPlayers = 30; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
const geo = [{ lat: -6.17, lon: 106.8599, code: "id" }]; //indo

// RSI BANNED SYSTEM
const bannedAuths = [
  "KRn32GyswvGZi8DEofaQoPzbzOV9ToaYmBR1dWwQbJY",  // chiefo
  "HogP5Ng_2oA8GsbK_-7-0cVDuhrmOqXfYKm8rTYb9NI",  // chiefo
  "N1LbelFP2dIua7xrBIeWTjGHyt391bWaxQ60VAjfDG8", //mamaramzi
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "TADWZEkm-2LDS2rQSJzZlLLIht7uCyLGGdIQ3Uwi1rE"
];

// Function to check if the player is banned and kick them
function checkAndKickPlayer(player) {
  if (bannedAuths.includes(player.auth)) {
    room.kickPlayer(player.id, "You are permanently banned", true);
  }
}

//Real Soccer Variables
var throwTimeOut = 420; // 7 seconds (var is in game ticks)
var gkTimeOut = 600; // 10 seconds (var is in game ticks)
var ckTimeOut = 600; // 10 seconds (var is in game ticks)
var throwinDistance = 270; // distance players can move the ball during throw in
var powerShotMode = false;
var gameTime = 5; //default game time if 0 is selected

const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  noPlayer: true,
  password: roomPassword,
  geo: geo[0],
});

const scoreLimitPractice = 5;
const timeLimitPractice = 5;

let Cor = {
  Vermelho: 0xfa5646,
  Laranja: 0xffc12f,
  Verde: 0x7dfa89,
  Azul: 0x05c5ff,
  Amarelo: 0xffff17,
  Cinza: 0xcccccc,
  Branco: 0xffffff,
  Azulclaro: 0x6ecaff,
  Powderblue: 0xb0e0e6,
  Roxo: 0x800080,
  Platinum: 0xe5e4e2,
  Gold: 0xffd700,
  Silver: 0xd5d5d5,
  Bronze: 0x896728,
  Thistle: 0xd8bfd8,
  Khaki: 0xf0e68c,
  AliceBlue: 0xf0f8ff,
  GhostWhite: 0xf8f8ff,
  Snow: 0xfffafa,
  Seashell: 0xfff5ee,
  FloralWhite: 0xfffaf0,
  WhiteSmoke: 0xf5f5f5,
  Beige: 0xf5f5dc,
  OldLace: 0xfdf5e6,
  Ivory: 0xfffff0,
  Linen: 0xfaf0e6,
  Cornsilk: 0xfff8dc,
  AntiqueWhite: 0xfaebd7,
  BlanchedAlmond: 0xffebcd,
  Bisque: 0xffe4c4,
  LightYellow: 0xffffe0,
  LemonChiffon: 0xfffacd,
  LightGoldenrodYellow: 0xfafad2,
  PapayaWhip: 0xffefd5,
  PeachPuff: 0xffdab9,
  Moccasin: 0xffe4b5,
  PaleGoldenrod: 0xeee8aa,
  Azulescuro: 0x426ad6,
  Warn: 0xff9966,
};
// here you can place/edit goal messages, always respecting the " , ". Example: "Belo gooool," the player's name will always be after the comma.
const frasesGols = [
  "What a great goal from ",
  "Goalll !!!! world class shoot from ",
  "Its a goall againnn ",
  "Wow! puskas nominated goall from ",
  "What a goall !! even the goalkeeper can't save that ",
  "Rocket shoot from ",
  "Impressive finishing from ",
  "Its a goallll !! good finishing ",
  "Holy shit, what a goal is that ",
  "Wow! a masterpice goall that is ",
  "More and more and more, clutch shoot from ",
  "Gollazooo, goles de los mejores jugadores del campo que es ",
];
const bannedWords = [
    "ajg",
    "anj",
    "anjg",
    "anjing",
    "anjeng",
    "jembut",
    "jnck",
    "jncuk",
    "jancok",
    "jancox",
    "jancuk",
    "jncx",
    "peler",
    "pler",
    "plr",
    "pepek",
    "pe pek",
    "ppk",
    "fuck",
    "kontol",
    "ktl",
    "kntl",
    "memmek",
    "titit",
    "konntol",
    "konthol",
    "kintil",
    "bgsd",
    "bangsat",
    "bgst",
    "bangst",
    "bgsd",
    "entot",
    "ngewe",
    "bngsd",
    "babi",
    "yatim",
    "yteam",
    "asw",
    "asu",
    "bapakau",
    "tl0l",
    "pala kau",
    "njeng",
    "njing",
    "boodoh",
    "ciu",
    "pantek",
    "memek",
    "mmk",
    "puki",
    "taik",
    "taii",
    "paok",
    "bodoh",
    "bloon",
    "dongo",
    "goblok",
    "goblog",
    "gblk",
    "blok",
    "blogg",
    "bego",
    "be go",
    "bacot",
    "beego",
    "tolol",
    "to lol",
    "tlool",
    "tlol",
    "tlloooll",
    "idiot",
    "shit",
    "banci",
    "nigga",
    "gay",
    "coli",
  ];
// here you can place/edit assistance messages, always respecting the " , ". Example: "Nice pass," the player's name will always be after the comma.
const frasesasis = [" with the beautiful of ", " accompanied by the beautiful pass of ", " with the ball in the mouth of the goal by ", " with the phenomenal assistance of ", " and we cannot forget the magnificent pass of"];
// here you can post/edit messages for mockery, for own goals, always respecting the " , ". Example: "Try to kick to the other side," the player's name will always be after the comma.
const frasesautogol = [" I'm sure it was by accident, right, ", " YOU'RE PLAYING FOR THE WRONG TEAM, ", " IT'S GOOOOOOOOOL... against ", " Return to the sea offering, "];

const secondsToResetAvatar = 3;
var registro = new Map();
const css = "border:2px solid;padding:8px;background:";
room.setTeamsLock(true);
var message;
var Botdivulga;
var msg1;
var msg1Time = 300000;
var Deus = [];
var BotdivulgaTime = 900000;
var adminPassword = "claim";
var freeze = []; //Holds the name of the frozen players.
var playerInformations = []; //Holds players names, ID's and positions (undefined if not frozen).
// Cooldown period in milliseconds
var cooldownPeriod = 3000; // 2 seconds
var maxMessages = 2; // Maximum messages allowed in the cooldown period

// Store last message times and counts for players
var lastMessageTime = {};
var messageCounts = {};

var vip1 = [];
var vip2 = [];
var vip3 = [];

// RSI RANDOM KIT
var redTeamColors = [
  // COUNTRY
  {angle: 132, textColor: 0xffffff, colors: [0x1fa303, 0xfc0000], name: "Portugal", type: "country"},
  {angle: 180, textColor: 0x000000, colors: [0x2a74d1, 0xfcfcfc, 0x2a74d1], name: "Argentina", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xffee1c, 0x1fd111], name: "Brazil", type: "country"},
  {angle: 90, textColor: 0xd19e1f, colors: [0x151619, 0x990011, 0x990011], name: "Belgia", type: "country"},
  {angle: 90, textColor: 0xffffff, colors: [0xff5f05], name: "Netherlands", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xEBEBEB, 0xD40000, 0xEBEBEB], name: "England", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xf50000, 0xffffff], name: "Indonesia", type: "country"},
  {angle: 90, textColor: 0xfeea67, colors: [0xff3136], name: "Spain", type: "country"},
  
  //CLUB
  {angle: 0, textColor: 0xffffff, colors: [0xd10000], name: "Liverpool FC", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0x0D0000, 0xD80000, 0x0D0000], name: "FC Bayer Leverkusen", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xffffff], name: "Real Madrid CF", type: "club"},
  {angle: 0, textColor: 0xffffff, colors: [0xf50000, 0x000000, 0xff0000], name: "AC Milan", type: "club"},
  {angle: 180, textColor: 0xffffff, colors: [0xff0000, 0x3228d1, 0xff0000], name: "FC Barcelona", type: "club"},
  {angle: 180, textColor: 0xadadad, colors: [0x232323, 0xffffff], name: "Juventus FC", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0xfa0c0c, 0x000000], name: "Man United FC", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xff0000, 0xffffff, 0xff0000], name: "Atletico Madrid", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0xe7eaef, 0xba1029, 0xba1029], name: "Arsenal FC", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0x21298F, 0xC40000, 0xD6D6D6], name: "PSG", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0xCF0000, 0xCF0000, 0xABABAB], name: "FC Benfica", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0xFFFFFF, 0xFF0000, 0xFFFFFF], name: "Sevilla FC", type: "club"}
];
var blueTeamColors = [
  //COUNTRY
  {angle: 132, textColor: 0xffffff, colors: [0x1fa303, 0xfc0000], name: "Portugal", type: "country"},
  {angle: 180, textColor: 0x000000, colors: [0x2a74d1, 0xfcfcfc, 0x2a74d1], name: "Argentina", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xffee1c, 0x1fd111], name: "Brazil", type: "country"},
  {angle: 90, textColor: 0xd19e1f, colors: [0x151619, 0x990011, 0x990011], name: "Belgia", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0x25318F, 0x25318F, 0xEBEBEB], name: "France", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0x4D5AFF, 0x4D5AFF, 0xAFC1E3], name: "Uruguay", type: "country"},
  {angle: 270, textColor: 0xFFFFFF, colors: [0x2E911D], name: "Saudi Arabia", type: "country"},

  //CLUB
  {angle: 0, textColor: 0xffffff, colors: [0x040099], name: "Chelsea FC", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0x0D0000, 0xD80000, 0x0D0000], name: "FC Bayer Leverkusen", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xffffff], name: "Real Madrid CF", type: "club"},
  {angle: 0, textColor: 0xffffff, colors: [0x2526f5, 0x000000, 0x2526f5], name: "Inter Milan", type: "club"},
  {angle: 180, textColor: 0xadadad, colors: [0x232323, 0xffffff], name: "Juventus FC", type: "club"},
  {angle: 90, textColor: 0x000000, colors: [0x2186d1, 0xfcfcfc], name: "Man City FC", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xff0000, 0xffffff, 0xff0000], name: "Atletico Madrid", type: "club"},
  {angle: 270, textColor: 0x000000, colors: [0x130c5c, 0xffffff, 0xffffff], name: "Tottenham Hotspurs", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0x21298F, 0xC40000, 0xD6D6D6], name: "PSG", type: "club"},
  {angle: 90, textColor: 0xFFFFFF, colors: [0x0080FF, 0xFFFFFF, 0x0080F], name: "SSC Napoli", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0x0000FF, 0xFFFFFF, 0x0000FF], name: "FC Porto", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0xFFFFFF, 0xFF0000, 0xFFFFFF], name: "Sevilla FC", type: "club"}
];
// Function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Function to check if two uniform configurations are the same
function areUniformsEqual(uniform1, uniform2) {
  return JSON.stringify(uniform1) === JSON.stringify(uniform2);
}

/* STADIUM*/

var playerRadius = 15;
var ballRadius = 6.25;
var triggerDistance = playerRadius + ballRadius + 0.01;
//default ballphysic 1.06 invmass 0.13 acceleration player  radius 8.5      "bounciness": 0.8       "kickStrength": 5.5

var practiceMap =
  `{

    "name" : "RSI Football",
  
    "width" : 1320,
  
    "height" : 800,
  
    "spawnDistance" : 560,
  
    "bg" : { "type" : "grass", "width" : 1270, "height" : 720, "kickOffRadius" : 180, "cornerRadius" : 0, "color" : "454955" },
  
    "playerPhysics" : {
      "bCoef" : 0.05,
      "invMass" : 0.5,
      "damping" : 0.95,
      "acceleration" : 0.1424,
      "kickingAcceleration" : 0.08,
      "kickingDamping" : 0.96,
      "kickStrength" : 6.32,
      "kickback": 0
  
    },
  
    "ballPhysics" : "disc0",
  
    "vertexes" : [
      /* 0 */ { "x" : 1, "y" : 657, "trait" : "kickOffBarrier" },
      /* 1 */ { "x" : 0, "y" : 180, "trait" : "kickOffBarrier" },
      /* 2 */ { "x" : 0, "y" : -180, "trait" : "kickOffBarrier" },
      /* 3 */ { "x" : 0, "y" : -675, "trait" : "kickOffBarrier" },
      
      /* 4 */ { "x" : 1150, "y" : 320, "trait" : "line" },
      /* 5 */ { "x" : 840, "y" : 320, "trait" : "line" },
      /* 6 */ { "x" : 1150, "y" : -320, "trait" : "line" },
      /* 7 */ { "x" : 840, "y" : -320, "trait" : "line" },
      /* 8 */ { "x" : 1150, "y" : 180, "trait" : "line" },
      /* 9 */ { "x" : 1030, "y" : 180, "trait" : "line" },
      /* 10 */ { "x" : 1150, "y" : -180, "trait" : "line" },
      /* 11 */ { "x" : 1030, "y" : -180, "trait" : "line" },
      /* 12 */ { "x" : 840, "y" : -130, "trait" : "line", "curve" : -130 },
      /* 13 */ { "x" : 840, "y" : 130, "trait" : "line", "curve" : -130 },
      /* 14 */ { "x" : -1150, "y" : -320, "trait" : "line" },
      /* 15 */ { "x" : -840, "y" : -320, "trait" : "line" },
      /* 16 */ { "x" : -1150, "y" : 320, "trait" : "line" },
      /* 17 */ { "x" : -840, "y" : 320, "trait" : "line" },
      /* 18 */ { "x" : -1150, "y" : -175, "trait" : "line" },
      /* 19 */ { "x" : -1030, "y" : -175, "trait" : "line" },
      /* 20 */ { "x" : -1150, "y" : 175, "trait" : "line" },
      /* 21 */ { "x" : -1030, "y" : 175, "trait" : "line" },
      /* 22 */ { "x" : -840, "y" : 130, "trait" : "line", "curve" : -130 },
      /* 23 */ { "x" : -840, "y" : -130, "trait" : "line", "curve" : -130 },
      /* 24 */ { "x" : 935, "y" : 3, "trait" : "line" },
      /* 25 */ { "x" : 935, "y" : -3, "trait" : "line" },
      /* 26 */ { "x" : -935, "y" : 3, "trait" : "line" },
      /* 27 */ { "x" : -935, "y" : -3, "trait" : "line" },
      /* 28 */ { "x" : -1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 29 */ { "x" : -1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 30 */ { "x" : -1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 31 */ { "x" : -1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 32 */ { "x" : 1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 33 */ { "x" : 1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 34 */ { "x" : 1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 35 */ { "x" : 1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 36 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -180 },
      /* 37 */ { "x" : 0, "y" : -180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
      /* 38 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
      
      /* 39 */ { "x" : -1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
      /* 40 */ { "x" : -1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
      /* 41 */ { "x" : 1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
      /* 42 */ { "x" : 1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
      /* 43 */ { "x" : 1030, "y" : -40, "trait" : "line", "color" : "576C46" },
      /* 44 */ { "x" : 1030, "y" : 40, "trait" : "line", "color" : "576C46" },
      /* 45 */ { "x" : -1030, "y" : -40, "trait" : "line", "color" : "576C46" },
      /* 46 */ { "x" : -1030, "y" : 40, "trait" : "line", "color" : "576C46" },
      /* 47 */ { "x" : 0, "y" : 3, "trait" : "line" },
      /* 48 */ { "x" : 0, "y" : -3, "trait" : "line" },
      
      /* 49 */ { "x" : -1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 50 */ { "x" : 1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 51 */ { "x" : -1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 52 */ { "x" : 1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 53 */ { "x" : -1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 54 */ { "x" : -840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 55 */ { "x" : -840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 56 */ { "x" : -1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 57 */ { "x" : 1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 58 */ { "x" : 840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 59 */ { "x" : 840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 60 */ { "x" : 1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 61 */ { "x" : -1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 62 */ { "x" : -1210, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 63 */ { "x" : -1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 64 */ { "x" : -1210, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 65 */ { "x" : -1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 66 */ { "x" : -1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 67 */ { "x" : 1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 68 */ { "x" : 1210, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
      /* 69 */ { "x" : 1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 70 */ { "x" : 1210, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
      /* 71 */ { "x" : 1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 72 */ { "x" : 1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
      
      /* 73 */ { "x" : -312.44827586206895, "y" : 718, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 74 */ { "x" : -300.44827586206895, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 75 */ { "x" : -98.25862068965517, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 76 */ { "x" : -98.25862068965517, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 77 */ { "x" : -276.9396551724138, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 78 */ { "x" : -121.76724137931035, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 79 */ { "x" : -150.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 80 */ { "x" : -131.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 81 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "v0" : 201, "v1" : 202, "curve" : -328.13941952332, "vis" : false, "color" : "ffffff" },
      
      /* 82 */ { "x" : -98.25862068965517, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 83 */ { "x" : -98.25862068965517, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 84 */ { "x" : -0.4358974358974379, "y" : -1.1794871794871824, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 85 */ { "x" : -1150, "y" : -601.444450378418, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 86 */ { "x" : -1150, "y" : 600.4444694519043, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 87 */ { "x" : 1151, "y" : -600.444450378418, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 88 */ { "x" : 1150, "y" : 599.4444694519043, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 89 */ { "x" : -1149, "y" : -601, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 90 */ { "x" : 1150, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 91 */ { "x" : -1150, "y" : 599, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 92 */ { "x" : 1150, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 93 */ { "x" : 0, "y" : 601, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 94 */ { "x" : 0, "y" : 718, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 95 */ { "x" : 0, "y" : -719, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 96 */ { "x" : 0, "y" : -602, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 97 */ { "x" : -32, "y" : 698, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 98 */ { "x" : -32, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 99 */ { "x" : 34, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 100 */ { "x" : 0, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 101 */ { "x" : 1, "y" : 683, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 102 */ { "x" : 19, "y" : 683, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 103 */ { "x" : 19, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 104 */ { "x" : 0, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 105 */ { "x" : 30, "y" : 675, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 106 */ { "x" : 30, "y" : 698, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 107 */ { "x" : -10, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 108 */ { "x" : -10, "y" : 681, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 109 */ { "x" : -28, "y" : 681, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 110 */ { "x" : -13, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 111 */ { "x" : -1270, "y" : 716, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 112 */ { "x" : 1271, "y" : 717, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 113 */ { "x" : -1270, "y" : 719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 114 */ { "x" : 1271, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 115 */ { "x" : -1270, "y" : 719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 116 */ { "x" : 1271, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 117 */ { "x" : -1269, "y" : 722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 118 */ { "x" : 1272, "y" : 723, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 119 */ { "x" : -1270, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 120 */ { "x" : 1271, "y" : -723, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 121 */ { "x" : -1270, "y" : -719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 122 */ { "x" : 1271, "y" : -720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 123 */ { "x" : -1269, "y" : -725, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 124 */ { "x" : 1272, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 125 */ { "x" : -1266, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 126 */ { "x" : -1266, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 127 */ { "x" : -1266, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 128 */ { "x" : -1266, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 129 */ { "x" : 1269, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 130 */ { "x" : 1270, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 131 */ { "x" : -1268, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 132 */ { "x" : -1268, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 133 */ { "x" : 1266, "y" : 724, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 134 */ { "x" : 1267, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 135 */ { "x" : -1271, "y" : 725, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 136 */ { "x" : -1271, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 137 */ { "x" : -32, "y" : -624, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 138 */ { "x" : -32, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 139 */ { "x" : 34, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 140 */ { "x" : 0, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 141 */ { "x" : 1, "y" : -639, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 142 */ { "x" : 19, "y" : -639, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 143 */ { "x" : 19, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 144 */ { "x" : 0, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 145 */ { "x" : 30, "y" : -647, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 146 */ { "x" : 30, "y" : -624, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 147 */ { "x" : -10, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 148 */ { "x" : -10, "y" : -641, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 149 */ { "x" : -28, "y" : -641, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 150 */ { "x" : -13, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 151 */ { "x" : -210.28125, "y" : 695.0121527777777, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      /* 152 */ { "x" : -209.6105324074074, "y" : 687.6342592592592, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      /* 153 */ { "x" : -98.25862068965517, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 154 */ { "x" : -98.25862068965517, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 155 */ { "x" : -98.25862068965517, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 156 */ { "x" : -98.25862068965517, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 157 */ { "x" : -98.25862068965517, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 158 */ { "x" : -98.25862068965517, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 159 */ { "x" : -98.25862068965517, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 160 */ { "x" : -98.25862068965517, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 161 */ { "x" : -179.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 162 */ { "x" : -160.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 163 */ { "x" : -207.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 164 */ { "x" : -188.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 165 */ { "x" : -236.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 166 */ { "x" : -217.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 167 */ { "x" : -265.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 168 */ { "x" : -246.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 169 */ { "x" : -300.2586206896552, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 170 */ { "x" : -300.2586206896552, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 171 */ { "x" : -300.2586206896552, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 172 */ { "x" : -300.2586206896552, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 173 */ { "x" : -300.2586206896552, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 174 */ { "x" : -300.2586206896552, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 175 */ { "x" : -300.2586206896552, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 176 */ { "x" : -300.2586206896552, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 177 */ { "x" : -300.2586206896552, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 178 */ { "x" : -300.2586206896552, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 179 */ { "x" : -300.2586206896552, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 180 */ { "x" : -300.2586206896552, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 181 */ { "x" : 96.55172413793105, "y" : 718, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 182 */ { "x" : 108.55172413793105, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 183 */ { "x" : 310.7413793103448, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 184 */ { "x" : 310.7413793103448, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 185 */ { "x" : 132.06034482758622, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 186 */ { "x" : 287.23275862068965, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 187 */ { "x" : 258.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 188 */ { "x" : 277.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 189 */ { "x" : 310.7413793103448, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 190 */ { "x" : 310.7413793103448, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 191 */ { "x" : 198.71875, "y" : 695.0121527777777, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      /* 192 */ { "x" : 199.3894675925926, "y" : 687.6342592592592, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      /* 193 */ { "x" : 310.7413793103448, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 194 */ { "x" : 310.7413793103448, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 195 */ { "x" : 310.7413793103448, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 196 */ { "x" : 310.7413793103448, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 197 */ { "x" : 310.7413793103448, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 198 */ { "x" : 310.7413793103448, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 199 */ { "x" : 310.7413793103448, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 200 */ { "x" : 310.7413793103448, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 201 */ { "x" : 229.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 202 */ { "x" : 248.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 203 */ { "x" : 201.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 204 */ { "x" : 220.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 205 */ { "x" : 172.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 206 */ { "x" : 191.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 207 */ { "x" : 143.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 208 */ { "x" : 162.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 209 */ { "x" : 108.74137931034483, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 210 */ { "x" : 108.74137931034483, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 211 */ { "x" : 108.74137931034483, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 212 */ { "x" : 108.74137931034483, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 213 */ { "x" : 108.74137931034483, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 214 */ { "x" : 108.74137931034483, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 215 */ { "x" : 108.74137931034483, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 216 */ { "x" : 108.74137931034483, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 217 */ { "x" : 108.74137931034483, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 218 */ { "x" : 108.74137931034483, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 219 */ { "x" : 108.74137931034483, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 220 */ { "x" : 108.74137931034483, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 221 */ { "x" : -1170.4791679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 222 */ { "x" : -1163.6041679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 223 */ { "x" : -1171.1666679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 224 */ { "x" : -1163.6041679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 225 */ { "x" : -1163.6041679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 226 */ { "x" : -1156.0416679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 227 */ { "x" : -1162.9166679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 228 */ { "x" : -1155.3541679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      /* 229 */ { "x" : -1156.6666679382324, "y" : 576.666748046875, "cMask" : ["wall" ], "trait" : "line" },
      /* 230 */ { "x" : -1149.6666679382324, "y" : 599.666748046875, "cMask" : ["wall" ], "trait" : "line" },
      /* 231 */ { "x" : -1148.6666679382324, "y" : -599.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      
      /* 232 */ { "x" : 1130.2708320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 233 */ { "x" : 1137.1458320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 234 */ { "x" : 1129.5833320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 235 */ { "x" : 1137.1458320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 236 */ { "x" : 1137.1458320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 237 */ { "x" : 1144.7083320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 238 */ { "x" : 1137.8333320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 239 */ { "x" : 1145.3958320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      /* 240 */ { "x" : 1144.0833320617676, "y" : -622.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      /* 241 */ { "x" : 1151.0833320617676, "y" : -599.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      /* 242 */ { "x" : 1150.0833320617676, "y" : 598.666748046875, "cMask" : ["wall" ], "trait" : "line" }
  
    ],
  
    "segments" : [
      { "v0" : 0, "v1" : 1, "trait" : "kickOffBarrier" },
      { "v0" : 2, "v1" : 3, "trait" : "kickOffBarrier" },
      
      { "v0" : 4, "v1" : 5, "trait" : "line", "y" : 320 },
      { "v0" : 5, "v1" : 7, "trait" : "line", "x" : 840 },
      { "v0" : 6, "v1" : 7, "trait" : "line", "y" : -320 },
      { "v0" : 8, "v1" : 9, "trait" : "line", "y" : 180 },
      { "v0" : 9, "v1" : 11, "trait" : "line", "x" : 1030 },
      { "v0" : 10, "v1" : 11, "trait" : "line", "y" : -180 },
      { "v0" : 12, "v1" : 13, "curve" : -130, "trait" : "line", "x" : 840 },
      { "v0" : 14, "v1" : 15, "trait" : "line", "y" : -320 },
      { "v0" : 15, "v1" : 17, "trait" : "line", "x" : -840 },
      { "v0" : 16, "v1" : 17, "trait" : "line", "y" : 320 },
      { "v0" : 18, "v1" : 19, "trait" : "line", "y" : -175 },
      { "v0" : 19, "v1" : 21, "trait" : "line", "x" : -1030 },
      { "v0" : 20, "v1" : 21, "trait" : "line", "y" : 175 },
      { "v0" : 22, "v1" : 23, "curve" : -130, "trait" : "line", "x" : -840 },
      { "v0" : 24, "v1" : 25, "curve" : -180, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : -180, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : 180, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : 180, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : 90, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : 90, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : -90, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : -90, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "trait" : "line", "x" : -935 },
      { "v0" : 28, "v1" : 29, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 30, "v1" : 31, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 32, "v1" : 33, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 34, "v1" : 35, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 37, "v1" : 36, "curve" : -180, "vis" : false, "bCoef" : 0.1, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
      
      { "v0" : 39, "v1" : 40, "curve" : 70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -1030 },
      { "v0" : 41, "v1" : 42, "curve" : -70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 1030 },
      
      { "v0" : 37, "v1" : 38, "curve" : 180, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
      
      { "v0" : 43, "v1" : 44, "vis" : true, "color" : "576C46", "trait" : "line", "x" : 1030 },
      { "v0" : 45, "v1" : 46, "vis" : true, "color" : "576C46", "trait" : "line", "x" : -1030 },
      { "v0" : 47, "v1" : 48, "curve" : -180, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : 180, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : 90, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : -90, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "trait" : "line", "x" : -935 },
      
      { "v0" : 49, "v1" : 50, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : -460 },
      { "v0" : 51, "v1" : 52, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : 460 },
      { "v0" : 53, "v1" : 54, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 54, "v1" : 55, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 55, "v1" : 56, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 57, "v1" : 58, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 58, "v1" : 59, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 59, "v1" : 60, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 61, "v1" : 62, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
      { "v0" : 63, "v1" : 64, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
      { "v0" : 64, "v1" : 62, "curve" : 5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "bias" : 0 },
      { "v0" : 62, "v1" : 65, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 64, "v1" : 66, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 67, "v1" : 68, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
      { "v0" : 69, "v1" : 70, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
      { "v0" : 68, "v1" : 70, "curve" : -5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      { "v0" : 70, "v1" : 71, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 68, "v1" : 72, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      
      { "v0" : 75, "v1" : 76, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 74, "v1" : 77, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 76, "v1" : 78, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 79, "v1" : 80, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 82, "v1" : 83, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 85, "v1" : 86, "curve" : -0.212710733178631, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 87, "v1" : 88, "curve" : -0.5926245099150841, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 89, "v1" : 90, "curve" : -0.05438611790324986, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 91, "v1" : 92, "curve" : -0.05490730726231725, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 93, "v1" : 94, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 95, "v1" : 96, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 97, "v1" : 98, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 99, "v1" : 100, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 100, "v1" : 101, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 101, "v1" : 102, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 102, "v1" : 103, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 103, "v1" : 104, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 105, "v1" : 106, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 98, "v1" : 107, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 107, "v1" : 108, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 108, "v1" : 109, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 109, "v1" : 110, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 110, "v1" : 104, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 111, "v1" : 112, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 113, "v1" : 114, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 115, "v1" : 116, "curve" : -1.4085579510213782, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 117, "v1" : 118, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 119, "v1" : 120, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 121, "v1" : 122, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 123, "v1" : 124, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 123, "v1" : 117, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 126, "v1" : 125, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 128, "v1" : 127, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 116, "v1" : 124, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 132, "v1" : 131, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 129, "v1" : 130, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 136, "v1" : 135, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 133, "v1" : 134, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 137, "v1" : 138, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 139, "v1" : 140, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 140, "v1" : 141, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 141, "v1" : 142, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 142, "v1" : 143, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 143, "v1" : 144, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 145, "v1" : 146, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 138, "v1" : 147, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 147, "v1" : 148, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 148, "v1" : 149, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 149, "v1" : 150, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 150, "v1" : 144, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 151, "v1" : 152, "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      { "v0" : 153, "v1" : 154, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 155, "v1" : 156, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 157, "v1" : 158, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 159, "v1" : 160, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 161, "v1" : 162, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 163, "v1" : 164, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 165, "v1" : 166, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 167, "v1" : 168, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 169, "v1" : 170, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 171, "v1" : 172, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 173, "v1" : 174, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 175, "v1" : 176, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 177, "v1" : 178, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 179, "v1" : 180, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 183, "v1" : 184, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 182, "v1" : 185, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 184, "v1" : 186, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 187, "v1" : 188, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 189, "v1" : 190, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 191, "v1" : 192, "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      { "v0" : 193, "v1" : 194, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 195, "v1" : 196, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 197, "v1" : 198, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 199, "v1" : 200, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 201, "v1" : 202, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 203, "v1" : 204, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 205, "v1" : 206, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 207, "v1" : 208, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 209, "v1" : 210, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 211, "v1" : 212, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 213, "v1" : 214, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 215, "v1" : 216, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 217, "v1" : 218, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 219, "v1" : 220, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 221, "v1" : 222, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 223, "v1" : 224, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 225, "v1" : 226, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 227, "v1" : 228, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      { "v0" : 229, "v1" : 230, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "trait" : "line" },
      
      { "v0" : 232, "v1" : 233, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 234, "v1" : 235, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 236, "v1" : 237, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 238, "v1" : 239, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      { "v0" : 240, "v1" : 241, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "trait" : "line" }
  
    ],
  
    "goals" : [
      { "p0" : [-1161.45,124 ], "p1" : [-1161.45,-124 ], "team" : "red" },
      { "p0" : [1161.45,124 ], "p1" : [1161.45,-124 ], "team" : "blue", "radius" : 0, "invMass" : 1 }
  
    ],
  
    "discs" : [
      { "radius" : 9.3, "invMass" : 0.9, "pos" : [0,0 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 0, "invMass" : 0, "pos" : [-1285,-13 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1284,35 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1308,62 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      
      { "radius" : 9.6, "pos" : [0,0 ], "color" : "transparent", "trait" : "jb" },
      { "radius" : 1.5, "pos" : [0,0 ], "trait" : "jb" },
      { "radius" : 1.15, "pos" : [6.8476,2.2249 ], "trait" : "jb" },
      { "radius" : 1.15, "pos" : [0,7.2 ], "trait" : "jb" },
      { "radius" : 1.15, "pos" : [-6.8476,2.2249 ], "trait" : "jb" },
      { "radius" : 1.15, "pos" : [-4.2321,-5.8249 ], "trait" : "jb" },
      { "radius" : 1.15, "pos" : [4.2321,-5.8249 ], "trait" : "jb" },
      
      { "radius" : 2.7, "pos" : [-1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,-600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      
      { "radius" : 2.7, "pos" : [-1149,-601 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      
      { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] },
      { "radius" : 10.060763888888891, "invMass" : 1e-27, "pos" : [-197.53761574074073,692.3292824074074 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["ball" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
      { "radius" : 10.060763888888891, "invMass" : 1e-27, "pos" : [211.46238425925927,692.3292824074074 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["ball" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
      
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,125 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1252,160 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1151,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1253.75,-157.75 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1251.75,160.25 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" }
  
    ],
  
    "planes" : [
      { "normal" : [0,1 ], "dist" : -716, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      { "normal" : [0,-1 ], "dist" : -714, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      
      { "normal" : [0,1 ], "dist" : -721, "bCoef" : 0 },
      { "normal" : [0,-1 ], "dist" : -718, "bCoef" : 0 },
      { "normal" : [1,0 ], "dist" : -1268, "bCoef" : 0 },
      { "normal" : [-1,0 ], "dist" : -1266, "bCoef" : 0.1 },
      { "normal" : [1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
      { "normal" : [-1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] }
  
    ],
  
    "traits" : {
      "jb" : { "damping" : 0.99, "cMask" : [ ], "cGroup" : ["c0" ], "invMass" : 1e+250, "radius" : 0.8, "color" : "000000" },
      "ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
      "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 1, "cGroup" : ["ball" ] },
      "rightNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c3" ] },
      "leftNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c2" ] },
      "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
      "cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.2, "color" : "FFFF00", "cMask" : ["ball" ] },
      "reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
      "reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
      "sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
      "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
      "line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" }
  
    },
  
    "redSpawnPoints" : [
      [ -222, -177
      ],
      [ -228, 174
      ],
      [ -684, -89
      ],
      [ -692, 57
      ],
      [ -1087, -5
      ],
      [ -214, 622
      ],
      [ -214, 622
      ],
      [ -214, 622
      ]
  
    ],
  
    "blueSpawnPoints" : [
      [ 218, -181
      ],
      [ 225, 168
      ],
      [ 719, 94
      ],
      [ 719, -102
      ],
      [ 1101, -17
      ],
      [ 182, 629
      ],
      [ 182, 629
      ],
      [ 182, 629
      ]
  
    ],
  
    "joints" : [
      { "d0" : 0, "d1" : 4, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 5, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 0, "d1" : 6, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 6, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 7, "d1" : 6, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 8, "d1" : 6, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 0, "d1" : 7, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 7, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 8, "d1" : 7, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 9, "d1" : 7, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 0, "d1" : 8, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 8, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 9, "d1" : 8, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 10, "d1" : 8, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 0, "d1" : 9, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 9, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 10, "d1" : 9, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 6, "d1" : 9, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 0, "d1" : 10, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 4, "d1" : 10, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 6, "d1" : 10, "strength" : "rigid", "color" : "transparent" },
      { "d0" : 7, "d1" : 10, "strength" : "rigid", "color" : "transparent" }
  
    ],
  
    "canBeStored" : false
  }`;

  var preMap = 
  `{

    "name" : "RSI Pre Match",
  
    "width" : 1320,
  
    "height" : 800,
  
    "spawnDistance" : 560,
  
    "bg" : { "type" : "grass", "width" : 1270, "height" : 720, "kickOffRadius" : 180, "cornerRadius" : 0, "color" : "454955" },
  
    "playerPhysics" : {
      "bCoef" : 0.05,
      "invMass" : 0.5,
      "damping" : 0.95,
      "acceleration" : 0.1424,
      "kickingAcceleration" : 0.08,
      "kickingDamping" : 0.96,
      "kickStrength" : 6.32,
      "kickback" : 0
  
    },
  
    "ballPhysics" : "disc0",
  
    "vertexes" : [
      /* 0 */ { "x" : 1, "y" : 657, "trait" : "kickOffBarrier" },
      /* 1 */ { "x" : 0, "y" : 180, "trait" : "kickOffBarrier" },
      /* 2 */ { "x" : 0, "y" : -180, "trait" : "kickOffBarrier" },
      /* 3 */ { "x" : 0, "y" : -675, "trait" : "kickOffBarrier" },
      
      /* 4 */ { "x" : 1150, "y" : 320, "trait" : "line" },
      /* 5 */ { "x" : 840, "y" : 320, "trait" : "line" },
      /* 6 */ { "x" : 1150, "y" : -320, "trait" : "line" },
      /* 7 */ { "x" : 840, "y" : -320, "trait" : "line" },
      /* 8 */ { "x" : 1150, "y" : 180, "trait" : "line" },
      /* 9 */ { "x" : 1030, "y" : 180, "trait" : "line" },
      /* 10 */ { "x" : 1150, "y" : -180, "trait" : "line" },
      /* 11 */ { "x" : 1030, "y" : -180, "trait" : "line" },
      /* 12 */ { "x" : 840, "y" : -130, "trait" : "line", "curve" : -130 },
      /* 13 */ { "x" : 840, "y" : 130, "trait" : "line", "curve" : -130 },
      /* 14 */ { "x" : -1150, "y" : -320, "trait" : "line" },
      /* 15 */ { "x" : -840, "y" : -320, "trait" : "line" },
      /* 16 */ { "x" : -1150, "y" : 320, "trait" : "line" },
      /* 17 */ { "x" : -840, "y" : 320, "trait" : "line" },
      /* 18 */ { "x" : -1150, "y" : -175, "trait" : "line" },
      /* 19 */ { "x" : -1030, "y" : -175, "trait" : "line" },
      /* 20 */ { "x" : -1150, "y" : 175, "trait" : "line" },
      /* 21 */ { "x" : -1030, "y" : 175, "trait" : "line" },
      /* 22 */ { "x" : -840, "y" : 130, "trait" : "line", "curve" : -130 },
      /* 23 */ { "x" : -840, "y" : -130, "trait" : "line", "curve" : -130 },
      /* 24 */ { "x" : 935, "y" : 3, "trait" : "line" },
      /* 25 */ { "x" : 935, "y" : -3, "trait" : "line" },
      /* 26 */ { "x" : -935, "y" : 3, "trait" : "line" },
      /* 27 */ { "x" : -935, "y" : -3, "trait" : "line" },
      /* 28 */ { "x" : -1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 29 */ { "x" : -1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 30 */ { "x" : -1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 31 */ { "x" : -1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 32 */ { "x" : 1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 33 */ { "x" : 1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 34 */ { "x" : 1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 35 */ { "x" : 1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 36 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -180 },
      /* 37 */ { "x" : 0, "y" : -180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
      /* 38 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
      
      /* 39 */ { "x" : -1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
      /* 40 */ { "x" : -1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
      /* 41 */ { "x" : 1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
      /* 42 */ { "x" : 1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
      /* 43 */ { "x" : 1030, "y" : -40, "trait" : "line", "color" : "576C46", "vis" : false },
      /* 44 */ { "x" : 1030, "y" : 40, "trait" : "line", "color" : "576C46", "vis" : false },
      /* 45 */ { "x" : -1030, "y" : -40, "trait" : "line", "color" : "576C46", "vis" : false },
      /* 46 */ { "x" : -1030, "y" : 40, "trait" : "line", "color" : "576C46", "vis" : false },
      /* 47 */ { "x" : 0, "y" : 3, "trait" : "line" },
      /* 48 */ { "x" : 0, "y" : -3, "trait" : "line" },
      
      /* 49 */ { "x" : -1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 50 */ { "x" : 1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 51 */ { "x" : -1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 52 */ { "x" : 1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
      /* 53 */ { "x" : -1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 54 */ { "x" : -840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 55 */ { "x" : -840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 56 */ { "x" : -1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 57 */ { "x" : 1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 58 */ { "x" : 840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 59 */ { "x" : 840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 60 */ { "x" : 1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      /* 61 */ { "x" : -1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 62 */ { "x" : -1220, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 63 */ { "x" : -1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 64 */ { "x" : -1220, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 65 */ { "x" : -1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 66 */ { "x" : -1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 67 */ { "x" : 1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 68 */ { "x" : 1221, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
      /* 69 */ { "x" : 1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 70 */ { "x" : 1221, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
      /* 71 */ { "x" : 1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 72 */ { "x" : 1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
      
      /* 73 */ { "x" : -312.44827586206895, "y" : 718, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 74 */ { "x" : -300.44827586206895, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 75 */ { "x" : -98.25862068965517, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 76 */ { "x" : -98.25862068965517, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 77 */ { "x" : -276.9396551724138, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 78 */ { "x" : -121.76724137931035, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 79 */ { "x" : -150.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 80 */ { "x" : -131.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 81 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "v0" : 201, "v1" : 202, "curve" : -328.13941952332, "vis" : false, "color" : "ffffff" },
      
      /* 82 */ { "x" : -98.25862068965517, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 83 */ { "x" : -98.25862068965517, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 84 */ { "x" : -0.4358974358974379, "y" : -1.1794871794871824, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 85 */ { "x" : -1150, "y" : -601.444450378418, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 86 */ { "x" : -1150, "y" : 600.4444694519043, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 87 */ { "x" : 1151, "y" : -600.444450378418, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 88 */ { "x" : 1150, "y" : 599.4444694519043, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 89 */ { "x" : -1149, "y" : -601, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 90 */ { "x" : 1150, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 91 */ { "x" : -1150, "y" : 599, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 92 */ { "x" : 1150, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 93 */ { "x" : 0, "y" : 601, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 94 */ { "x" : 0, "y" : 718, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 95 */ { "x" : 0, "y" : -719, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 96 */ { "x" : 0, "y" : -602, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 97 */ { "x" : -32, "y" : 698, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 98 */ { "x" : -32, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 99 */ { "x" : 34, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 100 */ { "x" : 0, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 101 */ { "x" : 1, "y" : 683, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 102 */ { "x" : 19, "y" : 683, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 103 */ { "x" : 19, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 104 */ { "x" : 0, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 105 */ { "x" : 30, "y" : 675, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 106 */ { "x" : 30, "y" : 698, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 107 */ { "x" : -10, "y" : 668, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 108 */ { "x" : -10, "y" : 681, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 109 */ { "x" : -28, "y" : 681, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 110 */ { "x" : -13, "y" : 696, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 111 */ { "x" : -1270, "y" : 716, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 112 */ { "x" : 1271, "y" : 717, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 113 */ { "x" : -1270, "y" : 719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 114 */ { "x" : 1271, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 115 */ { "x" : -1270, "y" : 719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 116 */ { "x" : 1271, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 117 */ { "x" : -1269, "y" : 722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 118 */ { "x" : 1272, "y" : 723, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 119 */ { "x" : -1270, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 120 */ { "x" : 1271, "y" : -723, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 121 */ { "x" : -1270, "y" : -719, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 122 */ { "x" : 1271, "y" : -720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 123 */ { "x" : -1269, "y" : -725, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 124 */ { "x" : 1272, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 125 */ { "x" : -1266, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 126 */ { "x" : -1266, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 127 */ { "x" : -1266, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 128 */ { "x" : -1266, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 129 */ { "x" : 1269, "y" : 720, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 130 */ { "x" : 1270, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 131 */ { "x" : -1268, "y" : 721, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 132 */ { "x" : -1268, "y" : -726, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 133 */ { "x" : 1266, "y" : 724, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 134 */ { "x" : 1267, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 135 */ { "x" : -1271, "y" : 725, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 136 */ { "x" : -1271, "y" : -722, "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      /* 137 */ { "x" : -32, "y" : -624, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 138 */ { "x" : -32, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 139 */ { "x" : 34, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 140 */ { "x" : 0, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 141 */ { "x" : 1, "y" : -639, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 142 */ { "x" : 19, "y" : -639, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 143 */ { "x" : 19, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 144 */ { "x" : 0, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 145 */ { "x" : 30, "y" : -647, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 146 */ { "x" : 30, "y" : -624, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 147 */ { "x" : -10, "y" : -654, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 148 */ { "x" : -10, "y" : -641, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 149 */ { "x" : -28, "y" : -641, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 150 */ { "x" : -13, "y" : -626, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 151 */ { "x" : -210.28125, "y" : 695.0121527777777, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      /* 152 */ { "x" : -209.6105324074074, "y" : 687.6342592592592, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      /* 153 */ { "x" : -98.25862068965517, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 154 */ { "x" : -98.25862068965517, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 155 */ { "x" : -98.25862068965517, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 156 */ { "x" : -98.25862068965517, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 157 */ { "x" : -98.25862068965517, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 158 */ { "x" : -98.25862068965517, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 159 */ { "x" : -98.25862068965517, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 160 */ { "x" : -98.25862068965517, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 161 */ { "x" : -179.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 162 */ { "x" : -160.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 163 */ { "x" : -207.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 164 */ { "x" : -188.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 165 */ { "x" : -236.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 166 */ { "x" : -217.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 167 */ { "x" : -265.4733928811961, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 168 */ { "x" : -246.96477219154093, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 169 */ { "x" : -300.2586206896552, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 170 */ { "x" : -300.2586206896552, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 171 */ { "x" : -300.2586206896552, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 172 */ { "x" : -300.2586206896552, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 173 */ { "x" : -300.2586206896552, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 174 */ { "x" : -300.2586206896552, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 175 */ { "x" : -300.2586206896552, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 176 */ { "x" : -300.2586206896552, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 177 */ { "x" : -300.2586206896552, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 178 */ { "x" : -300.2586206896552, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 179 */ { "x" : -300.2586206896552, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 180 */ { "x" : -300.2586206896552, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 181 */ { "x" : 96.55172413793105, "y" : 718, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 182 */ { "x" : 108.55172413793105, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 183 */ { "x" : 310.7413793103448, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 184 */ { "x" : 310.7413793103448, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 185 */ { "x" : 132.06034482758622, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 186 */ { "x" : 287.23275862068965, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 187 */ { "x" : 258.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 188 */ { "x" : 277.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 189 */ { "x" : 310.7413793103448, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 190 */ { "x" : 310.7413793103448, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 191 */ { "x" : 198.71875, "y" : 695.0121527777777, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      /* 192 */ { "x" : 199.3894675925926, "y" : 687.6342592592592, "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      /* 193 */ { "x" : 310.7413793103448, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 194 */ { "x" : 310.7413793103448, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 195 */ { "x" : 310.7413793103448, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 196 */ { "x" : 310.7413793103448, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 197 */ { "x" : 310.7413793103448, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 198 */ { "x" : 310.7413793103448, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 199 */ { "x" : 310.7413793103448, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 200 */ { "x" : 310.7413793103448, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 201 */ { "x" : 229.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 202 */ { "x" : 248.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 203 */ { "x" : 201.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 204 */ { "x" : 220.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 205 */ { "x" : 172.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 206 */ { "x" : 191.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 207 */ { "x" : 143.5266071188039, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 208 */ { "x" : 162.03522780845907, "y" : 654.0965576171875, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 209 */ { "x" : 108.74137931034483, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 210 */ { "x" : 108.74137931034483, "y" : 654, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 211 */ { "x" : 108.74137931034483, "y" : 694, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 212 */ { "x" : 108.74137931034483, "y" : 680, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 213 */ { "x" : 108.74137931034483, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 214 */ { "x" : 108.74137931034483, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 215 */ { "x" : 108.74137931034483, "y" : 670, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 216 */ { "x" : 108.74137931034483, "y" : 653, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 217 */ { "x" : 108.74137931034483, "y" : 695, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 218 */ { "x" : 108.74137931034483, "y" : 679, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 219 */ { "x" : 108.74137931034483, "y" : 715, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      /* 220 */ { "x" : 108.74137931034483, "y" : 703, "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      /* 221 */ { "x" : -1170.4791679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 222 */ { "x" : -1163.6041679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 223 */ { "x" : -1171.1666679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 224 */ { "x" : -1163.6041679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 225 */ { "x" : -1163.6041679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 226 */ { "x" : -1156.0416679382324, "y" : 583, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 227 */ { "x" : -1162.9166679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 228 */ { "x" : -1155.3541679382324, "y" : 580, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      /* 229 */ { "x" : -1156.6666679382324, "y" : 576.666748046875, "cMask" : ["wall" ], "trait" : "line" },
      /* 230 */ { "x" : -1149.6666679382324, "y" : 599.666748046875, "cMask" : ["wall" ], "trait" : "line" },
      /* 231 */ { "x" : -1148.6666679382324, "y" : -599.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      
      /* 232 */ { "x" : 1130.2708320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 233 */ { "x" : 1137.1458320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "color" : "DC0000" },
      /* 234 */ { "x" : 1129.5833320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 235 */ { "x" : 1137.1458320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 236 */ { "x" : 1137.1458320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 237 */ { "x" : 1144.7083320617676, "y" : -616.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 238 */ { "x" : 1137.8333320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      /* 239 */ { "x" : 1145.3958320617676, "y" : -619.5, "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      /* 240 */ { "x" : 1144.0833320617676, "y" : -622.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      /* 241 */ { "x" : 1151.0833320617676, "y" : -599.833251953125, "cMask" : ["wall" ], "trait" : "line" },
      /* 242 */ { "x" : 1150.0833320617676, "y" : 598.666748046875, "cMask" : ["wall" ], "trait" : "line" }
  
    ],
  
    "segments" : [
      { "v0" : 4, "v1" : 5, "trait" : "line", "y" : 320 },
      { "v0" : 5, "v1" : 7, "trait" : "line", "x" : 840 },
      { "v0" : 6, "v1" : 7, "trait" : "line", "y" : -320 },
      { "v0" : 8, "v1" : 9, "trait" : "line", "y" : 180 },
      { "v0" : 9, "v1" : 11, "trait" : "line", "x" : 1030 },
      { "v0" : 10, "v1" : 11, "trait" : "line", "y" : -180 },
      { "v0" : 12, "v1" : 13, "curve" : -130, "trait" : "line", "x" : 840 },
      { "v0" : 14, "v1" : 15, "trait" : "line", "y" : -320 },
      { "v0" : 15, "v1" : 17, "trait" : "line", "x" : -840 },
      { "v0" : 16, "v1" : 17, "trait" : "line", "y" : 320 },
      { "v0" : 18, "v1" : 19, "trait" : "line", "y" : -175 },
      { "v0" : 19, "v1" : 21, "trait" : "line", "x" : -1030 },
      { "v0" : 20, "v1" : 21, "trait" : "line", "y" : 175 },
      { "v0" : 22, "v1" : 23, "curve" : -130, "trait" : "line", "x" : -840 },
      { "v0" : 24, "v1" : 25, "curve" : -180, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : -180, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : 180, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : 180, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : 90, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : 90, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "curve" : -90, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "curve" : -90, "trait" : "line", "x" : -935 },
      { "v0" : 24, "v1" : 25, "trait" : "line", "x" : 935 },
      { "v0" : 26, "v1" : 27, "trait" : "line", "x" : -935 },
      { "v0" : 28, "v1" : 29, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 30, "v1" : 31, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 32, "v1" : 33, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 34, "v1" : 35, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 39, "v1" : 40, "curve" : 70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -1030 },
      { "v0" : 41, "v1" : 42, "curve" : -70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 1030 },
      { "v0" : 43, "v1" : 44, "vis" : false, "color" : "576C46", "trait" : "line", "x" : 1030 },
      { "v0" : 45, "v1" : 46, "vis" : false, "color" : "576C46", "trait" : "line", "x" : -1030 },
      { "v0" : 47, "v1" : 48, "curve" : -180, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : 180, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : 90, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "curve" : -90, "trait" : "line", "x" : -935 },
      { "v0" : 47, "v1" : 48, "trait" : "line", "x" : -935 },
      
      { "v0" : 49, "v1" : 50, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : -460 },
      { "v0" : 51, "v1" : 52, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : 460 },
      { "v0" : 53, "v1" : 54, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 54, "v1" : 55, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 55, "v1" : 56, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 57, "v1" : 58, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 58, "v1" : 59, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 59, "v1" : 60, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
      { "v0" : 61, "v1" : 62, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
      { "v0" : 63, "v1" : 64, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
      { "v0" : 64, "v1" : 62, "curve" : 5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "bias" : 0 },
      { "v0" : 62, "v1" : 65, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 64, "v1" : 66, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 67, "v1" : 68, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
      { "v0" : 69, "v1" : 70, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
      { "v0" : 68, "v1" : 70, "curve" : -5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      { "v0" : 70, "v1" : 71, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      { "v0" : 68, "v1" : 72, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
      
      { "v0" : 75, "v1" : 76, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 74, "v1" : 77, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 76, "v1" : 78, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 79, "v1" : 80, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 82, "v1" : 83, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 85, "v1" : 86, "curve" : -0.212710733178631, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 87, "v1" : 88, "curve" : -0.5926245099150841, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 89, "v1" : 90, "curve" : -0.05438611790324986, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 91, "v1" : 92, "curve" : -0.05490730726231725, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 93, "v1" : 94, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 95, "v1" : 96, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 97, "v1" : 98, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 99, "v1" : 100, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 100, "v1" : 101, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 101, "v1" : 102, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 102, "v1" : 103, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 103, "v1" : 104, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 105, "v1" : 106, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 98, "v1" : 107, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 107, "v1" : 108, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 108, "v1" : 109, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 109, "v1" : 110, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 110, "v1" : 104, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 111, "v1" : 112, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 113, "v1" : 114, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 115, "v1" : 116, "curve" : -1.4085579510213782, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 117, "v1" : 118, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 119, "v1" : 120, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 121, "v1" : 122, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 123, "v1" : 124, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 123, "v1" : 117, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 126, "v1" : 125, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 128, "v1" : 127, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 116, "v1" : 124, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 132, "v1" : 131, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 129, "v1" : 130, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 136, "v1" : 135, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 133, "v1" : 134, "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line" },
      { "v0" : 137, "v1" : 138, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 139, "v1" : 140, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 140, "v1" : 141, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 141, "v1" : 142, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 142, "v1" : 143, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 143, "v1" : 144, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 145, "v1" : 146, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 138, "v1" : 147, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 147, "v1" : 148, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 148, "v1" : 149, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 149, "v1" : 150, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 150, "v1" : 144, "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 151, "v1" : 152, "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      { "v0" : 153, "v1" : 154, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 155, "v1" : 156, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 157, "v1" : 158, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 159, "v1" : 160, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 161, "v1" : 162, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 163, "v1" : 164, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 165, "v1" : 166, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 167, "v1" : 168, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 169, "v1" : 170, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 171, "v1" : 172, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 173, "v1" : 174, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 175, "v1" : 176, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 177, "v1" : 178, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 179, "v1" : 180, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 183, "v1" : 184, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 182, "v1" : 185, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 184, "v1" : 186, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 187, "v1" : 188, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 189, "v1" : 190, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 191, "v1" : 192, "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      { "v0" : 193, "v1" : 194, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 195, "v1" : 196, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 197, "v1" : 198, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 199, "v1" : 200, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 201, "v1" : 202, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 203, "v1" : 204, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 205, "v1" : 206, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 207, "v1" : 208, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 209, "v1" : 210, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 211, "v1" : 212, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 213, "v1" : 214, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 215, "v1" : 216, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 217, "v1" : 218, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 219, "v1" : 220, "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      
      { "v0" : 221, "v1" : 222, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 223, "v1" : 224, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 225, "v1" : 226, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 227, "v1" : 228, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      { "v0" : 229, "v1" : 230, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "trait" : "line" },
      
      { "v0" : 232, "v1" : 233, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 234, "v1" : 235, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 236, "v1" : 237, "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      { "v0" : 238, "v1" : 239, "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag" },
      
      { "v0" : 240, "v1" : 241, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "trait" : "line" }
  
    ],
  
    "goals" : [
      
  
    ],
  
    "discs" : [
      { "radius" : 9, "invMass" : 0.9, "pos" : [397,-19 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 0, "invMass" : 0, "pos" : [-1285,-13 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1284,35 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1308,62 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      
      { "radius" : 2.7, "pos" : [-1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,-600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      
      { "radius" : 2.7, "pos" : [-1149,-601 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      
      { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
      { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] },
      { "radius" : 10.060763888888891, "invMass" : 1e-27, "pos" : [-197.53761574074073,692.3292824074074 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["ball" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
      { "radius" : 10.060763888888891, "invMass" : 1e-27, "pos" : [211.46238425925927,692.3292824074074 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["ball" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] },
      
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,125 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1252,160 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1151,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1250.75,-157.75 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1251.75,160.25 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      
      { "radius" : 9, "invMass" : 0.9, "pos" : [520,-19 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [397,69 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [520,69 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [459,24 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [-563.6666564941406,-37 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [-440.6666564941406,-37 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [-563.6666564941406,51 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [-440.6666564941406,51 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 },
      { "radius" : 9, "invMass" : 0.9, "pos" : [-501.6666564941406,6 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.9877, "bounciness" : 0.8, "friction" : 0.05 }
  
    ],
  
    "planes" : [
      { "normal" : [0,1 ], "dist" : -716, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      { "normal" : [0,-1 ], "dist" : -714, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      
      { "normal" : [0,1 ], "dist" : -721, "bCoef" : 0 },
      { "normal" : [0,-1 ], "dist" : -718, "bCoef" : 0 },
      { "normal" : [1,0 ], "dist" : -1268, "bCoef" : 0 },
      { "normal" : [-1,0 ], "dist" : -1266, "bCoef" : 0.1 },
      { "normal" : [1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
      { "normal" : [-1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] }
  
    ],
  
    "traits" : {
      "jb" : { "damping" : 0.99, "cMask" : [ ], "cGroup" : ["c0" ], "invMass" : 1e+250, "radius" : 0.8, "color" : "000000" },
      "ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
      "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 1, "cGroup" : ["ball" ] },
      "rightNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c3" ] },
      "leftNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c2" ] },
      "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
      "cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.2, "color" : "FFFF00", "cMask" : ["ball" ] },
      "reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
      "reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
      "sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
      "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
      "line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" }
  
    },
  
    "redSpawnPoints" : [
      [ -222, -177
      ],
      [ -228, 174
      ],
      [ -684, -89
      ],
      [ -692, 57
      ],
      [ -1087, -5
      ],
      [ -214, 622
      ],
      [ -214, 622
      ],
      [ -214, 622
      ]
  
    ],
  
    "blueSpawnPoints" : [
      [ 218, -181
      ],
      [ 225, 168
      ],
      [ 719, 94
      ],
      [ 719, -102
      ],
      [ 1101, -17
      ],
      [ 182, 629
      ],
      [ 182, 629
      ],
      [ 182, 629
      ]
  
    ],
  
    "joints" : [
      
  
    ],
  
    "canBeStored" : false
  }`;

var winMap =
  '{"name":"RSI Podium","width":625,"height":425,"cameraWidth":800,"cameraHeight":400,"maxViewWidth":0,"cameraFollow":"player","spawnDistance":170,"redSpawnPoints":[[-78,120],[-88,95],[-51,138],[-91,138],[-126,138],[-65,98],[43,138],[83,138],[119,138],[52,98],[100,98],[-105,98]],"blueSpawnPoints":[],"canBeStored":false,"kickOffReset":"partial","bg":{"color":"000000","type":"","height":300,"width":700},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":11.081942101065067,"y":-129.79789097167054,"color":"D5E0ED"},{"x":15.55703514486793,"y":-190.29927927552478,"color":"D5E0ED"},{"x":15.55703514486793,"y":-190.29927927552478,"color":"D5E0ED"},{"x":13.2211349296961,"y":-158.71888428175475,"color":"D5E0ED"},{"x":73.85289026559778,"y":-123.62335695075618,"color":"D5E0ED"},{"x":79.38943004457802,"y":-162.384737031572,"color":"D5E0ED"},{"x":147.45558187337076,"y":-171.00866240720683,"color":"D5E0ED"},{"x":129.41204476329852,"y":-116.85879125006346,"color":"D5E0ED"},{"x":147.12315666291002,"y":-171.03325083052437,"curve":150.21796687738058,"color":"D5E0ED"},{"x":129.0796195528378,"y":-116.88337967338113,"curve":150.21796687738058,"color":"D5E0ED"},{"x":185.45374790269742,"y":-97.79515375933777,"color":"D5E0ED"},{"x":205.1971736226124,"y":-155.94417139466253,"color":"D5E0ED"},{"x":216.89887480332533,"y":-87.01535811176599,"color":"D5E0ED"},{"x":236.61625656684035,"y":-145.83053350376662,"color":"D5E0ED"},{"x":-194.23277651575052,"y":-98.43836650584149,"color":"D5E0ED"},{"x":-211.57116786861846,"y":-155.78655838659566,"color":"D5E0ED"},{"x":-233.85779843955075,"y":-85.99373694515512,"color":"D5E0ED"},{"x":-250.89528731286202,"y":-142.3896743047696,"color":"D5E0ED"},{"x":-240.91964372390382,"y":-111.38262155722116,"curve":0,"color":"D5E0ED"},{"x":-120.53251478624477,"y":-119.81853430415934,"color":"D5E0ED"},{"x":-155.68882406587616,"y":-173.22401182235035,"color":"D5E0ED"},{"x":-158.4152500800906,"y":-109.25084087398324,"color":"D5E0ED"},{"x":-156.31245839076283,"y":-133.16086760383874,"color":"D5E0ED"},{"x":-134.75495954879634,"y":-139.9224271963485,"color":"D5E0ED"},{"x":-267.2993267628896,"y":-71.49987663718129,"color":"D5E0ED"},{"x":-287.9154677595333,"y":-127.17230405732306,"color":"D5E0ED"},{"x":273.4877755964566,"y":-97.79366344055533,"color":"D5E0ED"},{"x":296.91168866418275,"y":-124.18578894681069,"color":"D5E0ED"},{"x":268.61270977320015,"y":-101.82003655770109,"color":"D5E0ED"},{"x":241.94636294379006,"y":-78.70878520871675,"color":"D5E0ED"},{"x":-85.7961824235166,"y":183,"color":"2b2b2b","bias":-5},{"x":-62.64483161082165,"y":121.54459176664852,"bias":-5,"color":"2b2b2b"},{"x":76.60373430671126,"y":183,"color":"2b2b2b","bias":5},{"x":61.282987445369,"y":121.88505280801168,"bias":5,"color":"2b2b2b"},{"x":-36.853332071199844,"y":-130.15404391640783,"color":"D5E0ED"},{"x":-40.35644407845471,"y":-191.24555437988448,"color":"D5E0ED"},{"x":-89.96663748361871,"y":-126.0608097495306,"color":"D5E0ED"},{"x":-95.99343335063955,"y":-184.6650374925445,"color":"D5E0ED"},{"x":-66.7007247167524,"y":-160.43825023359915,"color":"D5E0ED"},{"x":-201.99628564948182,"y":-124.40600580790013,"curve":0,"color":"D5E0ED"},{"x":84.39355674804591,"y":-189.76438274811215,"color":"D5E0ED"},{"x":82.60074220318313,"y":-179.38082322199756,"color":"D5E0ED"},{"x":84.30525630151726,"y":-189.77091404805577,"curve":150.21796687738058,"color":"D5E0ED"},{"x":-14.554140727501618,"y":-34.053978026179664,"color":"2b2b2b"},{"x":12.205572063184235,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":26.614648181245855,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":18,"color":"2b2b2b"},{"x":-29.649363327375767,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-15.926433691126476,"y":-14.155730053618413,"color":"2b2b2b"},{"x":-39.255414072750284,"y":-36.112417471617135,"color":"2b2b2b"},{"x":17.694743917684093,"y":-15.5280230172433,"color":"2b2b2b"},{"x":34.848405962995514,"y":-37.48471043524202,"color":"2b2b2b"},{"x":54.74665393555688,"y":-37.48471043524202,"curve":31,"color":"2b2b2b"},{"x":-59.15366204531148,"y":-36.112417471617135,"curve":-31,"color":"2b2b2b"},{"x":-39.255414072750284,"y":-36.112417471617135,"color":"2b2b2b"},{"x":-9.751115354814402,"y":75.04331258200133,"curve":-31,"color":"2b2b2b"},{"x":8.774839654121934,"y":75.04331258200133,"curve":31,"color":"2b2b2b"},{"x":8.774839654121934,"y":84.64936332737572,"color":"2b2b2b"},{"x":-9.751115354814402,"y":83.96321684556324,"color":"2b2b2b"},{"x":-57.09522259987415,"y":-34.053978026179664,"color":"2b2b2b"},{"x":-39.255414072750284,"y":-34.053978026179664,"color":"2b2b2b"},{"x":-55.03678315443665,"y":-31.99553858074222,"color":"2b2b2b"},{"x":-39.255414072750284,"y":-31.99553858074222,"color":"2b2b2b"},{"x":34.848405962995514,"y":-35.426270989804635,"color":"2b2b2b"},{"x":52.68821449011941,"y":-35.426270989804635,"color":"2b2b2b"},{"x":34.848405962995514,"y":-33.36783154436722,"color":"2b2b2b"},{"x":50.62977504468199,"y":-33.36783154436722,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":1.2272283541849731,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":3.285667799622246,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":5.344107245059519,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":7.402546690497104,"y":-21.703341353555516,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":9.460986135934405,"y":-23.761780798992845,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":11.519425581371678,"y":-26.506366726242618,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":13.577865026809206,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-2.889650536689885,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-4.948089982127186,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-7.006529427564487,"y":-21.01719487174296,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-9.064968873001988,"y":-22.38948783536793,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":-12.495701282064232,"y":-24.447927280805402,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.72945906381378,"curve":0,"color":"2b2b2b"},{"x":-17.298726654751448,"y":-33.36783154436722,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-15.240287209314147,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":-10.43726183662696,"y":-23.075634317180374,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-19.35716610018892,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-21.415605545626306,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-23.47404499106358,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-27.59092388193838,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-25.53248443650108,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-23.47404499106358,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":75.04331258200133,"curve":0,"color":"2b2b2b"},{"x":-26.90477740012588,"y":-18.95875542630563,"color":"2b2b2b"},{"x":-27.59092388193838,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":15.636304472246508,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":17.694743917684093,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":19.753183363121366,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":21.811622808558667,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":23.87006225399614,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":24.556208735808582,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":0,"color":"2b2b2b"},{"x":22.497769290371195,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":18,"color":"2b2b2b"},{"x":20.439329844933667,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":18,"color":"2b2b2b"},{"x":18.380890399496366,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":74.35716610018888,"curve":18,"color":"2b2b2b"},{"x":25.24235521762091,"y":-34.053978026179664,"curve":990,"color":"2b2b2b"},{"x":-2.2035040548772713,"y":74.35716610018888,"curve":18,"color":"2b2b2b"},{"x":26.614648181245855,"y":-34.053978026179664,"color":"2b2b2b"},{"x":11.519425581371678,"y":-34.053978026179664,"curve":0,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":-47.368985211351315,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","curve":180,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":-20.89991294949766,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","curve":180,"color":"2b2b2b"},{"x":-0.8312110912523281,"y":-36.025097099128345,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-6.773247721464486,"y":-33.324171358122896,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-13.795654648078738,"y":-37.6456525437317,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":5.110825538959546,"y":-32.78398620992178,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":12.673417613774916,"y":-36.565282247329435,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-9.474173462469878,"y":-25.76157928330747,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":8.351936428166084,"y":-24.14102383870437,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-0.2910259430514941,"y":-27.922319876111942,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-5.69287742506242,"y":-21.98028324589984,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":4.570640390758399,"y":-21.44009809769892,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-1.3713962394534462,"y":-36.025097099128345,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":8.351936428166084,"y":-42.507318877541564,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-8.393803166067698,"y":-45.20824461854704,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-9.751115354814402,"y":79.1601914728761,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-20.043312582001363,"y":92.88312110912528,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b","curve":45},{"x":9.460986135934405,"y":79.1601914728761,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":20,"y":92.88312110912528,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b","curve":45},{"x":-24.101752027438664,"y":121,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b","curve":-60},{"x":24,"y":121,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b","curve":-60},{"x":-21.415605545626306,"y":101.80302537268722,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":21.811622808558667,"y":101.80302537268722,"bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","color":"2b2b2b"},{"x":-53.664490190811705,"y":-20.33104838993046},{"x":-36.510828145500454,"y":-10.03885116274364},{"x":-49.54761129993713,"y":-3.8635328264314808},{"x":-32.39394925462557,"y":9.859396809817724},{"x":-43.37229296362494,"y":16.034715146129855},{"x":-26.90477740012588,"y":25.640765891504202},{"x":-36.510828145500454,"y":32.50223070962875},{"x":-20.729459063813692,"y":42.10828145500324},{"x":-26.218630918313522,"y":52.400478682190126},{"x":-13.181847763876874,"y":53.77277164581503},{"x":-16.61258017293909,"y":66.12340831843932},{"x":34.162259481183014,"y":-20.33104838993046},{"x":45.826749671994776,"y":-10.03885116274364},{"x":31.41767355393307,"y":-3.8635328264314808},{"x":41.0237242993077,"y":9.859396809817724},{"x":27.300794663058355,"y":16.034715146129855},{"x":36.220698926620486,"y":25.640765891504202},{"x":21.811622808558667,"y":32.50223070962875},{"x":29.359234108495798,"y":42.10828145500324},{"x":12.89171854499665,"y":52.400478682190126},{"x":14.26401150862165,"y":67.49570128206427},{"x":-0.8312110912523281,"y":75.72945906381378},{"x":-8.329623411350411,"y":113.56037474846096,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-8.329623411350411,"y":100.81805000090878,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-1.7112863291720544,"y":100.81805000090878,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":2.7944353499259194,"y":106.0276192347146,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":2.7944353499259194,"y":100.81805000090878,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":9.231180605778547,"y":100.81805000090878,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":9.231180605778547,"y":113.63077433270165,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-8.329623411350411,"y":113.56037474846096,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":9.231180605778547,"y":113.63077433270165,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-1.7112863291720544,"y":113.63077433270165,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-1.7112863291720544,"y":108.42120509889568,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":2.7944353499259194,"y":113.63077433270165,"bCoef":0,"cMask":["c0"],"cGroup":["c0"],"color":"222222"},{"x":-297,"y":105,"bCoef":-0.5,"cGroup":["c0"],"curve":0,"color":"2b2b2b"},{"x":303,"y":104,"bCoef":-0.5,"cGroup":["c0"],"curve":0,"color":"2b2b2b"},{"x":-295.3952879581152,"y":76.27272727272725,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-8,"radius":10},{"x":-255.6047120418848,"y":76.27272727272725,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-8,"radius":10},{"x":-295.3952879581152,"y":84.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-180},{"x":-255.6047120418848,"y":84.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-180},{"x":-303.35340314136124,"y":84.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":-247.64659685863876,"y":84.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":-303.35340314136124,"y":93.72727272727275,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":-247.64659685863876,"y":93.72727272727275,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":-287.4371727748691,"y":117,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-25},{"x":-263.5628272251309,"y":117,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-25},{"x":-287.4371727748691,"y":126.14285714285717,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":-263.5628272251309,"y":126.14285714285717,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":-293.0078534031414,"y":126.97402597402595,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":-257.9921465968586,"y":126.97402597402595,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":-293.0078534031414,"y":133.6233766233766,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":30},{"x":-257.9921465968586,"y":133.6233766233766,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":-281.07068062827227,"y":181,"bCoef":-0.5,"cGroup":["c0"],"curve":50,"color":"2b2b2b"},{"x":-269.92931937172773,"y":181,"bCoef":-0.5,"cGroup":["c0"],"curve":50,"color":"2b2b2b"},{"x":-275.5,"y":117,"bCoef":-0.5,"cGroup":["c0"],"curve":75,"color":"2b2b2b"},{"x":-292.21204188481676,"y":94.55844155844159,"bCoef":-0.5,"cGroup":["c0"],"curve":-75,"color":"2b2b2b"},{"x":-258.78795811518324,"y":94.55844155844159,"bCoef":-0.5,"cGroup":["c0"],"curve":75,"color":"2b2b2b"},{"x":260.1047120418848,"y":77.27272727272725,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-8},{"x":299.8952879581152,"y":77.27272727272725,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-8},{"x":260.1047120418848,"y":85.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-180},{"x":299.8952879581152,"y":85.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-180},{"x":252.14659685863876,"y":85.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":307.85340314136124,"y":85.58441558441558,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":252.14659685863876,"y":94.72727272727275,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":307.85340314136124,"y":94.72727272727275,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":268.0628272251309,"y":118,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-25},{"x":291.9371727748691,"y":118,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-25},{"x":268.0628272251309,"y":127.14285714285717,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":291.9371727748691,"y":127.14285714285717,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":262.4921465968587,"y":127.97402597402595,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":297.5078534031413,"y":127.97402597402595,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":0},{"x":262.4921465968587,"y":134.6233766233766,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":30},{"x":297.5078534031413,"y":134.6233766233766,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b","curve":-165},{"x":274.42931937172773,"y":182,"bCoef":-0.5,"cGroup":["c0"],"curve":50,"color":"2b2b2b"},{"x":285.57068062827227,"y":182,"bCoef":-0.5,"cGroup":["c0"],"curve":50,"color":"2b2b2b"},{"x":280,"y":118,"bCoef":-0.5,"cGroup":["c0"],"curve":75,"color":"2b2b2b"},{"x":263.28795811518324,"y":95.55844155844159,"bCoef":-0.5,"cGroup":["c0"],"curve":-75,"color":"2b2b2b"},{"x":296.71204188481676,"y":95.55844155844159,"bCoef":-0.5,"cGroup":["c0"],"curve":75,"color":"2b2b2b"},{"x":-252,"y":105,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b"},{"x":256,"y":104,"bCoef":-0.5,"cGroup":["c0"],"color":"2b2b2b"},{"x":-625,"y":183,"color":"2b2b2b"},{"x":625,"y":183,"color":"2b2b2b"},{"x":-506.5,"y":183,"color":"2b2b2b"},{"x":508.5,"y":183,"color":"2b2b2b"},{"x":-625,"y":183,"cMask":["c0"],"cGroup":["c0"],"color":"2b2b2b"},{"x":625,"y":183,"cMask":["c0"],"cGroup":["c0"],"color":"2b2b2b"}],"segments":[{"v0":0,"v1":1,"color":"D5E0ED"},{"v0":2,"v1":3,"curve":212.28867756056664,"color":"D5E0ED"},{"v0":4,"v1":5,"curve":0,"color":"D5E0ED"},{"v0":6,"v1":7,"curve":-165.44801395883317,"color":"D5E0ED"},{"v0":8,"v1":9,"curve":176.0526558299046,"color":"D5E0ED"},{"v0":10,"v1":11,"color":"D5E0ED"},{"v0":11,"v1":12,"color":"D5E0ED"},{"v0":12,"v1":13,"color":"D5E0ED"},{"v0":14,"v1":15,"color":"D5E0ED"},{"v0":16,"v1":17,"color":"D5E0ED"},{"v0":19,"v1":20,"color":"D5E0ED"},{"v0":20,"v1":21,"color":"D5E0ED"},{"v0":22,"v1":23,"color":"D5E0ED"},{"v0":24,"v1":25,"curve":208.94058820013151,"color":"D5E0ED"},{"v0":26,"v1":27,"curve":208.94058820013151,"color":"D5E0ED"},{"v0":28,"v1":29,"curve":208.94058820013151,"color":"D5E0ED"},{"v0":30,"v1":31,"curve":0,"color":"2b2b2b","bias":-5},{"v0":32,"v1":33,"curve":0,"color":"2b2b2b","bias":5},{"v0":31,"v1":33,"curve":0,"color":"2b2b2b"},{"v0":34,"v1":35,"color":"D5E0ED"},{"v0":36,"v1":37,"color":"D5E0ED"},{"v0":37,"v1":38,"color":"D5E0ED"},{"v0":38,"v1":35,"color":"D5E0ED"},{"v0":18,"v1":39,"curve":0,"color":"D5E0ED"},{"v0":40,"v1":41,"curve":-52.103997010176776,"color":"D5E0ED"},{"v0":43,"v1":44,"curve":-187.53277594193364,"color":"2b2b2b","y":-206},{"v0":45,"v1":46,"curve":18,"color":"2b2b2b"},{"v0":47,"v1":48,"curve":-13.81432544760929,"color":"2b2b2b"},{"v0":49,"v1":50,"curve":97.89037245807509,"color":"2b2b2b"},{"v0":52,"v1":51,"curve":97.89037245807509,"color":"2b2b2b"},{"v0":52,"v1":53,"curve":0,"color":"2b2b2b"},{"v0":54,"v1":55,"curve":0,"color":"2b2b2b"},{"v0":56,"v1":57,"curve":0,"color":"2b2b2b"},{"v0":57,"v1":58,"curve":0,"color":"2b2b2b"},{"v0":58,"v1":59,"curve":0,"color":"2b2b2b"},{"v0":59,"v1":56,"curve":0,"color":"2b2b2b"},{"v0":60,"v1":61,"curve":0,"color":"2b2b2b","y":-209},{"v0":62,"v1":63,"curve":0,"color":"2b2b2b","y":-206},{"v0":64,"v1":65,"curve":0,"color":"2b2b2b","y":-209},{"v0":66,"v1":67,"curve":0,"color":"2b2b2b","y":-206},{"v0":54,"v1":56,"curve":-31,"color":"2b2b2b"},{"v0":53,"v1":57,"curve":31,"color":"2b2b2b"},{"v0":56,"v1":62,"curve":31,"color":"2b2b2b"},{"v0":56,"v1":60,"curve":31,"color":"2b2b2b"},{"v0":67,"v1":57,"curve":31,"color":"2b2b2b"},{"v0":65,"v1":57,"curve":31,"color":"2b2b2b"},{"v0":48,"v1":63,"curve":31,"color":"2b2b2b"},{"v0":66,"v1":48,"curve":31,"color":"2b2b2b"},{"v0":68,"v1":48,"curve":0,"color":"2b2b2b","x":32},{"v0":70,"v1":69,"curve":0,"color":"2b2b2b","x":35},{"v0":72,"v1":71,"curve":0,"color":"2b2b2b","x":38},{"v0":74,"v1":73,"curve":0,"color":"2b2b2b","x":41},{"v0":76,"v1":75,"curve":0,"color":"2b2b2b","x":44},{"v0":78,"v1":77,"curve":0,"color":"2b2b2b","x":47},{"v0":80,"v1":79,"curve":0,"color":"2b2b2b","x":50},{"v0":82,"v1":81,"curve":0,"color":"2b2b2b","x":53},{"v0":84,"v1":83,"curve":0,"color":"2b2b2b","x":29},{"v0":86,"v1":85,"curve":0,"color":"2b2b2b","x":26},{"v0":88,"v1":87,"curve":0,"color":"2b2b2b","x":23},{"v0":90,"v1":89,"curve":0,"color":"2b2b2b","x":20},{"v0":92,"v1":91,"curve":0,"color":"2b2b2b","x":17},{"v0":94,"v1":93,"curve":0,"color":"2b2b2b","x":14},{"v0":96,"v1":95,"curve":0,"color":"2b2b2b","x":11},{"v0":98,"v1":97,"curve":0,"color":"2b2b2b","x":8},{"v0":100,"v1":99,"curve":0,"color":"2b2b2b","x":5},{"v0":102,"v1":101,"curve":0,"color":"2b2b2b","x":2},{"v0":104,"v1":103,"curve":0,"color":"2b2b2b","x":-1},{"v0":47,"v1":105,"curve":0,"color":"2b2b2b","x":-10},{"v0":106,"v1":107,"curve":0,"color":"2b2b2b","x":-7},{"v0":108,"v1":109,"curve":0,"color":"2b2b2b","x":-4},{"v0":110,"v1":111,"curve":0,"color":"2b2b2b","x":-1},{"v0":49,"v1":111,"curve":0,"color":"2b2b2b"},{"v0":112,"v1":111,"curve":0,"color":"2b2b2b"},{"v0":113,"v1":114,"curve":-12.08818432448223,"color":"2b2b2b"},{"v0":115,"v1":116,"curve":0,"color":"2b2b2b","x":56},{"v0":117,"v1":118,"curve":0,"color":"2b2b2b","x":59},{"v0":119,"v1":120,"curve":0,"color":"2b2b2b","x":62},{"v0":121,"v1":122,"curve":0,"color":"2b2b2b","x":65},{"v0":123,"v1":124,"curve":0,"color":"2b2b2b","x":68},{"v0":125,"v1":126,"curve":0,"color":"2b2b2b","x":69},{"v0":127,"v1":128,"curve":18,"color":"2b2b2b","x":66},{"v0":129,"v1":130,"curve":18,"color":"2b2b2b","x":63},{"v0":131,"v1":132,"curve":18,"color":"2b2b2b","x":60},{"v0":133,"v1":134,"curve":18,"color":"2b2b2b"},{"v0":47,"v1":43,"curve":0,"color":"2b2b2b"},{"v0":136,"v1":135,"curve":0,"color":"2b2b2b"},{"v0":137,"v1":138,"curve":180,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":138,"v1":137,"curve":180,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":137,"v1":139,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":139,"v1":140,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":140,"v1":141,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":139,"v1":142,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":142,"v1":143,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":140,"v1":144,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":142,"v1":145,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":139,"v1":146,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":146,"v1":147,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":146,"v1":148,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":149,"v1":150,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":139,"v1":151,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":152,"v1":153,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":154,"v1":155,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":155,"v1":153,"curve":45,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":153,"v1":156,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":156,"v1":157,"curve":4.582836827638469,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier","y":121},{"v0":157,"v1":155,"vis":true,"color":"2b2b2b","bCoef":0.1,"cMask":["c0"],"cGroup":["c0"],"trait":"kickOffBarrier"},{"v0":63,"v1":160,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":160,"v1":161,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":161,"v1":162,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":162,"v1":163,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":163,"v1":164,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":164,"v1":165,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":165,"v1":166,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":166,"v1":167,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":167,"v1":168,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":168,"v1":169,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":169,"v1":170,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":170,"v1":134,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":67,"v1":171,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":171,"v1":172,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":172,"v1":173,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":173,"v1":174,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":174,"v1":175,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":175,"v1":176,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":176,"v1":177,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":177,"v1":178,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":178,"v1":179,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":179,"v1":180,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":181,"v1":180,"curve":0,"vis":true,"color":"2b2b2b"},{"v0":182,"v1":183,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"],"x":-141},{"v0":183,"v1":184,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"],"y":-45.5},{"v0":184,"v1":185,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"]},{"v0":185,"v1":186,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"]},{"v0":186,"v1":187,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"],"y":-45.5},{"v0":187,"v1":188,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"]},{"v0":189,"v1":191,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"],"y":197},{"v0":191,"v1":192,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"]},{"v0":192,"v1":193,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"]},{"v0":193,"v1":190,"color":"222222","bCoef":0,"cMask":["c0"],"cGroup":["c0"],"y":45.5},{"v0":196,"v1":197,"curve":-8,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":370,"radius":10},{"v0":198,"v1":199,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":196,"v1":198,"curve":-180.00000000000176,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":199,"v1":197,"curve":-170.7333876736081,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":200,"v1":201,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":202,"v1":203,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":375},{"v0":200,"v1":202,"curve":-180.00000000000952,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":203,"v1":201,"curve":-179.99999999999528,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":202,"v1":203,"curve":-165.63127608781159,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":204,"v1":205,"curve":-26.073554859371015,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":206,"v1":207,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":375},{"v0":204,"v1":206,"curve":-180.00000000000247,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":-15},{"v0":207,"v1":205,"curve":-202.72687443951966,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":15},{"v0":208,"v1":209,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":210,"v1":211,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":454},{"v0":208,"v1":210,"curve":-179.99999999999508,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":-22},{"v0":211,"v1":209,"curve":-180.00000000000824,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":22},{"v0":210,"v1":212,"curve":29.081223606830164,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":213,"v1":211,"curve":28.775195329981987,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":213,"v1":212,"curve":51.93451319677356,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":215,"v1":214,"curve":-72.6314325682926,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":216,"v1":214,"curve":72.63143256829309,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":217,"v1":218,"curve":-8,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":370},{"v0":219,"v1":220,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":217,"v1":219,"curve":-180.00000000000176,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":220,"v1":218,"curve":-170.7333876736081,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":221,"v1":222,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":223,"v1":224,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":375},{"v0":221,"v1":223,"curve":-180.00000000000952,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":224,"v1":222,"curve":-179.99999999999528,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":223,"v1":224,"curve":-165.63127608781159,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":225,"v1":226,"curve":-26.073554859371015,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":227,"v1":228,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":375},{"v0":225,"v1":227,"curve":-180.00000000000247,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":-15},{"v0":228,"v1":226,"curve":-202.72687443951966,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":15},{"v0":229,"v1":230,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":380},{"v0":231,"v1":232,"curve":0,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":0,"y":454},{"v0":229,"v1":231,"curve":-179.99999999999508,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":-22},{"v0":232,"v1":230,"curve":-180.00000000000824,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"],"x":22},{"v0":231,"v1":233,"curve":29.081223606830164,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":234,"v1":232,"curve":28.775195329981987,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":234,"v1":233,"curve":51.93451319677356,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":236,"v1":235,"curve":-72.6314325682926,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":237,"v1":235,"curve":72.63143256829309,"color":"2b2b2b","bCoef":-0.5,"cGroup":["c0"]},{"v0":240,"v1":241,"curve":125.79648024076617,"color":"2b2b2b"},{"v0":242,"v1":243,"curve":125.79648024076617,"color":"2b2b2b"},{"v0":244,"v1":245,"color":"2b2b2b","cMask":["c0"],"cGroup":["c0"]}],"goals":[],"discs":[{"radius":10,"invMass":1,"pos":[-273,33],"color":"DB8727","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[-284,59],"color":"EBAB4D","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[-281,43],"color":"DBD52A","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[-269,43],"color":"C44221","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[-274,56],"color":"DB8727","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[-266,63],"color":"DBD142","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[290,46],"color":"DBD52A","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[281,33],"color":"DB8727","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[270,59],"color":"EBAB4D","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[273,43],"color":"DBD52A","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[285,43],"color":"C44221","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[280,56],"color":"DB8727","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":10,"invMass":1,"pos":[288,63],"color":"DBD142","bCoef":1,"cMask":["blueKO"],"cGroup":["score"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":95,"invMass":0,"pos":[274,86],"color":"000000","cMask":["red","blue"],"cGroup":["wall"],"damping":1,"speed":[0,0],"gravity":[0,0]},{"radius":1,"invMass":1,"pos":[0,130],"color":"2b2b2b","cMask":["ball"],"cGroup":["all"],"damping":1,"speed":[0,-1],"gravity":[0,0]},{"radius":0,"invMass":1,"pos":[-118,-380],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-133,-365],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-67,-407],"color":"97f7e4","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-61,-389],"color":"97f7e4","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-7,-412],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-13,-397],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[49,-415],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[49,-394],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[128,-410],"color":"36a832","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[137,-394],"color":"36a832","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[98,-415],"color":"4a7529","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[94,-398],"color":"4a7529","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[14,-414],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[19,-399],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-31,-414],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-38,-398],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-203,-400],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-190,-388],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[114,-396],"color":"da5fe3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[113,-378],"color":"da5fe3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-113,-413],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-99,-402],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-165,-387],"color":"2883b0","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-174,-367],"color":"2883b0","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[175,-410],"color":"97f7e4","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[190,-393],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[155,-382],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[174,-374],"color":"de122a","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[218,-409],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[170,-397],"color":"97f7e4","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[218,-393],"color":"ffb330","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[207,-374],"color":"d7de18","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[5,-381],"color":"4a7529","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[22,-369],"color":"4a7529","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-29,-375],"color":"36a832","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-39,-359],"color":"36a832","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[107,-362],"color":"97f7e4","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[133,-349],"color":"97f7e4","cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[77,-377],"color":"2883b0","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[62,-358],"color":"2883b0","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-250,-410],"color":"2b2b2b","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-269,-394],"color":"2b2b2b","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-225,-409],"color":"da5fe3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":0,"invMass":1,"pos":[-233,-390],"color":"da5fe3","bCoef":1,"cMask":["c0"],"cGroup":["c0"],"damping":0.75,"speed":[0,0],"gravity":[0,0.2]},{"radius":95,"invMass":0,"pos":[-274,86],"color":"000000","cMask":["red","blue"],"cGroup":["wall"],"damping":1,"speed":[0,0],"gravity":[0,0]},{"radius":6,"invMass":1.0e+250,"pos":[0,130],"color":"ffffff","cMask":["ball"],"cGroup":["kick"],"damping":1000000,"speed":[0,0],"gravity":[0,0]}],"planes":[{"normal":[0,-1],"dist":-73,"bCoef":1.0e-7,"cMask":["score"],"cGroup":["blueKO"],"_data":{"extremes":{"normal":[0,-1],"dist":-73,"canvas_rect":[-902,-425,902,425],"a":[-902,73],"b":[902,73]}}},{"normal":[0,1],"dist":18,"bCoef":10000000,"cMask":["score"],"cGroup":["blueKO"],"_data":{"extremes":{"normal":[0,1],"dist":18,"canvas_rect":[-902,-425,902,425],"a":[-902,18],"b":[902,18]}}}],"joints":[{"d0":56,"d1":57,"strength":"rigid","color":"transparent","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":56,"d1":57,"strength":"rigid","color":"36a832","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":58,"d1":59,"strength":"rigid","color":"da5fe3","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":34,"d1":35,"strength":"rigid","color":"da5fe3","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":38,"d1":39,"strength":"rigid","color":"2883b0","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":32,"d1":33,"strength":"rigid","color":"de122a","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":16,"d1":17,"strength":"rigid","color":"d7de18","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":36,"d1":37,"strength":"rigid","color":"ffb330","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":18,"d1":19,"strength":"rigid","color":"97f7e4","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":50,"d1":51,"strength":"rigid","color":"36a832","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":30,"d1":31,"strength":"rigid","color":"de122a","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":20,"d1":21,"strength":"rigid","color":"ffb330","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":28,"d1":29,"strength":"rigid","color":"d7de18","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":48,"d1":49,"strength":"rigid","color":"4a7529","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":22,"d1":23,"strength":"rigid","color":"de122a","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":54,"d1":55,"strength":"rigid","color":"2883b0","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":26,"d1":27,"strength":"rigid","color":"4a7529","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":52,"d1":53,"strength":"rigid","color":"97f7e4","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"damping":0.75},{"d0":24,"d1":25,"strength":"rigid","color":"36a832","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":42,"d1":43,"strength":"rigid","color":"de122a","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":41,"d1":47,"strength":"rigid","color":"d7de18","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":40,"d1":45,"strength":"rigid","color":"97f7e4","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":44,"d1":46,"strength":"rigid","color":"ffb330","length":null,"radius":0,"speed":[0,0],"gravity":[0,0.2],"cMask":["c0"],"cGroup":["c0"],"bCoef":1,"damping":0.75},{"d0":60,"d1":61,"strength":"rigid","color":"transparent","length":null},{"d0":14,"d1":61,"strength":"rigid","color":"transparent","length":null}],"playerPhysics":{"radius":14,"bCoef":0.5,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.1,"gravity":[0,0],"kickingAcceleration":0.07,"kickingDamping":0.96,"kickStrength":5,"kickback":0},"ballPhysics":{"radius":0,"bCoef":0.5,"cMask":["all"],"damping":0.99,"invMass":1,"gravity":[0,0],"color":"ffffff","cGroup":["ball"]}}';


  /* MODE */

var afkLimit = 90; // limite de afk (12 segundos)
var drawTimeLimit = 1; // minutos
var maxTeamSize = 6; // máximo de jogadores num time, isso funciona para 1 (você pode querer adaptar as coisas para remover algumas estatísticas inúteis em 1v1, como assist ou cs), 2, 3 ou 4
var slowMode = 1;

/* TIM */

const Team = {
  SPECTATORS: 0,
  RED: 1,
  BLUE: 2,
};
var extendedP = [];
const eP = {
  ID: 0,
  AUTH: 1,
  CONN: 2,
  AFK: 3,
  ACT: 4,
  GK: 5,
  MUTE: 6,
};
const Ss = {
  GA: 0,
  WI: 1,
  DR: 2,
  LS: 3,
  WR: 4,
  GL: 5,
  AS: 6,
  GK: 7,
  CS: 8,
  CP: 9,
  RL: 10,
  NK: 11,
};
var players;
var TeamR;
var TeamB;
var teamS;
var messageHistory = [0, 0, 0, 0, 0, 0];
var messageCounter = 0;
var teams = ["spectators","red","blue"];

/* GAME */

let forbid = ["macaco", "adolf hitler", "nazismo", "cuzao", "cuzão", "autista", "cu", "hitler", "Macaco", "Hitler", "Pênis"];

let link = ["https://www.haxball.com/play?c=_", "https://www.haxball.com", "haxball.com", ".com", "https://", "https:", "https://www."];

function nameForbid(player) {
  if (forbid.includes(player.name)) {
    room.kickPlayer(player.id, "nick proibido nessa sala", false);
  }
}

var lastTeamTouched; // records who was the last to touch the ball
var lastPlayersTouched; // allows you to receive good goal notifications (must be lastPlayersKicked, waiting for a next update to get better control of shots on target)
var countAFK = false; // created to get better control of the activity, kicks if it's AFK
var activePlay = false; // created to gain better control of ball possession
var goldenGoal = false;
var SMSet = new Set(); // set created to get slow mode which is useful in ChooseMode
var banList = []; // keep track of bans, so we can unban people if we want

/* STATS */

var game;
var GKList = ["", ""];
var Rposs = 0;
var Bposs = 0;
var point = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 0,
  },
]; // created to obtain ball speed
var ballSpeed;
var lastWinner = Team.SPECTATORS;
var streak = 0;
var allBlues = []; // this is to count the players who should be counted for statistics. This includes players who left after the game started.
var allReds = [];

/* BALANCE AND RECRUITMENT */

var inChooseMode = false; // this variable allows you to distinguish the 2 phases of the game and choose which ones should be treated very differently
var redCaptainChoice = "";
var blueCaptainChoice = "";
var chooseTime = 20;
var timeOutCap;

/* ASSISTANT */

var checkTimeVariable = false; // this is created so that chat doesn't get spammed when a game ends via timeLimit
var announced = false;
var statNumber = 0; // this allows the room to receive statistical information every X minutes
var endGameVariable = false; // this variable with the one below helps distinguish cases where games are stopped because they are over from those where games are stopped due to player movements or team resets
var resettingTeams = false;
var capLeft = false;
var statInterval = 6;

loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);

/* OBJECTS */

function Goal(time, team, striker, assist) {
  this.time = time;
  this.team = team;
  this.striker = striker;
  this.assist = assist;
}

// -------------------------------------------------
// Webhooks
// -------------------------------------------------

let replayWebHook = "https://discord.com/api/webhooks/1227094504989921340/4Me4_Lm-Ovcfa5XwWVUMxCQQoXSs1g8OvjTsuMLhfgLB4SxecVwkn30HdVqSpiDYfX_E";
let goalWebHook = "https://discord.com/api/webhooks/1227774180343287890/gi34423X3uBqB--UM_-aIB5MqPShDFmftAUwTMIw8aB2U-30TYcqu9a9HMQ7C3HrLzMt";
let chatWebHook = "https://discord.com/api/webhooks/1227802111459459072/Db2vLhw6Mxcp0Xu9aNVYl684ANho_4Nuqz-roujkQQPYhbjG_PqENhDOgGnnqE5R4P4n";
let joinWebHook = "https://discord.com/api/webhooks/1228203622366449695/h_oYpebe1f6D8i7sMhs5J4wUn3-iHRIqUPXT-Lsvq98cf6z_BsRj_I8zAP93S4wgi-gD";
let startWebHook = "https://discord.com/api/webhooks/1228211340519149661/kmFJSfdirOOWRnH-bynJrDxisbtI-5kg5AesFc4RaktI0NSwgoo6KBbj5bkyshJfcQhq";
let adminWebHook = "https://discord.com/api/webhooks/1228918067854311544/marqckLcQDbMX9GUXCzp3rMfbkEYlUTdzS4vZHoXlrz34FL-K2i06pUJiN6TCOFGztVe";
let toxicWebHook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";
let fieldWebHook = "https://discord.com/api/webhooks/1233955747985887343/O955Dr_8z5JgTU9sqv880UhqH2KplyJfQ3bLEcXaGm8oK1RSQFGwZAeVVnTYwlyUQ9sz";
let statsWebHook = "https://discord.com/api/webhooks/1241941404859498567/JRNpNAmFGDeE7S8kybSes_KvMO6C_4EZFrPc-8WM6tFfbUgu3RUXbYgCxUuJboreCWZv";
let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1243753059155312711/ApZTk8vGyDgQRqXkoTZ6XXjxsFZSC6sK6Zkl2yJG2HoCtw_uSxsbz6hZvDV_elVdGOlZ";


// -------------------------------------------------
// Classes
// -------------------------------------------------
class Game {
  constructor(date, scores, goals) {
    this.time = 0;
    this.paused = false;
    this.ballRadius;
    this.date = date;
    this.scores = scores;
    this.goals = goals;
    this.rsTouchTeam = 0;
    this.rsActive = true;
    this.rsReady = false;
    this.rsCorner = false;
    this.rsGoalKick = false;
    this.rsSwingTimer = 1000;
    this.rsTimer;
    this.ballOutPositionX;
    this.ballOutPositionY;
    this.throwInPosY;
    this.outStatus = "";
    this.warningCount = 0;
    this.bringThrowBack = false;
    this.extraTime = false;
    this.extraTimeCount = 0;
    this.extraTimeEnd;
    this.extraTimeAnnounced = false;
    this.lastPlayAnnounced = false;
    this.boosterState;
    this.throwinKicked = false;
    this.pushedOut;
    this.lastKickerId;
    this.lastKickerName;
    this.lastKickerTeam;
    this.secondLastKickerId;
    this.secondLastKickerName;
    this.secondLastKickerTeam;
    this.redScore = 0;
    this.blueScore = 0;
    this.powershotCounter = 0;
    this.powershotID = 0;
    this.powershotTrigger = false;
  }

  updateLastKicker(id, name, team) {
    this.secondLastKickerId = this.lastKickerId;
    this.secondLastKickerName = this.lastKickerName;
    this.secondLastKickerTeam = this.lastKickerTeam;

    this.lastKickerId = id;
    this.lastKickerName = name;
    this.lastKickerTeam = team;
  }
}


/* FUNCTIONS */

function centerText(string) {
  var space = parseInt((80 - string.length) * 0.8, 10);
  if (space <= 0) {
    return "";
  }
  return " ".repeat(space) + string + " ".repeat(space);
}


function getCurrentTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
}

// Function to send webhook
function sendWebhook(url, content) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res);
}

/* CHASING */
function golcontra(goaler) {
  var messages = [
    "I'm sure it was unintentional, right, " + goaler.name + "?",
    "YOU'RE PLAYING FOR THE WRONG TEAM, " + goaler.name,
    "Pro tip " + goaler.name + ": Next time... DON'T AIM AT YOUR GOAL!!",
    goaler.name + " What are you doing?",
    "Harry " + goaler.name + " Maguire",
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var announcement = messages[randomIndex];
  setTimeout(function () {
    room.sendAnnouncement(centerText(announcement), null, Cor.White, "bold");
  }, 3000);
}

/* AUXILIARY FUNCTIONS */

function getRandomInt(max) {
  // returns a random number from 0 to max-1
  return Math.floor(Math.random() * Math.floor(max));
}

function getTime(scores) {
  // returns the current game time
  return (
    "[" +
    Math.floor(Math.floor(scores.time / 60) / 10).toString() +
    Math.floor(Math.floor(scores.time / 60) % 10).toString() +
    ":" +
    Math.floor(Math.floor(scores.time - Math.floor(scores.time / 60) * 60) / 10).toString() +
    Math.floor(Math.floor(scores.time - Math.floor(scores.time / 60) * 60) % 10).toString() +
    "]"
  );
}

function createPlayer(player){ //Create player informations, it will be used in the room.onPlayerJoin() event.
  playerInformations[playerInformations.length] = {
name:player.name,
id:player.id,
freezePoint:{
    x:undefined,
    y:undefined
}
  }
}

function deletePlayer(id){ //Delete player informations, it will be used in the room.onPlayerLeave() event.
  for(var i=0; i<playerInformations.length; i++){
if(playerInformations[i].id == id){
    playerInformations.splice(i,1);
}
  }
}

function getPlayerByID(id){ //Gets players by their ID's, it will be used by controlling players one by one.
  for(var i=0; i<playerInformations.length; i++){
if(playerInformations[i].id == id){
    return playerInformations[i];
}
  }
}

function handleFrozenPlayerMoves(){ //Detects moves of frozen players. If a frozen player tries to move from their freeze point, then they will be moved to that point.
  var players = room.getPlayerList();
  for(var i=0; i<players.length; i++){
if(freeze.includes(players[i].name) == true && pointDistance(room.getPlayerDiscProperties(players[i].id),getPlayerByID(players[i].id).freezePoint) > 0){
    room.setPlayerDiscProperties(players[i].id,{x:getPlayerByID(players[i].id).freezePoint.x,y:getPlayerByID(players[i].id).freezePoint.y,xspeed:0,yspeed:0});
}
  }
}

function pointDistance(p1, p2) {
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/* BUTTONS */

function download(conteudo, nomeDoArquivo, tipoDeArquivo) {
  let blob = new Blob([conteudo], {
    type: tipoDeArquivo,
  });
  const link = window.document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = nomeDoArquivo;
  link.click();
  window.URL.revokeObjectURL(link.href);
}

function topBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (TeamR.length == TeamB.length) {
      if (teamS.length > 1) {
        room.setPlayerTeam(teamS[0].id, Team.RED);
        room.setPlayerTeam(teamS[1].id, Team.BLUE);
      }
      return;
    } else if (TeamR.length < TeamB.length) {
      room.setPlayerTeam(teamS[0].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[0].id, Team.BLUE);
    }
  }
}

function randomBtn() {
  if (teamS.length == 0) {
    return;
  } else {
    if (TeamR.length == TeamB.length) {
      if (teamS.length > 1) {
        var r = getRandomInt(teamS.length);
        room.setPlayerTeam(teamS[r].id, Team.RED);
        teamS = teamS.filter((spec) => spec.id != teamS[r].id);
        room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
      }
      return;
    } else if (TeamR.length < TeamB.length) {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED);
    } else {
      room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
    }
  }
}

function blueToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamB.length; i++) {
    room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
  }
}

function redToSpecBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamR.length; i++) {
    room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
  }
}

function resetBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  if (TeamR.length <= TeamB.length) {
    for (var i = 0; i < TeamR.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = TeamR.length; i < TeamB.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
    }
  } else {
    for (var i = 0; i < TeamB.length; i++) {
      room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
    for (var i = TeamB.length; i < TeamR.length; i++) {
      room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
    }
  }
}

function blueToRedBtn() {
  resettingTeams = true;
  setTimeout(() => {
    resettingTeams = false;
  }, 100);
  for (var i = 0; i < TeamB.length; i++) {
    room.setPlayerTeam(TeamB[i].id, Team.RED);
  }
}

/* GAME FUNCTIONS */



function checkTime() {
  const scores = room.getScores();
  game.scores = scores;
  if (Math.abs(scores.time - scores.timeLimit) <= 0.01 && scores.timeLimit != 0) {
    if (scores.red != scores.blue) {
      if (checkTimeVariable == false) {
        checkTimeVariable = true;
        setTimeout(() => {
          checkTimeVariable = false;
        }, 3000);
        scores.red > scores.blue ? endGame(Team.RED) : endGame(Team.BLUE);
        setTimeout(() => {
          room.stopGame();
        }, 2000);
      }
      return;
    }
    goldenGoal = true;
    // room.sendAnnouncement("⚽ Gol de Gold!", null, 0xF1AF09);
    room.sendAnnouncement(centerText("EXTRA TIME"), null, Cor.Amarelo, "bold");
    room.sendAnnouncement(centerText("Added +" + drawTimeLimit * 60 + " seconds!"), null, Cor.White, "normal");
    room.sendAnnouncement(centerText("⚽ First goal wins! ⚽"), null, Cor.White, "normal");
  }
  if (scores.time > scores.timeLimit + drawTimeLimit * 60 - 15 && scores.time <= scores.timeLimit + drawTimeLimit * 60) {
    if (checkTimeVariable == false && announced == false) {
      checkTimeVariable = true;
      announced = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      room.sendAnnouncement(centerText("⌛ 15 seconds to draw!"), null, Cor.Amarelo, "bold");
    }
  }
  if (scores.time > scores.timeLimit + drawTimeLimit * 60) {
    if (checkTimeVariable == false) {
      checkTimeVariable = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      endGame(Team.SPECTATORS);
      room.stopGame();
      goldenGoal = false;
    }
  }
}

function endGame(winner) {
  // lida com o final de um jogo: nenhuma função stopGame dentro
  // players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null; //default - 1
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  lastWinner = winner;
  endGameVariable = true;
  if (winner == Team.RED) {
    streak++;
    room.sendAnnouncement(centerText("🏆 Red team won! | Win Streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else if (winner == Team.BLUE) {
    streak = 1;
    room.sendAnnouncement(centerText("🏆 Blue team won! | Win streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else {
    streak = 0;
    room.sendAnnouncement("💤 ʟɪᴍɪᴛ ʀᴇᴀᴄʜᴇᴅ");
  }
  //room.sendAnnouncement("📊 Posse de Bola: 🔴 " + (Rposs*100).toPrecision(3).toString() + "% | " + (Bposs*100).toPrecision(3).toString() + "% 🔵", null, 0xFDC43A);
  room.sendAnnouncement(centerText("🏆 FULL TIME 🏆"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
  room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  scores.red == 0
    ? scores.blue == 0
      ? room.sendAnnouncement("🥅 " + GKList[0].name + " it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
      : room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
    : scores.blue == 0
    ? room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[0].name + " saved all goals ", null, 0xfdc43a)
    : null;
  updateStats();
}

function loadMap(map, scoreLim, timeLim) {
  if (map != "") {
    room.setCustomStadium(map);
  } else {
    //console.log("There was an error loading the stadium");
    room.setDefaultStadium("Classic");
  }
  room.setScoreLimit(scoreLim);
  room.setTimeLimit(timeLim);
}

function updateTeams() {
  // updates the list of players and the list of all teams
  players = room.getPlayerList().filter((player) => player.id != 0 && !getAFK(player));
  TeamR = players.filter((p) => p.team === Team.RED);
  TeamB = players.filter((p) => p.team === Team.BLUE);
  teamS = players.filter((p) => p.team === Team.SPECTATORS);
}

function handleInactivity() {
  // handles inactivity: players will be kicked after afkLimit
  if (countAFK && TeamR.length + TeamB.length > 1) {
    for (var i = 0; i < TeamR.length; i++) {
      setActivity(TeamR[i], getActivity(TeamR[i]) + 1);
    }
    for (var i = 0; i < TeamB.length; i++) {
      setActivity(TeamB[i], getActivity(TeamB[i]) + 1);
    }
  }
  for (var i = 0; i < extendedP.length; i++) {
    if (extendedP[i][eP.ACT] == 60 * ((2 / 3) * afkLimit)) {
      room.sendAnnouncement("@" + room.getPlayer(extendedP[i][eP.ID]).name + " AFK detected... Move within " + Math.floor(afkLimit / 3) + "s to cancel", extendedP[i][eP.ID], 0xf4a404, "bold", 2);
    }
    if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
      extendedP[i][eP.ACT] = 0;
      if (room.getScores().time <= afkLimit - 0.5) {
        setTimeout(() => {
          !inChooseMode ? quickRestart() : room.stopGame();
        }, 10);
      }
      room.kickPlayer(extendedP[i][eP.ID], "ᴀꜰᴋ", false);
    }
  }
}

function getAuth(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH] : null;
}

function getAFK(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AFK] : null;
}

function setAFK(player, value) {
  extendedP.filter((a) => a[0] == player.id).forEach((player) => (player[eP.AFK] = value));
}

function getActivity(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.ACT] : null;
}

function setActivity(player, value) {
  extendedP.filter((a) => a[0] == player.id).forEach((player) => (player[eP.ACT] = value));
}

function getGK(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.GK] : null;
}

function setGK(player, value) {
  extendedP.filter((a) => a[0] == player.id).forEach((player) => (player[eP.GK] = value));
}

function getMute(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.MUTE] : null;
}

function setMute(player, value) {
  extendedP.filter((a) => a[0] == player.id).forEach((player) => (player[eP.MUTE] = value));
}

/* STATISTICS FUNCTIONS */

function getLastTouchOfTheBall() {
  const ballPosition = room.getBallPosition();
  updateTeams();
  for (var i = 0; i < players.length; i++) {
    if (players[i].position != null) {
      var distanceToBall = pointDistance(players[i].position, ballPosition);
      if (distanceToBall < triggerDistance) {
        !activePlay ? (activePlay = true) : null;
        if (lastTeamTouched == players[i].team && lastPlayersTouched[0] != null && lastPlayersTouched[0].id != players[i].id) {
          lastPlayersTouched[1] = lastPlayersTouched[0];
          lastPlayersTouched[0] = players[i];
        }
        lastTeamTouched = players[i].team;
      }
    }
  }
}

function getStats() {
  // gives possession, ball speed and GK of each team
  if (activePlay) {
    updateTeams();
    lastTeamTouched == Team.RED ? Rposs++ : Bposs++;
    var ballPosition = room.getBallPosition();
    point[1] = point[0];
    point[0] = ballPosition;
    ballSpeed = (pointDistance(point[0], point[1]) * 60 * 60 * 60) / 15000;
    var k = [-1, Infinity];
    for (var i = 0; i < TeamR.length; i++) {
      if (TeamR[i].position.x < k[1]) {
        k[0] = TeamR[i];
        k[1] = TeamR[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    k = [-1, -Infinity];
    for (var i = 0; i < TeamB.length; i++) {
      if (TeamB[i].position.x > k[1]) {
        k[0] = TeamB[i];
        k[1] = TeamB[i].position.x;
      }
    }
    k[0] != -1 ? setGK(k[0], getGK(k[0]) + 1) : null;
    findGK();
  }
}

function updateStats() {
  if (
    players.length >= 2 * maxTeamSize &&
    (game.scores.time >= (5 / 6) * game.scores.timeLimit || game.scores.red == game.scores.scoreLimit || game.scores.blue == game.scores.scoreLimit) &&
    allReds.length >= maxTeamSize &&
    allBlues.length >= maxTeamSize
  ) {
    var stats;
    for (var i = 0; i < allReds.length; i++) {
      localStorage.getItem(getAuth(allReds[i])) ? (stats = JSON.parse(localStorage.getItem(getAuth(allReds[i])))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", allReds[i].name]);
      stats[Ss.GA]++;
      lastWinner == Team.RED ? stats[Ss.WI]++ : lastWinner == Team.BLUE ? stats[Ss.LS]++ : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allReds[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < allBlues.length; i++) {
      localStorage.getItem(getAuth(allBlues[i])) ? (stats = JSON.parse(localStorage.getItem(getAuth(allBlues[i])))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", allBlues[i].name]);
      stats[Ss.GA]++;
      lastWinner == Team.BLUE ? stats[Ss.WI]++ : lastWinner == Team.RED ? stats[Ss.LS]++ : stats[Ss.DR]++;
      stats[Ss.WR] = ((100 * stats[Ss.WI]) / stats[Ss.GA]).toPrecision(3);
      localStorage.setItem(getAuth(allBlues[i]), JSON.stringify(stats));
    }
    for (var i = 0; i < game.goals.length; i++) {
      if (game.goals[i].striker != null) {
        if (allBlues.concat(allReds).findIndex((player) => player.id == game.goals[i].striker.id) != -1) {
          stats = JSON.parse(localStorage.getItem(getAuth(game.goals[i].striker)));
          stats[Ss.GL]++;
          localStorage.setItem(getAuth(game.goals[i].striker), JSON.stringify(stats));
        }
      }
      if (game.goals[i].assist != null) {
        if (allBlues.concat(allReds).findIndex((player) => player.name == game.goals[i].assist.name) != -1) {
          stats = JSON.parse(localStorage.getItem(getAuth(game.goals[i].assist)));
          stats[Ss.AS]++;
          localStorage.setItem(getAuth(game.goals[i].assist), JSON.stringify(stats));
        }
      }
    }
    if (allReds.findIndex((player) => player.id == GKList[0].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[0])));
      stats[Ss.GK]++;
      game.scores.blue == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[0]), JSON.stringify(stats));
    }
    if (allBlues.findIndex((player) => player.id == GKList[1].id) != -1) {
      stats = JSON.parse(localStorage.getItem(getAuth(GKList[1])));
      stats[Ss.GK]++;
      game.scores.red == 0 ? stats[Ss.CS]++ : null;
      stats[Ss.CP] = ((100 * stats[Ss.CS]) / stats[Ss.GK]).toPrecision(3);
      localStorage.setItem(getAuth(GKList[1]), JSON.stringify(stats));
    }
  }
}

function findGK() {
  var tab = [
    [-1, ""],
    [-1, ""],
  ];
  for (var i = 0; i < extendedP.length; i++) {
    if (room.getPlayer(extendedP[i][eP.ID]) != null && room.getPlayer(extendedP[i][eP.ID]).team == Team.RED) {
      if (tab[0][0] < extendedP[i][eP.GK]) {
        tab[0][0] = extendedP[i][eP.GK];
        tab[0][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    } else if (room.getPlayer(extendedP[i][eP.ID]) != null && room.getPlayer(extendedP[i][eP.ID]).team == Team.BLUE) {
      if (tab[1][0] < extendedP[i][eP.GK]) {
        tab[1][0] = extendedP[i][eP.GK];
        tab[1][1] = room.getPlayer(extendedP[i][eP.ID]);
      }
    }
  }
  GKList = [tab[0][1], tab[1][1]];
}

setInterval(() => {
  var tableau = [];
  if (statNumber % 5 == 0) {
    Object.keys(localStorage).forEach(function (key) {
      if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
        tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.GA]]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Matches Played> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 1) {
    Object.keys(localStorage).forEach(function (key) {
      if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
        tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.WI]]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Victories> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 2) {
    Object.keys(localStorage).forEach(function (key) {
      if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
        tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.GL]]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Gols> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 3) {
    Object.keys(localStorage).forEach(function (key) {
      if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
        tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.AS]]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "Assistance> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  if (statNumber % 5 == 4) {
    Object.keys(localStorage).forEach(function (key) {
      if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
        tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.CS]]);
      }
    });
    if (tableau.length < 5) {
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendChat(
      "CS> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1]
    );
  }
  statNumber++;
}, statInterval * 60 * 1000);

/* PLAYER MOVEMENT */

room.onPlayerJoin = function (player) {
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined rs server.\``);
  checkAndKickPlayer(player);
  createPlayer(player);

  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  // updateRoleOnPlayerIn();
  room.sendAnnouncement("👋🏼 ᴡᴇʟᴄᴏᴍᴇ, " + player.name + "!", null, 0x5ee7ff, "bold");
  if (room.getPlayerList().length > 1 && room.getPlayerList().length < 5) {
    room.sendAnnouncement("ʟᴏᴀᴅɪɴɢ ᴛʜᴇ ꜱᴛᴀᴅɪᴜᴍ...", player.id, 0xedc021, "bold");
  }
  if (localStorage.getItem(player.auth) != null) {
    var playerRole = JSON.parse(localStorage.getItem(player.auth))[Ss.RL];
    if (playerRole == "admin" || playerRole == "master") {
      room.setPlayerAdmin(player.id, true);
      room.sendAnnouncement("「ᴀᴅᴍɪɴ」" + player.name + " ᴄᴀᴍᴇ ɪɴᴛᴏ ᴛʜᴇ ʀᴏᴏᴍ!", null, 0xff7900, "normal");
    }
  }
  if (localStorage.getItem(getAuth(player)) == null) {
    stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name];
    localStorage.setItem(getAuth(player), JSON.stringify(stats));
  }
};

function findNextAdmin() {
  var players = room.getPlayerList();
  for (var i = 0; i < players.length; i++) {
    if (!players[i].admin && players[i].id !== 0) {
      return players[i];
    }
  }
  return null; // No suitable player found
}

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {

  if (changedPlayer.id == 0) {
    room.setPlayerTeam(0, Team.SPECTATORS);
    return;
  }
  if (getAFK(changedPlayer) && changedPlayer.team != Team.SPECTATORS) {
    room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
    room.sendChat(changedPlayer.name + " is AFK!");
    return;
  }
  updateTeams();
  if (changedPlayer.team == Team.SPECTATORS) {
    setActivity(changedPlayer, 0);
  }

  if (changedPlayer.team == 0) {
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ꜱᴘᴇᴄᴛᴀᴛᴏʀ", changedPlayer.id, 0xffffff, "normal", 1);
  } else if (changedPlayer.team == 1) {
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ʀᴇᴅ ᴛᴇᴀᴍ", changedPlayer.id, 0xed6a5a, "normal", 1);
  } else if (changedPlayer.team == 2) {
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ʙʟᴜᴇ ᴛᴇᴀᴍ", changedPlayer.id, 0x33dddd, "normal", 1);
  }

};

function isAdminPresent() {
  var players = room.getPlayerList();
  if (players.find((player) => player.admin) != null) {
    return true;
  } else {
    return false;
  }
}

room.onPlayerLeave = function (player) {
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left rs server.\``);
  deletePlayer(player);

  // if (TeamR.findIndex((red) => red.id == player.id) == 0 && inChooseMode && TeamR.length <= TeamB.length) {
  //   choosePlayer();
  //   capLeft = true;
  //   setTimeout(() => {
  //     capLeft = false;
  //   }, 10);
  // }
  // if (TeamB.findIndex((blue) => blue.id == player.id) == 0 && inChooseMode && TeamB.length < TeamR.length) {
  //   choosePlayer();
  //   capLeft = true;
  //   setTimeout(() => {
  //     capLeft = false;
  //   }, 10);
  // }
  // setActivity(player, 0);
  // updateRoleOnPlayerOut();
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
};

/* PLAYER ACTIVITY */

room.onPlayerChat = function (player, message) {
  sendWebhook(chatWebHook, `\`💬 [soccer] ${player.name} [${player.id}]: ${message}\``);
  var players = room.getPlayerList();

  if (message.length > 1 && message[0].toLowerCase() == "t" && message[1] == " ") {
    if (player.team != 0) {
        const teamChatPrefix = player.team == 1 ? "🔴 [ᴛᴇᴀᴍ ᴄʜᴀᴛ] " : "🔵 [ᴛᴇᴀᴍ ᴄʜᴀᴛ] ";
        room.getPlayerList().forEach((element) => {
            if (element.team == player.team) room.sendAnnouncement(teamChatPrefix + player.name + ": " + message.substr(2), element.id, player.team == 1 ? /*16725591*/ 3261685 : 3261685, "bold", 0);
        });
        return false;
    } else {
        room.sendAnnouncement("You're not on a team.", player.id);
        return false;
    }
  }

  /* RSI ANTI SPAM */
  var playerId = player.id;
  var currentTime = Date.now();

  if (lastMessageTime[playerId]) {
    var timeSinceLastMessage = currentTime - lastMessageTime[playerId];
      
        if (lastMessageTime[playerId]) {
        var timeSinceLastMessage = currentTime - lastMessageTime[playerId];

        if (timeSinceLastMessage > cooldownPeriod) {
            messageCounts[playerId] = 0;
        }
        messageCounts[playerId] = (messageCounts[playerId] || 0) + 1;

        if (messageCounts[playerId] > maxMessages) {
          if(player.admin == true){} 
          else {
            room.sendAnnouncement("Spam Alert", playerId, 0x5DDB7E, "normal", 2);
            sendWebhook(spamWebHook, `\`${player.name} [${player.id}] spamming message\``);
            return false; // Block the message
          }
        }
    } else {r
        messageCounts[playerId] = 1;
    }
  }
  // Update the last message time for the player
  lastMessageTime[playerId] = currentTime;


  if(player.admin == true){
    if(room.getScores() != null){
        for(var i=0; i<players.length; i++){
      if(message.startsWith("!freeze")==true){
          if(message === "!freeze " + players[i].name){
        if(players[i].team != 0){
            if(freeze.includes(players[i].name) == false){
          freeze.push(players[i].name);
          getPlayerByID(players[i].id).freezePoint = {x:players[i].position.x,y:players[i].position.y};
          room.setPlayerDiscProperties(players[i].id,{xspeed:0,yspeed:0});
          room.setPlayerAvatar(players[i].id,"☠️");
          room.sendAnnouncement("🧊 " + players[i].name + " was frozen by " + player.name,null,0x00FFFF,"normal",2);
          sendWebhook(playerWebHook, `\`🧊 [soccer] ${players[i].name} was frozen by ${player.name}\``);
            }
            else{
          room.sendAnnouncement("This player is already frozen.",player.id,0xFFFF00,"bold",2);
            }
                          }
        else{
            room.sendAnnouncement("A spectator cannot be frozen.",player.id,0xFFFF00,"bold",2);
        }
                      }
                  }
      else if(message.startsWith("!melt")==true){
          if(message === "!melt " + players[i].name){
        if(players[i].team != 0){
            if(freeze.includes(players[i].name) == true){
          freeze.splice(freeze.indexOf(players[i].name),1);
          getPlayerByID(players[i].id).freezePoint = {x:undefined,y:undefined};
          room.setPlayerAvatar(players[i].id);
          room.sendAnnouncement("♨️ " + players[i].name + " was un-freeze by " + player.name,null,0xFF0000,"normal",2);
            }
            else{
          room.sendAnnouncement("This player is already melt.",player.id,0xFFFF00,"bold",2);
            }
        }
        else{
            room.sendAnnouncement("A spectator cannot be melt.",player.id,0xFFFF00,"bold",2);
        }
          }
    }
              }
      }
  }

  if (message.startsWith("@@")) {
    message = message.substr(2).trim();
    if (message.indexOf(" ") !== -1) {
      let args = message.match(/^(\S+)\s(.*)/).slice(1);

      if (args.length > 1) {
        var pmMsg = args[1];
        var players = room.getPlayerList();
        var pmSent = false;
        players.forEach(function (pmPlayer) {
          if (pmPlayer.name === args[0] || pmPlayer.name === args[0].replace(/_/g, " ")) {
            whisper("[PM > " + pmPlayer.name + "] " + player.name + ": " + pmMsg, player.id, 0xff20ff, "normal", 1);
            whisper("[PM] " + player.name + ": " + pmMsg, pmPlayer.id, 0xff20ff, "normal", 1);
            pmSent = true;
          }
        });
        if (pmSent == false) {
          whisper("Cannot find user '" + args[0] + "'", player.id, 0xff20ff, "normal", 1);
        }
        return false;
      }
    }
  }

  if (message.startsWith("kick #")) {
    if (player.admin) {
      // Extract the player ID from the message, removing the "kick #" prefix
      var playerId = message.substr(6);
  
      // Call the function to kick the player
      var success = kickPlayerById(playerId);
  
      if (!success) {
        room.sendChat("⚠️ Player not found.");
      }
    }
    return false;
  }
  
  // Function to kick a player by ID
  function kickPlayerById(playerId) {
    if (player.admin) {
      var playerToKick = room.getPlayer(playerId);
  
      if (playerToKick !== null) {
        room.kickPlayer(playerToKick.id, "You have been kicked from the room");
        return true; // Player successfully kicked
      } else {
        return false; // Player not found
      }
    } else {
      return false; // Permission denied
    }
  }

  if (message.startsWith("k ") || message.startsWith("K ")) {
    teamKom = message.substring(1).trim();
    if (player.admin) {
      //room.sendAnnouncement("👀 [Komentator]: " + teamKom + "", null, 0x99ffff, "normal", 1);
      room.sendAnnouncement("👀 [Komentator]: " + teamKom + "", null, 0xffffe0, "normal", 1);
      return false;
    } else {
      whisper("⚠️ You don't have permission", player.id);
    }
    return false;
  }


  if (message.startsWith("m ") || message.startsWith("M ")) {
    if (player.admin) {
      teamTalk = message.substring(1).trim();
      announce("" + teamTalk + "");
      return false;
    } else {
      whisper("⚠️ You don't have permission", player.id);
    }
    return false;
  }


  for (let i = 0; i < bannedWords.length; i++) {
    if (message.toLowerCase().includes(bannedWords[i])) {
      // Batalkan pesan yang mengandung kata-kata yang dilarang
      whisper("⚠️ ʙᴀᴅᴡᴏʀᴅ ᴅᴇᴛᴇᴄᴛᴇᴅ !!", player.id);
      sendWebhook(toxicWebHook, `\`[${player.name}] received warn ( Bad Word Detected ) \``);
      return false;
    }
  }
  

  // SOCCER TEAMS //

  if (message == "!bah") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bah";
        room.setTeamColors(Team.RED, 0, 0xffffff, [0x0a4ae8, 0xf20533, 0x0a4ae8]);
        room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform BAHIA! ", null, 0x30f55f, "bold");
      }

      if (message.toLowerCase().substr(0, 10) == "!register ") {
        setRegister(player, message.substr(10));
        return false;
      }

      // !login senha
      if (message.toLowerCase().substr(0, 7) == "!login ") {
        getLogin(player, message.substr(7));
        return false;
      }
      if (message.length > 65) {
        room.sendAnnouncement("", player.id);
        return false;
      }
      messageHistory.push(player.id);
      messageCounter++;
      if (messageCounter === 3) {
        if (messageHistory[messageHistory.length - 1] === player.id && messageHistory[messageHistory.length - 2] === player.id && messageHistory[messageHistory.length - 3] === player.id) {
          room.sendChat("ꜱᴘᴀᴍ ᴀʟᴇʀᴛ.", player.id);
        }
      }
      if (messageCounter === 6) {
        if (
          messageHistory[messageHistory.length - 1] === player.id &&
          messageHistory[messageHistory.length - 2] === player.id &&
          messageHistory[messageHistory.length - 3] === player.id &&
          messageHistory[messageHistory.length - 4] === player.id &&
          messageHistory[messageHistory.length - 5] === player.id &&
          messageHistory[messageHistory.length - 6] === player.id
        ) {
          room.kickPlayer(player.id, "ᴍᴏᴅᴇʀᴀᴛᴇ ʏᴏᴜʀ ᴍᴇꜱꜱᴀɢᴇꜱ", true);
        }
      }
      if (messageHistory[messageHistory.length - 1] !== messageHistory[messageHistory.length - 2]) {
        messageCounter = 1;
      }
      if (player.name === "hitler" && player.name === "hitler") {
        messageCounter = 1;
      }
    }
  }
  messageHistory.push(player.id);
  messageCounter++;
  if (messageCounter === 1545) {
    if (
      messageHistory[messageHistory.length - 1] === player.id &&
      messageHistory[messageHistory.length - 2] === player.id &&
      messageHistory[messageHistory.length - 3] === player.id &&
      messageHistory[messageHistory.length - 4] === player.id
    ) {
      room.sendChat(":)", player.id);
    }
  }
  // ban player if 6 messages are typed in a row (disabled)
  msg = message;
  message = message;
  originalMessage = message;
  message = message.split(/ +/);
  player.team != Team.SPECTATORS ? setActivity(player, 0) : null;
  if (["!help", "!command"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("[📄]ᴄᴏᴍᴍᴀɴᴅꜱ : !ᴅᴄ, !ᴀꜰᴋ, !fixstart, !start, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ] !ɢᴀᴍᴇꜱ, !ᴀꜱꜱɪꜱᴛꜱ", player.id, 0x309d2b, "bold");
    player.admin ? room.sendAnnouncement("[📄] ᴀᴅᴍɪɴ : !ᴍᴜᴛᴇ <ᴅᴜʀᴀᴛɪᴏɴ = 3> #<ɪᴅ>, !ᴜɴᴍᴜᴛᴇ ᴀʟʟ/#<ɪᴅ>, !ᴄʟᴇᴀʀʙᴀɴꜱ <ɴᴜᴍʙᴇʀ = ᴀʟʟ>, !ꜱʟᴏᴡ <ᴅᴜʀᴀᴛɪᴏɴ>, !ᴇɴᴅꜱʟᴏᴡ", player.id, 0x309d2b, "bold") : null;
  }

  if (["!chooseadm"].includes(message[0].toLowerCase())) {
    if (message[1] == "on") {
      room.sendAnnouncement(player.name + " 𝗔𝗰𝘁𝗶𝘃𝗮𝘁𝗲𝗱 𝗿𝗲𝗰𝗿𝘂𝗶𝘁𝗺𝗲𝗻𝘁 𝗺𝗼𝗱𝗲!", null, 0x55bae2, "normal");
      choose = true;
    } else if (message[1] == "off") {
      room.sendAnnouncement(player.name + " 𝗗𝗶𝘀𝗮𝗯𝗹𝗲𝗱 𝗿𝗲𝗰𝗿𝘂𝗶𝘁𝗺𝗲𝗻𝘁 𝗺𝗼𝗱𝗲.", null, 0xf2a000, "normal");
      choose = false;
    }
  } if (["!rank"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Ranks per goal:", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Bronze I - [⚽:2] | Iron II - [⚽:4] | Iron I - [⚽:6] ", player.id, 0xbc5e00, "normal");
    room.sendAnnouncement("Gold II - [⚽:8] | Gold I - [⚽:11] ", player.id, 0xa2a2a2, "normal");
    room.sendAnnouncement("Platinum II - [⚽:14] | Platinum I - [⚽:17]",  player.id, 0xeac274, "normal");
    room.sendAnnouncement("Type '!rank2' to see more", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  }
  if (["!rank2"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Ranks per goal (2 page):", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Diamond III - [⚽:23] | Diamond II - [⚽:27] | Diamond I - [⚽:31]", player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Crown II - [⚽37] | Crown I - [⚽:45]" , player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Last rank: Legend - [⚽:60]", player.id, 0xf77104, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  } else if (["!afk"].includes(message[0].toLowerCase())) {
    if (players.length != 1 && player.team != Team.SPECTATORS) {
      if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
      } else {
        room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴ'ᴛ ɢᴏ ᴀꜰᴋ ᴡʜɪʟᴇ ᴘʟᴀʏɪɴɢ!", player.id, 0xff7b08);
        return false;
      }
    } else if (players.length == 1 && !getAFK(player)) {
      room.setPlayerTeam(player.id, Team.SPECTATORS);
    }
    setAFK(player, !getAFK(player));
    room.sendAnnouncement(player.name + (getAFK(player) ? " ɪꜱ ᴀꜰᴋ!" : " ɪꜱ ɴᴏᴡ ᴏɴʟɪɴᴇ!"), null, getAFK(player) ? 0xff7b08 : 0x8fff8f);
    room.sendAnnouncement((getAFK(player) ? "ᴛʏᴘᴇ !ᴀꜰᴋ ᴛᴏ ʀᴇᴛᴜʀɴ" : ""), player.id, getAFK(player) ? 0xff7b08 : 0x8fff8f);
    getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player"]);
    setTimeout(() => {
      if (getAFK(player) && stats[Ss.RL] != "vip") {
        room.kickPlayer(player.id, "𝗔𝗙𝗞 𝘁𝗶𝗺𝗲𝗼𝘂𝘁", false);
      }
    }, 30 * 60 * 1000);
    return false;
  } else if (["!afks", "!afklist"].includes(message[0].toLowerCase())) {
    var cstm = "[RSI] AFK List : ";
    for (var i = 0; i < extendedP.length; i++) {
      if (room.getPlayer(extendedP[i][eP.ID]) != null && getAFK(room.getPlayer(extendedP[i][eP.ID]))) {
        if (140 - cstm.length < (room.getPlayer(extendedP[i][eP.ID]).name + ", ").length) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm += room.getPlayer(extendedP[i][eP.ID]).name + ", ";
      }
    }
    if (cstm == "[RSI] LAFK List: ") {
      room.sendChat("[RSI] There is no one on the AFK list!", player.id);
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!stats", "!me"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    room.sendAnnouncement(
      "[📄] Stats from " +
        player.name +
        ": 🎮 Matches played: " +
        stats[Ss.GA] +
        ", ✅ Win: " +
        stats[Ss.WI] +
        ", ❌ Lose: " +
        stats[Ss.LS] +
        ", WR: " +
        stats[Ss.WR] +
        "%, ⚽️ Goals: " +
        stats[Ss.GL] +
        ", 👟 Assist: " +
        stats[Ss.AS] +
        ", 🤚 GK: " +
        stats[Ss.GK] +
        ", 🤚 Cleansheet: " +
        stats[Ss.CS] +
        ", 🤚 CS%: " +
        stats[Ss.CP] +
        "%",
      player.id,
      0x73ec59,
      "bold"
    );
    sendWebhook(statsWebHook, `\`📊 [stats rs] ${player.name} [play:${stats[Ss.GA]}x] [wr:${stats[Ss.WR]}%] [win:${stats[Ss.WI]}] [loss:${stats[Ss.LS]}] [goal:${stats[Ss.GL]}] [assist:${stats[Ss.AS]}] [gk:${stats[Ss.GK]}] [cleansheet:${stats[Ss.CP]}%] \``);
    room.sendAnnouncement("「👓」 This message only you can see, if you want to show your stats, use the command '!showme'!", player.id, 0xff7900, "bold");
  } else if (["!showme"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    //room.sendAnnouncement("[📄] The player " + player.name + " looking for his stats", null, 0xff7900, "normal");
    room.sendAnnouncement("[📄] " + player.name + " show his stats !", player.id, 0xff7900, "normal");
    room.sendAnnouncement(
      "[📄] Stats from " +
        player.name +
        ": 🎮 Matches played: " +
        stats[Ss.GA] +
        ", ✅ Win: " +
        stats[Ss.WI] +
        ", ❌ Lose: " +
        stats[Ss.LS] +
        ", WR: " +
        stats[Ss.WR] +
        "%, ⚽️ Goals: " +
        stats[Ss.GL] +
        ", 👟 Assist: " +
        stats[Ss.AS] +
        ", 🤚 GK: " +
        stats[Ss.GK] +
        ", 🤚 Cleansheet: " +
        stats[Ss.CS] +
        ", 🤚 CS%: " +
        stats[Ss.CP] +
        "%",
      null,
      0x73ec59,
      "normal"
    );
    sendWebhook(statsWebHook, `\`📊 [stats rs] ${player.name} [play:${stats[Ss.GA]}x] [wr:${stats[Ss.WR]}%] [win:${stats[Ss.WI]}] [loss:${stats[Ss.LS]}] [goal:${stats[Ss.GL]}] [assist:${stats[Ss.AS]}] [gk:${stats[Ss.GK]}] [cleansheet:${stats[Ss.CP]}%] \``);
  } else if (["!games"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.GA]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[ʀꜱɪ] ᴅɪᴅɴ'ᴛ ᴘʟᴀʏ ᴇɴᴏᴜɢʜ ɢᴀᴍᴇꜱ", player.id, 0xff0000);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 🎮 Matches Played> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!wins"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.WI]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[ʀꜱɪ] ᴅɪᴅɴ'ᴛ ᴘʟᴀʏ ᴇɴᴏᴜɢʜ ɢᴀᴍᴇꜱ", player.id, 0x73ec59);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ✅ Victories> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!goats"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key) && JSON.parse(localStorage.getItem(key))[Ss.WI] > 400) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.WI]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[ʀꜱɪ] ᴅɪᴅɴ'ᴛ ᴘʟᴀʏ ᴇɴᴏᴜɢʜ ɢᴀᴍᴇꜱ", player.id, 0x73ec59);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ✅ GOATS> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!goals"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.GL]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[📄] Didn't play enough games", player.id, 0x73ec59);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] ⚽️ Goals> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!assists"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.AS]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[ʀꜱɪ] ᴅɪᴅɴ'ᴛ ᴘʟᴀʏ ᴇɴᴏᴜɢʜ ɢᴀᴍᴇꜱ", player.id);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 👟 Assists> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!winstreak"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.CS]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[ʀꜱɪ] ʏᴏᴜ ᴅɪᴅɴ'ᴛ ᴘʟᴀʏ ᴇɴᴏᴜɢʜ ɢᴀᴍᴇꜱ", player.id, 0x73ec59);
      return false;
    }
    tableau.sort(function (a, b) {
      return b[1] - a[1];
    });
    room.sendAnnouncement(
      "[📄] 🤚 Undefeated matches> #1 " +
        tableau[0][0] +
        ": " +
        tableau[0][1] +
        " #2 " +
        tableau[1][0] +
        ": " +
        tableau[1][1] +
        " #3 " +
        tableau[2][0] +
        ": " +
        tableau[2][1] +
        " #4 " +
        tableau[3][0] +
        ": " +
        tableau[3][1] +
        " #5 " +
        tableau[4][0] +
        ": " +
        tableau[4][1],
      player.id,
      0x73ec59
    );

    return false;
  } else if (["!adm"].includes(message[0].toLowerCase())) {
    if (message[1] == adminPassword) {
      room.setPlayerAdmin(player.id, true);
      var stats;
      localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name]);
      if (stats[Ss.RL] != "master") {
        stats[Ss.RL] = "master";
        room.sendAnnouncement(player.name + " ʟᴏɢɢᴇᴅ ɪɴ ᴀꜱ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", null, 0xff7900, 2);
        localStorage.setItem(getAuth(player), JSON.stringify(stats));
      }
    }
  } else if (["!mutes", "!mutelist"].includes(message[0].toLowerCase())) {
    var cstm = "[RSI] List of muteds: ";
    for (var i = 0; i < extendedP.length; i++) {
      if (room.getPlayer(extendedP[i][eP.ID]) != null && getMute(room.getPlayer(extendedP[i][eP.ID]))) {
        if (140 - cstm.length < (room.getPlayer(extendedP[i][eP.ID]).name + "[" + extendedP[i][eP.ID] + "], ").length) {
          room.sendChat(cstm, player.id);
          cstm = "... ";
        }
        cstm += room.getPlayer(extendedP[i][eP.ID]).name + "[" + extendedP[i][eP.ID] + "], ";
      }
    }
    if (cstm == "[RSI] List of muteds: ") {
      room.sendChat("[RSI] There is no one on the mutated list!", player.id);
      return false;
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!mute"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      updateTeams();
      var timeOut;
      if (!Number.isNaN(Number.parseInt(message[1])) && message.length > 1) {
        if (Number.parseInt(message[1]) > 0) {
          timeOut = Number.parseInt(message[1]) * 60 * 1000;
        } else {
          timeOut = 3 * 60 * 1000;
        }
        if (message[2].length > 1 && message[2][0] == "#") {
          message[2] = message[2].substring(1, message[2].length);
          if (!Number.isNaN(Number.parseInt(message[2])) && room.getPlayer(Number.parseInt(message[2])) != null) {
            if (room.getPlayer(Number.parseInt(message[2])).admin || getMute(room.getPlayer(Number.parseInt(message[2])))) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              timeOut,
              room.getPlayer(Number.parseInt(message[2]))
            );
            setMute(room.getPlayer(Number.parseInt(message[2])), true);
            room.sendChat(room.getPlayer(Number.parseInt(message[2])).name + " was muted for " + timeOut / 60000 + " minutes!");
            sendWebhook(playerWebHook, `\`💬 [soccer] ${room.getPlayer(Number.parseInt(message[2])).name} was muted for ${timeOut / 60000} minutes by ${player.name}\``);
          }
        }
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null) {
            if (room.getPlayer(Number.parseInt(message[1])).admin || getMute(room.getPlayer(Number.parseInt(message[1])))) {
              return false;
            }
            setTimeout(
              function (player) {
                setMute(player, false);
              },
              3 * 60 * 1000,
              room.getPlayer(Number.parseInt(message[1]))
            );
            setMute(room.getPlayer(Number.parseInt(message[1])), true);
            room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " was muted for 3 minutes!");
            sendWebhook(playerWebHook, `\`💬 [soccer] ${room.getPlayer(Number.parseInt(message[1])).name} was muted for 3 minutes by ${player.name}\``);
          }
        }
      }
    }
  } else if (["!unmute"].includes(message[0].toLowerCase())) {
    if (player.admin && message.length >= 2) {
      if (message[1] == "all") {
        extendedP.forEach((ePlayer) => {
          ePlayer[eP.MUTE] = false;
        });
        room.sendChat("All were demutated");
      } else if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
        setMute(room.getPlayer(Number.parseInt(message[1])), false);
        room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " has been unmuted!");
      } else if (Number.isNaN(Number.parseInt(message[1]))) {
        if (message[1].length > 1 && message[1][0] == "#") {
          message[1] = message[1].substring(1, message[1].length);
          if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
            setMute(room.getPlayer(Number.parseInt(message[1])), false);
            room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " has been unmuted!");
          }
        }
      }
    }
  } else if (["!mutenon"].includes(message[0].toLowerCase())) {
    updateTeams();
    var timeOut;
    if (!Number.isNaN(Number.parseInt(message[1])) && message.length > 1) {
      if (Number.parseInt(message[1]) > 0) {
        timeOut = Number.parseInt(message[1]) * 60 * 1000;
      } else {
        timeOut = 3 * 60 * 1000;
      }
      if (message[2].length > 1 && message[2][0] == "#") {
        message[2] = message[2].substring(1, message[2].length);
        if (!Number.isNaN(Number.parseInt(message[2])) && room.getPlayer(Number.parseInt(message[2])) != null) {
          if (room.getPlayer(Number.parseInt(message[2])).admin || getMute(room.getPlayer(Number.parseInt(message[2])))) {
            return false;
          }
          setTimeout(
            function (player) {
              setMute(player, false);
            },
            timeOut,
            room.getPlayer(Number.parseInt(message[2]))
          );
          setMute(room.getPlayer(Number.parseInt(message[2])), true);
          room.sendChat(room.getPlayer(Number.parseInt(message[2])).name + " was muted for " + timeOut / 60000 + " minutes!");
        }
      }
    } else if (Number.isNaN(Number.parseInt(message[1]))) {
      if (message[1].length > 1 && message[1][0] == "#") {
        message[1] = message[1].substring(1, message[1].length);
        if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null) {
          if (room.getPlayer(Number.parseInt(message[1])).admin || getMute(room.getPlayer(Number.parseInt(message[1])))) {
            return false;
          }
          setTimeout(
            function (player) {
              setMute(player, false);
            },
            3 * 60 * 1000,
            room.getPlayer(Number.parseInt(message[1]))
          );
          setMute(room.getPlayer(Number.parseInt(message[1])), true);
          room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " was muted for 3 minutes!");
        }
      }
    }
} else if (["!unmutenon"].includes(message[0].toLowerCase())) {
    if (message[1] == "all") {
      extendedP.forEach((ePlayer) => {
        ePlayer[eP.MUTE] = false;
      });
      room.sendChat("All were demutated");
    } else if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
      setMute(room.getPlayer(Number.parseInt(message[1])), false);
      room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " has been unmuted!");
    } else if (Number.isNaN(Number.parseInt(message[1]))) {
      if (message[1].length > 1 && message[1][0] == "#") {
        message[1] = message[1].substring(1, message[1].length);
        if (!Number.isNaN(Number.parseInt(message[1])) && room.getPlayer(Number.parseInt(message[1])) != null && getMute(room.getPlayer(Number.parseInt(message[1])))) {
          setMute(room.getPlayer(Number.parseInt(message[1])), false);
          room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " has been unmuted!");
        }
      }
    }
} else if (["!banlist", "!bans"].includes(message[0].toLowerCase())) {
    if (banList.length == 0) {
      room.sendChat("[RSI] There is no one on the banned list!", player.id);
      return false;
    }
    var cstm = "[RSI] Banned list: ";
    for (var i = 0; i < banList.length; i++) {
      if (140 - cstm.length < (banList[i][0] + "[" + banList[i][1] + "], ").length) {
        room.sendChat(cstm, player.id);
        cstm = "... ";
      }
      cstm += banList[i][0] + "[" + banList[i][1] + "], ";
    }
    cstm = cstm.substring(0, cstm.length - 2);
    cstm += ".";
    room.sendChat(cstm, player.id);
  } else if (["!clearbans"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (message.length == 1) {
        room.clearBans();
        room.sendChat("All Bans removed!");
        banList = [];
      }
      if (message.length == 2) {
        if (!Number.isNaN(Number.parseInt(message[1]))) {
          if (Number.parseInt(message[1]) > 0) {
            ID = Number.parseInt(message[1]);
            room.clearBan(ID);
            if (banList.length != banList.filter((array) => array[1] != ID)) {
              room.sendChat(banList.filter((array) => array[1] == ID)[0][0] + " has been banned from the host!");
            }
            setTimeout(() => {
              banList = banList.filter((array) => array[1] != ID);
            }, 20);
          }
        }
      }
    }
  } else if (["!bb", "!bye", "!gn"].includes(message[0].toLowerCase())) {
    room.kickPlayer(player.id, "👋 (leave) Until later!", false);
  } else if (["!setpassword"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        room.setPassword(args[1]);
        roomPassword = args[1];
        announce("Password room diubah oleh: " + player.name);
      } else {
        whisper("Only Super Admins can change password", player.id);
      }
  } else if (["!clearpassword"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setPassword(null);
      roomPassword = null;
      announce("Password dibersihkan oleh " + player.name);
    } else {
      whisper("Only Super Admins can clear password", player.id);
    }
  } else if (["!start", "!fixstart"].includes(message[0].toLowerCase())) {
    if (room.getScores() == null) {
      room.startGame();
    } else {
      whisper("Cannot start while game in progress", player.id);
    }
  } else if (["!reminder"].includes(message[0].toLowerCase())) {
    announce("ʀᴇᴍɪɴᴅᴇʀ: ᴍᴀɪɴ ᴘᴀꜱꜱɪɴɢ ᴘᴇɴᴅᴇᴋ, ᴊᴀɢᴀ ᴘᴏꜱɪꜱɪ, ᴊᴀɴɢᴀɴ ɴɢᴇᴊᴀʀ ʙᴏʟᴀ ᴍᴜʟᴜ ʙɪᴀʀ ʀᴀᴘɪʜ");
  } else if (["!map"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("List Map RSI : Real Soccer [!rsmap], Futsal [!futsalmap], 1v1 [!winkymap]", player.id, 0xffffff, "normal");
  } else if (["!milanred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0xf50000, 0x000000, 0xff0000]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʀᴇᴅ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ᴀᴄ ᴍɪʟᴀɴ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!milanblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0xf50000, 0x000000, 0xff0000]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʙʟᴜᴇ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ᴀᴄ ᴍɪʟᴀɴ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!interred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0x2526f5, 0x000000, 0x2526f5]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʀᴇᴅ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ɪɴᴛᴇʀ ᴍɪʟᴀɴ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!interblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x2526f5, 0x000000, 0x2526f5]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʙʟᴜᴇ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ɪɴᴛᴇʀ ᴍɪʟᴀɴ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!livred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xd10000]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʀᴇᴅ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ʟɪᴠᴇʀᴘᴏᴏʟ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!levred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(1, 90, 0xFFFFFF, [0x0D0000, 0xD80000, 0x0D0000])
      room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʀᴇᴅ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [Bayer Leverkusen]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    } 
  } else if (["!levblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 90, 0xFFFFFF, [0x0D0000, 0xD80000, 0x0D0000])
      room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʙʟᴜᴇ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [Bayer Leverkusen]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
  } else if (["!cheblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x040099]);
        room.sendAnnouncement("ᴛʜᴇ ᴄᴀᴘᴛᴀɪɴ ᴏꜰ ᴛʜᴇ ʙʟᴜᴇ ᴛᴇᴀᴍ, ᴄʜᴏꜱᴇ ᴛʜᴇ ᴜɴɪꜰᴏʀᴍ [ᴄʜᴇʟꜱᴇᴀ]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!porred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 132, 0xffffff, [0x1fa303, 0xfc0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Portugal]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!argblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0x000000, [0x2a74d1, 0xfcfcfc, 0x2a74d1]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Argentina]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!belred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xd19e1f, [0x151619, 0x990011, 0x990011]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Belgium]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!belblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 90, 0xd19e1f, [0x151619, 0x990011, 0x990011]);
      room.sendAnnouncement("The captain of the blue team, chose the uniform [Belgium]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
  } else if (["!gerred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(1, 90, 0xffffff, [0x121003, 0xc70000, 0xf5c600]);
      room.sendAnnouncement("The captain of the red team, chose the uniform [Germany]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
  } else if (["!gerblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 90, 0xffffff, [0x121003, 0xc70000, 0xf5c600]);
      room.sendAnnouncement("The captain of the blue team, chose the uniform [Germany]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
  } else if (["!nedred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xff5f05]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Netherlands]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!nedblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xffffff, [0xff5f05]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Netherlands]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!brared"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0x000000, [0xffee1c, 0x1fd111]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Brazil]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!brablue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0x000000, [0xffee1c, 0x1fd111]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Brazil]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!barred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0xffffff, [0xff0000, 0x3228d1, 0xff0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Barca]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!madblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0x000000, [0xffffff]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Madrid]!", null, 0x30f55f, "normal");
      } else {
        whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
      }
  } else if (["!espred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(1, 90, 0xfeea67, [0xff3136]);
      room.sendAnnouncement("The captain of the red team, chose the uniform [Espana]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
} else if (["!espblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 90, 0xfeea67, [0xff3136]);
      room.sendAnnouncement("The captain of the blue team, chose the uniform [Espana]!", null, 0x30f55f, "normal");
    } else {
      whisper("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴛᴇᴀᴍ ᴄᴀᴘᴛᴀɪɴ", player.id);
    }
} else if (["!powershot", "!ps"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        if (powerShotMode == false) {
          powerShotMode = true;
          announce("" + player.name + " ʜᴀꜱ ᴇɴᴀʙʟᴇ ᴛʜᴇ ᴘᴏᴡᴇʀꜱʜᴏᴛ", null, 0x00ff00);
        } else {
          powerShotMode = false;
          announce("" + player.name + " ʜᴀꜱ ᴅɪꜱᴀʙʟᴇ ᴛʜᴇ ᴘᴏᴡᴇʀꜱʜᴏᴛ", null, 0xff0000);
        }
      } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
      }
  } else if (["!rsmap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        room.stopGame();
        loadMap(practiceMap);
        room.startGame();
      } else {
        if (room.getScores() == null) {
          loadMap(practiceMap);
        } else {
          whisper("ᴄᴀɴɴᴏᴛ ᴄʜᴀɴɢᴇ ᴍᴀᴘ ᴡʜɪʟᴇ ɢᴀᴍᴇ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ", player.id);
        }
      }
  } else if (["!premap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        room.stopGame();
        loadMap(preMap);
        room.startGame();
      } else {
        if (room.getScores() == null) {
          loadMap(preMap);
        } else {
          whisper("ᴄᴀɴɴᴏᴛ ᴄʜᴀɴɢᴇ ᴍᴀᴘ ᴡʜɪʟᴇ ɢᴀᴍᴇ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ", player.id);
        }
      }
  } else if (["!citred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 1130, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!citblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -1130, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!hideball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { color: -1, radius:"0" });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!showball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { radius:"9.6", invMass : "0.9", color: "0xFFFFFF", bounciness : "0.8", damping : "0.9888" });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!freezeball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        var players = room.getPlayerList();
        for (var i = 0; i < players.length; i++) {
            room.setDiscProperties(players[i].id, { invMass: "0" });
        }
    } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
} else if (["!meltball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        var players = room.getPlayerList();
        for (var i = 0; i < players.length; i++) {
            room.setDiscProperties(players[i].id, { invMass: "1.06" });
        }
    } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
} else if (["!winmap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        room.stopGame();
        loadMap(winMap);
        room.startGame();
      } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
      }
  } else if (["!gkkred"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setDiscProperties(3, { x: -1060, y: 0, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "redGK";
          game.rsTimer = 0;
          game.rsReady = true;
          game.rsGoalKick = true;
          game.rsSwingTimer = 0;
          game.boosterCount = 0;
          game.boosterState = false;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -1060, y: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
        });
        sleep(3000).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
      }
  } else if (["!gkkblue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setDiscProperties(3, { x: 1060, y: 0, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "blueGK";
          game.rsTimer = 0;
          game.rsReady = true;
          game.rsGoalKick = true;
          game.rsSwingTimer = 0;
          game.boosterCount = 0;
          game.boosterState = false;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 1060, y: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
        });
        sleep(3000).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
      }
  } else if (["!corred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 1092, y: 414 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
} else if (["!uni"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, 0xffff17, "normal");
      room.sendAnnouncement("ꜰᴏᴏᴛʙᴀʟʟ ᴛᴇᴀᴍꜱ:", player.id, 0xffff17, "normal");
      room.sendAnnouncement("Brazil [!brared/brablue], Argentina [!argred/argblue], Spain [!espred/espblue], Portugal [!porred/porblue], Indo [!indred/indblue], Netherlands [!nedred/nedblue]", player.id, 0xffffff, "normal");
      room.sendAnnouncement(
        "Chelsea [!chered/cheblue], Mufc (!munred/munblue), City [!mcired/mciblue], Leverkusen [!levred/levblue], Liverpool [!livred/livblue],  [!madred/madblue, Barca [!barred/barblue, Juventus [!juvred/juvblue]",
        player.id,
        0xffffff,
        "normal"
      );
      room.sendAnnouncement("_______________________________________", player.id, 0xffff17, "bold");
  } else if (["!dc", "!disc", "!discord"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ", null, 0x9250fd, "bold");
    room.sendAnnouncement("                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ", null, 0x8466fd, "bold");
    room.sendAnnouncement("                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ", null, 0x7b73fd, "bold");
    room.sendAnnouncement("                                        💬 𝗗𝗶𝘀𝗰𝗼𝗿𝗱 𝗟𝗶𝗻𝗸: ➡ 𝗱𝗶𝘀𝗰𝗼𝗿𝗱.𝗴𝗴/𝗽𝗺𝟱𝟱𝘁𝗩𝘀𝗤𝗠𝗫 / ⬅", null, 0xf6ff43, "bold");
  }

  if (link.includes(message[0])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[1])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[2])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[3])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[4])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[5])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[6])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[7])) {
    room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴɴᴏᴛ ꜱᴇɴᴅ ʟɪɴᴋꜱ ʜᴇʀᴇ, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (message[0][0] == "!") {
    // the command used in the chat does not appear
    return false;
  }

  if (getMute(player)) {
    room.sendChat("You are muted", player.id);
    return false;
  }
  if (slowMode > 0) {
    if (!player.admin) {
      if (!SMSet.has(player.id)) {
        SMSet.add(player.id);
        setTimeout(
          (number) => {
            SMSet.delete(number);
          },
          slowMode * 1000,
          player.id
        );
      } else {
        return false;
      }
    }
  }
  if (localStorage.getItem(getAuth(player))) {
    stats = JSON.parse(localStorage.getItem(getAuth(player)));
    var announcement = "";
    var chatColor = "";

    if (stats[Ss.GL] > 500) {
      announcement += "[👑] - [⚽: " + stats[Ss.GL] + "]  ·「The Legend of x3」";
      chatColor = "0xf77104";
    } else if (player.admin == true) {
      announcement += "[💠admin] ";
      chatColor = "0x99ffff";
    } else {
      announcement += "[💠player] "; //chat user dan admin
      chatColor = "0xEDEDED";
    }

    announcement += player.name + ":  " + originalMessage;
    room.sendAnnouncement(announcement, null, chatColor);
    return false;
  } else {
    room.sendAnnouncement(`❌ ${player.name}: ${originalMessage}`, null, 0xabaea7);
    return false;
  }
};

room.onPlayerActivity = function (player) {
  setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
   game.rsTouchTeam = player.team;
   game.updateLastKicker(player.id, player.name, player.team);
  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }
  //=========== POWERSHOT CODE ===========
  if (powerShotMode == true) {
    if (game.powershotCounter > 100) {
      room.setDiscProperties(0, { xgravity: -room.getPlayerDiscProperties(player.id).yspeed / 30, ygravity: -room.getPlayerDiscProperties(player.id).yspeed / 30 });
      game.rsSwingTimer = 50;
      room.sendAnnouncement("POWERSHOT LAUNCHED", game.powershotID, 0x33dd33, "small-bold", 1);
      room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: "+ player.name +" Shooting", null, 0xffffe0, "normal");
      sendWebhook(fieldWebHook, `\`${player.name} Shooting the ball\``);
      room.setPlayerAvatar(game.powershotID, null);
      room.setDiscProperties(0, { color: "0xFFFFFF" });
    }
    game.powershotCounter = 0;
    game.powershotID = 0;
    game.powershotTrigger = false;
    if (parseFloat(room.getDiscProperties(0).invMass.toFixed(2)) != 1.05) {
      room.setDiscProperties(0, { invMass: 1.05 });
    }
  }
  //=========== POWERSHOT CODE ===========

  if (game.rsReady == true) {
    var players = room.getPlayerList().filter((player) => player.team != 0);
    players.forEach(function (player) {
      if (room.getPlayerDiscProperties(player.id).invMass.toFixed(1) != 0.3) {
        room.setPlayerDiscProperties(player.id, { invMass: 0.3 });
      }
    });
  }

  if (game.rsActive == false && game.rsReady == true && (game.rsCorner == true || game.rsGoalKick == true)) {
    // make game active on kick from CK/GK
    game.boosterState = true;

    game.rsActive = true;
    game.rsReady = false;
    room.setDiscProperties(1, { x: 2000, y: 2000 });
    room.setDiscProperties(2, { x: 2000, y: 2000 });
    room.setDiscProperties(0, { color: "0xffffff" });
    game.rsTimer = 1000000;
    game.warningCount++;

    // set gravity for real soccer corners/goalkicks
    if (game.rsCorner == true) {
      room.setDiscProperties(0, { xgravity: (room.getPlayerDiscProperties(player.id).xspeed / 16) * -1, ygravity: (room.getPlayerDiscProperties(player.id).yspeed / 16) * -1 });  //default 16
    }
    if (game.rsGoalKick == true) {
      room.setDiscProperties(0, { xgravity: 0, ygravity: (room.getPlayerDiscProperties(player.id).yspeed / 20) * -1 });  //default 20
    }

    game.rsCorner = false;
    game.rsGoalKick = false;
    game.outStatus = "";
  }

  if (game.rsActive == false && (game.outStatus == "redThrow" || game.outStatus == "blueThrow")) {
    game.outStatus = "";
    game.rsActive = true;
    game.rsReady = false;
    room.setDiscProperties(0, { color: "0xffffff" });
    game.rsTimer = 1000000;
    game.warningCount++;
  }
};

/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  room.setDiscProperties(0, { invMass: 1.05 });
  game = new Game(Date.now(), room.getScores(), []);
  countAFK = true;
  activePlay = false;
  goldenGoal = false;
  endGameVariable = false;
  lastPlayersTouched = [null, null];
  Rposs = 0;
  Bposs = 0;
  GKList = [];
  allReds = [];
  allBlues = [];

  room.sendAnnouncement(centerText("🥅 KICK OFF 🥅"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0x2ef55d, "bold");
  room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  room.startRecording();
  sendWebhook(startWebHook, `\`⚽ 𝙆𝙄𝘾𝙆 𝙊𝙁𝙁 !! ⚽\` - Game duration \`${gameTime} minutes\``);
    
  if(freeze.length > 0){
    freeze = [];
  }

};

room.onGameStop = function (byPlayer) {
 
  sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\` **Possesion: ** \`[RED] ${(Rposs * 100).toPrecision(3).toString()}%\`  | possession |  \`[BLUE] ${(Bposs * 100).toPrecision(3).toString()}%\``)
  sendDiscordRecording();
  whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
  if(freeze.length > 0){
    freeze = [];
  }
};

room.onGameUnpause = function (byPlayer) {
  // if ((TeamR.length == 4 && TeamB.length == 4 && inChooseMode) || (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)) {
  //   deactivateChooseMode();
  // }
};

room.onTeamGoal = function (team) {
  let goalTime = secondsToMinutes(Math.floor(room.getScores().time));
  game.rsActive = false;
  teamgoaler = team;
  let assistencia = "";
  let goleador = "";
  let goalMaker = lastPlayersTouched[0].id;
  activePlay = false;
  countAFK = false;
  const scores = room.getScores();
  game.scores = scores;
  if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
     
      announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " ( 🅰️ Assist: " + lastPlayersTouched[1].name + " ) 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      avatarCelebration(goalMaker, "⚽", "🎯");
      
      sendWebhook(goalWebHook, `\`[GOALL RS]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      avatarCelebration(goalMaker, "⚽", "🎯");

      sendWebhook(goalWebHook, `\`[GOALL RS]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      avatarCelebration(goalAssist, "🤝", "👟");

    }
  } else {
    room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: 🤦‍♂️ I'm sure it was unintentional, right!! 🤦‍♂️", null, 0xffffe0, "normal");
    announce("[OWN GOAL] ☠️ Scorer: " + lastPlayersTouched[0].name + " 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
    sendWebhook(goalWebHook, `\`[OWN-GOAL RS]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
    game.goals.push(new Goal(scores.time, team, null, null));
    avatarCelebration(goalMaker, "🤦‍♂️", "🤡");

    // golcontra(lastPlayersTouched[0]);
  }

  if (scores.scoreLimit != 0 && (scores.red == scores.scoreLimit || (scores.blue == scores.scoreLimit && scores.blue > 0) || goldenGoal == true)) {
    endGame(team);
    goldenGoal = false;
    setTimeout(() => {
      room.stopGame();
    }, 1000);
  }
};

async function avatarCelebration(playerId, avatar1, avatar2) {
  const intervals = [200, 400, 600, 800, 1000, 1200, 1400, 1600];

  for (let i = 0; i < intervals.length; i++) {
    await sleep(intervals[i]);
    if (i % 2 === 0) {
      room.setPlayerAvatar(playerId, avatar1);
    } else {
      room.setPlayerAvatar(playerId, avatar2);
    }
  }
  room.setPlayerAvatar(playerId, null);
}

room.onPositionsReset = function () {
  countAFK = true;
  lastPlayersTouched = [null, null];
  if (game.lastPlayAnnounced == true) {
    room.stopGame(true);
    game.lastPlayAnnounced = false;
    announce("⚽ FULL TIME ⚽");
    announce("⚽ FULL TIME ⚽");
    sendDiscordRecording();
    whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
    sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
  }
};

/* SEVERAL */

room.onRoomLink = function (url) {};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  if (getMute(changedPlayer) && changedPlayer.admin) {
    room.sendChat(changedPlayer.name + " was unmuted.");
    setMute(changedPlayer, false);
  }
  // if (byPlayer.id != 0 && localStorage.getItem(getAuth(byPlayer)) && JSON.parse(localStorage.getItem(getAuth(byPlayer)))[Ss.RL] == "admin") {
  //   room.sendChat("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ ᴛᴏ ᴀᴘᴘᴏɪɴᴛ ᴀ ᴘʟᴀʏᴇʀ ᴀꜱ ᴀɴ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", byPlayer.id);
  //   room.setPlayerAdmin(changedPlayer.id, false);
  // }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {};

room.onGameTick = function () {
  updateGameStatus();
  handleBallTouch();
  realSoccerRef();
  checkTime();
  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
  handleFrozenPlayerMoves();
};


function realSoccerRef() {
  blockThrowIn();
  blockGoalKick();
  removeBlock();
  // if (game.time == gameTime * 60 && game.extraTimeAnnounced == false) {
  //   extraTime();
  //   game.extraTimeAnnounced = true;
  // }

  // if (game.time == game.extraTimeEnd && game.lastPlayAnnounced == false) {
  //   announce("Peluang Terakhir", null, null, null, 1);
  //   game.lastPlayAnnounced = true;
  // }

  if (game.rsCorner == true || game.rsGoalKick == true) {
    //add extra time
    game.extraTimeCount++;
  }

  if (game.rsTimer < 99999 && game.paused == false && game.rsActive == false && game.rsReady == true) {
    game.rsTimer++;
  }

  if (game.rsSwingTimer < 150 && game.rsCorner == false && game.rsGoalKick == false) {
    game.rsSwingTimer++;
    if (game.rsSwingTimer > 5) {
      room.setDiscProperties(0, { xgravity: room.getDiscProperties(0).xgravity * 0.97, ygravity: room.getDiscProperties(0).ygravity * 0.97 });
    }
    if (game.rsSwingTimer == 150) {
      room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
    }
  }

  if (game.boosterState == true) {
    game.boosterCount++;
  }

  if (game.boosterCount > 30) {
    game.boosterState = false;
    game.boosterCount = 0;
    room.setDiscProperties(0, { cMask: 63 });
  }

  if (room.getBallPosition().x == 0 && room.getBallPosition().y == 0) {
    game.rsActive = true;
    game.outStatus = "";
  }

  if (game.rsActive == false && game.rsReady == true) {
    //expire barrier time
    if (game.outStatus == "redThrow") {
      if (game.rsTimer == throwTimeOut - 120) {
        // warning indicator
        ballWarning("0xff3f34", ++game.warningCount);
      }
      if (game.rsTimer == throwTimeOut && game.bringThrowBack == false) {
        // switch to blue throw
        game.outStatus = "blueThrow";
        game.rsTimer = 0;
        room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        sleep(100).then(() => {
          room.setDiscProperties(0, { color: "0x0fbcf9", xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY });
        });
      }
    } else if (game.outStatus == "blueThrow") {
      if (game.rsTimer == throwTimeOut - 120) {
        // warning indicator
        ballWarning("0x0fbcf9", ++game.warningCount);
      }
      if (game.rsTimer == throwTimeOut && game.bringThrowBack == false) {
        // switch to red throw
        game.outStatus = "redThrow";
        game.rsTimer = 0;
        room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        sleep(100).then(() => {
          room.setDiscProperties(0, { color: "0xff3f34", xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY });
        });
      }
    } else if (game.outStatus == "blueGK" || game.outStatus == "redGK") {
      if (game.rsTimer == gkTimeOut - 120) {
        // warning indicator
        if (game.outStatus == "blueGK") {
          ballWarning("0x0fbcf9", ++game.warningCount);
        }
        if (game.outStatus == "redGK") {
          ballWarning("0xff3f34", ++game.warningCount);
        }
      }
      if (game.rsTimer == gkTimeOut) {
        game.outStatus = "";
        room.setDiscProperties(0, { color: "0xffffff" });
        game.rsTimer = 1000000;
      }
    } else if (game.outStatus == "blueCK" || game.outStatus == "redCK") {
      if (game.rsTimer == ckTimeOut - 120) {
        if (game.outStatus == "blueCK") {
          ballWarning("0x0fbcf9", ++game.warningCount);
        }
        if (game.outStatus == "redCK") {
          ballWarning("0xff3f34", ++game.warningCount);
        }
      }
      if (game.rsTimer == ckTimeOut) {
        game.outStatus = "";
        room.setDiscProperties(1, { x: 0, y: 2000, radius: 0 });
        room.setDiscProperties(2, { x: 0, y: 2000, radius: 0 });
        room.setDiscProperties(0, { color: "0xffffff" });
        game.rsTimer = 1000000;
      }
    }
  }

  if (game.rsActive == true) {
    if (room.getBallPosition().y > 611.45 || room.getBallPosition().y < -611.45) {
      game.rsActive = false;
      if (game.lastPlayAnnounced == true) {
        room.stopGame(true);
        game.lastPlayAnnounced = false;
        announce("⚽ FULL TIME ⚽");
        announce("⚽ FULL TIME ⚽");
        room.setTimeLimit(gameTime);
        sendDiscordRecording();
        whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
        sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
      }

      room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });

      game.ballOutPositionX = Math.round(room.getBallPosition().x * 10) / 10;
      if (room.getBallPosition().y > 611.45) {
        game.ballOutPositionY = 400485;
        game.throwInPosY = 610;
      }
      if (room.getBallPosition().y < -611.45) {
        game.ballOutPositionY = -400485;
        game.throwInPosY = -610;
      }
      if (room.getBallPosition().x > 1130) {
        game.ballOutPositionX = 1130;
      }
      if (room.getBallPosition().x < -1130) {
        game.ballOutPositionX = -1130;
      }

      if (game.rsTouchTeam == 1) {
        room.setDiscProperties(3, { x: game.ballOutPositionX, y: game.throwInPosY, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "blueThrow";
          game.throwinKicked = false;
          game.rsTimer = 0;
          game.rsReady = true;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY, xgravity: 0, ygravity: 0 });
          //announce("🖐️ Throw In: 🔵 Blue");
          sendWebhook(fieldWebHook, `\`🔵Throw In for the blue team 🖐️\``);
          room.setDiscProperties(0, { color: "0x0fbcf9" });
        });
        sleep(100).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      } else {
        room.setDiscProperties(3, { x: game.ballOutPositionX, y: game.throwInPosY, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "redThrow";
          game.throwinKicked = false;
          game.rsTimer = 0;
          game.rsReady = true;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY, xgravity: 0, ygravity: 0 });
          //announce("🖐️ Throw In: 🔴 Red");
          sendWebhook(fieldWebHook, `\`🔴Throw In for the red team 🖐️\``);
          room.setDiscProperties(0, { color: "0xff3f34" });
        });
        sleep(100).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      }
    }

    if (room.getBallPosition().x > 1161.45 && (room.getBallPosition().y > 124 || room.getBallPosition().y < -124)) {
      game.rsActive = false;
      if (game.lastPlayAnnounced == true) {
        room.stopGame(true);
        game.lastPlayAnnounced = false;
        announce("⚽ FULL TIME ⚽");
        announce("⚽ FULL TIME ⚽");
        room.setTimeLimit(gameTime);
        sendDiscordRecording();
        whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
        sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
      }
      room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
      room.getPlayerList().forEach(function (player) {
        room.setPlayerDiscProperties(player.id, { invMass: 100000 });
      });

      if (game.rsTouchTeam == 1) {
        room.setDiscProperties(3, { x: 1060, y: 0, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "blueGK";
          game.rsTimer = 0;
          game.rsReady = true;
          room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the blue team 🥅", null, 0xffffe0, "normal");
          sendWebhook(fieldWebHook, `\`🔵Goal Kick for the blue team 🥅\``);
          game.rsGoalKick = true;
          game.rsSwingTimer = 0;
          game.boosterCount = 0;
          game.boosterState = false;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 1060, y: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
        });
        sleep(3000).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      } else {
        room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the red team 🚩", null, 0xffffe0, "normal");
        sendWebhook(fieldWebHook, `\`🔴Corner Kick for the red team 🚩\``);
        game.rsSwingTimer = 0;
        if (room.getBallPosition().y < -124) {
          room.setDiscProperties(3, { x: 1140, y: -590, radius: 18 });
          sleep(100).then(() => {
            game.rsCorner = true;
            game.outStatus = "redCK";
            game.rsTimer = 0;
            game.rsReady = true;
            game.boosterCount = 0;
            game.boosterState = false;
            room.setDiscProperties(0, { x: 1140, y: -590, xspeed: 0, yspeed: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
            room.setDiscProperties(2, { x: 1150, y: -670, radius: 420 });
            room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
          });
        }
        if (room.getBallPosition().y > 124) {
          room.setDiscProperties(3, { x: 1140, y: 590, radius: 18 });
          sleep(100).then(() => {
            game.rsCorner = true;
            game.outStatus = "redCK";
            game.rsTimer = 0;
            game.rsReady = true;
            game.boosterCount = 0;
            game.boosterState = false;
            room.setDiscProperties(0, { x: 1140, y: 590, xspeed: 0, yspeed: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
            room.setDiscProperties(2, { x: 1150, y: 670, radius: 420 });
            room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
          });
        }
      }
    }
    if (room.getBallPosition().x < -1161.45 && (room.getBallPosition().y > 124 || room.getBallPosition().y < -124)) {
      game.rsActive = false;
      if (game.lastPlayAnnounced == true) {
        room.stopGame(true);
        game.lastPlayAnnounced = false;
        announce("⚽ FULL TIME ⚽");
        announce("⚽ FULL TIME ⚽");
        room.setTimeLimit(gameTime);
        sendDiscordRecording();
        whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
        sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
      }
      room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
      room.getPlayerList().forEach(function (player) {
        room.setPlayerDiscProperties(player.id, { invMass: 100000 });
      });

      if (game.rsTouchTeam == 1) {
        room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the blue team🚩", null, 0xffffe0, "normal");
        sendWebhook(fieldWebHook, `\`🔵Corner Kick for the blue team🚩\``);
        game.rsSwingTimer = 0;
        if (room.getBallPosition().y < -124) {
          room.setDiscProperties(3, { x: -1140, y: -590, radius: 18 });
          sleep(100).then(() => {
            game.rsCorner = true;
            game.outStatus = "blueCK";
            game.rsTimer = 0;
            game.rsReady = true;
            game.boosterCount = 0;
            game.boosterState = false;
            room.setDiscProperties(0, { x: -1140, y: -590, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
            room.setDiscProperties(1, { x: -1150, y: -670, radius: 420 });
            room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
          });
        }
        if (room.getBallPosition().y > 124) {
          room.setDiscProperties(3, { x: -1140, y: 590, radius: 18 });
          sleep(100).then(() => {
            game.rsCorner = true;
            game.outStatus = "blueCK";
            game.rsTimer = 0;
            game.rsReady = true;
            game.boosterCount = 0;
            game.boosterState = false;
            room.setDiscProperties(0, { x: -1140, y: 590, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
            room.setDiscProperties(1, { x: -1150, y: 670, radius: 420 });
            room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
          });
        }
      } else {
        room.setDiscProperties(3, { x: -1060, y: 0, radius: 18 });
        sleep(100).then(() => {
          game.outStatus = "redGK";
          game.rsTimer = 0;
          game.rsReady = true;
          room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the red team 🥅", null, 0xffffe0, "normal");
          sendWebhook(fieldWebHook, `\`🔴Goal Kick for the red team 🥅\``);
          game.rsGoalKick = true;
          game.rsSwingTimer = 0;
          game.boosterCount = 0;
          game.boosterState = false;
          room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -1060, y: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
        });
        sleep(3000).then(() => {
          room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
        });
      }
    }
  }
}

function handleBallTouch() {
  var players = room.getPlayerList();
  var ballPosition = room.getBallPosition();
  var ballRadius = game.ballRadius;
  var playerRadius = 15;
  var triggerDistance = ballRadius + playerRadius + 0.01;

  for (var i = 0; i < players.length; i++) {
    // Iterate over all the players
    var player = players[i];
    if (player.position == null) continue;
    var distanceToBall = pointDistance(player.position, ballPosition);
    if (distanceToBall < triggerDistance) {
      game.rsTouchTeam = player.team;
      game.throwinKicked = false;

      //=========== POWERSHOT CODE ===========
      if (game.rsCorner == false && game.rsGoalKick == false && game.outStatus != "blueThrow" && game.outStatus != "redThrow" && powerShotMode == true) {
        if (game.powershotID != player.id) {
          game.powershotID = player.id;
          game.powershotTrigger = false;
          game.powershotCounter = 0;
        } else {
          game.powershotCounter++;
          //room.sendAnnouncement("Powershot counter: " + game.powershotCounter, null, 0x333333, "small-bold", 0);
          if (game.powershotCounter > 72 && game.powershotTrigger == false && Math.round(room.getDiscProperties(0).invMass) != 2) { //time powershot default = 100
            room.setDiscProperties(0, { invMass: 2.35 }); //ps strength
            room.sendAnnouncement("POWERSHOT READY", game.powershotID, 0x33dd33, "small-bold", 1);
            room.setPlayerAvatar(game.powershotID, "🚀");
            room.setDiscProperties(0, { color: "0xFFD813" });
            game.powershotTrigger = true;
          }
        }
      }
      //=========== POWERSHOT CODE ===========

      if (game.rsCorner == false && room.getDiscProperties(0).xgravity != 0) {
        room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
        game.rsSwingTimer = 10000;
      }
    }
    //=========== POWERSHOT CODE ===========
    if (distanceToBall > triggerDistance + 3 && player.id == game.powershotID && game.powershotTrigger == true && powerShotMode == true) {
      game.powershotTrigger = false;
      game.powershotCounter = 0;
      game.powershotid = 0;
      if (parseFloat(room.getDiscProperties(0).invMass.toFixed(2)) != 1.05) {
        room.setDiscProperties(0, { invMass: 1.05 });
        room.sendAnnouncement("POWERSHOT CANCELED", game.powershotID, 0xdd3333, "small-bold", 2);
        room.setPlayerAvatar(game.powershotID, null);
        room.setDiscProperties(0, { color: "0xFFFFFF" });
      }
    }
    //=========== POWERSHOT CODE ===========
  }
}

function updateGameStatus() {
  game.time = Math.floor(room.getScores().time);
  game.ballRadius = room.getDiscProperties(0).radius;
}

function announce(msg, targetId, color, style, sound) {
  if (color == null) {
    color = 0xfffd82;
  }
  if (style == null) {
    style = "bold";
  }
  if (sound == null) {
    sound = 0;
  }
  room.sendAnnouncement(msg, targetId, color, style, sound);
  //console.log("Announce: " + msg);
}

function whisper(msg, targetId, color, style, sound) {
  if (color == null) {
    color = 0x66c7ff;
  }
  if (style == null) {
    style = "normal";
  }
  if (sound == null) {
    sound = 0;
  }
  room.sendAnnouncement(msg, targetId, color, style, sound);
  if (room.getPlayer(targetId) != null) {
    //console.log("Whisper -> " + room.getPlayer(targetId).name + ": " + msg);
  }
}

function isAdminPresent() {
  var players = room.getPlayerList();
  if (players.find((player) => player.admin) != null) {
    return true;
  } else {
    return false;
  }
}

// optimize
async function ballWarning(origColour, warningCount) {
  const intervals = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1675, 1750];
  const colorSequence = ["0xffffff", origColour];

  for (let i = 0; i < intervals.length; i++) {
    await sleep(intervals[i]);
    if (game.warningCount === warningCount) {
      room.setDiscProperties(0, { color: colorSequence[i % 2] });
    }
  }
}

function extraTime() {
  var extraSeconds = Math.ceil(game.extraTimeCount / 60);
  game.extraTimeEnd = gameTime * 60 + extraSeconds;
  announce("Extra time: " + extraSeconds + " Seconds", null, null, null, 1);
}

function secondsToMinutes(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

function blockThrowIn() {
  var players = room.getPlayerList().filter((player) => player.team != 0);
  if (room.getBallPosition().y < 0) {
    // top throw line
    if (game.outStatus == "redThrow") {
      players.forEach(function (player) {
        if (room.getPlayerDiscProperties(player.id).invMass != 9999999) {
          room.setPlayerDiscProperties(player.id, { invMass: 9999999 });
        }
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).y < 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 536870918) {
            room.setPlayerDiscProperties(player.id, { cGroup: 536870918 });
          }
          if (player.position.y < -460) {
            room.setPlayerDiscProperties(player.id, { y: -445 });
          }
        }
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
        if (room.getDiscProperties(17).x != 1149) {
          // show top red line
          //room.setDiscProperties(17, { x: 1149 });
        }
        if (room.getDiscProperties(19).x != -1149) {
          // hide top blue line
          //room.setDiscProperties(19, { x: -1149 });
        }
      });
    }
    if (game.outStatus == "blueThrow") {
      players.forEach(function (player) {
        if (room.getPlayerDiscProperties(player.id).invMass != 9999999) {
          room.setPlayerDiscProperties(player.id, { invMass: 9999999 });
        }
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).y < 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 536870918) {
            room.setPlayerDiscProperties(player.id, { cGroup: 536870918 });
          }
          if (player.position.y < -460) {
            room.setPlayerDiscProperties(player.id, { y: -445 });
          }
        }
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
        if (room.getDiscProperties(19).x != 1149) {
          // show top blue line
          //room.setDiscProperties(19, { x: 1149 });
        }
        if (room.getDiscProperties(17).x != -1149) {
          // hide top red line
          //room.setDiscProperties(17, { x: -1149 });
        }
      });
    }
  }
  if (room.getBallPosition().y > 0) {
    // bottom throw line
    if (game.outStatus == "redThrow") {
      players.forEach(function (player) {
        if (room.getPlayerDiscProperties(player.id).invMass != 9999999) {
          room.setPlayerDiscProperties(player.id, { invMass: 9999999 });
        }
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).y > 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 536870918) {
            room.setPlayerDiscProperties(player.id, { cGroup: 536870918 });
          }
          if (player.position.y > 460) {
            room.setPlayerDiscProperties(player.id, { y: 445 });
          }
        }
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
        if (room.getDiscProperties(21).x != 1149) {
          // show bottom red line
          //room.setDiscProperties(21, { x: 1149 });
        }
        if (room.getDiscProperties(23).x != -1149) {
          // hide bottom blue line
          //room.setDiscProperties(23, { x: -1149 });
        }
      });
    }
    if (game.outStatus == "blueThrow") {
      players.forEach(function (player) {
        if (room.getPlayerDiscProperties(player.id).invMass != 9999999) {
          room.setPlayerDiscProperties(player.id, { invMass: 9999999 });
        }
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).y > 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 536870918) {
            room.setPlayerDiscProperties(player.id, { cGroup: 536870918 });
          }
          if (player.position.y > 460) {
            room.setPlayerDiscProperties(player.id, { y: 445 });
          }
        }
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
        if (room.getDiscProperties(23).x != 1149) {
          // show bottom blue line
          //room.setDiscProperties(23, { x: 1149 });
        }
        if (room.getDiscProperties(21).x != -1149) {
          // hide bottom red line
          //room.setDiscProperties(21, { x: -1149 });
        }
      });
    }
  }
}

function blockGoalKick() {
  var players = room.getPlayerList().filter((player) => player.team != 0);
  if (room.getBallPosition().x < 0) {
    // left side red goal kick
    if (game.outStatus == "redGK") {
      players.forEach(function (player) {
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).x < 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 268435462) {
            room.setPlayerDiscProperties(player.id, { cGroup: 268435462 });
          }
          if (player.position.x < -840 && player.position.y > -320 && player.position.y < 320) {
            room.setPlayerDiscProperties(player.id, { x: -825 });
          }
        }
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
      });
    }
  }
  if (room.getBallPosition().x > 0) {
    // right side blue goal kick
    if (game.outStatus == "blueGK") {
      players.forEach(function (player) {
        if (player.team == 1 && room.getPlayerDiscProperties(player.id).x > 0) {
          if (room.getPlayerDiscProperties(player.id).cGroup != 268435462) {
            room.setPlayerDiscProperties(player.id, { cGroup: 268435462 });
          }
          if (player.position.x > 840 && player.position.y > -320 && player.position.y < 320) {
            room.setPlayerDiscProperties(player.id, { x: 825 });
          }
        }
        if (player.team == 2 && room.getPlayerDiscProperties(player.id).cGroup != 2) {
          room.setPlayerDiscProperties(player.id, { cGroup: 2 });
        }
      });
    }
  }
}

// optimize
function removeBlock() {
  const redLineX = -1149;
  const blueLineX = -1149;

  const players = room.getPlayerList().filter((player) => player.team !== 0);

  if (game.outStatus === "") {
    players.forEach((player) => {
      const discProperties = room.getPlayerDiscProperties(player.id);
      const cGroup = player.team === 1 ? 2 : 4;
      if (discProperties.cGroup !== cGroup) {
        room.setPlayerDiscProperties(player.id, { cGroup });
      }
    });

    const lines = [17, 19, 21, 23];
    lines.forEach((line) => {
      const lineX = room.getDiscProperties(line).x;
      if (lineX !== redLineX && lineX !== blueLineX) {
        room.setDiscProperties(line, { x: redLineX });
      }
    });
  }
}

function getDate() {
  let data = new Date(Date.now() - 432000000),
    dia = data.getDate().toString().padStart(2, "0"),
    mes = (data.getMonth() + 1).toString().padStart(2, "0"),
    ano = data.getFullYear(),
    horas = data.getHours().toString().padStart(2, "0"),
    minutos = data.getMinutes().toString().padStart(2, "0");
  return `${dia}-${mes}-${ano}-${horas}h${minutos}m`;
}

function sendDiscordRecording() {
  const form = new FormData();
  form.append("file", new File([room.stopRecording()], `SCRIM/TUR-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

setInterval(function () {
  room.sendAnnouncement("⭐ ᴅɪꜱᴄᴏʀᴅ: ɪɴᴅᴏɴᴇꜱɪᴀ ʀᴇᴀʟ ꜱᴏᴄᴄᴇʀ ( ᴅɪꜱᴄᴏʀᴅ.ɢɢ/pm55tVsQMX ) ⭐", null, 0x5ee7ff, "bold", 0);
  setTimeout(function () {
    room.sendAnnouncement("⚽ ᴄᴏᴍᴍᴀɴᴅ: !ᴅᴄ, !ꜰɪxꜱᴛᴀʀᴛ, !ᴘᴏᴡᴇʀꜱʜᴏᴛ, !ᴀꜰᴋ, !ʙʙ, !ꜱᴛᴀᴛꜱ, !ᴍᴀᴘ, !ʀᴀɴᴋ, !ꜱᴡᴀᴘ, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ] ⚽", null, 0x61ddff, "normal", 0);
  }, 50000); // Wait 40 seconds after the first announcement
}, 220000);

msg1 = setInterval(function () {
  room.sendAnnouncement("🏆 ᴊᴏɪɴ ᴏꜰꜰɪᴄɪᴀʟ ᴅɪꜱᴄᴏʀᴅ ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴘᴀʀᴛɪᴄɪᴘᴀᴛᴇ ᴏɴ ᴀʟʟ ʀꜱɪ ᴇᴠᴇɴᴛ 🏆 !", null, 0xff8a4a, "normal");
}, msg1Time);
