import { useAppDispatch, useAppSelector } from "../../redux/store"
import { toggleFavoriteMovie } from "../../redux/favorite-slice"
import { FavoriteActiveIcon, FavoriteInactiveIcon } from "../../svg"

export function FavoriteButton({ id }: { id: number }) {
  const dispatch = useAppDispatch()
  const favorite = useAppSelector(state => state.favorites.favorite)
  const isFavorite = favorite.includes(id)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(toggleFavoriteMovie(id))
  }

  return (
    <button
      onClick={handleClick}
      className="absolute top-2 right-2 cursor-pointer z-20"
    >
      <span style={{ pointerEvents: "none" }}>
        {isFavorite ? FavoriteActiveIcon : FavoriteInactiveIcon}
      </span>
    </button>
  )
}
