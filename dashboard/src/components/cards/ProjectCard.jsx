import {
  FolderKanban,
  Star,
  Play,
  ExternalLink,
} from 'lucide-react'

import StatusBadge from '../badges/StatusBadge'
import StackBadge from '../badges/StackBadge'

function ProjectCard({ project }) {
  return (
    <div
      className="
        group rounded-lg border border-neutral-200
        bg-white p-5 transition-all
        hover:border-neutral-300
        hover:shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl bg-neutral-100
            "
          >
            <FolderKanban size={20} />
          </div>

          <div>
            <div className="flex items-center gap-3">
                <h3 className="font-semibold tracking-tight">
                {project.title}
                </h3>

                <StatusBadge className="ms-auto" status={project.status} />
            </div>

            <div className="flex items-center gap-3">
                <p className="text-sm text-neutral-700">
                    {project.category}
                </p>

                <div className="text-sm text-neutral-300">
                    {project.lastOpened}
                </div>
            </div>
          </div>
        </div>

        {project.favorite && (
          <Star
            size={16}
            className="fill-black text-black"
          />
        )}
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-neutral-600">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <StackBadge
            key={item}
            label={item}
          />
        ))}
      </div>

      {/* <div className="mt-5 flex items-center justify-between">
        <StatusBadge status={project.status} />

        <div className="text-xs text-neutral-500">
          {project.lastOpened}
        </div>
      </div> */}

      <div className="mt-5 flex items-center gap-2">
        <button
          className="
            flex flex-1 items-center justify-center gap-2
            rounded-lg bg-black px-4 py-2.5
            text-sm font-medium text-white
            transition-all hover:opacity-90
          "
        >
          <Play size={16} />

          Run
        </button>

        <button
          className="
            flex items-center justify-center
            rounded-lg border border-neutral-200
            px-4 py-2.5 transition-all
            hover:bg-neutral-100
          "
        >
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  )
}

export default ProjectCard