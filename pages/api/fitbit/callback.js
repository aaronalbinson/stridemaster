import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';

export default async function callback(req, res) {
  const { code } = req.query;

  const requestBody = new URLSearchParams();
  requestBody.append('clientId', process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID);
  requestBody.append('grant_type', 'authorization_code');
  requestBody.append('redirect_uri', process.env.FITBIT_REDIRECT_URI);
  requestBody.append('code', code);

  const response = await fetch(process.env.FITBIT_TOKEN_URI, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`).toString('base64')}`,
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