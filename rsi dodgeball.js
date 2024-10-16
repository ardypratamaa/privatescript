/* ROOM */
//var roomName = "💠 (ʀꜱɪ|ɪᴅ) Powerball 3v3 | ᴘᴠᴘ ";
var roomName = "💠 (ʀꜱɪ) 𝗗𝗼𝗱𝗴𝗲𝗯𝗮𝗹𝗹 𝟯𝘃𝟯 ᴘᴠᴘ";
//var roomName = "💠 [ʀꜱɪ|ᴀꜱɪᴀ] dodgeball | ᴘᴠᴘ";
const botName = "----- ᴀᴜᴛᴏʀᴏᴏᴍ.ʀꜱɪ -----";
const maxPlayers = 14; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
const geo = [{ lat: 10.7746, lon: 106.647  , code: "id" }]; //liga 1
//const geo = [{ lat: 10.81, lon: 106.801, code: "sg" }]; //vietnam
// const geo = [{ lat: -6.17, lon: 106.85991, code: "id" }]; //indo

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

const scoreLimitPractice = 2;
const timeLimitPractice = 4;

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
var msg1Time = 230000;
var Deus = [];
var BotdivulgaTime = 210000;
var adminPassword = "2542";
var freeze = []; //Holds the name of the frozen players.
var playerInformations = []; //Holds players names, ID's and positions (undefined if not frozen).
// Cooldown period in milliseconds
var cooldownPeriod = 3000; // 2 seconds
var maxMessages = 2; // Maximum messages allowed in the cooldown period
let previousPlayerCount = 0;

// Store last message times and counts for players
var lastMessageTime = {};
var messageCounts = {};

var vip1 = [];
var vip2 = [];
var vip3 = [];

const RESETBALL_COOLDOWN = 90000; // 10 seconds in milliseconds
var lastResetballTime = 0;

var lastKickerID = null;
var lastKickerTeam = 0;

//zone detector
var zoneActiveRed = false;
var zoneActiveBlue = false;

function pointInZone(point, x1, x2) {
    return point.x >= x1 && point.x <= x2;
}

function checkZoneBlue() {
  if (!zoneActiveBlue) return;

  var players = room.getPlayerList();
  var anyPlayerInZoneBlue = false;

  players.forEach(function(player) {
      if (player.team === 2 && player.position && pointInZone(player.position, 81.6, 366.6)) {
          anyPlayerInZoneBlue = true;
      }
  });

  if (!anyPlayerInZoneBlue) {
      //room.sendAnnouncement("No more players in the Blue Team zone.");
      room.setDiscProperties(1, {  x: 296, y: 0, xgravity: 0, ygravity: 40  });
      zoneActiveBlue = false; // Disable zone detection after the message
  }
}

function checkZoneRed() {
  if (!zoneActiveRed) return;

  var players = room.getPlayerList();
  var anyPlayerInZoneRed = false;

  players.forEach(function(player) {
      if (player.team === 1 && player.position && pointInZone(player.position, -366.6, -81.6)) {
          anyPlayerInZoneRed = true;
      }
  });

  if (!anyPlayerInZoneRed) {
      //room.sendAnnouncement("No more players in the Red Team zone.");
      room.setDiscProperties(1, { xgravity: 0, ygravity: 40 });
      zoneActiveRed = false; // Disable zone detection after the message
  }
}

//stop and teleport ball

var targetPoints = {
  left: { x: -187.4, y: -10 },
  right: { x: 187.4, y: -10 }
};

var leftKickCheckRange = { xMin: -370, xMax: -80 };
var rightKickCheckRange = { xMin: 80, xMax: 370 };
var slowLeftRange = { xMin: -80, xMax: 0 };
var slowRightRange = { xMin: 0, xMax: 80 };
var slowThreshold = 0.1; // Threshold speed to consider the ball as slowed or stopped
var kickTimerDuration = 10000; // 10 seconds in milliseconds
var leftKickTimer = null;
var rightKickTimer = null;

function isBallSlowedOrStopped(ball) {
  return Math.abs(ball.xspeed) <= slowThreshold && Math.abs(ball.yspeed) <= slowThreshold;
}

function isBallInRange(ball, range) {
  return ball.x >= range.xMin && ball.x <= range.xMax;
}

function startLeftKickTimer(ball) {
  if (isBallInRange(ball, leftKickCheckRange) && isBallSlowedOrStopped(ball)) {
      if (leftKickTimer === null) {
          leftKickTimer = setTimeout(function() {
              var currentBall = room.getDiscProperties(0);
              if (isBallInRange(currentBall, leftKickCheckRange) && isBallSlowedOrStopped(currentBall)) {
                  room.setDiscProperties(0, { x: targetPoints.right.x, y: targetPoints.right.y });
              }
              leftKickTimer = null; // Reset the timer
          }, kickTimerDuration);
      }
  } else {
      clearLeftKickTimer(); // Clear the timer if the ball moves out of range or is kicked
  }
}

function startRightKickTimer(ball) {
  if (isBallInRange(ball, rightKickCheckRange) && isBallSlowedOrStopped(ball)) {
      if (rightKickTimer === null) {
          rightKickTimer = setTimeout(function() {
              var currentBall = room.getDiscProperties(0);
              if (isBallInRange(currentBall, rightKickCheckRange) && isBallSlowedOrStopped(currentBall)) {
                  room.setDiscProperties(0, { x: targetPoints.left.x, y: targetPoints.left.y });
              }
              rightKickTimer = null; // Reset the timer
          }, kickTimerDuration);
      }
  } else {
      clearRightKickTimer(); // Clear the timer if the ball moves out of range or is kicked
  }
}

function moveBallToSlowTarget(ball) {
  if (isBallSlowedOrStopped(ball)) {
      if (isBallInRange(ball, slowLeftRange)) {
          room.setDiscProperties(0, { x: targetPoints.left.x, y: targetPoints.left.y, xspeed: 0, yspeed: 0 });
      } else if (isBallInRange(ball, slowRightRange)) {
          room.setDiscProperties(0, { x: targetPoints.right.x, y: targetPoints.right.y, xspeed: 0, yspeed: 0 });
      }
  }
}

function clearLeftKickTimer() {
  if (leftKickTimer !== null) {
      clearTimeout(leftKickTimer);
      leftKickTimer = null;
  }
}

function clearRightKickTimer() {
  if (rightKickTimer !== null) {
      clearTimeout(rightKickTimer);
      rightKickTimer = null;
  }
}

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

/* ESTÁDIO */

const playerRadius = 15;
var ballRadius = 6.25;
const triggerDistance = playerRadius + ballRadius + 0.01;

