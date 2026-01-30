**# Task 1.1: Requirements Analysis & User Journey Design

## Comprehensive Clarification Questions Document

---

## 1. AGENT USER JOURNEY - CALL FLOW & INTERACTIONS

### 1.1 Pre-Call State

**Application Loading & Initialization**

- Q1: When exactly does the Agent UI load? Before the call lands or after?
- Q2: If embedded in CRM, does the widget remain loaded throughout the agent's shift or load per call?
- Q3: What happens if the Agent UI fails to load? Does the call proceed without assistance?
- Q4: Is there a "ready state" indicator for agents to know the system is active?
- Q5: What's the fallback if authentication fails mid-shift?

**Agent Login & Session Management**

- Q6: Do agents log into Agent Assist separately from their CRM/telephony system?
- Q7: How is agent identity passed in embedded mode vs standalone mode?
- Q8: What happens if an agent has multiple tabs/windows open?
- Q9: Is there a session timeout? What's the duration?
- Q10: Can an agent handle multiple calls simultaneously? How does the UI handle this?

### 1.2 Call Start - First 5 Seconds

**UI Activation & Display**

- Q11: In embedded mode (widget), does the widget auto-expand or require agent click?
- Q12: If floating widget, which corner/position? Is this configurable per client?
- Q13: Can agents minimize/close the Agent UI during a call? What happens?
- Q14: What's the default size of the embedded widget? Can agents resize it?
- Q15: Does the UI take keyboard focus or remain in background?

**Initial Data Display**

- Q16: What exactly appears in the first 1-2 seconds before intent detection?
- Q17: Is there a loading spinner or "Analyzing..." state shown?
- Q18: If repeat caller context takes >5 seconds to load, what's shown?
- Q19: What if customer phone number is masked/unavailable - how does repeat caller work?
- Q20: Does the UI show customer name/ID from telephony system?

**Repeat Caller Context**

- Q21: What exact data appears in "repeat caller context"? Last summary only or more?
- Q22: How many previous interactions are shown? Just the last one or last 3/5/10?
- Q23: Can agents click to see full previous call details or just summary?
- Q24: What if the last call was incomplete/failed - is this indicated?
- Q25: Is there a visual indicator that this IS a repeat caller (badge/icon)?
- Q26: What if multiple numbers exist for same customer - how is matching done?

### 1.3 During Call - Real-Time Updates

**Intent Display**

- Q27: How is intent visually presented? Badge, header, side panel?
- Q28: When intent updates, is there an animation/notification or silent update?
- Q29: What if intent confidence is below threshold - show "Unclear" or hide?
- Q30: Can multiple intents show simultaneously (e.g., "Billing + Escalation")?
- Q31: Is there an intent history visible (showing how it changed during call)?
- Q32: What happens if intent switches back and forth rapidly?
- Q33: Can agents manually override/correct the detected intent?

**Sentiment Indicators**

- Q34: Are sentiment scores shown as numbers (-0.7), colors, emojis, or all three?
- Q35: Where exactly are the two sentiment gauges positioned (side-by-side, stacked)?
- Q36: What's the size of sentiment indicators? Always visible or collapsible?
- Q37: Is there a sentiment trend arrow (↑↓→) or just current value?
- Q38: What color scheme for sentiment? Red/Yellow/Green or custom?
- Q39: Do sentiment scores update smoothly (animated) or jump to new values?
- Q40: Can agents see sentiment history/timeline during the call or only post-call?

**SOP Guidance Panel**

- Q41: How much screen real estate does SOP panel take? Percentage-based or fixed pixels?
- Q42: Can agents collapse/expand the SOP panel during call?
- Q43: When SOP step updates, is there audio/visual notification to agent?
- Q44: How are completed steps indicated? Checkmarks, strikethrough, grayed out?
- Q45: Can agents manually navigate between SOP steps or is it auto-only?
- Q46: What if agent completes steps out of order - does system adapt?
- Q47: Is there a progress bar showing overall SOP completion percentage?
- Q48: What happens if no SOP matches the detected intent?
- Q49: Can agents add notes/flags to SOP steps during the call?

**Coaching Prompts/Alerts**

- Q50: Where do coaching prompts appear? Toast notification, banner, modal?
- Q51: How long do prompts remain visible? Auto-dismiss or require agent action?
- Q52: Can agents dismiss prompts? Is dismissal logged?
- Q53: What's the priority/severity visual difference? Color coding?
- Q54: Can multiple prompts stack or only one at a time?
- Q55: Is there a prompt history/log visible during the call?
- Q56: Do prompts interrupt agent's focus or appear non-blocking?
- Q57: Can agents mark prompts as "acknowledged" vs "ignored"?

**Upsell Prompts**

