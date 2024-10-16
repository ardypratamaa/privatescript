/* ROOM */
var roomName = "💠 (ʀꜱɪ) 𝗖𝗹𝗼𝗻𝗲 𝟭𝘃𝟭 ᴘᴠᴘ 👻";
const botName = "----- ᴀᴜᴛᴏʀᴏᴏᴍ.ʀꜱɪ -----";
const maxPlayers = 10; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
//const geo = [{ lat: 1.2, lon: 104, code: "id" }];
const geo = [{ lat: 10.7749, lon: 106.647, code: "id" }]; //vn blank flag
// const geo = [{ lat: -6.17, lon: 106.85986, code: "id" }]; //indo
// place your geoloc, so as not to have a leaky room

const room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  playerName: botName,
  geo: geo[0],
});
//geo: geo[0];

const scoreLimitPractice = 3;
const timeLimitPractice = 3;

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

var vip1 = [];
var vip2 = [];
var vip3 = [];

/* ESTÁDIO */

const playerRadius = 15;
var ballRadius = 6.25;
const triggerDistance = playerRadius + ballRadius + 0.01;

var practiceMap =
  `{

    "name" : "RSI Clone Futsal",
  
    "width" : 640,
  
    "height" : 320,
  
    "bg" : { "color" : "454955" },
  
    "vertexes" : [
      /* 0 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 1 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 2 */ { "x" : -550, "y" : -80, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 3 */ { "x" : -550, "y" : 80, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 4 */ { "x" : 550, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 5 */ { "x" : 550, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 6 */ { "x" : -550, "y" : 80, "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 7 */ { "x" : -550, "y" : 240, "bCoef" : -0.2, "cMask" : ["ball" ] },
      /* 8 */ { "x" : -550, "y" : -80, "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 9 */ { "x" : -550, "y" : -240, "bCoef" : -0.2, "cMask" : ["ball" ] },
      /* 10 */ { "x" : 550, "y" : 80, "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 11 */ { "x" : 550, "y" : 240, "bCoef" : -0.2, "cMask" : ["ball" ] },
      /* 12 */ { "x" : 550, "y" : -240, "bCoef" : -0.2, "cMask" : ["ball" ] },
      /* 13 */ { "x" : 550, "y" : -80, "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 14 */ { "x" : 0, "y" : -240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 15 */ { "x" : 0, "y" : -82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 16 */ { "x" : 0, "y" : 82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 17 */ { "x" : 0, "y" : 240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 18 */ { "x" : 0, "y" : -82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 19 */ { "x" : 0, "y" : 82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 20 */ { "x" : 0, "y" : 82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 21 */ { "x" : 0, "y" : -82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 22 */ { "x" : 0, "y" : 82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 23 */ { "x" : 0, "y" : -82, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 24 */ { "x" : 0, "y" : 82, "bCoef" : 0.1, "cMask" : [ ] },
      /* 25 */ { "x" : -550, "y" : -80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 26 */ { "x" : -550, "y" : 80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 27 */ { "x" : 550, "y" : -80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 28 */ { "x" : 550, "y" : 80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 29 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 30 */ { "x" : -401, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 31 */ { "x" : -548, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 32 */ { "x" : -401, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 33 */ { "x" : -548, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 34 */ { "x" : -470, "y" : -100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 35 */ { "x" : -548, "y" : -100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 36 */ { "x" : -470, "y" : 100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 37 */ { "x" : -548, "y" : 100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 38 */ { "x" : -400, "y" : -68, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 39 */ { "x" : -400, "y" : 68, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 40 */ { "x" : 401, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 41 */ { "x" : 401, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 42 */ { "x" : 548, "y" : -160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 43 */ { "x" : 401, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 44 */ { "x" : 548, "y" : 160, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 45 */ { "x" : 470, "y" : -100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 46 */ { "x" : 470, "y" : 100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 47 */ { "x" : 548, "y" : -100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 48 */ { "x" : 470, "y" : 100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 49 */ { "x" : 548, "y" : 100, "bCoef" : 0.1, "cMask" : [ ], "cGroup" : ["c0" ] },
      /* 50 */ { "x" : 400, "y" : -68, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 51 */ { "x" : 400, "y" : 68, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 52 */ { "x" : -550, "y" : 240, "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      /* 53 */ { "x" : 550, "y" : 240, "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      /* 54 */ { "x" : -550, "y" : -240, "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      /* 55 */ { "x" : 550, "y" : -240, "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      /* 56 */ { "x" : -580, "y" : -80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 57 */ { "x" : -580, "y" : 80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 58 */ { "x" : -550, "y" : -82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 59 */ { "x" : -582, "y" : -82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 60 */ { "x" : -550, "y" : 82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 61 */ { "x" : -582, "y" : 82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 62 */ { "x" : -550, "y" : 84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 63 */ { "x" : -584, "y" : 84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 64 */ { "x" : -550, "y" : -84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 65 */ { "x" : -584, "y" : -84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 66 */ { "x" : 580, "y" : -80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 67 */ { "x" : 580, "y" : 80, "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 68 */ { "x" : 550, "y" : 82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 69 */ { "x" : 582, "y" : 82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 70 */ { "x" : 550, "y" : -82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 71 */ { "x" : 582, "y" : -82, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 72 */ { "x" : 550, "y" : 84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 73 */ { "x" : 584, "y" : 84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 74 */ { "x" : 550, "y" : -84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 75 */ { "x" : 584, "y" : -84, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ] },
      /* 76 */ { "x" : 0, "y" : -390, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 77 */ { "x" : 0, "y" : 390, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      /* 78 */ { "x" : 420, "y" : 0, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 79 */ { "x" : 420, "y" : 0.5, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 80 */ { "x" : -420, "y" : 0, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 81 */ { "x" : -420, "y" : 0.5, "bCoef" : 0.1, "cGroup" : ["c0" ] },
      /* 82 */ { "x" : 550, "y" : 95, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 83 */ { "x" : 550, "y" : 240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 84 */ { "x" : 550, "y" : -240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 85 */ { "x" : 550, "y" : -95, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 86 */ { "x" : -550, "y" : 95, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 87 */ { "x" : -550, "y" : 240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 88 */ { "x" : -550, "y" : -240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      /* 89 */ { "x" : -550, "y" : -95, "bCoef" : -0.2, "cMask" : ["c1" ] }
  
    ],
  
    "segments" : [
      { "v0" : 0, "v1" : 1, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 1, "v1" : 0, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 6, "v1" : 7, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["ball" ] },
      { "v0" : 8, "v1" : 9, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["ball" ] },
      { "v0" : 10, "v1" : 11, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["ball" ] },
      { "v0" : 12, "v1" : 13, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["ball" ] },
      { "v0" : 14, "v1" : 15, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 16, "v1" : 17, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 25, "v1" : 26, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : [ ] },
      { "v0" : 27, "v1" : 28, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : [ ] },
      { "v0" : 40, "v1" : 41, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 40, "v1" : 42, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 43, "v1" : 44, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 45, "v1" : 46, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 45, "v1" : 47, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 48, "v1" : 49, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 51, "v1" : 50, "curve" : 119.99999999999999, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 0.577350269189626 },
      { "v0" : 52, "v1" : 53, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      { "v0" : 54, "v1" : 55, "color" : "FFFFFF", "cMask" : ["ball" ], "cGroup" : ["c0" ] },
      { "v0" : 38, "v1" : 39, "curve" : 119.99999999999999, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 0.577350269189626 },
      { "v0" : 35, "v1" : 34, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 34, "v1" : 36, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 36, "v1" : 37, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 33, "v1" : 32, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 32, "v1" : 30, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 30, "v1" : 31, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ] },
      { "v0" : 57, "v1" : 56, "curve" : 20, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 25, "v1" : 56, "curve" : 10, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 11.430052302761343 },
      { "v0" : 57, "v1" : 26, "curve" : 10, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 11.430052302761343 },
      { "v0" : 58, "v1" : 59, "curve" : 10, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 11.430052302761343 },
      { "v0" : 61, "v1" : 60, "curve" : 10, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 11.430052302761343 },
      { "v0" : 61, "v1" : 59, "curve" : 20, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 63, "v1" : 62, "curve" : 10, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : 10, "curveF" : 11.430052302761343 },
      { "v0" : 64, "v1" : 65, "curve" : 10, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : 10, "curveF" : 11.430052302761343 },
      { "v0" : 66, "v1" : 67, "curve" : 20, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 66, "v1" : 27, "curve" : 20, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 28, "v1" : 67, "curve" : 20, "color" : "FFFFFF", "bCoef" : -10.5, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 68, "v1" : 69, "curve" : 20, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 71, "v1" : 70, "curve" : 20, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 71, "v1" : 69, "curve" : 20, "color" : "DCF5F8", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "curveF" : 5.671281819617709 },
      { "v0" : 72, "v1" : 73, "curve" : 20, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : 10, "curveF" : 5.671281819617709 },
      { "v0" : 75, "v1" : 74, "curve" : 20, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : 10, "curveF" : 5.671281819617709 },
      { "v0" : 75, "v1" : 73, "curve" : 20, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : -20, "curveF" : 5.671281819617709 },
      { "v0" : 14, "v1" : 76, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 17, "v1" : 77, "vis" : false, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ] },
      { "v0" : 78, "v1" : 79, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 79, "v1" : 78, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 80, "v1" : 81, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 81, "v1" : 80, "curve" : 180, "color" : "FFFFFF", "bCoef" : 0.1, "cGroup" : ["c0" ], "curveF" : 6.123233995736766e-17 },
      { "v0" : 82, "v1" : 83, "vis" : false, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["c1" ], "bias" : -20 },
      { "v0" : 84, "v1" : 85, "vis" : false, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["c1" ], "bias" : -20 },
      { "v0" : 86, "v1" : 87, "vis" : false, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["c1" ], "bias" : 20 },
      { "v0" : 88, "v1" : 89, "vis" : false, "color" : "FFFFFF", "bCoef" : -0.2, "cMask" : ["c1" ], "bias" : 20 },
      { "v0" : 63, "v1" : 65, "curve" : 20, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["redKO","blueKO" ], "bias" : -20, "curveF" : 5.671281819617709 }
  
    ],
  
    "planes" : [
      { "normal" : [0,1 ], "dist" : -240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      { "normal" : [0,-1 ], "dist" : -240, "bCoef" : -0.2, "cMask" : ["c1" ] },
      { "normal" : [1,0 ], "dist" : -642, "bCoef" : 0.1, "cMask" : ["c1" ] },
      { "normal" : [-1,0 ], "dist" : -642, "bCoef" : 0.1, "cMask" : ["c1" ] },
      { "normal" : [0,1 ], "dist" : -390, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      { "normal" : [0,-1 ], "dist" : -390, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      { "normal" : [1,0 ], "dist" : -750, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      { "normal" : [-1,0 ], "dist" : -750, "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] }
  
    ],
  
    "goals" : [
      { "p0" : [-556.3,-80 ], "p1" : [-556.3,80 ], "team" : "red" },
      { "p0" : [556.3,80 ], "p1" : [556.3,-80 ], "team" : "blue" }
  
    ],
  
    "discs" : [
      { "radius" : 6.25, "invMass" : 1.5, "color" : "CF65E1", "bCoef" : -2, "cMask" : ["red","blue","redKO","blueKO","wall" ], "cGroup" : ["ball","kick","score","c1" ] },
      { "radius" : 6.5, "invMass" : 0, "pos" : [-550,82 ], "color" : "8CD4CA", "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["wall" ] },
      { "radius" : 6.5, "invMass" : 0, "pos" : [-550,-82 ], "color" : "8CD4CA", "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["wall" ] },
      { "radius" : 6.5, "invMass" : 0, "pos" : [550,82 ], "color" : "8CD4CA", "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["wall" ] },
      { "radius" : 6.5, "invMass" : 0, "pos" : [550,-82 ], "color" : "8CD4CA", "bCoef" : -0.2, "cMask" : ["red","blue","c1" ], "cGroup" : ["wall" ] },
      { "radius" : 0, "invMass" : 3, "color" : "0", "cMask" : ["red" ], "cGroup" : ["c3" ] },
      { "radius" : 0, "invMass" : 3, "color" : "0", "cMask" : ["red" ], "cGroup" : ["c3" ] },
      { "radius" : -700, "invMass" : 3, "color" : "transparent", "cMask" : ["red" ], "cGroup" : ["wall" ] },
      { "radius" : -700, "invMass" : 3, "color" : "transparent", "cMask" : ["blue" ], "cGroup" : ["wall" ] }
  
    ],
  
    "playerPhysics" : {
      "bCoef" : 0.1,
      "acceleration" : 0.139,
      "kickingAcceleration" : 0.13,
      "kickStrength" : 4.76
  
    },
  
    "ballPhysics" : "disc0",
  
    "spawnDistance" : 660,
  
    "joints" : [
      { "d0" : 5, "d1" : 7, "color" : "transparent", "length" : 0 },
      { "d0" : 6, "d1" : 8, "color" : "transparent", "length" : 0 }
  
    ],
  
    "kickOffReset" : "full"
  }`;
