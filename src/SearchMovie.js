import React, {useState} from "react";
import MovieCard from "./MovieCard";

export default function SearchMovies(){

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState('')

    const searchMovies = async (e) => {
        e.preventDefault()

        const url=`https://api.themoviedb.org/3/search/movie?api_key=819b909d958733522ed1f8cd44139b2d&language=en-US&query=${query}&page=1&include_adult=false`
        
        try {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results)
        } catch(err){
            console.log(err)
        }
    }



    return(
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">
                    Movie Name
                </label>
                <input className="input"
                     type="text"
                     name="query"
                     placeholder="i.e. Jurassic Park"
                     value={query}
                     onChange={(e) => setQuery(e.target.value)} 
                     />
                <button className="button" 
                        type="submit"
                        onClick={searchMovies}>
                            Search
                </button>
            </form>

            <div className="card-list">
                {movies && movies.filter(movie => movie.poster_path)
                        .map(movie => (
                   <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>   
        </>
    )
}