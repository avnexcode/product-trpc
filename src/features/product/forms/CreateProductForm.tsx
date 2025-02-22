"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { createProductFormSchema } from "../schemas";
import type { CreateProductFormSchema } from "../types";
import { CreateProductFormInner } from "./CreateProductFormInner";

export const CreateProductForm = () => {
  const router = useRouter();

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

  const onSubmit = (values: CreateProductFormSchema) => console.log(values);

  const isCreateProductPending = false;
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateProductFormInner
            formId="create-product-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-5">
        <Button onClick={() => router.push("/dashboard/product")}>
          Cancel
        </Button>
        <Button form="create-product-form" disabled={isCreateProductPending}>
          {!isCreateProductPending ? (
            "Add"
          ) : (
            <>
              <Loader2 className="animate-spin" />
              Adding...
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
