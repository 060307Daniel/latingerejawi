import { prisma } from "@/lib/prisma";

const pastorProfiles = {
  "RP. Stenly Pondaag, MSC": {
    image:
      "https://stfsp.ac.id/wp-content/uploads/2021/08/stenlyp-695x1024.jpg",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 – STF Seminari Pineleng, Manado",
      "S2 – Universität Innsbruck, Austria",
      "S3 – Universität Innsbruck, Austria",
    ],
  },

  "RP. Stefanus Watuseke, MSC": {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gEhxpnRYGc8F-29siUGxVwZBAIsYNBqbVjkOyMGNMfD9SjRwEUw6y5M&s=10",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 – STF Seminari Pineleng, Manado",
      "S2 – Pontificia Universitas Gregoriana, Roma",
    ],
  },

  "RD. Louis Bayak": {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq60ks3mytiChRnHExKJOVYjAKUNTFNFk87Onx5dVFg&s=10",
    position: "Pengajar di Seminari Keuskupan",
    education: [
      "S1 Filsafat – Seminari Tinggi Pineleng, Manado",
    ],
  },
};

export async function GET() {
  const pastors = await prisma.user.findMany({
    where: {
      role: "PASTOR",
    },
    select: {
      id: true,
      name: true,
      email: true,
      paroki: true,
      wilayah: true,
    },
  });

  const enrichedPastors = pastors.map((pastor: any) => ({
    ...pastor,
    ...(pastorProfiles[
      pastor.name as keyof typeof pastorProfiles
    ] || {
      image:
        "https://via.placeholder.com/300x300.png?text=Pastor",
      position: "Pastor Pendamping",
      education: [],
    }),
  }));

  return Response.json(enrichedPastors);
}