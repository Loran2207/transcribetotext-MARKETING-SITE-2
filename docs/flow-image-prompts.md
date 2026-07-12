# Flow / nano banana prompts - перегенерация иллюстраций под наш стиль

Как пользоваться: прикрепи исходную картинку (из public/brand/) как референс и вставь промпт.
Общая идея: композиция и элементы 1:1, меняем только палитру и мелкий UI-текст под наш стиль
(premium light, брендовый синий #2563EB, без тил/зелёного/фиолетового/оранжевого, без капса).

Стилевой блок (добавлен в конец каждого промпта):
"Premium light SaaS aesthetic: white and ice-blue (#EAF1FE) surfaces, brand blue #2563EB accents,
dark navy (#14162B) text, soft shadows, rounded corners (16-24px), clean Inter-style typography,
crisp vector-like UI rendering, high resolution. No teal, no green, no purple, no orange accents.
The entire image sits on a pure white background (#FFFFFF), no colored or gradient backdrop behind
the cards and elements."

## 1. Hero collage - public/brand/ccae55d6_main_2_3a02f96b84.png

Edit the attached image. Keep the exact composition and all elements: two circular portraits of the
same professional woman (left: frustrated, looking down, label chip "Now"; right: confident warm
smile, label chip "TranscribeToText.AI"), double chevron between the circles, and below them three
comparison meters per side titled "Time Efficiency" (Low / High), "Accuracy" (Low / High, three
segment bars), "Speed" (Low / High, slider with round knob). Replace every teal/green accent with
brand blue #2563EB: the chevrons, the "TranscribeToText.AI" chip background, all slider tracks,
knobs and segment bars (use light blue #DBEAFE for empty track parts). Circular portrait
backgrounds: soft blue gradient (#EAF1FE to #BFDBFE). Keep the "Now" chip white with dark navy
text. Pure white background (#FFFFFF). + стилевой блок

## 2. Audio upload UI - public/brand/audio_upload_ui_1b66ce2e3d.png

Edit the attached image. Keep the exact composition: a white "Transcribe Your File" card with a
dashed upload area ("Uploading..." + file name + progress bar), two floating audio-message pills
with play buttons and waveforms on the left, floating file-format icons on the right (DOC, TXT,
VTT, PDF, JSON, SRT), two option rows ("Transcription Language" and "Speaker Identification" with
"Auto-detect" selects and a toggle), and a large pill button at the bottom. Changes: recolor both
waveforms and play buttons to brand blue #2563EB; restyle all file-format icons as unified
monochrome rounded squares in navy/blue tones (keep their format labels); button text reads
"Start transcribing" in sentence case on the blue gradient pill; progress bar and toggle in
#2563EB. White background. + стилевой блок

## 3. Video to text - public/brand/img_c435e79e4d.png

Edit the attached image. Keep the exact composition: a rounded video-player frame with a laughing
young man wearing black studio headphones in front of a microphone, floating translation pills with
round flag icons ("Witam!" Polish, Japanese greeting, "Привет!" Russian, "Hello!" USA, "Bonjour!"
French, "Hallo!" German), the white subtitle "Hello!" at the bottom center of the video, and a dark
player control bar (volume, rewind, play, forward, settings, fullscreen, progress slider). Changes:
replace the green wall and warm orange studio lighting with a deep navy-blue studio backdrop
(#0A0F1E to #1E3A8A gradient) with soft cool rim light on the subject; keep flags in their natural
colors; pills stay white with dark navy text; player progress slider accent becomes #2563EB.
+ стилевой блок

## 4. Meeting transcription - public/brand/img_1_78f229d95b.png

Edit the attached image. Keep the exact composition: a white "Scheduled Meeting" dialog (subtitle
text, "Google Calendar" and "Microsoft Outlook" chips, two toggle rows, blue "Done" button), a 3x3
video-call grid of diverse smiling participants with one tile showing an AI logo, small Google
Meet / Zoom / Microsoft Teams icons bottom-left, and a floating pill "TranscribetoText bot is
recording now" with a waveform icon and a pause button. Changes: the AI logo tile background from
purple gradient to a blue gradient (#3B82F6 to #1D4ED8) with a white speech-bubble "AI" mark; the
recording pill's waveform icon and pause button from teal to brand blue #2563EB; keep the
Meet/Zoom/Teams logos and all people natural. + стилевой блок

## 5. Cloud file transcription - public/brand/img_2_8cba23b4a9.png

Edit the attached image. Keep the exact composition: a white "Enter Link" card with helper text
("Import audio and video from YouTube, Dropbox, Google Drive. The link must be publicly
accessible."), a URL input with a dropbox.com link, a large blue pill button, a dashed curved arrow
to a second card "Uploading..." with file name and progress bar, and Dropbox / Google Drive /
OneDrive logos bottom-left. Changes: button text reads "Apply" in sentence case; dashed arrow,
dashed card border and progress bar in brand blue #2563EB; keep the cloud-service logos original.
White background. + стилевой блок

## 6. (не с лендинга) Girl promo - public/images/image-girl.png
Используется только в /subscribe наследии v1; перегенерация не требуется, пока блок не вернётся.
