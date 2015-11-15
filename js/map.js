define([ "text!data/obvod", "text!data/obchod", "text!data/hranice"], function( obvod, obchod, hranice){
    var mapa;
    var obvodyLayer;
    var obvodyJson = [];
    obvodyJson = JSON.parse(obvod).features.concat(JSON.parse(obchod).features, JSON.parse(hranice).features);

	var mapControler = {};

	mapControler.init = function(){
		var stred = SMap.Coords.fromWGS84(14.549, 49.953);
		mapa = new SMap(JAK.gel("map"), stred, 12);
		mapa.addDefaultLayer(SMap.DEF_OPHOTO).enable();
		mapa.addDefaultControls();
	}

    mapControler.addPolygon = function(polygonId){
        if(typeof obvodyLayer === "undefined"){
            obvodyLayer = new SMap.Layer.Geometry();
            mapa.addLayer(obvodyLayer);
            obvodyLayer.enable();
        }

        var polygon;
        for(var i = 0; i < obvodyJson.length; i++){
            if(obvodyJson[i].properties.ID === polygonId){
                polygon = obvodyJson[i];

                var coor = polygon.geometry.coordinates[0];
                var Scoor = [];

                for(var i = 0; i < coor.length; i++){
                    var point = SMap.Coords.fromWGS84(coor[i][0], coor[i][1]);
                    Scoor.push(point);
                }

                var polygon = new SMap.Geometry(SMap.GEOMETRY_POLYGON, polygonId, Scoor, {'opacity':0,'outlineWidth':8});
                obvodyLayer.removeAll();
                obvodyLayer.addGeometry(polygon);

                var mapOpt = polygon.computeCenterZoom(mapa,true);
                mapa.animate(mapOpt[0]);
                mapa.setZoom(mapOpt[1]);
                break;
            }
        }
    }

    mapControler.removePolygon = function(){
        
    }

	return mapControler;
})
