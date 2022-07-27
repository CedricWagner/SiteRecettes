import { useEffect, useState } from 'react'
import MenuItem from '../menu-item/menu-item'
import getMenuItems from './menu.api'
import './menu.scss'

export default function Menu() {
    const [items, setItems] = useState([{title: "Accueil", to: "./"}])

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
    
    return (
        <div className="menu">
            {items.map((item, key) => 
                <MenuItem title={item.title} to={item.to} key={key}/>
            )}
        </div>
    )
}