var karPreloader = {
	speed : 5000,
	elem : 'kar-loader-wraps',
	elemInner : '',
	preloaderOn : function () {
		var el = document.getElementsByTagName('html')[0],
    	cdiv = document.createElement('div');
		cdiv.id = this.elem;
		cdiv.innerHTML = '<div id="kar-animates">'+this.elemInner+'</div>';
		el.appendChild(cdiv);
	},
	preloaderOff : function() {	
		function fadeoutFn (elem, fadespeed ) {
    		var elem = document.getElementById(elem);
			if(elem.style.display!='none'){
				document.getElementById('kar-animates').style.display='none';
				if (!elem.style.opacity) {
					elem.style.opacity = 1;
				}
				var outInterval = setInterval(function() {
					elem.style.opacity -= 0.05;
					if (elem.style.opacity <= 0) {
						clearInterval(outInterval);
            			elem.style.display='none';
					} 
				}, fadespeed/50 );
			}		
		}
		var elem = this.elem,	
		fadeout = function(){
			fadeoutFn(elem, 1000);
		}
		setTimeout(fadeout, this.speed);
	},
	start : function() {
		this.preloaderOn();	
	    this.preloaderOff();		
	}	 
}
karPreloader.speed = 5000;
karPreloader.elem = 'kar-loader';
karPreloader.elemInner = 'Loading...';
karPreloader.start();