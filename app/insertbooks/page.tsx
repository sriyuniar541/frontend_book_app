"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



let token = JSON.parse(localStorage.getItem("token"));
let userData = JSON.parse(localStorage.getItem("data"));

type Category = {
  id: string;
  title: string;
  name: string;
  updated_at: Date;
  category_id: number;
};

const insertBook = () => {
  const [categorys, setCategorys] = useState([]);

  const [title, setTitle] = useState("");
  const [deskription, setDeskription] = useState("");
  const [release_year, setRelease_year] = useState("");
  const [price, setPrice] = useState("");
  const [total_page, setTotal_page] = useState("");
  const [category_id, setCategory_id] = useState("");

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
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      },
    });
    try {
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
      console.log(formData);
    } catch (error) {
      alert("gagal");
      throw error;
    }
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
    <>
      <div className="">
        <div className="  bg-slate-50 item-center border-2xl border-black border-2xl w-full py-10  px-20 h-full shadow-2xl ">
            <a className="z-50 text-xl ">Tambah Buku</a>

          <form onSubmit={handleSubmit}>
            <div className="">
              <label className="label font-bold ">Title</label>
              <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder=" Title"
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">deskription</label>
              <input
                value={deskription}
                type="text"
                onChange={(e) => setDeskription(e.target.value)}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">image_url</label>
              <input
                type="file"
                accept="image/*"
                onChange={hadleImage}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">release_year</label>
              <input
                value={release_year}
                type="number"
                min="1980"
                max="2021"
                onChange={(e) => setRelease_year(e.target.value)}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">price</label>
              <input
                value={price}
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">total_page</label>
              <input
                value={total_page}
                type="number"
                max="1000"
                onChange={(e) => setTotal_page(e.target.value)}
                className="w-full p-2 rounded-md border"
                required
              />

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
      </div>
    </>
  );
};

export default insertBook;
