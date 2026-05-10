import { useEffect, useState } from 'react'

import ProjectCard from '../../components/cards/ProjectCard'

import { getAllProjects } from '../../services/projectService'

function ProjectsPage() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      const data = await getAllProjects()

      setProjects(data)
    }

    loadProjects()
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

      <div className="grid grid-cols-3 gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage