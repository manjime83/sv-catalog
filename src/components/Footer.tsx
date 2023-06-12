export default function Footer() {
  return (
    <footer className="font-thin text-xs text-center py-2">
      © {new Date().getFullYear()}{" "}
      <a href="https://nimbusit.us" target="_blank">
        Nimbus IT
      </a>
    </footer>
  );
}
