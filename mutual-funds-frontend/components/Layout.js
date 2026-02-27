import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children }){
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <Sidebar />
      {/* main content area with top navbar */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
