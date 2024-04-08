'use client'
import { getAllProducts } from "@/redux/features/product-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getAllProducts())
  }, [])

  const productstate = useAppSelector((state: any) => state.productReducer.products)
  const { data } = productstate

  return (
    <>
      <h1 className="text-4xl mb-3">Home Page</h1>
      <Link href="/login">Login</Link>
      <br />
      <hr />
      <Link href="/signup">SignUp</Link>
      <br />
      <hr />
      <Link href="/profile/user">Profile</Link>
      <h2>Products:</h2>
      {data ? (
        data.map((prd: any) => (
          <div key={prd._id}>
            <p>name: {prd.title}</p>
            <p>description: {prd.description}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
