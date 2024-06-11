import {
  Collapse,
  Navbar as ReactNavBar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const quizComponents = [
  {
    title: "All",
    href: "/quizzes",
    description: "List of all quizzes",
  },
  {
    title: "Past",
    href: "/quizzes/old",
    description: "List of previous quizzes",
  },
  {
    title: "Current",
    href: "/quizzes/current",
    description: "List of currently open quizzes",
  },
  {
    title: "Future",
    href: "/quizzes/new",
    description: "List of soon-to-open quizzes",
  },
];

const userComponents = [
  {
    title: "Dashboard",
    href: "/user",
    description: "Find all your user information here",
  },
  {
    title: "Update Profile",
    href: "/user/update",
    description: "Update user details",
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
];

export function NavigationMenuDemo() {
  return (
    <nav className="bg-pink-400 text-pink-500 p-4 flex justify-between items-center rounded-b-lg">
      <div className="text-2xl font-bold text-pink-700">Quiz App</div>
      <NavigationMenu className="justify-center align-center">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover:text-black">
              Quiz
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-pink-100 text-black p-2 rounded shadow-lg">
              <ul className="grid gap-3 md:grid-cols-2 lg:w-[600px]">
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
            <NavigationMenuTrigger className="hover:text-black">
              User
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-pink-100 text-black p-2 rounded shadow-lg">
              <ul className="grid gap-3 md:grid-cols-2 lg:w-[600px]">
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
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/info"
              className={`${navigationMenuTriggerStyle()} text-pink-500 hover:text-black hover:bg-pink-300 no-underline`}
            >
              API Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
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
  }
);
ListItem.displayName = "ListItem";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggle = () => setIsOpen(!isOpen);

//   return (
//     <ReactNavBar
//       className="bg-pink-300 py-6"
//       expand="md"
//       style={{ width: "100%" }}
//     >
//       <NavbarBrand href="/">
//         <h3 className="text-pink-500 font-bold">Quiz App</h3>
//       </NavbarBrand>
//       <NavbarToggler onClick={toggle} />
//       <Collapse isOpen={isOpen} navbar>
//         <Nav className="ml-auto" navbar>
//           <div className="font-medium inline-flex">
//             <NavItem>
//               <NavLink href="/register">
//                 <div className="text-pink-500 hover:text-white">Register</div>
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/login">
//                 <div className="text-pink-500 hover:text-white">Login</div>
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/">
//                 <div className="text-pink-500 hover:text-white">Home</div>
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/quizzes">
//                 <div className="text-pink-500 hover:text-white">Quizzes</div>
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink href="/user">
//                 <div className="text-pink-500 hover:text-white">User</div>
//               </NavLink>
//             </NavItem>
//           </div>
//         </Nav>
//       </Collapse>
//     </ReactNavBar>
//   );
// };
export default NavigationMenuDemo;
