/* ROOM */
var roomName = "💠 (ʀꜱɪ|ɪᴅ) Volleyball 3v3 | ᴘᴠᴘ 🏐";
//var roomName = "💠 [ʀꜱɪ|ᴀꜱɪᴀ] Volleyball 3v3 | ᴘᴠᴘ 🤾🏽";
const botName = "----- ᴀᴜᴛᴏʀᴏᴏᴍ.ʀꜱɪ -----";
const maxPlayers = 15; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
//const geo = [{ lat: 1.2, lon: 104, code: "id" }];
//const geo = [{ lat: 10.81, lon: 106.8, code: "sg" }]; //vietnam
const geo = [{ lat: -6.17, lon: 106.85992, code: "id" }]; //indo

// RSI BANNED SYSTEM
const bannedAuths = [
  "KRn32GyswvGZi8DEofaQoPzbzOV9ToaYmBR1dWwQbJY",  // chiefo
  "HogP5Ng_2oA8GsbK_-7-0cVDuhrmOqXfYKm8rTYb9NI",  // chiefo
  "N1LbelFP2dIua7xrBIeWTjGHyt391bWaxQ60VAjfDG8", //mamaramzi
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "KPSQos-kCI87aE9FOiw2f2U8a3qzMgafU-KB0Cvwbo0",
  "C7ViJCyzSbdtMod9IXcVO7nKw50F8o8XqnehKPWSgbk",
  "5UB2rvYvGnnwUh1NB-Gu7xe0CD03AY38SJ7RcnvDorE"
];

// Function to check if the player is banned and kick them
function checkAndKickPlayer(player) {
  if (bannedAuths.includes(player.auth)) {
    room.kickPlayer(player.id, "You are permanently banned", true);
  }
}

const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  playerName: botName,
  geo: geo[0],
});

const scoreLimitPractice = 9;
const timeLimitPractice = 10;

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
  "What a smash ",
  "Scoresss !!!! world class punch from ",
  "Its a scores againn ",
  "What a smash !! even the opponent can't save that ",
  "Rocket smash from ",
  "Impressive finishing from ",
  "Its scoress !! good finishing ",
  "Holy shit, what a shoot is that ",
  "More and more and more, clutch shoot from ",
];
// here you can place/edit assistance messages, always respecting the " , ". Example: "Nice pass," the player's name will always be after the comma.
const frasesasis = [" with the beautiful of ", " accompanied by the beautiful pass of ", " with the ball in the mouth of the goal by ", " with the phenomenal assistance of ", " and we cannot forget the magnificent pass of"];
// here you can post/edit messages for mockery, for own goals, always respecting the " , ". Example: "Try to kick to the other side," the player's name will always be after the comma.
const frasesautogol = [" I'm sure it was by accident, right?", " YOU'RE PLAYING FOR THE WRONG TEAM "];

const secondsToResetAvatar = 3;
var registro = new Map();
const css = "border:2px solid;padding:8px;background:";
room.setTeamsLock(true);
var message;
var Botdivulga;
var msg1;
var msg1Time = 230000;
var Deus = [];
var BotdivulgaTime = 210000;
var adminPassword = "2542";
var freeze = []; //Holds the name of the frozen players.
var playerInformations = []; //Holds players names, ID's and positions (undefined if not frozen).
// Cooldown period in milliseconds
var cooldownPeriod = 3000; // 2 seconds
var maxMessages = 2; // Maximum messages allowed in the cooldown period

// Store last message times and counts for players
var lastMessageTime = {};
var messageCounts = {};

// kick counting
var kickCount = {};

// Initialize team kick counts
var teamKickCounts = { 1: 0, 2: 0 }; // 1 for blue team, 2 for red team

// Define positions to teleport the ball
const blueTeamBallPosition = { xspeed: 0, yspeed: 0, x: -539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 40 };
const redTeamBallPosition = { xspeed: 0, yspeed: 0, x: 539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 40 };

// Define ball properties for different states
const ballInvisible = { color: -1, radius: 0 };
const ballVisible = { color: 0xffffff, radius: 7.25 };

// Helper function to reset kick counts
function resetKickCounts(team) {
  teamKickCounts[team] = 0;
}

function resetKickCountsBoth() {
  teamKickCounts = { 1: 0, 2: 0 };
}

var vip1 = [];
var vip2 = [];
var vip3 = [];

let playerIds = new Set();
let whitelist = new Set([
  "m1wppzf2sVGJOZlxFr6ivtFbtayhin_3xIHQSXfzTso", //mainoo 
  "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc", //m4
  "Gz6lv-5YsUCk-bJHBxyzbXtFAV2O3edJUev3DhEf_xA" //foxwilds

]);

/* ESTÁDIO */

const playerRadius = 15;
var ballRadius = 6.25;
const triggerDistance = playerRadius + ballRadius + 0.01;

