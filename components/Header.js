export default function Header({ children }) {
  return (
    <div className="shadow-1 bg-white py-2 px-4">
      <h1 className="text-lg">{children}</h1>
    </div>
  );
}
