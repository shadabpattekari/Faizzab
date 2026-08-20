import { notFound } from "next/navigation";
import { Card, PageHeader } from "@/components/admin/AdminUI";
import { InsightForm } from "@/components/admin/InsightForm";
import { prisma } from "@/lib/db/prisma";

export default async function EditInsightPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insight = await prisma.insight.findUnique({ where: { id } });
  if (!insight) notFound();
  return (
    <>
      <PageHeader title="Edit insight" description={`Editing /insights/${insight.slug}`} />
      <Card>
        <InsightForm insight={insight} />
      </Card>
    </>
  );
}
