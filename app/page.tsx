import Nav from '../src/components/Nav/Nav'
import Hero from '../src/components/Hero/Hero'
import About from '../src/components/About/About'
import Experience from '../src/components/Experience/Experience'
import Skills from '../src/components/Skills/Skills'
import Work from '../src/components/Work/Work'
import Contact from '../src/components/Contact/Contact'
import Footer from '../src/components/Footer/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
