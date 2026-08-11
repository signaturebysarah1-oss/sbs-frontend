import About from "./About"
import AcademyRegistration from "./Contact"
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
        <Courses/>
        <WhyLearn/>
        <Admissions/>
        <FAQSection/>
        <AcademyRegistration/>
    </div>
  )
}

export default AcademyPage