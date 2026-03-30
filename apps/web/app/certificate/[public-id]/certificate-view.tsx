"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck } from "lucide-react";
import type { PublicCertificate } from "./page";

type CertificateViewProps = {
  certificate: PublicCertificate;
};

function formatCompletedAt(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

export function CertificateView({ certificate }: CertificateViewProps) {
  const [isPrinting, setIsPrinting] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window?.location?.href || "");
  }, []);

  const handleDownloadPdf = () => {
    const previousTitle = document.title;
    document.title = `certificate-${certificate.publicId}`;
    setIsPrinting(true);

    window.print();

    window.setTimeout(() => {
      document.title = previousTitle;
      setIsPrinting(false);
    }, 300);
  };

  const completedAtLabel = formatCompletedAt(certificate.completedAt);

  return (
    <>
      <style>{`
        @page {
          size: A4 landscape;
          margin: 0;
        }

        @media print {
          html, body {
            background: white !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <main className="min-h-screen bg-stone-50 px-4 py-6 text-stone-900 sm:px-6 lg:px-10 print:min-h-0 print:bg-white print:p-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 print:max-w-none print:gap-0">
          <section className="print:hidden flex flex-col gap-3 rounded-[28px] border border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight text-stone-950">
                Certificado verificável
              </h1>
            </div>

            <Button
              size="lg"
              onClick={handleDownloadPdf}
              disabled={isPrinting}
              className="bg-stone-950 text-white hover:bg-stone-800"
            >
              <Download />
              {isPrinting ? "Preparando PDF..." : "Baixar em PDF"}
            </Button>
          </section>

          <section className="overflow-hidden border-[20px] border-orange-300 bg-white print:h-[210mm] print:w-[297mm] print:rounded-none">
            <div className="flex flex-col justify-between aspect-[297/210] w-full h-full overflow-hidden rounded-[28px] bg-white px-14 py-12 text-center print:h-full print:w-full print:rounded-none">
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 px-4 py-2 text-stone-950">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-lg tracking-[0.2em] uppercase text-xs font-semibold text-stone-900">
                    Book In Video
                  </span>
                </div>

                <p className="mt-6 uppercase tracking-[0.1em] text-3xl font-serif text-orange-400 font-semibold">
                  Certificado de Conclusão
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center">
                <p className="max-w-2xl text-sm leading-relaxed text-stone-600 italic font-serif">
                  Este documento certifica que
                </p>
                <p className="mt-5 font-serif text-3xl leading-tight text-stone-950 sm:text-5xl md:text-6xl">
                  {certificate.recipientName}
                </p>

                <div className="mx-auto mt-4 h-px w-48 bg-orange-200 sm:w-64" />

                <p className="italic text-sm text-stone-700 mt-4 sm:text-base">
                  concluiu com aproveitamento o curso{" "}
                  <span className="font-semibold text-stone-950">
                    {certificate.courseTitle}
                  </span>
                  , com carga horaria total de{" "}
                  <span className="font-semibold text-stone-950">
                    {certificate.workloadHours} horas
                  </span>
                  .
                </p>
              </div>

              <div className="relative mt-8 grid gap-4 text-left sm:mt-10 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700">
                    Detalhes da emissao
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Emitido em
                      </p>
                      <p className="mt-1 text-base font-medium text-stone-950">
                        {completedAtLabel}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                        Carga horaria
                      </p>
                      <p className="mt-1 text-base font-medium text-stone-950">
                        {certificate.workloadHours} horas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-stone-200 bg-white p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-700">
                    URL de verificação
                  </p>
                  <p className="mt-3 break-all font-mono text-xs leading-6 text-stone-600">
                    {currentUrl}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
