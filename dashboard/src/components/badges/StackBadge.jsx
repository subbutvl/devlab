function StackBadge({ label }) {
  return (
    <div
      className="
        rounded-md border border-neutral-200
        bg-neutral-100 px-2 py-1
        text-xs font-medium text-neutral-700
      "
    >
      {label}
    </div>
  )
}

export default StackBadge