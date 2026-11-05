/* ReviewIQ — illustrative customer feedback dashboard. No external APIs or AI models are called. */
const reviews = [
  {
    id: "R-1001",
    customer: "Amit Sharma",
    platform: "Amazon",
    product: "Wireless Earbuds Pro",
    rating: 2,
    sentiment: "Negative",
    issue: "Battery + Packaging",
    urgency: "High",
    status: "New",
    date: "2026-06-12",
    text: "Battery drains very fast and the box was damaged when delivered.",
    action: "Offer replacement and escalate packaging issue."
  },
  {
    id: "R-1002",
    customer: "Priya Mehta",
    platform: "Flipkart",
    product: "Smart Fitness Watch",
    rating: 1,
    sentiment: "Negative",
    issue: "Technical Issue",
    urgency: "Critical",
    status: "Escalated",
    date: "2026-06-13",
    text: "The watch stopped syncing after two days and support did not respond.",
    action: "Escalate to support and offer troubleshooting or replacement."
  },
  {
    id: "R-1003",
    customer: "Rohan Verma",
    platform: "Shopify",
    product: "GlowCare Skincare Serum",
    rating: 5,
    sentiment: "Positive",
    issue: "Positive Feedback",
    urgency: "Low",
    status: "Replied",
    date: "2026-06-11",
    text: "Great product. My skin feels better after one week of usage.",
    action: "Send thank-you reply and request repeat purchase."
  },
  {
    id: "R-1004",
    customer: "Neha Singh",
    platform: "Website",
    product: "UrbanRun Shoes",
    rating: 3,
    sentiment: "Neutral",
    issue: "Size Issue",
    urgency: "Medium",
    status: "New",
    date: "2026-06-10",
    text: "Quality is good but the size runs smaller than expected.",
    action: "Recommend size chart update and reply with exchange support."
  },
  {
    id: "R-1005",
    customer: "Arjun Das",
    platform: "Instagram",
    product: "Everyday Cotton T-Shirt",
    rating: 2,
    sentiment: "Negative",
    issue: "Poor Quality",
    urgency: "High",
    status: "Flagged",
    date: "2026-06-09",
    text: "Fabric quality is not as shown in the product photos.",
    action: "Flag product listing and review material quality."
  },
  {
    id: "R-1006",
    customer: "Simran Kaur",
    platform: "Amazon",
    product: "Smart Fitness Watch",
    rating: 4,
    sentiment: "Positive",
    issue: "Delivery Experience",
    urgency: "Low",
    status: "Replied",
    date: "2026-06-08",
    text: "Delivery was fast and the watch looks premium for this price.",
    action: "Send appreciation reply."
  },
  {
    id: "R-1007",
    customer: "Vikas Yadav",
    platform: "Flipkart",
    product: "UrbanRun Shoes",
    rating: 1,
    sentiment: "Negative",
    issue: "Refund Delay",
    urgency: "Critical",
    status: "New",
    date: "2026-06-07",
    text: "I returned the shoes but still have not received my refund.",
    action: "Escalate refund issue immediately."
  },
  {
    id: "R-1008",
    customer: "Meera Nair",
    platform: "Website",
    product: "GlowCare Skincare Serum",
    rating: 5,
    sentiment: "Positive",
    issue: "Positive Feedback",
    urgency: "Low",
    status: "Resolved",
    date: "2026-06-06",
    text: "Loved the serum. Packaging was clean and delivery was smooth.",
    action: "Send thank-you reply."
  },
  {
    id: "R-1009",
    customer: "Kabir Khan",
    platform: "Amazon",
    product: "Wireless Earbuds Pro",
    rating: 2,
    sentiment: "Negative",
    issue: "Fake Product Complaint",
    urgency: "Critical",
    status: "Escalated",
    date: "2026-06-05",
    text: "This does not look original. The seal was broken and sound quality is poor.",
    action: "Investigate seller and escalate as critical."
  },
  {
    id: "R-1010",
    customer: "Ananya Roy",
    platform: "Shopify",
    product: "Everyday Cotton T-Shirt",
    rating: 4,
    sentiment: "Positive",
    issue: "Positive Feedback",
    urgency: "Low",
    status: "Replied",
    date: "2026-06-04",
    text: "Comfortable T-shirt and color is exactly like the website image.",
    action: "Send appreciation reply."
  },
  {
    id: "R-1011",
    customer: "Farhan Ali",
    platform: "Instagram",
    product: "Portable Blender Max",
    rating: 3,
    sentiment: "Neutral",
    issue: "Pricing Concern",
    urgency: "Medium",
    status: "New",
    date: "2026-06-03",
    text: "The blender works fine, but the price feels high compared to similar products.",
    action: "Reply with value explanation and warranty details."
  },
  {
    id: "R-1012",
    customer: "Kavya Iyer",
    platform: "Website",
    product: "Portable Blender Max",
    rating: 1,
    sentiment: "Negative",
    issue: "Damaged Product",
    urgency: "Critical",
    status: "Flagged",
    date: "2026-06-02",
    text: "The jar arrived cracked and liquid started leaking on first use.",
    action: "Offer immediate replacement and quality check."
  }
];

