import { exchangeFitbitCodeForToken } from '../../lib/fitbit';

export default async function handler(req, res) {
  const code = req.query.code;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/fitbit`;

  const accessToken = await exchangeFitbitCodeForToken(code, redirectUri);

  // Store the access token securely in your server-side code

  // Redirect the user to a success page or another relevant page
  res.redirect('/success');
}