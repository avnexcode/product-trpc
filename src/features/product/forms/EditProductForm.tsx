"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EditProductFormSkeleton } from "../components/skeleton";
import { createProductFormSchema } from "../schemas";
import type { CreateProductFormSchema } from "../types";
import { EditProductFormInner } from "./EditProductFormInner";

type EditProductFormProps = {
  productId: string;
};

export const EditProductForm = ({ productId }: EditProductFormProps) => {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<CreateProductFormSchema>({
    defaultValues: {
      name: "",
      image: "",
      price: "",
      description: "",
      category_id: "",
    },
    resolver: zodResolver(createProductFormSchema),
  });

  const { data: product, isPending: isProductLoading } =
    api.product.getById.useQuery({ id: productId }, { enabled: !!productId });

  useEffect(() => {
    if (product) {
      form.reset({
        ...product,
        image: product.image ?? "",
        description: product.description ?? "",
      });
    }
  }, [form, product]);

  const { mutate: updateProduct, isPending: isUpdateProductPending } =
    api.product.update.useMutation({
      onSuccess: () => {
        void utils.product.getAll.invalidate();
        toast.success("Update product successfully");
        router.replace("/dashboard/product");
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to edit product");
      },
    });

  const onSubmit = (values: CreateProductFormSchema) =>
    updateProduct({ ...values, id: productId });

  if (isProductLoading) {
    return <EditProductFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditProductFormInner
            formId="update-product-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-5">
        <Button onClick={() => router.push("/dashboard/product")}>
          Cancel
        </Button>
        <Button
          form="update-product-form"
          disabled={isUpdateProductPending || !form.formState.isDirty}
        >
          {!isUpdateProductPending ? (
            "Update"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Updating...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
