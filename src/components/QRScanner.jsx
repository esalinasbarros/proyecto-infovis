import React from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanner = ({ onScan }) => {
  const handleResult = (result, error) => {
    if (result?.text) {
      onScan(result.text); // Pass scanned QR code data to the parent component
    }
    if (error) {
      console.error('QR Reader Error:', error);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <QrReader
        onResult={handleResult}
        constraints={{ facingMode: 'environment' }} // Use the back camera
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default QRScanner;