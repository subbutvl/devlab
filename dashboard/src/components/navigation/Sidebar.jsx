import {
  LayoutDashboard,
  FolderKanban,
  Archive,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menu = [
  {
    label: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: FolderKanban,
  },
  {
    label: 'Archives',
    path: '/archives',
    icon: Archive,
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: Settings,
  },
]

function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 flex h-screen flex-col border-r border-neutral-200 bg-white"
      style={{
        width: 'var(--sidebar-width)',
      }}
    >
      <div className="border-b border-neutral-200 px-5 py-5">
        <h1 className="text-lg font-semibold tracking-tight">
          DevLab
        </h1>

        <p className="mt-1 text-xs text-neutral-500">
          Personal R&D Workspace
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-lg px-3 py-2 transition-all
                ${
                  isActive
                    ? 'bg-black text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }
              `
              }
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar