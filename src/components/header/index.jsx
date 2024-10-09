import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { NavLink } from "react-router-dom";
import { Button } from "../../shadCn/components/button";
import { Users } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../shadCn/components/tabs";
const Header = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <>
      <nav className="flex flex-col w-full  h-auto bg-background text-foreground shadow-md fixed top-0 left-0 z-20 ">
        <div className="flex justify-between px-6 py-4 ">
          <div className="text-2xl items-end font-bold flex gap-x-4">
            <Users size={32} /> <h2>UserDB</h2>
          </div>
          <div className="flex gap-x-4">
            {userLoggedIn ? (
              <Button
                onClick={() => {
                  doSignOut().then(() => {
                    navigate("/login");
                  });
                }}
                variant="outline"
                size="lg"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="">
                  <Button variant="outline" size="lg">
                    Login
                  </Button>
                </Link>

                <Link to="/register" className="">
                  <Button variant="outline" size="lg">
                    {" "}
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        {userLoggedIn && <TabNavigation />}
      </nav>
    </>
  );
};

export default Header;

const TabNavigation = () => {
  const routes = [
    { path: "/home", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/users", label: "Users" },
    { path: "/contact", label: "Contact" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <div className="flex gap-x-4 justify-center bg-secondary text-muted-foreground p-2 shadow-sm  border-primary">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive }) =>
            `px-3 py-2 rounded transition ${
              isActive
                ? "bg-accent bg-background text-primary-foreground"
                : " hover:bg-popover"
            } `
          }
        >
          {route.label}
        </NavLink>
      ))}
    </div>
  );
};
// const TabNavigation = () => {
//   const routes = [
//     { path: "/home", label: "Home" },
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/users", label: "Users" },
//     { path: "/contact", label: "Contact" },
//     { path: "/profile", label: "Profile" },
//   ];

//   return (
//     <Tabs defaultValue={routes[0].path} className="w-full">
//       <TabsList className="flex gap-x-4 justify-center bg-background text-muted-foreground p-2 border-b border-primary">
//         {routes.map((route) => (
//           <TabsTrigger
//             key={route.path}
//             value={route.path}
//             className="cursor-pointer transition-colors"
//           >
//             <NavLink
//               to={route.path}
//               className={({ isActive }) =>
//                 `px-4 py-2 rounded-md transition-colors duration-200 ${
//                   isActive
//                     ? "bg-accent text-accent-foreground"
//                     : "hover:bg-muted"
//                 }`
//               }
//             >
//               {route.label}
//             </NavLink>
//           </TabsTrigger>
//         ))}
//       </TabsList>
//       {routes.map((route) => (
//         <TabsContent key={route.path} value={route.path}>
//           {/* You can add the content for each tab here if needed */}
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// };
