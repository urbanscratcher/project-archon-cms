import { ReactNode } from 'react';

function MainNav(): ReactNode {
  return (
    <nav>
      <ul className="flex flex-col gap-3">
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
        <li>menu4</li>
      </ul>
    </nav>
  );
}

export default MainNav;
