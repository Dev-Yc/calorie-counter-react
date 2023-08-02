import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">Accueil</Link>
      <Link href="/history">Historique</Link>
    </div>
  );
};

export default Navbar;
