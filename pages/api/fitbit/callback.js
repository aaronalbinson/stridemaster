import { parse } from 'querystring';
import axios from 'axios';
import Cookies from 'cookies';

const redirectUri = process.env.NEXT_PUBLIC_FITBIT_REDIRECT_URI;
const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
const clientSecret = process.env.FITBIT_CLIENT_SECRET;

export default async (req, res) => {
  try {
    // Retrieve the authorization code from the query string of the callback URL
    const { query } = req.url;
    const { code } = parse(query);

    console.log(query);
    console.log(code);

    // Exchange the authorization code for an access token using the Fitbit API
    const response = await axios({
      method: 'POST',
      url: 'https://api.fitbit.com/oauth2/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      params: {
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      },
    });

    const { access_token: accessToken } = response.data;

    // Store the access token in a cookie or database for future use
    const cookies = new Cookies(req, res);
    cookies.set('fitbitAccessToken', accessToken, { httpOnly: true });

    // Redirect the user to a success page
    res.writeHead(302, { Location: '/success' });
    res.end();
  } catch (error) {
    console.error(error + code);
    res.status(500).send('An error occurred');
  }
};