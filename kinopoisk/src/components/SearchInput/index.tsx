export function SearchInput() {
  return (
    <div className="w-full max-w-xl">
      <input
        type="text"
        placeholder="Поиск фильмов..."
        className="
          w-full
          px-4
          py-2
          bg-white/5
          border
          border-white/10
          rounded-lg
          text-white
          placeholder-gray-400
          outline-none
          focus:border-white/20
          transition
        "
      />
    </div>
  );
}
