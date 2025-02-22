import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { CreateProductForm } from "../forms";
import { type Metadata } from "next";

export const CreateProductPageMetadata: Metadata = {
  title: "Dashboard - Create Product",
};

export const CreateProductPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Create Product"
          description="Manage your products data"
        >
          <CreateProductForm />
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
