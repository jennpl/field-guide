export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { environment, babyState } = req.body;

  if (!environment || !babyState) {
    return res.status(400).json({ error: 'Missing environment or babyState' });
  }

  const prompt = `You are a seasoned forest school educator and child development specialist. A caregiver in Brooklyn, New York is outside with their 9-month-old baby.

Location: ${environment}
What the baby is doing: ${babyState}

Generate a forest school moment card. Write like a seasoned outdoor educator jotting field notes — warm, direct, a little poetic. Not corporate, not clinical, not like an app. Use fragments where they feel natural. Keep each field to 1-2 sentences max. Respond ONLY with a JSON object, no markdown, no extra text:
{
  "locationIcon": "a single relevant emoji",
  "alive": "one sharp, sensory observation about this specific urban environment — notice the small stuff, max 2 sentences",
  "follow": "one action to take right now, with a brief why — conversational, max 2 sentences",
  "let": "one thing to not interfere with, and a brief reason rooted in child development — direct, max 2 sentences",
  "developing": "one capacity being built right now — explain it plainly, like you're telling a friend, max 2 sentences",
  "wonder": "one question to sit with quietly — don't explain it, just offer it, max 1 sentence"
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
