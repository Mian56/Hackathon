function Legend() {
    return (
        <div style={{ marginTop: '1rem' }}>
            <h3>Legend</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '15px', height: '15px', backgroundColor: 'red', borderRadius: '50%', marginRight: '5px' }}></div>
                    Crime Scene
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '15px', height: '15px', backgroundColor: 'orange', borderRadius: '50%', marginRight: '5px' }}></div>
                    Camera Event
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '15px', height: '15px', backgroundColor: 'blue', borderRadius: '50%', marginRight: '5px' }}></div>
                    Ruth's Phone Ping
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '15px', height: '15px', backgroundColor: 'green', borderRadius: '50%', marginRight: '5px' }}></div>
                    Kevin's Phone Ping
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '15px', height: '15px', backgroundColor: 'purple', borderRadius: '50%', marginRight: '5px' }}></div>
                    Jamal's Phone Ping
                </div>
            </div>
        </div>
    );
}

export default Legend;
