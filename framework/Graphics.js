class Graphics
{
	constructor()
	{
		this.canvas = document.getElementById( "gc" );
		this.context = this.canvas.getContext( "2d" );
		
		//
		this.Init = function( width,height )
		{
			this.canvas.width  = width;
			this.canvas.height = height;
			
			this.SCREEN_WIDTH  = width;
			this.SCREEN_HEIGHT = height;
		}
		this.Circle = function( x,y,size,color )
		{
			this.context.fillStyle = color;
			
			this.context.beginPath();
			this.context.arc( x,y,size,0,2 * Math.PI );
			this.context.fill();
		}
		this.Draw = function( x,y,image )
		{
			this.context.drawImage( image,x,y );
		}
		this.Line = function( x0,y0,x1,y1,color,size )
		{
			this.context.strokeStyle = color;
			
			this.context.beginPath();
			
			this.context.moveTo( x0,y0 );
			this.context.lineTo( x1,y1 );
			
			this.context.lineWidth = size;
			this.context.stroke();
		}
		this.SetSmoothing = function( willSmooth )
		{
			this.context.imageSmoothingEnabled       = willSmooth;
			this.context.webkitImageSmoothingEnabled = willSmooth;
			this.context.mozImageSmoothingEnabled    = willSmooth;
		}
		this.Rect = function( x,y,width,height,color,alpha = 1.0 )
		{
			this.context.globalAlpha = alpha;
			this.context.fillStyle = color;
			
			this.context.fillRect( x,y,width,height );
		}
		this.Write = function( x,y,message,color,font = "20PX Arial" )
		{
			this.context.fillStyle = color;
			this.context.font = font;
			
			this.context.fillText( message,x,y );
		}
	}
}