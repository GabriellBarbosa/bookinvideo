import { notFound } from "next/navigation";
import { API_URL } from "@/config/nest-api-url";
import { CertificateView } from "./certificate-view";

type CertificatePageProps = {
  params: Promise<{ "public-id": string }>;
};

export type PublicCertificate = {
  publicId: string;
  recipientName: string;
  courseTitle: string;
  workloadHours: number;
  completedAt: string;
};

async function getCertificate(publicId: string): Promise<PublicCertificate> {
  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}/certificate/${encodeURIComponent(publicId)}`,
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load certificate");
  }

  const certificate = (await response.json()) as PublicCertificate | null;

  if (!certificate) {
    notFound();
  }

  return certificate;
}

export default async function CertificatePage({
  params,
}: CertificatePageProps) {
  const { "public-id": publicId } = await params;
  const certificate = await getCertificate(publicId);

  return <CertificateView certificate={certificate} />;
}
