import * as React from 'react'
import { ToastBody, ToastHeader, Toast } from 'reactstrap/es'
import { createUseStyles } from 'react-jss'

interface ISnackbar {
  isActive: boolean
  type: 'danger' | 'warning' | 'success'
  message: string
  title: string
}

const useStyles = createUseStyles({
  root: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    marginBottom: '1rem',
    marginLeft: '1rem',
  },
})

function Snackbar(props: ISnackbar) {
  const styles = useStyles()
  const { message, isActive, title, type } = props

  return (
    <Toast isOpen={isActive} className={styles.root}>
      <ToastHeader icon={type}>{title}</ToastHeader>
      <ToastBody>{message}</ToastBody>
    </Toast>
  )
}

export default Snackbar
