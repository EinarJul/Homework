import * as React from 'react'
import PageBase from '../../Pages/PageBase'
import useFetch from '../../../hooks/useFetch'
import AcceptSellerRequestModal from '../../Modals/AcceptSellerRequestModal'
import DeleteSellerRequestModal from '../../Modals/DeleteSellerRequestModal'
import Snackbar from '../../Pages/Snackbar'
import { useState } from 'react'
import { useSnackbar } from '../../../hooks/useSnackbar'
import { CardBody, CardTitle, CardText, Button, Card } from 'reactstrap'
import { createUseStyles } from 'react-jss'

interface IUser {
  _id: string
  nickname: string
}

interface ISellerRequestResponse {
  _id: string
  user: IUser
  accepted: boolean
  created_date: string
}

const useStyles = createUseStyles({
  root: {
    width: '80%',
    height: 'auto',
    margin: '0 auto',
    padding: 0,
    display: 'flex',
    flexBasis: 'max-content',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

function PanelCategoryPage() {
  const styles = useStyles()

  const [{ response, isLoading, isError }] = useFetch<
    Array<ISellerRequestResponse>
  >({
    method: 'GET',
    path: '/panel/seller-requests/get',
  })

  const [open, setOpen] = useState({
    open: false,
    id: '',
    userId: '',
  })

  const [openModalDelete, setOpenModalDelete] = useState({
    open: false,
    id: '',
  })

  function toggleModal(id: string, userId: string) {
    setOpen({
      open: !open.open,
      id: id,
      userId: userId,
    })
  }

  function toggleModalDelete(id: string) {
    setOpenModalDelete({
      open: !openModalDelete.open,
      id: id,
    })
  }

  function closeModal(id: string, userId: string) {
    setOpen({
      open: false,
      id: id,
      userId: userId,
    })
  }

  function closeModalDelete(id: string) {
    setOpenModalDelete({
      open: false,
      id: id,
    })
  }

  const { isActive, data: snackbarData, openSnackbar } = useSnackbar()

  return (
    <PageBase>
      <div className={styles.root}>
        {!isLoading && !response?.length && <p>No data</p>}
        {!isLoading ? (
          response?.map((value, index) => {
            return (
              <Card data-id={value._id} key={value._id}>
                <CardBody>
                  <CardTitle tag="h5">{value.user.nickname}</CardTitle>
                  <Button
                    className="btn-danger"
                    onClick={(e) => toggleModalDelete(value._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn-success"
                    onClick={(e) => toggleModal(value._id, value.user._id)}
                  >
                    Accept
                  </Button>
                </CardBody>
              </Card>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <AcceptSellerRequestModal
        open={open.open}
        closeModal={closeModal}
        toggle={toggleModal}
        toggleSnackbar={openSnackbar}
        id={open.id}
        userId={open.userId}
      />
      <DeleteSellerRequestModal
        open={openModalDelete.open}
        closeModal={closeModalDelete}
        toggle={toggleModalDelete}
        toggleSnackbar={openSnackbar}
        id={openModalDelete.id}
      />
      <Snackbar
        isActive={isActive}
        message={snackbarData.message}
        title={snackbarData.title}
        type={snackbarData.type as any}
      />
    </PageBase>
  )
}

export default PanelCategoryPage
