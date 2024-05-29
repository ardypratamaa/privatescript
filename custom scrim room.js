// ------------------------------------------------
// Global Variables
// ------------------------------------------------
var roomName = "💠 [ʀꜱɪ|ɪᴅ] Scrim Room | ᴘᴠᴘ ⚽";
//var roomName = "💠 [ʀꜱɪ|ɪᴅ] League Room | ᴘᴠᴘ ⚽";
var maxPlayers = 25;
var roomPublic = true;
var roomPassword = null;
var token = "";
var roomLink = "";
var gameTime = 5; //default game time if 0 is selected
var map = "RSR";
var superAdmins = [];
var afkPlayers = {}; //afk

var room = HBInit({
  roomName: roomName,
  maxPlayers: maxPlayers,
  public: roomPublic,
  password: roomPassword,
  geo: { code: "ID", lat: -6.17, lon: 106.83 },
  noPlayer: true,
  token: token,
});

// ===============================|  RSR  |===============================
// =========================================================================

//Real Soccer Variables
var throwTimeOut = 420; // 7 seconds (var is in game ticks)
var gkTimeOut = 600; // 10 seconds (var is in game ticks)
var ckTimeOut = 600; // 10 seconds (var is in game ticks)
var throwinDistance = 270; // distance players can move the ball during throw in
var mapBGColor = "86A578"; // default 718C5A
var superAdminCode = "abogoboga"; // !admin 505050
var allowPublicAdmin = true; // if true then !admin command is enabled
var powerShotMode = false;

/*-------------------------------- STADIUMS ---------------------------------*/
function getRealSoccerMap() {
  var realSoccerMap =
  `{

    "name" : "Real Soccer Indonesia",
  
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
      "kickStrength" : 6.9

    },

    "ballPhysics" : {
      "radius" : 9,
      "invMass" : 0.90,
      "damping" : 0.9877,
      "color" : "FFFFFF",
      "cMask" : [ "all"
      ],
      "cGroup" : [ "ball"
      ],
      "bounciness" : 0.8,
      "friction" : 0.05 

    },
  
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
      
      /* 73 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -312.44827586206895, "y" : 718 },
      /* 74 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.44827586206895, "y" : 654 },
      /* 75 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 670 },
      /* 76 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 654 },
      /* 77 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -276.9396551724138, "y" : 654 },
      /* 78 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -121.76724137931035, "y" : 654 },
      /* 79 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -150.4733928811961, "y" : 654.0965576171875 },
      /* 80 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -131.96477219154093, "y" : 654.0965576171875 },
      
      /* 81 */ { "v0" : 201, "v1" : 202, "curve" : -328.13941952332, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
      
      /* 82 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 694 },
      /* 83 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 680 },
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
      /* 111 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1270, "y" : 716 },
      /* 112 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1271, "y" : 717 },
      /* 113 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1270, "y" : 719 },
      /* 114 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1271, "y" : 720 },
      /* 115 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1270, "y" : 719 },
      /* 116 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1271, "y" : 720 },
      /* 117 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1269, "y" : 722 },
      /* 118 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1272, "y" : 723 },
      /* 119 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1270, "y" : -722 },
      /* 120 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1271, "y" : -723 },
      /* 121 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1270, "y" : -719 },
      /* 122 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1271, "y" : -720 },
      /* 123 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1269, "y" : -725 },
      /* 124 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1272, "y" : -726 },
      /* 125 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1266, "y" : 721 },
      /* 126 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1266, "y" : -726 },
      /* 127 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1266, "y" : 721 },
      /* 128 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1266, "y" : -726 },
      /* 129 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1269, "y" : 720 },
      /* 130 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1270, "y" : -726 },
      /* 131 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1268, "y" : 721 },
      /* 132 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1268, "y" : -726 },
      /* 133 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1266, "y" : 724 },
      /* 134 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : 1267, "y" : -722 },
      /* 135 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1271, "y" : 725 },
      /* 136 */ { "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "x" : -1271, "y" : -722 },
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
      
      /* 151 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -210.28125, "y" : 695.0121527777777 },
      /* 152 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : -209.6105324074074, "y" : 687.6342592592592 },
      
      /* 153 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 715 },
      /* 154 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 703 },
      /* 155 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 670 },
      /* 156 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 653 },
      /* 157 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 695 },
      /* 158 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 679 },
      /* 159 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 715 },
      /* 160 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -98.25862068965517, "y" : 703 },
      /* 161 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -179.4733928811961, "y" : 654.0965576171875 },
      /* 162 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -160.96477219154093, "y" : 654.0965576171875 },
      /* 163 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -207.4733928811961, "y" : 654.0965576171875 },
      /* 164 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -188.96477219154093, "y" : 654.0965576171875 },
      /* 165 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -236.4733928811961, "y" : 654.0965576171875 },
      /* 166 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -217.96477219154093, "y" : 654.0965576171875 },
      /* 167 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -265.4733928811961, "y" : 654.0965576171875 },
      /* 168 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -246.96477219154093, "y" : 654.0965576171875 },
      /* 169 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 670 },
      /* 170 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 654 },
      /* 171 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 694 },
      /* 172 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 680 },
      /* 173 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 715 },
      /* 174 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 703 },
      /* 175 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 670 },
      /* 176 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 653 },
      /* 177 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 695 },
      /* 178 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 679 },
      /* 179 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 715 },
      /* 180 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -300.2586206896552, "y" : 703 },
      /* 181 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 96.55172413793105, "y" : 718 },
      /* 182 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.55172413793105, "y" : 654 },
      /* 183 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 670 },
      /* 184 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 654 },
      /* 185 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 132.06034482758622, "y" : 654 },
      /* 186 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 287.23275862068965, "y" : 654 },
      /* 187 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 258.5266071188039, "y" : 654.0965576171875 },
      /* 188 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 277.03522780845907, "y" : 654.0965576171875 },
      /* 189 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 694 },
      /* 190 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 680 },
      
      /* 191 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : 198.71875, "y" : 695.0121527777777 },
      /* 192 */ { "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "x" : 199.3894675925926, "y" : 687.6342592592592 },
      
      /* 193 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 715 },
      /* 194 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 703 },
      /* 195 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 670 },
      /* 196 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 653 },
      /* 197 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 695 },
      /* 198 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 679 },
      /* 199 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 715 },
      /* 200 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 310.7413793103448, "y" : 703 },
      /* 201 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 229.5266071188039, "y" : 654.0965576171875 },
      /* 202 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 248.03522780845907, "y" : 654.0965576171875 },
      /* 203 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 201.5266071188039, "y" : 654.0965576171875 },
      /* 204 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 220.03522780845907, "y" : 654.0965576171875 },
      /* 205 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 172.5266071188039, "y" : 654.0965576171875 },
      /* 206 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 191.03522780845907, "y" : 654.0965576171875 },
      /* 207 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 143.5266071188039, "y" : 654.0965576171875 },
      /* 208 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 162.03522780845907, "y" : 654.0965576171875 },
      /* 209 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 670 },
      /* 210 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 654 },
      /* 211 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 694 },
      /* 212 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 680 },
      /* 213 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 715 },
      /* 214 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 703 },
      /* 215 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 670 },
      /* 216 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 653 },
      /* 217 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 695 },
      /* 218 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 679 },
      /* 219 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 715 },
      /* 220 */ { "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 108.74137931034483, "y" : 703 },
      
      /* 221 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1170.4791679382324, "y" : 583, "color" : "DC0000" },
      /* 222 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1163.6041679382324, "y" : 583, "color" : "DC0000" },
      /* 223 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1171.1666679382324, "y" : 580 },
      /* 224 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1163.6041679382324, "y" : 580 },
      /* 225 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1163.6041679382324, "y" : 583 },
      /* 226 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1156.0416679382324, "y" : 583 },
      /* 227 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1162.9166679382324, "y" : 580 },
      /* 228 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : -1155.3541679382324, "y" : 580 },
      
      /* 229 */ { "x" : -1156.6666679382324, "y" : 576.666748046875, "trait" : "line", "cMask" : ["wall" ] },
      /* 230 */ { "x" : -1149.6666679382324, "y" : 599.666748046875, "trait" : "line", "cMask" : ["wall" ] },
      /* 231 */ { "x" : -1148.6666679382324, "y" : -599.833251953125, "trait" : "line", "cMask" : ["wall" ] },
      
      /* 232 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1130.2708320617676, "y" : -616.5, "color" : "DC0000" },
      /* 233 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1137.1458320617676, "y" : -616.5, "color" : "DC0000" },
      /* 234 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1129.5833320617676, "y" : -619.5 },
      /* 235 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1137.1458320617676, "y" : -619.5 },
      /* 236 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1137.1458320617676, "y" : -616.5 },
      /* 237 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1144.7083320617676, "y" : -616.5 },
      /* 238 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1137.8333320617676, "y" : -619.5 },
      /* 239 */ { "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "x" : 1145.3958320617676, "y" : -619.5 },
      
      /* 240 */ { "x" : 1144.0833320617676, "y" : -622.833251953125, "trait" : "line", "cMask" : ["wall" ] },
      /* 241 */ { "x" : 1151.0833320617676, "y" : -599.833251953125, "trait" : "line", "cMask" : ["wall" ] },
      /* 242 */ { "x" : 1150.0833320617676, "y" : 598.666748046875, "trait" : "line", "cMask" : ["wall" ] }
  
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
      
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 75, "v1" : 76 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 74, "v1" : 77 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 76, "v1" : 78 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 79, "v1" : 80 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 82, "v1" : 83 },
      { "v0" : 85, "v1" : 86, "curve" : -0.212710733178631, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 87, "v1" : 88, "curve" : -0.5926245099150841, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 89, "v1" : 90, "curve" : -0.05438611790324986, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 91, "v1" : 92, "curve" : -0.05490730726231725, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 93, "v1" : 94, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "v0" : 95, "v1" : 96, "curve" : 0, "color" : "6d925c", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 97, "v1" : 98 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 99, "v1" : 100 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 100, "v1" : 101 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 101, "v1" : 102 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 102, "v1" : 103 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 103, "v1" : 104 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 105, "v1" : 106 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 98, "v1" : 107 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 107, "v1" : 108 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 108, "v1" : 109 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 109, "v1" : 110 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 110, "v1" : 104 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 111, "v1" : 112 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 113, "v1" : 114 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 115, "v1" : 116, "curve" : -1.4085579510213782 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 117, "v1" : 118 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 119, "v1" : 120 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 121, "v1" : 122 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 123, "v1" : 124 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 123, "v1" : 117 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 126, "v1" : 125 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 128, "v1" : 127 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 116, "v1" : 124 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 132, "v1" : 131 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 129, "v1" : 130 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 136, "v1" : 135 },
      { "vis" : true, "color" : "000000", "bCoef" : -2.9, "cMask" : ["ball" ], "trait" : "line", "v0" : 133, "v1" : 134 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 137, "v1" : 138 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 139, "v1" : 140 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 140, "v1" : 141 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 141, "v1" : 142 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 142, "v1" : 143 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 143, "v1" : 144 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 145, "v1" : 146 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 138, "v1" : 147 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 147, "v1" : 148 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 148, "v1" : 149 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 149, "v1" : 150 },
      { "color" : "ffffff", "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 150, "v1" : 144 },
      
      { "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "v0" : 151, "v1" : 152 },
      
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 153, "v1" : 154 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 155, "v1" : 156 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 157, "v1" : 158 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 159, "v1" : 160 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 161, "v1" : 162 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 163, "v1" : 164 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 165, "v1" : 166 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 167, "v1" : 168 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 169, "v1" : 170 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 171, "v1" : 172 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 173, "v1" : 174 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 175, "v1" : 176 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 177, "v1" : 178 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 179, "v1" : 180 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 183, "v1" : 184 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 182, "v1" : 185 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 184, "v1" : 186 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 187, "v1" : 188 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 189, "v1" : 190 },
      
      { "curve" : -328.13941952332465, "vis" : false, "color" : "4D4C48", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ], "v0" : 191, "v1" : 192 },
      
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 193, "v1" : 194 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 195, "v1" : 196 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 197, "v1" : 198 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 199, "v1" : 200 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 201, "v1" : 202 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 203, "v1" : 204 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 205, "v1" : 206 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 207, "v1" : 208 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 209, "v1" : 210 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 211, "v1" : 212 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 213, "v1" : 214 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 215, "v1" : 216 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 217, "v1" : 218 },
      { "color" : "ffffff", "bCoef" : 1, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "v0" : 219, "v1" : 220 },
      
      { "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 221, "v1" : 222 },
      { "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 223, "v1" : 224 },
      { "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 225, "v1" : 226 },
      { "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 227, "v1" : 228 },
      
      { "vis" : true, "color" : "ffffff", "v0" : 229, "v1" : 230, "trait" : "line", "cMask" : ["wall" ] },
      
      { "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 232, "v1" : 233 },
      { "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 234, "v1" : 235 },
      { "color" : "FFFF00", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 236, "v1" : 237 },
      { "color" : "DC0000", "bCoef" : 0.2, "cMask" : ["wall" ], "trait" : "cornerflag", "v0" : 238, "v1" : 239 },
      
      { "vis" : true, "color" : "ffffff", "v0" : 240, "v1" : 241, "trait" : "line", "cMask" : ["wall" ] }
  
    ],
  
    "goals" : [
      { "p0" : [-1161.45,124 ], "p1" : [-1161.45,-124 ], "team" : "red" },
      { "p0" : [1161.45,124 ], "p1" : [1161.45,-124 ], "team" : "blue", "radius" : 0, "invMass" : 1 }
  
    ],
  
    "discs" : [
      { "radius" : 0, "invMass" : 0, "pos" : [-1285,-13 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1284,35 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["ball" ] },
      { "radius" : 0, "invMass" : 0, "pos" : [-1308,62 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
      
      { "radius" : 2.7, "pos" : [-1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,-600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      { "radius" : 2.7, "pos" : [1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
      
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [-1150,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [-1250,158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 5, "invMass" : 0, "pos" : [1150,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      { "radius" : 2, "invMass" : 0, "pos" : [1250,158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
      
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
      { "radius" : 10.060763888888891, "invMass" : 1e-27, "pos" : [211.46238425925927,692.3292824074074 ], "color" : "4D4C48", "bCoef" : 1000, "cMask" : ["ball" ], "cGroup" : ["wall" ], "damping" : 1, "speed" : [0,-0.5 ] }
  
    ],
  
    "planes" : [
      { "normal" : [0,1 ], "dist" : -627, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      { "normal" : [0,-1 ], "dist" : -649, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
      
      { "normal" : [0,1 ], "dist" : -721, "bCoef" : 0 },
      { "normal" : [0,-1 ], "dist" : -718, "bCoef" : 0 },
      { "normal" : [1,0 ], "dist" : -1268, "bCoef" : 0 },
      { "normal" : [-1,0 ], "dist" : -1266, "bCoef" : 0.1 },
      { "normal" : [1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
      { "normal" : [-1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] }
  
    ],
  
    "traits" : {
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
  
    "canBeStored" : false
  }`
  return realSoccerMap;
}

// function getRealSoccerMap() {
//   var realSoccerMap =
//     `{

//       "name" : "Real Soccer Indonesia",
    
//       "width" : 1380,
    
//       "height" : 780,
    
//       "spawnDistance" : 560,
    
//       "bg" : { "type" : "grass", "width" : 1150, "height" : 600, "kickOffRadius" : 180, "cornerRadius" : 0, "color" : "86A578" },
    
//       "playerPhysics" : {
//         "acceleration" : 0.13,
//         "kickStrength": 5.5
//       },
    
//       "ballPhysics" : {
//         "radius" : 8.9,
//         "invMass" : 1,
//         "color" : "FFFFFF",
//         "cMask" : [ "all"],
//         "cGroup" : [ "ball"],
//         "bounciness": 0.8,  // Introduce some elasticity to ball collisions
//         "friction": 0.05  // Apply friction to slow down ball movement
    
//       },
    
//       "vertexes" : [
//         /* 0 */ { "x" : 1, "y" : 657, "trait" : "kickOffBarrier" },
//         /* 1 */ { "x" : 0, "y" : 180, "trait" : "kickOffBarrier" },
//         /* 2 */ { "x" : 0, "y" : -180, "trait" : "kickOffBarrier" },
//         /* 3 */ { "x" : 0, "y" : -675, "trait" : "kickOffBarrier" },
        
//         /* 4 */ { "x" : 1150, "y" : 320, "trait" : "line" },
//         /* 5 */ { "x" : 840, "y" : 320, "trait" : "line" },
//         /* 6 */ { "x" : 1150, "y" : -320, "trait" : "line" },
//         /* 7 */ { "x" : 840, "y" : -320, "trait" : "line" },
//         /* 8 */ { "x" : 1150, "y" : 180, "trait" : "line" },
//         /* 9 */ { "x" : 1030, "y" : 180, "trait" : "line" },
//         /* 10 */ { "x" : 1150, "y" : -180, "trait" : "line" },
//         /* 11 */ { "x" : 1030, "y" : -180, "trait" : "line" },
//         /* 12 */ { "x" : 840, "y" : -130, "trait" : "line", "curve" : -130 },
//         /* 13 */ { "x" : 840, "y" : 130, "trait" : "line", "curve" : -130 },
//         /* 14 */ { "x" : -1150, "y" : -320, "trait" : "line" },
//         /* 15 */ { "x" : -840, "y" : -320, "trait" : "line" },
//         /* 16 */ { "x" : -1150, "y" : 320, "trait" : "line" },
//         /* 17 */ { "x" : -840, "y" : 320, "trait" : "line" },
//         /* 18 */ { "x" : -1150, "y" : -175, "trait" : "line" },
//         /* 19 */ { "x" : -1030, "y" : -175, "trait" : "line" },
//         /* 20 */ { "x" : -1150, "y" : 175, "trait" : "line" },
//         /* 21 */ { "x" : -1030, "y" : 175, "trait" : "line" },
//         /* 22 */ { "x" : -840, "y" : 130, "trait" : "line", "curve" : -130 },
//         /* 23 */ { "x" : -840, "y" : -130, "trait" : "line", "curve" : -130 },
//         /* 24 */ { "x" : 935, "y" : 3, "trait" : "line" },
//         /* 25 */ { "x" : 935, "y" : -3, "trait" : "line" },
//         /* 26 */ { "x" : -935, "y" : 3, "trait" : "line" },
//         /* 27 */ { "x" : -935, "y" : -3, "trait" : "line" },
//         /* 28 */ { "x" : -1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 29 */ { "x" : -1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 30 */ { "x" : -1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 31 */ { "x" : -1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 32 */ { "x" : 1120, "y" : 600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 33 */ { "x" : 1150, "y" : 570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 34 */ { "x" : 1150, "y" : -570, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         /* 35 */ { "x" : 1120, "y" : -600, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
        
//         /* 36 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier", "curve" : -180 },
//         /* 37 */ { "x" : 0, "y" : -180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
//         /* 38 */ { "x" : 0, "y" : 180, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier", "curve" : 180 },
        
//         /* 39 */ { "x" : -1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
//         /* 40 */ { "x" : -1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : 70, "color" : "576C46", "vis" : false },
//         /* 41 */ { "x" : 1030, "y" : -40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
//         /* 42 */ { "x" : 1030, "y" : 40, "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "curve" : -70, "color" : "576C46", "vis" : false },
//         /* 43 */ { "x" : 1030, "y" : -40, "trait" : "line", "color" : "576C46" },
//         /* 44 */ { "x" : 1030, "y" : 40, "trait" : "line", "color" : "576C46" },
//         /* 45 */ { "x" : -1030, "y" : -40, "trait" : "line", "color" : "576C46" },
//         /* 46 */ { "x" : -1030, "y" : 40, "trait" : "line", "color" : "576C46" },
//         /* 47 */ { "x" : 0, "y" : 3, "trait" : "line" },
//         /* 48 */ { "x" : 0, "y" : -3, "trait" : "line" },
        
//         /* 49 */ { "x" : -1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
//         /* 50 */ { "x" : 1300, "y" : -460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
//         /* 51 */ { "x" : -1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
//         /* 52 */ { "x" : 1300, "y" : 460, "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "color" : "ec644b", "vis" : false },
//         /* 53 */ { "x" : -1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 54 */ { "x" : -840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 55 */ { "x" : -840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 56 */ { "x" : -1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 57 */ { "x" : 1295, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 58 */ { "x" : 840, "y" : -320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 59 */ { "x" : 840, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 60 */ { "x" : 1295, "y" : 320, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         /* 61 */ { "x" : -1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
//         /* 62 */ { "x" : -1210, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
//         /* 63 */ { "x" : -1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
//         /* 64 */ { "x" : -1210, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "bias" : 0, "curve" : 5 },
//         /* 65 */ { "x" : -1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
//         /* 66 */ { "x" : -1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
//         /* 67 */ { "x" : 1150, "y" : 124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
//         /* 68 */ { "x" : 1210, "y" : 124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
//         /* 69 */ { "x" : 1150, "y" : -124, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
//         /* 70 */ { "x" : 1210, "y" : -124, "bCoef" : 0.1, "cMask" : ["red","blue" ], "curve" : -5 },
//         /* 71 */ { "x" : 1250, "y" : -158, "bCoef" : 0, "cMask" : ["ball" ] },
//         /* 72 */ { "x" : 1250, "y" : 158, "bCoef" : 0, "cMask" : ["ball" ] },
        
