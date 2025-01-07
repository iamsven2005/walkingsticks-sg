import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';

export const metadata = {
  description: 'Find all your walking stick needs from Singapore',
  openGraph: {
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <div className='p-5 m-5 flex justify-center align-center flex-col'>

      <h1 className='font-bold text-lg'>
        Brands:
      </h1>
      <div className='flex flex-wrap gap-5 align-center justify-centerq m-5 p-5'>
      </div>

      <h1 className='font-bold text-lg'>
        Testimonial:
      </h1>
      <div className='flex flex-wrap gap-5 align-center justify-centerq m-5 p-5'>
      </div>

    
      <h1 className='font-bold text-lg'>
        Guides:
      </h1>
      <div className='flex flex-wrap gap-5 align-center justify-centerq m-5 p-5'>
      </div>

      
      </div>
      <Footer/>
    </>
  );
}
