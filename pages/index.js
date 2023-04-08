import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'
import { useRouter } from 'next/router'
import axios from 'axios'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const FitbitConnectButton = () => {
  const router = useRouter()

  const handleFitbitConnect = async () => {
    try {
      // Make a request to your Fitbit OAuth endpoint
      const response = await axios.get('/api/auth/fitbit')
      const { url } = response.data

      // Redirect to Fitbit authorization page
      window.location = url
    } catch (error) {
      console.error('Error connecting to Fitbit:', error)
    }
  }

  return (
    <div>
      <h3>Connect to Fitbit</h3>
      <button onClick={handleFitbitConnect}>Connect</button>
    </div>
  )
}

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h3>Home</h3>
          <p>
            This page does not require authentication, so it won't redirect to
            the login page if you are not signed in.
          </p>
          <p>
            If you remove `getServerSideProps` from this page, it will be static
            and load the authed user only on the client side.
          </p>
        </div>
        <FitbitConnectButton />
        <DemoPageLinks />
      </div>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
