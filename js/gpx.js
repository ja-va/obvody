define([],function load() { /* Funkce volaná po stisku tlačítka */
    var value = JAK.gel("gpx").value.trim();
    if (!value) { return alert("Vložte do textového pole obsah GPX souboru"); }
    var xmlDoc = JAK.XML.createDocument(value);

    var gpx = new SMap.Layer.GPX(xmlDoc, null, {maxPoints:500}); /* GPX vrstva */
    m.addLayer(gpx); /* Přidáme ji do mapy */
    gpx.enable();    /* Zapnout vrstvu */
    gpx.fit();       /* Nastavit mapu tak, aby byla GPX trasa dobře vidět */
} )

