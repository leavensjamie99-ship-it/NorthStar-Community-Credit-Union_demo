
const DEPARTMENT_JOB_TITLES = {
  "Member Services": ["Member Service Representative", "Member Experience Representative", "Member Service Officer", "Service Centre Representative", "Financial Services Representative"],
  "Branch Operations": ["Branch Manager", "Assistant Branch Manager", "Manager of Operations", "Personal Banking Officer", "Customer Service Representative"],
  "Finance": ["Financial Analyst", "Budget Analyst", "Senior Accountant", "Credit Analyst", "Commercial Credit Analyst"],
  "Human Resources": ["HR Business Partner", "Talent Acquisition Manager", "Total Rewards Specialist", "Learning and Development Manager", "Employee Relations Specialist"],
  "Technology": ["Core Banking Administrator", "Application Support Analyst", "Service Desk Analyst", "Systems Engineer", "Network Engineer"]
};

function populateJobTitles(deptId, roleId, preferredRole) {
  const dept = document.getElementById(deptId);
  const role = document.getElementById(roleId);
  if (!dept || !role) return;
  const titles = DEPARTMENT_JOB_TITLES[dept.value] || [];
  role.innerHTML = titles.map(t => `<option value="${t}">${t}</option>`).join("");
  if (preferredRole && titles.includes(preferredRole)) role.value = preferredRole;
  else if (titles.length) role.selectedIndex = 0;
}

