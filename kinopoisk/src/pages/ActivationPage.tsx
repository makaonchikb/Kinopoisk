import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { activateUser } from "../redux/auth-slice";

export function ActivationPage(): React.ReactElement {
  const { uid, token } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);
  const isActivated = useAppSelector((state) => state.auth.isActivated);

  useEffect(() => {
    if (uid && token) {
      dispatch(activateUser({ uid, token }));
    }
  }, [uid, token, dispatch]);

  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => {
        navigate("/signin");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isActivated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900 px-4">
      <div className="w-full max-w-md bg-neutral-900/80 border border-white/10 rounded-xl p-6 shadow-xl text-center">

        <h1 className="text-2xl font-semibold text-gray-200 mb-6">
          Активация аккаунта
        </h1>

        {loading && (
          <p className="text-gray-300 text-lg">Активируем ваш аккаунт...</p>
        )}

        {!loading && isActivated && (
          <p className="text-green-400 text-lg">
            Аккаунт успешно активирован!  
            <br />
            Сейчас вы будете перенаправлены на страницу входа.
          </p>
        )}

        {!loading && error && (
          <p className="text-red-400 text-lg">
            Ошибка активации.  
            Проверьте ссылку или попробуйте позже.
          </p>
        )}
      </div>
    </div>
  );
}
