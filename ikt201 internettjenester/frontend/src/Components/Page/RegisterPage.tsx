import React, { ChangeEvent, useState } from 'react'
import { REQUEST_URL } from '../../constants'
import PageBase from '../Pages/PageBase'
import { createUseStyles } from 'react-jss'
import FormBase from '../Pages/FormBase'
import PasswordStrengthBar from 'react-password-strength-bar/dist'
import { Link } from 'react-router-dom'

interface IFieldsStateInterface {
  nickname: string
  name: string
  lastname: string
  age: number
  email: string
  password: string
  reppassword: string
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

function RegisterPage() {
  const styles = useStyles()
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IFieldsStateInterface>({
    nickname: '',
    name: '',
    lastname: '',
    age: 0,
    email: '',
    password: '',
    reppassword: '',
  })

  async function registerCall() {
    await fetch(REQUEST_URL + '/auth/register', {
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
        window.location.href = '/account/login'
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
      <FormBase
        formTitle={'Create new account'}
        description={'Create an account for free!'}
        requestMessage={message}
      >
        <input
          name={'nickname'}
          type="text"
          className={styles.inputField}
          placeholder="Nickname"
          onChange={handleChange}
          required
        />
        <input
          name={'name'}
          type="text"
          className={styles.inputField}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name={'lastname'}
          type="text"
          className={styles.inputField}
          placeholder="Lastname"
          onChange={handleChange}
          required
        />
        <input
          name={'age'}
          type="number"
          className={styles.inputField}
          placeholder="Age"
          onChange={handleChange}
          required
        />
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
        <PasswordStrengthBar
          password={fieldsState.password}
          className={styles.inputFieldPasswordStrongness}
          minLength={6}
        />
        <input
          name={'reppassword'}
          id="reppassword"
          type="password"
          className={styles.inputField}
          placeholder="Repeat password"
          onChange={handleChange}
          minLength={6}
          maxLength={64}
          required
        />
        <PasswordStrengthBar
          password={fieldsState.reppassword}
          className={styles.inputFieldPasswordStrongness}
          minLength={6}
        />
        <input
          className={styles.button}
          type="submit"
          value="Create account"
          onClick={registerCall}
        />
        <Link to={'/account/login'} className={styles.link}>
          Log into your existing account
        </Link>
      </FormBase>
    </PageBase>
  )
}

export default RegisterPage
