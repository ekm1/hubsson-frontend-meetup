import React from 'react'

function SideNav() {
  return (
    <div className="w-64 flex-shrink-0 bg-teal-500">
      <a href="#">
        <div className="flex h-16 items-center bg-teal-500 px-4 text-xl font-medium text-white">
          <div className="ml-2 py-2">Migel Hoxha</div>
        </div>
      </a>
      <div>
        <div className="px-2 py-2">
          <div></div>
        </div>
        <div className="px-6 py-6 text-white">
          <a
            href="/app/"
            className="router-link-exact-active router-link-active"
          >
            Hubsson Meetup
          </a>
        </div>
        <div className="border-t border-gray-700 px-6 py-6">
          <h4 className="text-sm font-bold uppercase tracking-widest text-gray-600">
            Resources
          </h4>
          <ul className="mt-3 text-white">
            <li className="mt-3">
              <a
                href="https://doc.rust-lang.org/book/"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                Rust
              </a>
            </li>
            <li className="mt-3">
              <a
                href="https://rustwasm.github.io/docs/book/"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                RustWasm
              </a>
            </li>
            <li className="mt-3">
              <a
                href="https://webassembly.org/"
                className=""
                target="_blank"
                rel="noreferrer"
              >
                WebAssembly
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SideNav
