/* ROOM */

//var roomName = "💠 (ʀꜱɪ|ɪᴅ) Real Football | ᴘᴠᴘ";
var roomName = "💠 (ʀꜱɪ) 𝗥𝗦 𝗙𝗼𝗼𝘁𝗯𝗮𝗹𝗹 ᴘᴠᴘ";
const botName = "----- ᴀᴜᴛᴏʀᴏᴏᴍ.ʀꜱɪ -----";
//var roomPassword = "scrim2";
const maxPlayers = 23; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
//const geo = [{ lat: 11.82, lon: 108.8, code: "vn" }]; //vietnam
//const geo = [{ lat: 10.81, lon: 106.804, code: "id" }]; //vietnam
const geo = [{ lat: -6.17, lon: 106.866, code: "id" }]; //indo

// RSI BANNED SYSTEM
const bannedAuths = [
  "_c5Yec_SEPQsvdykFnNoaOkE2urFu2i_rfcakCKBkrQ",  // chiefo
  "vPs42cOMUfmHBEGhvyxMsNDjwTuUjTtqjgGAqqKAyn8",  // chiefo
  "N1LbelFP2dIua7xrBIeWTjGHyt391bWaxQ60VAjfDG8", //mamaramzi
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "KPSQos-kCI87aE9FOiw2f2U8a3qzMgafU-KB0Cvwbo0",
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "5UB2rvYvGnnwUh1NB-Gu7xe0CD03AY38SJ7RcnvDorE",
  "MI0S14eYL0s9nYE-O2BTiEMwv4Z99pyD2hHqBfJAs_w"
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
var powerShotMode = true;
var gameTime = 5; //default game time if 0 is selected

const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  playerName: botName,
  // password: roomPassword,
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
  "what a great goal from ",
  "world class shoot from ",
  "Its a goall againnn ",
  "puskas nominated goall from ",
  "rocket shoot from ",
  "impressive finishing from ",
  "its a goal! good finishing ",
  "holy shit, what a goal is that ",
  "masterpice goall that is ",
  "more and more and more, clutch shoot from ",
  "gollazooo, goles de los mejores jugadores del campo que es ",
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

let playerIds = new Set();
let whitelist = new Set([
  "m1wppzf2sVGJOZlxFr6ivtFbtayhin_3xIHQSXfzTso", //mainoo 
  "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc", //m4
  "Gz6lv-5YsUCk-bJHBxyzbXtFAV2O3edJUev3DhEf_xA" //foxwilds

]);

let previousPlayerCount = 0;

// Store last message times and counts for players
var lastMessageTime = {};
var messageCounts = {};

var vip1 = [];
var vip2 = [];
var vip3 = [];

let afkCooldowns = {};

function getCooldownTime(player) {
    return afkCooldowns[player.id] ? Math.max(0, 30 - Math.floor((Date.now() - afkCooldowns[player.id]) / 1000)) : 0;
}

let isTurneyStarted = false;
let countdownTimeouts = [];
var captchaRequired = false;
var bisaPick = true;
var saveUniform = false
let penKick = false;

var savedRedUniform = null;
var savedBlueUniform = null;

var voteKickThreshold = 0.5; // 60% of active players need to vote to kick
var noVoteKickThreshold = 0.5; // 60% of active players need to vote to not kick
var voteKickDuration = 50 * 1000; // 60 seconds for the vote to be active
var voteKicks = {};
var gamePausedDueToVoteKick = false;

// Dictionary to store predetermined codes and their corresponding identities
var loginCodes = {
  "32E02": "mainoo"
};

// Object to store player login statuses and their identities
var playerLoginStatus = {};

// RSI RANDOM KIT
var redTeamColors = [
  // COUNTRY
  {angle: 132, textColor: 0xffffff, colors: [0x1fa303, 0xfc0000], name: "Portugal", type: "country"},
  {angle: 180, textColor: 0x000000, colors: [0x2a74d1, 0xfcfcfc, 0x2a74d1], name: "Argentina", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xffee1c, 0x1fd111], name: "Brazil", type: "country"},
  {angle: 90, textColor: 0xffffff, colors: [0xff5f05], name: "Netherlands", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xEBEBEB, 0xD40000, 0xEBEBEB], name: "England", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xf50000, 0xffffff], name: "Indonesia", type: "country"},
  {angle: 90, textColor: 0xfeea67, colors: [0xff3136], name: "Spain", type: "country"},
  {angle: 90, textColor: 0xd19e1f, colors: [0x151619, 0x990011, 0x990011], name: "Belgia", type: "country"},
  
  //CLUB
  {angle: 0, textColor: 0xffffff, colors: [0xd10000], name: "Liverpool FC", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0x0D0000, 0xD80000, 0x0D0000], name: "FC Bayer Leverkusen", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xffffff], name: "Real Madrid CF", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0xfa0c0c, 0x000000], name: "Man United FC", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xff0000, 0xffffff, 0xff0000], name: "Atletico Madrid", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0xe7eaef, 0xba1029, 0xba1029], name: "Arsenal FC", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0xCF0000, 0xCF0000, 0xABABAB], name: "FC Benfica", type: "club"},
  {angle: 90, textColor: 0x000000, colors: [0xC4B004], name: "Villareal CF", type: "club"},
  {angle: 0, textColor: 0xffffff, colors: [0xf50000, 0x000000, 0xff0000], name: "AC Milan", type: "club"},
  {angle: 180, textColor: 0xffffff, colors: [0xff0000, 0x3228d1, 0xff0000], name: "FC Barcelona", type: "club"},
  {angle: 180, textColor: 0xadadad, colors: [0x232323, 0xffffff], name: "Juventus FC", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0xFFFFFF, 0xFF0000, 0xFFFFFF], name: "Sevilla FC", type: "club"}
];
var blueTeamColors = [
  //COUNTRY
  {angle: 132, textColor: 0xffffff, colors: [0x1fa303, 0xfc0000], name: "Portugal", type: "country"},
  {angle: 90, textColor: 0xd19e1f, colors: [0x151619, 0x990011, 0x990011], name: "Belgia", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0x25318F, 0x25318F, 0xEBEBEB], name: "France", type: "country"},
  {angle: 180, textColor: 0x000000, colors: [0x2a74d1, 0xfcfcfc, 0x2a74d1], name: "Argentina", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0xffee1c, 0x1fd111], name: "Brazil", type: "country"},
  {angle: 90, textColor: 0x000000, colors: [0x4D5AFF, 0x4D5AFF, 0xAFC1E3], name: "Uruguay", type: "country"},
  {angle: 270, textColor: 0xFFFFFF, colors: [0x2E911D], name: "Saudi Arabia", type: "country"},

  //CLUB
  {angle: 0, textColor: 0xffffff, colors: [0x040099], name: "Chelsea FC", type: "club"},
  {angle: 90, textColor: 0xffffff, colors: [0x0D0000, 0xD80000, 0x0D0000], name: "FC Bayer Leverkusen", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xffffff], name: "Real Madrid CF", type: "club"},
  {angle: 90, textColor: 0x000000, colors: [0xC4B004], name: "Villareal CF", type: "club"},
  {angle: 90, textColor: 0xFFFFFF, colors: [0x0080FF, 0xFFFFFF, 0x0080F], name: "SSC Napoli", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0x0000FF, 0xFFFFFF, 0x0000FF], name: "FC Porto", type: "club"},
  {angle: 0, textColor: 0xffffff, colors: [0x2526f5, 0x000000, 0x2526f5], name: "Inter Milan", type: "club"},
  {angle: 180, textColor: 0xadadad, colors: [0x232323, 0xffffff], name: "Juventus FC", type: "club"},
  {angle: 90, textColor: 0x000000, colors: [0x2186d1, 0xfcfcfc], name: "Man City FC", type: "club"},
  {angle: 180, textColor: 0x000000, colors: [0xff0000, 0xffffff, 0xff0000], name: "Atletico Madrid", type: "club"},
  {angle: 90, textColor: 0x000000, colors: [0x2033C9, 0x2033C9, 0xEBEBEB], name: "Everton FC", type: "club"},
  {angle: 270, textColor: 0x000000, colors: [0x130c5c, 0xffffff, 0xffffff], name: "Tottenham Hotspurs", type: "club"},
  {angle: 0, textColor: 0xFFFFFF, colors: [0x21298F, 0xC40000, 0xD6D6D6], name: "PSG", type: "club"}
];

// Function to get a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
// Function to check if two uniform configurations are the same
function areUniformsEqual(uniform1, uniform2) {
  return JSON.stringify(uniform1) === JSON.stringify(uniform2);
}

function moveBotToBottom() {
  let players = room.getPlayerList();
  let bot = players.find(player => player.id == 0); // Assuming bot ID is 0
  if (bot) {
    // Separate players into non-AFK and AFK categories
    let nonAfkPlayers = [];
    let afkPlayers = [];

    players.forEach(player => {
      if (player.id != bot.id) {
        let afk = getAFK(player); // Assuming getAFK function is defined
        if (afk) {
          afkPlayers.push(player);
        } else {
          nonAfkPlayers.push(player);
        }
      }
    });

    // Reorder players: non-AFK players, bot, then AFK players
    let reorderedPlayerIds = nonAfkPlayers.map(player => player.id);
    reorderedPlayerIds.push(bot.id);
    reorderedPlayerIds = reorderedPlayerIds.concat(afkPlayers.map(player => player.id));

    room.reorderPlayers(reorderedPlayerIds);
    // console.log("Bot and AFK players moved to the bottom");
  } else {
    // console.log("Bot not found");
  }
}

/* STADIUM*/

var playerRadius = 15;
var ballRadius = 6.25;
var triggerDistance = playerRadius + ballRadius + 0.01;
//default ballphysic 1.06 invmass 0.13 acceleration player  radius 8.5      "bounciness": 0.8       "kickStrength": 5.872 def

