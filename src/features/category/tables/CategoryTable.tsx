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
import { api } from "@/lib/trpc/client";
import { renderElements } from "@/utils/render-elements";
import { SquarePen } from "lucide-react";
import Link from "next/link";
import { DeleteCategoryDialog } from "../components/action";
import { CategoryTableBodySkeleton } from "../components/skeleton";

export const CategoryTable = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = api.category.getAll.useQuery();
  return (
    <Table>
      <TableCaption>A list of your recent categories.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">No</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead className="w-[150px]">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      {isCategoriesLoading ? (
        <CategoryTableBodySkeleton />
      ) : (
        <TableBody>
          {renderElements({
            of: categories,
            keyExtractor: (category) => category.id,
            render: (category, index) => (
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{category.name}</TableCell>

                <TableCell className="space-x-1">
                  <Link href={`/dashboard/category/${category.id}/edit`}>
                    <Button variant={"outline"} size={"sm"}>
                      <SquarePen />
                    </Button>
                  </Link>
                  <DeleteCategoryDialog
                    categoryId={category.id}
                    refetchCategories={refetchCategories}
                  />
                </TableCell>
              </TableRow>
            ),
            isLoading: isCategoriesLoading,
            fallback: (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Categories data not found
                </TableCell>
              </TableRow>
            ),
          })}
        </TableBody>
      )}
    </Table>
  );
};
