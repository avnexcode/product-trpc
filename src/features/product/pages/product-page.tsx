import {
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { DashboardProductSection } from "@/features/dashboard/layouts/DashboardProductSection";
import { ProductTable } from "../tables";
import { type Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

export const ProductPageMetadata: Metadata = {
  title: "Dashboard - Product",
};

export const ProductPage = () => {
  return (
    <PageContainer withHeader withFooter>
      <SectionContainer padded className="min-h-screen">
        <DashboardSection
          title="Dashboard - Product"
          description="Manage your products data"
        >
          <DashboardProductSection>
            <header className="py-4">
              <Link href={"/dashboard/product/create"}>
                <Button>
                  <CirclePlus />
                  Add Product
                </Button>
              </Link>
            </header>
            <ProductTable />
          </DashboardProductSection>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};
