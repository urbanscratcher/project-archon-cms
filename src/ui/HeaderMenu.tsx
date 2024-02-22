import { PropsWithChildren, useContext, useState } from 'react';
import useSignOut from '../features/authentication/useSignOut';
import Button from './button/Button';
import { useNavigate } from 'react-router-dom';
import { DisplayContext } from '../DisplayContext';

export default function PersonalMenu() {
  const onSignOut = useSignOut();
  const navigate = useNavigate();
  const ctx = useContext(DisplayContext);
  const [darkMode, setDarkMode] = useState(ctx.darkMode);

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
        onClick={() => {
          localStorage.setItem('dark_mode', darkMode === true ? '0' : '1');

          const root = document.documentElement;
          if (!darkMode) {
            root.classList.add('dark');
          } else {
            root.classList.contains('dark') && root.classList.remove('dark');
          }

          setDarkMode(!darkMode);
        }}
      >
        <span className={`${darkMode ? 'icon-[lucide--sun]' : 'icon-[lucide--moon]'}`} />
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
