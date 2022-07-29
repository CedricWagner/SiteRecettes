import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api/common.api'
import { parseMenuLink } from '../../utils/api/helpers'
import MenuItem from '../menu-item/menu-item'
import getMainMenuItems from './menu.api'
import './menu.scss'

export default function Menu() {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getMainMenuItems().then((items) => 
            setItems(items
                .filter(item => item.enabled)
                .map((item) => {
                    return {
                        title: item.title,
                        to: parseMenuLink(item.link),
                        slug: item.field_slug,
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
                        to: item.path.alias ? item.path.alias : '/categorie/' + item.drupal_internal__nid
                    }}
                ))
            );
        }
    },[items])
    
    return (
        <div className="menu">
            {items.map((item, key) => 
                <MenuItem title={item.title} to={item.to} key={key} submenu={item.slug === "recipe_categories" ? categories : []}/>
            )}
        </div>
    )
}