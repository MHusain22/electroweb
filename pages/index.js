import Header from '@/components/header/Header';
import Card from '@/components/Cards/Cards';
import Products from '@/components/products/Products';
import Footer from '@/components/footer/Footer';


const Home = () => {
  return (
    <>
    <Header />
    <Card />
    {/* <Card text="Safe payment" image={clock} />
    <Card text="Safe payment" image={clock} />
    <Card text="Safe payment" image={clock} />
    <Card text="Safe payment" image={clock} /> */}
    <Products />
    <Footer />
    </>
  )
}

export default Home