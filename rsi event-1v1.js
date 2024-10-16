/* ROOM */
var roomName = "💠 (ʀꜱɪ) 𝐂𝐮𝐩 𝟏𝐯𝟏 ⚽️🥅"; 
//var roomPassword = "scrim2";
const maxPlayers = 30; 
const roomPublic = true; 
const geo = [{ lat: 10.774701, lon: 106.647  , code: "id" }]; //liga new region

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
  //password: roomPassword,
  geo: geo[0],
});

const scoreLimitPractice = 0;
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
    "niga",
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
var adminPassword = "2542";
var freeze = []; //Holds the name of the frozen players.
var playerInformations = []; //Holds players names, ID's and positions (undefined if not frozen).
// Cooldown period in milliseconds
var cooldownPeriod = 3000; // 2 seconds
var maxMessages = 2; // Maximum messages allowed in the cooldown period

var isPaused = false;
var pauseTimer;
var redPauseCount = 0;
var bluePauseCount = 0;
const maxPauses = 3;

let playerIds = new Set();
let whitelist = new Set([
  "oCk6n6FWrfoalDXXPijIKiPkZG9O1qZsoNmUnJ8ECbg", //mainoo 
  "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc" //m4
]);

let previousPlayerCount = 0;

// Store last message times and counts for players
var lastMessageTime = {};
var messageCounts = {};

var vip1 = [];
var vip2 = [];
var vip3 = [];
var globalChatEnabled = true;

let isTurneyStarted = false;
let countdownTimeouts = [];
let penKick = false;
let isFirstHalf = true;
var announcement30sSent = false; 
var announcement20sSent = false; 
var announcement10sSent = false;

