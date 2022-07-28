import { useEffect, useState } from 'react'
import { getCategories } from '../../utils/api/common.api'
import MenuItem from '../menu-item/menu-item'
import getMenuItems from './menu.api'
import './menu.scss'

export default function Menu() {
    const [items, setItems] = useState([{title: "Accueil", to: "./"}])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getMenuItems().then((items) => 
            setItems(items.map((item) => {
                return {
                    title: item.title,
                    to: item.relative
                }}
            ))
        );
    },[])

    useEffect(() => {
        // check if "Recettes" menu item is present
        if (items.filter((item) => item.title === "Recettes").length === 1) {
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
                <MenuItem title={item.title} to={item.to} key={key} submenu={item.title === "Recettes" ? categories : []}/>
            )}
        </div>
    )
}