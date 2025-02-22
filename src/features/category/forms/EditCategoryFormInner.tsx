import { useFormContext } from "react-hook-form";
import type { UpdateCategoryFormSchema } from "../types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type EditCategoryFormInnerProps = {
  formId: string;
  onSubmit: (values: UpdateCategoryFormSchema) => void;
};

export const EditCategoryFormInner = ({
  formId,
  onSubmit,
}: EditCategoryFormInnerProps) => {
  const form = useFormContext<UpdateCategoryFormSchema>();
  return (
    <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Input category name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  );
};
