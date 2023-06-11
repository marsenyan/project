import React from 'react'
import CartEmptyImg from "../assets/empty-cart.png";
import {Link} from "react-router-dom";


const CartEmpty = () => {
  return (
    <>
        <div class="container container--cart">
             <div class="cart cart--empty">
             <h2>El carrito esta vacío<icon>😕</icon></h2>
                <p>
                 Probablemente aún no hayas pedido pizza.<br />
                 Para pedir pizza, vaya a la página principal.
               </p>
               <img src={CartEmptyImg} alt="Empty cart" />
                <Link to href="/" class="button button--black">
                  <span>Regresar</span>
                </Link>
            </div>
        </div>
    </>
  )
}
export default CartEmpty;
