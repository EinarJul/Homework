import React from 'react'

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  '*, *:before, *:after ': {
    WebkitBoxSizing: 'inherit',
    MozBoxSizing: 'inherit',
    boxSizing: 'inherit',
  },
  html: {
    WebkitBoxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: "'Open Sans', sans-serif",
    margin: '0',
    background: '#fff',
    color: '#999',
  },
  a: {
    textDecoration: 'none',
    margin: '1rem 0',
    fontWeight: '600',
    textTransform: 'uppercase',
    fontSize: '0.8125rem',
    letterSpacing: '1px',
  },
  p: {
    fontSize: '0.9rem',
    margin: '1rem 0',
    lineHeight: '1.5',
  },
  section: {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '30px',
  },
  h3: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#333',
    fontSize: '1.825rem',
    margin: '1.3rem 0',
  },
  section_lead: {
    maxWidth: '600px,',
    margin: '1rem auto 1.5rem,',
  },
  'service a': {
    color: '#EB5E28',
    display: 'block',
  },
  'service h4': {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#EB5E28',
    fontSize: '1.3rem',
    margin: '1rem 0 0.6rem',
  },
  services_grid: {
    display: 'flex',
    WebkitBoxAlign: 'center',
    alignItems: 'center',
  },
  service: {
    background: '#fff',
    margin: '20px',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center',
    WebkitBoxFlex: '1',
    flex: '1',
    display: '-webkit-box, flex',
    flexWrap: 'wrap',
    border: '2px solid #e7e7e7',
    WebkitTransition: 'all 0.3s ease',
    MozTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    '&:hover': {
      WebkitBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.08)',
      MozBoxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      boxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
    },
  },
  'service i': {
    fontSize: '3.45rem',
    margin: '1rem 0',
  },
  service1_h4: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#EB5E28',
    fontSize: '1.3rem',
    margin: '1rem 0 0.6rem',
  },
  service2_h4: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#403d39',
    fontSize: '1.3rem',
    margin: '1rem 0 0.6rem',
  },
  service3_h4: {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: '600',
    color: '#EB5E28',
    fontSize: '1.3rem',
    margin: '1rem 0 0.6rem',
  },
  service1__cta: { color: '#EB5E28' },
  service1: {
    background: '#fff',
    margin: '20px',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center',
    WebkitBoxFlex: '1',
    flex: '1',
    display: '-webkit-box, flex',
    flexWrap: 'wrap',
    border: '2px solid #e7e7e7',
    WebkitTransition: 'all 0.3s ease',
    MozTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    '&:hover': {
      WebkitBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.08)',
      MozBoxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      boxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      border: '2px solid #EB5E28',
    },
  },
  'service2 cta': {
    color: '#403d39',
  },
  service2: {
    background: '#fff',
    margin: '20px',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center',
    WebkitBoxFlex: '1',
    flex: '1',
    display: '-webkit-box, flex',
    flexWrap: 'wrap',
    border: '2px solid #e7e7e7',
    WebkitTransition: 'all 0.3s ease',
    MozTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    '&:hover': {
      WebkitBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.08)',
      MozBoxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      boxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      border: '2px solid #403d39',
    },
  },
  'service3 cta': {
    color: '#EB5E28',
  },
  service3: {
    background: '#fff',
    margin: '20px',
    padding: '20px',
    borderRadius: '4px',
    textAlign: 'center',
    WebkitBoxFlex: '1',
    flex: '1',
    display: '-webkit-box, flex',
    flexWrap: 'wrap',
    border: '2px solid #e7e7e7',
    WebkitTransition: 'all 0.3s ease',
    MozTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
    '&:hover': {
      WebkitBoxShadow: '0 5px 10px rgba(0, 0, 0, 0.08)',
      MozBoxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      boxShadow: ' 0 5px 10px rgba(0, 0, 0, 0.08)',
      border: '2px solid #EB5E28',
    },
  },
  service__cta_span: { fontSize: '0.6rem,' },
  'service > *': {
    flex: '1 1 100%',
  },
  service__cta: { alignSelf: 'flex-end,' },
  '@media all and (max-width: 900px)': {
    services_grid: {
      display: '-webkit-box, flex',
      WbkitBoxOrient: 'vertical',
      WebkitBoxDirection: 'normal',
      flexDirection: 'column',
    },
  },
})

function BecomeFreelancerMotivational() {
  const style = useStyles()

  return (
    <section className={style.section}>
      <h3>Get More Done with Freelancerfy!</h3>
      <p className={style.section_lead}>Find clients with Freelancerfy</p>
      <div className={style.services_grid}>
        <div className={style.service1}>
          <h4 className={style.service1_h4}>
            You don`t need to do it all yourself
          </h4>
          <p>
            Spend some time on what you do best, and start getting more done
          </p>
        </div>

        <div className={style.service2}>
          <h4 className={style.service2_h4}>
            Get hired and earn money by simply using your skills
          </h4>
          <p>There is a need for great and skilled workers everywhere!</p>
        </div>

        <div className={style.service3}>
          <h4 className={style.service3_h4}>Build your portfolio and grow</h4>
          <p>Future employers are always looking for the right people</p>
        </div>
      </div>
    </section>
  )
}

export default BecomeFreelancerMotivational