//         /* 73 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 744 },
//         /* 74 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 725 },
//         /* 75 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 712 },
//         /* 76 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 694 },
//         /* 77 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 680 },
//         /* 78 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -329, "y" : 654 },
//         /* 79 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 682 },
//         /* 80 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 654 },
//         /* 81 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -302, "y" : 654 },
//         /* 82 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -110, "y" : 654 },
//         /* 83 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -282.45458984375, "y" : 654.0965576171875 },
//         /* 84 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -260.45458984375, "y" : 654.0965576171875 },
//         /* 85 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -242.45458984375, "y" : 654.0965576171875 },
//         /* 86 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -215.45458984375, "y" : 654.0965576171875 },
//         /* 87 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -196.45458984375, "y" : 654.0965576171875 },
//         /* 88 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -173.45458984375, "y" : 654.0965576171875 },
//         /* 89 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -154.45458984375, "y" : 654.0965576171875 },
//         /* 90 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -127.45458984375, "y" : 654.0965576171875 },
        
//         /* 91 */ { "v0" : 201, "v1" : 202, "curve" : -328.13941952332, "vis" : false, "color" : "ffffff", "bCoef" : 0.001, "cMask" : ["wall" ], "cGroup" : ["all" ] },
        
//         /* 92 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 713 },
//         /* 93 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 695 },
//         /* 94 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 744 },
//         /* 95 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -83, "y" : 725 },
//         /* 96 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 744 },
//         /* 97 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 725 },
//         /* 98 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 712 },
//         /* 99 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 694 },
//         /* 100 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 680 },
//         /* 101 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 76, "y" : 654 },
//         /* 102 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 682 },
//         /* 103 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 654 },
//         /* 104 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 103, "y" : 654 },
//         /* 105 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 295, "y" : 654 },
//         /* 106 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 122.54541015625, "y" : 654.0965576171875 },
//         /* 107 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 144.54541015625, "y" : 654.0965576171875 },
//         /* 108 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 162.54541015625, "y" : 654.0965576171875 },
//         /* 109 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 189.54541015625, "y" : 654.0965576171875 },
//         /* 110 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 208.54541015625, "y" : 654.0965576171875 },
//         /* 111 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 231.54541015625, "y" : 654.0965576171875 },
//         /* 112 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 250.54541015625, "y" : 654.0965576171875 },
//         /* 113 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 277.54541015625, "y" : 654.0965576171875 },
//         /* 114 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 713 },
//         /* 115 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 695 },
//         /* 116 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 744 },
//         /* 117 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 322, "y" : 725 },
//         /* 118 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -31, "y" : -662 },
//         /* 119 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -31, "y" : -692 },
//         /* 120 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 35, "y" : -692 },
//         /* 121 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1, "y" : -692 },
//         /* 122 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 2, "y" : -677 },
//         /* 123 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 20, "y" : -677 },
//         /* 124 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 20, "y" : -664 },
//         /* 125 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1, "y" : -664 },
//         /* 126 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 31, "y" : -687 },
//         /* 127 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 31, "y" : -662 },
//         /* 128 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -9, "y" : -692 },
//         /* 129 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -9, "y" : -679 },
//         /* 130 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -27, "y" : -679 },
//         /* 131 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -12, "y" : -664 },
//         /* 132 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -35, "y" : 698 },
//         /* 133 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -35, "y" : 668 },
//         /* 134 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 31, "y" : 668 },
//         /* 135 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -3, "y" : 668 },
//         /* 136 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -2, "y" : 683 },
//         /* 137 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 16, "y" : 683 },
//         /* 138 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 16, "y" : 696 },
//         /* 139 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -3, "y" : 696 },
//         /* 140 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 26, "y" : 673 },
//         /* 141 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 27, "y" : 698 },
//         /* 142 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -13, "y" : 668 },
//         /* 143 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -13, "y" : 681 },
//         /* 144 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -31, "y" : 681 },
//         /* 145 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -16, "y" : 696 },
//         /* 146 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1236.5774772285965, "y" : -39.69609741670979 },
//         /* 147 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1266.5761167769258, "y" : -39.981798745741514 },
//         /* 148 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1267.2046597007957, "y" : 26.01520826058305 },
//         /* 149 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1266.8808648612264, "y" : -7.983249894190237 },
//         /* 150 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1251.8910684646962, "y" : -6.840444578063398 },
//         /* 151 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1252.0624892621152, "y" : 11.158739150934252 },
//         /* 152 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1239.0630787911725, "y" : 11.282543060181297 },
//         /* 153 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1238.882134616119, "y" : -7.716595320427302 },
//         /* 154 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1262.1572695545688, "y" : 21.06305189070008 },
//         /* 155 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1237.1679266419287, "y" : 22.301090983170866 },
//         /* 156 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1266.7856310848824, "y" : -17.98279641030001 },
//         /* 157 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1253.7862206139398, "y" : -17.85899250105291 },
//         /* 158 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1253.6147998165206, "y" : -35.8581762300505 },
//         /* 159 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : 1238.758330706872, "y" : -20.71600579136998 },
//         /* 160 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1237.837273857675, "y" : 33.13710227364038 },
//         /* 161 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1267.8362146665436, "y" : 32.88501033406999 },
//         /* 162 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1267.281612399489, "y" : -33.112659445440954 },
//         /* 163 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1267.5673165976687, "y" : 0.886140137943471 },
//         /* 164 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1252.559443128582, "y" : 0.012221414099713002 },
//         /* 165 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1252.4081879648397, "y" : -17.987143071221453 },
//         /* 166 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1239.4086469476633, "y" : -17.877903230741026 },
//         /* 167 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1239.568305176058, "y" : 1.1214259482090938 },
//         /* 168 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1262.3238042546059, "y" : -28.070820654034492 },
//         /* 169 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1237.3162838492296, "y" : -28.860708731354862 },
//         /* 170 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1267.651347244192, "y" : 10.885787074233008 },
//         /* 171 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1254.6518062270156, "y" : 10.995026914713549 },
//         /* 172 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1254.8030613907579, "y" : 28.994391400034715 },
//         /* 173 */ { "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "x" : -1239.6775450165383, "y" : 14.120966965385492 }
    
//       ],
    
//       "segments" : [
//         { "v0" : 0, "v1" : 1, "trait" : "kickOffBarrier" },
//         { "v0" : 2, "v1" : 3, "trait" : "kickOffBarrier" },
        
//         { "v0" : 4, "v1" : 5, "trait" : "line", "y" : 320 },
//         { "v0" : 5, "v1" : 7, "trait" : "line", "x" : 840 },
//         { "v0" : 6, "v1" : 7, "trait" : "line", "y" : -320 },
//         { "v0" : 8, "v1" : 9, "trait" : "line", "y" : 180 },
//         { "v0" : 9, "v1" : 11, "trait" : "line", "x" : 1030 },
//         { "v0" : 10, "v1" : 11, "trait" : "line", "y" : -180 },
//         { "v0" : 12, "v1" : 13, "curve" : -130, "trait" : "line", "x" : 840 },
//         { "v0" : 14, "v1" : 15, "trait" : "line", "y" : -320 },
//         { "v0" : 15, "v1" : 17, "trait" : "line", "x" : -840 },
//         { "v0" : 16, "v1" : 17, "trait" : "line", "y" : 320 },
//         { "v0" : 18, "v1" : 19, "trait" : "line", "y" : -175 },
//         { "v0" : 19, "v1" : 21, "trait" : "line", "x" : -1030 },
//         { "v0" : 20, "v1" : 21, "trait" : "line", "y" : 175 },
//         { "v0" : 22, "v1" : 23, "curve" : -130, "trait" : "line", "x" : -840 },
//         { "v0" : 24, "v1" : 25, "curve" : -180, "trait" : "line", "x" : 935 },
//         { "v0" : 26, "v1" : 27, "curve" : -180, "trait" : "line", "x" : -935 },
//         { "v0" : 24, "v1" : 25, "curve" : 180, "trait" : "line", "x" : 935 },
//         { "v0" : 26, "v1" : 27, "curve" : 180, "trait" : "line", "x" : -935 },
//         { "v0" : 24, "v1" : 25, "curve" : 90, "trait" : "line", "x" : 935 },
//         { "v0" : 26, "v1" : 27, "curve" : 90, "trait" : "line", "x" : -935 },
//         { "v0" : 24, "v1" : 25, "curve" : -90, "trait" : "line", "x" : 935 },
//         { "v0" : 26, "v1" : 27, "curve" : -90, "trait" : "line", "x" : -935 },
//         { "v0" : 24, "v1" : 25, "trait" : "line", "x" : 935 },
//         { "v0" : 26, "v1" : 27, "trait" : "line", "x" : -935 },
//         { "v0" : 28, "v1" : 29, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         { "v0" : 30, "v1" : 31, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         { "v0" : 32, "v1" : 33, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
//         { "v0" : 34, "v1" : 35, "curve" : 90, "bCoef" : -2.9, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line" },
        
//         { "v0" : 37, "v1" : 36, "curve" : -180, "vis" : false, "bCoef" : 0.1, "cGroup" : ["blueKO" ], "trait" : "kickOffBarrier" },
        
//         { "v0" : 39, "v1" : 40, "curve" : 70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : -1030 },
//         { "v0" : 41, "v1" : 42, "curve" : -70, "vis" : false, "color" : "576C46", "bCoef" : -5.7, "cMask" : ["ball" ], "cGroup" : ["c0" ], "trait" : "line", "x" : 1030 },
        
//         { "v0" : 37, "v1" : 38, "curve" : 180, "vis" : false, "bCoef" : 0.1, "cMask" : ["red","blue" ], "cGroup" : ["redKO" ], "trait" : "kickOffBarrier" },
        
//         { "v0" : 43, "v1" : 44, "vis" : true, "color" : "576C46", "trait" : "line", "x" : 1030 },
//         { "v0" : 45, "v1" : 46, "vis" : true, "color" : "576C46", "trait" : "line", "x" : -1030 },
//         { "v0" : 47, "v1" : 48, "curve" : -180, "trait" : "line", "x" : -935 },
//         { "v0" : 47, "v1" : 48, "curve" : 180, "trait" : "line", "x" : -935 },
//         { "v0" : 47, "v1" : 48, "curve" : 90, "trait" : "line", "x" : -935 },
//         { "v0" : 47, "v1" : 48, "curve" : -90, "trait" : "line", "x" : -935 },
//         { "v0" : 47, "v1" : 48, "trait" : "line", "x" : -935 },
        
//         { "v0" : 49, "v1" : 50, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : -460 },
//         { "v0" : 51, "v1" : 52, "vis" : false, "color" : "ec644b", "bCoef" : 0, "cMask" : ["c1" ], "cGroup" : ["red","blue" ], "y" : 460 },
//         { "v0" : 53, "v1" : 54, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 54, "v1" : 55, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 55, "v1" : 56, "vis" : false, "color" : "ec644b", "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 57, "v1" : 58, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 58, "v1" : 59, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 59, "v1" : 60, "vis" : false, "cMask" : ["c0" ], "cGroup" : ["red","blue" ] },
//         { "v0" : 61, "v1" : 62, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
//         { "v0" : 63, "v1" : 64, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
//         { "v0" : 64, "v1" : 62, "curve" : 5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "bias" : 0 },
//         { "v0" : 62, "v1" : 65, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
//         { "v0" : 64, "v1" : 66, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
//         { "v0" : 67, "v1" : 68, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : 124 },
//         { "v0" : 69, "v1" : 70, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "y" : -124 },
//         { "v0" : 68, "v1" : 70, "curve" : -5, "color" : "FFFFFF", "bCoef" : 0.1, "cMask" : ["ball","red","blue" ] },
//         { "v0" : 70, "v1" : 71, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
//         { "v0" : 68, "v1" : 72, "color" : "FFFFFF", "bCoef" : 0, "cMask" : ["ball" ] },
        
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 73, "v1" : 74 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 75, "v1" : 76 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 77, "v1" : 78 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 79, "v1" : 80 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 78, "v1" : 81 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 80, "v1" : 82 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 83, "v1" : 84 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 85, "v1" : 86 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 87, "v1" : 88 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 89, "v1" : 90 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 92, "v1" : 93 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 94, "v1" : 95 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 96, "v1" : 97 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 98, "v1" : 99 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 100, "v1" : 101 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 102, "v1" : 103 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 101, "v1" : 104 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 103, "v1" : 105 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 106, "v1" : 107 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 108, "v1" : 109 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 110, "v1" : 111 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 112, "v1" : 113 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 114, "v1" : 115 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 116, "v1" : 117 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 118, "v1" : 119 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 120, "v1" : 121 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 121, "v1" : 122 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 122, "v1" : 123 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 123, "v1" : 124 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 124, "v1" : 125 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 126, "v1" : 127 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 119, "v1" : 128 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 128, "v1" : 129 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 129, "v1" : 130 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 130, "v1" : 131 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 131, "v1" : 125 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 132, "v1" : 133 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 134, "v1" : 135 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 135, "v1" : 136 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 136, "v1" : 137 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 137, "v1" : 138 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 138, "v1" : 139 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 140, "v1" : 141 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 133, "v1" : 142 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 142, "v1" : 143 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 143, "v1" : 144 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 144, "v1" : 145 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 145, "v1" : 139 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 146, "v1" : 147 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 148, "v1" : 149 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 149, "v1" : 150 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 150, "v1" : 151 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 151, "v1" : 152 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 152, "v1" : 153 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 154, "v1" : 155 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 147, "v1" : 156 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 156, "v1" : 157 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 157, "v1" : 158 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 158, "v1" : 159 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 159, "v1" : 153 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 160, "v1" : 161 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 162, "v1" : 163 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 163, "v1" : 164 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 164, "v1" : 165 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 165, "v1" : 166 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 166, "v1" : 167 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 168, "v1" : 169 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 161, "v1" : 170 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 170, "v1" : 171 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 171, "v1" : 172 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 172, "v1" : 173 },
//         { "color" : "ffffff", "bCoef" : 1, "cMask" : ["red","blue" ], "cGroup" : ["wall" ], "trait" : "goalPost", "v0" : 173, "v1" : 167 }
    
//       ],
    
//       "goals" : [
//         { "p0" : [-1161.45,124 ], "p1" : [-1161.45,-124 ], "team" : "red" },
//         { "p0" : [1161.45,124 ], "p1" : [1161.45,-124 ], "team" : "blue", "radius" : 0, "invMass" : 1 }
    
//       ],
    
//       "discs" : [
//         { "radius" : 0, "invMass" : 0, "pos" : [-1297,-15 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red" ], "cGroup" : ["ball" ] },
//         { "radius" : 0, "invMass" : 0, "pos" : [-1296,33 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["blue" ], "cGroup" : ["ball" ] },
//         { "radius" : 0, "invMass" : 0, "pos" : [-1308,62 ], "color" : "ffffffff", "bCoef" : 0, "cMask" : ["red","blue" ], "cGroup" : ["ball" ] },
        
//         { "radius" : 2.7, "pos" : [-1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
//         { "radius" : 2.7, "pos" : [1150,-600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
//         { "radius" : 2.7, "pos" : [1150,600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
        
//         { "radius" : 5, "invMass" : 0, "pos" : [-1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
//         { "radius" : 5, "invMass" : 0, "pos" : [-1150,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
//         { "radius" : 2, "invMass" : 0, "pos" : [-1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
//         { "radius" : 2, "invMass" : 0, "pos" : [-1250,158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
//         { "radius" : 5, "invMass" : 0, "pos" : [1150,-124 ], "bCoef" : 0.5, "trait" : "goalPost" },
//         { "radius" : 5, "invMass" : 0, "pos" : [1150,124 ], "bCoef" : 0.5, "trait" : "goalPost" },
//         { "radius" : 2, "invMass" : 0, "pos" : [1250,-158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
//         { "radius" : 2, "invMass" : 0, "pos" : [1250,158 ], "color" : "000000", "bCoef" : 1, "trait" : "goalPost" },
        
//         { "radius" : 2.7, "pos" : [-1150,-600 ], "cGroup" : ["ball" ], "trait" : "cornerflag" },
        
//         { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [-1149,-460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [1149,-460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [-1149,460 ], "cMask" : ["none" ] },
//         { "radius" : 0, "pos" : [1149,460 ], "cMask" : ["none" ] }
    
//       ],
    
//       "planes" : [
//         { "normal" : [0,1 ], "dist" : -627, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
//         { "normal" : [0,-1 ], "dist" : -622, "bCoef" : 0, "cGroup" : ["ball" ], "trait" : "ballArea" },
        
//         { "normal" : [0,1 ], "dist" : -670, "bCoef" : 0 },
//         { "normal" : [0,-1 ], "dist" : -654, "bCoef" : 0 },
//         { "normal" : [1,0 ], "dist" : -1300, "bCoef" : 0 },
//         { "normal" : [-1,0 ], "dist" : -1300, "bCoef" : 0.1 },
//         { "normal" : [1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
//         { "normal" : [-1,0 ], "dist" : -1230, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] }
    
//       ],
    
//       "traits" : {
//         "ballArea" : { "vis" : false, "bCoef" : 0, "cMask" : ["ball" ], "cGroup" : ["ball" ] },
//         "goalPost" : { "radius" : 5, "invMass" : 0, "bCoef" : 1, "cGroup" : ["ball" ] },
//         "rightNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c3" ] },
//         "leftNet" : { "radius" : 0, "invMass" : 1, "bCoef" : 0, "cGroup" : ["ball","c2" ] },
//         "stanchion" : { "radius" : 3, "invMass" : 0, "bCoef" : 3, "cMask" : ["none" ] },
//         "cornerflag" : { "radius" : 3, "invMass" : 0, "bCoef" : 0.2, "color" : "FFFF00", "cMask" : ["ball" ] },
//         "reargoalNetleft" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : 10, "color" : "C7E6BD" },
//         "reargoalNetright" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball","red","blue" ], "curve" : -10, "color" : "C7E6BD" },
//         "sidegoalNet" : { "vis" : true, "bCoef" : 1, "cMask" : ["ball","red","blue" ], "color" : "C7E6BD" },
//         "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] },
//         "line" : { "vis" : true, "cMask" : [ ], "color" : "C7E6BD" }
    
//       },
    
//       "redSpawnPoints" : [
//         [-222, -177],
//         [-228, 174],
//         [-684, -89],
//         [-692, 57],
//         [-1087, -5],
//         [-214, 622],
//         [-214, 622],
//         [-214, 622]
    
//       ],
    
//       "blueSpawnPoints" : [
//         [218, -181],
//         [225, 168],
//         [719, 94],
//         [719, -102],
//         [1101, -17],
//         [182, 629],
//         [182, 629],
//         [182, 629]
    
//       ],
    
//       "canBeStored" : false
//     }`;

// }

