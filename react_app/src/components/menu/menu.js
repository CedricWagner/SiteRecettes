import MenuItem from '../menu-item/menu-item'
import './menu.scss'

export default function Menu() {

    const categoriesSubmenu = [
        {title: 'Salé', to: 'sale'},
        {title: 'Sucré', to: 'sucre'},
        {title: 'Apéritifs', to: 'aperitifs'}
    ]

    return (
        <div className="menu">
            <MenuItem title="Accueil" to="/"/>
            <MenuItem title="Recettes" to="/recettes" submenu={categoriesSubmenu}/>
            <MenuItem title="Zéro déchet" to="/zero-dechet"/>
            <MenuItem title="Articles" to="/articles"/>
            <MenuItem title="Convertisseur" to="/convertisseur"/>
            <MenuItem title="Recherche" to="/recherche"/>
        </div>
    )
}