var practiceMap =
  `{

	"name" : "RSI Dodgeball",

	"width" : 440,

	"height" : 200,

	"spawnDistance" : 170,

	"bg" : { "type" : "", "width" : 0, "height" : 0, "kickOffRadius" : 0, "cornerRadius" : 0, "color" : "404447" },

	"vertexes" : [
		/* 0 */ { "x" : 370, "y" : 198, "trait" : "outr", "color" : "8ed2ab" },
		/* 1 */ { "x" : 370, "y" : -198, "trait" : "outr", "color" : "8ed2ab" },
		
		/* 2 */ { "x" : -370, "y" : 198, "trait" : "outb", "color" : "8ed2ab" },
		/* 3 */ { "x" : -370, "y" : -198, "trait" : "outb", "color" : "8ed2ab" },
		
		/* 4 */ { "x" : 370, "y" : 198, "trait" : "boisko", "vis" : false, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "636363" },
		/* 5 */ { "x" : 370, "y" : -200, "trait" : "boisko", "vis" : false, "bCoef" : 0.1, "cMask" : ["ball" ], "color" : "636363" },
		/* 6 */ { "x" : -370, "y" : -199, "trait" : "boisko" },
		/* 7 */ { "x" : -370, "y" : 199, "trait" : "boisko" },
		
		/* 8 */ { "x" : 0, "y" : 198, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "8ed2ab" },
		/* 9 */ { "x" : 0, "y" : 18.22222328186035, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "8ed2ab" },
		
		/* 10 */ { "x" : -363, "y" : -198, "bCoef" : 0.1, "trait" : "ballline", "color" : "636363" },
		/* 11 */ { "x" : -363, "y" : 198, "bCoef" : 0.1, "trait" : "ballline", "color" : "636363" },
		/* 12 */ { "x" : 363, "y" : 198, "bCoef" : 0.1, "trait" : "ballline", "color" : "636363" },
		/* 13 */ { "x" : 363, "y" : -198, "bCoef" : 0.1, "trait" : "ballline", "color" : "636363" },
		
		/* 14 */ { "x" : 0, "y" : 198, "trait" : "liner", "curve" : 0, "color" : "632C44" },
		/* 15 */ { "x" : 0, "y" : -198, "trait" : "liner", "curve" : 0, "color" : "632C44" },
		
		/* 16 */ { "x" : 0, "y" : 198, "trait" : "lineb", "curve" : 0, "color" : "632C44" },
		/* 17 */ { "x" : 0, "y" : -198, "trait" : "lineb", "curve" : 0, "color" : "632C44" },
		
		/* 18 */ { "x" : 0, "y" : -198, "trait" : "outr", "curve" : 120, "color" : "8ed2ab" },
		/* 19 */ { "x" : 370, "y" : -198, "trait" : "outr", "color" : "8ed2ab" },
		/* 20 */ { "x" : 0, "y" : 198, "trait" : "outr", "curve" : 120, "color" : "8ed2ab" },
		/* 21 */ { "x" : 370, "y" : 198, "trait" : "outr", "color" : "8ed2ab" },
		
		/* 22 */ { "x" : 0, "y" : -198, "trait" : "outb", "color" : "8ed2ab" },
		/* 23 */ { "x" : -369, "y" : -198, "trait" : "outb", "color" : "8ed2ab" },
		/* 24 */ { "x" : 0, "y" : 198, "trait" : "outb", "color" : "8ed2ab" },
		/* 25 */ { "x" : -370, "y" : 198, "trait" : "outb", "color" : "8ed2ab" },
		
		/* 26 */ { "x" : -80, "y" : 196, "cMask" : ["red" ], "trait" : "line", "curve" : 0, "color" : "585858", "cGroup" : ["blue" ] },
		/* 27 */ { "x" : -80, "y" : -197, "cMask" : ["red" ], "trait" : "line", "curve" : 0, "color" : "585858", "cGroup" : ["blue" ] },
		/* 28 */ { "x" : 80, "y" : 196, "cMask" : ["blue" ], "trait" : "line", "curve" : 0, "color" : "585858", "cGroup" : ["red" ] },
		/* 29 */ { "x" : 80, "y" : -197, "cMask" : ["blue" ], "trait" : "line", "curve" : 0, "color" : "585858", "cGroup" : ["red" ] },
		
		/* 30 */ { "x" : -440, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 31 */ { "x" : -440, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 32 */ { "x" : -400, "y" : -199, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 33 */ { "x" : -400, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 34 */ { "x" : -440, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 35 */ { "x" : -400, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["red" ] },
		/* 36 */ { "x" : 400, "y" : -199, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 37 */ { "x" : 400, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 38 */ { "x" : 440, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 39 */ { "x" : 440, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 40 */ { "x" : 400, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 41 */ { "x" : 440, "y" : 198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 42 */ { "x" : 400, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		/* 43 */ { "x" : 441, "y" : -198, "bCoef" : 0, "trait" : "ballline", "color" : "464b4e", "cMask" : ["blue" ] },
		
		/* 44 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 45 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : 18.002181206193665, "color" : "ffffff" },
		/* 46 */ { "cMask" : ["wall" ], "x" : -6.703584289008157, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 47 */ { "cMask" : ["wall" ], "x" : -7.548429133853002, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 48 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 49 */ { "cMask" : ["wall" ], "x" : -7.082652831234577, "y" : 6.585659421250828, "color" : "ffffff" },
		/* 50 */ { "cMask" : ["wall" ], "x" : 11.082622970883316, "y" : 6.585659421250828, "color" : "ffffff" },
		/* 51 */ { "cMask" : ["wall" ], "x" : 10.616846668264914, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 52 */ { "cMask" : ["wall" ], "x" : -1.9591135024320903, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 53 */ { "cMask" : ["wall" ], "x" : -1.5800449602056708, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 54 */ { "cMask" : ["wall" ], "x" : 27.590446583970106, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 55 */ { "cMask" : ["wall" ], "x" : 18.535043812777857, "y" : -12.3055159646614, "color" : "ffffff" },
		/* 56 */ { "cMask" : ["wall" ], "x" : 19.00082011539626, "y" : 8.051435723869234, "color" : "ffffff" },
		/* 57 */ { "cMask" : ["wall" ], "x" : -20.50345784677645, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 58 */ { "cMask" : ["wall" ], "x" : -6.151100225997775, "y" : 6.119883118632421, "color" : "ffffff" },
		/* 59 */ { "cMask" : ["wall" ], "x" : -20.037681544158026, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 60 */ { "cMask" : ["wall" ], "x" : -5.685323923379373, "y" : 6.119883118632421, "color" : "ffffff" },
		/* 61 */ { "cMask" : ["wall" ], "x" : -7.548429133853002, "y" : -7.387629657301405, "color" : "ffffff" },
		/* 62 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -7.387629657301405, "color" : "ffffff" },
		/* 63 */ { "cMask" : ["wall" ], "x" : -7.548429133853002, "y" : -7.853405959919818, "color" : "ffffff" },
		/* 64 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -7.853405959919818, "color" : "ffffff" },
		/* 65 */ { "cMask" : ["wall" ], "x" : -20.50345784677645, "y" : -19.58452128577199, "color" : "ffffff" },
		/* 66 */ { "cMask" : ["wall" ], "x" : -20.50345784677645, "y" : 18.002181206193665, "color" : "ffffff" },
		/* 67 */ { "cMask" : ["wall" ], "x" : -20.037681544158026, "y" : -19.58452128577199, "color" : "ffffff" },
		/* 68 */ { "cMask" : ["wall" ], "x" : -20.037681544158026, "y" : 18.002181206193665, "color" : "ffffff" },
		/* 69 */ { "cMask" : ["wall" ], "x" : -7.548429133853002, "y" : 6.119883118632421, "color" : "ffffff" },
		/* 70 */ { "cMask" : ["wall" ], "x" : 10.616846668264914, "y" : 6.119883118632421, "color" : "ffffff" },
		/* 71 */ { "cMask" : ["wall" ], "x" : -7.548429133853002, "y" : 5.188330513395606, "color" : "ffffff" },
		/* 72 */ { "cMask" : ["wall" ], "x" : 10.616846668264914, "y" : 5.188330513395606, "color" : "ffffff" },
		/* 73 */ { "cMask" : ["wall" ], "x" : -7.63513689424496, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 74 */ { "cMask" : ["wall" ], "x" : -8.479981739089805, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 75 */ { "cMask" : ["wall" ], "x" : -8.100913196863361, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 76 */ { "cMask" : ["wall" ], "x" : -8.945758041708206, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 77 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -19.118744983153576, "color" : "ffffff" },
		/* 78 */ { "cMask" : ["wall" ], "x" : -6.703584289008157, "y" : -19.118744983153576, "color" : "ffffff" },
		/* 79 */ { "cMask" : ["wall" ], "x" : -21.435010452013252, "y" : -18.652968680535174, "color" : "ffffff" },
		/* 80 */ { "cMask" : ["wall" ], "x" : -6.703584289008157, "y" : -18.652968680535174, "color" : "ffffff" },
		/* 81 */ { "cMask" : ["wall" ], "x" : 10.151070365646513, "y" : 6.585659421250828, "color" : "ffffff" },
		/* 82 */ { "cMask" : ["wall" ], "x" : 9.685294063028087, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 83 */ { "cMask" : ["wall" ], "x" : 10.151070365646513, "y" : 6.585659421250828, "color" : "ffffff" },
		/* 84 */ { "cMask" : ["wall" ], "x" : 9.685294063028087, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 85 */ { "cMask" : ["wall" ], "x" : 9.685294063028087, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 86 */ { "cMask" : ["wall" ], "x" : -2.890666107668917, "y" : -6.4560770520645905, "color" : "ffffff" },
		/* 87 */ { "cMask" : ["wall" ], "x" : 11.54839927350174, "y" : -7.387629657301405, "color" : "ffffff" },
		/* 88 */ { "cMask" : ["wall" ], "x" : -1.9591135024320903, "y" : -7.853405959919818, "color" : "ffffff" },
		/* 89 */ { "cMask" : ["wall" ], "x" : -1.5800449602056708, "y" : -19.118744983153576, "color" : "ffffff" },
		/* 90 */ { "cMask" : ["wall" ], "x" : 27.590446583970106, "y" : -19.118744983153576, "color" : "ffffff" },
		/* 91 */ { "cMask" : ["wall" ], "x" : -1.5800449602056708, "y" : -18.652968680535174, "color" : "ffffff" },
		/* 92 */ { "cMask" : ["wall" ], "x" : 27.590446583970106, "y" : -18.652968680535174, "color" : "ffffff" },
		/* 93 */ { "cMask" : ["wall" ], "x" : -1.0275608971952876, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 94 */ { "cMask" : ["wall" ], "x" : -0.648492354968844, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 95 */ { "cMask" : ["wall" ], "x" : -0.5617845945768862, "y" : -6.9218533546830034, "color" : "ffffff" },
		/* 96 */ { "cMask" : ["wall" ], "x" : -0.18271605235044275, "y" : -20.050297588390393, "color" : "ffffff" },
		/* 97 */ { "cMask" : ["wall" ], "x" : 18.06926751015943, "y" : -12.3055159646614, "color" : "ffffff" },
		/* 98 */ { "cMask" : ["wall" ], "x" : 18.535043812777857, "y" : 8.051435723869234, "color" : "ffffff" },
		/* 99 */ { "cMask" : ["wall" ], "x" : 17.13771490492263, "y" : -12.3055159646614, "color" : "ffffff" },
		/* 100 */ { "cMask" : ["wall" ], "x" : 17.60349120754103, "y" : 8.051435723869234, "color" : "ffffff" },
		
		/* 101 */ { "x" : 0, "y" : -33.77777099609375, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "8ed2ab" },
		/* 102 */ { "x" : 0, "y" : -197.5555477142334, "cMask" : ["wall" ], "trait" : "line", "curve" : 0, "color" : "8ed2ab" }

	],

	"segments" : [
		{ "v0" : 10, "v1" : 11, "color" : "636363", "bCoef" : 0.1, "trait" : "ballline", "x" : -363 },
		{ "v0" : 11, "v1" : 12, "color" : "636363", "bCoef" : 1.25, "trait" : "ballline", "y" : 180 },
		{ "v0" : 12, "v1" : 13, "color" : "636363", "bCoef" : 0.1, "trait" : "ballline", "x" : 363 },
		{ "v0" : 13, "v1" : 10, "color" : "636363", "bCoef" : 0, "trait" : "ballline", "y" : -180 },
		
		{ "v0" : 0, "v1" : 1, "color" : "8ed2ab", "trait" : "outr", "x" : 370 },
		{ "v0" : 18, "v1" : 19, "color" : "8ed2ab", "trait" : "outr" },
		{ "v0" : 20, "v1" : 21, "color" : "8ed2ab", "trait" : "outr" },
		
		{ "v0" : 2, "v1" : 3, "color" : "8ed2ab", "trait" : "outb", "x" : -370 },
		{ "v0" : 22, "v1" : 23, "color" : "8ed2ab", "trait" : "outb" },
		{ "v0" : 24, "v1" : 25, "color" : "8ed2ab", "trait" : "outb" },
		
		{ "v0" : 4, "v1" : 5, "trait" : "boisko", "x" : 370 },
		{ "v0" : 5, "v1" : 6, "trait" : "boisko", "y" : -199 },
		{ "v0" : 6, "v1" : 7, "trait" : "boisko", "x" : -370 },
		{ "v0" : 7, "v1" : 4, "trait" : "boisko", "y" : 199 },
		
		{ "v0" : 8, "v1" : 9, "curve" : 0, "trait" : "line", "x" : 0 },
		
		{ "v0" : 9, "v1" : 8, "curve" : 0, "vis" : true, "color" : "8ed2ab", "cMask" : ["wall" ], "x" : 0 },
		{ "v0" : 27, "v1" : 26, "curve" : 0, "vis" : true, "color" : "585858", "cMask" : ["red" ], "x" : -80, "cGroup" : ["blue" ] },
		{ "v0" : 29, "v1" : 28, "curve" : 0, "vis" : true, "color" : "585858", "cMask" : ["blue" ], "x" : 80, "cGroup" : ["red" ] },
		
		{ "v0" : 30, "v1" : 31, "color" : "464b4e", "bCoef" : 0, "trait" : "ballline", "x" : -440, "cMask" : ["red" ] },
		{ "v0" : 32, "v1" : 33, "color" : "464b4e", "bCoef" : 0, "trait" : "ballline", "x" : -400, "cMask" : ["red" ] },
		{ "vis" : true, "color" : "464b4e", "bCoef" : 0.1, "cMask" : ["red" ], "trait" : "ballline", "v0" : 31, "v1" : 33 },
		{ "vis" : true, "color" : "464b4e", "bCoef" : 0, "cMask" : ["red" ], "trait" : "ballline", "v0" : 34, "v1" : 35 },
		{ "v0" : 36, "v1" : 37, "color" : "464b4e", "bCoef" : 0, "trait" : "ballline", "x" : 400, "cMask" : ["blue" ] },
		{ "v0" : 38, "v1" : 39, "color" : "464b4e", "bCoef" : 0, "trait" : "ballline", "x" : 440, "cMask" : ["blue" ] },
		{ "vis" : true, "color" : "464b4e", "bCoef" : 0.1, "cMask" : ["blue" ], "trait" : "ballline", "v0" : 40, "v1" : 41 },
		{ "vis" : true, "color" : "464b4e", "bCoef" : 0, "cMask" : ["blue" ], "trait" : "ballline", "v0" : 42, "v1" : 43 },
		
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 44, "v1" : 45 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 44, "v1" : 46 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 46, "v1" : 47 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 47, "v1" : 48 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 48, "v1" : 49 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 49, "v1" : 50 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 50, "v1" : 51 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 51, "v1" : 52 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 52, "v1" : 53 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 53, "v1" : 54 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 55, "v1" : 56 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 57, "v1" : 58 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 59, "v1" : 60 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 61, "v1" : 62 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 63, "v1" : 64 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 65, "v1" : 66 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 67, "v1" : 68 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 69, "v1" : 70 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 71, "v1" : 72 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 73, "v1" : 74 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 75, "v1" : 76 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 77, "v1" : 78 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 79, "v1" : 80 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 81, "v1" : 82 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 83, "v1" : 84 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 85, "v1" : 86 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 87, "v1" : 88 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 89, "v1" : 90 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 91, "v1" : 92 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 93, "v1" : 94 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 95, "v1" : 96 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 97, "v1" : 98 },
		{ "curve" : 0, "vis" : true, "color" : "ffffff", "cMask" : ["wall" ], "v0" : 99, "v1" : 100 },
		{ "v0" : 102, "v1" : 101, "curve" : 0, "vis" : true, "color" : "8ed2ab", "cMask" : ["wall" ], "x" : 0 }

	],

	"goals" : [
		{ "p0" : [-371.46875,169.03125 ], "p1" : [-77.46875,170.03125 ], "team" : "red" },
		{ "team" : "blue", "p0" : [81.53125,169.03125 ], "p1" : [372.53125,169.03125 ] }

	],

	"discs" : [
		{ "radius" : 11, "invMass" : 2, "pos" : [-199.33333587646484,-6.545143127441406 ], "color" : "FFB600", "bCoef" : 2.2, "cMask" : ["all" ], "cGroup" : ["ball","kick" ] },
		{ "trait" : "bb", "pos" : [-296,-99 ], "color" : "555555" },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] },
		{ "radius" : 0, "pos" : [-555.5,254.50390625 ], "color" : "DE1111", "cMask" : ["ball" ] }


	],

	"planes" : [
		{ "normal" : [0,1 ], "dist" : -196, "bCoef" : 0.1, "trait" : "ballArea" },
		{ "normal" : [0,-1 ], "dist" : -195, "bCoef" : 0.1, "trait" : "ballArea" },
		{ "normal" : [-1,0 ], "dist" : -369, "bCoef" : 0.1, "trait" : "ballArea" },
		{ "normal" : [1,0 ], "dist" : -369, "bCoef" : 0.1, "trait" : "ballArea" },
		
		{ "normal" : [0,-1 ], "dist" : -239, "bCoef" : 0.1 },
		{ "normal" : [0,1 ], "dist" : -239, "bCoef" : 0.1 },
		{ "normal" : [-1,0 ], "dist" : -491, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -491, "bCoef" : 0.1 },
		
		{ "normal" : [1,0 ], "dist" : 0, "bCoef" : 0, "cMask" : ["blue" ], "trait" : "ballline" },
		{ "normal" : [-1,0 ], "dist" : 0, "bCoef" : 0, "cMask" : ["red" ], "trait" : "ballline" }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "cMask" : ["ball" ] },
		"boisko" : { "vis" : false },
		"liner" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "0f4f87" },
		"lineb" : { "vis" : true, "cMask" : ["red","blue" ], "color" : "b60900" },
		"ballline" : { "vis" : true, "cMask" : ["ball" ], "bCoef" : 1, "color" : "ffffff" },
		"decorationb" : { "vis" : false, "cMask" : [ ], "color" : "0f4f87" },
		"decorationr" : { "vis" : false, "cMask" : [ ], "color" : "b60900" },
		"line" : { "vis" : false, "cMask" : ["red","blue" ] },
		"outr" : { "vis" : true, "bCoef" : -10, "cMask" : ["red","blue" ], "color" : "b60900" },
		"outb" : { "vis" : true, "bCoef" : -10, "cMask" : ["red","blue" ], "color" : "0f4f87" },
		"booster" : { "vis" : false, "bCoef" : -5, "cMask" : ["ball" ] },
		"start" : { "vis" : true, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ], "color" : "fefdfe" },
		"bb" : { "radius" : 0, "bCoef" : 1.5, "invMass" : 2, "cGroup" : ["ball","kick","score" ], "cMask" : ["red","blue","wall" ], "color" : -1 }

	},

	"ballPhysics" : "disc0",

	"playerPhysics" : {
		"radius" : 16,
		"bCoef" : 0.05,
		"acceleration" : 0.125,
		"kickingDamping" : 0.96,
		"kickStrength" : 8.8,
		"kickback" : 0

	},

	"joints" : [
		

	],

	"redSpawnPoints" : [
		[ -316, 48
		],
		[ -316, -48
		],
		[ -248, 98
		],
		[ -248, -98
		]

	],

	"blueSpawnPoints" : [
		[ 316, 48
		],
		[ 316, -48
		],
		[ 248, 98
		],
		[ 248, -98
		]

	],

	"canBeStored" : false
}`;
/* OPÇÕES */

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

