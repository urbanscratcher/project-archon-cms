type IconProps = {
  icon: string;
};

function Icon({ icon }: IconProps) {
  return <span className={`${icon} h-6 w-6`}></span>;
}

export default Icon;
