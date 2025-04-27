import { useState } from 'react';
import MapComponent from './MapComponent';
import Timeline from './Timeline';
import SuspectProfiles from './SuspectProfiles';
import ReportModal from './ReportModal';

function App() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [activeSuspects, setActiveSuspects] = useState([]);
    const [showReport, setShowReport] = useState(false);
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [analysisData, setAnalysisData] = useState([]);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const handleToggleSuspect = (suspect) => {
        if (!suspect) return;
        setActiveSuspects(prev => {
            const isActive = prev.find(s => s.name === suspect.name);
            return isActive ? prev.filter(s => s.name !== suspect.name) : [...prev, suspect];
        });
    };

    const handleLoadResults = () => {
        fetch('/analysis/analysis_results.json')  // Correct path to public folder
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setAnalysisData(data);
                setShowAnalysis(true);
            })
            .catch(error => console.error('Error loading analysis results:', error));
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>🕵️‍♂️ Crime Investigation: Linden St Burglaries 🕵️‍♀️</h1>

            <div style={gridStyle}>
                <div style={timelineStyle}>
                    <h2 style={{ color: '#ffcc00' }}>📅 Case Timeline</h2>
                    <div style={{ overflowY: 'auto', flex: '1', paddingRight: '8px' }}>
                        <Timeline onEventClick={handleEventClick} activeSuspects={activeSuspects} />
                    </div>
                </div>
                <div style={mapStyle}>
                    <h2 style={{ color: '#ff0000' }}>🗺️ Crime Map</h2>
                    <div style={{ flex: '1' }}>
                        <MapComponent selectedEvent={selectedEvent} activeSuspects={activeSuspects} />
                    </div>
                </div>
            </div>

            <div style={suspectStyle}>
                <h2 style={{ color: '#3399ff' }}>👤 Suspect Profiles</h2>
                <div style={profileGridStyle}>
                    <SuspectProfiles onSelectSuspect={handleToggleSuspect} />
                </div>
            </div>

            <div style={buttonContainerStyle}>
                <button style={buttonStyle} onMouseEnter={hoverEffect} onMouseLeave={leaveEffect} onClick={() => setShowReport(true)}>
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
                        if (showAnalysis) {
                            setShowAnalysis(false);  // Close if open
                        } else {
                            fetch('/analysis/analysis_results.json')
                                .then(response => response.json())
                                .then(data => {
                                    setAnalysisData(data);
                                    setShowAnalysis(true);  // Open
                                })
                                .catch(error => console.error('Error loading analysis results:', error));
                        }
                    }}
                >
                    {showAnalysis ? 'Hide Analysis Results' : 'Show Analysis Results'}
                </button>

            </div>

            {showAnalysis && (
                <div style={analysisPanelStyle}>
                    <h2 style={{ color: '#3399ff' }}>📊 Analysis Results</h2>
                    {analysisData.length > 0 ? (
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {analysisData.map((item, index) => (
                                <li key={index} style={resultItemStyle}>
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

            <ReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                analysisData={analysisData}
            />
        </div>
    );
}

const containerStyle = {
    padding: '2rem',
    fontFamily: 'Courier New, monospace',
    backgroundColor: '#1c1c1c',
    color: '#f5f5f5',
    minHeight: '100vh',
    maxWidth: '1400px',
    margin: '0 auto',
    border: '5px double #ffcc00',
    boxShadow: '0 0 20px rgba(255, 204, 0, 0.3)',
    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0 10px, transparent 10px 20px)',
    backgroundSize: '40px 40px',
    backgroundBlendMode: 'overlay'
};
const headerStyle = { textAlign: 'center', marginBottom: '2rem', color: '#ffcc00', textShadow: '2px 2px #000', fontSize: '2.5rem' };
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '2rem' };
const timelineStyle = { backgroundColor: '#2c2c2c', padding: '1.5rem', borderRadius: '10px', border: '2px dashed #ffcc00', boxShadow: '0 4px 12px rgba(255, 204, 0, 0.2)', maxHeight: '500px', display: 'flex', flexDirection: 'column' };
const mapStyle = { border: '2px solid #ff0000', borderRadius: '10px', padding: '1.5rem', backgroundColor: '#2c2c2c', boxShadow: '0 4px 12px rgba(255, 0, 0, 0.4)', height: '500px', display: 'flex', flexDirection: 'column' };
const suspectStyle = { backgroundColor: '#2c2c2c', padding: '1.5rem', borderRadius: '10px', border: '2px solid #3399ff', boxShadow: '0 4px 12px rgba(51, 153, 255, 0.3)', marginBottom: '2rem' };
const profileGridStyle = { display: 'grid', justifyContent: 'space-evenly', gap: '1.5rem', paddingBottom: '0.5rem' };
const buttonContainerStyle = { marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' };
const buttonStyle = { backgroundColor: '#ff0000', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' };
const analysisButtonStyle = { ...buttonStyle, backgroundColor: '#3399ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' };
const hoverEffect = (e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 12px rgba(255, 0, 0, 0.5)'; };
const leaveEffect = (e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; };
const analysisPanelStyle = { marginTop: '2rem', backgroundColor: '#2c2c2c', padding: '1rem', borderRadius: '10px', border: '2px solid #3399ff', boxShadow: '0 4px 12px rgba(51, 153, 255, 0.3)' };
const resultItemStyle = { marginBottom: '1rem', borderBottom: '1px solid gray', paddingBottom: '0.5rem' };

export default App;