(function bootstrap(){
  "use strict";
  const $ = id => document.getElementById(id);
  const statusSet = new Set(["New", "Replied", "Escalated", "Flagged", "Resolved"]);
  const platformColors = {Amazon:"#2563eb",Flipkart:"#d97706",Shopify:"#16a34a",Website:"#0891b2",Instagram:"#be185d"};
  const filterIds = ["platformFilter","productFilter","sentimentFilter","statusFilter","ratingFilter","urgencyFilter"];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  const storageKey = "reviewiq-demo-status-v1";
  let selectedReview = reviews[0];
  let toastTimer;

  // This prototype uses illustrative records, not external review APIs.
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    reviews.forEach(review => { if(statusSet.has(saved[review.id])) review.status = saved[review.id]; });
  } catch { /* The dashboard remains functional without browser storage. */ }

  function persistStatuses(){
    try {
      localStorage.setItem(storageKey, JSON.stringify(Object.fromEntries(reviews.map(({id,status}) => [id,status]))));
    } catch { /* Browser storage may be unavailable. */ }
  }
  function refreshIcons(){
    if(window.lucide && typeof window.lucide.createIcons === "function") window.lucide.createIcons();
  }
  function showToast(message){
    const toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  function getFilteredReviews(){
    const search=$("searchInput").value.trim().toLowerCase();
    const filters=Object.fromEntries(filterIds.map(id=>[id,$(id).value]));
    return reviews.filter(review=>{
      const haystack=[review.id,review.customer,review.platform,review.product,review.issue,review.sentiment,review.status,review.text].join(" ").toLowerCase();
      return haystack.includes(search)
        && (filters.platformFilter==="All" || review.platform===filters.platformFilter)
        && (filters.productFilter==="All" || review.product===filters.productFilter)
        && (filters.sentimentFilter==="All" || review.sentiment===filters.sentimentFilter)
        && (filters.statusFilter==="All" || review.status===filters.statusFilter)
        && (filters.ratingFilter==="All" || review.rating===Number(filters.ratingFilter))
        && (filters.urgencyFilter==="All" || review.urgency===filters.urgencyFilter);
    });
  }
  function renderKpis(){
    const n=reviews.length || 1;
    const count=fn=>reviews.filter(fn).length;
    const avg=reviews.reduce((sum,r)=>sum+r.rating,0)/n;
    const stats={
      totalReviews:String(reviews.length),
      averageRating:`${avg.toFixed(1)}/5`,
      negativeReviews:String(count(r=>r.sentiment==="Negative")),
      positivePercent:`${Math.round(100*count(r=>r.sentiment==="Positive")/n)}%`,
      repliedCount:String(count(r=>r.status==="Replied" || r.status==="Resolved")),
      urgentCount:String(count(r=>r.urgency==="High" || r.urgency==="Critical"))
    };
    Object.entries(stats).forEach(([id,value])=>{$(id).textContent=value;});
  }
  function renderReviews(){
    const filtered=getFilteredReviews();
    $("reviewCountText").textContent=`${filtered.length} of ${reviews.length} sample reviews`;
    const table=$("reviewTable");
    if(!filtered.length){
      table.innerHTML='<tr><td colspan="9"><div class="empty-state">No reviews match the selected filters. Try resetting a filter or search.</div></td></tr>';
      return;
    }
    table.innerHTML=filtered.map(r=>`
      <tr class="${r.id===selectedReview.id?"selected":""}" data-review-id="${esc(r.id)}" tabindex="0" aria-label="Select review ${esc(r.id)}">
        <td data-label="Customer"><div class="customer"><strong>${esc(r.customer)}</strong><small>${esc(r.date)}</small></div></td>
        <td data-label="Platform"><span class="platform-pill"><span class="platform-mark" style="background:${platformColors[r.platform]||"#64748b"}"></span>${esc(r.platform)}</span></td>
        <td data-label="Product"><div class="product-name">${esc(r.product)}</div></td>
        <td data-label="Rating"><span class="rating-pill"><i data-lucide="star" class="icon"></i>${r.rating}/5</span></td>
        <td data-label="Sentiment"><span class="badge ${slug(r.sentiment)}">${esc(r.sentiment)}</span></td>
        <td data-label="Issue">${esc(r.issue)}</td>
        <td data-label="Status"><span class="badge status-${slug(r.status)}">${esc(r.status)}</span></td>
        <td data-label="Review"><div class="review-preview">${esc(r.text)}</div></td>
        <td data-label="Actions"><div class="action-cell">
          <button class="action-btn" type="button" data-action="select" data-id="${esc(r.id)}" aria-label="Draft reply for ${esc(r.customer)}"><i data-lucide="message-square-reply" class="icon"></i>Reply</button>
          <button class="action-btn" type="button" data-action="escalate" data-id="${esc(r.id)}"><i data-lucide="shield-alert" class="icon"></i>Escalate</button>
          <button class="action-btn" type="button" data-action="resolve" data-id="${esc(r.id)}"><i data-lucide="check" class="icon"></i>Resolve</button>
        </div></td>
      </tr>`).join("");
    refreshIcons();
  }
  function renderSelectedReview(){
    $("selectedReview").innerHTML=`
      <div class="selected-review">
        <div class="selected-review-top">
          <div><h4>${esc(selectedReview.customer)}</h4><p>${esc(selectedReview.platform)} · ${esc(selectedReview.product)} · ${selectedReview.rating}/5</p></div>
          <span class="badge ${slug(selectedReview.urgency)}">${esc(selectedReview.urgency)}</span>
        </div>
        <p>${esc(selectedReview.text)}</p>
        <div class="selected-meta">
          <span class="badge ${slug(selectedReview.sentiment)}">${esc(selectedReview.sentiment)}</span>
          <span class="badge status-${slug(selectedReview.status)}">${esc(selectedReview.status)}</span>
        </div>
        <div class="suggested-action"><p><strong>Suggested next step:</strong> ${esc(selectedReview.action)}</p></div>
      </div>`;
    $("activeSelection").textContent=`Selected: ${selectedReview.customer}`;
  }
  function generateReply(){
    const first=selectedReview.customer.split(/\s+/)[0];
    const product=selectedReview.product;
    const issue=selectedReview.issue.toLowerCase();
    const tone=$("toneSelect").value;
    const templates={
      Positive:{
        Professional:`Hello ${first}, thank you for reviewing ${product}. We appreciate your feedback and are pleased to hear about your experience.`,
        Polite:`Hello ${first}, thank you for taking the time to share your kind feedback about ${product}. We appreciate your support.`,
        Apologetic:`Hello ${first}, thank you for your feedback about ${product}. If anything could have been better, please let us know.`,
        Friendly:`Hi ${first}! Thanks for sharing your experience with ${product}. We're glad you enjoyed it!`,
        Formal:`Dear ${first}, we acknowledge your positive feedback regarding ${product} and thank you for your continued support.`
      },
      Neutral:{
        Professional:`Hello ${first}, thank you for your balanced feedback about ${product}. We have noted your comments regarding ${issue}.`,
        Polite:`Hello ${first}, we appreciate your thoughtful comments on ${product}. Thank you for highlighting ${issue}; we will review your suggestion.`,
        Apologetic:`Hello ${first}, we're sorry ${product} did not fully meet your expectations. Thank you for drawing attention to ${issue}.`,
        Friendly:`Hi ${first}, thanks for the helpful feedback on ${product}! We'll look into your note about ${issue}.`,
        Formal:`Dear ${first}, thank you for your assessment of ${product}. Your comments concerning ${issue} have been recorded for review.`
      },
      Negative:{
        Professional:`Hello ${first}, we're sorry to hear about the issue with ${product}. We understand your concern about ${issue} and recommend that our support team review the case.`,
        Polite:`Hello ${first}, thank you for bringing this to our attention. We sincerely regret the problem with ${product} and will review the concern about ${issue}.`,
        Apologetic:`Hello ${first}, we sincerely apologize for your experience with ${product}. Your concern about ${issue} deserves prompt attention. Please contact support with your order details.`,
        Friendly:`Hi ${first}, we're really sorry ${product} let you down. Thanks for telling us about ${issue}; we'd like to help make this right.`,
        Formal:`Dear ${first}, we regret the inconvenience associated with ${product}. The reported concern regarding ${issue} warrants further investigation by our support team.`
      }
    };
    $("replyBox").textContent=templates[selectedReview.sentiment][tone];
  }
  function selectReview(id){
    selectedReview=reviews.find(r=>r.id===id)||selectedReview;
    renderSelectedReview();
    generateReply();
    renderReviews();
  }
  function changeStatus(id,status){
    const review=reviews.find(r=>r.id===id);
    if(!review || !statusSet.has(status)) return;
    review.status=status;
    persistStatuses();
    renderReviews();
    renderSelectedReview();
    renderKpis();
    renderInsights();
    showToast(`${review.id} marked ${status.toLowerCase()} (saved in this browser)`);
  }
  async function copyReply(){
    const value=$("replyBox").textContent;
    try {
      if(!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(value);
      showToast("Reply copied to clipboard");
    } catch {
      $("replyBox").focus();
      showToast("Clipboard unavailable; select and copy the draft manually");
    }
  }
  function exportCsv(){
    const rows=getFilteredReviews();
    if(!rows.length){showToast("No reviews to export");return;}
    const headers=["ID","Customer","Platform","Product","Rating","Sentiment","Issue","Urgency","Status","Date","Review","Suggested Action"];
    const quote=value=>{
      let text=String(value??"");
      if(/^[\s]*[=+\-@]/.test(text)) text="'"+text;
      return '"'+text.replace(/"/g,'""')+'"';
    };
    const csv=[headers,...rows.map(r=>[r.id,r.customer,r.platform,r.product,r.rating,r.sentiment,r.issue,r.urgency,r.status,r.date,r.text,r.action])]
      .map(row=>row.map(quote).join(",")).join("\r\n");
    const blob=new Blob(["\uFEFF",csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download="reviewiq-sample-reviews.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(`${rows.length} sample reviews exported`);
  }
  function renderCharts(){
    const counts=[5,4,3,2,1].map(rating=>({rating,count:reviews.filter(r=>r.rating===rating).length}));
    const max=Math.max(1,...counts.map(x=>x.count));
    $("ratingChart").innerHTML=counts.map(({rating,count})=>`
      <button class="bar-row chart-bar" type="button" data-rating="${rating}" aria-label="Filter ${rating}-star reviews">
        <span>${rating} Star</span><div class="bar-bg"><div class="bar-fill rating-${rating}" style="width:${100*count/max}%"></div></div><strong>${count}</strong>
      </button>`).join("");
    const issueCounts=Object.entries(reviews.filter(r=>r.sentiment==="Negative").reduce((a,r)=>(a[r.issue]=(a[r.issue]||0)+1,a),{}))
      .sort((a,b)=>b[1]-a[1]).slice(0,6);
    const issueMax=Math.max(1,...issueCounts.map(x=>x[1]));
    $("issueChart").innerHTML=issueCounts.map(([label,count])=>`
      <div class="bar-row"><span>${esc(label)}</span><div class="bar-bg"><div class="bar-fill issue" style="width:${count*100/issueMax}%"></div></div><strong>${count}</strong></div>`).join("");
    const platforms=Object.entries(reviews.reduce((a,r)=>(a[r.platform]=(a[r.platform]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]);
    let acc=0;
    const wedges=platforms.map(([name,count])=>{
      const start=acc;acc+=100*count/reviews.length;
      return `${platformColors[name]||"#64748b"} ${start.toFixed(2)}% ${acc.toFixed(2)}%`;
    }).join(", ");
    $("platformChart").innerHTML=`
      <div class="donut-wrap"><div class="donut" role="img" aria-label="Review share by platform" style="background:conic-gradient(${wedges})"></div>
      <div class="legend">${platforms.map(([name,count])=>`<div class="legend-item"><span class="legend-left"><span class="dot" style="background:${platformColors[name]||"#64748b"}"></span>${esc(name)}</span><strong>${Math.round(count*100/reviews.length)}%</strong></div>`).join("")}</div></div>`;
  }
  function renderInsights(){
    const negative=reviews.filter(r=>r.sentiment==="Negative").length;
    const urgent=reviews.filter(r=>["Critical","High"].includes(r.urgency) && !["Resolved","Replied"].includes(r.status)).length;
    const issues=reviews.filter(r=>r.sentiment==="Negative").reduce((counts,r)=>(counts[r.issue]=(counts[r.issue]||0)+1,counts),{});
    const top=Object.entries(issues).sort((a,b)=>b[1]-a[1])[0];
    const insights=[
      {title:`${negative} negative reviews`,detail:`${Math.round(100*negative/reviews.length)}% of the illustrative dataset; review causes before deciding on interventions.`},
      {title:`${urgent} high-priority cases pending`,detail:"High/critical records not yet marked replied or resolved in this browser."},
      {title:top?`Most frequent negative issue: ${top[0]}`:"No negative issues",detail:top?`${top[1]} occurrence${top[1]===1?"":"s"} in the sample; this is descriptive counting, not AI clustering.`:"No negative issues in the current sample."}
    ];
    $("insightList").innerHTML=insights.map((i,index)=>`<div class="insight"><div class="insight-icon">${String(index+1).padStart(2,"0")}</div><p><strong>${esc(i.title)}</strong><br>${esc(i.detail)}</p></div>`).join("");
  }
  function renderProducts(){
    const map=new Map();
    reviews.forEach(r=>{
      const entry=map.get(r.product)||{name:r.product,count:0,total:0,negative:0};
      entry.count++;entry.total+=r.rating;if(r.sentiment==="Negative")entry.negative++;
      map.set(r.product,entry);
    });
    $("products").innerHTML=[...map.values()].sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name)).map(p=>`
      <div class="card product-card">
        <h4>${esc(p.name)}</h4>
        <p>${p.count} sample review${p.count===1?"":"s"} · ${p.negative} negative</p>
        <span class="badge ${p.negative?"medium":"positive"}">${(p.total/p.count).toFixed(1)}/5 mean rating</span>
        <div class="metric-line"><span>Negative share</span><strong>${Math.round(p.negative*100/p.count)}%</strong></div>
      </div>`).join("");
  }
  function toggleSidebar(open){
    $("sidebar").classList.toggle("open",open);
    $("sidebarBackdrop").classList.toggle("show",open);
    $("mobileMenuButton").setAttribute("aria-expanded",String(open));
  }

  filterIds.forEach(id=>$(id).addEventListener("change",renderReviews));
  $("searchInput").addEventListener("input",renderReviews);
  $("toneSelect").addEventListener("change",generateReply);
  $("exportButton").addEventListener("click",exportCsv);
  $("copyReplyButton").addEventListener("click",copyReply);
  $("markRepliedButton").addEventListener("click",()=>changeStatus(selectedReview.id,"Replied"));
  $("escalateButton").addEventListener("click",()=>changeStatus(selectedReview.id,"Escalated"));
  $("mobileMenuButton").addEventListener("click",()=>toggleSidebar(true));
  $("sidebarBackdrop").addEventListener("click",()=>toggleSidebar(false));
  document.querySelectorAll(".nav a").forEach(link=>link.addEventListener("click",()=>toggleSidebar(false)));
  $("reviewTable").addEventListener("click",event=>{
    const action=event.target.closest("[data-action]");
    if(action){
      const id=action.dataset.id;
      if(action.dataset.action==="select")selectReview(id);
      if(action.dataset.action==="escalate")changeStatus(id,"Escalated");
      if(action.dataset.action==="resolve")changeStatus(id,"Resolved");
      return;
    }
    const row=event.target.closest("[data-review-id]");
    if(row)selectReview(row.dataset.reviewId);
  });
  $("reviewTable").addEventListener("keydown",event=>{
    if(event.target.matches("tr[data-review-id]") && (event.key==="Enter"||event.key===" ")){
      event.preventDefault();selectReview(event.target.dataset.reviewId);
    }
  });
  $("ratingChart").addEventListener("click",event=>{
    const btn=event.target.closest("[data-rating]");
    if(!btn)return;
    $("ratingFilter").value=btn.dataset.rating;
    renderReviews();
    $("reviews").scrollIntoView({behavior:"smooth",block:"start"});
  });
  renderKpis();renderCharts();renderInsights();renderProducts();renderReviews();renderSelectedReview();generateReply();refreshIcons();
})();
