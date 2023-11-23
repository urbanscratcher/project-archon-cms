import mainLogo from '../assets/archon-logo.png';

function Logo() {
  console.log('Rendering...');
  return (
    <div className="mx-auto flex items-end">
      <img
        src={mainLogo}
        alt="logo"
      />
      <p className="rounded-full bg-navy-700 px-3 text-navy-50">cms</p>
    </div>
  );
}

export default Logo;