// var practiceMap =
// `{"name":"RSI Volleyball","width":485,"height":205,"spawnDistance":455,"bg":{"type":"grass","width":487,"height":207,"kickOffRadius":0,"cornerRadius":0},"vertexes":[{"x":-350,"y":-97,"trait":"art"},{"x":350,"y":-97,"trait":"art"},{"x":-351,"y":-94,"trait":"art"},{"x":351,"y":-94,"trait":"art"},{"x":-352,"y":-91,"trait":"art"},{"x":352,"y":-91,"trait":"art"},{"x":-353,"y":-88,"trait":"art"},{"x":353,"y":-88,"trait":"art"},{"x":-354,"y":-85,"trait":"art"},{"x":354,"y":-85,"trait":"art"},{"x":-355,"y":-82,"trait":"art"},{"x":355,"y":-82,"trait":"art"},{"x":-356,"y":-79,"trait":"art"},{"x":356,"y":-79,"trait":"art"},{"x":-357,"y":-76,"trait":"art"},{"x":357,"y":-76,"trait":"art"},{"x":-358,"y":-73,"trait":"art"},{"x":358,"y":-73,"trait":"art"},{"x":-359,"y":-70,"trait":"art"},{"x":359,"y":-70,"trait":"art"},{"x":-360,"y":-67,"trait":"art"},{"x":360,"y":-67,"trait":"art"},{"x":-361,"y":-64,"trait":"art"},{"x":361,"y":-64,"trait":"art"},{"x":-362,"y":-61,"trait":"art"},{"x":362,"y":-61,"trait":"art"},{"x":-363,"y":-58,"trait":"art"},{"x":363,"y":-58,"trait":"art"},{"x":-364,"y":-55,"trait":"art"},{"x":364,"y":-55,"trait":"art"},{"x":-365,"y":-52,"trait":"art"},{"x":365,"y":-52,"trait":"art"},{"x":-366,"y":-49,"trait":"art"},{"x":366,"y":-49,"trait":"art"},{"x":-367,"y":-46,"trait":"art"},{"x":367,"y":-46,"trait":"art"},{"x":-368,"y":-43,"trait":"art"},{"x":368,"y":-43,"trait":"art"},{"x":-369,"y":-40,"trait":"art"},{"x":369,"y":-40,"trait":"art"},{"x":-370,"y":-37,"trait":"art"},{"x":370,"y":-37,"trait":"art"},{"x":-371,"y":-34,"trait":"art"},{"x":371,"y":-34,"trait":"art"},{"x":-372,"y":-31,"trait":"art"},{"x":372,"y":-31,"trait":"art"},{"x":-373,"y":-28,"trait":"art"},{"x":373,"y":-28,"trait":"art"},{"x":-374,"y":-25,"trait":"art"},{"x":374,"y":-25,"trait":"art"},{"x":-375,"y":-22,"trait":"art"},{"x":375,"y":-22,"trait":"art"},{"x":-376,"y":-19,"trait":"art"},{"x":376,"y":-19,"trait":"art"},{"x":-377,"y":-16,"trait":"art"},{"x":377,"y":-16,"trait":"art"},{"x":-378,"y":-13,"trait":"art"},{"x":378,"y":-13,"trait":"art"},{"x":-379,"y":-10,"trait":"art"},{"x":379,"y":-10,"trait":"art"},{"x":-380,"y":-7,"trait":"art"},{"x":380,"y":-7,"trait":"art"},{"x":-381,"y":-4,"trait":"art"},{"x":381,"y":-4,"trait":"art"},{"x":-382,"y":-1,"trait":"art"},{"x":382,"y":-1,"trait":"art"},{"x":-383,"y":2,"trait":"art"},{"x":383,"y":2,"trait":"art"},{"x":-384,"y":5,"trait":"art"},{"x":384,"y":5,"trait":"art"},{"x":-385,"y":8,"trait":"art"},{"x":385,"y":8,"trait":"art"},{"x":-386,"y":11,"trait":"art"},{"x":386,"y":11,"trait":"art"},{"x":-387,"y":14,"trait":"art"},{"x":387,"y":14,"trait":"art"},{"x":-388,"y":17,"trait":"art"},{"x":388,"y":17,"trait":"art"},{"x":-389,"y":20,"trait":"art"},{"x":389,"y":20,"trait":"art"},{"x":-390,"y":23,"trait":"art"},{"x":390,"y":23,"trait":"art"},{"x":-391,"y":26,"trait":"art"},{"x":391,"y":26,"trait":"art"},{"x":-392,"y":29,"trait":"art"},{"x":392,"y":29,"trait":"art"},{"x":-393,"y":32,"trait":"art"},{"x":393,"y":32,"trait":"art"},{"x":-394,"y":35,"trait":"art"},{"x":394,"y":35,"trait":"art"},{"x":-395,"y":38,"trait":"art"},{"x":395,"y":38,"trait":"art"},{"x":-396,"y":41,"trait":"art"},{"x":396,"y":41,"trait":"art"},{"x":-397,"y":44,"trait":"art"},{"x":397,"y":44,"trait":"art"},{"x":-398,"y":47,"trait":"art"},{"x":398,"y":47,"trait":"art"},{"x":-399,"y":50,"trait":"art"},{"x":399,"y":50,"trait":"art"},{"x":-400,"y":53,"trait":"art"},{"x":400,"y":53,"trait":"art"},{"x":-401,"y":56,"trait":"art"},{"x":401,"y":56,"trait":"art"},{"x":-402,"y":59,"trait":"art"},{"x":402,"y":59,"trait":"art"},{"x":-403,"y":62,"trait":"art"},{"x":403,"y":62,"trait":"art"},{"x":-404,"y":65,"trait":"art"},{"x":404,"y":65,"trait":"art"},{"x":-405,"y":68,"trait":"art"},{"x":405,"y":68,"trait":"art"},{"x":-406,"y":71,"trait":"art"},{"x":406,"y":71,"trait":"art"},{"x":-407,"y":74,"trait":"art"},{"x":407,"y":74,"trait":"art"},{"x":-408,"y":77,"trait":"art"},{"x":408,"y":77,"trait":"art"},{"x":-409,"y":80,"trait":"art"},{"x":409,"y":80,"trait":"art"},{"x":-410,"y":83,"trait":"art"},{"x":410,"y":83,"trait":"art"},{"x":-411,"y":86,"trait":"art"},{"x":411,"y":86,"trait":"art"},{"x":-412,"y":89,"trait":"art"},{"x":412,"y":89,"trait":"art"},{"x":-413,"y":92,"trait":"art"},{"x":413,"y":92,"trait":"art"},{"x":-414,"y":95,"trait":"art"},{"x":414,"y":95,"trait":"art"},{"x":-415,"y":98,"trait":"art"},{"x":415,"y":98,"trait":"art"},{"x":-416,"y":101,"trait":"art"},{"x":416,"y":101,"trait":"art"},{"x":-417,"y":104,"trait":"art"},{"x":417,"y":104,"trait":"art"},{"x":-418,"y":107,"trait":"art"},{"x":418,"y":107,"trait":"art"},{"x":-419,"y":110,"trait":"art"},{"x":419,"y":110,"trait":"art"},{"x":-420,"y":113,"trait":"art"},{"x":420,"y":113,"trait":"art"},{"x":-421,"y":116,"trait":"art"},{"x":421,"y":116,"trait":"art"},{"x":-422,"y":119,"trait":"art"},{"x":422,"y":119,"trait":"art"},{"x":-423,"y":122,"trait":"art"},{"x":423,"y":122,"trait":"art"},{"x":-424,"y":125,"trait":"art"},{"x":424,"y":125,"trait":"art"},{"x":-425,"y":128,"trait":"art"},{"x":425,"y":128,"trait":"art"},{"x":-426,"y":131,"trait":"art"},{"x":426,"y":131,"trait":"art"},{"x":-427,"y":134,"trait":"art"},{"x":427,"y":134,"trait":"art"},{"x":-428,"y":137,"trait":"art"},{"x":428,"y":137,"trait":"art"},{"x":-429,"y":140,"trait":"art"},{"x":429,"y":140,"trait":"art"},{"x":-430,"y":143,"trait":"art"},{"x":430,"y":143,"trait":"art"},{"x":-431,"y":146,"trait":"art"},{"x":431,"y":146,"trait":"art"},{"x":-432,"y":149,"trait":"art"},{"x":432,"y":149,"trait":"art"},{"x":-433,"y":152,"trait":"art"},{"x":433,"y":152,"trait":"art"},{"x":-434,"y":155,"trait":"art"},{"x":434,"y":155,"trait":"art"},{"x":-434,"y":158,"trait":"art"},{"x":434,"y":158,"trait":"art"},{"x":-349.5,"y":-99.8,"trait":"art"},{"x":349.5,"y":-99.8,"trait":"art"},{"x":-436.5,"y":161,"trait":"art"},{"x":436.5,"y":161,"trait":"art"},{"x":441,"y":164,"trait":"art"},{"x":-441,"y":164,"trait":"art"},{"x":-351.3,"y":-101.8,"trait":"art"},{"x":351.3,"y":-101.8,"trait":"art"},{"x":445,"y":166,"trait":"art"},{"x":-445,"y":166,"trait":"art"},{"x":-448,"y":169,"trait":"art"},{"x":448,"y":169,"trait":"art"},{"x":-1.5,"y":189.5,"bCoef":0,"trait":"ballArea"},{"x":-0.5,"y":69,"bCoef":0.5,"trait":"ballArea"},{"x":1.5,"y":189.5,"bCoef":0,"trait":"ballArea"},{"x":-2.2,"y":-111,"trait":"art"},{"x":-1,"y":-195,"trait":"art"},{"x":0,"y":49,"trait":"art"},{"x":0,"y":-66,"trait":"art"},{"x":2,"y":-111.8,"trait":"art"},{"x":0,"y":-181,"trait":"art"},{"x":3,"y":188,"bCoef":0,"trait":"ballArea"},{"x":2,"y":69,"bCoef":0.5,"trait":"ballArea"},{"x":-3,"y":186,"bCoef":0,"trait":"ballArea"},{"x":-2,"y":69,"bCoef":0.5,"trait":"ballArea"},{"x":88,"y":-81.5,"trait":"art"},{"x":111,"y":196,"trait":"art"},{"x":56.5,"y":165,"trait":"art"},{"x":109,"y":169,"trait":"art"},{"x":108,"y":159,"trait":"art"},{"x":97,"y":28,"trait":"art"},{"x":45.5,"y":-86.5,"trait":"art"},{"x":50.5,"y":24,"trait":"art"},{"x":85.5,"y":-101.7,"trait":"art"},{"x":59,"y":162.5,"trait":"art"},{"x":47,"y":-88,"trait":"art"},{"x":86.5,"y":-83,"trait":"art"},{"x":106,"y":166,"trait":"art"},{"x":52.5,"y":23.5,"trait":"art"},{"x":95.5,"y":28,"trait":"art"},{"x":0,"y":218,"trait":"playerArea"},{"x":58.3,"y":191,"trait":"art"},{"x":57,"y":169.5,"trait":"art"},{"x":45,"y":-107,"trait":"art"},{"x":45,"y":-101.7,"trait":"art"},{"x":-21.5,"y":45.5,"trait":"kickoffBarrier"},{"x":21.5,"y":45.5,"trait":"kickoffBarrier"},{"x":0,"y":-178,"trait":"art"},{"x":1,"y":-195,"trait":"art"},{"x":-485,"y":-189,"trait":"art"},{"x":485,"y":-189,"trait":"art"},{"x":-485,"y":-192,"trait":"art"},{"x":485,"y":-192,"trait":"art"},{"x":-485,"y":-195,"trait":"art"},{"x":485,"y":-195,"trait":"art"},{"x":-485,"y":-198,"trait":"art"},{"x":485,"y":-198,"trait":"art"},{"x":-485,"y":-201,"trait":"art"},{"x":485,"y":-201,"trait":"art"},{"x":-485,"y":-204,"trait":"art"},{"x":485,"y":-204,"trait":"art"},{"x":-485,"y":-181,"trait":"art"},{"x":485,"y":-181,"trait":"art"},{"x":-485,"y":-183,"trait":"art"},{"x":485,"y":-183,"trait":"art"},{"x":-485,"y":-186,"trait":"art"},{"x":485,"y":-186,"trait":"art"},{"x":-2150,"y":4000,"trait":"art"},{"x":-426,"y":-167,"trait":"art"},{"x":426,"y":-167,"trait":"art"},{"x":2150,"y":4000,"trait":"art"},{"x":-427.5,"y":-169,"trait":"art"},{"x":427.5,"y":-169,"trait":"art"},{"x":-429.5,"y":-171.1,"trait":"art"},{"x":429.5,"y":-171.1,"trait":"art"},{"x":-431.5,"y":-173.2,"trait":"art"},{"x":431.5,"y":-173.2,"trait":"art"},{"x":-433.5,"y":-175.3,"trait":"art"},{"x":433.5,"y":-175.3,"trait":"art"},{"x":-425.5,"y":-165,"trait":"art"},{"x":425.5,"y":-165,"trait":"art"},{"x":-424,"y":-163,"trait":"art"},{"x":424,"y":-163,"trait":"art"}],"segments":[{"v0":233,"v1":234,"color":"9eba72","trait":"art"},{"v0":235,"v1":236,"color":"c5c580","trait":"art"},{"v0":237,"v1":238,"color":"c8b690","trait":"art"},{"v0":221,"v1":222,"color":"a0aeb8","trait":"art"},{"v0":223,"v1":224,"color":"70a0b4","trait":"art"},{"v0":225,"v1":226,"color":"6090b0","trait":"art"},{"v0":227,"v1":228,"color":"5080ac","trait":"art"},{"v0":229,"v1":230,"color":"4070a4","trait":"art"},{"v0":231,"v1":232,"color":"3060a0","trait":"art"},{"v0":212,"v1":219,"color":"709868","trait":"art"},{"v0":188,"v1":212,"vis":false,"trait":"playerArea"},{"v0":194,"v1":192,"color":"cfc999","trait":"playerArea"},{"v0":239,"v1":253,"color":"618361","trait":"art"},{"v0":253,"v1":254,"color":"5d7f5d","trait":"art"},{"v0":254,"v1":242,"color":"618361","trait":"art"},{"v0":239,"v1":251,"color":"3f613f","trait":"art"},{"v0":251,"v1":252,"color":"3b5d3b","trait":"art"},{"v0":252,"v1":242,"color":"3f613f","trait":"art"},{"v0":239,"v1":240,"color":"433a3a","trait":"art"},{"v0":240,"v1":241,"color":"433a3a","trait":"art"},{"v0":241,"v1":242,"color":"433a3a","trait":"art"},{"v0":239,"v1":243,"color":"895137","trait":"art"},{"v0":243,"v1":244,"color":"8b5339","trait":"art"},{"v0":244,"v1":242,"color":"895137","trait":"art"},{"v0":239,"v1":245,"color":"693921","trait":"art"},{"v0":245,"v1":246,"color":"693921","trait":"art"},{"v0":246,"v1":242,"color":"693921","trait":"art"},{"v0":239,"v1":247,"color":"5b321f","trait":"art"},{"v0":247,"v1":248,"color":"5b321f","trait":"art"},{"v0":248,"v1":242,"color":"5b321f","trait":"art"},{"v0":239,"v1":249,"color":"4f2d1d","trait":"art"},{"v0":249,"v1":250,"color":"4f2d1d","trait":"art"},{"v0":250,"v1":242,"color":"4f2d1d","trait":"art"},{"v0":195,"v1":198,"color":"556d55","trait":"art"},{"v0":193,"v1":198,"color":"556d55","trait":"art"},{"v0":186,"v1":198,"color":"556d55","trait":"art"},{"v0":198,"v1":200,"color":"556d55","trait":"art"},{"v0":187,"v1":205,"color":"5d755e","trait":"art"},{"v0":191,"v1":205,"color":"5d755e","trait":"art"},{"v0":176,"v1":177,"color":"eadaaa","trait":"art"},{"v0":180,"v1":181,"color":"cfc28f","trait":"art"},{"v0":182,"v1":183,"color":"9eaa62","trait":"art"},{"v0":0,"v1":1,"color":"ad9f73","trait":"art"},{"v0":2,"v1":3,"color":"b4a67a","trait":"art"},{"v0":4,"v1":5,"color":"b6a97d","trait":"art"},{"v0":6,"v1":7,"color":"bbac80","trait":"art"},{"v0":8,"v1":9,"color":"beaf82","trait":"art"},{"v0":10,"v1":11,"color":"c0b284","trait":"art"},{"v0":12,"v1":13,"color":"c2b486","trait":"art"},{"v0":14,"v1":15,"color":"c4b688","trait":"art"},{"v0":16,"v1":17,"color":"c6b88a","trait":"art"},{"v0":18,"v1":19,"color":"c8ba8c","trait":"art"},{"v0":20,"v1":21,"color":"c9bc8d","trait":"art"},{"v0":22,"v1":23,"color":"cabd8e","trait":"art"},{"v0":24,"v1":25,"color":"cbbe8f","trait":"art"},{"v0":26,"v1":27,"color":"ccbf90","trait":"art"},{"v0":28,"v1":29,"color":"cdc091","trait":"art"},{"v0":30,"v1":31,"color":"cec192","trait":"art"},{"v0":32,"v1":33,"color":"cfc293","trait":"art"},{"v0":34,"v1":35,"color":"d0c394","trait":"art"},{"v0":36,"v1":37,"color":"d1c495","trait":"art"},{"v0":38,"v1":39,"color":"d2c696","trait":"art"},{"v0":40,"v1":41,"color":"d3c797","trait":"art"},{"v0":42,"v1":43,"color":"d4c898","trait":"art"},{"v0":44,"v1":45,"color":"d5c999","trait":"art"},{"v0":46,"v1":47,"color":"d6ca9a","trait":"art"},{"v0":48,"v1":49,"color":"d7cb9b","trait":"art"},{"v0":50,"v1":51,"color":"d8cc9c","trait":"art"},{"v0":52,"v1":53,"color":"d9cd9d","trait":"art"},{"v0":54,"v1":55,"color":"dace9e","trait":"art"},{"v0":56,"v1":57,"color":"dbd09f","trait":"art"},{"v0":58,"v1":59,"color":"dcd1a0","trait":"art"},{"v0":60,"v1":61,"color":"ddd2a1","trait":"art"},{"v0":62,"v1":63,"color":"ded3a2","trait":"art"},{"v0":64,"v1":65,"color":"dfd4a3","trait":"art"},{"v0":66,"v1":67,"color":"e0d5a4","trait":"art"},{"v0":68,"v1":69,"color":"e1d6a5","trait":"art"},{"v0":70,"v1":71,"color":"e2d8a6","trait":"art"},{"v0":72,"v1":73,"color":"e3d9a7","trait":"art"},{"v0":74,"v1":75,"color":"e4daa8","trait":"art"},{"v0":76,"v1":77,"color":"e5dba9","trait":"art"},{"v0":78,"v1":79,"color":"e6dcaa","trait":"art"},{"v0":80,"v1":81,"color":"e7ddab","trait":"art"},{"v0":82,"v1":83,"color":"e8deac","trait":"art"},{"v0":84,"v1":85,"color":"e9e0ad","trait":"art"},{"v0":86,"v1":87,"color":"eae1ae","trait":"art"},{"v0":88,"v1":89,"color":"ebe2af","trait":"art"},{"v0":90,"v1":91,"color":"ece3b0","trait":"art"},{"v0":92,"v1":93,"color":"ede4b1","trait":"art"},{"v0":94,"v1":95,"color":"eee5b2","trait":"art"},{"v0":96,"v1":97,"color":"efe6b3","trait":"art"},{"v0":98,"v1":99,"color":"f0e8b4","trait":"art"},{"v0":100,"v1":101,"color":"f1e9b5","trait":"art"},{"v0":102,"v1":103,"color":"f2eab6","trait":"art"},{"v0":104,"v1":105,"color":"f3ebb7","trait":"art"},{"v0":106,"v1":107,"color":"f4ecb8","trait":"art"},{"v0":108,"v1":109,"color":"f5edb9","trait":"art"},{"v0":110,"v1":111,"color":"f5eeba","trait":"art"},{"v0":112,"v1":113,"color":"f6efbb","trait":"art"},{"v0":114,"v1":115,"color":"f6f0bc","trait":"art"},{"v0":116,"v1":117,"color":"f7f1bd","trait":"art"},{"v0":118,"v1":119,"color":"f7f2be","trait":"art"},{"v0":120,"v1":121,"color":"f8f3bf","trait":"art"},{"v0":122,"v1":123,"color":"f8f4c0","trait":"art"},{"v0":124,"v1":125,"color":"f9f5c1","trait":"art"},{"v0":126,"v1":127,"color":"f9f6c2","trait":"art"},{"v0":128,"v1":129,"color":"faf7c3","trait":"art"},{"v0":130,"v1":131,"color":"faf8c4","trait":"art"},{"v0":132,"v1":133,"color":"faf9c5","trait":"art"},{"v0":134,"v1":135,"color":"fbfac6","trait":"art"},{"v0":136,"v1":137,"color":"fbfac7","trait":"art"},{"v0":138,"v1":139,"color":"fbfbc8","trait":"art"},{"v0":140,"v1":141,"color":"fcfbc9","trait":"art"},{"v0":142,"v1":143,"color":"fcfcca","trait":"art"},{"v0":144,"v1":145,"color":"fcfccb","trait":"art"},{"v0":146,"v1":147,"color":"fdfdcc","trait":"art"},{"v0":148,"v1":149,"color":"fdfdcd","trait":"art"},{"v0":150,"v1":151,"color":"fdfdce","trait":"art"},{"v0":152,"v1":153,"color":"fefecf","trait":"art"},{"v0":154,"v1":155,"color":"fefed0","trait":"art"},{"v0":156,"v1":157,"color":"fefed1","trait":"art"},{"v0":158,"v1":159,"color":"ffffd2","trait":"art"},{"v0":160,"v1":161,"color":"ffffd3","trait":"art"},{"v0":162,"v1":163,"color":"ffffd4","trait":"art"},{"v0":164,"v1":165,"color":"ffffd5","trait":"art"},{"v0":166,"v1":167,"color":"ffffd6","trait":"art"},{"v0":168,"v1":169,"color":"ffffd7","trait":"art"},{"v0":170,"v1":171,"color":"faf0bc","trait":"art"},{"v0":0,"v1":170,"color":"d2c498","trait":"art"},{"v0":1,"v1":171,"color":"d2c498","trait":"art"},{"v0":185,"v1":189,"color":"d4c494","trait":"art"},{"v0":187,"v1":188,"color":"737373","trait":"art"},{"v0":191,"v1":220,"color":"555555","trait":"art"},{"v0":213,"v1":214,"color":"556d55","trait":"art"},{"v0":215,"v1":216,"color":"5d755e","trait":"art"},{"v0":216,"v1":203,"color":"b1a171","trait":"art"},{"v0":214,"v1":199,"color":"a19161","trait":"art"},{"v0":200,"v1":201,"color":"b1a171","trait":"art"},{"v0":201,"v1":202,"color":"c1b181","trait":"art"},{"v0":202,"v1":197,"color":"baaa7a","trait":"art"},{"v0":199,"v1":204,"color":"c1b181","trait":"art"},{"v0":204,"v1":203,"color":"baaa7a","trait":"art"},{"v0":205,"v1":197,"color":"b1a171","trait":"art"},{"v0":199,"v1":200,"color":"a99969","trait":"art"},{"v0":206,"v1":210,"color":"c1b181","trait":"art"},{"v0":210,"v1":207,"color":"baaa7a","trait":"art"},{"v0":208,"v1":211,"color":"baaa7a","trait":"art"},{"v0":211,"v1":209,"color":"baaa7a","trait":"art"},{"v0":209,"v1":206,"color":"a99969","trait":"art"},{"v0":197,"v1":203,"color":"b7a777","trait":"art"},{"v0":207,"v1":208,"color":"b7a777","trait":"art"},{"v0":173,"v1":175,"color":"435d91","trait":"art"},{"v0":175,"v1":174,"color":"3a5e9c","trait":"art"},{"v0":174,"v1":172,"color":"435d91","trait":"art"},{"v0":172,"v1":173,"color":"4c6286","trait":"art"},{"v0":177,"v1":178,"color":"eadaaa","trait":"art"},{"v0":181,"v1":178,"color":"cfc28f","trait":"art"},{"v0":179,"v1":176,"color":"eadaaa","trait":"art"},{"v0":179,"v1":180,"color":"cfc28f","trait":"art"},{"v0":178,"v1":182,"color":"a6aa6a","trait":"art"},{"v0":183,"v1":179,"color":"a6aa6a","trait":"art"},{"v0":178,"v1":179,"color":"98a060","trait":"art"},{"v0":216,"v1":205,"color":"909658","trait":"art"},{"v0":189,"v1":190,"color":"e1e1e1","trait":"art"},{"v0":190,"v1":192,"color":"dcdcdc","trait":"art"},{"v0":195,"v1":196,"color":"999999","bCoef":0.65,"cMask":["ball"]},{"v0":195,"v1":196,"vis":false,"color":"999999","bCoef":0,"cMask":["red","blue"]},{"v0":184,"v1":185,"color":"797979","bCoef":0.65,"cMask":["ball"]},{"v0":186,"v1":185,"color":"5c5c5c","bCoef":0.65,"cMask":["ball"]},{"v0":193,"v1":194,"color":"757575","bCoef":0.65,"cMask":["ball"]},{"v0":194,"v1":196,"vis":false,"bCoef":0.65,"trait":"ballArea"},{"v0":188,"v1":212,"curve":-244,"vis":false,"bCoef":0,"cMask":["red"],"cGroup":["redKO"]},{"v0":212,"v1":188,"curve":-244,"vis":false,"bCoef":0,"cMask":["blue"],"cGroup":["blueKO"]},{"v0":217,"v1":218,"curve":-180,"vis":false,"trait":"kickoffBarrier"},{"v0":218,"v1":217,"curve":-180,"vis":false,"trait":"kickoffBarrier"},{"v0":212,"v1":186,"vis":false,"trait":"ballArea"}],"goals":[{"p0":[-2,205],"p1":[-535,205],"team":"red"},{"p0":[2,205],"p1":[535,205],"team":"blue"}],"discs":[{"radius":7.25,"invMass":0,"pos":[-464,-94],"color":"25488f","trait":"art"},{"radius":7.5,"invMass":0,"pos":[-480,-54],"color":"cf3333","trait":"art"},{"radius":5.5,"invMass":0,"pos":[451,-190],"color":"c00000","trait":"art"},{"radius":7.5,"invMass":0,"pos":[465,-90],"color":"441177","trait":"art"},{"radius":7.75,"invMass":0,"pos":[472,-73],"color":"587010","trait":"art"},{"radius":6.25,"invMass":0,"pos":[-465,-102],"color":"dfc7b4","trait":"art"},{"radius":6.5,"invMass":0,"pos":[-481,-61.5],"color":"6B5841","trait":"art"},{"radius":4.5,"invMass":0,"pos":[451.5,-196.5],"color":"dab7a4","trait":"art"},{"radius":3.75,"invMass":0,"pos":[438.5,-197.5],"color":"c9a27b","trait":"art"},{"radius":3.5,"invMass":0,"pos":[423.5,-196],"color":"ab8871","trait":"art"},{"radius":6.5,"invMass":0,"pos":[466,-97.5],"color":"c9a27b","trait":"art"},{"radius":6.75,"invMass":0,"pos":[473,-80.5],"color":"fae7d4","trait":"art"},{"radius":5,"invMass":0,"pos":[-459,-186.5],"color":"bb8871","trait":"art"},{"radius":4.25,"invMass":0,"pos":[-461,-183],"color":"dab7a4","trait":"art"},{"radius":3.25,"invMass":0,"pos":[-447.5,-196.5],"color":"d9b28b","trait":"art"},{"radius":5.5,"invMass":0,"pos":[-474,-186],"color":"333354","trait":"art"},{"radius":4.5,"invMass":0,"pos":[-474.5,-191.5],"color":"dab7a4","trait":"art"},{"radius":100000,"invMass":300,"pos":[0,-100000],"color":"ffffffff","bCoef":0,"cMask":["ball"]}],"planes":[{"normal":[0,1],"dist":-178,"trait":"playerArea"},{"normal":[0,-1],"dist":-230,"trait":"playerArea"},{"normal":[0.93,0.37],"dist":-470,"trait":"playerArea"},{"normal":[-0.93,0.37],"dist":-470,"trait":"playerArea"},{"normal":[0.986,0.165],"dist":-482,"bCoef":0.2,"trait":"ballArea"},{"normal":[-0.986,0.165],"dist":-482,"bCoef":0.2,"trait":"ballArea"},{"normal":[1,0],"dist":-489,"bCoef":0.4,"cMask":["ball"],"trait":"ballArea"},{"normal":[-1,0],"dist":-489,"bCoef":0.4,"cMask":["ball"],"trait":"ballArea"},{"normal":[0,1],"dist":-1000,"trait":"ballArea"},{"normal":[0,-1],"dist":-215,"trait":"ballArea"},{"normal":[1,0],"dist":-510,"cMask":["red","blue"],"trait":"playerArea"},{"normal":[-1,0],"dist":-510,"cMask":["red","blue"],"trait":"playerArea"},{"normal":[1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[-1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[0,1],"dist":-199000,"bCoef":0,"cGroup":["ball"]}],"traits":{"art":{"cGroup":[""],"cMask":[""]},"ballArea":{"bCoef":0.1,"cMask":["ball"]},"playerArea":{"bCoef":0.1,"cMask":["red","blue"]},"goalNet":{"bCoef":0.05,"cMask":["ball","red","blue"]},"kickoffBarrier":{"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]}},"ballPhysics":{"radius":7.25,"bCoef":0.5,"invMass":1,"damping":0.99,"cMask":["wall"],"color":"ffffff"},"playerPhysics":{"bCoef":1,"invMass":0.1,"damping":0.97,"acceleration":0.09575,"kickingAcceleration":0.09575,"kickStrength":8.5,"kickingDamping":0.9}}`;


