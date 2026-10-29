# Implementation design record

No AI imagery or concept images were generated, following the owner's explicit restriction. The interface is native React and CSS. The production UI screenshots in `evidence/` show actual browser output.

Visual direction: a quiet investigation workspace, with a dark forest navigation rail, neutral canvas, serif editorial heading, flat source rows, and monospace source references. Status colors distinguish unknown/candidate states from source references; no confidence score or invented operational metric is displayed. The timeline and inspector are the primary work surfaces.

Desktop: persistent case rail, full evidence strip, timeline beside unanswered questions. Mobile: horizontal case selector, stacked sources, full-width analysis action, then timeline and unanswered questions in reading order. Native buttons/select/textarea, visible keyboard focus, reduced-motion support, text-based statuses and English content are implemented.

Verification: actual 1440×1100 and 390×844 Chrome sessions; interactions and screenshots in `evidence/ui-qa.json`. The developer visually inspected desktop and mobile full-page screenshots. No image-reference fidelity score is claimed because no generated reference was used. Automated accessibility certification and real-device testing have not been performed.
