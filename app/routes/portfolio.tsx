import PortfolioTest from "../../src/PortfolioTest";
import Layout from "../../src/components/Layout";

export function meta() {
  return [
    { title: "Portfolio | BaldApe Services" },
    { name: "description", content: "Portfolio of Discord community management by BaldApe Services." },
  ];
}

export default function Portfolio() {
  return <Layout><PortfolioTest /></Layout>;
} 