- Q58: How are upsell prompts visually different from coaching prompts?
- Q59: Do upsell prompts require explicit agent acceptance before proceeding?
- Q60: Can agents dismiss upsell prompts without taking action?
- Q61: Is there a "Not interested" vs "Presented" vs "Accepted" tracking?
- Q62: Where exactly does upsell content appear - same as coaching or separate section?
- Q63: Can agents defer upsell prompts to later in the call?
- Q64: Is upsell outcome tracked automatically or does agent need to update?

**Chat Assistant**

- Q65: Is Chat Assistant always visible or does agent need to open/expand it?
- Q66: What's the default position and size of the chat interface?
- Q67: Is there a character limit on agent questions?
- Q68: How is "thinking/processing" state shown while waiting for response?
- Q69: Does chat history scroll automatically to latest or require agent scroll?
- Q70: Can agents copy-paste from chat responses?
- Q71: Are chat responses plain text or can include formatting/links?
- Q72: Is there a "suggested questions" feature or only free-form?
- Q73: Can agents rate chat responses (helpful/not helpful)?
- Q74: What happens if chat query times out? Error message shown?
- Q75: Can agents re-ask or rephrase questions easily?

**Multi-Element Layout Questions**

- Q76: What's the visual hierarchy? Which element is most prominent?
- Q77: Is there a default layout or is it customizable per client?
- Q78: Can agents drag/resize different panels?
- Q79: How does the UI adapt to different screen resolutions?
- Q80: What's the minimum screen size/resolution supported?
- Q81: Is there a mobile/tablet version for agents?

### 1.4 Call End - Transition

**Call Conclusion Trigger**

- Q82: What triggers the "call ended" state? Telephony system hangup only?
- Q83: Can agents manually mark a call as complete before actual hangup?
- Q84: What if call drops unexpectedly - how is this handled in UI?
- Q85: Is there a countdown/warning before auto-saving post-call data?

**UI Transition**

- Q86: Does the Agent UI automatically switch to post-call view or require action?
- Q87: How long does the live call UI remain visible after call ends?
- Q88: Can agents manually switch to post-call view before call actually ends?
- Q89: Is there a "Call Ended" confirmation message shown?
- Q90: What happens if agent starts a new call before finishing post-call work?

**Summary Generation**

- Q91: Is the "generating summary" progress visible to agent?
- Q92: What exactly shows during the 15-second summary generation window?
- Q93: Can agents proceed to next call before summary completes?
- Q94: What if summary generation fails - is retry automatic or manual?
- Q95: Is there a notification when summary is ready?

### 1.5 Post-Call State

**Transcript Display**

- Q96: Is transcript shown by default or does agent need to open it?
- Q97: How is speaker identification displayed (Customer/Agent labels)?
- Q98: Can agents search within transcript?
- Q99: Are timestamps shown for each transcript segment?
- Q100: Can agents highlight or annotate transcript sections?
- Q101: Is there a confidence score indicator for transcription quality?
- Q102: How are redacted PII elements shown in transcript ([REDACTED] tags)?
- Q103: Can agents request re-transcription if quality is poor?

**Summary View**

- Q104: What exact fields appear in the summary section?
- Q105: Is summary editable by agents or read-only?
- Q106: Can agents add notes/comments to the summary?
- Q107: How are key points, action items, and resolution visually differentiated?
- Q108: Is there a summary rating/quality indicator?

**Ticket Creation**

- Q109: Is ticket draft auto-populated or does agent trigger creation?
- Q110: Which CRM fields are auto-filled? What remains manual?
- Q111: Can agents edit the ticket before submitting to CRM?
- Q112: How is the ticket submission confirmed? Success message?
- Q113: What happens if ticket submission fails? Retry mechanism?
- Q114: Can agents save draft tickets for later completion?

**Next Steps & Wrap-Up**

- Q115: What action marks the post-call work as "complete"?
- Q116: Can agents return to review this call later in their shift?
- Q117: Is there a required wrap-up time before next call can be taken?
- Q118: How long does post-call data remain accessible to the agent?
- Q119: Can agents share/export call summaries?

### 1.6 Error & Edge Cases

**System Degradation**

- Q120: What's visible to agent when STT API is down?
- Q121: How is "degraded mode" communicated to agents?
- Q122: Which features remain functional when AI services fail?
- Q123: Is there a system health indicator visible to agents?
- Q124: Can agents manually request retry for failed AI features?

**Network Issues**

- Q125: What happens during WebSocket disconnection?
- Q126: Is there a "reconnecting" indicator shown?
- Q127: How much data is lost if connection drops mid-call?
- Q128: Are updates queued and replayed after reconnection?

**Audio Quality Issues**

- Q129: Is there an indicator for poor audio quality affecting transcription?
- Q130: Can agents flag audio issues during the call?
- Q131: What happens if audio stream is interrupted?

**Data Conflicts**

