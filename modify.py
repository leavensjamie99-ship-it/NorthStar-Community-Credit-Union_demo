from pathlib import Path
p=Path('/mnt/data/v43build/index.html')
s=p.read_text()
start=s.index('      <div class="section-head"><div><h3>Phase 3 — Vendor Connection / VPN Workflow</h3>')
end=s.index('      <div class="notice governance-note">', start)
new=r'''      <div class="section-head"><div><h3>Phase 3 — Vendor Connection / VPN Operations Console</h3><p>Service Desk operational console for validating, enabling, monitoring and closing third-party remote-access connections.</p></div><span class="pill blue">SERVICE DESK OPERATIONS</span></div>
      <div class="vendor-console-metrics">
        <div class="vendor-metric"><span>Active</span><b id="vcMetricActive">2</b></div>
        <div class="vendor-metric"><span>Extensions</span><b id="vcMetricExtensions">1</b></div>
        <div class="vendor-metric"><span>Closed Today</span><b id="vcMetricClosed">7</b></div>
        <div class="vendor-metric"><span>MFA Success</span><b>100%</b></div>
      </div>

      <div class="panel vendor-console-panel">
        <div class="panel-title"><h3>Live Vendor Connection Queue</h3><span class="pill green">OPERATIONAL VIEW</span></div>
        <div class="table-wrap"><table class="data-table vendor-connection-table"><thead><tr><th>Connection</th><th>Vendor</th><th>User</th><th>Target</th><th>Status</th><th>Disconnect</th></tr></thead><tbody id="vcQueueBody">
          <tr><td>VC-000123</td><td>ABC Technology Services</td><td>Ven-JSmith</td><td>Core Banking Server</td><td><span class="pill green">Active</span></td><td>11:30 PM</td></tr>
          <tr><td>VC-000124</td><td>SecureTech Solutions</td><td>Ven-MBrown</td><td>Network Management</td><td><span class="pill blue">Extended</span></td><td>02:00 AM</td></tr>
          <tr><td>VC-000125</td><td>NetWorks Inc.</td><td>Ven-ALee</td><td>Application Server</td><td><span class="pill gray">Closed</span></td><td>9:15 AM</td></tr>
        </tbody></table></div>
      </div>

      <div class="vendor-console-flow workflow wide"><div class="flow-step current"><b>1</b><span>New Request</span></div><i>→</i><div class="flow-step"><b>2</b><span>Validation</span></div><i>→</i><div class="flow-step"><b>3</b><span>Enable VPN</span></div><i>→</i><div class="flow-step"><b>4</b><span>Active Connection</span></div><i>→</i><div class="flow-step"><b>5</b><span>Close</span></div><i>→</i><div class="flow-step"><b>6</b><span>Evidence &amp; Audit</span></div></div>

      <div class="cards two vendor-console-cards">
        <div class="panel">
          <div class="panel-title"><h3>1. New Vendor Connection Request</h3><span class="pill">SERVICE DESK</span></div>
          <p class="panel-help">Information captured from the vendor email before the connection is enabled.</p>
          <div class="vendor-form-grid">
            <div class="vendor-form-field"><label>Vendor Name <span class="required">Required</span></label><select id="vcVendor"><option value="">Select approved vendor</option><option>ABC Technology Services</option><option>SecureTech Solutions</option><option>NetWorks Inc.</option><option>Core Systems Partners</option><option>DataBridge Consulting</option><option>FinServe Support</option><option>CloudPoint Services</option><option>Digital Axis</option><option>Northstar Systems Group</option><option>Vertex IT Solutions</option><option>BluePeak Technologies</option><option>Summit Application Support</option><option>IronGate Security</option><option>ClearPath Networks</option><option>Harbor Systems</option></select></div>
            <div class="vendor-form-field"><label>Person Connecting <span class="required">Required</span></label><input id="vcPerson" type="text" placeholder="e.g., John Smith"></div>
            <div class="vendor-form-field"><label>System / Application <span class="required">Required</span></label><select id="vcSystem"><option value="">Select approved system</option><option>Core Banking Server</option><option>Core Banking Application</option><option>Network Management</option><option>Application Server</option><option>Database Services</option><option>File Services</option><option>Payment Processing</option><option>Card Management</option><option>CRM</option><option>Microsoft 365</option><option>HRIS</option><option>Service Management</option><option>Security Monitoring</option><option>Backup Infrastructure</option><option>Virtualization Platform</option><option>Identity Services</option><option>Data Warehouse</option><option>Reporting Services</option><option>Branch Application Server</option><option>ATM Management</option><option>Document Management</option><option>Integration Services</option><option>Middleware Platform</option><option>Endpoint Management</option><option>Monitoring Platform</option></select></div>
            <div class="vendor-form-field"><label>Technology SME / Requestor <span class="required">Required</span></label><select id="vcSme"><option value="">Select Technology SME</option><option>Alex Chen</option><option>Jordan Lee</option><option>Taylor Smith</option><option>Morgan Davis</option><option>Casey Brown</option><option>Riley Wilson</option><option>Jamie Carter</option><option>Sam Patel</option><option>Chris Nguyen</option><option>Robin Clark</option><option>Devon Martin</option><option>Kelly Adams</option><option>Drew Thompson</option><option>Pat Morgan</option><option>Shawn Lewis</option><option>Leslie Walker</option><option>Quinn Hall</option><option>Avery Young</option><option>Reese King</option><option>Cameron Scott</option></select></div>
            <div class="vendor-form-field full"><label>Reason for Connecting <span class="required">Required</span></label><textarea id="vcReason" rows="2" placeholder="Copy the vendor's reason from the email request"></textarea></div>
            <div class="vendor-form-field"><label>Technology Ticket / Vendor Case # <span class="required">When available</span></label><input id="vcRef" type="text" placeholder="e.g., INC-123456"></div>
            <div class="vendor-form-field"><label>Service Desk Analyst</label><input id="vcAnalyst" type="text" value="J. Doe"></div>
          </div>
          <div class="button-row"><button class="primary" id="vcValidateBtn">Validate Vendor Connection</button><button class="secondary" id="vcResetBtn">Reset</button></div>
          <div id="vcRequestResult" class="result hidden"></div>
        </div>

        <div class="panel">
          <div class="panel-title"><h3>2. Validation Console</h3><span class="pill green">PREVENTIVE CONTROL</span></div>
          <p class="panel-help">Every gate must pass before Service Desk can enable the vendor VPN connection.</p>
          <div id="vcValidationGrid" class="vc-validation-grid">
            <div class="vc-gate pending"><span>Vendor is active</span><b>Pending</b></div>
            <div class="vc-gate pending"><span>Person is approved</span><b>Pending</b></div>
            <div class="vc-gate pending"><span>Named AD account exists</span><b>Pending</b></div>
            <div class="vc-gate pending"><span>Target system is approved</span><b>Pending</b></div>
            <div class="vc-gate pending"><span>Requested scope is authorized</span><b>Pending</b></div>
            <div class="vc-gate pending"><span>Technology requestor is valid</span><b>Pending</b></div>
          </div>
          <div class="callout vc-stop-callout"><b>STOP CONDITION:</b> A failed validation prevents the VPN connection from being enabled. Service Desk must contact the Technology SME and resolve the discrepancy before revalidation.</div>
          <button class="primary vc-enable-btn" id="vcEnableBtn" disabled>Enable VPN Connection</button>
          <div id="vcValidationResult" class="result hidden"></div>
        </div>
      </div>

      <div class="panel vendor-active-panel">
        <div class="panel-title"><h3>3–4. Active Vendor Connection Dashboard</h3><span class="pill blue" id="vcStatusPill">READY</span></div>
        <div class="vc-active-grid">
          <div class="vc-active-summary"><div class="vc-status-large" id="vcStatusLarge">READY</div><p id="vcActiveDescription">Validate a vendor connection request to begin.</p></div>
          <div class="vc-active-detail"><span>Connection ID</span><b id="vcConnId">—</b></div>
          <div class="vc-active-detail"><span>Vendor</span><b id="vcActiveVendor">—</b></div>
          <div class="vc-active-detail"><span>User</span><b id="vcActiveUser">—</b></div>
          <div class="vc-active-detail"><span>Target System</span><b id="vcActiveTarget">—</b></div>
          <div class="vc-active-detail"><span>Technology SME</span><b id="vcActiveSme">—</b></div>
          <div class="vc-active-detail"><span>Connection Start</span><b id="vcStartTime">—</b></div>
          <div class="vc-active-detail"><span>Scheduled Disconnect</span><b id="vcDisconnectTime">11:30 PM</b></div>
        </div>
        <div class="vc-control-badges"><span>✓ MFA Required</span><span>✓ Named Account</span><span>✓ Least Privilege</span><span>✓ Authorized Scope</span><span>✓ Session Recording</span><span>✓ SIEM Logging</span></div>
        <div class="vc-active-actions"><button class="secondary" id="vcExtendBtn" disabled>Extend Connection</button><button class="primary" id="vcCloseBtn" disabled>Close Connection</button><button class="secondary" id="vcAutoBtn" disabled>Simulate 11:30 PM Auto Disconnect</button></div>
        <div id="vcExtensionBox" class="vc-extension-box hidden"><label>New Disconnect Date/Time <input id="vcExtensionTime" type="datetime-local"></label><label>Reason for Extension <textarea id="vcExtensionReason" rows="2" placeholder="Document why access must remain active past 11:30 PM"></textarea></label><div class="button-row"><button class="primary" id="vcApplyExtension">Apply Extension</button><button class="secondary" id="vcCancelExtension">Cancel</button></div></div>
      </div>

      <div class="panel vendor-evidence-panel">
        <div class="panel-title"><h3>5–6. Connection Closure &amp; Evidence</h3><span class="pill blue">AUDIT RECORD</span></div>
        <div id="vcEvidenceEmpty" class="callout">Complete a vendor connection to generate the audit evidence record.</div>
        <div id="vcEvidence" class="hidden">
          <div class="ticket-card vc-evidence-card"><div><span class="ticket-id" id="vcEvidenceId">VC-2026-000000</span><h3 id="vcEvidenceVendor">Vendor Connection</h3><p>Vendor Remote Access · Service Desk Evidence</p><div class="ticket-meta"><div><span>User</span><b id="vcEvidenceUser">—</b></div><div><span>Target</span><b id="vcEvidenceTarget">—</b></div><div><span>Technology SME</span><b id="vcEvidenceSme">—</b></div><div><span>Request Reference</span><b id="vcEvidenceRef">—</b></div><div><span>Connection Start</span><b id="vcEvidenceStart">—</b></div><div><span>Connection End</span><b id="vcEvidenceEnd">—</b></div><div><span>Closure Method</span><b id="vcEvidenceClosure">—</b></div><div><span>Analyst</span><b id="vcEvidenceAnalyst">—</b></div></div></div><span class="pill green">EVIDENCE RETAINED</span></div>
          <div class="control-status-grid"><div><span>MFA</span><b class="pill green">Successful</b></div><div><span>Named Account</span><b class="pill green">Confirmed</b></div><div><span>Authorized Scope</span><b class="pill green">Confirmed</b></div><div><span>Session Recording</span><b class="pill green">Available</b></div><div><span>SIEM Transmission</span><b class="pill green">Confirmed</b></div><div><span>Connection Ticket</span><b class="pill blue">Recorded</b></div></div>
          <div class="callout"><b>Audit trail:</b> The completed record captures who connected, what system was accessed, why access was required, who requested it, when the connection started and ended, how it was closed, and the associated monitoring evidence.</div>
        </div>
      </div>

      <div class="cards two vendor-lifecycle-cards">
        <div class="panel"><div class="panel-title"><h3>Connection Control Rules</h3><span class="pill green">CONTROL BOUNDARY</span></div><div class="control-line"><span>Approved vendor/person required</span><b>Before connection</b></div><div class="control-line"><span>Access scope cannot be expanded here</span><b>Phase 2 required</b></div><div class="control-line"><span>Generic vendor accounts</span><b>Prohibited</b></div><div class="control-line"><span>MFA</span><b>Required</b></div><div class="control-line"><span>Session recording</span><b>Required</b></div></div>
        <div class="panel"><div class="panel-title"><h3>Connection Closure Rules</h3><span class="pill blue">11:30 PM CONTROL</span></div><div class="control-line"><span>Vendor disconnect notification</span><b>Service Desk closes</b></div><div class="control-line"><span>Automatic nightly disconnect</span><b>11:30 PM</b></div><div class="control-line"><span>Past 11:30 PM required</span><b>Vendor notifies Service Desk</b></div><div class="control-line"><span>Extension</span><b>Reason + new disconnect time</b></div><div class="control-line"><span>Evidence</span><b>Retained with connection record</b></div></div>
      </div>

'''
s=s[:start]+new+s[end:]
p.write_text(s)

