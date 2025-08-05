import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [blockHash, setBlockHash] = useState('');
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState('');

  const fetchBlock = async () => {
    setError('');
    setBlockData(null);
    if (!blockHash) {
      setError('Please enter a block hash');
      return;
    }
    try {
      const res = await axios.get(`/api/block/${blockHash}`);
      setBlockData(res.data);
    } catch {
      setError('Block not found or API error');
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20 }}>
      <h1>Bitcoin Explorer</h1>
      <input
        type="text"
        value={blockHash}
        onChange={(e) => setBlockHash(e.target.value)}
        placeholder="Enter block hash"
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <button
        onClick={fetchBlock}
        style={{
          marginTop: 10,
          padding: '10px 20px',
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Fetch Block
      </button>

      {error && (
        <p style={{ color: 'red', marginTop: 20 }}>
          {error}
        </p>
      )}

      {blockData && (
        <div style={{ marginTop: 30, background: '#eee', padding: 20, borderRadius: 8 }}>
          <h2>Block Info</h2>
          <p><strong>Height:</strong> {blockData.height}</p>
          <p><strong>Timestamp:</strong> {new Date(blockData.timestamp * 1000).toLocaleString()}</p>
          <p><strong>Tx Count:</strong> {blockData.tx_count}</p>
          <p><strong>Merkle Root:</strong> {blockData.merkleroot}</p>
        </div>
      )}
    </div>
  );
}

export default App;
