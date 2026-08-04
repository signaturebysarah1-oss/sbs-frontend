import About from "./About"
import Courses from "./Courses"
import FAQSection from "./Faq"
import Hero from "./Hero"
import Admissions from "./Tuition"
import WhyLearn from "./Why"

const AcademyPage = () => {
  return (
    <div>
        <Hero/>
        <About/>
        <WhyLearn/>
        <Courses/>
        <Admissions/>
        <FAQSection/>
    </div>
  )
}

export default AcademyPage