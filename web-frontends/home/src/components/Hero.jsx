import image from '../assets/hero-image.png'
import { Link } from 'react-router-dom';

export default function Hero() {

    return (
      <section
        id="home"
        className="lg:bg-cover bg-lighter-green text-white flex justify-center items-center p-16">
        <div className="flex justify-between items-center w-full">
          
          <div id="title-div" className="flex w-4/6 flex-col justify-between items-start pl-12">
            <div id="hero-title" className="mb-10">
              <h1 className="title lg:text-8xl sm:text-7xl">Eat Healthy and</h1>
              <h1 className="title lg:text-8xl sm:text-7xl">Live Longer</h1>
            </div>

            <Link to="/products/category/1" id="button-div" className="flex text-white text-sm justify-start items-center bg-darker-green px-5 py-1 rounded-3xl">
              Shop Now
            </Link>
          </div>

          <div id="hero-image" className='flex w-2/6 justify-center items-center pr-12'>
            <img src={image} alt="Hero Image"  className='w-full' />
          </div>
        </div>
      </section>
    );
}