var practiceMap =
`{"name":"RSI Volleyball","width":485,"height":205,"bg":{"width":487,"height":207,"color":"38414F"},"vertexes":[{"x":-350,"y":-97,"cMask":[],"cGroup":[]},{"x":350,"y":-97,"cMask":[],"cGroup":[]},{"x":-351,"y":-94,"cMask":[],"cGroup":[]},{"x":351,"y":-94,"cMask":[],"cGroup":[]},{"x":-352,"y":-91,"cMask":[],"cGroup":[]},{"x":352,"y":-91,"cMask":[],"cGroup":[]},{"x":-353,"y":-88,"cMask":[],"cGroup":[]},{"x":353,"y":-88,"cMask":[],"cGroup":[]},{"x":-354,"y":-85,"cMask":[],"cGroup":[]},{"x":354,"y":-85,"cMask":[],"cGroup":[]},{"x":-355,"y":-82,"cMask":[],"cGroup":[]},{"x":355,"y":-82,"cMask":[],"cGroup":[]},{"x":-356,"y":-79,"cMask":[],"cGroup":[]},{"x":356,"y":-79,"cMask":[],"cGroup":[]},{"x":-357,"y":-76,"cMask":[],"cGroup":[]},{"x":357,"y":-76,"cMask":[],"cGroup":[]},{"x":-358,"y":-73,"cMask":[],"cGroup":[]},{"x":358,"y":-73,"cMask":[],"cGroup":[]},{"x":-359,"y":-70,"cMask":[],"cGroup":[]},{"x":359,"y":-70,"cMask":[],"cGroup":[]},{"x":-360,"y":-67,"cMask":[],"cGroup":[]},{"x":360,"y":-67,"cMask":[],"cGroup":[]},{"x":-361,"y":-64,"cMask":[],"cGroup":[]},{"x":361,"y":-64,"cMask":[],"cGroup":[]},{"x":-362,"y":-61,"cMask":[],"cGroup":[]},{"x":362,"y":-61,"cMask":[],"cGroup":[]},{"x":-363,"y":-58,"cMask":[],"cGroup":[]},{"x":363,"y":-58,"cMask":[],"cGroup":[]},{"x":-364,"y":-55,"cMask":[],"cGroup":[]},{"x":364,"y":-55,"cMask":[],"cGroup":[]},{"x":-365,"y":-52,"cMask":[],"cGroup":[]},{"x":365,"y":-52,"cMask":[],"cGroup":[]},{"x":-366,"y":-49,"cMask":[],"cGroup":[]},{"x":366,"y":-49,"cMask":[],"cGroup":[]},{"x":-367,"y":-46,"cMask":[],"cGroup":[]},{"x":367,"y":-46,"cMask":[],"cGroup":[]},{"x":-368,"y":-43,"cMask":[],"cGroup":[]},{"x":368,"y":-43,"cMask":[],"cGroup":[]},{"x":-369,"y":-40,"cMask":[],"cGroup":[]},{"x":369,"y":-40,"cMask":[],"cGroup":[]},{"x":-370,"y":-37,"cMask":[],"cGroup":[]},{"x":370,"y":-37,"cMask":[],"cGroup":[]},{"x":-371,"y":-34,"cMask":[],"cGroup":[]},{"x":371,"y":-34,"cMask":[],"cGroup":[]},{"x":-372,"y":-31,"cMask":[],"cGroup":[]},{"x":372,"y":-31,"cMask":[],"cGroup":[]},{"x":-373,"y":-28,"cMask":[],"cGroup":[]},{"x":373,"y":-28,"cMask":[],"cGroup":[]},{"x":-374,"y":-25,"cMask":[],"cGroup":[]},{"x":374,"y":-25,"cMask":[],"cGroup":[]},{"x":-375,"y":-22,"cMask":[],"cGroup":[]},{"x":375,"y":-22,"cMask":[],"cGroup":[]},{"x":-376,"y":-19,"cMask":[],"cGroup":[]},{"x":376,"y":-19,"cMask":[],"cGroup":[]},{"x":-377,"y":-16,"cMask":[],"cGroup":[]},{"x":377,"y":-16,"cMask":[],"cGroup":[]},{"x":-378,"y":-13,"cMask":[],"cGroup":[]},{"x":378,"y":-13,"cMask":[],"cGroup":[]},{"x":-379,"y":-10,"cMask":[],"cGroup":[]},{"x":379,"y":-10,"cMask":[],"cGroup":[]},{"x":-380,"y":-7,"cMask":[],"cGroup":[]},{"x":380,"y":-7,"cMask":[],"cGroup":[]},{"x":-381,"y":-4,"cMask":[],"cGroup":[]},{"x":381,"y":-4,"cMask":[],"cGroup":[]},{"x":-382,"y":-1,"cMask":[],"cGroup":[]},{"x":382,"y":-1,"cMask":[],"cGroup":[]},{"x":-383,"y":2,"cMask":[],"cGroup":[]},{"x":383,"y":2,"cMask":[],"cGroup":[]},{"x":-384,"y":5,"cMask":[],"cGroup":[]},{"x":384,"y":5,"cMask":[],"cGroup":[]},{"x":-385,"y":8,"cMask":[],"cGroup":[]},{"x":385,"y":8,"cMask":[],"cGroup":[]},{"x":-386,"y":11,"cMask":[],"cGroup":[]},{"x":386,"y":11,"cMask":[],"cGroup":[]},{"x":-387,"y":14,"cMask":[],"cGroup":[]},{"x":387,"y":14,"cMask":[],"cGroup":[]},{"x":-388,"y":17,"cMask":[],"cGroup":[]},{"x":388,"y":17,"cMask":[],"cGroup":[]},{"x":-389,"y":20,"cMask":[],"cGroup":[]},{"x":389,"y":20,"cMask":[],"cGroup":[]},{"x":-390,"y":23,"cMask":[],"cGroup":[]},{"x":390,"y":23,"cMask":[],"cGroup":[]},{"x":-391,"y":26,"cMask":[],"cGroup":[]},{"x":391,"y":26,"cMask":[],"cGroup":[]},{"x":-392,"y":29,"cMask":[],"cGroup":[]},{"x":392,"y":29,"cMask":[],"cGroup":[]},{"x":-393,"y":32,"cMask":[],"cGroup":[]},{"x":393,"y":32,"cMask":[],"cGroup":[]},{"x":-394,"y":35,"cMask":[],"cGroup":[]},{"x":394,"y":35,"cMask":[],"cGroup":[]},{"x":-395,"y":38,"cMask":[],"cGroup":[]},{"x":395,"y":38,"cMask":[],"cGroup":[]},{"x":-396,"y":41,"cMask":[],"cGroup":[]},{"x":396,"y":41,"cMask":[],"cGroup":[]},{"x":-397,"y":44,"cMask":[],"cGroup":[]},{"x":397,"y":44,"cMask":[],"cGroup":[]},{"x":-398,"y":47,"cMask":[],"cGroup":[]},{"x":398,"y":47,"cMask":[],"cGroup":[]},{"x":-399,"y":50,"cMask":[],"cGroup":[]},{"x":399,"y":50,"cMask":[],"cGroup":[]},{"x":-400,"y":53,"cMask":[],"cGroup":[]},{"x":400,"y":53,"cMask":[],"cGroup":[]},{"x":-401,"y":56,"cMask":[],"cGroup":[]},{"x":401,"y":56,"cMask":[],"cGroup":[]},{"x":-402,"y":59,"cMask":[],"cGroup":[]},{"x":402,"y":59,"cMask":[],"cGroup":[]},{"x":-403,"y":62,"cMask":[],"cGroup":[]},{"x":403,"y":62,"cMask":[],"cGroup":[]},{"x":-404,"y":65,"cMask":[],"cGroup":[]},{"x":404,"y":65,"cMask":[],"cGroup":[]},{"x":-405,"y":68,"cMask":[],"cGroup":[]},{"x":405,"y":68,"cMask":[],"cGroup":[]},{"x":-406,"y":71,"cMask":[],"cGroup":[]},{"x":406,"y":71,"cMask":[],"cGroup":[]},{"x":-407,"y":74,"cMask":[],"cGroup":[]},{"x":407,"y":74,"cMask":[],"cGroup":[]},{"x":-408,"y":77,"cMask":[],"cGroup":[]},{"x":408,"y":77,"cMask":[],"cGroup":[]},{"x":-409,"y":80,"cMask":[],"cGroup":[]},{"x":409,"y":80,"cMask":[],"cGroup":[]},{"x":-410,"y":83,"cMask":[],"cGroup":[]},{"x":410,"y":83,"cMask":[],"cGroup":[]},{"x":-411,"y":86,"cMask":[],"cGroup":[]},{"x":411,"y":86,"cMask":[],"cGroup":[]},{"x":-412,"y":89,"cMask":[],"cGroup":[]},{"x":412,"y":89,"cMask":[],"cGroup":[]},{"x":-413,"y":92,"cMask":[],"cGroup":[]},{"x":413,"y":92,"cMask":[],"cGroup":[]},{"x":-414,"y":95,"cMask":[],"cGroup":[]},{"x":414,"y":95,"cMask":[],"cGroup":[]},{"x":-415,"y":98,"cMask":[],"cGroup":[]},{"x":415,"y":98,"cMask":[],"cGroup":[]},{"x":-416,"y":101,"cMask":[],"cGroup":[]},{"x":416,"y":101,"cMask":[],"cGroup":[]},{"x":-417,"y":104,"cMask":[],"cGroup":[]},{"x":417,"y":104,"cMask":[],"cGroup":[]},{"x":-418,"y":107,"cMask":[],"cGroup":[]},{"x":418,"y":107,"cMask":[],"cGroup":[]},{"x":-419,"y":110,"cMask":[],"cGroup":[]},{"x":419,"y":110,"cMask":[],"cGroup":[]},{"x":-420,"y":113,"cMask":[],"cGroup":[]},{"x":420,"y":113,"cMask":[],"cGroup":[]},{"x":-421,"y":116,"cMask":[],"cGroup":[]},{"x":421,"y":116,"cMask":[],"cGroup":[]},{"x":-422,"y":119,"cMask":[],"cGroup":[]},{"x":422,"y":119,"cMask":[],"cGroup":[]},{"x":-423,"y":122,"cMask":[],"cGroup":[]},{"x":423,"y":122,"cMask":[],"cGroup":[]},{"x":-424,"y":125,"cMask":["wall"]},{"x":424,"y":125,"cMask":[],"cGroup":[]},{"x":-425,"y":128,"cMask":["wall"]},{"x":425,"y":128,"cMask":[],"cGroup":[]},{"x":-426,"y":131,"cMask":["wall"]},{"x":426,"y":131,"cMask":[],"cGroup":[]},{"x":-427,"y":134,"cMask":["wall"]},{"x":427,"y":134,"cMask":[],"cGroup":[]},{"x":-428,"y":137,"cMask":["wall"]},{"x":428,"y":137,"cMask":["wall"]},{"x":-429,"y":140,"cMask":["wall"]},{"x":429,"y":140,"cMask":["wall"]},{"x":-430,"y":143,"cMask":["wall"]},{"x":430,"y":143,"cMask":["wall"]},{"x":-431,"y":146,"cMask":["wall"]},{"x":431,"y":146,"cMask":["wall"]},{"x":-432,"y":149,"cMask":["wall"]},{"x":432,"y":149,"cMask":["wall"]},{"x":-433,"y":152,"cMask":["wall"]},{"x":433,"y":152,"cMask":["wall"]},{"x":-434,"y":155,"cMask":["wall"]},{"x":434,"y":155,"cMask":["wall"]},{"x":-434,"y":158,"cMask":["wall"]},{"x":434,"y":158,"cMask":["wall"]},{"x":-349.5,"y":-99.8,"cMask":[],"cGroup":[]},{"x":349.5,"y":-99.8,"cMask":[],"cGroup":[]},{"x":-436.5,"y":161,"cMask":["wall"]},{"x":436.5,"y":161,"cMask":["wall"]},{"x":441,"y":164,"cMask":["wall"]},{"x":-441,"y":164,"cMask":["wall"]},{"x":-351.3,"y":-101.8,"cMask":[],"cGroup":[]},{"x":351.3,"y":-101.8,"cMask":[],"cGroup":[]},{"x":445,"y":166,"cMask":["wall"]},{"x":-445,"y":166,"cMask":["wall"]},{"x":-448,"y":169,"cMask":["wall"]},{"x":448,"y":169,"cMask":["wall"]},{"x":-1.5,"y":189.5,"bCoef":0.65,"cMask":["ball"]},{"x":0,"y":70,"bCoef":0.65,"cMask":["ball"]},{"x":1.5,"y":189.5,"bCoef":0.65,"cMask":["ball"]},{"x":-2.2,"y":-111,"cMask":[],"cGroup":["red","blue","c1"]},{"x":-1,"y":-195,"cMask":[],"cGroup":["red","blue","c1"]},{"x":0,"y":90,"cMask":[],"cGroup":["red","blue","c1"]},{"x":0,"y":-76,"cMask":[],"cGroup":["red","blue","c1"]},{"x":2,"y":-111.8,"cMask":[],"cGroup":["red","blue","c1"]},{"x":0,"y":-181,"cMask":[],"cGroup":["red","blue","c1"]},{"x":3,"y":188,"bCoef":0.65,"cMask":["ball"]},{"x":2,"y":66.5,"bCoef":0.65,"cMask":["ball"]},{"x":-3,"y":186,"bCoef":0.65,"cMask":["red","blue"]},{"x":-2,"y":66.5,"bCoef":0.65,"cMask":["red","blue"]},{"x":0,"y":150,"bCoef":0.1,"cMask":["ball"]},{"x":-21.5,"y":42.5,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":21.5,"y":42.5,"bCoef":0,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":-178,"cMask":[],"cGroup":["red","blue","c1"]},{"x":1,"y":-195,"cMask":[],"cGroup":["red","blue","c1"]},{"x":-2150,"y":4000,"cMask":[],"cGroup":[]},{"x":-426,"y":-167,"cMask":[],"cGroup":[]},{"x":426,"y":-167,"cMask":[],"cGroup":[]},{"x":2150,"y":4000,"cMask":[],"cGroup":[]},{"x":-427.5,"y":-169,"cMask":[],"cGroup":[]},{"x":427.5,"y":-169,"cMask":[],"cGroup":[]},{"x":-429.5,"y":-171.1,"cMask":[],"cGroup":[]},{"x":429.5,"y":-171.1,"cMask":[],"cGroup":[]},{"x":-431.5,"y":-173.2,"cMask":[],"cGroup":[]},{"x":431.5,"y":-173.2,"cMask":[],"cGroup":[]},{"x":-433.5,"y":-175.3,"cMask":[],"cGroup":[]},{"x":433.5,"y":-175.3,"cMask":[],"cGroup":[]},{"x":-489,"y":-15,"cMask":["c1"],"cGroup":["red","blue"]},{"x":489,"y":212,"cMask":["c1"],"cGroup":["red","blue"]},{"x":-489,"y":212,"cMask":["c1"],"cGroup":["red","blue"]},{"x":489,"y":-15,"cMask":["c1"],"cGroup":["red","blue"]},{"x":-489,"y":212,"cMask":[],"cGroup":[]},{"x":489,"y":212,"cMask":[],"cGroup":[]},{"x":0,"y":187,"bCoef":0.1,"cMask":["ball"]},{"x":0,"y":212,"bCoef":0.7,"cGroup":["red","blue","wall"]},{"x":2,"y":69,"bCoef":0.1,"cMask":["ball"]},{"x":-3,"y":69,"bCoef":0,"cMask":["red","blue"]},{"x":-3,"y":218,"bCoef":0,"cMask":["red","blue"]},{"x":3,"y":69,"bCoef":0,"cMask":["red","blue"]},{"x":3,"y":218,"bCoef":0,"cMask":["red","blue"]},{"x":100,"y":68,"cMask":[],"cGroup":[]},{"x":-100,"y":68,"cMask":[],"cGroup":[]},{"x":100,"y":-99.8,"cMask":[],"cGroup":[]},{"x":-100,"y":-99.8,"cMask":[],"cGroup":[]},{"x":-425,"y":154,"cMask":["wall"]},{"x":-351.3,"y":-101.8,"cMask":[],"cGroup":[]},{"x":351.3,"y":-101.8,"cMask":[],"cGroup":[]},{"x":-448,"y":169,"cMask":["wall"]},{"x":448,"y":169,"cMask":["wall"]},{"x":-2150,"y":4000,"cMask":[],"cGroup":[]},{"x":-426,"y":-167,"cMask":[],"cGroup":[]},{"x":426,"y":-167,"cMask":[],"cGroup":[]},{"x":2150,"y":4000,"cMask":[],"cGroup":[]},{"x":-435.5,"y":-177.8,"cMask":[],"cGroup":[]},{"x":435.5,"y":-177.8,"cMask":[],"cGroup":[]},{"x":-437.5,"y":-180.2,"cMask":[],"cGroup":[]},{"x":437.5,"y":-180.2,"cMask":[],"cGroup":[]},{"x":0,"y":300,"bCoef":0.1,"cMask":["ball"]}],"segments":[{"v0":243,"v1":242,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":243,"v1":239,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":236,"v1":242,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":241,"v1":240,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":241,"v1":239,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":240,"v1":236,"cMask":[],"cGroup":[],"color":"38414F"},{"v0":197,"v1":200,"cMask":[],"cGroup":["red","blue","c1"],"color":"709868"},{"v0":188,"v1":197,"bCoef":0.1,"vis":false,"cMask":["red","blue"],"cGroup":["red","blue","c1"]},{"v0":188,"v1":244,"bias":-1,"bCoef":0.1,"vis":false,"cMask":["ball"],"cGroup":["red","blue","ball","c1"]},{"v0":188,"v1":244,"bias":1,"bCoef":0.1,"vis":false,"cMask":["ball"],"cGroup":["red","blue","ball","c1"]},{"v0":194,"v1":192,"bCoef":0.1,"cMask":["red","blue"],"cGroup":["red","blue","c1"],"color":"CFC999"},{"v0":202,"v1":203,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":203,"v1":204,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":204,"v1":205,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":202,"v1":206,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":206,"v1":207,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":207,"v1":205,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":202,"v1":208,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":208,"v1":209,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":209,"v1":205,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":202,"v1":210,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":210,"v1":211,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":211,"v1":205,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":202,"v1":212,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":212,"v1":213,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":213,"v1":205,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":176,"v1":177,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":180,"v1":181,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":182,"v1":183,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":0,"v1":1,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":2,"v1":3,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":4,"v1":5,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":6,"v1":7,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":8,"v1":9,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":10,"v1":11,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":12,"v1":13,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":14,"v1":15,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":16,"v1":17,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":18,"v1":19,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":20,"v1":21,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":22,"v1":23,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":24,"v1":25,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":26,"v1":27,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":28,"v1":29,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":30,"v1":31,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":32,"v1":33,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":34,"v1":35,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":36,"v1":37,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":38,"v1":39,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":40,"v1":41,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":42,"v1":43,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":44,"v1":45,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":46,"v1":47,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":48,"v1":49,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":50,"v1":51,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":52,"v1":53,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":54,"v1":55,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":56,"v1":57,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":58,"v1":59,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":60,"v1":61,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":62,"v1":63,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":64,"v1":65,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":66,"v1":67,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":68,"v1":69,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":70,"v1":71,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":72,"v1":73,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":74,"v1":75,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":76,"v1":77,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":78,"v1":79,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":80,"v1":81,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":82,"v1":83,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":84,"v1":85,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":86,"v1":87,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":88,"v1":89,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":90,"v1":91,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":92,"v1":93,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":94,"v1":95,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":96,"v1":97,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":98,"v1":99,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":100,"v1":101,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":102,"v1":103,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":104,"v1":105,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":106,"v1":107,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":108,"v1":109,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":110,"v1":111,"cMask":[],"cGroup":[],"color":"718DA3"},{"v0":112,"v1":113,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":114,"v1":115,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":116,"v1":117,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":118,"v1":119,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":120,"v1":121,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":122,"v1":123,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":124,"v1":125,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":126,"v1":127,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":128,"v1":129,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":130,"v1":131,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":132,"v1":133,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":134,"v1":135,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":136,"v1":137,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":138,"v1":139,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":140,"v1":141,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":142,"v1":143,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":144,"v1":145,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":146,"v1":147,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":148,"v1":149,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":150,"v1":151,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":152,"v1":153,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":154,"v1":155,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":156,"v1":157,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":158,"v1":159,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":160,"v1":161,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":162,"v1":163,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":164,"v1":165,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":166,"v1":167,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":168,"v1":169,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":170,"v1":171,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":0,"v1":170,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":1,"v1":171,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":185,"v1":189,"cMask":[],"cGroup":["red","blue","c1"],"color":"4B5E7A"},{"v0":187,"v1":188,"cMask":[],"cGroup":["red","blue","c1"],"color":"737373"},{"v0":191,"v1":201,"cMask":[],"cGroup":["red","blue","c1"],"color":"555555"},{"v0":173,"v1":175,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":175,"v1":174,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":174,"v1":172,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":172,"v1":173,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":177,"v1":178,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":181,"v1":178,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":179,"v1":176,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":179,"v1":180,"cMask":[],"cGroup":[],"color":"4B5E7A"},{"v0":178,"v1":182,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":183,"v1":179,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":178,"v1":179,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":189,"v1":190,"cMask":[],"cGroup":["red","blue","c1"],"color":"E1E1E1"},{"v0":190,"v1":192,"cMask":[],"cGroup":["red","blue","c1"],"color":"DCDCDC"},{"v0":195,"v1":196,"bCoef":0.65,"cMask":["ball"],"color":"999999"},{"v0":195,"v1":196,"bCoef":0,"vis":false,"cMask":["red","blue"],"color":"999999"},{"v0":184,"v1":185,"bCoef":0.65,"cMask":["ball"],"color":"797979"},{"v0":186,"v1":185,"bCoef":0.65,"cMask":["ball"],"color":"5C5C5C"},{"v0":193,"v1":194,"bCoef":0.65,"cMask":["ball"],"color":"757575"},{"v0":194,"v1":196,"bCoef":0.1,"vis":false,"cMask":["ball"]},{"v0":197,"v1":188,"bCoef":0,"curve":-136.39718102729637,"curveF":-0.4,"vis":false,"cMask":["red"],"cGroup":["redKO"]},{"v0":188,"v1":197,"bCoef":0,"curve":-136.39718102729637,"curveF":-0.4,"vis":false,"cMask":["blue"],"cGroup":["blueKO"]},{"v0":199,"v1":198,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":198,"v1":199,"bCoef":0,"curve":180,"curveF":6.123233995736766e-17,"vis":false,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":216,"v1":214,"bCoef":0,"cMask":["c1"],"cGroup":["red","blue"],"color":"2C323B"},{"v0":215,"v1":217,"bCoef":0,"cMask":["c1"],"cGroup":["red","blue"],"color":"2C323B"},{"v0":218,"v1":219,"bCoef":0,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":220,"v1":221,"bCoef":0.7,"cGroup":["red","blue","wall"],"color":"2C323B"},{"v0":197,"v1":186,"bCoef":0.1,"vis":false,"cMask":["ball"]},{"v0":223,"v1":224,"bCoef":0,"vis":false,"cMask":["red","blue"]},{"v0":225,"v1":226,"bCoef":0,"vis":false,"cMask":["red","blue"]},{"v0":227,"v1":228,"bCoef":0,"cMask":[],"color":"6B7D99"},{"v0":228,"v1":230,"bCoef":0,"cMask":[],"color":"6B7D99"},{"v0":227,"v1":229,"bCoef":0,"cMask":[],"color":"6B7D99"},{"v0":182,"v1":231,"cMask":["wall"],"color":"4B5E7A"},{"v0":183,"v1":171,"cMask":["wall"],"color":"4B5E7A"},{"v0":232,"v1":234,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":235,"v1":233,"cMask":[],"cGroup":[],"color":"6B7D99"},{"v0":236,"v1":237,"cMask":[],"cGroup":[],"color":"2C323B"},{"v0":238,"v1":239,"cMask":[],"cGroup":[],"color":"2C323B"}],"planes":[{"normal":[1,0],"dist":0,"bCoef":0.5,"cMask":["c2"]},{"normal":[-1,0],"dist":0,"bCoef":0.5,"cMask":["c3"]},{"normal":[0,1],"dist":-178,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[0,-1],"dist":-230,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[0.9291641282577402,0.36966744887673536],"dist":-470,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[-0.9291641282577402,0.36966744887673536],"dist":-470,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[0.9862855710151985,0.16504778825305047],"dist":-482,"bCoef":0.2,"cMask":["ball"]},{"normal":[-0.9862855710151985,0.16504778825305047],"dist":-482,"bCoef":0.2,"cMask":["ball"]},{"normal":[1,0],"dist":-489,"bCoef":0.4,"cMask":["ball"]},{"normal":[-1,0],"dist":-489,"bCoef":0.4,"cMask":["ball"]},{"normal":[0,1],"dist":-1000,"bCoef":0.1,"cMask":["ball"]},{"normal":[0,-1],"dist":-215,"bCoef":0.1,"cMask":["ball"]},{"normal":[1,0],"dist":-510,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[-1,0],"dist":-510,"bCoef":0.1,"cMask":["red","blue"]},{"normal":[1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[-1,0],"dist":-100000,"bCoef":0,"cGroup":["ball"]},{"normal":[0,1],"dist":-199000,"bCoef":0,"cGroup":["ball"]}],"goals":[{"p0":[-2,205],"p1":[-535,205],"team":"red"},{"p0":[2,205],"p1":[535,205],"team":"blue"}],"discs":[{"radius":7.6,"cMask":["wall"],"cGroup":["ball","kick","score"]},{"pos":[0,-100000],"radius":100000,"bCoef":0,"invMass":300,"color":"transparent","cMask":["ball"]},{"pos":[-10000,-10000],"radius":15,"bCoef":0,"invMass":0,"color":"E56E56","cMask":["wall"]},{"pos":[-10000,-10000],"radius":15,"bCoef":0,"invMass":0,"color":"E56E56","cMask":["wall"]},{"pos":[-10000,-10000],"radius":15,"bCoef":0,"invMass":0,"color":"5689E5","cMask":["wall"]},{"pos":[-10000,-10000],"radius":15,"bCoef":0,"invMass":0,"color":"5689E5","cMask":["wall"]},{"pos":[-21370,-10000],"radius":15,"bCoef":3,"invMass":0,"damping":0.97,"color":"5689E5","cMask":["red","blue","ball"],"cGroup":["red","blue","wall"]}],"playerPhysics":{"bCoef":1,"invMass":0.1,"damping":0.97,"acceleration":0.09575,"kickingAcceleration":0.09575,"kickingDamping":0.9,"kickStrength":8.5},"ballPhysics":"disc0","spawnDistance":455}`;

