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
import type { CreateProductFormSchema } from "../types";
import { inputHandle } from "@/utils";

type CreateProductFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateProductFormSchema) => void;
};

export const CreateProductFormInner = ({
  formId,
  onSubmit,
}: CreateProductFormInnerProps) => {
  const form = useFormContext<CreateProductFormSchema>();
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
      <CategorySelect<CreateProductFormSchema>
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
              <Input
                placeholder="Input product price"
                {...field}
                onChange={(e) => {
                  inputHandle("onChange", "number", e);
                  field.onChange(e);
                }}
                onPaste={(e) => {
                  inputHandle("onPaste", "number", e);
                }}
              />
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
