/* ROOM */
//var roomName = "💠 [ʀꜱɪ|ɪᴅ] Scrim Room | ᴘᴠᴘ ⚽";
var roomName = "💠 (ʀꜱɪ) Auction System ᴘᴠᴘ";
//var roomPassword = "scrim2";
const maxPlayers = 30; // maximum number of players in the room
const roomPublic = false; // true = public room | false = players only enter via the room link (it does not appear in the room list)
const geo = [{ lat: -6.17, lon: 106.85990, code: "id" }]; //liga 1
//const geo = [{ lat: -6.17, lon: 106.85989, code: "id" }]; //liga 2

// RSI BANNED SYSTEM
const bannedAuths = [
  "KRn32GyswvGZi8DEofaQoPzbzOV9ToaYmBR1dWwQbJY",  // chiefo
  "HogP5Ng_2oA8GsbK_-7-0cVDuhrmOqXfYKm8rTYb9NI",  // chiefo
  "N1LbelFP2dIua7xrBIeWTjGHyt391bWaxQ60VAjfDG8", //mamaramzi
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "KPSQos-kCI87aE9FOiw2f2U8a3qzMgafU-KB0Cvwbo0",
  "5UB2rvYvGnnwUh1NB-Gu7xe0CD03AY38SJ7RcnvDorE"
];

// Function to check if the player is banned and kick them
function checkAndKickPlayer(player) {
  if (bannedAuths.includes(player.auth)) {
    room.kickPlayer(player.id, "You are permanently banned", true);
  }
}

var gameTime = 0; //default game time if 0 is selected

var auctionActive = false;
var auctionEndTime = 0;
var coinBalances = {};
var bids = {}; // Initialize the bids object

const MAX_COINS = 200;

function resetAuction() {
  auctionActive = false;
  auctionEndTime = 0;
  bids = {}; // Reset current bids
}

function initializePlayer(player) {
  if (!(player.id in coinBalances)) {
    coinBalances[player.id] = MAX_COINS;
  }
}

function displayAuctionResults() {
  globalChatEnabled = true;
  auctionActive = false;
  var result = "    ";
  var lineCount = 0;
  room.sendAnnouncement("╔═══════════════════════════════════════════════╗", null, 0x99ffff, "normal");
  room.sendAnnouncement("    BID FINISH", null, 0x99ffff, "bold");

  var highestBid = 0;
  var highestBidder = "";
  var players = room.getPlayerList().filter(p => p.id !== 0);
  
  for (var player of players) {
    var bid = bids[player.id] || 0;
    result += player.name + " [" + bid + "] | ";
    lineCount++;
    if (lineCount % 4 === 0) {
      result = result.slice(0, -3); // Remove the last " | "
      room.sendAnnouncement(result, null, 0xebeb09, "normal", "small");
      result = "    "; // Reset for the next line
    }
    if (bid > highestBid) {
      highestBid = bid;
      highestBidder = player.name;
    }
  }
  
  if (result !== "    ") { // Print remaining players if less than 4 on the last line
    result = result.slice(0, -3); // Remove the last " | "
    room.sendAnnouncement(result, null, 0xebeb09, "normal", "small");
  }

  room.sendAnnouncement("    BID WINNER : " + highestBidder, null, 0x99ffff, "bold");

  // Show remaining coins for each player
  setTimeout(() => {
    room.sendAnnouncement("     COINS LEFT", null, 0x99ffff, "bold");
    var coinResult = "     ";
    var coinLineCount = 0;
    for (var player of players) {
      var remainingCoins = coinBalances[player.id] || MAX_COINS; // Default to MAX_COINS if balance is undefined
      coinResult += player.name + ": " + remainingCoins + " coins | ";
      coinLineCount++;
      if (coinLineCount % 4 === 0) {
        coinResult = coinResult.slice(0, -3); // Remove the last " | "
        room.sendAnnouncement(coinResult, null, 0x99ffff, "small");
        coinResult = "     "; // Reset for the next line
      }
    }
    if (coinResult !== "     ") { // Print remaining players if less than 4 on the last line
      coinResult = coinResult.slice(0, -3); // Remove the last " | "
      room.sendAnnouncement(coinResult, null, 0x99ffff, "small");
    }
    room.sendAnnouncement("╚═══════════════════════════════════════════════╝", null, 0x99ffff, "normal");
  }, 2000); // Show after 2 seconds delay

  room.sendAnnouncement("═════════════════════════════════════════════════", null, 0x99ffff, "normal");
  
  setTimeout(() => {
    resetAuction();
    console.log("Bid reset");
  }, 2000);
}

const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  noPlayer: true,
  //password: roomPassword,
  geo: geo[0],
});

const scoreLimitPractice = 0;
const timeLimitPractice = 0;

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
var adminPassword = "claim";
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
var globalChatEnabled = true;

