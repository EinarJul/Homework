import * as React from 'react'
import { REQUEST_URL } from '../../constants'
import { createUseStyles } from 'react-jss'
import PageBase from '../Pages/PageBase'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getGlobal, setGlobal } from 'reactn'
import { IGlobalStore } from '../../hooks/appContext'

const useStyles = createUseStyles({
  root: {
    width: '50%',
    height: '10rem',
    border: '1px solid #CCC5B9',
    display: 'flex',
    flexFlow: 'column',
    margin: '2rem auto',
  },
  inputField: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: 10,
    outline: 'none',
    border: '2px solid #CCC5B9',
    fontSize: '0.9rem',
    '&:focus': {
      border: '2px solid #403D39',
    },
  },
  inputFieldPasswordStrongness: {
    margin: '0rem 1rem 0rem 1rem',
  },
  button: {
    padding: '1rem',
    margin: '1rem',
    borderRadius: 10,
    outline: 'none',
    backgroundColor: '#252422',
    fontSize: '0.9rem',
    cursor: 'pointer',
    color: 'white',
    border: '2px solid #252422',
    '&:hover': {
      backgroundColor: 'white',
      border: '2px solid #252422',
      color: '#252422',
    },
  },
  link: {
    color: '#252422',
    textAlign: 'center',
  },
})

function LogoutPage() {
  const styles = useStyles()
  const globalState = getGlobal<IGlobalStore>()

  async function logoutCall() {
    await fetch(REQUEST_URL + '/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.status === 200) {
        setGlobal({
          auth: {
            isRoot: false,
            isAuthenticated: false,
          },
        })
        window.location.href = '/'
      }
    })
  }

  useEffect(() => {
    logoutCall()
  }, [])

  return (
    <PageBase>
      <div className={styles.root}>
        {globalState.auth.isAuthenticated ? (
          <p>Could not log out</p>
        ) : (
          <>
            <p>You have been logged out</p>
            <p>If you have not been redirected, click on the link below</p>
            <Link to={'/'} className={styles.link}>
              Go to home page
            </Link>
          </>
        )}
      </div>
    </PageBase>
  )
}

export default LogoutPage
