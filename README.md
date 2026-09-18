# NorthStar GRC & ITSM Demonstration Portal

A fictional portfolio demonstration website for showcasing generalized ITSM, IAM, ITAM, GRC and audit process design.

## Run locally
Open `index.html` in any modern web browser.

## Important
This is a demonstration environment. Do not add real employee data, passwords, credentials, proprietary employer information, or production security procedures.

## Included in this version
- Executive GRC dashboard
- Password verification/reset control demonstration
- New hire parent/child ticket workflow
- Termination workflow
- Role-based access management
- Change management / CAB workflow
- Asset lifecycle
- Controls library
- Audit dashboard and sample finding

## Future enhancements
- Detailed child-ticket modal views
- Interactive onboarding/offboarding forms
- Approval simulation
- Evidence/audit-log generation
- Vendor risk and VPN access module
- Branch control dashboard
- Control testing workpapers
- Process-map viewer
- Portfolio/about page

## Version 13 — Interactive Termination Process
The Termination module is an interactive demonstration of IAM/ITSM offboarding. It captures employee and termination details, generates child tickets for selected access-revocation and asset-recovery requirements, routes validation/approval ownership, and keeps the parent request open until required work and evidence are complete. Privileged-access fields are displayed only for Technology employees. A reset button clears the generated demonstration state, and the workflow diagram opens in the same modal used by the Password Verification and New Hire demonstrations.

Version 25 adds a Governance Documentation repository under GRC & Audit. Flowcharts are displayed as thumbnail previews in a table and open in the existing workflow modal when clicked. The first demonstration entry is the IT Governance Documentation Process.


## Governance Repository
The Governance section includes clickable thumbnails for the IT Governance Documentation Process, Maturity Model, Document Hierarchy, Document Relationship Map, Governance Controls Framework, Governance RACI Matrix, IT Governance Dashboard, Documentation Roadmap, and Documentation Architecture.


## Version 26 – Document Control
Added a dedicated Document Control section under GRC & Audit, including document lifecycle/statuses, control rationale, the example Document Control Register, the IT Governance Document Control Workbook, and the supplied design discussion.


## V43 Vendor New Vendor Setup + Vendor Connection Operations Console
Added an interactive New Vendor Setup + Vendor Connection Operations Console workflow covering approved staff, named Active Directory accounts, Cisco Secure Client least-privilege scope, MFA, Technology SME/management notification, session recording/SIEM, monthly recertification and offboarding controls.


V43 adds the interactive Vendor Connection Operations Console: request capture, preventive validation gates, named-account simulation, VPN enablement, active connection dashboard, extension handling, 11:30 PM automatic disconnect simulation, vendor-notification closure, and audit evidence generation.


## Version 45 — Vendor Operations + Monitoring
The vendor module is organized as Vendor Risk Management with a drill-down Vendor Operations Console. Added Connection History & Audit Search for searchable connection evidence and Ongoing Monitoring & Review for monthly management oversight using connection, access-matrix and recertification evidence.


### Version 45 — Connection History synchronization
The Connection History & Audit Search table now stays synchronized with the Vendor Operations Console test actions. Enabling a connection creates an Active history record. **Close Connection** updates that same record to **Closed**, records the closure method and end time, and **Simulate 11:30 PM Auto Disconnect** updates the same record to **Closed** with the scheduled 11:30 PM disconnect and the automatic closure method. No duplicate history row is created for the same test connection.

## V47 ITGC Domain 1 — User Access Management
Expanded the ITGC Audit & Controls section with the first detailed control: IAM-01 New User Access Provisioning. The demonstration now covers the two New Hire intake paths (self-service portal and HRIS notification), User Access Matrix role-based access determination, Technical Manager hardware approvals, Okta account provisioning with Service Desk verification, M365 segregation of responsibilities, VPN/application child tickets, evidence packaging, an interactive audit test, a simulated group-membership exception/remediation scenario, and high-level COBIT 2019 / ISO/IEC 27001 control mapping guidance.

## Version 52 — ITGC Domain Drill-Down Navigation
The ITGC Audit & Controls section now uses domain-level drill-down navigation. Selecting User Access Management displays only the Domain 1 control work developed to date (New Hire / IAM-01 and Termination / IAM-02). Selecting a future domain displays only that domain's roadmap card, ready for its controls to be developed without cluttering the page. Overview restores the full ITGC roadmap.


Version 52: Added a Demonstration Scope panel above the ITGC Control Domains roadmap, clarifying the focused Domain 1 coverage of New Hire Provisioning and Termination / Access Removal.


## Version 54 — Termination Evidence Sheet
Added the department-specific Termination Evidence Sheet as a supporting audit artifact directly beneath the Termination Process module. The example is for Food & Beverage and covers 15 systems/applications, with before-and-after screenshot evidence requirements and a note explaining that each department would maintain its own tailored checklist. The Word evidence sheet is included in the website package for viewing/downloading.


## Version 55 — Updated Termination Evidence Sheet
Replaced the Termination Evidence Sheet with the user-updated Food & Beverage version. The website placement and supporting-evidence presentation remain unchanged; the linked Word artifact now uses the revised column spacing and wording supplied for the portfolio.