let isTurneyStarted = false;
let countdownTimeouts = [];
let penKick = false;

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
  `{"name":"RSI Auction Room","width":400,"height":360,"bg":{"color":"22343f"},"vertexes":[{"x":-50,"y":280,"bCoef":0.5,"cMask":["red","blue"],"color":"080d0f","radius":3},{"x":-300,"y":280,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f"},{"x":-320,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f","curve":0},{"x":-320,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f","curve":0},{"x":-300,"y":-280,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f","curve":0},{"x":300,"y":-280,"cMask":["wall"],"color":"080d0f","curve":0},{"x":300,"y":-280,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f"},{"x":320,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f"},{"x":320,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f"},{"x":300,"y":280,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f"},{"x":50,"y":280,"bCoef":0.5,"cMask":["red","blue"],"color":"080d0f","radius":3},{"x":-50,"y":283,"bCoef":0.5,"cMask":["red","blue"],"color":"395d6b","radius":3},{"x":-300,"y":283,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b"},{"x":-323,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b"},{"x":-323,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b"},{"x":-323,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"395d6b"},{"x":-300,"y":-283,"bCoef":-0.5,"cGroup":["all"],"color":"395d6b"},{"x":-300,"y":-283,"bCoef":-0.5,"cGroup":["all"],"color":"780a11","curve":0},{"x":300,"y":-283,"cMask":["wall"],"color":"395d6b","curve":0},{"x":323,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"395d6b"},{"x":323,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"395d6b","curve":0},{"x":323,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b","curve":0},{"x":300,"y":283,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b"},{"x":300,"y":283,"bCoef":-0.5,"cMask":["red","blue"],"color":"395d6b"},{"x":50,"y":283,"bCoef":0.5,"cMask":["red","blue"],"color":"395d6b","radius":3},{"x":-300,"y":286,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f","curve":0},{"x":300,"y":286,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f","curve":0},{"x":326,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f","curve":0},{"x":326,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f","curve":0},{"x":-326,"y":260,"bCoef":-0.5,"cMask":["red","blue"],"color":"080d0f","curve":0},{"x":-326,"y":-260,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f","curve":90},{"x":-300,"y":-286,"bCoef":-0.5,"cGroup":["all"],"color":"080d0f","curve":0},{"x":300,"y":-286,"cMask":["wall"],"color":"080d0f","curve":0},{"x":-300,"y":-283,"bCoef":-0.5,"cGroup":["all"],"color":"395d6b","curve":0},{"x":300,"y":-283,"cMask":["wall"],"color":"395d6b","curve":0},{"x":-302.40813238823876,"y":180.9806539220234,"curve":0,"color":"090909"},{"x":-302.40813238823876,"y":179.66643315079324,"curve":0,"color":"090909"},{"x":-302.40813238823876,"y":178.35221237956307,"curve":0,"color":"090909"},{"x":-75.77382358475609,"y":279.2866884315475},{"x":-74.62477810171333,"y":279.2866884315475},{"x":-73.47573261867055,"y":279.2866884315475},{"x":-302.40813238823876,"y":178.79028596997316},{"x":-303.66784438823873,"y":279.72476202195753},{"x":-301.259086905196,"y":178.79028596997316},{"x":-302.518798905196,"y":279.72476202195753},{"x":-300.1100414221532,"y":178.79028596997316},{"x":-301.36975342215317,"y":279.72476202195753},{"x":73,"y":281,"bCoef":-0.5,"cMask":["red","blue"],"color":"090909"},{"x":297.2261764152439,"y":280.2866884315475},{"x":298.37522189828667,"y":280.2866884315475},{"x":299.5242673813294,"y":280.2866884315475},{"x":69.33215561176127,"y":280.72476202195753},{"x":70.48120109480402,"y":280.72476202195753},{"x":71.63024657784683,"y":280.72476202195753},{"x":-318.4196607462339,"y":-38.34101776129863,"color":"080d0f"},{"x":318.7803392537662,"y":-39.42101776129863,"color":"080d0f"},{"x":-318.6,"y":-41.040000000000006},{"x":318.6,"y":-43.2},{"x":-318.4196607462339,"y":-43.38237477636346,"color":"080d0f"},{"x":318.7803392537662,"y":-44.46237477636346,"color":"080d0f"},{"x":135.30240000000003,"y":-52.48800000000001},{"x":-122.47200000000002,"y":-50.15520000000001},{"x":-117.13021353177633,"y":-87.48219836440506},{"x":118.00556312287759,"y":-87.28743197033755},{"x":-118.42147628387302,"y":-46.960240595328955},{"x":119.10205948090677,"y":-45.59907420126145},{"x":-1.4700597055929066,"y":-87.46855248277794},{"x":83.20140821330426,"y":-86.98329040481809},{"x":83.20140821330426,"y":-97.7886680948576},{"x":208.44000000000003,"y":-47.52,"color":"080d0f"},{"x":230.04000000000002,"y":-89.64000000000001,"color":"080d0f"},{"x":247.32000000000002,"y":-44.28000000000001,"color":"080d0f"},{"x":197.13492854500524,"y":-94.58230520681582,"color":"080d0f"},{"x":262.44000000000005,"y":-91.80000000000001,"color":"080d0f"},{"x":264.314227517292,"y":-121.92865872406205,"color":"080d0f"},{"x":198.72,"y":-93.96000000000002,"color":"080d0f"},{"x":198.434227517292,"y":-124.08865872406204,"color":"080d0f"},{"x":202.95196261315022,"y":-100.0996116464366},{"x":208.20719222458814,"y":-99.84936261732051},{"x":209.45843737016858,"y":-106.35583737433889},{"x":204.20320775873066,"y":-106.60608640345498},{"x":204.95395484607894,"y":-114.11355727693773},{"x":211.21018057398123,"y":-113.61305921870554},{"x":215.4644140689548,"y":-108.8583276654998},{"x":214.9639160107226,"y":-98.59811747174005},{"x":223.4723830006697,"y":-99.84936261732051},{"x":223.4723830006697,"y":-107.35683349080325},{"x":229.22811067033982,"y":-100.0996116464366},{"x":230.22910678680418,"y":-113.36281018958945},{"x":236.48533251470647,"y":-100.60010970466878},{"x":237.48632863117084,"y":-113.11256116047336},{"x":247.9967878540467,"y":-106.1055883452228},{"x":243.24205630084094,"y":-110.86031989842854},{"x":250.74952717432367,"y":-111.36081795666072},{"x":246.99579173758232,"y":-99.09861552997224},{"x":-62.390983858381276,"y":-88.61519984600358,"color":"8a0808"},{"x":-94.9101883163919,"y":-88.95348193670203,"color":"8a0808"},{"x":-94.11596079909991,"y":-104.04380476524969,"color":"8a0808"},{"x":-62.74397386606661,"y":-104.04380476524969,"color":"8a0808"},{"x":-105.05228309760638,"y":-67.53361056274696},{"x":-103.05128722908054,"y":-53.526639483066106},{"x":-75.53759403685031,"y":-71.03535333266717},{"x":34.686015787496935,"y":-51.565772209835295},{"x":55.88302543541173,"y":-70.83578098066693},{"x":-247.30283478937315,"y":-169.69020995781756,"color":"E33137"},{"x":255.6658859265862,"y":-169.10671956255544,"color":"E33137"},{"x":-245.64945640535834,"y":-274.82397616846504,"color":"E33137"},{"x":253.2348315437661,"y":-277.15793774951356,"color":"E33137"},{"x":-219.51566102931176,"y":-188.26133743217358},{"x":-209.36345661427725,"y":-201.02597382875294,"color":"FFFFFF"},{"x":-208.4370696381079,"y":-254.2932249584916,"color":"FFFFFF"},{"x":-179.71907337685747,"y":-256.1459989108303,"color":"FFFFFF"},{"x":-177.86629942451873,"y":-201.02597382875294,"color":"FFFFFF"},{"x":-134.32611154455842,"y":-201.4891673168376,"color":"FFFFFF"},{"x":-132.93653108030435,"y":-209.82665010236195,"color":"FFFFFF"},{"x":-169.99201012707908,"y":-210.7530370785313,"color":"FFFFFF"},{"x":-170.91839710324845,"y":-251.5140640299835,"color":"FFFFFF"},{"x":-134.32611154455842,"y":-253.8300314704069,"color":"FFFFFF"},{"x":-132.47333759221968,"y":-211.67942405470066,"color":"FFFFFF"},{"x":-119.5039199258485,"y":-210.28984359044662,"color":"FFFFFF"},{"x":-120.89350039010256,"y":-256.609192398915,"color":"FFFFFF"},{"x":-82.91163436715847,"y":-257.0723858869997,"color":"FFFFFF"},{"x":-89.39634320034405,"y":-210.28984359044662,"color":"FFFFFF"},{"x":-76.89011902205758,"y":-213.5321980070394,"color":"FFFFFF"},{"x":-71.33179716504137,"y":-258.46196635125375,"color":"FFFFFF"},{"x":-41.22422043953689,"y":-258.46196635125375,"color":"FFFFFF"},{"x":-46.7825422965531,"y":-215.38497195937813,"color":"FFFFFF"},{"x":-43.540187879960314,"y":-220.01690684022498,"color":"FFFFFF"},{"x":-4.168741392762158,"y":-257.0723858869997,"color":"FFFFFF"},{"x":-5.55832185701621,"y":-213.0690045189547,"color":"FFFFFF"},{"x":24.549254868488262,"y":-213.0690045189547,"color":"FFFFFF"},{"x":19.91731998764142,"y":-259.38835332742315,"color":"FFFFFF"},{"x":92.17550412885215,"y":-263.55709472018526,"color":"FFFFFF"},{"x":38.44505951102879,"y":-246.88212914913666,"color":"FFFFFF"},{"x":38.44505951102879,"y":-211.67942405470066,"color":"FFFFFF"},{"x":72.25818414121073,"y":-248.7349031014754,"color":"FFFFFF"},{"x":73.64776460546479,"y":-208.4370696381079,"color":"FFFFFF"},{"x":87.08037575992063,"y":-210.7530370785313,"color":"FFFFFF"},{"x":103.29214784288457,"y":-262.6307077440159,"color":"FFFFFF"},{"x":111.62963062840888,"y":-207.9738761500232,"color":"FFFFFF"},{"x":125.5254352709494,"y":-207.51068266193852,"color":"FFFFFF"},{"x":146.83233572284487,"y":-256.1459989108303,"color":"FFFFFF"},{"x":159.33855990113136,"y":-202.41555429300698,"color":"FFFFFF"},{"x":138.95804642540526,"y":-231.59674404234207,"color":"FFFFFF"},{"x":149.61149665135298,"y":-229.28077660191866,"color":"FFFFFF"},{"x":290.1264441490061,"y":177.26517512842244},{"x":257.0501007731657,"y":177.26517512842244},{"x":236.46926489486503,"y":177.26517512842244},{"x":203.39292151902458,"y":177.26517512842244},{"x":179.8719662295381,"y":178.73523483401533},{"x":146.7956228536977,"y":178.73523483401533},{"x":179.8719662295381,"y":178.73523483401533},{"x":146.7956228536977,"y":178.73523483401533},{"x":124.00969741700766,"y":178.00020498121887},{"x":90.93335404116723,"y":178.00020498121887},{"x":124.00969741700766,"y":178.00020498121887},{"x":90.93335404116723,"y":178.00020498121887},{"x":-94.8735558509939,"y":177.26517512842244},{"x":-127.94989922683432,"y":177.26517512842244},{"x":-148.53073510513497,"y":177.26517512842244},{"x":-181.60707848097542,"y":177.26517512842244},{"x":-205.1280337704619,"y":178.73523483401533},{"x":-238.2043771463023,"y":178.73523483401533},{"x":-260.99030258299234,"y":178.00020498121887},{"x":-294.0666459588328,"y":178.00020498121887},{"x":288.1264441490061,"y":124.26517512842244},{"x":255.0501007731657,"y":124.26517512842244},{"x":234.46926489486503,"y":124.26517512842244},{"x":201.39292151902458,"y":124.26517512842244},{"x":177.8719662295381,"y":125.73523483401533},{"x":144.7956228536977,"y":125.73523483401533},{"x":122.00969741700766,"y":125.00020498121887},{"x":88.93335404116723,"y":125.00020498121887},{"x":-96.8735558509939,"y":124.26517512842244},{"x":-129.9498992268343,"y":124.26517512842244},{"x":-150.53073510513497,"y":124.26517512842244},{"x":-183.60707848097542,"y":124.26517512842244},{"x":-207.1280337704619,"y":125.73523483401533},{"x":-240.2043771463023,"y":125.73523483401533},{"x":-262.99030258299234,"y":125.00020498121887},{"x":-296.0666459588328,"y":125.00020498121887},{"x":289.1264441490061,"y":64.26517512842244},{"x":256.0501007731657,"y":64.26517512842244},{"x":235.46926489486503,"y":64.26517512842244},{"x":202.39292151902458,"y":64.26517512842244},{"x":178.8719662295381,"y":65.73523483401533},{"x":145.7956228536977,"y":65.73523483401533},{"x":123.00969741700766,"y":65.00020498121887},{"x":89.93335404116723,"y":65.00020498121887},{"x":-95.8735558509939,"y":64.26517512842244},{"x":-128.9498992268343,"y":64.26517512842244},{"x":-149.53073510513497,"y":64.26517512842244},{"x":-182.60707848097542,"y":64.26517512842244},{"x":-206.1280337704619,"y":65.73523483401533},{"x":-239.2043771463023,"y":65.73523483401533},{"x":-261.99030258299234,"y":65.00020498121887},{"x":-295.0666459588328,"y":65.00020498121887},{"x":289.8667321490061,"y":73.02991112842247},{"x":256.79038877316566,"y":73.02991112842247},{"x":236.20955289486503,"y":73.02991112842247},{"x":203.1332095190246,"y":73.02991112842247},{"x":179.6122542295381,"y":74.49997083401536},{"x":146.5359108536977,"y":74.49997083401536},{"x":123.74998541700766,"y":73.7649409812189},{"x":90.67364204116724,"y":73.7649409812189},{"x":-95.13326785099389,"y":73.02991112842247},{"x":-128.2096112268343,"y":73.02991112842247},{"x":-148.79044710513497,"y":73.02991112842247},{"x":-181.8667904809754,"y":73.02991112842247},{"x":-205.3877457704619,"y":74.49997083401536},{"x":-238.4640891463023,"y":74.49997083401536},{"x":-261.2500145829923,"y":73.7649409812189},{"x":-294.3263579588328,"y":73.7649409812189},{"x":0,"y":-99.99951203479017,"bCoef":40,"cMask":["ball"],"cGroup":["c1"]},{"x":6.216185883243713,"y":-88.1076781711935},{"x":-8.378337494806745,"y":-88.37794712263889}],"segments":[{"v0":0,"v1":1,"color":"080d0f","cMask":["red","blue"]},{"v0":1,"v1":2,"curve":89.99999999999999,"color":"080d0f","bCoef":-0.5,"cMask":["red","blue"],"curveF":1.0000000000000002},{"v0":2,"v1":3,"curve":0,"color":"080d0f","cGroup":["all"]},{"v0":3,"v1":4,"curve":89.99999999999999,"color":"080d0f","bCoef":-0.5,"cGroup":["all"],"curveF":1.0000000000000002},{"v0":4,"v1":5,"curve":0,"color":"080d0f","cGroup":["all"]},{"v0":6,"v1":7,"curve":89.99999999999999,"color":"080d0f","bCoef":-0.5,"cGroup":["all"],"curveF":1.0000000000000002},{"v0":7,"v1":8,"color":"080d0f","cGroup":["all"]},{"v0":8,"v1":9,"curve":89.99999999999999,"color":"080d0f","bCoef":-0.5,"cMask":["red","blue"],"curveF":1.0000000000000002},{"v0":9,"v1":10,"color":"080d0f","cMask":["red","blue"]},{"v0":11,"v1":12,"color":"395d6b","cMask":["red","blue"],"y":283},{"v0":12,"v1":13,"curve":89.99999999999999,"color":"395d6b","bCoef":-0.5,"cMask":["red","blue"]},{"v0":14,"v1":15,"color":"395d6b","cGroup":["all"],"x":-323},{"v0":15,"v1":16,"curve":89.99999999999999,"color":"395d6b","bCoef":-0.5,"cGroup":["all"]},{"v0":18,"v1":19,"curve":89.99999999999999,"color":"395d6b","bCoef":-0.5,"cGroup":["all"]},{"v0":20,"v1":21,"curve":0,"color":"395d6b","cGroup":["all"],"x":323},{"v0":21,"v1":22,"curve":89.99999999999999,"color":"395d6b"},{"v0":23,"v1":24,"color":"395d6b","cMask":["red","blue"],"y":283},{"v0":27,"v1":28,"curve":0,"color":"080d0f","cGroup":["all"],"x":326},{"v0":29,"v1":30,"curve":0,"color":"080d0f","cGroup":["all"],"x":-326},{"v0":31,"v1":32,"curve":0,"color":"080d0f","cGroup":["all"],"y":-286},{"v0":30,"v1":31,"curve":90,"color":"080d0f","bCoef":-0.5,"cGroup":["all"]},{"v0":32,"v1":27,"curve":89.99999999999999,"color":"080d0f","bCoef":-0.5,"cGroup":["all"]},{"v0":28,"v1":26,"curve":89.99999999999999,"color":"080d0f"},{"v0":25,"v1":29,"curve":89.99999999999999,"color":"080d0f"},{"v0":33,"v1":34,"curve":0,"color":"395d6b","cGroup":["all"],"y":-283},{"v0":54,"v1":55,"color":"080d0f"},{"v0":56,"v1":57,"color":"395d6b"},{"v0":58,"v1":59,"curve":0.71013112531887,"color":"080d0f"},{"v0":62,"v1":63,"color":"080d0f"},{"v0":62,"v1":64,"curve":-44.91787574988484,"color":"080d0f"},{"v0":63,"v1":65,"curve":77.64807799231251,"color":"080d0f"},{"v0":67,"v1":68,"color":"080d0f"},{"v0":69,"v1":70,"color":"080d0f"},{"v0":72,"v1":73,"color":"080d0f"},{"v0":73,"v1":74,"color":"080d0f"},{"v0":75,"v1":76,"curve":99.93948145622839,"color":"080d0f"},{"v0":76,"v1":74,"color":"080d0f"},{"v0":77,"v1":78,"color":"080d0f"},{"v0":78,"v1":79,"color":"080d0f"},{"v0":79,"v1":80,"color":"080d0f"},{"v0":80,"v1":81,"color":"080d0f"},{"v0":81,"v1":82,"color":"080d0f"},{"v0":83,"v1":84,"color":"080d0f"},{"v0":84,"v1":85,"color":"080d0f"},{"v0":86,"v1":85,"color":"080d0f"},{"v0":83,"v1":86,"color":"080d0f"},{"v0":87,"v1":88,"color":"080d0f"},{"v0":88,"v1":89,"color":"080d0f"},{"v0":89,"v1":90,"color":"080d0f"},{"v0":92,"v1":91,"color":"080d0f"},{"v0":91,"v1":93,"color":"080d0f"},{"v0":91,"v1":94,"color":"080d0f"},{"v0":70,"v1":71,"color":"080d0f"},{"v0":96,"v1":97,"color":"8a0808"},{"v0":97,"v1":98,"color":"8a0808"},{"v0":98,"v1":95,"color":"8a0808"},{"v0":104,"v1":105,"curve":32.55479440072215,"color":"E33137"},{"v0":104,"v1":106,"color":"E33137"},{"v0":105,"v1":107,"color":"E33137"},{"v0":106,"v1":107,"curve":-8.417663570448367,"color":"E33137"},{"v0":109,"v1":110,"color":"FFFFFF"},{"v0":110,"v1":111,"color":"FFFFFF"},{"v0":109,"v1":112,"curve":-53.00399283900661,"color":"FFFFFF"},{"v0":112,"v1":113,"curve":-48.57760435676161,"color":"FFFFFF"},{"v0":114,"v1":115,"curve":87.2949897295982,"color":"FFFFFF"},{"v0":115,"v1":116,"curve":57.31716466943809,"color":"FFFFFF"},{"v0":116,"v1":117,"curve":80.01251202835319,"color":"FFFFFF"},{"v0":117,"v1":118,"curve":55.672839647757435,"color":"FFFFFF"},{"v0":119,"v1":120,"color":"FFFFFF"},{"v0":120,"v1":121,"color":"FFFFFF"},{"v0":119,"v1":122,"curve":-79.28385083462834,"color":"FFFFFF"},{"v0":123,"v1":124,"color":"FFFFFF"},{"v0":124,"v1":125,"color":"FFFFFF"},{"v0":123,"v1":126,"color":"FFFFFF"},{"v0":125,"v1":127,"color":"FFFFFF"},{"v0":128,"v1":129,"color":"FFFFFF"},{"v0":129,"v1":130,"color":"FFFFFF"},{"v0":128,"v1":131,"color":"FFFFFF"},{"v0":131,"v1":132,"curve":-32.21277452836089,"color":"FFFFFF"},{"v0":133,"v1":134,"curve":-42.75714016336253,"color":"FFFFFF"},{"v0":133,"v1":135,"color":"FFFFFF"},{"v0":135,"v1":136,"curve":67.14579681210934,"color":"FFFFFF"},{"v0":134,"v1":136,"color":"FFFFFF"},{"v0":137,"v1":138,"color":"FFFFFF"},{"v0":137,"v1":139,"color":"FFFFFF"},{"v0":140,"v1":141,"color":"FFFFFF"},{"v0":141,"v1":142,"color":"FFFFFF"},{"v0":143,"v1":144,"color":"FFFFFF"},{"v0":11,"v1":24,"cGroup":["ball"]},{"v0":145,"v1":146,"curve":203.52527877855377},{"v0":147,"v1":148,"curve":203.52527877855377},{"v0":149,"v1":150,"curve":203.52527877855377},{"v0":153,"v1":154,"curve":203.52527877855377},{"v0":157,"v1":158,"curve":203.52527877855377},{"v0":159,"v1":160,"curve":203.52527877855377},{"v0":161,"v1":162,"curve":203.52527877855377},{"v0":163,"v1":164,"curve":203.52527877855377},{"v0":165,"v1":166,"curve":203.52527877855377},{"v0":167,"v1":168,"curve":203.52527877855377},{"v0":169,"v1":170,"curve":203.52527877855377},{"v0":171,"v1":172,"curve":203.52527877855377},{"v0":173,"v1":174,"curve":203.52527877855377},{"v0":175,"v1":176,"curve":203.52527877855377},{"v0":177,"v1":178,"curve":203.52527877855377},{"v0":179,"v1":180,"curve":203.52527877855377},{"v0":181,"v1":182,"curve":203.52527877855377},{"v0":183,"v1":184,"curve":203.52527877855377},{"v0":185,"v1":186,"curve":203.52527877855377},{"v0":187,"v1":188,"curve":203.52527877855377},{"v0":189,"v1":190,"curve":203.52527877855377},{"v0":191,"v1":192,"curve":203.52527877855377},{"v0":193,"v1":194,"curve":203.52527877855377},{"v0":195,"v1":196,"curve":203.52527877855377},{"v0":66,"v1":213,"color":"080d0f","bCoef":40,"cMask":["ball"],"cGroup":["c1"]},{"v0":213,"v1":214,"color":"080d0f"},{"v0":213,"v1":215,"color":"080d0f"}],"planes":[{"normal":[0,-1],"dist":-380},{"normal":[0,1],"dist":-340},{"normal":[1,0],"dist":-380},{"normal":[-1,0],"dist":-380},{"normal":[0,1],"dist":287.75,"cMask":["ball"],"cGroup":["c0","c1"]},{"normal":[0,-1],"dist":-288.25,"cMask":["ball"],"cGroup":["c0","c1"]},{"normal":[1,0],"dist":-100,"bCoef":40,"cMask":["ball"],"cGroup":["c0"]},{"normal":[-1,0],"dist":-100,"bCoef":40,"cMask":["ball"],"cGroup":["c1"]},{"normal":[-1,0],"dist":1.5,"bCoef":-0.5,"cMask":["ball"],"cGroup":["c0"]},{"normal":[1,0],"dist":1.5,"bCoef":-0.5,"cMask":["ball"],"cGroup":["c1"]}],"goals":[],"discs":[{"radius":0.5,"pos":[-20,288],"color":"0","bCoef":0.2,"cMask":["red","blue","ball","c0"],"cGroup":["ball"],"damping":0.99999},{"radius":0.5,"pos":[35,288],"color":"0","bCoef":0.2,"cMask":["red","blue","ball","c1"],"cGroup":["ball"],"damping":0.99999},{"radius":0.5,"pos":[50,288],"color":"0","bCoef":0.2,"cMask":["red","blue","ball","c1"],"cGroup":["ball"],"damping":0.99999},{"radius":0,"invMass":0,"pos":[-13.019903884999508,-248.64976155845233],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":0,"invMass":0,"pos":[-16.915769594503097,-260.25488079368745],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70],"_selected":true},{"radius":0,"invMass":0,"pos":[-9.556191916973773,-261.0148412968533],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":0,"invMass":0,"pos":[15.658797457060956,-256.5861147004673],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":0,"invMass":0,"pos":[15.437964302312462,-254.25099095997925],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":0,"invMass":0,"pos":[9.308264483531271,-231.95398770521493],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":0,"invMass":0,"pos":[-6.724579200156995,-245.84869574362352],"color":"395d6b","bCoef":0.1,"cGroup":["c0"],"damping":0.85,"speed":[0,70]},{"radius":8,"pos":[83.28785123482457,-103.92612262280005],"color":"ffffff","bCoef":5,"cMask":["ball"],"cGroup":["ball"],"damping":0},{"radius":4.360028691708173,"pos":[186.23218962564914,-112.35214364984317],"color":"080d0f","bCoef":5,"cMask":["ball"],"cGroup":["ball"],"damping":0},{"radius":8,"pos":[-0.7657926646882487,-106.62881213725383],"color":"ffffff","bCoef":5,"cMask":["ball"],"cGroup":["ball"],"damping":0}],"playerPhysics":{"acceleration":0.2,"kickingAcceleration":0.2,"kickingDamping":0.97,"kickStrength":0,"cGroup":["red","blue"],"radius":16},"ballPhysics":"disc0","cameraFollow":"player","spawnDistance":0,"joints":[{"d0":4,"d1":5,"strength":"rigid","color":"E33137","length":null,"radius":0},{"d0":5,"d1":6,"strength":"rigid","color":"395d6b","length":null,"radius":0},{"d0":8,"d1":9,"strength":"rigid","color":"E33137","length":null,"radius":0}],"redSpawnPoints":[[-186,-63]],"blueSpawnPoints":[[10,253]],"traits":{},"canBeStored":false}`;

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

    "cameraFollow" : "player",
  
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
		"acceleration" : 0.12,
		"kickStrength" : 5.92

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

var afkLimit = 150; // limite de afk (12 segundos)
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

let replayWebHook = "https://discord.com/api/webhooks/1260951226087112714/GOoirNjwgMNuZIQFtNOkWy2fDoYBRcZxRWd-ywok6Eh5nLVZrVJKi2gkUxFuOiRi9r-u";
let goalWebHook = "https://discord.com/api/webhooks/1260951226087112714/GOoirNjwgMNuZIQFtNOkWy2fDoYBRcZxRWd-ywok6Eh5nLVZrVJKi2gkUxFuOiRi9r-u";
let chatWebHook = "https://discord.com/api/webhooks/1261187385387913267/7CQWauXCzx970HW6mWPjiaGTRwY5ERzfxmxLrXSrsvDUpH1oT1pfCAiCocZuNGzTHxYU";
let joinWebHook = "https://discord.com/api/webhooks/1228203622366449695/h_oYpebe1f6D8i7sMhs5J4wUn3-iHRIqUPXT-Lsvq98cf6z_BsRj_I8zAP93S4wgi-gD";
let startWebHook = "https://discord.com/api/webhooks/1228211340519149661/kmFJSfdirOOWRnH-bynJrDxisbtI-5kg5AesFc4RaktI0NSwgoo6KBbj5bkyshJfcQhq";
let adminWebHook = "https://discord.com/api/webhooks/1228918067854311544/marqckLcQDbMX9GUXCzp3rMfbkEYlUTdzS4vZHoXlrz34FL-K2i06pUJiN6TCOFGztVe";
let toxicWebHook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";
let fieldWebHook = "https://discord.com/api/webhooks/1233955747985887343/O955Dr_8z5JgTU9sqv880UhqH2KplyJfQ3bLEcXaGm8oK1RSQFGwZAeVVnTYwlyUQ9sz";
let statsWebHook = "https://discord.com/api/webhooks/1241941404859498567/JRNpNAmFGDeE7S8kybSes_KvMO6C_4EZFrPc-8WM6tFfbUgu3RUXbYgCxUuJboreCWZv";
let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1243753059155312711/ApZTk8vGyDgQRqXkoTZ6XXjxsFZSC6sK6Zkl2yJG2HoCtw_uSxsbz6hZvDV_elVdGOlZ";
let countWebHook = "https://discord.com/api/webhooks/1252884551097909289/EJHIhwVX1_LjY_oTgwkcbq7ElsZqlpC9ybVSRBz7yHTxdE89dd7kQ4oFO1j2okSxDawi";


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
  initializePlayer(player);
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined auc room.\``);
  checkAndKickPlayer(player);
  createPlayer(player);

  if (specialAuths.includes(player.auth) || specialConns.includes(player.conn)) {
    room.setPlayerAdmin(player.id, true);
  }

  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);

  setTimeout(() => {
    room.sendAnnouncement("use ( a ) before text if you want to send message", player.id, 0xedc021, "normal");
    room.sendAnnouncement("example: a hello", player.id, 0xedc021, "normal");
  }, 800);

  setTimeout(() => {
    if (auctionActive) {
      room.sendAnnouncement("╔═══════════════════════════════════════════════╗", player.id, 0x99ffff, "normal");
      room.sendAnnouncement("     AUCTION  ALREADY STARTS", player.id, 0x99ffff, "bold");
      room.sendAnnouncement("     You have 1 minute to place your bids using !bid <amount>", player.id, 0x99ffff, "small");
      room.sendAnnouncement("╚═══════════════════════════════════════════════╝", player.id, 0x99ffff, "normal");
    }  
  }, 1500);


  if (localStorage.getItem(getAuth(player)) == null) {
    stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name];
    localStorage.setItem(getAuth(player), JSON.stringify(stats));
  }
};

