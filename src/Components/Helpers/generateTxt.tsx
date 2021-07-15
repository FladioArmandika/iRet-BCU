/* eslint-disable array-callback-return */
import { MaterialList } from '../../stores/App/types';
import {
  Zone,
  Coordinate,
  WallCorner,
  FloorCorner,
  RoofCorner,
  ZoneConstruction,
  ZoneWindow,
} from '../../types/idf';
import { MaterialMass, MaterialNoMass } from '../../types/material';
import { Construction, Floor, Window } from '../../types/type';

export const generateTxt = (
  floors: Floor[],
  materials: MaterialList,
  constructions: Construction[],
) => {
  const zones: Zone[] = [];
  let floorArea: number;
  floors[0].rooms.map((room) => {
    floorArea += room.width * room.height;
    const { depth } = room;

    // 2D Side
    const corner1: Coordinate = {
      x: room.x,
      y: room.y,
      z: 0,
    };
    const corner2: Coordinate = {
      x: room.x + room.width,
      y: room.y,
      z: 0,
    };
    const corner3: Coordinate = {
      x: room.x + room.width,
      y: room.y + room.height,
      z: 0,
    };
    const corner4: Coordinate = {
      x: room.x,
      y: room.y + room.height,
      z: 0,
    };

    // 3D Wall
    const wall1: WallCorner = {
      cornerBottomLeft: { ...corner1 },
      cornerTopLeft: {
        x: corner1.x,
        y: corner1.y,
        z: corner1.z + depth,
      },
      cornerBottomRight: { ...corner2 },
      cornerTopRight: {
        x: corner2.x,
        y: corner2.y,
        z: corner2.z + depth,
      },
    };

    const wall2 = {
      cornerBottomLeft: { ...corner2 },
      cornerTopLeft: {
        x: corner2.x,
        y: corner2.y,
        z: corner2.z + depth,
      },
      cornerBottomRight: { ...corner3 },
      cornerTopRight: {
        x: corner3.x,
        y: corner3.y,
        z: corner3.z + depth,
      },
    };

    const wall3 = {
      cornerBottomLeft: { ...corner3 },
      cornerTopLeft: {
        x: corner3.x,
        y: corner3.y,
        z: corner3.z + depth,
      },
      cornerBottomRight: { ...corner4 },
      cornerTopRight: {
        x: corner4.x,
        y: corner4.y,
        z: corner4.z + depth,
      },
    };

    const wall4: WallCorner = {
      cornerBottomLeft: { ...corner4 },
      cornerTopLeft: {
        x: corner4.x,
        y: corner4.y,
        z: corner4.z + depth,
      },
      cornerBottomRight: { ...corner1 },
      cornerTopRight: {
        x: corner1.x,
        y: corner1.y,
        z: corner1.z + depth,
      },
    };

    const SurfaceFloor: FloorCorner = {
      cornerBottomLeft: { ...corner4 }, // i changed this
      cornerTopLeft: { ...corner1 },
      cornerBottomRight: { ...corner3 }, // i changed this
      cornerTopRight: { ...corner2 },
    };
    const SurfaceRoof: RoofCorner = {
      cornerBottomLeft: { ...corner4, z: corner4.z + depth }, // this one
      cornerTopLeft: { ...corner1, z: corner1.z + depth },
      cornerBottomRight: { ...corner3, z: corner3.z + depth }, // this one
      cornerTopRight: { ...corner2, z: corner2.z + depth },
    };

    const roomWalls: Construction[] = [];
    room.construction.wall.map((nameList) => {
      roomWalls.push(
        constructions.find((x) => x.name === nameList) as Construction,
      );
    });

    const roomWindows: ZoneWindow[] = room.windows.map((window: Window) => ({
      ...window,
      cornerBottomLeft: {
        x: window.x,
        y: window.y,
        z: 0,
      },
      cornerTopLeft: {
        x: window.x,
        y: window.y,
        z: window.depth,
      },
      cornerBottomRight: {
        x: window.x + window.width,
        y: window.y,
        z: 0,
      },
      cornerTopRight: {
        x: window.x + window.width,
        y: window.y,
        z: window.depth,
      },
    }));
    const roomWindowsConstruction: Construction[] = [];
    roomWindows.map((window: Window) => {
      constructions.map((construction: Construction) => {
        if (construction.name === window.construction)
          roomWindowsConstruction.push(construction);
      });
    });

    const construction: ZoneConstruction = {
      wall: roomWalls,
      floor: constructions.find(
        (x) => x.name === room.construction.floor,
      ) as Construction,
      roof: constructions.find(
        (x) => x.name === room.construction.roof,
      ) as Construction,
      windows: roomWindowsConstruction,
    };

    const zone: Zone = {
      name: room.name,
      windows: roomWindows,
      floorArea,
      corners: { corner1, corner2, corner3, corner4 },
      walls: { wall1, wall2, wall3, wall4 },
      surfaces: {
        floor: SurfaceFloor,
        roof: SurfaceRoof,
      },
      construction,
    };

    zones.push(zone);
  });

  let data = `
    !-Generator IDFEditor 1.34
    !-Option OriginalOrderTop UseSpecialFormat
    !-NOTE: All comments with '!-' are ignored by the IDFEditor and are generated automatically.
    !-      Use '!' comments if they need to be retained when using the IDFEditor.
    !1ZoneUncontrolled.idf
    ! Basic file description:  Basic test for EnergyPlus.  Resistive Walls.  Regular (no ground contact) floor.
    !                          Regular roof.  No Windows.
    !
    ! Highlights:              Very basic test to see that EnergyPlus "works".
    !
    !
    ! Simulation Location/Run: Denver Centennial  Golden CO USA WMO=724666, 2 design days, 1 run period,
    !                          Run Control executes two design days (see RUN PERIOD object)
    !
    ! Location:                Denver, CO
    !
    ! Design Days:             Denver Centennial  Golden CO USA Annual Heating 99%, MaxDB=-15.5°C
    !                          Denver Centennial  Golden CO USA Annual Cooling (DB=>MWB) 1%, MaxDB=32°C MWB=15.5°C
    !
    ! Run Period (Weather File): Full Annual Simulation, DENVER_STAPLETON_CO_USA_WMO_724690
    !
    ! Run Control:             No zone or system sizing, design day run control (no weather file simulation)
    !
    ! Building: Fictional ${zones.length} zone building with resistive walls.
    !
    !           The building is oriented due north.
    ! 
    ! Floor Area:        0 m2
    ! Number of Stories: 1
    !
    ! Zone Description Details:
    !
    !       (0,0)                 (0,0)
    !              _____________________________
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |                             |
    !             |_____________________________|
    !
    !          (0,0)                      (,0)
    !
    ! Internal gains description:     NA
    !
    ! Interzone Surfaces:             None
    ! Internal Mass:                  None
    ! People:                         None
    ! Lights:                         None
    ! Equipment:                      None
    ! Windows:                        0
    ! Detached Shading:               None
    ! Daylight:                       None
    ! Natural Ventilation:            None
    ! Compact Schedules:              NA (Example of non-Compact Schedules)
    ! Solar Distribution:             MinimalShadowing
    !
    ! HVAC:                           NA
    !
    ! Zonal Equipment:                NA
    ! Central Air Handling Equipment: No
    ! System Equipment Autosize:      No
    ! Purchased Cooling:              No
    ! Purchased Heating:              No
    ! Purchased Chilled Water:        No
    ! Purchased Hot Water:            No
    ! Coils:                          None
    ! Pumps:                          None
    ! Boilers:                        None
    ! Chillers:                       None
    ! Towers:                         None
    !
    ! Results:
    ! Standard Reports:               Variable Dictionary, Surfaces (dxf-wireframe), Meter File
    ! Timestep or Hourly Variables:   Hourly and Daily
    ! Time bins Report:               None
    ! HTML Report:                    None
    ! Environmental Emissions:        None
    ! Utility Tariffs:                None

    Version,9.4;

    Timestep,4;
  
    Building,
      Simple One Zone (Wireframe DXF),  !- Name
      0,                       !- North Axis {deg}
      Suburbs,                 !- Terrain
      0.04,                    !- Loads Convergence Tolerance Value {W}
      0.004,                   !- Temperature Convergence Tolerance Value {deltaC}
      MinimalShadowing,        !- Solar Distribution
      30,                      !- Maximum Number of Warmup Days
      6;                       !- Minimum Number of Warmup Days
  
    HeatBalanceAlgorithm,ConductionTransferFunction;
  
    SurfaceConvectionAlgorithm:Inside,TARP;
  
    SurfaceConvectionAlgorithm:Outside,DOE-2;
  
    SimulationControl,
      No,                      !- Do Zone Sizing Calculation
      No,                      !- Do System Sizing Calculation
      No,                      !- Do Plant Sizing Calculation
      Yes,                     !- Run Simulation for Sizing Periods
      Yes,                     !- Run Simulation for Weather File Run Periods
      No,                      !- Do HVAC Sizing Simulation for Sizing Periods
      1;                       !- Maximum Number of HVAC Sizing Simulation Passes
  
    RunPeriod,
      Run Period 1,            !- Name
      1,                       !- Begin Month
      1,                       !- Begin Day of Month
      ,                        !- Begin Year
      12,                      !- End Month
      31,                      !- End Day of Month
      ,                        !- End Year
      Tuesday,                 !- Day of Week for Start Day
      Yes,                     !- Use Weather File Holidays and Special Days
      Yes,                     !- Use Weather File Daylight Saving Period
      No,                      !- Apply Weekend Holiday Rule
      Yes,                     !- Use Weather File Rain Indicators
      Yes;                     !- Use Weather File Snow Indicators
  
    Site:Location,
      Denver Centennial  Golden   N_CO_USA Design_Conditions,  !- Name
      39.74,                   !- Latitude {deg}
      -105.18,                 !- Longitude {deg}
      -7.00,                   !- Time Zone {hr}
      1829.00;                 !- Elevation {m}
  
  !  WMO=724666 Time Zone=NAM: (GMT-07:00) Mountain Time (US & Canada)
  !  Data Source=ASHRAE 2009 Annual Design Conditions
  ! Denver Centennial  Golden   N_CO_USA Annual Heating Design Conditions Wind Speed=3m/s Wind Dir=340
  ! Coldest Month=DEC
  ! Denver Centennial  Golden   N_CO_USA Annual Heating 99%, MaxDB=-15.5°C
  
    SizingPeriod:DesignDay,
      Denver Centennial  Golden   N Ann Htg 99% Condns DB,  !- Name
      12,                      !- Month
      21,                      !- Day of Month
      WinterDesignDay,         !- Day Type
      -15.5,                   !- Maximum Dry-Bulb Temperature {C}
      0.0,                     !- Daily Dry-Bulb Temperature Range {deltaC}
      ,                        !- Dry-Bulb Temperature Range Modifier Type
      ,                        !- Dry-Bulb Temperature Range Modifier Day Schedule Name
      Wetbulb,                 !- Humidity Condition Type
      -15.5,                   !- Wetbulb or DewPoint at Maximum Dry-Bulb {C}
      ,                        !- Humidity Condition Day Schedule Name
      ,                        !- Humidity Ratio at Maximum Dry-Bulb {kgWater/kgDryAir}
      ,                        !- Enthalpy at Maximum Dry-Bulb {J/kg}
      ,                        !- Daily Wet-Bulb Temperature Range {deltaC}
      81198.,                  !- Barometric Pressure {Pa}
      3,                       !- Wind Speed {m/s}
      340,                     !- Wind Direction {deg}
      No,                      !- Rain Indicator
      No,                      !- Snow Indicator
      No,                      !- Daylight Saving Time Indicator
      ASHRAEClearSky,          !- Solar Model Indicator
      ,                        !- Beam Solar Day Schedule Name
      ,                        !- Diffuse Solar Day Schedule Name
      ,                        !- ASHRAE Clear Sky Optical Depth for Beam Irradiance (taub) {dimensionless}
      ,                        !- ASHRAE Clear Sky Optical Depth for Diffuse Irradiance (taud) {dimensionless}
      0.00;                    !- Sky Clearness
  
  ! Denver Centennial  Golden   N Annual Cooling Design Conditions Wind Speed=4.9m/s Wind Dir=0
  ! Hottest Month=JUL
  ! Denver Centennial  Golden   N_CO_USA Annual Cooling (DB=>MWB) 1%, MaxDB=32°C MWB=15.5°C
  
    SizingPeriod:DesignDay,
      Denver Centennial  Golden   N Ann Clg 1% Condns DB=>MWB,  !- Name
      7,                       !- Month
      21,                      !- Day of Month
      SummerDesignDay,         !- Day Type
      32,                      !- Maximum Dry-Bulb Temperature {C}
      15.2,                    !- Daily Dry-Bulb Temperature Range {deltaC}
      ,                        !- Dry-Bulb Temperature Range Modifier Type
      ,                        !- Dry-Bulb Temperature Range Modifier Day Schedule Name
      Wetbulb,                 !- Humidity Condition Type
      15.5,                    !- Wetbulb or DewPoint at Maximum Dry-Bulb {C}
      ,                        !- Humidity Condition Day Schedule Name
      ,                        !- Humidity Ratio at Maximum Dry-Bulb {kgWater/kgDryAir}
      ,                        !- Enthalpy at Maximum Dry-Bulb {J/kg}
      ,                        !- Daily Wet-Bulb Temperature Range {deltaC}
      81198.,                  !- Barometric Pressure {Pa}
      4.9,                     !- Wind Speed {m/s}
      0,                       !- Wind Direction {deg}
      No,                      !- Rain Indicator
      No,                      !- Snow Indicator
      No,                      !- Daylight Saving Time Indicator
      ASHRAEClearSky,          !- Solar Model Indicator
      ,                        !- Beam Solar Day Schedule Name
      ,                        !- Diffuse Solar Day Schedule Name
      ,                        !- ASHRAE Clear Sky Optical Depth for Beam Irradiance (taub) {dimensionless}
      ,                        !- ASHRAE Clear Sky Optical Depth for Diffuse Irradiance (taud) {dimensionless}
      1.00;                    !- Sky Clearness
    `;

  materials.noMass.map((noMass: MaterialNoMass) => {
    data = data.concat(
      `Material:NoMass,
        ${noMass.name},                !- Name
        ${noMass.roughness},                   !- Roughness
        ${noMass.thermalResistance},                !- Thermal Resistance {m2-K/W}
        ${noMass.thermalAbsorptance},               !- Thermal Absorptance
        ${noMass.solarAbsorptance},               !- Solar Absorptance
        ${noMass.visibleAbsorptance};               !- Visible Absorptance
        
        `,
    );
  });

  materials.mass.map((mass: MaterialMass) => {
    data = data.concat(
      `Material,
        ${mass.name},   !- Name
        ${mass.roughness},             !- Roughness
        ${mass.thickness},               !- Thickness {m}
        ${mass.conductivity},                !- Conductivity {W/m-K}
        ${mass.density},                !- Density {kg/m3}
        ${mass.specificHeat},                !- Specific Heat {J/kg-K}
        ${mass.thermalAbsorptance},               !- Thermal Absorptance
        ${mass.solarAbsorptance},               !- Solar Absorptance
        ${mass.visibleAbsorptance};               !- Visible Absorptance
      
      `,
    );
  });

  zones.map((zone) => {
    zone.construction.wall.map((wall) => {
      data = data.concat(
        `Construction,
            ${wall.name},                 !- Name
            ${wall.material[0]};                !- Outside Layer
          
            `,
      );
    });
  });
  zones.map((zone) => {
    data = data.concat(
      `Construction,
        ${zone.construction.floor.material[0]},                 !- Name
        ${zone.construction.floor.material[0]};                !- Outside Layer
      
      `,
    );
  });
  zones.map((zone) => {
    data = data.concat(
      `Construction,
        ${zone.construction.roof.material[0]},                 !- Name
        ${zone.construction.roof.material[0]};                !- Outside Layer
      
      `,
    );
  });
  zones.map((zone) => {
    zone.construction.windows.map((window) => {
      data = data.concat(
        `Construction,
            ${window.material[0]},                 !- Name
            ${window.material[0]};                !- Outside Layer
          
          `,
      );
    });
  });

  zones.map((zone) => {
    data = data.concat(
      `
        Zone,
          ZONE ONE,                !- Name
          0,                       !- Direction of Relative North {deg}
          ${zone.corners.corner1.x},                       !- X Origin {m}
          ${zone.corners.corner1.y},                       !- Y Origin {m}
          ${zone.corners.corner1.z},                       !- Z Origin {m}
          1,                       !- Type
          1,                       !- Multiplier
          autocalculate,           !- Ceiling Height {m}
          autocalculate;           !- Volume {m3}
      `,
    );
  });

  data = data.concat(
    `ScheduleTypeLimits,
        Fraction,                !- Name
        0.0,                     !- Lower Limit Value
        1.0,                     !- Upper Limit Value
        CONTINUOUS;              !- Numeric Type
    
      GlobalGeometryRules,
        UpperLeftCorner,         !- Starting Vertex Position
        CounterClockWise,        !- Vertex Entry Direction
        World;                   !- Coordinate System
    `,
  );

  zones.map((zone) => {
    data = data.concat(
      `BuildingSurface:Detailed,
          ${zone.name}:Wall001,           !- Name
          Wall,                    !- Surface Type
          ${zone.construction.wall[0].name},                 !- Construction Name
          ZONE ONE,                !- Zone Name
          Outdoors,                !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          SunExposed,              !- Sun Exposure
          WindExposed,             !- Wind Exposure
          0.5000000,               !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.walls.wall1.cornerTopLeft.x},${zone.walls.wall1.cornerTopLeft.y},${zone.walls.wall1.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.walls.wall1.cornerTopRight.x},${zone.walls.wall1.cornerTopRight.y},${zone.walls.wall1.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.walls.wall1.cornerBottomRight.x},${zone.walls.wall1.cornerBottomRight.y},${zone.walls.wall1.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.walls.wall1.cornerBottomLeft.x},${zone.walls.wall1.cornerBottomLeft.y},${zone.walls.wall1.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
      
        BuildingSurface:Detailed,
          ${zone.name}:Wall002,           !- Name
          Wall,                    !- Surface Type
          ${zone.construction.wall[1].name},                 !- Construction Name
          ZONE ONE,                !- Zone Name
          Outdoors,                !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          SunExposed,              !- Sun Exposure
          WindExposed,             !- Wind Exposure
          0.5000000,               !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.walls.wall2.cornerTopLeft.x},${zone.walls.wall2.cornerTopLeft.y},${zone.walls.wall2.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.walls.wall2.cornerTopRight.x},${zone.walls.wall2.cornerTopRight.y},${zone.walls.wall2.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.walls.wall2.cornerBottomRight.x},${zone.walls.wall2.cornerBottomRight.y},${zone.walls.wall2.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.walls.wall2.cornerBottomLeft.x},${zone.walls.wall2.cornerBottomLeft.y},${zone.walls.wall2.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
      
        BuildingSurface:Detailed,
          ${zone.name}:Wall003,           !- Name
          Wall,                    !- Surface Type
          ${zone.construction.wall[2].name},                 !- Construction Name
          ZONE ONE,                !- Zone Name
          Outdoors,                !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          SunExposed,              !- Sun Exposure
          WindExposed,             !- Wind Exposure
          0.5000000,               !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.walls.wall3.cornerTopLeft.x},${zone.walls.wall3.cornerTopLeft.y},${zone.walls.wall3.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.walls.wall3.cornerTopRight.x},${zone.walls.wall3.cornerTopRight.y},${zone.walls.wall3.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.walls.wall3.cornerBottomRight.x},${zone.walls.wall3.cornerBottomRight.y},${zone.walls.wall3.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.walls.wall3.cornerBottomLeft.x},${zone.walls.wall3.cornerBottomLeft.y},${zone.walls.wall3.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
      
        BuildingSurface:Detailed,
          ${zone.name}:Wall004,           !- Name
          Wall,                    !- Surface Type
          ${zone.construction.wall[3].name},                 !- Construction Name
          ZONE ONE,                !- Zone Name
          Outdoors,                !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          SunExposed,              !- Sun Exposure
          WindExposed,             !- Wind Exposure
          0.5000000,               !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.walls.wall4.cornerTopLeft.x},${zone.walls.wall4.cornerTopLeft.y},${zone.walls.wall4.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.walls.wall4.cornerTopRight.x},${zone.walls.wall4.cornerTopRight.y},${zone.walls.wall4.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.walls.wall4.cornerBottomRight.x},${zone.walls.wall4.cornerBottomRight.y},${zone.walls.wall4.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.walls.wall4.cornerBottomLeft.x},${zone.walls.wall4.cornerBottomLeft.y},${zone.walls.wall4.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
      
        BuildingSurface:Detailed,
          ${zone.name}:Flr001,            !- Name
          Floor,                   !- Surface Type
          ${zone.construction.floor.name},                   !- Construction Name
          ZONE ONE,                !- Zone Name
          Adiabatic,               !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          NoSun,                   !- Sun Exposure
          NoWind,                  !- Wind Exposure
          1.000000,                !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.surfaces.floor.cornerTopLeft.x},${zone.surfaces.floor.cornerTopLeft.y},${zone.surfaces.floor.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.surfaces.floor.cornerTopRight.x},${zone.surfaces.floor.cornerTopRight.y},${zone.surfaces.floor.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.surfaces.floor.cornerBottomRight.x},${zone.surfaces.floor.cornerBottomRight.y},${zone.surfaces.floor.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.surfaces.floor.cornerBottomLeft.x},${zone.surfaces.floor.cornerBottomLeft.y},${zone.surfaces.floor.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
      
        BuildingSurface:Detailed,
          ${zone.name}:Roof001,           !- Name
          Roof,                    !- Surface Type
          ${zone.construction.roof.name},                  !- Construction Name
          ZONE ONE,                !- Zone Name
          Outdoors,                !- Outside Boundary Condition
          ,                        !- Outside Boundary Condition Object
          SunExposed,              !- Sun Exposure
          WindExposed,             !- Wind Exposure
          0,                       !- View Factor to Ground
          4,                       !- Number of Vertices
          ${zone.surfaces.roof.cornerTopLeft.x},${zone.surfaces.roof.cornerTopLeft.y},${zone.surfaces.roof.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${zone.surfaces.roof.cornerTopRight.x},${zone.surfaces.roof.cornerTopRight.y},${zone.surfaces.roof.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${zone.surfaces.roof.cornerBottomRight.x},${zone.surfaces.roof.cornerBottomRight.y},${zone.surfaces.roof.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${zone.surfaces.roof.cornerBottomLeft.x},${zone.surfaces.roof.cornerBottomLeft.y},${zone.surfaces.roof.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}

      `,
    );

    zone.windows.map((window: ZoneWindow) => {
      data = data.concat(`
          FenestrationSurface:Detailed,
          ${window.id},                 !- Name
          WINDOW,               !- Surface Type
          ${window.construction}, !- Construction Name
          ${zone.name}:Wall00${window.wall},              !- Building Surface Name
          ,                     !- Outside Boundary Condition Object
          0.50000,              !- View Factor to Ground
          ,                     !- Frame and Divider Name
          1,                    !- Multiplier
          4,                    !- Number of Vertices
          ${window.cornerTopLeft.x},${window.cornerTopLeft.y},${window.cornerTopLeft.z},  !- X,Y,Z ==> Vertex 1 {m}
          ${window.cornerTopRight.x},${window.cornerTopRight.y},${window.cornerTopRight.z},  !- X,Y,Z ==> Vertex 2 {m}
          ${window.cornerBottomRight.x},${window.cornerBottomRight.y},${window.cornerBottomRight.z},  !- X,Y,Z ==> Vertex 3 {m}
          ${window.cornerBottomLeft.x},${window.cornerBottomLeft.y},${window.cornerBottomLeft.z};  !- X,Y,Z ==> Vertex 4 {m}
        `);
    });
  });

  data = data.concat(
    `Output:Variable,*,Site Outdoor Air Drybulb Temperature,hourly;
    
      Output:Variable,*,Site Daylight Saving Time Status,daily;
    
      Output:Variable,*,Site Day Type Index,daily;
    
      Output:Variable,*,Zone Mean Air Temperature,hourly;
    
      Output:Variable,*,Zone Total Internal Latent Gain Energy,hourly;
    
      Output:Variable,*,Zone Mean Radiant Temperature,hourly;
    
      Output:Variable,*,Zone Air Heat Balance Surface Convection Rate,hourly;
    
      Output:Variable,*,Zone Air Heat Balance Air Energy Storage Rate,hourly;
    
      Output:Variable,*,Surface Inside Face Temperature,daily;
    
      Output:Variable,*,Surface Outside Face Temperature,daily;
    
      Output:Variable,*,Surface Inside Face Convection Heat Transfer Coefficient,daily;
    
      Output:Variable,*,Surface Outside Face Convection Heat Transfer Coefficient,daily;
    
      Output:Variable,*,Other Equipment Total Heating Energy,monthly;
    
      Output:Variable,*,Zone Other Equipment Total Heating Energy,monthly;
    
      Output:VariableDictionary,IDF;
    
      Output:Surfaces:Drawing,dxf:wireframe;
    
      Output:Constructions,Constructions;
    
      Output:Meter:MeterFileOnly,ExteriorLights:Electricity,hourly;
    
      Output:Meter:MeterFileOnly,EnergyTransfer:Building,hourly;
    
      Output:Meter:MeterFileOnly,EnergyTransfer:Facility,hourly;
    
      OutputControl:Table:Style,
        ALL;                     !- Column Separator
    
      Output:Table:SummaryReports,
        AllSummary;              !- Report 1 Name
    
      Exterior:Lights,
        ExtLights,               !- Name
        AlwaysOn,                !- Schedule Name
        5250,                    !- Design Level {W}
        AstronomicalClock,       !- Control Option
        Grounds Lights;          !- End-Use Subcategory
    
      ScheduleTypeLimits,
        On/Off,                  !- Name
        0,                       !- Lower Limit Value
        1,                       !- Upper Limit Value
        DISCRETE;                !- Numeric Type
    
      OtherEquipment,
        Test 352a,               !- Name
        None,                    !- Fuel Type
        ZONE ONE,                !- Zone or ZoneList Name
        AlwaysOn,                !- Schedule Name
        EquipmentLevel,          !- Design Level Calculation Method
        352,                     !- Design Level {W}
        ,                        !- Power per Zone Floor Area {W/m2}
        ,                        !- Power per Person {W/person}
        0,                       !- Fraction Latent
        0,                       !- Fraction Radiant
        0;                       !- Fraction Lost
    
      OtherEquipment,
        Test 352 minus,          !- Name
        None,                    !- Fuel Type
        ZONE ONE,                !- Zone or ZoneList Name
        AlwaysOn,                !- Schedule Name
        EquipmentLevel,          !- Design Level Calculation Method
        -352,                    !- Design Level {W}
        ,                        !- Power per Zone Floor Area {W/m2}
        ,                        !- Power per Person {W/person}
        0,                       !- Fraction Latent
        0,                       !- Fraction Radiant
        0;                       !- Fraction Lost
    
      Schedule:Constant,AlwaysOn,On/Off,1.0;
      `,
  );

  return data;
};
