// User created file!

class Player
{
	constructor()
	{
		var RandEnemy = function( rngNum )
		{
			// if( lastEnemy === rngNum )
			// {
			// 	lastEnemy = calc.Random( 0,3 );
			// }
			// else
			{
				lastEnemy = rngNum;
				if( rngNum === 0 )
				{
					menacingSkeleton.currentTime = 0;
					menacingSkeleton.play();
					return "A menacing Skeleton";
				}
				else if( rngNum === 1 )
				{
					ravenousZombie.currentTime = 0;
					ravenousZombie.play();
					return "A ravenous Zombie";
				}
				else if( rngNum === 2 )
				{
					hungryOrc.currentTime = 0;
					hungryOrc.play();
					return "A hungry Orc";
				}
				else if( rngNum === 3 )
				{
					corruptedKnight.currentTime = 0;
					corruptedKnight.play();
					return "A corrupted Knight";
				}
			}
		}
		
		var PlayRandomEnemyDeathSound = function()
		{
			// console.log( "Bam!" );
			var rngNum = calc.Random( 0,3 );
			
			if( rngNum === 0 )
			{
				// console.log( "Nice shot!" );
				niceShot.currentTime = 0;
				niceShot.play();
			}
			else if( rngNum === 1 )
			{
				// console.log( "Yea!  Beat 'em up!" );
				yeaBeatEmUp.currentTime = 0;
				yeaBeatEmUp.play();
			}
			else if( rngNum === 2 )
			{
				// console.log( "Enemy eliminated!" );
				enemyEliminated.currentTime = 0;
				enemyEliminated.play();
			}
			else if( rngNum === 3 )
			{
				// console.log( "Whew!  Glad I'm not them." );
				gladImNotThem.currentTime = 0;
				gladImNotThem.play();
			}
		}
		
		var PlayEnemyApproachingSound = function( dir,enemy )
		{
			var newWinningKeypress;
			if( dir === lastDir )
			{
				newWinningKeypress = calc.Random( 37,40 );
				dir = newWinningKeypress;
			}
			isPlayingSound = true;
			RandEnemy( enemy );
			const delay = 1500;
			if( dir === 37 )
			{
				// console.log( RandEnemy( enemy ) + " approaches from the left!" );
				setTimeout( function()
				{
					left.currentTime = 0;
					left.play();
				},delay );
			}
			else if( dir === 38 )
			{
				// console.log( RandEnemy( enemy ) + " is right in front of you!" );
				setTimeout( function()
				{
					front.currentTime = 0;
					front.play();
				},delay );
			}
			else if( dir === 39 )
			{
				// console.log( RandEnemy( enemy ) + " attacks from the right!" );
				setTimeout( function()
				{
					right.currentTime = 0;
					right.play();
				},delay );
			}
			else if( dir === 40 )
			{
				// console.log( RandEnemy( enemy ) + " surprise attacks from behind!" );
				setTimeout( function()
				{
					back.currentTime = 0;
					back.play();
				},delay );
			}
			
			return newWinningKeypress;
		}
		
		var Lose = function()
		{
			// Play current narrator death sound and move to next narrator.
			gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#F31" );
			// console.log( "BLARGHG!" );
			ouch.currentTime = 0;
			ouch.play();
			setTimeout( function() { isLost = true; },ouch.duration * 1000 );
			++narrator;
			enemySpawned = false;
		}
		// 
		var numEnemiesFought = 0;
		
		var ENEMY_SPAWN_TIME = 70; // From const.
		var enemyTimer = 0;
		var enemySpawned = false;
		
		var enemyAttackTimer = 0;
		const ENEMY_ATTACK_TIME = 70 + 100;
		
		var winningKeypress = 38;
		
		var narrator = 0;
		var isPlayingSound = false;
		
		var curEnemy = 0;
		var enemies =
		[
			new Image(),
			new Image(),
			new Image(),
			new Image()
		];
		enemies[0].src = "images/skeleton.png";
		enemies[1].src = "images/zombie.png";
		enemies[2].src = "images/orc.png";
		enemies[3].src = "images/knight.png";
		
		var deadEnemies =
		[
			new Image(),
			new Image(),
			new Image(),
			new Image()
		];
		deadEnemies[0].src = "images/brokenSkeleton.png";
		deadEnemies[1].src = "images/hurtZombie.png";
		deadEnemies[2].src = "images/hurtOrc.png";
		deadEnemies[3].src = "images/hurtKnight.png";
		
		var corruptedKnight = new Audio( "sounds/aCorruptedKnight.wav" );
		var hungryOrc = new Audio( "sounds/aHungryOrc.wav" );
		var menacingSkeleton = new Audio( "sounds/aMenacingSkeleton.wav" );
		var ravenousZombie = new Audio( "sounds/aRavenousZombie.wav" );
		
		var left = new Audio( "sounds/left.wav" );
		var front = new Audio( "sounds/front.wav" );
		var right = new Audio( "sounds/right.wav" );
		var back = new Audio( "sounds/back.wav" );
		
		var enemyEliminated = new Audio( "sounds/enemyEliminated.wav" );
		var gladImNotThem = new Audio( "sounds/gladImNotThem.wav" );
		var niceShot = new Audio( "sounds/niceShot.wav" );
		var yeaBeatEmUp = new Audio( "sounds/yeaBeatEmUp.wav" );
		
		var ouch = new Audio( "sounds/augh.wav" );
		
		{
			const newVol = 0.5;
			
			corruptedKnight.volume = newVol;
			hungryOrc.volume = newVol;
			menacingSkeleton.volume = newVol;
			ravenousZombie.volume = newVol;
			
			left.volume = newVol;
			front.volume = newVol;
			right.volume = newVol;
			back.volume = newVol;
			
			enemyEliminated.volume = newVol;
			gladImNotThem.volume = newVol;
			niceShot.volume = newVol;
			yeaBeatEmUp.volume = newVol;
			
			ouch.volume = newVol;
		}
		
		var lastDir = 999;
		var lastEnemy = 999;
		var isLost = false;
		// 
		this.Init = function()
		{
			ouch.volume = 0.5;
		}
		
		this.Update = function()
		{
			if( !enemySpawned )
			{
				++enemyTimer;
				if( enemyTimer > ENEMY_SPAWN_TIME )
				{
					enemySpawned = true;
					
					if( !calc.Random( 0,1 ) && ENEMY_SPAWN_TIME > 10 )
					{
						ENEMY_SPAWN_TIME -= 5;
					}
				}
				
				winningKeypress = calc.Random( 37,40 );
				enemyAttackTimer = 0;
				curEnemy = calc.Random( 0,3 );
				isPlayingSound = false;
			}
			else
			{
				enemyTimer = 0;
				
				// Say which key to press here!
				var newWinningKeypress = winningKeypress;
				if( !isPlayingSound )
				{
					newWinningKeypress = PlayEnemyApproachingSound( winningKeypress,curEnemy );
				}
				
				gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#FFF" );
				gfx.context.drawImage( enemies[curEnemy],0,0 );
				
				if( kbd.KeyDown( newWinningKeypress ) )
				{
					enemySpawned = false;
					PlayRandomEnemyDeathSound();
					// Play enemy death sound.
					// Narrator comments on enemies' death.
					gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#FFF" );
					gfx.context.drawImage( deadEnemies[curEnemy],0,0 );
				}
				else if( kbd.KeyDown( 37 ) || kbd.KeyDown( 38 ) || kbd.KeyDown( 39 ) || kbd.KeyDown( 40 ) )
				{
					Lose();
				}
				
				++enemyAttackTimer;
				if( enemyAttackTimer > ENEMY_ATTACK_TIME )
				{
					Lose();
				}
			}
		}
		
		this.IsLost = function()
		{
			return isLost;
		}
	}
}