# Append CSS
css=Path('/mnt/data/v43build/styles.css')
c=css.read_text()
c += r'''
/* V43 Vendor Connection Operations Console */
.vendor-console-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:14px 0 18px}.vendor-metric{padding:15px 16px;border:1px solid #dfe6ec;border-radius:9px;background:#fbfcfd}.vendor-metric span{display:block;font-size:9px;text-transform:uppercase;letter-spacing:.7px;color:#7b8995}.vendor-metric b{display:block;margin-top:5px;font-size:22px;color:#1f3448}.vendor-console-panel{margin-bottom:18px}.vendor-connection-table td,.vendor-connection-table th{font-size:10px}.vendor-console-flow{margin:18px 0}.vendor-console-flow .flow-step{white-space:nowrap}.vendor-console-cards{align-items:start}.panel-help{font-size:10px;color:#748391;margin:0 0 14px}.vc-validation-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.vc-gate{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:11px;border:1px solid #e0e6eb;border-radius:7px;background:#fbfcfd;font-size:10px;color:#596b79}.vc-gate b{font-size:9px;text-transform:uppercase;letter-spacing:.4px}.vc-gate.pass{border-color:#c8dfd2;background:#f4faf6}.vc-gate.pass b{color:#2d7b4d}.vc-gate.fail{border-color:#e6c9c9;background:#fff8f8}.vc-gate.fail b{color:#a14b4b}.vc-gate.pending b{color:#84929d}.vc-stop-callout{margin-top:14px}.vc-enable-btn{margin-top:12px}.vendor-active-panel{margin-top:18px}.vc-active-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:9px;margin-top:14px}.vc-active-summary{grid-row:span 2;padding:15px;border:1px solid #dce4ea;border-radius:8px;background:#f7f9fa}.vc-status-large{font-size:19px;font-weight:800;color:#263b50;letter-spacing:.5px}.vc-active-summary p{font-size:10px;line-height:1.45;color:#71808d;margin:6px 0 0}.vc-active-detail{padding:11px;border:1px solid #e2e7eb;border-radius:7px;background:#fff}.vc-active-detail span{display:block;font-size:8px;text-transform:uppercase;letter-spacing:.5px;color:#81909c}.vc-active-detail b{display:block;font-size:10px;color:#31475a;margin-top:4px;line-height:1.3}.vc-control-badges{display:flex;flex-wrap:wrap;gap:7px;margin:14px 0}.vc-control-badges span{font-size:9px;color:#4f687c;background:#f2f7fa;border:1px solid #d8e4eb;border-radius:20px;padding:6px 9px}.vc-active-actions{display:flex;gap:8px;flex-wrap:wrap}.vc-active-actions button:disabled{opacity:.45;cursor:not-allowed}.vc-extension-box{margin-top:14px;padding:14px;border:1px solid #dce5eb;border-radius:8px;background:#f7f9fa}.vc-extension-box label{display:block;font-size:10px;font-weight:700;color:#4c6070;margin-bottom:10px}.vc-extension-box input,.vc-extension-box textarea{display:block;width:100%;margin-top:6px;padding:9px;border:1px solid #d9e0e6;border-radius:6px;background:white;font:inherit;font-size:10px}.vc-evidence-card{margin-top:12px}.vc-evidence-panel .control-status-grid{margin-top:14px}.hidden{display:none!important}@media(max-width:1000px){.vc-active-grid{grid-template-columns:1fr 1fr}.vc-active-summary{grid-row:auto;grid-column:1/-1}}@media(max-width:800px){.vendor-console-metrics{grid-template-columns:1fr 1fr}.vc-validation-grid{grid-template-columns:1fr}}@media(max-width:600px){.vendor-console-metrics{grid-template-columns:1fr}.vc-active-grid{grid-template-columns:1fr}.vc-active-summary{grid-column:auto}.vc-active-actions{flex-direction:column}.vc-active-actions button{width:100%}}
'''
css.write_text(c)
