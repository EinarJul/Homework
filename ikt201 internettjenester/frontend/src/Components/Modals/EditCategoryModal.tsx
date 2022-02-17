import * as React from 'react'
import { AnyFunc } from 'simplytyped'
import { createUseStyles } from 'react-jss'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import classNames from 'classnames'
import { REQUEST_URL } from '../../constants'
import { ChangeEvent, useState } from 'react'

interface IFieldsStateInterface {
  name: string
  description: string
  image: string
  categoryId: string
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

interface ISaveCategoryModal {
  open: boolean
  closeModal: AnyFunc
  toggle: AnyFunc
  toggleSnackbar: AnyFunc
  id: string
}

function EditCategoryModal(props: ISaveCategoryModal) {
  const styles = useStyles()
  const { open, closeModal, toggle, toggleSnackbar, id } = props
  const [message, setMessage] = useState<string>('')
  const [fieldsState, setFieldsState] = useState<IFieldsStateInterface>({
    name: '',
    description: '',
    image: '',
    categoryId: id,
  })

  async function saveCall() {
    await fetch(REQUEST_URL + '/panel/categories/update', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        name: fieldsState.name,
        description: fieldsState.description,
        image: fieldsState.image,
        categoryId: id,
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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <ModalHeader toggle={toggle}>Edit category</ModalHeader>
      <ModalBody>
        <input
          name={'name'}
          type="text"
          className={styles.inputField}
          placeholder="Category title"
          onChange={handleChange}
          required
        />
        <textarea
          name={'description'}
          className={styles.inputField}
          placeholder="Category description"
          onChange={handleChange}
          required
        />
        <input
          name={'image'}
          type="text"
          className={styles.inputField}
          placeholder="Image link"
          onChange={handleChange}
          required
        />
      </ModalBody>
      <ModalFooter>
        <Button outline color="primary" onClick={saveCall}>
          Save
        </Button>
        <Button outline color="secondary" onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditCategoryModal
