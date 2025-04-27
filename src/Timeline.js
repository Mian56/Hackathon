function Timeline({ onEventClick, activeSuspects }) {
    const baseEvents = [
        { type: 'Crime', label: '102 Linden St Break-in', time: 'Mar 3, 2:13 AM', lat: 40.700900, lon: -73.912300 },
        { type: 'Camera', label: 'Shadowy figure detected', time: 'Mar 3, 2:14 AM', lat: 40.700509, lon: -73.913144 },
        { type: 'Crime', label: '104 Linden St Break-in', time: 'Mar 4, 2:29 AM', lat: 40.700700, lon: -73.912400 },
        { type: 'Camera', label: 'Person with bag detected', time: 'Mar 4, 2:32 AM', lat: 40.700719, lon: -73.911759 },
        { type: 'Camera', label: 'Bike turning corner detected', time: 'Mar 4, 2:48 AM', lat: 40.700299, lon: -73.912299 },
        { type: 'Crime', label: '108 Linden St Break-in', time: 'Mar 5, 2:07 AM', lat: 40.700500, lon: -73.912500 },
        { type: 'Camera', label: 'Bike near 108 Linden detected', time: 'Mar 5, 2:09 AM', lat: 40.700371, lon: -73.911529 },
    ];

    // Combine all active suspect timelines
    const suspectEvents = activeSuspects.flatMap(suspect =>
        suspect.timeline.map(ping => ({
            type: `${suspect.name.split(' ')[0]} Ping`,
            label: ping.label,
            time: ping.time,
            lat: ping.lat,
            lon: ping.lon
        }))
    );

    const allEvents = [...baseEvents, ...suspectEvents].sort((a, b) => {
        const timeA = new Date(`2025 ${a.time}`);
        const timeB = new Date(`2025 ${b.time}`);
        return timeA - timeB;
    });


    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Timeline of Events</h2>
            <div style={{ position: 'relative', marginLeft: '20px', paddingLeft: '10px', borderLeft: '2px solid gray' }}>
                {allEvents.map((event, idx) => (
                    <div
                        key={idx}
                        onClick={() => onEventClick(event)}
                        style={{
                            marginBottom: '1.5rem',
                            position: 'relative',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            color: '#f5f5f5',  // Default text color (white-ish)
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.backgroundColor = '#3a3a3a';  // Darker hover bg
                            e.currentTarget.style.color = '#ffcc00';            // Change text color on hover
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#f5f5f5';           // Reset to default text color
                        }}
                    >

                    <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor:
                                event.type.includes('Crime') ? 'red' :
                                    event.type.includes('Camera') ? 'orange' :
                                        event.type.includes('Ruth') ? 'blue' :
                                            event.type.includes('Kevin') ? 'green' :
                                                event.type.includes('Jamal') ? 'purple' : 'gray',
                            position: 'absolute',
                            left: '-18px',
                            top: '12px'
                        }}></div>
                        <div>
                            <strong style={{ color:
                                    event.type.includes('Crime') ? 'red' :
                                        event.type.includes('Camera') ? 'orange' :
                                            event.type.includes('Ruth') ? 'blue' :
                                                event.type.includes('Kevin') ? 'green' :
                                                    event.type.includes('Jamal') ? 'purple' : 'gray'
                            }}>
                                {event.type}:
                            </strong> {event.label} <em style={{ color: 'gray' }}>({event.time})</em>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Timeline;
