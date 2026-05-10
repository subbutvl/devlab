import { useEffect, useState } from 'react'

import ProjectCard from '../../components/cards/ProjectCard'

import ImportBar from '../../components/layout/ImportBar'

import {
  getAllProjects,
  getRuntimeStatuses,
} from '../../services/projectService'

function ProjectsPage() {
  const [projects, setProjects] =
    useState([])

  const [runtimeStatuses,
    setRuntimeStatuses] = useState({})


useEffect(() => {
  async function initialize() {
    const projectsData =
      await getAllProjects()

    setProjects(projectsData)

    const runtimeData =
      await getRuntimeStatuses()

    setRuntimeStatuses(runtimeData)
  }

  initialize()

  const interval = setInterval(async () => {
    const runtimeData =
      await getRuntimeStatuses()

    setRuntimeStatuses(runtimeData)
  }, 3000)

  return () => {
    clearInterval(interval)
  }
}, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <p className="mt-2 text-neutral-500">
          Browse and manage all experiments.
        </p>
      </div>

      <ImportBar
        onImported={async () => {
          const data =
            await getAllProjects()

          setProjects(data)
        }}
      />

      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
              runtimeStatus={
                runtimeStatuses[
                  project.id
                ]?.status
              }

              runtimeUrl={
                runtimeStatuses[
                  project.id
                ]?.url
              }
           onRemoved={async () => {
            const data =
              await getAllProjects()

            setProjects(data)
          }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage