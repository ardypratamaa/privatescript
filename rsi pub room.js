/* ROOM */
//var roomName = "💠 [ʀꜱɪ|ɪᴅ] Scrim Room | ᴘᴠᴘ ⚽";
var roomName = "💠 (ʀꜱɪ) 𝗣𝘂𝗯 𝗥𝗼𝗼𝗺 ᴘᴠᴘ";
//var roomPassword = "scrim2";
const maxPlayers = 30; // maximum number of players in the room
const roomPublic = true; // true = public room | false = players only enter via the room link (it does not appear in the room list)
// const geo = [{ lat: -6.17, lon: 106.85990, code: "id" }]; //liga 1
const geo = [{ lat: 10.7743, lon: 106.647  , code: "id" }]; //liga 1

var playersbintang = {};

function getPlayerById(id) {
  return playersbintang[id];
}

function addNewPlayerById(id, auth, stars, goals) {
  playersbintang[id] = {
      id: id,
      auth: auth,
      stars: stars,
      goals: goals
  };
}

async function fetchUsername(loginCode) {
  try {
    const response = await fetch('YOUR_PHP_API_ENDPOINT', { // Replace with your actual PHP API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login_code: loginCode })
    });
    const data = await response.json();
    if (data.success) {
      return data.data.username;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}

function checkPlayerInDatabase(auth, callback) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/getPlayer.php'; 

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.success) {
                  var playerData = response.data;
                  callback(playerData.auth, playerData.stars, playerData.goals);
              } else {
                  callback(null); 
              }
          } else {
              console.error('Terjadi kesalahan: ' + xhr.status);
              callback(null); 
          }
      }
  };

  var data = {
      auth: auth
  };

  xhr.send(JSON.stringify(data));
}

function getLoginCodeFromDatabase(login_code, callback) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/getCode.php'; // Update this URL if necessary

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.success) {
                  var accountData = response.data;
                  callback(accountData.login_code, accountData.username, accountData.id);
              } else {
                  callback(null); 
              }
          } else {
              console.error('An error occurred: ' + xhr.status);
              callback(null); 
          }
      }
  };

  var data = {
      login_code: login_code
  };

  xhr.send(JSON.stringify(data));
}

function updateLoginStatusInDatabase(account_id, status) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/updateLoginStatus.php'; // Update this URL if necessary

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status !== 200) {
              console.error('Failed to update login status: ' + xhr.status);
          }
      }
  };

  var data = {
      account_id: account_id,
      login_status: status
  };

  xhr.send(JSON.stringify(data));
}

function getUsernameChat(account_id, status, callback) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/getUsnChat.php'; // Update this URL if necessary

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          callback(response.username); // Pass the username to the callback
        } else {
          callback(null); // No username found
        }
      } else {
        console.error('Failed to get username. Status: ' + xhr.status);
        callback(null); // Handle error case
      }
    }
  };

  var data = {
    auth: account_id
  };

  xhr.send(JSON.stringify(data));
}

function getAdminStatus(auth, callback) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/getAdmin.php'; // Updated URL

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.success) {
                  var adminStatus = response.data.admin; // Fetch admin status
                  callback(adminStatus); // Pass admin status to callback
              } else {
                  console.log('Player not found');
                  callback(null); // Handle player not found
              }
          } else {
              console.error('Request failed. Status: ' + xhr.status);
              callback(null); // Handle request error
          }
      }
  };

  var data = {
      auth: auth
  };

  xhr.send(JSON.stringify(data));
}

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

// Function to send stars and other stats to the server
function sendDataToServer(player) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/updateStars.php'; 
  
  // Retrieve stats from localStorage
  var stats;
  if (localStorage.getItem(getAuth(player))) {
    stats = JSON.parse(localStorage.getItem(getAuth(player)));
  } else {
    stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00"];
  }

  var data = {
    auth: player.auth, 
    stars: player.stars,
    // Additional stats
    win: stats[Ss.WI] || 0,
    lose: stats[Ss.LS] || 0,
    assist: stats[Ss.AS] || 0,
    matchesPlayed: stats[Ss.GA] || 0,
    cleanSheet: stats[Ss.CS] || 0,
    cleanSheetPercentage: stats[Ss.CP] || "0.00"
  };
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText); 
      } else {
        console.error('Terjadi kesalahan: ' + xhr.status);
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
}

function checkAuthInUsersTable(auth, callback) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/checkAuth.php'; // Adjust this URL if necessary
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              callback(response.exists);
          } else {
              console.error('Failed to check auth: ' + xhr.status);
              callback(false);
          }
      }
  };
  
  var data = {
      auth: auth
  };
  
  xhr.send(JSON.stringify(data));
}

function sendLoginCodeToUsersTable(currentPlayer, login_code) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/updateLoginCode.php'; // Adjust this URL if necessary
  
  var data = {
      auth: currentPlayer.auth, // Use the auth from the currentPlayer object
      login_code: login_code
  };
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              console.log(xhr.responseText); 
          } else {
              console.error('Failed to update login code: ' + xhr.status);
          }
      }
  };
  
  xhr.send(JSON.stringify(data));
}

// Function to send goals to the server
function sendGoalsToServer(player) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/updateGoals.php'; 
  
  var data = {
    auth: player.auth, 
    goals: player.goals
  };
  
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        console.log(xhr.responseText); 
      } else {
        console.error('Terjadi kesalahan: ' + xhr.status);
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
}

function updatePlayerName(auth, playername) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/updatePlayerName.php'; // Make sure this URL is correct

  var data = {
      auth: auth,
      playername: playername
  };

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              console.log(xhr.responseText); 
          } else {
              console.error('Error: ' + xhr.status);
          }
      }
  };

  xhr.send(JSON.stringify(data));
}

function checkPlayerLoginStatus(player) {
  let xhr = new XMLHttpRequest();
  let url = 'http://localhost/haxindo/database/checkLoginStatus.php'; // Replace with your actual URL

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              let response = JSON.parse(xhr.responseText);
              if (response.success) {
                  if (response.login_status === "yes") {
                      room.sendAnnouncement(`${player.name} joined room as [ID: ${response.id}] ${response.username}`, null, "0xe5c344", "bold");
                  } else {
                    setTimeout(() => {
                      room.sendAnnouncement(`You are logged out, !login to connect your account.`, player.id);
                    }, 3600);
                  }
              } else {
                  setTimeout(() => {
                    room.sendAnnouncement(`Create account on https://bit.ly/haxballrsi and use !login [code] to save your stats`, player.id);
                  }, 3600);
              }
          } else {
              console.error('Error: ' + xhr.status);
          }
      }
  };

  let data = {
      auth: player.auth
  };

  xhr.send(JSON.stringify(data));
}

function logoutPlayer(player) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost/haxindo/database/logout.php'; // Update this URL if necessary

  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              if (response.success) {
                  room.sendAnnouncement(response.message, player.id);
              } else {
                  room.sendAnnouncement('Logout failed. Please try again.', player.id);
              }
          } else {
              console.error('An error occurred: ' + xhr.status);
              room.sendAnnouncement('Error occurred while logging out.', player.id);
          }
      }
  };

  var data = {
      auth: player.auth
  };

  xhr.send(JSON.stringify(data));
}

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

