import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import { FITBIT_CLIENT_ID, FITBIT_CLIENT_SECRET, FITBIT_REDIRECT_URI, FITBIT_TOKEN_URI } from '../../config';

export default async function callback(req, res) {
  const { code } = req.query;

  const requestBody = new URLSearchParams();
  requestBody.append('clientId', FITBIT_CLIENT_ID);
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('redirect_uri', FITBIT_REDIRECT_URI);
  requestBody.append('code', code);

  const response = await fetch(FITBIT_TOKEN_URI, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${FITBIT_CLIENT_ID}:${FITBIT_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  if (response.ok) {
    const { access_token, refresh_token, expires_in } = await response.json();
    const token = jwt.sign({ access_token, refresh_token }, 'your-256-bit-secret');

    res.redirect(`/dashboard?token=${token}`);
  } else {
    res.status(response.status).send(await response.text());
  }
}