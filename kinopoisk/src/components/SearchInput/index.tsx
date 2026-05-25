import { useState } from "react";
import { useNavigate } from "react-router";

export function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = searchValue.trim();
    if (!trimmedValue) {
      return;
    }

    navigate(`/search/${trimmedValue}/1`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <input
        type="text"
        placeholder="Поиск фильмов..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
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
    </form>
  );
}
