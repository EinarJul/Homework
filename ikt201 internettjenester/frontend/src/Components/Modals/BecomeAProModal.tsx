import * as React from 'react'
import { AnyFunc } from 'simplytyped'
import { createUseStyles } from 'react-jss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import classNames from 'classnames'
import { REQUEST_URL } from '../../constants'

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
})

interface IBecomeAProModal {
  open: boolean
  closeModal: AnyFunc
  toggle: AnyFunc
  toggleSnackbar: AnyFunc
}

function BecomeAProModal(props: IBecomeAProModal) {
  const styles = useStyles()
  const { open, closeModal, toggle, toggleSnackbar } = props

  async function rquestSellerAccount() {
    return await fetch(REQUEST_URL + '/grow/form', {
      mode: 'cors',
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()
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
      <ModalHeader toggle={toggle}>Sign up for seller account</ModalHeader>
      <ModalBody>
        <p>
          Do you want to become a seller on Freelancerfy and provide your
          service to our users? Simply sign up for seller account and wait for
          acceptance.
        </p>
        <p>Grow and expand with freelancerfy</p>
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={rquestSellerAccount}>
          Sign up
        </Button>
        <Button outline color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default BecomeAProModal
