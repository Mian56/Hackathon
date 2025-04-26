import { useState } from 'react';
import MapComponent from './MapComponent';
import Timeline from './Timeline';
import SuspectProfiles from './SuspectProfiles';


function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSuspect, setSelectedSuspect] = useState(null);


    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Crime Investigation: Linden St Burglaries</h1>
            {/* Flex container */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                {/* Timeline on the left */}
                <div style={{ flex: 1 }}>
                    <Timeline onEventClick={handleEventClick} />
                </div>
                {/* Map on the right */}
                <div style={{ flex: 1 }}>
                    <MapComponent selectedEvent={selectedEvent} suspectPings={selectedSuspect?.timeline || []} />
                </div>
                <div style={{ flex: 1 }}>
                    <SuspectProfiles onSelectSuspect={setSelectedSuspect} />
                </div>


            </div>
        </div>
    );
}

export default App;
