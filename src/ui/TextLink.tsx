import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type TextLinkProps = {
  to: string;
  children: ReactNode;
};

function TextLink({ to, children }: TextLinkProps) {
  return (
    <NavLink
      className="underline underline-offset-4 hover:text-zinc-800"
      to={to}
    >
      {children}
    </NavLink>
  );
}

export default TextLink;
