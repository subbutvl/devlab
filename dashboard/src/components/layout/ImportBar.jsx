import { useState } from 'react'

import {
  FolderPlus,
} from 'lucide-react'

import {
  importProject,
} from '../../services/projectService'

function ImportBar({ onImported }) {
  const [path, setPath] = useState('')

  async function handleImport() {
    if (!path) return

    await importProject(path)

    setPath('')

    onImported()
  }

  return (
    <div className="mb-6 flex items-center gap-3  bg-white">
      <input
        type="text"
        placeholder="Paste project path..."
        value={path}
        onChange={(event) =>
          setPath(event.target.value)
        }
        className="
          flex-1 rounded-lg border
          border-neutral-200 px-4 py-2.5
          outline-none focus:border-black
        "
      />

      <button
        onClick={handleImport}
        className="
          flex items-center gap-2
          rounded-lg bg-black px-4 py-2.5
          text-white transition-all
          hover:opacity-90
        "
      >
        <FolderPlus size={16} />

        Import
      </button>
    </div>
  )
}

export default ImportBar