export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { environment, babyState } = req.body;

  if (!environment || !babyState) {
    return res.status(400).json({ error: 'Missing environment or babyState' });
  }

  const prompt = `You are a forest school educator and child development specialist. A caregiver in Brooklyn, New York is outside with their 9-month-old baby.

Location: ${environment}
What the baby is doing: ${babyState}

Generate a forest school moment card. Respond ONLY with a JSON object, no markdown, no extra text. Use this exact structure:
{
  "locationIcon": "a single relevant emoji",
  "alive": "a poetic 1-2 sentence observation about what is alive and present in this specific urban environment right now — notice the small things: a crack in the pavement, a pigeon, moss on brick, wind through a tree pit, a weed that decided to grow anyway",
  "follow": "one specific gentle action the caregiver can take right now to follow and support the baby's current interest — grounded in forest school principles of child-led exploration, no equipment needed",
  "let": "one thing the caregiver should resist doing — something to let happen without interfering, with a brief reason rooted in child development or forest school philosophy",
  "developing": "one developmental milestone or sensory/motor capacity this moment is supporting for a 9-month-old, explained in plain warm language — no clinical jargon",
  "wonder": "a single poetic question for the caregiver to hold silently — not to answer or explain to the baby, just to notice and sit with together"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    console.log('Anthropic response status:', response.status);
    console.log('Anthropic response body:', JSON.stringify(data));

    if (!response.ok) {
      console.error('Anthropic API error:', data);
      return res.status(500).json({ error: 'Anthropic API error', detail: data });
    }

    if (!data.content || !Array.isArray(data.content)) {
      console.error('Unexpected response shape:', data);
      return res.status(500).json({ error: 'Unexpected response shape', detail: data });
    }

    const text = data.content.map(i => i.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const card = JSON.parse(clean);

    return res.status(200).json(card);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Failed to generate moment', detail: err.message });
  }
}
