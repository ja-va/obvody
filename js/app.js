define([], function(){
	var sideBarControler = function(){
		var lifter = document.getElementById("lifter");
		lifter.addEventListener("click", function(e){
			var elementClass = this.parentElement.classList;
			elementClass.toggle("hidden");
		})
	}
	return sideBarControler;
})