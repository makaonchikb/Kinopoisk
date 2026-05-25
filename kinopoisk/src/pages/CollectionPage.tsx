import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { fetchCollectionMovies } from "../redux/collections-slice";
import { FilmsList } from "../components/FilmsList";
import { collections } from "./CollectionsPage";
import { Pagination } from "../components/Pagination";

export function CollectionPage(): React.ReactElement {
    const { type, page } = useParams();
    const pageNumber = Number(page) || 1;
    const navigate = useNavigate();

    const collectionTitle =
        collections.find((item) => item.type === type)?.title || type;

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
            <Pagination 
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={(page) => navigate(`/collections/${type}/${page}`)}
            />
            <div className="mb-6"></div>
            <FilmsList films={movies} loading={false} error={false} />

            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={(page) => navigate(`/collections/${type}/${page}`)}
            />
        </div>
    );
}
