// Strings!
const version = "v2.1.2";

// Numbers!
const SCR_WIDTH  = 800;
const SCR_HEIGHT = 600;

// Booleans!
var started = false;

// Arrays!
// const includeFiles =
// [
// 	"js/Player.js"
// ];

// Objects!
var calc = new Calc();
var gfx  = new Graphics();
var kbd  = new Keyboard();
var ms   = new Mouse();
var ajax = new AJAX();

var pl = new Player();

// Other Assets:
const startSound = new Audio( "sounds/intro.wav" );
const introImage = new Image();

window.onload = function()
{
	const FPS = 30;
	
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / FPS );
	
	Init();
};

function Init()
{
	gfx.Init( SCR_WIDTH,SCR_HEIGHT );
	kbd.Init();
	ms.Init( gfx.canvas );
	
	gfx.SetSmoothing( true ); // Set false for pixel art.
	
	// for( var i in includeFiles )
	// {
	// 	var userFile = document.createElement( "script" );
	// 	userFile.src = includeFiles[i];
	// 	
	// 	document.getElementById( "USER_SCRIPTS" ).appendChild( userFile );
	// }
	
	// \/ Initialize things! \/
	pl.Init();
	introImage.src = "images/intro.png";
	// /\ Initialize!        /\
	
	console.log( "JSJ Framework " + version + " has loaded successfully!" );
}

function Update()
{
	// \/ Update things here. \/
	if( !started )
	{
		console.log( "Welcome!  In this game you must press certain arrow keys to defeat enemies!  Press down arrow to start!" );
		gfx.context.drawImage( introImage,0,0 );
		
		if( kbd.KeyDown( 40 ) )
		{
			started = true;
		}
	}
	else
	{
		pl.Update();
	}
	// /\                     /\
}

function Draw()
{
	// gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// \/ Draw things here. \/
	
	// /\                   /\
}
