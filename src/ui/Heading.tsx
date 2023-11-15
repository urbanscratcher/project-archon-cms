import { ReactElement } from 'react';

interface HeadingProps {
  level: number;
  text: string;
}

function Heading(props: HeadingProps): ReactElement {
  const DynamicHeading = `h${props.level}` as keyof JSX.IntrinsicElements;

  const getStyle = (level: number): string => {
    switch (level) {
      case 1:
        return 'text-5xl font-semibold';
      case 2:
        return 'text-4xl font-semibold';
      case 3:
        return 'text-3xl font-medium';
      case 4:
        return 'text-2xl font-medium';
      default:
        return '';
    }
  };

  return <DynamicHeading className={`${getStyle(props.level)}`}>{props.text}</DynamicHeading>;
}

export default Heading;