var gameTime = 5; //default game time if 0 is selected
var playerList = {};

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
  `{

	"name" : "RSI Futsal 4v4",

	"width" : 620,

	"height" : 270,

	"spawnDistance" : 350,

	"bg" : { "type" : "none", "width" : 550, "height" : 240, "kickOffRadius" : 80, "cornerRadius" : 0, "color" : "404447" },

	"vertexes" : [
		/* 0 */ { "x" : 550, "y" : 240, "trait" : "ballArea" },
		/* 1 */ { "x" : 550, "y" : -240, "trait" : "ballArea" },
		
		/* 2 */ { "x" : 0, "y" : 270, "trait" : "kickOffBarrier" },
		/* 3 */ { "x" : 0, "y" : 80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 4 */ { "x" : 0, "y" : -80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 5 */ { "x" : 0, "y" : -270, "trait" : "kickOffBarrier" },
		
		/* 6 */ { "x" : -550, "y" : -80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },
		/* 7 */ { "x" : -590, "y" : -80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,-80 ] },
		/* 8 */ { "x" : -590, "y" : 80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },
		/* 9 */ { "x" : -550, "y" : 80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [-700,80 ] },
		/* 10 */ { "x" : 550, "y" : -80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [700,-80 ] },
		/* 11 */ { "x" : 590, "y" : -80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [700,-80 ] },
		/* 12 */ { "x" : 590, "y" : 80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [700,80 ] },
		/* 13 */ { "x" : 550, "y" : 80, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "curve" : 0, "color" : "F8F8F8", "pos" : [700,80 ] },
		
		/* 14 */ { "x" : -550, "y" : 80, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [-700,80 ] },
		/* 15 */ { "x" : -550, "y" : 240, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8" },
		/* 16 */ { "x" : -550, "y" : -80, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [-700,-80 ] },
		/* 17 */ { "x" : -550, "y" : -240, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8" },
		/* 18 */ { "x" : -550, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		/* 19 */ { "x" : 550, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea" },
		/* 20 */ { "x" : 550, "y" : 80, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "pos" : [700,80 ] },
		/* 21 */ { "x" : 550, "y" : 240, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea" },
		/* 22 */ { "x" : 550, "y" : -240, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8" },
		/* 23 */ { "x" : 550, "y" : -80, "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [700,-80 ] },
		/* 24 */ { "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },
		/* 25 */ { "x" : 550, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea" },
		/* 26 */ { "x" : -550, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0 },
		/* 27 */ { "x" : 550, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0 },
		
		/* 28 */ { "x" : 0, "y" : -240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		/* 29 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		/* 30 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		/* 31 */ { "x" : 0, "y" : 240, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		/* 32 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "F8F8F8" },
		/* 33 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "cMask" : ["red","blue" ], "trait" : "kickOffBarrier", "vis" : true, "color" : "F8F8F8" },
		/* 34 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : -180 },
		/* 35 */ { "x" : 0, "y" : -80, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : -180 },
		/* 36 */ { "x" : 0, "y" : 80, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 0 },
		/* 37 */ { "x" : 0, "y" : -80, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 0 },
		
		/* 38 */ { "x" : -557.5, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [-700,80 ] },
		/* 39 */ { "x" : -557.5, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false },
		/* 40 */ { "x" : -557.5, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0 },
		/* 41 */ { "x" : -557.5, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [-700,-80 ] },
		/* 42 */ { "x" : 557.5, "y" : -240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0 },
		/* 43 */ { "x" : 557.5, "y" : -80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false, "curve" : 0, "pos" : [700,-80 ] },
		/* 44 */ { "x" : 557.5, "y" : 80, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false, "pos" : [700,80 ] },
		/* 45 */ { "x" : 557.5, "y" : 240, "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "curve" : 0, "vis" : false },
		
		/* 46 */ { "x" : 0, "y" : -80, "bCoef" : 0.1, "trait" : "line" },
		/* 47 */ { "x" : 0, "y" : 80, "bCoef" : 0.1, "trait" : "line" },
		/* 48 */ { "x" : -550, "y" : -80, "bCoef" : 0.1, "trait" : "line", "color" : "FF0000" },
		/* 49 */ { "x" : -550, "y" : 80, "bCoef" : 0.1, "trait" : "line", "color" : "FF0000" },
		/* 50 */ { "x" : 550, "y" : -80, "bCoef" : 0.1, "trait" : "line", "color" : "0925F3" },
		/* 51 */ { "x" : 550, "y" : 80, "bCoef" : 0.1, "trait" : "line", "color" : "0925F3" },
		/* 52 */ { "x" : -550, "y" : 200, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 53 */ { "x" : -550, "y" : 226, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },
		/* 54 */ { "x" : -536, "y" : 240, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },
		/* 55 */ { "x" : -550, "y" : -200, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 56 */ { "x" : -550, "y" : -226, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },
		/* 57 */ { "x" : -536, "y" : -240, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },
		/* 58 */ { "x" : -381, "y" : -240, "bCoef" : 0.1, "trait" : "line" },
		/* 59 */ { "x" : 550, "y" : -226, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },
		/* 60 */ { "x" : 536, "y" : -240, "bCoef" : 0.1, "trait" : "line", "curve" : -90 },
		/* 61 */ { "x" : 550, "y" : 226, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },
		/* 62 */ { "x" : 536, "y" : 240, "bCoef" : 0.1, "trait" : "line", "curve" : 90 },
		/* 63 */ { "x" : 550, "y" : 200, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 64 */ { "x" : 550, "y" : -200, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 65 */ { "x" : -381, "y" : 240, "bCoef" : 0.1, "trait" : "line" },
		/* 66 */ { "x" : -381, "y" : 246, "bCoef" : 0.1, "trait" : "line" },
		/* 67 */ { "x" : -550.5454545454546, "y" : 123, "bCoef" : 0.1, "trait" : "line" },
		/* 68 */ { "x" : -557.5454545454546, "y" : 123, "bCoef" : 0.1, "trait" : "line" },
		/* 69 */ { "x" : 551.4545454545455, "y" : 123, "bCoef" : 0.1, "trait" : "line" },
		/* 70 */ { "x" : 558.4545454545455, "y" : 123, "bCoef" : 0.1, "trait" : "line" },
		/* 71 */ { "x" : -550.5454545454546, "y" : -123, "bCoef" : 0.1, "trait" : "line" },
		/* 72 */ { "x" : -556.5454545454546, "y" : -123, "bCoef" : 0.1, "trait" : "line" },
		/* 73 */ { "x" : 551.4545454545455, "y" : -123, "bCoef" : 0.1, "trait" : "line" },
		/* 74 */ { "x" : 557.4545454545455, "y" : -123, "bCoef" : 0.1, "trait" : "line" },
		/* 75 */ { "x" : -381, "y" : -240, "bCoef" : 0.1, "trait" : "line" },
		/* 76 */ { "x" : -381, "y" : -245, "bCoef" : 0.1, "trait" : "line" },
		/* 77 */ { "x" : 381, "y" : 241, "bCoef" : 0.1, "trait" : "line" },
		/* 78 */ { "x" : 381, "y" : 246, "bCoef" : 0.1, "trait" : "line" },
		/* 79 */ { "x" : 381, "y" : -240, "bCoef" : 0.1, "trait" : "line" },
		/* 80 */ { "x" : 381, "y" : -246, "bCoef" : 0.1, "trait" : "line" },
		
		/* 81 */ { "x" : 553, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "vis" : false },
		/* 82 */ { "x" : 553, "y" : -80, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [700,-80 ], "vis" : false },
		/* 83 */ { "x" : 553, "y" : 80, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "pos" : [700,80 ], "vis" : false },
		/* 84 */ { "x" : 553, "y" : 240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "vis" : false },
		/* 85 */ { "x" : -553, "y" : 80, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [-700,80 ], "vis" : false },
		/* 86 */ { "x" : -553, "y" : 240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "vis" : false },
		/* 87 */ { "x" : -553, "y" : -80, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "pos" : [-700,-80 ], "vis" : false },
		/* 88 */ { "x" : -553, "y" : -240, "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "color" : "F8F8F8", "vis" : false },
		
		/* 89 */ { "x" : 0, "y" : 80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 90 */ { "x" : 0, "y" : -80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 91 */ { "x" : 0, "y" : 80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 92 */ { "x" : 0, "y" : -80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 93 */ { "x" : 0, "y" : 80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		/* 94 */ { "x" : 0, "y" : -80, "bCoef" : 0.15, "trait" : "kickOffBarrier", "color" : "F8F8F8", "vis" : true, "curve" : 180 },
		
		/* 95 */ { "x" : 550.4041122595859, "y" : -200.94616210950306, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 96 */ { "x" : 549.7980682238663, "y" : 199.03758311824043, "bCoef" : 0.1, "trait" : "line", "color" : "F8F8F8", "curve" : 0 },
		/* 97 */ { "bCoef" : 0.1, "trait" : "line", "x" : -29.795012958911283, "y" : -20.93912742568665 },
		/* 98 */ { "bCoef" : 0.1, "trait" : "line", "x" : -29.795012958911283, "y" : 31.27988517935536 },
		/* 99 */ { "bCoef" : 0.1, "trait" : "line", "x" : -28.28766001773481, "y" : -20.93912742568665 },
		/* 100 */ { "bCoef" : 0.1, "trait" : "line", "x" : -28.28766001773481, "y" : 31.27988517935536 },
		/* 101 */ { "bCoef" : 0.1, "trait" : "line", "x" : -26.780307076558337, "y" : -20.93912742568665 },
		/* 102 */ { "bCoef" : 0.1, "trait" : "line", "x" : -26.780307076558337, "y" : 31.27988517935536 },
		/* 103 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -19.884252446627347 },
		/* 104 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -19.603134055412312 },
		/* 105 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -18.376899505450872 },
		/* 106 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -18.09578111423584 },
		/* 107 */ { "bCoef" : 0.1, "trait" : "line", "x" : -9.692071782440713, "y" : -22.200156837451356 },
		/* 108 */ { "bCoef" : 0.1, "trait" : "line", "x" : -9.692071782440713, "y" : -1.60456860215724 },
		/* 109 */ { "bCoef" : 0.1, "trait" : "line", "x" : -12.199424723617184, "y" : -21.20015683745136 },
		/* 110 */ { "bCoef" : 0.1, "trait" : "line", "x" : -12.199424723617184, "y" : -1.6045686021572436 },
		/* 111 */ { "bCoef" : 0.1, "trait" : "line", "x" : -11.706777664793625, "y" : -21.200156837451356 },
		/* 112 */ { "bCoef" : 0.1, "trait" : "line", "x" : -11.706777664793625, "y" : -3.60456860215724 },
		/* 113 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -1.796017152509699 },
		/* 114 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -1.514898761294666 },
		/* 115 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -3.303370093686169 },
		/* 116 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -3.022251702471136 },
		/* 117 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -3.303370093686169 },
		/* 118 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -3.022251702471136 },
		/* 119 */ { "bCoef" : 0.1, "trait" : "line", "x" : -30.245263374513467, "y" : -4.810723034862641 },
		/* 120 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.381437377877383, "y" : -4.529604643647605 },
		/* 121 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.66893456308036, "y" : -0.7852678652006166 },
		/* 122 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.109400980543205, "y" : 14.5772459087544 },
		/* 123 */ { "bCoef" : 0.1, "trait" : "line", "x" : -24.16158162190389, "y" : -1.5389443357888513 },
		/* 124 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.602048039366732, "y" : 13.82356943816616 },
		/* 125 */ { "bCoef" : 0.1, "trait" : "line", "x" : -25.66893456308036, "y" : 1.4757615465640896 },
		/* 126 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.109400980543205, "y" : 16.838275320519102 },
		/* 127 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.649675139219353, "y" : 16.292218141607947 },
		/* 128 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.475180269181443, "y" : 16.573336532822978 },
		/* 129 */ { "bCoef" : 0.1, "trait" : "line", "x" : -10.649675139219353, "y" : 14.784865200431476 },
		/* 130 */ { "bCoef" : 0.1, "trait" : "line", "x" : 14.228856739769679, "y" : 15.06598359164651 },
		/* 131 */ { "bCoef" : 0.1, "trait" : "line", "x" : -9.649675139219353, "y" : 14.031188729843237 },
		/* 132 */ { "bCoef" : 0.1, "trait" : "line", "x" : 14.475180269181443, "y" : 14.312307121058273 },
		/* 133 */ { "bCoef" : 0.1, "trait" : "line", "x" : 14.671898805794587, "y" : -3.0972156609807686 },
		/* 134 */ { "bCoef" : 0.1, "trait" : "line", "x" : 14.671898805794587, "y" : 17.49837257431335 },
		/* 135 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.164545864618114, "y" : -2.3435391903925336 },
		/* 136 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.164545864618114, "y" : 17.49837257431335 },
		/* 137 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.164545864618114, "y" : -2.3435391903925336 },
		/* 138 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.164545864618114, "y" : 14.483666691960407 },
		/* 139 */ { "bCoef" : 0.1, "trait" : "line", "x" : 11.657192923441642, "y" : -3.0972156609807686 },
		/* 140 */ { "bCoef" : 0.1, "trait" : "line", "x" : 11.657192923441642, "y" : 15.237343162548639 },
		/* 141 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.6055574921605151, "y" : -1.796017152509699 },
		/* 142 */ { "bCoef" : 0.1, "trait" : "line", "x" : 15.736209680946152, "y" : -2.514898761294666 },
		/* 143 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.6055574921605151, "y" : -3.303370093686169 },
		/* 144 */ { "bCoef" : 0.1, "trait" : "line", "x" : 15.736209680946152, "y" : -4.022251702471136 },
		/* 145 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.6055574921605151, "y" : -4.057046564274405 },
		/* 146 */ { "bCoef" : 0.1, "trait" : "line", "x" : 15.736209680946152, "y" : -4.775928173059372 },
		/* 147 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1553070765583469, "y" : -20.185450955098414 },
		/* 148 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1553070765583469, "y" : -0.5898627198042989 },
		/* 149 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1553070765583469, "y" : -20.185450955098414 },
		/* 150 */ { "bCoef" : 0.1, "trait" : "line", "x" : -1.1553070765583469, "y" : -0.5898627198042989 },
		/* 151 */ { "bCoef" : 0.1, "trait" : "line", "x" : 0.35204586461812626, "y" : -20.93912742568665 },
		/* 152 */ { "bCoef" : 0.1, "trait" : "line", "x" : 0.35204586461812626, "y" : -1.3435391903925336 },
		/* 153 */ { "bCoef" : 0.1, "trait" : "line", "x" : 1.8593988057945992, "y" : -20.93912742568665 },
		/* 154 */ { "bCoef" : 0.1, "trait" : "line", "x" : 1.8593988057945992, "y" : -1.3435391903925336 },
		/* 155 */ { "bCoef" : 0.1, "trait" : "line", "x" : -2.3592339627487515, "y" : -18.376899505450872 },
		/* 156 */ { "bCoef" : 0.1, "trait" : "line", "x" : 37.52822648766884, "y" : -18.09578111423584 },
		/* 157 */ { "bCoef" : 0.1, "trait" : "line", "x" : -2.3592339627487515, "y" : -19.884252446627347 },
		/* 158 */ { "bCoef" : 0.1, "trait" : "line", "x" : 37.52822648766884, "y" : -19.603134055412312 },
		/* 159 */ { "bCoef" : 0.1, "trait" : "line", "x" : -3.3592339627487515, "y" : -21.391605387803814 },
		/* 160 */ { "bCoef" : 0.1, "trait" : "line", "x" : 37.52822648766884, "y" : -21.11048699658878 },
		/* 161 */ { "bCoef" : 0.1, "trait" : "line", "x" : 24.46969292344166, "y" : -11.895009778627825 },
		/* 162 */ { "bCoef" : 0.1, "trait" : "line", "x" : 24.46969292344166, "y" : 18.49837257431335 },
		/* 163 */ { "bCoef" : 0.1, "trait" : "line", "x" : 25.977045864618134, "y" : -11.895009778627825 },
		/* 164 */ { "bCoef" : 0.1, "trait" : "line", "x" : 25.977045864618134, "y" : 18.49837257431335 },
		/* 165 */ { "bCoef" : 0.1, "trait" : "line", "x" : 27.484398805794577, "y" : -11.895009778627825 },
		/* 166 */ { "bCoef" : 0.1, "trait" : "line", "x" : 27.484398805794577, "y" : 18.49837257431335 },
		/* 167 */ { "bCoef" : 0.1, "trait" : "line", "x" : -2.245263374513467, "y" : -1.810723034862641 },
		/* 168 */ { "bCoef" : 0.1, "trait" : "line", "x" : 13.618562622122617, "y" : -1.5296046436476054 },
		/* 169 */ { "bCoef" : 0.1, "trait" : "line", "x" : -27.706777664793627, "y" : -2.200156837451356 },
		/* 170 */ { "bCoef" : 0.1, "trait" : "line", "x" : -27.706777664793627, "y" : 17.39543139784276 },
		/* 171 */ { "bCoef" : 0.1, "trait" : "line", "x" : -31.359233962748753, "y" : -21.391605387803814 },
		/* 172 */ { "bCoef" : 0.1, "trait" : "line", "x" : -8.471773512331161, "y" : -21.110486996588776 },
		/* 173 */ { "bCoef" : 0.1, "trait" : "line", "x" : -595, "y" : -238.96875, "color" : "54585b", "cGroup" : ["ball","red","blue" ], "cMask" : ["red","blue" ], "vis" : false },
		/* 174 */ { "bCoef" : 0.1, "trait" : "line", "x" : -595, "y" : 239.03125, "color" : "54585b", "cGroup" : ["ball","red","blue" ], "cMask" : ["red","blue" ], "vis" : false },
		/* 175 */ { "bCoef" : 0.1, "trait" : "line", "x" : 595, "y" : -238.96875, "color" : "54585b", "cGroup" : ["ball","red","blue" ], "cMask" : ["red","blue" ], "vis" : false },
		/* 176 */ { "bCoef" : 0.1, "trait" : "line", "x" : 595, "y" : 239.03125, "color" : "54585b", "cGroup" : ["ball","red","blue" ], "cMask" : ["red","blue" ], "vis" : false }

	],

	"segments" : [
		{ "v0" : 6, "v1" : 7, "curve" : 0, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "pos" : [-700,-80 ], "y" : -80 },
		{ "v0" : 7, "v1" : 8, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "x" : -590 },
		{ "v0" : 8, "v1" : 9, "curve" : 0, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "pos" : [-700,80 ], "y" : 80 },
		{ "v0" : 10, "v1" : 11, "curve" : 0, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "pos" : [700,-80 ], "y" : -80 },
		{ "v0" : 11, "v1" : 12, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "x" : 590 },
		{ "v0" : 12, "v1" : 13, "curve" : 0, "color" : "F8F8F8", "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "goalNet", "pos" : [700,80 ], "y" : 80 },
		
		{ "v0" : 2, "v1" : 3, "trait" : "kickOffBarrier" },
		{ "v0" : 3, "v1" : 4, "curve" : 180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.15, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 3, "v1" : 4, "curve" : -180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.15, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 4, "v1" : 5, "trait" : "kickOffBarrier" },
		
		{ "v0" : 14, "v1" : 15, "vis" : true, "color" : "F8F8F8", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -550 },
		{ "v0" : 16, "v1" : 17, "vis" : true, "color" : "F8F8F8", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -550 },
		{ "v0" : 18, "v1" : 19, "vis" : true, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "y" : 240 },
		{ "v0" : 20, "v1" : 21, "vis" : true, "color" : "F8F8F8", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 550 },
		{ "v0" : 22, "v1" : 23, "vis" : true, "color" : "F8F8F8", "bCoef" : 1.15, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 550 },
		{ "v0" : 24, "v1" : 25, "vis" : true, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 550, "y" : -240 },
		{ "v0" : 26, "v1" : 27, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "y" : -240 },
		
		{ "v0" : 28, "v1" : 29, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 30, "v1" : 31, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO","blueKO" ], "trait" : "kickOffBarrier" },
		
		{ "v0" : 38, "v1" : 39, "curve" : 0, "vis" : false, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -557.5 },
		{ "v0" : 40, "v1" : 41, "curve" : 0, "vis" : false, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -557.5 },
		{ "v0" : 42, "v1" : 43, "curve" : 0, "vis" : false, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 557.5 },
		{ "v0" : 44, "v1" : 45, "curve" : 0, "vis" : false, "color" : "F8F8F8", "bCoef" : 1, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 557.5 },
		
		{ "v0" : 48, "v1" : 49, "curve" : 0, "vis" : true, "color" : "FF0000", "bCoef" : 0.1, "trait" : "line", "x" : -550 },
		{ "v0" : 50, "v1" : 51, "curve" : 0, "vis" : true, "color" : "0925F3", "bCoef" : 0.1, "trait" : "line", "x" : 550 },
		{ "v0" : 54, "v1" : 53, "curve" : -90, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 57, "v1" : 56, "curve" : 90, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 60, "v1" : 59, "curve" : -90, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 62, "v1" : 61, "curve" : 90, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line" },
		{ "v0" : 65, "v1" : 66, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -381 },
		{ "v0" : 67, "v1" : 68, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : 123 },
		{ "v0" : 69, "v1" : 70, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : 123 },
		{ "v0" : 71, "v1" : 72, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : -123 },
		{ "v0" : 73, "v1" : 74, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -240, "y" : -123 },
		{ "v0" : 75, "v1" : 76, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : -381 },
		{ "v0" : 77, "v1" : 78, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 381 },
		{ "v0" : 79, "v1" : 80, "curve" : 0, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "x" : 381 },
		
		{ "v0" : 81, "v1" : 82, "vis" : false, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 553 },
		{ "v0" : 83, "v1" : 84, "vis" : false, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : 553 },
		{ "v0" : 85, "v1" : 86, "vis" : false, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -553 },
		{ "v0" : 87, "v1" : 88, "vis" : false, "color" : "F8F8F8", "bCoef" : 0, "cMask" : ["ball" ], "trait" : "ballArea", "x" : -553 },
		
		{ "v0" : 89, "v1" : 90, "curve" : -180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.15, "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
		{ "v0" : 93, "v1" : 94, "curve" : 180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.15, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
		
		{ "curve" : 180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 55, "v1" : 52 },
		{ "curve" : 180, "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 96, "v1" : 95 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 97, "v1" : 98 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 99, "v1" : 100 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 101, "v1" : 102 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 103, "v1" : 104 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 105, "v1" : 106 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 107, "v1" : 108 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 109, "v1" : 110 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 111, "v1" : 112 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 113, "v1" : 114 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 115, "v1" : 116 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 117, "v1" : 118 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 119, "v1" : 120 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 121, "v1" : 122 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 123, "v1" : 124 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 125, "v1" : 126 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 127, "v1" : 128 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 129, "v1" : 130 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 131, "v1" : 132 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 133, "v1" : 134 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 135, "v1" : 136 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 137, "v1" : 138 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 139, "v1" : 140 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 141, "v1" : 142 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 143, "v1" : 144 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 145, "v1" : 146 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 147, "v1" : 148 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 149, "v1" : 150 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 151, "v1" : 152 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 153, "v1" : 154 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 155, "v1" : 156 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 157, "v1" : 158 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 159, "v1" : 160 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 161, "v1" : 162 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 163, "v1" : 164 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 165, "v1" : 166 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 167, "v1" : 168 },
		{ "vis" : true, "color" : "F8F8F8", "bCoef" : 0.1, "trait" : "line", "v0" : 171, "v1" : 172 },
		
		{ "vis" : false, "bCoef" : 0.1, "v0" : 173, "v1" : 174, "bias" : 1, "color" : "54585b", "cMask" : ["red","blue" ], "x" : -595 },
		{ "vis" : false, "bCoef" : 0.1, "v0" : 175, "v1" : 176, "bias" : -1, "color" : "54585b", "cMask" : ["red","blue" ], "x" : 595 }

	],

	"goals" : [
		{ "p0" : [-556.25,-80 ], "p1" : [-556.25,80 ], "team" : "red" },
		{ "p0" : [556.25,80 ], "p1" : [556.25,-80 ], "team" : "blue" }

	],

	"discs" : [
		{ "radius" : 5, "pos" : [-550,80 ], "color" : "FFFFFF", "trait" : "goalPost", "y" : 80 },
		{ "radius" : 5, "pos" : [-550,-80 ], "color" : "FFFFFF", "trait" : "goalPost", "y" : -80, "x" : -560 },
		{ "radius" : 5, "pos" : [550,80 ], "color" : "FFFFFF", "trait" : "goalPost", "y" : 80 },
		{ "radius" : 5, "pos" : [550,-80 ], "color" : "FFFFFF", "trait" : "goalPost", "y" : -80 },
		
		{ "radius" : 3, "invMass" : 0, "pos" : [-550,240 ], "color" : "D100FF", "bCoef" : 0.1, "trait" : "line" },
		{ "radius" : 3, "invMass" : 0, "pos" : [-550,-240 ], "color" : "D100FF", "bCoef" : 0.1, "trait" : "line" },
		{ "radius" : 3, "invMass" : 0, "pos" : [550,-240 ], "color" : "D100FF", "bCoef" : 0.1, "trait" : "line" },
		{ "radius" : 3, "invMass" : 0, "pos" : [550,240 ], "color" : "D100FF", "bCoef" : 0.1, "trait" : "line" },
		
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
		{ "normal" : [0,1 ], "dist" : -240, "bCoef" : 1, "trait" : "ballArea", "vis" : false, "curve" : 0 },
		{ "normal" : [0,-1 ], "dist" : -240, "bCoef" : 1, "trait" : "ballArea" },
		
		{ "normal" : [0,1 ], "dist" : -270, "bCoef" : 0.1 },
		{ "normal" : [0,-1 ], "dist" : -270, "bCoef" : 0.1 },
		{ "normal" : [1,0 ], "dist" : -620, "bCoef" : 0.1 },
		{ "normal" : [-1,0 ], "dist" : -620, "bCoef" : 0.1 },
		
		{ "normal" : [1,0 ], "dist" : -620, "bCoef" : 0.1, "trait" : "ballArea", "vis" : false, "curve" : 0 },
		{ "normal" : [-1,0 ], "dist" : -620, "bCoef" : 0.1, "cMask" : ["ball" ], "cGroup" : ["red","blue" ], "trait" : "ballArea", "vis" : false, "curve" : 0 }

	],

	"traits" : {
		"ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
		"goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
		"goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ] },
		"line" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["" ] },
		"kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }

	},

	"playerPhysics" : {
		"bCoef" : 0.35,
		"acceleration" : 0.116,
		"kickingAcceleration" : 0.083,
		"kickStrength" : 5.05

	},

	"ballPhysics" : {
		"radius" : 6.5,
		"bCoef" : 0.46,
		"invMass" : 1.47,
		"color" : "FFB600"

	},

	"joints" : [
		

	],

	"redSpawnPoints" : [
		

	],

	"blueSpawnPoints" : [
		

	],

	"cameraWidth" : 0,

	"cameraHeight" : 0,

	"maxViewWidth" : 0,

	"cameraFollow" : "ball",

	"canBeStored" : false,

	"kickOffReset" : "partial"
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
  }`;

