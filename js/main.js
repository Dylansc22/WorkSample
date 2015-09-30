

//Set color pallet for each nation's erosion risk score
function getMyColor(d) {   
  return d > 7 ? '#6b0000' : 
        d > 6 ? '#872a08' : 
        d > 5 ? '#c46d1b' : 
        d > 4 ? '#f5af36' : 
        d > 3 ? '#fcd75b' : 
        d > 1 ? '#fce96d' : 
        '#ffff80';
}

function getMyColor2(d) {   
  return d > 4 ? '#6b0000' : 
        d > 3 ? '#872a08' : 
        //d > 3 ? '#c46d1b' : 
        //d > 4 ? '#f5af36' : 
        d > 2 ? '#fcd75b' : 
        d > 1 ? '#fce96d' : 
        '#ffff80';
}

//Sets the default style of the geojson layer, by calling upon the getMyColor function. The color is based upon the MAX field of geojson. 
function setStyle(feature) {
  return {
    fillColor: getMyColor(feature.properties.MAX),
    weight: 1,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: .3,
  };
}

//Sets the default style of the geojson layer, by calling upon the getMyColor function. The color is based upon the MAX field of geojson. 
function setStyle2(feature) {
  return {
    fillColor: getMyColor2(feature.properties.MAX),
    weight: 1,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: .3,
  };
}

//HIGHLIGHT ON HOVER
//Add highlighted style on mouse hover. 
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '',
        fillOpacity: 0.7,
        //fillColor: 'red'
    });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties); //Part of INFO ON HOVER functionality
}//End of HIGHLIGHT ON HOVER

//HIGHLIGHT ON HOVER
//Add highlighted style on mouse hover. 
function highlightFeature2(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 1,
        color: 'grey',
        dashArray: '',
        fillOpacity: 0.7,
        //fillColor: 'red'
    });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties); //Part of INFO ON HOVER functionality
}//End of HIGHLIGHT ON HOVER




//Reset the layer style to its default state (defined by our style function). For this to work, make sure our GeoJSON layer is accessible through the geojson variable by defining it before our listeners and assigning the layer to it later:
var ernationVAR;
var hfwVAR;

// OUR LISTENERS
//LISTENER: Define what happens on mouseout. 
function resetHighlight(e) {
    ernationVAR.resetStyle(e.target);
    info.update(); //Part of INFO ON HOVER functionality

}

function resetHighlight2(e) {
    hfwVAR.resetStyle(e.target);
    info.update(); //Part of INFO ON HOVER functionality
}

//LISTENER: Zoom to Layer
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//Now we’ll use the onEachFeature option to add the listeners on our state layers:
//The onEachFeature option is a function that gets called on each feature before adding it to a GeoJSON layer. A common reason to use this option is to attach a popup to features when they are clicked.
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature, //part of HIGHLIGHT ON HOVER functionality
        mouseout: resetHighlight,    //part of HIGHLIGHT ON HOVER functionality
        click: zoomToFeature,        //part of ZOOM TO NATION functionality
        							//Try to add a bindPopup code here bindPopup('<b>' + feature.properties.MAX + '</b><br>');
    });
}

//Now we’ll use the onEachFeature option to add the listeners on our state layers:
//The onEachFeature option is a function that gets called on each feature before adding it to a GeoJSON layer. A common reason to use this option is to attach a popup to features when they are clicked.
function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2, //part of HIGHLIGHT ON HOVER functionality
        mouseout: resetHighlight2,    //part of HIGHLIGHT ON HOVER functionality
        click: zoomToFeature,        //part of ZOOM TO NATION functionality
                      //Try to add a bindPopup code here bindPopup('<b>' + feature.properties.MAX + '</b><br>');
    });
}

ernationVAR = L.geoJson(null, {
    style: setStyle,
    onEachFeature: onEachFeature
})/*.addTo(map)*/;   //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
hfwVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 

$.getJSON("data/Topojson_ErosionRisk_Nation.js", function(data) {
  var x = topojson.feature(data, data.objects.ErosionRisk_Nation).features;
  ernationVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_SABasin.js", function(data) {
  var x = topojson.feature(data, data.objects.SABasin).features;
  hfwVAR.addData(x);
});


