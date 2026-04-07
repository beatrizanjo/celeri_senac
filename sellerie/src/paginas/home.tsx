import { Link } from "react-router-dom";    

function Home() {

    return (

        <div className='Home'>
            <h1>Home</h1>

            <Link to="/vegano">Vegano</Link>
            <br />
            <Link to="/sobremesas">Sobremesas</Link>
            <br />
            <Link to="/bebidas">Bebidas</Link>

        </div>
    )




}

export default Home;