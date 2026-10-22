import Navbar from '../../components/Navbar';
import PageTransition from '../../components/PageTransition';
import FilesBoard from './FilesBoard';
import { siteConfig } from "@/siteConfig";

export const metadata = {
  title: "文件花园 | " + siteConfig.title,
  description: "文件、工具与资源分享",
};

export default function FilesPage() {
  return (
    <div className="min-h-screen relative pb-20">
      <Navbar />
      <PageTransition>
        <div className="mt-28">
          <FilesBoard />
        </div>
      </PageTransition>
    </div>
  );
}
