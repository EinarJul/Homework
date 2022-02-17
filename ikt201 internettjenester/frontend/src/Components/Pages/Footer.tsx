import React from 'react'
import { Link } from 'react-router-dom'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  footerContainer: {
    backgroundColor: '#EB5E28',
    padding: '-1rem 0 1rem 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Social Icons */
  socialIconLink: {
    color: '#fff',
    fontSize: '24px',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
    },
  },

  socialMedia: {
    maxWidth: '1000px',
    width: '100%',
  },

  socialMediaWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1000px',
    margin: '40px auto 0 auto',
  },

  socialIcons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '240px',
  },

  SocialLogo: {
    color: '#fff',
    justifySelf: 'start',
    marginLeft: '20px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    '&:hover': {
      textDecoration: 'none',
      color: 'white',
    },
  },

  websiteRights: {
    color: '#fff',
    marginBottom: '16px',
  },
  '@media screen and (max-width: 820px)': {
    SocialMediaWrap: {
      flexDirection: 'column',
    },
  },
})

function Footer() {
  const style = useStyles()

  return (
    <div className={style.footerContainer}>
      <section className={style.socialMedia}>
        <div className={style.socialMediaWrap}>
          <div className="footer-logo">
            <Link to="/" className={style.SocialLogo}>
              Freelancerfy
              <i className="fab fa-typo3" />
            </Link>
          </div>
          <small className={style.websiteRights}>Freelancerfy © 2020</small>
          <div className={style.socialIcons}>
            <Link
              className={style.socialIconLink}
              to="/"
              target="_blank"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f" />
            </Link>
            <Link
              className={style.socialIconLink}
              to="/"
              target="_blank"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram" />
            </Link>
            <Link
              className={style.socialIconLink}
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <i className="fab fa-youtube" />
            </Link>
            <Link
              className={style.socialIconLink}
              to="/"
              target="_blank"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter" />
            </Link>
            <Link
              className={style.socialIconLink}
              to="/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
