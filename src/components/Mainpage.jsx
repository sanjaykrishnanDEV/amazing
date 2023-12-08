import { useState, useEffect } from "react";
import { db } from "../utilities/firebase";
import { ref, set } from "firebase/database";
const Mainpage = () => {
  const [data, setdata] = useState({});
  useEffect(() => {
    addtodb();
  }, []);
  async function addtodb() {
    const data = await fetch("https://dummyjson.com/products");
    const json = await data.json();
    setdata(json);
  }
  data?.products?.map((item) => {
    set(ref(db, "products/" + item.id), {
      id: item.id,
      title: item.title,
      category: item.category,
      description: item.description,
      discountPercentage: item.discountPercentage,
      price: item.price,
      stock: item.stock,
      image: [item.images[0]],
      thumbnail: item.thumbnail,
    });
  });
  return (
    <div>
      <div className="h-[90vh] w-[100vw] bg-slate-700 flex flex-col ">
        <div className="w-1/4 h-screen bg-orange-500">
          
        </div>
        <div className="w-3/4"></div>
      </div>
    </div>
  );
};

export default Mainpage;