function wireDepartmentRole(deptId, roleId, defaultRole) {
  const dept = document.getElementById(deptId);
  if (!dept) return;
  dept.addEventListener("change", () => populateJobTitles(deptId, roleId));
  populateJobTitles(deptId, roleId, defaultRole);
}
function getRadio(name){const el=document.querySelector(`input[name="${name}"]:checked`);return el?el.value:"N";}
function submitNewHire(){
 const first=document.getElementById("nhFirst").value.trim()||"Alex",last=document.getElementById("nhLast").value.trim()||"Morgan",id=document.getElementById("nhId").value.trim()||"NS-DEMO-001",date=document.getElementById("nhDate").value||"2026-10-05",dept=document.getElementById("nhDept").value,role=document.getElementById("nhRole").value,manager=document.getElementById("nhManager").value.trim()||"Jordan Lee",justification=document.getElementById("nhJustification").value.trim();
 const monitorCount=Math.max(1,parseInt(document.getElementById("nhMonitorCount")?.value||"2",10)||2);
 const otherEquipment=document.getElementById("nhOtherEquipment")?.value.trim()||"";
 const req=[["windows","Windows / AD Account","Infrastructure / Identity","Identity Manager"],["laptop","Laptop","Desktop Support","IT Manager"],["monitors",`Monitor(s) (${monitorCount})`,"Desktop Support","IT Manager"],["dock","Docking Station","Desktop Support","IT Manager"],["mobile","Mobile Device","Telecom / Mobility","IT Manager"],["phone","Desktop Phone","Telecom / Voice","IT Manager"],["headset","Headset","Desktop Support","IT Manager"],["otherEquipment",otherEquipment?`Other IT Equipment — ${otherEquipment}`:"Other IT Equipment","Desktop Support","IT Manager"],["desktop","Desktop Computer","Desktop Support","IT Manager"],["email","Microsoft 365 / Email","Infrastructure / Identity","Identity Manager"],["vpn","VPN / Remote Access","Network / Infrastructure","IT Manager"],["apps","Application / System Access","Application / System Owner","Manager + Application Owner"],["network","Network / Infrastructure Access","Network / Infrastructure","IT Manager + System Owner"],["shared","Shared Drive / Team Resource Access","Infrastructure / Identity","Manager + Resource Owner"],["admin","IT Admin Account","Infrastructure / Identity","IT Manager + System Owner"],["pam","PAM / Privileged Access","Identity / Security","IT Manager + Security / System Owner"]];
 const technology=dept==="Technology", selected=req.filter(x=>technology || (x[0]!=="admin" && x[0]!=="pam" && x[0]!=="network")).filter(x=>getRadio(x[0])==="Y"), elevated=technology&&(getRadio("admin")==="Y"||getRadio("pam")==="Y"), result=document.getElementById("nhResult");
 if(getRadio("otherEquipment")==="Y"&&!otherEquipment){result.className="result fail";result.innerHTML="<b>✕ Submission requires equipment details.</b><br>Enter the required equipment before submitting.";result.classList.remove("hidden");return;}
 if(elevated&&!justification){result.className="result fail";result.innerHTML="<b>✕ Submission requires justification.</b><br>Administrative or PAM access was requested. Enter the business justification before submitting.";result.classList.remove("hidden");return;}
 const ticket="REQ-"+Math.floor(10000+Math.random()*89999); result.className="result success";result.innerHTML=`<b>✓ New hire request submitted.</b><br>Parent request <b>${ticket}</b> was created. The workflow generated ${selected.length} child ticket${selected.length===1?"":"s"} and routed required approvals.`;result.classList.remove("hidden");
 document.getElementById("nhTicketPanel").classList.remove("hidden"); document.getElementById("nhTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>New Hire — ${first} ${last}</h3><p>${dept} · ${role}</p><div class="ticket-meta"><div><span>Employee ID</span><b>${id}</b></div><div><span>Start Date</span><b>${date}</b></div><div><span>Manager</span><b>${manager}</b></div><div><span>Child Tickets</span><b>${selected.length}</b></div></div></div><span class="pill blue">PARENT REQUEST</span>`;
 const children=document.getElementById("nhChildren");children.innerHTML=""; selected.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">CHILD ${String(i+1).padStart(2,"0")}</span><h4>${x[1]}</h4><span class="owner">Assigned to: ${x[2]}</span><span class="pill blue">Awaiting approval / work</span><span class="route">Approval routed to: ${x[3]}</span>`;children.appendChild(d);});
 document.getElementById("nhTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}

function resetNewHire(){
 const defaults={windows:"Y",laptop:"Y",monitors:"N",dock:"N",mobile:"N",phone:"N",headset:"N",otherEquipment:"N",desktop:"N",email:"N",vpn:"N",apps:"N",network:"N",shared:"N",admin:"N",pam:"N"};
 Object.entries(defaults).forEach(([name,value])=>{
   const radio=document.querySelector(`input[name="${name}"][value="${value}"]`);
   if(radio) radio.checked=true;
 });
 const justification=document.getElementById("nhJustification");
 if(justification) justification.value="";
 const monitorCount=document.getElementById("nhMonitorCount");if(monitorCount)monitorCount.value="2";
 const otherEquipment=document.getElementById("nhOtherEquipment");if(otherEquipment)otherEquipment.value="";
 const wrap=document.getElementById("nhJustificationWrap");
 if(wrap) wrap.classList.add("hidden");
 const elevatedWrap=document.getElementById("nhElevatedAccessWrap");if(elevatedWrap)elevatedWrap.classList.add("hidden");
 const monitorWrap=document.getElementById("nhMonitorCountWrap");if(monitorWrap)monitorWrap.classList.add("hidden");
 const otherWrap=document.getElementById("nhOtherEquipmentWrap");if(otherWrap)otherWrap.classList.add("hidden");
 document.querySelectorAll(".conditional-note").forEach(n=>n.classList.add("hidden"));
 const result=document.getElementById("nhResult");
 if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("nhTicketPanel");
 if(panel) panel.classList.add("hidden");
 const summary=document.getElementById("nhTicketSummary");
 if(summary) summary.innerHTML="";
 const children=document.getElementById("nhChildren");
 if(children) children.innerHTML="";
 window.scrollTo({top:0,behavior:"smooth"});
}

function runVerification(){const code=document.getElementById("verifyCode"),status=document.getElementById("pwStatus"),reset=document.getElementById("resetButton"),rr=document.getElementById("resetResult");if(!code||!status||!reset||!rr)return;rr.className="reset-result hidden";if(code.value.trim()==="2468"){status.className="status-text success-text";status.innerHTML="<b>✓ Verification Successful</b><br><span>Identity requirements passed. The workflow may proceed to the password-reset action.</span>";reset.disabled=false;}else{status.className="status-text fail-text";status.innerHTML="<b>✕ Verification Failed</b><br><span>Identity could not be verified. The password reset must not proceed.</span>";reset.disabled=true;}}
function resetPassword(){const b=document.getElementById("resetButton"),r=document.getElementById("resetResult");if(!b||!r)return;const temp="NS-"+Math.floor(1000+Math.random()*9000)+"!Demo";b.disabled=true;b.textContent="Password Reset Complete";r.className="reset-result success-reset";r.innerHTML="<b>✓ Password reset completed.</b><br>Temporary password: <strong>"+temp+"</strong><br><small>In production, the temporary credential would be communicated using the approved secure method and the reset action retained as audit evidence.</small>";}
function openPasswordWorkflow(){const m=document.getElementById("workflowModal");if(m)m.classList.remove("hidden");} function closePasswordWorkflow(){const m=document.getElementById("workflowModal");if(m)m.classList.add("hidden");}
const titles={
  doccontrol:"Document Registers",
  dashboard:"GRC & ITSM Dashboard",
  password:"Password Verification",
  newhire:"New Hire Process",
  termination:"Termination Process",
  access:"Access Modification",
  change:"Change Management",
  assets:"Asset Management",
  controls:"Controls Library",
  audit:"Audit Dashboard",
  periodic:"Periodic Access Review",
  vendor:"Vendor Risk Management",
  itgc:"ITGC Audit & Controls"
};

function showPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
  const target=document.getElementById(page);
  if(target) target.classList.add("active-page");
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const title=document.getElementById("pageTitle");
  if(title) title.textContent=titles[page]||"Demonstration";
  window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded",function(){
 wireDepartmentRole("nhDept","nhRole","Member Services Representative");
 wireDepartmentRole("termDept","termRole","Member Services Representative");
 wireDepartmentRole("amDept","amRole","Member Services Representative");
 wireDepartmentRole("trDept","trRole","Member Services Representative");
 wireDepartmentRole("loaDept","loaRole","Member Services Representative");
 document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
 const v=document.getElementById("verifyIdentityButton");if(v)v.addEventListener("click",runVerification);
 const rb=document.getElementById("resetButton");if(rb)rb.addEventListener("click",resetPassword);
 const sb=document.getElementById("submitNewHireButton");if(sb)sb.addEventListener("click",submitNewHire);
 const rn=document.getElementById("resetNewHireButton");if(rn)rn.addEventListener("click",resetNewHire);
 const dept=document.getElementById("nhDept"), elevatedWrap=document.getElementById("nhElevatedAccessWrap"), networkWrap=document.getElementById("nhNetworkAccessWrap");
 function updateElevatedAccess(){const tech=dept&&dept.value==="Technology";if(elevatedWrap)elevatedWrap.classList.toggle("hidden",!tech);if(networkWrap)networkWrap.classList.toggle("hidden",!tech);if(!tech){["admin","pam","network"].forEach(n=>{const r=document.querySelector(`input[name="${n}"][value="N"]`);if(r)r.checked=true;});const w=document.getElementById("nhJustificationWrap");if(w)w.classList.add("hidden");const note=document.querySelector('.conditional-note[data-note-for="network"]');if(note)note.classList.add("hidden");}else{const w=document.getElementById("nhJustificationWrap");if(w)w.classList.toggle("hidden",!(getRadio("admin")==="Y"||getRadio("pam")==="Y"));}}
 if(dept)dept.addEventListener("change",updateElevatedAccess);
 document.querySelectorAll('input[name="admin"],input[name="pam"]').forEach(i=>i.addEventListener("change",()=>{const w=document.getElementById("nhJustificationWrap");if(w&&dept&&dept.value==="Technology")w.classList.toggle("hidden",!(getRadio("admin")==="Y"||getRadio("pam")==="Y"));}));
 updateElevatedAccess();
 function updateNewHireConditionalFields(){
   const monitors=getRadio("monitors")==="Y";
   const other=getRadio("otherEquipment")==="Y";
   const monitorWrap=document.getElementById("nhMonitorCountWrap");if(monitorWrap)monitorWrap.classList.toggle("hidden",!monitors);
   const otherWrap=document.getElementById("nhOtherEquipmentWrap");if(otherWrap)otherWrap.classList.toggle("hidden",!other);
   ["apps","network","shared"].forEach(n=>{const note=document.querySelector(`.conditional-note[data-note-for="${n}"]`);if(note)note.classList.toggle("hidden",getRadio(n)!=="Y" || (n==="network" && !(dept&&dept.value==="Technology")));});
 }
 document.querySelectorAll('input[name="monitors"],input[name="otherEquipment"],input[name="apps"],input[name="network"],input[name="shared"]').forEach(i=>i.addEventListener("change",updateNewHireConditionalFields));
 updateNewHireConditionalFields();
 const sa=document.getElementById("submitAccessButton");if(sa)sa.addEventListener("click",submitAccessModification);
 const ra=document.getElementById("resetAccessButton");if(ra)ra.addEventListener("click",resetAccessModification);
 const st=document.getElementById("submitTerminationButton");if(st)st.addEventListener("click",submitTermination);
 const rt=document.getElementById("resetTerminationButton");if(rt)rt.addEventListener("click",resetTermination);
 const sl=document.getElementById("submitLoeButton");if(sl)sl.addEventListener("click",submitLOA);
 const rl=document.getElementById("resetLoeButton");if(rl)rl.addEventListener("click",resetLOA);
 const lw=document.getElementById("viewLoeWorkflow");if(lw)lw.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="loa_workflow.png";im.alt="Leave of Absence ITSM and IAM Workflow";}openPasswordWorkflow();});
 const termDept=document.getElementById("termDept"),termElevated=document.getElementById("termElevatedAccessWrap");
 function updateTermElevated(){const tech=termDept&&termDept.value==="Technology";if(termElevated)termElevated.classList.toggle("hidden",!tech);if(!tech){["td_admin","td_pam"].forEach(n=>{const r=document.querySelector(`input[name="${n}"][value="N"]`);if(r)r.checked=true;});}}
 if(termDept)termDept.addEventListener("change",updateTermElevated);updateTermElevated();
 const termImmediate=document.getElementById("termImmediate"),termDisableNote=document.getElementById("termDisableNote");
 if(termImmediate&&termDisableNote)termImmediate.addEventListener("change",()=>termDisableNote.classList.toggle("hidden",termImmediate.value!=="Yes"));
 const tv=document.getElementById("viewTerminationWorkflow");if(tv)tv.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="termination_workflow.png";im.alt="Termination ITSM and IAM Workflow";}openPasswordWorkflow();});
 const tw=document.getElementById("viewTransferWorkflow");if(tw)tw.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="employee_transfer_workflow.png";im.alt="Employee Transfer Identity and Access Management Workflow";}openPasswordWorkflow();});
 const nw=document.getElementById("viewNewHireWorkflow");if(nw)nw.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="new_hire_workflow.png";im.alt="New Hire ITSM and IAM Workflow";}openPasswordWorkflow();});
 const aw=document.getElementById("viewAccessModificationWorkflow");if(aw)aw.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="access_modification_workflow.png";im.alt="Access Modification Workflow";}openPasswordWorkflow();});
 const pw=document.getElementById("viewPasswordWorkflow");if(pw)pw.addEventListener("click",openPasswordWorkflow);
 const sp=document.getElementById("submitPeriodicButton");if(sp)sp.addEventListener("click",submitPeriodicReview);
 const rp=document.getElementById("resetPeriodicButton");if(rp)rp.addEventListener("click",resetPeriodicReview);
 const pv=document.getElementById("viewPeriodicWorkflow");if(pv)pv.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=m&&m.querySelector("img");if(im){im.src="periodic_access_review_workflow.png";im.alt="Periodic Access Review Workflow";}openPasswordWorkflow();});

 const cb=document.getElementById("closeWorkflow"),back=document.getElementById("workflowBackdrop");if(cb)cb.addEventListener("click",closePasswordWorkflow);if(back)back.addEventListener("click",closePasswordWorkflow);document.addEventListener("keydown",e=>{if(e.key==="Escape")closePasswordWorkflow();});
 document.querySelectorAll(".gov-thumbnail").forEach(btn=>btn.addEventListener("click",()=>{const m=document.getElementById("workflowModal"),im=document.getElementById("workflowModalImage");if(im){im.src=btn.dataset.governanceImage;im.alt=btn.dataset.governanceAlt||"Governance workflow";}if(m)m.classList.remove("hidden");}));
});