function getPenMap() {
  var penMap = `{"name":"Penalty","width":420,"height":200,"spawnDistance":300,"canBeStored":false,"bg":{"type":"grass","width":500,"height":250,"kickOffRadius":10,"cornerRadius":0,"color":"008000"},"vertexes":[{"x":420,"y":600,"trait":"ballArea"},{"x":420,"y":-600,"trait":"ballArea"},{"x":285,"y":500,"trait":"gkArea"},{"x":285,"y":-500,"trait":"gkArea"},{"x":315,"y":500,"trait":"gkArea"},{"x":315,"y":-500,"trait":"gkArea"},{"x":-475,"y":-200,"trait":"penArea"},{"x":-10,"y":-190,"trait":"penArea"},{"x":-10,"y":190,"trait":"penArea"},{"x":-475,"y":200,"trait":"penArea"},{"x":300,"y":-250,"trait":"line"},{"x":300,"y":250,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":0,"y":9,"trait":"line"},{"x":0,"y":-9,"trait":"line"},{"x":175,"y":-175,"trait":"line"},{"x":300,"y":-175,"trait":"line"},{"x":175,"y":175,"trait":"line"},{"x":300,"y":175,"trait":"line"},{"x":-120,"y":-250,"trait":"line"},{"x":-120,"y":250,"trait":"line"},{"x":-120,"y":-190,"trait":"line"},{"x":-120,"y":190,"trait":"line"},{"x":300,"y":-100,"trait":"line"},{"x":350,"y":-98,"trait":"line"},{"x":350,"y":98,"trait":"line"},{"x":300,"y":100,"trait":"line"},{"x":0,"y":-15,"trait":"powerboost"},{"x":0,"y":15,"trait":"powerboost"},{"x":400,"y":-135,"trait":"line"},{"x":400,"y":135,"trait":"line"},{"x":-120,"y":180,"trait":"timebar_moving_ball_stop"},{"x":-120,"y":120,"trait":"timebar_moving_ball_stop"},{"x":-120,"y":-100,"cMask":["none"],"cGroup":["none"]},{"x":-120,"y":100,"cMask":["none"],"cGroup":["none"]},{"x":-10,"y":-100,"cMask":["none"],"cGroup":["none"]},{"x":-10,"y":100,"cMask":["none"],"cGroup":["none"]}],"segments":[{"v0":0,"v1":1,"trait":"ballArea"},{"v0":2,"v1":3,"trait":"gkArea"},{"v0":4,"v1":5,"trait":"gkArea"},{"v0":6,"v1":7,"trait":"penArea"},{"v0":7,"v1":8,"curve":50,"trait":"penArea"},{"v0":8,"v1":9,"trait":"penArea"},{"v0":9,"v1":6,"trait":"penArea"},{"v0":10,"v1":11,"trait":"line"},{"v0":12,"v1":13,"curve":-180,"trait":"line"},{"v0":14,"v1":15,"curve":180,"trait":"line"},{"v0":16,"v1":17,"trait":"line"},{"v0":16,"v1":18,"trait":"line"},{"v0":18,"v1":19,"trait":"line"},{"v0":20,"v1":21,"trait":"line"},{"v0":22,"v1":23,"curve":-140,"trait":"line"},{"v0":24,"v1":25,"curve":10,"trait":"goalnet"},{"v0":25,"v1":26,"curve":10,"trait":"goalnet"},{"v0":26,"v1":27,"curve":10,"trait":"goalnet"},{"v0":28,"v1":29,"curve":180,"trait":"powerboost"},{"v0":25,"v1":30,"trait":"line"},{"v0":26,"v1":31,"trait":"line"},{"v0":32,"v1":33,"trait":"timebar_moving_ball_stop"},{"v0":34,"v1":35,"trait":"dangerZoneMinX","x":-120},{"v0":36,"v1":37,"trait":"dangerZoneMaxX","x":-10},{"v0":34,"v1":36,"trait":"dangerZoneMinY","y":-100},{"v0":35,"v1":37,"trait":"dangerZoneMaxY","y":100}],"goals":[{"p0":[310,100],"p1":[310,-100],"team":"blue"},{"p0":[300,100],"p1":[-400,100],"team":"red"},{"p0":[300,-100],"p1":[-400,-100],"team":"red"},{"p0":[-10,250],"p1":[-10,-250],"team":"red"}],"discs":[{"pos":[300,100],"trait":"goalPost"},{"pos":[300,-100],"trait":"goalPost"},{"pos":[400,-135],"trait":"stanchion"},{"pos":[400,135],"trait":"stanchion"},{"pos":[-400,-1385],"trait":"arrow"},{"pos":[-340,-1385],"trait":"arrow"},{"pos":[-355,-1400],"trait":"arrow"},{"pos":[-355,-1370],"trait":"arrow"},{"pos":[-120,150],"trait":"timebar_ball_constant"},{"pos":[120,150],"trait":"timebar_ball_constant_2"},{"pos":[120,150],"trait":"timebar_ball_moving","speed":[-0.4,0]},{"pos":[1135,130],"trait":"number_indicator_0"},{"pos":[1160,130],"trait":"number_indicator_0"},{"pos":[1160,170],"trait":"number_indicator_0"},{"pos":[1135,170],"trait":"number_indicator_0"},{"pos":[1135,130],"trait":"number_indicator_1"},{"pos":[1135,170],"trait":"number_indicator_1"},{"pos":[1135,130],"trait":"number_indicator_2"},{"pos":[1160,130],"trait":"number_indicator_2"},{"pos":[1160,150],"trait":"number_indicator_2"},{"pos":[1135,150],"trait":"number_indicator_2"},{"pos":[1135,170],"trait":"number_indicator_2"},{"pos":[1160,170],"trait":"number_indicator_2"},{"pos":[1135,130],"trait":"number_indicator_3"},{"pos":[1160,130],"trait":"number_indicator_3"},{"pos":[1160,170],"trait":"number_indicator_3"},{"pos":[1135,170],"trait":"number_indicator_3"},{"pos":[1135,150],"trait":"number_indicator_3"},{"pos":[1160,150],"trait":"number_indicator_3"},{"pos":[1135,130],"trait":"number_indicator_4"},{"pos":[1160,130],"trait":"number_indicator_4"},{"pos":[1135,150],"trait":"number_indicator_4"},{"pos":[1160,170],"trait":"number_indicator_4"},{"pos":[1160,150],"trait":"number_indicator_4"},{"pos":[1160,130],"trait":"number_indicator_5"},{"pos":[1135,130],"trait":"number_indicator_5"},{"pos":[1135,150],"trait":"number_indicator_5"},{"pos":[1160,150],"trait":"number_indicator_5"},{"pos":[1160,170],"trait":"number_indicator_5"},{"pos":[1135,170],"trait":"number_indicator_5"},{"pos":[1160,130],"trait":"number_indicator_6"},{"pos":[1135,130],"trait":"number_indicator_6"},{"pos":[1135,170],"trait":"number_indicator_6"},{"pos":[1160,170],"trait":"number_indicator_6"},{"pos":[1160,150],"trait":"number_indicator_6"},{"pos":[1135,150],"trait":"number_indicator_6"},{"pos":[1135,130],"trait":"number_indicator_7"},{"pos":[1160,130],"trait":"number_indicator_7"},{"pos":[1160,170],"trait":"number_indicator_7"},{"pos":[1135,130],"trait":"number_indicator_8"},{"pos":[1160,130],"trait":"number_indicator_8"},{"pos":[1160,170],"trait":"number_indicator_8"},{"pos":[1135,170],"trait":"number_indicator_8"},{"pos":[1135,150],"trait":"number_indicator_8"},{"pos":[1160,150],"trait":"number_indicator_8"},{"pos":[1135,130],"trait":"number_indicator_9"},{"pos":[1160,130],"trait":"number_indicator_9"},{"pos":[1160,170],"trait":"number_indicator_9"},{"pos":[1135,170],"trait":"number_indicator_9"},{"pos":[1135,150],"trait":"number_indicator_9"},{"pos":[1160,150],"trait":"number_indicator_9"}],"planes":[{"normal":[0,1],"dist":-200,"trait":"ballArea","_data":{"extremes":{"normal":[0,1],"dist":-200,"canvas_rect":[-710,-1400,1160,600],"a":[-710,-200],"b":[1160,-200]}}},{"normal":[0,-1],"dist":-200,"trait":"ballArea","_data":{"extremes":{"normal":[0,-1],"dist":-200,"canvas_rect":[-710,-1400,1160,600],"a":[-710,200],"b":[1160,200]}}},{"normal":[0,1],"dist":-250,"bCoef":0.1,"_data":{"extremes":{"normal":[0,1],"dist":-250,"canvas_rect":[-710,-1400,1160,600],"a":[-710,-250],"b":[1160,-250]}}},{"normal":[0,-1],"dist":-250,"bCoef":0.1,"_data":{"extremes":{"normal":[0,-1],"dist":-250,"canvas_rect":[-710,-1400,1160,600],"a":[-710,250],"b":[1160,250]}}},{"normal":[1,0],"dist":-400,"bCoef":0.1,"_data":{"extremes":{"normal":[1,0],"dist":-400,"canvas_rect":[-710,-1400,1160,600],"a":[-400,-1400],"b":[-400,600]}}},{"normal":[-1,0],"dist":-400,"bCoef":0.1,"_data":{"extremes":{"normal":[-1,0],"dist":-400,"canvas_rect":[-710,-1400,1160,600],"a":[400,-1400],"b":[400,600]}}}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"gkArea":{"vis":false,"bCoef":0,"cMask":["blue"]},"penArea":{"vis":false,"bCoef":0,"cMask":["red"]},"line":{"vis":true,"color":"C7E6BD","cMask":[]},"goalnet":{"vis":true,"bCoef":0.1,"color":"C7E6BD","cMask":["ball","red","blue"]},"powerboost":{"vis":false,"bCoef":-2.4,"cMask":["ball"],"color":"C7E6BD"},"goalPost":{"radius":5,"invMass":0,"bCoef":1.3,"color":"FFFFFF"},"stanchion":{"radius":3,"invMass":0,"bCoef":1,"color":"FFFFFF"},"arrow":{"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"],"radius":0},"timebar_ball_constant":{"bCoef":0,"radius":0,"invMass":0,"damping":0,"cMask":["c1"],"cGroup":["c1"]},"timebar_ball_constant_2":{"bCoef":0,"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"timebar_ball_moving":{"bCoef":0,"radius":0,"invMass":5e-324,"damping":1,"cMask":["c1"],"cGroup":["c1"]},"timebar_moving_ball_stop":{"vis":false,"bCoef":0,"cMask":["c1"],"cGroup":["c1"],"bias":-280},"number_indicator_0":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_1":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_2":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_3":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_4":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_5":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_6":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_7":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_8":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"number_indicator_9":{"radius":0,"invMass":0,"damping":0,"cMask":["none"],"cGroup":["none"]},"dangerZoneMinX":{"vis":false,"cMask":["none"],"cGroup":["none"]},"dangerZoneMaxX":{"vis":false,"cMask":["none"],"cGroup":["none"]},"dangerZoneMinY":{"vis":false,"cMask":["none"],"cGroup":["none"]},"dangerZoneMaxY":{"vis":false,"cMask":["none"],"cGroup":["none"]}},"joints":[{"d0":5,"d1":6,"color":"FF0000"},{"d0":6,"d1":7,"color":"FF0000"},{"d0":6,"d1":8,"color":"FF0000"},{"d0":9,"d1":10,"color":"718C5A"},{"d0":9,"d1":11,"color":"C7E6BD","length":[0,240]},{"d0":12,"d1":13,"color":"FF0000"},{"d0":13,"d1":14,"color":"FF0000"},{"d0":14,"d1":15,"color":"FF0000"},{"d0":12,"d1":15,"color":"FF0000"},{"d0":16,"d1":17,"color":"FF4000"},{"d0":18,"d1":19,"color":"FF8000"},{"d0":19,"d1":20,"color":"FF8000"},{"d0":20,"d1":21,"color":"FF8000"},{"d0":21,"d1":22,"color":"FF8000"},{"d0":22,"d1":23,"color":"FF8000"},{"d0":24,"d1":25,"color":"FFC000"},{"d0":25,"d1":26,"color":"FFC000"},{"d0":26,"d1":27,"color":"FFC000"},{"d0":28,"d1":29,"color":"FFC000"},{"d0":30,"d1":32,"color":"FFFF00"},{"d0":31,"d1":33,"color":"FFFF00"},{"d0":32,"d1":34,"color":"FFFF00"},{"d0":35,"d1":36,"color":"C0FF00"},{"d0":36,"d1":37,"color":"C0FF00"},{"d0":37,"d1":38,"color":"C0FF00"},{"d0":38,"d1":39,"color":"C0FF00"},{"d0":39,"d1":40,"color":"C0FF00"},{"d0":41,"d1":42,"color":"80FF00"},{"d0":42,"d1":43,"color":"80FF00"},{"d0":43,"d1":44,"color":"80FF00"},{"d0":44,"d1":45,"color":"80FF00"},{"d0":45,"d1":46,"color":"80FF00"},{"d0":47,"d1":48,"color":"40FF00"},{"d0":48,"d1":49,"color":"40FF00"},{"d0":50,"d1":51,"color":"00FF00"},{"d0":51,"d1":52,"color":"00FF00"},{"d0":52,"d1":53,"color":"00FF00"},{"d0":50,"d1":53,"color":"00FF00"},{"d0":54,"d1":55,"color":"00FF00"},{"d0":56,"d1":57,"color":"00FF40"},{"d0":57,"d1":58,"color":"00FF40"},{"d0":58,"d1":59,"color":"00FF40"},{"d0":56,"d1":60,"color":"00FF40"},{"d0":60,"d1":61,"color":"00FF40"}],"redSpawnPoints":[],"blueSpawnPoints":[],"cameraFollow":"player","kickOffReset":"full","cameraWidth":1000,"cameraHeight":1000,"maxViewWidth":2000,"ballPhysics":{"radius":10},"playerPhysics":{"radius":15,"damping":0.96,"acceleration":0.1,"invMass":0.5,"bCoef":0.5}}`;

  return penMap;
}

