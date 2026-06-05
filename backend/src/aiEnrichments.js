/**
 * Pre-generated AI enrichments for Challenge 2.
 * Simulates what an LLM would produce: structured fields, enrichment context,
 * workflow recommendations, and follow-up questions.
 *
 * In production, replace with actual LLM calls (OpenAI, Claude, Bedrock).
 */

export const enrichments = {
  wo_001: {
    structuredFields: {
      location: "3rd Floor, Classroom 3B",
      issueType: "HVAC / Cooling Failure",
      frequency: "Continuous since reported",
      impact: "Student comfort, learning disruption (82°F measured)",
      affectedPopulation: "~30 students + 1 teacher in 3B",
      possibleCauses: ["Compressor mechanical failure", "Refrigerant leak", "Electrical contactor issue", "Thermostat sensor drift"],
      relatedAsset: "HVAC Compressor Unit 3F",
      severityRecommendation: "critical"
    },
    enrichment: {
      priorWorkOrders: [
        { id: "wo_hist_101", title: "HVAC noise complaint 3rd floor", date: "2026-04-15", status: "Completed" },
        { id: "wo_hist_102", title: "Temperature regulation issue 3F", date: "2026-03-02", status: "Completed" }
      ],
      assetHistory: "Unit installed 2019. Two prior service calls in last 6 months. Last filter change: 2026-05-01.",
      publicData: "NYC DOB: No open HVAC violations at this address. NYC 311: 2 heat/AC complaints filed within 500ft in last 30 days.",
      complianceNote: "NYC Building Code §28-103.1 requires maintaining habitable temperature (68°F–78°F) during school hours."
    },
    workflowRecommendation: {
      nextSteps: [
        "Verify supply air temperature at Room 3B diffuser",
        "Check compressor amperage draw and listen for mechanical grinding",
        "Inspect refrigerant pressure levels",
        "Review BMS trend data for Zone 3F over past 72 hours",
        "If compressor confirmed failed: request emergency replacement authorization"
      ],
      escalateIf: "Temperature remains above 80°F for 2+ consecutive school days or grinding noise worsens (risk of compressor seizure and fire)",
      estimatedResolution: "4-8 hours if parts available; 2-3 days if compressor replacement needed",
      assignTo: "HVAC Technician — Priority 1"
    }
  },

  wo_002: {
    structuredFields: {
      location: "Between floors 2 and 3",
      issueType: "Elevator / Mechanical Failure",
      frequency: "Single incident, ongoing",
      impact: "Building accessibility blocked, ADA compliance risk",
      affectedPopulation: "All building occupants needing upper floor access",
      possibleCauses: ["Door interlock failure", "Drive motor fault", "Controller board error", "Safety brake engagement"],
      relatedAsset: "Service Elevator B",
      severityRecommendation: "critical"
    },
    enrichment: {
      priorWorkOrders: [
        { id: "wo_hist_201", title: "Elevator door alignment issue", date: "2026-02-10", status: "Completed" }
      ],
      assetHistory: "Installed 2015. Last annual inspection: 2026-01-15 (passed). Modernization due 2027.",
      publicData: "NYC DOB Elevator Unit: Active permit. Last periodic test: passed Jan 2026. No open violations.",
      complianceNote: "NYC Admin Code §28-304.6.1 requires immediate notification to DOB for elevator entrapment events. Must file incident report within 24 hours."
    },
    workflowRecommendation: {
      nextSteps: [
        "Confirm no passengers are trapped (call building security)",
        "Contact elevator service contractor immediately",
        "Lock out elevator until inspected",
        "File DOB notification if entrapment occurred",
        "Post 'Out of Service' signage and redirect to alternate routes"
      ],
      escalateIf: "Passengers trapped OR elevator moves unexpectedly",
      estimatedResolution: "2-6 hours for service call; up to 24 hours if parts needed",
      assignTo: "Elevator Contractor (emergency dispatch) + Building Manager"
    }
  },

  wo_004: {
    structuredFields: {
      location: "Fire alarm panel, main lobby",
      issueType: "Fire Safety / Panel Fault",
      frequency: "Intermittent — beeping every 30 seconds",
      impact: "Building fire safety compromised, potential false alarm fatigue",
      affectedPopulation: "Entire building (~500 occupants)",
      possibleCauses: ["Zone 4 detector malfunction", "Wiring fault in Zone 4 loop", "Panel card failure", "Environmental trigger (dust, humidity)"],
      relatedAsset: "Fire Alarm Panel Main",
      severityRecommendation: "critical"
    },
    enrichment: {
      priorWorkOrders: [],
      assetHistory: "Panel installed 2020. No prior faults recorded. Last inspection: 2026-04-01 (passed).",
      publicData: "FDNY: No open fire safety violations at this address. Last FDNY inspection: March 2026.",
      complianceNote: "NYC Fire Code §907.8 requires fire alarm malfunctions be corrected within 24 hours. Building must maintain fire watch if system impaired."
    },
    workflowRecommendation: {
      nextSteps: [
        "Identify which devices are on Zone 4 circuit",
        "Walk Zone 4 and visually inspect each detector for damage or contamination",
        "Check panel event log for specific device triggering the fault",
        "Test Zone 4 circuit continuity",
        "If fault cannot be cleared in 4 hours: initiate fire watch per FDNY requirements"
      ],
      escalateIf: "Fault cannot be isolated within 4 hours, or if Zone 4 covers means of egress",
      estimatedResolution: "1-4 hours for detector replacement; longer if wiring fault",
      assignTo: "Fire Alarm Technician — Immediate"
    }
  },

  wo_017: {
    structuredFields: {
      location: "Boiler room, basement",
      issueType: "HVAC / Boiler Overpressure",
      frequency: "Current reading: 18 PSI (normal: 12-15 PSI)",
      impact: "Safety hazard — potential pressure vessel failure",
      affectedPopulation: "Entire building if catastrophic failure",
      possibleCauses: ["Pressure relief valve stuck", "Expansion tank waterlogged", "Aquastat malfunction", "Feedwater valve stuck open"],
      relatedAsset: "Boiler System B",
      severityRecommendation: "critical"
    },
    enrichment: {
      priorWorkOrders: [
        { id: "wo_hist_301", title: "Boiler annual inspection", date: "2026-01-20", status: "Completed" }
      ],
      assetHistory: "Boiler System B installed 2018. Annual inspection passed Jan 2026. Pressure relief valve last tested: Jan 2026.",
      publicData: "NYC DOB Boiler Unit: Registration active. No open violations. Annual filing current.",
      complianceNote: "NYC Admin Code §28-303 requires immediate shutdown if operating pressure exceeds rated capacity. Boiler operator must be notified immediately."
    },
    workflowRecommendation: {
      nextSteps: [
        "DO NOT ignore — verify reading with secondary gauge",
        "Check pressure relief valve: lift test lever to confirm it's not stuck",
        "Inspect expansion tank (tap to check for waterlogging)",
        "Verify aquastat is cycling burner off at setpoint",
        "If pressure continues rising above 20 PSI: emergency shutdown immediately"
      ],
      escalateIf: "Pressure exceeds 20 PSI or relief valve fails to operate. This is a life-safety issue.",
      estimatedResolution: "1-2 hours for diagnosis; may need boiler shutdown for repair",
      assignTo: "Licensed Boiler Operator — IMMEDIATE"
    }
  },

  wo_021: {
    structuredFields: {
      location: "Basement, Electrical Panel E",
      issueType: "Electrical / Arc Flash Hazard",
      frequency: "Single incident reported",
      impact: "Fire risk, electrical safety hazard, potential code violation",
      affectedPopulation: "Building occupants + maintenance staff",
      possibleCauses: ["Loose bus bar connection", "Corroded breaker contacts", "Overloaded circuit", "Water intrusion into panel"],
      relatedAsset: "Electrical Panel E",
      severityRecommendation: "critical"
    },
    enrichment: {
      priorWorkOrders: [],
      assetHistory: "Panel E installed 2019. No prior issues. Serves basement lighting + HVAC aux circuits.",
      publicData: "NYC DOB: No open electrical violations. Con Edison: No outage reports for this block.",
      complianceNote: "NFPA 70E requires arc flash risk assessment. NYC Electrical Code requires licensed electrician for panel work. Do not reset tripped breaker without inspection."
    },
    workflowRecommendation: {
      nextSteps: [
        "DO NOT reset the tripped breaker",
        "Barricade area around Panel E — maintain 3ft clearance",
        "Call licensed electrician for thermal scan and inspection",
        "Check for burn marks, melted insulation, or smell of ozone",
        "If any signs of active arcing or smoke: evacuate basement and call FDNY"
      ],
      escalateIf: "Visible burn damage, smell of smoke, or breaker trips again after reset",
      estimatedResolution: "4-8 hours for electrician inspection and repair",
      assignTo: "Licensed Electrician — Urgent (do not attempt internal reset)"
    }
  }
};

/**
 * Generate an AI enrichment for any work order based on its data.
 * Falls back to a template-based response if no pre-generated enrichment exists.
 */
export function getEnrichment(workOrder) {
  // Return pre-generated if available
  if (enrichments[workOrder.id]) {
    return enrichments[workOrder.id];
  }

  // Fallback: generate a template-based response
  return {
    structuredFields: {
      location: workOrder.locations?.[0]?.locationName || "Unknown",
      issueType: workOrder.assets?.[0]?.category || "General Maintenance",
      frequency: "As reported",
      impact: `Affects building operations — severity: ${workOrder.severity}`,
      affectedPopulation: "Building occupants",
      possibleCauses: ["Requires on-site inspection to determine root cause"],
      relatedAsset: workOrder.assets?.[0]?.name || "Unspecified",
      severityRecommendation: workOrder.severity
    },
    enrichment: {
      priorWorkOrders: [],
      assetHistory: "No prior history available for this asset.",
      publicData: "No relevant public data found for this address.",
      complianceNote: "Standard maintenance protocols apply."
    },
    workflowRecommendation: {
      nextSteps: [
        "Dispatch maintenance technician for on-site assessment",
        "Document current condition with photos",
        "Identify root cause and required parts/materials",
        "Complete repair and verify resolution with occupants"
      ],
      escalateIf: "Issue affects life safety, building access, or more than one floor",
      estimatedResolution: "Varies — assess on-site",
      assignTo: "Maintenance Team"
    }
  };
}

/**
 * Process a student signal (observation text) and return structured AI output.
 */
export function processStudentSignal(observationText, workOrder) {
  const enrichment = getEnrichment(workOrder);

  return {
    originalObservation: observationText,
    timestamp: new Date().toISOString(),
    aiStructured: enrichment.structuredFields,
    enrichment: enrichment.enrichment,
    workflowRecommendation: enrichment.workflowRecommendation,
    confidenceNote: "AI-generated analysis based on work order context, asset history, and public data. Verify on-site before acting."
  };
}
