import React from 'react'
import AboutContactForm from '../components/AboutContactForm'
import AboutMission from '../components/AboutMission'
import AboutUsBanner from '../components/AboutUsBanner'
import AboutUsParagraph from '../components/AboutUsParagraph'
// import BodySection from '../components/BodySection'
import Facts from '../components/Facts'
// import Founder from '../components/Founder'
// import Footer from '../components/inc/Footer'
// import Header from '../components/inc/Header'
import Header from '../components/Navbar'

function AboutUsPage() {
  return (
    <>
        <Header/>
        <AboutUsBanner/>
        <AboutUsParagraph/>
        <Facts/>
        <AboutMission/>
        {/* <Founder/> */}
        <AboutContactForm/>
        {/* <BodySection/> */}
        {/* <Footer/> */}
    </>
  )
}

export default AboutUsPage