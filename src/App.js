import { useState } from 'react';
import MapComponent from './MapComponent';
import Timeline from './Timeline';
import SuspectProfiles from './SuspectProfiles';
import ReportModal from './ReportModal';



function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeSuspects, setActiveSuspects] = useState([]);  // Array of active suspects
    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [showReport, setShowReport] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [analysisResults, setAnalysisResults] = useState([]);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [analysisData, setAnalysisData] = useState([]);

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
                return [...prev, suspect];
            }
        });
        setSelectedSuspect(suspect);
    };

    const handleLoadResults = async () => {
        const response = await fetch('/analysis_results.json');
        const data = await response.json();
        setAnalysisResults(data);
        setShowResults(true);
    };

    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'Courier New, monospace',
            backgroundColor: '#1c1c1c',
            color: '#f5f5f5',
            minHeight: '100vh',
            maxWidth: '1400px',
            margin: '0 auto',
            border: '5px double #ffcc00',  // 🧵 Like crime scene tape!
            boxShadow: '0 0 20px rgba(255, 204, 0, 0.3)',  // Glow around the whole container
            backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0 10px, transparent 10px 20px)',  // Wireframe grid vibe
            backgroundSize: '40px 40px',  // Adjust grid size
            backgroundBlendMode: 'overlay'  // Blend it smoothly with the dark background
        }}>

            <h1 style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: '#ffcc00',
                textShadow: '2px 2px #000',
                fontSize: '2.5rem'
            }}>
                🕵️‍♂️ Crime Investigation: Linden St Burglaries 🕵️‍♀️
            </h1>


            {/* Main content container with timeline and map */}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
            }}>
                {/* Left column: Timeline */}
                <div style={{
                    backgroundColor: '#2c2c2c',
                    padding: '1.5rem',
                    borderRadius: '10px',
                    border: '2px dashed #ffcc00',
                    boxShadow: '0 4px 12px rgba(255, 204, 0, 0.2)',
                    maxHeight: '500px',  // Set a fixed height for the container
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{ color: '#ffcc00', marginTop: 0 }}>📅 Case Timeline</h2>
                    <div style={{
                        overflowY: 'auto',  // Enable vertical scrolling
                        flex: '1',          // Take up remaining space
                        paddingRight: '8px' // Add padding for the scrollbar
                    }}>
                        <Timeline onEventClick={handleEventClick} activeSuspects={activeSuspects} />
                    </div>
                </div>

                {/* Right column: Map */}
                <div style={{
                    border: '2px solid #ff0000',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    backgroundColor: '#2c2c2c',
                    boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)',
                    height: '500px',              // 🔥 Adjust height here
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{ color: '#ff0000', marginTop: 0 }}>🗺️ Crime Map</h2>
                    <div style={{ flex: '1' }}>  {/* Makes MapComponent stretch */}
                        <MapComponent selectedEvent={selectedEvent} activeSuspects={activeSuspects} />
                    </div>
                </div>

            </div>

    {/* Suspects Row */}
            <div style={{
                backgroundColor: '#2c2c2c',
                padding: '1.5rem',
                borderRadius: '10px',
                border: '2px solid #3399ff',
                boxShadow: '0 4px 12px rgba(51, 153, 255, 0.3)',
                marginBottom: '2rem'
            }}>
                <h2 style={{ color: '#3399ff', marginTop: 0 }}>👤 Suspect Profiles</h2>
                <div style={{
                    display: 'grid',
                    justifyContent: 'space-evenly',  // This distributes space evenly between items
                    gap: '1.5rem',
                    paddingBottom: '0.5rem'
                }}>
                    <SuspectProfiles onSelectSuspect={handleToggleSuspect} />
                </div>
            </div>

            {/* Control Buttons */}
            <div style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <button
                    style={buttonStyle}
                    onMouseEnter={hoverEffect}
                    onMouseLeave={leaveEffect}
                    onClick={() => setShowReport(true)}
                >
                    Generate Report
                </button>

                <button
                    style={{
                        backgroundColor: '#3399ff',
                        color: '#fff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 6px 12px rgba(51, 153, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                    }}
                    onClick={() => {
                        fetch('analysis/analysis_results.json')
                            .then(response => response.json())
                            .then(data => {
                                setAnalysisData(data);
                                setShowAnalysis(true);
                            })
                            .catch(error => console.error('Error loading analysis results:', error));
                    }}
                >
                    Show Analysis Results
                </button>

            </div>

            {/* Show Analysis Results */}
            {showAnalysis && (
                <div style={{
                    marginTop: '2rem',
                    backgroundColor: '#2c2c2c',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '2px solid #3399ff',
                    boxShadow: '0 4px 12px rgba(51, 153, 255, 0.3)'
                }}>
                    <h2 style={{ color: '#3399ff' }}>📊 Analysis Results</h2>
                    {analysisData.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {analysisData.map((item, index) => (
                                <li key={index} style={{ marginBottom: '1rem', borderBottom: '1px solid gray', paddingBottom: '0.5rem' }}>
                                    <strong>Suspect:</strong> {item.suspect}<br />
                                    <strong>Crime Scene:</strong> {item.crime_scene}<br />
                                    <strong>Distance:</strong> {item.distance_meters} meters<br />
                                    <strong>Ping Time:</strong> {item.ping_time}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}


            <ReportModal isOpen={showReport} onClose={() => setShowReport(false)} />
        </div>
    );
}

const buttonStyle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
};

const hoverEffect = (e) => {
    e.target.style.transform = 'scale(1.05)';
    e.target.style.boxShadow = '0 6px 12px rgba(255, 0, 0, 0.5)';
};

const leaveEffect = (e) => {
    e.target.style.transform = 'scale(1)';
    e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
};

export default App;