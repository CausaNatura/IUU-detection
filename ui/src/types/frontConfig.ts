type GlobalConfigs = {
  logo: string;
  name: string;
  theme: string;
  latex: string;
  socketPort: number;
  socketUrl: string;
};

type SiderConfigs = {
  items: string;
};

export type FrontendConfig = {
  global: GlobalConfigs;
  sider?: SiderConfigs;
};

export type DiagnosticConfig = {
  diagnosticStatus: boolean;
};