let replayWebHook = "https://discord.com/api/webhooks/1277913209126518897/2fgfk4s2ZEJcHzF7GKnfyMT5LkoO3n3yOFzfu1UVtt-dgpSK38G6_dwdeeAb-BFGwDwP";
let goalWebHook = "https://discord.com/api/webhooks/1277909287774978129/7vDKC8n0lUad4fqbt3QPg0fIMhRgGKuLJsRzrfGsnyBhR8KzUfViqe8dUf03MNHGXkhE";
let chatWebHook = "https://discord.com/api/webhooks/1275338602812932128/fx4gHM17Wjiwzvf0E4OCHBIaObytKeMB9sr5O89qUZztDb8d-Xtwfd37MLPP_US5OAal";
let joinWebHook = "https://discord.com/api/webhooks/1275338457857654878/lDkb4M2MpCebWsQ92nSodFtBNRdRgtxqsMVWzChbQeWM2JZvPNYI0-Wbd_o-sG0-UTLd";
let toxicWebHook = "https://discord.com/api/webhooks/1275671177079291925/IEe0tHTrjsEqNKOUMhErI1qd1nvnyqIBSicmShISEuGYdX5GxhpSQQOgUHaG-j8ClNI5";
let statsWebHook = "https://discord.com/api/webhooks/1277901478786236426/Mv2NhDtKM8yVdj-teOO49VF7fthxgkKaEc7lToEvwRjnAA5oKJqdNSGN_F4BrIZdg3PA";
//let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1277901163102077063/ahhZVrsskXIAeVJoGSxAxukUzkckBvV-mg0AF9sAlenLIpZzuNw5WhuGfZ7fSPRZpXx4";
let countWebHook = "https://discord.com/api/webhooks/1277897299141591192/BDNyA8g7RpYDrTVHwyb0zwo-nITu45jamXrJrDWmA5LbnTK63nnX_ntg0x0jNZqNVtGZ";

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

