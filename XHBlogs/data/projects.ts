// data/projects.ts - 项目展示数据

export type Project = {
  id: string;
  name: string;
  description: string;
  icon: string;
  githubUrl: string;
  tags: string[];
};

export const projectsData: Project[] = [
  {
    id: "proj_ksuroot",
    name: "KSuRoot 管理器",
    githubUrl: "https://github.com/hmascs/KSuRoot",
    description: "基于 CVE-2026-43499(GhostLock) 的一键 KernelSU 提权工具。多内核支持：6.1 / 6.6 / 6.12 三族各有专属基线，另有 50 档上游内核适配；多机型动态库内置：122 条厂商载荷离线可用，按机型+内核+commit 三级匹配；新增「载荷构建」用本机 boot.img 解析偏移打出适配本机的载荷；免 ADB。",
    icon: "🛡️",
    tags: [
      "KernelSU",
      "Root",
      "Android"
    ]
  },
  {
    id: "proj_1775049332705",
    name: "Computational Chemistry Tool",
    githubUrl: "https://github.com/heiehiehi/Computational_Chemistry_Tool",
    description: "该工具本作者使用在Win下的WSL2平台，系统为Ubuntu22，个人使用请依据自己数据进行修改（这些工具只是整合了一些流程）",
    icon: "🚀",
    tags: [
      "Gromacs",
      "RMSF"
    ]
  },
];
