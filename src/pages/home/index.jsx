import React, { useEffect, useState } from "react";
import { Banner, ProductCard } from "@components";
import api from "../../services/api";
import Item from "antd/lib/list/Item";

const HomePage = () => {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    try {
      const url = '/api/v1/city';
      const respones = await api.get(url);
      const payload = [...respones.data.data.cities]
      console.log(payload);
      setCities(payload);
    } catch (error) {
      alert(error)
    }
  }

  const [products, setproducts] = useState([])
  const fetchProduct = async () => {
    try {
      const url = '/api/v1/products';
      const response = await api.get(url);
      const payload = [...response.data.data.products]
      console.log(payload);
      setproducts(payload);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    fetchCities();
    fetchProduct();
  }, [])


  return (
    <>
      <Banner />
      <div key={Item.id} className="bg-primary rounded text-white round grid grid-cols-5 gap-4 m-5 ">
        {
          cities.map((item) => {
            return <span key={item.id}>{item.name}</span>
          })
        }
      </div>

      <div className="grid grid-cols-4 gap-10 mt-5 m-5">
        {products.map((item) => (
          <ProductCard
            key={item?.id}
            productName={item?.name}
            productCategory={item?.category}
            productPrice={item?.price}
            random={Math.random()}
            onClick={item.id}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage
