class Keyboard
{
	constructor()
	{
		var keyMap = [];
		//
		this.Init = function()
		{
			onkeydown = onkeyup = function( e )
			{
				keyMap[e.keyCode] = ( e.type == "keydown" );
			}
		}
		
		this.KeyDown = function( key )
		{
			return( keyMap[key] );
		}
		this.KeyUp = function( key )
		{
			return( !keyMap[key] );
		}
		
		this.CharDown = function( character )
		{
			const key = character.charCodeAt( 0 );
			return( keyMap[key] );
		}
		this.CharUp = function( character )
		{
			const key = character.charCodeAt( 0 );
			return( !keyMap[key] );
		}
	}
}