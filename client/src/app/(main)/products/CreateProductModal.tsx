import Header from "@/components/Header";
import { Button } from "@mui/material";
import { useState } from "react";
import { v4 } from "uuid";

type ProductFormData = {
  productId?: string;
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isopen: boolean;
  onClose: () => void;
  onCreate: (formDate: ProductFormData) => void;
};

export default function CreateProductModal({
  isopen,
  onClose,
  onCreate,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "rating" || name === "stockQuantity"
          ? parseFloat(value)
          : value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onCreate(formData);
    onClose();
  }

  if (!isopen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputStyleCss =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 z-20 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50 transition-opacity">
      <div className="absolute -z-10 h-full w-full" onClick={onClose} />
      <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
        <Header name="Create New Product" />
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="productName" className={labelCssStyles}>
            Product Name
          </label>
          <input
            type="text"
            name="name"
            id="productName"
            className={inputStyleCss}
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="productPrice" className={labelCssStyles}>
            Product Price
          </label>
          <input
            type="number"
            name="price"
            id="productPrice"
            className={inputStyleCss}
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
          />
          <label htmlFor="productStockQuantity" className={labelCssStyles}>
            Product Stock Quantity
          </label>
          <input
            type="number"
            name="stockQuantity"
            id="productStockQuantity"
            className={inputStyleCss}
            placeholder="Product Stock Quantity"
            value={formData.stockQuantity}
            onChange={handleChange}
          />
          <label htmlFor="productRating" className={labelCssStyles}>
            Product Rating
          </label>
          <input
            type="number"
            name="rating"
            id="productRating"
            className={inputStyleCss}
            placeholder="Product Rating"
            value={formData.rating}
            onChange={handleChange}
          />
          <Button variant="contained" size="small" type="submit" sx={{ mt: 1 }}>
            Create Product
          </Button>
        </form>
      </div>
    </div>
  );
}
