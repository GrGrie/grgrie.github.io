// Everything that shows up in the header and footer lives here.
export const site = {
  name: "Grigory Grechkin",
  description: "Grigory Grechkin — ML engineer and research assistant in computer vision.",
  // The "Sign in" button. The target is behind its own sign-in, so a visitor
  // without a session lands on that page and comes back afterwards.
  signInUrl: "https://home.grgrie.com",
  nav: [
    { href: "/", label: "About" },
    { href: "/cv/", label: "CV" },
    { href: "/research/", label: "Research" },
    { href: "/projects/", label: "Projects" },
  ],
  links: [
    { href: "mailto:gsgrechkin@gmail.com", label: "Email" },
    { href: "https://github.com/GrGrie", label: "GitHub" },
    { href: "https://www.linkedin.com/in/grigory-grechkin", label: "LinkedIn" },
    { href: "https://leetcode.com/GrGrie", label: "LeetCode" },
  ],
};
