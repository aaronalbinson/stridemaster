const FitbitButton = () => {
  const handleFitbitConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_FITBIT_REDIRECT_URI;
    const scope = 'activity heartrate';

    const authorizeUrl = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;

    window.location.href = authorizeUrl;
  };

  return (
    <button onClick={handleFitbitConnect}>
      Connect to Fitbit
    </button>
  );
};

export default FitbitButton;