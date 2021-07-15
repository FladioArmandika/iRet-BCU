type OpticalDataType =
  | 'SpectralAverage'
  | 'Spectral'
  | 'BSDF'
  | 'SpectralAndAngle';
type GasType = 'Air' | 'Argon' | 'Krypton' | 'Xenon';

export interface Material {
  name: string;
  // category: string;
  image: string;
}

export interface MaterialMass extends Material {
  thickness: number;
  conductivity: number;
  density: number;
  specificHeat: number;
  roughness: string;
  thermalAbsorptance: number;
  solarAbsorptance: number;
  visibleAbsorptance: number;
}

export interface MaterialNoMass extends Material {
  thermalResistance: number;
  roughness: string;
  thermalAbsorptance: number;
  solarAbsorptance: number;
  visibleAbsorptance: number;
}

export interface MaterialAirGap extends Material {
  thermalResistance: number;
}

export interface MaterialWindowGlazing extends Material {
  opticalDataType: OpticalDataType;
  thickness: number;
  solarTransmittance: number;
  frontSolarReflectance: number;
  backSolarReflectance: number;
  visibleTransmittance: number;
  frontVisibleReflectance: number;
  backVisibleReflectance: number;
  infraredTransmittance: number;
  frontInfraredHemispherical: number;
  backInfraredHemispherical: number;
  conductivity: number;
}

export interface MaterialWindowGas extends Material {
  gasType: GasType;
  thickness: number;
}
