/**
 * Mock data for development — mirrors CriticalAsset GraphQL responses.
 * Remove this file and switch routes back to api.js once credentials are working.
 */

export const mockWorkOrders = {
  totalCount: 24,
  nodes: [
    {
      id: "wo_001",
      title: "HVAC compressor failure — 3rd floor",
      description: "Unit is making grinding noise and not cooling. Classroom 3B reported 82°F at 10am.",
      severity: "critical",
      executionPriority: "urgent",
      createdAt: "2026-06-03T08:15:00Z",
      updatedAt: "2026-06-04T14:30:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_012", name: "HVAC Compressor Unit 3F", status: "active", category: "HVAC" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_002",
      title: "Elevator stuck on 2nd floor",
      description: "Service elevator not responding to calls. Stuck between floors 2 and 3.",
      severity: "critical",
      executionPriority: "urgent",
      createdAt: "2026-06-04T07:45:00Z",
      updatedAt: "2026-06-04T09:00:00Z",
      workOrderStage: { name: "Dispatched" },
      assets: [{ id: "a_005", name: "Service Elevator B", status: "active", category: "Elevator" }],
      locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY" }]
    },
    {
      id: "wo_003",
      title: "Water leak in boiler room",
      description: "Slow drip detected near main supply valve. No flooding yet but needs immediate attention.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-02T11:00:00Z",
      updatedAt: "2026-06-03T16:00:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_019", name: "Boiler System A", status: "active", category: "Plumbing" }],
      locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus", address: "525 W 50th St, New York, NY" }]
    },
    {
      id: "wo_004",
      title: "Fire alarm panel fault — Zone 4",
      description: "Zone 4 showing intermittent fault. Panel beeping every 30 seconds.",
      severity: "critical",
      executionPriority: "urgent",
      createdAt: "2026-06-05T06:30:00Z",
      updatedAt: "2026-06-05T06:30:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_033", name: "Fire Alarm Panel Main", status: "active", category: "Fire Safety" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_005",
      title: "Broken window — gymnasium",
      description: "Large crack in gym window, south side. Safety hazard for students.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-04T13:20:00Z",
      updatedAt: "2026-06-04T15:00:00Z",
      workOrderStage: { name: "Dispatched" },
      assets: [{ id: "a_041", name: "Window Panel Gym-S4", status: "damaged", category: "Structure" }],
      locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY" }]
    },
    {
      id: "wo_006",
      title: "Flickering lights — hallway B2",
      description: "Fluorescent fixtures on 2nd floor hallway B flickering intermittently.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-03T09:00:00Z",
      updatedAt: "2026-06-03T09:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_055", name: "Lighting Circuit B2", status: "active", category: "Electrical" }],
      locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY" }]
    },
    {
      id: "wo_007",
      title: "Clogged drain — cafeteria kitchen",
      description: "Kitchen sink drain backing up. Grease trap may need cleaning.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-02T14:30:00Z",
      updatedAt: "2026-06-03T08:00:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_062", name: "Kitchen Plumbing System", status: "active", category: "Plumbing" }],
      locations: [{ id: "loc_5", locationName: "PS 33 Chelsea Prep", address: "281 9th Ave, New York, NY" }]
    },
    {
      id: "wo_008",
      title: "Roof access door lock broken",
      description: "Roof access door on 5th floor cannot be secured. Lock mechanism damaged.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-04T10:15:00Z",
      updatedAt: "2026-06-04T10:15:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_070", name: "Roof Access Door 5F", status: "damaged", category: "Security" }],
      locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus", address: "525 W 50th St, New York, NY" }]
    },
    {
      id: "wo_009",
      title: "Thermostat not responding — Room 201",
      description: "Digital thermostat blank screen. Room temp uncontrolled.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-01T08:45:00Z",
      updatedAt: "2026-06-02T11:30:00Z",
      workOrderStage: { name: "Completed" },
      assets: [{ id: "a_015", name: "Thermostat Unit 201", status: "active", category: "HVAC" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_010",
      title: "Parking lot pothole — entry lane",
      description: "Large pothole forming at the main entry lane. Trip hazard for pedestrians.",
      severity: "low",
      executionPriority: "low",
      createdAt: "2026-05-28T10:00:00Z",
      updatedAt: "2026-05-30T09:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_080", name: "Parking Surface - Entry", status: "active", category: "Structure" }],
      locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY" }]
    },
    {
      id: "wo_011",
      title: "Emergency exit sign bulb out",
      description: "Exit sign above stairwell C ground floor not illuminated.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-01T15:00:00Z",
      updatedAt: "2026-06-03T10:00:00Z",
      workOrderStage: { name: "Completed" },
      assets: [{ id: "a_090", name: "Exit Sign Stairwell-C-G", status: "active", category: "Fire Safety" }],
      locations: [{ id: "loc_5", locationName: "PS 33 Chelsea Prep", address: "281 9th Ave, New York, NY" }]
    },
    {
      id: "wo_012",
      title: "Playground fence section loose",
      description: "Chain-link fence on the east side has come loose from the post. Kids could get out.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-05T07:00:00Z",
      updatedAt: "2026-06-05T07:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_095", name: "Playground Perimeter Fence", status: "damaged", category: "Structure" }],
      locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY" }]
    },
    {
      id: "wo_013",
      title: "PA system static — main office",
      description: "Public address system producing static when broadcasting. Microphone may be failing.",
      severity: "low",
      executionPriority: "low",
      createdAt: "2026-06-03T12:00:00Z",
      updatedAt: "2026-06-03T12:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_100", name: "PA System - Main Office", status: "active", category: "Electrical" }],
      locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY" }]
    },
    {
      id: "wo_014",
      title: "Bathroom floor tiles cracked — 1st floor",
      description: "Several tiles cracked and uneven near sinks. Slip hazard.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-02T09:30:00Z",
      updatedAt: "2026-06-04T11:00:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_105", name: "Floor Tiles 1F Bathroom", status: "damaged", category: "Structure" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_015",
      title: "Security camera offline — rear entrance",
      description: "Camera feed showing black since yesterday. Power cycle didn't help.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-04T16:00:00Z",
      updatedAt: "2026-06-05T08:00:00Z",
      workOrderStage: { name: "Dispatched" },
      assets: [{ id: "a_110", name: "Security Cam - Rear Door", status: "offline", category: "Security" }],
      locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus", address: "525 W 50th St, New York, NY" }]
    },
    {
      id: "wo_016",
      title: "Water fountain not dispensing",
      description: "2nd floor fountain button pressed but no water comes out. Filter may be clogged.",
      severity: "low",
      executionPriority: "low",
      createdAt: "2026-06-03T11:00:00Z",
      updatedAt: "2026-06-03T11:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_115", name: "Water Fountain 2F-East", status: "active", category: "Plumbing" }],
      locations: [{ id: "loc_5", locationName: "PS 33 Chelsea Prep", address: "281 9th Ave, New York, NY" }]
    },
    {
      id: "wo_017",
      title: "Boiler pressure gauge reading high",
      description: "Gauge showing 18 PSI, normal range is 12-15. Needs inspection before Monday.",
      severity: "critical",
      executionPriority: "urgent",
      createdAt: "2026-06-05T09:00:00Z",
      updatedAt: "2026-06-05T09:00:00Z",
      workOrderStage: { name: "Dispatched" },
      assets: [{ id: "a_020", name: "Boiler System B", status: "active", category: "HVAC" }],
      locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY" }]
    },
    {
      id: "wo_018",
      title: "Classroom door won't latch — 4A",
      description: "Door swings open on its own. Latch not engaging with strike plate.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-04T08:00:00Z",
      updatedAt: "2026-06-04T08:00:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_120", name: "Door Assembly 4A", status: "active", category: "Structure" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_019",
      title: "Graffiti on exterior wall — north side",
      description: "Spray paint graffiti appeared overnight on the north wall facing the street.",
      severity: "low",
      executionPriority: "low",
      createdAt: "2026-06-05T07:30:00Z",
      updatedAt: "2026-06-05T07:30:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_125", name: "Exterior Wall - North", status: "active", category: "Structure" }],
      locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus", address: "525 W 50th St, New York, NY" }]
    },
    {
      id: "wo_020",
      title: "HVAC filter replacement due",
      description: "Scheduled preventive maintenance — filters past 90-day replacement cycle.",
      severity: "low",
      executionPriority: "low",
      createdAt: "2026-05-30T08:00:00Z",
      updatedAt: "2026-06-01T09:00:00Z",
      workOrderStage: { name: "Completed" },
      assets: [{ id: "a_013", name: "HVAC Air Handler Unit 1", status: "active", category: "HVAC" }],
      locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY" }]
    },
    {
      id: "wo_021",
      title: "Electrical panel sparking — basement",
      description: "Maintenance staff reported brief spark from Panel E in basement. Breaker tripped.",
      severity: "critical",
      executionPriority: "urgent",
      createdAt: "2026-06-05T10:45:00Z",
      updatedAt: "2026-06-05T10:45:00Z",
      workOrderStage: { name: "Open" },
      assets: [{ id: "a_130", name: "Electrical Panel E", status: "active", category: "Electrical" }],
      locations: [{ id: "loc_5", locationName: "PS 33 Chelsea Prep", address: "281 9th Ave, New York, NY" }]
    },
    {
      id: "wo_022",
      title: "ADA ramp surface deteriorating",
      description: "Concrete on ADA ramp has large cracks and is becoming uneven.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-01T14:00:00Z",
      updatedAt: "2026-06-02T10:00:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_135", name: "ADA Ramp - Main Entrance", status: "active", category: "Structure" }],
      locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY" }]
    },
    {
      id: "wo_023",
      title: "Cafeteria refrigerator temp high",
      description: "Walk-in fridge reading 48°F, should be below 40°F. Food safety concern.",
      severity: "high",
      executionPriority: "high",
      createdAt: "2026-06-05T06:00:00Z",
      updatedAt: "2026-06-05T08:30:00Z",
      workOrderStage: { name: "In Progress" },
      assets: [{ id: "a_140", name: "Walk-in Refrigerator", status: "active", category: "HVAC" }],
      locations: [{ id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY" }]
    },
    {
      id: "wo_024",
      title: "Intercom system down — floors 3-5",
      description: "Classroom intercoms on floors 3 through 5 not connecting to main office.",
      severity: "medium",
      executionPriority: "normal",
      createdAt: "2026-06-04T09:30:00Z",
      updatedAt: "2026-06-04T14:00:00Z",
      workOrderStage: { name: "Dispatched" },
      assets: [{ id: "a_145", name: "Intercom System Fl 3-5", status: "active", category: "Electrical" }],
      locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY" }]
    }
  ]
};

