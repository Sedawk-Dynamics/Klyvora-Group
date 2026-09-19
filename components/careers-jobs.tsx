"use client"

import { useEffect, useRef, useState } from "react"

// Zoho Recruit job-listing widget, rendered inside an iframe so its scripts
// and styles stay isolated from the rest of the site. The styles below
// override Zoho's "style 3" layout to match the Klyvora look.
const zohoJobsEmbed = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base target="_blank">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css" type="text/css">
<style>
  :root { --navy: #0f1e33; --steel: #2b6f95; --muted: #5b6878; --border: #e3e8ee; --surface: #f5f7fa; }
  html, body { margin: 0; padding: 0; background: transparent; }
  body, body * { font-family: Inter, Arial, Helvetica, sans-serif !important; }
  .embed_jobs_head, .embed_jobs_head2, .embed_jobs_head3 { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; box-sizing: border-box; }

  /* Search bar: full width, no 30% offset */
  .embed_jobs_with_style_3 .rec-what-where {
    margin: 0 0 24px !important; padding: 16px !important; gap: 12px;
    background: var(--surface); border: 1px solid var(--border) !important; border-radius: 12px;
  }
  .rec-what-where .rec-job-info { margin: 0 !important; }
  .rec-what-where .rec-job-info.searchWhat,
  .rec-what-where .rec-job-info.searchWhere {
    flex: 1; width: auto !important; background: #fff; border: 1px solid var(--border) !important; border-radius: 8px; padding: 10px 12px;
  }
  .rec-what-where .rec-job-info.searchWhat:focus-within,
  .rec-what-where .rec-job-info.searchWhere:focus-within { border-color: var(--steel) !important; }
  .rec-what-where input { width: 100%; border: none; outline: none; font-size: 15px; color: var(--navy); background: transparent; }
  .rec-what-where .rec-job-info.searchButton {
    width: 140px !important; flex-shrink: 0; border-radius: 8px !important; font-weight: 600; font-size: 15px;
    background: var(--navy) !important; color: #fff !important; display: flex; align-items: center; justify-content: center;
  }

  /* Filters + list layout */
  .embed_jobs_with_style_3 #rec_job_listing_div,
  .embed_jobs_with_style_3 .rec_job_listing_div { display: flex; align-items: flex-start; gap: 24px; }
  .embed_jobs_with_style_3 .rec_filter_cls { width: 240px !important; flex-shrink: 0; }
  .embed_jobs_with_style_3 .rec_facet_group {
    margin: 0 !important; padding: 20px !important; max-height: none; background: #fff;
    border: 1px solid var(--border) !important; border-radius: 12px;
  }
  .embed_jobs_with_style_3 .rec_facet_group > div,
  .embed_jobs_with_style_3 .rec_facet_group .cw-rec-filter { margin: 0 !important; padding: 0 !important; }
  .embed_jobs_with_style_3 .rec_facet_group > div + div { margin-top: 16px !important; }
  .embed_jobs_with_style_3 .rec_facet_group ul { margin: 0 !important; padding: 0 !important; }
  .embed_jobs_with_style_3 .rec_facet_group .job-type {
    font-size: 12px !important; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    color: var(--muted); margin: 0 0 8px !important; padding: 0 !important; line-height: 1.2 !important;
  }
  .embed_jobs_with_style_3 .rec_facet_group li,
  .embed_jobs_with_style_3 .rec_facet_group .job-type-div li {
    display: flex !important; align-items: center; gap: 10px; margin: 0 !important;
    padding: 4px 0 !important; font-size: 14px; line-height: 1.4; color: var(--navy);
  }
  .embed_jobs_with_style_3 .rec_facet_group li label { display: flex; align-items: center; gap: 10px; margin: 0; cursor: pointer; }
  .embed_jobs_with_style_3 .rec_facet_group input[type="checkbox"] { margin: 0 !important; width: 16px; height: 16px; flex-shrink: 0; accent-color: var(--navy); }
  .embed_jobs_with_style_3 .rec_job_listing_div_jobs { width: auto !important; flex: 1; min-width: 0; }

  /* Job cards */
  .rec_job_listing_div_jobs .rec-group {
    background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px !important;
    margin: 0 0 16px !important; transition: border-color .2s, box-shadow .2s, transform .2s;
  }
  .rec_job_listing_div_jobs .rec-group:hover { border-color: var(--steel); box-shadow: 0 8px 24px rgba(15,30,51,.08); transform: translateY(-2px); }
  .rec_job_listing_div_jobs .rec-group .rec-job-title,
  .rec_job_listing_div_jobs .rec-group .rec-job-title a { color: var(--navy) !important; font-size: 18px !important; font-weight: 700; text-decoration: none; }
  .rec_job_listing_div_jobs .rec-group .rec-job-title a:hover { color: var(--steel) !important; }
  .embed_jobs_with_style_3 .rec-group .zrsite_Location { color: var(--steel); font-weight: 500; font-size: 14px; margin-top: 4px; }
  .embed_jobs_with_style_3 .rec-group .zrsite_Job_Description { color: var(--muted); font-size: 14px; line-height: 1.55rem; }
  .embed_jobs_with_style_3 .zrsite_Date_Opened .zrsite_Job_Type {
    display: inline-block; font-size: 12px !important; font-weight: 600; color: var(--steel);
    background: rgba(43,111,149,.1); padding: 4px 10px; border-radius: 999px; margin-top: 6px;
  }
  .embed_jobs_with_style_3 .rec-group .rec-job-info .zrsite_Date_Opened { color: var(--muted); font-size: 12px; }

  @media (max-width: 720px) {
    .embed_jobs_with_style_3 #rec_job_listing_div,
    .embed_jobs_with_style_3 .rec_job_listing_div { flex-direction: column; }
    .embed_jobs_with_style_3 .rec_filter_cls { width: 100% !important; }
    .embed_jobs_with_style_3 .rec-what-where { flex-direction: column; }
    .rec-what-where .rec-job-info.searchButton { width: 100% !important; padding: 12px; }
    .embed_jobs_with_style_3 .rec-group .rec-job-info { flex-direction: column; }
    .embed_jobs_with_style_3 .rec-group .rec-job-info .zr_fillayout_info,
    .embed_jobs_with_style_3 .rec-group .rec-job-info .zrsite_Date_Opened { width: 100% !important; align-items: flex-start; }
  }
</style>
</head>
<body>
<div class="embed_jobs_head embed_jobs_with_style_3">
  <div class="embed_jobs_head2">
    <div class="embed_jobs_head3">
      <div id="rec_job_listing_div"> </div>
      <script type="text/javascript" src="https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js"></script>
      <script type="text/javascript">
      rec_embed_js.load({
        widget_id:"rec_job_listing_div",
        page_name:"Careers",
        source:"CareerSite",
        site:"https://klyvora-group.zohorecruit.com",
        brand_color:"#0f1e33",
        empty_job_msg:"No current openings. Please check back soon."
      });
      </script>
    </div>
  </div>
</div>
</body>
</html>`

export function CareersJobs() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(800)

  // srcDoc iframes share our origin, so we can size the frame to its content
  // and avoid a scrollbar inside the page.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    let observer: ResizeObserver | undefined

    const attach = () => {
      const body = frame.contentDocument?.body
      if (!body) return
      observer?.disconnect()
      observer = new ResizeObserver(() => setHeight(Math.max(400, body.scrollHeight + 8)))
      observer.observe(body)
    }

    frame.addEventListener("load", attach)
    attach()
    return () => {
      frame.removeEventListener("load", attach)
      observer?.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={frameRef}
      title="Klyvora Group open positions"
      srcDoc={zohoJobsEmbed}
      style={{ height }}
      className="w-full border-0 block"
    />
  )
}
