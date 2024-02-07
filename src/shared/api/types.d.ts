export type BaseIcon = {
  large: string;
  medium: string;
};

export type VehicleIcon = BaseIcon & {
  __typename: 'IconsVehicle';
};

export type VehicleClassIcon = BaseIcon & {
  default: string;
  __typename: 'IconsVehicleClass';
};

export type Nation = {
  __typename: 'Nation';
  name: 'japan';
  title: 'Japan';
  color: '#d1d9db';
  icons: VehicleClassIcon;
};

export type VehicleType = {
  __typename: 'VehicleType';
  name: 'submarine';
  title: 'Submarine';
  icons: VehicleClassIcon;
};

export type Vehicle = {
  description: string;
  icons: VehicleIcon;
  level: number;
  nation: Nation;
  title: string;
  type: VehicleType;
  __typename: 'Vehicle';
};
