import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api/common.api'
import MenuItem from '../menu-item/menu-item'
import getMainMenuItems, { parseMenuLink } from './menu.api'
import './menu.scss'

export default function Menu() {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getMainMenuItems().then((items) => 
            setItems(items
                .filter(item => item.attributes.enabled)
                .map((item) => {
                    return {
                        title: item.attributes.title,
                        to: parseMenuLink(item.attributes.link),
                        slug: item.attributes.field_slug,
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
                        title: item.attributes.name,
                        to: item.attributes.path.alias ? item.attributes.path.alias : '/categorie/' + item.attributes.drupal_internal__nid
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