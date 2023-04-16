const draw = new MapboxDraw({
    
    displayControlsDefault: false,
    
    controls: {
        polygon: true,
        trash: true,
        
    },
   
    defaultMode: 'draw_polygon'
});
map.addControl(draw, 'top-left');

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
    const data = draw.getAll();
    const answer = document.getElementById('calculated-area');
    if (data.features.length > 0) {
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML = `<strong>${rounded_area}</strong> square meters`;
    } else {
        answer.innerHTML = '';
        if (e.type !== 'draw.delete')
            alert('Click the map to draw a polygon.');
    }
}