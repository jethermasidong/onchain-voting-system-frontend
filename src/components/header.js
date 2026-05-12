import { useEffect, useState } from "react";
import Logo from "../images/logo.jpeg";
export default function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center px-4 font-sentient">
      <header
        className={`w-full max-w-5xl transition-all duration-300 
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-lg shadow-lg border border-white/20"
            : "bg-white/50 backdrop-blur-md"
        }
        rounded-2xl px-6 py-3 flex items-center justify-between`}
      >
        <img src={Logo} alt="logo" class="w-44" />

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="/login">Home</a>
          <a onClick={handleLogout}>Logout</a>
        </nav>
      </header>
    </div>
  );
}