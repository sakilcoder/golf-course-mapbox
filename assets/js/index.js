mapboxgl.accessToken = 'pk.eyJ1Ijoic2FraWxjb2RlcmdlbyIsImEiOiJjbGZ6cm43dW8xNG5rM2VxeWwyd3BrZWFrIn0.-eU_UwpHHbnrgSCPoo4DzQ';
let bbox = [-78.6950838200685325,35.9045939161032663, -78.6817619512202668,35.9140360522044944];
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-78.689899, 35.909768],
    zoom: 15
});

map.on('load', () => {
    map.addSource('golfCourse', {
        'type': 'raster',
        'url': 'mapbox://sakilcodergeo.doipdgax'
    });

    map.addLayer({
        'id': 'golfCourse',
        'source': 'golfCourse',
        'type': 'raster'
    });
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search golf course',
    bbox: bbox
  });

  geocoder.on('result', function(ev) {
    console.log(ev.result);
    setGolfCourse(ev.result);

    var marker = new mapboxgl.Marker({
        // draggable: true
    })
      .setLngLat(ev.result.center)
      .addTo(map);

      geocoder.interactive=false;
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

map.on('click', (e) => {
    console.log(e.lngLat);

    var battery_loc = document.getElementById("battery_loc");
    var mark_hole_cb = document.getElementById("mark_hole_cb");

    if (battery_loc.checked && !battery_loc.disabled) {
        var batteryMarker = new mapboxgl.Marker({
            color: 'red'
        })
        .setLngLat([ e.lngLat.lng, e.lngLat.lat])
        .addTo(map);

        map.getCanvas().classList.remove('crosshair-cursor');
        battery_loc.disabled=true;
        genHoleLayerControls();
    } else if(mark_hole_cb.checked){

        var markHoleLayer = new mapboxgl.Marker({
            element: document.createElement('div'),
            anchor: 'bottom',
            color: 'green',
            // font-size: '24px';
          }).setLngLat([ e.lngLat.lng, e.lngLat.lat]).addTo(map);
          markHoleLayer.getElement().innerHTML = '<i class="material-icons">golf_course</i>';

        // var markHoleLayer = new mapboxgl.Marker({
        //     color: 'green'
        // })
        // .setLngLat([ e.lngLat.lng, e.lngLat.lat])
        // .addTo(map);
    }
    
    // var marker = new mapboxgl.Marker();
    // marker.setLngLat([ e.lngLat.lng, e.lngLat.lat]);
    // marker.addTo(map);
    
});

let battery_loc_checked=function(){
    map.getCanvas().classList.add('crosshair-cursor');
}
let mark_hole_checked=function(){
    var mark_hole_cb = document.getElementById("mark_hole_cb");
    if(mark_hole_cb.checked){
        map.getCanvas().classList.add('crosshair-cursor');
    }else{
        map.getCanvas().classList.remove('crosshair-cursor');
    }
}


// map.addControl(
//     new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//     })
// );
    
// const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
// mapboxClient.geocoding
//     .forwardGeocode({
//         query: 'Wellington, New Zealand',
//         autocomplete: false,
//         limit: 1
//     })
//     .send()
//     .then((response) => {
//         if (
//             !response ||
//             !response.body ||
//             !response.body.features ||
//             !response.body.features.length
//         ) {
//             console.error('Invalid response:');
//             console.error(response);
//             return;
//         }
//         const feature = response.body.features[0];

//         // const map = new mapboxgl.Map({
//         //     container: 'map',
//         //     // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//         //     style: 'mapbox://styles/mapbox/streets-v12',
//         //     center: feature.center,
//         //     zoom: 10
//         // });

//         // Create a marker and add it to the map.
//         new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
//     });

// // var marker = new mapboxgl.Marker(el)
// //     .setLngLat([longitude, latitude])
// //     .addTo(map);


