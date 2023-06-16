'use client';

function NavBar() {

  return (
    <header>
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1 text-gray-900">
          <a href='/'>
            CS
            {/* <Image src="/BB_icon.png" alt="" width={50} height={50} /> */}
          </a>
      </div>
      <div className="hidden lg:flex lg:gap-x-20">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
        page 1
        </a>

        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          page 2
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          page 3
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          page 4
        </a>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a href="#" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700">
          Sign In / Sign Up <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  </header>
  );
}

export default NavBar;