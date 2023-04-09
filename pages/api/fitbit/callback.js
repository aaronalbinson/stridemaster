import axios from 'axios';

const exchangeFitbitCodeForToken = async (code, redirectUri) => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET;

  const tokenUrl = 'https://api.fitbit.com/oauth2/token';

  const response = await axios.post(tokenUrl, null, {
    params: {
      client_id: clientId,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    },
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};