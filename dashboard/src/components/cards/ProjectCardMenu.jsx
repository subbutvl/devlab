import { useState } from 'react'

import {
  MoreVertical,
  Square,
  Code2,
  FolderOpen,
  Trash2,
} from 'lucide-react'

import {
  stopProject,
  openVSCode,
  openFolder,
  removeProject,
} from '../../services/projectService'

function ProjectCardMenu({
  project,
  onRemoved,
}) {
  const [open, setOpen] =
    useState(false)

  async function handleStop() {
    await stopProject(project.id)

    setOpen(false)
  }

  async function handleCode() {
    await openVSCode(project.id)

    setOpen(false)
  }

  async function handleFolder() {
    await openFolder(project.id)

    setOpen(false)
  }

  async function handleRemove() {
    const confirmed =
      window.confirm(
        `Remove "${project.title}" from DevLab?`
      )

    if (!confirmed) return

    await removeProject(project.id)

    onRemoved?.()

    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          rounded-lg p-2
          transition-all
          hover:bg-neutral-100
        "
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div
          className="
            absolute right-0 top-11 z-50
            w-52 rounded-xl border
            border-neutral-200 bg-white
            p-2 shadow-lg
          "
        >
          <button
            onClick={handleStop}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2 text-left
              hover:bg-neutral-100
            "
          >
            <Square size={16} />

            Stop
          </button>

          <button
            onClick={handleCode}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2 text-left
              hover:bg-neutral-100
            "
          >
            <Code2 size={16} />

            Open VS Code
          </button>

          <button
            onClick={handleFolder}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2 text-left
              hover:bg-neutral-100
            "
          >
            <FolderOpen size={16} />

            Open Folder
          </button>

          <button
            onClick={handleRemove}
            className="
              flex w-full items-center gap-3
              rounded-lg px-3 py-2 text-left
              text-red-600 hover:bg-red-50
            "
          >
            <Trash2 size={16} />

            Remove
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectCardMenu