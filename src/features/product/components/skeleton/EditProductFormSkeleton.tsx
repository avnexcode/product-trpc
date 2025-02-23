import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { renderElements } from "@/utils";

export const EditProductFormSkeleton = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-5">
        <EditProductFormInnerSkeleton />
        <div className="space-y-4">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-16 w-full" />
        </div>
      </CardContent>
      <CardFooter className="mt-10 place-content-end gap-5">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </CardFooter>
    </Card>
  );
};

export const EditProductFormInnerSkeleton = () => {
  return renderElements({
    of: [...new Array<undefined>(4)],
    keyExtractor: (_, i) => i,
    render: () => (
      <div className="space-y-4">
        <Skeleton className="h-5 w-44" />
        <Skeleton className="h-9 w-full" />
      </div>
    ),
  });
};
