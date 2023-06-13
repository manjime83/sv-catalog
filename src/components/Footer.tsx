export default function Footer() {
  return (
    <footer className="py-2 text-center text-xs font-thin">
      © {new Date().getFullYear()}{" "}
      <a href="https://nimbusit.us" target="_blank">
        Nimbus IT
      </a>
    </footer>
  );
}
