import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import type { Metadata } from "next";
import { EditCategoryForm } from "../forms";

export const EditCategoryPageMetadata: Metadata = {
  title: "Dashboard | Edit Category",
};

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
  const id = (await params).id;
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Edit Category"
          description="Manage your categories data"
        >
          <EditCategoryForm categoryId={id} />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
