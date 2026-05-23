import React, { useEffect } from "react";
import { useParams, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchCollectionMovies } from "../redux/collections-slice";
import { FilmsList } from "../components/FilmsList";
import { collections } from "./CollectionsPage";

export function CollectionPage(): React.ReactElement {
    const { type, page } = useParams();
    const pageNumber = Number(page) || 1;
    const collectionTitle = collections.find((item) => item.type === type)?.title || type;

    const dispatch = useAppDispatch();

    const { movies, totalPages, loading, error } = useAppSelector(
        (state) => state.collections
    );

    useEffect(() => {
        dispatch(fetchCollectionMovies({ type: type!, page: pageNumber }));
    }, [type, pageNumber, dispatch]);

    if (loading) {
        return <div className="text-gray-300 px-4 py-10">Загрузка...</div>;
    }

    if (error) {
        return <div className="text-red-400 px-4 py-10">Ошибка загрузки</div>;
    }

    return (
        <div className="px-4 py-10">
            <h1 className="text-2xl font-semibold text-gray-200 mb-6">
                {collectionTitle}
            </h1>



            <FilmsList films={movies} loading={false} error={false} />

            <div className="flex gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                        key={p}
                        to={`/collections/${type}/${p}`}
                        className={`px-3 py-1 rounded ${p === pageNumber
                            ? "bg-blue-600 text-white"
                            : "bg-neutral-800 text-gray-300"
                            }`}
                    >
                        {p}
                    </Link>
                ))}
            </div>
        </div>
    );
}
