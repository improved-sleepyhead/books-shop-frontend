interface Section {
  id: string;
  title: string;
}

interface NavbarProps {
  sections: Section[];
}

export const Navbar = ({ sections }: NavbarProps) => {
  return (
    <aside className="hidden md:block w-64 border-r px-6 py-12 sticky top-0 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Содержание</h2>
      <nav className="space-y-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="block text-sm text-neutral-700 hover:text-custom-pink transition"
          >
            {section.title}
          </a>
        ))}
      </nav>
    </aside>
  );
};