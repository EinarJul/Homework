import * as React from 'react'
import { AnyFunc } from 'simplytyped'
import { createUseStyles } from 'react-jss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import classNames from 'classnames'
import { REQUEST_URL } from '../../constants'
import { ChangeEvent, useState } from 'react'

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

interface IAcceptSellerRequestModal {
  open: boolean
  closeModal: AnyFunc
  toggle: AnyFunc
  toggleSnackbar: AnyFunc
  id: string
  userId: string
}

function AcceptSellerRequestModal(props: IAcceptSellerRequestModal) {
  const styles = useStyles()
  const { open, closeModal, toggle, toggleSnackbar, id, userId } = props
  const [message, setMessage] = useState<string>('')

  async function acceptCall() {
    await fetch(REQUEST_URL + '/panel/seller-requests/accept', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        id: id,
        userId: userId,
      }),
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

  return (
    <Modal
      isOpen={open}
      toggle={toggle}
      className={classNames(styles.dialogContent)}
      centered
      size={'sm'}
      wrapClassName={styles.root}
    >
      <ModalHeader toggle={toggle}>Edit category</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to make this user a seller?</p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="success" onClick={acceptCall}>
          Save
        </Button>
        <Button outline color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default AcceptSellerRequestModal