function getFutsalMap() {
  var futsalMap = `{"name":"realmadrid   [\u029c\u1d00x\u1d0d\u1d0f\u1d05s.\u1d04\u1d0f\u1d0d]","width":775,"height":375,"spawnDistance":350,"bg":{"type":"","width":700,"height":320,"kickOffRadius":100,"cornerRadius":0,"color":"2F3F52"},"vertexes":[{"x":1,"y":-106,"bCoef":0.3,"cMask":["red","blue"],"cGroup":["blueKO"],"trait":"goalPost","curve":0,"color":"00529f"},{"x":1,"y":105,"bCoef":0.3,"cMask":["red","blue"],"cGroup":["blueKO"],"trait":"goalPost","curve":0,"color":"00529f"},{"x":0.8802073603599752,"y":-93.78115075658499,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-180,"color":"00529f"},{"x":0.8802073603599752,"y":91.9426022791,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-180,"color":"00529f"},{"x":1,"y":-103,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-180},{"x":1,"y":102,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-180},{"x":1,"y":96,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":1,"y":-97,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-54,"y":46,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":65,"color":"00529f"},{"x":-64,"y":57,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-100,"color":"00529f"},{"x":-68,"y":-26,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":65},{"x":-42,"y":-77,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-100},{"x":-22,"y":-56,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":18,"y":-57,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":42,"y":-77,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":120},{"x":38,"y":79,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":12,"y":55,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":0,"y":55,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":0,"y":69,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-15,"y":69,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-16,"y":55,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":90},{"x":-59,"y":-16,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":90},{"x":-42,"y":-1,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-18,"y":36,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-18,"y":25,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-46,"y":-60,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":90,"color":"febe10"},{"x":-35,"y":-49,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"febe10","curve":-130},{"x":-12,"y":-45,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":11,"y":-44,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":-1,"y":-33,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":10,"y":-22,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":21,"y":-34,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":35,"y":-22,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":47,"y":-31,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-25},{"x":34,"y":-46,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-25},{"x":45,"y":-57,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":70},{"x":62,"y":31,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":70},{"x":1,"y":99,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":180},{"x":1,"y":-100,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":180},{"x":-63,"y":52,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":100},{"x":-42,"y":-72,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":100},{"x":-24,"y":-53,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":20,"y":-53.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":42,"y":-72.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":95},{"x":64,"y":53,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-59,"y":46,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":90},{"x":-13,"y":52.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-130},{"x":-13,"y":65.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-3,"y":65.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-4,"y":52.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":13,"y":52.5,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-35},{"x":43,"y":35,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-35},{"x":34,"y":28,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":45},{"x":-3,"y":42,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":45},{"x":-3,"y":26,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":15,"y":26,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":15,"y":17,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-4,"y":17,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-4,"y":6,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":15,"y":6,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":15,"y":-3,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-13,"y":-3,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-13,"y":41,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":130},{"x":-25,"y":-40,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-3,"y":-14,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":21,"y":-39,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":36,"y":-26,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":42,"y":-32,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":29,"y":-45,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":45,"y":-61,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":85},{"x":58,"y":46,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-49,"y":-100,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":48,"y":-102,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":53,"y":-110,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":50},{"x":-54,"y":-109,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":50},{"x":-55,"y":-112,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":54,"y":-114,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-58,"y":-115,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":67.38013505196},{"x":57,"y":-117,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":67,"y":-115,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":90},{"x":-68,"y":-115,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":67.38013505196},{"x":-71,"y":-123,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-90},{"x":35,"y":-165,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":30},{"x":-36,"y":-164,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-30},{"x":4,"y":-179,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-3,"y":-179,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-30},{"x":4,"y":-187,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":0},{"x":-3,"y":-187,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-9,"y":-187,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-9,"y":-194,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-3,"y":-194,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-3,"y":-200,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":3,"y":-200,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":4,"y":-194,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":10,"y":-194,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":10,"y":-187,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"x":-42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":-58,"y":-122,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-39,"y":-129,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-50,"y":-131,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-25},{"x":57,"y":-124,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":35,"y":-130,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":49,"y":-131,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":-6,"y":-170,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":10},{"x":-6,"y":-132,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":10},{"x":-19,"y":-141,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-29,"y":-129,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-30,"y":-153,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":80},{"x":6,"y":-170,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-10},{"x":6,"y":-132,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-10},{"x":16,"y":-140,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":24,"y":-130,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":27,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-80},{"x":-32,"y":-147,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":-5,"y":-155,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":4,"y":-155,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":30,"y":-148,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":38,"y":-145,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":56,"y":-139,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","color":"ee324e","curve":45},{"x":-42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":-58,"y":-122,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-29,"y":-129,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-30,"y":-153,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":80},{"x":-6,"y":-170,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":10},{"x":-6,"y":-132,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":10},{"x":6,"y":-170,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-10},{"x":6,"y":-132,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-10},{"x":24,"y":-130,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":27,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-80},{"x":42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-25},{"x":35,"y":-130,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-25},{"x":57,"y":-124,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":60},{"x":-40,"y":-145,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-45},{"x":-58,"y":-138,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-45},{"x":-42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":-39,"y":-129,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-42,"y":-154,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":25},{"x":-58,"y":-122,"bCoef":0.5,"cMask":["wall"],"trait":"goalPost","curve":-60},{"x":-702,"y":-322,"bCoef":1,"cMask":["ball"]},{"x":702,"y":-322,"bCoef":1,"cMask":["all"],"cGroup":["all"],"radius":5},{"x":702,"y":322,"bCoef":1,"cMask":["ball"],"bias":10},{"x":-702,"y":322,"bCoef":1,"cMask":["ball"],"bias":-10},{"x":-702,"y":-85,"bCoef":1,"cMask":["ball"],"color":"1B2124","curve":-5},{"x":-702,"y":85,"bCoef":1,"cMask":["ball"],"bias":-10,"color":"1B2124","curve":-5},{"x":702,"y":-85,"bCoef":1,"cMask":["ball"],"color":"1B2124","curve":5},{"x":702,"y":85,"bCoef":1,"cMask":["ball"],"bias":10,"color":"1B2124","curve":5},{"x":738,"y":-85,"bCoef":0.3,"cMask":["ball"],"cGroup":["ball"],"trait":"goalPost","color":"1B2124","curve":5},{"x":738,"y":85,"cMask":["ball"],"color":"1B2124","curve":5},{"x":-738,"y":-85,"cMask":["ball"],"color":"1B2124","curve":-5},{"x":-738,"y":85,"cMask":["ball"],"color":"1B2124","curve":-5},{"x":0,"y":-320,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"425973"},{"x":0,"y":-201,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"425973"},{"x":0,"y":320,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"425973"},{"x":0,"y":106,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"425973"},{"x":-699,"y":322,"bCoef":1,"cMask":["ball"],"bias":-10,"color":"425973"},{"x":-699,"y":85,"bCoef":1,"cMask":["ball"],"bias":-10,"color":"425973"},{"x":702,"y":319,"bCoef":1,"cMask":["ball"],"bias":10,"color":"425973"},{"x":-702,"y":319,"bCoef":1,"cMask":["ball"],"bias":-10,"color":"425973"},{"x":699,"y":322,"bCoef":1,"cMask":["ball"],"bias":10,"color":"425973"},{"x":699,"y":85,"bCoef":1,"cMask":["ball"],"bias":10,"color":"425973"},{"x":699,"y":-322,"bCoef":1,"cMask":["all"],"cGroup":["all"],"radius":5,"color":"425973"},{"x":699,"y":-85,"bCoef":1,"cMask":["ball"],"color":"425973"},{"x":-702,"y":-319,"bCoef":1,"cMask":["ball"],"color":"425973"},{"x":702,"y":-319,"bCoef":1,"cMask":["all"],"cGroup":["all"],"radius":5,"color":"425973"},{"x":-699,"y":-322,"bCoef":1,"cMask":["ball"],"color":"425973"},{"x":-699,"y":-85,"bCoef":1,"cMask":["ball"],"color":"425973"},{"x":-702,"y":-322,"bCoef":1,"cMask":["ball"]},{"x":702,"y":-322,"bCoef":1,"cMask":["all"],"cGroup":["all"],"radius":5},{"x":-702,"y":-322,"bCoef":1,"cMask":["ball"]},{"x":-702,"y":-85,"bCoef":1,"cMask":["ball"]},{"x":-702,"y":322,"bCoef":1,"cMask":["ball"],"bias":-10},{"x":-702,"y":85,"bCoef":1,"cMask":["ball"],"bias":-10},{"x":702,"y":322,"bCoef":1,"cMask":["ball"],"bias":10},{"x":-702,"y":322,"bCoef":1,"cMask":["ball"],"bias":-10},{"x":702,"y":322,"bCoef":1,"cMask":["ball"],"bias":10},{"x":702,"y":85,"bCoef":1,"cMask":["ball"],"bias":10},{"x":702,"y":-322,"bCoef":1,"cMask":["all"],"cGroup":["all"],"radius":5},{"x":702,"y":-85,"bCoef":1,"cMask":["ball"]},{"x":0,"y":-360,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":0,"y":360,"cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"x":-400,"y":318,"bCoef":1,"cGroup":["c0"]},{"x":-400,"y":-318,"bCoef":1,"cGroup":["c0"]},{"x":400,"y":-318,"bCoef":1,"cGroup":["c0"]},{"x":400,"y":318,"bCoef":1,"cGroup":["c0"]},{"x":399,"y":90,"bCoef":1,"cGroup":["c0"]},{"x":399,"y":-90,"bCoef":1,"cGroup":["c0"]},{"x":698,"y":-150,"bCoef":1,"cGroup":["c0"]},{"x":610,"y":-150,"bCoef":1,"cGroup":["c0"]},{"x":610,"y":150,"bCoef":1,"cGroup":["c0"]},{"x":698,"y":150,"bCoef":1,"cGroup":["c0"]},{"x":-698,"y":-150,"bCoef":1,"cGroup":["c0"]},{"x":-610,"y":-150,"bCoef":1,"cGroup":["c0"]},{"x":-610,"y":150,"bCoef":1,"cGroup":["c0"]},{"x":-698,"y":150,"bCoef":1,"cGroup":["c0"]},{"x":-399,"y":-90,"bCoef":1,"cGroup":["c0"]},{"x":-399,"y":90,"bCoef":1,"cGroup":["c0"]}],"segments":[{"v0":0,"v1":1,"curve":-180,"color":"00529f","bCoef":0.5,"cMask":["red","blue"],"cGroup":["blueKO"],"trait":"goalPost"},{"v0":2,"v1":3,"curve":180,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":2,"v1":3,"curve":-180,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":4,"v1":5,"curve":180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":4,"v1":5,"curve":-180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":6,"v1":7,"curve":-180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":7,"v1":6,"curve":-180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":8,"v1":9,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":8,"v1":10,"curve":65,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":11,"v1":9,"curve":-100,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":11,"v1":12,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":12,"v1":13,"curve":25,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":13,"v1":14,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":14,"v1":15,"curve":120,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":16,"v1":15,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":17,"v1":16,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":17,"v1":18,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":18,"v1":19,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":19,"v1":20,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":20,"v1":21,"curve":90,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":21,"v1":10,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":22,"v1":23,"curve":-60,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":24,"v1":23,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":22,"v1":24,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":25,"v1":26,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":27,"v1":28,"curve":25,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":28,"v1":29,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":29,"v1":27,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":30,"v1":31,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":31,"v1":32,"curve":25,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":32,"v1":33,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":33,"v1":34,"curve":-25,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":34,"v1":35,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":35,"v1":36,"curve":70,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":36,"v1":30,"curve":0,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":37,"v1":38,"curve":-180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":37,"v1":38,"curve":180,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":39,"v1":40,"curve":100,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":40,"v1":41,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":41,"v1":42,"curve":25,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":42,"v1":43,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":43,"v1":44,"curve":95,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":39,"v1":45,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":45,"v1":25,"curve":92.123039047009,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":26,"v1":46,"curve":-130,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":46,"v1":47,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":47,"v1":48,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":48,"v1":49,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":49,"v1":50,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":50,"v1":51,"curve":-35,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":51,"v1":52,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":52,"v1":53,"curve":45,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":54,"v1":53,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":54,"v1":55,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":55,"v1":56,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":56,"v1":57,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":57,"v1":58,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":58,"v1":59,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":59,"v1":60,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":60,"v1":61,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":61,"v1":62,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":62,"v1":63,"curve":130,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":63,"v1":64,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":64,"v1":65,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":65,"v1":66,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":66,"v1":67,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":67,"v1":68,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":68,"v1":69,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":69,"v1":70,"curve":85,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":70,"v1":44,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":71,"v1":72,"curve":50,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":72,"v1":73,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":71,"v1":74,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":74,"v1":73,"curve":50,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":75,"v1":76,"curve":50,"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":77,"v1":78,"curve":50,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":78,"v1":79,"curve":-67.38013505196,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":77,"v1":80,"curve":67.38013505196,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":81,"v1":80,"curve":-90,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":82,"v1":79,"curve":90,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":83,"v1":81,"curve":-90,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":84,"v1":82,"curve":30,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":85,"v1":83,"curve":-30,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":84,"v1":86,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":87,"v1":85,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":87,"v1":88,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":88,"v1":89,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":89,"v1":90,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":90,"v1":91,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":91,"v1":92,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":92,"v1":93,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":93,"v1":94,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":94,"v1":95,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":95,"v1":86,"curve":0,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":98,"v1":99,"curve":-60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":99,"v1":97,"curve":-60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":102,"v1":103,"curve":60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":103,"v1":101,"curve":60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":105,"v1":106,"curve":-60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":106,"v1":107,"curve":-60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":108,"v1":104,"curve":60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":110,"v1":111,"curve":60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":111,"v1":112,"curve":60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":113,"v1":109,"curve":-60,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":114,"v1":115,"curve":45,"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":116,"v1":117,"curve":45,"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":118,"v1":119,"curve":45,"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":122,"v1":123,"curve":80,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":124,"v1":125,"curve":10,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":126,"v1":127,"curve":-10,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":128,"v1":129,"curve":-80,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":130,"v1":131,"curve":-25,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":132,"v1":133,"curve":80,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":134,"v1":135,"curve":-45,"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":136,"v1":137,"curve":25,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":138,"v1":139,"curve":-80,"color":"febe10","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"v0":140,"v1":141,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"y":-322},{"v0":142,"v1":143,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"y":322},{"v0":140,"v1":144,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":10,"x":-702},{"v0":143,"v1":145,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"x":-702},{"v0":141,"v1":146,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"x":702},{"v0":142,"v1":147,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":10,"x":702},{"v0":146,"v1":148,"curve":5,"color":"1B2124","bCoef":0.3,"cMask":["ball"],"cGroup":["ball"],"trait":"goalPost"},{"v0":148,"v1":149,"curve":5,"color":"1B2124","cMask":["ball"]},{"v0":149,"v1":147,"curve":5,"color":"1B2124","cMask":["ball"]},{"v0":144,"v1":150,"curve":-5,"color":"1B2124","cMask":["ball"]},{"v0":150,"v1":151,"curve":-5,"color":"1B2124","cMask":["ball"]},{"v0":151,"v1":145,"curve":-5,"color":"1B2124","cMask":["ball"]},{"v0":0,"v1":1,"curve":180,"color":"00529f","cMask":["red","blue"],"cGroup":["redKO"]},{"v0":152,"v1":153,"curve":0,"color":"425973","cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":154,"v1":155,"curve":0,"color":"425973","cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":153,"v1":4,"curve":0,"vis":false,"color":"1B2124","cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":156,"v1":157,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":-10,"x":-699},{"v0":158,"v1":159,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":-10,"y":319},{"v0":160,"v1":161,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":10,"x":699},{"v0":162,"v1":163,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":-10,"x":699},{"v0":164,"v1":165,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":-10,"y":-319},{"v0":166,"v1":167,"curve":0,"color":"425973","bCoef":1,"cMask":["ball"],"bias":10,"x":-699},{"v0":168,"v1":169,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"y":-322},{"v0":170,"v1":171,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":10,"x":-702},{"v0":172,"v1":173,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"x":-702},{"v0":174,"v1":175,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"y":322},{"v0":176,"v1":177,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":10,"x":702},{"v0":178,"v1":179,"curve":0,"color":"1B2124","bCoef":1,"cMask":["ball"],"bias":-10,"x":702},{"v0":152,"v1":180,"curve":0,"vis":false,"color":"1B2124","cMask":["red","blue"],"cGroup":["redKO","blueKO"],"x":0},{"v0":154,"v1":181,"curve":0,"vis":false,"color":"1B2124","cMask":["red","blue"],"cGroup":["redKO","blueKO"]},{"v0":182,"v1":183,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"],"x":-400},{"v0":184,"v1":185,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"],"x":400},{"v0":186,"v1":187,"curve":120,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":188,"v1":189,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":189,"v1":190,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":190,"v1":191,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":192,"v1":193,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":193,"v1":194,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":194,"v1":195,"curve":0,"color":"425973","bCoef":1,"cGroup":["c0"]},{"v0":196,"v1":197,"curve":120,"color":"425973","bCoef":1,"cGroup":["c0"]}],"goals":[{"p0":[705,-85],"p1":[705,85],"team":"blue"},{"p0":[-705,-85],"p1":[-705,85],"team":"red"}],"discs":[{"radius":4,"pos":[0,-140],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":4,"pos":[-35,-134],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":4,"pos":[32,-134],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":4,"pos":[64,-123],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":4,"pos":[-64,-123],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-64,-132],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-58,-147],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-52,-153],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-44,-157],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-62,-140],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-9,-173],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-18,-170],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-26,-165],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-32,-159],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-37,-151],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-37,-142],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[0,-166],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[0,-158],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[0,-149],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[9,-173],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[17,-170],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[25,-166],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[30,-159],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[33,-151],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-52,-104],"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[40,-158],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[47,-154],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[55,-149],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[60,-142],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[62,-133],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[51,-105],"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[42,-109],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-43,-108],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[15,-115],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-13,-115],"color":"FFFFFF","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-33,-111],"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-23,-114],"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[24,-114],"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[33,-112],"color":"00529f","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[-4,-116],"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":3,"pos":[5,-116],"color":"ee324e","bCoef":0.5,"cMask":["wall"],"trait":"goalPost"},{"radius":5.5,"invMass":0,"pos":[700,-85],"color":"1B2124","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5.5,"invMass":0,"pos":[700,85],"color":"1B2124","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5.5,"invMass":0,"pos":[-700,85],"color":"1B2124","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5.5,"invMass":0,"pos":[-700,-85],"color":"1B2124","bCoef":1,"cMask":["all"],"cGroup":["all"]}],"planes":[{"normal":[0,1],"dist":-360,"cMask":["red","blue"]},{"normal":[0,-1],"dist":-360,"cMask":["red","blue"]},{"normal":[1,0],"dist":-770,"cMask":["red","blue"]},{"normal":[-1,0],"dist":-770,"cMask":["red","blue"]}],"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"joints":[],"redSpawnPoints":[],"blueSpawnPoints":[],"playerPhysics":{"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":4.8,"kickback":0,"radius":15,"bCoef":0,"invMass":0.5,"damping":0.96,"acceleration":0.11,"cGroup":["red","blue"],"gravity":[0,0]},"ballPhysics":{"radius":6,"bCoef":0.443,"invMass":2.1,"damping":0.99,"color":"bebebe","cMask":["all"],"cGroup":["ball"],"gravity":[0,0]},"kickOffReset":"full","canBeStored":true,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball"}`;

  return futsalMap;
}

