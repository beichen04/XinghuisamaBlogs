// data/files.ts - 文件分享列表（路线 C：直接放网盘分享链接）
export interface SharedFile {
  id: string;
  name: string;
  description: string;
  url: string;
  size?: string;
  source: string; // 来源：阿里云盘 / 蓝奏云 / 百度网盘 / 其他
  icon?: string;
}

// 在这里添加你的文件分享链接
export const filesData: SharedFile[] = [
  {
    id: "file_001",
    name: "刷机驱动",
    description: "刷机驱动工具包",
    url: "https://wwawg.lanzoue.com/itihO48ga04d",
    size: "—",
    source: "蓝奏云",
    icon: "🔧",
  },
];