function submitLOA(){
 const first=document.getElementById("loaFirst").value.trim()||"Alex",last=document.getElementById("loaLast").value.trim()||"Morgan",id=document.getElementById("loaId").value.trim()||"NS-DEMO-001",date=document.getElementById("loaDate").value||"2026-10-05",dept=document.getElementById("loaDept").value,role=document.getElementById("loaRole").value,manager=document.getElementById("loaManager").value.trim()||"Jordan Lee",type=document.getElementById("loaType").value,action=document.getElementById("loaAction").value,approval=document.getElementById("loaApproval").value;
 const group="Identity & Access";
 const result=document.getElementById("loaResult"),ticket="LOA-"+Math.floor(10000+Math.random()*89999);
 result.className="result success";result.innerHTML=`<b>✓ Leave of absence request submitted.</b><br>Parent request <b>${ticket}</b> was created. The request was routed with <b>${approval}</b> approval required.`;result.classList.remove("hidden");
 document.getElementById("loaTicketPanel").classList.remove("hidden");
 document.getElementById("loaTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>${type} — ${first} ${last}</h3><p>${dept} · ${role}</p><div class="ticket-meta"><div><span>Employee ID</span><b>${id}</b></div><div><span>Completion Date</span><b>${date}</b></div><div><span>Manager</span><b>${manager}</b></div><div><span>Access Action</span><b>${action}</b></div><div><span>Approval</span><b>${approval}</b></div></div></div><span class="pill blue">PARENT REQUEST</span>`;
 const children=document.getElementById("loaChildren");children.innerHTML="";
 const tasks=[
  ["LOA Review & Approval","Manager / Application Owner",approval],
  [action+" — Access",group,"Approved access disposition"],
  ["Validate Access Status","Service Desk / IAM","Evidence review"]
 ];
 tasks.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">CHILD ${String(i+1).padStart(2,"0")}</span><h4>${x[0]}</h4><span class="owner">Assigned to: ${x[1]}</span><span class="pill blue">Awaiting completion / evidence</span><span class="route">Control: ${x[2]}</span>`;children.appendChild(d);});
 document.getElementById("loaTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetLOA(){
 const form=document.querySelector('#loa');if(form)form.querySelectorAll('input').forEach(i=>{if(i.type==='text'||i.type==='date')i.value='';});
 const result=document.getElementById("loaResult");if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("loaTicketPanel");if(panel)panel.classList.add("hidden");
 const summary=document.getElementById("loaTicketSummary");if(summary)summary.innerHTML="";
 const children=document.getElementById("loaChildren");if(children)children.innerHTML="";
 document.getElementById("loaDept").value="Member Services";populateJobTitles("loaDept","loaRole","Member Services Representative");document.getElementById("loaType").value="Begin Leave";document.getElementById("loaAction").value="Suspend Access";document.getElementById("loaApproval").value="Manager + Application Owner";
 window.scrollTo({top:0,behavior:"smooth"});
}

function getPeriodicReviewTypes(){
 const checked=[...document.querySelectorAll('#parTypes input[type="checkbox"]:checked')].map(x=>x.value);
 const others=checked.filter(t=>t!=="Termination");
 return [...others,"Termination"];
}
function escHtml(v){return String(v).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));}
function buildPeriodicReviewSection(type,index,ticketPrefix){
 const safe=type.replace(/[^a-zA-Z0-9]/g,'');
 const isTerm=type==='Termination';
 return `<div class="review-detail-card" data-review-type="${escHtml(type)}">
   <div class="review-detail-title"><div><span class="review-number">${String(index).padStart(2,'0')}</span><h4>${escHtml(type)} Review</h4></div><span class="pill ${isTerm?'red':'blue'}">${isTerm?'100% REVIEW':'SAMPLED'}</span></div>
   <div class="form-grid review-input-grid">
     <label>Number of Tickets Reviewed<input type="number" min="1" max="20" value="1" class="review-count" data-type="${escHtml(type)}"></label>
     <label>Review Outcome<select class="review-outcome" data-type="${escHtml(type)}"><option value="No Issues Identified">No Issues Identified</option><option value="Issues Identified">Issues Identified</option></select></label>
   </div>
   <div class="ticket-number-list" data-ticket-list="${safe}"></div>
   <div class="review-issues hidden" data-issues="${safe}">
     <h5>Issues Identified</h5>
     <div class="check-grid compact-checks">
       <label><input type="checkbox" value="Access Not Removed"> Access Not Removed</label>
       <label><input type="checkbox" value="Account Not Disabled"> Account Not Disabled</label>
       <label><input type="checkbox" value="Account Not Removed"> Account Not Removed</label>
       ${isTerm ? '' : '<label><input type="checkbox" value="Incorrect Access Granted"> Incorrect Access Granted</label><label><input type="checkbox" value="Missing Approval / Evidence"> Missing Approval / Evidence</label>'}
     </div>
     <label class="full-field">Corrective Actions Taken<textarea rows="2" placeholder="Describe corrective action taken..."></textarea></label>
     <h5>Review / Escalation</h5>
     <div class="check-grid compact-checks">
       <label><input type="checkbox" value="SME"> SME</label>
       <label><input type="checkbox" value="SD Manager"> SD Manager</label>
     </div>
   </div>
 </div>`;
}
function wirePeriodicReviewCard(card){
 const count=card.querySelector('.review-count');
 const list=card.querySelector('.ticket-number-list');
 const outcome=card.querySelector('.review-outcome');
 const issues=card.querySelector('.review-issues');
 function renderTickets(){
   let n=Math.max(1,Math.min(20,parseInt(count.value||1,10)));
   count.value=n;
   list.innerHTML=Array.from({length:n},(_,i)=>`<label>Ticket ${i+1}<input type="text" placeholder="REQ-XXXXX" class="review-ticket-number"></label>`).join('');
 }
 count.addEventListener('input',renderTickets);
 outcome.addEventListener('change',()=>issues.classList.toggle('hidden',outcome.value!=='Issues Identified'));
 renderTickets();
}
function submitPeriodicReview(){
 const date=document.getElementById("parDate").value||"2026-10-05",period=document.getElementById("parPeriod").value,analyst=document.getElementById("parAnalyst").value,scope=document.getElementById("parScope").value;
 const types=getPeriodicReviewTypes();
 const ticket="PAR-"+Math.floor(10000+Math.random()*89999);
 const sampled=types.filter(t=>t!=="Termination");
 const result=document.getElementById("parResult");
 result.className="result success";result.innerHTML=`<b>✓ Periodic access review initiated.</b><br>Review record <b>${ticket}</b> was created for <b>${escHtml(analyst)}</b>. ${sampled.length} request type${sampled.length===1?'':'s'} will be sampled, and <b>all terminations</b> will be reviewed.`;result.classList.remove("hidden");
 document.getElementById("parTicketPanel").classList.remove("hidden");
 document.getElementById("parWorkflowPanel").classList.remove("hidden");
 document.getElementById("parTicketHeader").innerHTML=`<div class="par-ticket-top"><div><span class="ticket-id">${ticket}</span><h3>Periodic Access Review — ${escHtml(analyst)}</h3><p>Service Desk member review record</p></div><div class="par-ticket-date"><span>Review Date</span><b>${escHtml(date)}</b></div></div>`;
 const details=document.getElementById("parReviewDetails");details.innerHTML=types.map((t,i)=>buildPeriodicReviewSection(t,i+1,ticket)).join('');
 details.querySelectorAll('.review-detail-card').forEach(wirePeriodicReviewCard);
 document.getElementById("parTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>Periodic Access Review — ${escHtml(analyst)}</h3><p>${escHtml(scope)} · ${escHtml(period)}</p><div class="ticket-meta"><div><span>Review Date</span><b>${escHtml(date)}</b></div><div><span>Review Period</span><b>${escHtml(period)}</b></div><div><span>Sampled Types</span><b>${escHtml(sampled.join(", ")||"None")}</b></div><div><span>Termination Review</span><b>100%</b></div><div><span>SME Validation</span><b>Required</b></div><div><span>Status</span><b>Awaiting review</b></div></div></div><span class="pill blue">CONTROL REVIEW</span>`;
 const tasks=document.getElementById("parTasks");tasks.innerHTML="";
 const taskList=[
  ["Review Service Desk Sample","Service Desk / IAM",sampled.join(", ")||"No sample types selected"],
  ["Review All Terminations","Service Desk / IAM","100% completion check"],
  ["Application SME Validation","Application SMEs","Confirm access removal"],
  ["Record Exceptions / Remediation","GRC / Service Desk","Track gaps and corrective action"],
  ["Retain Evidence & Close","Service Desk / GRC","Tickets + SME validation"]
 ];
 taskList.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">TASK ${String(i+1).padStart(2,"0")}</span><h4>${x[0]}</h4><span class="owner">Assigned to: ${x[1]}</span><span class="pill blue">Awaiting review / evidence</span><span class="route">Control: ${x[2]}</span>`;tasks.appendChild(d);});
 document.getElementById("parTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetPeriodicReview(){
 const result=document.getElementById("parResult");if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("parTicketPanel");if(panel)panel.classList.add("hidden");
 const workflow=document.getElementById("parWorkflowPanel");if(workflow)workflow.classList.add("hidden");
 const header=document.getElementById("parTicketHeader");if(header)header.innerHTML="";
 const details=document.getElementById("parReviewDetails");if(details)details.innerHTML="";
 const summary=document.getElementById("parTicketSummary");if(summary)summary.innerHTML="";
 const tasks=document.getElementById("parTasks");if(tasks)tasks.innerHTML="";
 document.querySelectorAll('#parTypes input[type="checkbox"]').forEach(i=>i.checked=true);
 document.getElementById("parPeriod").value="Monthly";document.getElementById("parAnalyst").value="All Service Desk Members";document.getElementById("parScope").value="Service Desk Request Review";
 window.scrollTo({top:0,behavior:"smooth"});
}

function submitTermination(){
 const first=document.getElementById("termFirst").value.trim()||"Alex",last=document.getElementById("termLast").value.trim()||"Morgan",id=document.getElementById("termId").value.trim()||"NS-DEMO-001",date=document.getElementById("termDate").value||"2026-10-05",dept=document.getElementById("termDept").value,role=document.getElementById("termRole").value,manager=document.getElementById("termManager").value.trim()||"Jordan Lee",type=document.getElementById("termType").value,time=document.getElementById("termTime").value||"17:00",immediate=document.getElementById("termImmediate").value;
 const req=[
 ["td_windows","Disable Windows / AD Account","Identity & Access","Identity Manager"],
 ["td_email","Disable Email / Microsoft 365","Messaging / Identity","IT Manager"],
 ["td_vpn","Revoke VPN / Remote Access","Network / Security","Security Owner"],
 ["td_apps","Revoke Application Access","Application Support","Application Owner"],
 ["td_mobile","Revoke Mobile Device Access","Telecom / Mobility","IT Manager"],
 ["td_computer","Recover Laptop / Computer","Desktop Support","IT Manager"],
 ["td_assetmobile","Recover Mobile Device","Telecom / Mobility","IT Manager"],
 ["td_phone","Recover Desktop Phone","Telecom / Voice","IT Manager"],
 ["td_admin","Remove IT Admin Account","Infrastructure / Identity","IT Manager + System Owner"],
 ["td_pam","Remove PAM / Privileged Access","Identity / Security","IT Manager + Security / System Owner"]
 ];
 const technology=dept==="Technology";
 const selected=req.filter(x=>technology || (x[0]!=="td_admin"&&x[0]!=="td_pam")).filter(x=>getRadio(x[0])==="Y");
 const result=document.getElementById("termResult");
 const ticket="TERM-"+Math.floor(10000+Math.random()*89999);
 result.className="result success";
 result.innerHTML=`<b>✓ Termination request submitted.</b><br>Parent request <b>${ticket}</b> was created. The workflow generated ${selected.length} child ticket${selected.length===1?"":"s"} and routed the required work for completion.`;
 result.classList.remove("hidden");
 document.getElementById("termTicketPanel").classList.remove("hidden");
 document.getElementById("termTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>Termination — ${first} ${last}</h3><p>${dept} · ${role}</p><div class="ticket-meta"><div><span>Employee ID</span><b>${id}</b></div><div><span>Effective</span><b>${date} ${time}</b></div><div><span>Termination Type</span><b>${type}</b></div><div><span>Immediate</span><b>${immediate}</b></div><div><span>Manager</span><b>${manager}</b></div><div><span>Child Tickets</span><b>${selected.length}</b></div></div></div><span class="pill blue">PARENT REQUEST</span>`;
 const children=document.getElementById("termChildren"); children.innerHTML="";
 selected.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">CHILD ${String(i+1).padStart(2,"0")}</span><h4>${x[1]}</h4><span class="owner">Assigned to: ${x[2]}</span><span class="pill blue">Awaiting completion / evidence</span><span class="route">Validation / approval: ${x[3]}</span>`;children.appendChild(d);});
 document.getElementById("termTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetTermination(){
 document.getElementById("termDisableNote")?.classList.toggle("hidden",document.getElementById("termImmediate")?.value!=="Yes");
 const defaults={td_windows:"Y",td_email:"Y",td_vpn:"Y",td_apps:"Y",td_mobile:"N",td_computer:"Y",td_assetmobile:"N",td_phone:"N",td_admin:"N",td_pam:"N"};
 Object.entries(defaults).forEach(([name,value])=>{const radio=document.querySelector(`input[name="${name}"][value="${value}"]`);if(radio)radio.checked=true;});
 const result=document.getElementById("termResult");if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("termTicketPanel");if(panel)panel.classList.add("hidden");
 const summary=document.getElementById("termTicketSummary");if(summary)summary.innerHTML="";
 const children=document.getElementById("termChildren");if(children)children.innerHTML="";
 const dept=document.getElementById("termDept"),wrap=document.getElementById("termElevatedAccessWrap");if(dept&&wrap)wrap.classList.toggle("hidden",dept.value!=="Technology");
 window.scrollTo({top:0,behavior:"smooth"});
}

function submitAccessModification(){
 const first=document.getElementById("amFirst").value.trim()||"Alex",last=document.getElementById("amLast").value.trim()||"Morgan",id=document.getElementById("amId").value.trim()||"NS-DEMO-001",date=document.getElementById("amDate").value||"2026-10-05",type=document.getElementById("amType").value,details=document.getElementById("amDetails").value.trim()||"No additional details provided.",dept=document.getElementById("amDept").value,role=document.getElementById("amRole").value,manager=document.getElementById("amManager").value.trim()||"Jordan Lee",apps=[...document.querySelectorAll('input[name="amApp"]:checked')].map(i=>i.value),reason=document.getElementById("amReason").value,approval=document.getElementById("amApproval").value;
 if(!apps.length){alert("Please select at least one Application.");return;}
 const group={"Core Banking":"Application Support","Microsoft 365":"Messaging / Identity","CRM":"Application Support","File Services":"Infrastructure / Identity","HRIS":"Business Applications","Service Management":"ITSM Platform"};
 const owner={"Core Banking":"Application Owner","Microsoft 365":"Application Owner","CRM":"Application Owner","File Services":"System Owner","HRIS":"Application Owner","Service Management":"System Owner"};
 const result=document.getElementById("amResult"),ticket="ACC-"+Math.floor(10000+Math.random()*89999);
 result.className="result success";result.innerHTML=`<b>✓ Access request submitted.</b><br>Parent request <b>${ticket}</b> was created. The ${type.toLowerCase()} request was routed to <b>${group}</b> with <b>${approval}</b> approval required.`;result.classList.remove("hidden");
 document.getElementById("amTicketPanel").classList.remove("hidden");
 document.getElementById("amTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>${type} — ${first} ${last}</h3><p>${dept} · ${role}</p><div class="ticket-meta"><div><span>Employee ID</span><b>${id}</b></div><div><span>Completion Date</span><b>${date}</b></div><div><span>Manager</span><b>${manager}</b></div><div><span>Applications</span><b>${apps.map(escHtml).join(", ")}</b></div><div><span>Reason</span><b>${reason}</b></div><div><span>Request Details</span><b>${escHtml(details)}</b></div><div><span>Approval</span><b>${approval}</b></div><div><span>Status</span><b>Awaiting completion</b></div></div></div><span class="pill blue">PARENT REQUEST</span>`;
 const children=document.getElementById("amChildren");children.innerHTML="";
 const tasks=[["Access Review & Approval","Manager / Application Owner",approval],...apps.map(app=>[type+" Access — "+app,group[app]||"Application Support","Application change"]),["Validate Access Change","Service Desk / IAM","Evidence review"]];
 tasks.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">CHILD ${String(i+1).padStart(2,"0")}</span><h4>${x[0]}</h4><span class="owner">Assigned to: ${x[1]}</span><span class="pill blue">Awaiting completion / evidence</span><span class="route">Control: ${x[2]}</span>`;children.appendChild(d);});
 document.getElementById("amTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetAccessModification(){
 const form=document.querySelector('#access'); if(form) form.querySelectorAll('input,textarea').forEach(i=>{if(i.type==='text'||i.type==='date'||i.tagName==='TEXTAREA')i.value='';});
 const result=document.getElementById("amResult");if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("amTicketPanel");if(panel)panel.classList.add("hidden");
 const summary=document.getElementById("amTicketSummary");if(summary)summary.innerHTML="";
 const children=document.getElementById("amChildren");if(children)children.innerHTML="";
 document.getElementById("amType").value="Add Access";document.getElementById("amReason").value="New job responsibilities";document.getElementById("amDept").value="Member Services";populateJobTitles("amDept","amRole","Member Services Representative");document.querySelectorAll('input[name="amApp"]').forEach(i=>i.checked=i.value==="Core Banking");document.getElementById("amApproval").value="Manager + Application Owner";
 window.scrollTo({top:0,behavior:"smooth"});
}

function updateTransferOptions(){
 const type=document.getElementById("trType");
 const reason=document.getElementById("trReason");
 const approval=document.getElementById("trApproval");
 const externalFields=document.getElementById("trExternalFields");
 const newDept=document.getElementById("trNewDept");
 const newRole=document.getElementById("trNewRole");
 const accessRemoval=document.getElementById("trAccessRemovalFields");
 const elevatedRemoval=document.getElementById("trElevatedRemovalWrap");
 const branchField=document.getElementById("trBranchField");
 const branchInput=document.getElementById("trBranch");
 const contractField=document.getElementById("trContractField");
 const reasonNote=document.getElementById("trReasonNote");
 if(!type||!reason||!approval)return;
 const internalReasons=["Department change","Role change","Branch or location change","Temporary assignment","Other business need"];
 const externalReasons=["Transfer to another branch","Contract / employment change","External assignment","Other business need"];
 const internalApprovals=["Old Manager + New Manager","New Manager","Old Manager + Application Owner"];
 const list=type.value==="Internal Transfer"?internalReasons:externalReasons;
 reason.innerHTML=list.map(x=>`<option>${x}</option>`).join("");
 if(type.value==="External Transfer"){
   updateTransferReasonFields();
   approval.innerHTML="<option>New Manager</option>";
   approval.value="New Manager";
   if(externalFields)externalFields.classList.remove("hidden");
   if(newDept && newRole){
     populateJobTitles("trNewDept","trNewRole");
     updateTransferAccessRemoval();
   }
 }else{
   approval.innerHTML=internalApprovals.map(x=>`<option>${x}</option>`).join("");
   if(externalFields)externalFields.classList.add("hidden");
   if(accessRemoval)accessRemoval.classList.add("hidden");
   if(elevatedRemoval)elevatedRemoval.classList.add("hidden");
   if(branchField)branchField.classList.add("hidden");
   if(contractField)contractField.classList.add("hidden");
   if(reasonNote){reasonNote.textContent="";reasonNote.classList.add("hidden");}
   if(branchInput)branchInput.value="";
 }
}
function updateTransferReasonFields(){
 const type=document.getElementById("trType");
 const reason=document.getElementById("trReason");
 const branchField=document.getElementById("trBranchField");
 const contractField=document.getElementById("trContractField");
 const reasonNote=document.getElementById("trReasonNote");
 if(!type||!reason)return;
 const isExternal=type.value==="External Transfer";
 const value=reason.value;
 if(branchField)branchField.classList.toggle("hidden",!(isExternal && value==="Transfer to another branch"));
 if(contractField)contractField.classList.toggle("hidden",!(isExternal && value==="Contract / employment change"));
 if(reasonNote){
   let note="";
   if(isExternal && value==="External assignment") note="Update Additional Details for Request with what the external assignment is.";
   if(isExternal && value==="Other business need") note="Update Additional Details for Request with the details of the request.";
   reasonNote.textContent=note;
   reasonNote.classList.toggle("hidden",!note);
 }
}
function updateTransferAccessRemoval(){
 const type=document.getElementById("trType");
 const oldDept=document.getElementById("trDept");
 const newDept=document.getElementById("trNewDept");
 const removal=document.getElementById("trAccessRemovalFields");
 const elevated=document.getElementById("trElevatedRemovalWrap");
 if(!type||!oldDept||!newDept||!removal)return;
 const mismatch=type.value==="External Transfer" && oldDept.value!==newDept.value;
 removal.classList.toggle("hidden",!mismatch);
 if(elevated)elevated.classList.toggle("hidden",!(mismatch && oldDept.value==="Technology" && newDept.value!=="Technology"));
 if(!mismatch){
   ["tr_vpn","tr_apps","tr_mobile","tr_computer","tr_assetmobile","tr_admin","tr_pam"].forEach(n=>{const r=document.querySelector(`input[name="${n}"][value="N"]`);if(r)r.checked=true;});
 }
 if(!(oldDept.value==="Technology" && newDept.value!=="Technology")){
   ["tr_admin","tr_pam"].forEach(n=>{const r=document.querySelector(`input[name="${n}"][value="N"]`);if(r)r.checked=true;});
 }
}
function submitTransfer(){
 const first=document.getElementById("trFirst").value.trim()||"Alex",last=document.getElementById("trLast").value.trim()||"Morgan",id=document.getElementById("trId").value.trim()||"NS-DEMO-001",date=document.getElementById("trDate").value||"2026-10-05",dept=document.getElementById("trDept").value,role=document.getElementById("trRole").value,manager=document.getElementById("trManager").value.trim()||"Jordan Lee",type=document.getElementById("trType").value,reason=document.getElementById("trReason").value,approval=document.getElementById("trApproval").value;
 const newDept=document.getElementById("trNewDept")?.value||"",newRole=document.getElementById("trNewRole")?.value||"",newManager=document.getElementById("trNewManager")?.value.trim()||"Taylor Smith",details=document.getElementById("trDetails")?.value.trim()||"No additional details provided.",branch=document.getElementById("trBranch")?.value.trim()||"",contractType=document.getElementById("trContractType")?.value||"";
 const mismatch=type==="External Transfer" && dept!==newDept;
 const crossTech=mismatch && dept==="Technology" && newDept!=="Technology";
 const group="Application Support / IAM";
 const result=document.getElementById("trResult"),ticket="TRN-"+Math.floor(10000+Math.random()*89999);
 result.className="result success";result.innerHTML=`<b>✓ Transfer request submitted.</b><br>Parent request <b>${ticket}</b> was created. The ${type.toLowerCase()} was routed with <b>${approval}</b> approval required.`;result.classList.remove("hidden");
 document.getElementById("trTicketPanel").classList.remove("hidden");
 const conditionalSummary=type==="External Transfer"&&reason==="Transfer to another branch"?`<div><span>Branch</span><b>${branch}</b></div>`:type==="External Transfer"&&reason==="Contract / employment change"?`<div><span>Employment Change</span><b>${contractType}</b></div>`:"";
 const transferSummary=type==="External Transfer"?`<div><span>New Department</span><b>${newDept}</b></div><div><span>New Job Title</span><b>${newRole}</b></div><div><span>New Manager</span><b>${newManager}</b></div>${conditionalSummary}`:"";
 const accessSummary=mismatch?`<div><span>Previous → New Department</span><b>${dept} → ${newDept}</b></div>`:"";
 document.getElementById("trTicketSummary").innerHTML=`<div><span class="ticket-id">${ticket}</span><h3>${type} — ${first} ${last}</h3><p>${dept} · ${role}</p><div class="ticket-meta"><div><span>Employee ID</span><b>${id}</b></div><div><span>Transfer Date</span><b>${date}</b></div><div><span>Manager</span><b>${manager}</b></div><div><span>Reason</span><b>${reason}</b></div><div><span>Approval</span><b>${approval}</b></div>${transferSummary}${accessSummary}<div><span>Additional Details</span><b>${details}</b></div></div></div><span class="pill blue">PARENT REQUEST</span>`;
 const children=document.getElementById("trChildren");children.innerHTML="";
 const tasks=[
  ["Review Existing Access","Service Desk / IAM",type==="Internal Transfer"?"Old manager review":"New manager review + previous access review"],
  ["Remove / Retain Existing Access",group,"Approved access disposition"],
  ["Provision New Access",group,"New manager / owner approval"],
  ["Validate Transfer Access","Service Desk / IAM","Evidence review"]
 ];
 if(mismatch)tasks.splice(1,0,["IT Access / Asset Removal","Infrastructure / Identity","Remove previous access and recover applicable assets by Transfer Date"]);
 if(crossTech)tasks.splice(2,0,["Remove IT Admin / PAM Access","Infrastructure / Identity","Technology-to-non-Technology transfer control"]);
 tasks.forEach((x,i)=>{const d=document.createElement("div");d.className="child created";d.innerHTML=`<span class="num">CHILD ${String(i+1).padStart(2,"0")}</span><h4>${x[0]}</h4><span class="owner">Assigned to: ${x[1]}</span><span class="pill blue">Awaiting completion / evidence</span><span class="route">Control: ${x[2]}</span>`;children.appendChild(d);});
 document.getElementById("trTicketPanel").scrollIntoView({behavior:"smooth",block:"start"});
}
function resetTransfer(){
 const form=document.querySelector('#transfer'); if(form) form.querySelectorAll('input,textarea').forEach(i=>{if(i.type==='text'||i.type==='date'||i.tagName==='TEXTAREA')i.value='';});
 const result=document.getElementById("trResult");if(result){result.className="result hidden";result.innerHTML="";}
 const panel=document.getElementById("trTicketPanel");if(panel)panel.classList.add("hidden");
 const summary=document.getElementById("trTicketSummary");if(summary)summary.innerHTML="";
 const children=document.getElementById("trChildren");if(children)children.innerHTML="";
 document.getElementById("trType").value="Internal Transfer";updateTransferOptions();
 document.getElementById("trDept").value="Member Services";populateJobTitles("trDept","trRole","Member Service Representative");
 const nd=document.getElementById("trNewDept");if(nd)nd.value="Member Services";populateJobTitles("trNewDept","trNewRole");
 const nm=document.getElementById("trNewManager");if(nm)nm.value="";
 const br=document.getElementById("trBranch");if(br)br.value="";
 const ct=document.getElementById("trContractType");if(ct)ct.selectedIndex=0;
 const td=document.getElementById("trDetails");if(td)td.value="";
 updateTransferReasonFields();
 window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("trType");if(t){t.addEventListener("change",updateTransferOptions);updateTransferOptions();}const trReason=document.getElementById("trReason");if(trReason)trReason.addEventListener("change",updateTransferReasonFields);const trDept=document.getElementById("trDept"),trNewDept=document.getElementById("trNewDept");if(trDept)trDept.addEventListener("change",updateTransferAccessRemoval);if(trNewDept)trNewDept.addEventListener("change",()=>{populateJobTitles("trNewDept","trNewRole");updateTransferAccessRemoval();});const s=document.getElementById("submitTransferButton");if(s)s.addEventListener("click",submitTransfer);const r=document.getElementById("resetTransferButton");if(r)r.addEventListener("click",resetTransfer);});

function vendorSetupSubmit(){
 const name=document.getElementById('vSetupName')?.value.trim();
 const staffRaw=document.getElementById('vSetupStaff')?.value.trim()||'';
 const owner=document.getElementById('vSetupOwner')?.value;
 const sme=document.getElementById('vSetupSme')?.value;
 const systems=[...document.querySelectorAll('#vSetupSystems input:checked')].map(x=>x.value);
 const servers=[...document.querySelectorAll('#vSetupServers input:checked')].map(x=>x.value);
 const result=document.getElementById('vSetupResult');
 if(!name||!staffRaw||!owner||!sme||!systems.length||!servers.length){
   result.className='result fail';result.innerHTML='<b>✕ Setup cannot proceed.</b><br>Complete the vendor name, approved staff, system owner, Technology SME, at least one system/application and at least one authorized server.';return;
 }
 const staff=staffRaw.split(/\\n|,/).map(x=>x.trim()).filter(Boolean);
 if(!staff.length){result.className='result fail';result.innerHTML='<b>✕ Setup cannot proceed.</b><br>At least one approved vendor employee is required.';return;}
 const ticket='VND-'+Math.floor(10000+Math.random()*89999);
 const accounts=staff.map(person=>{const parts=person.replace(/[^A-Za-z\\s'-]/g,'').split(/\\s+/).filter(Boolean);let first=parts[0]||'V',last=parts[parts.length-1]||'Vendor';return {person,acct:'Ven-'+first.charAt(0).toUpperCase()+last.replace(/[^A-Za-z]/g,'').replace(/^[a-z]/,c=>c.toUpperCase())};});
 result.className='result success';result.innerHTML=`<b>✓ Vendor access profile created.</b><br>Record <b>${ticket}</b> was generated. Named AD accounts, Cisco least-privilege scope and MFA are ready for provisioning evidence. Technology SME and management notifications were generated; no approval gate was used.`;
 document.getElementById('vSetupTicket').classList.remove('hidden');
 document.getElementById('vSetupSummary').innerHTML=`<div class="ticket-card"><div><span class="ticket-id">${ticket}</span><h3>${name}</h3><p>New Vendor Setup · IAM / Remote Access</p><div class="ticket-meta"><div><span>System Owner</span><b>${owner}</b></div><div><span>Technology SME</span><b>${sme}</b></div><div><span>Approved Staff</span><b>${staff.length}</b></div><div><span>Systems / Apps</span><b>${systems.length}</b></div><div><span>Servers</span><b>${servers.length}</b></div><div><span>Notification</span><b>SME + Management</b></div></div></div><span class="pill blue">VENDOR ACCESS PROFILE</span></div><div class="callout"><b>Authorized systems:</b> ${systems.join(', ')}<br><b>Authorized servers:</b> ${servers.join(', ')}</div>`;
 const wrap=document.getElementById('vSetupAccounts');wrap.innerHTML='';accounts.forEach((a,i)=>{const d=document.createElement('div');d.className='vendor-account-card';d.innerHTML=`<span class="pill blue">ACCOUNT ${String(i+1).padStart(2,'0')}</span><div class="acct">${a.acct}</div><span class="person">${a.person}</span><span class="field-help">Named account · No generic profile</span>`;wrap.appendChild(d);});
 document.getElementById('vSetupTicket').scrollIntoView({behavior:'smooth',block:'start'});
}
function vendorSetupReset(){
 const ids=['vSetupName','vSetupStaff'];ids.forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
 ['vSetupOwner','vSetupSme'].forEach(id=>{const e=document.getElementById(id);if(e)e.selectedIndex=0;});
 document.querySelectorAll('#vSetupSystems input,#vSetupServers input').forEach(i=>i.checked=false);
 const r=document.getElementById('vSetupResult');if(r){r.className='result hidden';r.innerHTML='';}
 const t=document.getElementById('vSetupTicket');if(t)t.classList.add('hidden');
 const s=document.getElementById('vSetupSummary');if(s)s.innerHTML='';
 const a=document.getElementById('vSetupAccounts');if(a)a.innerHTML='';
 window.scrollTo({top:0,behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded',()=>{const a=document.getElementById('vSetupSubmit');if(a)a.addEventListener('click',vendorSetupSubmit);const r=document.getElementById('vSetupReset');if(r)r.addEventListener('click',vendorSetupReset);});

/* V44 Vendor Operations Console + Connection History V43 Vendor Connection Operations Console Ongoing Monitoring */
const vcState={validated:false,active:false,connectionId:null,start:null,closure:null,extension:false};
function vcEsc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function vcAccountName(person){const parts=person.replace(/[^A-Za-z\s'-]/g,'').trim().split(/\s+/).filter(Boolean);if(parts.length<2)return '';return 'Ven-'+parts[0][0].toUpperCase()+parts[parts.length-1].replace(/[^A-Za-z]/g,'').replace(/^./,c=>c.toUpperCase());}
function vcSetGate(i,state,text){const g=document.querySelectorAll('#vcValidationGrid .vc-gate')[i];if(!g)return;g.className='vc-gate '+state;g.querySelector('b').textContent=text;}
function vcValidate(){
 const vendor=document.getElementById('vcVendor').value, person=document.getElementById('vcPerson').value.trim(), system=document.getElementById('vcSystem').value, sme=document.getElementById('vcSme').value, reason=document.getElementById('vcReason').value.trim(), ref=document.getElementById('vcRef').value.trim();
 const result=document.getElementById('vcRequestResult'), vr=document.getElementById('vcValidationResult'), enable=document.getElementById('vcEnableBtn');
 if(!vendor||!person||!system||!sme||!reason){result.className='result fail';result.innerHTML='<b>✕ Validation cannot start.</b><br>Complete Vendor Name, Person Connecting, System/Application, Technology SME / Requestor and Reason for Connecting.';return;}
 const account=vcAccountName(person); const pass=[!!vendor,!!person,!!account,!!system,!!system,!!sme];
 pass.forEach((x,i)=>vcSetGate(i,x?'pass':'fail',x?'Passed':'Failed'));
 vcState.validated=pass.every(Boolean); enable.disabled=!vcState.validated;
 result.className='result success';result.innerHTML=`<b>✓ Validation complete.</b><br>Vendor, named account <b>${vcEsc(account)}</b>, target system and Technology requestor passed the preventive control checks.`;
 if(vcState.validated){vr.className='result success';vr.innerHTML='<b>✓ All validation gates passed.</b><br>The connection can now be enabled within the vendor\'s preconfigured least-privilege scope.';}
 else {vr.className='result fail';vr.innerHTML='<b>✕ Connection blocked.</b><br>Resolve the failed control before attempting to enable remote access.';}
}
function vcEnable(){
 if(!vcState.validated)return;
 const vendor=document.getElementById('vcVendor').value,person=document.getElementById('vcPerson').value.trim(),system=document.getElementById('vcSystem').value,sme=document.getElementById('vcSme').value,ref=document.getElementById('vcRef').value.trim()||'Not provided',analyst=document.getElementById('vcAnalyst').value.trim()||'J. Doe';
 vcState.active=true;vcState.start=new Date();vcState.connectionId='VC-2026-'+Math.floor(100000+Math.random()*899999);vcState.closure=null;vcState.extension=false;
 document.getElementById('vcStatusPill').className='pill green';document.getElementById('vcStatusPill').textContent='ACTIVE';document.getElementById('vcStatusLarge').textContent='ACTIVE';document.getElementById('vcActiveDescription').textContent='Cisco Secure Client connection enabled within the vendor\'s approved access scope.';
 document.getElementById('vcConnId').textContent=vcState.connectionId;document.getElementById('vcActiveVendor').textContent=vendor;document.getElementById('vcActiveUser').textContent=vcAccountName(person);document.getElementById('vcActiveTarget').textContent=system;document.getElementById('vcActiveSme').textContent=sme;document.getElementById('vcStartTime').textContent=vcState.start.toLocaleString([], {dateStyle:'short',timeStyle:'short'});document.getElementById('vcDisconnectTime').textContent='11:30 PM';
 ['vcExtendBtn','vcCloseBtn','vcAutoBtn'].forEach(id=>document.getElementById(id).disabled=false); document.getElementById('vcEnableBtn').disabled=true;
 const row=document.createElement('tr');row.innerHTML=`<td>${vcState.connectionId}</td><td>${vcEsc(vendor)}</td><td>${vcEsc(vcAccountName(person))}</td><td>${vcEsc(system)}</td><td><span class="pill green">Active</span></td><td>11:30 PM</td>`;row.dataset.connectionId=vcState.connectionId;document.getElementById('vcQueueBody').prepend(row);
 vcAddHistoryRecord('Active','Open', {start:vcState.start, endText:'11:30 PM', connectionId:vcState.connectionId});
 document.getElementById('vcMetricActive').textContent='3';document.getElementById('vcRequestResult').innerHTML='<b>✓ VPN connection enabled.</b><br>Connection is active and monitoring controls are engaged.';
 document.getElementById('vcActivePanel')?.scrollIntoView({behavior:'smooth',block:'start'});
}
function vcOpenExtension(){if(!vcState.active)return;document.getElementById('vcExtensionBox').classList.remove('hidden');}
function vcApplyExtension(){
 if(!vcState.active)return;const t=document.getElementById('vcExtensionTime').value,reason=document.getElementById('vcExtensionReason').value.trim();if(!t||!reason){alert('Enter a new disconnect date/time and reason for the extension.');return;}
 vcState.extension=true;document.getElementById('vcDisconnectTime').textContent=new Date(t).toLocaleString([], {dateStyle:'short',timeStyle:'short'});document.getElementById('vcExtensionBox').classList.add('hidden');document.getElementById('vcMetricExtensions').textContent='2';document.getElementById('vcRequestResult').className='result success';document.getElementById('vcRequestResult').innerHTML='<b>✓ Connection extended.</b><br>The extension reason and revised disconnect time are retained with the connection record.';
}
function vcClose(method){
 if(!vcState.active)return; const end=new Date(), vendor=document.getElementById('vcVendor').value,person=document.getElementById('vcPerson').value.trim(),system=document.getElementById('vcSystem').value,sme=document.getElementById('vcSme').value,ref=document.getElementById('vcRef').value.trim()||'Not provided',analyst=document.getElementById('vcAnalyst').value.trim()||'J. Doe';
 vcState.active=false;vcState.closure=method;document.getElementById('vcStatusPill').className='pill gray';document.getElementById('vcStatusPill').textContent='CLOSED';document.getElementById('vcStatusLarge').textContent='CLOSED';document.getElementById('vcActiveDescription').textContent='Connection terminated. Evidence package generated and retained.';['vcExtendBtn','vcCloseBtn','vcAutoBtn'].forEach(id=>document.getElementById(id).disabled=true);document.getElementById('vcMetricActive').textContent='2';document.getElementById('vcMetricClosed').textContent='8';
 const rows=[...document.querySelectorAll('#vcQueueBody tr')];const target=rows.find(r=>r.cells[0]?.textContent===vcState.connectionId);if(target){target.cells[4].innerHTML='<span class="pill gray">Closed</span>';target.cells[5].textContent=end.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});}
 document.getElementById('vcEvidenceEmpty').classList.add('hidden');document.getElementById('vcEvidence').classList.remove('hidden');document.getElementById('vcEvidenceId').textContent=vcState.connectionId;document.getElementById('vcEvidenceVendor').textContent=vendor;document.getElementById('vcEvidenceUser').textContent=vcAccountName(person);document.getElementById('vcEvidenceTarget').textContent=system;document.getElementById('vcEvidenceSme').textContent=sme;document.getElementById('vcEvidenceRef').textContent=ref;document.getElementById('vcEvidenceStart').textContent=vcState.start.toLocaleString([], {dateStyle:'short',timeStyle:'short'});document.getElementById('vcEvidenceEnd').textContent=end.toLocaleString([], {dateStyle:'short',timeStyle:'short'});document.getElementById('vcEvidenceClosure').textContent=method;document.getElementById('vcEvidenceAnalyst').textContent=analyst;
 document.getElementById('vcRequestResult').className='result success';document.getElementById('vcRequestResult').innerHTML=`<b>✓ Connection closed.</b><br>Closure method: <b>${vcEsc(method)}</b>. Audit evidence has been generated.`; vcAddHistoryRecord('Closed',method,{start:vcState.start,endText:method==='Automatic 11:30 PM Disconnect'?'11:30 PM':end.toLocaleString([], {dateStyle:'short',timeStyle:'short'}),connectionId:vcState.connectionId,updateExisting:true});
 document.getElementById('vcEvidence').scrollIntoView({behavior:'smooth',block:'start'});
}
function vcAddHistoryRecord(status, closure, opts={}){
 const body=document.getElementById('vcHistoryBody'); if(!body)return;
 const connectionId=opts.connectionId||vcState.connectionId||'VC-2026-000000';
 const vendor=document.getElementById('vcVendor')?.value||'Unknown Vendor', person=document.getElementById('vcPerson')?.value.trim()||'Unknown User', system=document.getElementById('vcSystem')?.value||'Unknown Target';
 const start=opts.start||vcState.start;
 const startText=start?start.toLocaleString([], {dateStyle:'short',timeStyle:'short'}):'—';
 const endText=opts.endText||'11:30 PM';
 let tr=[...body.querySelectorAll('tr')].find(r=>r.dataset.connectionId===connectionId || r.cells[0]?.textContent===connectionId);
 if(opts.updateExisting && tr){
   tr.dataset.status=status;
   tr.cells[4].innerHTML=`<span class="pill ${status==='Active'?'green':status==='Extended'?'blue':'gray'}">${status}</span>`;
   tr.cells[6].textContent=endText;
   tr.cells[7].textContent=closure||'Open';
 } else {
   tr=document.createElement('tr');
   tr.dataset.status=status; tr.dataset.connectionId=connectionId;
   tr.innerHTML=`<td>${vcEsc(connectionId)}</td><td>${vcEsc(vendor)}</td><td>${vcEsc(vcAccountName(person)||person)}</td><td>${vcEsc(system)}</td><td><span class="pill ${status==='Active'?'green':status==='Extended'?'blue':'gray'}">${status}</span></td><td>${vcEsc(startText)}</td><td>${vcEsc(endText)}</td><td>${vcEsc(closure||'Open')}</td>`;
   body.prepend(tr);
 }
 vcHistoryApply();
}

function vcHistoryApply(){
 const q=(document.getElementById('vcHistorySearch')?.value||'').trim().toLowerCase(), status=document.getElementById('vcHistoryStatus')?.value||'all'; let visible=0;
 document.querySelectorAll('#vcHistoryBody tr').forEach(tr=>{const text=tr.textContent.toLowerCase(), okText=!q||text.includes(q), okStatus=status==='all'||tr.dataset.status===status; tr.classList.toggle('history-hidden',!(okText&&okStatus)); if(okText&&okStatus)visible++;});
 document.getElementById('vcHistoryEmpty')?.classList.toggle('hidden',visible>0);
}
function vmRunMonthlyReview(){
 const now=new Date().toLocaleDateString([], {dateStyle:'medium'}); document.getElementById('vmLastReview').textContent=now; document.getElementById('vmReviewStatus').className='pill green'; document.getElementById('vmReviewStatus').textContent='COMPLETED'; document.getElementById('vmReviewResult').className='result success'; document.getElementById('vmReviewResult').innerHTML='<b>✓ Monthly review completed.</b><br>Connection history, access recertification and monitoring evidence were reviewed. Two extension exceptions remain flagged for follow-up.';
}
function vcReset(){location.reload();}
document.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('vcHistorySearch')?.addEventListener('input',vcHistoryApply); document.getElementById('vcHistoryStatus')?.addEventListener('change',vcHistoryApply); document.getElementById('vcHistoryClear')?.addEventListener('click',()=>{document.getElementById('vcHistorySearch').value='';document.getElementById('vcHistoryStatus').value='all';vcHistoryApply();}); document.getElementById('vmRunReview')?.addEventListener('click',vmRunMonthlyReview); vcHistoryApply();
 document.getElementById('vcValidateBtn')?.addEventListener('click',vcValidate);document.getElementById('vcEnableBtn')?.addEventListener('click',vcEnable);document.getElementById('vcExtendBtn')?.addEventListener('click',vcOpenExtension);document.getElementById('vcApplyExtension')?.addEventListener('click',vcApplyExtension);document.getElementById('vcCancelExtension')?.addEventListener('click',()=>document.getElementById('vcExtensionBox').classList.add('hidden'));document.getElementById('vcCloseBtn')?.addEventListener('click',()=>vcClose('Vendor Notification'));document.getElementById('vcAutoBtn')?.addEventListener('click',()=>vcClose('Automatic 11:30 PM Disconnect'));document.getElementById('vcResetBtn')?.addEventListener('click',vcReset);
});

/* V47 ITGC Domain 1 - IAM-01 New User Provisioning interactive audit test */
function runIAM01Test(){
 const sel=document.getElementById('iamSample'),out=document.getElementById('iamTestResult');
 if(!sel||!out)return;
 const v=sel.value;
 if(v==='exception'){
   out.className='result fail';
   out.innerHTML='<b>✕ Control exception identified.</b><br><strong>Sample 07 — Jordan Lee / Finance Analyst</strong><br>AD account and OU were correct, but the assigned security group <b>Finance-Admin</b> did not match the approved role baseline <b>Finance-Standard</b>.<br><br><b>Required action:</b> Remove the unauthorized group membership, document the remediation, retain evidence and retest the sample before closure.';
 }else{
   out.className='result success';
   out.innerHTML='<b>✓ Control test passed.</b><br><strong>'+ (v==='pass2'?'Sample 09 — Taylor Brown / Branch Operations':'Sample 01 — Alex Morgan / Finance Analyst') +'</strong><br>New Hire evidence was present, the role baseline was available, required approvals were evidenced where applicable, and AD placement plus security/email distribution groups matched the approved configuration.<br><br><b>Test conclusion:</b> No exception identified for this sample.';
 }
 out.classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('iamRunTest');if(b)b.addEventListener('click',runIAM01Test);});

/* V51 ITGC section navigation + IAM-02 Termination audit test */
function showItgcDomain(targetId, smooth=true){
 const overview=document.getElementById('itgc-overview');
 const domainGrid=document.querySelector('.itgc-domain-grid');
 const domainsHead=document.getElementById('itgc-domains');
 const detail=document.getElementById('itgc-domain1-content');
 const cards=[...document.querySelectorAll('.itgc-domain-card')];
 const placeholderId='itgc-domain-placeholder';
 let placeholder=document.getElementById(placeholderId);
 if(!placeholder){
   placeholder=document.createElement('div'); placeholder.id=placeholderId; placeholder.className='panel itgc-domain-placeholder';
   placeholder.innerHTML='<div class="panel-title"><h3>ITGC Domain</h3><span class="pill blue">ROADMAP</span></div><p class="panel-help">This domain is part of the NorthStar ITGC roadmap. Its controls, evidence model and interactive audit tests will be developed using the same Control → Evidence → Testing → Exception → Remediation pattern.</p>';
   document.getElementById('itgc').appendChild(placeholder);
 }
 overview?.classList.toggle('hidden',targetId!=='itgc-overview');
 domainGrid?.classList.toggle('hidden',targetId==='itgc-overview' || targetId==='itgc-domain1');
 domainsHead?.classList.toggle('hidden',targetId==='itgc-overview');
 detail?.classList.toggle('itgc-domain-active',targetId==='itgc-domain1');
 if(detail) detail.style.display=targetId==='itgc-domain1'?'block':'none';
 cards.forEach(c=>{const selected=c.id===targetId; c.classList.toggle('hidden',targetId!=='itgc-overview' && !selected); c.classList.toggle('domain-selected',selected);});
 const isPlaceholder=targetId!=='itgc-overview' && targetId!=='itgc-domain1';
 placeholder.classList.toggle('active-domain-placeholder',isPlaceholder);
 if(targetId==='itgc-overview') placeholder.classList.remove('active-domain-placeholder');
 document.querySelectorAll('.itgc-subnav-item').forEach(b=>b.classList.toggle('active',b.dataset.itgcTarget===targetId));
 const anchor=targetId==='itgc-domain1'?detail:(targetId==='itgc-overview'?overview:document.getElementById(targetId)||placeholder);
 if(smooth && anchor) anchor.scrollIntoView({behavior:'smooth',block:'start'});
}

document.addEventListener('DOMContentLoaded',()=>{
 document.querySelectorAll('.itgc-subnav-item').forEach(btn=>btn.addEventListener('click',()=>showItgcDomain(btn.dataset.itgcTarget)));
 const defaultItgc=document.querySelector('.itgc-subnav-item[data-itgc-target="itgc-overview"]');
 if(defaultItgc)showItgcDomain('itgc-overview',false);
 const b=document.getElementById('iam02RunTest'),out=document.getElementById('iam02TestResult'),sel=document.getElementById('iam02Sample');
 if(b&&out&&sel)b.addEventListener('click',()=>{
   const v=sel.value;
   if(v==='exception'){
     out.className='result fail';
     out.innerHTML='<b>✕ Control exception identified.</b><br><strong>Sample 07 — Taylor Brown / Application removal late</strong><br>AD account disablement and group removal were completed within the required window, but application access was not removed until the following morning. The required <b>11:00 PM</b> completion deadline was missed.<br><br><b>Required action:</b> Remove the remaining access, document the cause and corrective action, assess whether other terminations were affected and retain evidence. Retest the sample before closure.';
   }else if(v==='immediate'){
     out.className='result success';
     out.innerHTML='<b>✓ Control test passed.</b><br><strong>Sample 04 — Jordan Lee / Immediate Termination</strong><br>The termination was identified as immediate. Required access-removal activities were completed and evidence supported AD disablement, movement to the Terminated folder, security/email distribution group removal and applicable downstream access removal.<br><br><b>Test conclusion:</b> No exception identified for this sample.';
   }else{
     out.className='result success';
     out.innerHTML='<b>✓ Control test passed.</b><br><strong>Sample 01 — Alex Morgan / Scheduled Termination</strong><br>The termination record established the completion date, and access-removal evidence showed required activities were completed by the <b>11:00 PM</b> deadline. AD verification and downstream access-removal evidence were present.<br><br><b>Test conclusion:</b> No exception identified for this sample.';
   }
   out.classList.remove('hidden');
 });
});
