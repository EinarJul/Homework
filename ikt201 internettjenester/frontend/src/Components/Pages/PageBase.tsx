import React, { ReactElement, Suspense } from 'react'
import { createUseStyles } from 'react-jss'
import Footer from './Footer'

interface IPageBase {
  children?: ReactElement | Array<ReactElement>
}

const useStyles = createUseStyles({
  root: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
})

function PageBase(props: IPageBase) {
  const { children } = props
  const styles = useStyles()

  return <div className={styles.root}>{children}</div>
}

export default PageBase
