//this should remove the 'focus' on a button after a click, so you no longer need to click elsewhere on a page to 'unfocus' from the button. 
//Since focused buttons have their own color, I found that to be kind of distracting, so this code removes that.
$(".btn").mouseup(function(){
    $(this).blur();
})


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

//Sets color pallet for each hydrologic watershed.
//I should make one 'getMyColor' for each nation, and calculate the appropriate divisions by quantile.
//Currently all hydrologic watersheds colors are calculated by this equation
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
var SABasinVAR;

// OUR LISTENERS
//LISTENER: Define what happens on mouseout. 
function resetHighlight(e) {
    ernationVAR.resetStyle(e.target);
    info.update(); //Part of INFO ON HOVER functionality

}

function resetHighlight2(e) {
    SABasinVAR.resetStyle(e.target);
    info.update(); //Part of INFO ON HOVER functionality
}

//LISTENER: Zoom to Layer
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds(), {paddingTopLeft: [300,0]});
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
SABasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
NABasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
ASBasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
AFBasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
AUBasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
EUBasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 
OCBasinVAR = L.geoJson(null, {
  style: setStyle2,
  onEachFeature: onEachFeature2
})/*.addTo(map)*/;  //Commenting off the ".addTo(map)" prevents the Hydrofacility layer from being visualized on initial load. 



$.getJSON("data/Topojson_ErosionRisk_Nation.js", function(data) {
  var x = topojson.feature(data, data.objects.ErosionRisk_Nation).features;
  ernationVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/SABasin.js", function(data) {
  var x = topojson.feature(data, data.objects.SABasin).features;
  SABasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/NABasin.js", function(data) {
  var x = topojson.feature(data, data.objects.NABasin).features;
  NABasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/ASBasin.js", function(data) {
  var x = topojson.feature(data, data.objects.ASBasin).features;
  ASBasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/AFBasin.js", function(data) {
  var x = topojson.feature(data, data.objects.AFBasin).features;
  AFBasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/AUBasin.js", function(data) {
  var x = topojson.feature(data, data.objects.AUBasin).features;
  AUBasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/EUBasin.js", function(data) {
  var x = topojson.feature(data, data.objects.EUBasin).features;
  EUBasinVAR.addData(x);
});

$.getJSON("data/Topojson_ErosionRisk_Basin_Continents/OCBasin.js", function(data) {
  var x = topojson.feature(data, data.objects.OCBasin).features;
  OCBasinVAR.addData(x);
});