var rsMap =
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

let replayWebHook = "https://discord.com/api/webhooks/1277913200603693077/ZtrUWWkYkK4VBDInJNT8pwvqAQJbU5yWCfNljmrl3hGfiGWSDUONWu390_zi7uUBaBAS";
let goalWebHook = "https://discord.com/api/webhooks/1277908104809418773/cDwq08w6EwtGq3fB4f6J3u6aqK8k-91rPZosnGPabUuZ090RCrTjlZffJ8hMxi80cVbR";
let chatWebHook = "https://discord.com/api/webhooks/1227802111459459072/Db2vLhw6Mxcp0Xu9aNVYl684ANho_4Nuqz-roujkQQPYhbjG_PqENhDOgGnnqE5R4P4n";
let joinWebHook = "https://discord.com/api/webhooks/1276151930992726026/2vQC7-yl4Di-af4rChbGvAbpeqmDkarCzc3OcnXuyPJTl7Adx7ZvcgIjSxnIkJIzgLlj";
let adminWebHook = "https://discord.com/api/webhooks/1228918067854311544/marqckLcQDbMX9GUXCzp3rMfbkEYlUTdzS4vZHoXlrz34FL-K2i06pUJiN6TCOFGztVe";
let toxicWebHook = "https://discord.com/api/webhooks/1276151787337945181/ve9uXH0PwmBqpTipUtryztv4r0t9OiMl3ka2M3WlVLqnnsY4M75I1SASZq3FQ96axqQ9";
let statsWebHook = "https://discord.com/api/webhooks/1277901477108518965/WpHTrRJgBxZzZ11R8SxNyPl8GRgtvHSmaM7cti_jRZqbA4dlSVPGeZ6nMj1FPeVi9Siw";
//let playerWebHook = "https://discord.com/api/webhooks/1241969878639050827/bjWpE3PLFtdFX4HPWkXuY40qRxzDADOF4-2VycPw8HJaqbHVclwVNDVLScKs1jBunB8_";
let spamWebHook = "https://discord.com/api/webhooks/1277901158278631448/8DlIE7GMTGpzfVzcL2iyF11hNb-f9q4clLzfKNmeutK_AFrEw3CyiivWZhbXGBi07xFW";
let countWebHook = "https://discord.com/api/webhooks/1277897297404891292/_vPwyPhMQea3YfAKPMqju3DXzne8STaE5d02dNH1dlHNFVj9MetkSBo4vO9aTYU2uUqY";


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

