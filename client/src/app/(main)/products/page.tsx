"use client";

import { useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../lib/state/api";
import { PlusCircle, Search } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@mui/material";
import Rating from "@/components/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  const [createProduct] = useCreateProductMutation();

  async function handleCreateProduct(productData: ProductFormData) {
    await createProduct(productData);
  }

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="mx-auto w-full pb-5">
      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center rounded border-2 border-gray-200">
          <Search className="m-2 h-5 w-5 text-gray-500" />
          <input
            className="w-full rounded bg-white px-4 py-2"
            inputMode="search"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* header */}
      <div className="mb-6 flex items-center justify-between">
        <Header name="Products" />
        <Button variant="contained" onClick={() => setIsModelOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" /> Create Product
        </Button>
      </div>

      {/* Body product list */}
      <div className="grid grid-cols-1 justify-between gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="mx-auto w-full max-w-full rounded-lg border border-gray-200 bg-white p-4 shadow-md"
            >
              <div className="flex flex-col items-center">
                <div>img</div>
                <h3 className="text-xl font-bold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-800">${product.price.toFixed(2)}</p>
                <div className="mt-1 text-sm text-gray-600">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="mt-2 flex items-center">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <CreateProductModal
        isopen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        onCreate={handleCreateProduct}
      />
    </div>
  );
}
