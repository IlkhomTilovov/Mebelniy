import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-5 py-5 lg:px-8">
        <LanguageSwitcher variant="overlay" />
      </div>
    </header>
  );
}
