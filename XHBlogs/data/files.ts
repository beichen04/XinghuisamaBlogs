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
    name: "示例文件",
    description: "这是一个示例文件，改成你自己的文件和链接即可。",
    url: "https://example.com/your-file",
    size: "—",
    source: "蓝奏云",
    icon: "📄",
  },
];
