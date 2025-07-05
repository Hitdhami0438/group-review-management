"use client";

import { useProduct } from "@/hooks/useProduct";
import React from "react";
import { toast } from "sonner";

const Group = () => {
  const { data, isLoading, isError } = useProduct();

  if (isLoading) toast.success("Product loading successfully");
  if (isError) toast.error(`Error : ${"feching product error"}`);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {data?.product.map((product) => (
        <ul key={product.id.toString()}>
          <li>{product.brand}</li>
          <li>{product.category}</li>
          <li>{product.rating}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
          <li>{product.rating}</li>
          <li>{product.title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Group;
