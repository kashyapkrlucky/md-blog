"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Avatar from "./Avatar";

export default function NavHeader() {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 p-6">
      <div className="mx-auto max-w-7xl flex justify-between lg:h-16 items-center">
        {/* <div className="w-full flex flex-col lg:flex-row justify-between"> */}
        <div className="lg:w-1/5 flex flex-row lg:flex-row items-center">
          <Link href="/" className="text-xl font-bold text-white">
            WriterBase
          </Link>
        </div>
        <div className="lg:w-4/5 flex flex-row lg:flex-row gap-2 justify-between items-center lg:pr-0">
          {session && <Link href="/dashboard" className="text-lg"></Link>}
          {!session ? (
            <div className="flex flex-row gap-8 justify-end w-full">
              <Link href="/login" className="text-gray-100">
                Sign In
              </Link>
              <Link href="/register" className="text-gray-100">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-4 items-center">
              <Avatar user={session?.user} size="sm" />
              <span className="text-sm text-white">
                {session.user?.name || session.user?.email}
              </span>
              <button
                className="text-sm px-3 py-1 bg-red-500 text-white rounded-md cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
            // <Menu as="div" className="relative ml-3">
            //   <div>
            //     <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-300">
            //       <span className="absolute -inset-1.5" />
            //       <span className="sr-only">Open user menu</span>
            //       <div className="bg-white rounded-full h-10">
            //         <Avatar user={user} />
            //       </div>
            //     </MenuButton>
            //   </div>
            //   <MenuItems
            //     transition
            //     className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
            //   >
            //     {navigation.map((item) => (
            //       <MenuItem key={item.name}>
            //         <a
            //           href={item.href}
            //           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            //         >
            //           {item.name}
            //         </a>
            //       </MenuItem>
            //     ))}
            //     <MenuItem>
            //       <button
            //         className="w-full text-sm px-4 py-2 text-left"
            //         onClick={onLogout}
            //       >
            //         Logout
            //       </button>
            //     </MenuItem>
            //   </MenuItems>
            // </Menu>
          )}
        </div>
        {/* </div> */}
      </div>
    </header>
  );
}
