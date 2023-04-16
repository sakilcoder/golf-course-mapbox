mapboxgl.accessToken = 'pk.eyJ1Ijoic2FraWxjb2RlcmdlbyIsImEiOiJjbGZ6cm43dW8xNG5rM2VxeWwyd3BrZWFrIn0.-eU_UwpHHbnrgSCPoo4DzQ';
let bbox = [-78.6950838200685325,35.9045939161032663, -78.6817619512202668,35.9140360522044944];
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-78.689899, 35.909768],
    zoom: 15
});

// map.on('load', () => {
//     map.addSource('golfCourse', {
//         'type': 'raster',
//         'url': 'mapbox://sakilcodergeo.doipdgax'
//     });

//     map.addLayer({
//         'id': 'golfCourse',
//         'source': 'golfCourse',
//         'type': 'raster'
//     });
// });

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
        
        var img = new Image();
        img.onload = function() {
        // Add the image as a marker on the map
        var batteryMarker = new mapboxgl.Marker({
            element: img,
            anchor: 'bottom',
            width: 24,
            height: 24
        }).setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
        };
        img.src = 'assets/images/battery-n.png';
        
        map.getCanvas().classList.remove('crosshair-cursor');
        battery_loc.disabled=true;
        genHoleLayerControls();
    } else if(mark_hole_cb && mark_hole_cb.checked){

        // Create a new Image object
        var img = new Image();
        img.onload = function() {
        // Add the image as a marker on the map
        var markHoleLayer = new mapboxgl.Marker({
                element: img,
                anchor: 'bottom',
            })
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);

            document.getElementById('hole_number').value='';
            document.getElementById('hole_name').value='';
            $("#mark_hole_modal").modal()

            // var popup = new mapboxgl.Popup({ offset: 25 })
            // .setHTML('<form><p>Hole number: <input type="number" class="form-control" required></p><p>Name: <input type="text" class="form-control" required></p></form>')
            // .addTo(map);

            // markHoleLayer.setPopup(popup);
        };
        img.src = 'assets/images/golf-n.png';

    }
    
    
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

