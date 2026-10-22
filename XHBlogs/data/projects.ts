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
    id: "proj_kernelsu",
    name: "KernelSU",
    githubUrl: "https://github.com/tiann/KernelSU",
    description: "A Kernel based root solution for Android. KernelSU 是基于内核的 Android Root 解决方案，为 GKI 设备提供强大的 root 权限管理能力。",
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
