import axios from 'axios';

export async function exchangeFitbitCodeForToken(code, redirectUri) {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET;

  const tokenUrl = 'https://api.fitbit.com/oauth2/token';

  const response = await axios.post(tokenUrl, {
    code: code,
    grant_type: 'authorization_code',
    client_id: clientId,
    redirect_uri: redirectUri,
  }, {
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });

  return response.data.access_token;
}