// ReportModal.js
import React from 'react';

const ReportModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;  // Don't render if not open

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
        }}>
            <div style={{
                backgroundColor: '#2c2c2c',
                border: '2px solid #ffcc00',
                borderRadius: '10px',
                padding: '2rem',
                maxWidth: '400px',
                color: '#f5f5f5',
                fontFamily: 'Courier New, monospace',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
            }}>
                <h2 style={{ color: '#ffcc00', marginTop: 0 }}>📄 Crime Report</h2>
                <p>
                    Evidence from the phone pings shows that <strong>Ruth</strong> could have committed the crimes on <strong>March 3rd</strong> and <strong>March 4th</strong>.
                    <br /><br />
                    <strong>Kevin</strong> and <strong>Jamal</strong> are likely involved in the <strong>March 5th</strong> crime.
                </p>
                <button
                    style={{
                        backgroundColor: '#ffcc00',
                        color: '#1c1c1c',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        marginTop: '1rem',
                        cursor: 'pointer'
                    }}
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ReportModal;
