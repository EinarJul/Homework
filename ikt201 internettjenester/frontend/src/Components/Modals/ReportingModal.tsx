import * as React from 'react'
import { AnyFunc } from 'simplytyped'
import { createUseStyles } from 'react-jss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import classNames from 'classnames'
import { REQUEST_URL } from '../../constants'
import { ChangeEvent, useState } from 'react'

interface IFieldsStateInterface {
  report: string
  title: string
}

const useStyles = createUseStyles({
  root: {
    width: '100%',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  },
  dialogContent: {
    margin: '0 auto',
    padding: 0,
    width: '100%',
    height: '100%',
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
})

interface IReportingModal {
  open: boolean
  closeModal: AnyFunc
  toggle: AnyFunc
  toggleSnackbar: AnyFunc
}

function ReportingModal(props: IReportingModal) {
  const styles = useStyles()
  const { open, closeModal, toggle, toggleSnackbar } = props
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IFieldsStateInterface>({
    report: '',
    title: '',
  })

  async function reportCall() {
    await fetch(REQUEST_URL + '/report/add', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(fieldsState),
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()
      if (data) {
        setMessage(data.message)
      }
      if (res.status !== 200) {
        toggleSnackbar({
          type: 'danger',
          title: 'Error',
          message: data.message ? data.message : 'Something went wrong',
        })
        toggle()
      } else {
        toggleSnackbar({
          type: 'success',
          title: 'Success',
          message: data.message ? data.message : 'Success',
        })
        toggle()
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
    <Modal
      isOpen={open}
      toggle={toggle}
      className={classNames(styles.dialogContent)}
      centered
      size={'sm'}
      wrapClassName={styles.root}
    >
      <ModalHeader toggle={toggle}>Report a user</ModalHeader>
      <ModalBody>
        <input
          name={'title'}
          type="text"
          className={styles.inputField}
          placeholder="Report title"
          onChange={handleChange}
          required
        />
        <input
          name={'report'}
          type="text"
          className={styles.inputField}
          placeholder="Report message"
          onChange={handleChange}
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={reportCall}>
          Report
        </Button>
        <Button outline color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ReportingModal
