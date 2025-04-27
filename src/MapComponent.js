import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet';
import Legend from './Legend';

function FlyToLocation({ lat, lon }) {
    const map = useMap();

    if (lat && lon) {
        map.flyTo([lat, lon], 16);  // Zoom level 16 for close-up
    }

    return null;
}


function MapComponent({ selectedEvent, activeSuspects }) {


    const crimeScenes = [
        { lat: 40.700900, lon: -73.912300, label: '102 Linden St' },
        { lat: 40.700700, lon: -73.912400, label: '104 Linden St' },
        { lat: 40.700500, lon: -73.912500, label: '108 Linden St' },
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

                {/* Camera Events */}
                {cameraEvents.map((event, idx) => (
                    <CircleMarker key={`camera-${idx}`} center={[event.lat, event.lon]} radius={8} color="orange">
                        <Popup>{event.label}</Popup>
                    </CircleMarker>
                ))}

                {/* Suspect Pings (only when selected) */}
                {activeSuspects.flatMap((suspect, sIdx) =>
                    suspect.timeline.map((ping, idx) => {
                        let color = 'gray';
                        if (suspect.name === 'Ruth Chen') color = 'blue';
                        else if (suspect.name === 'Kevin Ortega') color = 'green';
                        else if (suspect.name === 'Jamal Reyes') color = 'purple';

                        return (
                            <CircleMarker
                                key={`suspect-${suspect.name}-${idx}`}  // 🛠️ Use suspect name + idx here
                                center={[ping.lat, ping.lon]}
                                radius={10}
                                color={color}
                            >
                                <Popup>{ping.label} ({ping.time})</Popup>
                            </CircleMarker>
                        );
                    })
                )}





            </MapContainer>

            {/* Add the Legend below the Map */}
            <Legend />
        </div>
    );




}

export default MapComponent;

