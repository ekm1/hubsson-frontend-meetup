import SideNav from '../components/SideNav'
import Dijkstra from '../components/Dijkstra/index'

const Home = () => {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="flex min-h-screen bg-gray-200">
        <SideNav />
        <Dijkstra />
      </div>
    </div>
  )
}

export default Home