var practiceMap = //rsi map
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
      "acceleration" : 0.1455,
      "kickingAcceleration" : 0.08,
      "kickingDamping" : 0.96,
      "kickStrength" : 5.52,
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
      /* 62 */ { "x" : -1220, "y" : -125, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 63 */ { "x" : -1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 64 */ { "x" : -1220, "y" : 123, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
      /* 65 */ { "x" : -1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 66 */ { "x" : -1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
      /* 67 */ { "x" : 1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 68 */ { "x" : 1220, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
      /* 69 */ { "x" : 1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
      /* 70 */ { "x" : 1220, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
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
      { "p0" : [-1161.45,124 ], "p1" : [-1161.45,-124 ], "team" : "red" },
      { "p0" : [1161.45,124 ], "p1" : [1161.45,-124 ], "team" : "blue", "radius" : 0, "invMass" : 1 }
  
    ],
  
    "discs" : [
      { "radius" : 9, "invMass" : 1.114, "pos" : [0,0 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.987, "bounciness" : 0.8, "friction" : 0.05 },
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
      { "radius" : 2, "invMass" : 0, "pos" : [1250.75,-158.75 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1251.75,160.25 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },

      { "pos" : [-1306,752 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,752 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,751 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,752 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1305,753 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1305,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1305,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1305,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },

      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] },
      { "pos" : [-1304,754 ], "radius" : 0, "color" : "DE1111", "cMask" : ["ball" ] }
    
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
      "jb" : { "damping" : 0.992, "cMask" : [ ], "cGroup" : ["c0" ], "invMass" : 1e+250, "radius" : 0.8, "color" : "000000" },
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

  var penMap =
  `{
 
   "name" : "RSI Penalty",
 
   "width" : 360,
 
   "height" : 310,
 
   "spawnDistance" : 215,
 
   "bg" : { "type" : "grass", "width" : 340, "height" : 300, "kickOffRadius" : 0, "cornerRadius" : 0, "color" : "454955" },
 
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
     /* 20 */ { "x" : 0, "y" : -298, "trait" : "line" },
     /* 21 */ { "x" : 0, "y" : 298, "trait" : "line" },
     
     /* 22 */ { "x" : 191, "y" : -300, "trait" : "blueLimit" },
     /* 23 */ { "x" : 191, "y" : 300, "trait" : "blueLimit" },
     
     /* 24 */ { "x" : 217, "y" : 300, "trait" : "line" },
     /* 25 */ { "x" : 216, "y" : -301, "trait" : "line" }
 
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
     
     { "v0" : 24, "v1" : 25, "trait" : "line" }
 
   ],
 
   "goals" : [
     { "p0" : [225,110 ], "p1" : [225,-110 ], "team" : "blue" },
     { "p0" : [215,-112 ], "p1" : [-10,-10 ], "team" : "red" },
     { "p0" : [-10,-10 ], "p1" : [-10,10 ], "team" : "red" },
     { "p0" : [-10,10 ], "p1" : [215,112 ], "team" : "red" }
 
   ],
 
   "discs" : [
     { "radius" : 9, "invMass" : 1.11, "pos" : [0,0 ], "color" : "FFFFFF", "cMask" : ["all" ], "cGroup" : ["ball","kick","score" ], "damping" : 0.989, "bounciness" : 0.8, "friction" : 0.05 },
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
     { "pos" : [315,-150 ], "trait" : "stanchion", "color" : "000000" }
 
   ],
 
   "planes" : [
     { "normal" : [0,1 ], "dist" : -300, "bCoef" : 0 },
     { "normal" : [0,-1 ], "dist" : -300, "bCoef" : 0 },
     { "normal" : [1,0 ], "dist" : -259, "bCoef" : 0 },
     { "normal" : [-1,0 ], "dist" : -285, "bCoef" : 0 },
     
     { "normal" : [-1,0 ], "dist" : -20, "bCoef" : 0, "cMask" : ["red" ], "_selected" : true, "trait" : "kickOffBarrier" },
     
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
     "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }
 
   },
 
   "playerPhysics" : {
     "acceleration" : 0.12,
     "kickStrength" : 5.92
 
   },
 
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
     { "d0" : 7, "d1" : 10, "strength" : "rigid", "color" : "transparent" }
 
   ],

   "canBeStored" : false
 }`;
 


  /* MODE */

var afkLimit = 90; // limite de afk (12 segundos)
var drawTimeLimit = 1; // minutos
var maxTeamSize = 5; // máximo de jogadores num time, isso funciona para 1 (você pode querer adaptar as coisas para remover algumas estatísticas inúteis em 1v1, como assist ou cs), 2, 3 ou 4
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
    room.kickPlayer(player.id, "Nick Dilarang", false);
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

let replayWebHook = "https://discord.com/api/webhooks/1263448368521281556/ON8PrMdXuatPH62Iy0t2jPmrQNuzgciO9Gxc8AEJTTRgYacUlzWEACXrBZOJreGHINSs";
let goalWebHook = "https://discord.com/api/webhooks/1263449303142109234/r7O8NgEJPWfAMofF3l7TCQJDQ-DRw7N3Vy9CNReNoG8bdq_84esNYZqiI3hY-qIvcdmB";
let chatWebHook = "https://discord.com/api/webhooks/1227802111459459072/Db2vLhw6Mxcp0Xu9aNVYl684ANho_4Nuqz-roujkQQPYhbjG_PqENhDOgGnnqE5R4P4n";
let joinWebHook = "https://discord.com/api/webhooks/1228203622366449695/h_oYpebe1f6D8i7sMhs5J4wUn3-iHRIqUPXT-Lsvq98cf6z_BsRj_I8zAP93S4wgi-gD";
let startWebHook = "https://discord.com/api/webhooks/1228211340519149661/kmFJSfdirOOWRnH-bynJrDxisbtI-5kg5AesFc4RaktI0NSwgoo6KBbj5bkyshJfcQhq";
let adminWebHook = "https://discord.com/api/webhooks/1228918067854311544/marqckLcQDbMX9GUXCzp3rMfbkEYlUTdzS4vZHoXlrz34FL-K2i06pUJiN6TCOFGztVe";
let toxicWebHook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";
let fieldWebHook = "https://discord.com/api/webhooks/1233955747985887343/O955Dr_8z5JgTU9sqv880UhqH2KplyJfQ3bLEcXaGm8oK1RSQFGwZAeVVnTYwlyUQ9sz";
let statsWebHook = "https://discord.com/api/webhooks/1263449079573123124/em5HDCz4u7QBekV027sypmB2Dwxoc5Bons4yt5zt0l02K3qZP0HID6MTLfMncJ2GrYQF";
let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1263448843413098658/ecsICq8w39MXmAwjMfZR-DQ17RRf7BdgL__ydyegjR0nPcjSQQM6psi9hh_NbI1yUe-6";
let countWebHook = "https://discord.com/api/webhooks/1263448635304054784/NKHzUQoFTpO6b4mlzhR5xdG6FaOvEZQ5YQmLDe1S2ZqG_KE6SCf-VNPyXLTBOluuTaFU";


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

let currentDiscIndex = 36; 
function teleportSpawn(player) {
  if (player && player.team !== 0) { // Ensure the player is in a team
    const discProperties = room.getPlayerDiscProperties(player.id);
    if (discProperties) {

      var discColor = discProperties.x < 0 ? 0x19B1DE : 0xFE4141; // Blue if x < 0, Red if x > 0

      room.setDiscProperties(currentDiscIndex, { 
        x: discProperties.x, 
        y: discProperties.y, 
        invmass : 0,
        xspeed: 0, 
        yspeed: 0, 
        radius: 15,
        color: discColor 
      });

      // Update the disc index to the next disc
      currentDiscIndex++;
      if (currentDiscIndex > 55) { // Assuming there are only discs from 33 to 39
        currentDiscIndex = 36; // Reset to the first disc if we reach the end
      }
    }
  }
}

/* CHASING */
function golcontra(goaler) {
  var messages = [
    "I'm sure it was unintentional, right, " + goaler.name + "?",
    "You're playing for the wrong team, " + goaler.name,
    goaler.name + ": Next time... DON'T AIM AT YOUR GOAL!!",
    "The opponent say thanks, " + goaler.name,
    goaler.name + " What are you doing?",
    "Harry " + goaler.name + " Maguire",
    "Try to serious! " + goaler.name,
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var announcement = messages[randomIndex];
  setTimeout(function () {
    room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + announcement + "", null, 0xffffe0, "small");
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

function blowDiscs(targetId) {
  const discProperties = room.getPlayerDiscProperties(targetId);
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
  } else {
    room.sendChat(`Unable to retrieve disc properties for player with ID ${targetId}.`);
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

function penaltiKick() {
  penKick = true;
  room.stopGame();
  loadMap(penMap);
  room.setScoreLimit(5);
  room.startGame();
  setTimeout(() => {
    teleportPlayersForPenalti();
  }, 1000); // Adjust the timeout as necessary to ensure the map has loaded
}

function endGame(winner) {
  // lida com o final de um jogo: nenhuma função stopGame dentro
  players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null; //default - 1
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

function quickRestart() {
  room.stopGame();
  setTimeout(() => {
    room.startGame();
  }, 2000);
}

function resumeGame() {
  setTimeout(() => {
    room.startGame();
  }, 2000);
  setTimeout(() => {
    room.pauseGame(false);
  }, 1000);
}

function activateChooseMode() {
  inChooseMode = true;
  slowMode = 5;
  room.sendAnnouncement("Recruitment activated", null, 0x55bae2, "small");
  room.sendAnnouncement("Captain is picking players....", null, 0x55bae2, "small")
}

function deactivateChooseMode() {
  inChooseMode = false;
  clearTimeout(timeOutCap);
  if (slowMode != 0) {
    slowMode = 0;
    room.sendAnnouncement("Recruitment mode closed.", null, 0xf2a000, "small");
  }
  redCaptainChoice = "";
  blueCaptainChoice = "";
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


/* PLAYER FUNCTIONS */

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
      // room.sendAnnouncement("@" + room.getPlayer(extendedP[i][eP.ID]).name + " AFK detected... Move within " + Math.floor(afkLimit / 3) + "s to cancel", extendedP[i][eP.ID], 0xf4a404, "small", 2);
      room.sendAnnouncement("ᴀꜰᴋ ᴅᴇᴛᴇᴄᴛᴇᴅ... ᴍᴏᴠᴇ ᴡɪᴛʜɪɴ " + Math.floor(afkLimit / 3) + "ꜱ ᴛᴏ ᴄᴀɴᴄᴇʟ", extendedP[i][eP.ID], 0xf4a404, "small", 2);
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

function toggleCaptchaRequirement() {
  captchaRequired = !captchaRequired;
  room.setRequireRecaptcha(captchaRequired);
  room.sendAnnouncement("Captcha requirement is now " + (captchaRequired ? "ON" : "OFF"));
}

function getAuth(player) {
  return extendedP.filter((a) => a[0] == player.id) != null ? extendedP.filter((a) => a[0] == player.id)[0][eP.AUTH] : null;
}

function getAFK(player) {
  let matchingPlayer = extendedP.find((a) => a[0] == player.id);
  if (matchingPlayer) {
    return matchingPlayer[eP.AFK];
  } else {
    return null; // or handle accordingly based on your logic
  }
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

/* BALANCE AND RECRUITMENT FUNCTIONS */

function updateRoleOnPlayerIn() {
  updateTeams();
  if (inChooseMode) {
    if (players.length == 6) { //default nya 6
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice); //default  timeLimitp
    }
    getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
  }
  balanceTeams();
}

function updateRoleOnPlayerOut() {
  updateTeams();
  if (room.getScores() != null) {
    var scores = room.getScores();
    if (players.length >= 2 * maxTeamSize && scores.time >= (5 / 6) * game.scores.timeLimit && TeamR.length != TeamB.length) {
      if (TeamR.length < TeamB.length) {
        if (scores.blue - scores.red == 2) {
          endGame(Team.BLUE);
          // room.sendChat("🤖 Ragequit 🤖");
          room.sendAnnouncement("[ʀꜱɪ] ʀᴀɢᴇQᴜɪᴛ ʙʏ ᴛʜᴇ ʀᴇᴅ ᴛᴇᴀᴍ ᴅᴇᴛᴇᴄᴛᴇᴅ, ᴍᴀᴛᴄʜ ᴏᴠᴇʀ!", null, 0xbfff00, "normal");
          setTimeout(() => {
            room.stopGame();
          }, 100);
          return;
        }
      } else {
        if (scores.red - scores.blue == 2) {
          endGame(Team.RED);
          // room.sendChat("🤖 Ragequit 🤖");
          room.sendAnnouncement("[ʀꜱɪ] ʀᴀɢᴇQᴜɪᴛ ʙʏ ᴛʜᴇ ʙʟᴜᴇ ᴛᴇᴀᴍ ᴅᴇᴛᴇᴄᴛᴇᴅ, ᴍᴀᴛᴄʜ ᴏᴠᴇʀ!", null, 0xbfff00, "normal");
          setTimeout(() => {
            room.stopGame();
          }, 100);
          return;
        }
      }
    }
  }
  if (inChooseMode) {
    if (players.length < 6) {
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
    }
    if (TeamR.length == 0 || TeamB.length == 0) {
      TeamR.length == 0 ? room.setPlayerTeam(teamS[0].id, Team.RED) : room.setPlayerTeam(teamS[0].id, Team.BLUE);
      return;
    }
    if (Math.abs(TeamR.length - TeamB.length) == teamS.length) {
      room.sendAnnouncement("[RSI] With no possibility of recruitment, let me decide...", null, 0xc0bdb1, "normal");
      deactivateChooseMode();
      resumeGame();
      var b = teamS.length;
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.BLUE);
          }, 5 * i);
        }
      } else {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.RED);
          }, 5 * i);
        }
      }
      return;
    }
    if (streak == 0 && room.getScores() == null) {
      if (Math.abs(TeamR.length - TeamB.length) == 2) {
        // if someone leaves an already formed team, thus leaving 2 players, put the last one chosen back to the spectators so that it is fair
        room.sendAnnouncement("Balancing teams...", null, 0xc0bdb1, "small");
        TeamR.length > TeamB.length ? room.setPlayerTeam(TeamR[TeamR.length - 1].id, Team.SPECTATORS) : room.setPlayerTeam(TeamB[TeamB.length - 1].id, Team.SPECTATORS);
      }
    }
    if (TeamR.length == TeamB.length && teamS.length < 2) {
      deactivateChooseMode();
      resumeGame();
      return;
    }
    capLeft ? choosePlayer() : getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
  }
  balanceTeams();
}

function balanceTeams() {
  if (!inChooseMode) {
    if (players.length == 1 && TeamR.length == 0) {
      // 1 player
      quickRestart();
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
      room.setPlayerTeam(players[0].id, Team.RED);
    } else if (Math.abs(TeamR.length - TeamB.length) == teamS.length && teamS.length > 0) {
      // specific players provide necessary players
      const n = Math.abs(TeamR.length - TeamB.length);
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamS[i].id, Team.BLUE);
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(teamS[i].id, Team.RED);
        }
      }
    } else if (Math.abs(TeamR.length - TeamB.length) > teamS.length) {
      // there are not enough players
      const n = Math.abs(TeamR.length - TeamB.length);
      if (players.length == 1) {
        quickRestart();
        loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
        room.setPlayerTeam(players[0].id, Team.RED);
        return;
      } else if (players.length == 6) {
        quickRestart();
        loadMap(practiceMap, scoreLimitPractice, timeLimitPractice); //default timeLimitp
      }
      if (players.length == maxTeamSize * 2 - 1) {
        allReds = [];
        allBlues = [];
      }
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(TeamR[TeamR.length - 1 - i].id, Team.SPECTATORS);
        }
      } else {
        for (var i = 0; i < n; i++) {
          room.setPlayerTeam(TeamB[TeamB.length - 1 - i].id, Team.SPECTATORS);
        }
      }
    } else if (Math.abs(TeamR.length - TeamB.length) < teamS.length && TeamR.length != TeamB.length) {
      // recruitment mode
      room.pauseGame(true);
      activateChooseMode();
      choosePlayer();
    } else if (teamS.length >= 2 && TeamR.length == TeamB.length && TeamR.length < maxTeamSize) {
      // 2 in red, 2 in blue and 2 or more specifications
      if (TeamR.length == 2) {
        quickRestart();
        if (!teamS.length == 2) {
          loadMap(practiceMap, scoreLimitPractice, timeLimitPractice); //default timeLimitp
        }
      }
      topBtn();
    }
  }
}

function choosePlayer() {
  clearTimeout(timeOutCap);
  if (TeamR.length <= TeamB.length && TeamR.length != 0) {
    room.sendAnnouncement("ᴛɪᴘꜱ: ᴇɴᴛᴇʀ ᴘʟᴀʏᴇʀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛʏᴘᴇ 'ʀᴀɴᴅᴏᴍ'", TeamR[0].id, 0x21DC00, "normal");
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
        room.sendAnnouncement("Be quick, only remain " + Number.parseInt(chooseTime / 2) + " seconds left!", player.id, 0xf2a000, "small");
        timeOutCap = setTimeout(
          function (player) {
            room.kickPlayer(player.id, "ᴀꜰᴋ", false);
          },
          chooseTime * 500,
          TeamR[0]
        );
      },
      chooseTime * 1000,
      TeamR[0]
    );
  } else if (TeamB.length < TeamR.length && TeamB.length != 0) {
    room.sendAnnouncement("ᴛɪᴘꜱ: ᴇɴᴛᴇʀ ᴘʟᴀʏᴇʀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛʏᴘᴇ 'ʀᴀɴᴅᴏᴍ'", TeamB[0].id, 0x69ADFE, "normal");
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
        room.sendAnnouncement("Be quick, only remain " + Number.parseInt(chooseTime / 2) + " seconds left!", player.id, 0xf2a000, "normal");
        timeOutCap = setTimeout(
          function (player) {
            room.kickPlayer(player.id, "AFK", false);
          },
          chooseTime * 500,
          TeamB[0]
        );
      },
      chooseTime * 1000,
      TeamB[0]
    );
  }
  if (TeamR.length != 0 && TeamB.length != 0) getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
}

