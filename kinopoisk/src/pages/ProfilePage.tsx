import React from "react";
import { useAppSelector } from "../redux/store";
import { Link } from "react-router";

export function ProfilePage(): React.ReactElement {
  const jwt = useAppSelector((state) => state.auth.jwt);
  const user = useAppSelector((state) => state.auth.AboutUser);

  if (!jwt || !user) {
    return (
      <div className="px-4 py-20 max-w-xl mx-auto text-center space-y-6">
        <h1 className="text-2xl font-semibold text-gray-200">Вы не авторизованы</h1>

        <p className="text-gray-400 text-lg">
          Чтобы просматривать профиль, войдите в аккаунт или зарегистрируйтесь.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/signin"
            className="px-4 py-2 bg-blue-600 rounded-lg text-white"
          >
            Войти
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 rounded-lg text-white"
          >
            Регистрация
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-200 mb-8">Профиль</h1>

      <div className="bg-neutral-900/80 border border-white/10 rounded-lg p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <svg
              className="w-14 h-14 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-1">Имя</div>
            <div className="text-gray-200 text-lg">{user.username}</div>

            <div className="text-gray-400 text-sm mt-4 mb-1">Email</div>
            <div className="text-gray-200 text-lg">{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
