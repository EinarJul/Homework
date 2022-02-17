import * as React from 'react'
import { createUseStyles } from 'react-jss'
import PageBase from '../Pages/PageBase'
import { Link } from 'react-router-dom'
import { ICategoryData } from './CategoryPage'
import BecomeFreelancerMotivational from '../Pages/BecomeFreelancerMotivational'
import useFetch from '../../hooks/useFetch'
import { useState } from 'react'
import BecomeAProModal from '../Modals/BecomeAProModal'
import { Button, Toast, ToastBody } from 'reactstrap'
import { ToastHeader } from 'reactstrap'
import Snackbar from '../Pages/Snackbar'
import { useSnackbar } from '../../hooks/useSnackbar'

const useStyles = createUseStyles({
  root: {},
  sectionContainer: {
    width: '100%',
    height: 500,
    display: 'flex',
  },
  containerLeft: {
    width: '50%',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
  },
  containerLeftContent: {
    alignSelf: 'center',
    width: '100%',
    height: '50%',
  },
  containerRight: {
    width: '50%',
    height: '100%',
    '& img': {
      width: '100%',
    },
  },
  becomeASeller: {
    color: '#fff',
    lineHeight: '4rem',
    padding: '1rem',
    textDecoration: 'none',
    border: '1px solid #EB5E28',
    backgroundColor: '#EB5E28',
    '&:hover': {
      background: '#252422',
    },
  },
  categories: {
    textAlign: 'center',
    display: 'block',
    width: '100%',
  },
  categoriesSection: {
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
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '&:hover': {
      width: 100,
      height: 100,
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    },
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
})

function SellerPageBase() {
  const styles = useStyles()
  const [open, setOpen] = useState(false)

  const [{ response, isLoading, isError }] = useFetch<Array<ICategoryData>>({
    path: '/categories/get',
    method: 'POST',
    body: {
      maxCount: '',
    },
  })

  function toggleModal() {
    setOpen(!open)
  }

  function closeModal() {
    setOpen(false)
  }

  const { isActive, data: snackbarData, openSnackbar } = useSnackbar()

  return (
    <PageBase>
      <div className={styles.sectionContainer}>
        <div className={styles.containerLeft}>
          <div className={styles.containerLeftContent}>
            <h1>Become a seller!</h1>
            <h3>Start growing your portfolio today!</h3>
            <p>Help people using your skills grow better!</p>
            <Button className={styles.becomeASeller} onClick={toggleModal}>
              Become a seller now!
            </Button>
          </div>
        </div>
        <div className={styles.containerRight}>
          <img
            src={process.env.PUBLIC_URL + '/images/become-a-seller-front.jpg'}
            alt={'grow'}
          />
        </div>
      </div>
      <div className={styles.categoriesSection}>
        <h3 className={styles.categories}>Explore our categories</h3>
        {!isLoading ? (
          response &&
          response.map((value, index) => {
            return (
              <Link
                to={'/category/' + value.slug}
                key={value.parentId + index}
                className={styles.tiles}
              >
                <div className={styles.tileTitle}>
                  <p>{value.name}</p>
                </div>
              </Link>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <BecomeFreelancerMotivational />
      <BecomeAProModal
        open={open}
        closeModal={closeModal}
        toggle={toggleModal}
        toggleSnackbar={openSnackbar}
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

export default SellerPageBase