function getSpecList(player) {
  var specList = "────────────────── 🇹​🇾​🇵​🇪​ 🇵​🇱​🇦​🇾​🇪​🇷​ 🇳​🇺​🇲​🇧​🇪​🇷​​​​​ ──────────────────\n";
  
  // Start the list with (0) Random
  specList += "     [0] Random | ";

  // First line with limit of 4 items
  for (var i = 0; i < 4 && i < teamS.length; i++) {
    specList += "[" + (i + 1) + "] " + teamS[i].name + " | ";
  }
  specList = specList.slice(0, -3); // Remove the last pipe and space characters
  specList += "\n     ";

  // Subsequent lines with limit of 5 items each
  for (var i = 4; i < teamS.length; i += 5) {
    for (var j = 0; j < 5 && (i + j) < teamS.length; j++) {
      specList += "[" + (i + j + 1) + "] " + teamS[i + j].name + " | ";
    }
    specList = specList.slice(0, -3); // Remove the last pipe and space characters
    if (i + 5 < teamS.length) {
      specList += "\n     ";
    }
  }
  
  specList += "\n────────────────────────────────────────────────\n";
  room.sendAnnouncement(specList, player.id, 0xebeb09, "normal");
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

const specialAuths = [
  "Gz6lv-5YsUCk-bJHBxyzbXtFAV2O3edJUev3DhEf_xA", //fox
  "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc", //m4
  "LnEtoSdVonFZdGMYKDUVPAWb-SzD-PsUMJC2nDPHO5w", //roti
  "EKGPaC2usPnvew9o0KH9P6J3nSmBOpKf3meC25VidQo", //stickmar
  "oCk6n6FWrfoalDXXPijIKiPkZG9O1qZsoNmUnJ8ECbg", //fox2
  "RJ4Gabk5YrcFaGkD1FC3JOVjCvUcsQr_eRnMJcdfF7I", //nightkaz
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

  if (!playerLoginStatus[player.name]) {
    playerLoginStatus[player.name] = { loggedIn: false, identity: null }; // Player is not logged in initially
  }
  if (playerLoginStatus[player.name].loggedIn) {
      room.sendAnnouncement(`Welcome back ${player.name}! You are logged in as ${playerLoginStatus[player.name].identity}.`, player.id);
  } else {
      room.sendAnnouncement(`Welcome ${player.name}! Please log in using the command: !login <your_code>`, player.id);
  }

  // moveBotToBottom();
  const currentTime = getCurrentTime(); 
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined rs server.\``);
  checkAndKickPlayer(player);
  createPlayer(player);

  if (specialAuths.includes(player.auth) || specialConns.includes(player.conn)) {
    room.setPlayerAdmin(player.id, true);
  }

  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  updateRoleOnPlayerIn();
  //room.sendAnnouncement("👋🏼 ᴡᴇʟᴄᴏᴍᴇ, " + player.name + "!", null, 0x5ee7ff, "bold");
  const text = [
    "╔═══════════════════════════════════════════════════╗",
    "║                                                      𝗥𝗦𝗜.𝗖𝗢𝗠𝗠𝗨𝗡𝗜𝗧𝗬                                                        ║",
    "║                                                            ᴀᴜᴛᴏ ʀᴏᴏᴍ                                                             ║",
    "║                                                 ᴅɪꜱᴄᴏʀᴅ.ɢɢ/ᴘᴍ55ᴛᴠꜱQᴍx                                               ║",
    "╠═══════════════════════════════════════════════════╣",
    "║                                                            !ᴀꜰᴋ   !ʙʙ                                                                ║",
    "╚═══════════════════════════════════════════════════╝"
  ];

  setTimeout(() => {
    text.forEach(line => {
        room.sendAnnouncement(line, player.id, 0x5CF49C, "normal");
    });
  }, 3100); 

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

function getTeamName(team) {
  switch (team) {
      case 1:
          return "(red)";
      case 2:
          return "(blue)";
      default:
          return "";
  }
}

function updatePlayerCount() {
  const players = room.getPlayerList().filter(player => player.id !== 0); // Exclude the host bot
  const currentPlayerCount = players.length;

  if (currentPlayerCount !== previousPlayerCount) {
      const playerNames = players.map(player => `[-] ${player.name} ${getTeamName(player.team)}${player.admin ? ' (admin)' : ''}`).join('\n');
      const adminCount = players.filter(player => player.admin).length;
      let message;

      if (adminCount > 0) {
        message = `\`🟢[football 6v6] ${currentPlayerCount} players (${adminCount} admin)\n${playerNames}\``;
    } else {
        message = `\`🟢[football 6v6] ${currentPlayerCount} players\n${playerNames}\``;
    }

      sendWebhook(countWebHook, message);
      previousPlayerCount = currentPlayerCount; // Update the previous player count only if the webhook is sent
  }
}

setInterval(updatePlayerCount, 3000);

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
  // moveBotToBottom();
  if (changedPlayer.id == 0) {
    room.setPlayerTeam(0, Team.SPECTATORS);
    return;
  }
  if (getAFK(changedPlayer) && changedPlayer.team != Team.SPECTATORS) {
    room.setPlayerTeam(changedPlayer.id, Team.SPECTATORS);
    room.sendChat(changedPlayer.name + " ᴇɴᴛᴇʀɪɴɢ ᴀꜰᴋ ᴢᴏɴᴇ!");
    return;
  }
  updateTeams();
  if (room.getScores() != null) {
    var scores = room.getScores();
    if (changedPlayer.team != Team.SPECTATORS && scores.time <= (3 / 4) * scores.timeLimit && Math.abs(scores.blue - scores.red) < 2) {
      changedPlayer.team == Team.RED ? allReds.push(changedPlayer) : allBlues.push(changedPlayer);
    }
  }
  if (changedPlayer.team == Team.SPECTATORS) {
    setActivity(changedPlayer, 0);
  }
  if (inChooseMode && resettingTeams == false && byPlayer.id == 0) {
    if (Math.abs(TeamR.length - TeamB.length) == teamS.length) {
      deactivateChooseMode();
      resumeGame();
      var b = teamS.length;
      if (TeamR.length > TeamB.length) {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.BLUE);
          }, 200 * i);
        }
      } else {
        for (var i = 0; i < b; i++) {
          setTimeout(() => {
            room.setPlayerTeam(teamS[0].id, Team.RED);
          }, 200 * i);
        }
      }
      return;
    } else if ((TeamR.length == maxTeamSize && TeamB.length == maxTeamSize) || (TeamR.length == TeamB.length && teamS.length < 2)) {
      deactivateChooseMode();
      resumeGame();
    } else if (TeamR.length <= TeamB.length && redCaptainChoice != "") {
      // escolha lembrada
      redCaptainChoice == "top" ? room.setPlayerTeam(teamS[0].id, Team.RED) : redCaptainChoice == "random" ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.RED) : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
      return;
    } else if (TeamB.length < TeamR.length && blueCaptainChoice != "") {
      blueCaptainChoice == "top" ? room.setPlayerTeam(teamS[0].id, Team.BLUE) : blueCaptainChoice == "random" ? room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE) : room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
      return;
    } else {
      choosePlayer();
    }
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
  // playerIds.delete(player.auth);
  // moveBotToBottom();
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left rs server.\``);
  deletePlayer(player);

  if (voteKicks[player.id]) {
    clearTimeout(voteKicks[player.id].timeout);
    clearInterval(voteKicks[player.id].announcementInterval); // Clear the announcement interval
    delete voteKicks[player.id];
    room.sendAnnouncement(`Vote kick ${player.name} has been canceled because target left.`, null, 0xFF9898, "normal", 1);
  }

  for (let targetId in voteKicks) {
      voteKicks[targetId].votes.delete(player.id);
      voteKicks[targetId].noVotes.delete(player.id);
  }

  if (gamePausedDueToVoteKick) {
      room.pauseGame(false);
      gamePausedDueToVoteKick = false;
  }

  if (TeamR.findIndex((red) => red.id == player.id) == 0 && inChooseMode && TeamR.length <= TeamB.length) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  if (TeamB.findIndex((blue) => blue.id == player.id) == 0 && inChooseMode && TeamB.length < TeamR.length) {
    choosePlayer();
    capLeft = true;
    setTimeout(() => {
      capLeft = false;
    }, 10);
  }
  setActivity(player, 0);
  updateRoleOnPlayerOut();
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
};

