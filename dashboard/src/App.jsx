import { Routes, Route } from 'react-router-dom'

import AppLayout from './layouts/AppLayout'

import DashboardPage from './pages/dashboard/DashboardPage'
import ProjectsPage from './pages/projects/ProjectsPage'
import ArchivesPage from './pages/archives/ArchivesPage'
import SettingsPage from './pages/settings/SettingsPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/projects"
          element={<ProjectsPage />}
        />

        <Route
          path="/archives"
          element={<ArchivesPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />
      </Routes>
    </AppLayout>
  )
}

export default App