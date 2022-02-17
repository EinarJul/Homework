import React, { ReactNode } from 'react'
import { createUseStyles } from 'react-jss'

interface IFormBase {
  formTitle?: string
  description?: string
  requestMessage?: string
  children: ReactNode | Array<ReactNode>
}

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    width: '50%',
    margin: '2rem auto',
  },
  formTitle: {
    color: '#403D39',
    textAlign: 'center',
  },
  formDescription: {
    color: '#403D39',
    textAlign: 'center',
  },
  formRequestMessage: {
    color: '#403D39',
    textAlign: 'center',
  },
})

function FormBase(props: IFormBase) {
  const { formTitle, description, requestMessage, children } = props
  const styles = useStyles()

  return (
    <div className={styles.root}>
      {formTitle && <h1 className={styles.formTitle}>{formTitle}</h1>}
      {description && <p className={styles.formDescription}>{description}</p>}
      {requestMessage && (
        <p className={styles.formRequestMessage}>{requestMessage}</p>
      )}
      {children}
    </div>
  )
}

export default FormBase