/* PLAYER ACTIVITY */

const lastGoals = {}; // Object to store the last random goal value for each player

function addRandomGoalsEveryFifteenMinutes() {
    room.getPlayerList().forEach(function(player) {
        if (player.team !== 0 && localStorage.getItem(getAuth(player))) {
            let stats = JSON.parse(localStorage.getItem(getAuth(player)));
            let randomGoals;
            
            if (player.admin) {
                // Admin player gets 4 goals
                randomGoals = 4;
            } else {
                // Non-admin player gets random goals (1, 2, 3, or 4) ensuring it's not the same as last time
                do {
                    randomGoals = Math.floor(Math.random() * 3) + 1; // Generate random number between 1 and 4
                } while (randomGoals === lastGoals[player.id]);
            }

            stats[Ss.GL] = (stats[Ss.GL] || 0) + randomGoals;
            localStorage.setItem(getAuth(player), JSON.stringify(stats));
            
            // Update the last goals value for the player if they are not an admin
            if (!player.admin) {
                lastGoals[player.id] = randomGoals;
            }

            // Log goal addition
            console.log(`Added ${randomGoals} goal(s) to player ${player.name}. Total goals: ${stats[Ss.GL]}`);
        }
    });
}

// Schedule every 15 minutes
setInterval(addRandomGoalsEveryFifteenMinutes, 1200000);

setInterval(moveBotToBottom, 10);

