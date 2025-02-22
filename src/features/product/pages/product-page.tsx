import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardProductSection } from "@/features/dashboard/layouts/DashboardProductSection";

export const ProductPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Product"
          description="Manage your products data"
        >
          <DashboardProductSection>Hello Product</DashboardProductSection>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
