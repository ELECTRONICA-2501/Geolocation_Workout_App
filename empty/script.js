'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
      //this is the leaflet entry point. We create a map object and pass in the id of the div where we want to render the map.
      // leaflet gives us this L object, which is a namespace that contains all the functionality of leaflet.
      // L variable is a global variable that is available in the leaflet library.
      const coords = [latitude, longitude];
      // this array contains our latitude and longitude
      const map = L.map('map').setView(coords, 12);
      //this is the map object. We set the view to the coords and the zoom level to 13.
      //console.log(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Handling clicks on map
      map.on('click', function (mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      });

      //focus method is used to focus on the input field.
    },
    function () {
      alert('Could not retrieve your position');
    }
  );
//
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //display marker data
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    //this is the marker object. We pass in the coords and add it to the map. should be our approximate location.
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
