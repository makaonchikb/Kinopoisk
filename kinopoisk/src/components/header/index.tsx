import React, { useState } from "react";
import { NavLink } from "react-router";
import { SearchInput } from "../SearchInput";

export function Header(): React.ReactElement {
    const [isToggleOpen, setIsToggleOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);

    const handleSetToggleOpen = () => {
        setIsToggleOpen(!isToggleOpen);
    };

    const handleSetUserOpen = () => {
        setIsUserOpen(!isUserOpen);
    };

    return (
        <header>
            <div className="min-h-full">
                <nav className="bg-neutral-950/90">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                        Главная
                                    </NavLink>
                                    <NavLink to="/favorites" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                        Избранное
                                    </NavLink>
                                    <NavLink to="/series" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                        Сериалы
                                    </NavLink>
                                    <NavLink to="/collections" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">
                                        Подборки
                                    </NavLink>
                                </div>
                            </div>

                            <SearchInput />

                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                            <path
                                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>

                                    <div className="relative ml-3">
                                        <button
                                            onClick={handleSetUserOpen}
                                            className="relative flex max-w-xs items-center rounded-full focus:outline-none"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                                <svg
                                                    className="w-7 h-7 text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                                                </svg>
                                            </div>
                                        </button>

                                        {isUserOpen && (
                                            <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black/5">
                                                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5">
                                                    Your profile
                                                </NavLink>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="md:hidden">
                                <button
                                    type="button"
                                    onClick={handleSetToggleOpen}
                                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                                >
                                    {isToggleOpen ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                            <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isToggleOpen && (
                        <div className="md:hidden absolute top-16 left-0 w-full bg-neutral-900/95 backdrop-blur-lg z-50">
                            <div className="px-4 py-4 space-y-2">
                                <NavLink to="/" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white">
                                    Главная
                                </NavLink>
                                <NavLink to="/favorites" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white">
                                    Избранное
                                </NavLink>
                                <NavLink to="/series" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white">
                                    Сериалы
                                </NavLink>
                                <NavLink to="/collections" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-white/5 hover:text-white">
                                    Подборки
                                </NavLink>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}
