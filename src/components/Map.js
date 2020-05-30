import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `pk.eyJ1Ijoic3dvbGZzb24iLCJhIjoiY2p2cTNmNjJqMGplaDQ5bW85eGI0a3pvcyJ9.UmldkLqn5ujgok-SwUf2Lg`;

class Map extends React.Component {
	constructor(props) {
        super(props);
        console.log('PROPS', props)
		this.state = {
            lng: 0,
            lat: 0,
			zoom: 14,
		};
	}

	componentDidMount() {
        // const currentLoc = {}
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //         ({ coords: { latitude, longitude } }) => {
        //             console.log('Before SET STATE', this.state)
        //             this.setState({
        //                 lng: longitude,
        //                 lat: latitude,
        //             })
        //             console.log('AFTER SET STATE', this.state)
        //             currentLoc.lng = this.state.lng
        //             currentLoc.lat = this.state.lat;
        //             console.log('load from current location', currentLoc);
        //         }
        //     );
        // } else {
        //     console.log('load from hardcoded location');
        //     this.setState({
        //         lng: 115.1304015,
        //         lat: -8.6539913,
        //     })
        //     console.log('ELSE BLOCK', this.state)
        // }
        // this.setState({
        //     lng: currentLoc.lng,
        //     lat: currentLoc.lat,
        // })
        // console.log(this.state, 'BEFORE MAP')

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        map.addControl(geolocate);
	}

	render() {
		return (
			<div>
				<div className="sidebarStyle">
					<div>
						Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{' '}
						{this.state.zoom}
					</div>
				</div>
				<div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
			</div>
		);
	}
}

export default Map;

// const Map = () => {
//     const initMapbox = (currentLocation) => {
// 			const mapElement = document.getElementById('map');
// 			if (mapElement) {
// 				mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;

// 				const mapParams = {
// 					container: 'map',
// 					style: 'mapbox://styles/swolfson/cjwpspnit8u8v1cpbotrhatm3',
// 					zoom: 15
// 				};

// 				mapParams.center = currentLocation;

// 				window.map = new mapboxgl.Map(mapParams);

// 				const geolocate = new mapboxgl.GeolocateControl({
// 					positionOptions: {
// 						enableHighAccuracy: true
// 					},
// 					trackUserLocation: true
// 				});

// 				map.addControl(geolocate);

// 				createMarkersForMap(mapElement, map);

// 				window.mapboxDirections = new MapboxDirections({
// 					accessToken: mapboxgl.accessToken,
// 					unit: 'metric',
// 					profile: 'mapbox/cycling',
// 					interactive: false
// 				});

// 				window.condition = true;

// 				const pinButton = document.querySelector('#pin-drop');
// 				let interactiveStatus = true;

// 				pinButton.addEventListener('click', (e) => {
// 					// interactiveStatus = !interactiveStatus

// 					if (document.querySelector('.mapboxgl-marker svg')) {
// 						document.querySelector('.mapboxgl-marker svg').remove();
// 					} else {
// 						let condition = true;

// 						if (condition) {
// 							const popup = new mapboxgl.Popup().setHTML(
// 								`<button type="button" class="point-button" data-toggle="modal" data-target="#pointModal">Create Point!</button>
//           `
// 							);

// 							window.draggable = new mapboxgl.Marker({
// 								draggable: true
// 							})
// 								.setLngLat(currentLocation)
// 								.setPopup(popup)
// 								.addTo(map);
// 							const lat = document.querySelector('#point_lat');
// 							const long = document.querySelector('#point_long');
// 							long.value = currentLocation[0];
// 							lat.value = currentLocation[1];

// 							const onDragEnd = () => {
// 								const lngLat = draggable.getLngLat();
// 								const lat = document.querySelector('#point_lat');
// 								const long = document.querySelector('#point_long');
// 								lat.value = lngLat.lat;
// 								long.value = lngLat.lng;
// 								console.log(lngLat);
// 							};
// 							draggable.on('dragend', onDragEnd);
// 							condition = false;
// 						}
// 					}
// 				});

// 				map.addControl(mapboxDirections, 'top-left');

// 				//hide the options for driving and walking
// 				const option = document.querySelector('.mapbox-directions-profile');
// 				option.hidden = true;

// 				//define the directions and directionsHeader to be able to toggle them
// 				const directions = document.querySelector(
// 					'.directions-control-instructions'
// 				);

// 				//insert button after the to and from form on map

// 				document
// 					.querySelector('.directions-control-inputs')
// 					.insertAdjacentHTML(
// 						'afterend',
// 						`<button id="toggler" class="btn btn-sm btn-dark m-2"><i class="fas fa-directions"></i> Show/Hide</button>`
// 					);

// 				const activeToggleButton = document.querySelector('#toggle-active');
// 				activeToggleButton.addEventListener('click', () => {
// 					console.log(interactiveStatus);

// 					if (mapboxDirections.interactive(false)) {
// 						mapboxDirections.interactive(true);
// 						map.on('click', () => {
// 							mapboxDirections.interactive(false);
// 						});
// 					} else if (mapboxDirections.interactive(true)) {
// 						mapboxDirections.interactive(false);
// 					}
// 				});

// 				//Hide directions and add an event listener on the button to toggle "hidden" class in _map.scss
// 				// directions.hidden = true;
// 				document.querySelector('#toggler').addEventListener('click', () => {
// 					if (directions.hidden === false) {
// 						directions.hidden = true;
// 					} else {
// 						directions.hidden = false;
// 					}
// 				});

// 				document.querySelector('body').on('click', '#add-stop', (e) => {
// 					// alert('add waypoint');
// 					// let allWaypoints = mapboxDirections.getWaypoints()
// 					//     console.log(allWaypoints);
// 					const wayPoint = e.target;
// 					const coordinate = JSON.parse(wayPoint.dataset.coordinate);

// 					mapboxDirections.addWaypoint(0, coordinate);
// 					console.log(e.target, coordinate);
// 					// mapboxDirections.addWaypoint(allWaypoints.length - 1, currentLocation)
// 				});

// 				$('#set-route-submit').click(function () {
// 					Swal.fire('Trip saved!', '', 'success');
// 				});
// 			}
// 		};
// };

// export default React;
