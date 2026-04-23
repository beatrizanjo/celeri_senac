import "../style/style.css"




function Home() {
    return (
        <div>
            <div className="home"> </div>
            <h1 className="escritohome">Home</h1>
        
           
                <section className="banner">
                    <img src="home.png"  alt="imagem de banner" />
                </section>

                <div>
                    <section className="massascarnessobremesa">
                        <img className="massas" src= "Massas.png" alt="imagem de sobremesas" />
                        <img className="carnes" src= "Carnes.png" alt="imagem de carnes" />
                        <img className="sobremesa" src= "Sobremesa.png" alt="imagem de sobremesas" />
                    </section>
                </div>
            
            
        </div>
    )
}

export default Home;

