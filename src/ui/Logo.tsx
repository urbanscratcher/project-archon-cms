import mainLogo from '../assets/archon-logo.png';

function Logo() {
  console.log('Rendering...');
  return (
    <div className="flex w-full items-center justify-center gap-1 text-navy-700">
      <span className="icon-[lucide--landmark] h-10 w-10"></span>
      <img
        src={mainLogo}
        className="w-40 object-contain"
        alt="logo"
      />
    </div>
  );
}

export default Logo;
