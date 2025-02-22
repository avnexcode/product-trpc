"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { renderElements } from "@/utils/render-elements";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteProductDialog } from "../components/action";
import { ProductTableBodySkeleton } from "../components/skeleton";
import { convertCurrency } from "@/utils";

export const ProductTable = () => {
  const products = [
    {
      id: "1",
      name: "Produk 1",
      price: "1000",
      category: {
        name: "food",
      },
    },
    {
      id: "2",
      name: "Produk 2",
      price: "2000",
      category: {
        name: "drink",
      },
    },
  ];
  const isProductsLoading = false;
  const refetchProducts = () => console.log("AW");
  return (
    <Table>
      <TableCaption>A list of your recent categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-[150px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isProductsLoading ? (
        <ProductTableBodySkeleton />
      ) : (
        <TableBody>
          {renderElements({
            of: products,
            keyExtractor: (product) => product.id,
            render: (product, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{product.name}</TableCell>
                <TableCell>{convertCurrency(product.price)}</TableCell>
                <TableCell className="capitalize">
                  {product.category.name}
                </TableCell>
                <TableCell className="space-x-1">
                  <Link href={`/dashboard/product/${product.id}/edit`}>
                    <Button variant={"outline"} size={"sm"}>
                      <SquarePen />
                    </Button>
                  </Link>
                  <DeleteProductDialog
                    productId={product.id}
                    refetchProducts={refetchProducts}
                  />
                </TableCell>
              </TableRow>
            ),
            isLoading: isProductsLoading,
            fallback: (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Products data not found
                </TableCell>
              </TableRow>
            ),
          })}
        </TableBody>
      )}
    </Table>
  );
};
