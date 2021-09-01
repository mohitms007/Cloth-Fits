import { createContext, useContext, useState } from 'react'

const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider

function CartStateProvider({children}) {
    // This is our own custom provider and will store data related to cart.

    const [cartOpen, setCartOpen] = useState(false)

    function toggleCart(){
        setCartOpen(!cartOpen)
    }

    function closeCart(){
        setCartOpen(false)
    }

    function openCart(){
        setCartOpen(true)
    }
    
    return <LocalStateProvider value={{cartOpen, setCartOpen, toggleCart, openCart, closeCart}}>{children}</LocalStateProvider>
}

function useCart(){
    const all = useContext(LocalStateContext)
    return all;
}


export { CartStateProvider, useCart }