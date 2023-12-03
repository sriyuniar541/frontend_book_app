"use client";
import { useState, SyntheticEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

type Category = {
  id: string;
  title: string;
  name: string;
  updated_at: Date;
  category_id: number;
};

type Book = {
  id: string;
  title: string;
  deskription: string;
  image_url: string;
  release_year: number;
  price: string;
  total_page: number;
  thickness: string;
  created_at: Date;
  updated_at: Date;
  category_id: number;
};

const AddBooks = ({ params }) => {
  const [categorys, setCategorys] = useState([]);
  const [book, setBook] = useState({
    title: "",
    deskription: "",
    image_url: "",
    release_year: "",
    price: "",
    total_page: "",
    thickness: "",
    category_id: "",
  });

  // const [title, setTitle] = useState("");
  // const [deskription, setDeskription] = useState("");
  // const [release_year, setRelease_year] = useState("");
  // const [price, setPrice] = useState("");
  // const [total_page, setTotal_page] = useState("");
  // const [category_id, setCategory_id] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [addItems, setAddItems] = useState("");

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

    formData.append("title", book.title);
    formData.append("deskription", book.deskription);
    formData.append("release_year", book.release_year);
    formData.append("price", book.price);
    formData.append("total_page", book.total_page);
    formData.append("category_id", book.category_id);
    formData.append("image_url", book.image_url);

    await axios.put(`http://localhost:4000/books/${params}`, formData, {
      // "Content-Type" : "multipart/form-data",
      // header : {Authorization : `Bearer ${token}`}
    });
    try {
      setAddItems("hidden");
      alert("Berhasil");
      setIsLoading(false);
      // setTitle("");
      // setDeskription;
      // setPrice("");
      // setTotal_page("");
      // setImage_url("");
      // setDeskription("");
      // setCategory_id("");
      // setRelease_year("");
      router.refresh();
      setIsOpen(!isOpen);
      console.log(formData);
    } catch (error) {
      alert("gagal");
      throw error;
    }
  };

  const getCatgeory = async () => {
    const RestApiBooks = `http://localhost:4000/category`;
    const response = await fetch(RestApiBooks, {
      cache: "no-store",
    });
    const result = await response.json();
    const getCategoryAll = result.data;
    setCategorys(getCategoryAll);
    return getCategoryAll;
  };

  const getBook = async () => {
    const RestApiBooks = `http://localhost:4000/books/20`;
    const response = await fetch(RestApiBooks, {
      cache: "no-store",
    });
    const result = await response.json();
    const getBookAll = result.data[0];
    setBook(getBookAll);
    return getBookAll;
  };

  useEffect(() => {
    getCatgeory();
    getBook();
  }, []);

  const handlePut = (e: any) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });

    console.log(book);
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/2 h-full">
          <figure>
            <img src={book ? book.image_url : 'data tidak ada'} alt="Books" />
          </figure>
        </div>

        <div className="  bg-slate-50 item-center border-2xl border-black border-2xl w-1/2 mr-[800px] z-50 py-10  px-20 h-full shadow-2xl ">
          <form onSubmit={handleSubmit} className={addItems}>
            <div className="">
              <label className="label font-bold ">Title</label>
              <input
                value={book ? book.total_page : 'data tidak ada'}
                type="text"
                onChange={handlePut}
                // onChange={handlePut}
                placeholder=" Title"
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">deskription</label>

              <input
                value={book ? book.total_page : 'data tidak ada'}
                type="text"
                onChange={handlePut}
                className="w-full p-2 rounded-md border"
                required
              />
              <p>Tambahan..................</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                suscipit nostrum voluptates corporis dicta, possimus dolore
                accusantium sint soluta maxime fugit eius nisi temporibus animi
                similique voluptate commodi itaque molestias.
              </p>

              <label className="label font-bold ">image_url</label>
              <input
                type="file"
                accept="image/*"
                onChange={hadleImage}
                className="w-full p-2 rounded-md border"
                required
              />
              <img src={book ? book.image_url : 'data tidak ada'} alt="" />

              <label className="label font-bold ">release_year</label>
              <input
                value={book ? book.release_year : 'data tidak ada'}
                type="number"
                min="1980"
                max="2021"
                onChange={handlePut}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">price</label>
              <input
                value={book ? book.price : 'data tidak ada'}
                type="text"
                onChange={handlePut}
                className="w-full p-2 rounded-md border"
                required
              />

              <label className="label font-bold ">total_page</label>
              <input
                value={book ? book.total_page : 'data tidak ada'}
                type="number"
                max="1000"
                onChange={handlePut}
                className="w-full p-2 rounded-md border"
                required
              />

              {/* select */}

              <div className="form-control w-full">
                <label className="label font-bold">Category</label>
                <select
                  value={book ? book.category_id : 'data tidak ada'}
                  onChange={handlePut}
                  className="select select-bordered"
                >
                  {categorys.map((category: Category) => (
                    <option value={book ? book.total_page : 'data tidak ada'} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*  */}
              <button className="rounded-xl text-white text-md bg-rose-500  w-full px-10 p-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBooks;
