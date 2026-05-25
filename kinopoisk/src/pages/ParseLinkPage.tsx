import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FormField } from "../components/FormField";

export function ParseLinkPage(): React.ReactElement {
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.includes("activate")) return;

    const parts = link.split("activate");
    const path = "/auth/activate" + parts[1];

    navigate(path);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-neutral-900/80 border border-white/10 rounded-xl p-6 shadow-xl backdrop-blur-sm">

        <h1 className="text-2xl font-semibold text-center text-gray-200 mb-6">
          Вставьте ссылку активации
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            id="activationLink"
            type="text"
            value={link}
            onChange={handleChange}
            placeholder="https://studapi.teachmeskills.by/auth/users/activation/?uid=...&token=..."
            className="w-full px-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Перейти
          </button>
        </form>

      </div>
    </div>
  );
}
