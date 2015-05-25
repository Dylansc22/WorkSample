// map refers to a ><div element with the ID XXXXXX
L.mapbox.accessToken = 'pk.eyJ1IjoiZHlsYW5jIiwiYSI6Im53UGgtaVEifQ.RJiPqXwEtCLTLl-Vmd1GWQ';
var map = L.mapbox.map('XXXXXX', 'mapbox.dark' ).setView([40, -74.50], 5);
L.control.layers({}, {
    'Erosion Risk': L.mapbox.tileLayer('dylanc.ErosionRisk'),
    'Forest Conservation': L.mapbox.tileLayer('dylanc.Conservation'),
    'Forest Restoration': L.mapbox.tileLayer('dylanc.Restoration')
}).addTo(map);

map.legendControl.addLegend(document.getElementById('legend').innerHTML);