function getWinnerMap() {
  var winnerMap = `{

    "name" : "RSI Podium",
  
    "width" : 625,
  
    "height" : 425,
  
    "cameraWidth" : 800,
  
    "cameraHeight" : 400,
  
    "maxViewWidth" : 0,
  
    "cameraFollow" : "player",
  
    "spawnDistance" : 170,
  
    "redSpawnPoints" : [
      [ -78, 120
      ],
      [ -88, 95
      ],
      [ -51, 138
      ],
      [ -91, 138
      ],
      [ -126, 138
      ],
      [ -65, 98
      ],
      [ 43, 138
      ],
      [ 83, 138
      ],
      [ 119, 138
      ],
      [ 52, 98
      ],
      [ 100, 98
      ],
      [ -105, 98
      ]
  
    ],
  
    "blueSpawnPoints" : [
      
  
    ],
  
    "canBeStored" : false,
  
    "kickOffReset" : "partial",
  
    "bg" : { "color" : "404447", "type" : "", "height" : 300, "width" : 700 },
  
    "traits" : {
      "ballArea" : { "vis" : false, "bCoef" : 1, "cMask" : ["ball" ] },
      "goalPost" : { "radius" : 8, "invMass" : 0, "bCoef" : 0.5 },
      "goalNet" : { "vis" : true, "bCoef" : 0.1, "cMask" : ["ball" ] },
      "kickOffBarrier" : { "vis" : false, "bCoef" : 0.1, "cGroup" : ["redKO","blueKO" ], "cMask" : ["red","blue" ] }
  
    },
  
    "vertexes" : [
      /* 0 */ { "x" : 11.081942101065067, "y" : -129.79789097167054, "color" : "D5E0ED" },
      /* 1 */ { "x" : 15.55703514486793, "y" : -190.29927927552478, "color" : "D5E0ED" },
      /* 2 */ { "x" : 15.55703514486793, "y" : -190.29927927552478, "color" : "D5E0ED" },
      /* 3 */ { "x" : 13.2211349296961, "y" : -158.71888428175475, "color" : "D5E0ED" },
      /* 4 */ { "x" : 73.85289026559778, "y" : -123.62335695075618, "color" : "D5E0ED" },
      /* 5 */ { "x" : 79.38943004457802, "y" : -162.384737031572, "color" : "D5E0ED" },
      /* 6 */ { "x" : 147.45558187337076, "y" : -171.00866240720683, "color" : "D5E0ED" },
      /* 7 */ { "x" : 129.41204476329852, "y" : -116.85879125006346, "color" : "D5E0ED" },
      /* 8 */ { "x" : 147.12315666291002, "y" : -171.03325083052437, "curve" : 150.21796687738058, "color" : "D5E0ED" },
      /* 9 */ { "x" : 129.0796195528378, "y" : -116.88337967338113, "curve" : 150.21796687738058, "color" : "D5E0ED" },
      /* 10 */ { "x" : 185.45374790269742, "y" : -97.79515375933777, "color" : "D5E0ED" },
      /* 11 */ { "x" : 205.1971736226124, "y" : -155.94417139466253, "color" : "D5E0ED" },
      /* 12 */ { "x" : 216.89887480332533, "y" : -87.01535811176599, "color" : "D5E0ED" },
      /* 13 */ { "x" : 236.61625656684035, "y" : -145.83053350376662, "color" : "D5E0ED" },
      /* 14 */ { "x" : -194.23277651575052, "y" : -98.43836650584149, "color" : "D5E0ED" },
      /* 15 */ { "x" : -211.57116786861846, "y" : -155.78655838659566, "color" : "D5E0ED" },
      /* 16 */ { "x" : -233.85779843955075, "y" : -85.99373694515512, "color" : "D5E0ED" },
      /* 17 */ { "x" : -250.89528731286202, "y" : -142.3896743047696, "color" : "D5E0ED" },
      /* 18 */ { "x" : -240.91964372390382, "y" : -111.38262155722116, "curve" : 0, "color" : "D5E0ED" },
      /* 19 */ { "x" : -120.53251478624477, "y" : -119.81853430415934, "color" : "D5E0ED" },
      /* 20 */ { "x" : -155.68882406587616, "y" : -173.22401182235035, "color" : "D5E0ED" },
      /* 21 */ { "x" : -158.4152500800906, "y" : -109.25084087398324, "color" : "D5E0ED" },
      /* 22 */ { "x" : -156.31245839076283, "y" : -133.16086760383874, "color" : "D5E0ED" },
      /* 23 */ { "x" : -134.75495954879634, "y" : -139.9224271963485, "color" : "D5E0ED" },
      /* 24 */ { "x" : -267.2993267628896, "y" : -71.49987663718129, "color" : "D5E0ED" },
      /* 25 */ { "x" : -287.9154677595333, "y" : -127.17230405732306, "color" : "D5E0ED" },
      /* 26 */ { "x" : 273.4877755964566, "y" : -97.79366344055533, "color" : "D5E0ED" },
      /* 27 */ { "x" : 296.91168866418275, "y" : -124.18578894681069, "color" : "D5E0ED" },
      /* 28 */ { "x" : 268.61270977320015, "y" : -101.82003655770109, "color" : "D5E0ED" },
      /* 29 */ { "x" : 241.94636294379006, "y" : -78.70878520871675, "color" : "D5E0ED" },
      /* 30 */ { "x" : -85.7961824235166, "y" : 183, "color" : "2b2b2b", "bias" : -5 },
      /* 31 */ { "x" : -62.64483161082165, "y" : 121.54459176664852, "bias" : -5, "color" : "2b2b2b" },
      /* 32 */ { "x" : 76.60373430671126, "y" : 183, "color" : "2b2b2b", "bias" : 5 },
      /* 33 */ { "x" : 61.282987445369, "y" : 121.88505280801168, "bias" : 5, "color" : "2b2b2b" },
      /* 34 */ { "x" : -36.853332071199844, "y" : -130.15404391640783, "color" : "D5E0ED" },
      /* 35 */ { "x" : -40.35644407845471, "y" : -191.24555437988448, "color" : "D5E0ED" },
      /* 36 */ { "x" : -89.96663748361871, "y" : -126.0608097495306, "color" : "D5E0ED" },
      /* 37 */ { "x" : -95.99343335063955, "y" : -184.6650374925445, "color" : "D5E0ED" },
      /* 38 */ { "x" : -66.7007247167524, "y" : -160.43825023359915, "color" : "D5E0ED" },
      /* 39 */ { "x" : -201.99628564948182, "y" : -124.40600580790013, "curve" : 0, "color" : "D5E0ED" },
      /* 40 */ { "x" : 84.39355674804591, "y" : -189.76438274811215, "color" : "D5E0ED" },
      /* 41 */ { "x" : 82.60074220318313, "y" : -179.38082322199756, "color" : "D5E0ED" },
      /* 42 */ { "x" : 84.30525630151726, "y" : -189.77091404805577, "curve" : 150.21796687738058, "color" : "D5E0ED" },
      /* 43 */ { "x" : -14.554140727501618, "y" : -34.053978026179664, "color" : "2b2b2b" },
      /* 44 */ { "x" : 12.205572063184235, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 45 */ { "x" : 26.614648181245855, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 46 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 18, "color" : "2b2b2b" },
      /* 47 */ { "x" : -29.649363327375767, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 48 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 49 */ { "x" : -15.926433691126476, "y" : -14.155730053618413, "color" : "2b2b2b" },
      /* 50 */ { "x" : -39.255414072750284, "y" : -36.112417471617135, "color" : "2b2b2b" },
      /* 51 */ { "x" : 17.694743917684093, "y" : -15.5280230172433, "color" : "2b2b2b" },
      /* 52 */ { "x" : 34.848405962995514, "y" : -37.48471043524202, "color" : "2b2b2b" },
      /* 53 */ { "x" : 54.74665393555688, "y" : -37.48471043524202, "curve" : 31, "color" : "2b2b2b" },
      /* 54 */ { "x" : -59.15366204531148, "y" : -36.112417471617135, "curve" : -31, "color" : "2b2b2b" },
      /* 55 */ { "x" : -39.255414072750284, "y" : -36.112417471617135, "color" : "2b2b2b" },
      /* 56 */ { "x" : -9.751115354814402, "y" : 75.04331258200133, "curve" : -31, "color" : "2b2b2b" },
      /* 57 */ { "x" : 8.774839654121934, "y" : 75.04331258200133, "curve" : 31, "color" : "2b2b2b" },
      /* 58 */ { "x" : 8.774839654121934, "y" : 84.64936332737572, "color" : "2b2b2b" },
      /* 59 */ { "x" : -9.751115354814402, "y" : 83.96321684556324, "color" : "2b2b2b" },
      /* 60 */ { "x" : -57.09522259987415, "y" : -34.053978026179664, "color" : "2b2b2b" },
      /* 61 */ { "x" : -39.255414072750284, "y" : -34.053978026179664, "color" : "2b2b2b" },
      /* 62 */ { "x" : -55.03678315443665, "y" : -31.99553858074222, "color" : "2b2b2b" },
      /* 63 */ { "x" : -39.255414072750284, "y" : -31.99553858074222, "color" : "2b2b2b" },
      /* 64 */ { "x" : 34.848405962995514, "y" : -35.426270989804635, "color" : "2b2b2b" },
      /* 65 */ { "x" : 52.68821449011941, "y" : -35.426270989804635, "color" : "2b2b2b" },
      /* 66 */ { "x" : 34.848405962995514, "y" : -33.36783154436722, "color" : "2b2b2b" },
      /* 67 */ { "x" : 50.62977504468199, "y" : -33.36783154436722, "color" : "2b2b2b" },
      /* 68 */ { "x" : -0.8312110912523281, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 69 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 70 */ { "x" : 1.2272283541849731, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 71 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 72 */ { "x" : 3.285667799622246, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 73 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 74 */ { "x" : 5.344107245059519, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 75 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 76 */ { "x" : 7.402546690497104, "y" : -21.703341353555516, "curve" : 0, "color" : "2b2b2b" },
      /* 77 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 78 */ { "x" : 9.460986135934405, "y" : -23.761780798992845, "curve" : 0, "color" : "2b2b2b" },
      /* 79 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 80 */ { "x" : 11.519425581371678, "y" : -26.506366726242618, "curve" : 0, "color" : "2b2b2b" },
      /* 81 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 82 */ { "x" : 13.577865026809206, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 83 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 84 */ { "x" : -2.889650536689885, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 85 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 86 */ { "x" : -4.948089982127186, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 87 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 88 */ { "x" : -7.006529427564487, "y" : -21.01719487174296, "curve" : 0, "color" : "2b2b2b" },
      /* 89 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 90 */ { "x" : -9.064968873001988, "y" : -22.38948783536793, "curve" : 0, "color" : "2b2b2b" },
      /* 91 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 92 */ { "x" : -12.495701282064232, "y" : -24.447927280805402, "curve" : 0, "color" : "2b2b2b" },
      /* 93 */ { "x" : -0.8312110912523281, "y" : 75.72945906381378, "curve" : 0, "color" : "2b2b2b" },
      /* 94 */ { "x" : -17.298726654751448, "y" : -33.36783154436722, "curve" : 0, "color" : "2b2b2b" },
      /* 95 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 96 */ { "x" : -15.240287209314147, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 97 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 98 */ { "x" : -10.43726183662696, "y" : -23.075634317180374, "curve" : 0, "color" : "2b2b2b" },
      /* 99 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 100 */ { "x" : -19.35716610018892, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 101 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 102 */ { "x" : -21.415605545626306, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 103 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 104 */ { "x" : -23.47404499106358, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 105 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 106 */ { "x" : -27.59092388193838, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 107 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 108 */ { "x" : -25.53248443650108, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 109 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 110 */ { "x" : -23.47404499106358, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 111 */ { "x" : -0.8312110912523281, "y" : 75.04331258200133, "curve" : 0, "color" : "2b2b2b" },
      /* 112 */ { "x" : -26.90477740012588, "y" : -18.95875542630563, "color" : "2b2b2b" },
      /* 113 */ { "x" : -27.59092388193838, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 114 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 115 */ { "x" : 15.636304472246508, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 116 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 117 */ { "x" : 17.694743917684093, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 118 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 119 */ { "x" : 19.753183363121366, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 120 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 121 */ { "x" : 21.811622808558667, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 122 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 123 */ { "x" : 23.87006225399614, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 124 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 125 */ { "x" : 24.556208735808582, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      /* 126 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 0, "color" : "2b2b2b" },
      /* 127 */ { "x" : 22.497769290371195, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 128 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 18, "color" : "2b2b2b" },
      /* 129 */ { "x" : 20.439329844933667, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 130 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 18, "color" : "2b2b2b" },
      /* 131 */ { "x" : 18.380890399496366, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 132 */ { "x" : -0.8312110912523281, "y" : 74.35716610018888, "curve" : 18, "color" : "2b2b2b" },
      /* 133 */ { "x" : 25.24235521762091, "y" : -34.053978026179664, "curve" : 990, "color" : "2b2b2b" },
      /* 134 */ { "x" : -2.2035040548772713, "y" : 74.35716610018888, "curve" : 18, "color" : "2b2b2b" },
      /* 135 */ { "x" : 26.614648181245855, "y" : -34.053978026179664, "color" : "2b2b2b" },
      /* 136 */ { "x" : 11.519425581371678, "y" : -34.053978026179664, "curve" : 0, "color" : "2b2b2b" },
      
      /* 137 */ { "x" : -0.8312110912523281, "y" : -47.368985211351315, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "curve" : 180, "color" : "2b2b2b" },
      /* 138 */ { "x" : -0.8312110912523281, "y" : -20.89991294949766, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "curve" : 180, "color" : "2b2b2b" },
      /* 139 */ { "x" : -0.8312110912523281, "y" : -36.025097099128345, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 140 */ { "x" : -6.773247721464486, "y" : -33.324171358122896, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 141 */ { "x" : -13.795654648078738, "y" : -37.6456525437317, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 142 */ { "x" : 5.110825538959546, "y" : -32.78398620992178, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 143 */ { "x" : 12.673417613774916, "y" : -36.565282247329435, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 144 */ { "x" : -9.474173462469878, "y" : -25.76157928330747, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 145 */ { "x" : 8.351936428166084, "y" : -24.14102383870437, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 146 */ { "x" : -0.2910259430514941, "y" : -27.922319876111942, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 147 */ { "x" : -5.69287742506242, "y" : -21.98028324589984, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 148 */ { "x" : 4.570640390758399, "y" : -21.44009809769892, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 149 */ { "x" : -1.3713962394534462, "y" : -36.025097099128345, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 150 */ { "x" : 8.351936428166084, "y" : -42.507318877541564, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 151 */ { "x" : -8.393803166067698, "y" : -45.20824461854704, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 152 */ { "x" : -9.751115354814402, "y" : 79.1601914728761, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 153 */ { "x" : -20.043312582001363, "y" : 92.88312110912528, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b", "curve" : 45 },
      /* 154 */ { "x" : 9.460986135934405, "y" : 79.1601914728761, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 155 */ { "x" : 20, "y" : 92.88312110912528, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b", "curve" : 45 },
      /* 156 */ { "x" : -24.101752027438664, "y" : 121, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b", "curve" : -60 },
      /* 157 */ { "x" : 24, "y" : 121, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b", "curve" : -60 },
      /* 158 */ { "x" : -21.415605545626306, "y" : 101.80302537268722, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      /* 159 */ { "x" : 21.811622808558667, "y" : 101.80302537268722, "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "color" : "2b2b2b" },
      
      /* 160 */ { "x" : -53.664490190811705, "y" : -20.33104838993046 },
      /* 161 */ { "x" : -36.510828145500454, "y" : -10.03885116274364 },
      /* 162 */ { "x" : -49.54761129993713, "y" : -3.8635328264314808 },
      /* 163 */ { "x" : -32.39394925462557, "y" : 9.859396809817724 },
      /* 164 */ { "x" : -43.37229296362494, "y" : 16.034715146129855 },
      /* 165 */ { "x" : -26.90477740012588, "y" : 25.640765891504202 },
      /* 166 */ { "x" : -36.510828145500454, "y" : 32.50223070962875 },
      /* 167 */ { "x" : -20.729459063813692, "y" : 42.10828145500324 },
      /* 168 */ { "x" : -26.218630918313522, "y" : 52.400478682190126 },
      /* 169 */ { "x" : -13.181847763876874, "y" : 53.77277164581503 },
      /* 170 */ { "x" : -16.61258017293909, "y" : 66.12340831843932 },
      /* 171 */ { "x" : 34.162259481183014, "y" : -20.33104838993046 },
      /* 172 */ { "x" : 45.826749671994776, "y" : -10.03885116274364 },
      /* 173 */ { "x" : 31.41767355393307, "y" : -3.8635328264314808 },
      /* 174 */ { "x" : 41.0237242993077, "y" : 9.859396809817724 },
      /* 175 */ { "x" : 27.300794663058355, "y" : 16.034715146129855 },
      /* 176 */ { "x" : 36.220698926620486, "y" : 25.640765891504202 },
      /* 177 */ { "x" : 21.811622808558667, "y" : 32.50223070962875 },
      /* 178 */ { "x" : 29.359234108495798, "y" : 42.10828145500324 },
      /* 179 */ { "x" : 12.89171854499665, "y" : 52.400478682190126 },
      /* 180 */ { "x" : 14.26401150862165, "y" : 67.49570128206427 },
      /* 181 */ { "x" : -0.8312110912523281, "y" : 75.72945906381378 },
      /* 182 */ { "x" : -8.329623411350411, "y" : 113.56037474846096, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 183 */ { "x" : -8.329623411350411, "y" : 100.81805000090878, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 184 */ { "x" : -1.7112863291720544, "y" : 100.81805000090878, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 185 */ { "x" : 2.7944353499259194, "y" : 106.0276192347146, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 186 */ { "x" : 2.7944353499259194, "y" : 100.81805000090878, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 187 */ { "x" : 9.231180605778547, "y" : 100.81805000090878, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 188 */ { "x" : 9.231180605778547, "y" : 113.63077433270165, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 189 */ { "x" : -8.329623411350411, "y" : 113.56037474846096, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 190 */ { "x" : 9.231180605778547, "y" : 113.63077433270165, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 191 */ { "x" : -1.7112863291720544, "y" : 113.63077433270165, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 192 */ { "x" : -1.7112863291720544, "y" : 108.42120509889568, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 193 */ { "x" : 2.7944353499259194, "y" : 113.63077433270165, "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "222222" },
      /* 194 */ { "x" : -297, "y" : 105, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 0, "color" : "2b2b2b" },
      /* 195 */ { "x" : 303, "y" : 104, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 0, "color" : "2b2b2b" },
      /* 196 */ { "x" : -295.3952879581152, "y" : 76.27272727272725, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -8, "radius" : 10 },
      /* 197 */ { "x" : -255.6047120418848, "y" : 76.27272727272725, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -8, "radius" : 10 },
      /* 198 */ { "x" : -295.3952879581152, "y" : 84.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -180 },
      /* 199 */ { "x" : -255.6047120418848, "y" : 84.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -180 },
      /* 200 */ { "x" : -303.35340314136124, "y" : 84.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 201 */ { "x" : -247.64659685863876, "y" : 84.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 202 */ { "x" : -303.35340314136124, "y" : 93.72727272727275, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 203 */ { "x" : -247.64659685863876, "y" : 93.72727272727275, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 204 */ { "x" : -287.4371727748691, "y" : 117, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -25 },
      /* 205 */ { "x" : -263.5628272251309, "y" : 117, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -25 },
      /* 206 */ { "x" : -287.4371727748691, "y" : 126.14285714285717, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 207 */ { "x" : -263.5628272251309, "y" : 126.14285714285717, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 208 */ { "x" : -293.0078534031414, "y" : 126.97402597402595, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 209 */ { "x" : -257.9921465968586, "y" : 126.97402597402595, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 210 */ { "x" : -293.0078534031414, "y" : 133.6233766233766, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 30 },
      /* 211 */ { "x" : -257.9921465968586, "y" : 133.6233766233766, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 212 */ { "x" : -281.07068062827227, "y" : 181, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 50, "color" : "2b2b2b" },
      /* 213 */ { "x" : -269.92931937172773, "y" : 181, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 50, "color" : "2b2b2b" },
      /* 214 */ { "x" : -275.5, "y" : 117, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 75, "color" : "2b2b2b" },
      /* 215 */ { "x" : -292.21204188481676, "y" : 94.55844155844159, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : -75, "color" : "2b2b2b" },
      /* 216 */ { "x" : -258.78795811518324, "y" : 94.55844155844159, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 75, "color" : "2b2b2b" },
      /* 217 */ { "x" : 260.1047120418848, "y" : 77.27272727272725, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -8 },
      /* 218 */ { "x" : 299.8952879581152, "y" : 77.27272727272725, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -8 },
      /* 219 */ { "x" : 260.1047120418848, "y" : 85.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -180 },
      /* 220 */ { "x" : 299.8952879581152, "y" : 85.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -180 },
      /* 221 */ { "x" : 252.14659685863876, "y" : 85.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 222 */ { "x" : 307.85340314136124, "y" : 85.58441558441558, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 223 */ { "x" : 252.14659685863876, "y" : 94.72727272727275, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 224 */ { "x" : 307.85340314136124, "y" : 94.72727272727275, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 225 */ { "x" : 268.0628272251309, "y" : 118, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -25 },
      /* 226 */ { "x" : 291.9371727748691, "y" : 118, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -25 },
      /* 227 */ { "x" : 268.0628272251309, "y" : 127.14285714285717, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 228 */ { "x" : 291.9371727748691, "y" : 127.14285714285717, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 229 */ { "x" : 262.4921465968587, "y" : 127.97402597402595, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 230 */ { "x" : 297.5078534031413, "y" : 127.97402597402595, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 0 },
      /* 231 */ { "x" : 262.4921465968587, "y" : 134.6233766233766, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : 30 },
      /* 232 */ { "x" : 297.5078534031413, "y" : 134.6233766233766, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b", "curve" : -165 },
      /* 233 */ { "x" : 274.42931937172773, "y" : 182, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 50, "color" : "2b2b2b" },
      /* 234 */ { "x" : 285.57068062827227, "y" : 182, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 50, "color" : "2b2b2b" },
      /* 235 */ { "x" : 280, "y" : 118, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 75, "color" : "2b2b2b" },
      /* 236 */ { "x" : 263.28795811518324, "y" : 95.55844155844159, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : -75, "color" : "2b2b2b" },
      /* 237 */ { "x" : 296.71204188481676, "y" : 95.55844155844159, "bCoef" : -0.5, "cGroup" : ["c0" ], "curve" : 75, "color" : "2b2b2b" },
      /* 238 */ { "x" : -252, "y" : 105, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b" },
      /* 239 */ { "x" : 256, "y" : 104, "bCoef" : -0.5, "cGroup" : ["c0" ], "color" : "2b2b2b" },
      /* 240 */ { "x" : -625, "y" : 183, "color" : "2b2b2b" },
      /* 241 */ { "x" : 625, "y" : 183, "color" : "2b2b2b" },
      /* 242 */ { "x" : -506.5, "y" : 183, "color" : "2b2b2b" },
      /* 243 */ { "x" : 508.5, "y" : 183, "color" : "2b2b2b" },
      /* 244 */ { "x" : -625, "y" : 183, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "2b2b2b" },
      /* 245 */ { "x" : 625, "y" : 183, "cMask" : ["c0" ], "cGroup" : ["c0" ], "color" : "2b2b2b" }
  
    ],
  
    "segments" : [
      { "v0" : 0, "v1" : 1, "color" : "D5E0ED" },
      { "v0" : 2, "v1" : 3, "curve" : 212.28867756056664, "color" : "D5E0ED" },
      { "v0" : 4, "v1" : 5, "curve" : 0, "color" : "D5E0ED" },
      { "v0" : 6, "v1" : 7, "curve" : -165.44801395883317, "color" : "D5E0ED" },
      { "v0" : 8, "v1" : 9, "curve" : 176.0526558299046, "color" : "D5E0ED" },
      { "v0" : 10, "v1" : 11, "color" : "D5E0ED" },
      { "v0" : 11, "v1" : 12, "color" : "D5E0ED" },
      { "v0" : 12, "v1" : 13, "color" : "D5E0ED" },
      { "v0" : 14, "v1" : 15, "color" : "D5E0ED" },
      { "v0" : 16, "v1" : 17, "color" : "D5E0ED" },
      { "v0" : 19, "v1" : 20, "color" : "D5E0ED" },
      { "v0" : 20, "v1" : 21, "color" : "D5E0ED" },
      { "v0" : 22, "v1" : 23, "color" : "D5E0ED" },
      { "v0" : 24, "v1" : 25, "curve" : 208.94058820013151, "color" : "D5E0ED" },
      { "v0" : 26, "v1" : 27, "curve" : 208.94058820013151, "color" : "D5E0ED" },
      { "v0" : 28, "v1" : 29, "curve" : 208.94058820013151, "color" : "D5E0ED" },
      { "v0" : 30, "v1" : 31, "curve" : 0, "color" : "2b2b2b", "bias" : -5 },
      { "v0" : 32, "v1" : 33, "curve" : 0, "color" : "2b2b2b", "bias" : 5 },
      { "v0" : 31, "v1" : 33, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 34, "v1" : 35, "color" : "D5E0ED" },
      { "v0" : 36, "v1" : 37, "color" : "D5E0ED" },
      { "v0" : 37, "v1" : 38, "color" : "D5E0ED" },
      { "v0" : 38, "v1" : 35, "color" : "D5E0ED" },
      { "v0" : 18, "v1" : 39, "curve" : 0, "color" : "D5E0ED" },
      { "v0" : 40, "v1" : 41, "curve" : -52.103997010176776, "color" : "D5E0ED" },
      { "v0" : 43, "v1" : 44, "curve" : -187.53277594193364, "color" : "2b2b2b", "y" : -206 },
      { "v0" : 45, "v1" : 46, "curve" : 18, "color" : "2b2b2b" },
      { "v0" : 47, "v1" : 48, "curve" : -13.81432544760929, "color" : "2b2b2b" },
      { "v0" : 49, "v1" : 50, "curve" : 97.89037245807509, "color" : "2b2b2b" },
      { "v0" : 52, "v1" : 51, "curve" : 97.89037245807509, "color" : "2b2b2b" },
      { "v0" : 52, "v1" : 53, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 54, "v1" : 55, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 56, "v1" : 57, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 57, "v1" : 58, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 58, "v1" : 59, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 59, "v1" : 56, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 60, "v1" : 61, "curve" : 0, "color" : "2b2b2b", "y" : -209 },
      { "v0" : 62, "v1" : 63, "curve" : 0, "color" : "2b2b2b", "y" : -206 },
      { "v0" : 64, "v1" : 65, "curve" : 0, "color" : "2b2b2b", "y" : -209 },
      { "v0" : 66, "v1" : 67, "curve" : 0, "color" : "2b2b2b", "y" : -206 },
      { "v0" : 54, "v1" : 56, "curve" : -31, "color" : "2b2b2b" },
      { "v0" : 53, "v1" : 57, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 56, "v1" : 62, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 56, "v1" : 60, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 67, "v1" : 57, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 65, "v1" : 57, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 48, "v1" : 63, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 66, "v1" : 48, "curve" : 31, "color" : "2b2b2b" },
      { "v0" : 68, "v1" : 48, "curve" : 0, "color" : "2b2b2b", "x" : 32 },
      { "v0" : 70, "v1" : 69, "curve" : 0, "color" : "2b2b2b", "x" : 35 },
      { "v0" : 72, "v1" : 71, "curve" : 0, "color" : "2b2b2b", "x" : 38 },
      { "v0" : 74, "v1" : 73, "curve" : 0, "color" : "2b2b2b", "x" : 41 },
      { "v0" : 76, "v1" : 75, "curve" : 0, "color" : "2b2b2b", "x" : 44 },
      { "v0" : 78, "v1" : 77, "curve" : 0, "color" : "2b2b2b", "x" : 47 },
      { "v0" : 80, "v1" : 79, "curve" : 0, "color" : "2b2b2b", "x" : 50 },
      { "v0" : 82, "v1" : 81, "curve" : 0, "color" : "2b2b2b", "x" : 53 },
      { "v0" : 84, "v1" : 83, "curve" : 0, "color" : "2b2b2b", "x" : 29 },
      { "v0" : 86, "v1" : 85, "curve" : 0, "color" : "2b2b2b", "x" : 26 },
      { "v0" : 88, "v1" : 87, "curve" : 0, "color" : "2b2b2b", "x" : 23 },
      { "v0" : 90, "v1" : 89, "curve" : 0, "color" : "2b2b2b", "x" : 20 },
      { "v0" : 92, "v1" : 91, "curve" : 0, "color" : "2b2b2b", "x" : 17 },
      { "v0" : 94, "v1" : 93, "curve" : 0, "color" : "2b2b2b", "x" : 14 },
      { "v0" : 96, "v1" : 95, "curve" : 0, "color" : "2b2b2b", "x" : 11 },
      { "v0" : 98, "v1" : 97, "curve" : 0, "color" : "2b2b2b", "x" : 8 },
      { "v0" : 100, "v1" : 99, "curve" : 0, "color" : "2b2b2b", "x" : 5 },
      { "v0" : 102, "v1" : 101, "curve" : 0, "color" : "2b2b2b", "x" : 2 },
      { "v0" : 104, "v1" : 103, "curve" : 0, "color" : "2b2b2b", "x" : -1 },
      { "v0" : 47, "v1" : 105, "curve" : 0, "color" : "2b2b2b", "x" : -10 },
      { "v0" : 106, "v1" : 107, "curve" : 0, "color" : "2b2b2b", "x" : -7 },
      { "v0" : 108, "v1" : 109, "curve" : 0, "color" : "2b2b2b", "x" : -4 },
      { "v0" : 110, "v1" : 111, "curve" : 0, "color" : "2b2b2b", "x" : -1 },
      { "v0" : 49, "v1" : 111, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 112, "v1" : 111, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 113, "v1" : 114, "curve" : -12.08818432448223, "color" : "2b2b2b" },
      { "v0" : 115, "v1" : 116, "curve" : 0, "color" : "2b2b2b", "x" : 56 },
      { "v0" : 117, "v1" : 118, "curve" : 0, "color" : "2b2b2b", "x" : 59 },
      { "v0" : 119, "v1" : 120, "curve" : 0, "color" : "2b2b2b", "x" : 62 },
      { "v0" : 121, "v1" : 122, "curve" : 0, "color" : "2b2b2b", "x" : 65 },
      { "v0" : 123, "v1" : 124, "curve" : 0, "color" : "2b2b2b", "x" : 68 },
      { "v0" : 125, "v1" : 126, "curve" : 0, "color" : "2b2b2b", "x" : 69 },
      { "v0" : 127, "v1" : 128, "curve" : 18, "color" : "2b2b2b", "x" : 66 },
      { "v0" : 129, "v1" : 130, "curve" : 18, "color" : "2b2b2b", "x" : 63 },
      { "v0" : 131, "v1" : 132, "curve" : 18, "color" : "2b2b2b", "x" : 60 },
      { "v0" : 133, "v1" : 134, "curve" : 18, "color" : "2b2b2b" },
      { "v0" : 47, "v1" : 43, "curve" : 0, "color" : "2b2b2b" },
      { "v0" : 136, "v1" : 135, "curve" : 0, "color" : "2b2b2b" },
      
      { "v0" : 137, "v1" : 138, "curve" : 180, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 138, "v1" : 137, "curve" : 180, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 137, "v1" : 139, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 139, "v1" : 140, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 140, "v1" : 141, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 139, "v1" : 142, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 142, "v1" : 143, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 140, "v1" : 144, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 142, "v1" : 145, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 139, "v1" : 146, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 146, "v1" : 147, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 146, "v1" : 148, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 149, "v1" : 150, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 139, "v1" : 151, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 152, "v1" : 153, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 154, "v1" : 155, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 155, "v1" : 153, "curve" : 45, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 153, "v1" : 156, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      { "v0" : 156, "v1" : 157, "curve" : 4.582836827638469, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier", "y" : 121 },
      { "v0" : 157, "v1" : 155, "vis" : true, "color" : "2b2b2b", "bCoef" : 0.1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "trait" : "kickOffBarrier" },
      
      { "v0" : 63, "v1" : 160, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 160, "v1" : 161, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 161, "v1" : 162, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 162, "v1" : 163, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 163, "v1" : 164, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 164, "v1" : 165, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 165, "v1" : 166, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 166, "v1" : 167, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 167, "v1" : 168, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 168, "v1" : 169, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 169, "v1" : 170, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 170, "v1" : 134, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 67, "v1" : 171, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 171, "v1" : 172, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 172, "v1" : 173, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 173, "v1" : 174, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 174, "v1" : 175, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 175, "v1" : 176, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 176, "v1" : 177, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 177, "v1" : 178, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 178, "v1" : 179, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 179, "v1" : 180, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 181, "v1" : 180, "curve" : 0, "vis" : true, "color" : "2b2b2b" },
      { "v0" : 182, "v1" : 183, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "x" : -141 },
      { "v0" : 183, "v1" : 184, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "y" : -45.5 },
      { "v0" : 184, "v1" : 185, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ] },
      { "v0" : 185, "v1" : 186, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ] },
      { "v0" : 186, "v1" : 187, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "y" : -45.5 },
      { "v0" : 187, "v1" : 188, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ] },
      { "v0" : 189, "v1" : 191, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "y" : 197 },
      { "v0" : 191, "v1" : 192, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ] },
      { "v0" : 192, "v1" : 193, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ] },
      { "v0" : 193, "v1" : 190, "color" : "222222", "bCoef" : 0, "cMask" : ["c0" ], "cGroup" : ["c0" ], "y" : 45.5 },
      { "v0" : 196, "v1" : 197, "curve" : -8, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 370, "radius" : 10 },
      { "v0" : 198, "v1" : 199, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 196, "v1" : 198, "curve" : -180.00000000000176, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 199, "v1" : 197, "curve" : -170.7333876736081, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 200, "v1" : 201, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 202, "v1" : 203, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 375 },
      { "v0" : 200, "v1" : 202, "curve" : -180.00000000000952, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 203, "v1" : 201, "curve" : -179.99999999999528, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 202, "v1" : 203, "curve" : -165.63127608781159, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 204, "v1" : 205, "curve" : -26.073554859371015, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 206, "v1" : 207, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 375 },
      { "v0" : 204, "v1" : 206, "curve" : -180.00000000000247, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : -15 },
      { "v0" : 207, "v1" : 205, "curve" : -202.72687443951966, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 15 },
      { "v0" : 208, "v1" : 209, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 210, "v1" : 211, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 454 },
      { "v0" : 208, "v1" : 210, "curve" : -179.99999999999508, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : -22 },
      { "v0" : 211, "v1" : 209, "curve" : -180.00000000000824, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 22 },
      { "v0" : 210, "v1" : 212, "curve" : 29.081223606830164, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 213, "v1" : 211, "curve" : 28.775195329981987, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 213, "v1" : 212, "curve" : 51.93451319677356, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 215, "v1" : 214, "curve" : -72.6314325682926, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 216, "v1" : 214, "curve" : 72.63143256829309, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 217, "v1" : 218, "curve" : -8, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 370 },
      { "v0" : 219, "v1" : 220, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 217, "v1" : 219, "curve" : -180.00000000000176, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 220, "v1" : 218, "curve" : -170.7333876736081, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 221, "v1" : 222, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 223, "v1" : 224, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 375 },
      { "v0" : 221, "v1" : 223, "curve" : -180.00000000000952, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 224, "v1" : 222, "curve" : -179.99999999999528, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 223, "v1" : 224, "curve" : -165.63127608781159, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 225, "v1" : 226, "curve" : -26.073554859371015, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 227, "v1" : 228, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 375 },
      { "v0" : 225, "v1" : 227, "curve" : -180.00000000000247, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : -15 },
      { "v0" : 228, "v1" : 226, "curve" : -202.72687443951966, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 15 },
      { "v0" : 229, "v1" : 230, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 380 },
      { "v0" : 231, "v1" : 232, "curve" : 0, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 0, "y" : 454 },
      { "v0" : 229, "v1" : 231, "curve" : -179.99999999999508, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : -22 },
      { "v0" : 232, "v1" : 230, "curve" : -180.00000000000824, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ], "x" : 22 },
      { "v0" : 231, "v1" : 233, "curve" : 29.081223606830164, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 234, "v1" : 232, "curve" : 28.775195329981987, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 234, "v1" : 233, "curve" : 51.93451319677356, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 236, "v1" : 235, "curve" : -72.6314325682926, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 237, "v1" : 235, "curve" : 72.63143256829309, "color" : "2b2b2b", "bCoef" : -0.5, "cGroup" : ["c0" ] },
      { "v0" : 240, "v1" : 241, "curve" : 125.79648024076617, "color" : "2b2b2b" },
      { "v0" : 242, "v1" : 243, "curve" : 125.79648024076617, "color" : "2b2b2b" },
      { "v0" : 244, "v1" : 245, "color" : "2b2b2b", "cMask" : ["c0" ], "cGroup" : ["c0" ] }
  
    ],
  
    "goals" : [
      
  
    ],
  
    "discs" : [
      { "radius" : 10, "invMass" : 1, "pos" : [-273,33 ], "color" : "DB8727", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [-284,59 ], "color" : "EBAB4D", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [-281,43 ], "color" : "DBD52A", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [-269,43 ], "color" : "C44221", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [-274,56 ], "color" : "DB8727", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [-266,63 ], "color" : "DBD142", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [290,46 ], "color" : "DBD52A", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [281,33 ], "color" : "DB8727", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [270,59 ], "color" : "EBAB4D", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [273,43 ], "color" : "DBD52A", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [285,43 ], "color" : "C44221", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [280,56 ], "color" : "DB8727", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 10, "invMass" : 1, "pos" : [288,63 ], "color" : "DBD142", "bCoef" : 1, "cMask" : ["blueKO" ], "cGroup" : ["score" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 1, "invMass" : 1, "pos" : [0,130 ], "color" : "2b2b2b", "cMask" : ["ball" ], "cGroup" : ["all" ], "damping" : 1, "speed" : [0,-1 ], "gravity" : [0,0 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-118,-380 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-133,-365 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-67,-407 ], "color" : "97f7e4", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-61,-389 ], "color" : "97f7e4", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-7,-412 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-13,-397 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [49,-415 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [49,-394 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [128,-410 ], "color" : "36a832", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [137,-394 ], "color" : "36a832", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [98,-415 ], "color" : "4a7529", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [94,-398 ], "color" : "4a7529", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [14,-414 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [19,-399 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-31,-414 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-38,-398 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-203,-400 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-190,-388 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [114,-396 ], "color" : "da5fe3", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [113,-378 ], "color" : "da5fe3", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-113,-413 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-99,-402 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-165,-387 ], "color" : "2883b0", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-174,-367 ], "color" : "2883b0", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [175,-410 ], "color" : "97f7e4", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [190,-393 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [155,-382 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [174,-374 ], "color" : "de122a", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [218,-409 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [170,-397 ], "color" : "97f7e4", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [218,-393 ], "color" : "ffb330", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [207,-374 ], "color" : "d7de18", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [5,-381 ], "color" : "4a7529", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [22,-369 ], "color" : "4a7529", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-29,-375 ], "color" : "36a832", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-39,-359 ], "color" : "36a832", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [107,-362 ], "color" : "97f7e4", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [133,-349 ], "color" : "97f7e4", "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [77,-377 ], "color" : "2883b0", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [62,-358 ], "color" : "2883b0", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-250,-410 ], "color" : "2b2b2b", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-269,-394 ], "color" : "2b2b2b", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-225,-409 ], "color" : "da5fe3", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 0, "invMass" : 1, "pos" : [-233,-390 ], "color" : "da5fe3", "bCoef" : 1, "cMask" : ["c0" ], "cGroup" : ["c0" ], "damping" : 0.75, "speed" : [0,0 ], "gravity" : [0,0.2 ] },
      { "radius" : 6, "invMass" : 1e+250, "pos" : [0,130 ], "color" : "ffffff", "cMask" : ["ball" ], "cGroup" : ["kick" ], "damping" : 1000000, "speed" : [0,0 ], "gravity" : [0,0 ] }
  
    ],
  
    "planes" : [
      { "normal" : [0,-1 ], "dist" : -73, "bCoef" : 1e-7, "cMask" : ["score" ], "cGroup" : ["blueKO" ] },
      { "normal" : [0,1 ], "dist" : 18, "bCoef" : 10000000, "cMask" : ["score" ], "cGroup" : ["blueKO" ] }
  
    ],
  
    "joints" : [
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  },
      {  }
  
    ],
  
    "playerPhysics" : {
      "radius" : 14,
      "bCoef" : 0.5,
      "invMass" : 0.5,
      "damping" : 0.96,
      "cGroup" : [ "red", "blue"
      ],
      "acceleration" : 0.1,
      "gravity" : [ 0, 0
      ],
      "kickingAcceleration" : 0.07,
      "kickingDamping" : 0.96,
      "kickStrength" : 5,
      "kickback" : 0
  
    },
  
    "ballPhysics" : {
      "radius" : 0,
      "bCoef" : 0.5,
      "cMask" : [ "all"
      ],
      "damping" : 0.99,
      "invMass" : 1,
      "gravity" : [ 0, 0
      ],
      "color" : "ffffff",
      "cGroup" : [ "ball"
      ]
  
    }
  }`;

  return winnerMap;
}

