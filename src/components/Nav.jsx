/**
 * @file Nav.jsx
 * @module Nav
 * @description Displays a navigation menu with links to different sections like Quiz and User.
 * Uses components from '@/components/ui/navigation-menu' for styling and functionality.
 * @author Elizabeth Minty
 */

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Array of quiz components data for navigation menu.
 * Each object contains title, href, and description.
 */
const quizComponents = [
  {
    title: "All",
    href: "/quizzes",
    description: "List of all quizzes",
  },
];

/**
 * Array of user components data for navigation menu.
 * Each object contains title, href, and description.
 */
const userComponents = [
  {
    title: "Dashboard",
    href: "/user",
    description: "Find all your user information here",
  },
  {
    title: "Login",
    href: "/login",
    description: "Login here",
  },
  {
    title: "Create Account",
    href: "/register",
    description: "Create a Quiz App account",
  },
  {
    title: "Log Out",
    href: "/logout",
    description: "Log out from this account",
  },
];

const user = localStorage.getItem("userData");

/**
 * Navigation component for displaying a navigation menu.
 * @returns {JSX.Element} Navigation menu component JSX
 */
export function Nav() {
  return (
    <nav className="bg-pink-400 text-pink-500 p-4 flex justify-between items-center rounded-b-lg">
      <div className="text-2xl font-bold text-pink-700">
        <Link to="/" className="no-underline text-inherit">
          Quiz App
        </Link>
      </div>
      <NavigationMenu className="justify-center align-center">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-black hover:bg-pink-300">
              Quiz
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-pink-100 text-black p-2 rounded shadow-lg">
              <ul className="grid gap-3 md:grid-cols-1 lg:w-[300px] p-0">
                {quizComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-black hover:bg-pink-300">
              User
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-pink-100 text-black p-2 rounded shadow-lg">
              <ul className="grid gap-3 md:grid-cols-1 lg:w-[300px] p-0">
                {userComponents.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

/**
 * ListItem component for rendering individual navigation menu items.
 * @param {object} props - Component properties
 * @param {string} props.className - Additional class names for customization
 * @param {string} props.title - Title of the menu item
 * @param {string} props.children - Description or additional content of the menu item
 * @param {React.Ref<HTMLAnchorElement>} ref - Ref object for the anchor element
 * @returns {JSX.Element} ListItem component JSX
 */
const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={`text-pink-500 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-pink-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

export default Nav;
