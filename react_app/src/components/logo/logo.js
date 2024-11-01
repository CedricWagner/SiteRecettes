import logo from '../../images/logo.png'
import './logo.scss'

export default function Logo() {

    return (
        <div className="logo">
            <h1>
                <a href='/'>
                    <img src={logo} className="logo__image" alt="Les Véganeries de Dodo"/>
                </a>
            </h1>
        </div>
    )
}