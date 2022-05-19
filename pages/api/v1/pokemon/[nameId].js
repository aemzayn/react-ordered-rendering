export default async function handler(req, res) {
  try {
    const { nameId } = req.query;
    if (!nameId) {
      res.statusCode = 400;
      res.json({
        error: "Pokemon name must be provided.",
        success: false,
        data: null,
      });
      return;
    }

    const _res = await fetch("https://pokeapi.co/api/v2/pokemon/" + nameId);
    const data = await _res.json();

    res.json({
      data,
      success: true,
    });
  } catch (error) {
    res.statusCode = 500;
    res.json({
      error,
    });
  }
}
