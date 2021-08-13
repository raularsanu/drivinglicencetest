import React from 'react';
import { Link } from 'react-router-dom';

function Home({ setLoading }) {

    const categories = [
        { img: 'http://localhost:5000/server/images/car', name: 'Car Test', link: '/quiz/car-test' },
        { img: 'http://localhost:5000/server/images/van', name: 'Truck Test', link: '/quiz/truck-test' },
        { img: 'http://localhost:5000/server/images/vespa', name: 'Motorcycle Test', link: '/quiz/motorcycle-test' }
    ];

    return (
        <div className='home'>
            <div className='home-h1'>
              <h1>Move One Step Closer to Getting Your License!</h1>
            </div>
            <p>Practice your knowledge of the theoretical test here.</p>
            <h3>Please select a category</h3>
            <div className='grid'>
              {categories.map((category, index) => {
                  return (   
                   <Link to={category.link} key={index + 5} onClick={()=>setLoading(true)}> 
                        <div className='grid-unit'>
                                <div className='grid-image'>
                                    <img onLoad={()=>setLoading(false)} src={category.img}></img>
                                </div>
                                <h1>
                                {category.name}
                                </h1>
                        </div>
                   </Link>
                  )
              })}
            </div>
        </div>
    )
}

export default Home
