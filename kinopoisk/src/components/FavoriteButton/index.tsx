import { useAppDispatch, useAppSelector } from "../../redux/store"
import { toggleFavoriteMovie } from "../../redux/movies-slice"
import { FavoriteActiveIcon, FavoriteInactiveIcon } from "../../svg"

export function FavoriteButton({ id }: { id: number }) {
  const dispatch = useAppDispatch()
  const favorite = useAppSelector(state => state.movies.favorite)
  const isFavorite = favorite.includes(id)

  return (
    <button
      onClick={() => dispatch(toggleFavoriteMovie(id))}
      className="absolute top-2 right-2 cursor-pointer"
    >
      {isFavorite ? FavoriteActiveIcon : FavoriteInactiveIcon}
    </button>
  )
}