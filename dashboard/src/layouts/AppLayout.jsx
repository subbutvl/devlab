import Sidebar from '../components/navigation/Sidebar'
import Topbar from '../components/navigation/Topbar'

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div
        className="flex flex-1 flex-col"
        style={{
          marginLeft: 'var(--sidebar-width)',
        }}
      >
        <Topbar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout