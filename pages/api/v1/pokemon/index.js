export default async function handler(req, res) {
  try {
    const _res = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await _res.json();
    if (!data) {
      res.statusCode = 500;
    } else {
      res.statusCode = 200;
    }
    res.json({
      data,
      success: Boolean(data),
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({ success: false });
  }
}
