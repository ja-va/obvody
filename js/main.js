
require.config({
	paths: {
		"text": "libs/require/text",
		"sidebarHtml": "../templates/sidebar.html",
		"mapContainer": "../templates/map.html",
		"mapyApi": "http://api4.mapy.cz/loader", 

        "data/hranice": "../data/hranice2015.json",
        "data/obchod": "../data/obchod2015.json",
        "data/obvod": "../data/obvod2015.json",

	},
	waitSeconds: 15
});

//load and init 
require(['app', 'map', 'treeList', 'text!sidebarHtml', 'utils', "text!data/obvod", "text!data/obchod", "text!data/hranice"], 
	function(app, map ,treeList, barTmpl, utils, obvod, obchod, hranice){
		map.init();

        utils.loadTemplate(barTmpl, 'sidebar', app);

        var vrstvy = [];
        vrstvy.push(JSON.parse(obvod));
        vrstvy.push(JSON.parse(obchod)); 
        vrstvy.push(JSON.parse(hranice)); 

        treeList({
            target: "obvody-treelist",
            dataSource: vrstvy,
        });
});