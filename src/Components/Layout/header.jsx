import { useNavigate } from "react-router-dom";
import { Avatar, Link, IconButton } from "@chakra-ui/react";
import { MdOutlineLogout } from "react-icons/md";
import MobileMenu from "./mobile-menu";

import { useAuth } from "../../Hooks/useAuth";

const nav_before_items = [
  { link: "/signin", content: "Sign in" },
  { link: "/signup", content: "Sign Up" },
];

const nav_after_items = [
  { link: "/test", content: "Test" },
  { link: "/problem", content: "Problems" },
];

const AuthNav = ({ isAuth, name, tryLogout }) =>
  !isAuth ? (
    <nav className="hidden md:flex md:grow">
      {/* Desktop sign in links */}
      <ul className="flex grow justify-end flex-wrap items-center">
        <li>
          <Link
            href="/signin"
            className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
          >
            Sign in
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="btn-sm text-white hover:bg-blue-700 ml-3"
          >
            Sign up
          </Link>
        </li>
      </ul>
    </nav>
  ) : (
    <nav className="hidden md:flex md:grow">
      <ul className="flex grow justify-end flex-wrap items-center">
        {nav_after_items.map((item, i) => (
          <li key={i} className={"hover:no-underline"}>
            <Link
              href={item.link}
              className="btn-sm text-white hover:bg-blue-700 ml-3 "
            >
              {item.content}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/" className="btn-sm text-white ml-3">
            <Avatar name={name} />
          </Link>
        </li>
        <li>
          <IconButton
            as={"a"}
            fontSize={"30px"}
            variant={"link"}
            onClick={tryLogout}
            cursor={"pointer"}
            fontWeight={400}
          >
            <MdOutlineLogout />
          </IconButton>
        </li>
      </ul>
    </nav>
  );

export default function Header() {
  const { isAuthenticated, currentUser, logout, isAdmin } = useAuth();

  const tryLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const navigate = useNavigate();
  const nav_items = isAuthenticated ? nav_after_items : nav_before_items;

  return (
    <header className="absolute w-full z-30 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link
              href="/"
              className="flex-row justify-center"
              aria-label="Cruip"
            >
              <svg
                className="w-8 h-8 fill-current text-purple-600 mx-auto"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c1.634.017 3.21.28 4.692.751 3.487 3.114 6.846 6.398 10.163 9.737.493 1.346.811 2.776.926 4.262zm-1.388 7.883c-2.496-2.597-5.051-5.12-7.737-7.471-3.706-3.246-10.693-9.81-15.736-7.418-4.552 2.158-4.717 10.543-4.96 16.238A15.926 15.926 0 010 16C0 9.799 3.528 4.421 8.686 1.766c1.82.593 3.593 1.675 5.038 2.587 6.569 4.14 12.29 9.71 17.792 15.57-.237.94-.557 1.846-.952 2.711zm-4.505 5.81a56.161 56.161 0 00-1.007-.823c-2.574-2.054-6.087-4.805-9.394-4.044-3.022.695-4.264 4.267-4.97 7.52a15.945 15.945 0 01-3.665-1.85c.366-3.242.89-6.675 2.405-9.364 2.315-4.107 6.287-3.072 9.613-1.132 3.36 1.96 6.417 4.572 9.313 7.417a16.097 16.097 0 01-2.295 2.275z" />
              </svg>
              Protexspire
            </Link>
          </div>
          {/* Desktop navigation */}
          <AuthNav
            isAuth={isAuthenticated}
            name={currentUser}
            tryLogout={tryLogout}
          />
          <MobileMenu navitems={nav_items} />
        </div>
      </div>
    </header>
  );
}
