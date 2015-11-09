define([], function(){
	var utils = {};
	utils.loadTemplate = function (tmpl, locationId, callback) {
		var elem = document.getElementById(locationId);
		elem.innerHTML = tmpl;
		callback();
	}

    utils.extendArray = function(){
        Array.prototype.getUnique = function(){
           var u = {}, a = [];
           for(var i = 0, l = this.length; i < l; ++i){
              if(u.hasOwnProperty(this[i])) {
                 continue;
              }
              a.push(this[i]);
              u[this[i]] = 1;
           }
           return a;
        }
    }
	
    utils.Class = function(){};
    utils.Class.prototype.extend = function(params){
        var child = {};
        for (param in params){
            this.call(child, param)
        }
    }

	return utils;
});