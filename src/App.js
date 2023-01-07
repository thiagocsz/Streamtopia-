import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import Header from './components/Header/Index';
import MovieRow from './components/MovieRow/Index';
import FeatureMovie from './components/FeaturedMovie/Index';
import './App.css';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(()=>{
    const loadAll = async () =>{
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando o feature
      let originals = list.filter(item => item.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[randomChosen];
      console.log(randomChosen);
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureData(chosenInfo);
    }
    loadAll()
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      <Header blackHeader={blackHeader} />
      {featureData && 
        <FeatureMovie item={featureData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}

      </section>

      <footer>
        Feito com <span role='img' aria-label="coração">❤</span> por Thiago Carvalho<br/>
        Dados pegos do site themoviedb.org
      </footer>

      {movieList.length <=0 && 
            <div className="loading">
                <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="loading" />
            </div>
      }
    </div>
  );
}