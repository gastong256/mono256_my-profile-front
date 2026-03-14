import type { Metadata } from "next";

import { AdminSubmissionPage } from "@/components/pages/admin-submission-page";

export const metadata: Metadata = {
  title: "Submission Detail",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminSubmissionRoutePage({
  params,
}: Readonly<{
  params: {
    id: string;
  };
}>) {
  return <AdminSubmissionPage submissionId={params.id} />;
}
