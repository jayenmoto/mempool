const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3001;

const BLOCKSTREAM_API = 'https://blockstream.info/api';

app.get('/api/block/:blockhash', async (req, res) => {
  try {
    const { blockhash } = req.params;
    const response = await axios.get(`${BLOCKSTREAM_API}/block/${blockhash}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch block data' });
  }
});

app.get('/api/tx/:txid', async (req, res) => {
  try {
    const { txid } = req.params;
    const response = await axios.get(`${BLOCKSTREAM_API}/tx/${txid}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transaction data' });
  }
});

app.get('/api/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(`${BLOCKSTREAM_API}/address/${address}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch address data' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API listening at http://localhost:${PORT}`);
});
