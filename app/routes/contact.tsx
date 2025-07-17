import Contact from "../../src/pages/Contact";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "Contact | BaldApe Services" },
    { name: "description", content: "Contact BaldApe Services for Discord community management inquiries." },
  ];
}

export default function ContactRoute() {
  return <Layout><Contact /></Layout>;
} 