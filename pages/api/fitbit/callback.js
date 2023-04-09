import axios from 'axios';

const handleFitbitCallback = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET;
  const redirectUri = `${req.headers.origin}/api/fitbit/callback`;

  try {
    // Exchange authorization code for access token
    const response = await axios.post('https://api.fitbit.com/oauth2/token', null, {
      params: {
        code,
        client_id: clientId,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in;

    // TODO: Store access token and expiration time in database or session

    // Redirect user to success page
    res.redirect('/success');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging authorization code for access token');
  }
};

export default handleFitbitCallback;
