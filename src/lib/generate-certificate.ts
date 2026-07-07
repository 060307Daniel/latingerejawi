import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

interface CertificateData {
  userName: string;
  certificateDate?: string;
  pastorName?: string;
  pastorTitle?: string;
  parishLogo?: string;
}

export async function generateCertificate(
  data: CertificateData
) {
  try {
    console.log("===== CERTIFICATE DATA =====");
    console.log(data);

    if (!data.userName) {
      alert("Nama user tidak ditemukan");
      return;
    }

    // =====================
    // LOAD TEMPLATE
    // =====================

    console.log("STEP 1 - Load Template");

    const existingPdfBytes = await fetch(
      "/certificate-template-1.pdf"
    ).then((res) => res.arrayBuffer());

    console.log("STEP 2 - Template Loaded");

    const pdfDoc = await PDFDocument.load(
      existingPdfBytes
    );

    console.log("STEP 3 - PDF Loaded");

    const page = pdfDoc.getPages()[0];

    console.log("Page Width:", page.getWidth());
console.log("Page Height:", page.getHeight());

    // =====================
    // FONT
    // =====================

    const nameFont =
      await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold
      );

    const normalFont =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    // =====================
    // NAMA PESERTA
    // =====================

    let fontSize = 38;

    if (data.userName.length > 20) {
      fontSize = 32;
    }

    if (data.userName.length > 30) {
      fontSize = 28;
    }

    const pageWidth =
      page.getWidth();

    const textWidth =
      nameFont.widthOfTextAtSize(
        data.userName,
        fontSize
      );

    page.drawText(data.userName, {
      x: (pageWidth - textWidth) / 2,
      y: 589,
      size: fontSize,
      font: nameFont,
      color: rgb(
        0.91,
        0.60,
        0.05
      ),
    });

    // =====================
    // TANGGAL
    // =====================

    const formattedDate =
      data.certificateDate
        ? new Date(
            data.certificateDate
          ).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : new Date().toLocaleDateString(
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
        font: normalFont,
        color: rgb(0, 0, 0),
      }
    );

    // =====================
    // LOGO PAROKI
    // =====================

    console.log("Certificate Data:", data);

    if (data.parishLogo) {

      console.log(
        "Loading Logo:",
        data.parishLogo
      );

      const response =
        await fetch(data.parishLogo);

      console.log(
        "Logo Status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          "Logo gagal diambil."
        );
      }

      const contentType =
        response.headers.get(
          "content-type"
        );

      console.log(
        "Content Type:",
        contentType
      );

      const imageBytes =
        await response.arrayBuffer();

      console.log(
        "Image Size:",
        imageBytes.byteLength
      );

      let logo;

      if (
        contentType?.includes("png")
      ) {
        logo =
          await pdfDoc.embedPng(
            imageBytes
          );
      } else if (
        contentType?.includes("jpeg") ||
        contentType?.includes("jpg")
      ) {
        logo =
          await pdfDoc.embedJpg(
            imageBytes
          );
      } else {
        throw new Error(
          `Format gambar tidak didukung (${contentType})`
        );
      }

      console.log(
        "Logo Width:",
        logo.width
      );

      console.log(
        "Logo Height:",
        logo.height
      );

      page.drawImage(logo, {
        x: 506,
        y: 738,
        width: 70,
        height: 70,
      });

      console.log(
        "Logo berhasil digambar."
      );
    }

    // =====================
    // NAMA PASTOR
    // =====================

    if (data.pastorName) {

      page.drawText(
        data.pastorName,
        {
          x: 340,
          y: 40,
          size: 9,
          font: normalFont,
          color: rgb(0,0,0),
        }
      );

    }

    // =====================
    // JABATAN
    // =====================

    if (data.pastorTitle) {

      page.drawText(
        data.pastorTitle,
        {
          x: 343,
          y: 32,
          size: 9,
          font: normalFont,
          color: rgb(0,0,0),
        }
      );

    }

    // =====================
    // SAVE PDF
    // =====================

    console.log(
      "STEP - Saving PDF"
    );

    const pdfBytes = await pdfDoc.save();

const blob = new Blob(
  [
    pdfBytes.buffer.slice(
      pdfBytes.byteOffset,
      pdfBytes.byteOffset + pdfBytes.byteLength
    ) as ArrayBuffer,
  ],
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
      `sertifikat-${data.userName}.pdf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    console.log(
      "===== SELESAI ====="
    );

  } catch (err) {

    console.error(
      "GENERATE CERTIFICATE ERROR:",
      err
    );

    alert(
      "Terjadi kesalahan saat membuat sertifikat. Silakan buka Console (F12)."
    );
  }
}