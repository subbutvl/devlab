import {
  FolderKanban,
  Star,
  Play,
  Copy,
  ExternalLink,
} from 'lucide-react'

import {
  runProject,
} from '../../services/projectService'

import StackBadge from '../badges/StackBadge'

import RuntimeStatusDot from '../badges/RuntimeStatusDot'

import ProjectCardMenu from './ProjectCardMenu'

// import RuntimeUrlBadge from '../badges/RuntimeUrlBadge'

function ProjectCard({
  project,
  runtimeStatus,
  runtimeUrl,
  onRemoved,
}) {
  async function handleRun() {
    await runProject(project.id)
  }

  async function handleCopy() {
  if (!runtimeUrl) return

  await navigator.clipboard.writeText(
    runtimeUrl
  )
}

function handleOpen() {
  if (!runtimeUrl) return

  window.open(
    runtimeUrl,
    '_blank'
  )
}

  return (
    <div
      className="
        group rounded-2xl border border-neutral-200
        bg-white p-5 transition-all
        hover:border-neutral-300
        hover:shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl bg-neutral-100
            "
          >
            <FolderKanban size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold tracking-tight">
                {project.title}
              </h3>

              {project.favorite && (
                <Star
                  size={14}
                  className="fill-black text-black"
                />
              )}
            </div>

            <div
              className="
                mt-2 flex items-center gap-3
              "
            >
              <div className="flex items-center gap-2">
                <RuntimeStatusDot
                  status={runtimeStatus}
                />

                <p className="text-xs text-neutral-500 capitalize">
                  {runtimeStatus ||
                    'stopped'}
                </p>
              </div>

              <p className="text-xs text-neutral-400">
                •
              </p>

              <p className="text-xs text-neutral-500">
                {project.category}
              </p>

              <p className="text-xs text-neutral-400">
                •
              </p>

              <p className="text-xs text-neutral-500">
                {project.lastOpened}
              </p>
            </div>
          </div>
        </div>

        <ProjectCardMenu
          project={project}
          onRemoved={onRemoved}
        />
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
      {/* <RuntimeUrlBadge
        runtimeStatus={runtimeStatus}
        runtimeUrl={runtimeUrl}
      /> */}
      {/* <button
        onClick={handleRun}
        className="
          mt-5 flex w-full items-center
          justify-center gap-2 rounded-lg
          bg-black px-4 py-2.5
          text-sm font-medium text-white
          transition-all hover:opacity-90
        "
      >
        <Play size={16} />

        Run Project
      </button> */}


<div
  className="
    mt-5 flex items-center gap-2
  "
>
  <button
    onClick={handleRun}
    className="
      flex flex-1 items-center
      justify-center gap-2 rounded-lg
      bg-black px-4 py-2.5
      text-sm font-medium text-white
      transition-all hover:opacity-90
    "
  >
    <Play size={16} />

    Run
  </button>

  <div
    className="
      flex h-11 min-w-[76px]
      items-center justify-center
      rounded-lg border
      border-neutral-200
      bg-neutral-50 px-3
      text-sm font-medium
      text-neutral-700
    "
  >
    {runtimeUrl
      ? runtimeUrl.split(':')[2]?.replace(
          '/',
          ''
        )
      : '--'}
  </div>

  <button
    onClick={handleCopy}
    disabled={!runtimeUrl}
    className={`
      flex h-11 w-11 items-center
      justify-center rounded-lg border
      transition-all
      ${
        runtimeUrl
          ? 'border-neutral-200 hover:bg-neutral-100'
          : 'cursor-not-allowed border-neutral-100 text-neutral-300'
      }
    `}
  >
    <Copy size={16} />
  </button>

  <button
    onClick={handleOpen}
    disabled={!runtimeUrl}
    className={`
      flex h-11 w-11 items-center
      justify-center rounded-lg border
      transition-all
      ${
        runtimeUrl
          ? 'border-neutral-200 hover:bg-neutral-100'
          : 'cursor-not-allowed border-neutral-100 text-neutral-300'
      }
    `}
  >
    <ExternalLink size={16} />
  </button>
</div>

    </div>
  )
}

export default ProjectCard