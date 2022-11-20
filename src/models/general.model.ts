export type UseNavigationType = {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
};

export type NavigationRouteType = {
  key?: string | object | undefined;
  name: string;
  params?: string | object | undefined;
};

export type ScreenOptionsHeaderTitleType = {
  children: string;
  tintColor?: string | undefined;
};
