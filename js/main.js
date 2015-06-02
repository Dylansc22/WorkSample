// map refers to a ><div element with the ID XXXXXX
L.mapbox.accessToken = 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ';
var map = L.mapbox.map('XXXXXX', 'dylanc.61e6f75f' ).setView([40, -74.50], 4);
L.control.layers({}, {
    'Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk'),
    'Forest Conservation': L.mapbox.tileLayer('dylanc.Conservation'),
    'Forest Restoration': L.mapbox.tileLayer('dylanc.Restoration'),
	'National Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk_Nation'),
}).addTo(map);

map.legendControl.addLegend(document.getElementById('legend').innerHTML);

