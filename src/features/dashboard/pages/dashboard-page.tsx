import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";

export const DashboardPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection title="Dashboard" description="Manage your all data">
          Hello Dashboard
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
