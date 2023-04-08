var map;
var sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('toggle-sidebar');

toggleButton.addEventListener('click', () => {
    toggleSidebar();
});

let toggleSidebar = function () {
    const sidebar = document.getElementById('sidebar');
    const isOpen = sidebar.classList.contains('open');
    sidebar.classList.toggle('open');
    toggleButton.classList.toggle('open');
    if (isOpen) {
        toggleButton.querySelector('.menu-icon').style.display = 'block';
        toggleButton.querySelector('.close-icon').style.display = 'none';
    } else {
        toggleButton.querySelector('.menu-icon').style.display = 'none';
        toggleButton.querySelector('.close-icon').style.display = 'block';
    }
}


let addBatteryCharge = function () {
    let html = '<b>Battery Charging: </b><br><input type="radio" name="battery" id="battery_start" checked><label for="battery_start"> Start</label> ';
    html += '<input type="radio" name="battery" id="battery_end"><label for="battery_end">End</label><br>';
    html += '<label for="battery_loc">Mark battery location on the map?</label> <input type="checkbox" id="battery_loc" onchange="battery_loc_checked();" />';

    let battery_charge = document.getElementById('battery_charge');
    battery_charge.innerHTML=html;
}

let battery_loc_checked=function(){
    console.log("ellepo");
    map.style.cursor = "crosshair";
}

let gc_name = localStorage.getItem("golf_course_name");
let gc_loc = localStorage.getItem("golf_course_loc");

if (gc_name != null && gc_name != '') {
    document.getElementById('golf_course').innerHTML = '<b>Golf Course: </b>' + gc_name + ', ' + gc_loc;

    toggleSidebar();

    addBatteryCharge();
}

let setGolfCourse = function (g) {

    let golf_course_name = g.text;
    let golf_course_loc = g.place_name.replace(g.text + ', ', '');
    let golf_course_lnglat = g.center;
    localStorage.setItem("golf_course_name", golf_course_name);
    localStorage.setItem("golf_course_loc", golf_course_loc);
    localStorage.setItem("golf_course_lnglat", golf_course_lnglat);

    console.log(localStorage.getItem("golf_course_loc"));

    document.getElementById('golf_course').innerHTML = '<b>Golf Course: </b>' + g.place_name;

    toggleSidebar();
}

let startOver=function(){
    localStorage.setItem("golf_course_name", '');
    localStorage.setItem("golf_course_loc", '');
    localStorage.setItem("golf_course_lnglat", '');

    window.location.reload();
}