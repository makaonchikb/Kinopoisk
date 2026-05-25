import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchSignIn, fetchAboutUser } from "../redux/auth-slice";
import { Link, useNavigate } from "react-router";
import { FormField } from "../components/FormField";

export function SignInPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(fetchSignIn(form));
    console.log(form)
    if (fetchSignIn.fulfilled.match(result)) {
      await dispatch(fetchAboutUser());
      navigate("/profile");
    }
  };

  return (
    <div className="px-4 py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-gray-200 mb-8">Вход</h1>

      <form
        onSubmit={submit}
        className="bg-neutral-900/80 border border-white/10 rounded-lg p-6 space-y-6"
      >
        {error && (
          <div className="text-red-400 text-sm">
            Неверный email или пароль
          </div>
        )}

        <FormField
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={change}
          label="Email"
          className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
          required
        />

        <FormField
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={change}
          label="Пароль"
          className="w-full mt-1 px-3 py-2 bg-neutral-800 text-gray-200 rounded-lg outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded-lg text-white font-semibold"
        >
          {loading ? "Загрузка..." : "Войти"}
        </button>

        <div className="text-gray-400 text-sm text-center">
          Нет аккаунта?{" "}
          <Link to="/signup" className="text-green-400">
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
}
