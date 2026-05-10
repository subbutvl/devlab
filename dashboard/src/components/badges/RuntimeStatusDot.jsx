function RuntimeStatusDot({
  status,
}) {
  const colors = {
    running: 'bg-green-500',

    stopped: 'bg-neutral-300',

    error: 'bg-red-500',
  }

  return (
    <div
      className={`
        h-2.5 w-2.5 rounded-full
        ${
          colors[status] ||
          colors.stopped
        }
      `}
    />
  )
}

export default RuntimeStatusDot