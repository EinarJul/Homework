import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import useFetch from '../../hooks/useFetch'
import { REQUEST_URL } from '../../constants'
import { Link } from 'react-router-dom'

const useStyles = createUseStyles({
  searchContainer: {
    background:
      "url('/images/searchcontainer2.jpg') center center/cover no-repeat",
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'inset 0 0 0 1000px rgba(0, 0, 0, 0.2)',
    objectFit: 'contain',
  },
  search: {
    width: '100%',
    position: 'relative',
    display: 'flex',
  },
  searchTerm: {
    width: '100%',
    border: '3px solid #EB5E28',
    borderRight: 'none',
    padding: '5px',
    height: '44px',
    borderRadius: '5px 0 0 5px',
    outline: 'none',
    color: '#9DBFAF',
    '&:hover': {
      color: '#EB5E28',
    },
  },
  searchButton: {
    width: '40px',
    height: '44px',
    border: '1px solid #EB5E28',
    background: '#EB5E28',
    textAlign: 'center',
    color: '#fff',
    borderRadius: '0 5px 5px 0',
    cursor: ' pointer',
    fontSize: '20px',
  },
  wrap: {
    width: '50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  results: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
  },
  resultsItem: {
    display: 'flex',
    width: '100%',
    height: 50,
    borderBottom: '1px solid black',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
})

interface ISearchResponse {
  name: string
  slug: string
}

interface ISearchResults {
  open: boolean
  data: Array<ISearchResponse>
}

function SearchSection() {
  const styles = useStyles()
  const [searchField, setSearchField] = useState<string>('')
  const [searchResult, setSearchResult] = useState<ISearchResults>({
    open: false,
    data: [],
  })

  async function searchCall() {
    await fetch(REQUEST_URL + '/posts/search', {
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ search: searchField }),
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()

      if (data) {
        setSearchResult({
          open: true,
          data: data,
        })
      } else {
        setSearchResult({
          open: false,
          data: [],
        })
      }
    })
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.wrap}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchTerm}
            placeholder="Search here"
            onChange={(event) => setSearchField(event.target.value)}
          />
          <button
            type="submit"
            className={styles.searchButton}
            onClick={searchCall}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>
        {searchResult.data && (
          <div className={styles.results}>
            {searchResult.data.map((value, index) => (
              <div className={styles.resultsItem} key={index}>
                <Link to={'/post/' + value.slug}>{value?.name}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchSection
