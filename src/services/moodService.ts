/**
 * Mood Service - Core logic for emotion processing
 *
 * This service handles:
 * - Emotion data structures based on Ekman's 6 basic emotions
 * - Main emotion determination
 * - Offline activity recommendations
 * - Emotion-appropriate jokes
 *
 * Future LLM Integration:
 * The generateMoodResponse function is currently rule-based.
 * To integrate an LLM (OpenAI, Claude, etc.), replace the logic
 * in generateMoodResponse with an API call to your chosen LLM service.
 */

/**
 * Represents a single emotion with its intensity score
 */
export interface EmotionScore {
  key: string;    // e.g., "joy", "sadness"
  label: string;  // e.g., "Freude", "Traurigkeit"
  score: number;  // 0-10
  icon: string;   // emoji or icon identifier
}

/**
 * The complete response from Mood-Buddy
 */
export interface MoodResponse {
  mainEmotion: EmotionScore;
  allEmotions: EmotionScore[];
  tip: string;      // Offline activity recommendation
  joke: string;     // Emotion-appropriate joke
  message: string;  // Summary message about the emotional state
}

/**
 * Available emotions based on Ekman's 6 basic emotions
 */
export const EMOTIONS: Omit<EmotionScore, 'score'>[] = [
  { key: 'joy', label: 'Freude', icon: '😊' },
  { key: 'sadness', label: 'Traurigkeit', icon: '😢' },
  { key: 'fear', label: 'Angst', icon: '😰' },
  { key: 'anger', label: 'Wut', icon: '😠' },
  { key: 'disgust', label: 'Ekel', icon: '🤢' },
  { key: 'surprise', label: 'Überraschung', icon: '😲' },
];

/**
 * Determines the main emotion from a list of scored emotions
 * @param emotions Array of emotions with scores
 * @returns The emotion with the highest score > 0, or null if none
 */
export function determineMainEmotion(emotions: EmotionScore[]): EmotionScore | null {
  const scoredEmotions = emotions.filter(e => e.score > 0);

  if (scoredEmotions.length === 0) {
    return null;
  }

  return scoredEmotions.reduce((prev, current) =>
    (current.score > prev.score) ? current : prev
  );
}

/**
 * Rule-based offline activity recommendations for each emotion
 * TODO: Replace with LLM call for more personalized, contextual recommendations
 */
const OFFLINE_TIPS: Record<string, string[]> = {
  joy: [
    'Teile deine gute Laune! Ruf jemanden an, den du magst.',
    'Geh nach draußen und genieße die Natur – ein Spaziergang verstärkt deine Freude.',
    'Mach etwas Kreatives: Male, bastle oder tanze zu deiner Lieblingsmusik!',
    'Koche oder backe etwas Leckeres und teile es mit anderen.'
  ],
  sadness: [
    'Geh spazieren, am besten in der Natur. Frische Luft hilft.',
    'Schreibe deine Gedanken in ein Tagebuch – das kann befreiend wirken.',
    'Sprich mit jemandem, dem du vertraust. Ein Gespräch kann Wunder wirken.',
    'Mach dir eine warme Tasse Tee und nimm dir Zeit für dich selbst.'
  ],
  fear: [
    'Atme tief durch: 4 Sekunden einatmen, 4 Sekunden halten, 4 Sekunden ausatmen.',
    'Schreibe auf, was dir Angst macht – das nimmt oft die Macht.',
    'Sprich mit jemandem über deine Ängste. Du bist nicht allein.',
    'Mach etwas Beruhigendes: Eine warme Dusche, Yoga oder sanfte Musik.'
  ],
  anger: [
    'Bewege dich! Geh joggen, mach Liegestütze oder tanze wild durch die Wohnung.',
    'Schlag in ein Kissen oder schreie an einem Ort, wo es niemanden stört.',
    'Schreibe auf, was dich wütend macht, und zerreiße dann das Papier.',
    'Mach eine Kampfsportübung oder geh ins Fitnessstudio – Wut braucht Bewegung.'
  ],
  disgust: [
    'Schaffe Ordnung: Räume einen Raum auf oder miste etwas aus.',
    'Nimm eine erfrischende Dusche oder ein Bad mit deinem Lieblings-Duft.',
    'Geh an die frische Luft und atme tief durch.',
    'Koche dir etwas Frisches und Gesundes, das du wirklich magst.'
  ],
  surprise: [
    'Schreibe auf, was dich überrascht hat – halte den Moment fest!',
    'Teile die Überraschung mit jemandem, der sich mit dir freut.',
    'Nimm dir einen Moment, um das Neue zu verarbeiten – vielleicht bei einem Spaziergang.',
    'Feiere den Moment: Tanz, spring, mach etwas Spontanes!'
  ]
};

/**
 * Rule-based jokes tailored to each emotion
 * TODO: Replace with LLM call for more dynamic, contextual humor
 */
const JOKES: Record<string, string[]> = {
  joy: [
    'Warum sind Fische so schlau? Weil sie in Schulen schwimmen! 🐠',
    'Was macht ein Clown im Büro? Faxen! 🤡',
    'Warum können Geister so schlecht lügen? Weil man durch sie hindurchsieht! 👻'
  ],
  sadness: [
    'Warum weint der Kuchen? Weil er in Tränen aufgelöst wird! 🍰 (Okay, das war nicht gut... aber hey, du hast vielleicht kurz gelächelt?)',
    'Was sagt ein Wolke zur anderen? „Heute haben wir echt einen Durchhänger..." ☁️',
    'Warum sind Erdmännchen nie allein traurig? Weil sie im Rudel heulen! 🦡 (Ich bin für dich da!)'
  ],
  fear: [
    'Warum hat das Gespenst keine Angst vor Dunkelheit? Weil es selbst durchsichtig ist! 👻',
    'Was macht ein Angsthase beim Sport? Haken schlagen! 🐰',
    'Warum gehen Monster nicht in die Disco? Sie haben Angst vor der Techno-Logik! 👹'
  ],
  anger: [
    'Warum werden Vulkane nie eingeladen? Weil sie immer ausrasten! 🌋',
    'Was macht ein wütender Mathematiker? Er zählt bis 10... und dann nochmal! 😤',
    'Warum ist Wut wie eine Rakete? Sie hebt ab, aber man weiß nie genau, wo sie landet! 🚀'
  ],
  disgust: [
    'Warum essen Ekel-Expertinnen nie Fast Food? Sie haben schon genug schlechte Geschmäcker erlebt! 🍔',
    'Was sagt ein Bakterium zum anderen? „Du bist echt zum Kotzen!" 🦠',
    'Warum sind Erdmännchen bei Ekel-Gefühlen entspannt? Sie buddeln sich einfach woanders hin! 🦡'
  ],
  surprise: [
    'Warum sind Überraschungseier so schlecht in Mathe? Sie können nicht zählen, was drin ist! 🥚',
    'Was ist die größte Überraschung im Zoo? Wenn das Erdmännchen zurück winkt! 🦡',
    'Warum lieben Magier Überraschungen? Weil sie damit ihr Geld verdienen! 🎩'
  ]
};

/**
 * Generates a personalized mood response based on emotion scores
 *
 * @param emotions Array of emotions with their scores (0-10)
 * @returns Complete mood response with tip, joke, and message
 *
 * LLM INTEGRATION POINT:
 * To integrate an LLM, replace this function's body with:
 *
 * async function generateMoodResponse(emotions: EmotionScore[]): Promise<MoodResponse> {
 *   const mainEmotion = determineMainEmotion(emotions);
 *   if (!mainEmotion) {
 *     // Handle case with no emotions
 *   }
 *
 *   // Example OpenAI integration:
 *   const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       'Authorization': `Bearer ${YOUR_API_KEY}`
 *     },
 *     body: JSON.stringify({
 *       model: 'gpt-4',
 *       messages: [{
 *         role: 'system',
 *         content: 'You are Mood-Buddy, a friendly meerkat that helps people with their emotions.'
 *       }, {
 *         role: 'user',
 *         content: `The user feels: ${emotions.map(e => `${e.label} (${e.score}/10)`).join(', ')}.
 *                   Generate: 1) A summary message, 2) An offline activity tip, 3) An appropriate joke.`
 *       }]
 *     })
 *   });
 *
 *   const data = await response.json();
 *   // Parse LLM response and return MoodResponse
 * }
 *
 * Or for Claude:
 * const response = await fetch('https://api.anthropic.com/v1/messages', {
 *   method: 'POST',
 *   headers: {
 *     'x-api-key': YOUR_API_KEY,
 *     'anthropic-version': '2023-06-01',
 *     'content-type': 'application/json'
 *   },
 *   body: JSON.stringify({
 *     model: 'claude-3-sonnet-20240229',
 *     max_tokens: 500,
 *     messages: [{
 *       role: 'user',
 *       content: `Emotions: ${JSON.stringify(emotions)}. Generate mood response.`
 *     }]
 *   })
 * });
 */
export function generateMoodResponse(emotions: EmotionScore[]): MoodResponse {
  const mainEmotion = determineMainEmotion(emotions);

  if (!mainEmotion) {
    // Default response if no emotions are selected
    return {
      mainEmotion: { key: 'neutral', label: 'Neutral', score: 0, icon: '😐' },
      allEmotions: emotions,
      message: 'Hmm, du hast noch keine Emotion ausgewählt. Wie fühlst du dich wirklich?',
      tip: 'Nimm dir einen Moment Zeit und lausche in dich hinein. Was spürst du gerade?',
      joke: 'Warum sind Erdmännchen so gute Zuhörer? Weil sie immer Ausschau halten! 🦡'
    };
  }

  // Get a random tip and joke for the main emotion
  const tips = OFFLINE_TIPS[mainEmotion.key] || OFFLINE_TIPS.joy;
  const jokes = JOKES[mainEmotion.key] || JOKES.joy;

  const tip = tips[Math.floor(Math.random() * tips.length)];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];

  // Generate message based on main emotion and intensity
  let message = '';
  const intensity = mainEmotion.score;

  // Check for mixed emotions
  const otherStrongEmotions = emotions.filter(
    e => e.score >= 6 && e.key !== mainEmotion.key
  );

  if (intensity >= 8) {
    message = `Du fühlst gerade sehr starke ${mainEmotion.label}! `;
  } else if (intensity >= 5) {
    message = `Du spürst deutlich ${mainEmotion.label}. `;
  } else {
    message = `Ein Hauch von ${mainEmotion.label} ist spürbar. `;
  }

  if (otherStrongEmotions.length > 0) {
    const emotionList = otherStrongEmotions.map(e => e.label).join(' und ');
    message += `Dazu kommen noch ${emotionList} – ganz schön viel auf einmal! `;
  }

  message += 'Lass uns schauen, was dir jetzt guttun könnte.';

  return {
    mainEmotion,
    allEmotions: emotions,
    message,
    tip,
    joke
  };
}

/**
 * Creates an initial emotion score array with all emotions at 0
 */
export function createInitialEmotions(): EmotionScore[] {
  return EMOTIONS.map(emotion => ({
    ...emotion,
    score: 0
  }));
}