room.onPlayerChat = function (player, message) {
  sendWebhook(chatWebHook, `\`💬 [soccer] ${player.name} [${player.id}]: ${message}\``);
  var players = room.getPlayerList();
  let args = message.split(" ");

  if (message.length > 1 && message[0].toLowerCase() == "t" && message[1] == " ") {
    if (player.team != 0) {
        const teamChatPrefix = player.team == 1 ? "🔴 [ᴛᴇᴀᴍ ᴄʜᴀᴛ] " : "🔵 [ᴛᴇᴀᴍ ᴄʜᴀᴛ] ";
        room.getPlayerList().forEach((element) => {
            if (element.team == player.team) room.sendAnnouncement(teamChatPrefix + player.name + ": " + message.substr(2), element.id, player.team == 1 ? /*16725591*/ 3261685 : 3261685, "normal", 0);
        });
        return false;
    } else {
        room.sendAnnouncement("You're not on a team.", player.id);
        return false;
    }
  }

  if (message.length > 1 && message[0].toLowerCase() == "a" && message[1] == " ") {
    for (let i = 0; i < bannedWords.length; i++) {
      if (message.toLowerCase().includes(bannedWords[i])) {
        // Batalkan pesan yang mengandung kata-kata yang dilarang
        whisper("⚠️ ʙᴀᴅᴡᴏʀᴅ ᴅᴇᴛᴇᴄᴛᴇᴅ !!", player.id);
        sendWebhook(toxicWebHook, `\`[${player.name}] received warn ( Bad Word Detected ) \``);
        return false;
      }
    }
    const anonymousMessage = "[Anonymous]: " + message.substr(2);
    room.getPlayerList().forEach((element) => {
        room.sendAnnouncement(anonymousMessage, element.id, 16777215, "normal", 0); // White color
    });
    return false;
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

  if (player.admin) {
    if (room.getScores() != null) {
        for (var i = 0; i < players.length; i++) {
            var playerName = players[i].name;
            var playerId = players[i].id;
            var playerTeam = players[i].team;
            
            if (message.startsWith("!freeze")) {
                if (message === "!freeze " + playerName) {
                    if (playerTeam != 0) {
                        if (!freeze.includes(playerName)) {
                            freeze.push(playerName);
                            getPlayerByID(playerId).freezePoint = { x: players[i].position.x, y: players[i].position.y };
                            room.setPlayerDiscProperties(playerId, { xspeed: 0, yspeed: 0 });
                            room.setPlayerAvatar(playerId, "☠️");
                            room.sendAnnouncement("🧊 " + playerName + " was frozen by " + player.name, null, 0x00FFFF, "normal", 2);
                            sendWebhook(playerWebHook, `\`🧊 [soccer] ${playerName} was frozen by ${player.name}\``);
                        } else {
                            room.sendAnnouncement("This player is already frozen.", player.id, 0xFFFF00, "bold", 2);
                        }
                    } else {
                        room.sendAnnouncement("A spectator cannot be frozen.", player.id, 0xFFFF00, "bold", 2);
                    }
                }
            } else if (message.startsWith("!melt")) {
                if (message === "!melt " + playerName) {
                    if (playerTeam != 0) {
                        if (freeze.includes(playerName)) {
                            freeze.splice(freeze.indexOf(playerName), 1);
                            getPlayerByID(playerId).freezePoint = { x: undefined, y: undefined };
                            room.setPlayerAvatar(playerId);
                            room.sendAnnouncement("♨️ " + playerName + " was un-freeze by " + player.name, null, 0xFF0000, "normal", 2);
                        } else {
                            room.sendAnnouncement("This player is already melt.", player.id, 0xFFFF00, "bold", 2);
                        }
                    } else {
                        room.sendAnnouncement("A spectator cannot be melt.", player.id, 0xFFFF00, "bold", 2);
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

  if (message.startsWith("!login ")) {
    var code = message.substring(7); // Extract the code from the message
    // Check the code against the predetermined codes
    if (loginCodes[code]) {
        playerLoginStatus[player.name] = { loggedIn: true, identity: loginCodes[code] };
        room.sendAnnouncement(`You have successfully logged in as ${loginCodes[code]}, ${player.name}!`, player.id);
    } else {
        room.sendAnnouncement(`Invalid login code, ${player.name}. Please try again.`, player.id);
    }
    return false; // Prevent the message from appearing in chat
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

  if (message.startsWith("!votekick #")) {
    if (player.admin) {
      var targetId = parseInt(message.split('#')[1]);

      if (!isNaN(targetId)) {
          var target = room.getPlayer(targetId);

          if (target) {
              startVoteKick(player, target);
          } else {
              room.sendAnnouncement(`Player with ID ${targetId} not found.`, player.id, 0xFF9898, "normal", 1);
          }
      } else {
          room.sendAnnouncement(`Invalid ID. Usage: votekick #<playerID>`, player.id, 0x8fff8f, "normal", 1);
      }
    } else {
      room.sendAnnouncement(`Only admin can use this command`, player.id, 0x8fff8f, "normal", 1);
    }
    return false; // prevent the message from being broadcasted
  }

  if (message === '!yes') {
      for (let targetId in voteKicks) {
          let voteKick = voteKicks[targetId];
          if (voteKick.votes.has(player.id) || voteKick.noVotes.has(player.id)) {
              room.sendAnnouncement(`Already voted.`, player.id, 0x8fff8f, "normal", 1);
          } else {
              voteKick.votes.add(player.id);
              room.sendAnnouncement(`You voted ${voteKick.target.name} to be kicked.`, player.id, 0x8fff8f, "normal", 1); // Notification for the voting player
              checkVoteKick(voteKick);
          }
      }
      return false; // prevent the message from being broadcasted
  }

  if (message === '!no') {
      for (let targetId in voteKicks) {
          let voteKick = voteKicks[targetId];
          if (voteKick.votes.has(player.id) || voteKick.noVotes.has(player.id)) {
              room.sendAnnouncement(`Already voted.`, player.id, 0x8fff8f, "normal", 1);
          } else {
              voteKick.noVotes.add(player.id);
              room.sendAnnouncement(`You voted !no to kick ${voteKick.target.name}.`, player.id, 0xFF9898, "normal", 1); // Notification for the voting player
              checkVoteKick(voteKick);
          }
      }
      return false; // prevent the message from being broadcasted
  }

  // function votekick
  function startVoteKick(initiator, target) {
    if (voteKicks[target.id]) {
        room.sendAnnouncement(`A vote to kick player ${target.name} is already in progress.`, initiator.id, 0x8fff8f, "normal", 1);
        return;
    }

    voteKicks[target.id] = {
        target: target,
        initiator: initiator,
        votes: new Set(),
        noVotes: new Set(),
        timeout: setTimeout(() => endVoteKick(target, false), voteKickDuration),
        announcementInterval: null
    };

    room.pauseGame(true);
    gamePausedDueToVoteKick = true;

    sendWebhook(playerWebHook, `\`🚫 [vote] player [${initiator.name}] start vote to kick [${target.name}]\``);
    function sendVoteReminder() {
        room.sendAnnouncement(`Vote kick ( ${target.name} )`, null, 0x8fff8f, "normal", 1);
        room.sendAnnouncement(`Type  [!yes]  or  [!no]  to vote`, null, 0x8fff8f, "normal", 1);
        voteKicks[target.id].announcementInterval = setTimeout(() => {
            if (voteKicks[target.id]) {
                sendVoteReminder();
            }
        }, 3000);
    }
    sendVoteReminder();
  }

  function checkVoteKick(voteKick) {
      var totalPlayers = room.getPlayerList().filter(p => p.id !== 0).length; // exclude host
      var requiredYesVotes = Math.ceil(totalPlayers * voteKickThreshold);
      var requiredNoVotes = Math.ceil(totalPlayers * noVoteKickThreshold);

      if (voteKick.votes.size >= requiredYesVotes) {
          endVoteKick(voteKick.target, true);
      } else if (voteKick.noVotes.size >= requiredNoVotes) {
          endVoteKick(voteKick.target, false);
      }
  }

  function endVoteKick(target, success) {
      if (voteKicks[target.id]) {
          clearTimeout(voteKicks[target.id].timeout);
          clearTimeout(voteKicks[target.id].announcementInterval); // Clear the announcement interval

          if (success) {
              room.kickPlayer(target.id, "You get kicked by Vote", false);
              room.sendAnnouncement(`Player ${target.name} has been kicked by vote.`, null, 0x8fff8f, "normal", 1);
          } else {
              room.sendAnnouncement(`Vote kick ${target.name} has failed.`, null, 0xF75A5A, "normal", 1);
          }

          delete voteKicks[target.id];
      }

      if (gamePausedDueToVoteKick) {
          room.pauseGame(false);
          gamePausedDueToVoteKick = false;
      }
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

  if (message == "!bra") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bra";
        room.setTeamColors(Team.RED, 0, 0x3347b3, [0x018434, 0xf8de2e, 0xf8de2e]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Brazil]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!bra") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 0, 0x3347b3, [0x018434, 0xf8de2e, 0xf8de2e]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Brazil]! ", null, 0x30f55f, "bold");
    }
  }
  if (message == "!ger") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ale";
        room.setTeamColors(Team.RED, 90, 0xffffff, [0x121003, 0xc70000, 0xf5c600]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Germany]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!ger") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x121003, 0xc70000, 0xf5c600]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Germany]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!arg") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!arg";
        room.setTeamColors(Team.RED, 90, 0xe3ac42, [0x74acdf, 0xffffff, 0x74acdf]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Argentina]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!arg") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 90, 0xe3ac42, [0x74acdf, 0xffffff, 0x74acdf]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Argentina]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!spa") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!esp";
        room.setTeamColors(Team.RED, 0, 0xdba640, [0x7b111a, 0x7b111a, 0x7b111a]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Spain]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!spa") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 0, 0xdba640, [0x7b111a, 0x7b111a, 0x7b111a]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Spain]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!por") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!por";
        room.setTeamColors(Team.RED, 120, 0xdba640, [0x7b111a, 0x7b111a, 0x384f43]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", escolheu o uniforme de [Portugal]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!por") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 120, 0xdba640, [0x7b111a, 0x7b111a, 0x384f43]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", escolheu o uniforme de [Portugal]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!ita") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ita";
        room.setTeamColors(Team.RED, 60, 0xffffff, [0x0249a8, 0x0366eb, 0x0082d3]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Italy]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!ita") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 60, 0xffffff, [0x0249a8, 0x0366eb, 0x0082d3]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Italy]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!uru") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!uru";
        room.setTeamColors(Team.RED, 0, 0xffffff, [0x0082d3, 0x0082d3, 0x0082d3]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Uruguay]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!uru") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 0, 0xffffff, [0x0082d3, 0x0082d3, 0x0082d3]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Uruguay]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!fra") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!fra";
        room.setTeamColors(Team.RED, 0, 0xd19e1f, [0x202c46, 0x202c46, 0x202c46]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [France]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!fra") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 0, 0xd19e1f, [0x202c46, 0x202c46, 0x202c46]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [France]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!eng") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ing";
        room.setTeamColors(Team.RED, 90, 0x0f2544, [0x408cff, 0xa1c6ff, 0xe0e4e9]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [England]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!eng") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 90, 0x0f2544, [0x408cff, 0xa1c6ff, 0xe0e4e9]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [England]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!bel") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bel";
        room.setTeamColors(Team.RED, 90, 0xd19e1f, [0x151619, 0x990011, 0x990011]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Belgium]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!bel") {
    if (player.team == 2) {
        room.setTeamColors(Team.BLUE, 90, 0xd19e1f, [0x151619, 0x990011, 0x990011]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Belgium]!", null, 0x30f55f, "bold");
    }
  }
  if (message == "!net") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!hol";
        room.setTeamColors(Team.RED, 90, 0x2b0e09, [0xdc6024, 0xdc6024, 0xdc6024]);
        room.sendAnnouncement("The captain of the red team, " + player.name + ", chose the uniform [Netherlands]!", null, 0x30f55f, "bold");
      }
    }
  }
  if (message == "!net") {
    if (player.team == 2) {;
        room.setTeamColors(Team.RED, 90, 0x2b0e09, [0xdc6024, 0xdc6024, 0xdc6024]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Netherlands]!", null, 0x30f55f, "bold");
    }
  }


  if (message == "!bah") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bah";
        room.setTeamColors(Team.RED, 0, 0xffffff, [0x0a4ae8, 0xf20533, 0x0a4ae8]);
        room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform BAHIA! ", null, 0x30f55f, "bold");
      }

      // if (message.toLowerCase().substr(0, 10) == "!register ") {
      //   setRegister(player, message.substr(10));
      //   return false;
      // }

      // // !loginasas senha
      // if (message.toLowerCase().substr(0, 7) == "!login ") {
      //   getLogin(player, message.substr(7));
      //   return false;
      // }
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
    let cooldownTime = getCooldownTime(player);

    if (cooldownTime > 0) {
        room.sendAnnouncement("!afk cooldown (" + cooldownTime + " seconds left)", player.id, 0xffffff, "small");
        return false;
    }

    afkCooldowns[player.id] = Date.now();

    if (players.length != 1 && player.team != Team.SPECTATORS) {
        if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
            room.setPlayerTeam(player.id, Team.SPECTATORS);
        } else {
            room.sendAnnouncement("You can't go AFK while playing", player.id, 0xff7b08, "small");
            return false;
        }
    } else if (players.length == 1 && !getAFK(player)) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
    }

    setAFK(player, !getAFK(player));
    if (getAFK(player)) {
      room.sendAnnouncement(player.name + " is AFK", null, 0xff7b08);
      room.sendAnnouncement("Type !afk to return", player.id, 0xff7b08, "bold");
    } else {
      room.sendAnnouncement(player.name + " is now online!", null, 0x8fff8f);
    }
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
                var playerData = JSON.parse(localStorage.getItem(key));
                var winstreak = playerData[Ss.CS];
                if (winstreak > 0) {
                    tableau.push({ name: playerData[Ss.NK], winstreak: winstreak });
                }
            }
        });
    } catch {}

    if (tableau.length < 5) {
        room.sendAnnouncement("No player have winstreak", player.id, 0x73ec59);
        return false;
    }

    tableau.sort(function (a, b) {
        return b.winstreak - a.winstreak;
    });

    var leaderboard = tableau.slice(0, 5); // Take the top 5 players

    var leaderboardMessage = "[📄] Players with the highest Winstreaks\n";
    for (var i = 0; i < leaderboard.length; i++) {
        leaderboardMessage += "[-] #" + (i + 1) + " " + leaderboard[i].name + ": " + leaderboard[i].winstreak + "\n";
    }

    room.sendAnnouncement(leaderboardMessage, player.id, 0x73ec59);

    return false;
  } else if (["!setadm"].includes(message[0].toLowerCase())) {
    if (message[1] == adminPassword) {
      if (room.getPlayer(player.id).admin) {
        room.sendAnnouncement("already an administrator!", player.id, 0xFB6B6B, 2);
      } else {
        room.setPlayerAdmin(player.id, true);
        // room.sendAnnouncement(player.name + " ʟᴏɢɢᴇᴅ ɪɴ ᴀꜱ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", null, 0xff7900, 2);
        var stats;
        localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name]);
        if (stats[Ss.RL] != "master") {
          stats[Ss.RL] = "master";
          localStorage.setItem(getAuth(player), JSON.stringify(stats));
        }
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
  } else if (["!captcha"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      toggleCaptchaRequirement();
    } else {
      whisper("You are not admin", player.id);
    }
  } else if (["!blow"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      const targetId = parseInt(args[1], 10);
      const targetPlayer = room.getPlayer(targetId);
  
      if (targetPlayer) {
        blowDiscs(targetPlayer.id);
        setTimeout(resetDiscs, 2000);
      } else {
        room.sendChat(`Player with ID ${targetId} not found.`, player.id);
      }
    } else {
      whisper("Only Super Admins can change password", player.id);
    }
  } else if (["!spawn"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      teleportSpawn(player);
    } 
  } else if (["!delspawn"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      resetDiscs();
    } 
  } else if (["!status"].includes(message[0].toLowerCase())) {
    if (playerLoginStatus[player.id].loggedIn) {
      room.sendAnnouncement(`You are logged in as ${playerLoginStatus[player.id].identity}, ${player.name}.`, player.id);
    } else {
        room.sendAnnouncement(`You need to log in first, ${player.name}.`, player.id);
    }
  } else if (["!speclist"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      getSpecList(TeamR.length <= TeamB.length ? TeamR[0] : TeamB[0]);
    } 
  } else if (["!logout"].includes(message[0].toLowerCase())) {
    if (playerLoginStatus[player.name].loggedIn) {
      playerLoginStatus[player.name] = { loggedIn: false, identity: null };
      room.sendAnnouncement(`You have successfully logged out, ${player.name}.`, player.id);
  } else {
      room.sendAnnouncement(`You are not logged in, ${player.name}.`, player.id);
  }
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

          //room.sendAnnouncement("Team " + (teamId === 1 ? "Red" : "Blue") + " disc sizes set to " + newRadius + " by " + player.name, null, 0x00FF00, "normal", 2);
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
          bCoef: 0.05,
          invMass: 0.5,
          damping: 0.95,
          acceleration: 0.1455,
          kickingAcceleration: 0.08,
          kickingDamping: 0.96,
          kickStrength: 5.875,
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
          bCoef: 0.05,
          invMass: 0.5,
          damping: 0.95,
          acceleration: 0.1455,
          kickingAcceleration: 0.08,
          kickingDamping: 0.96,
          kickStrength: 5.875,
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
          bCoef: 0.05,
          invMass: 0.5,
          damping: 0.95,
          acceleration: 0.1455,
          kickingAcceleration: 0.08,
          kickingDamping: 0.96,
          kickStrength: 5.875,
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
    if (bisaPick === false) {
        whisper("Cannot execute this command at the moment.", player.id);
    } else if (inChooseMode === true) {
        whisper("Can't start while picking", player.id);
    } else if (room.getScores() == null) {
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
      room.setDiscProperties(0, { radius:"9", color: "0xFFFFFF" });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!setballsize"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let newRadius = parseFloat(args[1]);
      let ballDiscId = 0; // The ball's disc ID is always 0

      if (!isNaN(newRadius) && newRadius > 0) {
          room.setDiscProperties(ballDiscId, { radius: newRadius });
      } else {
          room.sendAnnouncement("Invalid radius.", player.id, 0xFF0000, "normal", 2);
      }
    } else {
        room.sendAnnouncement("Only Super Admins can change ball properties", player.id, 0xFF0000, "normal", 2);
    }
  } else if (["!resetball"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      let defaultRadius = 9.2;

      room.setDiscProperties(ballDiscId, {
          radius: defaultRadius,
          invMass: 1.115,
          color: 0xFFFFFF,
          cMask: ["all"],
          cGroup: ["ball", "kick", "score"],
          damping: 0.989,
          bounciness: 0.8,
          friction: 0.05
      });
      // room.sendAnnouncement("Ball size reset to " + defaultRadius + " by " + player.name, null, 0x00FF00, "normal", 2);
    } else {
        room.sendAnnouncement("Only Super Admins can reset ball properties", player.id, 0xFF0000, "normal", 2);
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
            room.setDiscProperties(players[i].id, { invMass: "1.05" });
        }
    } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
} else if (["!penmap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = true;
        console.log(`penKick = true`);
        room.stopGame();
        loadMap(penMap);
        room.startGame();
      } else {
        whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
      }
  } else if (["!pentrue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = true;
        console.log(`penKick = true`);
      } 
  } else if (["!penfalse"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = false;
        console.log(`penKick = false`);
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
    // room.sendAnnouncement("                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ", null, 0x9250fd, "bold");
    // room.sendAnnouncement("                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ", null, 0x8466fd, "bold");
    // room.sendAnnouncement("                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ", null, 0x7b73fd, "bold");
    //room.sendAnnouncement("                                        💬 𝗗𝗶𝘀𝗰𝗼𝗿𝗱 𝗟𝗶𝗻𝗸: ➡ 𝗱𝗶𝘀𝗰𝗼𝗿𝗱.𝗴𝗴/𝗽𝗺𝟱𝟱𝘁𝗩𝘀𝗤𝗠𝗫 / ⬅", null, 0xf6ff43, "bold");
    room.sendAnnouncement("                                        💬 Discord. https://discord.gg/pm55tVsQMX", null, 0xf6ff43, "normal");
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

  if (TeamR.length != 0 && TeamB.length != 0 && inChooseMode) {
    // to choose the team
    if (player.id == TeamR[0].id || player.id == TeamB[0].id) {
      // here we care if it is one of the captains choosing
      if (TeamR.length <= TeamB.length && player.id == TeamR[0].id) {
        // here we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.RED);
          redCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose first from the list!", null, 0x55bae2, "normal");
          return false;
        } else if (["0", "random"].includes(message[0].toLowerCase())) {
          var r = getRandomInt(teamS.length);
          room.setPlayerTeam(teamS[r].id, Team.RED);
          redCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose a random team", null, 0x55bae2, "normal");
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.RED);
          redCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose the last one on the list!", null, 0x55bae2, "normal");
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (Number.parseInt(message[0]) > teamS.length || Number.parseInt(message[0]) < 1) {
            room.sendAnnouncement("[⚠️] Oops! The number you chose is invalid.", player.id, null, 0xfaca29, "normal");
            return false;
          } else {
            room.setPlayerTeam(teamS[Number.parseInt(message[0]) - 1].id, Team.RED);
            room.sendAnnouncement(player.name + " has picked " + teamS[Number.parseInt(message[0]) - 1].name + " !", null, 0x55bae2, "normal");
            room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
            return false;
          }
        }
      }
      if (TeamR.length > TeamB.length && player.id == TeamB[0].id) {
        // here we care if it's red turn && red cap talking
        if (["top", "auto"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[0].id, Team.BLUE);
          blueCaptainChoice = "top";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose first from the list!", null, 0x55bae2, "normal");
          return false;
        } else if (["0", "random"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[getRandomInt(teamS.length)].id, Team.BLUE);
          blueCaptainChoice = "random";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose a random team", null, 0x55bae2, "normal");
          return false;
        } else if (["bottom", "bot"].includes(message[0].toLowerCase())) {
          room.setPlayerTeam(teamS[teamS.length - 1].id, Team.BLUE);
          blueCaptainChoice = "bottom";
          clearTimeout(timeOutCap);
          room.sendAnnouncement(player.name + " chose the last one on the list!", null, 0x55bae2, "normal");
          return false;
        } else if (!Number.isNaN(Number.parseInt(message[0]))) {
          if (Number.parseInt(message[0]) > teamS.length || Number.parseInt(message[0]) < 1) {
            room.sendAnnouncement("[⚠️] Oops! The number you chose is invalid.", player.id, null, 0xfaca29, "normal");
            return false;
          } else {
            room.setPlayerTeam(teamS[Number.parseInt(message[0]) - 1].id, Team.BLUE);
            room.sendAnnouncement(player.name + " has picked " + teamS[Number.parseInt(message[0]) - 1].name + " !", null, 0x55bae2, "normal");
            room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
            return false;
          }
        }
      }
    }
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
      announcement += "[💠ʟᴠ" + stats[Ss.GL] + "|ᴀᴅᴍɪɴ] ";
      chatColor = "0x99ffff";
    } else if (stats[Ss.GL] > 94) {
      announcement += "[🥇ʟᴠ82] ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 89) {
      announcement += "[🥈ʟᴠ78] ";
      chatColor = "0xFBA206";
    } else if (stats[Ss.GL] > 86) {
      announcement += "[🥉ʟᴠ75] ";
      chatColor = "0xFBA206";
    } else if (stats[Ss.GL] > 82) {
      announcement += "[💠ʟᴠ72] ";
      chatColor = "0xFFFF04";
    } else if (stats[Ss.GL] > 77) {
      announcement += "[💠ʟᴠ70] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 72) {
      announcement += "[💠ʟᴠ68] ";
      chatColor = "0x9312D3";
    } else if (stats[Ss.GL] > 68) {
      announcement += "[💠ʟᴠ65] ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 65) {
      announcement += "[💠ʟᴠ63] ";
      chatColor = "0xFFFF04";
    } else if (stats[Ss.GL] > 62) {
      announcement += "[💠ʟᴠ60] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 58) {
      announcement += "[💠ʟᴠ58] ";
      chatColor = "0xC435E7";
    } else if (stats[Ss.GL] > 54) {
      announcement += "[💠ʟᴠ55] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 51) {
      announcement += "[💠ʟᴠ51] ";
      chatColor = "0x83E735";
    } else if (stats[Ss.GL] > 49) {
      announcement += "[💠ʟᴠ49] ";
      chatColor = "0xFBA206";
    } else if (stats[Ss.GL] > 46) {
      announcement += "[💠ʟᴠ46] ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 44) {
      announcement += "[💠ʟᴠ44] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 42) {
      announcement += "[💠ʟᴠ41] ";
      chatColor = "0xFA51CF";
    } else if (stats[Ss.GL] > 40) {
      announcement += "[💠ʟᴠ38] ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 38) {
      announcement += "[💠ʟᴠ35] ";
      chatColor = "0x83E735";
    } else if (stats[Ss.GL] > 36) {
      announcement += "[💠ʟᴠ34] ";
      chatColor = "0xFB2424";
    } else if (stats[Ss.GL] > 34) {
      announcement += "[💠ʟᴠ31] ";
      chatColor = "0x2E41FF";
    } else if (stats[Ss.GL] > 32) {
      announcement += "[💠ʟᴠ27] ";
      chatColor = "0xF518A4";
    } else if (stats[Ss.GL] > 30) {
      announcement += "[💠ʟᴠ25] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 28) {
      announcement += "[💠ʟᴠ23] ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 26) {
      announcement += "[💠ʟᴠ20] ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 23) {
      announcement += "[💠ʟᴠ18] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 20) {
      announcement += "[💠ʟᴠ16] ";
      chatColor = "0x80DE00";
    } else if (stats[Ss.GL] > 17) {
      announcement += "[💠ʟᴠ13] ";
      chatColor = "0xFBA206";
    } else if (stats[Ss.GL] > 15) {
      announcement += "[💠ʟᴠ11] ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 13) {
      announcement += "[💠ʟᴠ8] ";
      chatColor = "0xF518A4";
    } else if (stats[Ss.GL] > 10) {
      announcement += "[💠ʟᴠ6] ";
      chatColor = "0xFB2424";
    } else if (stats[Ss.GL] > 8) {
      announcement += "[💠ʟᴠ5] ";
      chatColor = "0xE1F216";
    } else if (stats[Ss.GL] > 5) {
      announcement += "[💠ʟᴠ4] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 3) {
      announcement += "[💠ʟᴠ3] ";
      chatColor = "0xC435E7";
    } else if (stats[Ss.GL] > 1) {
      announcement += "[💠ʟᴠ2] ";
      chatColor = "0x80DE00";
    } else {
      announcement += "[💠ʟᴠ1] "; //chat user dan admin
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
      //room.sendAnnouncement("ᴘᴏᴡᴇʀꜱʜᴏᴛ ʟᴀᴜɴᴄʜᴇᴅ", game.powershotID, 0x33dd33, "small", 1);
      //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: "+ player.name +" Shooting", null, 0xffffe0, "normal");
      sendWebhook(fieldWebHook, `\`${player.name} Shooting the ball\``);
      // room.setPlayerAvatar(game.powershotID, null);
      room.setDiscProperties(0, { color: 0xFFFFFF });
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
  isTurneyStarted = true;
  // moveBotToBottom();
  bisaPick = true;
  console.log(`bisaPick = true`);
  //room.setDiscProperties(0, { invMass: 1.05 });
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

  room.startRecording();
  sendWebhook(startWebHook, `\`⚽ 𝙆𝙄𝘾𝙆 𝙊𝙁𝙁 !! ⚽\` - Game duration \`${gameTime} minutes\``);
  if (TeamR.length == maxTeamSize && TeamB.length == maxTeamSize) {
    for (var i = 0; i < maxTeamSize; i++) {
      allReds.push(TeamR[i]);
      allBlues.push(TeamB[i]);
    }
  }
  for (var i = 0; i < extendedP.length; i++) {
    extendedP[i][eP.GK] = 0;
    extendedP[i][eP.ACT] = 0;
    room.getPlayer(extendedP[i][eP.ID]) == null ? extendedP.splice(i, 1) : null;
  }
    
  deactivateChooseMode();
  if(freeze.length > 0){
    freeze = [];
  }

  room.sendAnnouncement(centerText("🥅 CHAMPIONS LEAGUE KICK OFF 🥅"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0xEBC505), "bold";

  // // RSI RANDOM UNIFORM
  // var redUniform = getRandomItem(redTeamColors);
  // var blueUniform = getRandomItem(blueTeamColors);
  // // Ensure red and blue uniforms are not the same and are either both country or both club
  // while (areUniformsEqual(redUniform, blueUniform) || redUniform.type !== blueUniform.type) {
  //     blueUniform = getRandomItem(blueTeamColors);
  // }
  // room.setTeamColors(1, redUniform.angle, redUniform.textColor, redUniform.colors);
  // room.setTeamColors(2, blueUniform.angle, blueUniform.textColor, blueUniform.colors);

  // if (redUniform.type === "club" && blueUniform.type === "club") {
  //   room.sendAnnouncement(centerText("🥅 CHAMPIONS LEAGUE KICK OFF 🥅"), null, Cor.White, "bold");
  //   room.sendAnnouncement(centerText(""+ redUniform.name + " vs " + blueUniform.name + ""), null, 0x2ef55d, "bold");
  //   room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0xEBC505), "bold";
  //   room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  // } else if (redUniform.type === "country" && blueUniform.type === "country") {
  //   room.sendAnnouncement(centerText("🥅 INT FRIENDLY KICK OFF 🥅"), null, Cor.White, "bold");
  //   room.sendAnnouncement(centerText(""+ redUniform.name + " vs " + blueUniform.name + ""), null, 0x2ef55d, "bold");
  //   room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0xEBC505), "bold";
  //   room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  // }

};

room.onGameStop = function (byPlayer) {
  isTurneyStarted = false;
  console.log(`isTurneyStarted = false`);
  // moveBotToBottom();
  bisaPick = true;
  console.log(`bisaPick = true`);
  saveUniform = false
  console.log(`saveUniform = false`);
  // setKickRateLimit();
  if (byPlayer.id == 0 && endGameVariable) {
    updateTeams();
    if (inChooseMode) {
      if (players.length == 2 * maxTeamSize) {
        inChooseMode = false;
        resetBtn();
        for (var i = 0; i < maxTeamSize; i++) {
          setTimeout(() => {
            randomBtn();
          }, 400 * i);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else if (lastWinner == Team.BLUE) {
          redToSpecBtn();
          blueToRedBtn();
        } else {
          resetBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 500);
      }
    } else {
      if (players.length == 2) {
        if (lastWinner == Team.BLUE) {
          room.setPlayerTeam(TeamB[0].id, Team.RED);
          room.setPlayerTeam(TeamR[0].id, Team.BLUE);
        }
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 3 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 4) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      } else if (players.length == 5 || players.length >= 2 * maxTeamSize + 1) {
        if (lastWinner == Team.RED) {
          blueToSpecBtn();
        } else {
          redToSpecBtn();
          blueToRedBtn();
        }
        setTimeout(() => {
          topBtn();
        }, 200);
        activateChooseMode();
      } else if (players.length == 6) {
        resetBtn();
        setTimeout(() => {
          randomBtn();
          setTimeout(() => {
            randomBtn();
            setTimeout(() => {
              randomBtn();
            }, 500);
          }, 500);
        }, 500);
        setTimeout(() => {
          room.startGame();
        }, 2000);
      }
    }
  }
  sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\` **Possesion: ** \`[RED] ${(Rposs * 100).toPrecision(3).toString()}%\`  | possession |  \`[BLUE] ${(Bposs * 100).toPrecision(3).toString()}%\``)
  sendDiscordRecording();
  whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
  whisper("Type !fixstart if the room not automatically start", null);
  if(freeze.length > 0){
    freeze = [];
  }
};