function getWinkyMap() {
  var winkyMap = `{"name":"Withfield x3 [\u029c\u1d00x\u1d0d\u1d0f\u1d05s.\u1d04\u1d0f\u1d0d]","width":710,"height":300,"cameraWidth":0,"cameraHeight":0,"maxViewWidth":0,"cameraFollow":"ball","spawnDistance":366.5,"redSpawnPoints":[[-150,0],[-250,150],[-250,-150],[-635,250]],"blueSpawnPoints":[[150,0],[250,150],[250,-150],[635,-250]],"canBeStored":true,"kickOffReset":"full","bg":{"color":"1D2431","height":240,"width":550},"traits":{"ballArea":{"vis":false,"bCoef":1,"cMask":["ball"]},"goalPost":{"radius":8,"invMass":0,"bCoef":0.5},"goalNet":{"vis":true,"bCoef":0.1,"cMask":["ball"]},"kickOffBarrier":{"vis":false,"bCoef":0.1,"cGroup":["redKO","blueKO"],"cMask":["red","blue"]}},"vertexes":[{"x":-600,"y":-270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true},{"x":600,"y":-270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true},{"x":-600,"y":270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true},{"x":600,"y":270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true},{"x":-600,"y":85,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true,"pos":[-600,85]},{"x":-600,"y":270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true},{"x":600,"y":85,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true,"pos":[600,85]},{"x":600,"y":270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true},{"x":-600,"y":-270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true},{"x":-600,"y":-85,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":10,"vis":true,"pos":[-600,-85]},{"x":600,"y":-270,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true},{"x":600,"y":-85,"bCoef":1,"cMask":["ball"],"color":"717F98","bias":-10,"vis":true,"pos":[600,-85]},{"x":-638,"y":-85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98"},{"x":-600,"y":-85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98","pos":[-600,-85]},{"x":-638,"y":85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98"},{"x":-600,"y":85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98","pos":[-600,85]},{"x":-638,"y":-86,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98","curve":-35},{"x":-638,"y":86,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98","curve":-35},{"x":638,"y":-85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98","curve":35},{"x":638,"y":85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98","curve":35},{"x":638,"y":-85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98"},{"x":600,"y":-85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"color":"717F98","pos":[600,-85]},{"x":638,"y":85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98"},{"x":600,"y":85,"bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"color":"717F98","pos":[600,85]},{"x":-600,"y":-85,"cMask":["wall"],"cGroup":["wall"],"color":"E71145","pos":[-600,-85]},{"x":-600,"y":85,"cMask":["wall"],"cGroup":["wall"],"color":"E71145","pos":[-600,85]},{"x":600,"y":-85,"cMask":["wall"],"cGroup":["wall"],"color":"5244FC","pos":[600,-85]},{"x":600,"y":85,"cMask":["wall"],"cGroup":["wall"],"color":"5244FC","pos":[600,85]},{"x":-335.1330709300715,"y":3.8611663940675083,"cMask":["wall"],"cGroup":["wall"],"curve":180,"color":"ffffff"},{"x":-335.1330709300715,"y":-1.1388336059324917,"cMask":["wall"],"cGroup":["wall"],"curve":180,"color":"ffffff"},{"x":338.34981631999995,"y":2.8699993600000013,"cMask":["wall"],"cGroup":["wall"],"curve":180,"color":"ffffff"},{"x":338.34981631999995,"y":-2.1300006399999987,"cMask":["wall"],"cGroup":["wall"],"curve":180,"color":"ffffff"},{"x":0,"y":-300,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"vis":true,"color":"454866"},{"x":0,"y":-85,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"vis":true,"color":"454866"},{"x":-0.16756187024403646,"y":85.81606096415001,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"454866","vis":true},{"x":0,"y":300,"cMask":["red","blue"],"cGroup":["redKO","blueKO"],"color":"454866","vis":true},{"x":0,"y":85,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"EF143F"},{"x":0,"y":-85,"cMask":["red","blue"],"cGroup":["blueKO"],"color":"E7B611"},{"x":0,"y":-85,"cMask":["red","blue"],"cGroup":["redKO"],"color":"E7B611"},{"x":0,"y":85,"cMask":["red","blue"],"cGroup":["redKO"],"color":"EF143F"},{"x":0,"y":-86,"cMask":["wall"],"cGroup":["wall"],"color":"454866"},{"x":0,"y":86,"cMask":["wall"],"cGroup":["wall"],"color":"454866"},{"x":600,"y":-85,"cMask":["wall"],"cGroup":["wall"],"color":"1d2431","curve":0,"pos":[600,-85]},{"x":600,"y":85,"cMask":["wall"],"cGroup":["wall"],"color":"1d2431","curve":0,"pos":[600,85]},{"x":600,"y":-85,"cMask":["wall"],"cGroup":["wall"],"color":"1d2431","curve":0,"pos":[600,-85]},{"x":600,"y":85,"cMask":["wall"],"cGroup":["wall"],"color":"1d2431","curve":0,"pos":[600,85]},{"x":0,"y":70,"cMask":["wall"],"cGroup":["wall"],"curve":-40.64889732002981,"color":"E7B611"},{"x":30,"y":30,"cMask":["wall"],"cGroup":["wall"],"curve":-40.64889732002981,"color":"E7B611"},{"x":-37.5,"y":40,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-30,"y":30,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-42.5,"y":10,"cMask":["wall"],"cGroup":["wall"],"curve":-60,"color":"E7B611"},{"x":-37.5,"y":40,"cMask":["wall"],"cGroup":["wall"],"curve":-60,"color":"E7B611"},{"x":37.5,"y":40,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":31,"y":31,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":45,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":70,"y":0,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":42.5,"y":10,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":37.5,"y":40,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-30,"y":30,"cMask":["wall"],"cGroup":["wall"],"curve":-40.64889732002981,"color":"E7B611"},{"x":0,"y":70,"cMask":["wall"],"cGroup":["wall"],"curve":-40.64889732002981,"color":"E7B611"},{"x":55,"y":25,"cMask":["wall"],"cGroup":["wall"],"curve":-69,"color":"E7B611"},{"x":45,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":-69,"color":"E7B611"},{"x":42.5,"y":10,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":55,"y":25,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-40,"y":-35,"cMask":["wall"],"cGroup":["wall"],"curve":-50,"color":"E7B611"},{"x":-55,"y":-30,"cMask":["wall"],"cGroup":["wall"],"curve":-50,"color":"E7B611"},{"x":-62.5,"y":-20,"cMask":["wall"],"cGroup":["wall"],"curve":-16,"color":"E7B611"},{"x":-40,"y":-35,"cMask":["wall"],"cGroup":["wall"],"curve":-16,"color":"E7B611"},{"x":-70,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":40,"color":"E7B611"},{"x":-62.5,"y":-20,"cMask":["wall"],"cGroup":["wall"],"curve":40,"color":"E7B611"},{"x":-45,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-70,"y":0,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-55,"y":25,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-42.5,"y":10,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-55,"y":25,"cMask":["wall"],"cGroup":["wall"],"curve":69,"color":"E7B611"},{"x":-45,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":69,"color":"E7B611"},{"x":70,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":-40,"color":"E7B611"},{"x":62.5,"y":-20,"cMask":["wall"],"cGroup":["wall"],"curve":-40,"color":"E7B611"},{"x":62.5,"y":-20,"cMask":["wall"],"cGroup":["wall"],"curve":16,"color":"E7B611"},{"x":40,"y":-35,"cMask":["wall"],"cGroup":["wall"],"curve":16,"color":"E7B611"},{"x":40,"y":-35,"cMask":["wall"],"cGroup":["wall"],"curve":50,"color":"E7B611"},{"x":55,"y":-30,"cMask":["wall"],"cGroup":["wall"],"curve":50,"color":"E7B611"},{"x":0,"y":-40,"cMask":["wall"],"cGroup":["wall"],"curve":-60,"color":"E7B611"},{"x":-45,"y":-60,"cMask":["wall"],"cGroup":["wall"],"curve":-60,"color":"E7B611"},{"x":55,"y":-30,"cMask":["wall"],"cGroup":["wall"],"curve":-100,"color":"E7B611"},{"x":30,"y":-45,"cMask":["wall"],"cGroup":["wall"],"curve":-100,"color":"E7B611"},{"x":30,"y":-45,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":45,"y":-60,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-45,"y":-60,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-30,"y":-45,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-30,"y":-45,"cMask":["wall"],"cGroup":["wall"],"curve":-100,"color":"E7B611"},{"x":-55,"y":-30,"cMask":["wall"],"cGroup":["wall"],"curve":-100,"color":"E7B611"},{"x":0,"y":-40,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":45,"y":-60,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-15,"y":35,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-30,"y":-12.5,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":0,"y":17.5,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":15,"y":35,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":15,"y":35,"cMask":["wall"],"cGroup":["wall"],"curve":140,"color":"E7B611"},{"x":-15,"y":35,"cMask":["wall"],"cGroup":["wall"],"curve":140,"color":"E7B611"},{"x":15,"y":35,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":30,"y":-12.5,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":30,"y":-12.5,"cMask":["wall"],"cGroup":["wall"],"curve":-160,"color":"E7B611"},{"x":0,"y":-25,"cMask":["wall"],"cGroup":["wall"],"curve":-160,"color":"E7B611"},{"x":0,"y":-25,"cMask":["wall"],"cGroup":["wall"],"curve":-160,"color":"E7B611"},{"x":-30,"y":-12.5,"cMask":["wall"],"cGroup":["wall"],"curve":-160,"color":"E7B611"},{"x":0,"y":17.5,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":-15,"y":35,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":-12.5,"y":18.5,"cMask":["wall"],"cGroup":["wall"],"curve":16,"color":"E7B611"},{"x":12.5,"y":18.5,"cMask":["wall"],"cGroup":["wall"],"curve":16,"color":"E7B611"},{"x":-5,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":-17.5,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":17.5,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":5,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":90,"color":"E7B611"},{"x":17.5,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":5,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":-5,"y":0,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":-17.5,"y":-7.5,"cMask":["wall"],"cGroup":["wall"],"curve":-90,"color":"E7B611"},{"x":23.5,"y":-61,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-20.5,"y":-61,"cMask":["wall"],"cGroup":["wall"],"curve":60,"color":"E7B611"},{"x":-23,"y":-76,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":26,"y":-79,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":1,"y":-81,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-25,"y":-81,"cMask":["wall"],"cGroup":["wall"],"color":"E7B611"},{"x":-600,"y":-235,"cMask":["wall"],"cGroup":["wall"],"curve":80,"color":"454866"},{"x":-450,"y":-80,"cMask":["wall"],"cGroup":["wall"],"curve":80,"color":"454866"},{"x":-450,"y":-80,"cMask":["wall"],"cGroup":["wall"],"color":"454866"},{"x":-450,"y":80,"cMask":["wall"],"cGroup":["wall"],"color":"454866"},{"x":-450,"y":80,"cMask":["wall"],"cGroup":["wall"],"curve":80,"color":"454866"},{"x":-600,"y":235,"cMask":["wall"],"cGroup":["wall"],"curve":80,"color":"454866"},{"x":600,"y":-235,"cMask":["wall"],"cGroup":["wall"],"curve":-80,"color":"454866"},{"x":450,"y":-80,"cMask":["wall"],"cGroup":["wall"],"curve":-80,"color":"454866"},{"x":450,"y":80,"cMask":["wall"],"cGroup":["wall"],"curve":-80,"color":"454866"},{"x":600,"y":235,"cMask":["wall"],"cGroup":["wall"],"curve":-80,"color":"454866"},{"x":450,"y":80,"cMask":["wall"],"cGroup":["wall"],"curve":0,"color":"454866"},{"x":450,"y":-80,"cMask":["wall"],"cGroup":["wall"],"curve":0,"color":"454866"}],"segments":[{"v0":0,"v1":1,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":-10,"y":-320},{"v0":2,"v1":3,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":10,"y":320},{"v0":4,"v1":5,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":10,"x":-700},{"v0":6,"v1":7,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":-10,"x":700},{"v0":8,"v1":9,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":10,"x":-700},{"v0":10,"v1":11,"vis":true,"color":"717F98","bCoef":1,"cMask":["ball"],"bias":-10,"x":700},{"v0":12,"v1":13,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10},{"v0":14,"v1":15,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"y":70},{"v0":16,"v1":17,"curve":-35,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10,"x":-638},{"v0":18,"v1":19,"curve":35,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"x":735},{"v0":20,"v1":21,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":10},{"v0":22,"v1":23,"color":"717F98","bCoef":0.2,"cMask":["ball"],"cGroup":["ball"],"bias":-10,"y":70},{"v0":24,"v1":25,"color":"E71145","cMask":["wall"],"cGroup":["wall"],"x":-700},{"v0":26,"v1":27,"color":"5244FC","cMask":["wall"],"cGroup":["wall"],"x":700},{"v0":28,"v1":29,"curve":0,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":-500},{"v0":29,"v1":28,"curve":180,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":-500},{"v0":28,"v1":29,"curve":180,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":-500},{"v0":30,"v1":31,"curve":0,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":500},{"v0":31,"v1":30,"curve":180,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":500},{"v0":30,"v1":31,"curve":180,"color":"ffffff","cMask":["wall"],"cGroup":["wall"],"x":500},{"v0":32,"v1":33,"vis":true,"color":"454866","cMask":["red","blue"],"cGroup":["redKO","blueKO"],"x":0},{"v0":34,"v1":35,"vis":true,"color":"454866","cMask":["red","blue"],"cGroup":["redKO","blueKO"],"x":0},{"v0":36,"v1":37,"curve":180,"vis":false,"color":"EF143F","cMask":["red","blue"],"cGroup":["blueKO"],"x":0},{"v0":38,"v1":39,"curve":180,"vis":false,"color":"EF143F","cMask":["red","blue"],"cGroup":["redKO"],"x":0},{"v0":40,"v1":41,"curve":-180,"color":"454866","cMask":["wall"],"cGroup":["wall"],"x":0},{"v0":41,"v1":40,"curve":-180,"color":"454866","cMask":["wall"],"cGroup":["wall"],"x":0},{"v0":46,"v1":47,"curve":-40.64889732002981,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":48,"v1":49,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":50,"v1":51,"curve":-60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":52,"v1":53,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":54,"v1":55,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":56,"v1":57,"curve":60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":58,"v1":59,"curve":-40.64889732002981,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":60,"v1":61,"curve":-69,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":62,"v1":63,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":64,"v1":65,"curve":-50,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":66,"v1":67,"curve":-16,"color":"E7B611","cMask":["wall"],"cGroup":["wall"],"x":-62.5},{"v0":68,"v1":69,"curve":40,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":70,"v1":71,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":72,"v1":73,"color":"E7B611","cMask":["wall"],"cGroup":["wall"],"x":-55},{"v0":74,"v1":75,"curve":69,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":76,"v1":77,"curve":-40,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":78,"v1":79,"curve":16,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":80,"v1":81,"curve":50,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":82,"v1":83,"curve":-60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":84,"v1":85,"curve":-100,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":86,"v1":87,"curve":60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":88,"v1":89,"curve":60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":90,"v1":91,"curve":-100,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":92,"v1":93,"curve":60,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":94,"v1":95,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":96,"v1":97,"curve":-90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":98,"v1":99,"curve":140,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":100,"v1":101,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":102,"v1":103,"curve":-160,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":104,"v1":105,"curve":-160,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":106,"v1":107,"curve":90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":108,"v1":109,"curve":16,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":110,"v1":111,"curve":90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":112,"v1":113,"curve":90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":114,"v1":115,"curve":-90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":116,"v1":117,"curve":-90,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":118,"v1":119,"curve":-23.896844796805834,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":120,"v1":119,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":121,"v1":118,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":121,"v1":122,"curve":120.92243548088383,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":122,"v1":123,"curve":117.24279585843097,"color":"E7B611","cMask":["wall"],"cGroup":["wall"]},{"v0":124,"v1":125,"curve":80,"color":"454866","cMask":["wall"],"cGroup":["wall"]},{"v0":126,"v1":127,"color":"454866","cMask":["wall"],"cGroup":["wall"]},{"v0":128,"v1":129,"curve":80,"color":"454866","cMask":["wall"],"cGroup":["wall"]},{"v0":130,"v1":131,"curve":-80,"color":"454866","cMask":["wall"],"cGroup":["wall"]},{"v0":132,"v1":133,"curve":-80,"color":"454866","cMask":["wall"],"cGroup":["wall"]},{"v0":134,"v1":135,"curve":0,"color":"454866","cMask":["wall"],"cGroup":["wall"]}],"goals":[{"p0":[-608.3,-85],"p1":[-608.3,85],"team":"red"},{"p0":[608.3,85],"p1":[608.3,-85],"team":"blue"}],"discs":[{"radius":5,"invMass":0,"pos":[-600,-85],"color":"ffffff","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5,"invMass":0,"pos":[-600,85],"color":"ffffff","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5,"invMass":0,"pos":[600,-85],"color":"ffffff","bCoef":1,"cMask":["all"],"cGroup":["all"]},{"radius":5,"invMass":0,"pos":[600,85],"color":"ffffff","bCoef":1,"cMask":["all"],"cGroup":["all"]}],"planes":[{"normal":[0,1],"dist":-300.01017343999996,"cMask":["red","blue"],"y":-350},{"normal":[0,-1],"dist":-300.34758144,"cMask":["red","blue"],"y":350},{"normal":[1,0],"dist":-705.7779968,"cMask":["red","blue"]},{"normal":[-1,0],"dist":-705.6268646400001,"cMask":["red","blue"]}],"joints":[],"playerPhysics":{"radius":15,"bCoef":0,"invMass":0.5,"damping":0.96,"cGroup":["red","blue"],"acceleration":0.11,"gravity":[0,0],"kickingAcceleration":0.083,"kickingDamping":0.96,"kickStrength":4.545,"kickback":0},"ballPhysics":{"radius":5.8,"bCoef":0.412,"cMask":["all"],"damping":0.99,"invMass":1.5,"gravity":[0,0],"color":"FFFFFF","cGroup":["ball"]}}`;

  return winkyMap;
}

