import { useState } from 'react';
import MapComponent from './MapComponent';
import Timeline from './Timeline';
import SuspectProfiles from './SuspectProfiles';


function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeSuspects, setActiveSuspects] = useState([]);  // Array of active suspects
    const [selectedSuspect, setSelectedSuspect] = useState(null);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleToggleSuspect = (suspect) => {
        if (!suspect) return;  // Ignore null suspects

        setActiveSuspects(prev => {
            const isActive = prev.find(s => s.name === suspect.name);
            if (isActive) {
                // Remove suspect
                return prev.filter(s => s.name !== suspect.name);
            } else {
                // Add suspect
                return [...prev, suspect];
            }
        });
        setSelectedSuspect(suspect);
    };


    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'Courier New, monospace',
            backgroundColor: '#1c1c1c',
            color: '#f5f5f5',
            minHeight: '100vh'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: '#ffcc00',
                textShadow: '2px 2px #000'
            }}>
                🕵️‍♂️ Crime Investigation: Linden St Burglaries 🕵️‍♀️
            </h1>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center'
            }}>
                {/* Left column: Timeline and Suspects */}
                <div style={{
                    flex: '1 1 300px',
                    minWidth: '300px',
                    backgroundColor: '#2c2c2c',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '2px dashed #ffcc00'
                }}>
                    <Timeline onEventClick={handleEventClick} activeSuspects={activeSuspects} />
                    <SuspectProfiles onSelectSuspect={handleToggleSuspect} />
                </div>



                {/* Right column: Map */}
                <div style={{
                    flex: '2 1 600px',
                    minWidth: '400px',
                    border: '2px solid #ff0000',
                    borderRadius: '10px',
                    padding: '1rem',
                    backgroundColor: '#2c2c2c',
                    boxShadow: '0 4px 12px rgba(255,0,0,0.4)'
                }}>
                    <MapComponent selectedEvent={selectedEvent} activeSuspects={activeSuspects} />

                </div>
            </div>
        </div>
    );

}


export default App;
