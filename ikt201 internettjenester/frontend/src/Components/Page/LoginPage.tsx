import React, { ChangeEvent, useState } from 'react'
import { REQUEST_URL } from '../../constants'
import PageBase from '../Pages/PageBase'
import { createUseStyles } from 'react-jss'
import FormBase from '../Pages/FormBase'
import { Link } from 'react-router-dom'

interface IFieldsStateInterface {
  email: string
  password: string
}

const useStyles = createUseStyles({
  root: {
    width: '50%',
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

function LoginPage() {
  const styles = useStyles()
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IFieldsStateInterface>({
    email: '',
    password: '',
  })

  async function loginCall() {
    await fetch(REQUEST_URL + '/auth/authenticate', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(fieldsState),
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()
      if (data) {
        setMessage(data.message)
      }
      if (res.status === 200) {
        window.location.href = '/categories'
      }
    })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setFieldsState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  return (
    <PageBase>
      <FormBase formTitle={'Login to your account'} requestMessage={message}>
        <input
          name={'email'}
          type="email"
          className={styles.inputField}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name={'password'}
          id="password"
          type="password"
          className={styles.inputField}
          placeholder="Password"
          onChange={handleChange}
          minLength={6}
          maxLength={64}
          required
        />
        <input
          className={styles.button}
          type="submit"
          value="Login"
          onClick={loginCall}
        />
        <Link to={'/account/register'} className={styles.link}>
          Create an account
        </Link>
      </FormBase>
    </PageBase>
  )
}

export default LoginPage
