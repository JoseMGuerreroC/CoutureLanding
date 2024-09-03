import { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import Nav from '../Nav/Nav';
import RevealPage from "../RevealPage/RevealPage.jsx";
import GoToStore from "../GoToStore/GoToStore.jsx";
import Footer from "../Footer/Footer.jsx";
import CustomCursor from '../CustomCursor/CustomCursor.jsx';
import GoUp from "../GoUp/GoUp.jsx";
import GoToDrops from "../GoToDrops/GoToDrops.jsx";
import Gallery from "../Gallery/Gallery.jsx";


function Main() {

  const [playedAnimation, setPlayedAnimation] = useState(sessionStorage.getItem('played'))

  useEffect(() => {
    if (!playedAnimation) {
      gsap.timeline()
      .to(window, {
        scrollTo: 0,
        duration: 0.5,
      })
      .to('body', {
        overflowY: 'hidden',
      }, '<')
      sessionStorage.setItem('played', true)
    } 
  }, [])

  return (
    <>
      <GoUp></GoUp>
      <CustomCursor></CustomCursor>
      <RevealPage></RevealPage>
      <Nav></Nav>
      <Hero></Hero>
      <GoToDrops></GoToDrops>
      <Gallery></Gallery>
      <GoToStore></GoToStore>
      <Footer></Footer>
    </>
  )
}

export default Main;