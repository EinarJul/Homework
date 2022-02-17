import React from 'react'
import PageBase from '../Pages/PageBase'
import SearchSection from '../Pages/Searchbar'
import Footer from '../Pages/Footer'
import GetMoreDone from '../Pages/Getmoredone'
import Services from '../Pages/Services'
import CategoryPage from './CategoryPage'

function HomePage() {
  return (
    <PageBase>
      <SearchSection />
      <CategoryPage tiles={false} />
      <GetMoreDone />
      <Services />
      <Footer />
    </PageBase>
  )
}

export default HomePage
