var overlay_status = false;

function overlay_toggle () {
	
	if (overlay_status == false) {
		
		overlay_status = true;
		
		$("#overlay").fadeToggle(250);
		
		setTimeout(function(){
			
			overlay_status = false;
			
		}, 500);
	
	}
	
	else if (overlay_status == true) {};
            
};



