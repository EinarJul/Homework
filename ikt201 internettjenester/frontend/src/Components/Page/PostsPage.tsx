import * as React from 'react'
import { createUseStyles } from 'react-jss'
import { DEFAULT_USER_IMAGE, IMAGE_NOT_FOUND } from '../../constants'
import PageBase from '../Pages/PageBase'
import { Link, RouteComponentProps } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import useCurrentUser from '../../hooks/currentUser'
import { Button } from 'reactstrap'
import { useState } from 'react'
import { useSnackbar } from '../../hooks/useSnackbar'
import Snackbar from '../Pages/Snackbar'
import CreateNewPostModal from '../Modals/CreateNewPostModal'

type TParams = { id?: string | undefined; slug?: string | undefined }

interface IPost extends RouteComponentProps<TParams> {
  categoryId: string
  categoryName: string
  categoryData: Array<{
    name: string
    description: string
    slug: string
    image: string
    user: {
      _id: string
      name: string
      lastname: string
      image: string
    } | null
  }>
}

const useStyles = createUseStyles({
  root: {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    padding: 0,
    display: 'flex',
    flexBasis: 'max-content',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  post: {
    width: 'auto',
    minWidth: '18rem',
    height: 'auto',
    margin: 7,
    display: 'flex',
    flexFlow: 'column',
    backgroundColor: 'white',
    border: '1px solid #403D39',
    borderRadius: '0.2rem',
    textDecoration: 'none',
    color: '#252422',
  },
  postHeader: {
    width: '100%',
    display: 'flex',
    padding: 0,
    '& p': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
      alignSelf: 'center',
    },
    '& img': {
      width: '2rem',
      height: '2rem',
      backgroundColor: 'gray',
      borderRadius: '1rem',
      alignSelf: 'center',
      marginLeft: '1rem',
      marginRight: '0rem',
    },
  },
  postImage: {
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
  postTitle: {
    width: '100%',
    display: 'block',
    borderBottom: '1px solid #403D39',
    '& p': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  postDescription: {
    width: '100%',
    display: 'block',
    '& p': {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  categoryHeader: {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    marginTop: '2rem',
    marginBottom: '2rem',
    '& h1': {},
  },
  categorySubHeader: {
    width: '100%',
    height: '4rem',
    margin: '0 auto',
    marginTop: '2rem',
  },
  button: {},
})

function PostsPage(props: IPost) {
  const styles = useStyles()
  const { match } = props
  const slug = match.params.slug ? match.params.slug : null

  const {
    data: currentUser,
    isError: errorCurrentUser,
    isLoading: isLoadingrCurrentUser,
  } = useCurrentUser()

  const [{ response, isLoading, isError }] = useFetch<IPost>({
    path: '/posts/all?slug=' + slug,
    method: 'GET',
  })

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
      <div className={styles.categoryHeader}>
        <h1>{response?.categoryName}</h1>
        <div className={styles.categorySubHeader}>
          {currentUser && currentUser.account_type === 'seller' ? (
            <Button onClick={toggleModal}>Add new post</Button>
          ) : (
            <Link className={styles.button} to={'/become-a-seller'}>
              Become a seller
            </Link>
          )}
        </div>
      </div>
      <div className={styles.root}>
        {!isLoading && !isError ? (
          response?.categoryData[0].name ? (
            response?.categoryData.map((value, index) => {
              return (
                <Link
                  to={'/post/' + value.slug}
                  key={index}
                  className={styles.post}
                >
                  <div className={styles.postHeader}>
                    {value.user && value.user.image ? (
                      <img src={value.user.image} alt={'Profile image'} />
                    ) : (
                      <img src={DEFAULT_USER_IMAGE} alt={'Profile image'} />
                    )}
                    <p>
                      {value.user &&
                        value.user.name + ' ' + value.user.lastname}
                    </p>
                  </div>
                  <div className={styles.postImage}>
                    <img
                      src={value.image ? value.image : IMAGE_NOT_FOUND}
                      alt={'Post image'}
                    />
                  </div>
                  <div className={styles.postTitle}>
                    <p>{value.name}</p>
                  </div>
                  <div className={styles.postDescription}>
                    <p>{value.description}</p>
                  </div>
                </Link>
              )
            })
          ) : (
            <p>No data</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CreateNewPostModal
        open={open}
        closeModal={closeModal}
        toggle={toggleModal}
        toggleSnackbar={openSnackbar}
        categoryName={response?.categoryName!!}
        categoryId={response?.categoryId!!}
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

export default PostsPage
