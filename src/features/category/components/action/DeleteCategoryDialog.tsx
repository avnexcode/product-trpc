import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type DeleteCategoryDialogProps = {
  categoryId: string;
  refetchCategories: () => void;
};

export const DeleteCategoryDialog = ({
  categoryId,
  refetchCategories,
}: DeleteCategoryDialogProps) => {
  const { mutate: deleteCategory } = api.category.delete.useMutation({
    onSuccess: () => {
      toast.success("Delete category successfully");
      refetchCategories();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete category");
    },
  });

  const handleDeleteCategory = () => deleteCategory({ id: categoryId });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            category and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteCategory}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
