import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import { CiSearch } from 'react-icons/ci'
import { IoSearchOutline } from "react-icons/io5";
import '../assets/css/styles.css'
import '../assets/css/products.css'

/* page imports */
import ProductCard from '../components/ProductCard'

export const Product = createContext(null)

function Products() {
    const [item, setItem] = useState({})
    const [backendData, setBackendData] = useState([{}])
    const [searchData, setSearchData] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then(response => {return response.json()})
        .then(data => {setBackendData(data), setSearchData(data)});
    }, []);

    function openModel(e) {
        let prodId = e.currentTarget.getAttribute('id') - 1
        console.log(prodId)
        modal.style.display = "block"

        // document.querySelector(".modal-id").innerHTML = backendData.data && backendData.data[prodId].name
        setItem(backendData.data && backendData.data[prodId])
    }

    function closeModel() {
        modal.style.display = 'none'
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none"
        }
    }

    /* Thin Client Method */
    /* POST request => mongoose query => send data from backend to client */
    /* This method is outdated */
    // const submitHandler = async (e) => {
    //     if (e.key === 'Enter' || e.currentTarget.id === 'submit') {
    //         e.preventDefault()

    //         let searchStr = document.querySelector('#input').value

    //         const requestOptions = {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ data: searchStr })
    //         }
    //         const response = await fetch('http://localhost:5000/api/products', requestOptions)
    //         const data = await response.json()
    //         setBackendData(() => data)
    //     }
    // }

    /* Thick Client Method */
    /* Load all products from backend => frontend string comparasion to search (the thing you used for recipe web) */
    function submitHandler(e) {
        /* 
            get string from input text
            apply string to regex or some other search method (const results = array.filter(str => str.includes('js')))
            update backendData with the useState
        */
        const searchList = []

        if (e.key === 'Enter' || e.currentTarget.id === 'Submit') {
            e.preventDefault()
            const searchStr = document.querySelector('#input').value.toLowerCase()
            for (let i = 0; i < backendData.data.length; i++) {
                if (backendData.data[i].name.toLowerCase().includes(searchStr)) {
                    searchList.push(backendData.data && backendData.data[i])
                }
            }
            {setSearchData({success: true, data: searchList})}
        }
    }

    // console.log(backendData.data && backendData.data.map(products => products.name))
    const modal = document.querySelector('.modal-window')

    return (
        <Product.Provider value={item}>
            <div class="body-container">
                <h1 class="hero-header">Products</h1>
                <div class="modal-window">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-id">{item.name}</h2>
                            <span class="close" onClick={closeModel}>&times;</span>
                        </div>
                        <article>
                            <img src={item.image}></img>
                            <h3>${item.price}</h3>
                            <div class='modal-add'>
                                <button>Add To Cart</button>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="content-container">
                    <div class="product-container">
                        <div class="product-bar">
                            <h4>{searchData.data && searchData.data.length} items searched</h4>
                            <form onSubmit={submitHandler}>
                                <input type='text' name='search' id='input' onKeyDown={submitHandler} placeholder='Search...'/>
                                <div type='submit' id='submit' onClick={submitHandler}><IoSearchOutline /></div>
                            </form>
                        </div>
                        <div class="item-container">
                            {searchData.data && searchData.data.map(product => 
                                <ProductCard 
                                    openModel={openModel} 
                                    key={product._id}
                                    id={product._id} 
                                    name={product.name} 
                                    price={product.price} 
                                    image={product.image}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Product.Provider>
    )
}

export default Products;