- Q132: What if intent updates while agent is mid-sentence in SOP?
- Q133: How are conflicting upsell opportunities handled?
- Q134: What if sentiment and intent suggest different next actions?

---

## 2. MANAGER USER JOURNEY - DASHBOARD NAVIGATION

### 2.1 Login & Landing

**Initial Access**

- Q135: What's the default landing page for managers? Overview dashboard?
- Q136: Is there a different landing page for Team Leads vs Managers?
- Q137: Can managers customize their default landing page?
- Q138: How is authentication handled? Same as agents or separate?
- Q139: What happens on first login? Onboarding wizard or direct to dashboard?

**Dashboard Loading**

- Q140: How long is acceptable load time for initial dashboard?
- Q141: Is there progressive loading (metrics appear incrementally)?
- Q142: What's shown if data is still loading? Skeleton screens, spinners?
- Q143: Can managers navigate away before full load completes?

### 2.2 Overview Dashboard

**Metric Cards**

- Q144: Are metric cards clickable for drill-down or just informational?
- Q145: What happens when clicking a metric card (Sessions, Sentiment, etc.)?
- Q146: Do metrics auto-refresh? What's the refresh interval?
- Q147: Is there a "last updated" timestamp visible?
- Q148: Can managers manually refresh individual cards vs entire dashboard?
- Q149: How are metric changes (up/down) indicated? Arrows, colors, percentages?
- Q150: Is there a comparison to previous period (day/week/month)?

**Charts & Visualizations**

- Q151: Are charts interactive (hover for details, click to filter)?
- Q152: Can managers switch chart types (line to bar, etc.)?
- Q153: What's the default time range for charts? Last 24 hours?
- Q154: Can managers zoom into specific time ranges on charts?
- Q155: Do charts support exporting as images or data?
- Q156: How many data points are shown before aggregation kicks in?

**Alerts Panel**

- Q157: How many recent alerts are shown by default? 5, 10, 20?
- Q158: Is there pagination or "view all" for alerts?
- Q159: Can managers filter alerts by severity, type, agent?
- Q160: What happens when clicking an alert? Navigate to session or floor?
- Q161: Can managers dismiss/acknowledge alerts?
- Q162: Is there an alert notification sound/desktop notification?
- Q163: Do alerts stack if multiple occur rapidly?

**Filters**

- Q164: Where are filter controls positioned? Top, sidebar, modal?
- Q165: Are filters persistent across navigation or reset per page?
- Q166: Can managers save filter presets?
- Q167: How are active filters indicated visually?
- Q168: Is there a "clear all filters" option?
- Q169: Do filters apply to all dashboard sections simultaneously?
- Q170: What's the behavior when conflicting filters are selected?

### 2.3 Agent Performance View

**Agent List/Grid**

- Q171: Is agent view a table, card grid, or both options?
- Q172: How many agents shown per page? Is it configurable?
- Q173: What's the default sort order? By name, performance, calls handled?
- Q174: Can managers sort by multiple columns?
- Q175: Is there a search/filter box for finding specific agents?
- Q176: Can managers tag/group agents for easier navigation?

**Individual Agent Details**

- Q177: Does clicking an agent open a modal, side panel, or new page?
- Q178: What exact metrics appear in agent detail view?
- Q179: Can managers see agent's call history from this view?
- Q180: Is there a "compare agents" feature?
- Q181: Can managers export individual agent reports?
- Q182: Is there an agent performance trend chart (last 7/30 days)?

**Leaderboard**

- Q183: Is leaderboard always visible or a separate tab/section?
- Q184: Can managers switch leaderboard metric (QA, sentiment, adherence)?
- Q185: How many agents shown in leaderboard? Top 10, 20?
- Q186: Is there a "bottom performers" view as well?
- Q187: Can leaderboard be filtered by queue/team?

### 2.4 Sessions View

**Session List**

- Q188: What's the default sort for session list? Most recent first?
- Q189: How many sessions per page? Pagination or infinite scroll?
- Q190: What columns/fields are shown in session list table?
- Q191: Can managers customize visible columns?
- Q192: Is there bulk selection for mass actions?
- Q193: Can managers star/bookmark important sessions?
- Q194: How is session status (active/completed/failed) indicated?

**Session Search & Filters**

- Q195: What fields are searchable? Call ID, customer phone, agent name?
- Q196: Is search real-time or requires submit?
- Q197: Can managers save complex filter queries?
- Q198: Is there an advanced search mode?
- Q199: Can managers filter by custom date ranges?

**Session Detail Navigation**

- Q200: Does session detail open in modal, slide-out, or full page?
- Q201: Can managers navigate previous/next session without going back?
- Q202: Is there a breadcrumb trail for navigation context?

### 2.5 Session Detail View

**Tab Structure**

