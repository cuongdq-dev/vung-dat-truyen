import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Theme = "light" | "dark" | "system";
export function ThemeButton() {
  const toggleTheme = (newTheme: Theme) => {
    localStorage.setItem("astro-theme", newTheme);

    switch (newTheme) {
      case "dark":
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
        break;
      case "light":
        document.documentElement.setAttribute("data-theme", "light");
        document.documentElement.classList.remove("dark");
        break;

      case "system":
        const systemPref = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        if (systemPref == "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          document.documentElement.classList.remove("dark");
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toggleTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toggleTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// import { Moon, Sun } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";

// export function ThemeController() {
//   const [theme, setTheme] = useState<"light" | "dark" | null>("dark");
//   useEffect(() => {
//     const storedTheme = localStorage.getItem("theme") as
//       | "light"
//       | "dark"
//       | null;
//     const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//     const current = storedTheme || systemPref;
//     document.documentElement.classList.toggle("dark", current === "dark");
//     setTheme(current);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     document.documentElement.classList.toggle("dark", newTheme === "dark");
//     localStorage.setItem("theme", newTheme);
//     setTheme(newTheme);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end">
//           <DropdownMenuItem onClick={toggleTheme}>Light</DropdownMenuItem>
//           <DropdownMenuItem onClick={toggleTheme}>Dark</DropdownMenuItem>
//           <DropdownMenuItem onClick={toggleTheme}>System</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// }
