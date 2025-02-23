"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategoryFormSchema } from "../schemas";
import type { CreateCategoryFormSchema } from "../types";
import { CreateCategoryFormInner } from "./CreateCategoryFormInner";

export const CreateCategoryForm = () => {
  const router = useRouter();
  const utils = api.useUtils();

  const form = useForm<CreateCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(createCategoryFormSchema),
  });

  const { mutate: createCategory, isPending: isCreateCategoryPending } =
    api.category.create.useMutation({
      onSuccess: () => {
        void utils.category.getAll.invalidate();
        toast.success("Create category successfully");
        router.replace("/dashboard/category");
      },
      onError: (error) => {
        toast.error(error.message ?? "Failed to create category");
      },
    });

  const onSubmit = (values: CreateCategoryFormSchema) => createCategory(values);

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <CreateCategoryFormInner
            formId="create-category-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-5">
        <Button onClick={() => router.push("/dashboard/category")}>
          Cancel
        </Button>
        <Button form="create-category-form" disabled={isCreateCategoryPending}>
          {!isCreateCategoryPending ? (
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
