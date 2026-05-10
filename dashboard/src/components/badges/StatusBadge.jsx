function StatusBadge({ status }) {
  const styles = {
    active:
      'bg-green-100 text-green-700 border-green-200',

    paused:
      'bg-orange-100 text-orange-700 border-orange-200',

    archived:
      'bg-neutral-200 text-neutral-700 border-neutral-300',
  }

  return (
    <div
      className={`
        inline-flex items-center rounded-full border
        px-2 text-xs font-medium capitalize
        ${styles[status]}
      `}
    >
      {status}
    </div>
  )
}

export default StatusBadge