/*------------------------------ END OF STADIUMS ----------------------------*/

function centerText(string) {
  var space = parseInt((80 - string.length) * 0.8, 10);
  if (space <= 0) {
    return "";
  }
  return " ".repeat(space) + string + " ".repeat(space);
}

const frasesGols = [
  "GOOOOOOOOOOL! WORLD CLASS SHOOT FROM ",
  "GOLLLAZZOOOO permainan cantik dari ",
  "GOOOOOOOOOOL! SHOWING UP WHEN WE NEED IT MOST, ITS ",
  "GOOOOOLLL berkelasss dariii ",
  "WHAT A GOALLL FROM ",
  "Impressive finishing from ",
  "Sorry for the insults, BUT HOLY SHIT, WHAT A GOAL IS THAT ",
  "MORE AND MORE AND MOREE.. GOOOLL FROM THE GREATESST PLAYER ",
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
  "sex",
  "plr",
  "pepek",
  "pe pek",
  "ppk",
  "fuck",
  "kontol",
  "ktl",
  "kntl",
  "memmek",
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

// -------------------------------------------------
// Webhooks
// -------------------------------------------------

let replayWebHook = "https://discord.com/api/webhooks/1227094504989921340/4Me4_Lm-Ovcfa5XwWVUMxCQQoXSs1g8OvjTsuMLhfgLB4SxecVwkn30HdVqSpiDYfX_E";
let goalWebHook = "https://discord.com/api/webhooks/1227774180343287890/gi34423X3uBqB--UM_-aIB5MqPShDFmftAUwTMIw8aB2U-30TYcqu9a9HMQ7C3HrLzMt";
let chatWebHook = "https://discord.com/api/webhooks/1227802111459459072/Db2vLhw6Mxcp0Xu9aNVYl684ANho_4Nuqz-roujkQQPYhbjG_PqENhDOgGnnqE5R4P4n";
let joinWebHook = "https://discord.com/api/webhooks/1228203622366449695/h_oYpebe1f6D8i7sMhs5J4wUn3-iHRIqUPXT-Lsvq98cf6z_BsRj_I8zAP93S4wgi-gD";
let startWebHook = "https://discord.com/api/webhooks/1228211340519149661/kmFJSfdirOOWRnH-bynJrDxisbtI-5kg5AesFc4RaktI0NSwgoo6KBbj5bkyshJfcQhq";
let adminWebHook = "https://discord.com/api/webhooks/1228918067854311544/marqckLcQDbMX9GUXCzp3rMfbkEYlUTdzS4vZHoXlrz34FL-K2i06pUJiN6TCOFGztVe";
let toxicWebhook = "https://discord.com/api/webhooks/1230501754249023568/CD-X4s4tLoJt5QVICUbfIpYGc169VGjwEslq6UL1zz6wstRF8taJCnXgZcZFY0hcTiEG";

// -------------------------------------------------
// Classes
// -------------------------------------------------
class Game {
  constructor() {
    this.time = 0;
    this.paused = false;
    this.ballRadius;
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

room.setCustomStadium(getRealSoccerMap());
room.setScoreLimit(0);
room.setTimeLimit(10);
room.setTeamsLock(true);

room.onRoomLink = function (url) {
  roomLink = url;
  //console.log(roomLink);
};

room.onStadiumChange = function (newStadiumName, byPlayer) {
  if (byPlayer != null) {
    map = "custom";
  } else {
    map = "RSR";
  }
};

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

room.onPlayerJoin = function (player) {
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has joined. (auth: ${player.auth} | conn: ${player.conn})`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] joined to server.\``);

  const welcomeMessages = [
    "",
    "",
    "",
    "⚽                                                 Welcome To                  ⚽",
    "⚽                                          Real Soccer indonesia              ⚽",
    "⚽                                    Klik Red/Blue button to start playing !  ⚽",
    "                                        ▒█▀▀▄ ▀█▀ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀▄ ",
    "                                        ▒█░▒█ ▒█░ ░▀▀▀▄▄ ▒█░░░ ▒█░░▒█ ▒█▄▄▀ ▒█░▒█ ",
    "                                        ▒█▄▄▀ ▄█▄ ▒█▄▄▄█ ▒█▄▄█ ▒█▄▄▄█ ▒█░▒█ ▒█▄▄▀ ",
    "                                        💬 Discord Link: ➡ discord.gg/pm55tVsQMX/ ⬅",
    "",
  ];

  welcomeMessages.forEach((message) => whisper(message, player.id, 0x61ddff, "bold", 0));

//   if (!isAdminPresent()) {
//     room.setPlayerAdmin(player.id, true);
//     whisper("Anda Adalah ADMIN", player.id, 0x61ddff, "bold", 0);
//     sendWebhook(adminWebHook, `${player.name} ***is set to Admin !!***`);
//   }
// };

// function findNextAdmin() {
//   var players = room.getPlayerList();
//   for (var i = 0; i < players.length; i++) {
//     if (!players[i].admin && players[i].id !== 0) {
//       return players[i];
//     }
//   }
//   return null; // No suitable player found
}

// Function to remove player from superAdmins array
function removeFromSuperAdmins(playerId) {
  const index = superAdmins.indexOf(playerId);
  if (index > -1) {
    superAdmins.splice(index, 1);
  }
}

room.onPlayerLeave = function (player) {
  const currentTime = getCurrentTime();
  console.log(`${currentTime} ➡️ ${player.name} [${player.id}] has left.`);
  sendWebhook(joinWebHook, `\`${player.name} [${player.id}] has left.\``);

  removeFromSuperAdmins(player.id);

  // if (!isAdminPresent()) {
  //   const newAdmin = findNextAdmin();
  //   if (newAdmin) {
  //     room.setPlayerAdmin(newAdmin.id, true);
  //     room.sendAnnouncement(`${newAdmin.name} is now the new admin!`, null, 0xff0000);
  //     sendWebhook(adminWebHook, `${newAdmin.name} ***is now to Admin !!***`);
  //   }
  // }
};

room.onPlayerAdminChange = function (changedPlayer, byPlayer) {
  if (byPlayer && changedPlayer.id != byPlayer.id) {
    if (superAdmins.includes(changedPlayer.id)) {
      room.kickPlayer(byPlayer.id, "You cannot remove a Super Admin", false);
      room.setPlayerAdmin(changedPlayer.id, true);
    }
  } else if (!changedPlayer.admin) {
    removeFromSuperAdmins(changedPlayer.id);
  }
};

room.onGameStart = function (byPlayer) {
  if (map === "RSR") {
    room.setDiscProperties(0, { invMass: 1.05 });

    if (byPlayer === null) {
      game = new Game();
      announce("Game duration: " + gameTime + " minutes");
      whisper("⚽ KICK OFF !! ⚽", null);
      whisper("⚽ KICK OFF !! ⚽", null);
      room.sendAnnouncement(centerText("🥅 MATCH STARTING 🥅"), null, 0xf5f5f5, "bold");
      room.sendAnnouncement(centerText("Want to change your uniform? Type '!uni'"), null, 0x2ef55d, "bold");
      room.sendAnnouncement(centerText("[💬] Use 't' before the message to chat with your team!"), null, 0x5ee7ff);
      room.startRecording();
      sendWebhook(startWebHook, `\`⚽ KICK OFF !! ⚽\` - Game duration \`${gameTime} minutes\``);
    } else {
      gameTime = room.getScores().timeLimit !== 0 ? room.getScores().timeLimit / 60 : 10;
      room.stopGame();
      room.setTimeLimit(0);
      room.startGame();

      // Set team colors
      room.setTeamColors(1, 90, 0xffffff, [0xd10000]);
      room.setTeamColors(2, 0, 0xffffff, [0x040099]);
    }
  }
};

room.onGameStop = function (byPlayer) {
  if (map == "RSR") {
    if (byPlayer != null) {
      room.setTimeLimit(gameTime);
      sendDiscordRecording();
      whisper("Replay dikirim ke discord!", null);
    }
  }
};

room.onTeamVictory = function (byPlayer) {
  if (map == "RSR") {
    if (byPlayer != null) {
      announce("⚽ FULL TIME ⚽");
      announce("⚽ FULL TIME ⚽");
      room.setTimeLimit(gameTime);
      sendDiscordRecording();
      whisper("Replay dikirim ke discord!", null);
    }
  }
};

room.onPlayerBallKick = function (player) {
  if (map == "RSR") {
    game.rsTouchTeam = player.team;
    game.updateLastKicker(player.id, player.name, player.team);

    //=========== POWERSHOT CODE ===========
    if (powerShotMode == true) {
      if (game.powershotCounter > 100) {
        room.setDiscProperties(0, { xgravity: -room.getPlayerDiscProperties(player.id).yspeed / 30, ygravity: -room.getPlayerDiscProperties(player.id).yspeed / 30 });
        game.rsSwingTimer = 50;
        room.sendAnnouncement("POWERSHOT LAUNCHED!", game.powershotID, 0x33dddd, "bold", 1);
        room.setPlayerAvatar(game.powershotID, null);
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
        room.setDiscProperties(0, { xgravity: (room.getPlayerDiscProperties(player.id).xspeed / 16) * -1, ygravity: (room.getPlayerDiscProperties(player.id).yspeed / 16) * -1 });
      }
      if (game.rsGoalKick == true) {
        room.setDiscProperties(0, { xgravity: 0, ygravity: (room.getPlayerDiscProperties(player.id).yspeed / 20) * -1 });
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
  }
};

room.onPlayerKicked = function (kickedPlayer, reason, ban, byPlayer) {
  if (superAdmins.indexOf(kickedPlayer.id) > -1 && byPlayer != null) {
    room.kickPlayer(byPlayer.id, "You cannot kick/ban a Super Admin", false);
    room.clearBans();
  }
};

room.onPlayerChat = function (player, message) {
  //console.log(`${getCurrentTime()} 💬 ${player.name} [${player.id}]: ${message}`);
  sendWebhook(chatWebHook, `\`💬 ${player.name} [${player.id}]: ${message}\``);

  if (message.startsWith("!")) {
    message = message.substr(1);
    let args = message.split(" ");

    if (args[0] == "admin" && args.length == 1 && allowPublicAdmin == true) {
      if (isAdminPresent() == false) {
        room.setPlayerAdmin(player.id, true);
      } else {
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "admin" && args.length == 2) {
      if (args[1] == superAdminCode) {
        room.setPlayerAdmin(player.id, true);
        if (superAdmins.indexOf(player.id) === -1) {
          superAdmins.push(player.id);
        }
        announce(player.name + " set to Superadmin");
      }
    } else if (args[0] == "clearbans") {
      if (player.admin) {
        room.clearBans();
        announce("Seluruh Banned dihapus oleh " + player.name);
      } else {
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "dc" && args.length == 1) {
      announce("JANGAN LUPA JOIN DISCORD ( discord.gg/pm55tVsQMX )");
      return false;
    } else if (args[0] == "uni" && args.length == 1) {
      room.sendAnnouncement("_______________________________________", player.id, 0xffff17, "normal");
      room.sendAnnouncement("Soccer teams:", player.id, 0xffff17, "normal");
      room.sendAnnouncement("Brazil [!brared/brablue], Argentina [!argred/argblue], Spain [!espred/espblue], Portugal [!porred/porblue], Indo [!indred/indblue], Netherlands [!nedred/nedblue]", player.id, 0xffffff, "normal");
      room.sendAnnouncement(
        "Chelsea [!chered/cheblue], Mufc (!munred/munblue), City [!mcired/mciblue], Leverkusen [!levred/levblue], Liverpool [!livred/livblue],  [!madred/madblue, Barca [!barred/barblue, Juventus [!juvred/juvblue]",
        player.id,
        0xffffff,
        "normal"
      );
      room.sendAnnouncement("_______________________________________", player.id, 0xffff17, "bold");
      return false;
    } else if (args[0] == "reminder" && args.length == 1) {
      announce("REMINDER !! MAIN PASSING PENDEK, JAGA POSISI, JANGAN NGEJAR BOLA MULU BIAR RAPIH");
      return false;
    } else if (args[0] == "court" && args.length == 1) {
      whisper("Current background color is " + mapBGColor);
    } else if (args[0] == "argred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0x000000, [0x2a74d1, 0xfcfcfc, 0x2a74d1]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Argentina]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "argblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0x000000, [0x2a74d1, 0xfcfcfc, 0x2a74d1]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Argentina]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "indred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0x000000, [0xf50000, 0xffffff]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Indonesia]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "indblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0x000000, [0xf50000, 0xffffff]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Indonesia]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "nedred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xff5f05]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Netherlands]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "nedblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xffffff, [0xff5f05]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Netherlands]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "porred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 132, 0xffffff, [0x1fa303, 0xfc0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Portugal]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "porblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 132, 0xffffff, [0x1fa303, 0xfc0000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Portugal]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "brared" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0x000000, [0xffee1c, 0x1fd111]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Brazil]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "brablue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0x000000, [0xffee1c, 0x1fd111]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Brazil]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "barred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0xffffff, [0xff0000, 0x3228d1, 0xff0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Barca]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "barblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0xffffff, [0xff0000, 0x3228d1, 0xff0000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Barca]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "madred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0x000000, [0xffffff]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Madrid]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "madblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0x000000, [0xffffff]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Madrid]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "atmred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0x000000, [0xff0000, 0xffffff, 0xff0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Atletico Madrid]!", null, 0x30f55f, "bnormal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "atmblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0x000000, [0xff0000, 0xffffff, 0xff0000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Atletico Madrid]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "livred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xd10000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Liverpool]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "livblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xffffff, [0xd10000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Liverpool]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "munred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xfa0c0c, 0x000000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Man Utd]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "munblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xffffff, [0xfa0c0c, 0x000000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Man Utd]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "totred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 270, 0x000000, [0x130c5c, 0xffffff, 0xffffff]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Spurs]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "totblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 270, 0x000000, [0x130c5c, 0xffffff, 0xffffff]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Spurs]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "chered" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0x040099]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Chelsea]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "cheblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x040099]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Chelsea]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "levred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 270, 0xffffff, [0x000000, 0xd80000, 0x000000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Leverkusen]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "levblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 270, 0xffffff, [0x000000, 0xd80000, 0x000000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Leverkusen]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "juvred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 180, 0xadadad, [0x232323, 0xffffff]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Juventus]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "juvblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 180, 0xadadad, [0x232323, 0xffffff]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Juventus]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "mcired" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0x000000, [0x2186d1, 0xfcfcfc]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Man City]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "mciblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0x000000, [0x2186d1, 0xfcfcfc]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Man City]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "milanred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0xf50000, 0x000000, 0xff0000]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [AC Milan]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "milanblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0xf50000, 0x000000, 0xff0000]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [AC Milan]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "interred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 0, 0xffffff, [0x2526f5, 0x000000, 0x2526f5]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Inter Milan]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "interblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 0, 0xffffff, [0x2526f5, 0x000000, 0x2526f5]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Inter Milan]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "arsred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xffffff, [0xe7eaef, 0xba1029, 0xba1029]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Arsenal]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "arsblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xffffff, [0xe7eaef, 0xba1029, 0xba1029]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Arsenal]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "espred" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(1, 90, 0xfeea67, [0xff3136]);
        room.sendAnnouncement("The captain of the red team, chose the uniform [Espana]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "espblue" && args.length == 1) {
      if (player.admin) {
        room.setTeamColors(2, 90, 0xfeea67, [0xff3136]);
        room.sendAnnouncement("The captain of the blue team, chose the uniform [Espana]!", null, 0x30f55f, "normal");
      } else {
        whisper("You are not Team Captain", player.id);
      }
      return false;
    } else if (args[0] == "offset" && args.length == 1) {
      if (player.admin) {
        announce(centerText(" VAR : ⛔️ CHECKING POSSIBLE OFFSIDE ⛔️ "));
        announce(centerText(" VAR : ⛔️ CHECKING POSSIBLE OFFSIDE ⛔️ "));
        announce(centerText(" VAR : ⛔️ CHECKING POSSIBLE OFFSIDE ⛔️ "));
        room.pauseGame(true);
      } else {
        whisper("👿 KAMU BUKAN ADMIN! 👿", player.id);
      }
      return false;
    } else if (args[0] == "offsetred" && args.length == 1) {
      if (player.admin) {
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        room.pauseGame(false);
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
        whisper("👿 KAMU BUKAN ADMIN! 👿", player.id);
      }
    } else if (args[0] == "offsetblue" && args.length == 1) {
      if (player.admin) {
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        announce(centerText(" VAR : 🔴 DECISION OFFSIDE 🔴 "));
        room.pauseGame(false);
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
        whisper("👿 KAMU BUKAN ADMIN! 👿", player.id);
      }
    } else if (args[0] == "onside" && args.length == 1) {
      if (player.admin) {
        announce(centerText(" VAR : 🟢 DECISION ONSIDE 🟢 "));
        announce(centerText(" VAR : 🟢 DECISION ONSIDE 🟢 "));
        announce(centerText(" VAR : 🟢 DECISION ONSIDE 🟢 "));
        room.pauseGame(false);
      } else {
        whisper("👿 KAMU BUKAN ADMIN! 👿", player.id);
      }
      return false;
    } else if (args[0] == "gkkblue" && args.length == 1) {
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
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "gkkred" && args.length == 1) {
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
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "court" && args.length == 2 && player.admin) {
      if (room.getScores() == null) {
        if (args[1] == "reset") {
          mapBGColor = "86A578";
          announce("Map background color reset by " + player.name);
        } else {
          mapBGColor = args[1];
          announce("Map background color set to " + args[1] + " by " + player.name);
        }
        room.setCustomStadium(getRealSoccerMap());
      } else {
        whisper("Cannot change map background color while game in progress", player.id);
      }
    } else if (args[0] == "swap") {
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
          announce("🔄 Team Swap");
        }
      } else {
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "acak" && player.admin) {
      if (player.admin) {
        var players = room.getPlayerList();

        // Filter out admin players
        var nonAdminPlayers = players.filter(function (p) {
          return !p.admin;
        });

        // Shuffle the non-admin players array to randomize
        shuffleArray(nonAdminPlayers);

        // Divide non-admin players into two teams
        var team1 = [];
        var team2 = [];

        for (var i = 0; i < nonAdminPlayers.length; i++) {
          if (i % 2 === 0) {
            team1.push(nonAdminPlayers[i].id);
          } else {
            team2.push(nonAdminPlayers[i].id);
          }
        }

        // Assign teams to non-admin players
        for (var j = 0; j < team1.length; j++) {
          room.setPlayerTeam(team1[j], 1);
        }
        for (var k = 0; k < team2.length; k++) {
          room.setPlayerTeam(team2[k], 2);
        }
      } else {
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "setpassword" && player.admin) {
      if (superAdmins.indexOf(player.id) > -1) {
        room.setPassword(args[1]);
        roomPassword = args[1];
        announce("Password room diubah oleh: " + player.name);
      } else {
        whisper("Only Super Admins can change password", player.id);
      }
    } else if (args[0] == "clearpassword" && player.admin) {
      if (superAdmins.indexOf(player.id) > -1) {
        room.setPassword(null);
        roomPassword = null;
        announce("Password dibersihkan oleh " + player.name);
      } else {
        whisper("Only Super Admins can clear password", player.id);
      }
    } else if (args[0] == "map") {
      room.sendAnnouncement("List Map RSI : Real Soccer [!rsmap], Futsal [!futsalmap], 1v1 [!winkymap]", player.id, 0xffffff, "normal");
    } else if (args[0] == "rsmap") {
      if (superAdmins.indexOf(player.id) > -1) {
        room.stopGame();
        room.setCustomStadium(getRealSoccerMap());
        room.startGame();
      } else {
        if (room.getScores() == null) {
          room.setCustomStadium(getRealSoccerMap());
        } else {
          whisper("Cannot change map while game in progress", player.id);
        }
      }
    } else if (args[0] == "futsalmap") {
      if (room.getScores() == null) {
        room.setCustomStadium(getFutsalMap());
      } else {
        whisper("Cannot change map while game in progress", player.id);
      }
    } else if (args[0] == "penmap" && player.admin) {
      if (superAdmins.indexOf(player.id) > -1) {
        room.stopGame();
        room.setCustomStadium(getPenMap());
        room.startGame();
      } else {
        whisper("You are not Superadmin", player.id);
      }
    } else if (args[0] == "winmap" && player.admin) {
      if (superAdmins.indexOf(player.id) > -1) {
        room.stopGame();
        room.setCustomStadium(getWinnerMap());
        room.startGame();
      } else {
        whisper("You are not Superadmin", player.id);
      }
    } else if (args[0] == "rr" && player.admin) {
      room.stopGame();
      room.startGame();
    } else if (args[0] == "bb") {
      room.kickPlayer(player.id, "👋 Until later", false);
    } else if (args[0] == "afk" || args[0] == "nv") {
      if (!afkPlayers[player.id]) {
        afkPlayers[player.id] = true;
        room.sendAnnouncement(player.name + " is now AFK.", null, 0x99ffff, "normal", 1);
      } else {
        delete afkPlayers[player.id];
        room.sendAnnouncement(player.name + " is no longer AFK.", null, 0x99ffff, "normal", 1);
      }
      return false;
    } else if (args[0] == "powershot" || args[0] == "ps") {
      if (player.admin) {
        if (powerShotMode == false) {
          powerShotMode = true;
          announce("POWERSHOT mode diaktifkan oleh " + player.name, null, 0x00ff00);
        } else {
          powerShotMode = false;
          announce("POWERSHOT mode dimatikan oleh " + player.name, null, 0xff0000);
        }
      } else {
        whisper("⚠️ You don't have permission", player.id);
      }
    } else if (args[0] == "help") {
      displayHelp(player.id, args[1]);
    } else if (args[0] == "super") {
      let superMsg = "Super Admins: ";
      superAdmins.forEach(function (id) {
        if (room.getPlayer(id) != null || room.getPlayer(id) != undefined) {
          superMsg = superMsg + room.getPlayer(id).name + ", ";
        }
      });
      if (superAdmins.length > 0) {
        superMsg = superMsg.slice(0, -2);
      } else {
        superMsg = "There are no super admins present";
      }
      whisper(superMsg, player.id);
    }
    return false;
  }

  for (let i = 0; i < bannedWords.length; i++) {
    if (message.toLowerCase().includes(bannedWords[i])) {
      // Batalkan pesan yang mengandung kata-kata yang dilarang
      whisper("⚠️ Badword Detected!! ( WARNING 1 ) ", player.id);
      sendWebhook(toxicWebhook, `\`[${player.name}] received warn ( Bad Word Detected ) \``);
      return false;
    }
  }

  if (message.startsWith("t ") || message.startsWith("T ")) {
    teamMsg = message.substring(1).trim();
    if (player.team == 1) {
      var players = room.getPlayerList().filter((player) => player.team == 1);
      players.forEach(function (teamPlayer) {
        room.sendAnnouncement("[🔴 TEAM CHAT] " + player.name + ": " + teamMsg, teamPlayer.id, 0xed6a5a, "bold", 1);
      });
    }
    if (player.team == 2) {
      var players = room.getPlayerList().filter((player) => player.team == 2);
      players.forEach(function (teamPlayer) {
        room.sendAnnouncement("[🔵 TEAM CHAT] " + player.name + ": " + teamMsg, teamPlayer.id, 0x5995ed, "bold", 1);
      });
    }
    if (player.team == 0) {
      var players = room.getPlayerList().filter((player) => player.team == 0);
      players.forEach(function (teamPlayer) {
        room.sendAnnouncement("[VIEWERS] " + player.name + ": " + teamMsg, teamPlayer.id, 0xdee7fa, "bold", 1);
      });
    }
    return false;
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

  if (message.startsWith("r ") || message.startsWith("R ")) {
    teamWin = message.substring(1).trim();
    if (player.admin) {
      var players = room.getPlayerList();

      // Move non-admin players to spectators
      for (var i = 0; i < players.length; i++) {
        if (!players[i].admin) {
          room.setPlayerTeam(players[i].id, 0); // 0 for spectators
        }
      }

      return false;
    } else {
      whisper("⚠️ You don't have permission", player.id);
    }
    return false;
  }

  if (message.startsWith("w ") || message.startsWith("W ")) {
    teamWin = message.substring(1).trim();
    if (player.admin) {
      announce("⚽ FULL TIME ⚽");
      announce("PERTANDINGAN DIMENANGKAN OLEH 🏆 " + teamWin + " 🏆");
      return false;
    } else {
      whisper("⚠️ You don't have permission", player.id);
    }
    return false;
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
        room.kickPlayer(playerToKick.id, "You have been kicked from the room.");
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

  if (player.admin == true) {
    room.sendAnnouncement("💬 (ADMIN|Spec) " + player.name + ":  " + message, null, 0x99ffff, "normal", 1);
    return false;
  } else {
    if (player.team == 1) {
      room.sendAnnouncement("🔴 (RED|Team) " + player.name + ":  " + message, null, 0xed6a5a, "normal", 1);
    }
    if (player.team == 2) {
      room.sendAnnouncement("🔵 (BLUE|Team) " + player.name + ":  " + message, null, 0x25C9F5, "normal", 1);
    }
    if (player.team == 0) {
      room.sendAnnouncement("💬 (PLAYER|Spec) " + player.name + ":  " + message, null, 0x72D23F, "normal", 1);
    }
    return false;
  }

  // if (player.admin == true) {
  //   room.sendAnnouncement("💬 (Admin|" + player.id + ") " + player.name + ":  " + message, null, 0x99ffff, "normal", 1);
  //   return false;
  // } else {
  //   room.sendAnnouncement("💬 (Player|" + player.id + ") " + player.name + ":  " + message, null, 0xffffff, "normal", 1);
  //   return false;
  // }
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function displayHelp(id, selection) {
  if (selection == null) {
    whisper("Perintah: !dc, !rsmap, !rr, !powershot, !afk, !admin, !setpassword, !clearpassword, !super, !clearbans, !swap, @@[player] [pm msg] , t [team chat msg], !court, !court [hexcolor], !court reset", id, null, "small");
  }
}

room.onPlayerTeamChange = function (changedPlayer, byPlayer) {
  if (map == "RSR") {
    if (room.getScores() != null) {
      if (game.rsActive == false) {
        room.getPlayerList().forEach(function (player) {
          if (player != undefined) {
            if (game.rsGoalKick == true || game.rsCorner == true) {
              room.setPlayerDiscProperties(player.id, { invMass: 9999999 });
            }
          }
        });
      }
    }

    if (changedPlayer.team == 0) {
      room.sendAnnouncement("🡪 You have been moved to SPECTATOR", changedPlayer.id, 0xffffff, "normal", 1);
    } else if (changedPlayer.team == 1) {
      room.sendAnnouncement("🡪 You have been moved to RED TEAM", changedPlayer.id, 0xed6a5a, "normal", 1);
    } else if (changedPlayer.team == 2) {
      room.sendAnnouncement("🡪 You have been moved to BLUE TEAM", changedPlayer.id, 0x33dddd, "normal", 1);
    }
  }
};

room.onTeamGoal = function (team) {
  if (map == "RSR") {
    game.rsActive = false;

    let goalTime = secondsToMinutes(Math.floor(room.getScores().time));
    let scorer;
    let assister = "";
    let goalType;
    if (team == 1) {
      if (game.lastKickerTeam == 1) {
        var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
        //if goal type is goal
        goalType = "GOALLL!";
        scorer = "⚽ Scorer: " + game.lastKickerName;
        avatarCelebration(game.lastKickerId, "⚽");
        if (game.secondLastKickerTeam == 1 && game.lastKickerId != game.secondLastKickerId) {
          assister = " ( 🅰️ Assist: " + game.secondLastKickerName + " )";
          avatarCelebration(game.secondLastKickerId, "🅰️");
        }
        room.sendAnnouncement("👀 [Komentator]: " + frasegol + "" + game.lastKickerName + "", null, 0xffffe0, "normal");
        sendWebhook(goalWebHook, `[GOLL TIM MERAH] ** Scorer: ** \`${game.lastKickerName}\` ** Assist: ** \`${game.secondLastKickerName}\` ** Menit: ** \`${goalTime}\` `);
      }
      if (game.lastKickerTeam == 2) {
        goalType = "GOAL BUNUH DIRI!";
        scorer = "☠️ Scorer: " + game.lastKickerName;
        avatarCelebration(game.lastKickerId, "☠️");
        if (game.secondLastKickerTeam == 1) {
          // if owngoal was assisted
          assister = " ( 🅰️ Assist: " + game.secondLastKickerName + " )";
          avatarCelebration(game.secondLastKickerId, "🅰️");
        }
        room.sendAnnouncement("👀 [Komentator]: 🤦‍♂️ HARI HARI OWN GOAL!! 🤦‍♂️", null, 0xffffe0, "normal");
        sendWebhook(goalWebHook, `[OWN-GOAL TIM MERAH] ** Scorer: ** \`${game.lastKickerName}\` ** Assist: ** \`${game.secondLastKickerName}\` ** Menit: ** \`${goalTime}\` `);
      }
      game.redScore++;
    }
    if (team == 2) {
      if (game.lastKickerTeam == 2) {
        var frasegol = frasesGols[(Math.random() * frasesGols.length) | 0];
        goalType = "GOALLL!";
        scorer = "⚽ Scorer: " + game.lastKickerName;
        avatarCelebration(game.lastKickerId, "⚽");
        if (game.secondLastKickerTeam == 2 && game.lastKickerId != game.secondLastKickerId) {
          assister = " ( 🅰️ Assist: " + game.secondLastKickerName + " )";
          avatarCelebration(game.secondLastKickerId, "🅰️");
        }
        room.sendAnnouncement("👀 [Komentator]: " + frasegol + "" + game.lastKickerName + "", null, 0xffffe0, "normal");
        sendWebhook(goalWebHook, `[GOLL TIM BIRU] ** Scorer: ** \`${game.lastKickerName}\` ** Assist: ** \`${game.secondLastKickerName}\` ** Menit: ** \`${goalTime}\` `);
      }
      if (game.lastKickerTeam == 1) {
        goalType = "GOAL BUNUH DIRI!";
        scorer = "☠️ Scorer: " + game.lastKickerName;
        avatarCelebration(game.lastKickerId, "☠️");
        if (game.secondLastKickerTeam == 2) {
          assister = " ( 🅰️ Assist: " + game.secondLastKickerName + " )";
          avatarCelebration(game.secondLastKickerId, "🅰️");
        }
        room.sendAnnouncement("👀 [Komentator]: 🤦‍♂️ HARI HARI OWN GOAL!! 🤦‍♂️", null, 0xffffe0, "normal");
        sendWebhook(goalWebHook, `[OWN-GOAL TIM BIRU] ** Scorer: ** \`${game.lastKickerName}\` ** Assist: ** \`${game.secondLastKickerName}\` ** Menit: ** \`${goalTime}\` `);
      }
      game.blueScore++;
    }
    announce(goalType + " 🟥 " + game.redScore + " - " + game.blueScore + " 🟦 🕒" + goalTime + " " + scorer + assister);
    game.lastKicker = undefined;
    game.secondLastKicker = undefined;
    game.lastKickerTeam = undefined;
    game.secondLastKickerTeam = undefined;
  }
};

room.onPositionsReset = function () {
  if (map == "RSR") {
    if (game.lastPlayAnnounced == true) {
      room.stopGame(true);
      game.lastPlayAnnounced = false;
      announce("⚽ FULL TIME ⚽");
      announce("⚽ FULL TIME ⚽");
      sendDiscordRecording();
      whisper("Replay dikirim ke discord!", null);
      sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
    }
  }
};

room.onGameTick = function () {
  if (map == "RSR") {
    updateGameStatus();
    handleBallTouch();
    realSoccerRef();
  }
};

function realSoccerRef() {
  if (map == "RSR") {
    blockThrowIn();
    blockGoalKick();
    removeBlock();
    if (game.time == gameTime * 60 && game.extraTimeAnnounced == false) {
      extraTime();
      game.extraTimeAnnounced = true;
    }

    if (game.time == game.extraTimeEnd && game.lastPlayAnnounced == false) {
      announce("Peluang Terakhir", null, null, null, 1);
      game.lastPlayAnnounced = true;
    }

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
          announce("⚽ HALF TIME ⚽");
          announce("⚽ HALF TIME ⚽");
          room.setTimeLimit(gameTime);
          sendDiscordRecording();
          whisper("Replay dikirim ke discord!", null);
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
          announce("⚽ HALF TIME ⚽");
          announce("⚽ HALF TIME ⚽");
          room.setTimeLimit(gameTime);
          sendDiscordRecording();
          whisper("Replay dikirim ke discord!", null);
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
            room.sendAnnouncement("👀 [Komentator]: Goal Kick untuk tim biru 🥅", null, 0xffffe0, "normal");
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
          room.sendAnnouncement("👀 [Komentator]: Corner Kick untuk tim merah 🚩", null, 0xffffe0, "normal");
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
          announce("⚽ HALF TIME ⚽");
          announce("⚽ HALF TIME ⚽");
          room.setTimeLimit(gameTime);
          sendDiscordRecording();
          whisper("Replay dikirim ke discord!", null);
          sendWebhook(startWebHook, `\`⚽ FULL TIME ⚽\``);
        }
        room.setDiscProperties(0, { xgravity: 0, ygravity: 0 });
        room.getPlayerList().forEach(function (player) {
          room.setPlayerDiscProperties(player.id, { invMass: 100000 });
        });

        if (game.rsTouchTeam == 1) {
          room.sendAnnouncement("👀 [Komentator]: Corner Kick untuk tim biru 🚩", null, 0xffffe0, "normal");
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
            room.sendAnnouncement("👀 [Komentator]: Goal Kick untuk tim merah 🥅", null, 0xffffe0, "normal");
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
          if (game.powershotCounter > 75 && game.powershotTrigger == false && Math.round(room.getDiscProperties(0).invMass) != 2) {
            room.setDiscProperties(0, { invMass: 2.42 });
            room.sendAnnouncement("POWERSHOT READY!", game.powershotID, 0x33dd33, "bold", 1);
            room.setPlayerAvatar(game.powershotID, "🚀");
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
        room.sendAnnouncement("POWERSHOT CANCELED!", game.powershotID, 0xdd3333, "bold", 2);
        room.setPlayerAvatar(game.powershotID, null);
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

function displayAdminMessage() {
  if (isAdminPresent() == false && allowPublicAdmin == true) {
    announce("No admin present: Type !admin to take control");
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

// optimize avatar
async function avatarCelebration(playerId, avatar) {
  const intervals = [250, 750, 1250, 1500, 2000, 2500, 3000, 3250];

  for (let i = 0; i < intervals.length; i++) {
    await sleep(intervals[i]);
    if (i % 2 === 0) {
      room.setPlayerAvatar(playerId, avatar);
    } else {
      room.setPlayerAvatar(playerId, null);
    }
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
  form.append("file", new File([room.stopRecording()], `RSI-league-Replay-${getDate()}.hbr2`, { type: "text/plain" }));
  var request = new XMLHttpRequest();
  request.open("POST", replayWebHook);
  request.send(form);
}

setInterval(function () {
  room.sendAnnouncement("⭐ Searching for the CHAMPIONS ⭐", null, 0x5ee7ff, "bold", 0);
  setTimeout(function () {
    room.sendAnnouncement("⚽ RSI League SEASON 1 ⚽", null, 0x61ddff, "normal", 0);
  }, 90000); // Wait 40 seconds after the first announcement
}, 200000);
