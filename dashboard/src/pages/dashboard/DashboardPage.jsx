import { useEffect, useState } from 'react'

import ProjectCard from '../../components/cards/ProjectCard'

import { getAllProjects } from '../../services/projectService'

function DashboardPage() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      const data = await getAllProjects()

      setProjects(data)
    }

    loadProjects()
  }, [])

  const activeProjects = projects.filter(
    (project) => project.status === 'active'
  )

  const archivedProjects = projects.filter(
    (project) =>
      project.status === 'archived'
  )

  const favoriteProjects = projects.filter(
    (project) => project.favorite
  )

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-neutral-500">
          Manage experiments, prototypes, and side projects.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Total Projects
          </p>

          <h3 className="mt-3 text-3xl font-semibold">
            {projects.length}
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Active
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-green-600">
            {activeProjects.length}
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Archived
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-orange-600">
            {archivedProjects.length}
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Favorites
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-blue-600">
            {favoriteProjects.length}
          </h3>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">
            Recent Projects
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage