import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchSignUp } from "../redux/auth-slice";
import { Link, useNavigate } from "react-router";

export function SignUpPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return;
    }

    const result = await dispatch(
      fetchSignUp({
        username: form.username,
        email: form.email,
        password: form.password,
      })
    );

    if (fetchSignUp.fulfilled.match(result)) {
      navigate("/activate-link");
    }
  };

  return (
    <div className="px-4 py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-200 mb-8">
        Регистрация
      </h1>

      <form
        onSubmit={submit}
        className="bg-neutral-900/80 border border-white/10 rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="text-gray-400 text-sm">Имя пользователя</label>
          <input
            name="username"
            value={form.username}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Пароль</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
            required
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm">Подтвердите пароль</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={change}
            className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-600 rounded-lg text-white font-semibold"
        >
          {loading ? "Загрузка..." : "Создать аккаунт"}
        </button>

        <div className="text-gray-400 text-sm text-center">
          Уже есть аккаунт?{" "}
          <Link to="/signin" className="text-blue-400">
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