// Define the clear bans function
function clearBans() {
  room.clearBans();
  room.sendChat("All Bans removed!");
  console.log(`All Bans removed!`);
  banList = [];
}

// Set the interval to clear bans every 10 minutes (600000 milliseconds)
setInterval(clearBans, 300000);

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
    room.sendAnnouncement(centerText("🏆 Red team won! | Win Streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else if (winner == Team.BLUE) {
    streak = 1;
    room.sendAnnouncement(centerText("🏆 Blue team won! | Win streak(s):") + streak + " 🏆", null, 0xfdc43a);
  } else {
    streak = 0;
    room.sendAnnouncement("💤 ʟɪᴍɪᴛ ʀᴇᴀᴄʜᴇᴅ");
  }

  let redTeamPlayers = room.getPlayerList().filter(player => player.team == Team.RED);
  let blueTeamPlayers = room.getPlayerList().filter(player => player.team == Team.BLUE);

  if (winner == Team.SPECTATORS) {
    redTeamPlayers.concat(blueTeamPlayers).forEach(player => {
      var currentPlayer = getPlayerById(player.id);
      currentPlayer.stars = (currentPlayer.stars || 0) + 1;
      sendDataToServer(currentPlayer);
    });
  } else {
    redTeamPlayers.forEach(player => {
      var currentPlayer = getPlayerById(player.id);
      if (winner == Team.RED) {
        currentPlayer.stars = (currentPlayer.stars || 0) + 1;
      } else {
        if (currentPlayer.stars > 0) {
          currentPlayer.stars -= 1;
        }
      }
      sendDataToServer(currentPlayer);
    });

    blueTeamPlayers.forEach(player => {
      var currentPlayer = getPlayerById(player.id);
      if (winner == Team.BLUE) {
        currentPlayer.stars = (currentPlayer.stars || 0) + 1;
      } else {
        if (currentPlayer.stars > 0) {
          currentPlayer.stars -= 1;
        }
      }
      sendDataToServer(currentPlayer);
    });
  }

  function formatPlayerList(players) {
    return players.map(player => player.name + " (" + getPlayerById(player.id).stars + " stars)").join(" | ");
  }

  function chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  let redTeamPlayerNames = chunkArray(redTeamPlayers, 4).map(chunk => chunk.map(player => player.name + " (" + getPlayerById(player.id).stars + " stars)").join(" | "));
  let blueTeamPlayerNames = chunkArray(blueTeamPlayers, 4).map(chunk => chunk.map(player => player.name + " (" + getPlayerById(player.id).stars + " stars)").join(" | "));

  // setTimeout(() => {
  //   room.sendAnnouncement("───────────────────── 🇸​🇹​🇦​🇷​🇸​ 🇷​🇦​🇮​🇸​🇪​ ─────────────────────", null, 0x5CF49C, "small");

  //   if (winner == Team.RED) {
  //     redTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟥 RED TEAM", null, 0x5CF49C, "small"));
  //     blueTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟦 BLUE TEAM", null, 0x5CF49C, "small"));
  //   } else if (winner == Team.BLUE) {
  //     redTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟥 RED TEAM", null, 0x5CF49C, "small"));
  //     blueTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟦 BLUE TEAM", null, 0x5CF49C, "small"));
  //   } else {
  //     redTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟥 RED TEAM", null, 0x5CF49C, "small"));
  //     blueTeamPlayerNames.forEach(line => room.sendAnnouncement("   "+ line + " - 🟦 BLUE TEAM", null, 0x5CF49C, "small"));
  //   }

  //   room.sendAnnouncement("─────────────────────────────────────────────────", null, 0x5CF49C, "small");
  // }, 2000);

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

// setInterval(() => {
//   var tableau = [];
//   if (statNumber % 5 == 0) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
//         try {
//           let item = JSON.parse(localStorage.getItem(key));
//           if (item && item[Ss.NK] !== undefined && item[Ss.GA] !== undefined) {
//             tableau.push([item[Ss.NK], item[Ss.GA]]);
//           }
//         } catch (e) {
//           console.error("Error parsing JSON for key:", key, e);
//         }
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Matches Played> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 1) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
//         try {
//           let item = JSON.parse(localStorage.getItem(key));
//           if (item && item[Ss.NK] !== undefined && item[Ss.GA] !== undefined) {
//             tableau.push([item[Ss.NK], item[Ss.GA]]);
//           }
//         } catch (e) {
//           console.error("Error parsing JSON for key:", key, e);
//         }
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Victories> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 2) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
//         try {
//           let item = JSON.parse(localStorage.getItem(key));
//           if (item && item[Ss.NK] !== undefined && item[Ss.GA] !== undefined) {
//             tableau.push([item[Ss.NK], item[Ss.GA]]);
//           }
//         } catch (e) {
//           console.error("Error parsing JSON for key:", key, e);
//         }
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Gols> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 3) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
//         try {
//           let item = JSON.parse(localStorage.getItem(key));
//           if (item && item[Ss.NK] !== undefined && item[Ss.GA] !== undefined) {
//             tableau.push([item[Ss.NK], item[Ss.GA]]);
//           }
//         } catch (e) {
//           console.error("Error parsing JSON for key:", key, e);
//         }
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "Assistance> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   if (statNumber % 5 == 4) {
//     Object.keys(localStorage).forEach(function (key) {
//       if (!["player_name", "view_mode", "geo", "avatar", "player_auth_key"].includes(key)) {
//         try {
//           let item = JSON.parse(localStorage.getItem(key));
//           if (item && item[Ss.NK] !== undefined && item[Ss.GA] !== undefined) {
//             tableau.push([item[Ss.NK], item[Ss.GA]]);
//           }
//         } catch (e) {
//           console.error("Error parsing JSON for key:", key, e);
//         }
//       }
//     });
//     if (tableau.length < 5) {
//       return false;
//     }
//     tableau.sort(function (a, b) {
//       return b[1] - a[1];
//     });
//     room.sendChat(
//       "CS> #1 " +
//         tableau[0][0] +
//         ": " +
//         tableau[0][1] +
//         " #2 " +
//         tableau[1][0] +
//         ": " +
//         tableau[1][1] +
//         " #3 " +
//         tableau[2][0] +
//         ": " +
//         tableau[2][1] +
//         " #4 " +
//         tableau[3][0] +
//         ": " +
//         tableau[3][1] +
//         " #5 " +
//         tableau[4][0] +
//         ": " +
//         tableau[4][1]
//     );
//   }
//   statNumber++;
// }, statInterval * 60 * 1000);

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

  setTimeout(() => {
    checkBanStatus(player);
  }, 500);

  var id = player.id;
  var auth = player.auth;
  var playername = player.name;

  checkPlayerInDatabase(auth, function(databaseAuth, databaseStars, databaseGoals) {
      if (databaseAuth) {
          addNewPlayerById(id, databaseAuth, databaseStars, databaseGoals);
          playersbintang[id].id = id;
          // console.log("Player " + player.name + " rejoined. Stars: " + databaseStars + " Goals: " + databaseGoals);
          // setTimeout(() => {
          //     room.sendAnnouncement("Welcome " + player.name + ", You have " + databaseStars + " stars.", player.id, 0x5CF49C, "small");
          // }, 3500);
      } else {
          addNewPlayerById(id, auth, 10, 0);
          // console.log("Player " + player.name + " joined. Stars: 10 Goals: 0");
          // setTimeout(() => {
          //     room.sendAnnouncement("Welcome " + player.name + ", You got 10 stars.", player.id, 0x5CF49C, "small");
          // }, 3500);
      }
      updatePlayerName(auth, playername);
  });

  checkPlayerLoginStatus(player);
  getAdminStatus(player.auth, function(adminStatus) {
    if (adminStatus === 'yes') {
      room.setPlayerAdmin(player.id, true);
    } 
  });

  updateAdmins();
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] [conn:${player.conn}] [auth:${player.auth}] joined pub room.\``);
  checkAndKickPlayer(player);
  createPlayer(player);

  // if (specialAuths.includes(player.auth) || specialConns.includes(player.conn)) {
  //   room.setPlayerAdmin(player.id, true);
  // }

  extendedP.push([player.id, player.auth, player.conn, false, 0, 0, false]);
  // updateRoleOnPlayerIn();
  // room.sendAnnouncement("👋🏼 ᴡᴇʟᴄᴏᴍᴇ, " + player.name + "!", null, 0x5ee7ff, "bold");
  const text = [
    "╔═══════════════════════════════════════════════════╗",
    "║                                                      𝗥𝗦𝗜.𝗖𝗢𝗠𝗠𝗨𝗡𝗜𝗧𝗬                                                        ║",   
    "║                                         ᴘᴜʙʟɪᴄ ꜱᴄʀɪᴍ, ᴛᴏᴜʀɴᴀᴍᴇɴᴛ ʀᴏᴏᴍ                                           ║",
    "╠═══════════════════════════════════════════════════╣",
    "║                                                            !ᴀꜰᴋ   !ʙʙ                                                                ║",
    "╚═══════════════════════════════════════════════════╝"
  ];

  setTimeout(() => {
    text.forEach(line => {
        room.sendAnnouncement(line, player.id, 0x5CF49C, "normal");
    });
  }, 2700); 

  // setTimeout(() => {
  //   room.sendAnnouncement("use ( t ) before text if you want to send message", player.id, 0xedc021, "normal");
  //   room.sendAnnouncement("example: t hello", player.id, 0xedc021, "normal");
  // }, 3200);

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
          message = `\`🟢[rsi pub] ${currentPlayerCount} players (${adminCount} admin)\n${playerNames}\``;
      } else {
          message = `\`🟢[rsi pub] ${currentPlayerCount} players\n${playerNames}\``;
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

function updateAdmins() {
  var players = room.getPlayerList().filter(p => p.id != 0);
  if (players.length == 0) return;
  if (players.find(p => p.admin == true) != null) return;
  room.setPlayerAdmin(players[0].id, true);
}

room.onPlayerLeave = function (player) {
  updateAdmins();
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left pub room.\``);
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
  sendWebhook(chatWebHook, `\`💬 [pubroom] ${player.name} [${player.id}]: ${message}\``);
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
          //sendWebhook(playerWebHook, `\`🧊 [soccer] ${players[i].name} was frozen by ${player.name}\``);
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

  if (message.startsWith("!login ")) {
    let code = message.substring(7).trim(); // Extract the code
    
    getLoginCodeFromDatabase(code, function(retrievedCode, username, accountId) {
        if (retrievedCode) {
            var currentPlayer = getPlayerById(player.id); // Retrieve the current player
            
            checkAuthInUsersTable(currentPlayer.auth, function(exists) {
                if (exists) {
                    room.sendAnnouncement(`You have successfully logged in as ${username}`, player.id);
                    updateLoginStatusInDatabase(accountId, "yes"); // Update login status to "yes"
                    sendLoginCodeToUsersTable(currentPlayer, code); // Send current player and login code to users table
                } else {
                    room.sendAnnouncement("Your data is not available, please play 1x and use !login again.", player.id);
                }
            });
        } else {
            room.sendAnnouncement(`Invalid login code, Please try again.`, player.id);
        }
    });

    return false; // Prevent the message from appearing in chat
  }

  if (message.startsWith("!logout")) {
    let currentPlayer = getPlayerById(player.id);

    if (currentPlayer) {
        logoutPlayer(currentPlayer);
    }

    return false; // Prevent the message from appearing in chat
  }

  // if (message.startsWith('!addstar')) {
  //   if (player.admin) {
  //     const args = message.split(' ');
  //     if (args.length === 3 && args[1].startsWith('#')) {
  //       const targetPlayerID = parseInt(args[1].substring(1)); // Remove the '#' before parsing
  //       const numberOfStars = parseInt(args[2]);
  //       handleAddStar(player, targetPlayerID, numberOfStars);
  //     } else {
  //       room.sendAnnouncement(`Usage: !addstar #<playerID> <numberOfStars>`, player.id, 0xff0000);
  //     }
  //   }
  //   return false; // prevent the chat message from being shown to everyone
  // }

  // // Command to delete stars from a player
  // if (message.startsWith('!delstar')) {
  //   if (player.admin) {
  //     const args = message.split(' ');
  //     if (args.length === 3 && args[1].startsWith('#')) {
  //       const targetPlayerID = parseInt(args[1].substring(1)); // Remove the '#' before parsing
  //       const numberOfStars = parseInt(args[2]);
  //       handleDelStar(player, targetPlayerID, numberOfStars);
  //     } else {
  //       room.sendAnnouncement(`Usage: !delstar #<playerID> <numberOfStars>`, player.id, 0xff0000);
  //     }
  //   }
  //   return false; // prevent the chat message from being shown to everyone
  // }

  // Command to check a player's star count
  if (message.startsWith('!cekstar')) {
    if (player.admin) {
      const args = message.split(' ');
      if (args.length === 2 && args[1].startsWith('#')) {
        const targetPlayerID = parseInt(args[1].substring(1)); // Remove the '#' before parsing
        handleCekStar(player, targetPlayerID);
      } else {
        room.sendAnnouncement(`Usage: !cekstar #<playerID>`, player.id, 0xff0000);
      }
    }
    return false; // prevent the chat message from being shown to everyone
  }

  function handleAddStar(player, playerId, numberOfStars) {
    var currentPlayer = getPlayerById(playerId);
    if (currentPlayer) {
      currentPlayer.stars = (currentPlayer.stars || 0) + numberOfStars;
      sendDataToServer(currentPlayer);
      room.sendAnnouncement(`target has been awarded ${numberOfStars} stars. Total stars: ${currentPlayer.stars}`, player.id, 0xffffff, "small");
    } else {
      room.sendAnnouncement(`Player not found.`, player.id, 0xff0000);
    }
  }
  
  function handleDelStar(player, playerId, numberOfStars) {
    var currentPlayer = getPlayerById(playerId);
    if (currentPlayer) {
      currentPlayer.stars = Math.max((currentPlayer.stars || 0) - numberOfStars, 0);
      sendDataToServer(currentPlayer);
      room.sendAnnouncement(`target has lost ${numberOfStars} stars. Total stars: ${currentPlayer.stars}`, player.id, 0xffffff,"small");
    } else {
      room.sendAnnouncement(`Player not found or no stars to remove.`, player.id, 0xff0000);
    }
  }

  function handleCekStar(player, playerId) {
    var currentPlayer = getPlayerById(playerId);
    if (currentPlayer) {
      room.sendAnnouncement(`target has ${currentPlayer.stars || 0} stars.`, player.id, 0x00ff00, "small");
    } else {
      room.sendAnnouncement(`Player not found.`, player.id, 0xff0000);
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

  if (message.startsWith("!subs ") || message.startsWith("!SUBS ")) {
    var remainingMessage = message.substring(6).trim();
    var parts = remainingMessage.split(" ");
    var playerout = parts[0];
    var playerin = parts.slice(1).join(" ");
    
    var playerTeam = (player.team === 1) ? "Red team" : "Blue team";
    var playerName = player.name;
    var teamEmoji = (player.team === 1) ? "🟥" : "🟦";
    
    sendWebhook(goalWebHook, `\`[SUBS REQUEST ${teamEmoji}]\` Captain ${playerName} request subs OUT: \`${playerout}\` IN: \`${playerin}\` `);
    room.sendAnnouncement(`[SUBS REQUEST ${teamEmoji}] Captain ${playerName} request (Player out: ${playerout})  (Player in: ${playerin})`, null, 0xffffe0, "normal", 1);
  
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
    player.admin ? room.sendAnnouncement("[📄] ᴀᴅᴍɪɴ ᴄᴏᴍᴍᴀɴᴅꜱ : !rs, !futsal, !pen, !clearbans, !setpassword", player.id, 0x309d2b, "bold") : null;
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
  }
  //  else if (["!afk"].includes(message[0].toLowerCase())) {
  //   if (players.length != 1 && player.team != Team.SPECTATORS) {
  //     if (player.team == Team.RED && streak > 0 && room.getScores() == null) {
  //       room.setPlayerTeam(player.id, Team.SPECTATORS);
  //     } else {
  //       room.sendAnnouncement("ʏᴏᴜ ᴄᴀɴ'ᴛ ɢᴏ ᴀꜰᴋ ᴡʜɪʟᴇ ᴘʟᴀʏɪɴɢ!", player.id, 0xff7b08);
  //       return false;
  //     }
  //   } else if (players.length == 1 && !getAFK(player)) {
  //     room.setPlayerTeam(player.id, Team.SPECTATORS);
  //   }
  //   setAFK(player, !getAFK(player));
  //   room.sendAnnouncement(player.name + (getAFK(player) ? " ɪꜱ ᴀꜰᴋ!" : " ɪꜱ ɴᴏᴡ ᴏɴʟɪɴᴇ!"), null, getAFK(player) ? 0xff7b08 : 0x8fff8f);
  //   room.sendAnnouncement((getAFK(player) ? "ᴛʏᴘᴇ !ᴀꜰᴋ ᴛᴏ ʀᴇᴛᴜʀɴ" : ""), player.id, getAFK(player) ? 0xff7b08 : 0x8fff8f);
  //   getAFK(player) ? updateRoleOnPlayerOut() : updateRoleOnPlayerIn();
  //   localStorage.getItem(getAuth(player)) ? (stats = JSON.parse(localStorage.getItem(getAuth(player)))) : (stats = [0, 0, 0, 0, "0.00", 0, 0, 0, 0, "0.00", "player"]);
  //   setTimeout(() => {
  //     if (getAFK(player) && stats[Ss.RL] != "vip") {
  //       room.kickPlayer(player.id, "𝗔𝗙𝗞 𝘁𝗶𝗺𝗲𝗼𝘂𝘁", false);
  //     }
  //   }, 30 * 60 * 1000);
  //   return false;
  // } 
  else if (["!afks", "!afklist"].includes(message[0].toLowerCase())) {
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
            //sendWebhook(playerWebHook, `\`💬 [soccer] ${room.getPlayer(Number.parseInt(message[2])).name} was muted for ${timeOut / 60000} minutes by ${player.name}\``);
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
            //sendWebhook(playerWebHook, `\`💬 [soccer] ${room.getPlayer(Number.parseInt(message[1])).name} was muted for 3 minutes by ${player.name}\``);
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
    room.sendAnnouncement("List Map RSI : Real Soccer [!rs], Futsal [!futsal]", player.id, 0xffffff, "normal");
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
  } else if (["!rs"].includes(message[0].toLowerCase())) {
    if (player.admin) {
        penKick = false;
        console.log(`penKick = false`);
        room.stopGame();
        loadMap(rsMap);
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
  } else if (["!pen"].includes(message[0].toLowerCase())) {
      if (player.admin) {
          penKick = true;
          console.log(`penKick = true`);
          room.stopGame();
          loadMap(penMap);
          // room.startGame();
      } 
  } else if (["!futsal"].includes(message[0].toLowerCase())) {
      if (player.admin) {
          penKick = false;
          console.log(`penKick = true`);
          room.stopGame();
          loadMap(practiceMap);
          room.setTimeLimit(5);
          // room.startGame();
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
  // if (localStorage.getItem(getAuth(player))) {
  //   stats = JSON.parse(localStorage.getItem(getAuth(player)));
  //   var announcement = "";
  //   var chatColor = "";

  //   if (player.admin == true) {
  //     announcement += "[💠admin] ";
  //     chatColor = "0x99ffff";
  //   } else {
  //     announcement += "[💠player] "; //chat user dan admin
  //     chatColor = "0xEDEDED";
  //   }

  //   announcement += player.name + ":  " + originalMessage;
  //   room.sendAnnouncement(announcement, null, chatColor);
  //   return false;
  // } else {
  //   room.sendAnnouncement(`❌ ${player.name}: ${originalMessage}`, null, 0xabaea7);
  //   return false;
  // }

  var currentPlayer = getPlayerById(player.id);
  var stars = currentPlayer.stars;
  var announcement = "";
  var chatColor = "";

  if (player.admin == true) {
    announcement = "[🌐Admin|";
    chatColor = "0x99ffff";
  } else {
    announcement = "[💠Player|";
    chatColor = "0xB6B6B6";
  } 

  getUsernameChat(currentPlayer.auth, stars, function(username) {
    if (username) {
      announcement += "" + username + "] "; 
    } else {
      announcement = "[Guest] ";  
      chatColor = "0xe7e7e7";
    }

    announcement += player.name + ": " + originalMessage;
    room.sendAnnouncement(announcement, null, parseInt(chatColor));
  });

  return false;
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

  room.sendAnnouncement(centerText("🥅 KICK OFF 🥅"), null, Cor.White, "bold");
  room.sendAnnouncement(centerText("Game duration: " + gameTime + " minutes"), null, 0x2ef55d, "bold");
//   room.sendAnnouncement(centerText("RSI FUT COPA AMERICA"), null, 0x5ee7ff);
  room.startRecording();
  sendWebhook(goalWebHook, `\`𝙆𝙄𝘾𝙆 𝙊𝙁𝙁\` - \`${gameTime} minutes\``);
    
  if(freeze.length > 0){
    freeze = [];
  }

};

room.onGameStop = function (byPlayer) {
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

const originalDiscPositions = {
  9: { x: -558.5, y: 253.5 },
  10: { x: -558.5, y: 253.5 },
  11: { x: -558.5, y: 253.5 },
  12: { x: -558.5, y: 253.5 },
  13: { x: -558.5, y: 253.5 },
  14: { x: -558.5, y: 253.5 },
  15: { x: -558.5, y: 253.5 },
  16: { x: -558.5, y: 253.5 },
  17: { x: -558.5, y: 253.5 },
  18: { x: -558.5, y: 253.5 },
  19: { x: -558.5, y: 253.5 },
  20: { x: -558.5, y: 253.5 },

  21: { x: -558.5, y: 253.5 },
  22: { x: -558.5, y: 253.5 },
  23: { x: -558.5, y: 253.5 },
  24: { x: -558.5, y: 253.5 },
  25: { x: -558.5, y: 253.5 },
  26: { x: -558.5, y: 253.5 },
  27: { x: -558.5, y: 253.5 },
  28: { x: -558.5, y: 253.5 },
  29: { x: -558.5, y: 253.5 },
  30: { x: -558.5, y: 253.5 }
};

// Function to teleport discs to their specific coordinates
function teleportDiscs() {
  var ballPosition = room.getBallPosition();
  var teleportX = ballPosition.x < 0 ? -550 : 550;
  var teleportY = -80;
  var teleportXdua = ballPosition.x < 0 ? -550 : 550;
  var teleportYdua = 80;

  // Set properties for each disc with specific colors
  room.setDiscProperties(9, { x: teleportX, y: teleportY, xspeed: 1, yspeed: 0, radius: 5.2, color: 0xFE4141 }); // red
  room.setDiscProperties(10, { x: teleportX, y: teleportY, xspeed: 1, yspeed: 1, radius: 5.2, color: 0xF43C33 }); // green
  room.setDiscProperties(11, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 0, radius: 5.2, color: 0xF7726B }); // sky blue
  room.setDiscProperties(12, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 1, radius: 5.2, color: 0xA0160F }); // pink
  room.setDiscProperties(13, { x: teleportX, y: teleportY, xspeed: 0, yspeed: -1, radius: 5.2, color: 0xC6605B }); // yellow
  room.setDiscProperties(14, { x: teleportX, y: teleportY, xspeed: -1, yspeed: 2, radius: 5.2, color: 0xEC2D50 }); // red
  room.setDiscProperties(15, { x: teleportXdua, y: teleportYdua, xspeed: 1, yspeed: 0, radius: 5.2, color: 0x4463D4 }); // green
  room.setDiscProperties(16, { x: teleportXdua, y: teleportYdua, xspeed: 1, yspeed: 1, radius: 5.2, color: 0x87CEEB }); // sky blue
  room.setDiscProperties(17, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 0, radius: 5.2, color: 0x0C00FF }); // pink
  room.setDiscProperties(18, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 1, radius: 5.2, color: 0x001597 }); // yellow
  room.setDiscProperties(19, { x: teleportXdua, y: teleportYdua, xspeed: 0, yspeed: -1, radius: 5.2, color: 0x3A4275 }); // red
  room.setDiscProperties(20, { x: teleportXdua, y: teleportYdua, xspeed: -1, yspeed: 2, radius: 5.2, color: 0x18CACC }); // green
}

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

        room.setDiscProperties(10 + i, {
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

// Function to reset discs to their original positions
function resetDiscs() {
  for (const discId in originalDiscPositions) {
    const pos = originalDiscPositions[discId];
    room.setDiscProperties(parseInt(discId), { x: pos.x, y: pos.y, xspeed: 0, yspeed: 0, radius: 0 });
  }
}

let previousChoice = -1;

room.onTeamGoal = function (team) {

  var scoringTeam = team;
  var scoringPlayerId = lastPlayersTouched[0].id; // Assuming lastPlayersTouched is defined somewhere
  
  // Find the player who scored by matching their ID
  var scoringPlayer = room.getPlayerList().find(p => p.id === scoringPlayerId);
  
  if (scoringPlayer) {
    var scoringPlayers = room.getPlayerList().filter(p => p.team === scoringTeam);
  
    // Check if it's not an own goal and there are more than 1 player involved in scoring
    if (scoringPlayer.team === scoringTeam && scoringPlayers.length > 1) {
      var currentPlayer = getPlayerById(scoringPlayer.id);
      if (currentPlayer) {
        currentPlayer.goals += 1;
        console.log(scoringPlayer.name + " has scored! Total Goals: " + currentPlayer.goals);
        sendGoalsToServer(currentPlayer);
      }
    } else {
      if (scoringPlayer.team !== scoringTeam) {
        console.log(scoringPlayer.name + " owngoal.");
      } else if (scoringPlayers.length <= 1) {
        console.log("Goal by " + scoringPlayer.name + " 1v1 not counted.");
      }
    }
  }

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

  // function getNewChoice(previous) {
  //   return previous === 0 ? 1 : 0;
  // }
  // let randomChoice = getNewChoice(previousChoice);
  // if (randomChoice === 0) {
  //   teleportDiscs();
  // } else {
  //   teleportDiscsfire();
  // }
  // previousChoice = randomChoice;
  // setTimeout(resetDiscs, 2000);

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
      // room.sendAnnouncement("👀 [ᴄᴏᴍᴍᴇɴᴛᴀᴛᴏʀ]: " + frasegol + "" + lastPlayersTouched[0].name + "", null, 0xffffe0, "normal");
      avatarCelebration(goalMaker, "⚽", "🎯");
      
      sendWebhook(goalWebHook, `\`[GOAL]\` ** Scorer: ** \`${lastPlayersTouched[0].name}\` ** Assist: ** \`${lastPlayersTouched[1].name}\` ** Menit: ** \`${goalTime}\` ** Scores ** \`🟥 ${scores.red} - ${scores.blue} 🟦\``);
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
  form.append("file", new File([room.stopRecording()], `PUB-ROOM-1.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

setInterval(function () {
  room.sendAnnouncement("🔊 Join our Discord. https://discord.gg/pm55tVsQMX ", null, 0x5ee7ff, "small", 0);
  // setTimeout(function () {
  //   room.sendAnnouncement("⚽ RSI League Season 3", null, 0x61ddff, "normal", 0);
  // }, 50000); // Wait 40 seconds after the first announcement
}, 220000);

// msg1 = setInterval(function () {
//   room.sendAnnouncement("🏆 Searching For The Champions", null, 0xff8a4a, "small");
// }, msg1Time);


//database path (onteamgoal, endgame(winner), onplayerjoin, onplayerchat)