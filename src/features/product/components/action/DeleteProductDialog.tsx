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

type DeleteProductDialogProps = {
  productId: string;
  refetchProducts: () => void;
};

export const DeleteProductDialog = ({
  productId,
  refetchProducts,
}: DeleteProductDialogProps) => {
  const { mutate: deleteProduct } = api.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Delete product successfully");
      refetchProducts();
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to delete product");
    },
  });

  const handleDeleteProduct = () => deleteProduct({ id: productId });

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
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteProduct}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
