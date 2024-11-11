import { useState, useEffect } from "react";
import { getProducts } from "@services/product.service.js";

const useGetProducts = () => {
    const [products, setProducts] = useState([]);
    
    const fetchProducts = async () => {
        try {
        const response = await getProducts();
        const formattedData = response.map((product) => ({
            id: product.id,
            name: product.name,
            type: product.type,
            quantity: product.quantity,
            entryDate: product.entryDate,
            expirationDate: product.expirationDate,
            image: product.image
        }));
        setProducts(formattedData);
        } catch (error) {
        console.error("Error: ", error);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, []);
    
    return { products, fetchProducts, setProducts };
};

export default useGetProducts;