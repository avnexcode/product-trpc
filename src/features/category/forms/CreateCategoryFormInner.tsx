import { useFormContext } from "react-hook-form";
import type { CreateCategoryFormSchema } from "../types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CreateCategoryFormInnerProps = {
  formId: string;
  onSubmit: (values: CreateCategoryFormSchema) => void;
};

export const CreateCategoryFormInner = ({
  formId,
  onSubmit,
}: CreateCategoryFormInnerProps) => {
  const form = useFormContext<CreateCategoryFormSchema>();
  return (
    <form
      id={formId}
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4"
    >
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
