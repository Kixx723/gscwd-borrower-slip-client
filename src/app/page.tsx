
import Header from "@/components/Header";
import dynamic from 'next/dynamic'
const Dashboard = dynamic(() => import('@/components/DashBoard'), { ssr: false })

export default function Home() {
  return (
    <>
      <Header title="ICTD BORROWER SLIP SYSTEM" />
      <Dashboard />
    </>
  );
}
