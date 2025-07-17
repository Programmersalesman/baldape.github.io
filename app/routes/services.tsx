import Services from "../../src/pages/Services";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "Services | BaldApe Services" },
    { name: "description", content: "Services offered by BaldApe for Discord community management." },
  ];
}

export default function ServicesRoute() {
  return <Layout><Services /></Layout>;
} 