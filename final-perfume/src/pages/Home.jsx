import Hero from '../components/Hero'
import MarqueeStrip from '../components/home/MarqueeStrip'
import Bestsellers from '../components/home/Bestsellers'
import ShopByCategory from '../components/home/ShopByCategory'
import ScentFinder from '../components/home/ScentFinder'
import NilueferWay from '../components/home/NilueferWay'
import JoinList from '../components/home/JoinList'

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <Bestsellers />
      <ShopByCategory />
      <ScentFinder />
      <NilueferWay />
      <JoinList />
    </>
  )
}
