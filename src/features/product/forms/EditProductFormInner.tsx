import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategorySelect } from "@/features/category/components/CategorySelect";
import { useFormContext } from "react-hook-form";
import type { UpdateProductFormSchema } from "../types";

type EditProductFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateProductFormSchema) => void;
};

export const EditProductFormInner = ({
  formId,
  onSubmit,
}: EditProductFormInnerProps) => {
  const form = useFormContext<UpdateProductFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Input product name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <CategorySelect<UpdateProductFormSchema>
        label="Category"
        name="category_id"
        required
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Input product price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="Input product image" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Input product description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
