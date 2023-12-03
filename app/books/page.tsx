import AddBook from './addBook'
import CardBook from '../[...booksId]/page';
import Link from 'next/link';


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


//get All Books
export async function getBooks() {
    const RestApiBooks = "http://localhost:4000/books";
    const response = await fetch(RestApiBooks, {
      cache: "no-store",
    });
  
    const result = await response.json();
    return result;
  }


export default async function BooksList() {
  const getAllbooks = await getBooks();
  const books = getAllbooks.data;

  return (
    <div>
      <div className="navbar bg-base-100 shadow-xl p-5 fixed z-50 ">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>Login</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center ">
         
         
            
         
         
        </div>
        <div className="navbar-end">
           <AddBook />
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          {/* search */}
        </div>
      </div>
      <div className="container  inline-flex pt-[70px] grid grid-cols-3">
        {books.map((book: Book) => (
          <div key={book.id} className="card bg-base-100 shadow-xl w-auto m-5">
            <figure>
              <img
                src={book.image_url}
                alt="Books"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{book.title}</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                quas voluptate, vel tempore voluptatem doloribus distinctio modi
                praesentium, iusto, dolores totam! Officiis excepturi, ad beatae
                nam nulla ut corrupti doloremque?
              </p>
              <div className="card-actions justify-end btn btn-ros-500">
                <Link href={`http://localhost:3000/books/${book.id}`}>Read Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
