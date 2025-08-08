export default function Breadcrumb({ active }) {
  if (active === "Dashboard") return "Home";
  return `Home / ${active}`;
}
