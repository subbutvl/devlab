function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Dashboard
      </h1>

      <p className="mt-2 text-neutral-500">
        Manage experiments, prototypes, and side projects.
      </p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Total Projects
          </p>

          <h3 className="mt-3 text-3xl font-semibold">
            0
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Active
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-green-600">
            0
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Archived
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-orange-600">
            0
          </h3>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm text-neutral-500">
            Favorites
          </p>

          <h3 className="mt-3 text-3xl font-semibold text-blue-600">
            0
          </h3>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage