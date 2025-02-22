import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { Button } from "@/components/ui/button";
import { DashboardProductSection } from "@/features/dashboard/layouts";
import { CirclePlus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CategoryTable } from "../tables";

export const CategoryPageMetadata: Metadata = {
  title: "Dashboard | Category",
};

export const CategoryPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Category"
          description="Manage your categories data"
        >
          <DashboardProductSection>
            <header className="py-4">
              <Link href={"/dashboard/category/create"}>
                <Button>
                  <CirclePlus />
                  Add Category
                </Button>
              </Link>
            </header>
            <CategoryTable />
          </DashboardProductSection>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