//INFO ON HOVER
var info = L.control({position: 'bottomright'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info hidden-xs'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed


info.update = function (props) {
    this._div.innerHTML = (props ?'<div class="propsformat"><h5>' + props.CNTRY_NAME/*FYI: theseCNTRY_NAMEs are case-sensitive when I make them in the topojson cmd line*/ + '</h5>: Country</div><br><div class="propsformat"><h6>' + props.MAX + '</h6>: Erosion Score</div><br>' : '<div class="propsformat"><h5>' + '' + '</h5> Country</div><br><div class="propsformat"><h6>' + '' + '</h6> Erosion Score</div><br>');

};
info.addTo(map);


$( ".leaflet-bottom.leaflet-right").addClass('col-xs-12');
$( ".info.leaflet-control").addClass('col-xs-3').attr('id', 'infoscreen');
//END OF INFO ON HOVER



//                            //
//THIS STATIC LEGEND ISNT QUITE READY FOR PRIMETIME YET //
//                            //

//CREATE STATIC LEGEND
//var legend = L.control({position: 'bottomright'});
//legend.onAdd = function (map) {

//    var div = L.DomUtil.create('div', 'info legend'),
//        grades = [0, 1, 2, 3, 4, 5, 6, 7],
//        labels = [];
//
//    loop through our density intervals and generate a label with a colored square for each interval
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
  link.className = 'btn btn-default btn-sm';
  //link.type = 'button';  I dont think I need this anymore(?)
  link.setAttribute("data-toggle", "button")  //This added code works!!

  link.innerHTML = name;
  link.onclick = function(e) {  
    e.preventDefault();
    e.stopPropagation();
    if (map.hasLayer(layer)) {
      this.className = 'btn btn-default btn-sm';                                //IF the map has the layer on, when clicked remove the layer ans set the clicked button to 'btn btn-primary btn-sm' css settings
      map.removeLayer(layer);                                 //
    } else {
      this.className = 'btn btn-default btn-sm active';                                                  //If else (ie if the map doesn't have the layer on, clicking the button will turn on the layer, and turn the button to active)
      map.addLayer(layer);                                    //
             //
    }
  };
  ui.appendChild(link);
};

function addLayer_primary(layer, name, zIndex) {
  layer.setZIndex(zIndex);
  // Create a simple layer switcher that toggles layers on
  // and off.
  var link = document.createElement('a');
  link.href = '#';
  link.className = 'btn btn-primary btn-sm';
  //link.type = 'button';  I dont think I need this anymore(?)
  link.setAttribute("data-toggle", "button")  //This added code works!!

  link.innerHTML = name;
  link.onclick = function(e) {  
    e.preventDefault();
    e.stopPropagation();
    if (map.hasLayer(layer)) {
      this.className = 'btn btn-primary btn-sm';                                //IF the map has the layer on, when clicked remove the layer ans set the clicked button to 'btn btn-primary btn-sm' css settings
      map.removeLayer(layer);                                 //
    } else {
      this.className = 'btn btn-primary btn-sm active';                                                  //If else (ie if the map doesn't have the layer on, clicking the button will turn on the layer, and turn the button to active)
      map.addLayer(layer);                                    //
             //
    }
  };
  ui.appendChild(link);
};



// ADD LAYER CONTROLLER
var ui = document.getElementById('layerControls');
addLayer_primary(L.mapbox.tileLayer('dylanc.CurrentForestCondition', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Current Forest Condition', 3);
addLayer_primary(L.mapbox.tileLayer('dylanc.ErosionRisk', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}).addTo(map), 'Erosion Risk', 3);
//$('#layerControls div:nth-child(2)').addClass( "active" );
addLayer_primary(L.mapbox.tileLayer('dylanc.Conservation', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Priority Conservation', 5);
addLayer_primary(L.mapbox.tileLayer('dylanc.Restoration', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Priority Restoration', 6);
addLayer_primary(L.mapbox.tileLayer('dylanc.LandUseIntensity', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Land Use Intensity', 6);
addLayer_primary(L.mapbox.tileLayer('dylanc.grunoff_n10', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Global Runoff', 6);
addLayer_primary(L.mapbox.tileLayer('dylanc.AdjSlope_r10', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'High Slope Lands', 6);
addLayer_primary(L.mapbox.tileLayer('dylanc.glhymps_r10', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Permeability', 6);
addLayer_primary(L.mapbox.tileLayer('dylanc.porosity_n10', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Porosity', 6);

var ui = document.getElementById('NationScore');
addLayer_primary(ernationVAR, 'By Nation', 1);

var ui = document.getElementById('WatershedList');
addLayer(SABasinVAR, 'South America', 1);
addLayer(NABasinVAR, 'North America', 1);
addLayer(ASBasinVAR, 'Asia', 1);
addLayer(AFBasinVAR, 'Africa', 1);
addLayer(AUBasinVAR, 'Austrailia', 1);
addLayer(EUBasinVAR, 'Europe', 1);
addLayer(OCBasinVAR, 'Oceania', 1);

var ui = document.getElementById('baseLayers');
addLayer_primary(L.mapbox.tileLayer('dylanc.849bb91b', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Admin Boundaries', 99);
addLayer_primary(L.mapbox.tileLayer('dylanc.825da50a', {accessToken: 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ'}), 'Admin Labels', 99);

//addLayer(popdensity, 'Population Density, 2010', 3);
//addLayer(housing, 'Households, 2010', 4);
//addLayer(L.mapbox.tileLayer('landplanner.hm1kg9l2'), 'Building Footprints', 6);
//addLayer(L.mapbox.tileLayer('https://s3.amazonaws.com/geosprocket/tiles/btv1894-5/{z}/{x}/{y}.png'), 'Selected 1894 Sanborn Maps', 4);

/* ADD THE REFERENCE OVERLAY
var topPane = L.DomUtil.create('div', 'leaflet-top-pane', map.getPanes().mapPane);
var topLayer = new L.mapbox.tileLayer('landplanner.hl60jemk', {
  maxZoom: 18
}).addTo(map);
topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(7);*/


//SWITCH BASEMAPS
/*document.getElementById('streets').onclick = function() {
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
*/


// SET LOCATION BOOKMARKS
document.getElementById('Globe').onclick = function() {
  map.setView({
    lat: 27,
    lon: -15,
  }, 3);
  return false;
};



// map.legendControl.addLegend(document.getElementById('legend').innerHTML); 
// Maybe I can play with the above line of code sometime
