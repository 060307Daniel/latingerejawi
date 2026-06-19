import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

export async function generateCertificate(
  userName?: string,
  certificateDate?: string
) {
  if (!userName) {
    alert("Nama user tidak ditemukan");
    return;
  }

  const existingPdfBytes = await fetch(
    "/certificate-template.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(
    existingPdfBytes
  );

  const page = pdfDoc.getPages()[0];

  // =====================
  // FONT
  // =====================

  const nameFont =
    await pdfDoc.embedFont(
      StandardFonts.TimesRomanBold
    );

  const dateFont =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  // =====================
  // NAMA PESERTA
  // =====================

  let fontSize = 38;

  if (userName.length > 20) {
    fontSize = 32;
  }

  if (userName.length > 30) {
    fontSize = 28;
  }

  const pageWidth =
    page.getWidth();

  const textWidth =
    nameFont.widthOfTextAtSize(
      userName,
      fontSize
    );

  const x =
    (pageWidth - textWidth) / 2;

  const y = 589;

  page.drawText(userName, {
    x,
    y,
    size: fontSize,
    font: nameFont,
    color: rgb(
      0.91,
      0.60,
      0.05
    ),
  });

  // =====================
  // TANGGAL SERTIFIKAT
  // =====================

  const formattedDate =
  certificateDate
    ? new Date(certificateDate)
        .toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        )
    : new Date()
        .toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        );

page.drawText(
  `RESMI DIKELUARKAN PADA: ${formattedDate}`,
  {
    x: 25,
    y: 27,
    size: 12,
    font: dateFont,
    color: rgb(0, 0, 0),
  }
);

  // =====================
  // SIMPAN PDF
  // =====================

  const pdfBytes =
    await pdfDoc.save();

  const blob = new Blob(
    [pdfBytes.buffer as ArrayBuffer],
    {
      type: "application/pdf",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    `sertifikat-${userName}.pdf`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}