// function setRegister(player, senha) {
//    if (registro.get(player.name)) room.sendAnnouncement('Você já está registrado.', player.id);
//    else {
//        registro.set(player.name, senha);
//        localStorage.setItem("registros", JSON.stringify([...registro]));
//        room.sendAnnouncement('Registrado!', player.id, 0x2FE436);
//        room.sendAnnouncement(`Senha: ${senha}`, player.id, 0x2FE436);
//    }
//}

//function getLogin(player, senha) {
//    if (registro.get(player.name)) {
//        if (registro.get(player.name) == senha) {
//            room.sendAnnouncement(`${player.name} logou!`, null, 0x2FE436);
//        } else room.sendAnnouncement('Senha incorreta.', player.id, 0xFF0000);
//    } else room.sendAnnouncement('Você não está registrado.', player.id, 0xFF0000);
//}

/* FUNCTIONS */

function setKickRateLimit() {
  room.setKickRateLimit(0, 0, 0);
  //room.sendAnnouncement("Kick rate limit set (min: 0, rate: 0, burst: 0)", null, 0x00FF00, "normal", 2);
}

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
    "I'm sure it was unintentional, right, " + goaler.name + "?",
    "YOU'RE PLAYING FOR THE WRONG TEAM, " + goaler.name,
    "Pro tip " + goaler.name + ": Next time... DON'T AIM AT YOUR GOAL!!",
    goaler.name + " What are you doing?",
    "Harry " + goaler.name + " Maguire",
  ];
  var randomIndex = Math.floor(Math.random() * messages.length);
  var announcement = messages[randomIndex];
  setTimeout(function () {
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

const RED_TEAM = 1;
const BLUE_TEAM = 2;

const originalDiscPositions = {
  2: { x: -558.5, y: 253.5 },
  3: { x: -558.5, y: 253.5 },
  4: { x: -558.5, y: 253.5 },
  5: { x: -558.5, y: 253.5 },
  6: { x: -558.5, y: 253.5 },
  7: { x: -558.5, y: 253.5 },
  8: { x: -558.5, y: 253.5 },
  9: { x: -558.5, y: 253.5 },
  10: { x: -558.5, y: 253.5 },
  11: { x: -558.5, y: 253.5 },
  12: { x: -558.5, y: 253.5 },
  13: { x: -558.5, y: 253.5 }
};

var TouchSystem = {
  lastKicker: null,
  lastKickTime: null,
  kickTimer: 2000, // 2 seconds in milliseconds
  hasTeleported: false, // Flag to track if a player has been teleported
  lastPosition: null, // Store the last position before teleport

  reset: function() {
    this.lastKicker = null;
    this.lastKickTime = null;
    this.hasTeleported = false; // Reset the teleport flag
    this.lastPosition = null; // Reset the last position
  },

  setLastKicker: function(player) {
    this.lastKicker = player;
    this.lastKickTime = new Date().getTime(); // Track the time of the kick
    this.hasTeleported = false; // Reset the flag when a new kicker is set
  },

  checkTouch: function(player, ballPosition) {
    // Check if the ball's x-coordinate is within the allowed range
    if (ballPosition.x < -350 || ballPosition.x > 350) {
      room.setDiscProperties(0, { color: 0xFFB600 }); // Change ball color to yellow
      this.lastKickTime = null; // Stop the timer by resetting lastKickTime
      return false; // Ball is outside the allowed range, no teleportation
    }

    if (this.lastKicker === null || player.position == null || this.hasTeleported) return false;

    var ballRadius = 11;
    var playerRadius = 16;
    var triggerDistance = ballRadius + playerRadius + 0.01;

    var distanceToBall = pointDistance(player.position, ballPosition);
    return distanceToBall < triggerDistance && player.team !== this.lastKicker.team;
  },

  isWithinTimeLimit: function() {
    var currentTime = new Date().getTime();
    return this.lastKickTime !== null && (currentTime - this.lastKickTime <= this.kickTimer);
  }
};

function pointDistance(p1, p2) { // Detects the distance between any two points.
  var d1 = p1.x - p2.x;
  var d2 = p1.y - p2.y;
  return Math.sqrt(d1 * d1 + d2 * d2);
}

function setDiscPropertiesBeforeTeleport() {
  room.setDiscProperties(2, { x: -558.5, y: 253.5, xspeed: 1, yspeed: 0, radius: 5, color: 0xFE4141 });
  room.setDiscProperties(3, { x: -558.5, y: 253.5, xspeed: 1, yspeed: 1, radius: 5, color: 0xF43C33 });
  room.setDiscProperties(4, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 0, radius: 5, color: 0xF7726B });
  room.setDiscProperties(5, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 1, radius: 5, color: 0xA0160F });
  room.setDiscProperties(6, { x: -558.5, y: 253.5, xspeed: 0, yspeed: -1, radius: 5, color: 0xC6605B });
  room.setDiscProperties(7, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 2, radius: 5, color: 0xEC2D50 });
  room.setDiscProperties(8, { x: -558.5, y: 253.5, xspeed: 1, yspeed: 0, radius: 5, color: 0x4463D4 });
  room.setDiscProperties(9, { x: -558.5, y: 253.5, xspeed: 1, yspeed: 1, radius: 5, color: 0x87CEEB });
  room.setDiscProperties(10, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 0, radius: 5, color: 0x0C00FF });
  room.setDiscProperties(11, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 1, radius: 5, color: 0x001597 });
  room.setDiscProperties(12, { x: -558.5, y: 253.5, xspeed: 0, yspeed: -1, radius: 5, color: 0x3A4275 });
  room.setDiscProperties(13, { x: -558.5, y: 253.5, xspeed: -1, yspeed: 2, radius: 5, color: 0x18CACC });
}