// if (byPlayer.id == 0 && endGameVariable) {
//   room.setTimeLimit(gameTime);
//   updateTeams();
//   if (inChooseMode) {
//     if (players.length == 2 * maxTeamSize) {
//       inChooseMode = false;
//       resetBtn();
//       for (var i = 0; i < maxTeamSize; i++) {
//         setTimeout(() => {
//           randomBtn();
//         }, 400 * i);
//       }
//       setTimeout(() => {
//         room.startGame();
//       }, 2000);
//     } else {
//       if (lastWinner == Team.RED) {
//         blueToSpecBtn();
//       } else if (lastWinner == Team.BLUE) {
//         redToSpecBtn();
//         blueToRedBtn();
//       } else {
//         resetBtn();
//       }
//       setTimeout(() => {
//         topBtn();
//       }, 500);
//     }
//   } else {
//     if (players.length == 2) {
//       if (lastWinner == Team.BLUE) {
//         room.setPlayerTeam(TeamB[0].id, Team.RED);
//         room.setPlayerTeam(TeamR[0].id, Team.BLUE);
//       }
//       setTimeout(() => {
//         room.startGame();
//       }, 2000);
//     } else if (players.length == 3 || players.length >= 2 * maxTeamSize + 1) {
//       if (lastWinner == Team.RED) {
//         blueToSpecBtn();
//       } else {
//         redToSpecBtn();
//         blueToRedBtn();
//       }
//       setTimeout(() => {
//         topBtn();
//       }, 200);
//       setTimeout(() => {
//         room.startGame();
//       }, 2000);
//     } else if (players.length == 4) {
//       resetBtn();
//       setTimeout(() => {
//         randomBtn();
//         setTimeout(() => {
//           randomBtn();
//         }, 500);
//       }, 500);
//       setTimeout(() => {
//         room.startGame();
//       }, 2000);
//     } else if (players.length == 5 || players.length >= 2 * maxTeamSize + 1) {
//       if (lastWinner == Team.RED) {
//         blueToSpecBtn();
//       } else {
//         redToSpecBtn();
//         blueToRedBtn();
//       }
//       setTimeout(() => {
//         topBtn();
//       }, 200);
//       activateChooseMode();
//     } else if (players.length == 6) {
//       resetBtn();
//       setTimeout(() => {
//         randomBtn();
//         setTimeout(() => {
//           randomBtn();
//           setTimeout(() => {
//             randomBtn();
//           }, 500);
//         }, 500);
//       }, 500);
//       setTimeout(() => {
//         room.startGame();
//       }, 2000);
//     }
//   }
// }

