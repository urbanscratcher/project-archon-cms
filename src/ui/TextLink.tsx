import { useContext, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { DisplayContext } from '../DisplayContext';

type TextLinkProps = {
  to: string;
  children: ReactNode;
};

function TextLink({ to, children }: TextLinkProps) {
  const { darkMode } = useContext(DisplayContext);
  return (
    <NavLink
      className={`underline underline-offset-4 ${darkMode ? 'hover:text-zinc-200' : 'hover:text-zinc-800'}`}
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default TextLink;