var afkLimit = 90; // limite de afk (12 segundos)
var drawTimeLimit = 1; // minutos
var maxTeamSize = 3; // máximo de jogadores num time, isso funciona para 1 (você pode querer adaptar as coisas para remover algumas estatísticas inúteis em 1v1, como assist ou cs), 2, 3 ou 4
var slowMode = 0;

/* JOGADORES */

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

/* GAME */

let forbid = ["macaco", "adolf hitler", "nazismo", "cuzao", "cuzão", "autista", "cu", "hitler", "Macaco", "Hitler", "Pênis"];

let link = ["https://www.haxball.com/play?c=_", "https://www.haxball.com", "haxball.com", ".com", "https://", "https:", "https://www."];
let bannedWords = [
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
let xingo = ["seu preto", "seu macaco", "macaco", "seu negro", "pretinho", "resto de aborto", "seu mcc", "Negrinho", "carvão", "nazista", "Nazista"];

function nameForbid(player) {
  if (forbid.includes(player.name)) {
    room.kickPlayer(player.id, "nick proibido nessa sala", false);
  }
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

// -------------------------------------------------
// Webhooks
// -------------------------------------------------

let replayWebHook = "https://discord.com/api/webhooks/1227094504989921340/4Me4_Lm-Ovcfa5XwWVUMxCQQoXSs1g8OvjTsuMLhfgLB4SxecVwkn30HdVqSpiDYfX_E";
let goalWebHook = "https://discord.com/api/webhooks/1241945757435695124/T3rWOYrj4oOixjDcazH25Mx-ViW5W9j-_m6rRD3KaYI8Qkij5W055LVzIy7rIVXYjEZG";
let chatWebHook = "https://discord.com/api/webhooks/1241945347412983988/t3RJZ9HNCP2OqA-NKGeE2Ycysa3DxL69n_siQLKHgKvt9kyIOlS3RpWDkXt1Mb7nGz7d";
let joinWebHook = "https://discord.com/api/webhooks/1241945503092969562/H7a5a7gAY-34woozI5ylkfYyLkhkBnRB2Obbgk4veRvvGNKwlMxukf14gE-zIb92CVjw";
let toxicWebHook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";
let statsWebHook = "https://discord.com/api/webhooks/1241946365018378310/vkSMK9m1qfURha4xzCQf6KieYRh_JSOsruxvSuQQT-Tp_Q4ZgtqQyzfE9_PLFErFLfkh";
let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1243753317717245953/FYP7Izmz2P7Xlib5cWDnXLJoilpmGM9tbNK5yzktc-5NnHuPJXRf5pHw6f_6kgELmgRI";

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

function Game(date, scores, goals) {
  this.date = date;
  this.scores = scores;
  this.goals = goals;
}

/* FUNCTIONS */

function centerText(string) {
  var space = parseInt((80 - string.length) * 0.8, 10);
  if (space <= 0) {
    return "";
  }
  return " ".repeat(space) + string + " ".repeat(space);
}

/* CHASING */
function golcontra(goaler) {
  var messages = [
    "I'm sure it was accident, right? " + goaler.name,
    "You're playing for the wrong team, " + goaler.name,
    "The opponent say thanks, " + goaler.name,
    "What are you doing? " + goaler.name,
    "Alright, bad perform i think",
    "Try to serious! " + goaler.name,
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var announcement = messages[randomIndex];
  setTimeout(function () {
    //room.sendAnnouncement(centerText(announcement), null, Cor.White, "bold");
    room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + announcement + "", null, 0xffffe0, "normal");
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

function pointDistance(p1,p2){ //Detects the distance between any two points.
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}

function handleFrozenPlayerMoves(){ //Detects moves of frozen players. If a frozen player tries to move from their freeze point, then they will be moved to that point.
  var players = room.getPlayerList();
  for(var i=0; i<players.length; i++){
if(freeze.includes(players[i].name) == true && pointDistance(room.getPlayerDiscProperties(players[i].id),getPlayerByID(players[i].id).freezePoint) > 0){
    room.setPlayerDiscProperties(players[i].id,{x:getPlayerByID(players[i].id).freezePoint.x,y:getPlayerByID(players[i].id).freezePoint.y,xspeed:0,yspeed:0});
}
  }
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

function moveBotToBottom() {
  let players = room.getPlayerList();
  let bot = players.find(player => player.id == 0); // Assuming bot ID is 0
  if (bot) {
    let otherPlayerIds = players.filter(player => player.id != bot.id).map(player => player.id);
    otherPlayerIds.push(bot.id);
    room.reorderPlayers(otherPlayerIds);
    console.log("Bot moved to the bottom");
  } else {
    console.log("Bot not found");
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
    room.sendAnnouncement(centerText("I'll give " + drawTimeLimit * 60 + " seconds!"), null, Cor.White, "normal");
    room.sendAnnouncement(centerText("⚽ First goal wins! ⚽"), null, Cor.White, "normal");
  }
  if (scores.time > scores.timeLimit + drawTimeLimit * 60 - 15 && scores.time <= scores.timeLimit + drawTimeLimit * 60) {
    if (checkTimeVariable == false && announced == false) {
      checkTimeVariable = true;
      announced = true;
      setTimeout(() => {
        checkTimeVariable = false;
      }, 10);
      room.sendAnnouncement(centerText("⌛ 15 seconds to a tie!"), null, Cor.Amarelo, "bold");
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
  players.length >= 2 * maxTeamSize - 1 ? activateChooseMode() : null;
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
    room.sendAnnouncement("💤 Limit reached");
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
  //sendDiscordWebhook(scores);
  //room.sendAnnouncement("A partida foi gravada e enviada em nosso discord. ID: " + `${getDate()}`, null, Cor.Amrelo, Negrito);
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
  slowMode = 2;
  room.sendAnnouncement("Recruitment mode activated!", null, 0x55bae2, "bold");
  room.sendAnnouncement("Captain is picking players...", null, 0xf2a000, "bold");
  room.sendAnnouncement("Captain is picking players...", null, 0xf2a000, "bold");
}

function deactivateChooseMode() {
  inChooseMode = false;
  clearTimeout(timeOutCap);
  if (slowMode != 0) {
    slowMode = 0;
    room.sendAnnouncement("Recruitment mode closed.", null, 0xf2a000, "bold");
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
      room.sendAnnouncement("@" + room.getPlayer(extendedP[i][eP.ID]).name + " AFK detected... Move within " + Math.floor(afkLimit / 3) + "s to cancel", extendedP[i][eP.ID], 0xf4a404, "bold", 2);
    }
    if (extendedP[i][eP.ACT] >= 60 * afkLimit) {
      extendedP[i][eP.ACT] = 0;
      if (room.getScores().time <= afkLimit - 0.5) {
        setTimeout(() => {
          !inChooseMode ? quickRestart() : room.stopGame();
        }, 10);
      }
      room.kickPlayer(extendedP[i][eP.ID], "AFK", false);
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

/* BALANCE AND RECRUITMENT FUNCTIONS */

function updateRoleOnPlayerIn() {
  updateTeams();
  if (inChooseMode) {
    if (players.length == 6) {
      loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
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
          room.sendAnnouncement("[Juiz] Ragequit by the red team detected, match over!", null, 0xbfff00, "normal");
          setTimeout(() => {
            room.stopGame();
          }, 100);
          return;
        }
      } else {
        if (scores.red - scores.blue == 2) {
          endGame(Team.RED);
          // room.sendChat("🤖 Ragequit 🤖");
          room.sendAnnouncement("[Juiz] Ragequit by the blue team detected, match over!", null, 0xbfff00, "normal");
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
      // room.sendChat("Sem alternativas, deixe me lidar com essa situação. ...");
      room.sendAnnouncement("[Juiz] With no possibility of recruitment, let me decide...", null, 0xc0bdb1, "bold");
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
        room.sendAnnouncement("Balancing teams...", null, 0xc0bdb1, "normal");
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
        loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
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
          loadMap(practiceMap, scoreLimitPractice, timeLimitPractice);
        }
      }
      topBtn();
    }
  }
}

function choosePlayer() {
  clearTimeout(timeOutCap);
  if (TeamR.length <= TeamB.length && TeamR.length != 0) {
    room.sendAnnouncement("[Tips] Enter player number or type 'random'", TeamR[0].id, 0x21DC00, "normal");
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
        room.sendAnnouncement("Be quick, @" + player.name + ", only remain " + Number.parseInt(chooseTime / 2) + " seconds left!", player.id, 0xf2a000, "normal");
        timeOutCap = setTimeout(
          function (player) {
            room.kickPlayer(player.id, "AFK", false);
          },
          chooseTime * 500,
          TeamR[0]
        );
      },
      chooseTime * 1000,
      TeamR[0]
    );
  } else if (TeamB.length < TeamR.length && TeamB.length != 0) {
    room.sendAnnouncement("[Tips] Enter player number or type 'random'", TeamB[0].id, 0x21DC00, "normal");
    timeOutCap = setTimeout(
      function (player) {
        room.sendAnnouncement("Captain " + player.name + " is currently picking ...", null, 0x55bae2, "small");
        room.sendAnnouncement("Be quick, @" + player.name + ", only remain " + Number.parseInt(chooseTime / 2) + " seconds left!", player.id, 0xf2a000, "normal");
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

// function getSpecList(player) {
//   var cstm = "[Pick] Type number : ";
//   for (var i = 0; i < teamS.length; i++) {
//     if (140 - cstm.length < (teamS[i].name + "[" + (i + 1) + "], ").length) {
//       room.sendChat(cstm, player.id);
//       cstm = "... ";
//     }
//     cstm += teamS[i].name + "[" + (i + 1) + "], ";
//   }
//   cstm = cstm.substring(0, cstm.length - 2);
//   cstm += ".";
//   room.sendAnnouncement(cstm, player.id, 0xebeb09, "bold");
// }

function getSpecList(player) {
  var cstm = "[Pick] Type number : ";
  for (var i = 0; i < teamS.length; i++) {
    if (140 - cstm.length < ("[" + (i + 1) + "] "+ teamS[i].name + ", ").length) {
      room.sendChat(cstm, player.id);
      cstm = ".. ";
    }
    cstm +="[" + (i + 1) + "] "+ teamS[i].name + ", ";
  }
  cstm = cstm.substring(0, cstm.length - 2);
  cstm += "";
  room.sendAnnouncement(cstm, player.id, 0xebeb09, "small");  //default normal pas recruit
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

  moveBotToBottom();
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined volleyball server.\``);
  checkAndKickPlayer(player);
  createPlayer(player);

  const specialAuths = [
    "Gz6lv-5YsUCk-bJHBxyzbXtFAV2O3edJUev3DhEf_xA", //fox
    "0Zu3VQi49L7EVFA2vhBhlvHSycK4E7CksBY2v4KpPAc", //m4
    "LnEtoSdVonFZdGMYKDUVPAWb-SzD-PsUMJC2nDPHO5w", //roti
    "RJ4Gabk5YrcFaGkD1FC3JOVjCvUcsQr_eRnMJcdfF7I", //nightkaz
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

  if ((player.auth === specialAuths[0] && player.conn === specialConns[0]) ||
    (player.auth === specialAuths[1] && player.conn === specialConns[1])) {
    // Set the player as an admin
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
  //     room.sendAnnouncement("「Admin」" + player.name + " Came into the room!", null, 0xff7900, "normal");
  //   }
  // }
  // if (localStorage.getItem(getAuth(player)) == null) {
  //   stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name];
  //   localStorage.setItem(getAuth(player), JSON.stringify(stats));
  // }
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
  moveBotToBottom();
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
  moveBotToBottom();
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left volleyball server.\``);
  deletePlayer(player);

  // var players = room.getPlayerList();
  // var adminNumber = 0;
  // for (var i = 0; i < players.length; i++) {
  //   if (players[i].admin) {
  //     adminNumber++;
  //   }
  // }
  // if (adminNumber < 2) {
  //   room.setPlayerAdmin(players[1].id, true);
  // }
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

room.onPlayerChat = function (player, message) {
  sendWebhook(chatWebHook, `\`💬 [volley] ${player.name} [${player.id}]: ${message}\``);
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
          sendWebhook(playerWebHook, `\`🧊 [volleyball] ${players[i].name} was frozen by ${player.name}\``);
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
            whisper("[private chat > " + pmPlayer.name + "] " + player.name + ": " + pmMsg, player.id, 0xff20ff, "normal", 1);
            whisper("[private chat] " + player.name + ": " + pmMsg, pmPlayer.id, 0xff20ff, "normal", 1);
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bra";
        room.setTeamColors(Team.BLUE, 0, 0x3347b3, [0x018434, 0xf8de2e, 0xf8de2e]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Brazil]! ", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ale";
        room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x121003, 0xc70000, 0xf5c600]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Germany]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!arg";
        room.setTeamColors(Team.BLUE, 90, 0xe3ac42, [0x74acdf, 0xffffff, 0x74acdf]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Argentina]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!esp";
        room.setTeamColors(Team.BLUE, 0, 0xdba640, [0x7b111a, 0x7b111a, 0x7b111a]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Spain]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!por";
        room.setTeamColors(Team.BLUE, 120, 0xdba640, [0x7b111a, 0x7b111a, 0x384f43]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", escolheu o uniforme de [Portugal]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ita";
        room.setTeamColors(Team.BLUE, 60, 0xffffff, [0x0249a8, 0x0366eb, 0x0082d3]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Italy]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!uru";
        room.setTeamColors(Team.BLUE, 0, 0xffffff, [0x0082d3, 0x0082d3, 0x0082d3]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Uruguay]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!fra";
        room.setTeamColors(Team.BLUE, 0, 0xd19e1f, [0x202c46, 0x202c46, 0x202c46]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [France]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!ing";
        room.setTeamColors(Team.BLUE, 90, 0x0f2544, [0x408cff, 0xa1c6ff, 0xe0e4e9]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [England]!", null, 0x30f55f, "bold");
      }
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
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bel";
        room.setTeamColors(Team.BLUE, 90, 0xd19e1f, [0x151619, 0x990011, 0x990011]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Belgium]!", null, 0x30f55f, "bold");
      }
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
    if (player.team == 2) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!hol";
        room.setTeamColors(Team.RED, 90, 0x2b0e09, [0xdc6024, 0xdc6024, 0xdc6024]);
        room.sendAnnouncement("The captain of the blue team, " + player.name + ", chose the uniform [Netherlands]!", null, 0x30f55f, "bold");
      }
    }
  }

  if (message == "!bah") {
    if (player.team == 1) {
      if (player.id == TeamR[0].id) {
        CaptainChoice = "!bah";
        room.setTeamColors(Team.RED, 0, 0xffffff, [0x0a4ae8, 0xf20533, 0x0a4ae8]);
        room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform BAHIA! ", null, 0x30f55f, "bold");
      }
      if (message == "!bah") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!bah";
            room.setTeamColors(Team.BLUE, 0, 0xffffff, [0x0a4ae8, 0xf20533, 0x0a4ae8]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform BAHIA! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!vit") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!vit";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0xff1d0d, 0x000000]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform VITÓRIA! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!vit") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!vit";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0xff1d0d, 0x000000]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform VITÓRIA! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!flu") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!flu";
            room.setTeamColors(Team.RED, 0, 0xffffff, [0x2a524f, 0x871f39, 0x2a524f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform FLUMINENSE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!flu") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!flu";
            room.setTeamColors(Team.BLUE, 0, 0xffffff, [0x2a524f, 0x871f39, 0x2a524f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform FLUMINENSE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!for") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!for";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0x182587, 0xe32026, 0x182587]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform FORTALEZA! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!for") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!for";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x182587, 0xe32026, 0x182587]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform FORTALEZA! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!cap") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!cap";
            room.setTeamColors(Team.RED, 45, 0xffffff, [0xe8153f, 0x000000, 0xe8153f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform ATHLETICO PARANAENSE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!cap") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!cap";
            room.setTeamColors(Team.BLUE, 45, 0xffffff, [0xe8153f, 0x000000, 0xe8153f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform ATHLETICO PARANAENSE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!rem") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!rem";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0x000000]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform REMO! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!rem") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!rem";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x000000]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform REMO! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!cui") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!cui";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0x217430, 0xf4d42f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform CUIABÁ! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!cui") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!cui";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0x217430, 0xf4d42f]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform CUIABÁ! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!jvn") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!jvn";
            room.setTeamColors(Team.RED, 0, 0x00964b, [0x00964b, 0xffffff, 0x00964b]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform JUVENTUDE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!jvn") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!jvn";
            room.setTeamColors(Team.BLUE, 0, 0x00964b, [0x00964b, 0xffffff, 0x00964b]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform JUVENTUDE! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!utd3") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!utd3";
            room.setTeamColors(Team.RED, -37, 0xf0cf0d, [0x1e416d, 0x235287, 0x1463a4]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform MANCHESTER UNITED 3º KIT! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!utd3") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!utd3";
            room.setTeamColors(Team.BLUE, -37, 0xf0cf0d, [0x1e416d, 0x235287, 0x1463a4]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform MANCHESTER UNITED 3º KIT! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!spo") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!spo";
            room.setTeamColors(Team.RED, 0, 0xffe600, [0xff0d0d, 0x000000, 0xff0d0d]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform SPORT! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!spo") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!spo";
            room.setTeamColors(Team.BLUE, 0, 0xffe600, [0xff0d0d, 0x000000, 0xff0d0d]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform SPORT! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!gol") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!gol";
            room.setTeamColors(Team.RED, 90, 0x23cc4a, [0x0c4519]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform GOIÁS! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!gol") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!gol";
            room.setTeamColors(Team.BLUE, 90, 0x23cc4a, [0x0c4519]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform GOIÁS! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!vas") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!vas";
            room.setTeamColors(Team.RED, 140, 0xff1212, [0xffffff, 0x002033, 0xffffff]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform VASCO! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!vas") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!vas";
            room.setTeamColors(Team.BLUE, 140, 0xff1212, [0xffffff, 0x002033, 0xffffff]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform VASCO! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!pen") {
        if (player.team == 1) {
          if (player.id == TeamR[0].id) {
            CaptainChoice = "!pen";
            room.setTeamColors(Team.RED, 90, 0xffffff, [0xfac904, 0x000000, 0xfac904]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform PENHÃROL! ", null, 0x30f55f, "bold");
          }
        }
      }
      if (message == "!pen") {
        if (player.team == 2) {
          if (player.id == TeamB[0].id) {
            CaptainChoice = "!pen";
            room.setTeamColors(Team.BLUE, 90, 0xffffff, [0xfac904, 0x000000, 0xfac904]);
            room.sendAnnouncement(player.name + "The team captain, " + player.name + ", chose the uniform PENHÃROL! ", null, 0x30f55f, "bold");
          }
        }
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
          room.sendChat("Spam alert.", player.id);
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
          room.kickPlayer(player.id, "Moderate your messages", true);
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
  if (["!help", "!ajuda"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("[📄] Commands : !afk, !stats, !dc, !bb, !uni, !showme, !rank, !games, !wins, !goals, !assists", player.id, 0x309d2b, "bold");
    player.admin ? room.sendAnnouncement("[📄] Admin : !mute <duration = 3> #<id>, !unmute all/#<id>, !clearbans <number = all>, !slow <duration>, !endslow", player.id, 0x309d2b, "bold") : null;
  }

  if (["!chooseadm"].includes(message[0].toLowerCase())) {
    if (message[1] == "on") {
      room.sendAnnouncement(player.name + " Activated recruitment mode!", null, 0x55bae2, "bold");
      choose = true;
    } else if (message[1] == "off") {
      room.sendAnnouncement(player.name + " Disabled recruitment mode.", null, 0xf2a000, "bold");
      choose = false;
    }
  }

  if (["!uni", "!unis"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Soccer teams:", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Brazil [!bra], Germany [!ger], Argentina [!arg], Spain [!spa], Portugal [!por]", player.id, Cor.Branco, "normal");
    room.sendAnnouncement("Italy [!ita], Uruguay [!uru], France [!fra], England [!eng], Belgium [!bel], Netherlands [!net]", player.id, Cor.Branco, "normal");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  }
  if (["!rank"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Ranks per goal:", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Bronze I - [⚽:2] | Iron II - [⚽:4] | Iron I - [⚽:6] ", player.id, 0xbc5e00, "normal");
    room.sendAnnouncement("Gold II - [⚽:8] | Gold I - [⚽:10] ", player.id, 0xa2a2a2, "normal");
    room.sendAnnouncement("Platinum II - [⚽:14] | Platinum I - [⚽:17]",  player.id, 0xeac274, "normal");
    room.sendAnnouncement("Type '!rank2' to see more", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  }
  if (["!rank2"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Ranks per goal (2 page):", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Diamond IV - [⚽:20] | Diamond III - [⚽:26] | Diamond II - [⚽:32]", player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Diamond I - [⚽:40] | Crown II - [⚽:50] | Crown I - [⚽:80]" , player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Last rank: Legend - [⚽:110]", player.id, 0xf77104, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "bold");
  } else if (["!afk"].includes(message[0].toLowerCase())) {
    if (players.length != 1 && player.team != Team.SPECTATORS) {
      if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
        room.setPlayerTeam(player.id, Team.SPECTATORS);
      } else {
        room.sendAnnouncement("You can't go AFK while playing!", player.id, 0xff7b08);
        return false;
      }
    } else if (players.length == 1 && !getAFK(player)) {
      room.setPlayerTeam(player.id, Team.SPECTATORS);
    }
    setAFK(player, !getAFK(player));
    room.sendAnnouncement(player.name + (getAFK(player) ? " entering AFK Zone!" : " is no longer AFK!"), null, getAFK(player) ? 0xff7b08 : 0x8fff8f);
    room.sendAnnouncement((getAFK(player) ? "type !afk to return" : ""), player.id, getAFK(player) ? 0xff7b08 : 0x8fff8f);
    getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player"]);
    setTimeout(() => {
      if (getAFK(player) && stats[Ss.RL] != "vip") {
        room.kickPlayer(player.id, "AFK timeout", false);
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
  } else if (["!stats", "!showme", "!me"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    room.sendAnnouncement(
      "[📄] Stats from " +
        player.name +
        ": 🎮 Game played: " +
        stats[Ss.GA] +
        ", ✅ Win: " +
        stats[Ss.WI] +
        ", ❌ Lose: " +
        stats[Ss.LS] +
        ", WR: " +
        stats[Ss.WR] +
        "%, 🏐 Scores: " +
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
      room.sendAnnouncement("[RSI] Didn't play enough games", player.id, 0xff0000);
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
      room.sendAnnouncement("[RSI] Didn't play enough games", player.id, 0x73ec59);
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
      room.sendAnnouncement("[RSI] Didn't play enough games", player.id, 0x73ec59);
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
      room.sendAnnouncement("[RSI] Didn't play enough games", player.id);
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
  } else if (["!cs"].includes(message[0].toLowerCase())) {
    var tableau = [];
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
          tableau.push([JSON.parse(localStorage.getItem(key))[Ss.NK], JSON.parse(localStorage.getItem(key))[Ss.CS]]);
        }
      });
    } catch {}
    if (tableau.length < 5) {
      room.sendAnnouncement("[RSI] Didn't play enough games", player.id, 0x73ec59);
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
      if (room.getPlayer(player.id).admin) {
        room.sendAnnouncement("already an administrator!", player.id, 0xFB6B6B, 2);
      } else {
        room.setPlayerAdmin(player.id, true);
        room.sendAnnouncement(player.name + " ʟᴏɢɢᴇᴅ ɪɴ ᴀꜱ ᴀᴅᴍɪɴɪꜱᴛʀᴀᴛᴏʀ!", null, 0xff7900, 2);
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
            sendWebhook(playerWebHook, `\`💬 [volleyball] ${room.getPlayer(Number.parseInt(message[2])).name} was muted for ${timeOut / 60000} minutes by ${player.name}\``);
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
            sendWebhook(playerWebHook, `\`💬 [volleyball] ${room.getPlayer(Number.parseInt(message[1])).name} was muted for 3 minutes by ${player.name}\``);
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
        room.sendChat("Bans removed!");
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
  } else if (["!citruser123456"].includes(message[0].toLowerCase())) {
    room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
  } else if (["!citbuser123456"].includes(message[0].toLowerCase())) {
    room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
  } else if (["!citred"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!citblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -539, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!bb", "!bye", "!cya", "!gn"].includes(message[0].toLowerCase())) {
    room.kickPlayer(player.id, "👋 Until later!", false);
  } else if (["!start", "!fixstart"].includes(message[0].toLowerCase())) {
    if (inChooseMode === true) {
        whisper("Can't start while picking", player.id);
    } else if (room.getScores() == null) {
        room.startGame();
    } else {
        whisper("Cannot start while game in progress", player.id);
    }
  } else if (["!dc", "!disc", "!discord"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ", null, 0x9250fd, "bold");
    room.sendAnnouncement("                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ", null, 0x8466fd, "bold");
    room.sendAnnouncement("                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ", null, 0x7b73fd, "bold");
    room.sendAnnouncement("                                        💬 Discord Link: ➡ discord.gg/pm55tVsQMX / ⬅", null, 0xf6ff43, "bold");
  }

  if (xingo.includes(message[0])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }
  if (xingo.includes(message[1])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }
  if (xingo.includes(message[2])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }
  if (xingo.includes(message[3])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }
  if (xingo.includes(message[4])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }
  if (xingo.includes(message[5])) {
    room.kickPlayer(player.id, "❌ Racism is not tolerated in this room.", false);
    room.sendAnnouncement(centerText("Player " + player.name + " talked shit"), player.id, Cor.Warn, "italic");
    return false;
  }

  if (link.includes(message[0])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[1])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[2])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[3])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[4])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[5])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[6])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }

  if (link.includes(message[7])) {
    room.sendAnnouncement("You cannot send links here, " + player.name, player.id, Cor.Warn, "italic", 2);
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
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
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
        } else if (["random", "rand"].includes(message[0].toLowerCase())) {
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
    } else if (stats[Ss.GL] > 72) {
      announcement += "[🥇ʟᴠ70] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 68) {
      announcement += "[🥇ʟᴠ68] ";
      chatColor = "0x9312D3";
    } else if (stats[Ss.GL] > 65) {
      announcement += "[🥈ʟᴠ65] ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 61) {
      announcement += "[🥈ʟᴠ63] ";
      chatColor = "0xFFFF04";
    } else if (stats[Ss.GL] > 58) {
      announcement += "[🥉ʟᴠ60] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 55) {
      announcement += "[🥉ʟᴠ58] ";
      chatColor = "0xC435E7";
    } else if (stats[Ss.GL] > 53) {
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
    } else if (stats[Ss.GL] > 43) {
      announcement += "[💠ʟᴠ44] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 40) {
      announcement += "[💠ʟᴠ41] ";
      chatColor = "0xFA51CF";
    } else if (stats[Ss.GL] > 36) {
      announcement += "[💠ʟᴠ38] ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 32) {
      announcement += "[💠ʟᴠ35] ";
      chatColor = "0x83E735";
    } else if (stats[Ss.GL] > 29) {
      announcement += "[💠ʟᴠ34] ";
      chatColor = "0xFB2424";
    } else if (stats[Ss.GL] > 25) {
      announcement += "[💠ʟᴠ31] ";
      chatColor = "0x2E41FF";
    } else if (stats[Ss.GL] > 23) {
      announcement += "[💠ʟᴠ27] ";
      chatColor = "0xF518A4";
    } else if (stats[Ss.GL] > 21) {
      announcement += "[💠ʟᴠ25] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 19) {
      announcement += "[💠ʟᴠ23] ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 16) {
      announcement += "[💠ʟᴠ20] ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 14) {
      announcement += "[💠ʟᴠ18] ";
      chatColor = "0xF824FB";
    } else if (stats[Ss.GL] > 12) {
      announcement += "[💠ʟᴠ16] ";
      chatColor = "0x80DE00";
    } else if (stats[Ss.GL] > 10) {
      announcement += "[💠ʟᴠ13] ";
      chatColor = "0xFBA206";
    } else if (stats[Ss.GL] > 8) {
      announcement += "[💠ʟᴠ11] ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 6) {
      announcement += "[💠ʟᴠ8] ";
      chatColor = "0xF518A4";
    } else if (stats[Ss.GL] > 5) {
      announcement += "[💠ʟᴠ6] ";
      chatColor = "0xFB2424";
    } else if (stats[Ss.GL] > 4) {
      announcement += "[💠ʟᴠ5] ";
      chatColor = "0xE1F216";
    } else if (stats[Ss.GL] > 3) {
      announcement += "[💠ʟᴠ4] ";
      chatColor = "0x12D37E";
    } else if (stats[Ss.GL] > 2) {
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

// if (stats[Ss.GL] > 500) {
//   announcement += "[👑] - [⚽: " + stats[Ss.GL] + "]  ·「The Legend of x3」";
//   chatColor = "0xf77104";
// } else if (player.admin == true) {
//   announcement += "💬 (ᴀᴅᴍɪɴ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x99ffff";
// } else if (stats[Ss.GL] > 110) {
//   announcement += "👑 (ʟᴇɢᴇɴᴅ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xC435E7";
// } else if (stats[Ss.GL] > 80) {
//   announcement += "👑 (ᴄʀᴏᴡɴ ɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x83E735";
// } else if (stats[Ss.GL] > 55) {
//   announcement += "👑 (ᴄʀᴏᴡɴ ɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x83E735";
// } else if (stats[Ss.GL] > 40) {
//   announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x7cd3fa";
// } else if (stats[Ss.GL] > 32) {
//   announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x7cd3fa";
// } else if (stats[Ss.GL] > 26) {
//   announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x7cd3fa";
// } else if (stats[Ss.GL] > 20) {
//   announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪᴠ|" + stats[Ss.GL] + ") ";
//   chatColor = "0x7cd3fa";
// } else if (stats[Ss.GL] > 17) {
//   announcement += "🔘 (ᴘʟᴀᴛɪɴᴜᴍ ɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xDFDAD1";
// } else if (stats[Ss.GL] > 14) {
//   announcement += "🔘 (ᴘʟᴀᴛɪɴᴜᴍ ɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xDFDAD1";
// } else if (stats[Ss.GL] > 10) {
//   announcement += "🥮 (ɢᴏʟᴅ ɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xE4C72D";
// } else if (stats[Ss.GL] > 8) {
//   announcement += "🥮 (ɢᴏʟᴅ ɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xE4C72D";
// } else if (stats[Ss.GL] > 6) {
//   announcement += "💿 (ɪʀᴏɴ ɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xE01295";
// } else if (stats[Ss.GL] > 4) {
//   announcement += "💿 (ɪʀᴏɴ ɪɪ|" + stats[Ss.GL] + ") ";
//   chatColor = "0xCBCBCB";
// } else if (stats[Ss.GL] > 2) {
//   announcement += "💬 (​ʙʀᴏɴᴢᴇ​ ​🇮​​|" + stats[Ss.GL] + ") ";
//   chatColor = "0xF5B43B";
// } else {
//   announcement += "💬 (ʙʀᴏɴᴢᴇ ɪɪ|" + stats[Ss.GL] + ") "; //chat user dan admin
//   chatColor = "0xF5B43B";
// }

room.onPlayerActivity = function (player) {
  setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
  var playerTeam = player.team;
  var opposingTeam = (playerTeam === 1) ? 2 : 1;
  var defaultBallColor = 0xFFFFFF; 
  
  // Increment kick count for the team
  teamKickCounts[playerTeam]++;
  
  // Reset the kick count for the opposing team if they kicked last
  if (teamKickCounts[opposingTeam] > 0) {
    resetKickCounts(opposingTeam);
    room.setDiscProperties(0, { color: defaultBallColor }); // Reset the ball color to default
  }
  
  // Check if the team has exceeded their kick limit
  if (teamKickCounts[playerTeam] > 3) {
    // Determine the color of the last team touched
    var lastTeamColor = (lastPlayersTouched[0].team === 1) ? "Red" : "Blue";
  
    // Teleport the ball to the respective team's position
    var ballPosition = (playerTeam === 1) ? blueTeamBallPosition : redTeamBallPosition;
    room.setDiscProperties(0, ballPosition);
  
    // Set the ball to be invisible and radius 0
    room.setDiscProperties(0, ballInvisible);
  
    // Announce the foul, specifying the team color and player name
    announce("[FOUL] 🤚 " + lastTeamColor + " Team Foul by: " + lastPlayersTouched[0].name + " Reason: 4 touch", null, Cor.White, "bold");
  
    // Reset the kick count for the team
    resetKickCounts(playerTeam);
    room.setDiscProperties(0, { color: defaultBallColor }); // Reset the ball color to default
  } else if (teamKickCounts[playerTeam] === 3) {
    room.setDiscProperties(0, { color: "0xFB0000" }); // Change the ball color to red after 3 touches
  } else if (teamKickCounts[playerTeam] === 2) {
    room.setDiscProperties(0, { color: "0xFFFF00" }); // Change the ball color to yellow after 2 touches
  }

  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }

  //KICK COUNTING

  if (player.team == 1 || player.team == 2) { // Red or Blue
    var team = player.team;
    var opponentTeam = (team == 1) ? 2 : 1; // Determine the opponent team
    
    // Reset kick count for the opponent team
    teamKickCount[opponentTeam] = 0;

    // Increment kick count for the player's team
    teamKickCount[team]++;

    // Send the updated kick count to all players on the same team
    var teamPlayers = room.getPlayerList().filter(p => p.team == team);
    var message = "" + teamKickCount[team] + " /3 touch";
    teamPlayers.forEach(teamPlayer => {
        room.sendChat(message, teamPlayer.id);
    });
}
};


/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  moveBotToBottom();
  resetKickCountsBoth();
  room.setDiscProperties(0, ballVisible);

  teamKickCount = { 1: 0, 2: 0 };


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
  room.sendAnnouncement(centerText("🥅 GAME START 🥅"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  room.startRecording();
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
};

room.onGameStop = function (byPlayer) {
  moveBotToBottom();
  resetKickCountsBoth();
  teamKickCount = { 1: 0, 2: 0 };

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
  sendDiscordRecording();
  whisper("ʀᴇᴘʟᴀʏ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ꜱᴇɴᴛ ᴛᴏ ᴅɪꜱᴄᴏʀᴅ!", null);
  whisper("Type !fixstart if the room not automatically start", null);
  if(freeze.length > 0){
    freeze = [];
  }
};

room.onGamePause = function (byPlayer) {};

room.onGameUnpause = function (byPlayer) {
  if ((TeamR.length == 4 && TeamB.length == 4 && inChooseMode) || (TeamR.length == TeamB.length && teamS.length < 2 && inChooseMode)) {
    deactivateChooseMode();
  }
};

room.onTeamGoal = function (team) {
  let goalTime = secondsToMinutes(Math.floor(room.getScores().time));
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
      var fraseasis = frasesasis[(Math.random() * frasesasis.length) | 0];
      announce("[SCORES] 🏐 Shooter: " + lastPlayersTouched[0].name + " ( 🅰️ Assist: " + lastPlayersTouched[1].name + " ) 🤾🏽 Shoot speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      resetKickCountsBoth();
      teamKickCount = { 1: 0, 2: 0 };
      avatarCelebration(goalMaker, "🏐", "🤾🏽");

      sendWebhook(goalWebHook, `\`[Scores Volley]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      announce("[SCORES] 🏐 Shooter: " + lastPlayersTouched[0].name + " 🤾🏽 Shoot speed: " + ballSpeed.toPrecision(4).toString() + " km/h", null, Cor.White, "bold");
      room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      resetKickCountsBoth();
      teamKickCount = { 1: 0, 2: 0 };
      avatarCelebration(goalMaker, "🏐", "🤾🏽");

      sendWebhook(goalWebHook, `\`[Scores Volley]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }
    // setTimeout(function () {
    //   room.setPlayerAvatar(goalMaker, "🎯");
    //   setTimeout(function () {
    //     room.setPlayerAvatar(goalMaker, "🏐");
    //     setTimeout(function () {
    //       room.setPlayerAvatar(goalMaker, null);
    //     }, 3000);
    //   }, 1200);
    // }, 1);

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      avatarCelebration(goalAssist, "🤝", "👟");
    }
  } else {
    //var fraseautogol = frasesautogol[(Math.random() * frasesautogol.length) | 0];
    // room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: 🤦‍♂️ I'm sure it was unintentional, right!! 🤦‍♂️", null, 0xffffe0, "normal");
    // announce("🤡 Points awarded by " + lastPlayersTouched[0].name + " 🤡", null, Cor.White, "bold");
    resetKickCountsBoth();
    teamKickCount = { 1: 0, 2: 0 };

    sendWebhook(goalWebHook, `\`[OG Volley]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
    game.goals.push(new Goal(scores.time, team, null, null));
    avatarCelebration(goalMaker, "🤦‍♂️", "🤡");

    golcontra(lastPlayersTouched[0]);
  }

  if (scores.scoreLimit != 0 && (scores.red == scores.scoreLimit || (scores.blue == scores.scoreLimit && scores.blue > 0) || goldenGoal == true)) {
    endGame(team);
    goldenGoal = false;
    setTimeout(() => {
      room.stopGame();
    }, 1000);
  }
};

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
};

/* SEVERAL */

room.onRoomLink = function (url) {};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  if (getMute(changedPlayer) && changedPlayer.admin) {
    room.sendChat(changedPlayer.name + " was unmuted.");
    setMute(changedPlayer, false);
  }
  if (byPlayer.id != 0 && localStorage.getItem(getAuth(byPlayer)) && JSON.parse(localStorage.getItem(getAuth(byPlayer)))[Ss.RL] == "admin") {
    room.sendChat("You are not allowed to appoint a player as an administrator!", byPlayer.id);
    room.setPlayerAdmin(changedPlayer.id, false);
  }
};

room.onStadiumChange = function (newStadiumName, byPlayer) {};

room.onGameTick = function () {
  checkTime();
  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
  handleFrozenPlayerMoves();
};

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
  form.append("file", new File([room.stopRecording()], `VOL-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

Botdivulga = setInterval(function () {
  room.sendAnnouncement("🔊 Join our Discord. https://discord.gg/pm55tVsQMX ", null, 0x5ee7ff, "nomal", 0);
}, BotdivulgaTime);

msg1 = setInterval(function () {
  room.sendAnnouncement("⚽ ᴄᴏᴍᴍᴀɴᴅ: !ᴅᴄ, !ʙʙ, !ꜰɪxꜱᴛᴀʀᴛ, !ᴀꜰᴋ, !ꜱᴛᴀᴛꜱ, !ʀᴀɴᴋ, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ], !ʜᴇʟᴘ", null, 0xff8a4a, "normal");
}, msg1Time);