function updatePlayerCount() {
  const players = room.getPlayerList().filter(player => player.id !== 0); // Exclude the host bot
  const currentPlayerCount = players.length;

  if (currentPlayerCount !== previousPlayerCount) {
      const playerNames = players.map(player => `[-] ${player.name}`).join('\n');
      const message = `\`[auctionroom] ${currentPlayerCount} players\n${playerNames}\``;
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
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left auc room.\``);
  deletePlayer(player);
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  ban == true ? banList.push([kickedPlayer.name, kickedPlayer.id]) : null;
};

/* PLAYER ACTIVITY */

room.onPlayerChat = function (player, message) {
  sendWebhook(chatWebHook, `\`💬 [event] ${player.name} [${player.id}]: ${message}\``);
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

  if (message.startsWith("!bid ") && auctionActive) {

    // if (player.id in bids) {
    //   room.sendAnnouncement("Already bid", player.id, 0xebeb09, "small-bold");
    //   return false;
    // }

    var bidAmount = parseInt(message.split(" ")[1], 10);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      room.sendAnnouncement("Invalid bid amount!", player.id, 0x99ffff, "small");
      return false;
    }
    
    if (coinBalances[player.id] < bidAmount) {
      room.sendAnnouncement("You don't have enough coins", player.id, 0x99ffff, "small");
      return false;
    }
    
    if (player.id in bids) {
      coinBalances[player.id] += bids[player.id]; // Refund the previous bid amount
      coinBalances[player.id] -= bidAmount; // Deduct the new bid amount
      bids[player.id] = bidAmount;
      room.sendAnnouncement("Changed bid into " + bidAmount + " coins.. (" + coinBalances[player.id] + " coins left)", player.id, 0xebeb09, "small");
    } else {
      coinBalances[player.id] -= bidAmount; // Deduct the bid amount
      bids[player.id] = bidAmount;
      room.sendAnnouncement("You bid " + bidAmount + " coins.. (" + coinBalances[player.id] + " coins left)", player.id, 0xebeb09, "small");
    }

    return false;
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

  if (message.startsWith("!subs ") && player.admin) {
    if (args.length !== 3) {
        room.sendChat("Usage: !subs #<player_id_out> #<player_id_in>");
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
  } else if (["!startbid"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      if (auctionActive) {
        room.sendAnnouncement("An auction is already in progress.", player.id, 0x99ffff, "small");
        return false;
      }
      globalChatEnabled = false;
      auctionActive = true;
      auctionEndTime = Date.now() + 60000; // Auction ends in 1 minute (60000 ms)
      room.sendAnnouncement("╔═══════════════════════════════════════════════╗", null, 0x99ffff, "normal");
      room.sendAnnouncement("     AUCTION STARTS", null, 0x99ffff, "bold");
      room.sendAnnouncement("     You have 1 minute to place your bids using !bid <amount>", null, 0x99ffff, "small");
      room.sendAnnouncement("╚═══════════════════════════════════════════════╝", null, 0x99ffff, "normal");
      
      setTimeout(() => {
        room.sendAnnouncement("15 seconds before finish", null, 0x99ffff, "small");
      }, 65000);
      setTimeout(() => {
        room.sendAnnouncement("10 seconds before finish", null, 0x99ffff, "small");
      }, 70000);
      setTimeout(() => {
        room.sendAnnouncement("5 seconds before finish", null, 0x99ffff, "small");
      }, 75000);

      setTimeout(function () {
        auctionActive = false;
        displayAuctionResults();
      }, 80000);
    }
  } else if (["!resetcoin"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      for (var playerId in coinBalances) {
        coinBalances[playerId] = MAX_COINS;
      }
      room.sendAnnouncement("Coins has been reseted", null, 0x99ffff, "small-bold");
    } 
  } else if (["!cekcoins"].includes(message[0].toLowerCase())) {
    if (auctionActive) {
      var balance = coinBalances[player.id] || MAX_COINS; // Default to MAX_COINS if balance is undefined
      var balanceInfo = "You have: " + balance + " coins";

      room.sendAnnouncement(balanceInfo, player.id, 0xebeb09, "small");
    }
  } else if (["!pause"].includes(message[0].toLowerCase())) {
    if (isPaused) {
      room.sendAnnouncement("Game already paused", player.id, 0xffffe0, "small", 1);
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
  } else if (["!test"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(15, { xspeed: 0, yspeed: 0, x: -90, y: 170, trait : "timebar_ball_constant"});
      room.setDiscProperties(16, { xspeed: 0, yspeed: 0, x: 90, y: 170, trait : "timebar_ball_constant"});
      room.setDiscProperties(17, { xspeed: 0, yspeed: 0, x: 90, y: 170, trait : "timebar_ball_moving", speed : [-0.4,0 ]});
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
  } else if (["!rsmap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = false;
        console.log(`penKick = false`);
        room.stopGame();
        loadMap(practiceMap);
        room.setTimeLimit(5);
        // room.startGame();
      } 
  } else if (["!premap"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        room.stopGame();
        loadMap(preMap);
        room.setTimeLimit(0);
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
      room.sendAnnouncement("Global chat has been disabled", null, 0xdee7fa);
    } 
  } else if (["!enableglobal"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      globalChatEnabled = true;
      room.sendAnnouncement("Global chat has been enabled", null, 0xdee7fa);
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
  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }
};

/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
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
  globalChatEnabled = false;
  whisper("Global chat has been disabled", null);

  // room.sendAnnouncement(centerText("🥅 KICK OFF 🥅"), null, Cor.White, "bold");
  // room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0x2ef55d, "bold");
  // room.sendAnnouncement(centerText("RSI FUT COPA AMERICA"), null, 0x5ee7ff);
  room.startRecording();
  // sendWebhook(startWebHook, `\`𝙆𝙄𝘾𝙆 𝙊𝙁𝙁\` - \`${gameTime} minutes\``);
    
  if(freeze.length > 0){
    freeze = [];
  }

};

room.onGameStop = function (byPlayer) {
  sendDiscordRecording();
  // whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
  if(freeze.length > 0){
    freeze = [];
  }
  redPauseCount = 0;
  bluePauseCount = 0;
  globalChatEnabled = true;
  whisper("Global chat has been enabled", null);
};

room.onGameUnpause = function (byPlayer) {
  // if ((TeamR.length == 4 && TeamB.length == 4 && inChooseMode) || (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)) {
  //   deactivateChooseMode();
  // }
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
  form.append("file", new File([room.stopRecording()], `AUC-ROOM.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}