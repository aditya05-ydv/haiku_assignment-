# GenoRoot — Hair & Scalp Intake

A patient-friendly digital intake experience designed for a hair and scalp
clinic.

The goal was to turn a traditional 16-question medical intake into a simpler,
more approachable experience while preserving the complete structured output
required by the clinic.

The experience is designed for real patients, including older patients who may
not be comfortable with complicated forms or conversational interfaces.

---

## Live Demo

[https://haiku-assignment.vercel.app/](https://haiku-assignment.vercel.app/)

---

## The Problem

Traditional clinic intake forms can feel long and repetitive. Patients may
abandon them, answer carelessly, or need assistance completing them.

The challenge was not simply to digitize the existing form, but to make the
process feel easier while still collecting all of the information required by
the clinic.

The final output must contain the complete 16-question intake as structured
information.

---

## What I Built

I built a responsive, tap-first patient intake experience using:

- React
- JavaScript
- Tailwind CSS
- Node.js
- Express
- Client-side PDF generation

The intake is divided into five clear sections:

1. Personal & Family Hair Loss History
2. Hormonal & Health Influences
3. Lifestyle & Environmental Triggers
4. Current Hair Care & Treatments
5. Sample Collection & Consent

The patient completes the intake step by step and then gets a complete review
of their answers before submitting.

---

# Product Decisions

## 1. Give the patient an overview before starting

Instead of immediately showing question 1, the landing page first shows the
five sections of the intake.

This gives the patient a mental model of what they are about to complete.

A patient can see that the intake covers:

- Personal and family history
- Health and hormonal factors
- Lifestyle and environmental triggers
- Hair care and treatments
- Sample collection and consent

I chose this because a long form can create uncertainty:

"How much is left?"
"What else are they going to ask me?"

Showing the overall structure upfront makes the experience more predictable
and reduces that uncertainty.

---

## 2. Tap-first interaction

I chose a tap-first interaction for most questions.

Most answers are structured choices, so patients can select an answer rather
than typing long responses.

Examples include:

- Duration
- Family history
- Hair-loss pattern
- Diagnosed conditions
- Yes/No questions
- Sample preference
- Treatment options

This makes the experience faster and reduces the amount of typing required.

The design is intentionally simple enough to be usable on both a phone and a
laptop.

---

## 3. Use visuals when medical terminology may be unclear

Some patients may not immediately understand terms such as:

- Receding hairline
- Thinning at crown
- Widening part line
- Diffuse thinning
- Patchy loss

For the relevant hair-loss pattern question, I used visual examples so the
patient can recognize what they are experiencing instead of relying entirely
on medical terminology.

This is particularly useful because not every patient will have a medical or
dermatology background.

The visual is there to help the patient answer the question accurately, not
just to decorate the interface.

---

## 4. Progressive disclosure

I intentionally do not show every possible follow-up question at once.

Secondary questions appear only when they become relevant.

For example:

- Selecting "Yes" for smoking reveals the cigarette-frequency question.
- Selecting "Yes" for salon treatments reveals the treatment detail field.
- Selecting "Yes" for treatment side effects reveals the description field.
- Treatment and procedure details are shown in context rather than making
  every possible field visible immediately.

This keeps the interface visually smaller and easier to scan while still
collecting the required information.

The principle is:

Show the patient only what they need to answer next.

---

## 5. Conditional questions

Questions about menstrual cycle and pregnancy-related hair loss are relevant
only to female patients.

For patients where these questions are not applicable, the corresponding
fields are represented as "Not applicable" in the final structured output.

This preserves the required schema without forcing patients to answer
irrelevant medical questions.

---

## 6. Review before submission

After completing all sections, the patient sees a structured review of their
submitted information.

Each section can be edited individually.

This means that if a patient notices an incorrect answer, they do not need to
restart the entire intake.

The review step also acts as a final confirmation before submission.

---

## 7. Structured final output

The most important requirement of the take-home was not the exact patient-facing
interface but the completed intake at the end.

The application therefore keeps the answers structured by section and question
so that the final result represents the complete intake rather than a block of
unstructured text.

The output covers the required 16-question schema.

---

## 8. One-page PDF

After submission, the completed intake can be downloaded as a compact,
one-page PDF.

I kept the PDF intentionally dense and structured so that the complete intake
can be viewed quickly rather than spreading a relatively small amount of
information across multiple pages.

The PDF contains:

- Patient intake sections
- Submitted answers
- Treatment information
- Sample preference
- Consent
- Completion status

I also tested the PDF using made-up patient data to check that the submitted
answers actually appear in the generated output.

---

## 9. Start New Intake

After an intake has been submitted, the patient can start a new intake.

This is useful in a clinic setting where the same device may be used by
multiple patients.

The user is given a confirmation step before the existing intake is cleared,
rather than accidentally losing submitted information.

---

# Why I Did Not Use an AI Chatbot

I considered a conversational AI interface, but decided that it was not the
best fit for this particular intake.

The questions are mostly structured medical questions with known answer types.
A chatbot could introduce unnecessary ambiguity because patients may expect a
general-purpose assistant to understand and answer anything they type.

For example, if a patient asks an unrelated question while filling the form,
a conversational system may need to determine whether the message is an answer,
a question about the form, or something unrelated.

That creates additional complexity in a workflow where predictability is more
important.

I therefore chose deterministic interactions:

Tap an answer → show the relevant follow-up → continue.

This keeps the experience focused on completing the intake rather than having
a conversation with the system.

---

# Why I Did Not Use Voice

Voice input was another interaction I considered.

I decided not to make voice part of the core experience because several
questions involve sensitive personal and family information, including family
history, medical conditions, and hair-loss history.

A patient may be completing the intake in a shared clinic, public environment,
or around family members and may not want to say these answers aloud.

A tap-first interface allows the patient to complete the same intake quietly
and privately.

For this use case, I felt that privacy and predictability were more valuable
than adding voice as a feature.

---

# Why I Used Node.js and Express

I used Node.js with Express for the backend.

Node.js and Express are technologies I am already very comfortable working
with, which allowed me to move quickly within the 6–10 hour constraint of the
take-home.

Rather than spending the limited time learning or configuring a new backend
stack, I used a technology I could work with confidently and focused the
remaining time on the patient experience, conditional logic, structured output,
and testing.

The backend exposes a simple `/submit` endpoint that receives the completed
intake as structured JSON.

I intentionally kept the backend lightweight because the assignment does not
require a complex backend, authentication system, or admin dashboard.

---

# AI Tools Used

I used Claude (free/unpaid tier) throughout the build process to help write
and structure the React components, Tailwind styling, conditional logic, PDF
generation code, and this documentation.

I chose Claude because it let me move quickly within the 6–10 hour time
budget: instead of hand-writing every component from scratch, I could describe
the exact behavior I wanted (progressive disclosure, conditional questions,
mutually-exclusive selections, one-page PDF layout, etc.) and iterate on the
generated code until it matched the intended patient experience.

I did not use any paid AI service, and no API keys were required for this
part of the workflow since Claude was used directly through its chat
interface, not integrated into the running application.

The application itself does not call any AI model at runtime — all logic
(conditional questions, validation, PDF generation) is deterministic and
runs entirely in the browser/backend without an LLM in the loop.

# Technology Choices

## Frontend

### React

React was used to build the patient-facing intake and manage the different
sections and answer state.

### Tailwind CSS

Tailwind CSS was used to build the responsive interface quickly and maintain
consistent spacing, typography, cards, buttons, and responsive layouts.

## Backend

### Node.js + Express

Used for the lightweight submission endpoint and because it is a stack I can
work productively with.

## PDF

[jsPDF](https://github.com/parallax/jsPDF) is used to generate the submitted
intake summary as a downloadable PDF, entirely on the client side (no server
round-trip needed to produce the file).

---

# What I Built vs What I Used

## Built

- Patient-facing landing page
- Five-section intake flow
- Responsive mobile and desktop layout
- Tap-first interactions
- Multi-select questions
- Conditional follow-up questions
- Female-only question handling
- Visual hair-loss pattern selection
- Product treatment table
- In-clinic procedure table
- Review screen
- Section editing
- Submission flow
- One-page PDF generation
- Start New Intake flow

## Used

- React
- Tailwind CSS
- Node.js
- Express
- PDF generation library
- Git/GitHub
- Deployment platform

I chose existing libraries and frameworks instead of building basic
infrastructure from scratch so that more time could be spent on the actual
patient experience.

---

# Testing

I used made-up patient information for testing and did not use real patient
data.

I tested different patient paths, including:

- Male patient flow
- Female patient flow
- Female-only questions
- "None of these" selections
- Multiple selections
- Smoking follow-up
- Smoking frequency
- Salon treatment follow-up
- Product treatment history
- In-clinic procedure history
- Treatment side effects
- Conditional descriptions
- Review and edit flow
- Submission
- PDF generation
- Starting a new intake

I also checked the generated PDF to verify that submitted information appears
in the final structured output.

The interface was tested at both mobile and desktop widths.

---

# Data & Privacy

No real patient data is included in this project.

The take-home was tested using made-up patient information.

No API keys or secrets are committed to the repository.

---

# Running Locally

## Clone the repository

git clone https://github.com/aditya05-ydv/haiku_assignment-.git
cd haiku_assignment-

## Frontend

cd client
npm install
npm run dev

## Backend

cd server
npm install
node index.js


---

# What I Would Improve With One More Week

## 1. Multilingual support

The current version is English-first.

With another week, I would add multilingual support for languages commonly
spoken by the clinic's patients.

The goal would not simply be to translate the interface. The same tap-first
interaction model would remain intact while questions and answer choices could
be presented in the patient's preferred language.

For example, a patient who is more comfortable reading Telugu could complete
the same flow entirely in Telugu.

This would reduce language barriers without making the interaction more
complicated.

# 2 Resume an interrupted intake
I would save incomplete progress locally so that a patient who accidentally
closes the browser or gets interrupted can return to where they stopped instead
of starting again.

This directly addresses the abandonment problem described in the brief.

 # 3 Automated schema validation
I would add automated tests against the required 16-question schema.

The tests would verify that:

Every required question is represented.
Conditional questions resolve correctly.
Not-applicable states are handled correctly.
Multi-select answers are preserved.
Follow-up answers are not lost.
The final structured output contains the required information.

This would make it easier to guarantee that a visually simple experience still
produces a complete and correct intake.

# 4. Secure clinic delivery

Instead of relying on a manually downloaded PDF, a future version could
securely send the completed structured intake to the clinic's existing system
or designated care team.

The patient-facing experience would remain simple while the completed intake
could reach the appropriate team before the consultation.

I would prioritize integration with the clinic's existing workflow rather than
building a separate admin dashboard unless the clinic actually needed one.

