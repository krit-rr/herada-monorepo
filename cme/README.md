# How It Presents in Women: CME skeleton

Point-of-care micro-learning for primary care physicians, nurse practitioners and physician assistants: how common conditions present differently in women, so the first label gets checked before it sticks. This folder holds the plan only: outline headings, the accreditation path with sources, and a reviewer stub. It holds no lesson text and makes no clinical claims.

**Gate: no module content may be written until the clinical co-author is named, and the CME build does not start before that.** See `cme/REVIEWERS.md`.

## Module outline (headings only)

### Module 1: ADHD in women

#### 1.1 Symptom presentation by sex
#### 1.2 Age at diagnosis and the referral path
#### 1.3 Look-alikes and co-occurring conditions
#### 1.4 Hormonal transitions and symptom reporting
#### 1.5 Screening tools and their validation in women
#### 1.6 Case vignette and pre/post measure

Evidence in this repo: `data/diagnostic-delay/findings.json` (ADHD rows, including the headline finding), `projects/diagnostic-detour/`.

### Module 2: Cardiac presentations including MINOCA and INOCA

#### 2.1 Symptom presentation by sex
#### 2.2 MINOCA: definition and work-up pathway
#### 2.3 INOCA: definition and work-up pathway
#### 2.4 Risk factors specific to or more common in women
#### 2.5 Triage and referral decisions
#### 2.6 Case vignette and pre/post measure

Evidence in this repo: `data/diagnostic-delay/findings.json` (cardiac rows, including the heart-attack misdiagnosis headline), `projects/diagnostic-detour/`.

### Module 3: Autoimmune presentations

#### 3.1 Sex distribution across autoimmune conditions
#### 3.2 Early non-specific symptoms and the referral path
#### 3.3 Thyroid autoimmunity
#### 3.4 Sjögren's and connective tissue disease
#### 3.5 Initial testing and referral thresholds
#### 3.6 Case vignette and pre/post measure

