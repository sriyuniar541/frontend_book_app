"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Category = {
  id: string;
  title: string;
  name: string;
  updated_at: Date;
  category_id: number;
};

const AddBooks = () => {
  const [categorys, setCategorys] = useState([]);

  const [title, setTitle] = useState("");
  const [deskription, setDeskription] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [price, setPrice] = useState("");
  const [total_page, setTotal_page] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [addItems,setAddItems] = useState('hidden')
  
  

  const [isLoading, setIsLoading] = useState(false);
  const [image_url, setImage_url] = useState("");

  const hadleImage = (e: any) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage_url(file);
  };

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("deskription", deskription);
    formData.append("release_year", release_year);
    formData.append("price", price);
    formData.append("total_page", total_page);
    formData.append("category_id", category_id);
    formData.append("image_url", image_url);

    await axios.post("http://localhost:4000/books", formData, {
      // "Content-Type" : "multipart/form-data",
      // header : {Authorization : `Bearer ${token}`}
    });
    try {
      setAddItems('hidden');
      alert("Berhasil");
      setIsLoading(false);
      setTitle("");
      setDeskription;
      setPrice("");
      setTotal_page("");
      setImage_url("");
      setDeskription("");
      setCategory_id("");
      setRelease_year("");
      router.refresh();
      setIsOpen(!isOpen);
      console.log(formData);
    } catch (error) {
      alert("gagal");
      throw error;
    }
  };

  const handleModal = () => {
    if(addItems == '') {
        setAddItems('hidden')
    } else {
      setAddItems('')
    };
  };

  const getCatgeory = async () => {
    const RestApiBooks = "http://localhost:4000/category";
    const response = await fetch(RestApiBooks, {
      cache: "no-store",
    });
    const result = await response.json();
    const getCategoryAll = result.data;
    setCategorys(getCategoryAll);
    return getCategoryAll;
  };

  console.log(categorys);

  useEffect(() => {
    getCatgeory();
  }, []);

  return (
     <>{addItems == 'hidden' ? 
     <button
      className="btn btn-sky-800 z-[100] mt-[20px]"
      onClick={handleModal}
    >Add Book </button>
     
     :  <button
     className=" text-white btn bg-rose-500 z-[100] -mt-[650px] -mr-[65px]"
     onClick={handleModal}
   >Close </button>}
     
    <div className="">

        <div className="  bg-slate-50 item-center border-2xl border-black border-2xl w-full mr-[800px] z-50 py-10  px-20 h-full shadow-2xl ">
       
        {addItems == 'hidden' ? 
     <a className="z-50 text-3xl -mr-[1000px]">DAFTAR LIST BUKU</a>
     
     :  <a className="z-50 text-xl ">Tambah Buku</a>}
        
          <form onSubmit={handleSubmit} className={addItems}>
            <div className="">
              <label className="label font-bold ">Title</label>
              <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder=" Title"
                className="w-full p-2 rounded-md border"
                required />

              <label className="label font-bold ">deskription</label>
              <input
                value={deskription}
                type="text"
                onChange={(e) => setDeskription(e.target.value)}
                className="w-full p-2 rounded-md border"
                required />

              <label className="label font-bold ">image_url</label>
              <input
                type="file"
                accept="image/*"
                onChange={hadleImage}
                className="w-full p-2 rounded-md border"
                required />

              <label className="label font-bold ">release_year</label>
              <input
                value={release_year}
                type="number"
                min="1980"
                max="2021"
                onChange={(e) => setRelease_year(e.target.value)}
                className="w-full p-2 rounded-md border"
                required />

              <label className="label font-bold ">price</label>
              <input
                value={price}
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded-md border"
                required />

              <label className="label font-bold ">total_page</label>
              <input
                value={total_page}
                type="number"
                max="1000"
                onChange={(e) => setTotal_page(e.target.value)}
                className="w-full p-2 rounded-md border"
                required />

              {/* select */}

              <div className="form-control w-full">
                <label className="label font-bold">Category</label>
                <select
                  value={category_id}
                  onChange={(e) => setCategory_id(e.target.value)}
                  className="select select-bordered"
                >
                  {categorys.map((category: Category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*  */}
              <button className="rounded-xl text-white text-md bg-rose-500  w-full px-10 p-2">
                Simpan
              </button>
             
            </div>
          </form>
        </div>
      </div></>
  );
};

export default AddBooks;
