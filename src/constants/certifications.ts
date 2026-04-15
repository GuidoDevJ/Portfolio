export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badgeImage?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    // Reemplazá esta URL con el link real de tu credencial en Credly
    credentialUrl: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
];
