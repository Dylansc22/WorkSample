// map refers to a ><div element with the ID XXXXXX
L.mapbox.accessToken = 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ';
var map = L.mapbox.map('mapid', 'dylanc.61e6f75f' ).setView([40, -74.50], 4);

map.addControl(L.mapbox.infoControl().addInfo('By Dylan Cobean - June 2015'));

var ui = document.getElementById('layerControls');


//// Creates togglable layers pulled from 9884941, who pulled it from 
//// https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/

// Define the layers for the map
addLayer(L.mapbox.tileLayer('vanhoesenj.VTBedrock'), 'Bedrock Geology', 1);
addLayer(L.mapbox.tileLayer('vanhoesenj.VtSurfGeo'), 'Surficial Geology', 2);
addLayer(L.mapbox.tileLayer('landplanner.hli55fb7'), 'Soil Types', 3);
addLayer(L.tileLayer('https://s3.amazonaws.com/geosprocket/btvgeographic/{z}/{x}/{y}.png'), 'Elevation Contours', 4);

function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex);

    // Create a simple layer switcher that toggles layers on
    // and off.
    var link = document.createElement('a');

    // Define button element properties
    link.href = '#';
    link.className = 'btn btn-primary';
    link.type = 'button';
    link.innerHTML = name;

    // Update map and element properties by selected layer
    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = 'btn btn-primary';
        } else {
            map.addLayer(layer);
            this.className = 'active btn btn-primary';
        }
    };

    ui.appendChild(link);
}


/*
L.control.layers({}, {
    'Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk'),
    'Forest Conservation': L.mapbox.tileLayer('dylanc.Conservation'),
    'Forest Restoration': L.mapbox.tileLayer('dylanc.Restoration'),
	'National Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk_Nation'),
}).addTo(map);
*/

map.legendControl.addLegend(document.getElementById('legend').innerHTML);
var featLayer = L.mapbox.featureLayer().addTo(map);
featLayer.loadURL('ErosionRisk_Nation.geojson');
// inspired by http://geosprocket.github.io/btv-geographic/social/sociallayers.js 
function getMyColor(d) {
  return d > 7 ? '#6b0000' : 
        d > 6 ? '#872a08' : 
        d > 5 ? '#c46d1b' : 
        d > 4 ? '#f5af36' : 
        d > 3 ? '#fcd75b' : 
        d > 1 ? '#fce96d' : 
        '#ffff80';
}

function setStyle(feature) {
  return {
    weight: 0,
    opacity: 0,
    fillOpacity: 1,
    fillColor: getMyColor(polygon.feature.properties.MAX)
  };
}

// styles each polygon based on its properties in the geojson file, using leaflet's setStyle
featLayer.on('ready', function() {
    featLayer.eachLayer(function(polygon) {
        polygon.bindPopup('This is the nation of <b>' + polygon.feature.properties.CNTRY_NAME + '</b>. and its Erosion Score is <b>' + polygon.feature.properties.MAX + '</b>');
        console.log(typeof setStyle);
        polygon.setStyle({
            opacity: 1,
            fillOpacity: 0.55,
            fillColor: getMyColor(polygon.feature.properties.MAX),
            color: getMyColor(polygon.feature.properties.MAX)
        });
    });
});

