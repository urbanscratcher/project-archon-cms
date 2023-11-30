import { PropsWithChildren } from 'react';
import useSignOut from '../features/authentication/useSignOut';
import Button from './button/Button';

export default function PersonalMenu() {
  const onSignOut = useSignOut();

  return (
    <PersonalMenu.Container>
      <Button
        buttonType="borderless"
        size="icon"
        onClick={() => {
          console.log('drak mode toggle');
        }}
      >
        <span className="icon-[lucide--moon]" />
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
