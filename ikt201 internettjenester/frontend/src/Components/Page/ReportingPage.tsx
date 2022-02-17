import * as React from 'react'
import { createUseStyles } from 'react-jss'
import PageBase from '../Pages/PageBase'
import { Link } from 'react-router-dom'
import ReportingModal from '../Modals/ReportingModal'
import { Button, Toast, ToastBody } from 'reactstrap'
import { ToastHeader } from 'reactstrap'
import Snackbar from '../Pages/Snackbar'
import { useSnackbar } from '../../hooks/useSnackbar'
import useFetch from '../../hooks/useFetch'
import { REQUEST_URL } from '../../constants'
import { useEffect, useState } from 'react'
import useCurrentUser from '../../hooks/currentUser'

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
  Reportuser: {
    lineHeight: '4rem',
    padding: '1rem',
    textDecoration: 'none',
    border: '1px solid red',
  },
})

function ReportingPage() {
  const styles = useStyles()
  const [open, setOpen] = useState(false)

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
            <Button className={styles.Reportuser} onClick={toggleModal}>
              Report this user now
            </Button>
          </div>
        </div>
      </div>
      <ReportingModal
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

export default ReportingPage
