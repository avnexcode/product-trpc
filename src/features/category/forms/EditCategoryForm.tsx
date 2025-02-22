"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateCategoryFormSchema } from "../schemas";
import type { UpdateCategoryFormSchema } from "../tables";
import { EditCategoryFormInner } from "./EditCategoryFormInner";
import { EditCategoryFormSkeleton } from "../components/skeleton";

type EditCategoryFormProps = {
  categoryId: string;
};

export const EditCategoryForm = ({ categoryId }: EditCategoryFormProps) => {
  const router = useRouter();
  const utils = api.useUtils();
  const form = useForm<UpdateCategoryFormSchema>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(updateCategoryFormSchema),
  });

  const { data: category, isLoading: isCategoryLoading } =
    api.category.getById.useQuery(
      { id: categoryId },
      { enabled: !!categoryId },
    );

  const { mutate: updateCategory, isPending: isUpdateCategoryPending } =
    api.category.update.useMutation({
      onSuccess: () => {
        toast.success("Update category successfully");
        void utils.category.getAll.invalidate();
        void void router.push("/dashboard/category");
      },
    });

  const onSubmit = (values: UpdateCategoryFormSchema) =>
    updateCategory({ ...values, id: categoryId });

  useEffect(() => {
    if (category) {
      form.reset({ name: category.name });
    }
  }, [category, form]);

  if (isCategoryLoading) {
    return <EditCategoryFormSkeleton />;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Form {...form}>
          <EditCategoryFormInner
            formId="update-category-form"
            onSubmit={onSubmit}
          />
        </Form>
      </CardContent>
      <CardFooter className="mt-10 place-content-end space-x-5">
        <Button onClick={() => router.push("/dashboard/category")}>
          Cancel
        </Button>
        <Button
          form="update-category-form"
          disabled={isUpdateCategoryPending || !form.formState.isDirty}
        >
          {!isUpdateCategoryPending ? (
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
