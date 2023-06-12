import axios from 'axios';

const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;

const instance = axios.create({
  baseURL: `https://api.airtable.com/v0/${baseId}`,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default instance;
