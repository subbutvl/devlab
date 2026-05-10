import { Search } from 'lucide-react'

function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-base font-semibold">
            Workspace
          </h2>
        </div>

        <div className="relative w-[320px]">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />

          <input
            type="text"
            placeholder="Search projects..."
            className="
              w-full rounded-lg border border-neutral-200
              bg-white py-2 pl-9 pr-4 outline-none
              transition-all
              focus:border-black
            "
          />
        </div>
      </div>
    </header>
  )
}

export default Topbar