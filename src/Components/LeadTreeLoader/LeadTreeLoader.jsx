// LeadTreeLoader.jsx
export default function LeadTreeLoader() {
  return (
    <div className="flex items-center gap-2">
      {/* Animated Leaf Icon */}
      <div className="w-5 h-5">
        <svg
          className="animate-bounce"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="#16a34a"
        >
          <path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9c0-.7-.1-1.4-.3-2-3 2-7-1-7-5 0-.3 0-.7.1-1C13.1 2.4 12.6 2 12 2z" />
        </svg>
      </div>

      {/* Brand Name */}
      <span className="font-semibold text-green-600 animate-pulse">
        LeadTree
      </span>
    </div>
  );
}
