import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch the wishlist when the component loads
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is in localStorage
          },
        });
        const data = await response.json();
        setWishlistItems(data);
      } catch (error) {
        console.error("Error fetching wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item._id}>
              <Link to={`/product/${item.productId._id}`}>
                <img src={item.productId.image} alt={item.productId.title} />
                <h2>{item.productId.title}</h2>
                <p>Price: ${item.productId.price}</p>
              </Link>
              <button
                onClick={async () => {
                  await fetch("http://localhost:5000/api/wishlist", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ productId: item.productId._id }),
                  });
                  setWishlistItems(
                    wishlistItems.filter((wishlistItem) => wishlistItem._id !== item._id)
                  );
                }}
              >
                Remove from Wishlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