//INFO ON HOVER
var info = L.control({position: 'bottomright'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = /*'<h4>Global Erosion Risk Score By Nation</h4>' + */(props ?
        '<div class="propsformat">Country: <h5>' + props.CNTRY_NAME + '</h5></div><br><div class="propsformat">Erosion Score: <h6>' + props.MAX + '</h6></div><br>'        : '<div class="propsformat">Country: <h5>' + '' + '</h5></div><br><div class="propsformat">Erosion Score: <h6>' + '' + '</h6></div><br>');
};
info.addTo(map);
//END OF INFO ON HOVER



//														//
//THIS STATIC LEGEND ISNT QUITE READY FOR PRIMETIME YET //
//														//

//CREATE STATIC LEGEND
//var legend = L.control({position: 'bottomright'});
//legend.onAdd = function (map) {

//    var div = L.DomUtil.create('div', 'info legend'),
//        grades = [0, 1, 2, 3, 4, 5, 6, 7],
//        labels = [];
//
//	  loop through our density intervals and generate a label with a colored square for each interval
//    for (var i = 0; i < grades.length; i++) {
//        div.innerHTML +=
//            '<i style="background:' + getMyColor(grades[i] + 1) + '"></i> ' +
//            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//    }
//
//    return div;
//};
//legend.addTo(map); //END OF CREATE STATIC LEGEND



function addLayer(layer, name, zIndex) {
  layer.setZIndex(zIndex);
  // Create a simple layer switcher that toggles layers on
  // and off.
  var link = document.createElement('a');
  link.href = '#';
  link.className = 'btn btn-primary btn-sm';
  link.type = 'button';
  link.innerHTML = name;
  link.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
      this.className = 'btn btn-primary btn-sm';
    } else {
      map.addLayer(layer);
      this.className = 'active btn btn-primary btn-sm';
    }
  };
  ui.appendChild(link);
};


// ADD LAYER CONTROLLER
var ui = document.getElementById('layerControls');
addLayer(ernationVAR, 'Erosion Risk by Nation', 10);
addLayer(hfwVAR, 'Hydro Facility Watersheds', 20);
addLayer(L.tileLayer('https://a.tiles.mapbox.com/v4/dylanc.ErosionRisk/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'), 'Erosion Risk (1km)', 3);
addLayer(L.tileLayer('https://a.tiles.mapbox.com/v4/dylanc.Conservation/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'), 'Priority Conservation', 4);
addLayer(L.tileLayer('https://a.tiles.mapbox.com/v4/dylanc.Restoration/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'), 'Priority Restoration', 5);
addLayer(L.tileLayer('https://a.tiles.mapbox.com/v4/dylanc.CurrentForestCondition/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'), 'Current Forest Condition', 6);
//addLayer(popdensity, 'Population Density, 2010', 3);
//addLayer(housing, 'Households, 2010', 4);
//addLayer(L.mapbox.tileLayer('landplanner.hm1kg9l2'), 'Building Footprints', 6);
//addLayer(L.tileLayer('https://s3.amazonaws.com/geosprocket/tiles/btv1894-5/{z}/{x}/{y}.png'), 'Selected 1894 Sanborn Maps', 4);

/* ADD THE REFERENCE OVERLAY
var topPane = L.DomUtil.create('div', 'leaflet-top-pane', map.getPanes().mapPane);
var topLayer = new L.mapbox.tileLayer('landplanner.hl60jemk', {
  maxZoom: 18
}).addTo(map);
topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(7);*/


//SWITCH BASEMAPS
document.getElementById('streets').onclick = function() {
  map.removeLayer(baseLayer);
  map.removeLayer(topLayer);
  baseLayer = L.mapbox.tileLayer('landplanner.hl6099hm').addTo(map);
  topLayer = L.mapbox.tileLayer('landplanner.hl60jemk', {
    maxZoom: 18
  }).addTo(map);
  topPane.appendChild(topLayer.getContainer());
  topLayer.setZIndex(7);
};
document.getElementById('satellite').onclick = function() {
  map.removeLayer(baseLayer);
  map.removeLayer(topLayer);
  baseLayer = L.mapbox.tileLayer('landplanner.h1dknok1').addTo(map);
  topLayer = L.mapbox.tileLayer('landplanner.map-6ycmi90w', {
    maxZoom: 18
  }).addTo(map);
  topPane.appendChild(topLayer.getContainer());
  topLayer.setZIndex(7);
};



// SET LOCATION BOOKMARKS
document.getElementById('World').onclick = function() {
  map.setView({
    lat: 27,
    lon: -15,
  }, 3);
  return false;
};

/*document.getElementById('chittenden').onclick = function() {
  map.setView({
    lat: 15,
    lon: -5.052
  }, 10);
  return false;
};*/




// map.legendControl.addLegend(document.getElementById('legend').innerHTML); 
// Maybe I can play with the above line of code sometime