// let firstHalfScores = { red: 0, blue: 0 };
// let secondHalfScores = { red: 0, blue: 0 };
// function updateScores(team) {
//   if (isFirstHalf) {
//     // Update first half scores
//     if (team === 1) {
//       firstHalfScores.red += 1;
//     } else if (team === 2) {
//       firstHalfScores.blue += 1;
//     }
//   } else {
//     // Update second half scores
//     if (team === 1) {
//       secondHalfScores.red += 1;
//     } else if (team === 2) {
//       secondHalfScores.blue += 1;
//     }
//   }
// }

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

	"name" : "RSI Futsal 1v1",

	"width" : 420,

	"height" : 200,

	"spawnDistance" : 180,

	"bg" : { "width" : 368, "height" : 171, "kickOffRadius" : 65, "color" : "393b42" },

	"vertexes" : [
		/* 0 */ { "x" : -368, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "bfc4d5", "bias" : 25 },
		/* 1 */ { "x" : -368, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "cb3737", "bias" : 25 },
		/* 2 */ { "x" : -368, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "cb3737", "bias" : -25 },
		/* 3 */ { "x" : -368, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "bfc4d5", "bias" : -25 },
		/* 4 */ { "x" : 368, "y" : 171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "bfc4d5", "bias" : -25 },
		/* 5 */ { "x" : 368, "y" : 65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "3a49b0", "bias" : -25 },
		/* 6 */ { "x" : 368, "y" : -65, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "3a49b0", "bias" : 25 },
		/* 7 */ { "x" : 368, "y" : -171, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "bfc4d5", "bias" : 25 },
		
		/* 8 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier", "color" : "bfc4d5" },
		
		/* 9 */ { "x" : 0, "y" : -65, "trait" : "line", "color" : "bfc4d5" },
		
		/* 10 */ { "x" : 368, "y" : 171, "bCoef" : 1, "trait" : "ballArea", "color" : "bfc4d5", "bias" : 25 },
		/* 11 */ { "x" : 368, "y" : -171, "bCoef" : 1, "trait" : "ballArea", "color" : "bfc4d5", "bias" : -25 },
		
		/* 12 */ { "x" : 0, "y" : 171, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "bfc4d5" },
		/* 13 */ { "x" : 0, "y" : 65, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "bfc4d5" },
		
		/* 14 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier", "color" : "bfc4d5" },
		/* 15 */ { "x" : 0, "y" : -65, "trait" : "kickOffBarrier", "color" : "bfc4d5" },
		/* 16 */ { "x" : 0, "y" : 199, "trait" : "kickOffBarrier", "curve" : 0 },
		/* 17 */ { "x" : 0, "y" : 65, "trait" : "kickOffBarrier", "color" : "1D1D1E", "curve" : 0 },
		/* 18 */ { "x" : 0, "y" : -65, "trait" : "kickOffBarrier" },
		/* 19 */ { "x" : 0, "y" : -199, "trait" : "kickOffBarrier" },
		
		/* 20 */ { "x" : -368.53340356886, "y" : -62.053454903872, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "1BA85F", "pos" : [-700,-80 ] },
		/* 21 */ { "x" : -400.05760771891, "y" : -62.053454903872, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "C1C2C5", "pos" : [-700,-80 ] },
		/* 22 */ { "x" : -400.05760771891, "y" : 64.043361696331, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "C1C2C5", "pos" : [-700,80 ] },
		/* 23 */ { "x" : -368.53340356886, "y" : 64.043361696331, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "1BA85F", "pos" : [-700,80 ] },
		/* 24 */ { "x" : 368.09926357786, "y" : 63.94882446641, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "1BA85F", "pos" : [-700,-80 ] },
		/* 25 */ { "x" : 400, "y" : 64, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "C1C2C5", "pos" : [-700,-80 ] },
		/* 26 */ { "x" : 400, "y" : -61.927767991658, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "C1C2C5", "pos" : [-700,80 ] },
		/* 27 */ { "x" : 368.9681846993, "y" : -62.144998272018, "cMask" : ["ball" ], "trait" : "goalNet", "curve" : 0, "color" : "1BA85F", "pos" : [-700,80 ] },
		
		/* 28 */ { "x" : -368, "y" : -142.37229643041, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : -90 },
		/* 29 */ { "x" : -260.90035258157, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 0 },
		/* 30 */ { "x" : -368, "y" : -160.81305960678, "bCoef" : 0.1, "trait" : "line", "curve" : -90, "color" : "1BA85F" },
		/* 31 */ { "x" : -358.5379338963, "y" : -171, "bCoef" : 0.1, "trait" : "line", "curve" : -90, "color" : "1BA85F" },
		/* 32 */ { "x" : -368, "y" : 141.33175243687, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 90 },
		/* 33 */ { "x" : -260.90035258157, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 0 },
		/* 34 */ { "x" : 368, "y" : -160.81305960678, "bCoef" : 0.1, "trait" : "line", "curve" : 90, "color" : "1BA85F" },
		/* 35 */ { "x" : 358.36266315432, "y" : -171, "bCoef" : 0.1, "trait" : "line", "curve" : 90, "color" : "1BA85F" },
		/* 36 */ { "x" : 368, "y" : -142.37229643041, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 90 },
		/* 37 */ { "x" : 260.72508183959, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 90 },
		/* 38 */ { "x" : 368, "y" : 141.33175243687, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : -90 },
		/* 39 */ { "x" : 260.72508183959, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : -90 },
		/* 40 */ { "x" : 260.72508183959, "y" : -50.168480548544, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 0 },
		/* 41 */ { "x" : 260.72508183959, "y" : 49.127936555002, "bCoef" : 0.1, "trait" : "line", "color" : "bfc4d5", "curve" : 0 },
		/* 42 */ { "x" : 0, "y" : -65, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "bfc4d5" },
		/* 43 */ { "x" : 0, "y" : -171, "bCoef" : 0, "trait" : "line", "curve" : 0, "color" : "bfc4d5" },
		/* 44 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : -13.806636155606405 },
		/* 45 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : 21.668192219679632 },
		/* 46 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : -13.806636155606405 },
		/* 47 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.833715993152332, "y" : -14.501144164759722 },
		/* 48 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.833715993152332, "y" : -0.610983981693364 },
		/* 49 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : -0.610983981693364 },
		/* 50 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : -0.610983981693364 },
		/* 51 */ { "bCoef" : 0.1, "trait" : "line", "x" : -24.11289219452533, "y" : -0.610983981693364 },
		/* 52 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : 13.973684210526315 },
		/* 53 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.833715993152332, "y" : 13.973684210526315 },
		/* 54 */ { "bCoef" : 0.1, "trait" : "line", "x" : 12.325628372297132, "y" : 13.973684210526315 },
		/* 55 */ { "bCoef" : 0.1, "trait" : "line", "x" : 12.00152428144721, "y" : 0.08352402745995402 },
		/* 56 */ { "bCoef" : 0.1, "trait" : "line", "x" : 12.00152428144721, "y" : 13.279176201372996 },
		/* 57 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.9721599290791048, "y" : 0.08352402745995402 },
		/* 58 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.020136381450449, "y" : 0.08352402745995402 },
		/* 59 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.277651919925786, "y" : -13.806636155606405 },
		/* 60 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.277651919925786, "y" : 0.08352402745995402 },
		/* 61 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.9721599290791048, "y" : -13.806636155606405 },
		/* 62 */ { "bCoef" : 0.1, "trait" : "line", "x" : 31.299312582823447, "y" : -13.806636155606405 },
		/* 63 */ { "bCoef" : 0.1, "trait" : "line", "x" : 21.724636409593664, "y" : -5.94508009153318 },
		/* 64 */ { "bCoef" : 0.1, "trait" : "line", "x" : 21.724636409593664, "y" : 14.668192219679632 },
		/* 65 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.9721599290791048, "y" : -13.112128146453088 },
		/* 66 */ { "bCoef" : 0.1, "trait" : "line", "x" : 31.299312582823447, "y" : -13.112128146453088 },
		/* 67 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : -13.112128146453088 },
		/* 68 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : -13.112128146453088 },
		/* 69 */ { "bCoef" : 0.1, "trait" : "line", "x" : -24.11289219452533, "y" : -13.806636155606405 },
		/* 70 */ { "bCoef" : 0.1, "trait" : "line", "x" : -24.11289219452533, "y" : 21.668192219679632 },
		/* 71 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : -12.417620137299771 },
		/* 72 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : -12.417620137299771 },
		/* 73 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.9721599290791048, "y" : -12.417620137299771 },
		/* 74 */ { "bCoef" : 0.1, "trait" : "line", "x" : 31.299312582823447, "y" : -12.417620137299771 },
		/* 75 */ { "bCoef" : 0.1, "trait" : "line", "x" : -21.334860157912054, "y" : 0.08352402745995402 },
		/* 76 */ { "bCoef" : 0.1, "trait" : "line", "x" : -5.731579865689136, "y" : 14.668192219679632 },
		/* 77 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.501908212831964, "y" : 0.778032036613272 },
		/* 78 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.509611902302407, "y" : 0.778032036613272 },
		/* 79 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.222732011458966, "y" : -13.806636155606405 },
		/* 80 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.222732011458966, "y" : 0.08352402745995402 },
		/* 81 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.833715993152332, "y" : 12.584668192219677 },
		/* 82 */ { "bCoef" : 0.1, "trait" : "line", "x" : 12.325628372297132, "y" : 12.584668192219677 },
		/* 83 */ { "bCoef" : 0.1, "trait" : "line", "x" : 9.918000253987255, "y" : 0.08352402745995402 },
		/* 84 */ { "bCoef" : 0.1, "trait" : "line", "x" : 9.918000253987255, "y" : 13.279176201372996 },
		/* 85 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.9721599290791048, "y" : -1.305491990846682 },
		/* 86 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.020136381450449, "y" : -1.305491990846682 },
		/* 87 */ { "bCoef" : 0.1, "trait" : "line", "x" : -26.19641622198528, "y" : -0.610983981693364 },
		/* 88 */ { "bCoef" : 0.1, "trait" : "line", "x" : -9.204119911455727, "y" : 0.08352402745995402 },
		/* 89 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.8886359016191498, "y" : -13.806636155606405 },
		/* 90 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.8886359016191498, "y" : 0.08352402745995402 },
		/* 91 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1941278924658327, "y" : -14.501144164759722 },
		/* 92 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1941278924658327, "y" : -0.610983981693364 },
		/* 93 */ { "bCoef" : 0.1, "trait" : "line", "x" : 21.030128400440343, "y" : -5.94508009153318 },
		/* 94 */ { "bCoef" : 0.1, "trait" : "line", "x" : 21.030128400440343, "y" : 14.668192219679632 },
		/* 95 */ { "bCoef" : 0.1, "trait" : "line", "x" : 19.64111238213371, "y" : -5.94508009153318 },
		/* 96 */ { "bCoef" : 0.1, "trait" : "line", "x" : 19.64111238213371, "y" : 14.668192219679632 }

	],

	"segments" : [
		{ "v0" : 0, "v1" : 1, "color" : "1BA85F", "trait" : "ballArea" },
		{ "v0" : 2, "v1" : 3, "color" : "1BA85F", "trait" : "ballArea" },
		{ "v0" : 4, "v1" : 5, "color" : "1BA85F", "trait" : "ballArea" },
		{ "v0" : 6, "v1" : 7, "color" : "1BA85F", "trait" : "ballArea" },
		
		{ "v0" : 8, "v1" : 9, "curve" : 180, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 8, "v1" : 9, "curve" : -180, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
		
		{ "v0" : 1, "v1" : 0, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -368, "bias" : 25 },
		{ "v0" : 5, "v1" : 4, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 368, "bias" : -25 },
		{ "v0" : 2, "v1" : 3, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -368, "bias" : -25 },
		{ "v0" : 6, "v1" : 7, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 368, "bias" : 25 },
		{ "v0" : 0, "v1" : 10, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "trait" : "ballArea", "y" : 171, "bias" : 25 },
		{ "v0" : 3, "v1" : 11, "vis" : true, "color" : "bfc4d5", "bCoef" : 1, "trait" : "ballArea", "y" : -171, "bias" : -25 },
		
		{ "v0" : 12, "v1" : 13, "curve" : 0, "vis" : true, "color" : "bfc4d5", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 9, "v1" : 8, "curve" : -180, "vis" : true, "color" : "bfc4d5", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 15, "v1" : 14, "curve" : 180, "vis" : true, "color" : "bfc4d5", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 2, "v1" : 1, "curve" : 0, "vis" : true, "color" : "cb3737", "bCoef" : 0, "trait" : "line" },
		{ "v0" : 6, "v1" : 5, "curve" : 0, "vis" : true, "color" : "3a49b0", "bCoef" : 0, "trait" : "line" },
		
		{ "v0" : 16, "v1" : 17, "curve" : 0, "trait" : "kickOffBarrier", "x" : 0 },
		{ "v0" : 18, "v1" : 19, "trait" : "kickOffBarrier" },
		
		{ "v0" : 20, "v1" : 21, "curve" : 0, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "pos" : [-700,-80 ], "y" : -80 },
		{ "v0" : 21, "v1" : 22, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "x" : -590 },
		{ "v0" : 22, "v1" : 23, "curve" : 0, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "pos" : [-700,80 ], "y" : 80 },
		{ "v0" : 24, "v1" : 25, "curve" : 0, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "pos" : [-700,-80 ], "y" : -80 },
		{ "v0" : 25, "v1" : 26, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "x" : -590 },
		{ "v0" : 26, "v1" : 27, "curve" : 0, "color" : "C1C2C5", "cMask" : ["ball" ], "trait" : "goalNet", "pos" : [-700,80 ], "y" : 80 },
		
		{ "v0" : 28, "v1" : 29, "curve" : 94.0263701017, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 32, "v1" : 33, "curve" : -94.026370101699, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 29, "v1" : 33, "curve" : 0, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 36, "v1" : 37, "curve" : -94.026370101699, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 38, "v1" : 39, "curve" : 94.026370101699, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 40, "v1" : 41, "curve" : 0, "vis" : true, "color" : "bfc4d5", "bCoef" : 0.1, "trait" : "line", "x" : 390 },
		{ "v0" : 42, "v1" : 43, "curve" : 0, "vis" : true, "color" : "bfc4d5", "bCoef" : 0, "trait" : "line" },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 44, "v1" : 45 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 44, "v1" : 46 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 47, "v1" : 48 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 49, "v1" : 50 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 51, "v1" : 52 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 53, "v1" : 54 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 55, "v1" : 56 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 57, "v1" : 58 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 59, "v1" : 60 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 61, "v1" : 62 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 63, "v1" : 64 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 65, "v1" : 66 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 67, "v1" : 68 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 69, "v1" : 70 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 71, "v1" : 72 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 73, "v1" : 74 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 75, "v1" : 76 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 77, "v1" : 78 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 79, "v1" : 80 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 81, "v1" : 82 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 83, "v1" : 84 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 85, "v1" : 86 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 87, "v1" : 88 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 89, "v1" : 90 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 91, "v1" : 92 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 93, "v1" : 94 },
		{ "vis" : true, "color" : "FFFFFF", "bCoef" : 0.1, "trait" : "line", "v0" : 95, "v1" : 96 }

	],

	"goals" : [
		{ "p0" : [-374.25,-62.053454903872 ], "p1" : [-374.25,64.043361696331 ], "team" : "red" },
		{ "p0" : [374.25,62 ], "p1" : [374.25,-62 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 3.9405255187564, "pos" : [-368.53340356886,64.043361696331 ], "color" : "cb3737", "trait" : "goalPost", "y" : 80, "cMask" : ["ball" ] },
		{ "radius" : 3.9405255187564, "pos" : [-368.09926357786,-62.053454903872 ], "color" : "cb3737", "trait" : "goalPost", "y" : -80, "x" : -560, "cMask" : ["ball" ] },
		{ "radius" : 3.9405255187564, "pos" : [368.09926357786,-62.144998272018 ], "color" : "3a49b0", "trait" : "goalPost", "y" : 80, "cMask" : ["ball" ] },
		{ "radius" : 3.9405255187564, "pos" : [368.09926357786,63.94882446641 ], "color" : "3a49b0", "trait" : "goalPost", "y" : -80, "x" : -560, "cMask" : ["ball" ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -171, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -171, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [0,-1 ], "dist" : -200, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] },
		{ "normal" : [-1,0 ], "dist" : -420, "bCoef" : 0.2, "cMask" : ["all" ] }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 1 },
		"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["all" ] },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"line" : { "vis" : true, "bCoef" : 0, "cMask" : ["" ] },
		"arco" : { "radius" : 2, "cMask" : ["n/d" ], "color" : "cccccc" }

	},

	"playerPhysics" : {
		"acceleration" : 0.113,
		"kickingAcceleration" : 0.083,
		"kickStrength" : 4.8,
		"bCoef" : 0.48

	},

	"ballPhysics" : {
		"radius" : 6.5,
		"color" : "FFB600",
		"bCoef" : 0.453,
		"invMass" : 1.45

	},

	"joints" : [
		

	],

	"redSpawnPoints" : [
		

	],

	"blueSpawnPoints" : [
		

	],

	"canBeStored" : false
}`;

var penMap =
 `{

	"name" : "RSI Penalty",

	"width" : 360,

	"height" : 350,

	"spawnDistance" : 215,

	"bg" : { "type" : "grass", "width" : 340, "height" : 340, "kickOffRadius" : 0, "cornerRadius" : 0, "color" : "454955" },

	"vertexes" : [
		/* 0 */ { "x" : 215, "y" : 250, "trait" : "line" },
		/* 1 */ { "x" : -95, "y" : 250, "trait" : "line" },
		/* 2 */ { "x" : 215, "y" : -250, "trait" : "line" },
		/* 3 */ { "x" : -95, "y" : -250, "trait" : "line" },
		/* 4 */ { "x" : 215, "y" : 150, "trait" : "line" },
		/* 5 */ { "x" : 95, "y" : 150, "trait" : "line" },
		/* 6 */ { "x" : 215, "y" : -150, "trait" : "line" },
		/* 7 */ { "x" : 95, "y" : -150, "trait" : "line" },
		/* 8 */ { "x" : -95, "y" : -130, "trait" : "line" },
		/* 9 */ { "x" : -95, "y" : 130, "trait" : "line" },
		/* 10 */ { "x" : 0, "y" : 4, "trait" : "line" },
		/* 11 */ { "x" : 0, "y" : -4, "trait" : "line" },
		
		/* 12 */ { "x" : 215, "y" : 112, "trait" : "goalNet" },
		/* 13 */ { "x" : 280, "y" : 112, "trait" : "goalNet" },
		/* 14 */ { "x" : 215, "y" : -112, "trait" : "goalNet" },
		/* 15 */ { "x" : 280, "y" : -112, "trait" : "goalNet" },
		
		/* 16 */ { "x" : 280, "y" : 112, "trait" : "line" },
		/* 17 */ { "x" : 315, "y" : 150, "trait" : "line" },
		/* 18 */ { "x" : 280, "y" : -111, "trait" : "line" },
		/* 19 */ { "x" : 315, "y" : -150, "trait" : "line" },
		/* 20 */ { "x" : 0, "y" : -338, "trait" : "line" },
		/* 21 */ { "x" : 0, "y" : 339, "trait" : "line" },
		
		/* 22 */ { "x" : 196, "y" : -300, "trait" : "blueLimit" },
		/* 23 */ { "x" : 196, "y" : 300, "trait" : "blueLimit" },
		
		/* 24 */ { "x" : 217, "y" : 340, "trait" : "line" },
		/* 25 */ { "x" : 215, "y" : -340, "trait" : "line" },
		
		/* 26 */ { "x" : -120, "y" : 290, "trait" : "timebar_moving_ball_stop" },
		/* 27 */ { "x" : -120, "y" : 250, "trait" : "timebar_moving_ball_stop" }

	],

	"segments" : [
		{ "v0" : 20, "v1" : 21, "trait" : "line", "color" : "6A8F59" },
		{ "v0" : 0, "v1" : 1, "trait" : "line" },
		{ "v0" : 1, "v1" : 3, "trait" : "line" },
		{ "v0" : 2, "v1" : 3, "trait" : "line" },
		{ "v0" : 4, "v1" : 5, "trait" : "line" },
		{ "v0" : 5, "v1" : 7, "trait" : "line" },
		{ "v0" : 6, "v1" : 7, "trait" : "line" },
		{ "v0" : 8, "v1" : 9, "trait" : "line", "curve" : -130 },
		{ "v0" : 10, "v1" : 11, "trait" : "line", "curve" : -180 },
		{ "v0" : 10, "v1" : 11, "trait" : "line", "curve" : 180 },
		{ "v0" : 10, "v1" : 11, "trait" : "line", "curve" : 90 },
		{ "v0" : 10, "v1" : 11, "trait" : "line", "curve" : -90 },
		{ "v0" : 10, "v1" : 11, "trait" : "line" },
		
		{ "v0" : 13, "v1" : 15, "trait" : "goalNet", "curve" : 0.5209125406123253 },
		{ "v0" : 12, "v1" : 13, "trait" : "goalNet", "curve" : -2.290030455344583 },
		{ "v0" : 14, "v1" : 15, "trait" : "goalNet", "curve" : 1.8262384781321854 },
		
		{ "v0" : 16, "v1" : 17, "trait" : "line", "color" : "FFFFFF" },
		{ "v0" : 18, "v1" : 19, "trait" : "line", "color" : "FFFFFF" },
		
		{ "v0" : 22, "v1" : 23, "trait" : "blueLimit" },
		
		{ "v0" : 24, "v1" : 25, "trait" : "line" },
		
		{ "v0" : 26, "v1" : 27, "trait" : "timebar_moving_ball_stop" }

	],

	"goals" : [
		{ "p0" : [225,110 ], "p1" : [225,-110 ], "team" : "blue" },
		{ "p0" : [215,-112 ], "p1" : [-10,-10 ], "team" : "red" },
		{ "p0" : [-10,-10 ], "p1" : [-10,10 ], "team" : "red" },
		{ "p0" : [-10,10 ], "p1" : [215,112 ], "team" : "red" }

	],

	"discs" : [
		{ "radius" : 9, "invMass" : 1, "pos" : [0,0 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.989, "bounciness" : 0.8, "friction" : 0.05 },
		{ "radius" : 0, "invMass" : 0, "pos" : [-1285,-13 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["ball" ] },
		{ "radius" : 0, "invMass" : 0, "pos" : [-1284,35 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["ball" ] },
		{ "radius" : 0, "invMass" : 0, "pos" : [-1308,62 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
		
		{ "radius" : 9.1, "pos" : [0,0 ], "color" : "transparent", "trait" : "jb" },
		{ "radius" : 1.5, "pos" : [0,0 ], "trait" : "jb" },
		{ "radius" : 1.15, "pos" : [6.8476,2.2249 ], "trait" : "jb" },
		{ "radius" : 1.15, "pos" : [0,7.2 ], "trait" : "jb" },
		{ "radius" : 1.15, "pos" : [-6.8476,2.2249 ], "trait" : "jb" },
		{ "radius" : 1.15, "pos" : [-4.2321,-5.8249 ], "trait" : "jb" },
		{ "radius" : 1.15, "pos" : [4.2321,-5.8249 ], "trait" : "jb" },
		
		{ "pos" : [215,112 ], "trait" : "goalPost", "color" : "FFFFFF" },
		{ "pos" : [215,-112 ], "trait" : "goalPost", "color" : "FFFFFF" },
		
		{ "pos" : [315,150 ], "trait" : "stanchion", "color" : "000000" },
		{ "pos" : [315,-150 ], "trait" : "stanchion", "color" : "000000" },
		
		{ "pos" : [-120,272 ], "trait" : "timebar_ball_constant" },
		
		{ "pos" : [120,272 ], "trait" : "timebar_ball_constant_2" },
		
		{ "pos" : [120,272 ], "trait" : "timebar_ball_moving", "speed" : [-0.4,0 ] }

	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -300, "bCoef" : 0 },
		{ "normal" : [0,-1 ], "dist" : -300, "bCoef" : 0 },
		{ "normal" : [1,0 ], "dist" : -246, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -285, "bCoef" : 0 },
		{ "normal" : [-1,0 ], "dist" : -17, "bCoef" : 0, "cMask" : ["red" ] },
		
		{ "normal" : [-1,0 ], "dist" : -250, "trait" : "blueLimit" }

	],

	"traits" : {
		"jb" : { "damping" : 0.992, "cMask" : [ ], "cGroup" : ["c0" ], "invMass" : 1e+250, "radius" : 0.8, "color" : "000000" },
		"ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 0.5 },
		"stanchion" : { "radius" : 3, "cMask" : ["" ] },
		"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "color" : "FFFFFF" },
		"line" : { "vis" : true, "cMask" : ["" ], "color" : "C7E6BD" },
		"blueLimit" : { "vis" : false, "bCoef" : 0, "cMask" : ["blue" ] },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
		"timebar_ball_constant" : { "bCoef" : 0, "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["c1" ], "cGroup" : ["c1" ] },
		"timebar_ball_constant_2" : { "bCoef" : 0, "radius" : 0, "invMass" : 0, "damping" : 0, "cMask" : ["none" ], "cGroup" : ["none" ] },
		"timebar_ball_moving" : { "bCoef" : 0, "radius" : 0, "invMass" : 5e-324, "damping" : 1, "cMask" : ["c1" ], "cGroup" : ["c1" ] },
		"timebar_moving_ball_stop" : { "vis" : false, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["c1" ], "bias" : -280 }

	},

	"playerPhysics" : {
		"acceleration" : 0.132,
		"kickStrength" : 5.9


	},

	"cameraFollow" : "player",

	"ballPhysics" : "disc0",

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
		{ "d0" : 7, "d1" : 10, "strength" : "rigid", "color" : "transparent" },
		{ "d0" : 15, "d1" : 16, "color" : "718C5A" },
		{ "d0" : 15, "d1" : 17, "color" : "C7E6BD", "length" : [0,240 ] }

	],

  "canBeStored" : false
}`


  /* MODE */

var afkLimit = 1000; // limite de afk (150)
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

let replayWebHook = "https://discord.com/api/webhooks/1290989762940768299/E4fcLIw7IDou6qcYrG49SQt4gxKgCNNktUzQlo070nZTCoc2CYQ6OxEiMxVfGmD4NuB0";
let goalWebHook = "https://discord.com/api/webhooks/1290989866435350538/lBdS5rCfXf-plcJk9pJ5Rdre0KSrJG62SlwkLsyf3KrEMVMKxVz0F1x-1QHmfOdVyG_1";
let chatWebHook = "https://discord.com/api/webhooks/1261187385387913267/7CQWauXCzx970HW6mWPjiaGTRwY5ERzfxmxLrXSrsvDUpH1oT1pfCAiCocZuNGzTHxYU";
let joinWebHook = "https://discord.com/api/webhooks/1278169966939602995/ZxMQ4n1piO0KQm1Mi3BulGhQdVWzI9o2RJEwuOqzzp7s1qthuKEqptHYiYWNsSh1drKv";
let countWebHook = "https://discord.com/api/webhooks/1278169848416833639/enjMDew-EQY8EwnpofGZ0OKikTh-08gH5GzEGgdcqL_tuc8ZNU8-8NBdmiD0bgryrPKK";


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

function createPlayer(player){ //Create player informations, it will be used in the event.
  playerInformations[playerInformations.length] = {
name:player.name,
id:player.id,
freezePoint:{
    x:undefined,
    y:undefined
}
  }
}

function deletePlayer(id){ //Delete player informations, it will be used in the event.
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
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  lastWinner = winner;
  endGameVariable = true;
  if (winner == Team.RED) {
    streak++;
    //room.sendAnnouncement(centerText("🏆 Red team won! | Win Streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else if (winner == Team.BLUE) {
    streak = 1;
    //room.sendAnnouncement(centerText("🏆 Blue team won! | Win streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else {
    streak = 0;
    room.sendAnnouncement("💤 ʟɪᴍɪᴛ ʀᴇᴀᴄʜᴇᴅ");
  }
  if (!isFirstHalf) {
    room.sendAnnouncement(centerText("🏆 FULL TIME 🏆"), null, Cor.White, "bold");
    room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
    room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  }
  // sendWebhook(goalWebHook, `\`[SECOND-HALF]\`** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
  // scores.red == 0
  //   ? scores.blue == 0
  //     ? room.sendAnnouncement("🥅 " + GKList[0].name + " it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
  //     : room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
  //   : scores.blue == 0
  //   ? room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[0].name + " saved all goals ", null, 0xfdc43a)
  //   : null;
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

/* PLAYER MOVEMENT */

const specialAuths = [
  "Gz6lv-5YsUCk-bJHBxyzbXtFAV2O3edJUev3DhEf_xA", //fox
  "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc", //m4
  "LnEtoSdVonFZdGMYKDUVPAWb-SzD-PsUMJC2nDPHO5w", //roti
  "EKGPaC2usPnvew9o0KH9P6J3nSmBOpKf3meC25VidQo", //stickmar
  "4sNwsfwEjsR37sYEkXMatM8YkcjM3KaJ5uoC2WJ02rY" //bizkit
];
const specialConns = [
  "33362E37332E33352E313832", //fox
  "3130332E37352E35352E3632", //m4
  "3132392E3232372E33392E313139", //roti
  "3134302E3231332E3132372E3337", //bizkit
  "3138322E332E34352E323331" //stickmar
];

room.onPlayerJoin = function (player) {

  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined rs server.\``);
  createPlayer(player);

  if (specialAuths.includes(player.auth) || specialConns.includes(player.conn)) {
    room.setPlayerAdmin(player.id, true);
  }

  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  // updateRoleOnPlayerIn();
  // room.sendAnnouncement("👋🏼 ᴡᴇʟᴄᴏᴍᴇ, " + player.name + "!", null, 0x5ee7ff, "bold");
  const text = [
    "╔═══════════════════════════════════════════════════╗",
    "║                                                      𝗥𝗦𝗜.𝗖𝗢𝗠𝗠𝗨𝗡𝗜𝗧𝗬                                                        ║",
    "║                                                 ᴅɪꜱᴄᴏʀᴅ.ɢɢ/ᴘᴍ55ᴛᴠꜱQᴍx                                               ║",
    "╠═══════════════════════════════════════════════════╣",
    "║                                                            !ᴀꜰᴋ   !ʙʙ                                                                ║",
    "╚═══════════════════════════════════════════════════╝"
  ];

  setTimeout(() => {
    text.forEach(line => {
        room.sendAnnouncement(line, player.id, 0x5CF49C, "normal");
    });
  }, 2700); 

  setTimeout(() => {
    room.sendAnnouncement("use ( a ) before text if you want to sent global chat", player.id, 0xedc021, "normal");
    room.sendAnnouncement("example: a hello", player.id, 0xedc021, "normal");
  }, 3200);

  // if (localStorage.getItem(player.auth) != null) {
  //   var playerRole = JSON.parse(localStorage.getItem(player.auth))[Ss.RL];
  //   if (playerRole == "admin" || playerRole == "master") {
  //     room.setPlayerAdmin(player.id, true);
  //     room.sendAnnouncement("「ᴀᴅᴍɪɴ」" + player.name + " ᴄᴀᴍᴇ ɪɴᴛᴏ ᴛʜᴇ ʀᴏᴏᴍ!", null, 0xff7900, "normal");
  //   }
  // }
  if (localStorage.getItem(getAuth(player)) == null) {
    stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name];
    localStorage.setItem(getAuth(player), JSON.stringify(stats));
  }
};

function updatePlayerCount() {
  const players = room.getPlayerList().filter(player => player.id !== 0); // Exclude the host bot
  const currentPlayerCount = players.length;

  if (currentPlayerCount !== previousPlayerCount) {
      const playerNames = players.map(player => `[-] ${player.name}${player.admin ? ' (admin)' : ''}`).join('\n');
      const adminCount = players.filter(player => player.admin).length;
      let message;

      if (adminCount > 0) {
          message = `\`🟢[rsi event-1v1 ${currentPlayerCount} players (${adminCount} admin)\n${playerNames}\``;
      } else {
          message = `\`🟢[rsi event-1v1] ${currentPlayerCount} players\n${playerNames}\``;
      }

      sendWebhook(countWebHook, message);
      previousPlayerCount = currentPlayerCount; // Update the previous player count only if the webhook is sent
  }
}

setInterval(updatePlayerCount, 5000);

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
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ꜱᴘᴇᴄᴛᴀᴛᴏʀ", changedPlayer.id, 0xffffff, "small", 1);
  } else if (changedPlayer.team == 1) {
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ʀᴇᴅ ᴛᴇᴀᴍ", changedPlayer.id, 0xed6a5a, "small", 1);
  } else if (changedPlayer.team == 2) {
    room.sendAnnouncement("🡪 ʏᴏᴜ ʜᴀᴠᴇ ʙᴇᴇɴ ᴍᴏᴠᴇᴅ ᴛᴏ ʙʟᴜᴇ ᴛᴇᴀᴍ", changedPlayer.id, 0x33dddd, "small", 1);
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
  sendWebhook(chatWebHook, `\`💬 [event 1v1] ${player.name} [${player.id}]: ${message}\``);
  var players = room.getPlayerList();
  let args = message.split(" ");

  if (message.startsWith("t ") || message.startsWith("T ")) {
    teamMsg = message.substring(2).trim();
    var players;
    var teamColor;
    var teamMsgPrefix;
    var showAdmins = false;

    if (player.team == 1) {
        players = room.getPlayerList().filter(p => p.team == 1);
        teamColor = 0xed6a5a;
        teamMsgPrefix = "🔴[TEAM CHAT]";
        showAdmins = false;
    } else if (player.team == 2) {
        players = room.getPlayerList().filter(p => p.team == 2);
        teamColor = 0x5995ed;
        teamMsgPrefix = "🔵[TEAM CHAT]";
        showAdmins = false;
    } else if (player.team == 0) {
        players = room.getPlayerList().filter(p => p.team == 0);
        teamColor = 0xdee7fa;
        teamMsgPrefix = "[SPECTATOR]";
    }

    if (players) {
        players.forEach(function (teamPlayer) {
            room.sendAnnouncement(teamMsgPrefix + " " + player.name + ": " + teamMsg, teamPlayer.id, teamColor, "normal", 1);
        });

        // Send message to all admins if the player is in team 1 or 2
        if (showAdmins) {
            var admins = room.getPlayerList().filter(p => p.admin);
            admins.forEach(function (admin) {
                room.sendAnnouncement(teamMsgPrefix + " " + player.name + ": " + teamMsg, admin.id, teamColor, "normal", 1);
            });
        }
    }
    return false;

  } else if (message.startsWith("a ") || message.startsWith("A ")) {
    handleGlobalChat(player, message);
  }

  function handleGlobalChat(player, message) {
    if (globalChatEnabled) {
      var globalMsg = message.substring(2).trim();
      room.sendAnnouncement("[GLOBAL CHAT] " + player.name + ": " + globalMsg, null, 0xffffff);
    } else {
      room.sendAnnouncement("Global chat disabled.", player.id, 0xffffff);
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

  if (message.startsWith('!addgoals')) {
    if (player.admin) {
        const args = message.split(' ');
        if (args.length === 3) {
            const targetPlayerID = parseInt(args[1]);
            const numberOfGoals = parseInt(args[2]);
            const targetPlayer = room.getPlayer(targetPlayerID);

            if (targetPlayer && !isNaN(numberOfGoals)) {
                let stats = JSON.parse(localStorage.getItem(getAuth(targetPlayer))) || {};
                stats[Ss.GL] = (stats[Ss.GL] || 0) + numberOfGoals;
                localStorage.setItem(getAuth(targetPlayer), JSON.stringify(stats));
                
                room.sendAnnouncement(`Added ${numberOfGoals} goals to player ${targetPlayer.name}.`, player.id, 0x99ffff);
                return false;
            } else {
                room.sendAnnouncement(`Invalid player ID or number of goals.`, player.id, 0xff0000);
                return false;
            }
        } else {
            room.sendAnnouncement(`Usage: !addgoals <playerID> <numberOfGoals>`, player.id, 0xff0000);
            return false;
        }
    }
  }

  if (message.startsWith('!delgoals')) {
      if (player.admin) {
        const args = message.split(' ');
        if (args.length === 3) {
            const targetPlayerID = parseInt(args[1]);
            const numberOfGoals = parseInt(args[2]);
            const targetPlayer = room.getPlayer(targetPlayerID);

            if (targetPlayer && !isNaN(numberOfGoals)) {
                let stats = JSON.parse(localStorage.getItem(getAuth(targetPlayer))) || {};
                stats[Ss.GL] = (stats[Ss.GL] || 0) - numberOfGoals;
                if (stats[Ss.GL] < 0) stats[Ss.GL] = 0; // Ensure goals don't go negative
                localStorage.setItem(getAuth(targetPlayer), JSON.stringify(stats));
                
                room.sendAnnouncement(`Removed ${numberOfGoals} goals from player ${targetPlayer.name}.`, player.id, 0x99ffff);
                return false;
            } else {
                room.sendAnnouncement(`Invalid player ID or number of goals.`, player.id, 0xff0000);
                return false;
            }
        } else {
            room.sendAnnouncement(`Usage: !delgoals <playerID> <numberOfGoals>`, player.id, 0xff0000);
            return false;
        }
      }
  }

  if (message.startsWith("!kick #")) {
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

  if (message.startsWith("Y ") || message.startsWith("y ")) {
    var remainingMessage = message.substring(2).trim();
    if (player.admin) {
        var parts = remainingMessage.split(" ");
        var targetPlayerName = parts[0];
        var reason = parts.slice(1).join(" ");

        sendWebhook(goalWebHook, `\`[BOOKINGS]\` 🟨 Player: \`${targetPlayerName}\` Reason: \`${reason}\` `);
        room.sendAnnouncement(`[BOOKINGS] 🟨 Player: ${targetPlayerName} got yellow card for Reason: ${reason}`, null, 0xffffe0, "normal", 1);
    } else {
        room.sendChat("⚠️ You don't have permission", player.id);
    }
    return false; // Prevent the message from being displayed in chat
  }

  if (message.startsWith("R ") || message.startsWith("r ")) {
    var remainingMessage = message.substring(2).trim();
    if (player.admin) {
        var parts = remainingMessage.split(" ");
        var targetPlayerName = parts[0];
        var reason = parts.slice(1).join(" ");

        sendWebhook(goalWebHook, `\`[BOOKINGS]\` 🟥 Player: \`${targetPlayerName}\` Reason: \`${reason}\` `);
        room.sendAnnouncement(`[BOOKINGS] 🟥 Player: ${targetPlayerName} got red card for Reason: ${reason}`, null, 0xffffe0, "normal", 1);
    } else {
        room.sendChat("⚠️ You don't have permission", player.id);
    }
    return false; // Prevent the message from being displayed in chat
  }

  // if (message.startsWith("!reqsub ") || message.startsWith("!reqsub ")) {
  //   var remainingMessage = message.substring(6).trim();
  //   var parts = remainingMessage.split(" ");
  //   var playerout = parts[0];
  //   var playerin = parts.slice(1).join(" ");
    
  //   var playerTeam = (player.team === 1) ? "Red team" : "Blue team";
  //   var playerName = player.name;
  //   var teamEmoji = (player.team === 1) ? "🟥" : "🟦";
    
  //   sendWebhook(goalWebHook, `\`[SUBS REQUEST ${teamEmoji}]\` Captain ${playerName} request subs OUT: \`${playerout}\` IN: \`${playerin}\` `);
  //   room.sendAnnouncement(`[SUBS REQUEST ${teamEmoji}] Captain ${playerName} request (Player out: ${playerout})  (Player in: ${playerin})`, null, 0xffffe0, "normal", 1);
  
  //   return false; // Prevent the message from being displayed in chat
  // }

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

  function findPlayerById(id) {
    var players = room.getPlayerList();
    return players.find(player => player.id === id);
  }

  if (message.startsWith("!sub ") || message.startsWith("!s ")) {
    if (args.length !== 3) {
        room.sendChat("Usage: !sub #<player_id_out> #<player_id_in>");
        return false;
    }
    
    var playerIdOut = parseInt(args[1].substring(1)); // Remove the '#' and parse the ID
    var playerIdIn = parseInt(args[2].substring(1));  // Remove the '#' and parse the ID
    
    var playerOut = findPlayerById(playerIdOut);
    var playerIn = findPlayerById(playerIdIn);
    
    if (!playerOut || !playerIn) {
        room.sendChat("Invalid player IDs.");
        return false;
    }
    
    if (playerOut.team === 0 || playerIn.team !== 0) {
        room.sendChat("Ensure player out is on a team and player in is a spectator.");
        return false;
    }
    room.pauseGame(true);
    setTimeout(() => {
      // Substitute the players
      var teamOut = playerOut.team;
      room.setPlayerTeam(playerOut.id, 0); // Move playerOut to spectators
      room.setPlayerTeam(playerIn.id, teamOut); // Move playerIn to the team of playerOut

      var teamName = teamOut === 1 ? "🟥 Red" : "🟦 Blue";
      room.sendAnnouncement(`${teamName} team subs (Player out: ${playerOut.name}) (Player in: ${playerIn.name}) by captain ${player.name}`, null, 0xffffe0, "normal", 1);
      
      setTimeout(() => {
        room.pauseGame(false);
      }, 100);
    }, 300);
    
    
    return false; // Prevent the message from being broadcasted to all players
  }

  for (let i = 0; i < bannedWords.length; i++) {
    if (message.toLowerCase().includes(bannedWords[i])) {
      if (!player.admin) {
        whisper("⚠️ ʙᴀᴅᴡᴏʀᴅ ᴅᴇᴛᴇᴄᴛᴇᴅ !!", player.id);
        sendWebhook(toxicWebHook, `\`[${player.name}] received warn ( Bad Word Detected ) \``);
        return false;
      }
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
    room.sendAnnouncement("「👓」 This message only you can see, if you want to show your stats, use the command '!showme'!", player.id, 0xff7900, "bold");
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
  } else if (["!goat"].includes(message[0].toLowerCase())) {
    var leaderboard = [];
    try {
        Object.keys(localStorage).forEach(function (key) {
            if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
                var playerGoals = JSON.parse(localStorage.getItem(key))[Ss.GL];
                if (playerGoals > 6) {
                    leaderboard.push({
                        name: JSON.parse(localStorage.getItem(key))[Ss.NK],
                        goals: playerGoals
                    });
                }
            }
        });
    } catch {}

    leaderboard.sort(function (a, b) {
        return b.goals - a.goals;
    });

    if (leaderboard.length < 1) {
        room.sendAnnouncement("[📄] No players have scored goals yet", player.id, 0x73ec59);
        return false;
    }

    var leaderboardMessage = "[📄] GOAT nominated based on Goals ⚽️\n";
    for (var i = 0; i < leaderboard.length; i++) {
        var goatMarker = i === 0 ? "  (🐐 Greatest Of All Time)" : "";
        leaderboardMessage += "[-] " + leaderboard[i].name + " : " + leaderboard[i].goals + " goals" + goatMarker + "\n";
    }

    room.sendAnnouncement(leaderboardMessage.trim(), null, 0x73ec59);
    return false;
  } else if (["!goals"].includes(message[0].toLowerCase())) {
    var leaderboard = [];
    try {
        Object.keys(localStorage).forEach(function (key) {
            if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
                var playerGoals = JSON.parse(localStorage.getItem(key))[Ss.GL];
                if (playerGoals > 0) {
                    leaderboard.push({
                        name: JSON.parse(localStorage.getItem(key))[Ss.NK],
                        goals: playerGoals
                    });
                }
            }
        });
    } catch {}

    leaderboard.sort(function (a, b) {
        return b.goals - a.goals;
    });

    if (leaderboard.length < 1) {
        room.sendAnnouncement("[📄] No players have scored goals yet", player.id, 0x73ec59);
        return false;
    }

    var leaderboardMessage = "[📄] All Player GOALS ⚽️\n";
    for (var i = 0; i < leaderboard.length; i++) {
        var goatMarker = i === 0 ? "  (Top Score" : "";
        leaderboardMessage += "[-] " + leaderboard[i].name + " : " + leaderboard[i].goals + " goals" + goatMarker + "\n";
    }

    room.sendAnnouncement(leaderboardMessage.trim(), player.id, 0x73ec59);
    return false;
  } else if (["!assist"].includes(message[0].toLowerCase())) {
    var leaderboard = [];
    try {
        Object.keys(localStorage).forEach(function (key) {
            if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
                var playerAssists = JSON.parse(localStorage.getItem(key))[Ss.AS];
                if (playerAssists > 0) {
                    leaderboard.push({
                        name: JSON.parse(localStorage.getItem(key))[Ss.NK],
                        assists: playerAssists
                    });
                }
            }
        });
    } catch {}

    leaderboard.sort(function (a, b) {
        return b.assists - a.assists;
    });

    if (leaderboard.length < 1) {
        room.sendAnnouncement("[📄] No players have recorded assists yet", player.id, 0x73ec59);
        return false;
    }

    var leaderboardMessage = "[📄] Player with most Assists 👟\n";
    for (var i = 0; i < leaderboard.length && i < 5; i++) {
        leaderboardMessage += "[-]" + (i + 1) + " " + leaderboard[i].name + ": " + leaderboard[i].assists + "\n";
    }

    room.sendAnnouncement(leaderboardMessage.trim(), null, 0x73ec59);
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
  } else if (["!setadm"].includes(message[0].toLowerCase())) {
    if (message[1] == adminPassword) {
      room.setPlayerAdmin(player.id, true);
      var stats;
      localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name]);
      if (stats[Ss.RL] != "master") {
        stats[Ss.RL] = "master";
        //room.sendAnnouncement(player.name + " ʟᴏɢɢᴇᴅ ɪɴ ᴀꜱ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", null, 0xff7900, 2);
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
  } else if (["!pause", "!p"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (isPaused) {
        room.sendAnnouncement("Game already paused", player.id, 0xffffe0, "normal", 1);
        return false;
      }

      var team = player.team;
      var teamName = team === 1 ? "🟥 Red" : team === 2 ? "🟦 Blue" : "Spectator";

      if (team === 1 && redPauseCount >= maxPauses) {
          room.sendAnnouncement("🟥 Red team has no more pause chances", player.id, 0xffffe0, "normal", 1);
          return false;
      } else if (team === 2 && bluePauseCount >= maxPauses) {
          room.sendAnnouncement("🟦 Blue team has no more pause chances", player.id, 0xffffe0, "normal", 1);
          return false;
      }

      room.pauseGame(true);
      isPaused = true;
      if (team === 1) redPauseCount++;
      if (team === 2) bluePauseCount++;

      room.sendAnnouncement(`${teamName} team captain ${player.name} paused the game for 20 sec`, null, 0xffffe0, "normal", 1);
      pauseTimer = setTimeout(function() {
          room.pauseGame(false);
          isPaused = false;
          room.sendAnnouncement("Game un-paused", null, 0xffffe0, "normal", 1);
      }, 20000);
    }
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
  } else if (["!swap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (args.length == 1) {
        var players = room.getPlayerList().filter((player) => player.id != 0);
        if (players.length == 0) return false;
        players.forEach(function (player) {
          if (player.team == 1) {
            room.setPlayerTeam(player.id, 2);
          }
          if (player.team == 2) {
            room.setPlayerTeam(player.id, 1);
          }
        });
        announce("🔄 Tim Berhasil Ditukar");
      }
    } else {
      whisper("Only Super Admins can clear password", player.id);
    }
  } else if (["!setteamava"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let teamId = parseInt(args[1]);
      let avatarUrl = args[2];

      if ((teamId === 1 || teamId === 2) && avatarUrl) {
          let team = teamId === 1 ? 1 : 2; // 1 for red team, 2 for blue team
          let players = room.getPlayerList();

          players.forEach(p => {
              if (p.team === team) {
                  room.setPlayerAvatar(p.id, avatarUrl);
              }
          });

          //room.sendAnnouncement("Team " + (teamId === 1 ? "Red" : "Blue") + " avatars set by " + player.name, null, 0x00FF00, "normal", 2);
      } else {
          room.sendAnnouncement("Invalid team ID or avatar URL.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can set team avatars", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!setavatar"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);
      let avatarUrl = args[2]; // Assuming the avatar URL is provided as the third argument

      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null) {
          room.setPlayerAvatar(playerId, avatarUrl);
          // room.sendAnnouncement("Player ID " + playerId + "'s avatar set by " + player.name);
      } else {
          room.sendAnnouncement("Invalid player ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can set player avatars", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!resetteamava"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let teamId = parseInt(args[1]);

      if (teamId === 1 || teamId === 2) {
          let team = teamId === 1 ? 1 : 2; // 1 for red team, 2 for blue team
          let players = room.getPlayerList();

          players.forEach(p => {
              if (p.team === team) {
                  room.setPlayerAvatar(p.id, null); // Resetting the avatar to default (null)
              }
          });

          //room.sendAnnouncement("Team " + (teamId === 1 ? "Red" : "Blue") + " avatars reset by " + player.name, null, 0x00FF00, "normal", 2);
      } else {
          room.sendAnnouncement("Invalid team ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can reset team avatars", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!resetavatar"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);

      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null) {
          room.setPlayerAvatar(playerId, null); // Setting avatar to null (default avatar)
          // room.sendAnnouncement("Player ID " + playerId + "'s avatar reset by " + player.name);
      } else {
          room.sendAnnouncement("Invalid player ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can reset player avatars", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!blink"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);
      let intervalId;
      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null) {
          let currentRadius = 15; // Assuming current radius is 15, you should adjust this according to your actual scenario
          let newRadius = 0;
          let direction = 2;

          intervalId = setInterval(() => {
              room.setPlayerDiscProperties(playerId, { radius: newRadius });
              newRadius += direction * 5;

              if (newRadius >= currentRadius || newRadius <= 0) {
                  direction *= -1; // Reverse the direction
              }
          }, 200); // Adjust the interval time as needed

          // Stop blinking after 10 seconds (just an example)
          setTimeout(() => {
              clearInterval(intervalId);
              room.setPlayerDiscProperties(playerId, { radius: currentRadius });
          }, 12000); // 10000 milliseconds = 10 seconds
      } else {
          room.sendAnnouncement("Invalid player ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can make players blink", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!blinkteam"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let teamId = parseInt(args[1]); // 1 for red team, 2 for blue team
      let intervalId;
      let playersInTeam = room.getPlayerList().filter(p => p.team === teamId);

      if (playersInTeam.length > 0) {
          let currentRadius = 15; // Assuming current radius is 15, adjust as necessary
          let newRadius = 0;
          let direction = 2;

          intervalId = setInterval(() => {
              playersInTeam.forEach(p => {
                  room.setPlayerDiscProperties(p.id, { radius: newRadius });
              });
              newRadius += direction * 5;

              if (newRadius >= currentRadius || newRadius <= 0) {
                  direction *= -1; // Reverse the direction
              }
          }, 200); // Adjust the interval time as needed

          // Stop blinking after 10 seconds (just an example)
          setTimeout(() => {
              clearInterval(intervalId);
              playersInTeam.forEach(p => {
                  room.setPlayerDiscProperties(p.id, { radius: currentRadius });
              });
          }, 12000); // 10000 milliseconds = 10 seconds
      } else {
          room.sendAnnouncement("Invalid team ID or no players in the specified team.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can make teams blink", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!blink2"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);
      let intervalId;
      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null) {
          let currentRadius = 15; // Assuming current radius is 15, you should adjust this according to your actual scenario
          let newRadius = 0;
          let direction = 3;

          intervalId = setInterval(() => {
              room.setPlayerDiscProperties(playerId, { radius: newRadius });
              newRadius += direction * 5;

              if (newRadius >= currentRadius || newRadius <= 0) {
                  direction *= -1; // Reverse the direction
              }
          }, 200); // Adjust the interval time as needed

          // Stop blinking after 10 seconds (just an example)
          setTimeout(() => {
              clearInterval(intervalId);
              room.setPlayerDiscProperties(playerId, { radius: currentRadius });
          }, 12000); // 10000 milliseconds = 10 seconds
      } else {
          room.sendAnnouncement("Invalid player ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can make players blink", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!setsize"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);
      let newRadius = parseFloat(args[2]);
      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null && !isNaN(newRadius)) {
          room.setPlayerDiscProperties(playerId, { radius: newRadius });
          // room.sendAnnouncement("Player ID " + playerId + " disc size set to " + newRadius + " by " + player.name);
      } else {
          room.sendAnnouncement("Invalid player ID or radius.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can change player disc properties", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!setteamsize"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let teamId = parseInt(args[1]);
      let newRadius = parseFloat(args[2]);

      if ((teamId === 1 || teamId === 2) && !isNaN(newRadius)) {
          let players = room.getPlayerList();

          players.forEach(p => {
              if (p.team === teamId) {
                  room.setPlayerDiscProperties(p.id, { radius: newRadius });
              }
          });

          room.sendAnnouncement("Team " + (teamId === 1 ? "Red" : "Blue") + " disc sizes set to " + newRadius + " by " + player.name, null, 0x00FF00, "normal", 2);
      } else {
          room.sendAnnouncement("Invalid team ID or radius.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can change team disc sizes", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!reset"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let playerId = parseInt(args[1]);
      let defaultRadius = 15; // Default radius value
      let defaultDiscProperties = {
        radius: defaultRadius,
        bCoef: 0.1,
        invMass: 0.5,
        damping: 0.955,
        acceleration: 0.132,
        kickingAcceleration: 0.06,
        kickingDamping: 0.96,
        kickStrength: 5.9,
        kickback: 0
      };

      let targetPlayer = room.getPlayer(playerId);

      if (targetPlayer !== null) {
          room.setPlayerDiscProperties(playerId, defaultDiscProperties);
          // room.sendAnnouncement("Player ID " + playerId + " disc size reset to " + defaultRadius + " by " + player.name);
      } else {
          room.sendAnnouncement("Invalid player ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can reset player disc properties", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!resetteam"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let teamId = parseInt(args[1]);
      let defaultDiscProperties = {
        radius: 15,
        bCoef: 0.1,
        invMass: 0.5,
        damping: 0.955,
        acceleration: 0.132,
        kickingAcceleration: 0.06,
        kickingDamping: 0.96,
        kickStrength: 5.9,
        kickback: 0
      };

      if (teamId === 1 || teamId === 2) {
          let players = room.getPlayerList();

          players.forEach(p => {
              if (p.team === teamId) {
                  room.setPlayerDiscProperties(p.id, defaultDiscProperties);
              }
          });

          //room.sendAnnouncement("Team " + (teamId === 1 ? "Red" : "Blue") + " disc sizes reset to default by " + player.name, null, 0x00FF00, "normal", 2);
      } else {
          room.sendAnnouncement("Invalid team ID.", player.id, 0xff0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can reset team disc properties", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!setsizeall"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let newRadius = parseFloat(args[1]); // Assuming the size argument is the first argument after the command

      // Iterate over all players in the room
      room.getPlayerList().forEach(targetPlayer => {
          // Set the new disc size for each player
          room.setPlayerDiscProperties(targetPlayer.id, { radius: newRadius });
      });

      // Inform about the action
      // room.sendAnnouncement("All player discs size set to " + newRadius + " by " + player.name);
    } else {
        room.sendAnnouncement("Only Super Admins can change player disc properties", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!resetall"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let defaultRadius = 15; // Default radius value
      let defaultDiscProperties = {
        radius: defaultRadius,
        bCoef: 0.1,
        invMass: 0.5,
        damping: 0.955,
        acceleration: 0.132,
        kickingAcceleration: 0.06,
        kickingDamping: 0.96,
        kickStrength: 5.9,
        kickback: 0
      };

      // Iterate over all players in the room
      room.getPlayerList().forEach(targetPlayer => {
          // Set the default disc properties for each player
          room.setPlayerDiscProperties(targetPlayer.id, defaultDiscProperties);
      });

      // room.sendAnnouncement("All player discs size reset to normal by " + player.name);
    } else {
        room.sendAnnouncement("Only Super Admins can reset player disc properties", player.id, 0xff0000, "normal", 2);
    }
  } else if (["!start", "!fixstart"].includes(message[0].toLowerCase())) {
    if (room.getScores() == null) {
      room.startGame();
    } else {
      whisper("Cannot start while game in progress", player.id);
    }
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
  } else if (["!amb1red"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(1, 90, 0xF2F2F2, [0x000000, 0x181818, 0x111111]);
    } 
  } else if (["!amb1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xF2F2F2, [0x000000, 0x181818, 0x111111]);
      } 
  } else if (["!amb2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0x000000, [0xBC00BC, 0xD800C2, 0xC200B4]);
      } 
  }  else if (["!amb2blue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 90, 0x000000, [0xBC00BC, 0xD800C2, 0xC200B4]);
    } 
  } else if (["!btz1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xFFCD06, [0xFFFFFF, 0xFF0000, 0xCC0000]);
      } 
  } else if (["!btz1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xFFCD06, [0xFFFFFF, 0xFF0000, 0xCC0000]);
      } 
  } else if (["!btz2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0xEECB36, [0xFFFFFF, 0xFFFFFF, 0xFFFFFF]);
      } 
  } else if (["!btz2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0xEECB36, [0xFFFFFF, 0xFFFFFF, 0xFFFFFF]);
      } 
  } else if (["!cas1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 360, 0xF0CA0C, [0x004077, 0xE8E8E8]);
      } 
  } else if (["!cas1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 360, 0xF0CA0C, [0x004077, 0xE8E8E8]);
      } 
  } else if (["!cas2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 340, 0xE3B709, [0x1F1F1F, 0x0A0A0A, 0x0A0A0A]);
      } 
  } else if (["!cas2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 340, 0xE3B709, [0x1F1F1F, 0x0A0A0A, 0x0A0A0A]);
      } 
  } else if (["!crs1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 270, 0xFFFFFF, [0x0025A6, 0x238DED, 0x14CAEC]);
      } 
  } else if (["!crs1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 270, 0xFFFFFF, [0x0025A6, 0x238DED, 0x14CAEC]);
      } 
  } else if (["!crs2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 270, 0xFFFFFF , [0x084847, 0x145F75, 0x2D9DA6]);
      } 
  } else if (["!crs2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 270, 0xFFFFFF , [0x084847, 0x145F75, 0x2D9DA6]);
      } 
  } else if (["!gs1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 39, 0x000000, [0xFFFFFF, 0xF6FF00, 0xFFFFFF]);
      } 
  } else if (["!gs1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 39, 0x000000, [0xFFFFFF, 0xF6FF00, 0xFFFFFF]);
      } 
  } else if (["!gs2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 44, 0xF7FF25, [0x060056, 0x0D0042, 0x0B002E]);
      } 
  } else if (["!gs2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 44, 0xF7FF25, [0x060056, 0x0D0042, 0x0B002E]);
      } 
  } else if (["!grd1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xE0BC57, [0xB71D1D, 0x941717, 0xB71D1D ]);
      } 
  } else if (["!grd1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xE0BC57, [0xB71D1D, 0x941717, 0xB71D1D ]);
      } 
  } else if (["!grd2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0xE0BC57, 0xCFAD50, 0xE0BC57]);
      } 
  } else if (["!grd2blue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setTeamColors(2, 0, 0xffffff, [0xE0BC57, 0xCFAD50, 0xE0BC57]);
    } 
  } else if (["!rfc1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xFFFFFF, [0xACA1FF, 0xFFFFFF, 0xC0B0FF]);
      } 
  } else if (["!rfc1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xFFFFFF, [0xACA1FF, 0xFFFFFF, 0xC0B0FF]);
      } 
  } else if (["!rfc2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0x141497, 0x3862FF, 0x201BFF]);
      } 
  } else if (["!rfc2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x141497, 0x3862FF, 0x201BFF]);
      } 
  } else if (["!svk1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0x000000,  0x0E24FF ]);
      } 
  } else if (["!svk1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x000000,  0x0E24FF ]);
      } 
  } else if (["!svk2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 60, 0xffffff, [0x000000, 0x0E24FF]); 
      } 
  } else if (["!svk2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 60, 0xffffff, [0x000000, 0x0E24FF]);
      } 
  } else if (["!fox1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 140, 0xffffff, [0xFF3C00, 0xFF0000, 0xFF3C00]);
      } 
  } else if (["!fox1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 140, 0xffffff, [0xFF3C00, 0xFF0000, 0xFF3C00]);
      } 
  } else if (["!fox2red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 46, 0xFFFFFF , [0x000000, 0x000103, 0xFFBC05]);
      }
  } else if (["!fox2blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 46, 0xFFFFFF , [0x000000, 0x000103, 0xFFBC05]);
      }
  } else if (["!zx1red"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(1, 48, 0xFFFFFF, [0xD1AD4D, 0x000000, 0x0F0F0F]);
      } 
  } else if (["!zx1blue"].includes(message[0].toLowerCase())) {
      if (player.admin) {
        room.setTeamColors(2, 48, 0xFFFFFF, [0xD1AD4D, 0x000000, 0x0F0F0F]);
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
        penKick = false;
        console.log(`penKick = false`);
        room.stopGame();
        loadMap(practiceMap);
        room.setTimeLimit(5);
        // room.startGame();
      } 
  } else if (["!penmap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = true;
        console.log(`penKick = true`);
        room.stopGame();
        loadMap(penMap);
        // room.startGame();
      } else {
        if (room.getScores() == null) {
          loadMap(penMap);
          penKick = true;
          console.log(`penKick = true`);
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
  } else if (["!disableglobal"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      globalChatEnabled = false;
      room.sendAnnouncement("Global chat disabled", null, 0xdee7fa);
    } 
  } else if (["!enableglobal"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      globalChatEnabled = true;
      room.sendAnnouncement("Global chat enabled", null, 0xdee7fa);
    } 
  } else if (["!hideball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { color: -1, radius:"0" });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!showball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { radius:"9.6", invMass : "1", color: "0xFFFFFF", bounciness : "0.8", damping : "0.9888" });
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

    if (player.admin == true) {
      announcement += "[🌐Admin] ";
      chatColor = "0x99ffff";
    } else {
      announcement += "[💠Player] "; 
      chatColor = "0xEDEDED";
      return false;
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
  //room.setDiscProperties(0, { invMass: 1.05 });
  isTurneyStarted = true;
  console.log(`isTurneyStarted = true`);
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
  room.sendAnnouncement(centerText("Game Duration: " + gameTime + " minutes / Half"), null, 0x2ef55d, "bold");
  room.sendAnnouncement(centerText("RSI Futsal Event 1v1"), null, 0x5ee7ff);
  room.startRecording();
  // sendWebhook(goalWebHook, `\`𝙆𝙄𝘾𝙆 𝙊𝙁𝙁\` - \`${gameTime} minutes\``);
    
  if(freeze.length > 0){
    freeze = [];
  }

};

room.onGameStop = function (byPlayer) {
  isTurneyStarted = false;
  console.log(`isTurneyStarted = false`);
  announcement30sSent = false; 
  announcement20sSent = false; 
  announcement10sSent = false;
  // sendWebhook(goalWebHook, `\`FULL TIME\``)
  sendDiscordRecording();
  // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
  if(freeze.length > 0){
    freeze = [];
  }
  redPauseCount = 0;
  bluePauseCount = 0;
  globalChatEnabled = true;
  //whisper("Global chat enabled", null);
};

room.onGameUnpause = function (byPlayer) {
  // if ((TeamR.length == 4 && TeamB.length == 4 && inChooseMode) || (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)) {
  //   deactivateChooseMode();
  // }
};

// Function to teleport discs to their specific coordinates (RSI CELEBRATION)
const playerDiscOriginalRadius = {};

const originalDiscPositions = {
  33: { x: -374, y: 766 },
  34: { x: -374, y: 766 },
  35: { x: -374, y: 766 },
  36: { x: -374, y: 766 },
  37: { x: -374, y: 766 },
  38: { x: -374, y: 766 },
  39: { x: -374, y: 766 },
  40: { x: -374, y: 766 },
  41: { x: -374, y: 766 },
  42: { x: -374, y: 766 },
  43: { x: -374, y: 766 },
  44: { x: -374, y: 766 },
  45: { x: -374, y: 766 },
  46: { x: -374, y: 766 },
  47: { x: -374, y: 766 },
  48: { x: -374, y: 766 },
  49: { x: -374, y: 766 },
  50: { x: -374, y: 766 },
  51: { x: -374, y: 766 },
  52: { x: -374, y: 766 },
  53: { x: -374, y: 766 },
  54: { x: -374, y: 766 },
  55: { x: -374, y: 766 },
  56: { x: -374, y: 766 },
  57: { x: -374, y: 766 }
};

function teleportDiscs() {
  const lastPlayerTouched = lastPlayersTouched[0];
  if (lastPlayerTouched && lastPlayerTouched.team !== 0) { // Ensure the player is in a team
    const discProperties = room.getPlayerDiscProperties(lastPlayerTouched.id);
    var ballPosition = room.getBallPosition();
    if (discProperties) {
      playerDiscOriginalRadius[lastPlayerTouched.id] = discProperties.radius;
      room.setPlayerDiscProperties(lastPlayerTouched.id, { radius: 0 });
      room.setDiscProperties(0, { color: -1, radius: 0 });

      var discColor = discProperties.x < 0 ? 0x19B1DE : 0xFE4141; // Blue if x < 0, Red if x > 0

      room.setDiscProperties(33, { x: discProperties.x, y: discProperties.y, xspeed: 3, yspeed: 2, radius: 5.6, color: discColor });
      room.setDiscProperties(34, { x: discProperties.x, y: discProperties.y, xspeed: 0, yspeed: 3, radius: 5.6, color: discColor });
      room.setDiscProperties(35, { x: discProperties.x, y: discProperties.y, xspeed: 3, yspeed: 0, radius: 5.6, color: discColor });
      room.setDiscProperties(36, { x: discProperties.x, y: discProperties.y, xspeed: -2, yspeed: 0, radius: 5.6, color: discColor });
      room.setDiscProperties(37, { x: discProperties.x, y: discProperties.y, xspeed: 0, yspeed: -3, radius: 5.6, color: discColor });
      room.setDiscProperties(38, { x: discProperties.x, y: discProperties.y, xspeed: -4, yspeed: 0, radius: 5.6, color: discColor });
      room.setDiscProperties(39, { x: discProperties.x, y: discProperties.y, xspeed: -3, yspeed: -2, radius: 5.6, color: discColor });
      room.setDiscProperties(40, { x: discProperties.x, y: discProperties.y, xspeed: -2, yspeed: 2, radius: 5.6, color: discColor });
      room.setDiscProperties(41, { x: discProperties.x, y: discProperties.y, xspeed: 2, yspeed: -4, radius: 5.6, color: discColor });
      room.setDiscProperties(42, { x: discProperties.x, y: discProperties.y, xspeed: 1, yspeed: -2, radius: 5.6, color: discColor });
      room.setDiscProperties(43, { x: discProperties.x, y: discProperties.y, xspeed: -3, yspeed: -3, radius: 5.6, color: discColor });
      room.setDiscProperties(44, { x: discProperties.x, y: discProperties.y, xspeed: 2, yspeed: -1, radius: 5.6, color: discColor });
      room.setDiscProperties(45, { x: discProperties.x, y: discProperties.y, xspeed: -1, yspeed: 1, radius: 5.6, color: discColor });
      room.setDiscProperties(46, { x: discProperties.x, y: discProperties.y, xspeed: 3, yspeed: -1, radius: 5.6, color: discColor });
      room.setDiscProperties(47, { x: discProperties.x, y: discProperties.y, xspeed: -2, yspeed: 3, radius: 5.6, color: discColor });
      room.setDiscProperties(48, { x: discProperties.x, y: discProperties.y, xspeed: 2, yspeed: 2, radius: 5.6, color: discColor });
      room.setDiscProperties(49, { x: discProperties.x, y: discProperties.y, xspeed: -1, yspeed: -1, radius: 5.6, color: discColor });
      
      room.setDiscProperties(50, { x: ballPosition.x, y: ballPosition.y, xspeed: 1, yspeed: -2, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(51, { x: ballPosition.x, y: ballPosition.y, xspeed: -3, yspeed: -3, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(52, { x: ballPosition.x, y: ballPosition.y, xspeed: 2, yspeed: -1, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(53, { x: ballPosition.x, y: ballPosition.y, xspeed: -1, yspeed: 1, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(54, { x: ballPosition.x, y: ballPosition.y, xspeed: 3, yspeed: -1, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(55, { x: ballPosition.x, y: ballPosition.y, xspeed: -2, yspeed: 3, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(56, { x: ballPosition.x, y: ballPosition.y, xspeed: 2, yspeed: 2, radius: 5.6, color: 0xFFFFFF });
      room.setDiscProperties(57, { x: ballPosition.x, y: ballPosition.y, xspeed: -1, yspeed: -1, radius: 5.6, color: 0xFFFFFF });
    }
  }
}

// Function to teleport discs at intervals
function teleportDiscsfire() {
  const playerWhoScored = lastPlayersTouched[0];
  
  if (playerWhoScored && playerWhoScored.team !== 0) { // Ensure the player is in a team
    const discProperties = room.getPlayerDiscProperties(playerWhoScored.id);
    
    if (discProperties) {
      var discColor = discProperties.x < 0 ? 0x19B1DE : 0xFE4141; // Blue if x < 0, Red if x > 0

      // Calculate the angle step for distributing the discs in different directions
      const numDiscs = 17; // Number of discs to shoot
      const angleStep = (2 * Math.PI) / numDiscs; // Full circle divided by the number of discs
      const speed = 10; // Speed of the discs

      for (let i = 0; i < numDiscs; i++) {
        const angle = i * angleStep;
        const xspeed = speed * Math.cos(angle);
        const yspeed = speed * Math.sin(angle);

        room.setDiscProperties(33 + i, {
          x: discProperties.x,
          y: discProperties.y,
          xspeed: xspeed,
          yspeed: yspeed,
          radius: 5.6,
          color: discColor
        });
      }
    }
  }
}

function teleportDiscsTiga() {
  var ballPosition = room.getBallPosition();
  var teleportX = ballPosition.x < 0 ? -1150 : 1150;
  var teleportY = -124;
  var teleportXdua = ballPosition.x < 0 ? -1151: 1151;
  var teleportYdua = 124;

  // Set properties for each disc with specific colors
  room.setDiscProperties(33, { x: teleportX, y: teleportY, xspeed: 1, yspeed: 0, radius: 5.2, color: 0xFE4141 }); // red
  room.setDiscProperties(34, { x: teleportX, y: teleportY, xspeed: 1, yspeed: 1, radius: 5.2, color: 0xF43C33 }); // green
  room.setDiscProperties(35, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 0, radius: 5.2, color: 0xF7726B }); // sky blue
  room.setDiscProperties(36, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 1, radius: 5.2, color: 0xA0160F }); // pink
  room.setDiscProperties(37, { x: teleportX, y: teleportY, xspeed: 0, yspeed: -1, radius: 5.2, color: 0xC6605B }); // yellow
  room.setDiscProperties(38, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 2, radius: 5.2, color: 0xEC2D50 }); // red
  room.setDiscProperties(39, { x: teleportX, y: teleportY, xspeed: 2, yspeed: -1, radius: 5.2, color: 0xC6605B }); // yellow
  room.setDiscProperties(40, { x: teleportX, y: teleportY, xspeed: 1, yspeed: 2, radius: 5.2, color: 0xEC2D50 }); // red

  room.setDiscProperties(41, { x: teleportXdua, y: teleportYdua, xspeed: 1, yspeed: 0, radius: 5.2, color: 0x4463D4 }); // green
  room.setDiscProperties(42, { x: teleportXdua, y: teleportYdua, xspeed: 1, yspeed: 1, radius: 5.2, color: 0x87CEEB }); // sky blue
  room.setDiscProperties(43, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 0, radius: 5.2, color: 0x0C00FF }); // pink
  room.setDiscProperties(44, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 1, radius: 5.2, color: 0x001597 }); // yellow
  room.setDiscProperties(45, { x: teleportXdua, y: teleportYdua, xspeed: 0, yspeed: -1, radius: 5.2, color: 0x3A4275 }); // red
  room.setDiscProperties(46, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 2, radius: 5.2, color: 0x18CACC }); // green
  room.setDiscProperties(47, { x: teleportXdua, y: teleportYdua, xspeed: 2, yspeed: -1, radius: 5.2, color: 0x3A4275 }); // red
  room.setDiscProperties(48, { x: teleportXdua, y: teleportYdua, xspeed: 1, yspeed: 2, radius: 5.2, color: 0x18CACC }); // green
}

// Function to reset discs to their original positions
function resetDiscs() {
  for (const discId in originalDiscPositions) {
    const pos = originalDiscPositions[discId];
    room.setDiscProperties(parseInt(discId), { x: pos.x, y: pos.y, xspeed: 0, yspeed: 0, radius: 0 });
  }

  // Reset player disc properties to their original radius
  const players = room.getPlayerList();
  players.forEach(player => {
    if (player.id in playerDiscOriginalRadius) {
      room.setPlayerDiscProperties(player.id, { radius: playerDiscOriginalRadius[player.id] });
    }
  });

  room.setDiscProperties(0, { radius: 9, color: 0xFFFFFF });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Function to get a new random choice that is not the same as the previous one
function getNewChoice(previous, min, max) {
  let newChoice;
  do {
    newChoice = getRandomInt(min, max);
  } while (newChoice === previous);
  return newChoice;
}

let previousChoice = -1;

room.onTeamGoal = function (team) {
  // updateScores(team); //update scores halftime + fulltime
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

  // if (!penKick) {
  //   // Get a new random choice
  //   let randomChoice = getNewChoice(previousChoice, 0, 3);
    
  //   // Call the chosen function
  //   if (randomChoice === 0) {
  //     teleportDiscs();
  //   } else if (randomChoice === 1) {
  //     teleportDiscsfire();
  //   } else {
  //     teleportDiscsTiga();
  //   }
  //   previousChoice = randomChoice;
  //   setTimeout(resetDiscs, 2000);
  // }
  if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      // var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | ⚽ ɢᴏᴀʟ sᴄᴏʀᴇᴅ ʙʏ ${lastPlayersTouched[0].name} | ᴀssɪsᴛ ʙʏ - ${lastPlayersTouched[1].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });
      // announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " ( 🅰️ Assist: " + lastPlayersTouched[1].name + " ) 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      // room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      avatarCelebration(goalMaker, "⚽", "🎯");
      
      sendWebhook(goalWebHook, `\`[GOAL]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` ** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      // var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];

      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | ⚽ ɢᴏᴀʟ sᴄᴏʀᴇᴅ ʙʏ ${lastPlayersTouched[0].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });
      // announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      // room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      avatarCelebration(goalMaker, "⚽", "🎯");

      sendWebhook(goalWebHook, `\`[GOAL]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` ** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      avatarCelebration(goalAssist, "🤝", "👟");

    }
  } else {
    //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: 🤦‍♂️ I'm sure it was unintentional, right!! 🤦‍♂️", null, 0xffffe0, "normal");
    //announce("[OWN GOAL] ☠️ Scorer: " + lastPlayersTouched[0].name + " 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
    const text = [
      `──────────────────────────────────────────────────────`,
      `     ${goalTime} | ☠️ ᴏᴡɴ ɢᴏᴀʟ sᴄᴏʀᴇᴅ ʙʏ ${lastPlayersTouched[0].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
      `──────────────────────────────────────────────────────`
    ];
    text.forEach(line => {
      room.sendAnnouncement(line, null, 0xFB6B6B, "small");
    });

    sendWebhook(goalWebHook, `\`[OWN-GOAL]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` ** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
    game.goals.push(new Goal(scores.time, team, null, null));
    avatarCelebration(goalMaker, "🤦‍♂️", "🤡");

    //golcontra(lastPlayersTouched[0]);
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
    // sendDiscordRecording();
    // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
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
  // if (!penKick) {
  //   handleBallTouch();
  //   realSoccerRef();
  // }
  // if (!isTurneyStarted) {
  //   checkTime();
  // }

  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
  handleFrozenPlayerMoves();
  if (isTurneyStarted) {
    const gameTimeRemaining = game.time;
    if (gameTimeRemaining === 5 * 60) {
      pauseAndResumeGame();
    }
    if (gameTimeRemaining === 5 * 60 - 10 && countdownTimeouts.length === 0) {
      countdownToHalfTime();
    }
  }
  if (!isFirstHalf) {
    const gameTimeRemaining = game.time;
    if (gameTimeRemaining === 5 * 60) {
      stopFullTime();
    }
  }
  if (!isFirstHalf) {
    var time = room.getScores().time;
    
    if (time >= 4 * 60 + 30 && !announcement30sSent) {
        announce(`Full Time in 30 seconds ⏳`);
        announcement30sSent = true;
    } else if (time >= 4 * 60 + 40 && !announcement20sSent) {
        announce(`Full Time in 20 seconds ⏳`);
        announcement20sSent = true;
    } else if (time >= 4 * 60 + 50 && !announcement10sSent) {
        announce(`Full Time in 10 seconds ⏳`);
        announcement10sSent = true;
    }
  }
};

function stopFullTime() {
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;

  room.stopGame(true);

  // Display full-time announcement
  room.sendAnnouncement(centerText("🏆 FULL TIME 🏆"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
  room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  //sendWebhook(goalWebHook, `\`[SECOND-HALF]\`** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
  isFirstHalf = true;
  console.log(`isFirstHalf = true`);
}

function pauseAndResumeGame() {
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  room.stopGame(true);

  setTimeout(() => {
  room.sendAnnouncement(centerText("🏆 HALF TIME (15 Seconds) 🏆"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
  room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball Possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  //sendWebhook(goalWebHook, `\`[FIRST-HALF]\`** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
  }, 700);

  setTimeout(() => {
    swapTeamsAndAnnounce();
  }, 1800);
  
  isTurneyStarted = false;
  console.log(`isTurneyStarted = false`);

  setTimeout(() => {
    let timeLeft = 10; // Time left before resuming in seconds
    let timerId = setInterval(() => {
      if (timeLeft > 0) {
        announce(`Kick-off in ${timeLeft} seconds ⏳`);
        timeLeft--;
      } else {
        clearInterval(timerId);
        room.startGame();
        announce("⚽ KICK OFF - SECOND HALF ⚽");
        // sendWebhook(goalWebHook, `\`𝙆𝙄𝘾𝙆 𝙊𝙁𝙁 - SECOND HALF\` - \`${gameTime} minutes\``);
        setTimeout(() => {
          isTurneyStarted = false;
          console.log(`isTurneyStarted = false`);
          isFirstHalf = false;
          console.log(`isFirstHalf = false`);
        }, 8000);
      }
    }, 1000); // Repeat every second
  }, 5 * 1000); // 50 * 1000 seconds after initial pause 
}

function countdownToHalfTime() {
  let timeLeft = 10; // Countdown time in seconds

  for (let i = 0; i <= timeLeft; i++) {
    countdownTimeouts.push(setTimeout(() => {
      if (i < timeLeft) {
        announce(`Half Time in ${timeLeft - i} seconds ⏳`);
      } else {
        // Clear all timeouts to reset the state
        countdownTimeouts.forEach(timeout => clearTimeout(timeout));
        countdownTimeouts = [];
      }
    }, i * 1000)); // Announce every second
  }
}

function swapTeamsAndAnnounce() {
  var players = room.getPlayerList().filter((player) => player.id != 0);
  if (players.length == 0) return false;
  
  players.forEach(function (player) {
    if (player.team == 1) {
      room.setPlayerTeam(player.id, 2);
    } else if (player.team == 2) {
      room.setPlayerTeam(player.id, 1);
    }
  });
  
  announce("🔄 Teams Swapped");
}

// function realSoccerRef() {
//   blockThrowIn();
//   blockGoalKick();
//   removeBlock();
//   // if (game.time == gameTime * 60 && game.extraTimeAnnounced == false) {
//   //    extraTime();
//   //    game.extraTimeAnnounced = true;
//   // }

//   // if (game.time == game.extraTimeEnd && game.lastPlayAnnounced == false) {
//   //   announce("Peluang Terakhir", null, null, null, 1);
//   //   game.lastPlayAnnounced = true;
//   // }

//   if (game.rsCorner == true || game.rsGoalKick == true) {
//     //add extra time
//     game.extraTimeCount++;
//   }

//   if (game.rsTimer < 99999 && game.paused == false && game.rsActive == false && game.rsReady == true) {
//     game.rsTimer++;
//   }

//   if (game.rsSwingTimer < 150 && game.rsCorner == false && game.rsGoalKick == false) {
//     game.rsSwingTimer++;
//     if (game.rsSwingTimer > 5) {
//       room.setDiscProperties(0, { xgravity: room.getDiscProperties(0).xgravity * 0.97, ygravity: room.getDiscProperties(0).ygravity * 0.97 });
//     }
//     if (game.rsSwingTimer == 150) {
//       room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
//     }
//   }

//   if (game.boosterState == true) {
//     game.boosterCount++;
//   }

//   if (game.boosterCount > 30) {
//     game.boosterState = false;
//     game.boosterCount = 0;
//     room.setDiscProperties(0, { cMask: 63 });
//   }

//   if (room.getBallPosition().x == 0 && room.getBallPosition().y == 0) {
//     game.rsActive = true;
//     game.outStatus = "";
//   }

//   if (game.rsActive == false && game.rsReady == true) {
//     //expire barrier time
//     if (game.outStatus == "redThrow") {
//       if (game.rsTimer == throwTimeOut - 120) {
//         // warning indicator
//         ballWarning("0xff3f34", ++game.warningCount);
//       }
//       if (game.rsTimer == throwTimeOut && game.bringThrowBack == false) {
//         // switch to blue throw
//         game.outStatus = "blueThrow";
//         game.rsTimer = 0;
//         room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         sleep(100).then(() => {
//           room.setDiscProperties(0, { color: "0x0fbcf9", xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY });
//         });
//       }
//     } else if (game.outStatus == "blueThrow") {
//       if (game.rsTimer == throwTimeOut - 120) {
//         // warning indicator
//         ballWarning("0x0fbcf9", ++game.warningCount);
//       }
//       if (game.rsTimer == throwTimeOut && game.bringThrowBack == false) {
//         // switch to red throw
//         game.outStatus = "redThrow";
//         game.rsTimer = 0;
//         room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         sleep(100).then(() => {
//           room.setDiscProperties(0, { color: "0xff3f34", xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY });
//         });
//       }
//     } else if (game.outStatus == "blueGK" || game.outStatus == "redGK") {
//       if (game.rsTimer == gkTimeOut - 120) {
//         // warning indicator
//         if (game.outStatus == "blueGK") {
//           ballWarning("0x0fbcf9", ++game.warningCount);
//         }
//         if (game.outStatus == "redGK") {
//           ballWarning("0xff3f34", ++game.warningCount);
//         }
//       }
//       if (game.rsTimer == gkTimeOut) {
//         game.outStatus = "";
//         room.setDiscProperties(0, { color: "0xffffff" });
//         game.rsTimer = 1000000;
//       }
//     } else if (game.outStatus == "blueCK" || game.outStatus == "redCK") {
//       if (game.rsTimer == ckTimeOut - 120) {
//         if (game.outStatus == "blueCK") {
//           ballWarning("0x0fbcf9", ++game.warningCount);
//         }
//         if (game.outStatus == "redCK") {
//           ballWarning("0xff3f34", ++game.warningCount);
//         }
//       }
//       if (game.rsTimer == ckTimeOut) {
//         game.outStatus = "";
//         room.setDiscProperties(1, { x: 0, y: 2000, radius: 0 });
//         room.setDiscProperties(2, { x: 0, y: 2000, radius: 0 });
//         room.setDiscProperties(0, { color: "0xffffff" });
//         game.rsTimer = 1000000;
//       }
//     }
//   }

//   if (game.rsActive == true) {
//     if (room.getBallPosition().y > 611.45 || room.getBallPosition().y < -611.45) {
//       game.rsActive = false;
//       if (game.lastPlayAnnounced == true) {
//         room.stopGame(true);
//         game.lastPlayAnnounced = false;
//         announce("⚽ FULL TIME ⚽");
//         announce("⚽ FULL TIME ⚽");
//         room.setTimeLimit(gameTime);
//         // sendDiscordRecording();
//         // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
//       }

//       room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });

//       game.ballOutPositionX = Math.round(room.getBallPosition().x * 10) / 10;
//       if (room.getBallPosition().y > 611.45) {
//         game.ballOutPositionY = 400485;
//         game.throwInPosY = 610;
//       }
//       if (room.getBallPosition().y < -611.45) {
//         game.ballOutPositionY = -400485;
//         game.throwInPosY = -610;
//       }
//       if (room.getBallPosition().x > 1130) {
//         game.ballOutPositionX = 1130;
//       }
//       if (room.getBallPosition().x < -1130) {
//         game.ballOutPositionX = -1130;
//       }

//       if (game.rsTouchTeam == 1) {
//         room.setDiscProperties(3, { x: game.ballOutPositionX, y: game.throwInPosY, radius: 18 });
//         sleep(100).then(() => {
//           game.outStatus = "blueThrow";
//           game.throwinKicked = false;
//           game.rsTimer = 0;
//           game.rsReady = true;
//           room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY, xgravity: 0, ygravity: 0 });
//           //announce("🖐️ Throw In: 🔵 Blue");
//           room.setDiscProperties(0, { color: "0x0fbcf9" });
//         });
//         sleep(100).then(() => {
//           room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         });
//       } else {
//         room.setDiscProperties(3, { x: game.ballOutPositionX, y: game.throwInPosY, radius: 18 });
//         sleep(100).then(() => {
//           game.outStatus = "redThrow";
//           game.throwinKicked = false;
//           game.rsTimer = 0;
//           game.rsReady = true;
//           room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: game.ballOutPositionX, y: game.throwInPosY, xgravity: 0, ygravity: 0 });
//           //announce("🖐️ Throw In: 🔴 Red");
//           room.setDiscProperties(0, { color: "0xff3f34" });
//         });
//         sleep(100).then(() => {
//           room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         });
//       }
//     }

//     if (room.getBallPosition().x > 1161.45 && (room.getBallPosition().y > 124 || room.getBallPosition().y < -124)) {
//       game.rsActive = false;
//       if (game.lastPlayAnnounced == true) {
//         room.stopGame(true);
//         game.lastPlayAnnounced = false;
//         announce("⚽ FULL TIME ⚽");
//         announce("⚽ FULL TIME ⚽");
//         room.setTimeLimit(gameTime);
//         // sendDiscordRecording();
//         // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
//       }
//       room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
//       room.getPlayerList().forEach(function (player) {
//         room.setPlayerDiscProperties(player.id, { invMass: 100000 });
//       });

//       if (game.rsTouchTeam == 1) {
//         room.setDiscProperties(3, { x: 1060, y: 0, radius: 18 });
//         sleep(100).then(() => {
//           game.outStatus = "blueGK";
//           game.rsTimer = 0;
//           game.rsReady = true;
//           //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the blue team 🥅", null, 0xffffe0, "normal");
//           game.rsGoalKick = true;
//           game.rsSwingTimer = 0;
//           game.boosterCount = 0;
//           game.boosterState = false;
//           room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 1060, y: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
//         });
//         sleep(3000).then(() => {
//           room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         });
//       } else {
//         //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the red team 🚩", null, 0xffffe0, "normal");
//         game.rsSwingTimer = 0;
//         if (room.getBallPosition().y < -124) {
//           room.setDiscProperties(3, { x: 1140, y: -590, radius: 18 });
//           sleep(100).then(() => {
//             game.rsCorner = true;
//             game.outStatus = "redCK";
//             game.rsTimer = 0;
//             game.rsReady = true;
//             game.boosterCount = 0;
//             game.boosterState = false;
//             room.setDiscProperties(0, { x: 1140, y: -590, xspeed: 0, yspeed: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
//             room.setDiscProperties(2, { x: 1150, y: -670, radius: 420 });
//             room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//           });
//         }
//         if (room.getBallPosition().y > 124) {
//           room.setDiscProperties(3, { x: 1140, y: 590, radius: 18 });
//           sleep(100).then(() => {
//             game.rsCorner = true;
//             game.outStatus = "redCK";
//             game.rsTimer = 0;
//             game.rsReady = true;
//             game.boosterCount = 0;
//             game.boosterState = false;
//             room.setDiscProperties(0, { x: 1140, y: 590, xspeed: 0, yspeed: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
//             room.setDiscProperties(2, { x: 1150, y: 670, radius: 420 });
//             room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//           });
//         }
//       }
//     }
//     if (room.getBallPosition().x < -1161.45 && (room.getBallPosition().y > 124 || room.getBallPosition().y < -124)) {
//       game.rsActive = false;
//       if (game.lastPlayAnnounced == true) {
//         room.stopGame(true);
//         game.lastPlayAnnounced = false;
//         announce("⚽ FULL TIME ⚽");
//         announce("⚽ FULL TIME ⚽");
//         room.setTimeLimit(gameTime);
//         // sendDiscordRecording();
//         // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
//       }
//       room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
//       room.getPlayerList().forEach(function (player) {
//         room.setPlayerDiscProperties(player.id, { invMass: 100000 });
//       });

//       if (game.rsTouchTeam == 1) {
//         //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the blue team🚩", null, 0xffffe0, "normal");
//         game.rsSwingTimer = 0;
//         if (room.getBallPosition().y < -124) {
//           room.setDiscProperties(3, { x: -1140, y: -590, radius: 18 });
//           sleep(100).then(() => {
//             game.rsCorner = true;
//             game.outStatus = "blueCK";
//             game.rsTimer = 0;
//             game.rsReady = true;
//             game.boosterCount = 0;
//             game.boosterState = false;
//             room.setDiscProperties(0, { x: -1140, y: -590, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
//             room.setDiscProperties(1, { x: -1150, y: -670, radius: 420 });
//             room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//           });
//         }
//         if (room.getBallPosition().y > 124) {
//           room.setDiscProperties(3, { x: -1140, y: 590, radius: 18 });
//           sleep(100).then(() => {
//             game.rsCorner = true;
//             game.outStatus = "blueCK";
//             game.rsTimer = 0;
//             game.rsReady = true;
//             game.boosterCount = 0;
//             game.boosterState = false;
//             room.setDiscProperties(0, { x: -1140, y: 585, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
//             room.setDiscProperties(1, { x: -1150, y: 670, radius: 420 });
//             room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//           });
//         }
//       } else {
//         room.setDiscProperties(3, { x: -1060, y: 0, radius: 18 });
//         sleep(100).then(() => {
//           game.outStatus = "redGK";
//           game.rsTimer = 0;
//           game.rsReady = true;
//           //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the red team 🥅", null, 0xffffe0, "normal");
//           game.rsGoalKick = true;
//           game.rsSwingTimer = 0;
//           game.boosterCount = 0;
//           game.boosterState = false;
//           room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -1060, y: 0, color: "0xff3f34", cMask: 268435519, xgravity: 0, ygravity: 0 });
//         });
//         sleep(3000).then(() => {
//           room.setDiscProperties(3, { x: 0, y: 2000, radius: 0 });
//         });
//       }
//     }
//   }
// }

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
  var extraSeconds = Math.ceil(game.extraTimeCount / 41);
  game.extraTimeEnd = gameTime * 60 + extraSeconds;
  // announce("Extra time: " + extraSeconds + " Seconds", null, null, null, 1);
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
  form.append("file", new File([room.stopRecording()], `EVENTS-ROOM-1.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

// setInterval(function () {
//   room.sendAnnouncement("🔊 Join our Discord. https://discord.gg/pm55tVsQMX ", null, 0x5ee7ff, "small", 0);
   // setTimeout(function () {
   //   room.sendAnnouncement("⚽ RSI League Season 3", null, 0x61ddff, "normal", 0);
   // }, 50000); // Wait 40 seconds after the first announcement
// }, 220000);

// msg1 = setInterval(function () {
//   room.sendAnnouncement("🏆 Searching For The Champions", null, 0xff8a4a, "small");
// }, msg1Time);
