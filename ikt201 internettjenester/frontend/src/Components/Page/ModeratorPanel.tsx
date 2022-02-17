import * as React from 'react'
import PageBase from '../Pages/PageBase'
import { NavbarToggler, Nav, Collapse, NavItem, Navbar } from 'reactstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  navLinks: {
    color: '#fff',
    padding: '1rem',
    '&:hover': {
      textDecoration: 'underline',
      color: 'white',
    },
    '& a': {
      color: 'white',
    },
  },
})

function ModeratorPanel() {
  const styles = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <PageBase>
      <Navbar expand="md" color="dark" dark>
        <NavbarToggler
          onClick={toggle}
          type="button"
          style={{
            border: '2px solid white',
            color: 'white',
          }}
          className="mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className={styles.navLinks}>
              <Link to="/panel/categories">Categories</Link>
            </NavItem>
            <NavItem className={styles.navLinks}>
              <Link to="/panel/seller-requests">Seller requests</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </PageBase>
  )
}

export default ModeratorPanel