Evidence in this repo: `data/diagnostic-delay/findings.json` (thyroid, autoimmune and Sjögren's rows), `projects/diagnostic-detour/`.

### Module 4: The midlife rule-out

#### 4.1 The perimenopause label and its look-alikes
#### 4.2 Thyroid and iron
#### 4.3 Autoimmune and cardiac
#### 4.4 ADHD, sleep apnea and POTS
#### 4.5 The ten-item rule-out list (from the Ledger's "tested and worth asking" page)
#### 4.6 Case vignette and pre/post measure

Evidence in this repo: `projects/the-ledger/` (the "tested and worth asking" page holds the ten-item midlife rule-out list), `data/diagnostic-delay/findings.json`, `projects/diagnostic-detour/`.

## Accreditation path

All items below were checked on the source pages on 2026-11-15. Where a number is not on accme.org or the body's own site, it says "could not verify".

### Joint providership (the first path)

- What it is. ACCME defines joint providership as "the providership of a CME activity by one or more accredited and one or more nonaccredited organizations". The accredited provider takes responsibility for the activity and must be able to show compliance to ACCME through written documentation, which may come from its own files or from the nonaccredited partner's. The term does not mean a legal partnership. Source: https://accme.org/rule/joint-providership/ (checked 2026-11-15).
- Who may do it. Ineligible companies are prohibited from joint providership; the Standards say joint providership "enables accredited providers to work with nonaccredited eligible organizations to deliver accredited education". Providers on Probation may not take on new jointly provided activities. Sources: https://accme.org/wp-content/uploads/2020/12/884_20241028_standardsforintegrityandindependenceinaccreditedcontinuingeducation-1.pdf (page 4) and https://accme.org/rule/joint-providership/ (checked 2026-11-15).
- Why it comes first for a new organization. Direct accreditation requires the applicant to have planned, implemented and evaluated at least two CME activities meeting the requirements within about 24 months before submitting, and to run a program of CME "on a regular and recurring basis". A joint provider can produce those first activities under a partner's accreditation. Sources: https://accme.org/about-accreditation/expectations-eligibility/ and https://accme.org/accreditation-process/initial-accreditation/ (checked 2026-11-15).
- What the accredited partner is told to do. ACCME's compliance check (dated 2023-07-19) tells accredited providers to do due diligence on the partner, review the content carefully, obtain, review and approve all marketing materials, emails and websites that mention the activity, and keep the right to withdraw accreditation from an activity at any time. It flags logos, incentives and gift cards in marketing as a common problem. Source: https://accme.org/news/compliance-check-joint-providership/ (checked 2026-11-15).
- What the non-accredited partner typically supplies and signs. ACCME does not prescribe a document list, so the Pennsylvania Medical Society's published joint-provider process is the worked example: a clinical lead (identifies the practice gap and educational need, defines outcomes, reviews content, monitors conflicts of interest) and an administrative contact (collects disclosure forms and presentation materials from planners and faculty, completes the online application and pays the invoice, submits marketing and all educational materials including the disclosure and accreditation statements for review, reports participants within 3 business days, distributes the evaluation). Any commercial support letter of agreement must be fully executed before the activity. Source: https://pamedsoc.org/education-cme/cme-accreditation-information-center/joint-providers (checked 2026-11-15).
- The statement that must appear on jointly provided materials: "This activity has been planned and implemented in accordance with the accreditation requirements and policies of the Accreditation Council for Continuing Medical Education (ACCME) through the joint providership of (name of accredited provider) and (name of nonaccredited provider). The (name of accredited provider) is accredited by the ACCME to provide continuing medical education for physicians." Source: https://accme.org/rule/accreditation-statement/ (checked 2026-11-15).
- A published price for the route. PAMED charges joint providers a $2,500 administrative fee plus $50 per credit (one credit is 60 minutes), awarded in 0.25-credit steps with a $50 minimum per credit; fees for enduring materials are on request. Source: https://pamedsoc.org/education-cme/cme-accreditation-information-center/joint-providers (checked 2026-11-15). Other accredited providers set their own fees; none were checked.

### Direct ACCME accreditation

- Who is eligible. "Organizations eligible to be accredited in the ACCME System (eligible organizations) are those whose mission and function are: (1) providing clinical services directly to patients; or (2) the education of healthcare professionals; or (3) serving as fiduciary to patients, the public, or population health; and other organizations that are not otherwise ineligible." Listed examples include "Publishing or education companies", "Software or game developers", "Electronic health records companies" and "Insurance or managed care companies". Source: https://accme.org/rule/eligibility/ (checked 2026-11-15).
- The ineligible company definition. "Companies that are ineligible to be accredited in the ACCME System (ineligible companies) are those whose primary business is producing, marketing, selling, re-selling, or distributing healthcare products used by or on patients." Examples: pharmaceutical companies or distributors, device manufacturers or distributors, pharmacy benefit managers, diagnostic labs that sell proprietary products, compounding pharmacies making proprietary compounds, makers or sellers of medical foods and dietary supplements, manufacturers of health-related wearable products, reagent makers, bio-medical startups that have begun a governmental regulatory approval process, and advertising, marketing or communication firms whose clients are ineligible companies. Eligibility is judged on the organization and any parent company; subsidiaries of an ineligible parent cannot be accredited "regardless of steps taken to firewall the subsidiaries". ACCME publishes self-assessment questions and offers a corporate structure review for a fee (amount not published). Sources: https://accme.org/rule/eligibility/ and https://accme.org/resource/definition-ineligible-company/ (checked 2026-11-15).
- Is a content-licensing company an ineligible company? Under this definition, no: a company whose primary business is education, publishing or software, and that does not produce, market or sell healthcare products used by or on patients, sits on the eligible list. Health plans are "insurance or managed care companies", also on the eligible list. ACCME decides eligibility "in its sole discretion", so run the self-assessment questions before any pre-application and again if ownership or the product line changes. Source: https://accme.org/rule/eligibility/ (checked 2026-11-15).
- Who should apply to ACCME rather than a state society. ACCME accredits organizations whose physician learners are 30% or more from beyond the home or contiguous states; organizations whose learners are 70% or more from the home or contiguous states are accredited by a Recognized state medical society. A provider cannot hold both at once. Source: https://accme.org/about-accreditation/expectations-eligibility/ (checked 2026-11-15).
- The steps.
  1. Pre-application: submit the online Request for an ACCME Pre-Application; ACCME responds on the request within five business days; pay the pre-application fee; complete the Pre-Application in PARS; ACCME sends written notice "usually within four weeks of receipt of a pre-application". Approval checks eligibility and whether mechanisms exist to meet the requirements, not compliance itself. Source: https://accme.org/accreditation-process/pre-application/ (checked 2026-11-15).
  2. Confirmation of Intent form plus the Initial Accreditation Fee. Source: https://accme.org/accreditation-process/initial-accreditation/ (checked 2026-11-15).
  3. Self-study report, submitted in PARS, in English, against the Core Accreditation Criteria, the Standards for Integrity and Independence and applicable policies. Same source.
  4. Performance-in-practice review: "Select at least two CME activities, completed within the last 24 months, for performance-in-practice review", documented on the structured abstract. Same source.
  5. Interview: a video conference call, "up to 2 hours in length", led by volunteer surveyors with no current or recent affiliation with the applicant. Source: https://accme.org/accreditation-process/initial-accreditation/initial-accreditation-interview/ (checked 2026-11-15).
  6. Decision: meeting all requirements gives Provisional Accreditation "with a two-year accreditation term"; any Noncompliance gives Non-Accreditation. Source: https://accme.org/accreditation-process/initial-accreditation/ (checked 2026-11-15).
- The fee schedule (ACCME Accreditation Fees 2026-2027, document 110_20251029, dated 2025-10-29). Pre-application fee 2026: $1,800 (2027: TBD). Initial Accreditation Fee (consideration of the self-study) 2026: $10,000 (2027: TBD). Annual Accreditation Fee, payable by January 31, set by total activities and total learner interactions in 2022-2024: Tier 1 (39 or fewer activities; 3,951 or fewer learner interactions) $7,100 in 2026 and $7,300 in 2027; Tier 2 (40 to 132; 3,952 to 15,223) $7,650 and $7,900; Tier 3 (133 to 631; 15,224 to 125,979) $8,750 and $9,000; Tier 4 (632 to 1,230; 125,980 to 304,660) $12,000 and $12,400; Tier 5 (more than 1,230; more than 304,660) $16,500 and $17,000. Extension fee (one-time, four months) 2026: $2,000. Progress report fee 2026: $2,500. Reconsideration fee (adverse decision) 2026: $2,500. Inquiry process fee: any costs after the first $500. Substantive equivalency: initial $10,000, annual $5,900 (2026) and $6,500 (2027). There is no separate decision fee on the schedule. The schedule says the fees may change and does not apply to state-accredited or jointly accredited providers; non-payment can bring late fees, Probation and Nonaccreditation. Source: https://accme.org/wp-content/uploads/2025/10/110_20251029_accreditation_fees.pdf (checked 2026-11-15), linked from https://accme.org/rule/fees-for-accme-accredited-providers/.
- Timeline. "The process for Initial Accreditation takes 6 to 10 months depending on the applicant's readiness" (the page prints the range with a dash); self-study timing "depends on the timing of the approval of eligibility and the next available cohort". Add the pre-application notice, usually within four weeks. Sources: https://accme.org/accreditation-process/initial-accreditation/ and https://accme.org/accreditation-process/pre-application/ (checked 2026-11-15).
- Decision cycles. "ACCME makes accreditation decisions three times per year." Initial applicants are grouped into March, July and November cohorts (the self-study outlines are titled for the "March, July & November 2027 Cohorts" and 2028 cohorts). The reaccreditation page says decisions are typically in March, July and December. Sources: https://accme.org/accreditation-process/, https://accme.org/accreditation-process/initial-accreditation/ and https://accme.org/accreditation-process/reaccreditation/ (checked 2026-11-15).
- How long each status lasts. "Provisional Accreditation is a two-year term awarded to initial applicants." "Accreditation is the standard, four-year term." Accreditation with Commendation is a six-year term. Probation cannot last longer than two years. To advance from Provisional Accreditation to Accreditation, "Provisionally accredited organizations must have a CME activity reviewed": observation of one activity, of any format, by an ACCME volunteer surveyor or ACCME staff. Sources: https://accme.org/about-accreditation/accreditation-status/ and https://accme.org/accreditation-process/reaccreditation/ (checked 2026-11-15).
- Rules that touch Herada's own business (watch list).
  - Eligibility holds while Herada's primary business is education, publishing or software and no ineligible company owns or fiscally controls it. A product "used by or on patients" (a consumer device, a wearable, a supplement) would pull it toward the ineligible definition. Run the self-assessment questions before the pre-application; a corporate structure review carries a fee. Source: https://accme.org/rule/eligibility/ (checked 2026-11-15).
  - Health plans are eligible organizations, so a message-library licence to a health plan is neither a relationship with an ineligible company nor "commercial support". A licence to a pharmacy benefit manager, a pharma- or device-owned plan, or a supplement or wearable company would be a financial relationship with an ineligible company for Herada's owner and for anyone paid by Herada who controls module content; it must be collected, judged for relevance, mitigated and disclosed. Source: Standards pages 4 to 6, https://accme.org/wp-content/uploads/2020/12/884_20241028_standardsforintegrityandindependenceinaccreditedcontinuingeducation-1.pdf (checked 2026-11-15).
  - Standard 2.2: "Accredited education must be free of marketing or sales of products or services. Faculty must not actively promote or sell products or services that serve their professional or financial interests during accredited education." No module may promote the message library, the Ledger or a client's services. Standard 5.2: "learners can easily distinguish between accredited education and other activities", so patient-facing messages and health-plan marketing live outside the CME. Same source.
  - Standard 2.3: learner names and contact details may not be shared with an ineligible company without the learner's explicit consent. Apply the same rule to every client as policy (see `docs/privacy.md`). Same source.
  - Standard 1: every patient-care recommendation must rest on current science, evidence and clinical reasoning, fair and balanced. Rows flagged `verify: true` or `untraceable: true` in `data/diagnostic-delay/findings.json` cannot enter a module until resolved. Same source.
  - Joint providership: the accredited partner approves all marketing that mentions the activity, so Herada's health-plan sales material may not reference a CME activity without that approval. Source: https://accme.org/news/compliance-check-joint-providership/ (checked 2026-11-15).
  - AMA: segments that are promotional, or targeted at non-physicians, cannot be certified for AMA PRA Category 1 Credit and must be separated in the materials. Source: https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf (question 39; checked 2026-11-15).

### State medical society accreditation (intrastate providers)

- What it is. ACCME uses a "framework of equivalency" to recognize state and territory medical societies as accreditors of CME providers that "focus on serving learners in their own state or contiguous states". The Pennsylvania Medical Society (PAMED) is on the list of ACCME-Recognized Accreditors. Source: https://accme.org/about-accreditation/colleague-accreditors/state-medical-societies/ (checked 2026-11-15).
- The threshold. 70% or more of physician learners from the home or contiguous states puts a provider with the state society; 30% or more from beyond puts it with ACCME; never both at once. Source: https://accme.org/about-accreditation/expectations-eligibility/ (checked 2026-11-15).
- Fees to ACCME. "State-accredited providers pay an annual fee to ACCME through their Recognized Accreditor." The ACCME fee schedule above does not apply to them. Sources: https://accme.org/rule/fees-for-accme-accredited-providers/ and the fee PDF above (checked 2026-11-15).
- PAMED's process. PAMED accredits organizations "within the Commonwealth" to award AMA PRA Category 1 Credit. Applicants submit a written self-study and evidence of activity planning through PAMED's OpenWater portal, follow cohort milestone schedules (cohorts listed from October 2026 through October 2028, in February, June and October), interview by Zoom for up to two hours with a team of usually two PAMED-trained surveyors, and receive decisions from PAMED's CME Advisory Panel. Successful providers get Accreditation (four-year term) or Accreditation with Commendation (six-year term). The published October 2026 reaccreditation timeline runs from notification on 2025-09-19 to a written decision on 2026-10-30, about 13 months. Sources: https://pamedsoc.org/education-cme/cme-accreditation-information-center/accredited-providers, https://www.pamedsoc.org/docs/default-source/default-document-library/cme/accreditation-info-center/getting-started/overview-of-the-organizational-accreditation-process.pdf (Revised April 2026) and https://www.pamedsoc.org/docs/default-source/default-document-library/cme/accreditation-info-center/accreditation-forms/accreditation-timelines-milestones-for-october2026-cohort.pdf (Revised March 2026), all checked 2026-11-15.
- PAMED's fee for organizational accreditation: could not verify. It is not on the information center, the accredited-providers page, the process overview PDF or the timeline PDF. Ask cmeadmin@pamedsoc.org or (800) 228-7823. Source for the contact: https://pamedsoc.org/education-cme/cme-accreditation-information-center (checked 2026-11-15).
- Is it cheaper? Could not verify, for the reason above. For comparison, the ACCME route costs $1,800 plus $10,000 up front and $7,100 a year at Tier 1 (2026 schedule). This is the route to check first if the learners are in Pennsylvania or its neighbours.

### Credit acceptance for NPs and PAs

- The AMA rule behind every credit statement. Only physicians (MD, DO or an equivalent degree) may be awarded AMA PRA Category 1 Credit. Accredited providers may give non-physicians documentation stating that the activity was certified for AMA PRA Category 1 Credit, and for live activities the hours of participation, but never a certificate that states or implies the non-physician was awarded the credit. Source: https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf (questions 21, 23 and 129; checked 2026-11-15).
- PAs (NCCPA). Each two-year cycle needs 100 CME credits, at least 50 of them Category 1. NCCPA accepts for Category 1 "AMA PRA Category 1 Credit from organizations accredited by ACCME or a recognized state medical society". Source: https://www.nccpa.net/maintain-certification/continuing-medical-education/ (page metadata modified 2026-11-05; checked 2026-11-15).
- PAs (AAPA). "AAPA is the only accreditor for the AAPA Category 1 CME system." Activities already designated for AMA PRA Category 1 Credit, AAFP Prescribed Credit or AOA Category 1-A Credit may apply through an expedited AAPA review and are automatically treated as Simple applications for fee purposes. AAPA suggests this wording for AMA-designated activities: "PAs may claim a maximum of ____ Category 1 credits for completing this activity. NCCPA accepts AMA PRA Category 1 Credit from organizations accredited by ACCME or a recognized state medical society." The expedited fee amount was not in the page text; could not verify. Source: https://www.aapa.org/education/aapa-cme-accreditation/ (checked 2026-11-15; the page refuses automated readers, read with a browser user agent).
- NPs (AANPCB, the certification board). Renewal needs a minimum of 100 advanced practice CE contact hours in the five-year period, at least 25 of them advanced pharmacology. CE must be relevant to NP practice, "intended for advanced practice providers or healthcare professionals", and the credit "awarded by an accredited provider". The handbook does not name ACCME or AMA PRA Category 1 Credit. Could not verify on aanpcert.org or aanp.org that ACCME-accredited credit is accepted by name; CME vendors say it is, and the accrediting partner should confirm in writing. Sources: https://www.aanpcert.org/wp-content/uploads/FNP-Renewal-Handbook-06-04-2026.pdf (Updated 06/2026) and https://www.aanpcert.org/resources/faq/ (checked 2026-11-15).
- NPs (AANP, the association). AANP is itself a CE accrediting body: "AANP CE is not affiliated with or accredited by any other organization", and its standards are "consistent with the philosophy of" ACCME standards, with a 24-month disclosure look-back aligned to ACCME. It accredits individual activities; it does not itself certify AMA credit. Source: https://storage.aanp.org/www/documents/education/accreditation/Accreditation-Policy-Handbook.pdf (2026 edition, v.2026.1; checked 2026-11-15). AANP's support article on CE for recertification returned HTTP 403; not read.
- Joint Accreditation (ACCME, ACPE, ANCC). One process that accredits an organization to provide continuing education for several professions "simultaneously" through a single application, fee structure and set of standards, with ten collaborating accreditors (ACCME, ACPE, ANCC, AAPA, ADA CERP, APA, ARBO/COPE, ASWB, BOC, CDR). Eligibility: a fully functional structure for planning education "by and for the healthcare team" for the previous 18 months, at least 25% of activities designed by and for healthcare teams, and all 12 interprofessional criteria met. Not a route for a new organization. Sources: https://accme.org/joint-accreditation and https://jointaccreditation.org/ (eligibility page https://jointaccreditation.org/accreditation-process/eligibility/), checked 2026-11-15.

### Formats that fit micro-learning

- The PARS activity formats: Live Course, Regularly Scheduled Series, Enduring Material, Journal-Based CME/CE, Manuscript Review, Test-Item Writing, Committee Learning, Performance Quality Improvement, Internet Searching and Learning, Learning from Teaching, Other/Blended Learning. Learners are counted as "interactions" (completed some or all of the activity; no credit claim or evaluation needed) and may be reported in "quarter-hour increments (.25)". Source: https://accme.org/data-reporting/data-reporting-quick-answers/ (checked 2026-11-15).
- Enduring material. "An enduring material is an on-demand activity that does not have a specific time or location designated for participation"; examples include online interactive modules and podcasts. Report it in PARS once for its whole run, with a date range of up to three years (start is first access, end is expiration); update learner counts through 12/31 by the 3/31 annual deadline each year it is active; count learners who completed all or part with verifiable participation; credit reflects the time to complete; a reviewed and renewed material is re-entered as a new activity. Sources: https://accme.org/resource/enduring-material/ and https://accme.org/data-reporting/data-reporting-quick-answers/ (checked 2026-11-15).
- The three-year rule. "Providers that produce enduring materials must review each enduring material at least once every three years", or sooner if new science requires it, and the material must carry the original release date, the review date and a termination date. Source: https://accme.org/rule/content-validity-of-enduring-materials/ (checked 2026-11-15).
- Credit arithmetic for a 5-minute module. AMA designates enduring material credit at 1 credit per hour in 0.25 increments, rounded to the nearest quarter hour, from a good-faith estimate of completion time (for example, the average time for a small sample of the target audience). So a single 5-minute module cannot carry credit on its own: bundle at least 15 minutes (0.25 credit) into one enduring material, or use the point-of-care format below. AMA does not require a pre-test and post-test for enduring materials, and a graded assessment with a minimum score is optional, but the provider must have a process to know who participated. Source: https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf (credit table and questions 63, 66, 67, 68; checked 2026-11-15).
- Internet searching and learning (internet point-of-care). ACCME: "self-directed, online learning on topics relevant to their clinical practice from a database whose content has been vetted by an accredited CME provider"; AMA-defined point-of-care CME is included. Aggregate all learners into one PARS activity; report it for a maximum of 12 months, then as a new activity each year; the learner count is the number of distinct learners; ACCME's example is 50 learners averaging 30 minutes reported as 50 learners and 0.5 credits. AMA: 0.5 credit per question; the database or search mechanism must be vetted as independent of commercial interests and scientifically valid; the provider must know the physician engaged. Sources: https://accme.org/resource/internet-searching-and-learning-activities/ and https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf (questions 107 to 109; checked 2026-11-15).
- Performance/quality improvement. A three-stage process: learn about specific performance measures, assess practice against them, implement interventions over a useful interval, reassess with the same measures. Report distinct learners and the time a learner would take; report for a maximum of 12 months. AMA credit: 20 per full activity, or 5 per stage for stage A or stages A and B. Sources: https://accme.org/resource/performance-improvement-quality-improvements-activities/ and the AMA FAQ credit table (checked 2026-11-15).
- Short video and online platforms. Existing requirements apply unchanged; ACCME recommends nesting the disclosures, the accreditation statement and any commercial support disclosure inside the video or content itself so they travel with it. Source: https://accme.org/resource/accredited-education-delivered-via-online-and-social-media-platforms-executive-summary-quick-answers-to-faqs/ (dated 2024-07-31; checked 2026-11-15).
- Standards that bind planners and faculty.
  - Standard 1 (content is valid): recommendations based on current science, evidence and clinical reasoning, fair and balanced; new or evolving topics labelled as such.
  - Standard 2 (no commercial bias or marketing): planning, faculty selection, delivery and evaluation decided without influence or involvement from owners and employees of an ineligible company; no marketing or sales of products or services; no sharing of learner names with ineligible companies without consent.
  - Standard 3 (relevant financial relationships): collect from "all planners, faculty, and others in control of educational content" all financial relationships with ineligible companies "within the prior 24 months", with "no minimum financial threshold"; exclude owners and employees of ineligible companies (three narrow exceptions); a relationship is relevant when the content the person controls relates to the company's business lines or products; mitigate before the person takes the role and document the steps; disclose to learners the names, the companies, the nature of each relationship, and that all relevant relationships were mitigated, plus the absence of relationships, before they engage and in a verifiable format. Exceptions: non-clinical education, learner-controlled content, self-directed education.
  - Standard 4 (commercial support, only if money or in-kind support comes from an ineligible company): written agreement executed before the activity, provider controls all spending, no payments to learners, supporter names disclosed.
  - Standard 5 (ancillary activities): education kept separate from marketing by ineligible companies; learners must easily tell accredited education from other activities.
  - Sources: https://accme.org/rule/identify-mitigate-and-disclose-relevant-financial-relationships/ and https://accme.org/wp-content/uploads/2020/12/884_20241028_standardsforintegrityandindependenceinaccreditedcontinuingeducation-1.pdf (checked 2026-11-15).

### Measurement

- The core criteria. ACCME lists eight: Mission, Program Analysis, Program Improvements, Educational Needs, Designed to Change, Appropriate Formats, Competencies, Analyzes Change; the Standards and policies sit alongside them. Source: https://accme.org/rules/criteria/ (checked 2026-11-15).
- Designed to Change. "The provider generates activities/educational interventions that are designed to change competence, performance, or patient outcomes as described in its mission statement." The page glosses competence as learners' "strategies/skills", performance as "what learners actually do in practice", and patient outcomes as "the impact on the patient or on the care delivered". Source: https://accme.org/rule/designed-to-change/ (checked 2026-11-15).
- Analyzes Change. "The provider analyzes changes in learners (competence, performance, or patient outcomes) achieved as a result of the overall program's activities/educational interventions." Source: https://accme.org/rule/analyzes-change/ (checked 2026-11-15).
- What ACCME says counts. Its compliance check (dated 2024-10-10) frames competence as applying knowledge in practice, not just gaining it, says asking learners for examples of changes they made or plan to make helps collect the data, and judges the analysis at the level of the overall program against activity goals and mission. Source: https://accme.org/news/analyzing-learner-change-compliance-check/ (checked 2026-11-15).
- How a pre/post learner-performance measure fits. Each module ends with the same short case-based item set it opened with; the before-and-after difference is the competence measure for that module, and a one-line "what will you do differently" answer gives the commitment-to-change data ACCME describes. These roll up into the program-level analysis required by Analyzes Change. AMA does not require a pre/post test for enduring materials, so this is Herada's design choice, not a credit rule; the provider still needs a participation record for each learner. Sources: https://accme.org/rule/analyzes-change/, https://accme.org/news/analyzing-learner-change-compliance-check/ and https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf (questions 66 and 68), checked 2026-11-15.

## Open decisions for Krit

- [ ] Clinical co-author: named, credentialed, disclosure form collected for the prior 24 months. Nothing in this folder moves until this box is ticked.
- [ ] Accrediting partner: joint providership with an accredited provider first; PAMED if learners are in Pennsylvania and its neighbours; direct ACCME only after two activities exist. Run ACCME's eligibility self-assessment before any pre-application.
- [ ] First module: which of the four, and in which format (a 15-minute enduring-material bundle, or internet point-of-care).
- [ ] Learner population: physicians only, or physicians plus NPs and PAs. This changes the credit statement and the documentation each learner gets.
- [ ] Pricing: not before accreditation. No price appears on any CME page until the accreditation statement can be shown.

## Sources

All checked 2026-11-15.

ACCME
- Joint providership rule: https://accme.org/rule/joint-providership/
- Compliance check, joint providership (2023-07-19): https://accme.org/news/compliance-check-joint-providership/
- Accreditation statement rule: https://accme.org/rule/accreditation-statement/
- Eligibility rule: https://accme.org/rule/eligibility/
- Definition, ineligible company: https://accme.org/resource/definition-ineligible-company/
- Standards for Integrity and Independence in Accredited Continuing Education (PDF, document 884_20241028): https://accme.org/wp-content/uploads/2020/12/884_20241028_standardsforintegrityandindependenceinaccreditedcontinuingeducation-1.pdf
- Standard 3 rule page: https://accme.org/rule/identify-mitigate-and-disclose-relevant-financial-relationships/
- Expectations and eligibility: https://accme.org/about-accreditation/expectations-eligibility/
- Accreditation process overview: https://accme.org/accreditation-process/
- Pre-application: https://accme.org/accreditation-process/pre-application/
- Initial accreditation: https://accme.org/accreditation-process/initial-accreditation/
- Initial accreditation interview: https://accme.org/accreditation-process/initial-accreditation/initial-accreditation-interview/
- Reaccreditation (activity review, decision months): https://accme.org/accreditation-process/reaccreditation/
- Accreditation statuses: https://accme.org/about-accreditation/accreditation-status/
- Fees rule: https://accme.org/rule/fees-for-accme-accredited-providers/
- Fee schedule 2026-2027 (PDF, document 110_20251029, dated 2025-10-29): https://accme.org/wp-content/uploads/2025/10/110_20251029_accreditation_fees.pdf
- State medical societies (Recognized Accreditors): https://accme.org/about-accreditation/colleague-accreditors/state-medical-societies/
- Joint Accreditation (ACCME page): https://accme.org/joint-accreditation
- Core criteria: https://accme.org/rules/criteria/
- Designed to Change: https://accme.org/rule/designed-to-change/
- Analyzes Change: https://accme.org/rule/analyzes-change/
- Compliance check, analyzing learner change (2024-10-10): https://accme.org/news/analyzing-learner-change-compliance-check/
- Data reporting quick answers: https://accme.org/data-reporting/data-reporting-quick-answers/
- Enduring material: https://accme.org/resource/enduring-material/
- Content validity of enduring materials: https://accme.org/rule/content-validity-of-enduring-materials/
- Internet searching and learning: https://accme.org/resource/internet-searching-and-learning-activities/
- Performance/quality improvement activities: https://accme.org/resource/performance-improvement-quality-improvements-activities/
- Accredited education via online and social media platforms (2024-07-31): https://accme.org/resource/accredited-education-delivered-via-online-and-social-media-platforms-executive-summary-quick-answers-to-faqs/

Joint Accreditation
- Home and eligibility: https://jointaccreditation.org/ and https://jointaccreditation.org/accreditation-process/eligibility/

Pennsylvania Medical Society
- CME Accreditation Information Center: https://pamedsoc.org/education-cme/cme-accreditation-information-center
- Accredited providers: https://pamedsoc.org/education-cme/cme-accreditation-information-center/accredited-providers
- Joint providers (fees): https://pamedsoc.org/education-cme/cme-accreditation-information-center/joint-providers
- Overview of the Organizational Accreditation Process (PDF, Revised April 2026): https://www.pamedsoc.org/docs/default-source/default-document-library/cme/accreditation-info-center/getting-started/overview-of-the-organizational-accreditation-process.pdf
- Reaccreditation timeline, October 2026 decision cohort (PDF, Revised March 2026): https://www.pamedsoc.org/docs/default-source/default-document-library/cme/accreditation-info-center/accreditation-forms/accreditation-timelines-milestones-for-october2026-cohort.pdf

NP and PA bodies, and the AMA
- NCCPA, Continuing Medical Education: https://www.nccpa.net/maintain-certification/continuing-medical-education/
- AAPA CME Accreditation: https://www.aapa.org/education/aapa-cme-accreditation/
- AANPCB FNP Renewal Handbook (Updated 06/2026): https://www.aanpcert.org/wp-content/uploads/FNP-Renewal-Handbook-06-04-2026.pdf
- AANPCB FAQ: https://www.aanpcert.org/resources/faq/
- AANP 2026 Accreditation Policy Handbook (v.2026.1): https://storage.aanp.org/www/documents/education/accreditation/Accreditation-Policy-Handbook.pdf
- AMA PRA Credit System FAQ (PDF): https://www.ama-assn.org/system/files/faq-pra-cme-provider.pdf
