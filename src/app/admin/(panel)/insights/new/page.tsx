import { Card, PageHeader } from "@/components/admin/AdminUI";
import { InsightForm } from "@/components/admin/InsightForm";

export default function NewInsightPage() {
  return (
    <>
      <PageHeader title="New insight" description="Create a draft or publish a new FaizZab article." />
      <Card>
        <InsightForm />
      </Card>
    </>
  );
}
