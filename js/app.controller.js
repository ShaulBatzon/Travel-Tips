import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGo = onGo;
window.onCopyLoc = onCopyLoc;


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            mapService.panTo(pos.coords.latitude, pos.coords.longitude)
            mapService.addMarker({lat:pos.coords.latitude,lng:pos.coords.longitude})
            document.querySelector('.user-pos').innerText = `${pos.coords.latitude},${pos.coords.longitude}`
            document.querySelector('.hide').classList.remove('hide')
            document.querySelector('.my-location-info').classList.add('hide')
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(34.6895, 139.6917);
}

function onGo(ev) {
    ev.preventDefault()
    const elsearch = document.querySelector('form input[name=search-location]').value
    mapService.coordsToCity(elsearch)
}

function onCopyLoc() {
    getPosition()
        .then(pos => {
            const copyLocation = {latitude:pos.coords.latitude, longitude:pos.coords.longitude}
        })
        console.log(copyLocation);
        // .then(Swal.fire(
        //     'Good job!',
        //     'You clicked the button!',
        //     'success'
        //   ))
}