import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type Metadata } from "next";
import { EditProductForm } from "../forms";

export const EditProductPageMetadata: Metadata = {
  title: "Dashboard - Edit Product",
};

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export const EditProductPage = async ({ params }: EditProductPageProps) => {
  const id = (await params).id;
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Edit Product"
          description="Manage your products data"
        >
          <EditProductForm productId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
