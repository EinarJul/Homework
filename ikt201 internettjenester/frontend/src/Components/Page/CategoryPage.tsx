import * as React from 'react'
import { createUseStyles } from 'react-jss'
import { IMAGE_NOT_FOUND, REQUEST_URL } from '../../constants'
import { Link } from 'react-router-dom'
import PageBase from '../Pages/PageBase'
import useFetch from '../../hooks/useFetch'

export interface ICategoryData {
  name: string
  parentId: string
  slug: string
  categoryImage: string
  categoryDescription: string
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
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    '&:hover': {
      width: 'auto',
      minWidth: '18rem',
      height: 'auto',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    },
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

function CategoryPage(props: ICategoryPage) {
  const styles = useStyles()
  const { tiles, limit } = props

  const [{ response, isLoading, isError }] = useFetch<Array<ICategoryData>>({
    path: '/categories/get',
    method: 'POST',
  })

  return (
    <PageBase>
      <div className={styles.root}>
        {!isLoading && !response?.length && <p>No data</p>}
        {!isLoading ? (
          response?.map((value, index) => {
            return (
              <Link
                to={'/category/' + value.slug}
                key={value.parentId + index}
                className={tiles ? styles.tiles : styles.category}
              >
                {!tiles && (
                  <div className={styles.categoryImage}>
                    <img
                      src={
                        value.categoryImage
                          ? value.categoryImage
                          : IMAGE_NOT_FOUND
                      }
                      alt={'Post image'}
                    />
                  </div>
                )}
                <div
                  className={tiles ? styles.tileTitle : styles.categoryTitle}
                >
                  <p>{value.name}</p>
                </div>
              </Link>
            )
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </PageBase>
  )
}

export default CategoryPage
