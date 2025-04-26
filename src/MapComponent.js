import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import Legend from './Legend';

function FlyToLocation({ lat, lon }) {
    const map = useMap();

    if (lat && lon) {
        map.flyTo([lat, lon], 16);  // Zoom level 16 for close-up
    }

    return null;
}


function MapComponent({ selectedEvent, suspectPings }) {


    const crimeScenes = [
        { lat: 40.6959, lon: -73.9158, label: '102 Linden St' },
        { lat: 40.6961, lon: -73.9158, label: '104 Linden St' },
        { lat: 40.6961, lon: -73.9158, label: '108 Linden St' },
    ];

    const ruthPings = [
        { lat: 40.700864, lon: -73.912427, label: 'Ruth Ping: Mar 3, 2:35 AM' },
        { lat: 40.700100, lon: -73.912500, label: 'Ruth Ping: Mar 4, 2:36 AM' },
        { lat: 40.700100, lon: -73.912500, label: 'Ruth Ping: Mar 4, 2:45 AM' }
    ];

    const cameraEvents = [
        { lat: 40.700509, lon: -73.913144, label: 'Camera: Shadowy figure Mar 3, 2:14 AM' },
        { lat: 40.700719, lon: -73.911759, label: 'Camera: Person with bag Mar 4, 2:32 AM' },
        { lat: 40.700299, lon: -73.912299, label: 'Camera: Bike turning corner Mar 4, 2:48 AM' },
        { lat: 40.700371, lon: -73.911529, label: 'Camera: Bike near 108 Linden Mar 5, 2:09 AM' }
    ];


    return (

        <div>
            <MapContainer center={[40.696, -73.9158]} zoom={15} style={{ height: '600px', width: '100%' }}  >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {selectedEvent && <FlyToLocation lat={selectedEvent.lat} lon={selectedEvent.lon} />}


                {/* Crime Scenes */}
                {crimeScenes.map((scene, idx) => (
                    <CircleMarker key={`crime-${idx}`} center={[scene.lat, scene.lon]} radius={10} color="red">
                        <Popup>{scene.label}</Popup>
                    </CircleMarker>
                ))}


                {/* Ruth's Pings */}
                {ruthPings.map((ping, idx) => (
                    <CircleMarker key={`ruth-${idx}`} center={[ping.lat, ping.lon]} radius={8} color="blue">
                        <Popup>{ping.label}</Popup>
                    </CircleMarker>
                ))}

                {/* Camera Events */}
                {cameraEvents.map((event, idx) => (
                    <CircleMarker key={`camera-${idx}`} center={[event.lat, event.lon]} radius={8} color="orange">
                        <Popup>{event.label}</Popup>
                    </CircleMarker>
                ))}

                {/* Suspect Pings (only when selected) */}
                {suspectPings.map((ping, idx) => (
                    <CircleMarker
                        key={`suspect-${idx}`}
                        center={[ping.lat, ping.lon]}
                        radius={10}
                        color="green"
                    >
                        <Popup>{ping.label} ({ping.time})</Popup>
                    </CircleMarker>
                ))}


            </MapContainer>

            {/* Add the Legend below the Map */}
            <Legend />
        </div>
    );




}

export default MapComponent;

