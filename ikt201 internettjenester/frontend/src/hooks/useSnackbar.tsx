import React from 'react'

interface snackbar {
  title: string
  message: string
  type: 'danger' | 'warning' | 'success'
}

export function useSnackbar() {
  const [isActive, setIsActive] = React.useState(false)
  const [data, setMessage] = React.useState({
    title: '',
    message: '',
    type: '',
  })

  React.useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false)
      }, 3000)
    }
  }, [isActive])

  const openSnackbar = (msg: snackbar) => {
    setMessage({
      title: msg.title,
      message: msg.message,
      type: msg.type,
    })
    setIsActive(true)
  }

  return { isActive, data, openSnackbar }
}