/* OPÇÕES */

var afkLimit = 90; // limite de afk (12 segundos)
var drawTimeLimit = 1; // minutos
var maxTeamSize = 1; // máximo de jogadores num time, isso funciona para 1 (você pode querer adaptar as coisas para remover algumas estatísticas inúteis em 1v1, como assist ou cs), 2, 3 ou 4
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
let regex = [
  "anj",
  "ajg",
  "anjg",
  "anjing",
  "ANJ",
  "AJG",
  "jnck",
  "jancok",
  "jancox",
  "jncx",
  "peler",
  "PLER",
  "pepek",
  "Ppk",
  "PPK",
  "ANJING",
  "Anjing",
  "kontol",
  "ktl",
  "Kontol",
  "kntl",
  "Kntl",
  "KINTIL",
  "kintil",
  "bgsd",
  "bangsat",
  "bgstt",
  "Bgst",
  "Bgsd",
  "Bngsd",
  "BANGSAT",
  "babi",
  "Babi",
  "BABI",
  "yatim",
  "YATIM",
  "Yatim",
  "yteam",
  "asw",
  "ASU",
  "asu",
  "Asu",
  "bapakau",
  "Bapakau",
  "BAPAKAU",
  "Pala kau",
  "njeng",
  "njing",
  "Njeng",
  "Njing",
  "Memek",
  "MEMEK",
  "mmk",
  "MMK",
  "TAI",
  "tai",
  "Tai",
  "paok",
  "PAOKKK",
  "bodoh",
  "BODOH",
  "Bloon",
  "bloon",
  "dongo",
  "DONGO",
  "Dongo",
  "goblok",
  "GOBLOK",
  "Goblok",
  "Gblk",
  "gblk",
  "blok",
  "bego",
  "Bego",
  "BEGO",
  "tolol",
  "TOLOL",
  "Tolol",
  "idiot",
  "Idiot",
  "IDIOT",
  "shit",
  "ass",
  "ASS",
  "banci",
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
let goalWebHook = "https://discord.com/api/webhooks/1227774180343287890/gi34423X3uBqB--UM_-aIB5MqPShDFmftAUwTMIw8aB2U-30TYcqu9a9HMQ7C3HrLzMt";
let chatWebHook = "https://discord.com/api/webhooks/1239049040772206683/EBp9anmfVNHLmLGbjE_n_Rgkydr3EeXGdnFGnJKAERLM38omfBmwfl0hC7kv4Mbv9Dw9";
let joinWebHook = "https://discord.com/api/webhooks/1239049407177949226/95u2WoWZXCbfKoaUq607TEWQN1Lm38OxUN0ZWuSgbcUlM4_S7tTeGBc7aMUkQVAuODJK";
let startWebHook = "https://discord.com/api/webhooks/1228211340519149661/kmFJSfdirOOWRnH-bynJrDxisbtI-5kg5AesFc4RaktI0NSwgoo6KBbj5bkyshJfcQhq";
let toxicWebHook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";

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
        // room.sendChat("🤖 Equilibrando equipes... 🤖");
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

/* EVENTS */

/* PLAYER MOVEMENT */

room.onPlayerJoin = function (player) {
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [id:${player.conn}] joined futsal 1v1 server.\``);
  createPlayer(player);
  
  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  updateRoleOnPlayerIn();
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
      // room.sendAnnouncement("「Admin」" + player.name + " Came into the room!", null, 0xff7900, "bold");
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
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left futsal 1v1 server.\``);
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
  sendWebhook(chatWebHook, `\`💬 [futsal 1v1] ${player.name} [${player.id}]: ${message}\``);

  if (message.length > 1 && message[0].toLowerCase() == "t" && message[1] == " ") {
    if (player.team != 0) {
      room.getPlayerList().forEach((element) => {
        if (element.team == player.team) room.sendAnnouncement("[TEAM CHAT] " + player.name + ": " + message.substr(2), element.id, player.team == 1 ? 16725591 : 3261685, "bold", 0);
      });
      return false;
    } else {
      room.sendAnnouncement("You're not on a team.", player.id);
    }
  }

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
    room.sendAnnouncement("[📄] Commands : !afk, !stats, !dc, !bb, !uni, !fixstart, !rank, !wins, !goals, !assists", player.id, 0x309d2b, "bold");
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
            room.sendChat(room.getPlayer(Number.parseInt(message[2])).name + " was mutated for " + timeOut / 60000 + " minutes!");
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
            room.sendChat(room.getPlayer(Number.parseInt(message[1])).name + " was mutated for 3 minutes!");
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
    if (room.getScores() == null) {
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
  if (regex.includes(message[0])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }
  if (regex.includes(message[1])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }
  if (regex.includes(message[2])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }
  if (regex.includes(message[3])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }
  if (regex.includes(message[4])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
    return false;
  }
  if (regex.includes(message[5])) {
    room.sendAnnouncement("No swearing, " + player.name, player.id, Cor.Warn, "italic", 2);
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
            room.sendAnnouncement(player.name + " recruited: " + teamS[Number.parseInt(message[0]) - 1].name + " !", null, 0x55bae2, "bold");
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
            room.sendAnnouncement(player.name + " recruited: " + teamS[Number.parseInt(message[0]) - 1].name + "!", null, 0x55bae2, "bold");
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
      announcement += "💬 (ᴀᴅᴍɪɴ|" + stats[Ss.GL] + ") ";
      chatColor = "0x99ffff";
    } else if (stats[Ss.GL] > 110) {
      announcement += "👑 (ʟᴇɢᴇɴᴅ|" + stats[Ss.GL] + ") ";
      chatColor = "0xC435E7";
    } else if (stats[Ss.GL] > 80) {
      announcement += "👑 (ᴄʀᴏᴡɴ ɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0x83E735";
    } else if (stats[Ss.GL] > 55) {
      announcement += "👑 (ᴄʀᴏᴡɴ ɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0x83E735";
    } else if (stats[Ss.GL] > 40) {
      announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 32) {
      announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 26) {
      announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 20) {
      announcement += "💎 (ᴅɪᴀᴍᴏɴᴅ ɪᴠ|" + stats[Ss.GL] + ") ";
      chatColor = "0x7cd3fa";
    } else if (stats[Ss.GL] > 17) {
      announcement += "🔘 (ᴘʟᴀᴛɪɴᴜᴍ ɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 14) {
      announcement += "🔘 (ᴘʟᴀᴛɪɴᴜᴍ ɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xDFDAD1";
    } else if (stats[Ss.GL] > 10) {
      announcement += "🥮 (ɢᴏʟᴅ ɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 8) {
      announcement += "🥮 (ɢᴏʟᴅ ɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xE4C72D";
    } else if (stats[Ss.GL] > 6) {
      announcement += "💿 (ɪʀᴏɴ ɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xE01295";
    } else if (stats[Ss.GL] > 4) {
      announcement += "💿 (ɪʀᴏɴ ɪɪ|" + stats[Ss.GL] + ") ";
      chatColor = "0xCBCBCB";
    } else if (stats[Ss.GL] > 2) {
      announcement += "💬 (​ʙʀᴏɴᴢᴇ​ ​🇮​​|" + stats[Ss.GL] + ") ";
      chatColor = "0xF5B43B";
    } else {
      announcement += "💬 (ʙʀᴏɴᴢᴇ ɪɪ|" + stats[Ss.GL] + ") "; //chat user dan admin
      chatColor = "0xF5B43B";
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
  room.sendAnnouncement(centerText("🥅 MATCH STARTING 🥅"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText("Want to change your uniform? Type '!uni'"), null, 0x2ef55d, "bold");
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
      room.sendAnnouncement(centerText("IT’S GOOOOOAL!!!"), null, Cor.Verde, "bold");
      room.sendAnnouncement(centerText("⚽ Goal from: " + lastPlayersTouched[0].name + " ⚽"), null, Cor.White, "bold");
      room.sendAnnouncement(centerText("👟 Assist: " + lastPlayersTouched[1].name + " 👟"), null, Cor.White, "bold");
      room.sendAnnouncement(centerText("Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h"), null, Cor.White, "normal");

      sendWebhook(goalWebHook, `\`[GOALL FUT 1v1]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], lastPlayersTouched[1]));
    } else {
      var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
      room.sendAnnouncement(centerText("IT’S GOOOOOAL!!!"), null, Cor.Verde, "bold");
      room.sendAnnouncement(centerText("⚽ Goal from: " + lastPlayersTouched[0].name + " ⚽"), null, Cor.White, "bold");
      room.sendAnnouncement(centerText("Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h"), null, Cor.White, "normal");

      sendWebhook(goalWebHook, `\`[GOALL FUT 1v1]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
      game.goals.push(new Goal(scores.time, team, lastPlayersTouched[0], null));
    }
    setTimeout(function () {
      room.setPlayerAvatar(goalMaker, "🎯");
      setTimeout(function () {
        room.setPlayerAvatar(goalMaker, "⚽");
        setTimeout(function () {
          room.setPlayerAvatar(goalMaker, null);
        }, 3000);
      }, 1200);
    }, 1);

    if (lastPlayersTouched[1] != null && lastPlayersTouched[1].team == team) {
      let goalAssist = lastPlayersTouched[1].id;
      assistencia = lastPlayersTouched[1];
      setTimeout(function () {
        room.setPlayerAvatar(goalAssist, "🤝");
        setTimeout(function () {
          room.setPlayerAvatar(goalAssist, "👟");
          setTimeout(function () {
            room.setPlayerAvatar(goalAssist, null);
          }, 2500);
        }, 1000);
      }, 1);
    }
  } else {
    var fraseautogol = frasesautogol[(Math.random() * frasesautogol.length) | 0];
    //	room.sendAnnouncement("🤡 " + getTime(scores) + fraseautogol + lastPlayersTouched[0].name + "! | Velocidade do chute: " + ballSpeed.toPrecision(4).toString() + "km/h " + (team == Team.RED ? "🔴" : "🔵"),null,(team == Team.RED ? Cor.Vermelho : 0x5ec0f1),'bold');
    room.sendAnnouncement(centerText("🤦‍♂️ IT'S GOOOOOL AGAINST!! 🤦‍♂️"), null, Cor.Yellow, "bold");
    room.sendAnnouncement(centerText("🤡 Goal from " + lastPlayersTouched[0].name + " 🤡"), null, Cor.White, "bold");
    room.sendAnnouncement(centerText("Kick speed: " + ballSpeed.toPrecision(4).toString() + " km/h"), null, Cor.White, "normal");

    sendWebhook(goalWebHook, `\`[OWN-GOAL FUT1v1]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Menit: ** \`${goalTime}\` `);
    game.goals.push(new Goal(scores.time, team, null, null));
    setTimeout(function () {
      room.setPlayerAvatar(goalMaker, "🤦‍♂️");
      setTimeout(function () {
        room.setPlayerAvatar(goalMaker, "🤡");
        setTimeout(function () {
          room.setPlayerAvatar(goalMaker, null);
        }, 3000);
      }, 1000);
    }, 1);

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
  form.append("file", new File([room.stopRecording()], `FUT1v1-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

Botdivulga = setInterval(function () {
  room.sendAnnouncement("⭐ Discord: Indonesia Real Soccer : discord.gg/pm55tVsQMX  ⭐", null, 0x5ee7ff, "bold");
}, BotdivulgaTime);

msg1 = setInterval(function () {
  room.sendAnnouncement("⚽ ᴄᴏᴍᴍᴀɴᴅ: !ᴅᴄ, !ʙʙ, !ꜰɪxꜱᴛᴀʀᴛ, !ᴀꜰᴋ, !ꜱᴛᴀᴛꜱ, !ʀᴀɴᴋ, ᴛ [ᴄʜᴀᴛ ᴛɪᴍ], !ʜᴇʟᴘ ⚽", null, 0xff8a4a, "normal");
}, msg1Time);
