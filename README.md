# Stephanie Tan Qian Hwee — Portfolio

A complete static portfolio for IT internship applications. The site uses HTML, CSS, and plain JavaScript. It works without npm, a build step, a database, or an account.

## Open it in VS Code

1. Extract `Stephanie_Tan_Portfolio_VSCode.zip` first.
2. Open the `stephanie-portfolio` folder in VS Code, or open `Stephanie_Portfolio.code-workspace`.
3. Install **Live Server** by Ritwick Dey if you do not already have it. The workspace recommends this extension.
4. Right-click `index.html` and select **Open with Live Server**.

You can also double-click `index.html` to browse the site directly. Local images, pages, and downloads work without an internet connection. External website links need internet access; email links need an email application. Clipboard behavior depends on the browser, with a manual-copy fallback.

## What's included

| File | Purpose |
| --- | --- |
| `index.html` | Introduction, six selected project cards, skills, education, and recommendation |
| `projects.html` | Six projects with category filters |
| `project-wordpress.html` | Internship WordPress maintenance case study and compact client links |
| `project-arcanevault.html` | Arcane Vault collection management, marketplace, trading, and analytics case study |
| `project-genlinksg.html` | GenLinkSG / SkillSwap case study |
| `project-powerbi.html` | Individual Emergency Department Waiting Time Analysis |
| `project-budget.html` | IT1224 group case study, my contribution, findings, and report download |
| `project-dancecca.html` | Dance CCA website case study |
| `resume.html` | Experience, education, awards, and skills |
| `contact.html` | Email, copy-address button, and email draft builder |
| `css/style.css` | Colors, layouts, mobile styles, and resume print styles |
| `js/main.js` | Mobile navigation, filters, screenshot viewer, and email helpers |
| `assets/images/` | Existing project screenshots and Power BI images |
| `assets/documents/` | Existing resume, recommendation letter, and IT1221 / IT1224 reports |

## Edit the content

Edit the HTML files directly. Titles, project descriptions, contributions, and contact details are readable HTML. Shared header/footer content is repeated in each page, so update each page when changing navigation or contact details. Update the email in both the visible links and the `data-recipient` / `data-copy-email` attributes in `contact.html`.

To change the colors, edit the variables at the top of `css/style.css`. The `--card-padding` variable controls matching card spacing; project tags and case-study links align at the bottom of each row. Replace an image by keeping its filename or updating the matching `src` and `href`. Update image width/height attributes if the aspect ratio changes.

## Content notes before applications

- The Emergency Department Power BI project is labelled **individual work**. Its screenshots come from the submitted report. Numbers refer to the assignment dataset, not current hospital performance. Key Influencers is described as a built-in Power BI feature.
- **Arcane Vault** is labelled as an academic project and uses the supplied assignment, feature description, and seven application screenshots. The case study covers core collection/category management, marketplace listings, wishlists, trade requests, dashboard charts, and the trading extension’s design. No grade, production deployment, or business outcome is assumed. The proposal and assignment documents are not included in the website package.
- GenLinkSG and Dance CCA descriptions use the contribution descriptions and screenshots on your existing portfolio. No team size or exclusive ownership has been assumed.
- The student budget case study is based on the supplied IT1224 group report, included unchanged as `assets/documents/Student_Budget_Statistical_Analysis_IT1224.pdf`. It identifies my documented one-sample t-test contribution, the 21-person survey, Python / SciPy, reported descriptive statistics, and non-significant results. Bursary amounts are presented as assignment proposals, not established policy. The source labels the course-group comparison inconsistently as paired and independent; the portfolio refers to it as a group comparison without assigning a test type.
- **WordPress Website Maintenance** appears as one project card on the homepage and Projects page. Its case study contains the approved contribution wording and compact links to Top Pave, Kumon Singapore, Vainpot, and Chateau Wine Coolers. The illustrated card cover shows project context, not a client website screenshot. The Resume page links to the case study.
- The website and downloadable resume use your current course, **Business & Financial Technology**. The resume PDF and Resume page include **Director's List, Semester 1, 2026**, and the latest certificates from your supplied resume. The website copy is framed for internship opportunities.
- The testimonial quote is an excerpt from the included recommendation letter.

## Put it on GitHub Pages

This folder is ready for a static GitHub Pages deployment. Upload its **contents** to the root of your portfolio repository: `index.html`, the other HTML files, `css`, `js`, `assets`, and `.nojekyll`. Keep relative paths unchanged.

You can replace the files in your existing portfolio repository after keeping a backup. The filenames `projects.html`, `resume.html`, `contact.html`, `project-genlinksg.html`, and `project-dancecca.html` match your existing site. No files have been pushed or published by this delivery.

For deployment settings, open the repository’s Settings → Pages, choose deployment from a branch, and select the branch and root folder containing `index.html`.

## Behavior & accessibility

The site has responsive layouts, a keyboard-accessible mobile menu, visible focus styles, reduced-motion support, descriptive image text, a skip link, and native dialog focus management. Screenshot links work as direct image links if the viewer is unavailable. Project filters work with `?filter=web` and `?filter=data` URLs. The contact form opens an email draft; it does not send a message or store submissions.

## Verification

Local page/asset/fragment links, HTML structure, image decoding, and JavaScript syntax were checked. Interaction logic was smoke-tested for navigation, filtering, screenshot browsing, and email drafts. Browser layout verification was unavailable in the creation environment; review the pages with Live Server on desktop and mobile before publishing.
