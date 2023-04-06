// ./initAuth.js
import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    onLoginRequestError: (err) => {
      console.error(err)
    },
    onLogoutRequestError: (err) => {
      console.error(err)
    },
    firebaseAuthEmulatorHost: 'localhost:3001',
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'stridemaster-72e16',
        clientEmail: 'firebase-adminsdk-h3859@stridemaster-72e16.iam.gserviceaccount.com',
        // The private key must not be accessible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://stridemaster-72e16-default-rtdb.firebaseio.com/',
    },
    // Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
    // useFirebaseAdminDefaultCredential: true,
    firebaseClientInitConfig: {
      apiKey: 'e75933a91466b07ba318844fd6a9bb5123eaff4f', // required
      authDomain: 'stridemaster-72e16.firebaseapp.com',
      databaseURL: 'https://stridemaster-72e16-default-rtdb.firebaseio.com/',
      projectId: 'stridemaster-72e16',
    },
    cookies: {
      name: 'stridemaster', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err)
    },
    onTokenRefreshError: (err) => {
      console.error(err)
    },
  })
}

export default initAuth