import { useState } from 'react';

function SuspectProfiles({ onSelectSuspect }) {
    const [expanded, setExpanded] = useState(null);

    const suspects = [
        {
            name: 'Ruth Chen',
            alibi: 'Claims to be visiting family in Albany (no proof provided).',
            evidence: [
                'Phone pinged near 102 Linden St (Mar 3, 2:35 AM)',
                'Phone pinged near 104 Linden St (Mar 4, 2:36 AM & 2:45 AM)',
                'Camera detected shadowy figure & person with bag near crime scenes'
            ],
            timeline: [
                { type: 'Ping', label: 'Ping near 102 Linden', time: 'Mar 3, 2:35 AM', lat: 40.700864, lon: -73.912427 },
                { type: 'Ping', label: 'Ping near 104 Linden', time: 'Mar 4, 2:36 AM', lat: 40.700100, lon: -73.912500 },
                { type: 'Ping', label: 'Ping near 104 Linden', time: 'Mar 4, 2:45 AM', lat: 40.700100, lon: -73.912500 }
            ]

        },
        {
            name: 'Kevin Ortega',
            alibi: 'Claims to be at home watching TV. Family confirms he came home late (no digital proof).',
            evidence: [
                'Phone pinged near 102 Linden St (Mar 3, 2:35 AM)',
                'Phone pinged near 108 Linden St (Mar 5, 2:18 AM)'
            ],
            timeline: [
                { type: 'Ping', label: 'Ping near 102 Linden', time: 'Mar 3, 2:35 AM', lat: 40.698977, lon: -73.912002 },
                { type: 'Ping', label: 'Ping near 108 Linden', time: 'Mar 5, 2:18 AM', lat: 40.700050, lon: -73.912450 }
            ]

        },
        {
            name: 'Jamal Reyes',
            alibi: 'Claims he was delivering food on Linden St (no specific orders match).',
            evidence: [
                'Phone pinged near 104 Linden St (Mar 4, 2:34 AM)',
                'Phone pinged near 108 Linden St (Mar 5, 2:20 AM)'
            ],
            timeline: [
                { type: 'Ping', label: 'Ping near 104 Linden', time: 'Mar 4, 2:34 AM', lat: 40.696739, lon: -73.916562 },
                { type: 'Ping', label: 'Ping near 108 Linden', time: 'Mar 5, 2:20 AM', lat: 40.700200, lon: -73.912600 }
            ]

        }
    ];

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Suspect Profiles</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {suspects.map((suspect, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            setExpanded(expanded === idx ? null : idx);
                            onSelectSuspect(expanded === idx ? null : suspect);  // Pass suspect to the map
                        }}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '12px',
                            padding: '1rem',
                            width: '250px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                            backgroundColor: '#fff',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.03)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <h3>{suspect.name}</h3>
                        <p><strong>Alibi:</strong> {suspect.alibi}</p>
                        <p><strong>Evidence:</strong></p>
                        <ul>
                            {suspect.evidence.map((e, eIdx) => (
                                <li key={eIdx}>{e}</li>
                            ))}
                        </ul>

                        {/* Show timeline if card is expanded */}
                        {expanded === idx && (
                            <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
                                <h4>Timeline</h4>
                                <ul style={{ fontSize: '0.85rem', color: '#444', paddingLeft: '1rem' }}>
                                    {suspect.timeline.map((event, eIdx) => (
                                        <li key={eIdx}>
                                            <strong>{event.type}:</strong> {event.label} <em style={{ color: 'gray' }}>({event.time})</em>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuspectProfiles;
