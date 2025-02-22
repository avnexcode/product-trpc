import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateCategoryForm } from "../forms";
import type { Metadata } from "next";

export const CreateCategoryPageMetadata: Metadata = {
  title: "Dashboard | Create Category",
};

export const CreateCategoryPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Create Category"
          description="Manage your categories data"
        >
          <CreateCategoryForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
