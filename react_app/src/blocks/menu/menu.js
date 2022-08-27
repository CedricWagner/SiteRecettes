import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api/common.api'
import { parseMenuLink } from '../../utils/api/helpers'
import MenuItem from '../../components/menu-item/menu-item'
import getMainMenuItems from './menu.api'
import MenuBurgerIcon from '../../images/icons/svg/icon_menu.svg'
import './menu.scss'

export default function Menu() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getMainMenuItems().then((items) => 
            setItems(items
                .filter(item => item.enabled)
                .map((item) => {
                    return {
                        title: item.title,
                        to: parseMenuLink(item.link),
                        slug: item.field_slug,
                        picto: item.field_picto.uri ? process.env.REACT_APP_API_ENDPOINT + item.field_picto.uri.url : false
                    }
                }
            ))
        );
    },[])

    useEffect(() => {
        // check if "Recettes" menu item is present
        if (items.filter((item) => item.slug === "recipe_categories").length === 1) {
            getCategories().then((items) => 
                setCategories(items.map((item) => {
                    return {
                        title: item.name,
                        to: '/categories?filters=' + item.id
                    }}
                ))
            );
        }
    },[items])
    
    return (
        <div className="menu">
            <img src={MenuBurgerIcon} alt="Menu mobile" className={"menu__burger"}
                data-bs-toggle="collapse" data-bs-target="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu"
            />
            <div id="collapseMenu" className={"collapse menu__container"}>
                {items.map((item, key) => 
                    <MenuItem title={item.title} to={item.to} key={key} picto={item.picto} submenu={item.slug === "recipe_categories" ? categories : []}/>
                )}
            </div>
        </div>
    )
}