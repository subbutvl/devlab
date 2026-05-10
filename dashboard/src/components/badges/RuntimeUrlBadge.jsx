import {
  Copy,
  ExternalLink,
} from 'lucide-react'

function RuntimeUrlBadge({
  runtimeStatus,
  runtimeUrl,
}) {
  if (
    runtimeStatus !== 'running' ||
    !runtimeUrl
  ) {
    return null
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(
      runtimeUrl
    )
  }

  function handleOpen() {
    window.open(
      runtimeUrl,
      '_blank'
    )
  }

  return (
    <div
      className="
        mt-4 flex items-center
        justify-between rounded-lg
        border border-neutral-200
        bg-neutral-50 px-3 py-2
      "
    >
      <p
        className="
          truncate text-xs
          font-medium text-neutral-700
        "
      >
        {runtimeUrl}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={handleCopy}
          className="
            rounded-md p-1.5
            transition-all
            hover:bg-neutral-200
          "
        >
          <Copy size={14} />
        </button>

        <button
          onClick={handleOpen}
          className="
            rounded-md p-1.5
            transition-all
            hover:bg-neutral-200
          "
        >
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  )
}

export default RuntimeUrlBadge