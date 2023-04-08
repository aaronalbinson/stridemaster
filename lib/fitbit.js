import axios from 'axios';

const baseURL = 'https://api.fitbit.com';

export const getFitbitAuthUrl = () => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = process.env.FITBIT_REDIRECT_URI;
  const authUrl = `${baseURL}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight`;

  return authUrl;
};

export const exchangeFitbitCodeForAccessToken = async (code) => {
  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const clientSecret = process.env.FITBIT_CLIENT_SECRET;
  const redirectUri = process.env.FITBIT_REDIRECT_URI;
  const tokenUrl = `${baseURL}/oauth2/token`;
  const headers = {
    Authorization: `Basic ${Buffer.from(
      `${clientId}:${clientSecret}`
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = {
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  };

  try {
    const response = await axios.post(tokenUrl, new URLSearchParams(data), {
      headers,
    });
    const accessToken = response.data.access_token;
    const refreshToken = response.data.refresh_token;
    const expiresIn = response.data.expires_in;

    return { accessToken, refreshToken, expiresIn };
  } catch (error) {
    console.error('Error exchanging Fitbit code for access token:', error);
  }
};

export const getFitbitUserData = async (accessToken) => {
  const profileUrl = `${baseURL}/1/user/-/profile.json`;
  const activitiesUrl = `${baseURL}/1/user/-/activities.json`;
  const heartRateUrl = `${baseURL}/1/user/-/activities/heart/date/today/1d.json`;

  try {
    const [profileResponse, activitiesResponse, heartRateResponse] =
      await Promise.all([
        axios.get(profileUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get(activitiesUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
        axios.get(heartRateUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      ]);

    const userData = {
      profile: profileResponse.data,
      activities: activitiesResponse.data,
      heartRate: heartRateResponse.data,
    };

    return userData;
  } catch (error) {
    console.error('Error getting Fitbit user data:', error);
  }
};
