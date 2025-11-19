import Link from 'next/link';

export default function Navbar() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/videos', label: 'Portfólio' },
    { href: '/contact', label: 'Orçamento' },
  ];
  
  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center absolute top-0 z-50 bg-transparent text-white">
      <Link href="/public" className="text-2xl font-bold tracking-tighter">
        RONALD<span className="text-blue-400">.FILMS</span>
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-blue-400 transition-colors text-sm uppercase tracking-widest">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}