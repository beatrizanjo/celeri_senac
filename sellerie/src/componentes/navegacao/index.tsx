import { Link } from 'react-router-dom'
import './navegacao.css'

function Navegacao() {
    return (
        <nav className="navegacao">
            <ul className="navegacao__list">
                <li><Link to="/carnes" className="navegacao__link">MEET</Link></li>
                <li><Link to="/vegano" className="navegacao__link">VEGAN</Link></li>
                <li><Link to="/vegetariano" className="navegacao__link">VEGGIE</Link></li>
                <li><Link to="/doces" className="navegacao__link">SWEET</Link></li>
                <li><Link to="/massas" className="navegacao__link">PASTA</Link></li>
                <li><Link to="/salada" className="navegacao__link">SALAD</Link></li>
                <li><Link to="/lanches" className="navegacao__link">SNACK</Link></li>
                <li><Link to="/bebidas" className="navegacao__link">DRINK</Link></li>
            </ul>
        </nav>
    )
}

export default Navegacao
