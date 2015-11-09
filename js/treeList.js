define(['map'], function(map){
    var toggleActivate = function(e){
        var item = this.parentNode;
        var activeElements = document.getElementById("obvody-treelist").getElementsByClassName("activate");
        for(var i = 0, l = activeElements.length; i < l; i++){
            if(activeElements[i].isEqualNode(item)) continue;
            activeElements[i].setAttribute("class", "inactivate");
        }
        var currentClass = item.getAttribute("class");
        item.setAttribute("class", currentClass === "activate" ? "inactivate" : "activate");
    }

    var addPolygon = function(e){
        var id = parseInt(this.attributes[0].value);
        map.addPolygon(id);
    }


    var treeList = function(options){
        var data = options.dataSource;
        var dataSource = [];

        for(var i = 0; i < data.length; i++){
            dataSource.push({name: data[i].name, sub: []});
            for(var j = 0; j < data[i].features.length; j++){
                    dataSource[i].sub.push({
                            name: data[i].features[j].properties.nazev,
                            cislo: data[i].features[j].properties.cislo,
                            id: data[i].features[j].properties.ID,
                        });
                
            }
            dataSource[i].sub = dataSource[i].sub.sort(function(a, b){
                if (a.name > b.name) {
                    return 1;
                  }
                  if (a.name < b.name) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });
        }

        var treeListClass = document.createAttribute("class")
        treeListClass.value = "treeList";
        var treeList = document.createElement("ul");
        treeList.setAttributeNode(treeListClass);
        for(var i = 0; i < dataSource.length; i++){
            var item = document.createElement("li");
            item.setAttribute("class", "inactivate");
            var text = document.createTextNode(dataSource[i].name);
            var arrow = document.createElement("span");
            arrow.setAttribute("class", "fa fa-angle-right fa-lg");

            var itemContainer = document.createElement("div");
            itemContainer.addEventListener("click", toggleActivate)
            itemContainer.appendChild(arrow);
            itemContainer.appendChild(text);

            item.appendChild(itemContainer);

            var subList = document.createElement("ul");
            for(var j = 0; j < dataSource[i].sub.length; j++){
                var subItem = document.createElement("li");
                subItem.appendChild(document.createTextNode(dataSource[i].sub[j].cislo + " | " +  dataSource[i].sub[j].name));
                subItem.setAttribute("data-obvod-id", dataSource[i].sub[j].id);
                subItem.setAttribute("title", dataSource[i].sub[j].name);

                subItem.addEventListener("click", addPolygon)
                subList.appendChild(subItem);
            }

            subList.setAttribute("class", "toggle-height");

            item.appendChild(subList);
            treeList.appendChild(item);
        }

        document.getElementById("obvody-treelist").appendChild(treeList); 
    };

	return treeList;
})