import * as React from 'react'
import { createUseStyles } from 'react-jss'
import PageBase from '../../Pages/PageBase'
import useFetch from '../../../hooks/useFetch'
import { CardBody, CardTitle, CardText, Button } from 'reactstrap'
import { Card } from 'reactstrap'
import { useState } from 'react'
import { useSnackbar } from '../../../hooks/useSnackbar'
import EditCategoryModal from '../../Modals/EditCategoryModal'
import Snackbar from '../../Pages/Snackbar'
import DeleteCategoryModal from '../../Modals/DeleteCategoryModal'

export interface ICategoryData {
  name: string
  parentId: string
  slug: string
  categoryImage: string
  categoryDescription: string
  _id: string
}

interface ICategoryPage {
  tiles: boolean
  limit?: number
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
  tiles: {
    width: 100,
    height: 100,
    margin: 7,
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: 'white',
    borderRadius: '0.2rem',
    textDecoration: 'none',
    color: '#252422',
  },
  tileTitle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    '& p': {
      margin: '0 auto',
      display: 'flex',
      textAlign: 'center',
      alignItems: 'center',
    },
  },
  category: {
    width: 'auto',
    minWidth: '18rem',
    height: 'auto',
    margin: 7,
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: 'white',
    borderRadius: '0.2rem',
    textDecoration: 'none',
    color: '#252422',
  },
  categoryImage: {
    position: 'relative',
    paddingTop: '56.25%',
    width: '100%',
    height: '100%',
    '& img': {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
  },
  categoryTitle: {
    width: '100%',
    display: 'block',
    '& p': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
})

function PanelCategoryPage(props: ICategoryPage) {
  const styles = useStyles()
  const { tiles, limit } = props

  const [{ response, isLoading, isError }] = useFetch<Array<ICategoryData>>({
    path: '/panel/categories/get',
    method: 'GET',
  })

  const [open, setOpen] = useState({
    open: false,
    id: '',
  })

  const [openModalDelete, setOpenModalDelete] = useState({
    open: false,
    id: '',
  })

  function toggleModal(id: string) {
    setOpen({
      open: !open.open,
      id: id,
    })
  }

  function toggleModalDelete(id: string) {
    setOpenModalDelete({
      open: !openModalDelete.open,
      id: id,
    })
  }

  function closeModal(id: string) {
    setOpen({
      open: false,
      id: id,
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
                  <CardTitle tag="h5">{value.name}</CardTitle>
                  <CardText>{value.categoryDescription}</CardText>
                  <Button
                    className="btn-danger"
                    onClick={(e) => toggleModalDelete(value._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="btn-primary"
                    onClick={(e) => toggleModal(value._id)}
                  >
                    Edit
                  </Button>
                </CardBody>
              </Card>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <EditCategoryModal
        open={open.open}
        closeModal={closeModal}
        toggle={toggleModal}
        toggleSnackbar={openSnackbar}
        id={open.id}
      />
      <DeleteCategoryModal
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
