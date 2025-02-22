"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { createCategoryFormSchema } from "../schemas";
import type { CreateCategoryFormSchema } from "../tables";
import { CreateCategoryFormInner } from "./CreateCategoryFormInner";
import { api } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
        toast.success("Create category successfully");
        void utils.category.getAll.invalidate();
        void router.push("/dashboard/category");
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
