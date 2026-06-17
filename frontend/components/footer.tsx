import { ProLaxText } from "./pro-lax";

export function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          © {new Date().getFullYear()} Ibzie.{" "}
          <ProLaxText
            pro="Shipped with tea-fueled late nights."
            lax="Leveled up through tea-fueled late nights."
          />
        </p>
      </div>
    </footer>
  );
}