room.onGameUnpause = function (byPlayer) {
  if ((TeamR.length == 4 && TeamB.length == 4 && inChooseMode) || (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)) {
    deactivateChooseMode();
  }
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

let previousChoice = -1;

room.onTeamGoal = function (team) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // const players = room.getPlayerList();
  // const playerWhoScored = players.find(player => player.team === team);

  // if (playerWhoScored.admin) {
  //   teleportDiscsfire();
  // } else if (playerWhoScored) {
  //   teleportDiscs();
  // }

  let goalTime = secondsToMinutes(Math.floor(room.getScores().time));
  game.rsActive = false;
  teamgoaler = team;
  let assistencia = "";
  let goleador = "";
  let goalMaker = lastPlayersTouched[0].id;
  activePlay = false;
  countAFK = false;
  const scores = room.getScores();

  if (!penKick) {
    // Function to get a new random choice that is not the same as the previous one
    function getNewChoice(previous, min, max) {
      let newChoice;
      do {
        newChoice = getRandomInt(min, max);
      } while (newChoice === previous);
      return newChoice;
    }

    // Get a new random choice
    let randomChoice = getNewChoice(previousChoice, 0, 3);
    
    // Call the chosen function
    if (randomChoice === 0) {
      teleportDiscs();
    } else if (randomChoice === 1) {
      teleportDiscsfire();
    } else {
      teleportDiscsTiga();
    }
    previousChoice = randomChoice;
    setTimeout(resetDiscs, 2000);
  }

  game.scores = scores;
  if (lastPlayersTouched[0] != null && lastPlayersTouched[0].team == team) {
    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | ⚽ ɢᴏᴀʟ sᴄᴏʀᴇᴅ ʙʏ ${lastPlayersTouched[0].name} | ᴀssɪsᴛ ʙʏ - ${lastPlayersTouched[1].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });
      // announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " ( 🅰️ Assist: " + lastPlayersTouched[1].name + " ) 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "small");
      avatarCelebration(goalMaker, "⚽", "🎯");
      
      sendWebhook(goalWebHook, `\`[GOALL RS]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];

      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | ⚽ ɢᴏᴀʟ sᴄᴏʀᴇᴅ ʙʏ ${lastPlayersTouched[0].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });
      // announce("[GOALLL] ⚽ Scorer: " + lastPlayersTouched[0].name + " 👟 Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "small");
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

    sendWebhook(goalWebHook, `\`[OWN-GOAL RS]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
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
  if (byPlayer.id != 0 && localStorage.getItem(getAuth(byPlayer)) && JSON.parse(localStorage.getItem(getAuth(byPlayer)))[Ss.RL] == "admin") {
    room.sendChat("ʏᴏᴜ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ ᴛᴏ ᴀᴘᴘᴏɪɴᴛ ᴀ ᴘʟᴀʏᴇʀ ᴀꜱ ᴀɴ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", byPlayer.id);
    room.setPlayerAdmin(changedPlayer.id, false);
  }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {};

room.onGameTick = function () {
  updateGameStatus();
  if (!penKick) {
    handleBallTouch();
    realSoccerRef();
  }
  checkTime();
  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
  handleFrozenPlayerMoves();

};

function pauseAndResumeGame() {
  const scores = room.getScores();
  game.scores = scores;
  Rposs = Rposs / (Rposs + Bposs);
  Bposs = 1 - Rposs;
  room.stopGame(true);

  setTimeout(() => {
  room.sendAnnouncement(centerText("🏆 HALF TIME 🏆"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
  room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  bisaPick = false;
  console.log(`bisaPick = false`);
  }, 700);

  setTimeout(() => {
    swapTeamsAndAnnounce();
  }, 1800);
  
  isTurneyStarted = false;
  
  console.log(`isTurneyStarted = false`);
  setTimeout(() => {
    let timeLeft = 5; // Time left before resuming in seconds
    let timerId = setInterval(() => {
      if (timeLeft > 0) {
        announce(`Kick-off in ${timeLeft} seconds ⏳`);
        timeLeft--;
      } else {
        clearInterval(timerId);
        saveUniform = true
        console.log(`saveUniform = true`);
        room.startGame();
        announce("⚽ KICK OFF - SECOND HALF ⚽");
        setTimeout(() => {
          isTurneyStarted = false;
          console.log(`isTurneyStarted = false`);
        }, 5000);
      }
    }, 1000); // Repeat every second
  }, 2 * 1000); // 80 seconds after initial pause
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
          //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the blue team 🥅", null, 0xffffe0, "normal");
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
        //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the red team 🚩", null, 0xffffe0, "normal");
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
        //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Corner Kick for the blue team🚩", null, 0xffffe0, "normal");
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
            room.setDiscProperties(0, { x: -1140, y: -585, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
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
            room.setDiscProperties(0, { x: -1140, y: 585, xspeed: 0, yspeed: 0, color: "0x0fbcf9", cMask: 268435519, xgravity: 0, ygravity: 0 });
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
          //room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: Goal Kick for the red team 🥅", null, 0xffffe0, "normal");
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
            room.setDiscProperties(0, { invMass: 2.35, color: 0xF4DD33 }); //ps strength
            // room.setPlayerAvatar(game.powershotID, "🚀");
            room.sendAnnouncement("ᴘᴏᴡᴇʀꜱʜᴏᴛ ʀᴇᴀᴅʏ", game.powershotID, 0x33dd33, "small", 1);
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
        room.setDiscProperties(0, { invMass: 1.05, color: 0xFFFFFF });
        // room.setPlayerAvatar(game.powershotID, null);
        room.sendAnnouncement("ᴘᴏᴡᴇʀꜱʜᴏᴛ ᴄᴀɴᴄᴇʟᴇᴅ", game.powershotID, 0xdd3333, "small", 2);
        
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

// Function to set the kick rate limit
function setKickRateLimit() {
  room.setKickRateLimit(0, 0, 0);
  //room.sendAnnouncement("Kick rate limit set (min: 0, rate: 0, burst: 0)", null, 0x00FF00, "normal", 2);
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
  form.append("file", new File([room.stopRecording()], `RS-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

setInterval(function () {
  room.sendAnnouncement("🔊 Join our Discord. https://discord.gg/pm55tVsQMX ", null, 0x5ee7ff, "small", 0);
  setTimeout(function () {
    room.sendAnnouncement("⚽ Command: !ᴅᴄ, !ꜰɪxꜱᴛᴀʀᴛ, !ᴘᴏᴡᴇʀꜱʜᴏᴛ, !ᴀꜰᴋ, !ʙʙ, !ꜱᴛᴀᴛꜱ, !ᴍᴀᴘ, !ʀᴀɴᴋ, !ꜱᴡᴀᴘ, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ], ᴀ [anon chat], ᴠᴏᴛᴇᴋɪᴄᴋ #(ɪᴅ) ", null, 0x61ddff, "small", 0);
  }, 70000); // Wait 40 seconds after the first announcement
}, 200000);

// msg1 = setInterval(function () {
//   room.sendAnnouncement("🏆 Join official discord for event information !", null, 0xff8a4a, "small");
// }, msg1Time);
