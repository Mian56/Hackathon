function Timeline({ onEventClick }) {
    const events = [
        { type: 'Crime', label: '102 Linden St Break-in', time: 'Mar 3, 2:13 AM', lat: 40.6959, lon: -73.9158 },
        { type: 'Camera', label: 'Shadowy figure detected', time: 'Mar 3, 2:14 AM', lat: 40.700509, lon: -73.913144 },
        { type: 'Ruth Ping', label: 'Ruth Ping near 102 Linden', time: 'Mar 3, 2:35 AM', lat: 40.700864, lon: -73.912427 },
        { type: 'Crime', label: '104 Linden St Break-in', time: 'Mar 4, 2:29 AM', lat: 40.6961, lon: -73.9158 },
        { type: 'Camera', label: 'Person with bag detected', time: 'Mar 4, 2:32 AM', lat: 40.700719, lon: -73.911759 },
        { type: 'Ruth Ping', label: 'Ruth Ping near 104 Linden', time: 'Mar 4, 2:36 AM', lat: 40.700100, lon: -73.912500 },
        { type: 'Camera', label: 'Bike turning corner detected', time: 'Mar 4, 2:48 AM', lat: 40.700299, lon: -73.912299 },
        { type: 'Crime', label: '108 Linden St Break-in', time: 'Mar 5, 2:07 AM', lat: 40.6961, lon: -73.9158 },
        { type: 'Camera', label: 'Bike near 108 Linden detected', time: 'Mar 5, 2:09 AM', lat: 40.700371, lon: -73.911529 },
    ];

    return (
        <div style={{ marginTop: '2rem' }}>
            <h2>Timeline of Events</h2>
            <div style={{ position: 'relative', marginLeft: '20px', paddingLeft: '10px', borderLeft: '2px solid gray' }}>
                {events.map((event, idx) => (
                    <div
                        key={idx}
                        onClick={() => onEventClick(event)}  // Click handler
                        style={{
                            marginBottom: '1.5rem',
                            position: 'relative',
                            padding: '0.5rem',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {/* Circle dot */}
                        <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: event.type === 'Crime' ? 'red' : event.type === 'Ruth Ping' ? 'blue' : 'orange',
                            position: 'absolute',
                            left: '-18px',
                            top: '12px'
                        }}></div>
                        {/* Event text */}
                        <div>
                            <strong style={{ color: event.type === 'Crime' ? 'red' : event.type === 'Ruth Ping' ? 'blue' : 'orange' }}>
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
