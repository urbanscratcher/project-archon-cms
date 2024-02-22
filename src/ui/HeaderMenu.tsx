import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DisplayContext } from '../DisplayContext';
import useSignOut from '../features/authentication/useSignOut';
import Button from './button/Button';

export default function PersonalMenu() {
  const onSignOut = useSignOut();
  const navigate = useNavigate();
  const { setDarkMode, getDarkMode } = useContext(DisplayContext);

  return (
    <PersonalMenu.Container>
      <Button
        buttonType="borderless"
        size="icon"
        onClick={() => navigate('/new-insight')}
      >
        <span className="icon-[lucide--pencil]" />
      </Button>
      <Button
        buttonType="borderless"
        size="icon"
        onClick={() => setDarkMode(getDarkMode())}
      >
        <span className={`${getDarkMode() ? 'icon-[lucide--sun]' : 'icon-[lucide--moon]'}`} />
      </Button>
      <Button
        buttonType="borderless"
        size="icon"
        onClick={onSignOut}
      >
        <span className="icon-[lucide--log-out]" />
      </Button>
    </PersonalMenu.Container>
  );
}

PersonalMenu.Container = function Container({ children }: PropsWithChildren) {
  return <nav className="flex scale-125">{children}</nav>;
};