- Q203: Are all tabs loaded upfront or lazy-loaded on click?
- Q204: Can managers rearrange tab order?
- Q205: Is there a keyboard shortcut for switching tabs?
- Q206: Which tab is default when opening session detail?

**Overview Tab**

- Q207: What exact sections appear in overview? Summary, intent, highlights?
- Q208: Is call metadata (duration, queue, timestamps) shown here?
- Q209: Can managers edit summary or add notes?
- Q210: How is resolution status displayed and can it be changed?

**Sentiment Tab**

- Q211: Is sentiment timeline an interactive chart?
- Q212: Can managers see exact sentiment scores at specific timestamps?
- Q213: Are key sentiment moments highlighted automatically?
- Q214: Can managers annotate specific points on timeline?
- Q215: Is there sentiment comparison between customer and agent?

**Performance Tab**

- Q216: What exact QA metrics are shown?
- Q217: Is SOP adherence shown step-by-step or just overall score?
- Q218: Can managers see which compliance checks passed/failed?
- Q219: Are upsell opportunities and outcomes visible here?
- Q220: Can managers override QA scores?

**Insights Tab**

- Q221: What types of insights appear? Coaching gaps, SOP deviations?
- Q222: Are insights auto-generated or manually added?
- Q223: Can managers add custom insights/tags?
- Q224: Is there an action items list derived from insights?

**Transcript Section**

- Q225: Is transcript shown in all tabs or dedicated tab?
- Q226: Can managers search within transcript?
- Q227: Are key moments linked from other tabs to transcript timestamps?
- Q228: Can managers highlight or annotate transcript?
- Q229: Is transcript downloadable?
- Q230: How is speaker identification shown?

**Audio Playback**

- Q231: Is audio player always visible or appears on demand?
- Q232: Can managers sync audio playback with transcript highlighting?
- Q233: Are there playback speed controls (1x, 1.5x, 2x)?
- Q234: Can managers skip to specific timestamps?
- Q235: Is audio downloadable?

### 2.6 Floor View - Real-Time Monitoring

**Layout & Display**

- Q236: How many active call cards fit on screen at once?
- Q237: Is there a grid size option (small/medium/large cards)?
- Q238: Do cards auto-arrange or maintain fixed positions?
- Q239: Can managers pin specific calls to top of view?
- Q240: Is there a full-screen mode for floor view?

**Card Interactions**

- Q241: What happens on single-click of a call card?
- Q242: Is there a double-click or right-click menu?
- Q243: Can managers expand a card for more details without leaving floor view?
- Q244: How do managers dismiss/acknowledge risk alerts on cards?
- Q245: Can managers add quick notes to active calls?

**Real-Time Updates**

- Q246: What's the visual effect when new call card appears?
- Q247: How are cards removed when calls end? Fade out, instant removal?
- Q248: Is there a notification sound for high-priority alerts?
- Q249: Can managers pause auto-refresh to analyze current state?
- Q250: Is there a call counter that updates in real-time?

**Filtering & Sorting**

- Q251: Can managers filter floor view by risk level, queue, agent?
- Q252: Are filters applied instantly or require confirmation?
- Q253: Can managers sort cards by duration, sentiment, etc.?
- Q254: Is there a "show only critical" quick filter?

**Intervention Actions**

- Q255: What exact actions can managers take from floor view?
- Q256: Is there a "join call" button visible on each card?
- Q257: Can managers send messages/alerts to agents from floor view?
- Q258: Is there a "request callback" or "escalate" action?
- Q259: How is ongoing manager intervention indicated on card?

### 2.7 Analytics Dashboard

**Advanced Metrics**

- Q260: What additional metrics appear in Analytics vs Overview?
- Q261: Can managers create custom metric views?
- Q262: Is there a metrics builder/configurator?
- Q263: Can managers schedule automated reports?

**Trend Analysis**

- Q264: What time ranges are available? Hour, day, week, month, custom?
- Q265: Can managers compare multiple time periods?
- Q266: Is there anomaly detection highlighting unusual patterns?
- Q267: Can managers drill down from aggregate to individual sessions?

**Root Cause Analysis**

- Q268: How is root cause clustering presented? Chart, list, tree?
- Q269: Can managers click into clustered issues?
- Q270: Are recommendations auto-generated for identified issues?
- Q271: Can managers mark root causes as resolved/addressed?

**Export & Reporting**

- Q272: What export formats are supported? CSV, Excel, PDF?
- Q273: Can managers customize export fields?
- Q274: Are charts included in exports or data only?
- Q275: Is there a report scheduler for recurring exports?

### 2.8 Navigation & UX

**Main Navigation**

- Q276: Is navigation a sidebar, top bar, or both?
- Q277: Can managers collapse/expand navigation?
- Q278: Are there keyboard shortcuts for navigation?
- 

**
