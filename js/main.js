L.mapbox.accessToken = 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ';
var map = L.mapbox.map('mapid', 'dylanc.61e6f75f' ).setView([40, -74.50], 4);

//L.mapbox.accessToken = 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ';
//var map = L.mapbox.map('mapid').setView([38.8922,-77.0348], 14);
var layers = document.getElementById('map-ui');

// Creates togglable layers pulled from 9884941, who pulled it from 
// https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
var ui = document.getElementById('layerControls');
// Define the layers for the map
//addLayer(L.mapbox.tileLayer('dylanc.61e6f75f'), 'Basemap', 1);   <--- Basemap doesn't load up. I think It's because its a 'style' and not a 'source' in Mapbox data cloud. 
addLayer(L.mapbox.tileLayer('dylanc.ErosionRisk'), 'Erosion Risk (1 KM Resolution)', 3);
addLayer(L.mapbox.tileLayer('dylanc.ErosionRisk_Nation'), 'Erosion Risk (Nation)', 2);
addLayer(L.mapbox.tileLayer('dylanc.HydrofacilityWatersheds'), 'Erosion Risk (Watershed)', 4);
//addLayer(L.mapbox.tileLayer('dylanc.d39f80e6'), 'Hydro Facilities', 5);  <-- I'd like to play with this unstylized Hydro Facilities data layer, and get the CSS to work in here rather than have it prestylized from whatever I upload from Tilemill to Mapbox, but I couldn't get it to work so I have to use the pre-stylized version below.  
addLayer(L.mapbox.tileLayer('dylanc.199b68d8'), 'Hydro Facilities', 5);
addLayer(L.mapbox.tileLayer('dylanc.Conservation'), 'Priority Forest Conservation', 6);
addLayer(L.mapbox.tileLayer('dylanc.Restoration'), 'Priority Forest Restoration', 7);


function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);
    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };

    layers.appendChild(link);
}


map.addControl(L.mapbox.infoControl().addInfo('By Dylan Cobean - June 2015'));






/*
L.control.layers({}, {
    'Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk'),
    'Forest Conservation': L.mapbox.tileLayer('dylanc.Conservation'),
    'Forest Restoration': L.mapbox.tileLayer('dylanc.Restoration'),
	'National Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk_Nation'),
}).addTo(map);
*/





// THIS IS ALL FOR ADDING THE GEOJSON LAYER
// THIS IS ALL FOR ADDING THE GEOJSON LAYER
/* THIS IS ALL FOR ADDING THE GEOJSON LAYER

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
});*/

