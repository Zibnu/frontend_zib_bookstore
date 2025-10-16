import HeroCarousel from "../../components/HeroCarousel"
import SectionBook from "./SectionBook"
import CategoryList from "../../components/CategoryList"
function Home() {
  return (
    <div>
      <HeroCarousel/>
      <CategoryList/>
      <SectionBook/>
    </div>
  )
}

export default Home