import React, { useState } from 'react'
import {
  Navbar as ReactStrapNavbar,
  NavbarToggler,
  Nav,
  Collapse,
  NavbarBrand,
  NavItem,
} from 'reactstrap'
import { createUseStyles } from 'react-jss'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { useGlobal } from 'reactn'
import { IGlobalStore } from '../../hooks/appContext'

const useStyles = createUseStyles({
  navbarLogo: {
    color: '#fff',
    justifySelf: 'start',
    marginLeft: '20px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
    },
  },
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

function Navbar() {
  const styles = useStyles()
  const [globalState] = useGlobal<IGlobalStore>('auth')

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <ReactStrapNavbar
      expand="md"
      style={{
        backgroundColor: '#EB5E28',
      }}
    >
      <NavbarBrand
        href="/"
        className={classNames('navbar navbar-dark', styles.navbarLogo)}
      >
        Freelancerfy
      </NavbarBrand>
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
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem className={styles.navLinks}>
            <Link to="/categories">Categories</Link>
          </NavItem>
          {globalState.isAuthenticated && globalState.isRoot && (
            <NavItem className={styles.navLinks}>
              <Link to="/panel">Panel</Link>
            </NavItem>
          )}
          {!globalState.isAuthenticated ? (
            <NavItem className={styles.navLinks}>
              <Link to="/account/login">Login</Link>
            </NavItem>
          ) : (
            <>
              <NavItem className={styles.navLinks}>
                <Link to="/account/profile">Profile</Link>
              </NavItem>
              <NavItem className={styles.navLinks}>
                <Link to="/account/logout">Logut</Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </ReactStrapNavbar>
  )
}

export default Navbar
