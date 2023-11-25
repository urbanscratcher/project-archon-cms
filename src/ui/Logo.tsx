import mainLogo from '../assets/archon-logo.png';

function Logo() {
  console.log('Rendering...');
  return (
    <div className="flex w-full items-end justify-center">
      <img
        src={mainLogo}
        className="object-contain brightness-150 grayscale"
        alt="logo"
      />
      <p className="rounded-full bg-zinc-600/80 px-3 text-navy-50">cms</p>
    </div>
  );
}

export default Logo;