function teleportDiscsToLastPosition(lastPosition) {
  room.setDiscProperties(2, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(3, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(4, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(5, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(6, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(7, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(8, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(9, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(10, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(11, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(12, { x: lastPosition.x, y: lastPosition.y });
  room.setDiscProperties(13, { x: lastPosition.x, y: lastPosition.y });
}

function resetDiscsToOriginalPosition() {
  for (var discId in originalDiscPositions) {
    var position = originalDiscPositions[discId];
    room.setDiscProperties(parseInt(discId), { x: position.x, y: position.y, radius: 0 });
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

/* BUTTONS */

// function download(conteudo, nomeDoArquivo, tipoDeArquivo) {
//   let blob = new Blob([conteudo], {
//     type: tipoDeArquivo,
//   });
//   const link = window.document.createElement("a");
//   link.href = window.URL.createObjectURL(blob);
//   link.download = nomeDoArquivo;
//   link.click();
//   window.URL.revokeObjectURL(link.href);
// }

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
      room.sendAnnouncement(centerText("⌛ 15 seconds to draw"), null, Cor.Amarelo, "bold");
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
  room.sendAnnouncement(centerText("🏆 GAME FINISH 🏆"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText(" " + scores.red + " - " + scores.blue), null, Cor.White, "normal");
  // room.sendAnnouncement(centerText((Rposs * 100).toPrecision(3).toString() + "% | Ball possession | " + (Bposs * 100).toPrecision(3).toString() + "% "), null, Cor.White, "normal");
  // scores.red == 0
  //   ? scores.blue == 0
  //     ? room.sendAnnouncement("🥅 " + GKList[0].name + " it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
  //     : room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[1].name + " saved all goals ", null, 0xfdc43a)
  //   : scores.blue == 0
  //   ? room.sendAnnouncement("🥅 it's a man? no, it's a barrier! " + GKList[0].name + " saved all goals ", null, 0xfdc43a)
  //   : null;
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
  room.sendAnnouncement("Recruitment mode activated!", null, 0x55bae2, "small");
  room.sendAnnouncement("Captain is picking players...", null, 0xf2a000, "small");
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

function checkBanStatus(player) {
  // Define the URL of your PHP backend
  var url = 'http://localhost/haxindo/database/getBanlist.php';

  // Prepare data to send
  var data = {
      auth: player.auth,
      conn: player.conn
  };

  // Create XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  // Handle the response
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.success && response.banned) {
                  room.kickPlayer(player.id, response.message, false); // Kick player with a ban message
              }
          } else {
              console.error('Request failed. Status: ' + xhr.status);
          }
      }
  };

  // Send request with data
  xhr.send(JSON.stringify(data));
}

room.onPlayerJoin = function (player) {

  // const warning = [
  //   "⚠️ Your current warnings for leaving mid game: 1/5",
  //   "Warnings can be removed by having a clean record for 24 hours",
  // ];

  // setTimeout(() => {
  //   warning.forEach(line => {
  //       room.sendAnnouncement(line, player.id, 0xFB6B6B, "normal");
  //   });
  // }, 5300)

  setTimeout(() => {
    checkBanStatus(player);
  }, 500);

  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] [auth:${player.auth}] joined dodgeball server.\``);
  checkAndKickPlayer(player);
  createPlayer(player);
  
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

  if (localStorage.getItem(player.auth) != null) {
    var playerRole = JSON.parse(localStorage.getItem(player.auth))[Ss.RL];
    if (playerRole == "admin" || playerRole == "master") {
      room.setPlayerAdmin(player.id, true);
      // room.sendAnnouncement("「Admin」" + player.name + " Came into the room!", null, 0xff7900, "normal");
    }
  }
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
          message = `\`🟢[dodgeball] ${currentPlayerCount} players (${adminCount} admin)\n${playerNames}\``;
      } else {
          message = `\`🟢[dodgeball] ${currentPlayerCount} players\n${playerNames}\``;
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
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left dodgeball server.\``);
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

setInterval(moveBotToBottom, 10);

room.onPlayerChat = function (player, message) {
  sendWebhook(chatWebHook, `\`💬 [dodgeball] ${player.name} [${player.id}]: ${message}\``);
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
    room.sendAnnouncement("[📄] Commands : !afk, !stats, !dc, !bb, !fixstart, !showme, !rank, !wins, !goals, !assists", player.id, 0x309d2b, "bold");
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
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "normal");
    room.sendAnnouncement("Ranks per goal:", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Bronze I - [⚽:2] | Iron II - [⚽:4] | Iron I - [⚽:6] ", player.id, 0xbc5e00, "normal");
    room.sendAnnouncement("Gold II - [⚽:8] | Gold I - [⚽:10] ", player.id, 0xa2a2a2, "normal");
    room.sendAnnouncement("Platinum II - [⚽:14] | Platinum I - [⚽:17]",  player.id, 0xeac274, "normal");
    room.sendAnnouncement("Type '!rank2' to see more", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "normal");
  }
  if (["!rank2"].includes(message[0].toLowerCase())) {
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "normal");
    room.sendAnnouncement("Ranks per goal (2 page):", player.id, Cor.Amarelo, "bold");
    room.sendAnnouncement("Diamond IV - [⚽:20] | Diamond III - [⚽:26] | Diamond II - [⚽:32]", player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Diamond I - [⚽:40] | Crown II - [⚽:50] | Crown I - [⚽:80]" , player.id, 0x7cd3fa, "normal");
    room.sendAnnouncement("Last rank: Legend - [⚽:110]", player.id, 0xf77104, "bold");
    room.sendAnnouncement("_______________________________________", player.id, Cor.Amarelo, "normal");
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
    sendWebhook(statsWebHook, `\`📊 [stats 5v5] ${player.name} [play:${stats[Ss.GA]}x] [wr:${stats[Ss.WR]}%] [win:${stats[Ss.WI]}] [loss:${stats[Ss.LS]}] [goal:${stats[Ss.GL]}] [assist:${stats[Ss.AS]}] [gk:${stats[Ss.GK]}x] [cleansheet:${stats[Ss.CP]}%] \``);
    room.sendAnnouncement("「👓」 This message only you can see, if you want to show your stats, use the command '!showme'!", player.id, 0xff7900, "bold");
  } else if (["!showme"].includes(message[0].toLowerCase())) {
    var stats;
    localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"]);
    room.sendAnnouncement("[📄] The player " + player.name + " showed his !stats", null, 0xff7900, "bold");
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
    sendWebhook(statsWebHook, `\`📊 [stats 5v5] ${player.name} [play:${stats[Ss.GA]}x] [wr:${stats[Ss.WR]}%] [win:${stats[Ss.WI]}] [loss:${stats[Ss.LS]}] [goal:${stats[Ss.GL]}] [assist:${stats[Ss.AS]}] [gk:${stats[Ss.GK]}x] [cleansheet:${stats[Ss.CP]}%] \``);
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
      room.setPlayerAdmin(player.id, true);
      var stats;
      localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player", player.name]);
      if (stats[Ss.RL] != "master") {
        stats[Ss.RL] = "master";
        room.sendAnnouncement(player.name + " Logged in as Administrator!", null, 0xff7900, 2);
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
            //sendWebhook(playerWebHook, `\`💬 [dodgeball] ${room.getPlayer(Number.parseInt(message[2])).name} was muted for ${timeOut / 60000} minutes by ${player.name}\``);
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
            //sendWebhook(playerWebHook, `\`💬 [dodgeball] ${room.getPlayer(Number.parseInt(message[1])).name} was muted for 3 minutes by ${player.name} \``);
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
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: 687, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
    } else {
      whisper("⚠️ ʏᴏᴜ ᴅᴏɴ'ᴛ ʜᴀᴠᴇ ᴘᴇʀᴍɪꜱꜱɪᴏɴ", player.id);
    }
  } else if (["!citblue"].includes(message[0].toLowerCase())) {
    if (player.admin) {
      room.setDiscProperties(0, { xspeed: 0, yspeed: 0, x: -687, y: 0, cMask: 268435519, xgravity: 0, ygravity: 0 });
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
  // } else if (["!reset"].includes(message[0].toLowerCase())) {
  //   var currentTime = new Date().getTime();
  //   if (player.admin || currentTime - lastResetballTime >= RESETBALL_COOLDOWN) {
  //     var ballPosition = room.getBallPosition();
  //     if (ballPosition.x > 0 && ballPosition.x <= 366.6) {
  //         room.setDiscProperties(0, { x: 212, y: -11 });
  //     } else if (ballPosition.x > -366.6 && ballPosition.x <= 0) {
  //         room.setDiscProperties(0, { x: -212, y: -11 });
  //     }
      
  //     if (!player.admin) {
  //         lastResetballTime = currentTime;
  //     }
  //   } else {
  //       // Inform the player about the cooldown
  //       whisper("The !reset command is on cooldown. Please wait before using it again.", player.id);
  //   }
  }  if (["!dc", "!disc", "!discord"].includes(message[0].toLowerCase())) {
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

room.onPlayerActivity = function (player) {
  setActivity(player, 0);
};

room.onPlayerBallKick = function (player) {
  TouchSystem.setLastKicker(player);
  
  if (lastPlayersTouched[0] == null || player.id != lastPlayersTouched[0].id) {
    !activePlay ? (activePlay = true) : null;
    lastTeamTouched = player.team;
    lastPlayersTouched[1] = lastPlayersTouched[0];
    lastPlayersTouched[0] = player;
  }
  
  if (player.team === 1) { // Red team
    ballColor = 0xff6060; 
  } else if (player.team === 2) { // Blue team
    ballColor = 0xa09dfe;
  }
  
  room.setDiscProperties(0, { color: ballColor });
  setTimeout(() => {
    room.setDiscProperties(0, { color: 0xFFB600 });
  }, 2000);

  var blueTeamPlayers = room.getPlayerList().filter(p => p.team === BLUE_TEAM);
  if (blueTeamPlayers.length > 0) {
      zoneActiveBlue = true;
  }
  zoneActiveRed = true;
  
};


/* GAME MANAGEMENT */

room.onGameStart = function (byPlayer) {
  setKickRateLimit()
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

  zoneActiveBlue = false; 
  zoneActiveRed = false; 

  room.sendAnnouncement(centerText("🥅 GAME START 🥅"), null, Cor.White, "bold");
  // room.sendAnnouncement(centerText("Use !reset if the ball stuck on the middle"), null, Cor.White, "bold");

  // // RSI RANDOM UNIFORM
  // var redUniform = getRandomItem(redTeamColors);
  // var blueUniform = getRandomItem(blueTeamColors);
  // // Ensure red and blue uniforms are not the same and are either both country or both club
  // while (areUniformsEqual(redUniform, blueUniform) || redUniform.type !== blueUniform.type) {
  //     blueUniform = getRandomItem(blueTeamColors);
  // }
  // room.setTeamColors(1, redUniform.angle, redUniform.textColor, redUniform.colors);
  // room.setTeamColors(2, blueUniform.angle, blueUniform.textColor, blueUniform.colors);
  // // room.sendChat("Red team is wearing the uniform of " + redUniform.name);
  // // room.sendChat("Blue team is wearing the uniform of " + blueUniform.name);

  // if (redUniform.type === "club" && blueUniform.type === "club") {
  //   room.sendAnnouncement(centerText("🥅 CHAMPIONS LEAGUE KICK OFF 🥅"), null, Cor.White, "bold");
  //   room.sendAnnouncement(centerText(""+ redUniform.name + " vs " + blueUniform.name + ""), null, 0x2ef55d, "bold");
  //   room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  // } else if (redUniform.type === "country" && blueUniform.type === "country") {
  //   room.sendAnnouncement(centerText("🥅 INT FRIENDLY KICK OFF 🥅"), null, Cor.White, "bold");
  //   room.sendAnnouncement(centerText(""+ redUniform.name + " vs " + blueUniform.name + ""), null, 0x2ef55d, "bold");
  //   room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
  // }
  
};

room.onGameStop = function (byPlayer) {
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
  if (team === 1) { 
    setTimeout(function() {
      room.setDiscProperties(0, { x: 187.4, y: -10 });
    }, 2500);
  }

  // zoneActiveBlue = false; 
  // zoneActiveRed = false; 
  
  setTimeout(function () {
    room.setDiscProperties(1, { xspeed: 0, yspeed: 0, x: -296 , y: -99, xgravity: 0, ygravity: 0  });
  }, 1000);
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
      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | 🎯 ꜱʜᴏᴏᴛ ʙʏ ${lastPlayersTouched[0].name} | ᴀssɪsᴛ ʙʏ - ${lastPlayersTouched[1].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });

      avatarCelebration(goalMaker, "🎯");

      sendWebhook(goalWebHook, `\`[SCORE DODGEBALL 3V3]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      const text = [
        `──────────────────────────────────────────────────────`,
        `     ${goalTime} | 🎯 ꜱʜᴏᴏᴛ ʙʏ ${lastPlayersTouched[0].name} | 🟥 ${scores.red} - ${scores.blue} 🟦`,
        `──────────────────────────────────────────────────────`
      ];
      text.forEach(line => {
        room.sendAnnouncement(line, null, 0x11DEB3, "small");
      });
      avatarCelebration(goalMaker, "🎯");

      sendWebhook(goalWebHook, `\`[SCORE DODGEBALL 3V3]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      avatarCelebration(goalAssist, "🤝", "👟");

    }
  } else {
    var fraseautogol = frasesautogol[(Math.random() * frasesautogol.length) | 0];
    //	room.sendAnnouncement("🤡 " + getTime(scores) + fraseautogol + lastPlayersTouched[0].name + "! | Velocidade do chute: " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"),null,(team == Team.RED ? Cor.Vermelho : 0x5ec0f1),'bold');
    const text = [
      `──────────────────────────────────────────────────────`,
      `     ${goalTime} | ☠️ ᴏᴡɴ ꜱʜᴏᴏᴛ ʙʏ ${lastPlayersTouched[0].name} | ᴀssɪsᴛ ʙʏ - | 🟥 ${scores.red} - ${scores.blue} 🟦`,
      `──────────────────────────────────────────────────────`
    ];
    text.forEach(line => {
      room.sendAnnouncement(line, null, 0xFB6B6B, "small");
    });
    //room.sendAnnouncement(centerText("Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h"), null, Cor.White, "normal");

    //sendWebhook(goalWebHook, `\`[OWN-GOAL DODGEBALL 3v3]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
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

var zone = {
  minX: 81.6,
  maxX: 366.6
};

function handlePlayerTeleport() {
  var players = room.getPlayerList();
  var ballPosition = room.getBallPosition();

  for (var i = 0; i < players.length; i++) {
    var player = players[i];
    if (TouchSystem.checkTouch(player, ballPosition)) {
      TouchSystem.lastPosition = player.position; // Store the player's last position before teleporting

      if (player.team === BLUE_TEAM && TouchSystem.isWithinTimeLimit()) {
        room.setPlayerDiscProperties(player.id, { x: 420, y: -11 });

        // Set disc properties before teleporting them to the player's last position
        setDiscPropertiesBeforeTeleport();
        teleportDiscsToLastPosition(TouchSystem.lastPosition);

        // After a delay, teleport the discs back to their original positions
        setTimeout(resetDiscsToOriginalPosition, 2000);

        TouchSystem.hasTeleported = true;
        break;
      } else if (player.team === RED_TEAM && TouchSystem.isWithinTimeLimit()) {
        room.setPlayerDiscProperties(player.id, { x: -420, y: -11 });

        // Set disc properties before teleporting them to the player's last position
        setDiscPropertiesBeforeTeleport();
        teleportDiscsToLastPosition(TouchSystem.lastPosition);

        // After a delay, teleport the discs back to their original positions
        setTimeout(resetDiscsToOriginalPosition, 2000);

        TouchSystem.hasTeleported = true;
        break;
      }
    }
  }
}

room.onGameTick = function () {
  var ball = room.getDiscProperties(0);
    
  startLeftKickTimer(ball);
  startRightKickTimer(ball);
  moveBallToSlowTarget(ball);

  getLastTouchOfTheBall();
  getStats();
  handleInactivity();
  handleFrozenPlayerMoves();

  handlePlayerTeleport();
  // checkZoneBlue();
  // checkZoneRed();
};

setInterval(function() {
  checkZoneRed();
  checkZoneBlue();
}, 10);

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
  form.append("file", new File([room.stopRecording()], `DODGE3v3-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

Botdivulga = setInterval(function () {
  room.sendAnnouncement("🔊 Join our Discord. https://discord.gg/pm55tVsQMX ", null, 0x5ee7ff, "nomal", 0);
}, BotdivulgaTime);

msg1 = setInterval(function () {
  room.sendAnnouncement("⚽ ᴄᴏᴍᴍᴀɴᴅ: !ᴅᴄ, !ʙʙ, !ꜰɪxꜱᴛᴀʀᴛ, !ᴀꜰᴋ, !ꜱᴛᴀᴛꜱ, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ], !ʜᴇʟᴘ", null, 0xff8a4a, "normal");
}, msg1Time);

