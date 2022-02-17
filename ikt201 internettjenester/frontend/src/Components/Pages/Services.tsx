import React from 'react'
import { createUseStyles } from 'react-jss'
import { Button } from 'reactstrap'

const useStyles = createUseStyles({
  servicesContainer: {
    background: '#CCC5B9',
    height: '75vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    objectFit: 'contain',
  },
  h3: {
    fontFamily: "Montserrat', sans-serif",
    fontWeight: '600',
    color: '#333',
    fontSize: '1.825rem',
    margin: '1.3rem 0',
  },
  body: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '0',
    width: '100%',
    background: '#FFF',
    fontFamily: "Noto Sans JP', sans-serif",
    fontWeight: '400',
  },
  p: {
    fontSize: '0.9rem',
    margin: '1rem 0',
    lineHeight: '1.5',
  },
  becomeSeller: {
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
  '@media all and (max-width: 900px)': {
    servicesContainer: {
      display: '-webkit-box, flex',
      WbkitBoxOrient: 'vertical',
      WebkitBoxDirection: 'normal',
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
})

function Services() {
  const style = useStyles()

  return (
    <div className={style.servicesContainer}>
      <h3 className={style.h3}>Get better exposure with our subscription!</h3>
      <p className={style.p}>
        Become a pro today, get verified and get better exposure with
        Freelancerfy Pro
      </p>
      <div>
        <div>
          <Button className={style.becomeSeller} href={'/become-a-seller'}>
            Become a Pro Now!
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Services
