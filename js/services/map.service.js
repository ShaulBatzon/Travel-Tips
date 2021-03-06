

export const mapService = {
    initMap,
    addMarker,
    panTo,
    coordsToCity
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDkC1SX9eq4XDMXvsJCgCu59wbuZ4kL898'; 
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function coordsToCity(location) {
    const API_KEY = 'AIzaSyDkC1SX9eq4XDMXvsJCgCu59wbuZ4kL898'; 
   return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`)
        .then(res => res.data)
        .then(adress => gMap.panTo(adress.lat,adress.lng))
}