export const mockAssets = {
  total: 12,
  assets: [
    { id: "a_012", name: "HVAC Compressor Unit 3F", status: "active", category: "HVAC", serialNumber: "HV-2019-3F-001", locations: [{ id: "loc_1", locationName: "PS 225 West 24th" }] },
    { id: "a_005", name: "Service Elevator B", status: "active", category: "Elevator", serialNumber: "EL-2015-B-002", locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy" }] },
    { id: "a_019", name: "Boiler System A", status: "active", category: "Plumbing", serialNumber: "BL-2018-A-001", locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus" }] },
    { id: "a_033", name: "Fire Alarm Panel Main", status: "active", category: "Fire Safety", serialNumber: "FA-2020-M-001", locations: [{ id: "loc_1", locationName: "PS 225 West 24th" }] },
    { id: "a_055", name: "Lighting Circuit B2", status: "active", category: "Electrical", serialNumber: "LC-2017-B2-003", locations: [{ id: "loc_2", locationName: "MS 340 Tech Academy" }] },
    { id: "a_070", name: "Roof Access Door 5F", status: "damaged", category: "Security", serialNumber: "RD-2016-5F-001", locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus" }] },
    { id: "a_095", name: "Playground Perimeter Fence", status: "damaged", category: "Structure", serialNumber: "PF-2014-E-001", locations: [{ id: "loc_4", locationName: "PS 11 William T. Harris" }] },
    { id: "a_110", name: "Security Cam - Rear Door", status: "offline", category: "Security", serialNumber: "SC-2021-RD-001", locations: [{ id: "loc_3", locationName: "HS 525 West Side Campus" }] },
    { id: "a_130", name: "Electrical Panel E", status: "active", category: "Electrical", serialNumber: "EP-2019-E-001", locations: [{ id: "loc_5", locationName: "PS 33 Chelsea Prep" }] },
    { id: "a_140", name: "Walk-in Refrigerator", status: "active", category: "HVAC", serialNumber: "RF-2020-WI-001", locations: [{ id: "loc_1", locationName: "PS 225 West 24th" }] },
  ]
};

export const mockLocations = [
  { id: "loc_1", locationName: "PS 225 West 24th", address: "225 W 24th St, New York, NY 10011", coordinates: { lat: 40.7448, lng: -73.9947 }, sublocation: [{ id: "sub_1a", locationName: "3rd Floor" }, { id: "sub_1b", locationName: "Basement" }] },
  { id: "loc_2", locationName: "MS 340 Tech Academy", address: "340 E 93rd St, New York, NY 10128", coordinates: { lat: 40.7823, lng: -73.9485 }, sublocation: [{ id: "sub_2a", locationName: "Boiler Room" }] },
  { id: "loc_3", locationName: "HS 525 West Side Campus", address: "525 W 50th St, New York, NY 10019", coordinates: { lat: 40.7634, lng: -73.9918 }, sublocation: [{ id: "sub_3a", locationName: "Roof Level" }, { id: "sub_3b", locationName: "Rear Entrance" }] },
  { id: "loc_4", locationName: "PS 11 William T. Harris", address: "320 W 21st St, New York, NY 10011", coordinates: { lat: 40.7434, lng: -73.9981 }, sublocation: [{ id: "sub_4a", locationName: "Gymnasium" }, { id: "sub_4b", locationName: "Playground" }] },
  { id: "loc_5", locationName: "PS 33 Chelsea Prep", address: "281 9th Ave, New York, NY 10001", coordinates: { lat: 40.7493, lng: -73.9978 }, sublocation: [{ id: "sub_5a", locationName: "Cafeteria" }, { id: "sub_5b", locationName: "Basement" }] },
];
