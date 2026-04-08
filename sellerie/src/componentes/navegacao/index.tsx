import { Link } from 'react-router-dom'
import './navegacao.css'

function Navegacao() {
    return (
        <nav className="navegacao">
            <ul className="navegacao__list">
                <li><Link to="/carnes" className="navegacao__link">CARNES</Link></li>
                <li><Link to="/vegano" className="navegacao__link">VEGANOS</Link></li>
                <li><Link to="/vegetariano" className="navegacao__link">VEGETARIANOS</Link></li>
                <li><Link to="/doces" className="navegacao__link">DOCES</Link></li>
                <li><Link to="/massas" className="navegacao__link">MASSAS</Link></li>
                <li><Link to="/salada" className="navegacao__link">SALADAS</Link></li>
                <li><Link to="/lanches" className="navegacao__link">LANCHES</Link></li>
                <li><Link to="/bebidas" className="navegacao__link">BEBIDAS</Link></li>
            </ul>
        </nav>
    )
}

export default Navegacao
